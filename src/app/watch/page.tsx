import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import { SITE } from "@/lib/site/config";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { WatchPlayer } from "./watch-player";
import { WatchSticky, BookingListener, TrackedCta } from "./watch-sticky";
import "./watch.css";

/**
 * /watch: the email campaign landing page.
 *
 * One goal, booking a call. No site navigation (see ChromeGate), not indexed,
 * not in the sitemap. Built around the narrated explainer, in the video's own
 * navy and gold so nothing changes between the email click and the first frame.
 *
 * Personalisation comes from the link the email tool merges:
 *   /watch?c=Acme%20Paving&t=paving&utm_source=email&utm_campaign=oct_wave1
 *   c  company name, shown in the eyebrow and prefilled into the booking note
 *   t  trade, worked into the subhead and the booking note
 *   utm_*  passed through to Calendly so every booking is attributed
 * All of it is optional; the page reads naturally without any of it.
 */

const sans = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--wl-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--wl-serif", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Stop searching. Start bidding. | Phil Dave" },
  description:
    "A two minute look at where your bid time goes, and how I find, read and qualify the government contracts worth winning across Canada and the United States.",
  robots: { index: false, follow: false },
  alternates: { canonical: SITE.domain + "/watch" },
  openGraph: {
    title: "How many bids did you open this week just to find out they weren't a match?",
    description: "A two minute explainer from Phil Dave, Government Opportunity Intelligence.",
    url: SITE.domain + "/watch",
    siteName: SITE.brandFull,
    type: "video.other",
    images: [{ url: "/watch/bid-match-v1-og.jpg", width: 1200, height: 630 }],
  },
};

type SP = Record<string, string | string[] | undefined>;

/** Display text from a URL param: letters, numbers and ordinary punctuation only, capped. */
function cleanText(v: SP[string], max = 60): string | null {
  const s = (Array.isArray(v) ? v[0] : v) ?? "";
  const out = s
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} &.,'’()/+-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
  return out || null;
}

/** UTM values: identifier characters only. */
function cleanUtm(v: SP[string]): string | undefined {
  const s = (Array.isArray(v) ? v[0] : v) ?? "";
  const out = s.replace(/[^\w.\- ]/g, "").trim().slice(0, 100);
  return out || undefined;
}

const BOOK = "#book";

const STEPS = [
  {
    n: "01",
    t: "Monitor",
    b: "I watch 18+ platforms across Canada and the US: federal, provincial, state, municipal, health and education. Every amendment tracked, every deadline watched.",
  },
  {
    n: "02",
    t: "Read",
    b: "I open the documents so you do not have to: the scope, the mandatory requirements, the site visit, the bonding, the detail buried on page 47.",
  },
  {
    n: "03",
    t: "Qualify",
    b: "I check every opportunity against your trades, your capacity, your coverage area and your deadlines. You only see what fits.",
  },
];

const FAQS = [
  {
    q: "Do you write or submit the bid?",
    a: "No. I am not a bid writer and I do not submit anything on your behalf. I find, read and qualify the opportunities. Pricing and proposals stay with your team, where they belong.",
  },
  {
    q: "How is this different from the alerts I already get?",
    a: "Alerts fire on keywords and qualify nothing. I read the documents, judge the fit against your trades and capacity, and send you a short list with a verdict, not an inbox you still have to sort.",
  },
  {
    q: "What happens on the call?",
    a: "Fifteen minutes. You tell me your trades, your crew and where you bid. I tell you honestly whether I can find you enough work to be worth it, and what your coverage would look like. No obligation.",
  },
  {
    q: "How is it priced?",
    a: "Coverage is set by your industry and the access you need, so I price it on the call once I know what you actually bid. There is no per opportunity charge.",
  },
  {
    q: "Do you guarantee I will win contracts?",
    a: "No one honestly can. What I guarantee is a minimum number of qualified opportunities, agreed with you in writing before you pay. Winning them is your team's work, and the reason I hand them over already read is so your team has the time to do it.",
  },
];

export default function WatchPage({ searchParams }: { searchParams: SP }) {
  const company = cleanText(searchParams.c);
  const trade = cleanText(searchParams.t, 40);

  // Prefills Calendly's one custom question so the booking arrives with context.
  const note = [company && `Company: ${company}.`, trade && `Trade: ${trade}.`].filter(Boolean).join(" ");
  const calendlyParams = {
    a1: note || undefined,
    utm_source: cleanUtm(searchParams.utm_source),
    utm_medium: cleanUtm(searchParams.utm_medium),
    utm_campaign: cleanUtm(searchParams.utm_campaign),
    utm_content: cleanUtm(searchParams.utm_content),
    utm_term: cleanUtm(searchParams.utm_term),
  };

  return (
    <div className={`wl ${sans.variable} ${serif.variable}`}>
      <BookingListener />

      <div className="wl-wrap">
        <header className="wl-top">
          <span className="wl-mark">
            <b>PHIL DAVE</b>
            <span>Government Opportunity Intelligence</span>
          </span>
          <TrackedCta href={BOOK} where="topbar" className="wl-btn wl-btn-ghost wl-btn-sm">
            Book a call
          </TrackedCta>
        </header>

        {/* Hero: the video's opening line, word for word, so email, page and first frame all match. */}
        <section className="wl-hero">
          <p className="wl-eyebrow">{company ? `For ${company}` : "A two minute watch"}</p>
          <h1 className="wl-h1">
            How many bids did you open this week just to find out they{" "}
            <span className="wl-em">weren&rsquo;t a match?</span>
          </h1>
          <p className="wl-sub">
            {trade
              ? `Watch how I find the ${trade} bids worth winning, so your team stops opening the ones that never were.`
              : "Watch how I find the bids worth winning, so your team stops opening the ones that never were."}
          </p>

          <div id="watch-video">
            <WatchPlayer bookHref={BOOK} />
          </div>

          <div className="wl-cta-row">
            <TrackedCta href={BOOK} where="hero" className="wl-btn wl-btn-gold">
              Book a 15 minute call
            </TrackedCta>
            <span className="wl-cta-note">On your schedule. Bring your trades and where you bid.</span>
          </div>
        </section>
      </div>

      {/* How it works */}
      <section className="wl-section">
        <div className="wl-wrap">
          <p className="wl-eyebrow">How it works</p>
          <h2 className="wl-h2">
            I monitor. I read. <span className="wl-em">I qualify.</span>
          </h2>
          <p className="wl-lede">{SITE.promise}</p>
          <div className="wl-grid3">
            {STEPS.map((s) => (
              <div key={s.n} className="wl-step">
                <span className="wl-step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What lands with you */}
      <section className="wl-section">
        <div className="wl-wrap">
          <p className="wl-eyebrow">What you get</p>
          <h2 className="wl-h2">
            Every opportunity, <span className="wl-em">already read.</span>
          </h2>
          <div className="wl-split">
            <div className="wl-checks">
              {[
                "A plain language summary of what the buyer actually wants",
                "Why it fits your trades, your capacity and your region",
                "Closing date, site visit and mandatory requirements up front",
                "A link to the source posting, so the bid or pass call stays yours",
              ].map((c) => (
                <p key={c} className="wl-check">
                  <i aria-hidden />
                  <span>{c}</span>
                </p>
              ))}
            </div>
            <div className="wl-opp" aria-label="Illustrative example of a qualified opportunity">
              <span className="wl-opp-tag">Qualified opportunity</span>
              <h3>Janitorial Services, Regional Offices</h3>
              <dl>
                <dt>Why it fits</dt>
                <dd>Matches your trade, crew size and service area</dd>
                <dt>Closes</dt>
                <dd>November 14, 2:00 PM</dd>
                <dt>Site visit</dt>
                <dd>Optional, October 28</dd>
                <dt>Mandatory</dt>
                <dd>Liability insurance, safety clearance</dd>
                <dt>Summary</dt>
                <dd>Nightly cleaning of 3 buildings, three year term</dd>
                <dt>Source</dt>
                <dd>
                  <span style={{ color: "#1d4ed8", textDecoration: "underline" }}>View the original posting</span>
                </dd>
              </dl>
              <p className="wl-opp-note">Illustrative example. Real opportunities arrive in exactly this format.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who does the reading */}
      <section className="wl-section">
        <div className="wl-wrap">
          <p className="wl-eyebrow">Who does the reading</p>
          <h2 className="wl-h2">Three and a half years inside the eprocurement industry.</h2>
          <div className="wl-stats">
            <div className="wl-stat">
              <b>17,500+</b>
              <span>contractor accounts handled across Canada and the US</span>
            </div>
            <div className="wl-stat">
              <b>18+</b>
              <span>platforms monitored for clients today</span>
            </div>
          </div>
          <p className="wl-quote">
            I saw where contractors lose bids: not at the proposal, <em>at the search.</em>
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="wl-section">
        <div className="wl-wrap">
          <div className="wl-guarantee">
            <p className="wl-eyebrow">The guarantee</p>
            <h2 className="wl-h2">A contract opportunity guarantee, set to your industry.</h2>
            <p className="wl-lede">
              Every term carries a guaranteed minimum of qualified opportunities. I set that number with
              you before you pay, because no two industries see the same market. If I do not reach it, I
              keep working at no charge until I do.
            </p>
            <ul>
              <li>The number is agreed with you up front, in writing</li>
              <li>Every opportunity delivered with a verdict and a link to the source bid</li>
              <li>Miss the number and the work continues free until it is met</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wl-section">
        <div className="wl-wrap">
          <p className="wl-eyebrow">Questions</p>
          <h2 className="wl-h2">Before you book.</h2>
          <div className="wl-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Booking: inline, so nobody leaves the page to schedule. */}
      <section id="book" className="wl-book">
        <div className="wl-wrap">
          <div className="wl-book-head">
            <p className="wl-eyebrow">Book a call</p>
            <h2 className="wl-h2">
              Stop searching. <span className="wl-em">Start bidding.</span>
            </h2>
            <p className="wl-lede">
              Pick a time that works for you. Fifteen minutes, and you will know whether this is a fit.
            </p>
          </div>
          <div className="wl-cal">
            <CalendlyEmbed
              url={SITE.calendlyUrl}
              colors={{ background: "0b1734", text: "ffffff", primary: "d4ac54" }}
              params={calendlyParams}
              frameBorder="rgba(212, 172, 84, 0.35)"
              frameBackground="#0b1734"
              height={720}
            />
          </div>
        </div>
      </section>

      <footer className="wl-foot">
        <div className="wl-wrap">
          <div className="wl-foot-row">
            <span>© 2026 {SITE.brand} · {SITE.tagline}</span>
            <span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href="/privacy">Privacy</a> ·{" "}
              <a href="/terms">Terms</a>
            </span>
          </div>
          <p>I find and qualify opportunities. I do not write or submit proposals, and I do not guarantee contract awards.</p>
        </div>
      </footer>

      <WatchSticky bookHref={BOOK} />
    </div>
  );
}
