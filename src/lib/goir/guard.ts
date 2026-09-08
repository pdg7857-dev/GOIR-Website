import { NextResponse } from "next/server";
import { GOIR_ENABLED } from "@/lib/site/config";

/**
 * The GOIR lead magnet is switched off via NEXT_PUBLIC_GOIR_ENABLED. The flag
 * used to be checked only in the UI, which left every /api/goir endpoint live
 * and unauthenticated in production: one of them runs a paid model completion
 * and writes to the shared CRM database on an anonymous POST.
 *
 * Every GOIR route calls this first, so the whole surface disappears (404)
 * whenever the feature is off. Returns null when the feature is enabled.
 */
export function goirOffResponse() {
  if (GOIR_ENABLED) return null;
  return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
}
