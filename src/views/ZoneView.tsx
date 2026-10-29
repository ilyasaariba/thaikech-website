import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import type { ZoneId } from "@/content/types";
import { getService } from "@/content/services";
import { getZone } from "@/content/zones";
import { guidesFor } from "@/content/guides";
import { pathFor } from "@/content/routes";
import { breadcrumbNode, businessNode, faqNode, jsonLdGraph, pageMetadata, serviceNode } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/page/LandingHero";
import CtaBand from "@/components/page/CtaBand";
import ContentSections from "@/components/ContentSections";
import FaqList from "@/components/FaqList";
import ServiceCard from "@/components/ServiceCard";
import GuideLinks from "@/components/page/GuideLinks";

export function zoneMetadata(id: ZoneId, locale: Locale): Metadata {
  const zone = getZone(id, locale);
  return pageMetadata({ locale, key: `zone:${id}`, title: zone.metaTitle, description: zone.metaDescription });
}

const h2 = "font-serif text-2xl sm:text-3xl text-bamboo mb-6 leading-snug";

export default function ZoneView({ id, locale }: { id: ZoneId; locale: Locale }) {
  const ui = UI[locale];
  const zone = getZone(id, locale);
  const key = `zone:${id}` as const;
  const path = pathFor(key, locale);
  const crumbs = [
    { name: ui.common.home, href: pathFor("home", locale) },
    { name: ui.footer.areas, href: pathFor("areas", locale) },
    { name: zone.name, href: path },
  ];

  return (
    <PageShell locale={locale} pageKey={key}>
      <JsonLd
        data={jsonLdGraph(
          businessNode(locale),
          serviceNode({
            locale,
            key,
            name: zone.h1,
            description: zone.metaDescription,
            areaName: `${zone.name}, Marrakech`,
          }),
          breadcrumbNode(crumbs),
          faqNode(zone.faqs)
        )}
      />

      <LandingHero
        locale={locale}
        crumbs={crumbs}
        eyebrow={ui.footer.areas}
        h1={zone.h1}
        lead={zone.lead}
        facts={[
          ui.common.travelIncluded,
          ui.common.therapists,
          ui.common.hours,
          ui.common.payAfter,
        ]}
        source={path}
      />

      <div className="bg-lotus">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <section className="mb-12">
            <h2 className="font-serif text-xl text-bamboo mb-4">{ui.common.placesHeading}</h2>
            <ul className="flex flex-wrap gap-2">
              {zone.places.map((place) => (
                <li key={place} className="rounded-full bg-white border border-lotus-dark/60 px-4 py-2 text-sm text-charcoal">
                  {place}
                </li>
              ))}
            </ul>
          </section>

          <div className="rich">
            <ContentSections sections={zone.sections} locale={locale} />
          </div>

          <section className="mt-12">
            <h2 className={h2}>{ui.common.faq}</h2>
            <FaqList faqs={zone.faqs} locale={locale} />
          </section>

          <GuideLinks guides={guidesFor(key, locale)} locale={locale} heading={ui.common.readFirst} />

          <section className="mt-12">
            <h2 className={h2}>{ui.common.nearbyHeading}</h2>
            <ul className="flex flex-wrap gap-2">
              {zone.neighbours.map((neighbourId) => (
                <li key={neighbourId}>
                  <Link
                    href={pathFor(`zone:${neighbourId}`, locale)}
                    className="inline-block rounded-full border border-gold/50 bg-white px-4 py-2 text-sm text-bamboo hover:bg-gold hover:text-bamboo-dark transition-colors"
                  >
                    {getZone(neighbourId, locale).name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={pathFor("areas", locale)}
                  className="inline-block rounded-full bg-bamboo px-4 py-2 text-sm text-gold-light hover:bg-bamboo-dark transition-colors"
                >
                  {ui.common.allAreas}
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-8 text-center">{ui.common.popularHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zone.services.map((serviceId) => (
              <ServiceCard key={serviceId} service={getService(serviceId, locale)} locale={locale} />
            ))}
          </div>
        </section>
      </div>

      <CtaBand locale={locale} />
    </PageShell>
  );
}
