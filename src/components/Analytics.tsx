/**
 * Advertising / analytics pixels, rendered as plain inline <script> tags so the
 * code lands directly in the server HTML (matching each platform's official
 * install snippet) and runs on initial page parse — no hydration dependency.
 *
 * Each block only renders when its ID is present:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   - Google Ads tag,   e.g. "AW-XXXXXXXXX"
 *   NEXT_PUBLIC_GA_ID           - GA4 (optional),   e.g. "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_SNAP_PIXEL_ID   - Snapchat Pixel ID (defaults to the live pixel)
 *
 * The booking-completed conversion event lives in src/lib/analytics.ts and is
 * fired from the booking wizard on success.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const snapId =
    process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ||
    "cc6cc0e1-e19f-40ab-ad27-108f971d1b6e";

  // The Google tag (gtag.js) powers both GA4 and Google Ads; load it once.
  const googleTagId = adsId || gaId;

  const gtagCode =
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
    `gtag('js',new Date());` +
    (gaId ? `gtag('config','${gaId}');` : "") +
    (adsId ? `gtag('config','${adsId}');` : "");

  const snapCode =
    `(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');` +
    `snaptr('init','${snapId}');snaptr('track','PAGE_VIEW');`;

  return (
    <>
      {googleTagId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          />
          <script dangerouslySetInnerHTML={{ __html: gtagCode }} />
        </>
      )}

      <script dangerouslySetInnerHTML={{ __html: snapCode }} />
    </>
  );
}
