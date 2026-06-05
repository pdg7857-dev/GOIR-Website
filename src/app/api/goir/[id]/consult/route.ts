import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public CTA: a prospect requests the free consultation from their report.
// Marks the report and drops a qualified lead into the eProcurement pipeline
// so the captured demand flows straight into the operator's CRM.
const schema = z.object({
  name: z.string().max(160).optional().nullable(),
  phone: z.string().max(60).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const report = await prisma.goirReport.findUnique({ where: { id: params.id } });
  if (!report) {
    return NextResponse.json({ ok: false, error: "Report not found." }, { status: 404 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* allow empty body */
  }
  const data = schema.safeParse(body).success ? schema.parse(body) : {};

  // Attach the lead to the operator account + eProcurement business, if present.
  const operator = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  let convertedClientId: string | undefined;

  if (operator && !report.convertedClientId) {
    const biz = await prisma.business.findUnique({
      where: { userId_slug: { userId: operator.id, slug: "eprocurement" } },
    });
    const client = await prisma.procurementClient.create({
      data: {
        userId: operator.id,
        businessId: biz?.id,
        name: (data as any).name?.trim() || report.companyName,
        company: report.companyName,
        email: report.email,
        phone: (data as any).phone?.trim() || null,
        industry: report.industry,
        status: "LEAD",
        businessInfo: `GOIR Index: ${report.index}/100 (${report.tier}). Region: ${report.region}.`,
        notes: [
          `Inbound from Government Opportunity Intelligence Report™ (GOIR).`,
          `Report: /goir/${report.id}`,
          (data as any).message ? `Message: ${(data as any).message}` : null,
        ].filter(Boolean).join("\n"),
      },
      select: { id: true },
    });
    convertedClientId = client.id;
  }

  await prisma.goirReport.update({
    where: { id: report.id },
    data: {
      consultationRequested: true,
      consultRequestedAt: new Date(),
      ...(convertedClientId ? { convertedClientId } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
