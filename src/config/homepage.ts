import type { FAQItem } from '../types/faq';
import { SITE } from './site';

export const homeHero = {
  eyebrow: SITE.tagline,
  headline: 'Financial calculators designed for clarity',
  subheadline:
    'Professional EMI, SIP, investment, and tax calculators — fast, accurate, and private. No registration required.',
  ctaLabel: 'Explore Calculators',
  ctaHref: '/calculators',
} as const;

export const categoryShowcase = [
  {
    id: 'investing',
    title: 'Investing',
    href: '/investing',
    description:
      'Model systematic contributions, compound growth, and long-term portfolio outcomes before you commit capital.',
  },
  {
    id: 'loans',
    title: 'Loans',
    href: '/loans',
    description:
      'Understand monthly payments, total interest, and the true cost of mortgages, auto loans, and personal borrowing.',
  },
  {
    id: 'taxes',
    title: 'Taxes',
    href: '/taxes',
    description:
      'Split tax-inclusive and tax-exclusive amounts for invoices, estimates, and small-business bookkeeping.',
  },
] as const;

export const trustBarItems = [
  {
    title: 'Editorial standard',
    bodyBefore:
      'Educational content is reviewed for clarity and formula accuracy. See our ',
    link: { label: 'about page', href: '/about' },
    bodyAfter: ' for how we work.',
  },
  {
    title: 'Privacy-first',
    bodyBefore: 'Calculations run in your browser. Read our ',
    link: { label: 'privacy policy', href: '/privacy' },
    bodyAfter: ' for details on data handling.',
  },
  {
    title: 'Not financial advice',
    bodyBefore: `${SITE.name} provides tools and information, not personalized recommendations. Review our `,
    link: { label: 'terms of use', href: '/terms' },
    bodyAfter: '.',
  },
] as const;

export const whySection = {
  title: `Why ${SITE.name}`,
  intro:
    'We built this site for people who want straight answers — not another dashboard, paywall, or sales funnel disguised as a calculator.',
} as const;

export const whyPillars = [
  {
    title: 'Speed',
    description:
      'Results update instantly as you adjust inputs. No page reloads, no waiting on servers — just immediate feedback.',
  },
  {
    title: 'Accuracy',
    description:
      'Formulas follow standard financial mathematics used by planners and analysts. We document what each calculator does and where estimates apply.',
  },
  {
    title: 'Privacy',
    description:
      'Your numbers stay on your device. We do not require accounts and we do not store calculator inputs on our servers.',
  },
  {
    title: 'No Registration',
    description:
      'Open any tool and start calculating. No email gate, no trial countdown, no friction between you and an answer.',
  },
] as const;

export const homeFaqPreview: FAQItem[] = [
  {
    question: `Are ${SITE.name} calculators free to use?`,
    answer:
      `Yes. Every calculator on ${SITE.name} is free with no registration required. We do not charge for access, and we do not sell your input data because calculations run locally in your browser.`,
  },
  {
    question: 'Can I use these tools for retirement or mortgage planning?',
    answer:
      'You can use our investing and loan calculators to explore scenarios such as monthly contributions, compound growth, and amortized loan payments. Outputs are educational estimates — confirm figures with your financial institution, tax professional, or fiduciary advisor before making decisions.',
  },
  {
    question: 'Do you provide personalized financial advice?',
    answer:
      `No. ${SITE.name} publishes general-purpose calculators and educational content. We are not a registered investment adviser, broker-dealer, or tax preparer, and nothing on this site constitutes personalized financial, legal, or tax advice.`,
  },
  {
    question: 'How accurate are the results?',
    answer:
      'Each tool uses widely accepted formulas (for example, standard amortization for loans and compound growth for investments). Real-world results vary with fees, taxes, rate changes, and timing. Use our numbers as a starting point for comparison, not as a guarantee of future performance.',
  },
  {
    question: `Who operates ${SITE.name}?`,
    answer:
      `${SITE.name} is an independent publisher focused on transparent, accessible finance tools. We prioritize clear explanations, accessible design, and privacy-first architecture so readers can explore numbers without pressure or dark patterns.`,
  },
  {
    question: 'Is my calculator data stored on your servers?',
    answer:
      'No. Inputs and results are processed in your browser. We do not operate an application backend that receives your loan amounts, investment assumptions, or tax figures.',
  },
  {
    question: 'Which currency should I use on the calculators?',
    answer:
      'Use the currency selector in the header or toolbar to pick your display currency (USD, EUR, INR, and more). The math is the same; only the formatted symbols change.',
  },
  {
    question: 'Can I share a calculation with someone else?',
    answer:
      'Yes. Most tools include a share action that copies a URL with your inputs encoded. Anyone opening the link sees the same scenario — useful for discussing options with a partner or advisor.',
  },
  {
    question: `Does ${SITE.name} work on mobile phones?`,
    answer:
      'Yes. The site is responsive and calculators are usable on phones and tablets. For complex comparisons, a larger screen can be easier to read tables and charts.',
  },
];
