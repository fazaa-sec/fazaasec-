# FAZAA SEC Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind portfolio for **Muatez Mhgoub Margani**.
Contact form saves to Supabase through a Server Action, with Zod validation, honeypot, rate limiting and Cloudflare Turnstile.

## Project structure

```
fazaasec-portfolio/
├── app/
│   ├── actions.ts          Server Action: honeypot, Zod, Turnstile, Supabase RPC
│   ├── layout.tsx          Fonts, metadata, JSON-LD, floating WhatsApp button
│   ├── page.tsx            Navbar, Hero, Services, Projects, About, Contact, Footer
│   ├── not-found.tsx
│   ├── robots.ts           -> /robots.txt
│   ├── sitemap.ts          -> /sitemap.xml
│   ├── icon.svg
│   └── globals.css
├── components/             Navbar, Hero, Services, Projects, About, Contact(+Form), Footer, ...
├── lib/
│   ├── data.ts             Services + the 12 projects (edit here)
│   ├── site.ts             Brand, links, SITE_URL (from env)
│   ├── validation.ts       Zod schema + sanitizer
│   └── supabase.ts         Server-only Supabase client (anon key)
├── supabase/schema.sql     leads table, RLS, submit_lead() with rate limit
├── middleware.ts           404 for /.env, /.git, /admin, /api/internal
├── next.config.js          CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS
└── .env.example
```

## 1. Supabase (2 minutes)

1. Create a project at https://supabase.com.
2. Open **SQL Editor**, paste all of `supabase/schema.sql`, click **Run**.
3. Open **Table Editor -> leads** and confirm it shows **RLS enabled**.
4. Open **Project Settings -> API** and copy the **Project URL** and the **anon public** key.
   Do not use the `service_role` key anywhere in this project.

## 2. Cloudflare Turnstile (2 minutes)

1. Cloudflare dashboard -> **Turnstile** -> **Add site**.
2. Hostnames: `fazaasec.vercel.app`, `localhost` (add `fazaasec.com` later).
3. Widget mode: Managed. Copy the **Site key** and **Secret key**.

## 3. Run locally

```bash
cp .env.example .env.local      # fill in the Supabase values; Turnstile test keys already work locally
npm install
npm run dev                     # http://localhost:3000
```

Generate `IP_HASH_SALT` with `openssl rand -hex 32`.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "FAZAA SEC portfolio"
git branch -M main
git remote add origin https://github.com/myrgnmtz/fazaasec-portfolio.git
git push -u origin main
```

Check that `.env.local` is NOT in the commit (it is in `.gitignore`).

## 5. Deploy on Vercel

1. Go to https://vercel.com/new and import the GitHub repo.
2. **Project Name:** `fazaasec`. This gives the default domain `fazaasec.vercel.app` (if the name is taken, Vercel adds a suffix: check the domain it assigns).
3. Framework Preset: **Next.js** (auto-detected). Leave build settings as they are.
4. Open **Environment Variables** and add these for Production, Preview and Development:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://fazaasec.vercel.app` |
| `SUPABASE_URL` | your Supabase Project URL |
| `SUPABASE_ANON_KEY` | your Supabase anon key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |
| `IP_HASH_SALT` | random string |

5. Click **Deploy**.
6. If the assigned domain differs from `fazaasec.vercel.app`, update `NEXT_PUBLIC_SITE_URL` and the Turnstile hostname, then **Redeploy**.

`NEXT_PUBLIC_SITE_URL` is baked in at build time, so always redeploy after changing it.

## 6. Switch to fazaasec.com later

1. Vercel -> Project -> **Settings -> Domains** -> add `fazaasec.com` (and `www.fazaasec.com`).
2. Add the DNS records Vercel shows at your registrar.
3. Change `NEXT_PUBLIC_SITE_URL` to `https://fazaasec.com`.
4. Add `fazaasec.com` to the Turnstile hostnames.
5. **Redeploy.** Sitemap, robots.txt, canonical URL and JSON-LD all update from the env var. No code changes.

## 7. Verify security after deploy

```bash
curl -I https://fazaasec.vercel.app | grep -iE "content-security|x-frame|x-content-type|referrer|permissions"
curl -s -o /dev/null -w "%{http_code}\n" https://fazaasec.vercel.app/.env            # 404
curl -s -o /dev/null -w "%{http_code}\n" https://fazaasec.vercel.app/.git/config     # 404
curl -s -o /dev/null -w "%{http_code}\n" https://fazaasec.vercel.app/admin            # 404
curl -s -o /dev/null -w "%{http_code}\n" https://fazaasec.vercel.app/api/internal     # 404
curl -s https://fazaasec.vercel.app/robots.txt
curl -s https://fazaasec.vercel.app/sitemap.xml
```

Then submit the form once and confirm the row appears in **Table Editor -> leads**.

## How the security requirements are met

| Requirement | Where |
|---|---|
| No secrets in frontend | Only `NEXT_PUBLIC_SITE_URL` and the Turnstile **site** key are public. Supabase vars have no `NEXT_PUBLIC_` prefix and are read only in `app/actions.ts`. |
| Security headers | `next.config.js` |
| Block sensitive paths | `middleware.ts` (also decodes `%2e` tricks) |
| Server Action + Zod + sanitize + honeypot | `app/actions.ts`, `lib/validation.ts`, field `company` |
| Rate limit 5 / IP / hour | `submit_lead()` in `supabase/schema.sql`. Enforced in the database, so it holds across serverless instances. Only a salted hash of the IP is stored. |
| RLS on `leads` | Enabled, with no policies: direct reads and writes are denied. Only `submit_lead()` can insert. |
| anon key only | `SUPABASE_ANON_KEY`, server-side. No service_role key exists in the project. |
| External links | All go through `components/ExtLink.tsx` (`rel="noopener noreferrer"`) |
| robots.txt / sitemap.xml | `app/robots.ts`, `app/sitemap.ts` |
| No logging of user data | Only a Supabase error code is logged on failure |
| CAPTCHA | Cloudflare Turnstile, verified server-side. Production fails closed if the secret is missing. |

## Editing content

- Services, prices and the 12 projects: `lib/data.ts`
- WhatsApp, GitHub, LinkedIn links: `lib/site.ts`
- Public projects currently link to your GitHub profile. Replace each `repo` value in `lib/data.ts` with the exact repo URL.

## Reading leads

Supabase dashboard -> **Table Editor -> leads**. The dashboard bypasses RLS, so you can read everything there.
