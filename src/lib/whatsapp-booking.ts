// Date and message helpers for the WhatsApp booking form. Kept free of
// runtime imports so they run anywhere (browser, server, or a quick Node check).

type Language = "fr" | "en";

/** Treatments start no later than 21:00, so "today" stops being offered then. */
export const LAST_SAME_DAY_START_MINUTES = 21 * 60;
export const MAX_DAYS_AHEAD = 60;

/** Today's date (YYYY-MM-DD) and minutes since midnight, in Marrakech time. */
export function marrakechToday(now: Date = new Date()): { dateKey: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value || "0";
  return {
    dateKey: `${part("year")}-${part("month")}-${part("day")}`,
    minutes: Number(part("hour")) * 60 + Number(part("minute")),
  };
}

/** Adds whole days to a YYYY-MM-DD date, in UTC so no time zone can shift it. */
export function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** "2026-09-20" → "samedi 20 septembre" / "Saturday 20 September" */
export function formatLongDate(dateKey: string, language: Language = "fr"): string {
  return new Date(`${dateKey}T00:00:00Z`).toLocaleDateString(language === "en" ? "en-GB" : "fr-FR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

interface BookingMessageInput {
  language?: Language;
  name: string;
  people: number;
  dateKey: string;
  todayKey: string;
  serviceName?: string;
}

export function buildBookingMessage({
  language = "fr",
  name,
  people,
  dateKey,
  todayKey,
  serviceName,
}: BookingMessageInput): string {
  const longDate = formatLongDate(dateKey, language);
  const isToday = dateKey === todayKey;
  const isTomorrow = dateKey === addDays(todayKey, 1);

  if (language === "en") {
    const when = isToday ? `today (${longDate})` : isTomorrow ? `tomorrow (${longDate})` : `on ${longDate}`;
    const persons = `${people} ${people > 1 ? "people" : "person"}`;
    const service = serviceName ? ` Treatment I'm interested in: ${serviceName}.` : "";
    return `Hello Thai Kech, my name is ${name}. I would like to book an at-home treatment for ${persons} ${when}.${service} Could you advise me and confirm the time? Thank you!`;
  }

  const when = isToday ? `aujourd'hui (${longDate})` : isTomorrow ? `demain (${longDate})` : `le ${longDate}`;
  const persons = `${people} personne${people > 1 ? "s" : ""}`;
  const service = serviceName ? ` Soin qui m'intéresse : ${serviceName}.` : "";
  return `Bonjour Thai Kech, je m'appelle ${name}. Je souhaite réserver un soin à domicile pour ${persons} ${when}.${service} Pouvez-vous me conseiller et me confirmer l'horaire ? Merci !`;
}

export function whatsappUrl(phoneDigits: string, message: string): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

/** Accepts local or international formats such as "+33 6 12 34 56 78" or "0612345678". */
export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "").length;
  return trimmed.length <= 25 && /^[+\d\s().-]+$/.test(trimmed) && digits >= 8 && digits <= 15;
}

/** A requested date from yesterday (time-zone slack) to MAX_DAYS_AHEAD days ahead. */
export function isRequestableDate(dateKey: string, todayKey: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(dateKey) &&
    dateKey >= addDays(todayKey, -1) &&
    dateKey <= addDays(todayKey, MAX_DAYS_AHEAD)
  );
}

/** Page path a lead was sent from, e.g. "/tarifs" or "/en/prices". */
export function isLeadSource(source: string): boolean {
  return /^\/[a-z0-9/-]{0,120}$/.test(source);
}
