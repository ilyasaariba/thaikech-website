// Shapes of the page content. Text fields accept a light inline syntax,
// rendered by <RichText>: [label](/path) for links and **text** for bold.

export type ServiceId =
  | "massage-berbere"
  | "massage-sportif"
  | "massage-thai"
  | "massage-future-maman"
  | "massage-4-mains"
  | "hammam-berbere"
  | "hammam-royal"
  | "brushing"
  | "manucure"
  | "pedicure";

export type ZoneId =
  | "medina"
  | "gueliz"
  | "hivernage"
  | "palmeraie"
  | "agdal"
  | "route-ourika"
  | "agafay"
  | "amelkis"
  | "route-amizmiz"
  | "targa"
  | "al-maaden";

export type GuideId =
  | "hammam-at-home"
  | "berber-or-thai"
  | "tipping"
  | "hotel-room-massage"
  | "pregnancy-travel"
  | "atlas-trek-recovery"
  | "home-massage-prices"
  | "hammam-marrakech";

export type StaticPageKey =
  | "home"
  | "book"
  | "prices"
  | "areas"
  | "hammam"
  | "duo"
  | "inRoom"
  | "charter"
  | "guides"
  | "groups"
  | "privacy";

/** Identifies a page independently of its language; see src/content/routes.ts. */
export type PageKey = StaticPageKey | `service:${ServiceId}` | `zone:${ZoneId}` | `guide:${GuideId}`;

/** A paragraph, a bullet/numbered list, or a highlighted note. */
export type Block = string | { list: string[]; ordered?: boolean } | { note: string };

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface ServiceCopy {
  slug: string;
  name: string;
  /** Lower-case name used inside sentences and link labels. */
  shortName: string;
  summary: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string[];
  idealFor: string[];
  steps: Step[];
  sections: Section[];
  precautions: string[];
  faqs: Faq[];
  /**
   * What the client has ready (a bathroom, a chair…). Shown instead of the
   * massage equipment list on beauty treatments.
   */
  onSite?: string[];
}

export interface ZoneCopy {
  slug: string;
  name: string;
  /** Short description for cards and link lists. */
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string[];
  /** Streets, landmarks and sub-areas named on the page. */
  places: string[];
  sections: Section[];
  faqs: Faq[];
}

export interface GuideCopy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  imageAlt: string;
  intro: string[];
  sections: Section[];
  faqs: Faq[];
  /** Call to action pointing at the guide's money page. */
  cta: { text: string; label: string };
}

/** Copy for a standalone landing page (hammam hub, prices, areas…). */
export interface LandingCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string[];
  facts: string[];
  sections: Section[];
  faqs: Faq[];
}

interface SectionHeader {
  eyebrow: string;
  heading: string;
  intro: string;
}

export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    h1Start: string;
    h1Accent: string;
    h1End: string;
    subtitle: string;
    seeServices: string;
    badges: string[];
    discover: string;
  };
  services: SectionHeader & { massages: string; hammams: string; beauty: string; hammamLink: string; allPrices: string };
  occasions: SectionHeader & { items: { key: PageKey; title: string; text: string }[] };
  concept: SectionHeader & { steps: Step[] };
  commitments: SectionHeader & { items: Step[]; charterLink: string };
  zones: SectionHeader & { allAreas: string };
  guides: SectionHeader & { all: string };
  faq: SectionHeader & { items: Faq[] };
}

export interface PagesCopy {
  home: HomeCopy;
  hammam: LandingCopy;
  duo: LandingCopy;
  inRoom: LandingCopy;
  groups: LandingCopy;
  privacy: LandingCopy;
  prices: LandingCopy & {
    table: { caption: string; treatment: string; duration: string; price: string; book: string };
  };
  areas: LandingCopy & { otherAreasHeading: string; otherAreasText: string; otherAreas: string[] };
  charter: LandingCopy;
  guidesIndex: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    lead: string[];
    readMore: string;
  };
  book: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    checklist: string[];
    seeServices: string;
    close: string;
  };
  notFound: { eyebrow: string; h1: string; text: string; book: string; home: string };
}
