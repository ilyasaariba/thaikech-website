// Business facts shared by every page and both languages. The site has no
// database: change a fact here and redeploy.

export const SITE_URL = "https://www.thaikech.com";

export const BUSINESS = {
  name: "Thai Kech",
  phoneDisplay: "+212 656-371114",
  /** Digits only, for wa.me and tel: links. */
  phoneDigits: "212656371114",
  email: "contact@thaikech.com",
  opens: "08:00",
  closes: "22:00",
  logo: "/assets/thai-kech-logo.jpg",
  heroImage: "/assets/massage-riad-marrakech.webp",
  geo: { latitude: 31.6295, longitude: -7.9811 },
  /**
   * Official profiles (Google Business Profile, Instagram, Facebook,
   * TripAdvisor…). Listed as `sameAs` in the structured data so search engines
   * connect them to this site. Add each URL once the profile exists.
   */
  sameAs: [] as string[],
} as const;

/** Date the site content was last reviewed; used when a page has no own date. */
export const CONTENT_UPDATED = "2026-10-23";
