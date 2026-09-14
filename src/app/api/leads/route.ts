import { after, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
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
 * Saves a WhatsApp booking request (name, phone, people, date, page, language)
 * so it can be followed up even if the visitor never presses send in
 * WhatsApp, then alerts the business on Telegram. The form calls it with
 * navigator.sendBeacon, so the page never waits for or reads the response.
 */
export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Bots fill every field, including the hidden one: accept silently, save nothing.
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

  // Insert only (no .select()): leads are private and never read back here.
  const { error } = await supabase.from("leads").insert({
    customer_name: name,
    customer_phone: phone,
    people,
    requested_date: date,
    service_id: service?.id ?? null,
    source,
    locale,
    status: "new",
  });

  if (error) {
    console.error("Lead insert failed:", error.message);
  }

  // Alert after responding; the alert also covers a failed insert, so the
  // request is never lost.
  after(() =>
    notifyBusiness({ name, phone, people, date, serviceName: service?.name, source, locale, saved: !error })
  );

  return Response.json({ ok: true }, { status: error ? 202 : 201 });
}

interface LeadAlert {
  name: string;
  phone: string;
  people: number;
  date: string;
  serviceName?: string;
  source: string | null;
  locale: "fr" | "en";
  saved: boolean;
}

async function notifyBusiness(lead: LeadAlert): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "Telegram not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing) — skipping lead notification."
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
    lead.saved ? "" : "⚠️ Non enregistrée dans Supabase",
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
      console.error("Telegram notification failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Telegram notification error:", err);
  }
}
