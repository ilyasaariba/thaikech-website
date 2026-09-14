import type { Locale } from "@/i18n/locales";
import type { Block, Section } from "@/content/types";
import RichText from "./RichText";

export function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (typeof block === "string") {
          return (
            <p key={index} className="text-charcoal-light leading-relaxed mb-4 last:mb-0">
              <RichText text={block} locale={locale} />
            </p>
          );
        }
        if ("note" in block) {
          return (
            <p
              key={index}
              className="my-5 rounded-xl border-l-4 border-gold bg-white px-5 py-4 text-sm text-charcoal leading-relaxed"
            >
              <RichText text={block.note} locale={locale} />
            </p>
          );
        }
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`mb-4 last:mb-0 space-y-2.5 text-charcoal-light leading-relaxed ${
              block.ordered ? "list-decimal pl-6 marker:text-gold marker:font-semibold" : ""
            }`}
          >
            {block.list.map((item) => (
              <li key={item} className={block.ordered ? "pl-1" : "flex gap-3"}>
                {!block.ordered && (
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                )}
                <span>
                  <RichText text={item} locale={locale} />
                </span>
              </li>
            ))}
          </ListTag>
        );
      })}
    </>
  );
}

export default function ContentSections({ sections, locale }: { sections: Section[]; locale: Locale }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading} className="mt-12 first:mt-0">
          <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-5 leading-snug">{section.heading}</h2>
          <Blocks blocks={section.blocks} locale={locale} />
        </section>
      ))}
    </>
  );
}
