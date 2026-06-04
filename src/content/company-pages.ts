import { SITE } from '../config/site';

export const LEGAL_LAST_UPDATED = '2026-06-04';

export const aboutPage = {
  mission: [
    `${SITE.name} helps users make smarter financial decisions with free, transparent calculators and guides. We believe clarity beats complexity — you should see the math, understand the assumptions, and explore scenarios without signing up or handing over sensitive data.`,
    `Every tool runs locally in your browser. We publish educational content for personal finance users, investors, loan seekers, home buyers, tax planners, SIP investors, students, and working professionals who want fast, trustworthy numbers.`,
  ],
  whatWeBuild: [
    'EMI and loan calculators for mortgages, auto loans, and personal borrowing',
    'SIP, lumpsum, and CAGR investment calculators for mutual funds and long-term goals',
    'GST and tax-split tools for invoices and small-business estimates',
    'Personal finance resources, FAQs, and hub pages that connect related tools',
  ],
  values: [
    {
      title: 'Privacy by design',
      body: 'All calculations happen locally in your browser. We do not store loan amounts, investment inputs, or tax figures on our servers.',
    },
    {
      title: 'Educational clarity',
      body: 'Each calculator includes examples, FAQs, and step-by-step explanations suitable for beginners and experienced planners.',
    },
    {
      title: 'No paywalls',
      body: 'Core calculators remain free. Future display advertising, if added, will be disclosed in our privacy policy and kept separate from results.',
    },
  ],
  editorial: [
    'Formulas follow standard financial conventions (compound growth, reducing-balance EMI, GST split).',
    'Manual review and formula verification before each calculator ships or updates.',
    'Accuracy checks against spreadsheet models and published examples from reputable sources.',
    'We welcome corrections via the contact page — include the calculator URL and sample inputs.',
  ],
  privacyCommitment:
    'Sensitive financial information stays on your device. We use localStorage only for non-sensitive preferences such as theme and display currency — never for calculator inputs or account credentials.',
  verification:
    'Before publishing a calculator update, we cross-check outputs against spreadsheet models and published examples from reputable financial institutions. Edge cases (zero rate, single-period loans, inclusive vs exclusive tax) are tested in the browser. When a formula has regional variants, we document the assumption in the guide and FAQ.',
  transparency: `${SITE.name} is an independent publisher for educational purposes only — not financial, tax, or legal advice. We do not sell calculator inputs, offer brokerage accounts, or receive commissions for tool usage. If we add display advertising, it will be labeled in our privacy policy and kept separate from calculator results.`,
} as const;

export const contactPage = {
  intro:
    `Reach the ${SITE.name} team for calculator feedback, content corrections, partnerships, or privacy questions. We read every message.`,
  topics: [
    {
      title: 'Calculator feedback',
      body: 'Report formula issues, confusing labels, or missing scenarios. Include the page URL and the values you entered.',
    },
    {
      title: 'Content & SEO',
      body: 'Suggest guide improvements, broken links, or accessibility barriers.',
    },
    {
      title: 'Partnerships',
      body: 'Media, integrations, or sponsorship inquiries — share your site and audience briefly.',
    },
  ],
  responseTime:
    'Typical response within two business days (Monday–Friday). Urgent security issues: put "Security" in the subject line.',
  emails: [
    { label: 'General inquiries', address: SITE.email },
    { label: 'Support', address: SITE.supportEmail },
  ],
} as const;
