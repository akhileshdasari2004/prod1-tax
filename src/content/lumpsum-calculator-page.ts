import type { FAQItem } from '../types/faq';

export const lumpsumPageMeta = {
  title: 'Lumpsum Calculator',
  description:
    'Free lumpsum investment calculator. Enter initial investment, expected return rate, and duration to estimate future value and profit earned — with interactive chart and year-by-year breakdown.',
  keywords: [
    'Lumpsum Calculator',
    'Mutual Fund Calculator',
    'Investment Return Calculator',
    'Lumpsum Investment Calculator',
    'One Time Investment Calculator',
  ],
  lastUpdated: '2025-06-01',
} as const;

export const lumpsumDefaults = {
  principal: 50000,
  rate: 12,
  years: 10,
} as const;

export const lumpsumFormula = {
  title: 'Lumpsum investment formula explained',
  summary:
    'A lumpsum investment compounds a single upfront amount at a fixed annual return. Each year, interest applies to the full balance including prior gains — the standard compound interest model used for mutual funds, fixed deposits, and long-term portfolios.',
  formula: 'FV = P × (1 + r)^n',
  definitions: [
    { symbol: 'FV', meaning: 'Future value (maturity balance at end of duration)' },
    { symbol: 'P', meaning: 'Initial investment (principal deposited once)' },
    { symbol: 'r', meaning: 'Annual rate of return as a decimal (annual % ÷ 100)' },
    { symbol: 'n', meaning: 'Investment duration in years' },
  ],
  notes: [
    'Profit earned = future value − initial investment.',
    'If the return rate is 0%, future value equals the initial investment and profit is zero.',
    'This formula assumes no additional deposits or withdrawals during the period.',
  ],
} as const;

export const lumpsumExample = {
  title: 'Worked example: lumpsum calculation',
  inputs: { principal: 50000, rate: 12, years: 10 },
  steps: [
    'Initial investment (P) = $50,000',
    'Expected annual return = 12%, so r = 12 ÷ 100 = 0.12',
    'Duration (n) = 10 years',
    'Future value = 50,000 × (1.12)^10',
    'Future value ≈ $155,292',
    'Profit earned = $155,292 − $50,000 = $105,292',
  ],
  disclaimer:
    'Illustrative only. Actual mutual fund and market returns vary; taxes, fees, and volatility are not modeled unless you adjust the return assumption.',
} as const;

export const lumpsumBenefits = {
  title: 'When lumpsum investing makes sense',
  items: [
    {
      heading: 'Windfalls and bonuses',
      body: 'A bonus, inheritance, or business exit often arrives as one lump. This calculator shows what that capital might become if invested immediately at your assumed return.',
    },
    {
      heading: 'Simple goal math',
      body: 'Education, retirement, or a down payment can be modeled with three numbers: how much you have today, what return you assume, and how long you wait.',
    },
    {
      heading: 'Compare to SIP',
      body: 'Lumpsum maximizes time in the market when valuations are attractive. SIP spreads entry over months. Run both calculators with the same return to see trade-offs.',
    },
    {
      heading: 'Mutual fund one-time purchase',
      body: 'Many investors make a single mutual fund purchase. Treat the purchase amount as initial investment and use a conservative return band for planning.',
    },
    {
      heading: 'Transparent compounding',
      body: 'The year-by-year chart separates your original capital from profit earned so you can see when compounding starts to dominate the total balance.',
    },
  ],
} as const;

export const lumpsumGuideSections = [
  {
    id: 'what-is-lumpsum-calculator',
    heading: 'What is a lumpsum calculator?',
    paragraphs: [
      'A lumpsum calculator projects how much a one-time investment could grow over time given an expected annual return and a holding period. You enter initial investment, return rate, and duration; the tool returns future value and profit earned, usually with a chart that shows the path year by year.',
      'Unlike spreadsheets you rebuild for every scenario, a dedicated lumpsum calculator updates instantly, supports shareable links, and documents the formula. That makes it useful for mutual fund planning, comparing return assumptions, and explaining outcomes to family or clients.',
    ],
  },
  {
    id: 'mutual-fund-calculator',
    heading: 'Lumpsum calculator as a mutual fund calculator',
    paragraphs: [
      'Mutual fund lumpsum purchases are the classic use case: you invest once and let units compound. This page works as a mutual fund calculator when you enter your purchase amount as initial investment, a realistic long-term return (often net of expense ratio), and your horizon in years.',
      'Equity funds may cite higher historical returns than debt funds, but past performance is not a guarantee. Run scenarios at 8%, 10%, and 12% instead of a single optimistic number. Pair calculator output with the fund prospectus, KID or factsheet, and your risk tolerance.',
    ],
  },
  {
    id: 'investment-return',
    heading: 'Investment return calculator: reading future value and profit',
    paragraphs: [
      'Future value is the projected balance at the end of the duration. Profit earned is everything above your initial investment — the compounded growth portion. On the chart, the bottom segment is your principal (unchanged each year) and the top segment is cumulative profit, which widens as compounding accelerates.',
      'An investment return calculator does not predict the market. It structures your assumptions. Document the rate you used so you can revisit the plan when markets, tax rules, or personal goals change.',
    ],
  },
  {
    id: 'lumpsum-vs-sip',
    heading: 'Lumpsum vs SIP: which approach to model?',
    paragraphs: [
      'Lumpsum assumes all capital is invested on day one. SIP assumes equal monthly contributions. In rising markets, lumpsum often wins on paper because more money compounds longer. In volatile or falling markets, SIP’s staggered entries can reduce average purchase price.',
      'Many investors blend both: a core lumpsum plus ongoing SIP. Use this lumpsum calculator for the upfront piece and our SIP calculator for the monthly piece, then add the results mentally or in a spreadsheet for a combined view.',
    ],
  },
  {
    id: 'how-to-use',
    heading: 'How to use this lumpsum calculator',
    paragraphs: [
      'Enter initial investment, expected annual return (%), and duration in years. Adjust sliders or type exact values. Results update immediately. Copy the share link to save a scenario.',
      'For inflation-adjusted planning, subtract an inflation estimate from your nominal return (for example 10% nominal minus 3% inflation ≈ 7% real). For tax, reduce the return assumption or the ending balance outside the tool — we do not model country-specific tax rules here.',
    ],
  },
  {
    id: 'limitations',
    heading: 'Limitations and responsible use',
    paragraphs: [
      'Constant annual return is a simplification. Real funds have negative years, fees, and style drift. Short horizons with high assumed returns can look unrealistically attractive — stress-test with lower rates and longer windows.',
      'Lumpsum timing risk is real: investing just before a drawdown hurts psychologically and financially. The calculator cannot tell you whether today is the right day; it only shows math given your inputs.',
    ],
  },
] as const;

export const lumpsumFaqs: FAQItem[] = [
  {
    question: 'What is a lumpsum investment?',
    answer:
      'A lumpsum investment is a single upfront deposit into an asset such as a mutual fund, stock portfolio, or fixed deposit. The entire amount compounds from the investment date forward without additional scheduled contributions.',
  },
  {
    question: 'How is lumpsum future value calculated?',
    answer:
      'Future value = Initial investment × (1 + annual rate)^years. The calculator applies this compound interest formula automatically and shows profit earned as future value minus initial investment.',
  },
  {
    question: 'What is the difference between lumpsum and SIP?',
    answer:
      'Lumpsum invests once at the start. SIP (Systematic Investment Plan) invests a fixed amount every month. Lumpsum maximizes time in market; SIP reduces timing risk through rupee-cost or dollar-cost averaging.',
  },
  {
    question: 'Is lumpsum better than SIP?',
    answer:
      'Neither is universally better. Lumpsum can outperform in steadily rising markets. SIP can smooth entry when prices swing. Many investors use both: a lumpsum base plus monthly SIP contributions.',
  },
  {
    question: 'Can I use this as a mutual fund lumpsum calculator?',
    answer:
      'Yes. Enter your one-time mutual fund purchase as initial investment, your expected annual return net of fees, and holding period in years. Compare multiple return assumptions rather than relying on a single headline historic CAGR.',
  },
  {
    question: 'What return rate should I assume?',
    answer:
      'Use a rate aligned with the asset class and your horizon. Broad equity long-term assumptions often fall in high single digits to low double digits before inflation. Debt and balanced funds typically use lower rates. When unsure, model conservative and base cases.',
  },
  {
    question: 'Does the calculator include taxes?',
    answer:
      'No. Results are pre-tax unless you manually lower the return or ending balance to reflect tax. Capital gains rules vary by country and holding period.',
  },
  {
    question: 'What is profit earned in this calculator?',
    answer:
      'Profit earned is future value minus your initial investment — the total compounded gain over the period, excluding any additional deposits.',
  },
  {
    question: 'Can I invest for less than one year?',
    answer:
      'The tool accepts fractional years in the math, but very short durations with high annual rates can imply unrealistic totals. For sub-year holdings, interpret results cautiously or use months converted to years.',
  },
  {
    question: 'How does inflation affect lumpsum returns?',
    answer:
      'Nominal future value ignores purchasing power. Subtract estimated inflation from your return assumption for a rough real return, or reduce the ending balance mentally to account for higher future prices.',
  },
  {
    question: 'What if the return rate is zero?',
    answer:
      'At 0% return, future value equals initial investment and profit earned is zero. The chart shows a flat total with no growth segment.',
  },
  {
    question: 'Is lumpsum suitable for retirement planning?',
    answer:
      'Lumpsum models rollovers, inheritances, or existing 401(k) balances invested as one block. Ongoing contributions during working years are better modeled with our SIP calculator and added to lumpsum results separately.',
  },
  {
    question: 'How do fees impact lumpsum returns?',
    answer:
      'Expense ratios and transaction costs reduce effective return. Lower your assumed annual return by the fund expense ratio (and a buffer for turnover) for a closer estimate.',
  },
  {
    question: 'Is this lumpsum calculator free?',
    answer:
      'Yes. FinanceToolsHub provides this calculator at no charge. Calculations run locally in your browser; inputs are not stored on our servers.',
  },
  {
    question: 'What related tools should I use?',
    answer:
      'Use our SIP calculator for monthly investing, CAGR calculator to annualize a beginning-to-ending balance, and EMI calculator for loan payments. Together they cover most personal finance projection needs.',
  },
];
