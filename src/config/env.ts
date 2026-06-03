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
} as const;

export function isAnalyticsEnabled(): boolean {
  return ENV.indexable && ENV.gaMeasurementId.length > 0;
}
