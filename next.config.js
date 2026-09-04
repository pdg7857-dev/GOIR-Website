/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // frame-ancestors is the modern equivalent of X-Frame-Options. A full
          // CSP is deliberately not set here: the Calendly embed and the
          // analytics scripts would need an allowlist worked out first.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      {
        // Vendored console runtime is immutable, cache it hard.
        source: "/intel/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Old nested platform pages now live at flat /{slug}-expert URLs.
      { source: "/platforms/:slug", destination: "/:slug-expert", permanent: true },
      // Industry pages moved to flat /{slug}-government-contracts. The facilities
      // page uses a shorter slug, so it is handled before the generic rule.
      {
        source: "/industries/facilities-maintenance",
        destination: "/facilities-government-contracts",
        permanent: true,
      },
      { source: "/industries/:slug", destination: "/:slug-government-contracts", permanent: true },
      // Consolidated tool + statistics URLs.
      { source: "/statistics", destination: "/government-procurement-statistics", permanent: true },
      // Coupa is no longer covered; send its old URLs to the relevant hubs.
      { source: "/coupa-expert", destination: "/platforms", permanent: true },
      { source: "/blog/coupa-supplier-guide", destination: "/blog", permanent: true },
      {
        source: "/tools/opportunity-cost-calculator",
        destination: "/opportunity-waste-calculator",
        permanent: true,
      },
      // Pricing is no longer published. Send it to the free-opportunities lead tool.
      { source: "/pricing", destination: "/free-opportunities", permanent: false },
    ];
  },
};

module.exports = nextConfig;
