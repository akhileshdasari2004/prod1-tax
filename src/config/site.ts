export const SITE = {
  name: 'RealFinanceTools',
  title: 'RealFinanceTools – Free Financial Calculators & Money Planning Tools',
  tagline: 'Free Financial Calculators, Planning Tools & Money Resources',
  taglineAlt: 'Smart Financial Decisions Start Here',
  description:
    'Free EMI, SIP, investment, CAGR, lumpsum, and GST calculators plus personal finance tools. Fast, accurate, private — no sign-up required.',
  url: 'https://realfinancetools.com',
  locale: 'en-US',
  language: 'en',
  author: 'RealFinanceTools',
  email: 'hello@realfinancetools.com',
  supportEmail: 'support@realfinancetools.com',
  twitterHandle: '@realfinancetools',
  ogImage: '/og-default.jpg',
  logoImage: '/logo.png',
  logoSvg: '/logo.svg',
  themeColor: '#2563EB',
  themeColorLight: '#ffffff',
  brand: {
    primary: '#2563EB',
    secondary: '#1E40AF',
    accent: '#0EA5E9',
    success: '#22C55E',
  },
} as const;

export type SiteConfig = typeof SITE;
