<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Thai Kech

Website of Thai Kech, a mobile spa in Marrakech: massages, hammams and beauty treatments at home, in riads, villas, hotels and apartments, by female therapists, every day from 8:00 to 22:00. Clients book with a short form that opens WhatsApp. French at the root, English under `/en`. Live at https://www.thaikech.com, hosted on Vercel: a push to `main` deploys it.

## How the site works

- No database. Every text and fact lives in `src/content/`: `business.ts` (phone, hours, profiles, `CONTENT_UPDATED`), `services.ts` (prices, durations), `zones.ts` (areas), `guides.ts`, and the French and English copy in `fr/` and `en/`. The shapes are in `types.ts`. `routes.ts` maps each page key to its URL in both languages and feeds the links, hreflang, the sitemap and the static params.
- Text fields use `[label](page key)` for links and `**bold**`, rendered by `src/components/RichText.tsx`.
- Metadata and structured data: `src/lib/seo.ts`. Share images are generated from the content (`src/lib/share-cards.ts`). The booking form posts to `src/app/api/leads/route.ts` (Telegram alert), then opens WhatsApp. Analytics: GA4 only (`src/lib/tracking.ts`); no ad tags until a campaign starts.
- Tools are in `scripts/` (listed in `README.md`); each explains its usage in its first lines.

## Changing content

- Change French and English together.
- A new treatment, area or guide: its id in `types.ts`, its base entry in `services.ts`, `zones.ts` or `guides.ts`, and its copy in `fr/` and `en/`. A guide also needs `target`, `related` and `shownOn`. A new landing page needs its photo in `LANDING_PHOTO` (`src/lib/share-cards.ts`).
- Area pages only with facts unique to the area (access, accommodation, landmarks). No treatment × area pages.
- Never change a slug without a redirect.
- After a change: bump `CONTENT_UPDATED`, update `public/llms.txt` if a fact changed, run the checks listed in the `seo` skill, and rebuild the WhatsApp assistant's knowledge with `node scripts/assistant-knowledge.mjs`.

## Private files

`business/` is git-ignored and exists only on the owner's computer: the WhatsApp assistant and Quick Replies, review replies, the growth plan, research, the SEO workspace (`business/seo/`) and the Google key (`business/secrets/`). This repository is public: never commit anything from `business/`, and no business numbers, client data or keys anywhere else.

## SEO

For any SEO work use the `seo` skill (`.claude/skills/seo/`), with the `serp-scout` and `site-auditor` agents it describes.

## Working with the owner

The owner runs the business and is not a developer. Explain in plain words, ask before committing or pushing, and keep `README.md` and `business/README.md` up to date when files move.
