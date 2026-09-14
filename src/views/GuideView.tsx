import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGUAGE_TAG, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { getPages } from "@/content/pages";
import { getGuide, getGuides } from "@/content/guides";
import { pathFor, resolveGuideSlug } from "@/content/routes";
import { articleNode, breadcrumbNode, businessNode, faqNode, jsonLdGraph, pageMetadata } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentSections from "@/components/ContentSections";
import FaqList from "@/components/FaqList";
import RichText from "@/components/RichText";
import GuideCard from "@/components/page/GuideCard";
import BookingSection from "@/components/page/BookingSection";
import { ArrowIcon } from "@/components/icons";

export function guideMetadata(slug: string, locale: Locale): Metadata {
  const id = resolveGuideSlug(slug, locale);
  if (!id) return {};
  const guide = getGuide(id, locale);
  return pageMetadata({
    locale,
    key: `guide:${id}`,
    title: guide.metaTitle,
    description: guide.metaDescription,
    article: { publishedTime: guide.published, modifiedTime: guide.updated },
  });
}

export default function GuideView({ slug, locale }: { slug: string; locale: Locale }) {
  const id = resolveGuideSlug(slug, locale);
  if (!id) notFound();

  const ui = UI[locale];
  const guide = getGuide(id, locale);
  const key = `guide:${id}` as const;
  const path = pathFor(key, locale);
  const crumbs = [
    { name: ui.common.home, href: pathFor("home", locale) },
    { name: ui.nav.guides, href: pathFor("guides", locale) },
    { name: guide.title, href: path },
  ];
  const updated = new Intl.DateTimeFormat(LANGUAGE_TAG[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(guide.updated));

  return (
    <PageShell locale={locale} pageKey={key}>
      <JsonLd
        data={jsonLdGraph(
          businessNode(locale),
          articleNode({
            locale,
            key,
            headline: guide.title,
            description: guide.metaDescription,
            image: guide.image,
            published: guide.published,
            updated: guide.updated,
          }),
          breadcrumbNode(crumbs),
          faqNode(guide.faqs)
        )}
      />

      <article>
        <header className="bg-bamboo-dark text-white pt-28 sm:pt-32 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Breadcrumbs items={crumbs} label={ui.common.breadcrumb} />
            <p className="mt-6 text-gold text-xs tracking-[0.3em] uppercase font-medium">{ui.nav.guides}</p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">{guide.title}</h1>
            <p className="mt-5 text-white/75 text-base sm:text-lg leading-relaxed">{guide.excerpt}</p>
            <p className="mt-5 text-sm text-white/50">
              {ui.common.updated} <time dateTime={guide.updated}>{updated}</time>
            </p>
          </div>
        </header>

        <div className="bg-lotus">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm mb-12">
              <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>

            <div className="rich">
              {guide.intro.map((paragraph) => (
                <p key={paragraph} className="text-charcoal text-lg leading-relaxed mb-5">
                  <RichText text={paragraph} locale={locale} />
                </p>
              ))}
              <div className="mt-12">
                <ContentSections sections={guide.sections} locale={locale} />
              </div>
            </div>

            <aside className="mt-14 rounded-2xl bg-bamboo p-6 sm:p-8 text-center">
              <p className="font-serif text-xl sm:text-2xl text-white mb-5">{guide.cta.text}</p>
              <Link
                href={pathFor(guide.target, locale)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-bamboo-dark font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
              >
                {guide.cta.label}
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </aside>

            <section className="mt-14">
              <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6">{ui.common.faq}</h2>
              <FaqList faqs={guide.faqs} locale={locale} />
            </section>
          </div>
        </div>
      </article>

      <BookingSection locale={locale} source={path} />

      <section className="bg-lotus px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-8 text-center">{ui.common.otherGuides}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getGuides(locale)
              .filter((other) => other.id !== id)
              .slice(0, 3)
              .map((other) => (
                <GuideCard key={other.id} guide={other} locale={locale} readMore={getPages(locale).guidesIndex.readMore} />
              ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
