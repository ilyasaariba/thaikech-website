import { after, type NextRequest } from "next/server";
import { getService, isServiceId } from "@/content/services";
import {
  formatLongDate,
  isLeadSource,
  isRequestableDate,
  isValidPhone,
  marrakechToday,
} from "@/lib/whatsapp-booking";

interface LeadPayload {
  name?: string;
  phone?: string;
  people?: number;
  date?: string;
  serviceId?: string;
  source?: string;
  locale?: string;
  website?: string; // honeypot: hidden in the form, only bots fill it
}

// Light per-instance throttle against form flooding. Serverless instances are
// short-lived, so this complements a Vercel Firewall rate-limit rule.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  recentByIp.set(ip, recent);
  return recent.length > RATE_MAX;
}

/**
 * POST /api/leads
 * Sends a WhatsApp booking request (name, phone, people, date, page,
 * language) to the business on Telegram, so it can be followed up even if
 * the visitor never presses send in WhatsApp. Nothing is stored on our side:
 * the Telegram chat is the record. The form calls it with
 * navigator.sendBeacon, so the page never waits for or reads the response.
 */
export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Bots fill every field, including the hidden one: accept silently, send nothing.
  if (body.website) {
    return new Response(null, { status: 204 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Trop de demandes." }, { status: 429 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const people = Math.floor(Number(body.people));
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const source = typeof body.source === "string" && isLeadSource(body.source) ? body.source : null;
  const locale = body.locale === "en" ? "en" : "fr";
  // The owner reads alerts in French, so the treatment name is the French one.
  const service =
    typeof body.serviceId === "string" && isServiceId(body.serviceId) ? getService(body.serviceId, "fr") : undefined;

  if (
    name.length < 2 ||
    name.length > 80 ||
    !isValidPhone(phone) ||
    !(people >= 1 && people <= 10) ||
    !isRequestableDate(date, marrakechToday().dateKey)
  ) {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  // Alert after responding, so the visitor's hand-over to WhatsApp never waits.
  after(() => notifyBusiness({ name, phone, people, date, serviceName: service?.name, source, locale }));

  return Response.json({ ok: true }, { status: 202 });
}

interface LeadAlert {
  name: string;
  phone: string;
  people: number;
  date: string;
  serviceName?: string;
  source: string | null;
  locale: "fr" | "en";
}

async function notifyBusiness(lead: LeadAlert): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "Telegram not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing): booking request lost.",
      lead
    );
    return;
  }

  // A one-tap reply link works only for numbers written in international format.
  const digits = lead.phone.replace(/\D/g, "");
  const international = lead.phone.startsWith("+")
    ? digits
    : lead.phone.startsWith("00")
      ? digits.slice(2)
      : null;

  const text = [
    "📲 Nouvelle demande de réservation Thai Kech",
    `${lead.name} — ${lead.phone}`,
    `${lead.people} pers. • ${formatLongDate(lead.date)}`,
    `Soin : ${lead.serviceName || "à conseiller"}`,
    lead.locale === "en" ? "Langue : anglais 🇬🇧 (répondre en anglais)" : "Langue : français",
    `Page : ${lead.source || "inconnue"}`,
    international ? `Répondre : https://wa.me/${international}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("Telegram notification failed:", res.status, await res.text(), lead);
    }
  } catch (err) {
    console.error("Telegram notification error:", err, lead);
  }
}
