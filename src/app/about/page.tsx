import Link from "next/link";
import { platformPath, industryPath } from "@/lib/site/links";
import type { Metadata } from "next";
import {
  Eye,
  Search,
  FileText,
  Filter,
  Bell,
  Building2,
  ArrowRight,
} from "lucide-react";
import { FEATURED_PLATFORMS, PLATFORMS } from "@/lib/site/platforms";
import { PRIMARY_INDUSTRIES } from "@/lib/site/industries";
import {
  Breadcrumbs,
  CtaBand,
  Section,
  SectionHead,
  FeatureCard,
  StatStrip,
  Pill,
} from "@/components/site/ui";
import { SITE } from "@/lib/site/config";
import {
  pageMeta,
  JsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "About Phil Dave",
  description:
    "I am Phil Dave. I find, read and qualify government contract opportunities across Canada and the U.S. so you bid the work worth winning instead of searching procurement portals all day.",
  path: "/about",
  keywords: [
    "government opportunity intelligence",
    "government bid discovery expert",
    "merx bidnet canadabuys sam.gov expert",
    "procurement opportunity monitoring",
  ],
});

export default function AboutPage() {
  const others = PLATFORMS.filter((p) => p.priority !== 1);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          organizationJsonLd(),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">About</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              I find the government work worth bidding. You go win it.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              I am Phil Dave. I have worked in government procurement since {SITE.sectorSince}, and I spend
              my days inside the platforms where governments post their work, learning how each one
              really behaves. I monitor them, read the documents, and qualify the fit, so the
              opportunities that land on your desk are the ones actually worth your estimator's time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">
                Book a discovery call
              </Link>
              <Link
                href={SITE.sampleUrl}
                className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg"
              >
                Request a sample opportunity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who Phil is / what he does */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Who I am</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">
              An opportunity intelligence practice, run by one person who knows it cold
            </h2>
            <div className="prose-site mt-5 max-w-none">
              <p>
                Government work does not have a single front door. The same buyer might post on a
                national aggregator one week and a tiny municipal portal the next, under a title that
                looks nothing like the trade you actually do. Most contractors handle this by
                assigning someone to check a handful of sites on a loop, hoping nothing slips
                through. Plenty slips through.
              </p>
              <p>
                That is the problem I built my practice around. I am not a bid writer, a proposal
                shop, or a procurement consultant who sits in on your strategy meetings. I do one
                thing, and I do it better than a generalist ever could: I discover the opportunities
                that fit you, read the documents so you do not have to, and tell you which ones are
                worth chasing. You prepare and submit the bid. That line stays bright on purpose.
              </p>
              <p>
                Before going independent, I spent years in government-procurement sales and account
                management, working directly with Canadian and U.S. businesses to get set up and win
                public work. That is the experience I bring to your account now.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FeatureCard icon={Search} title="I discover">
              Across every platform your buyers use, including the obscure agency portals a keyword
              alert never reaches.
            </FeatureCard>
            <FeatureCard icon={FileText} title="I read">
              The full solicitation, the addenda, the buried site-visit dates and the fine print
              that decides whether you can even bid.
            </FeatureCard>
            <FeatureCard icon={Filter} title="I qualify">
              Against your trade, your geography and your capacity, so you only see opportunities
              that actually fit your shop.
            </FeatureCard>
            <FeatureCard icon={Bell} title="I alert">
              Before the window closes, with the context you need to make a fast go or no-go call.
            </FeatureCard>
          </div>
        </div>
      </Section>

      {/* Social proof */}
      <Section muted>
        <SectionHead
          center
          eyebrow="The work, in numbers"
          title="What this practice covers"
          lede="These figures are maintained as the practice grows. They are kept honest rather than padded."
        />
        <div className="mt-10">
          <StatStrip />
        </div>
      </Section>

      {/* Philosophy */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">The philosophy</p>
          <h2 className="mt-3 text-3xl font-semibold text-fg sm:text-4xl">
            Platforms show everything. I show what matters.
          </h2>
          <div className="prose-site mt-6 max-w-none">
            <p>
              A procurement portal is built to be complete, not useful. It will happily show you
              every notice in the system, which means it shows you thousands of opportunities that
              have nothing to do with your business. Completeness is not the same as clarity. The
              flood of results is exactly why good bids get missed: the one that fits you is sitting
              on page nine, under a title you would never search for.
            </p>
            <p>
              My job is the opposite of the platform's. I am not trying to show you everything. I am
              trying to show you the handful of things that deserve a decision. That is the whole
              discipline: turning noise into a short, qualified list you can act on the same day.
            </p>
            <p>
              <strong>
                If you are still manually searching procurement portals, you are doing work I have
                already mastered.
              </strong>{" "}
              Not work you should keep paying a person to repeat. The hours your team spends
              refreshing search pages are hours they are not spending on the bids worth pursuing.
            </p>
          </div>
        </div>
      </Section>

      {/* How he works */}
      <Section muted>
        <SectionHead
          eyebrow="How I work"
          title="Quietly, in the background, with a real person reading"
          lede="No dashboards to learn, no software to log into. You tell me what you chase. I do the watching and the reading, and I bring you the short list."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Step one</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">I map your fit</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              On a short call, you tell me your trades, your jurisdictions, your bonding and your
              capacity. I translate that into how buyers actually describe the work, codes included.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Step two</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">I watch and read</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Every platform that serves your area, every day. When something fits, I open the
              documents and check the parts that decide whether a bid is even possible for you.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Step three</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">You get the short list</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Qualified opportunities, with the context that matters and time left on the clock.
              You make the go or no-go call. You prepare and submit. I keep watching.
            </p>
          </div>
        </div>
      </Section>

      {/* Platforms he knows */}
      <Section>
        <SectionHead
          eyebrow="What I know cold"
          title="The platforms and ecosystems I live in"
          lede="The big four are where most of the work runs. The rest are the agency-specific portals and intelligence systems that a keyword alert quietly misses."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PLATFORMS.map((p) => (
            <Link
              key={p.slug}
              href={platformPath(p.slug)}
              className="card group flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-fg group-hover:text-accent">
                  {p.name}
                </h3>
                <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold text-warn">
                  Cornerstone
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{p.oneLiner}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {p.shortName} guide{" "}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-fg-muted">Plus the rest of the ecosystem:</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {others.map((p) => (
              <Pill key={p.slug}>{p.name}</Pill>
            ))}
          </div>
          <Link
            href="/platforms"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent"
          >
            See how I read every one of them{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Who he helps */}
      <Section muted>
        <SectionHead
          eyebrow="Who I help"
          title="Contractors who are good at the work, not at the watching"
          lede="If your shop wins when it gets in front of the right opportunity in time, you are who I am for. The trades below are where I spend the most time."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={industryPath(ind.slug)}
              className="card group flex items-start gap-3 p-5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-fg group-hover:text-accent">{ind.name}</h3>
                <p className="mt-1 text-sm leading-6 text-fg-muted">{ind.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-fg-muted">
          Not on this list? I cover more trades than I can fit here.{" "}
          <Link href="/industries" className="font-medium text-accent hover:text-accent">
            See every industry I serve
          </Link>
          .
        </p>
      </Section>

      {/* Personal closing */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-accent">
            <Eye className="h-5 w-5" />
            <p className="eyebrow">Why I do this</p>
          </div>
          <div className="prose-site mt-5 max-w-none">
            <p>
              I got into this because I kept watching capable companies lose work they never knew
              existed. Not because their bid was weak, but because they never saw the notice in
              time, or it was filed under a title they would never have searched. That is a quiet,
              expensive way to lose, and it is entirely avoidable.
            </p>
            <p>
              So I made the watching my job. When you work with me, you get one person who knows
              your trade, knows the platforms, and reads every word, not a tool that buries you in
              alerts. I read every message that comes in and I answer it myself. That is the way I
              like to work, and I think it is the reason it works.
            </p>
            <p>
              If you are tired of refreshing portals and wondering what you are missing, let me show
              you. I will bring real opportunities in your jurisdictions to our first call, before
              you have paid me a cent.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={SITE.bookingUrl} className="btn-primary px-5 py-3">
              Book a discovery call
            </Link>
            <Link href="/how-it-works" className="btn-ghost px-5 py-3">
              See how it works
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
