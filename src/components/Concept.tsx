const steps = [
  {
    number: "01",
    title: "Choisissez & Réservez",
    description:
      "Sélectionnez votre soin favori, choisissez la date et l'heure qui vous conviennent. Confirmation immédiate.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Confirmation Instantanée",
    description:
      "Notre équipe vous contacte rapidement par WhatsApp ou téléphone pour confirmer votre créneau et assigner votre thérapeute.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Détente Absolue",
    description:
      "Votre thérapeute arrive avec tout le nécessaire : table de massage, huiles bio, musique d'ambiance et diffuseur d'aromathérapie.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function Concept() {
  return (
    <section id="concept" className="py-20 sm:py-28 bg-bamboo relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(197,160,89,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-px bg-gold/60" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Comment Ça Marche
            </span>
            <span className="block w-10 h-px bg-gold/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Votre Spa, en 3 Étapes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg">
            Un service conçu pour votre confort absolu. Sans stress, sans
            déplacement.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 to-gold/10" />
              )}

              <div className="text-center p-8 rounded-2xl border border-gold/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-gold/30 transition-all duration-500">
                {/* Step Number */}
                <span className="inline-block text-gold/20 font-serif text-5xl font-bold mb-4">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="flex justify-center mb-4 text-gold">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
