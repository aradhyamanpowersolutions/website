# Aradhya Manpower Supplier

Marketing site for [Aradhya Manpower Supplier](https://www.aradhyamanpowersupplier.com) —
industrial and corporate staffing across Indore, Pithampur and Madhya Pradesh.

Built with **Next.js 16 (App Router)**, React 19 and Tailwind CSS. The site, its
API routes and its assets all live in this one repository — there is no separate
frontend or backend folder any more.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in EMAIL_USER / EMAIL_PASS
npm run dev                  # http://localhost:3000
```

| Script          | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Dev server with hot reload                |
| `npm run build` | Production build                          |
| `npm start`     | Serve the production build                |
| `npm run lint`  | ESLint (`next/core-web-vitals`)           |

## Layout

```
app/                 Routes, layouts and metadata
  page.js            Home
  about|services|careers|contact/   Static pages
  api/contact        Contact form → email
  api/apply          Job application (+ PDF résumé) → email
  sitemap.js         /sitemap.xml
  robots.js          /robots.txt
  manifest.js        /manifest.webmanifest
components/          UI. Server components by default; 'use client' where needed
lib/
  site.js            Name, address, phones, geo — used by UI *and* structured data
  services.js        Service catalogue → page content + Service schema
  clients.js         Client logos, testimonials, hero slides
  faqs.js            FAQ copy → page content + FAQPage schema
  seo.js             Metadata + JSON-LD builders
public/              Images
```

`lib/site.js` is the single source of truth for business details. Change a phone
number there and the header, footer, contact page and the JSON-LD all update.

## Environment variables

| Variable                   | Required | Purpose                                          |
| -------------------------- | -------- | ------------------------------------------------ |
| `EMAIL_USER`               | yes      | Gmail address that sends form submissions        |
| `EMAIL_PASS`               | yes      | Gmail **app password** (not the account password) |
| `EMAIL_TO`                 | no       | Where submissions land (defaults to the ops inbox) |
| `NEXT_PUBLIC_SITE_URL`     | no       | Canonical origin; set on preview deploys          |
| `GOOGLE_SITE_VERIFICATION` | no       | Search Console verification token                 |

Without `EMAIL_USER` / `EMAIL_PASS` the site still builds and runs — only the two
form endpoints return a 500.

## Deploying

Vercel needs no configuration: it detects Next.js, runs `npm run build` and maps
`app/api/*` to serverless functions. Add the environment variables above in the
project settings. The old per-folder `vercel.json` files are gone — the previous
setup needed them to deploy the SPA and the Express server separately.

## SEO

- Every page ships server-rendered HTML with a unique title, description and
  self-referencing canonical.
- One schema.org `@graph` per page: `EmploymentAgency`/`LocalBusiness`, `WebSite`,
  `WebPage`, `BreadcrumbList`, twelve `Service` nodes and an `FAQPage`.
- `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are generated at build.
- Fonts are self-hosted by `next/font`; images go through `next/image` (AVIF/WebP).
