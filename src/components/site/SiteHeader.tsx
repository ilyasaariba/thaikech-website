import { otherLocale, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import { getServices } from "@/content/services";
import { pathFor } from "@/content/routes";
import NavMenu from "./NavMenu";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default function SiteHeader({
  locale,
  alternateHref,
  overlay,
}: {
  locale: Locale;
  alternateHref: string;
  overlay: boolean;
}) {
  const ui = UI[locale];
  const alternate = otherLocale(locale);
  const services = getServices(locale);
  const toLink = (id: (typeof services)[number]) => ({
    href: pathFor(`service:${id.id}`, locale),
    label: capitalize(id.shortName),
  });

  return (
    <NavMenu
      homeHref={pathFor("home", locale)}
      bookHref="#reserver"
      overlay={overlay}
      logo={BUSINESS.logo}
      labels={{
        tagline: ui.tagline,
        treatments: ui.nav.treatments,
        massages: ui.nav.massages,
        hammams: ui.nav.hammams,
        book: ui.nav.book,
        bookNow: ui.nav.bookNow,
        menu: ui.nav.menu,
      }}
      massages={services.filter((s) => s.category === "massage").map(toLink)}
      hammams={services.filter((s) => s.category === "hammam").map(toLink)}
      extras={[
        { href: pathFor("hammam", locale), label: ui.nav.hammamHub },
        { href: pathFor("duo", locale), label: ui.nav.duo },
        { href: pathFor("inRoom", locale), label: ui.nav.inRoom },
      ]}
      links={[
        { href: pathFor("areas", locale), label: ui.nav.areas },
        { href: pathFor("prices", locale), label: ui.nav.prices },
        { href: pathFor("guides", locale), label: ui.nav.guides },
      ]}
      alternate={{
        href: alternateHref,
        code: UI[alternate].language.code,
        label: UI[alternate].language.label,
        lang: alternate,
      }}
    />
  );
}
