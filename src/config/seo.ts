import type { BreadcrumbInput } from '../lib/schema';

export type StaticPageSeo = {
  pathname: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbInput[];
};

export const staticPageSeo = {
  calculators: {
    pathname: '/calculators',
    title: 'All Finance Calculators',
    description:
      'Browse every free finance calculator on FinanceToolsHub — SIP, CAGR, lumpsum, EMI, GST, and more. Fast, private, browser-based tools.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'All Calculators' },
    ],
  },
  investing: {
    pathname: '/investing',
    title: 'Investing Calculators',
    description:
      'Free investing calculators: SIP, lumpsum, and CAGR tools for mutual funds, retirement, and portfolio growth planning.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators' },
      { label: 'Investing Calculators' },
    ],
  },
  loans: {
    pathname: '/loans',
    title: 'Loan & EMI Calculators',
    description:
      'Free loan EMI calculator for home mortgages, auto loans, and personal loans — monthly payment, interest, and amortization.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators' },
      { label: 'Loan Calculators' },
    ],
  },
  taxes: {
    pathname: '/taxes',
    title: 'Tax & GST Calculators',
    description:
      'Free GST calculator to add or remove tax, split inclusive and exclusive amounts, and quote invoices accurately.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators' },
      { label: 'Tax Calculators' },
    ],
  },
  about: {
    pathname: '/about',
    title: 'About FinanceToolsHub',
    description:
      'Learn how FinanceToolsHub builds free, privacy-first finance calculators that run in your browser with no sign-up.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
  contact: {
    pathname: '/contact',
    title: 'Contact FinanceToolsHub',
    description:
      'Contact FinanceToolsHub for calculator feedback, corrections, partnerships, or editorial questions.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact' },
    ],
  },
  privacy: {
    pathname: '/privacy',
    title: 'Privacy Policy',
    description:
      'FinanceToolsHub privacy policy: calculator inputs stay in your browser — we do not collect or store your financial data.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Privacy Policy' },
    ],
  },
  terms: {
    pathname: '/terms',
    title: 'Terms & Conditions',
    description:
      'Terms and conditions for FinanceToolsHub free finance calculators, educational content, disclaimers, and acceptable use.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Terms & Conditions' },
    ],
  },
} as const satisfies Record<string, StaticPageSeo>;
