import { prisma } from "@/lib/prisma";

/**
 * Connects an inbound website lead to the CRM (the shared Supabase database that
 * also backs Kingsway OS) by creating a ProcurementClient (status LEAD) on the
 * eprocurement Business, under the operator account. This matches how the GOIR
 * consult flow attaches leads, so everything lands in one pipeline.
 *
 * Find-or-create by (operator, email): a repeat request from the same email
 * appends to the existing lead instead of creating a duplicate. Best-effort by
 * design, it never throws, so a database issue can never block a form response
 * or its email backstop. Returns { ok, clientId } so callers can link if needed.
 */
export type CrmLeadInput = {
  contactName?: string | null;
  companyName: string;
  email: string;
  phone?: string | null;
  industry?: string | null;
  /** Short one-line summary shown on the client card. */
  businessInfo?: string | null;
  /** Detailed notes block. */
  notes: string;
};

export async function captureLead(
  input: CrmLeadInput
): Promise<{ ok: boolean; clientId?: string }> {
  try {
    // The operator account (oldest user) owns the eprocurement CRM, mirroring
    // the GOIR consult flow.
    const operator = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
    if (!operator) return { ok: false };

    const biz = await prisma.business.findUnique({
      where: { userId_slug: { userId: operator.id, slug: "eprocurement" } },
      select: { id: true },
    });

    const name = input.contactName?.trim() || input.companyName;
    const email = input.email.trim().toLowerCase();

    const existing = await prisma.procurementClient.findFirst({
      where: { userId: operator.id, email },
      select: { id: true, notes: true },
    });

    if (existing) {
      await prisma.procurementClient.update({
        where: { id: existing.id },
        data: {
          notes: [existing.notes, `--- New request ${new Date().toISOString().slice(0, 10)} ---`, input.notes]
            .filter(Boolean)
            .join("\n"),
        },
      });
      return { ok: true, clientId: existing.id };
    }

    const created = await prisma.procurementClient.create({
      data: {
        userId: operator.id,
        businessId: biz?.id ?? null,
        name,
        company: input.companyName,
        email,
        phone: input.phone?.trim() || null,
        industry: input.industry ?? null,
        status: "LEAD",
        businessInfo: input.businessInfo ?? null,
        notes: input.notes,
      },
      select: { id: true },
    });
    return { ok: true, clientId: created.id };
  } catch {
    // Swallow: callers keep an email backstop so the lead is never lost.
    return { ok: false };
  }
}
