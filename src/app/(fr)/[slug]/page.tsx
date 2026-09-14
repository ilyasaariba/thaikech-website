import type { Metadata } from "next";
import { topLevelSlugParams } from "@/content/routes";
import TopLevelPage, { topLevelMetadata } from "@/views/TopLevelPage";

type Props = { params: Promise<{ slug: string }> };

// Treatment and area pages. Only the slugs generated here exist; any other
// value is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return topLevelSlugParams("fr");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return topLevelMetadata((await params).slug, "fr");
}

export default async function Page({ params }: Props) {
  return <TopLevelPage slug={(await params).slug} locale="fr" />;
}
