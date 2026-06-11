"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/data";

interface ServicesTabsProps {
  services: Service[];
}

export default function ServicesTabs({ services }: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState<"massage" | "hammam">("massage");

  const filteredServices = services.filter((service) => {
    const category = service.category || "massage";
    return category === activeTab;
  });

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex justify-center gap-3 sm:gap-5 mb-12">
        <button
          onClick={() => setActiveTab("massage")}
          className={`px-6 sm:px-8 py-3.5 rounded-full font-serif text-sm sm:text-base tracking-wider transition-all duration-300 border-2 ${
            activeTab === "massage"
              ? "bg-bamboo text-gold border-gold shadow-lg shadow-bamboo-dark/20"
              : "bg-white/80 text-bamboo-dark border-lotus-dark/30 hover:border-gold/50 hover:bg-gold/5"
          }`}
        >
          🧘 Massages
        </button>
        <button
          onClick={() => setActiveTab("hammam")}
          className={`px-6 sm:px-8 py-3.5 rounded-full font-serif text-sm sm:text-base tracking-wider transition-all duration-300 border-2 ${
            activeTab === "hammam"
              ? "bg-bamboo text-gold border-gold shadow-lg shadow-bamboo-dark/20"
              : "bg-white/80 text-bamboo-dark border-lotus-dark/30 hover:border-gold/50 hover:bg-gold/5"
          }`}
        >
          🫧 Hammams
        </button>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {filteredServices.map((service) => {
          const imgSrc = service.image_path.replace(".webp", ".png");
          const duration = service.duration || "";

          return (
            <Link
              key={service.id}
              href={`/book?service=${service.id}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-lotus-dark/50 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bamboo-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {duration && (
                    <span className="bg-bamboo-dark/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium tracking-wide flex items-center gap-1 shadow-md">
                      🕐 {duration}
                    </span>
                  )}
                  <span className="bg-bamboo/90 backdrop-blur-sm text-gold px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg ml-auto">
                    {service.price} MAD
                  </span>
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
  );
}
