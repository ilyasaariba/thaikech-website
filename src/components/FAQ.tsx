"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Comment se passe l'installation à domicile ou dans notre riad ?",
    answer: "Votre thérapeute arrive avec tout le matériel nécessaire : table de massage pliante professionnelle, huiles de massage d'argan bio, serviettes chaudes à usage unique, ainsi qu'un diffuseur d'huiles essentielles et une musique d'ambiance pour recréer l'expérience complète d'un spa cinq étoiles dans votre chambre, suite ou au bord de la piscine."
  },
  {
    question: "Quels sont vos tarifs de déplacement et zones de service ?",
    answer: "Le déplacement est entièrement gratuit dans Marrakech et ses environs proches (Médina, Guéliz, Hivernage, Palmeraie). Pour les zones plus éloignées (Route de l'Ourika, route d'Amizmiz, etc.), des frais minimes de déplacement peuvent s'appliquer, nous vous en informerons lors de la confirmation."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Vous pouvez régler directement le thérapeute après votre massage, soit en espèces (Dirhams MAD ou Euros EUR), soit par carte bancaire."
  },
  {
    question: "Proposez-vous des massages en duo ou en couple ?",
    answer: "Oui, nous proposons des massages en duo ou en couple. Deux thérapeutes se déplaceront simultanément pour réaliser vos soins côte à côte dans votre riad ou villa."
  },
  {
    question: "Combien de temps à l'avance dois-je réserver mon soin ?",
    answer: "Nous recommandons de réserver au moins 2 heures à l'avance pour vous garantir la disponibilité de nos thérapeutes. Cependant, nous sommes opérationnels 24h/7 et faisons de notre mieux pour honorer les réservations de dernière minute."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-lotus relative overflow-hidden">
      {/* FAQ Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Questions Fréquentes
            </span>
            <span className="block w-10 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-bamboo mb-4">
            FAQ & Bien-être
          </h2>
          <p className="text-charcoal-light max-w-xl mx-auto text-base sm:text-lg">
            Tout ce que vous devez savoir pour préparer votre moment de détente à Marrakech.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-lotus-dark/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-serif text-base sm:text-lg text-bamboo hover:text-gold transition-colors duration-300 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`ml-4 flex-shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-lotus-dark/30" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-charcoal-light text-sm sm:text-base leading-relaxed bg-lotus/20">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
