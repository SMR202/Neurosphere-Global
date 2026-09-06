import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return origin
    ? ["", "/research", "/datasets", "/projects", "/team", "/contact"].map(
        (path) => ({ url: `${origin}${path}` }),
      )
    : [];
}
