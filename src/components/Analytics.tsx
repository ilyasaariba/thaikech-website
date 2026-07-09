import Script from "next/script";

/**
 * Advertising / analytics pixels. Each block only renders when its ID is set in
 * the environment, so with no IDs configured this component is a complete no-op
 * (nothing injected, no errors). To activate: set the env vars in Vercel and
 * redeploy (NEXT_PUBLIC_* values are inlined at build time).
 *
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   - Google Ads tag,   e.g. "AW-XXXXXXXXX"
 *   NEXT_PUBLIC_GA_ID           - GA4 (optional),   e.g. "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_SNAP_PIXEL_ID   - Snapchat Pixel ID
 *
 * The booking-completed conversion event lives in src/lib/analytics.ts and is
 * fired from the booking wizard on success.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  // Snap Pixel ID is a public value; hardcoded so it works without extra Vercel
  // setup. An env var overrides it if ever needed.
  const snapId =
    process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ||
    "cc6cc0e1-e19f-40ab-ad27-108f971d1b6e";

  // The Google tag (gtag.js) powers both GA4 and Google Ads; load it once.
  const googleTagId = adsId || gaId;

  return (
    <>
      {googleTagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gaId ? `gtag('config', '${gaId}');` : ""}
              ${adsId ? `gtag('config', '${adsId}');` : ""}
            `}
          </Script>
        </>
      )}

      {snapId && (
        <Script id="snap-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
            a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;
            var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})
            (window,document,'https://sc-static.net/scevent.min.js');
            snaptr('init','${snapId}');
            snaptr('track','PAGE_VIEW');
          `}
        </Script>
      )}
    </>
  );
}
