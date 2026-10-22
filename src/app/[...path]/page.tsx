import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPageInfo, insights } from "@/content/client";
import { routeLocale, localHref } from "@/lib/locale";
import { siteOrigin } from "@/lib/metadata";
import { PageContent } from "@/components/site/pages";
import { deliveryConfiguration } from "@/lib/enquiry-delivery";
type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = "/" + ((await params).path ?? []).join("/");
  const { path, locale } = routeLocale(raw);
  const info = getPageInfo(path);
  const article = /^\/insights\/([1-6])$/.exec(path);
  const title =
    info?.title ??
    (article
      ? `${insights[Number(article[1]) - 1]} | NeuroSphere`
      : "Page not found | NeuroSphere");
  const description =
    info?.description ?? "This page is not available. It may be opening soon.";
  const origin = siteOrigin();
  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website" },
    ...(origin
      ? {
          alternates: {
            canonical: origin + localHref(path, locale),
            languages: {
              en: origin + path,
              ur: origin + localHref(path, "ur"),
            },
          },
        }
      : {}),
  };
}
export default async function WebsitePage({ params, searchParams }: Props) {
  const raw = "/" + ((await params).path ?? []).join("/");
  const { path, locale } = routeLocale(raw);
  const legacy: Record<string, string> = {
    "/team": "/people",
    "/resources": "/research/resources",
  };
  if (legacy[path]) redirect(localHref(legacy[path], locale));
  const queryRaw = await searchParams;
  if (path === "/research" && typeof queryRaw.domain === "string") {
    redirect(
      localHref(
        `/research/resources?domain=${encodeURIComponent(queryRaw.domain)}`,
        locale,
      ),
    );
  }
  const query = Object.fromEntries(
    Object.entries(queryRaw)
      .filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      )
      .map(([key, value]) => [key, value.slice(0, 300)]),
  );
  return (
    <PageContent
      path={path}
      locale={locale}
      deliveryEnabled={!!deliveryConfiguration()}
      query={query}
    />
  );
}
