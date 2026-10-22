import type { Metadata } from "next";
import { Home } from "@/components/site/home";
import { pageCopy } from "@/content/client";
import { siteOrigin } from "@/lib/metadata";
export const metadata: Metadata = {
  title: { absolute: pageCopy["/"].title },
  description: pageCopy["/"].description,
  ...(siteOrigin() ? { alternates: { canonical: siteOrigin() + "/" } } : {}),
};
export default function HomePage() {
  return <Home locale="en" />;
}
