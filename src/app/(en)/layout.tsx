import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import SiteDocument from "@/components/site/SiteDocument";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("en");

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
