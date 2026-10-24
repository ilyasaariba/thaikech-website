import type { Locale } from "./locales";

// Interface text shared by every page (navigation, footer, section labels).

export interface UiStrings {
  tagline: string;
  nav: {
    treatments: string;
    massages: string;
    hammams: string;
    beauty: string;
    hammamHub: string;
    duo: string;
    inRoom: string;
    groups: string;
    privacy: string;
    areas: string;
    prices: string;
    guides: string;
    charter: string;
    book: string;
    bookNow: string;
    menu: string;
  };
  /** Link to the same page in the other language, written in that language. */
  language: { name: string; code: string; label: string };
  /** Shown to visitors whose browser prefers this language, on the other language's page. */
  suggestion: { text: string; action: string; dismiss: string };
  /** Floating WhatsApp button and mobile contact bar. */
  contact: {
    whatsapp: string;
    question: string;
    book: string;
    /** Pre-filled WhatsApp message; {page} is replaced by the page's topic. */
    message: string;
    messageAbout: string;
    /** Pre-filled message of every area page; {area} is the area's name. */
    messageArea: string;
  };
  footer: {
    description: string;
    available: string;
    contact: string;
    phone: string;
    email: string;
    treatments: string;
    areas: string;
    info: string;
    whatsapp: string;
    /** Accessible name of a profile icon; {network} is "Instagram", "Facebook"… */
    profile: string;
    review: string;
    rights: string;
    bottom: string;
  };
  common: {
    home: string;
    breadcrumb: string;
    price: string;
    duration: string;
    from: string;
    idealFor: string;
    steps: string;
    precautions: string;
    precautionsNote: string;
    faq: string;
    related: string;
    discover: string;
    bookThis: string;
    equipment: string;
    bringHeading: string;
    bringItems: string[];
    onSiteHeading: string;
    whereHeading: string;
    whereText: string;
    placesHeading: string;
    popularHeading: string;
    nearbyHeading: string;
    allAreas: string;
    travelIncluded: string;
    therapists: string;
    twoTherapists: string;
    payAfter: string;
    hours: string;
    published: string;
    updated: string;
    otherGuides: string;
    readFirst: string;
    bookingHeading: string;
    bookingText: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
}

export const UI: Record<Locale, UiStrings> = {
  fr: {
    tagline: "Spa à Domicile",
    nav: {
      treatments: "Soins",
      massages: "Massages",
      hammams: "Hammams",
      beauty: "Beauté",
      hammamHub: "Hammam à domicile",
      duo: "Massage en duo",
      inRoom: "Massage en chambre d'hôtel",
      groups: "EVJF & groupes",
      privacy: "Confidentialité",
      areas: "Zones",
      prices: "Tarifs",
      guides: "Guides",
      charter: "Charte qualité",
      book: "Réserver",
      bookNow: "Réserver maintenant",
      menu: "Menu de navigation",
    },
    language: { name: "Français", code: "FR", label: "Lire cette page en français" },
    suggestion: {
      text: "Cette page existe aussi en français.",
      action: "Voir en français",
      dismiss: "Fermer",
    },
    contact: {
      whatsapp: "WhatsApp",
      question: "Une question ? Écrivez-nous",
      book: "Réserver",
      message: "Bonjour Thai Kech, j'ai une question sur vos soins à domicile à Marrakech.",
      messageAbout: "Bonjour Thai Kech, j'ai une question au sujet de : {page}.",
      messageArea: "Bonjour Thai Kech, venez-vous jusqu'à moi ? Je séjourne dans le secteur {area}.",
    },
    footer: {
      description:
        "Massages, hammams et soins beauté à domicile à Marrakech. Nos thérapeutes femmes viennent directement dans votre riad, votre villa ou votre hôtel.",
      available: "Disponible tous les jours, 8h–22h",
      contact: "Contact",
      phone: "Téléphone",
      email: "E-mail",
      treatments: "Nos soins",
      areas: "Zones desservies",
      info: "Infos pratiques",
      whatsapp: "Contacter via WhatsApp",
      profile: "Thai Kech sur {network}",
      review: "Laisser un avis Google",
      rights: "Tous droits réservés.",
      bottom: "Massage & Hammam à Domicile — Marrakech, Maroc",
    },
    common: {
      home: "Accueil",
      breadcrumb: "Fil d'Ariane",
      price: "Prix",
      duration: "Durée",
      from: "Dès",
      idealFor: "Idéal pour",
      steps: "Déroulement du soin",
      precautions: "Précautions",
      precautionsNote: "En cas de doute, demandez l'avis de votre médecin avant de réserver.",
      faq: "Questions fréquentes",
      related: "Autres soins à domicile",
      discover: "Découvrir le soin",
      bookThis: "Réserver ce soin",
      equipment: "Table, huiles et serviettes apportées",
      bringHeading: "Ce que votre thérapeute apporte",
      bringItems: [
        "Table de massage professionnelle pliante",
        "Huiles de massage et serviettes",
        "Diffuseur d'huiles essentielles et musique d'ambiance",
      ],
      onSiteHeading: "À prévoir sur place",
      whereHeading: "Où intervenons-nous ?",
      whereText: "Dans toute la région de Marrakech, déplacement offert :",
      placesHeading: "Quartiers et repères",
      popularHeading: "Soins recommandés dans ce quartier",
      nearbyHeading: "Zones voisines",
      allAreas: "Toutes les zones desservies",
      travelIncluded: "Déplacement offert",
      therapists: "Thérapeutes femmes",
      twoTherapists: "2 thérapeutes femmes",
      payAfter: "Paiement après le soin",
      hours: "Tous les jours 8h–22h",
      published: "Publié le",
      updated: "Mis à jour le",
      otherGuides: "Autres guides",
      readFirst: "À lire avant votre soin",
      bookingHeading: "Réservez en 30 secondes",
      bookingText: "Nom, téléphone, nombre de personnes et date : nous confirmons l'horaire sur WhatsApp.",
      ctaHeading: "Prêt(e) pour votre moment de détente ?",
      ctaText: "Réservez en 30 secondes : nous vous conseillons et confirmons l'horaire sur WhatsApp.",
      ctaButton: "Réserver maintenant",
    },
  },
  en: {
    tagline: "Luxury Mobile Spa",
    nav: {
      treatments: "Treatments",
      massages: "Massages",
      hammams: "Hammams",
      beauty: "Beauty",
      hammamHub: "Hammam at home",
      duo: "Couples massage",
      inRoom: "In-room massage",
      groups: "Bachelorette & groups",
      privacy: "Privacy",
      areas: "Areas",
      prices: "Prices",
      guides: "Guides",
      charter: "Code of conduct",
      book: "Book",
      bookNow: "Book now",
      menu: "Navigation menu",
    },
    language: { name: "English", code: "EN", label: "Read this page in English" },
    suggestion: {
      text: "This page is also available in English.",
      action: "View in English",
      dismiss: "Close",
    },
    contact: {
      whatsapp: "WhatsApp",
      question: "Questions? Message us",
      book: "Book",
      message: "Hello Thai Kech, I have a question about your treatments at home in Marrakech.",
      messageAbout: "Hello Thai Kech, I have a question about: {page}.",
      messageArea: "Hello Thai Kech, do you come to my area? I'm staying in the {area} area.",
    },
    footer: {
      description:
        "Massages, hammams and beauty treatments at home in Marrakech. Our female therapists come straight to your riad, villa or hotel.",
      available: "Available every day, 8am–10pm",
      contact: "Contact",
      phone: "Phone",
      email: "Email",
      treatments: "Our treatments",
      areas: "Areas we cover",
      info: "Practical info",
      whatsapp: "Contact us on WhatsApp",
      profile: "Thai Kech on {network}",
      review: "Leave a Google review",
      rights: "All rights reserved.",
      bottom: "Massage & Hammam at Home — Marrakech, Morocco",
    },
    common: {
      home: "Home",
      breadcrumb: "Breadcrumb",
      price: "Price",
      duration: "Duration",
      from: "From",
      idealFor: "Ideal for",
      steps: "How the treatment works",
      precautions: "Precautions",
      precautionsNote: "If in doubt, ask your doctor before booking.",
      faq: "Frequently asked questions",
      related: "Other treatments at home",
      discover: "Discover the treatment",
      bookThis: "Book this treatment",
      equipment: "Table, oils and towels provided",
      bringHeading: "What your therapist brings",
      bringItems: [
        "Professional folding massage table",
        "Massage oils and towels",
        "Essential oil diffuser and ambient music",
      ],
      onSiteHeading: "What to have ready",
      whereHeading: "Where do we go?",
      whereText: "Across the whole Marrakech area, with free travel:",
      placesHeading: "Neighbourhoods and landmarks",
      popularHeading: "Recommended treatments in this area",
      nearbyHeading: "Nearby areas",
      allAreas: "All the areas we cover",
      travelIncluded: "Free travel",
      therapists: "Female therapists",
      twoTherapists: "2 female therapists",
      payAfter: "Pay after your treatment",
      hours: "Every day 8am–10pm",
      published: "Published",
      updated: "Updated",
      otherGuides: "More guides",
      readFirst: "Read before your treatment",
      bookingHeading: "Book in 30 seconds",
      bookingText: "Name, phone, number of people and date: we confirm the time on WhatsApp.",
      ctaHeading: "Ready for your moment of relaxation?",
      ctaText: "Book in 30 seconds: we advise you and confirm the time on WhatsApp.",
      ctaButton: "Book now",
    },
  },
};
