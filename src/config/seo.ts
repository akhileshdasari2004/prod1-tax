import type { BreadcrumbInput } from '../lib/schema';
import { SITE } from './site';

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
      `Browse every free financial calculator on ${SITE.name} — SIP, CAGR, lumpsum, EMI, GST, and more. Fast, private, browser-based tools.`,
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
    title: `About ${SITE.name}`,
    description:
      `Learn how ${SITE.name} builds free, privacy-first financial calculators that run in your browser — mission, editorial standards, and transparency.`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
  contact: {
    pathname: '/contact',
    title: `Contact ${SITE.name}`,
    description:
      `Contact ${SITE.name} for calculator feedback, corrections, partnerships, or editorial questions. Email ${SITE.email}.`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact' },
    ],
  },
  privacy: {
    pathname: '/privacy',
    title: 'Privacy Policy',
    description:
      `${SITE.name} privacy policy: calculator inputs stay in your browser — we do not collect or store your financial data. GDPR and CCPA overview included.`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Privacy Policy' },
    ],
  },
  terms: {
    pathname: '/terms',
    title: 'Terms & Conditions',
    description:
      `Terms and conditions for ${SITE.name} free financial calculators, educational content, disclaimers, and acceptable use.`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Terms & Conditions' },
    ],
  },
} as const satisfies Record<string, StaticPageSeo>;
