import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { captureLead } from "@/lib/crm/capture";
import { sendEmail } from "@/lib/integrations/email";
import { SITE } from "@/lib/site/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * "Request your free opportunities" intake. A give-value-first lead tool: the
 * prospect tells me who they are and where they bid, and I come back with real,
 * qualified opportunities they had not found. The lead is (1) written into the
 * CRM as a Lead + Contact on the eprocurement business, and (2) emailed to my
 * leads inbox as a backstop so nothing is lost if the DB is unreachable.
 */
const schema = z.object({
  // contactName / region / experience are optional so the design's compact
  // three-field free-report form can post the minimal shape, while the full
  // request form keeps sending everything. Defaults are applied below.
  contactName: z.string().max(120).optional().nullable(),
  title: z.string().max(120).optional().nullable(),
  companyName: z.string().min(1, "Company name is required").max(160),
  email: z.string().email("A valid email is required").max(160),
  phone: z.string().max(40).optional().nullable(),
  website: z.string().max(200).optional().nullable(),
  trade: z.string().min(1, "Tell me what you do").max(600),
  region: z.string().max(200).optional().nullable(),
  experience: z.enum(["new", "some", "experienced"]).optional().nullable(),
  platformsUsed: z.array(z.string().max(60)).max(30).optional(),
  notes: z.string().max(2000).optional().nullable(),
});

const EXPERIENCE_LABEL: Record<string, string> = {
  new: "New to government bidding",
  some: "Some experience",
  experienced: "Experienced bidder",
};

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
  const contactName = d.contactName?.trim() || d.companyName;
  const region = d.region?.trim() || "Shared in the trade field";
  const experienceLabel = d.experience ? EXPERIENCE_LABEL[d.experience] : "Not specified";
  const platforms = (d.platformsUsed ?? []).filter(Boolean);

  const rows: [string, string][] = [
    ["Name", contactName],
    ["Title", d.title?.trim() || "n/a"],
    ["Company", d.companyName],
    ["Email", d.email],
    ["Phone", d.phone?.trim() || "n/a"],
    ["Website", d.website?.trim() || "n/a"],
    ["Trade / work", d.trade],
    ["Where they bid", region],
    ["Bidding experience", experienceLabel],
    ["Platforms used", platforms.length ? platforms.join(", ") : "n/a"],
    ["Notes", d.notes?.trim() || "n/a"],
  ];

  // Connect the lead to the CRM (eprocurement business) we built together.
  const crmNotes = [
    `Title: ${d.title?.trim() || "n/a"}`,
    `Website: ${d.website?.trim() || "n/a"}`,
    `Trade: ${d.trade}`,
    `Where they bid: ${region}`,
    `Bidding experience: ${experienceLabel}`,
    `Platforms used: ${platforms.length ? platforms.join(", ") : "n/a"}`,
    d.notes?.trim() ? `Notes: ${d.notes.trim()}` : null,
    "Source: Request your free opportunities form",
  ]
    .filter(Boolean)
    .join("\n");

  const crm = await captureLead({
    contactName,
    companyName: d.companyName,
    email: d.email,
    phone: d.phone,
    industry: d.trade,
    businessInfo: `Free-opportunities request. ${experienceLabel}. Bids in ${region}.`,
    notes: crmNotes,
  });

  // Notify me with the full lead so I can pull opportunities and follow up.
  const leadHtml = `<h2>New free-opportunities request</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5c6b78">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>`;
  const leadText = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const notify = await sendEmail({
    to: SITE.leadsEmail,
    replyTo: d.email,
    subject: `Free-opportunities request: ${d.companyName} (${experienceLabel})`,
    html: leadHtml,
    text: leadText,
  }).catch(() => ({ ok: false }));

  // Durable fallback: always emit the full lead to the server logs (visible in
  // Vercel), so a lead is recoverable even if both the CRM write and the email
  // fail. Never throws.
  console.log(
    `[LEAD] ${new Date().toISOString()} crm=${crm.ok} notify=${notify.ok} :: ${leadText.replace(/\s*\n\s*/g, " | ")}`,
  );

  // Confirm to the prospect.
  const confirmHtml = `<p>Thanks ${esc(contactName)}.</p><p>I'm going to look at where ${esc(
    d.companyName
  )} bids and pull a short list of real, current opportunities that actually fit your trade, already found and qualified the way I do it for clients. You'll hear from me within 1 to 2 business days.</p><p>- ${esc(
    SITE.brand
  )}</p>`;
  const confirmText = `Thanks ${contactName}.

I'm going to look at where ${d.companyName} bids and pull a short list of real, current opportunities that actually fit your trade, already found and qualified the way I do it for clients. You'll hear from me within 1 to 2 business days.

- ${SITE.brand}`;

  await sendEmail({
    to: d.email,
    replyTo: SITE.email,
    subject: "I'm pulling your free opportunities",
    html: confirmHtml,
    text: confirmText,
  }).catch(() => ({ ok: false }));

  return NextResponse.json({ ok: true });
}
