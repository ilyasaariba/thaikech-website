import type { MetadataRoute } from "next";
import { CONTENT_UPDATED } from "@/content/business";
import { getGuide } from "@/content/guides";
import { indexablePageKeys, pathFor } from "@/content/routes";
import type { GuideId, PageKey } from "@/content/types";
import { absoluteUrl } from "@/lib/seo";

// Every indexable page in both languages, each listing its translation so
// search engines pair them. Dates come from the content, not the build time,
// so they only change when a page really changes.

function lastModified(key: PageKey): string {
  if (key.startsWith("guide:")) return getGuide(key.slice("guide:".length) as GuideId, "fr").updated;
  return CONTENT_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePageKeys().flatMap((key) => {
    const fr = absoluteUrl(pathFor(key, "fr"));
    const en = absoluteUrl(pathFor(key, "en"));
    const shared = {
      lastModified: lastModified(key),
      alternates: { languages: { fr, en, "x-default": en } },
    };
    return [
      { url: fr, ...shared },
      { url: en, ...shared },
    ];
  });
}
