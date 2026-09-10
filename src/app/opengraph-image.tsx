import { ImageResponse } from "next/og";

/**
 * Default social preview card for the whole site. Every page inherits this
 * unless it defines its own, so a link pasted into LinkedIn, an email or a
 * message renders as a branded card instead of a bare text stub.
 *
 * Rendered by Satori at build time, so keep the markup to simple flexbox and
 * explicit styles. No external fonts or images.
 */
export const runtime = "nodejs";
export const alt =
  "Phil Dave, Government Opportunity Intelligence. Bid intelligence, not bid alerts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAGE = "#101120";
const ACCENT = "#9184d9";
const ACCENT_HI = "#e7e5fe";
const TEXT = "#e9e9ed";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAGE,
          padding: 72,
          border: `2px solid ${ACCENT}`,
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              border: `2px solid ${ACCENT}`,
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: TEXT, letterSpacing: 1 }}>PHIL DAVE</div>
            <div style={{ fontSize: 15, color: "#8e8fa3", letterSpacing: 4 }}>
              OPPORTUNITY INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              color: TEXT,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Bid intelligence, not bid alerts.
          </div>
          <div style={{ display: "flex", width: 120, height: 4, background: ACCENT, marginTop: 28 }} />
          <div style={{ fontSize: 27, color: "#a9aabb", marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
            I find, read and qualify the government contracts worth your time. Canada and the
            United States.
          </div>
        </div>

        {/* Footer strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, color: ACCENT_HI, letterSpacing: 2 }}>phildave.com</div>
          <div style={{ display: "flex", gap: 26, fontSize: 18, color: "#8e8fa3", letterSpacing: 2 }}>
            <div style={{ display: "flex" }}>18 PLATFORMS</div>
            <div style={{ display: "flex" }}>20 JURISDICTIONS</div>
            <div style={{ display: "flex" }}>CAN / USA</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
