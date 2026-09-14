import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import { isPageKey, pathFor } from "@/content/routes";

// Renders the inline syntax of content strings: [label](target) links and
// **bold**. A target is a page key ("service:massage-berbere", "prices"…)
// resolved to the right URL for the language, or a literal "/…" or "#…" path.

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function resolveHref(target: string, locale: Locale): string {
  if (target.startsWith("/") || target.startsWith("#")) return target;
  if (!isPageKey(target)) {
    // Fails the build instead of shipping a broken internal link.
    throw new Error(`Unknown page key in content link: "${target}"`);
  }
  return pathFor(target, locale);
}

function render(text: string, locale: Locale, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [whole, label, target, bold] = match;
    const key = `${keyPrefix}-${index}`;
    if (target) {
      nodes.push(
        <Link key={key} href={resolveHref(target, locale)}>
          {render(label, locale, key)}
        </Link>
      );
    } else {
      nodes.push(<strong key={key}>{render(bold, locale, key)}</strong>);
    }
    last = index + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function RichText({ text, locale }: { text: string; locale: Locale }) {
  return <>{render(text, locale, "rt")}</>;
}
