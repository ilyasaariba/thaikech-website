import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { getPages } from "@/content/pages";
import { getGuides } from "@/content/guides";
import { pathFor } from "@/content/routes";
import { absoluteUrl, breadcrumbNode, businessNode, jsonLdGraph, pageMetadata } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideCard from "@/components/page/GuideCard";
import BookingSection from "@/components/page/BookingSection";

export function guidesIndexMetadata(locale: Locale): Metadata {
  const copy = getPages(locale).guidesIndex;
  return pageMetadata({ locale, key: "guides", title: copy.metaTitle, description: copy.metaDescription });
}

export default function GuidesIndexView({ locale }: { locale: Locale }) {
  const ui = UI[locale];
  const copy = getPages(locale).guidesIndex;
  const guides = getGuides(locale);
  const path = pathFor("guides", locale);
  const crumbs = [
    { name: ui.common.home, href: pathFor("home", locale) },
    { name: ui.nav.guides, href: path },
  ];

  return (
    <PageShell locale={locale} pageKey="guides">
      <JsonLd
        data={jsonLdGraph(businessNode(locale), breadcrumbNode(crumbs), {
          "@type": "ItemList",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: absoluteUrl(pathFor(`guide:${guide.id}`, locale)),
          })),
        })}
      />

      <section className="bg-bamboo-dark text-white pt-28 sm:pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} label={ui.common.breadcrumb} />
          <p className="mt-6 text-gold text-xs tracking-[0.3em] uppercase font-medium">{copy.eyebrow}</p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">{copy.h1}</h1>
          {copy.lead.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-2xl text-white/75 text-base sm:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className="bg-lotus">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} locale={locale} readMore={copy.readMore} headingTag="h2" />
          ))}
        </div>
      </div>

      <BookingSection locale={locale} source={path} />
    </PageShell>
  );
}
