"use client";

import { createElement, type CSSProperties } from "react";
import Script from "next/script";

/**
 * Thin wrappers around the two vendored custom elements. Using createElement
 * with a string tag avoids augmenting the global JSX namespace (which is
 * fragile across React/Next versions) while still rendering the web component.
 */
export function IntelGlobe({ style, className }: { style?: CSSProperties; className?: string }) {
  return createElement("intel-globe", { style, class: className });
}

export function CoverageMap({ style, className }: { style?: CSSProperties; className?: string }) {
  return createElement("coverage-map", { style, class: className });
}

/**
 * Loads the intelligence-console runtime: d3 + topojson (self-hosted) and the
 * two custom elements (<intel-globe>, <coverage-map>). All four are vendored
 * under /public/intel so the console has no runtime CDN dependency. Mount this
 * once on any page that renders the globe or the coverage board.
 */
export function IntelScripts() {
  return (
    <>
      <Script src="/intel/d3.min.js" strategy="afterInteractive" />
      <Script src="/intel/topojson-client.min.js" strategy="afterInteractive" />
      <Script src="/intel/globe-v2.js" strategy="afterInteractive" />
      <Script src="/intel/coverage-map.js" strategy="afterInteractive" />
    </>
  );
}
