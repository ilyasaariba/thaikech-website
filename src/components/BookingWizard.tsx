"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  image_path: string;
}

const STEPS = [
  { label: "Service", icon: "✦" },
  { label: "Coordonnées", icon: "✦" },
  { label: "Date & Heure", icon: "✦" },
  { label: "Confirmation", icon: "✓" },
];

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form data
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    preselectedService
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfClients, setNumberOfClients] = useState(1);
  const [riadName, setRiadName] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Load services
  useEffect(() => {
    async function fetchServices() {
      try {
        const { data } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("price", { ascending: true });
        if (data) setServices(data);
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Auto-advance if service is pre-selected
  useEffect(() => {
    if (preselectedService && services.length > 0) {
      const found = services.find((s) => s.id === preselectedService);
      if (found) {
        setSelectedServiceId(found.id);
        setStep(2);
      }
    }
  }, [preselectedService, services]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  // Generate time slots
  const timeSlots = Array.from({ length: 28 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const mins = i % 2 === 0 ? "00" : "30";
    if (hour >= 23) return null;
    return `${String(hour).padStart(2, "0")}:${mins}`;
  }).filter(Boolean) as string[];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const canProceedStep2 = name.trim() && phone.trim();
  const canProceedStep3 = selectedDate && selectedTime;

  const handleSubmit = useCallback(async () => {
    if (!selectedService || submitting) return;
    setSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        service_id: selectedService.id,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        number_of_clients: numberOfClients,
        booking_date: selectedDate,
        booking_time: selectedTime,
        riad_name: riadName.trim() || null,
        status: "pending",
      });

      if (!error) {
        setSuccess(true);
        setStep(4);
      }
    } catch {
      // Error handling
    } finally {
      setSubmitting(false);
    }
  }, [selectedService, submitting, name, phone, numberOfClients, selectedDate, selectedTime, riadName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-lotus flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-charcoal-light text-sm tracking-wider">
            Chargement...
          </span>
        </div>
      </div>
    );
  }

  // ===== SUCCESS SCREEN =====
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bamboo to-bamboo-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Success animation */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gold rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-bamboo-dark"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Réservation Enregistrée !
          </h1>
          <p className="text-white/70 text-lg mb-2">
            Merci <span className="text-gold font-medium">{name}</span>,
          </p>
          <p className="text-white/60 mb-8 leading-relaxed">
            Votre demande pour le{" "}
            <span className="text-white font-medium">
              {selectedService?.name}
            </span>{" "}
            le{" "}
            <span className="text-gold">
              {selectedDate && formatDate(selectedDate)} à {selectedTime}
            </span>{" "}
            a été enregistrée avec succès.
            <br />
            <br />
            Nous vous contacterons très rapidement sur{" "}
            <span className="text-white">{phone}</span> pour confirmer
            votre rendez-vous.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/212771610656?text=${encodeURIComponent(
                `Bonjour Thai Kech, je viens de réserver un ${selectedService?.name} pour le ${selectedDate} à ${selectedTime}. Mon nom est ${name}, pour ${numberOfClients} personne(s). Merci de confirmer.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirmer via WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-white/30 text-white font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== WIZARD FORM =====
  return (
    <div className="min-h-screen bg-lotus">
      {/* Top Bar */}
      <div className="bg-bamboo-dark">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gold/40">
              <Image
                src="/assets/logo.png"
                alt="Thai Kech"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="font-serif text-lg text-gold tracking-wider">
              THAI KECH
            </span>
          </Link>
          <Link
            href="/"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            ✕ Fermer
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-lotus-dark/30">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isDone
                          ? "bg-gold text-bamboo-dark"
                          : isActive
                          ? "bg-bamboo text-white ring-4 ring-gold/20"
                          : "bg-lotus-dark/60 text-charcoal-light"
                      }`}
                    >
                      {isDone ? "✓" : stepNum}
                    </div>
                    <span
                      className={`text-[0.65rem] tracking-wider uppercase font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-bamboo"
                          : isDone
                          ? "text-gold"
                          : "text-charcoal-light/60"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`hidden sm:block h-px flex-1 mx-2 transition-colors duration-500 ${
                        step > stepNum ? "bg-gold" : "bg-lotus-dark/40"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* ===== STEP 1: Select Service ===== */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-2">
              Choisissez votre soin
            </h2>
            <p className="text-charcoal-light mb-8">
              Sélectionnez le massage qui vous convient.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => {
                const imgSrc = service.image_path.replace(".webp", ".png");
                const isSelected = selectedServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-gold shadow-lg shadow-gold/10 ring-2 ring-gold/20"
                        : "border-lotus-dark/40 hover:border-gold/40 shadow-sm"
                    }`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                            <svg className="w-6 h-6 text-bamboo-dark" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-bamboo/90 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-sm font-bold">
                        {service.price} MAD
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-serif text-base text-bamboo mb-1">
                        {service.name}
                      </h3>
                      <p className="text-charcoal-light text-xs leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => selectedServiceId && setStep(2)}
                disabled={!selectedServiceId}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold tracking-wider text-sm uppercase transition-all duration-300 ${
                  selectedServiceId
                    ? "bg-gold text-bamboo-dark hover:bg-gold-light"
                    : "bg-lotus-dark/40 text-charcoal-light/50 cursor-not-allowed"
                }`}
              >
                Continuer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 2: Contact Info ===== */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-2">
              Vos coordonnées
            </h2>
            <p className="text-charcoal-light mb-8">
              Comment pouvons-nous vous contacter pour confirmer ?
            </p>

            <div className="space-y-5 max-w-md">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl border border-lotus-dark/50 bg-white text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Téléphone (WhatsApp de préférence) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl border border-lotus-dark/50 bg-white text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Nombre de personnes *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setNumberOfClients((n) => Math.max(1, n - 1))}
                    className="w-11 h-11 rounded-full border-2 border-lotus-dark/50 hover:border-gold text-charcoal text-xl font-bold transition-all duration-200 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-2xl font-bold text-bamboo tabular-nums">
                    {numberOfClients}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNumberOfClients((n) => Math.min(10, n + 1))}
                    className="w-11 h-11 rounded-full border-2 border-lotus-dark/50 hover:border-gold text-charcoal text-xl font-bold transition-all duration-200 flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-sm text-charcoal-light">
                    {numberOfClients === 1 ? "personne" : "personnes"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Nom du riad / villa / hôtel{" "}
                  <span className="text-charcoal-light font-normal">
                    (optionnel)
                  </span>
                </label>
                <input
                  type="text"
                  value={riadName}
                  onChange={(e) => setRiadName(e.target.value)}
                  placeholder="Riad Yasmine, Chambre 4"
                  className="w-full px-4 py-3 rounded-xl border border-lotus-dark/50 bg-white text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 text-charcoal-light hover:text-bamboo font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Retour
              </button>
              <button
                onClick={() => canProceedStep2 && setStep(3)}
                disabled={!canProceedStep2}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold tracking-wider text-sm uppercase transition-all duration-300 ${
                  canProceedStep2
                    ? "bg-gold text-bamboo-dark hover:bg-gold-light"
                    : "bg-lotus-dark/40 text-charcoal-light/50 cursor-not-allowed"
                }`}
              >
                Continuer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: Date & Time ===== */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-2">
              Choisissez la date & l&apos;heure
            </h2>
            <p className="text-charcoal-light mb-8">
              Sélectionnez le créneau idéal pour votre massage.
            </p>

            {/* Date Picker */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
                📅 Jour
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {availableDates.map((date) => {
                  const d = new Date(date + "T00:00:00");
                  const isToday =
                    date === new Date().toISOString().split("T")[0];
                  const isSelected = selectedDate === date;
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[5rem] ${
                        isSelected
                          ? "border-gold bg-gold/10 text-bamboo"
                          : "border-lotus-dark/30 hover:border-gold/40 text-charcoal"
                      }`}
                    >
                      <span className="text-[0.65rem] uppercase tracking-wider font-medium text-charcoal-light">
                        {d.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </span>
                      <span className="text-xl font-bold mt-0.5">
                        {d.getDate()}
                      </span>
                      <span className="text-[0.65rem] text-charcoal-light">
                        {d.toLocaleDateString("fr-FR", { month: "short" })}
                      </span>
                      {isToday && (
                        <span className="text-[0.55rem] text-gold font-semibold mt-0.5">
                          Aujourd&apos;hui
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Picker */}
            {selectedDate && (
              <div className="animate-fade-in-up">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
                  🕐 Heure
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "border-gold bg-gold text-bamboo-dark"
                            : "border-lotus-dark/30 hover:border-gold/50 text-charcoal"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Preview */}
            {selectedDate && selectedTime && selectedService && (
              <div className="mt-8 p-5 bg-white rounded-2xl border border-gold/30 shadow-sm animate-fade-in-up">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
                  Résumé de votre réservation
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Service</span>
                    <span className="font-medium text-bamboo">
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Personnes</span>
                    <span className="font-medium text-bamboo">
                      {numberOfClients} {numberOfClients === 1 ? "personne" : "personnes"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Date</span>
                    <span className="font-medium text-bamboo">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Heure</span>
                    <span className="font-medium text-bamboo">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-lotus-dark/20">
                    <span className="font-semibold text-bamboo">Total</span>
                    <span className="font-bold text-gold text-lg">
                      {selectedService.price * numberOfClients} MAD
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 text-charcoal-light hover:text-bamboo font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canProceedStep3 || submitting}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold tracking-wider text-sm uppercase transition-all duration-300 ${
                  canProceedStep3 && !submitting
                    ? "bg-gold text-bamboo-dark hover:bg-gold-light animate-gold-pulse"
                    : "bg-lotus-dark/40 text-charcoal-light/50 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-bamboo-dark border-t-transparent rounded-full animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    Confirmer la Réservation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
