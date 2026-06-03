import { SITE } from '../config/site';

export const LEGAL_LAST_UPDATED = '2026-06-03';

export const aboutPage = {
  mission: [
    `${SITE.name} helps people make clearer money decisions with free calculators for investing, loans, and taxes. Every tool runs in your browser — no account, no server-side storage of your inputs.`,
    `We focus on accuracy, readable results, and long-form guides so you understand the math behind SIPs, CAGR, EMIs, and GST — not just the headline number.`,
  ],
  values: [
    {
      title: 'Privacy by design',
      body: 'Calculator data stays on your device. We do not operate a backend that receives your financial inputs.',
    },
    {
      title: 'Educational clarity',
      body: 'Each calculator includes examples, FAQs, and step-by-step explanations suitable for beginners and power users.',
    },
    {
      title: 'No paywalls',
      body: 'Core calculators remain free. We may show advertising in the future to support hosting; our privacy policy will always disclose how data is used.',
    },
  ],
  editorial: [
    'Formulas follow standard financial conventions (compound growth, reducing-balance EMI, GST split).',
    'When tax rates or regulations change, update presets and guides promptly.',
    'We welcome corrections via the contact page — include the calculator URL and sample inputs.',
  ],
} as const;

export const contactPage = {
  intro:
    'We read every message. Use the topics below so we can route your note quickly.',
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
    'Typical response within two business days (Monday–Friday, US time). Urgent security issues: put "Security" in the subject line.',
} as const;
