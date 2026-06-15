import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { captureLead } from "@/lib/crm/capture";
import { sendEmail } from "@/lib/integrations/email";
import { SITE } from "@/lib/site/config";

// Question ids that map to structured IntakeSubmission columns.
const COLUMN_IDS = [
  "contactName", "website", "based", "years", "trade", "services", "bestWork", "avoidWork",
  "region", "travel", "countries", "team", "concurrent", "minJob", "maxJob", "sweetSpot",
  "headroom", "bonding", "insurance", "certs", "setAside", "prequal", "experience", "bidsYear",
  "wins", "blockers", "goals", "revenueGoal", "winLooksLike", "findWork", "platforms", "hours",
  "anythingElse", "language",
] as const;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Intake endpoint for the on-site quick-qualify form and the full client
 * questionnaire. Both post the same shape: known contact fields plus a flat
 * list of question/answer responses. The lead is emailed to the leads inbox and
 * written into the CRM with every answer in the notes, so the full sizing
 * picture (capacity, bonding, footprint) lands on the lead card.
 */
const schema = z.object({
  kind: z.enum(["quick", "full"]).default("quick"),
  contactName: z.string().max(120).optional().nullable(),
  companyName: z.string().min(1, "Company name is required").max(160),
  email: z.string().email("A valid email is required").max(160),
  phone: z.string().max(40).optional().nullable(),
  website: z.string().max(200).optional().nullable(),
  trade: z.string().max(160).optional().nullable(),
  region: z.string().max(200).optional().nullable(),
  responses: z
    .array(z.object({ label: z.string().max(300), value: z.string().max(2000) }))
    .max(80)
    .optional(),
  answers: z.record(z.string().max(2000)).optional(),
});

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
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
  const d = parsed.data;
  const answered = (d.responses ?? []).filter((r) => r.value && r.value.trim());
  const kindLabel = d.kind === "full" ? "Full intake" : "Quick qualify";

  // Notes block carries every answer, in order, for the CRM lead card.
  const crmNotes = [
    `Source: ${kindLabel} questionnaire`,
    ...answered.map((r) => `${r.label}: ${r.value.trim()}`),
  ].join("\n");

  const lead = await captureLead({
    contactName: d.contactName,
    companyName: d.companyName,
    email: d.email,
    phone: d.phone,
    industry: d.trade ?? null,
    businessInfo: `${kindLabel}.${d.trade ? ` Trade: ${d.trade}.` : ""}${d.region ? ` Bids in ${d.region}.` : ""}`,
    notes: crmNotes,
  });

  // Structured row: one column per answer, for sorting and filtering by size,
  // bonding and footprint. Best-effort; the email and CRM notes are the backstop
  // if the IntakeSubmission table is not present yet.
  try {
    const a = d.answers ?? {};
    const col: Record<string, string> = {};
    for (const id of COLUMN_IDS) {
      const v = a[id];
      if (typeof v === "string" && v.trim()) col[id] = v.trim();
    }
    await prisma.intakeSubmission.create({
      data: {
        kind: d.kind,
        clientId: lead.clientId ?? null,
        companyName: d.companyName,
        email: d.email.trim().toLowerCase(),
        phone: d.phone?.trim() || null,
        ...col,
      } as Parameters<typeof prisma.intakeSubmission.create>[0]["data"],
    });
  } catch {
    // Swallow: email + CRM notes still captured the lead.
  }

  // Email the full questionnaire to the leads inbox.
  const rows: [string, string][] = [
    ["Name", d.contactName?.trim() || "n/a"],
    ["Company", d.companyName],
    ["Email", d.email],
    ["Phone", d.phone?.trim() || "n/a"],
    ["Website", d.website?.trim() || "n/a"],
    ...answered.map((r) => [r.label, r.value.trim()] as [string, string]),
  ];
  const html = `<h2>${esc(kindLabel)}: ${esc(d.companyName)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5c6b78;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  await sendEmail({
    to: SITE.leadsEmail,
    replyTo: d.email,
    subject: `${kindLabel}: ${d.companyName}`,
    html,
    text,
  }).catch(() => ({ ok: false }));

  return NextResponse.json({ ok: true });
}
