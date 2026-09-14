import type { Locale } from "./locales";

// Booking form text. Kept apart from the page content so the client bundle
// only carries these few strings.

export interface FormStrings {
  title: string;
  chosen: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  people: string;
  removePerson: string;
  addPerson: string;
  date: string;
  today: string;
  tomorrow: string;
  dayAfter: string;
  honeypot: string;
  submit: string;
  note: string;
  errors: { name: string; phone: string; date: string };
}

export const FORM_COPY: Record<Locale, FormStrings> = {
  fr: {
    title: "Réservez en 30 secondes",
    chosen: "Soin choisi",
    name: "Nom complet",
    namePlaceholder: "Camille Martin",
    phone: "Téléphone (WhatsApp)",
    phonePlaceholder: "+33 6 12 34 56 78",
    people: "Nombre de personnes",
    removePerson: "Retirer une personne",
    addPerson: "Ajouter une personne",
    date: "Date",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    dayAfter: "Après-demain",
    honeypot: "Site web",
    submit: "Réserver via WhatsApp",
    note: "Soins bien-être professionnels et non sensuels · Thérapeutes femmes · Paiement après le soin",
    errors: {
      name: "Indiquez votre nom complet.",
      phone: "Indiquez votre numéro de téléphone, avec l'indicatif du pays.",
      date: "Choisissez la date de votre soin.",
    },
  },
  en: {
    title: "Book in 30 seconds",
    chosen: "Selected treatment",
    name: "Full name",
    namePlaceholder: "Emma Wilson",
    phone: "Phone (WhatsApp)",
    phonePlaceholder: "+44 7700 900123",
    people: "Number of people",
    removePerson: "Remove a person",
    addPerson: "Add a person",
    date: "Date",
    today: "Today",
    tomorrow: "Tomorrow",
    dayAfter: "Day after",
    honeypot: "Website",
    submit: "Book via WhatsApp",
    note: "Professional, non-sensual wellness treatments · Female therapists · Pay after your treatment",
    errors: {
      name: "Please enter your full name.",
      phone: "Please enter your phone number with the country code.",
      date: "Please choose the date of your treatment.",
    },
  },
};
