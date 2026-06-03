import type { FAQItem } from '../types/faq';

export const cagrPageMeta = {
  title: 'CAGR Calculator',
  description:
    'Free CAGR calculator for investments. Enter beginning value, ending value, and years to get compound annual growth rate (CAGR) instantly — with formula, examples, and growth chart.',
  keywords: [
    'CAGR Calculator',
    'Annual Growth Rate Calculator',
    'Investment Growth Calculator',
    'Compound Annual Growth Rate',
    'CAGR Formula',
  ],
  lastUpdated: '2025-06-01',
} as const;

export const cagrDefaults = {
  beginning: 10000,
  ending: 25000,
  years: 5,
} as const;

export const cagrFormula = {
  title: 'CAGR formula explained',
  summary:
    'Compound Annual Growth Rate (CAGR) is the constant yearly rate that would take a starting balance to an ending balance over a given number of years, assuming profits are reinvested each period.',
  formula: 'CAGR = (Ending Value ÷ Beginning Value)^(1 ÷ Years) − 1',
  definitions: [
    { symbol: 'Beginning Value', meaning: 'Portfolio or asset value at the start of the period' },
    { symbol: 'Ending Value', meaning: 'Value at the end of the period' },
    { symbol: 'Years', meaning: 'Number of full years (or fractional years for sub-annual periods)' },
    { symbol: 'CAGR', meaning: 'Annualized growth rate expressed as a decimal or percentage' },
  ],
  notes: [
    'CAGR smooths volatile year-to-year returns into one comparable annual figure.',
    'If ending value is below beginning value, CAGR is negative — the investment shrank on an annualized basis.',
    'CAGR ignores cash flows (deposits or withdrawals) during the period; use IRR or XIRR when money moved in or out.',
  ],
} as const;

export const cagrExample = {
  title: 'Worked example: CAGR calculation',
  inputs: { beginning: 10000, ending: 25000, years: 5 },
  steps: [
    'Beginning value = $10,000',
    'Ending value = $25,000',
    'Period = 5 years',
    'Growth multiple = 25,000 ÷ 10,000 = 2.5',
    'CAGR = 2.5^(1/5) − 1 = 2.5^0.2 − 1 ≈ 0.2014',
    'CAGR percentage ≈ 20.14% per year',
    'Check: $10,000 × (1.2014)^5 ≈ $25,000',
  ],
  disclaimer:
    'Illustrative only. Real portfolios have uneven yearly returns; CAGR is a summary metric, not a year-by-year forecast.',
} as const;

export const cagrBenefits = {
  title: 'Why CAGR matters for investors',
  items: [
    {
      heading: 'Compare unlike holding periods',
      body: 'A five-year fund and a ten-year fund cannot be judged by total return alone. CAGR puts both on an annualized footing so you compare apples to apples.',
    },
    {
      heading: 'Benchmark performance',
      body: 'Index CAGR, adviser track records, and your own portfolio can share the same yardstick when you know beginning value, ending value, and elapsed time.',
    },
    {
      heading: 'Set realistic expectations',
      body: 'Knowing that 12% CAGR over a decade is rare for broad markets helps you stress-test retirement and goal models before committing capital.',
    },
    {
      heading: 'Communicate clearly',
      body: 'Stakeholders expect an annual growth rate, not a raw multiple. CAGR is the standard language in pitch decks, annual reports, and personal net-worth reviews.',
    },
    {
      heading: 'Spot misleading totals',
      body: 'A 80% total return sounds impressive until you learn it took fifteen years. CAGR reveals whether that outcome was exceptional or merely average.',
    },
  ],
} as const;

export const cagrGuideSections = [
  {
    id: 'what-is-cagr-calculator',
    heading: 'What is a CAGR calculator?',
    paragraphs: [
      'A CAGR calculator computes compound annual growth rate from three inputs: how much you started with, how much you ended with, and how many years passed. The output is a single annualized percentage that describes the smoothed path between those two balances.',
      'Investors use it for stocks, mutual funds, real estate, business revenue, and even savings accounts when they want one number that summarizes multi-year performance. A well-built calculator updates instantly, shows the implied growth curve, and documents the formula so you can verify results in a spreadsheet.',
    ],
  },
  {
    id: 'annual-growth-rate',
    heading: 'Annual growth rate calculator vs total return',
    paragraphs: [
      'Total return answers “How much did I make in dollars or percent over the whole period?” Annual growth rate (CAGR) answers “What constant yearly rate would have produced the same ending balance?” Those questions overlap but are not identical.',
      'Suppose you doubled your money in eight years. Total return is 100%. CAGR is about 9.05% per year — because compounding means each year’s growth builds on the last. An annual growth rate calculator encodes that compounding logic so you do not misread a headline total return as a per-year figure.',
    ],
  },
  {
    id: 'investment-growth',
    heading: 'Investment growth calculator for portfolios',
    paragraphs: [
      'When you treat a portfolio as one lump sum — beginning snapshot and ending snapshot — CAGR is the right summary statistic. It is the same math fund managers cite for track records and the same metric used to compare a rental property’s appreciation to a stock index.',
      'An investment growth calculator becomes more powerful when you layer scenarios: rerun the same beginning value with different ending targets, or hold the ending value fixed and solve for years required at a target CAGR. This page focuses on the core calculation; use related tools for monthly SIP flows or loan amortization where cash timing matters.',
    ],
  },
  {
    id: 'cagr-vs-irr',
    heading: 'CAGR vs IRR: when to use which',
    paragraphs: [
      'CAGR assumes one deposit at the start and no intermediate cash flows. Internal Rate of Return (IRR) handles multiple contributions and withdrawals at different dates. If you only invested once and let it compound, CAGR is appropriate.',
      'If you dollar-cost averaged monthly, sold partial positions, or reinvested dividends into new purchases, IRR or XIRR better reflects your personal experience. Misapplying CAGR in those cases can overstate or understate how hard your money worked.',
    ],
  },
  {
    id: 'how-to-use',
    heading: 'How to use this CAGR calculator',
    paragraphs: [
      'Enter beginning value (starting balance), ending value (current or final balance), and number of years. Results update as you type or move sliders. The headline output is CAGR percentage — the compound annual growth rate for your scenario.',
      'The chart plots the implied year-by-year balance if growth were perfectly smooth at that CAGR. The table lists each year’s projected value. Copy the share link to save inputs. For tax, fee, and volatility effects, adjust your ending value or use conservative ending estimates rather than peak bubble prices.',
    ],
  },
  {
    id: 'limitations',
    heading: 'Limitations every investor should know',
    paragraphs: [
      'CAGR hides path risk. Two investments with identical CAGR can feel vastly different if one drew down 40% mid-period and the other marched steadily upward. Always review drawdowns and volatility alongside annualized returns.',
      'Short periods can produce extreme CAGR readings that are not sustainable. A 200% gain in one year is a 200% CAGR over one year — but annualizing a lucky quarter can mislead. Prefer longer windows when comparing strategies, and treat sub-year CAGR as indicative only.',
    ],
  },
] as const;

export const cagrFaqs: FAQItem[] = [
  {
    question: 'What does CAGR stand for?',
    answer:
      'CAGR stands for Compound Annual Growth Rate. It is the constant annual rate at which an investment would have grown if profits were reinvested each year and the path were smooth.',
  },
  {
    question: 'How do you calculate CAGR?',
    answer:
      'CAGR = (Ending Value ÷ Beginning Value)^(1 ÷ Years) − 1. Express the result as a percentage by multiplying by 100. Our calculator performs this automatically from your three inputs.',
  },
  {
    question: 'What is a good CAGR for investments?',
    answer:
      'Context matters. Long-run U.S. equity index CAGR has often been near 7–10% before inflation. Venture or small-cap stories may cite higher figures, but higher CAGR usually comes with higher risk and deeper drawdowns. Compare against a relevant benchmark, not an arbitrary round number.',
  },
  {
    question: 'Can CAGR be negative?',
    answer:
      'Yes. If ending value is less than beginning value, the growth multiple is below 1 and CAGR is negative. That means the investment lost value on an annualized basis over the period.',
  },
  {
    question: 'Is CAGR the same as average annual return?',
    answer:
      'No. A simple average of yearly returns ignores compounding and can overstate performance. CAGR accounts for compounding by solving for the single rate that links beginning and ending values.',
  },
  {
    question: 'Does CAGR include dividends?',
    answer:
      'CAGR reflects whatever is captured in beginning and ending values. If ending value includes reinvested dividends, they are included. If you report price-only values, dividends are excluded unless you add them back.',
  },
  {
    question: 'Can I use CAGR for less than one year?',
    answer:
      'Mathematically you can use fractional years, but very short windows produce volatile annualized figures. A 10% gain in one month annualizes to a triple-digit CAGR that is not a realistic forward expectation.',
  },
  {
    question: 'What is the difference between CAGR and ROI?',
    answer:
      'ROI (return on investment) is often total return over the period without annualizing. CAGR is the per-year compound rate. A 50% ROI over ten years implies a much lower CAGR than 50% over two years.',
  },
  {
    question: 'Why does my mutual fund fact sheet show CAGR?',
    answer:
      'Fund companies annualize performance so investors can compare funds held for different durations and against indices. Always check the time window and whether the figure is trailing or hypothetical.',
  },
  {
    question: 'How is CAGR used in business?',
    answer:
      'Companies apply CAGR to revenue, users, or profit over three to five years in investor presentations. The same formula applies: ending metric divided by beginning metric, raised to one over years, minus one.',
  },
  {
    question: 'Does CAGR assume reinvestment?',
    answer:
      'Yes. The formula implies all gains remain invested and compound at the same rate. If you withdrew gains each year, your personal experience would differ from CAGR on the remaining balance.',
  },
  {
    question: 'What beginning and ending values should I use?',
    answer:
      'Use market values at the start and end dates you care about, including cash in the account. Be consistent with fees: either use net values after costs or gross values before costs, but do not mix methods.',
  },
  {
    question: 'How do I annualize a multi-year total return?',
    answer:
      'Convert total return to a growth multiple (1 + total return), then apply CAGR: multiple^(1/years) − 1. Example: 100% total return over 8 years → multiple 2 → CAGR ≈ 9.05%.',
  },
  {
    question: 'Is this CAGR calculator free?',
    answer:
      'Yes. FinanceToolsHub provides this CAGR calculator at no charge. Calculations run in your browser; we do not store your inputs on a server.',
  },
  {
    question: 'What related calculators should I use?',
    answer:
      'Use our SIP calculator for monthly investments, lumpsum calculator for one-time compounding, and EMI calculator for loan amortization. CAGR is best for single-period beginning-to-ending comparisons without intermediate cash flows.',
  },
];
