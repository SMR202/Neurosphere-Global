import type { Metadata } from "next";
export function siteOrigin() {
  const raw = process.env.SITE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const origin = siteOrigin();
  return {
    title,
    description,
    ...(origin ? { alternates: { canonical: `${origin}${path}` } } : {}),
    openGraph: {
      title: `${title} | NeuroSphere Global`,
      description,
      type: "website",
      ...(origin ? { url: `${origin}${path}` } : {}),
    },
  };
}
