# Deploying to Vercel

## The current build failure

```
The specified Root Directory "Aradhya-manpower-supplier" does not exist.
Please update your Project Settings.
```

This is **a Vercel project setting, not a problem in the code.** The project was
created when the site lived in a `Aradhya-manpower-supplier/` subfolder. That folder
no longer exists — the Next.js app is now at the repository root — so Vercel is
looking in a directory that isn't there.

Nothing in the repo can fix this. It has to be changed in the dashboard.

### Fix it

1. Open the project on <https://vercel.com> → **Settings**
2. Go to **Build and Deployment** (older UI: **General**)
3. Find **Root Directory**. It currently reads `Aradhya-manpower-supplier`.
4. **Clear the field** so it is empty — that means the repository root.
   (If it will not accept empty, enter `./`.)
5. **Save**, then **Deployments → ⋯ → Redeploy** on the latest commit.

Everything else is already correct: Vercel detects Next.js on its own, so
Framework Preset, Build Command (`next build`), Output Directory and Install
Command should all stay on their defaults. The old per-folder `vercel.json` files
were deleted in the migration and are not needed — the API routes under
`app/api/*` become serverless functions automatically.

---

## Environment variables

Set these under **Settings → Environment Variables** (Production, Preview and
Development), then redeploy.

| Variable | Required | Purpose |
| --- | --- | --- |
| `EMAIL_USER` | yes | Gmail address that sends form submissions |
| `EMAIL_PASS` | yes | Gmail **App Password**, not the account password |
| `EMAIL_TO` | no | Comma-separated recipients. Defaults to both published addresses |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin. Leave unset in production; set it on preview deploys so canonicals do not point at the live domain |
| `GOOGLE_SITE_VERIFICATION` | no | Search Console token; emits the verification meta tag |

**Until `EMAIL_USER` and `EMAIL_PASS` are set, both form endpoints return 500.**
Everything else on the site works without them — including the WhatsApp buttons,
which are plain links and need no configuration at all.

To create the app password: Google Account → Security → 2-Step Verification →
App passwords. It is 16 characters.

---

## After deploying

```bash
curl -sI https://www.aradhyamanpowersupplier.com/            # expect 200
curl -s  https://www.aradhyamanpowersupplier.com/sitemap.xml | head -20
curl -s  https://www.aradhyamanpowersupplier.com/robots.txt
```

Then submit the sitemap — see `SEO-SUBMISSION.md`.

---

## One repo cleanup worth doing

`new-images/` is committed and holds the original 8.9 MB source photographs. The
optimised copies the site actually serves live in `public/hero/` and
`public/roles/`, so the originals ship nothing and only add weight to every clone
and every build.

Keep them somewhere else (Drive, the design folder) and remove them from the repo:

```bash
git rm -r --cached new-images
echo "new-images/" >> .gitignore
git commit -m "Stop tracking source images; optimised copies live in public/"
```
