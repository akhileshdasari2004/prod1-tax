import type { FAQItem } from '../components/FAQSection.astro';

export const homeHero = {
  eyebrow: 'Free financial tools',
  headline: 'Financial Calculators Designed For Clarity 🤚',
  subheadline:
    'Professional financial calculators for investing, loans, taxes, retirement planning, and wealth building.',
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

export const whySection = {
  title: 'Why FinanceToolsHub',
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
    question: 'Are FinanceToolsHub calculators free to use?',
    answer:
      'Yes. Every calculator on FinanceToolsHub is free with no registration required. We do not charge for access, and we do not sell your input data because calculations run locally in your browser.',
  },
  {
    question: 'Can I use these tools for retirement or mortgage planning?',
    answer:
      'You can use our investing and loan calculators to explore scenarios such as monthly contributions, compound growth, and amortized loan payments. Outputs are educational estimates — confirm figures with your financial institution, tax professional, or fiduciary advisor before making decisions.',
  },
  {
    question: 'Do you provide personalized financial advice?',
    answer:
      'No. FinanceToolsHub publishes general-purpose calculators and educational content. We are not a registered investment adviser, broker-dealer, or tax preparer, and nothing on this site constitutes personalized financial, legal, or tax advice.',
  },
  {
    question: 'How accurate are the results?',
    answer:
      'Each tool uses widely accepted formulas (for example, standard amortization for loans and compound growth for investments). Real-world results vary with fees, taxes, rate changes, and timing. Use our numbers as a starting point for comparison, not as a guarantee of future performance.',
  },
  {
    question: 'Who operates FinanceToolsHub?',
    answer:
      'FinanceToolsHub is an independent publisher focused on transparent, accessible finance tools. We prioritize clear explanations, accessible design, and privacy-first architecture so readers can explore numbers without pressure or dark patterns.',
  },
];
