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
  /** The Google Business Profile is named "thaikech": an alternate name in the structured data. */
  alternateName: "thaikech",
  /**
   * Official profiles, linked in the footer and listed as `sameAs` in the
   * structured data so search engines connect them to this site. The Google
   * one is the profile's permanent Maps URL (by CID), not a share link.
   */
  profiles: {
    google: "https://www.google.com/maps?cid=11868810268905023501",
    instagram: "https://www.instagram.com/thaikech/",
    facebook: "https://www.facebook.com/profile.php?id=61594386443527",
  },
  /** Opens the "write a review" box of the Google Business Profile. */
  reviewUrl: "https://g.page/r/CQ2ol1AOfLakEBM/review",
} as const;

/** Date the site content was last reviewed; used when a page has no own date. */
export const CONTENT_UPDATED = "2026-10-23";
