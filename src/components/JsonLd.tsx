/**
 * Structured data rendered as a plain <script>, per the Next.js JSON-LD guide,
 * with "<" escaped so content can never close the tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
