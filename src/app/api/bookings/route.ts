import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

interface BookingPayload {
  service_id?: string;
  customer_name?: string;
  customer_phone?: string;
  number_of_clients?: number;
  booking_date?: string;
  booking_time?: string;
  riad_name?: string | null;
}

/**
 * POST /api/bookings
 * Saves a booking to Supabase and notifies the business on WhatsApp (CallMeBot).
 * The WhatsApp notification is best-effort: a failed notification never fails
 * the booking, since the row is already persisted.
 */
export async function POST(request: NextRequest) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const service_id = body.service_id?.trim();
  const customer_name = body.customer_name?.trim();
  const customer_phone = body.customer_phone?.trim();
  const booking_date = body.booking_date?.trim();
  const booking_time = body.booking_time?.trim();
  const riad_name = body.riad_name?.trim() || null;
  const number_of_clients =
    Number(body.number_of_clients) > 0 ? Math.floor(Number(body.number_of_clients)) : 1;

  if (!service_id || !customer_name || !customer_phone || !booking_date || !booking_time) {
    return Response.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  // Persist the booking. Insert only (no .select()) so this does not depend on
  // the bookings SELECT policy, which the owner may restrict later.
  const { error: insertError } = await supabase.from("bookings").insert({
    service_id,
    customer_name,
    customer_phone,
    number_of_clients,
    booking_date,
    booking_time,
    riad_name,
    status: "pending",
  });

  if (insertError) {
    console.error("Booking insert failed:", insertError.message);
    return Response.json(
      { error: "Échec de l'enregistrement de la réservation. Veuillez réessayer." },
      { status: 500 }
    );
  }

  // Best-effort WhatsApp notification to the business.
  await notifyBusiness({
    service_id,
    customer_name,
    customer_phone,
    number_of_clients,
    booking_date,
    booking_time,
    riad_name,
  });

  return Response.json({ ok: true }, { status: 201 });
}

interface NotifyDetails {
  service_id: string;
  customer_name: string;
  customer_phone: string;
  number_of_clients: number;
  booking_date: string;
  booking_time: string;
  riad_name: string | null;
}

async function notifyBusiness(b: NotifyDetails): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.warn(
      "CallMeBot not configured (CALLMEBOT_PHONE / CALLMEBOT_APIKEY missing) — skipping WhatsApp notification."
    );
    return;
  }

  // Enrich the message with the service name + total price when available.
  let serviceLabel = b.service_id;
  let totalSuffix = "";
  try {
    const { data: service } = await supabase
      .from("services")
      .select("name, price")
      .eq("id", b.service_id)
      .single();
    if (service) {
      serviceLabel = service.name;
      totalSuffix = ` — ${service.price * b.number_of_clients} MAD`;
    }
  } catch {
    // Fall back to the raw service id.
  }

  const text = [
    "🆕 Nouvelle réservation Thai Kech",
    `${serviceLabel}${totalSuffix}`,
    `${b.customer_name} — ${b.customer_phone}`,
    `${b.number_of_clients} pers. • ${b.booking_date} à ${b.booking_time}`,
    `Lieu: ${b.riad_name || "—"}`,
  ].join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php" +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apikey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("CallMeBot notification failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("CallMeBot notification error:", err);
  }
}
