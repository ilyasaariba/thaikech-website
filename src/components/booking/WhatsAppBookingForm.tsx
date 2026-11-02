"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { trackWhatsAppLead } from "@/lib/tracking";
import { FORM_COPY } from "@/i18n/form";
import type { Locale } from "@/i18n/locales";
import { WhatsAppIcon } from "@/components/icons";
import {
  LAST_SAME_DAY_START_MINUTES,
  MAX_DAYS_AHEAD,
  addDays,
  buildBookingMessage,
  isValidPhone,
  marrakechToday,
  whatsappUrl,
} from "@/lib/whatsapp-booking";

export interface BookingServiceOption {
  id: string;
  name: string;
  price: number;
}

interface WhatsAppBookingFormProps {
  /** Business WhatsApp number, digits only (e.g. "212656371114"). */
  whatsappNumber: string;
  locale: Locale;
  /** Path of the page the form sits on, saved with the lead (e.g. "/tarifs"). */
  source: string;
  /** Treatment of the page the form sits on. */
  preset?: BookingServiceOption;
  /** Lets the booking page mention a treatment passed as ?service=… */
  services?: BookingServiceOption[];
  tone?: "dark" | "light";
}

// Time- and URL-dependent values are read with useSyncExternalStore: the
// static HTML renders without them and the browser fills them in, so the
// server and client renders never disagree.
const subscribeNever = () => () => {};

function getClockSnapshot(): string {
  const { dateKey, minutes } = marrakechToday();
  return `${dateKey}|${minutes >= LAST_SAME_DAY_START_MINUTES ? "late" : "open"}`;
}

const getSearchSnapshot = () => window.location.search;

// Alerts the business on Telegram so the request can be followed up even if
// the visitor never presses send in WhatsApp. sendBeacon still delivers while the page hands
// over to WhatsApp; fetch with keepalive is the fallback.
function saveLead(lead: Record<string, unknown>) {
  const body = JSON.stringify(lead);
  const queued =
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon("/api/leads", new Blob([body], { type: "application/json" }));
  if (!queued) {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

const TONES = {
  dark: {
    card: "bg-bamboo-dark/75 backdrop-blur-md border border-gold/30 shadow-2xl",
    title: "text-gold",
    label: "text-white/80",
    input: "bg-white/95 border-transparent text-charcoal",
    chip: "border-white/30 text-white hover:border-gold",
    stepper: "border-white/30 text-white hover:border-gold",
    count: "text-white",
    note: "text-white/60",
    error: "text-red-200",
    service: "bg-white/10 text-white",
  },
  light: {
    card: "bg-white border border-lotus-dark/40 shadow-sm",
    title: "text-bamboo",
    label: "text-charcoal",
    input: "bg-white border-lotus-dark/50 text-charcoal",
    chip: "border-lotus-dark/50 text-charcoal hover:border-gold",
    stepper: "border-lotus-dark/50 text-charcoal hover:border-gold",
    count: "text-bamboo",
    note: "text-charcoal-light",
    error: "text-red-700",
    service: "bg-lotus text-bamboo",
  },
};

export default function WhatsAppBookingForm({
  whatsappNumber,
  locale,
  source,
  preset,
  services = [],
  tone = "light",
}: WhatsAppBookingFormProps) {
  const copy = FORM_COPY[locale];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);
  const [dateKey, setDateKey] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, stays empty for people
  const [error, setError] = useState<string | null>(null);

  const clock = useSyncExternalStore(subscribeNever, getClockSnapshot, () => "");
  const search = useSyncExternalStore(subscribeNever, getSearchSnapshot, () => "");

  const hydrated = clock !== "";
  const [todayKey, phase] = clock.split("|");
  // After 21:00 in Marrakech, the first bookable day is tomorrow.
  const firstKey = hydrated ? (phase === "late" ? addDays(todayKey, 1) : todayKey) : "";
  const lastKey = hydrated ? addDays(todayKey, MAX_DAYS_AHEAD) : "";
  const quickDays = !hydrated
    ? [
        { label: copy.today, key: "" },
        { label: copy.tomorrow, key: "" },
      ]
    : phase === "late"
      ? [
          { label: copy.tomorrow, key: addDays(todayKey, 1) },
          { label: copy.dayAfter, key: addDays(todayKey, 2) },
        ]
      : [
          { label: copy.today, key: todayKey },
          { label: copy.tomorrow, key: addDays(todayKey, 1) },
        ];

  const service = preset ?? services.find((s) => s.id === new URLSearchParams(search).get("service"));
  const t = TONES[tone];
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    people: `${uid}-people`,
    date: `${uid}-date`,
    website: `${uid}-website`,
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError(copy.errors.name);
      return;
    }
    if (!isValidPhone(phone)) {
      setError(copy.errors.phone);
      return;
    }
    if (!dateKey || dateKey < firstKey || dateKey > lastKey) {
      setError(copy.errors.date);
      return;
    }
    setError(null);

    saveLead({
      name: trimmedName,
      phone: phone.trim(),
      people,
      date: dateKey,
      serviceId: service?.id,
      source,
      locale,
      website,
    });
    trackWhatsAppLead({ source, people, serviceId: service?.id, locale });

    const message = buildBookingMessage({
      language: locale,
      name: trimmedName,
      people,
      dateKey,
      todayKey,
      serviceName: service?.name,
    });
    const url = whatsappUrl(whatsappNumber, message);

    // New tab keeps the site open on desktop; if a browser blocks it, navigate.
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.href = url;
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all duration-300 ${t.input}`;
  const stepperClass = `w-11 h-11 rounded-full border-2 text-xl font-bold flex items-center justify-center transition-colors duration-200 ${t.stepper}`;

  return (
    <form
      id="reserver"
      onSubmit={handleSubmit}
      noValidate
      className={`scroll-mt-28 rounded-2xl p-5 sm:p-6 text-left ${t.card}`}
    >
      <p className={`font-serif text-lg mb-4 ${t.title}`}>{copy.title}</p>

      {service && (
        <p className={`mb-4 rounded-xl px-3 py-2 text-sm ${t.service}`}>
          {copy.chosen} : <strong>{service.name}</strong> · {service.price} MAD
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor={ids.name} className={`block text-sm font-medium mb-1.5 ${t.label}`}>
            {copy.name}
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={ids.phone} className={`block text-sm font-medium mb-1.5 ${t.label}`}>
            {copy.phone}
          </label>
          <input
            id={ids.phone}
            name="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={copy.phonePlaceholder}
            className={inputClass}
          />
        </div>

        <div>
          <span id={ids.people} className={`block text-sm font-medium mb-1.5 ${t.label}`}>
            {copy.people}
          </span>
          <div className="flex items-center gap-3" role="group" aria-labelledby={ids.people}>
            <button
              type="button"
              aria-label={copy.removePerson}
              onClick={() => setPeople((n) => Math.max(1, n - 1))}
              className={stepperClass}
            >
              −
            </button>
            <span className={`w-8 text-center text-2xl font-bold tabular-nums ${t.count}`} aria-live="polite">
              {people}
            </span>
            <button
              type="button"
              aria-label={copy.addPerson}
              onClick={() => setPeople((n) => Math.min(10, n + 1))}
              className={stepperClass}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label htmlFor={ids.date} className={`block text-sm font-medium mb-1.5 ${t.label}`}>
            {copy.date}
          </label>
          <div className="flex flex-wrap gap-2">
            {quickDays.map((day) => {
              const isSelected = day.key !== "" && dateKey === day.key;
              return (
                <button
                  key={day.label}
                  type="button"
                  disabled={!day.key}
                  aria-pressed={isSelected}
                  onClick={() => setDateKey(day.key)}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors duration-200 ${
                    isSelected ? "bg-gold border-gold text-bamboo-dark" : t.chip
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
            <input
              id={ids.date}
              name="date"
              type="date"
              required
              min={firstKey || undefined}
              max={lastKey || undefined}
              value={dateKey}
              onChange={(e) => setDateKey(e.target.value)}
              className={`flex-1 min-w-[9.5rem] px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold/40 ${t.input}`}
            />
          </div>
        </div>

        {/* Honeypot: hidden from people; bots fill it and their requests are ignored */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={ids.website}>{copy.honeypot}</label>
          <input
            id={ids.website}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className={`text-sm font-medium ${t.error}`}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-base rounded-full transition-colors duration-300"
        >
          <WhatsAppIcon className="w-5 h-5" />
          {copy.submit}
        </button>

        <p className={`text-xs text-center leading-relaxed ${t.note}`}>{copy.note}</p>
      </div>
    </form>
  );
}
