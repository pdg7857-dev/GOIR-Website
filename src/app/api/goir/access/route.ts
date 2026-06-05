import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ code: z.string().min(3).max(40) });

// Resolve an access code to its report id so the client can open it.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Enter your access code." }, { status: 400 });
  }
  const code = parsed.data.code.trim().toUpperCase();

  const report = await prisma.goirReport.findUnique({
    where: { accessCode: code },
    select: { id: true },
  });
  if (!report) {
    return NextResponse.json({ ok: false, error: "That access code wasn't found. Check it and try again." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, id: report.id, code });
}
