import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { businessNode, faqNode, jsonLdGraph, pageMetadata, websiteNode } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import OccasionsSection from "@/components/home/OccasionsSection";
import ConceptSection from "@/components/home/ConceptSection";
import CommitmentsSection from "@/components/home/CommitmentsSection";
import ZonesSection from "@/components/home/ZonesSection";
import GuidesSection from "@/components/home/GuidesSection";
import FaqSection from "@/components/home/FaqSection";

export function homeMetadata(locale: Locale): Metadata {
  const home = getPages(locale).home;
  return pageMetadata({
    locale,
    key: "home",
    title: home.metaTitle,
    description: home.metaDescription,
    absoluteTitle: true,
  });
}

export default function HomeView({ locale }: { locale: Locale }) {
  const home = getPages(locale).home;

  return (
    <PageShell locale={locale} pageKey="home" overlayHeader>
      <JsonLd data={jsonLdGraph(businessNode(locale, { withCatalog: true }), websiteNode(), faqNode(home.faq.items))} />
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
      <OccasionsSection locale={locale} />
      <ConceptSection locale={locale} />
      <CommitmentsSection locale={locale} />
      <ZonesSection locale={locale} />
      <GuidesSection locale={locale} />
      <FaqSection locale={locale} />
    </PageShell>
  );
}
