import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import type { ServiceId } from "@/content/types";
import { getService } from "@/content/services";
import { getZones } from "@/content/zones";
import { guidesFor } from "@/content/guides";
import { pathFor } from "@/content/routes";
import { breadcrumbNode, businessNode, faqNode, jsonLdGraph, pageMetadata, serviceNode } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/page/LandingHero";
import CtaBand from "@/components/page/CtaBand";
import ContentSections from "@/components/ContentSections";
import FaqList from "@/components/FaqList";
import RichText from "@/components/RichText";
import ServiceCard from "@/components/ServiceCard";
import GuideLinks from "@/components/page/GuideLinks";
import { CheckIcon } from "@/components/icons";

export function serviceMetadata(id: ServiceId, locale: Locale): Metadata {
  const service = getService(id, locale);
  return pageMetadata({
    locale,
    key: `service:${id}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

const h2 = "font-serif text-2xl sm:text-3xl text-bamboo mb-6 leading-snug";

export default function ServiceView({ id, locale }: { id: ServiceId; locale: Locale }) {
  const ui = UI[locale];
  const service = getService(id, locale);
  const key = `service:${id}` as const;
  const path = pathFor(key, locale);
  const crumbs = [
    { name: ui.common.home, href: pathFor("home", locale) },
    ...(service.category === "hammam" ? [{ name: ui.nav.hammamHub, href: pathFor("hammam", locale) }] : []),
    { name: service.name, href: path },
  ];
  const categoryLabel = { massage: ui.nav.massages, hammam: ui.nav.hammams, beauty: ui.nav.beauty }[service.category];
  // Beauty treatments need no massage table: they list what to have ready instead.
  const kit = service.onSite
    ? { heading: ui.common.onSiteHeading, items: service.onSite }
    : { heading: ui.common.bringHeading, items: ui.common.bringItems };

  return (
    <PageShell locale={locale} pageKey={key}>
      <JsonLd
        data={jsonLdGraph(
          businessNode(locale),
          serviceNode({
            locale,
            key,
            name: service.name,
            description: service.summary,
            image: service.image,
            price: service.price,
          }),
          breadcrumbNode(crumbs),
          faqNode(service.faqs)
        )}
      />

      <LandingHero
        locale={locale}
        crumbs={crumbs}
        eyebrow={categoryLabel}
        h1={service.h1}
        lead={service.lead}
        facts={[
          ui.common.travelIncluded,
          ui.common.payAfter,
          ui.common.hours,
          service.category === "beauty" ? ui.common.therapists : ui.common.equipment,
        ]}
        priceTag={{ price: service.price, minutes: service.minutes, therapists: service.therapists }}
        preset={{ id: service.id, name: service.name, price: service.price }}
        source={path}
      />

      <div className="bg-lotus">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm mb-12">
            <Image src={service.image} alt={service.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>

          <section className="rounded-2xl bg-white border border-lotus-dark/50 p-6 sm:p-8 mb-12">
            <h2 className="font-serif text-2xl text-bamboo mb-5">{ui.common.idealFor}</h2>
            <ul className="rich space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-charcoal-light leading-relaxed">
                    <RichText text={item} locale={locale} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={h2}>{ui.common.steps}</h2>
            <ol className="space-y-6">
              {service.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bamboo text-gold font-serif">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-bamboo">{step.title}</h3>
                    <p className="text-charcoal-light leading-relaxed mt-1">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="rich">
            <ContentSections sections={service.sections} locale={locale} />
          </div>

          <section className="mt-12 rounded-2xl bg-bamboo text-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-gold mb-4">{kit.heading}</h2>
            <ul className="space-y-2.5">
              {kit.items.map((item) => (
                <li key={item} className="flex gap-3 text-white/85">
                  <CheckIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className={h2}>{ui.common.precautions}</h2>
            <ul className="rich space-y-3">
              {service.precautions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span className="text-charcoal-light leading-relaxed">
                    <RichText text={item} locale={locale} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-charcoal-light italic">{ui.common.precautionsNote}</p>
          </section>

          <section className="mt-12">
            <h2 className={h2}>{ui.common.whereHeading}</h2>
            <p className="text-charcoal-light mb-4">{ui.common.whereText}</p>
            <ul className="flex flex-wrap gap-2">
              {getZones(locale).map((zone) => (
                <li key={zone.id}>
                  <Link
                    href={pathFor(`zone:${zone.id}`, locale)}
                    className="inline-block rounded-full border border-gold/50 bg-white px-4 py-2 text-sm text-bamboo hover:bg-gold hover:text-bamboo-dark transition-colors"
                  >
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className={h2}>{ui.common.faq}</h2>
            <FaqList faqs={service.faqs} locale={locale} />
          </section>

          <GuideLinks guides={guidesFor(key, locale)} locale={locale} heading={ui.common.readFirst} />
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-8 text-center">{ui.common.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.related.map((relatedId) => (
              <ServiceCard key={relatedId} service={getService(relatedId, locale)} locale={locale} />
            ))}
          </div>
        </section>
      </div>

      <CtaBand locale={locale} />
    </PageShell>
  );
}
