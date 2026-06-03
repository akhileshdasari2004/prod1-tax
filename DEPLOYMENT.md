# FinanceToolsHub — Production deployment checklist

Use this checklist when deploying to **Cloudflare Pages** and connecting **Google Search Console**, **Google AdSense**, and **Bing Webmaster Tools**.

---

## Pre-deploy (local)

- [ ] `npm run check` passes (TypeScript)
- [ ] `npm run build` completes; `dist/` contains all routes
- [ ] Copy `.env.example` → `.env` for local testing (optional)
- [ ] Confirm production domain in `astro.config.mjs` (`site`) and `src/config/site.ts` (`url`)

---

## Cloudflare Pages setup

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | **22** or later |
| Production branch | `main` (or your default) |

### Custom error pages (Pages → Settings)

| Error | File |
|-------|------|
| 404 Not Found | `/404.html` |
| 500 Internal Server Error | `/500.html` |

### Environment variables

#### Production

| Variable | Example | Notes |
|----------|---------|--------|
| `PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4 property for `financetoolshub.com` |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | `abc123...` | Meta tag **content** from Search Console |
| `PUBLIC_BING_SITE_VERIFICATION` | `B123...` | Meta tag **content** from Bing Webmaster |
| `PUBLIC_INDEXABLE` | `true` | Allows indexing + analytics |

#### Preview (`*.pages.dev`)

| Variable | Value | Notes |
|----------|-------|--------|
| `PUBLIC_INDEXABLE` | `false` | Emits `noindex` at build; disables GA |
| `PUBLIC_GA_MEASUREMENT_ID` | *(empty)* | No analytics on preview |
| Verification vars | *(empty)* | Not needed on preview |

**Also:** `PreviewNoIndex.astro` sets `noindex` at runtime if the hostname ends with `.pages.dev` (backup when the same build is deployed without preview env vars).

### Files deployed from `public/`

- [ ] `_headers` — security, CSP (includes Google Analytics), cache, `X-Robots-Tag` on 404/500
- [ ] `robots.txt` — allows `/`, disallows `/404` and `/500`
- [ ] `sitemap.xml` — index to Astro sitemap
- [ ] `ads.txt` — uncomment and set publisher ID after AdSense approval

### Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=financetoolshub
```

Or push to Git with Pages CI connected.

---

## Custom domain

- [ ] Add `financetoolshub.com` (and `www` if used) in Cloudflare Pages → Custom domains
- [ ] SSL mode: Full (strict)
- [ ] Redirect `www` → apex (or apex → `www`) via Cloudflare Redirect Rules — pick one canonical host
- [ ] Confirm canonical URLs in page source match your chosen host

---

## Google Search Console

1. Add property: **URL prefix** `https://financetoolshub.com`
2. Verification: **HTML tag** — copy the `content` value into `PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy production
3. Submit sitemap: `https://financetoolshub.com/sitemap-index.xml`
4. Request indexing for home + top calculators after launch
5. Monitor **Coverage**, **Core Web Vitals**, and **Mobile usability**

---

## Bing Webmaster Tools

1. Add site `https://financetoolshub.com`
2. Verification: **Meta tag** — copy `content` into `PUBLIC_BING_SITE_VERIFICATION`, redeploy
3. Submit sitemap: same URL as Google
4. Enable URL inspection for key calculator pages

---

## Google Analytics 4

1. Create GA4 property for production domain only
2. Set `PUBLIC_GA_MEASUREMENT_ID` on **Production** environment in Cloudflare
3. Verify Realtime after deploy (production URL, not `pages.dev`)
4. Link GA4 to Search Console (Admin → Product links)

---

## Google AdSense readiness

| Requirement | Status |
|-------------|--------|
| Custom domain (not `pages.dev`) | Configure in Cloudflare |
| Privacy Policy (cookies, analytics, ads) | `/privacy` |
| Terms & Conditions | `/terms` |
| About Us | `/about` |
| Contact Us (visible email) | `/contact` |
| Substantial original content | Calculator guides + FAQs |
| Clear navigation & internal links | Navbar + footer |
| `ads.txt` with publisher line | Edit `public/ads.txt` after approval |
| No policy violations (scraped / thin content) | Review guides before applying |
| HTTPS | Cloudflare default |
| Mobile-friendly layout | Responsive Tailwind layout |

**Before applying:** deploy production with real content, 10+ indexed pages, and stable traffic for a few weeks if possible.

**After approval:** add AdSense script per Google instructions; update CSP in `public/_headers` if new domains are required; uncomment `ads.txt` line with your `pub-` ID.

---

## Accessibility checklist

- [ ] Skip link to `#main-content` (navbar)
- [ ] One `<h1>` per page
- [ ] Form inputs have associated labels (calculators)
- [ ] Focus visible on interactive elements (`global.css`)
- [ ] Color contrast in light and dark mode
- [ ] `aria-label` on icon-only controls (theme toggle, menu)
- [x] Run Lighthouse **Accessibility** = 100 on home and SIP calculator (local build, June 2026)

---

## Performance checklist

- [ ] Static HTML — no server render latency
- [ ] `compressHTML: true` in Astro config
- [ ] Long-cache headers on `/_astro/*` assets (`_headers`)
- [ ] Self-hosted variable font (`@fontsource-variable/inter`)
- [ ] Calculator JS loaded per page (not global bundle bloat)
- [x] Run Lighthouse **Performance** = 100 on home + SIP calculator (local static serve)

---

## Mobile responsiveness

- [ ] Viewport meta tag (`SEOHead`)
- [ ] Mobile nav menu tested
- [ ] Calculator forms usable at 320px width
- [ ] Tables/charts scroll horizontally where needed
- [ ] Lighthouse **Best Practices** — no horizontal overflow

---

## SEO validation (production build)

- [ ] Unique `<title>` and meta description on every public page
- [ ] Canonical URL on every page
- [ ] Open Graph + Twitter Card tags
- [ ] JSON-LD: Organization, WebSite (home), WebApplication + FAQ + Breadcrumb (calculators)
- [ ] `noindex` on `/404`, `/500`, and preview hosts
- [x] Lighthouse **SEO** = 100 on home and calculator pages (local build)

---

## Post-deploy smoke test

- [ ] `https://financetoolshub.com/` loads
- [ ] Each calculator computes and updates URL/share state
- [ ] `/privacy`, `/terms`, `/about`, `/contact` render
- [ ] Intentional 404 shows custom page
- [ ] `https://financetoolshub.com/robots.txt` correct
- [ ] `https://financetoolshub.com/sitemap-index.xml` lists all pages
- [ ] `https://financetoolshub.com/ads.txt` reachable
- [ ] Security headers present (check with [securityheaders.com](https://securityheaders.com))
- [ ] Preview URL shows `noindex` in HTML when `PUBLIC_INDEXABLE=false`

---

## Rollback

- Cloudflare Pages → Deployments → **Rollback** to previous successful deployment
- Keep DNS and env vars unchanged during rollback

---

## Support contacts

- Site email: `hello@financetoolshub.com` (see `src/config/site.ts`)
