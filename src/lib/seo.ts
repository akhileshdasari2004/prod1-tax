import { SITE } from '../config/site';

/** Consistent document title: avoid duplicate "| RealFinanceTools | RealFinanceTools". */
export function formatPageTitle(pageTitle: string): string {
  const normalized = pageTitle.trim();
  if (normalized.includes(SITE.name)) {
    return normalized;
  }
  return `${normalized} | ${SITE.name}`;
}

export const SEO_DEFAULTS = {
  ogImageAlt: `${SITE.name} — free financial calculators for EMI, SIP, investing, loans, and taxes`,
  twitterCard: 'summary_large_image',
} as const;

export const defaultSeo = SEO_DEFAULTS;

/** @alias formatPageTitle */
export const buildPageTitle = formatPageTitle;
