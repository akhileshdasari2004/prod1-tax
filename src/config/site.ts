export const SITE = {
  name: 'FinanceToolsHub',
  title: 'FinanceToolsHub — Free Finance Calculators & Tools',
  description:
    'Professional financial calculators for investing, loans, and taxes. Fast, accurate, and private — no registration required.',
  url: 'https://financetoolshub.com',
  locale: 'en-US',
  language: 'en',
  author: 'FinanceToolsHub',
  email: 'hello@financetoolshub.com',
  twitterHandle: '@financetoolshub',
  ogImage: '/og-default.jpg',
  themeColor: '#ffffff',
} as const;

export type SiteConfig = typeof SITE;
