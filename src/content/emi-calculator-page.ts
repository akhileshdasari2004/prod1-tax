import type { FAQItem } from '../types/faq';

export const emiPageMeta = {
  title: 'EMI Calculator',
  description:
    'Free EMI calculator for home, car, and personal loans. Enter loan amount, interest rate, and tenure to get monthly EMI, total interest, total payment, amortization schedule, and chart.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Mortgage EMI Calculator',
    'Home Loan EMI Calculator',
    'EMI Amortization Schedule',
  ],
  lastUpdated: '2025-06-01',
} as const;

export const emiDefaults = {
  principal: 300000,
  rate: 7.5,
  years: 20,
} as const;

export const emiFormula = {
  title: 'EMI formula explained',
  summary:
    'Equated Monthly Installment (EMI) is the fixed payment you make each month on a reducing-balance loan. Early payments are mostly interest; later payments are mostly principal. The standard formula uses monthly compounding on the outstanding balance.',
  formula: 'EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)',
  definitions: [
    { symbol: 'EMI', meaning: 'Fixed monthly payment' },
    { symbol: 'P', meaning: 'Loan amount (principal borrowed)' },
    { symbol: 'r', meaning: 'Monthly interest rate (annual rate ÷ 12 ÷ 100)' },
    { symbol: 'n', meaning: 'Loan tenure in months' },
  ],
  notes: [
    'When annual interest is 0%, EMI = loan amount ÷ number of months.',
    'Total payment = EMI × number of months.',
    'Total interest = total payment − loan amount.',
    'Processing fees, insurance, and taxes are not included unless you add them to the loan amount.',
  ],
} as const;

export const emiExample = {
  title: 'Worked example: home loan EMI',
  inputs: { principal: 300000, rate: 7.5, years: 20 },
  steps: [
    'Loan amount (P) = $300,000',
    'Annual interest = 7.5%, so monthly r = 7.5 ÷ 12 ÷ 100 = 0.00625',
    'Tenure = 20 years → n = 240 months',
    'EMI ≈ $2,411 per month',
    'Total payment ≈ $2,411 × 240 = $578,640',
    'Total interest ≈ $578,640 − $300,000 = $278,640',
  ],
  disclaimer:
    'Illustrative only. Lenders may round EMI differently, charge fees, or use slightly different day-count conventions.',
} as const;

export const emiBenefits = {
  title: 'Why use an EMI calculator before borrowing',
  items: [
    {
      heading: 'Affordability check',
      body: 'Compare monthly EMI against net income and existing obligations. A payment that fits on paper but strains cash flow after living costs is a common mistake this tool helps you avoid early.',
    },
    {
      heading: 'Total cost of borrowing',
      body: 'A low EMI spread over a very long tenure can still mean large total interest. Seeing total payment and total interest side by side clarifies the true price of the loan.',
    },
    {
      heading: 'Tenure trade-offs',
      body: 'Shorter tenure raises EMI but cuts interest. Longer tenure lowers EMI but increases lifetime interest. Adjust years on the slider to find a balance you can sustain.',
    },
    {
      heading: 'Rate sensitivity',
      body: 'A quarter-point rate change on a large mortgage can shift EMI by meaningful dollars each month. Model best-case and stress-case rates before you sign.',
    },
    {
      heading: 'Amortization transparency',
      body: 'The schedule shows how much principal you actually retire each month. That matters for prepayment decisions and for understanding why early years feel like “paying interest only.”',
    },
  ],
} as const;

export const emiGuideSections = [
  {
    id: 'what-is-emi-calculator',
    heading: 'What is an EMI calculator?',
    paragraphs: [
      'An EMI calculator estimates your fixed monthly loan payment from three inputs: loan amount, annual interest rate, and loan tenure. It also totals interest and repayment, and can show an amortization table that splits each payment into principal and interest.',
      'Whether you are comparing mortgage offers, car finance, or a personal loan, the math is the same reducing-balance model. A good calculator updates instantly on your phone, keeps inputs readable on small screens, and lets you share a link with your co-borrower or adviser.',
    ],
  },
  {
    id: 'loan-emi-calculator',
    heading: 'Loan EMI calculator for home, auto, and personal loans',
    paragraphs: [
      'This page works as a general loan EMI calculator. Enter the sanctioned principal, the annual rate quoted by the lender, and tenure in years. Home loans often run 15–30 years; auto loans 3–7 years; personal loans 1–5 years. The output scales to any currency unit you use for the loan amount.',
      'Lenders quote nominal annual rates; the calculator converts to a monthly rate internally. If your bank offers a flat-rate quote (uncommon in many markets), do not plug it in directly — reducing-balance EMI math assumes interest on outstanding principal.',
    ],
  },
  {
    id: 'mortgage-emi-calculator',
    heading: 'Mortgage EMI calculator: planning a home purchase',
    paragraphs: [
      'Mortgage shoppers care about three numbers: monthly EMI, total interest, and how fast principal drops. Use this mortgage EMI calculator to compare 15-year versus 30-year structures, or to see how a larger down payment (lower loan amount) changes payment and lifetime interest.',
      'Property taxes, homeowners insurance, HOA fees, and PMI are not part of core EMI math. Add those costs separately when building a housing budget. The chart’s yearly view helps you see when cumulative principal repayment accelerates — typically in later years of the schedule.',
    ],
  },
  {
    id: 'amortization-schedule',
    heading: 'Understanding the EMI amortization table',
    paragraphs: [
      'Each row lists one month: payment amount, principal portion, interest portion, and remaining balance. Early rows show higher interest and lower principal; later rows flip as the balance shrinks. On mobile, scroll the table horizontally and vertically inside a compact window with a sticky header.',
      'Use the schedule to plan prepayments: extra principal payments reduce future interest because interest is charged on a smaller balance. The calculator assumes no prepayment unless you manually reduce the loan amount or tenure for a what-if scenario.',
    ],
  },
  {
    id: 'how-to-use',
    heading: 'How to use this EMI calculator',
    paragraphs: [
      'Enter loan amount, annual interest rate (%), and tenure in years. Sliders sync with the number fields for quick exploration on touch devices. Results show monthly EMI (to the cent), total payment, and total interest. The chart stacks principal versus interest paid each calendar year.',
      'Copy the share link to save a scenario. For floating-rate loans, rerun with updated rates when your reset date arrives. For joint applications, align on total payment and amortization pace, not EMI alone.',
    ],
  },
  {
    id: 'limitations',
    heading: 'Limitations and responsible borrowing',
    paragraphs: [
      'The model assumes fixed rate, fixed EMI, and on-time payment every month. Variable rates, interest-only periods, balloon payments, and moratoriums require lender-specific tools. Fees, insurance bundled into EMI, and tax benefits are excluded.',
      'Affordability is more than EMI ≤ some percent of income. Leave room for maintenance, emergencies, and lifestyle costs. If EMI crowds savings, consider a smaller loan, larger down payment, or longer search horizon — not always a longer tenure, which often increases total interest.',
    ],
  },
] as const;

export const emiFaqs: FAQItem[] = [
  {
    question: 'What is EMI?',
    answer:
      'EMI (Equated Monthly Installment) is a fixed monthly payment on a loan that includes both principal and interest. The payment stays constant while the split between principal and interest changes each month.',
  },
  {
    question: 'How is EMI calculated?',
    answer:
      'EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is loan amount, r is monthly interest rate, and n is tenure in months. This calculator applies that formula automatically.',
  },
  {
    question: 'What is the difference between EMI and interest rate?',
    answer:
      'Interest rate is the yearly cost of borrowing expressed as a percent. EMI is the actual monthly cash outflow in currency that results from combining principal, rate, and tenure.',
  },
  {
    question: 'Does tenure in years or months matter?',
    answer:
      'The math uses months internally. This calculator accepts tenure in years and converts to months (years × 12). A 20-year loan is 240 monthly installments.',
  },
  {
    question: 'What is total payment?',
    answer:
      'Total payment is EMI multiplied by the number of months — everything you pay the lender if you complete the schedule without prepayment.',
  },
  {
    question: 'What is total interest?',
    answer:
      'Total interest is total payment minus loan amount. It is the cumulative cost of borrowing over the full tenure at the assumed fixed rate.',
  },
  {
    question: 'Can I use this as a home loan EMI calculator?',
    answer:
      'Yes. Enter your sanctioned home loan amount, annual rate from the bank, and tenure in years. Compare scenarios before choosing between lenders or tenures.',
  },
  {
    question: 'Is this a mortgage EMI calculator?',
    answer:
      'Yes for principal-and-interest mortgages that follow standard amortization. Add property tax and insurance separately for a full housing budget.',
  },
  {
    question: 'Why is interest front-loaded in the schedule?',
    answer:
      'Interest is calculated on the outstanding balance, which is highest at the start. Each EMI pays that month’s interest first; the remainder reduces principal. As balance falls, interest portion shrinks.',
  },
  {
    question: 'How do prepayments affect EMI?',
    answer:
      'Extra principal payments reduce future interest but do not change the contracted EMI unless you refinance or restructure. Many borrowers keep EMI the same and shorten tenure instead.',
  },
  {
    question: 'What if the interest rate is zero?',
    answer:
      'EMI equals loan amount divided by number of months. Total interest is zero. The amortization table shows equal principal payments each month.',
  },
  {
    question: 'Are processing fees included?',
    answer:
      'No. Add one-time fees to your cash-out budget separately, or increase the loan amount if fees are financed into the principal.',
  },
  {
    question: 'How accurate is this EMI calculator?',
    answer:
      'It uses the standard reducing-balance EMI formula used by most banks. Minor differences versus your lender may come from rounding, calendar conventions, or bundled products.',
  },
  {
    question: 'Is this EMI calculator free?',
    answer:
      'Yes. Calculations run in your browser on FinanceToolsHub. We do not store your loan inputs on a server.',
  },
  {
    question: 'What related calculators are available?',
    answer:
      'Use our SIP and lumpsum calculators for investments, CAGR calculator for annualized returns, and GST calculator for tax-inclusive pricing. EMI focuses on borrowing; those tools focus on growing or measuring capital.',
  },
];
