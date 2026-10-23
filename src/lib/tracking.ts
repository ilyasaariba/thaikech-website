// Sends booking requests and contact taps to Google Analytics 4. Safe to call
// always: the stub in SiteDocument queues events until gtag has loaded.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// The tag ID is public (it ships in every page). An env var can override it.
export const GA4_ID = process.env.NEXT_PUBLIC_GA_ID || "G-V3YPD2KZGQ";

interface WhatsAppLead {
  /** Path of the page the form was sent from, e.g. "/tarifs". */
  source: string;
  people: number;
  serviceId?: string;
  locale: string;
}

export function trackWhatsAppLead({ source, people, serviceId, locale }: WhatsAppLead): void {
  if (typeof window === "undefined" || !window.gtag) return;

  // GA4 recommended lead event.
  window.gtag("event", "generate_lead", {
    lead_source: source,
    people,
    service_id: serviceId,
    language: locale,
  });
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
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", method === "whatsapp" ? "whatsapp_click" : "phone_click", {
    placement,
    page_path: window.location.pathname,
    language: locale,
  });
}
