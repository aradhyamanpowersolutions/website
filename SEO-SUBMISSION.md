# Search engine submission — Aradhya Manpower Supplier

## The sitemap

The sitemap is generated at build time from `app/sitemap.js`. It is **not** a file you
edit — add a page or a role and it appears automatically.

**Live URL once deployed:** `https://www.aradhyamanpowersupplier.com/sitemap.xml`

It currently contains **17 URLs** and **12 image entries**:

| # | URL | Priority |
|---|---|---|
| 1 | `/` | 1.0 |
| 2 | `/services` | 0.9 |
| 3 | `/about` | 0.8 |
| 4 | `/careers` | 0.8 |
| 5 | `/contact` | 0.7 |
| 6–17 | `/services/<role>` × 12 | 0.75 |

The twelve role pages are `maintenance-technicians`, `lab-assistants`,
`specialized-operators`, `packing-staff`, `loading-unloading-crew`,
`warehouse-workers`, `office-assistants`, `clerks`, `receptionist`,
`project-coordinators`, `temporary-technical-staff`, `seasonal-workers`.

`robots.txt` is generated too, at `/robots.txt`, and already points at the sitemap.

---

## Submitting to Google Search Console

1. Go to <https://search.google.com/search-console> and add a property.
   Choose **Domain** and enter `aradhyamanpowersupplier.com` (covers www and non-www,
   http and https).
2. Google will ask you to verify by adding a **TXT record** at your DNS provider.
   That is the easiest route for a domain property.

   *Alternative — if you would rather verify with an HTML tag:* choose the **URL prefix**
   property type instead, copy the `content` value out of the meta tag Google shows you,
   and set it as an environment variable before deploying:

   ```
   GOOGLE_SITE_VERIFICATION=the-value-google-gave-you
   ```

   The site reads that and emits the verification tag automatically — see
   `app/layout.js`. No code change needed.
3. Once verified, open **Indexing → Sitemaps**, enter `sitemap.xml`, and press Submit.
4. Use **URL Inspection** on `https://www.aradhyamanpowersupplier.com/` and click
   *Request indexing* to prompt a first crawl.

## Submitting to Bing

1. Go to <https://www.bing.com/webmasters>.
2. Use **Import from Google Search Console** — it carries the verification and the
   sitemap across in one step. Otherwise add the site and submit `sitemap.xml` the same way.

---

## What each page now emits for Google

| Page | Structured data |
|---|---|
| every page | `EmploymentAgency` + `LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`, `SiteNavigationElement` ×5 |
| `/services` | plus `ItemList` of all 12 roles with URLs, and 12 `Service` nodes |
| `/services/<role>` | plus a `Service` node for that role |
| `/contact` | plus `FAQPage` (6 questions — can win an expanded result) |

The `ItemList` and `SiteNavigationElement` nodes are what give Google an explicit
signal for sitelinks and for treating `/services` as an index of twelve pages rather
than one long document.

**Icons:** `/favicon.ico` (multi-size 16/32/48/64), `/icon.png` and `/apple-icon.png`
are all served from the company logo. Google needs a reachable favicon to show an icon
beside your result — it reads `/favicon.ico` or the `<link rel="icon">`, and both are
present.

---

## Also worth doing (not code — these need your business details)

These matter more for local ranking in Indore/Pithampur than anything left on the site:

- **Google Business Profile.** Claim it at <https://business.google.com> for the Mhow head
  office and the Pithampur branch. Make the name, address and phone match the site exactly
  — the site already publishes them consistently, and Google cross-checks.
- **Local directories.** IndiaMART, Justdial, Sulekha and TradeIndia carry weight for
  manpower suppliers in MP. Use the identical name/address/phone.
- **Reviews.** Ratings can appear in search results, but only from real reviews on your
  Google Business Profile — I have deliberately not added review markup to the site, since
  inventing it would be a violation and can get you a manual penalty.

## After you deploy

Re-check that these return correctly on the live domain:

```bash
curl -s https://www.aradhyamanpowersupplier.com/sitemap.xml | head -20
curl -s https://www.aradhyamanpowersupplier.com/robots.txt
```

Then validate the structured data at <https://search.google.com/test/rich-results> —
every page carries an `EmploymentAgency`/`LocalBusiness` graph, and `/contact` carries
an `FAQPage` that can win an expanded result.
