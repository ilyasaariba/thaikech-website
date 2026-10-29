interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  intro?: string;
  tone?: "light" | "dark";
}

/** Centered eyebrow + H2 + intro used by the homepage sections. */
export default function SectionHeading({ eyebrow, heading, intro, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className="text-center mb-14">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className={`block w-10 h-px ${dark ? "bg-gold/60" : "bg-gold"}`} />
        <span className={`text-xs tracking-[0.3em] uppercase font-medium ${dark ? "text-gold" : "text-gold-dark"}`}>{eyebrow}</span>
        <span className={`block w-10 h-px ${dark ? "bg-gold/60" : "bg-gold"}`} />
      </div>
      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl mb-4 ${dark ? "text-white" : "text-bamboo"}`}>
        {heading}
      </h2>
      {intro && (
        <p className={`max-w-2xl mx-auto text-base sm:text-lg ${dark ? "text-white/60" : "text-charcoal-light"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
