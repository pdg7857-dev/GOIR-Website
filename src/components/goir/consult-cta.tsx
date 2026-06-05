"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";

export function ConsultCta({ id, requested }: { id: string; requested: boolean }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(requested);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch(`/api/goir/${id}/consult`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          message: String(fd.get("message") ?? ""),
        }),
      });
      setDone(true);
    } catch {
      /* best-effort */
      setDone(true);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-success-soft/40 px-6 py-8 text-center ring-1 ring-success/30">
        <CheckCircle2 className="h-8 w-8 text-success" />
        <div className="text-lg font-semibold text-fg">You&apos;re on the list</div>
        <p className="max-w-md text-sm text-fg-muted">
          Thanks, we&apos;ll reach out to schedule your free Government Opportunity Intelligence
          Consultation and walk through your full analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {!open ? (
        <Button size="lg" onClick={() => setOpen(true)}>
          <CalendarCheck className="h-4 w-4" />
          Book a Strategy Session
        </Button>
      ) : (
        <form onSubmit={submit} className="mx-auto max-w-md space-y-3 text-left">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input name="name" placeholder="Your name" />
            <Input name="phone" placeholder="Phone (optional)" />
          </div>
          <Textarea name="message" placeholder="Anything specific you'd like to focus on? (optional)" />
          <Button type="submit" size="lg" disabled={pending} className="w-full">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
            {pending ? "Requesting…" : "Request my free consultation"}
          </Button>
        </form>
      )}
    </div>
  );
}
