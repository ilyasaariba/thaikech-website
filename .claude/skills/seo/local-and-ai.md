# Business Profile, reviews and AI assistants: checklists

Read this for any work on the Google Business Profile, reviews, listings or AI assistants (GEO). The figures come from industry studies (Whitespark Local Search Ranking Factors 2026, BrightLocal 2026, Sterling Sky, Ahrefs December 2025, SE Ranking), collected from the open-source `claude-seo` and `geo-seo-claude` skills, which were read on 18 November 2026, not installed. They are correlations and surveys, not Google statements: quote them with their source, and trust the business's own data first.

## Business Profile (a service-area business)

What weighs most in the map results: the **primary category** (the strongest factor; a wrong one is the strongest negative factor), then reviews. Proximity to the profile's location also counts a lot, and nobody can change it: expect to rank best near it, and to need more reviews to show further away.

The owner makes the changes; Claude prepares the texts (`business/seo/gbp-texts.md`). One change every 2 or 3 days, each one dated, so it can be measured.

| Field | Good |
|---|---|
| Primary category | The most specific true one. Changing it moves rankings a lot: only with the owner, and log it |
| Additional categories | 3 to 5 true ones |
| Name | The real name, no keywords added |
| Phone, website | The same as on the site. Each link tagged: website `gbp`, appointment `gbp_booking`, menu or services `gbp_menu`, posts `gbp_post` |
| Hours | 8:00–22:00 every day, plus special hours for Ramadan, Eid and other holidays (a business open at search time ranks better) |
| Service areas | Marrakech and the areas served, up to 20 |
| Description | 250 to 750 characters: the main treatments and the city, true facts only |
| Services | Every treatment with its price and a short description |
| Photos | Logo, cover and 10+ real photos (treatments, set-up, products), with new ones every month. Never stock or AI images |
| Video | At least one short real video |
| Attributes | Every one that is true |
| Posts | One a week |
| Questions and answers | Google is phasing public Q&A out: answer common questions on the site and in the description |

## Reviews

- A steady flow counts more than a big total: aim for no gap longer than 2 to 3 weeks. Clients look mostly at the last 3 months. About 10 reviews is a commonly cited first threshold.
- **Ask every client**, after every treatment, the same way. Google forbids asking only satisfied clients ("review gating"), as well as rewards, asking for stars and asking for particular words.
- Reply to every review within 2 days, in the reviewer's language.
- Reviews on other sites count too (TripAdvisor): clients, and AI assistants, read several.

## Listings (citations)

The same name, phone and website everywhere. In this order: Bing Places (feeds Copilot, reportedly used by ChatGPT for local answers), Apple Business Connect (Apple Maps, Siri), TripAdvisor, Foursquare, telecontact.ma. Never afribaba or massagemaroc.

## AI assistants (GEO)

- Google's position: optimising for AI search is still SEO. Pages that rank get cited. `llms.txt` has no proven effect: keep `public/llms.txt` accurate, spend no time beyond that.
- Where each assistant looks, per third-party studies: **ChatGPT**, the Bing index, Wikipedia, Reddit, TripAdvisor, Yelp, not the Business Profile directly; **Perplexity**, Reddit first; **Gemini**, the Business Profile and YouTube; **Copilot**, Bing and Bing Places.
- Mentions on other sites correlate with AI citations about 3 times more than backlinks (Ahrefs, 75,000 brands); YouTube mentions correlate the most. For this business: a YouTube channel with the same short real videos as Instagram, French and English titles and descriptions with the full website link; TripAdvisor; "best of Marrakech" articles; partner riads.
- On the pages: a short, self-contained answer near the top, with the facts clients ask (price, duration, area, hours, who comes). About 44% of AI citations come from the first 30% of a page (SE Ranking).
- Crawlers: `src/app/robots.ts` lets every bot in (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot, Applebot). Keep it so, and re-check after any change to that file.
- Wikipedia and Wikidata: not for a business of this size (notability rules). Don't create entries.
- Reddit and forums: never post fake recommendations or reviews. Only real mentions count.
- Measure: every month, the 3 test questions in ChatGPT, Gemini and Copilot (temporary chats, screenshots filed in `business/seo/data/`), and the "AI Assistant" channel in Analytics.

## Backlinks: free data

- The Bing Webmaster API (key in `business/seo/README.md`) lists the site's inbound links (`GetLinkCounts`, `GetUrlLinks`): add them to `scripts/bing-data.mjs` when the link work starts.
- Local "best of" lists, local press and partner sites matter more for AI answers than the number of links.
- Paid tools (DataForSEO, Ahrefs, SE Ranking) only with the owner's OK. A Maps position grid (where the profile shows across the city) needs DataForSEO and is paid per scan.
