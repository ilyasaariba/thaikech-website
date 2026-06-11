const testimonials = [
  {
    name: "Youssef B.",
    origin: "Casablanca, Maroc",
    text: "J'ai réservé le Hammam Royal pour mon épouse pendant notre séjour à Marrakech. Le thérapeute est arrivé à l'heure avec tout le matériel. Ma femme était ravie, elle dit que c'est le meilleur hammam qu'elle ait jamais eu. Service très professionnel.",
    rating: 5,
  },
  {
    name: "Camille & Pierre M.",
    origin: "Paris, France",
    text: "On a testé le massage à 4 mains pendant nos vacances au riad. C'était une première pour nous et franchement, on ne regrette pas. Les deux masseuses étaient parfaitement synchronisées. Un vrai moment de détente après nos journées dans les souks.",
    rating: 5,
  },
  {
    name: "Thomas V.",
    origin: "Bruxelles, Belgique",
    text: "Massage thaï réservé la veille pour le lendemain matin. Ponctualité parfaite, serviettes chaudes très appréciées. Exactement ce qu'il fallait après un trek dans l'Atlas. Je recommande sans hésiter, rapport qualité-prix imbattable.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-gold"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="avis" className="py-20 sm:py-28 bg-lotus-dark/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Témoignages
            </span>
            <span className="block w-10 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-bamboo mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-charcoal-light max-w-xl mx-auto text-base sm:text-lg">
            Des moments de pure relaxation que nos clients n&apos;oublient pas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 border border-lotus-dark/30"
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-gold/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4.017v10H0z" />
              </svg>

              {/* Stars */}
              <StarRating count={testimonial.rating} />

              {/* Text */}
              <p className="mt-4 text-charcoal text-sm leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-lotus-dark/30">
                <p className="font-semibold text-bamboo text-sm">
                  {testimonial.name}
                </p>
                <p className="text-charcoal-light text-xs mt-0.5">
                  {testimonial.origin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
