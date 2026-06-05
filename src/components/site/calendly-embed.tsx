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

  // Calendly brand params for a dark background.
  const src = `${url}?hide_gdpr_banner=1&background_color=0b1220&text_color=e8f1f5&primary_color=22d3ee`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-bg-panel ${className}`}>
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-url={src}
        style={{ minWidth: "320px", height: "680px" }}
      />
      <noscript>
        <a href={url} className="block p-4 text-center text-accent underline">
          Book a call with Phil Dave
        </a>
      </noscript>
    </div>
  );
}
