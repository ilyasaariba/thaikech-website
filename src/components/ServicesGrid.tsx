import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/data";

export default async function ServicesGrid() {
  const services = await getServices();

  if (services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 sm:py-28 bg-lotus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Nos Soins
            </span>
            <span className="block w-10 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-bamboo mb-4">
            L&apos;Expérience Thai Kech
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto text-base sm:text-lg">
            Découvrez nos massages thaïlandais de luxe, adaptés à vos besoins et
            livrés directement dans le confort de votre riad ou villa.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            // Map webp paths to png for generated images
            const imgSrc = service.image_path.replace(".webp", ".png");

            return (
              <Link
                key={service.id}
                href={`/book?service=${service.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-lotus-dark/50 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bamboo-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-bamboo/90 backdrop-blur-sm text-gold px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    {service.price} MAD
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-bamboo mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-wide group-hover:gap-3 transition-all duration-300">
                    Réserver ce soin
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
