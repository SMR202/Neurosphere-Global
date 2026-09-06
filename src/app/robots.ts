import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules: {
      userAgent: "*",
      ...(origin ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
