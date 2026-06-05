/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

module.exports = nextConfig;
