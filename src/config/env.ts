import { SITE } from './site';

/**
 * Public build-time environment (Cloudflare Pages → Settings → Environment variables).
 * All values are inlined at build — use separate production vs preview values.
 */
export const ENV = {
  gaMeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '',
  googleSiteVerification: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? '',
  bingSiteVerification: import.meta.env.PUBLIC_BING_SITE_VERIFICATION?.trim() ?? '',
  /** When "false", pages are noindex and analytics are disabled. */
  indexable: import.meta.env.PUBLIC_INDEXABLE !== 'false',
  /** Production hostname without protocol (defaults to SITE url host). */
  productionHost: (
    import.meta.env.PUBLIC_PRODUCTION_HOST?.trim() ||
    new URL(SITE.url).hostname
  ).toLowerCase(),
} as const;

export function isAnalyticsEnabled(): boolean {
  return ENV.indexable && ENV.gaMeasurementId.length > 0;
}

/** Hostnames that should never load analytics (preview/staging). */
export const PREVIEW_HOST_SUFFIXES = ['.pages.dev', '.workers.dev'] as const;

export function isPreviewHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'pages.dev' || PREVIEW_HOST_SUFFIXES.some((s) => host.endsWith(s));
}
