import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { GoirReportView } from "@/components/goir/report-view";
import { AccessGate } from "@/components/goir/access-gate";
import type { GoirResult, GoirNarrative } from "@/lib/goir/types";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

async function load(id: string) {
  try {
    return await prisma.goirReport.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Your Government Opportunity Intelligence Report™",
  robots: { index: false, follow: false },
};

export default async function GoirReportPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { code?: string };
}) {
  const report = await load(params.id);
  if (!report) notFound();

  const code = (searchParams.code ?? "").trim().toUpperCase();
  const unlocked = !!report.accessCode && code === report.accessCode.toUpperCase();

  if (!unlocked) {
    return (
      <div className="goir-dark">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-bg-raised ring-1 ring-border text-accent">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">This report is locked</h1>
          <p className="mt-2 mb-6 max-w-sm text-sm text-fg-muted">
            Enter the access code I sent you by call, email or text to view it.
          </p>
          <AccessGate defaultCode={code} />
        </div>
      </div>
    );
  }

  // Record first view (best-effort; never blocks rendering).
  if (!report.firstViewedAt) {
    prisma.goirReport
      .update({ where: { id: report.id }, data: { firstViewedAt: new Date(), status: "VIEWED" } })
      .catch(() => {});
  }

  const result = report.result as unknown as GoirResult;
  if (result && !result.companyName) result.companyName = report.companyName;
  const narrative = (report.narrative as unknown as GoirNarrative) ?? null;

  return (
    <div className="goir-dark">
      <GoirReportView id={report.id} result={result} narrative={narrative} requested={report.consultationRequested} />
      <div className="mx-auto max-w-5xl px-4 pb-10 lg:px-6 text-center">
        <Link href="/report" className="text-xs text-fg-subtle hover:text-accent">← Request another report</Link>
      </div>
    </div>
  );
}
