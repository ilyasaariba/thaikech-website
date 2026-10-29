import Image from "next/image";
import Link from "next/link";
import { otherLocale, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import { getServices } from "@/content/services";
import { getZones } from "@/content/zones";
import { pathFor } from "@/content/routes";
import { FacebookIcon, InstagramIcon, MapPinIcon, StarIcon, WhatsAppIcon } from "@/components/icons";
import ContactLink from "./ContactLink";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const PROFILES = [
  { network: "Google Maps", href: BUSINESS.profiles.google, Icon: MapPinIcon },
  { network: "Instagram", href: BUSINESS.profiles.instagram, Icon: InstagramIcon },
  { network: "Facebook", href: BUSINESS.profiles.facebook, Icon: FacebookIcon },
];

/**
 * Links every treatment, area and info page, so no page is more than two clicks from any other.
 * The WhatsApp button sends the same page-aware message as the floating button.
 */
export default function SiteFooter({
  locale,
  alternateHref,
  whatsappHref,
}: {
  locale: Locale;
  alternateHref: string;
  whatsappHref: string;
}) {
  const ui = UI[locale];
  const alternate = otherLocale(locale);
  const columnTitle = "font-serif text-white text-lg mb-5";
  const linkClass = "hover:text-gold transition-colors";

  return (
    <footer className="bg-bamboo-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gold/40">
                <Image src={BUSINESS.logo} alt="Thai Kech" fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <span className="font-serif text-xl text-gold tracking-wider block">THAI KECH</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white/40">{ui.tagline}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">{ui.footer.description}</p>
            <p className="flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-5">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
              {ui.footer.available}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-white/40">{ui.footer.phone} : </span>
                <ContactLink
                  href={`tel:+${BUSINESS.phoneDigits}`}
                  method="phone"
                  placement="footer"
                  locale={locale}
                  className="text-white hover:text-gold transition-colors"
                >
                  {BUSINESS.phoneDisplay}
                </ContactLink>
              </li>
              <li>
                <span className="text-white/40">{ui.footer.email} : </span>
                <a href={`mailto:${BUSINESS.email}`} className="text-white hover:text-gold transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <ContactLink
              href={whatsappHref}
              method="whatsapp"
              placement="footer"
              locale={locale}
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-medium text-sm rounded-full transition-colors duration-300"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {ui.footer.whatsapp}
            </ContactLink>
            {/* rel="me": these profiles belong to the business, the same entity as this site. */}
            <ul className="mt-6 flex items-center gap-3">
              {PROFILES.map(({ network, href, Icon }) => (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={ui.footer.profile.replace("{network}", network)}
                    title={network}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={BUSINESS.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <StarIcon className="w-4 h-4" />
              {ui.footer.review}
            </a>
          </div>

          <div>
            <p className={columnTitle}>{ui.footer.treatments}</p>
            <ul className="space-y-2.5 text-sm">
              {getServices(locale).map((service) => (
                <li key={service.id}>
                  <Link href={pathFor(`service:${service.id}`, locale)} className={linkClass}>
                    {capitalize(service.shortName)}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href={pathFor("hammam", locale)} className={linkClass}>
                  {ui.nav.hammamHub}
                </Link>
              </li>
              <li>
                <Link href={pathFor("beauty", locale)} className={linkClass}>
                  {ui.nav.beautyHub}
                </Link>
              </li>
              <li>
                <Link href={pathFor("duo", locale)} className={linkClass}>
                  {ui.nav.duo}
                </Link>
              </li>
              <li>
                <Link href={pathFor("inRoom", locale)} className={linkClass}>
                  {ui.nav.inRoom}
                </Link>
              </li>
              <li>
                <Link href={pathFor("groups", locale)} className={linkClass}>
                  {ui.nav.groups}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={columnTitle}>{ui.footer.areas}</p>
            <ul className="space-y-2.5 text-sm">
              {getZones(locale).map((zone) => (
                <li key={zone.id}>
                  <Link href={pathFor(`zone:${zone.id}`, locale)} className={linkClass}>
                    {zone.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href={pathFor("areas", locale)} className={linkClass}>
                  {ui.common.allAreas}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={columnTitle}>{ui.footer.info}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={pathFor("prices", locale)} className={linkClass}>
                  {ui.nav.prices}
                </Link>
              </li>
              <li>
                <Link href={pathFor("guides", locale)} className={linkClass}>
                  {ui.nav.guides}
                </Link>
              </li>
              <li>
                <Link href={pathFor("charter", locale)} className={linkClass}>
                  {ui.nav.charter}
                </Link>
              </li>
              <li>
                <Link href={pathFor("book", locale)} className={linkClass}>
                  {ui.nav.bookNow}
                </Link>
              </li>
              <li className="pt-2">
                <a href={alternateHref} hrefLang={alternate} lang={alternate} className={linkClass}>
                  {UI[alternate].language.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>
            &copy; {new Date().getFullYear()} Thai Kech. {ui.footer.rights}
          </span>
          <span>{ui.footer.bottom}</span>
          <Link href={pathFor("privacy", locale)} className="hover:text-gold transition-colors">
            {ui.nav.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
