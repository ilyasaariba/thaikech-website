// Fires the "booking completed" conversion on every configured ad platform.
// Safe to call always: each platform is guarded, so it no-ops when that pixel
// isn't loaded/configured.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    snaptr?: (...args: unknown[]) => void;
  }
}

export function trackBookingConversion(value: number): void {
  if (typeof window === "undefined") return;

  const currency = "MAD";
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  // Google Ads conversion (needs both the tag ID and the conversion label).
  if (window.gtag && adsId && adsLabel) {
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${adsLabel}`,
      value,
      currency,
    });
  }

  // GA4 analytics event (optional).
  if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("event", "purchase", { value, currency });
  }

  // Snapchat Pixel conversion.
  if (window.snaptr) {
    window.snaptr("track", "PURCHASE", { price: value, currency });
  }
}
