import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import { getPages } from "@/content/pages";
import type { LandingCopy, ServiceId } from "@/content/types";
import { bookingPathFor, isNoindexKey, pathFor } from "@/content/routes";
import { formatDuration, getService, getServices } from "@/content/services";
import { getZones } from "@/content/zones";
import { guidesFor } from "@/content/guides";
import { breadcrumbNode, businessNode, faqNode, jsonLdGraph, pageMetadata, serviceNode } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/page/LandingHero";
import CtaBand from "@/components/page/CtaBand";
import ContentSections from "@/components/ContentSections";
import FaqList from "@/components/FaqList";
import ServiceCard from "@/components/ServiceCard";
import GuideLinks from "@/components/page/GuideLinks";

type LandingKey = "hammam" | "beauty" | "duo" | "inRoom" | "groups" | "prices" | "areas" | "charter" | "privacy";

const pick = (locale: Locale, fr: string, en: string) => (locale === "fr" ? fr : en);

export function landingMetadata(key: LandingKey, locale: Locale): Metadata {
  const copy = getPages(locale)[key];
  return pageMetadata({
    locale,
    key,
    title: copy.metaTitle,
    description: copy.metaDescription,
    noindex: isNoindexKey(key),
  });
}

function crumbName(key: LandingKey, locale: Locale): string {
  const ui = UI[locale];
  const names: Record<LandingKey, string> = {
    hammam: ui.nav.hammamHub,
    beauty: ui.nav.beautyHub,
    duo: ui.nav.duo,
    inRoom: ui.nav.inRoom,
    groups: ui.nav.groups,
    prices: ui.nav.prices,
    areas: ui.footer.areas,
    charter: ui.nav.charter,
    privacy: ui.nav.privacy,
  };
  return names[key];
}

interface LandingLayoutProps {
  locale: Locale;
  pageKey: LandingKey;
  copy: LandingCopy;
  image?: { src: string; alt: string };
  /** Rendered in the reading column, before the text sections. */
  before?: ReactNode;
  /** Rendered in the reading column, after the text sections. */
  after?: ReactNode;
  /** Full-width block below the reading column. */
  wide?: ReactNode;
  withCatalog?: boolean;
  schema?: Record<string, unknown>[];
}

function LandingLayout({ locale, pageKey, copy, image, before, after, wide, withCatalog, schema = [] }: LandingLayoutProps) {
  const ui = UI[locale];
  const path = pathFor(pageKey, locale);
  const crumbs = [
    { name: ui.common.home, href: pathFor("home", locale) },
    { name: crumbName(pageKey, locale), href: path },
  ];

  return (
    <PageShell locale={locale} pageKey={pageKey}>
      <JsonLd
        data={jsonLdGraph(businessNode(locale, { withCatalog }), ...schema, breadcrumbNode(crumbs), faqNode(copy.faqs))}
      />
      <LandingHero
        locale={locale}
        crumbs={crumbs}
        eyebrow={copy.eyebrow}
        h1={copy.h1}
        lead={copy.lead}
        facts={copy.facts}
        source={path}
      />
      <div className="bg-lotus">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          {image && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm mb-12">
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          )}
          {before}
          <div className="rich">
            <ContentSections sections={copy.sections} locale={locale} />
          </div>
          {after}
          <section className="mt-14">
            <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6">{ui.common.faq}</h2>
            <FaqList faqs={copy.faqs} locale={locale} />
          </section>
          <GuideLinks guides={guidesFor(pageKey, locale)} locale={locale} heading={ui.common.readFirst} />
        </div>
        {wide}
      </div>
      <CtaBand locale={locale} />
    </PageShell>
  );
}

function ServiceGrid({ locale, heading, ids }: { locale: Locale; heading: string; ids: ServiceId[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-8 text-center">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ids.map((id) => (
          <ServiceCard key={id} service={getService(id, locale)} locale={locale} />
        ))}
      </div>
    </section>
  );
}

export function HammamPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).hammam;
  return (
    <LandingLayout
      locale={locale}
      pageKey="hammam"
      copy={copy}
      schema={[serviceNode({ locale, key: "hammam", name: copy.h1, description: copy.metaDescription })]}
      before={
        <section className="mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6">
            {pick(locale, "Nos deux rituels de hammam", "Our two hammam rituals")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {getServices(locale)
              .filter((service) => service.category === "hammam")
              .map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
          </div>
        </section>
      }
    />
  );
}

export function BeautyPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).beauty;
  return (
    <LandingLayout
      locale={locale}
      pageKey="beauty"
      copy={copy}
      schema={[serviceNode({ locale, key: "beauty", name: copy.h1, description: copy.metaDescription })]}
      before={
        <section className="mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6">
            {pick(locale, "Nos soins beauté à domicile", "Our beauty treatments at home")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {getServices(locale)
              .filter((service) => service.category === "beauty")
              .map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
          </div>
        </section>
      }
    />
  );
}

export function DuoPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).duo;
  return (
    <LandingLayout
      locale={locale}
      pageKey="duo"
      copy={copy}
      image={{
        src: "/assets/massage-duo-couple.webp",
        alt: pick(
          locale,
          "Deux tables de massage préparées côte à côte pour un massage en duo",
          "Two massage tables set side by side for a couples massage"
        ),
      }}
      schema={[serviceNode({ locale, key: "duo", name: copy.h1, description: copy.metaDescription })]}
      wide={
        <ServiceGrid
          locale={locale}
          heading={pick(locale, "Massages à réserver en duo", "Massages to book as a couple")}
          ids={["massage-berbere", "massage-thai", "massage-sportif"]}
        />
      }
    />
  );
}

export function InRoomPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).inRoom;
  return (
    <LandingLayout
      locale={locale}
      pageKey="inRoom"
      copy={copy}
      image={{
        src: BUSINESS.heroImage,
        alt: pick(
          locale,
          "Cour de riad avec piscine et tables de massage à Marrakech",
          "Riad courtyard with a pool and massage tables in Marrakech"
        ),
      }}
      schema={[serviceNode({ locale, key: "inRoom", name: copy.h1, description: copy.metaDescription })]}
      wide={
        <ServiceGrid
          locale={locale}
          heading={pick(locale, "Soins à réserver dans votre chambre", "Treatments to book in your room")}
          ids={["massage-berbere", "massage-sportif", "hammam-berbere"]}
        />
      }
    />
  );
}

export function GroupsPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).groups;
  return (
    <LandingLayout
      locale={locale}
      pageKey="groups"
      copy={copy}
      image={{
        src: "/assets/massage-duo-couple.webp",
        alt: pick(
          locale,
          "Deux tables de massage installées côte à côte dans une villa à Marrakech",
          "Two massage tables set up side by side in a villa in Marrakech"
        ),
      }}
      schema={[serviceNode({ locale, key: "groups", name: copy.h1, description: copy.metaDescription })]}
      wide={
        <ServiceGrid
          locale={locale}
          heading={pick(locale, "Des soins pensés pour les groupes", "Treatments that suit a group")}
          ids={["massage-berbere", "hammam-royal", "massage-4-mains"]}
        />
      }
    />
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).privacy;
  return <LandingLayout locale={locale} pageKey="privacy" copy={copy} />;
}

export function PricesPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).prices;
  const cell = "px-4 py-3.5 whitespace-nowrap";
  return (
    <LandingLayout
      locale={locale}
      pageKey="prices"
      copy={copy}
      withCatalog
      before={
        <div className="mb-14 overflow-x-auto rounded-2xl border border-lotus-dark/60 bg-white shadow-sm">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">{copy.table.caption}</caption>
            <thead className="bg-bamboo text-white">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-serif font-normal">
                  {copy.table.treatment}
                </th>
                <th scope="col" className="px-4 py-3.5 font-serif font-normal">
                  {copy.table.duration}
                </th>
                <th scope="col" className="px-4 py-3.5 font-serif font-normal">
                  {copy.table.price}
                </th>
                <th scope="col" className="px-4 py-3.5">
                  <span className="sr-only">{copy.table.book}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {getServices(locale).map((service) => (
                <tr key={service.id} className="border-t border-lotus-dark/50">
                  <th scope="row" className="px-4 py-3.5 font-medium text-bamboo">
                    <Link
                      href={pathFor(`service:${service.id}`, locale)}
                      className="underline decoration-gold/60 underline-offset-4 hover:text-gold-dark"
                    >
                      {service.name}
                    </Link>
                  </th>
                  <td className={cell}>{formatDuration(service.minutes, locale)}</td>
                  <td className={`${cell} font-semibold text-bamboo`}>{service.price} MAD</td>
                  <td className={`${cell} text-right`}>
                    <Link
                      href={bookingPathFor(service.id, locale)}
                      className="inline-block rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-bamboo-dark hover:bg-gold-light transition-colors"
                    >
                      {copy.table.book}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

export function AreasPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).areas;
  return (
    <LandingLayout
      locale={locale}
      pageKey="areas"
      copy={copy}
      before={
        <section className="mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6">
            {pick(locale, "Nos quartiers à Marrakech", "Our areas in Marrakech")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getZones(locale).map((zone) => (
              <Link
                key={zone.id}
                href={pathFor(`zone:${zone.id}`, locale)}
                className="group rounded-2xl bg-white border border-lotus-dark/50 p-5 shadow-sm hover:shadow-lg hover:border-gold/50 transition-all duration-300"
              >
                <h3 className="font-serif text-lg text-bamboo group-hover:text-gold transition-colors">{zone.name}</h3>
                <p className="mt-1.5 text-sm text-charcoal-light leading-relaxed">{zone.teaser}</p>
              </Link>
            ))}
          </div>
        </section>
      }
      after={
        <section className="mt-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-4">{copy.otherAreasHeading}</h2>
          <p className="text-charcoal-light leading-relaxed mb-5">{copy.otherAreasText}</p>
          <ul className="flex flex-wrap gap-2">
            {copy.otherAreas.map((area) => (
              <li key={area} className="rounded-full bg-white border border-lotus-dark/60 px-4 py-2 text-sm text-charcoal">
                {area}
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
}

export function CharterPage({ locale }: { locale: Locale }) {
  const copy = getPages(locale).charter;
  return (
    <LandingLayout
      locale={locale}
      pageKey="charter"
      copy={copy}
      image={{
        src: "/assets/massage-huile-argan-therapeute.webp",
        alt: pick(locale, "Thérapeute réalisant un massage à l'huile d'argan", "Therapist giving an argan oil massage"),
      }}
    />
  );
}
