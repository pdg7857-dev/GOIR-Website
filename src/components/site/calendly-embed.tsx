"use client";
import { useEffect, useRef } from "react";

/**
 * Calendly inline embed. Loads the Calendly widget script once and renders the
 * scheduling calendar inline. Styled to match the dark site by default; campaign
 * pages can pass their own palette and extra query params (prefill answers,
 * UTMs so bookings are attributed to the email that drove them).
 */
export function CalendlyEmbed({
  url,
  className = "",
  colors = { background: "101120", text: "e9e9ed", primary: "9184d9" },
  params,
  frameBorder = "color-mix(in srgb, var(--color-accent) 24%, transparent)",
  frameBackground = "var(--nz-page)",
  height = 680,
}: {
  url: string;
  className?: string;
  /** Hex without the leading #, which is what Calendly expects. */
  colors?: { background: string; text: string; primary: string };
  /** Extra query params: a1 (first custom answer), utm_source, utm_campaign, and so on. */
  params?: Record<string, string | undefined>;
  frameBorder?: string;
  frameBackground?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const q = new URLSearchParams({
    hide_gdpr_banner: "1",
    background_color: colors.background,
    text_color: colors.text,
    primary_color: colors.primary,
  });
  for (const [k, v] of Object.entries(params ?? {})) if (v) q.set(k, v);
  const src = `${url}?${q.toString()}`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ border: `1px solid ${frameBorder}`, borderRadius: 4, background: frameBackground }}
    >
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-url={src}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <noscript>
        <a href={url} className="block p-4 text-center underline" style={{ color: "var(--color-accent)" }}>
          Book a call with Phil Dave
        </a>
      </noscript>
    </div>
  );
}
