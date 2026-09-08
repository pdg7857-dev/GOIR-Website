"use client";
import { useEffect, useRef } from "react";

/**
 * Calendly inline embed. Loads the Calendly widget script once and renders the
 * scheduling calendar inline. Styled to match the dark site.
 */
export function CalendlyEmbed({ url, className = "" }: { url: string; className?: string }) {
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

  // Calendly brand params for the Nocturne intelligence-console palette.
  const src = `${url}?hide_gdpr_banner=1&background_color=101120&text_color=e9e9ed&primary_color=9184d9`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ border: "1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)", borderRadius: 4, background: "var(--nz-page)" }}
    >
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-url={src}
        style={{ minWidth: "320px", height: "680px" }}
      />
      <noscript>
        <a href={url} className="block p-4 text-center underline" style={{ color: "var(--color-accent)" }}>
          Book a call with Phil Dave
        </a>
      </noscript>
    </div>
  );
}
