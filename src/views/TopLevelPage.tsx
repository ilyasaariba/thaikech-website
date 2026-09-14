import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { resolveTopLevelSlug } from "@/content/routes";
import ServiceView, { serviceMetadata } from "./ServiceView";
import ZoneView, { zoneMetadata } from "./ZoneView";

// Treatment pages and area pages share the top-level /[slug] route of each
// language (flat, descriptive URLs such as /massage-berbere-a-domicile-marrakech).

export function topLevelMetadata(slug: string, locale: Locale): Metadata {
  const target = resolveTopLevelSlug(slug, locale);
  if (!target) return {};
  return target.kind === "service" ? serviceMetadata(target.id, locale) : zoneMetadata(target.id, locale);
}

export default function TopLevelPage({ slug, locale }: { slug: string; locale: Locale }) {
  const target = resolveTopLevelSlug(slug, locale);
  if (!target) notFound();
  return target.kind === "service" ? (
    <ServiceView id={target.id} locale={locale} />
  ) : (
    <ZoneView id={target.id} locale={locale} />
  );
}
