import type { Metadata } from "next";
import { AccessGate } from "@/components/goir/access-gate";
import { KeyRound } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enter your access code, Government Opportunity Intelligence Report™",
  description: "Enter the access code I sent you to view your Government Opportunity Intelligence Report.",
  robots: { index: false, follow: false },
};

export default function AccessPage({ searchParams }: { searchParams: { code?: string } }) {
  return (
    <div className="goir-dark">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-bg-raised ring-1 ring-border text-accent">
          <KeyRound className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">View your report</h1>
        <p className="mt-2 mb-6 max-w-sm text-sm text-fg-muted">
          Enter the access code I sent you by call, email or text to open your
          Government Opportunity Intelligence Report™.
        </p>
        <AccessGate defaultCode={searchParams.code ?? ""} />
        <p className="mt-6 text-[11px] text-fg-subtle">
          Don&apos;t have a code yet? <a href="/report" className="text-accent hover:underline">Request your free report</a>.
        </p>
      </div>
    </div>
  );
}
