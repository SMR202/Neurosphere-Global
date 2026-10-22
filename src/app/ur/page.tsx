import type { Metadata } from "next";
import { Home } from "@/components/site/home";
import { pageCopy } from "@/content/client";
export const metadata: Metadata = {
  title: { absolute: pageCopy["/"].title },
  description: pageCopy["/"].description,
};
export default function UrduHomePage() {
  return <Home locale="ur" />;
}
