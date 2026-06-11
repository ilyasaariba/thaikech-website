import { getServices } from "@/lib/data";
import ServicesTabs from "./ServicesTabs";

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
            Découvrez nos massages et hammams de luxe, adaptés à vos besoins et
            livrés directement dans le confort de votre riad ou villa.
          </p>
        </div>

        {/* Categories and Grid Tabs */}
        <ServicesTabs services={services} />
      </div>
    </section>
  );
}
