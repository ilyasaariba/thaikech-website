"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "tk-language-suggestion";
const subscribeNever = () => () => {};

interface LanguageSuggestionProps {
  pageLocale: "fr" | "en";
  /** Same page in the other language. */
  href: string;
  lang: string;
  text: string;
  action: string;
  dismiss: string;
}

/**
 * Offers the other language once, based on the browser's languages. It never
 * redirects, so search engines and visitors always get the page they asked for.
 */
function shouldSuggest(pageLocale: "fr" | "en"): boolean {
  // Crawlers and audit tools render pages in English: keep the other
  // language's text out of what they index or measure.
  if (/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent)) return false;
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return false;
  } catch {
    // Storage can be blocked; the suggestion then simply shows each visit.
  }
  const languages = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) =>
    l.toLowerCase()
  );
  if (pageLocale === "fr") {
    // French and Arabic readers (most visitors from Morocco) stay on French.
    return !languages.some((l) => l.startsWith("fr") || l.startsWith("ar"));
  }
  return languages[0]?.startsWith("fr") ?? false;
}

export default function LanguageSuggestion({ pageLocale, href, lang, text, action, dismiss }: LanguageSuggestionProps) {
  const [dismissed, setDismissed] = useState(false);
  const suggest = useSyncExternalStore(subscribeNever, () => shouldSuggest(pageLocale), () => false);

  if (!suggest || dismissed) return null;

  const remember = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore blocked storage.
    }
  };

  return (
    <div
      lang={lang}
      aria-live="polite"
      className="fixed z-50 left-4 right-4 bottom-24 md:bottom-6 md:left-6 md:right-auto md:max-w-sm rounded-2xl border border-gold/30 bg-bamboo-dark/95 backdrop-blur-md p-4 shadow-2xl text-white"
    >
      <p className="text-sm">{text}</p>
      <div className="mt-3 flex items-center gap-4">
        <a
          href={href}
          hrefLang={lang}
          onClick={remember}
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-bamboo-dark hover:bg-gold-light transition-colors"
        >
          {action}
        </a>
        <button type="button" onClick={remember} className="text-sm text-white/60 hover:text-white transition-colors">
          {dismiss}
        </button>
      </div>
    </div>
  );
}
