/* eslint-disable @next/next/no-img-element -- Satori draws plain <img> elements, not next/image. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import type { Locale } from "@/i18n/locales";
import { BUSINESS } from "@/content/business";
import type { ShareCard } from "./share-cards";

// Draws a share card in the style of the brand card (public/og): the photo
// under a dark green veil, the logo, a gold eyebrow and the title in Cinzel.
// Output is a JPEG of about 100 KB: WhatsApp skips previews of heavy images.

const WIDTH = 1200;
const HEIGHT = 630;
const GREEN = "#1E3529";
const GOLD = "#C5A059";

const BRAND_LINE: Record<Locale, string> = {
  fr: "Spa à domicile · Marrakech",
  en: "Mobile spa · Marrakech",
};

const TAGLINE: Record<Locale, string> = {
  fr: "Dans votre riad, villa ou hôtel — thérapeutes femmes.",
  en: "In your riad, villa or hotel — female therapists.",
};

// Scoped to their folders so the build only traces those, not the whole project.
const publicFile = (path: string) => join(process.cwd(), "public", path);
const fontFile = (file: string) => join(process.cwd(), "src/assets/fonts", file);

type Font = { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" };
let fonts: Promise<Font[]> | undefined;

function loadFonts(): Promise<Font[]> {
  const font = async (file: string, name: string, weight: Font["weight"]): Promise<Font> => ({
    name,
    data: await readFile(fontFile(file)),
    weight,
    style: "normal",
  });
  fonts ??= Promise.all([
    font("Cinzel-Regular.ttf", "Cinzel", 400),
    font("Cinzel-Bold.ttf", "Cinzel", 700),
    font("Outfit-Regular.ttf", "Outfit", 400),
    font("Outfit-SemiBold.ttf", "Outfit", 600),
  ]);
  return fonts;
}

const dataUri = (jpeg: Buffer) => `data:image/jpeg;base64,${jpeg.toString("base64")}`;

/** Longer titles get a smaller size, so even a guide title fits in three lines. */
function titleSize(title: string): number {
  if (title.length <= 24) return 64;
  if (title.length <= 40) return 54;
  if (title.length <= 60) return 46;
  return 40;
}

export async function renderShareImage(card: ShareCard, locale: Locale): Promise<Buffer> {
  const [photo, logo] = await Promise.all([
    sharp(publicFile(card.photo)).flop(card.mirror ?? false).resize(WIDTH, HEIGHT, { fit: "cover" }).jpeg({ quality: 92 }).toBuffer(),
    readFile(publicFile(BUSINESS.logo)),
  ]);

  const response = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: GREEN, fontFamily: "Outfit" }}>
        <img src={dataUri(photo)} alt="" width={WIDTH} height={HEIGHT} style={{ position: "absolute", top: 0, left: 0 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(30,53,41,0.97) 0%, rgba(30,53,41,0.9) 48%, rgba(30,53,41,0.5) 74%, rgba(30,53,41,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            width: WIDTH - 44,
            height: HEIGHT - 44,
            display: "flex",
            border: "1.5px solid rgba(197,160,89,0.5)",
            borderRadius: 8,
          }}
        />
        <div style={{ position: "absolute", top: 50, left: 66, width: 700, height: HEIGHT - 100, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={dataUri(logo)} alt="" width={80} height={80} style={{ borderRadius: 12, border: `1.5px solid ${GOLD}` }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 22 }}>
              <div style={{ display: "flex", fontFamily: "Cinzel", fontSize: 36, letterSpacing: 6, color: GOLD }}>THAI KECH</div>
              <div style={{ display: "flex", marginTop: 4, fontSize: 15, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                {BRAND_LINE[locale]}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexGrow: 1 }} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 56, height: 2, backgroundColor: GOLD }} />
            <div style={{ display: "flex", marginLeft: 16, fontSize: 19, letterSpacing: 3, textTransform: "uppercase", color: GOLD }}>
              {card.eyebrow}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontFamily: "Cinzel",
              fontWeight: 700,
              fontSize: titleSize(card.title),
              lineHeight: 1.15,
              color: "white",
            }}
          >
            {card.title}
          </div>
          {card.badge && (
            <div style={{ display: "flex", marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 20px",
                  borderRadius: 999,
                  backgroundColor: GOLD,
                  color: GREEN,
                  fontSize: 23,
                  fontWeight: 600,
                }}
              >
                {card.badge.map((part, index) => (
                  <div key={part} style={{ display: "flex", alignItems: "center" }}>
                    {index > 0 && <div style={{ display: "flex", margin: "0 12px", opacity: 0.6 }}>·</div>}
                    {part}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", marginTop: 20, fontSize: 23, color: "rgba(255,255,255,0.88)" }}>{TAGLINE[locale]}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 21, letterSpacing: 1, color: GOLD }}>thaikech.com</div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts: await loadFonts() }
  );

  const png = Buffer.from(await response.arrayBuffer());
  return sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
