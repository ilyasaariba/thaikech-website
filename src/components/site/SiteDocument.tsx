import Script from "next/script";
import type { ReactNode } from "react";
import { cinzel, outfit } from "@/app/fonts";
import type { Locale } from "@/i18n/locales";
import { GA4_ID } from "@/lib/tracking";

/**
 * <html> and <body> shared by the French and English root layouts.
 *
 * Tracking: Google Analytics 4 only. A tiny inline stub queues the page view
 * (and any later event) immediately, while the gtag library loads with
 * `lazyOnload`, once the page is usable, and replays that queue.
 *
 * The ad pixels (Google Ads, Meta, Snap) were removed while no campaign runs:
 * on a phone they blocked the page for about two seconds. Add a campaign's
 * tag back here, and its conversion events in tracking.ts, when it starts.
 *
 *   NEXT_PUBLIC_GA_ID - GA4 (defaults to the live property)
 */
export default function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const stub = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`;

  return (
    <html lang={locale} className={`${cinzel.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {/* First in <body> so the queue exists before any page script runs. */}
        <script dangerouslySetInnerHTML={{ __html: stub }} />
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="lazyOnload" />
      </body>
    </html>
  );
}
