import Script from "next/script";
import type { ReactNode } from "react";
import { cinzel, outfit } from "@/app/fonts";
import type { Locale } from "@/i18n/locales";

const META_PIXEL_ID = "28233906552916903";

/**
 * <html> and <body> shared by the French and English root layouts.
 *
 * Tracking: tiny inline stubs queue the page view (and any later conversion)
 * immediately, while the heavy Google, Meta and Snap libraries load with
 * `lazyOnload`, once the page is usable, and replay that queue. The tags stay
 * off the critical rendering path without losing events.
 *
 *   NEXT_PUBLIC_GOOGLE_ADS_ID  - Google Ads tag (defaults to the live account)
 *   NEXT_PUBLIC_GA_ID          - GA4, optional
 *   NEXT_PUBLIC_SNAP_PIXEL_ID  - Snapchat Pixel (defaults to the live pixel)
 */
export default function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18313997338";
  const snapId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || "cc6cc0e1-e19f-40ab-ad27-108f971d1b6e";
  const googleTagId = adsId || gaId;

  const stubs = [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());",
    gaId ? `gtag('config','${gaId}');` : "",
    adsId ? `gtag('config','${adsId}');` : "",
    `!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window);fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
    `(function(e){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[]})(window);snaptr('init','${snapId}');snaptr('track','PAGE_VIEW');`,
  ].join("");

  return (
    <html lang={locale} className={`${cinzel.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {/* First in <body> so the queues exist before any page script runs. */}
        <script dangerouslySetInnerHTML={{ __html: stubs }} />
        {children}
        {googleTagId && (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="lazyOnload" />
        )}
        <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="lazyOnload" />
        <Script src="https://sc-static.net/scevent.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
