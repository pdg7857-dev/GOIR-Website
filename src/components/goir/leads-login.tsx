"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2 } from "lucide-react";

export function LeadsLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/leads/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Login failed.");
        setPending(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="goir-dark">
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4 py-16 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-bg-raised ring-1 ring-border text-accent">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">GOIR Leads</h1>
        <p className="mt-2 mb-6 text-sm text-fg-muted">Operator access only.</p>
        {configured ? (
          <form onSubmit={submit} className="w-full space-y-3">
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            {error && <div className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger ring-1 ring-danger/30">{error}</div>}
            <Button type="submit" size="lg" disabled={pending || !pw} className="w-full">
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {pending ? "Checking…" : "Sign in"}
            </Button>
          </form>
        ) : (
          <p className="rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn ring-1 ring-warn/30">
            Set <code>LEADS_PASSWORD</code> in the environment to enable this dashboard.
          </p>
        )}
      </div>
    </div>
  );
}
