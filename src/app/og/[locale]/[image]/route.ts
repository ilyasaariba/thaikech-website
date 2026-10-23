import { renderShareImage } from "@/lib/share-image";
import { resolveShareImage, shareCard, shareImageParams } from "@/lib/share-cards";

// One share image (og:image) per page and language, e.g.
// /og/fr/massage-berbere-a-domicile-marrakech.jpg. All are drawn at build
// time; any other name is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return shareImageParams();
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; image: string }> }) {
  const { locale, image } = await params;
  const target = resolveShareImage(locale, image);
  const card = target && shareCard(target.key, target.locale);
  if (!target || !card) return new Response("Not found", { status: 404 });

  const jpeg = await renderShareImage(card, target.locale);
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400" },
  });
}
