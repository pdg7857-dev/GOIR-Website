"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2, ArrowRight } from "lucide-react";

export function AccessGate({ defaultCode = "" }: { defaultCode?: string }) {
  const router = useRouter();
  const [code, setCode] = useState(defaultCode);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/goir/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Couldn't verify that code.");
        setPending(false);
        return;
      }
      router.push(`/report/${json.id}?code=${encodeURIComponent(json.code)}`);
    } catch {
      setError("Network error. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-sm space-y-3">
      <div className="relative">
        <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="GOIR-XXXXXX"
          autoFocus
          className="pl-9 text-center font-mono tracking-widest uppercase"
        />
      </div>
      {error && <div className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger ring-1 ring-danger/30">{error}</div>}
      <Button type="submit" size="lg" disabled={pending || code.trim().length < 3} className="w-full">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {pending ? "Verifying…" : "View my report"}
      </Button>
    </form>
  );
}
