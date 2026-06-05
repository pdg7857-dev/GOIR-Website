import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site/config";

/**
 * Allow all crawlers across the whole site and point them at the sitemap.
 * The site is a public marketing property, so there is nothing to disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
