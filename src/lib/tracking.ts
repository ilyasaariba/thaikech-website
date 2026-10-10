// Fires the "WhatsApp booking request" conversion on every configured ad
// platform. Safe to call always: each platform is guarded, and the stubs in
// SiteDocument queue events until the vendor libraries have loaded.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    snaptr?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

interface WhatsAppLead {
  /** Path of the page the form was sent from, e.g. "/tarifs". */
  source: string;
  people: number;
  serviceId?: string;
  locale: string;
}

export function trackWhatsAppLead({ source, people, serviceId, locale }: WhatsAppLead): void {
  if (typeof window === "undefined") return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18313997338";
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  // Google Ads conversion (needs both the tag ID and the conversion label).
  if (window.gtag && adsId && adsLabel) {
    window.gtag("event", "conversion", { send_to: `${adsId}/${adsLabel}` });
  }

  // GA4 recommended lead event (optional).
  if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("event", "generate_lead", {
      lead_source: source,
      people,
      service_id: serviceId,
      language: locale,
    });
  }

  // Snapchat has no lead event: START_CHECKOUT marks the start of a booking.
  if (window.snaptr) {
    window.snaptr("track", "START_CHECKOUT");
  }

  // Meta (Facebook) Pixel standard lead event.
  if (window.fbq) {
    window.fbq("track", "Lead", { content_category: source, num_items: people });
  }
}

interface ContactClick {
  method: "whatsapp" | "phone";
  /** Where the link sits: "float", "mobile-bar", "footer"… */
  placement: string;
  locale: string;
}

/**
 * A tap on a direct WhatsApp or phone link. These visitors skip the form, so
 * this is the only trace of them: count it as a secondary conversion.
 */
export function trackContactClick({ method, placement, locale }: ContactClick): void {
  if (typeof window === "undefined") return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18313997338";
  const contactLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL;

  if (window.gtag) {
    // GA4 receives it when configured; Google Ads ignores non-conversion events.
    window.gtag("event", method === "whatsapp" ? "whatsapp_click" : "phone_click", {
      placement,
      page_path: window.location.pathname,
      language: locale,
    });
    if (adsId && contactLabel) {
      window.gtag("event", "conversion", { send_to: `${adsId}/${contactLabel}` });
    }
  }

  if (window.fbq) {
    window.fbq("track", "Contact", { content_category: placement });
  }
}
