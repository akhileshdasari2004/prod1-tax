import type { FAQItem } from '../components/FAQSection.astro';

export const gstPageMeta = {
  title: 'GST Calculator',
  description:
    'Free GST calculator to add or remove GST from any amount. Enter value and GST rate to get GST amount and final amount instantly — supports 5%, 12%, 18%, 28% and custom rates.',
  keywords: [
    'GST Calculator',
    'Tax Calculator',
    'GST Inclusive Calculator',
    'Add GST Calculator',
    'Remove GST Calculator',
  ],
  lastUpdated: '2025-06-01',
} as const;

export const gstDefaults = {
  amount: 10000,
  rate: 18,
  mode: 'add' as const,
} as const;

export const gstRatePresets = [5, 12, 18, 28] as const;

export const gstFormula = {
  title: 'GST formula explained',
  summary:
    'Goods and Services Tax (GST) is applied as a percentage of a taxable base. In exclusive pricing you add tax on top; in inclusive pricing the sticker price already contains tax and you split it out mathematically.',
  addFormula: 'GST amount = Base amount × (Rate ÷ 100)',
  addFinal: 'Final amount (inclusive) = Base amount + GST amount',
  removeFormula: 'Base amount = Inclusive amount ÷ (1 + Rate ÷ 100)',
  removeGst: 'GST amount = Inclusive amount − Base amount',
  removeFinal: 'Final amount (exclusive) = Base amount',
  notes: [
    'Add GST mode treats your input as the pre-tax base (GST exclusive).',
    'Remove GST mode treats your input as the tax-inclusive price (GST inclusive).',
    'Effective tax rate on an inclusive price is not the headline slab — removal uses the divisor (1 + r).',
  ],
} as const;

export const gstExamples = [
  {
    title: 'Example 1: Add 18% GST to an exclusive invoice',
    mode: 'add' as const,
    steps: [
      'Base amount = ₹10,000 (exclusive)',
      'GST rate = 18%',
      'GST amount = 10,000 × 0.18 = ₹1,800',
      'Final amount (inclusive) = 10,000 + 1,800 = ₹11,800',
    ],
  },
  {
    title: 'Example 2: Remove 18% GST from an inclusive price',
    mode: 'remove' as const,
    steps: [
      'Inclusive amount = ₹11,800',
      'GST rate = 18%',
      'Base amount = 11,800 ÷ 1.18 = ₹10,000',
      'GST amount = 11,800 − 10,000 = ₹1,800',
      'Final amount (exclusive) = ₹10,000',
    ],
  },
] as const;

export const gstBenefits = {
  title: 'Why businesses and freelancers use a GST calculator',
  items: [
    {
      heading: 'Invoice accuracy',
      body: 'Quoting exclusive prices then adding GST prevents double-taxing. Pulling GST out of an inclusive retail price keeps your books aligned with what customers actually paid.',
    },
    {
      heading: 'Quick slab checks',
      body: 'India’s common GST slabs — 5%, 12%, 18%, and 28% — are one tap away. Custom rates cover cess-heavy categories or future rate changes without rebuilding spreadsheets.',
    },
    {
      heading: 'Reverse calculation confidence',
      body: 'Removing GST is division, not subtraction of 18%. A dedicated GST inclusive calculator avoids the frequent mistake of calculating 18% of an already-tax-inclusive number.',
    },
    {
      heading: 'Pricing decisions',
      body: 'Compare exclusive versus inclusive presentation before you publish a catalog price. Seeing GST amount and final amount side by side clarifies margin impact.',
    },
    {
      heading: 'Audit-ready splits',
      body: 'Document base, tax, and total for each line item. Consistent splits speed up filing support and client billing reviews.',
    },
  ],
} as const;

export const gstGuideSections = [
  {
    id: 'what-is-gst-calculator',
    heading: 'What is a GST calculator?',
    paragraphs: [
      'A GST calculator computes tax on a given amount and rate, either adding tax to an exclusive base or extracting tax from an inclusive total. You choose the mode, enter the amount and GST rate, and receive GST amount plus the final figure appropriate to that mode.',
      'FinanceToolsHub’s version is built for speed on mobile and desktop: segmented Add/Remove modes, preset rates, a visual base-versus-tax bar, shareable URLs, and plain-language formulas so you can verify the math without opening a spreadsheet.',
    ],
  },
  {
    id: 'gst-inclusive-calculator',
    heading: 'GST inclusive calculator (remove GST mode)',
    paragraphs: [
      'When a price tag already includes GST, you are looking at an inclusive amount. Remove GST mode answers: “How much of this price is tax, and what is the pre-tax value?” The calculator divides by (1 + rate) to find the exclusive base, then subtracts to isolate GST amount.',
      'This is the workflow behind GST inclusive calculator searches — retail receipts, restaurant bills, and B2B credits often arrive tax-inclusive. Use remove mode instead of mentally backing out 18% with a simple percentage on the inclusive figure.',
    ],
  },
  {
    id: 'tax-calculator',
    heading: 'GST calculator as a practical tax calculator',
    paragraphs: [
      'GST is a consumption tax; this tool is not a full income-tax or TDS engine, but it performs the core tax arithmetic businesses repeat daily. Think of it as a focused tax calculator for value-added tax splits rather than payroll or capital gains.',
      'Pair results with your accounting system: export the three numbers — base, GST amount, final — into invoices, credit notes, or ERP line items. For composite supplies or mixed slabs, run separate lines per rate.',
    ],
  },
  {
    id: 'add-gst',
    heading: 'Add GST mode: exclusive to inclusive',
    paragraphs: [
      'Start from a net price, apply the slab, and show the customer an inclusive total. Add GST mode multiplies the base by the rate to get GST amount, then sums for final amount. If you quote ₹50,000 + 18% GST, final amount is ₹59,000 — not ₹50,000 with ₹9,000 found by the wrong formula on an inclusive base.',
      'Service invoices, SaaS quotes, and wholesale catalogs often begin exclusive. Toggle Add GST, enter the net, pick 18% (or another slab), and copy the inclusive final for your PDF invoice.',
    ],
  },
  {
    id: 'gst-slabs-india',
    heading: 'Common GST rates in India',
    paragraphs: [
      'While rates evolve with policy, four slabs dominate everyday commerce: 5% (essentials), 12% (standard goods), 18% (most services and general goods), and 28% (luxury and sin goods). Zero-rated and exempt supplies sit outside this calculator — enter only taxable amounts.',
      'Integrated GST (IGST) on inter-state B2B sales uses the same percentages; the calculator does not split CGST/SGST versus IGST — it gives combined GST amount. Apportion state components in your compliance tool if required.',
    ],
  },
  {
    id: 'how-to-use',
    heading: 'How to use this GST calculator',
    paragraphs: [
      'Select Add GST or Remove GST. Enter amount and rate (type a custom rate or tap a preset chip). Results update instantly: GST amount and final amount, plus a bar showing the share of tax in the total. Copy the share link to save a scenario.',
      'Amount fields accept decimals for paise or cents. Rates above 100% are blocked as invalid. For compound lines (multiple items at different slabs), calculate each line separately and sum outside the tool.',
    ],
  },
] as const;

export const gstFaqs: FAQItem[] = [
  {
    question: 'What is GST?',
    answer:
      'GST (Goods and Services Tax) is an indirect tax on supply of goods and services in India (and similar VAT/GST systems elsewhere). Businesses collect it on taxable supplies and remit it to the government per filing rules.',
  },
  {
    question: 'What is the difference between Add GST and Remove GST?',
    answer:
      'Add GST starts from an exclusive (pre-tax) amount and computes tax on top. Remove GST starts from an inclusive (tax-included) amount and backs out the tax component using division by (1 + rate).',
  },
  {
    question: 'How do I calculate GST on a base amount?',
    answer:
      'GST amount = base × rate ÷ 100. Final inclusive amount = base + GST amount. Use Add GST mode and enter the base as your amount.',
  },
  {
    question: 'How do I remove GST from an inclusive price?',
    answer:
      'Base = inclusive ÷ (1 + rate ÷ 100). GST amount = inclusive − base. Use Remove GST mode and enter the inclusive price as your amount.',
  },
  {
    question: 'Why not simply take 18% of an inclusive price?',
    answer:
      'Because 18% of an inclusive price overstates the tax. The tax is 18% of the base, not 18% of the total. Removal requires dividing by 1.18, not multiplying by 0.18.',
  },
  {
    question: 'Which GST rates are supported?',
    answer:
      'Preset chips for 5%, 12%, 18%, and 28% cover common India slabs. You can type any custom rate in the rate field for other percentages.',
  },
  {
    question: 'What is final amount in Add GST mode?',
    answer:
      'Final amount is the tax-inclusive total — base plus GST. That is the number you typically show on a customer invoice when quoting exclusive prices.',
  },
  {
    question: 'What is final amount in Remove GST mode?',
    answer:
      'Final amount is the tax-exclusive base after extracting GST from your inclusive input. GST amount is shown separately as the tax portion.',
  },
  {
    question: 'Can I use this as a GST inclusive calculator?',
    answer:
      'Yes. Choose Remove GST, enter the inclusive price, and select the rate. You receive GST amount and the exclusive final amount.',
  },
  {
    question: 'Does this calculator include CGST and SGST split?',
    answer:
      'No. It returns combined GST amount. Split half-and-half into CGST and SGST for intra-state supplies in your accounting software if needed.',
  },
  {
    question: 'Are Cess and additional duties included?',
    answer:
      'No. Enter only the GST rate you want modeled. Add compensation cess or other duties manually if your product category requires them.',
  },
  {
    question: 'Can I calculate GST for zero amount?',
    answer:
      'An amount of zero yields zero GST and zero final. Negative amounts are not valid for this tool.',
  },
  {
    question: 'Is this GST calculator free?',
    answer:
      'Yes. Calculations run in your browser on FinanceToolsHub. We do not store your amounts on a server.',
  },
  {
    question: 'Is this the same as an income tax calculator?',
    answer:
      'No. This tool handles GST/VAT-style percentage splits on a single amount. Income tax needs slabs, deductions, and annual aggregation — use specialized income-tax tools for that.',
  },
  {
    question: 'What related calculators are on FinanceToolsHub?',
    answer:
      'Use our EMI calculator for loans, SIP and lumpsum calculators for investments, and CAGR calculator for annualized returns. GST focuses on tax-inclusive and tax-exclusive pricing splits.',
  },
];
