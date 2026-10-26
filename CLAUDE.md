# CLAUDE.md: zenithecon.com

Instructions for any AI coding assistant working in this repository. Last reviewed 2026-10-26.

## Standing rules

1. Improve the site without giving up what already works. Every change must leave existing search rankings, AI-answer citations and agent readability (SEO, AEO/GEO, AI search) intact. When an improvement and current performance conflict, current performance wins. If an edit's effect on a ranking page is uncertain, make the smaller edit or leave the page alone and flag it to Sam.
2. Use reputable, current guidance. Base SEO and AI-search decisions on advice that is current as of late October 2026, and lean toward where the platforms are heading rather than older practice. Primary sources come first: Google Search Central (including "Optimizing your website for generative AI features on Google Search"), Bing Webmaster Tools / Microsoft, OpenAI and Anthropic crawler documentation, web.dev, schema.org. Use vendor studies (Ahrefs, Semrush and similar) as supporting evidence, never as the only basis for a change. Do not act on vendor claims that conflict with first-party documentation. When guidance may have changed since this file was written, search for the latest version before acting and note the source and date in the PR.
3. Write to tropes_v2. All new or rewritten copy, including headings, alt text, meta descriptions and schema descriptions, follows `_internal/tropes_v2.md`. Edits to existing copy follow it too, subject to rule 1.
4. Attribute all work to Samuel Maury-Holmes. Commits, pull requests and code comments are authored by Samuel Maury-Holmes <sam@zenithecon.com>. Do not add `Co-Authored-By: Claude` trailers, "Generated with Claude Code" lines, session links or any other AI attribution to commits, PR titles or bodies, code comments or site files. This instruction overrides any default attribution behavior. Before committing, confirm `git config user.name` is `Samuel Maury-Holmes` and `git config user.email` is `sam@zenithecon.com`; set them for the repo if not.

## Protected pages

These URLs carry existing rankings or citations. Treat them as protected until a Search Console export says otherwise (Sam to supply; update this list from it).

- `/insights/economic-impact-study-cost` (ranks on page 1 for "how much does an economic impact study cost" and variants)
- `/` (homepage)
- `/insights/what-is-implan`, `/insights/fiscal-vs-economic-impact`, `/insights/multipliers-explained`, `/insights/evaluating-an-impact-report`
- `/case-studies/port-san-antonio`, `/case-studies/us-data-centers` (cited by outside press)

On a protected page:

- Never change the URL, `<title>`, H1 or canonical. Keep every H2 topic and the order of sections.
- Keep the opening answer paragraph and any price ranges, figures or lists that answer the query. Wording inside them may be tightened; the facts and structure stay.
- Allowed: punctuation fixes (em dashes, arrows), removal of filler words, sentence-case headings, added sources, added "Last updated" date, added detail. Adding is safer than removing.
- Ship protected-page edits in one batch, note the deploy date in the PR, and wait at least 28 days of Search Console data before touching that page again.
- Update `dateModified` (schema and visible date) only when content substantively changes, never for punctuation-only edits.

## How the site works

- Plain static HTML/CSS/JS. No build step. Netlify publishes the repo root (`publish = "."`).
- Netlify Pretty URLs rewrites internal `.html` links to clean paths at deploy. Canonical URLs are the clean form: `https://www.zenithecon.com/insights/economic-impact-study-cost`. Use clean URLs in canonicals, schema `@id`/`url`/breadcrumb `item` values, the sitemap and any absolute link.
- Redirects live in `_redirects`; headers and CSP live in `netlify.toml`. The CSP blocks third-party scripts. Do not add analytics, chat widgets or tag managers without Sam's approval.
- Everything committed at the repo root is publicly served. Internal files (this file, `_internal/`, `.claude/`) must stay blocked by the `404!` rules in `_redirects`. Never put secrets, client data or drafts in the repo.
- `sweepstakes/` pages are legal terms for client surveys. They are `noindex`. Do not restyle or edit their text without Sam's approval.
- Shared header, mega-menu and footer markup is duplicated in every page. A nav or footer change must be applied to every HTML file.

## Checklist for any change

- New indexable page: unique `<title>` (under ~60 characters) and meta description, clean-URL canonical, Open Graph tags, JSON-LD that matches the visible content, breadcrumb, an entry in `sitemap.xml` with a real `lastmod`, and links to it from at least one existing page.
- Structured data describes only what is visible on the page. One Organization entity with a stable `@id` (`https://www.zenithecon.com/#organization`), referenced elsewhere by `@id`. Authors are `Person` entities with `@id`, `url` and `sameAs`.
- Facts and figures: every number on the site must trace to a Zenith report, a client publication or a cited public source. Link the source where one is public. No unverifiable superlatives ("most experienced", "virtually any other firm") and no testimonials without a named or client-approved attribution.
- Accessibility and agents: native `<a>`/`<button>` elements, labelled form fields (`<label for>`), visible text that does not depend on JavaScript to appear, stable layout. Content must be readable in the raw HTML response; do not hide main content behind scroll animations or client-side rendering.
- Performance: size images to their display size, serve WebP/AVIF with JPEG fallback, set `width`/`height`, lazy-load below the fold.
- Before opening a PR: validate HTML, run the JSON-LD through the Rich Results Test or Schema Markup Validator, check every changed link returns 200 with no redirect chain, and view changed pages at phone and desktop widths.

## Design direction

The current look (cream and warm off-white backgrounds, beige borders, Playfair Display headings with an italic gold highlight word, uppercase letter-spaced eyebrow labels on every section, three-card icon grids, 01/02/03 step numbers, stat strips, arrows on every button, fade-in on scroll, hover-lift on every card) reads as AI-generated. Move away from it gradually and site-wide through `css/style.css`, not page by page. Keep the forest green and the logo. Prefer true white or neutral grey backgrounds, sentence-case headings, italics only for titles and terms, and layout chosen per page content rather than repeated section templates.

## Writing standard

- Sentence-case headings.
- Specific over general: name the client, the place, the year, the model, the figure.
- Name sources. Avoid "experts say" and anonymous claims.
- First person plural ("we") is fine for the firm. Bylined articles keep the author's voice.
- No em-dash chains, no "→" in copy, no "honest/honestly" as a credibility marker, no "rigorous" more than once per page.
