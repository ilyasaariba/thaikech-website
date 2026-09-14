import type { Metadata } from "next";
import { guideSlugParams } from "@/content/routes";
import GuideView, { guideMetadata } from "@/views/GuideView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guideSlugParams("fr");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return guideMetadata((await params).slug, "fr");
}

export default async function Page({ params }: Props) {
  return <GuideView slug={(await params).slug} locale="fr" />;
}
