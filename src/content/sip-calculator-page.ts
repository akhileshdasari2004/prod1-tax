import type { FAQItem } from '../types/faq';

export const sipPageMeta = {
  title: 'SIP Calculator',
  description:
    'Free SIP calculator for mutual funds and monthly investing. Estimate maturity value, invested amount, and wealth gained with interactive charts — updated in real time.',
  keywords: [
    'SIP Calculator',
    'Mutual Fund SIP Calculator',
    'Monthly SIP Calculator',
    'Investment Calculator',
    'SIP Return Calculator',
  ],
  lastUpdated: '2025-06-01',
} as const;

export const sipDefaults = {
  monthly: 500,
  rate: 10,
  years: 15,
} as const;

export const sipFormula = {
  title: 'SIP formula explained',
  summary:
    'A Systematic Investment Plan (SIP) invests the same amount every month. With a steady expected return, the portfolio value follows the future value of an annuity due — payments made at the start of each month.',
  formula:
    'FV = P × [((1 + r)^n − 1) / r] × (1 + r)',
  definitions: [
    { symbol: 'FV', meaning: 'Maturity value (future value of all SIP installments)' },
    { symbol: 'P', meaning: 'Monthly investment amount' },
    { symbol: 'r', meaning: 'Monthly rate of return (annual rate ÷ 12 ÷ 100)' },
    { symbol: 'n', meaning: 'Total number of monthly installments (years × 12)' },
  ],
  notes: [
    'Invested amount = monthly investment × number of months.',
    'Wealth gained = maturity value − invested amount.',
    'If the expected return is 0%, maturity value equals invested amount.',
  ],
} as const;

/** Worked example: $500/mo, 10% annual, 15 years */
export const sipExample = {
  title: 'Example SIP calculation',
  inputs: { monthly: 500, rate: 10, years: 15 },
  steps: [
    'Monthly investment (P) = $500',
    'Annual expected return = 10%, so monthly rate r = 10 ÷ 12 ÷ 100 = 0.008333',
    'Duration = 15 years → n = 15 × 12 = 180 months',
    'Invested amount = 500 × 180 = $90,000',
    'Apply the SIP formula to get maturity value ≈ $207,962',
    'Wealth gained = $207,962 − $90,000 = $117,962',
  ],
  disclaimer:
    'Figures are illustrative. Actual mutual fund returns vary; fees, taxes, and market timing are not modeled here.',
} as const;

export const sipBenefits = {
  title: 'Benefits of SIP investing',
  items: [
    {
      heading: 'Disciplined saving',
      body: 'Automating a fixed monthly amount removes the pressure to time the market. Consistency matters more than picking a perfect entry day.',
    },
    {
      heading: 'Rupee-cost averaging',
      body: 'When prices fall, the same installment buys more units; when prices rise, you buy fewer. Over time, that can smooth volatile markets compared with one lump-sum bet.',
    },
    {
      heading: 'Compound growth',
      body: 'Returns earn returns when you stay invested. Longer horizons amplify compounding — which is why starting earlier often matters as much as investing more.',
    },
    {
      heading: 'Flexible starting amounts',
      body: 'Many funds allow modest monthly contributions, making SIPs accessible while you build the habit before increasing contributions.',
    },
    {
      heading: 'Goal-based planning',
      body: 'Education, retirement, or a down payment can each map to a target date. Running scenarios with different rates and durations clarifies what is realistic.',
    },
  ],
} as const;

export const sipGuideSections = [
  {
    id: 'what-is-sip-calculator',
    heading: 'What is a SIP calculator?',
    paragraphs: [
      'A SIP calculator estimates how much a recurring monthly investment could grow over time given an expected annual return. It answers three practical questions: How much will you contribute? What might the portfolio be worth at the end? How much of that total is growth versus money you put in?',
      'Unlike a static spreadsheet, a strong online SIP calculator updates instantly when you change inputs, visualizes the journey year by year, and lets you share scenarios with a link. That combination helps you compare fund options, plan goals, and sanity-check advice without rebuilding formulas manually.',
    ],
  },
  {
    id: 'mutual-fund-sip',
    heading: 'Mutual fund SIP calculator vs generic investment calculator',
    paragraphs: [
      'Mutual fund SIPs are the most common use case: you authorize a fixed amount to purchase fund units each month. The math is the same as any monthly investment plan, but mutual funds add real-world wrinkles — expense ratios, exit loads, market volatility, and tax treatment — that a calculator models only through your return assumption.',
      'Use this tool as a mutual fund SIP calculator by entering your monthly contribution, a conservative or base-case return, and your horizon in years. Compare multiple return bands (for example 8%, 10%, and 12%) instead of trusting a single headline rate. Pair results with fund factsheets and, when needed, a fiduciary adviser.',
    ],
  },
  {
    id: 'monthly-sip-planning',
    heading: 'Monthly SIP calculator for goal planning',
    paragraphs: [
      'Goal planning works backward and forward. Forward: “If I invest $400 monthly for 20 years at 9%, what might I have?” Backward: “I need about $120,000 in 12 years; what monthly amount gets me close at 8%?” This page focuses on forward projection, but you can iterate monthly amounts until the maturity value approaches your target.',
      'For retirement alongside workplace plans, a monthly SIP calculator helps you see what taxable investing might add to a 401(k) or IRA. For medium-term goals — a home down payment, tuition, sabbatical fund — shorten the duration and prefer more conservative return assumptions.',
    ],
  },
  {
    id: 'sip-return',
    heading: 'SIP return calculator: reading the output',
    paragraphs: [
      'Maturity value is the projected ending balance. Invested amount is everything you contributed from your pocket. Wealth gained is the gap between the two — the compounded growth portion. On the chart, invested amount and wealth gained stack to the total height each year so you can see when growth overtakes contributions.',
      'A SIP return calculator does not guarantee performance. Markets rise and fall; actual CAGR may be higher or lower than your assumption. Treat output as a structured estimate, not a promise. Document the rate you used so you can revisit the plan when life or markets change.',
    ],
  },
  {
    id: 'how-to-use',
    heading: 'How to use this SIP calculator',
    paragraphs: [
      'Enter your monthly investment, expected annual return, and investment duration in years. Results and the chart update as you type. Drag the sliders for quick tweaks, or share your scenario with the copy-link button — the URL stores your inputs so you can return later or send them to a partner or adviser.',
      'Check the formula and example sections if you want to verify the math manually. Read the FAQs for step-up SIPs, pausing contributions, and how this differs from lump-sum investing. When you are ready to explore adjacent tools, use the related calculators for CAGR, lumpsum growth, or loan EMI planning.',
    ],
  },
] as const;

export const sipFaqs: FAQItem[] = [
  {
    question: 'What is a SIP (Systematic Investment Plan)?',
    answer:
      'A SIP is a method of investing a fixed amount at regular intervals — typically monthly — into a mutual fund or similar vehicle. It enforces discipline and can reduce timing risk compared with investing a single lump sum all at once.',
  },
  {
    question: 'How does this SIP calculator work?',
    answer:
      'The calculator uses the standard future-value formula for monthly investments with compounding at the start of each month. It multiplies your monthly amount by the growth factor for the total number of months, then subtracts contributions to show wealth gained.',
  },
  {
    question: 'What is maturity value in a SIP?',
    answer:
      'Maturity value is the projected balance at the end of your chosen duration, including both your contributions and compounded growth. It is labeled “Maturity Value” in the results panel.',
  },
  {
    question: 'What is invested amount vs wealth gained?',
    answer:
      'Invested amount is the sum of all monthly installments you contribute. Wealth gained is maturity value minus invested amount — the portion from compounded returns under your assumed rate.',
  },
  {
    question: 'Is this the same as a mutual fund SIP calculator?',
    answer:
      'Yes. The core math applies to mutual fund SIPs, brokerage auto-invest plans, and other monthly contribution schedules. Fund-specific fees and taxes are not auto-applied; adjust your expected return downward to approximate them.',
  },
  {
    question: 'Does the calculator support step-up SIP?',
    answer:
      'This version models a fixed monthly installment. For a step-up SIP (annual increase), run multiple scenarios with higher monthly amounts or add the planned increase manually to your final-year contribution estimate.',
  },
  {
    question: 'Can I use different currencies?',
    answer:
      'Yes. The formula is currency-agnostic. Use the currency selector to format amounts in USD, INR, EUR, or 40+ other currencies. This changes display formatting only — it does not convert exchange rates.',
  },
  {
    question: 'What expected return should I assume?',
    answer:
      'Many long-term diversified equity investors use a range near 8–12% annualized for illustration, but past performance does not guarantee future results. Conservative planners often stress-test 6–8% for planning and treat higher figures as optimistic cases only.',
  },
  {
    question: 'How accurate are SIP calculator results?',
    answer:
      'Results are mathematically consistent with your inputs. Real outcomes differ because returns fluctuate, fees reduce net performance, and you may pause or change contributions. Use outputs for comparison and education, not as guaranteed forecasts.',
  },
  {
    question: 'SIP vs lumpsum: which is better?',
    answer:
      'Neither is universally better. SIPs spread entry points and encourage discipline; lumpsum investing may outperform in steadily rising markets. Many investors combine both — SIP for ongoing discipline plus occasional lumpsum when cash is available.',
  },
  {
    question: 'Can I pause or stop my SIP?',
    answer:
      'Most mutual fund platforms let you pause or cancel SIP mandates. Stopping reduces future invested amount in this calculator’s terms — rerun the tool with the months you actually expect to contribute.',
  },
  {
    question: 'How do taxes affect SIP returns?',
    answer:
      'Taxes depend on account type, holding period, and local rules (for example capital gains on mutual funds or taxable brokerage accounts). This calculator shows pre-tax growth. Consult a tax professional for personalized guidance.',
  },
  {
    question: 'What is the minimum monthly amount for a SIP?',
    answer:
      'Minimums are set by each fund or broker — often modest (sometimes equivalent to $25–$100 or ₹500). The calculator accepts any positive monthly amount so you can model micro-SIPs or larger contributions.',
  },
  {
    question: 'How is SIP return different from CAGR?',
    answer:
      'This tool projects wealth from periodic contributions. CAGR measures the smoothed annual growth rate between a starting and ending balance. Use our CAGR calculator when you already have beginning and ending values and want one annualized percentage.',
  },
  {
    question: 'Can I share my SIP calculation with someone else?',
    answer:
      'Yes. Click “Copy share link” after setting inputs. The URL encodes your monthly investment, expected return, and duration so others see the same scenario when they open the page.',
  },
];
