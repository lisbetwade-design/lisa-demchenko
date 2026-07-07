# SEO setup

What was added and how to build/verify. Canonical domain: **https://demchenko.design**

## What changed

- **Real path routing.** Case studies moved from `#/work/<slug>` to real URLs `/work/<slug>` (History API + a click interceptor in `App.jsx`). Each case study is now a crawlable, indexable URL.
- **Per-page meta.** `src/seo.js` sets a unique `<title>`, description, canonical, and OG/Twitter image per route. Home + each case study get their own.
- **Structured data.** `Person` JSON-LD in `index.html` (name, job title, `sameAs` social links) for Google's knowledge panel.
- **Absolute OG/canonical.** Social images now use full `https://demchenko.design/...` URLs so LinkedIn/X/Slack previews work.
- **`robots.txt` + `sitemap.xml`** in `public/`.
- **`vercel.json`** — SPA rewrite so deep links resolve; build command runs prerender.
- **Prerendering.** `scripts/prerender.mjs` snapshots every route to static HTML after `vite build`, so non-JS crawlers/social scrapers get real content. Fail-soft: if Chromium isn't available the plain SPA build still ships.

## Build

```bash
npm install            # pulls in puppeteer (used only for prerender)
npm run build:seo      # vite build + prerender -> dist/ with /work/<slug>/index.html
npm run preview        # serve dist/ locally to check
```

`npm run build` still does a plain SPA build if you want to skip prerender.
Vercel uses `build:seo` automatically (set in `vercel.json`).

## Verify after deploy

- View-source `https://demchenko.design/work/stndby` — should show the case-study `<title>`/description in the HTML (not the generic home one).
- Paste a case-study URL into the LinkedIn Post Inspector / X card validator — preview should render.
- Submit `https://demchenko.design/sitemap.xml` in Google Search Console.

## When you add a new case study

Add it to `caseStudyData.js` (as today) **and** add its `/work/<slug>` line to `public/sitemap.xml`. Prerendering picks up the new slug automatically from `caseStudyData.js`.
