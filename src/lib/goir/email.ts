// Email templates for the GOIR.
import type { GoirResult } from "./types";

const usd = (c: number) => "$" + Math.round(c / 100).toLocaleString("en-US");

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// Sent immediately after a prospect submits the intake form. The report is
// prepared and delivered manually with an access code within 24 hours.
export function goirReceivedEmail(companyName: string, brand = "Phil Dave") {
  const subject = "We've received your Government Opportunity Intelligence Report™ request";
  const html = `<!doctype html><html><body style="margin:0;background:#070b10;font-family:ui-sans-serif,system-ui,'Segoe UI',sans-serif">
  <div style="max-width:540px;margin:0 auto;padding:32px 20px;color:#e8f1f5">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5c6b78">Government Opportunity Intelligence Report™</div>
    <h1 style="margin:10px 0 0;font-size:22px">Request received</h1>
    <p style="color:#9aa7b2;line-height:1.6;margin-top:14px">Thanks for requesting your Government Opportunity Intelligence Report for <strong style="color:#e8f1f5">${esc(companyName)}</strong>.</p>
    <p style="color:#9aa7b2;line-height:1.6">${esc(brand)} personally prepares each report. Within <strong style="color:#e8f1f5">24 hours</strong> you'll get a call, email or text with your private <strong style="color:#22d3ee">access code</strong> to view it.</p>
    <p style="color:#5c6b78;font-size:12px;line-height:1.6;margin-top:20px">No account needed, just the access code. Talk soon.</p>
  </div></body></html>`;
  const text = `Request received.

Thanks for requesting your Government Opportunity Intelligence Report™ for ${companyName}.

${brand} personally prepares each report. Within 24 hours you'll get a call, email or text with your private access code to view it. No account needed.`;
  return { subject, html, text };
}

export function goirEmail(result: GoirResult, url: string) {
  const subject = `Your Government Opportunity Intelligence Report™, ${result.index}/100 (${result.tier})`;

  const savings = usd(result.waste.potentialAnnualSavingsCents);
  const rows = result.categories
    .map(
      (c) =>
        `<tr><td style="padding:4px 0;color:#9aa7b2;font-size:13px">${c.label}</td><td style="padding:4px 0;text-align:right;color:#e8f1f5;font-family:ui-monospace,monospace;font-size:13px">${c.score}/100</td></tr>`
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#070b10;font-family:ui-sans-serif,system-ui,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5c6b78">Government Opportunity Intelligence Report™</div>
      <h1 style="margin:8px 0 0;color:#e8f1f5;font-size:22px">${escapeHtml(result.companyName)}</h1>
      <div style="color:#5c6b78;font-size:13px">${escapeHtml(result.industryLabel)} · ${escapeHtml(result.regionLabel)}</div>
    </div>
    <div style="background:#0d141c;border:1px solid #1c2733;border-radius:16px;padding:24px;text-align:center">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#5c6b78">Your Intelligence Index™</div>
      <div style="font-size:52px;font-weight:700;color:#22d3ee;font-family:ui-monospace,monospace;line-height:1.1;margin-top:6px">${result.index}<span style="font-size:18px;color:#5c6b78">/100</span></div>
      <div style="color:#22d3ee;font-weight:600;font-size:15px">${result.tier} · Top ${result.percentile}%</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:20px 0">${rows}</table>
    <div style="background:#0d141c;border:1px solid #1c2733;border-radius:12px;padding:16px;margin-bottom:20px">
      <div style="color:#9aa7b2;font-size:13px">Estimated recoverable opportunity waste</div>
      <div style="color:#34d399;font-size:24px;font-weight:700;margin-top:2px">${savings}/yr</div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <a href="${url}" style="display:inline-block;background:#22d3ee;color:#070b10;font-weight:600;text-decoration:none;padding:13px 28px;border-radius:10px;font-size:15px">View your full report →</a>
    </div>
    <p style="color:#5c6b78;font-size:12px;text-align:center;line-height:1.6">Your full report includes opportunity-waste analysis, platform coverage, buyer & award intelligence, renewal windows, industry benchmarking and a prioritized action plan.<br><br>
    <a href="${url}" style="color:#5c6b78">${url}</a></p>
  </div></body></html>`;

  const text = `Your Government Opportunity Intelligence Report™ for ${result.companyName}

Intelligence Index™: ${result.index}/100 (${result.tier}) · Top ${result.percentile}%
Estimated recoverable opportunity waste: ${savings}/yr

View your full report: ${url}`;

  return { subject, html, text };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
