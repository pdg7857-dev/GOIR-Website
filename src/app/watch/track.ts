"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * One call fans out to whichever analytics are live. Vercel custom events need
 * a paid plan and Clarity needs NEXT_PUBLIC_CLARITY_ID; when either is missing
 * the call is a no-op, so the page never depends on analytics being configured.
 *
 * Events: video_play, video_25, video_50, video_75, video_complete,
 * cta_click (with where), booked.
 */
type Props = Record<string, string | number | boolean | null>;

export function track(event: string, props?: Props) {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the page */
  }
  try {
    const w = window as unknown as { clarity?: (...args: unknown[]) => void };
    w.clarity?.("event", event);
  } catch {
    /* ignore */
  }
}
