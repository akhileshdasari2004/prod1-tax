import { SITE } from '../config/site';

/** Consistent document title: avoid duplicate "| FinanceToolsHub | FinanceToolsHub". */
export function buildPageTitle(pageTitle: string): string {
  const trimmed = pageTitle.trim();
  if (trimmed === SITE.name || trimmed === SITE.title) {
    return SITE.title;
  }
  return `${trimmed} | ${SITE.name}`;
}

export const SEO_DEFAULTS = {
  ogImageAlt: 'FinanceToolsHub — free finance calculators for investing, loans, and taxes',
  twitterCard: 'summary_large_image' as const,
};
