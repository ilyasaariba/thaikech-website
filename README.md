# Thai Kech

Website and business files of Thai Kech, the mobile spa in Marrakech: massages, hammams and beauty treatments at home, in riads, villas and hotels. Live site: https://www.thaikech.com (French) and https://www.thaikech.com/en (English).

## What is in this folder

| Folder or file | What it is | On GitHub |
|---|---|---|
| `src/` | The website code | yes |
| `src/content/` | Every text and fact on the site: treatments and prices (`services.ts`, `fr/services.ts`, `en/services.ts`), areas (`zones.ts`), guides (`guides.ts`), phone, hours and profiles (`business.ts`) | yes |
| `public/` | Photos, logo, share images, `llms.txt` (summary for AI search), and the Google and IndexNow verification files | yes |
| `scripts/` | Tools, listed below | yes |
| `.github/workflows/` | After each deploy, tells Bing which pages changed | yes |
| `business/` | Private business files: WhatsApp replies, AI assistant, review replies, growth plan, research, original logo. See `business/README.md` | **no, private** |
| `AGENTS.md`, `CLAUDE.md` | Instructions for Claude | yes |
| Other files | Next.js settings. `node_modules/` and `.next/` are generated and can be deleted at any time | — |

## Tools (`scripts/`)

| Tool | What it does |
|---|---|
| `indexnow.mjs` | Tells Bing, Yandex and the other IndexNow engines which pages changed. Runs by itself after each deploy |
| `seo-crawl.mjs` | Crawls a local build: titles, descriptions, canonicals, hreflang, share images, H1, structured data, broken links. With `--compare` it proves a change moved nothing Google reads |
| `title-width.mjs` | Measures titles in pixels, the way Google cuts them (about 580px) |
| `page-similarity.mjs` | Measures how much text pages share, so area pages never look like copies of each other |
| `screenshot.mjs` | Takes a screenshot of a page at phone or desktop width |
| `competitor-scrape.mjs` | Reads competitors' sites and sitemaps (list in `business/growth-plan.md`, section 14) |
| `google-data.mjs` | Pulls Search Console (queries, pages, positions, index status) and Google Analytics 4 (visits and WhatsApp leads) into `business/seo/data/`. Setup in `business/seo/README.md` |
| `assistant-knowledge.mjs` | Builds `business/whatsapp/knowledge.md`, the knowledge file of the WhatsApp AI assistant, from the site's content |

Each tool explains its usage in its first lines. The crawl tools run against a production build: `npm run build`, then `npx next start -p 3123`.

## Work on the site

- Run it on this computer: `npm install` once, then `npm run dev` and open http://localhost:3000.
- Publish: push to the `main` branch on GitHub, and Vercel deploys www.thaikech.com automatically.
- When a price or treatment changes, also update `public/llms.txt`, the Quick Replies in `business/whatsapp/quick-replies.md`, and the Google Business Profile. Then rebuild the assistant's knowledge (`node scripts/assistant-knowledge.mjs`) and replace `knowledge.md` in the Claude Project.
