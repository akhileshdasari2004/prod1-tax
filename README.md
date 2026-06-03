# FinanceToolsHub

SEO-first static finance calculator site built with Astro 6, Tailwind CSS v4, and TypeScript. Deployed to Cloudflare Pages.

## Stack

- **Astro** — multi-page static site generation
- **Tailwind CSS v4** — `@tailwindcss/vite` plugin
- **TypeScript** — strict mode
- **@astrojs/sitemap** — automatic `sitemap-index.xml`
- **Cloudflare Pages** — static `dist/` output

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full production checklist (Search Console, AdSense, Bing, analytics, preview `noindex`, and validation).

### Quick start

1. Create a Cloudflare Pages project connected to your Git repository.
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. **Node version:** 22 or later
5. Set environment variables from `.env.example` (production vs preview).
6. Custom error pages: **404** → `/404.html`, **500** → `/500.html`

```bash
npm run build
npx wrangler pages deploy dist --project-name=financetoolshub
```

## Design system

See [DESIGN.md](./DESIGN.md) for tokens, typography, color, spacing, motion, and component guidelines. Implementation lives in `src/styles/tokens.css` and `src/styles/global.css`.

## Project structure

```
src/
  components/   # Navbar, Footer, SEOHead, calculators UI
  config/       # Site, navigation, calculator registry
  layouts/      # BaseLayout
  lib/          # Finance math, formatting, URLs
  pages/        # Routes (MPA)
  scripts/      # Client calculator bindings
  styles/       # global.css (Tailwind v4)
public/
  robots.txt
  _headers      # Cloudflare security + cache headers
```

## SEO

- Canonical URLs via `SEOHead` + `site` config
- Open Graph and Twitter Card defaults
- JSON-LD on home, calculators, and FAQ sections
- `robots.txt` points to sitemap index

## License

Proprietary — FinanceToolsHub.
