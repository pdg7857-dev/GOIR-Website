import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { runGoir } from "@/lib/goir/engine";
import { generateNarrative } from "@/lib/goir/narrative";
import { goirReceivedEmail } from "@/lib/goir/email";
import { sendEmail } from "@/lib/integrations/email";
import { generateAccessCode } from "@/lib/goir/codes";
import type { GoirInput } from "@/lib/goir/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Public intake, no auth. The report is generated and stored, but NOT shown:
// it's prepared and delivered manually with an access code within 24 hours.
const schema = z.object({
  companyName: z.string().min(1, "Company name is required").max(160),
  website: z.string().max(200).optional().nullable(),
  industry: z.string().min(1, "Industry is required").max(60),
  region: z.string().min(1, "Province/State is required").max(60),
  email: z.string().email("A valid email is required").max(160),
  contactName: z.string().max(120).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  platformsUsed: z.array(z.string().max(60)).max(20).optional(),
  annualBidVolume: z.coerce.number().int().min(0).max(100000).optional().nullable(),
  employees: z.coerce.number().int().min(0).max(1000000).optional().nullable(),
});

async function createWithUniqueCode(data: any) {
  // Retry on the rare access-code collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await prisma.goirReport.create({
        data: { ...data, accessCode: generateAccessCode() },
        select: { id: true },
      });
    } catch (e: any) {
      if (attempt < 4 && String(e?.message ?? e).includes("accessCode")) continue;
      throw e;
    }
  }
  throw new Error("Could not allocate an access code.");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const input: GoirInput = {
    companyName: data.companyName.trim(),
    website: data.website?.trim() || null,
    industry: data.industry,
    region: data.region,
    email: data.email.trim().toLowerCase(),
    platformsUsed: data.platformsUsed ?? [],
    annualBidVolume: data.annualBidVolume ?? null,
    employees: data.employees ?? null,
  };

  // Generate the report now so it's ready for the operator to review & deliver.
  const result = runGoir(input);
  const narrative = await generateNarrative(input, result).catch(() => null);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 32) : null;

  try {
    await createWithUniqueCode({
      companyName: input.companyName,
      website: input.website,
      industry: input.industry,
      region: input.region,
      email: input.email,
      contactName: data.contactName?.trim() || null,
      phone: data.phone?.trim() || null,
      platformsUsed: input.platformsUsed ?? [],
      annualBidVolume: input.annualBidVolume,
      employees: input.employees,
      index: result.index,
      tier: result.tier,
      scores: result.categories.reduce<Record<string, number>>((m, c) => ((m[c.key] = c.score), m), {}),
      result: result as unknown as object,
      narrative: (narrative as unknown as object) ?? undefined,
      status: "SUBMITTED",
      ipHash,
    });

    // Confirm receipt only, the access code is delivered personally, not here.
    const { subject, html, text } = goirReceivedEmail(input.companyName);
    await sendEmail({ to: input.email, subject, html, text }).catch(() => ({ ok: false }));

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: `Could not save your request: ${e?.message ?? e}` },
      { status: 500 }
    );
  }
}
