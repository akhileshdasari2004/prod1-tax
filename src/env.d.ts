/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX). Leave empty to disable. */
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  /** Google Search Console HTML tag verification content value. */
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  /** Bing Webmaster Tools meta verification content value. */
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  /** Set to "false" on Cloudflare Pages preview to emit noindex and block analytics. */
  readonly PUBLIC_INDEXABLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
