export type CalculatorCategory = 'investing' | 'loans' | 'taxes';

export type CalculatorMeta = {
  id: string;
  name: string;
  href: string;
  category: CalculatorCategory;
  shortDescription: string;
  keywords: string[];
};

export const calculators: CalculatorMeta[] = [
  {
    id: 'sip',
    name: 'SIP Calculator',
    href: '/sip-calculator',
    category: 'investing',
    shortDescription: 'Estimate returns from systematic monthly investments.',
    keywords: ['sip', 'mutual fund', 'monthly investment'],
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    href: '/cagr-calculator',
    category: 'investing',
    shortDescription: 'Compute compound annual growth rate between two values.',
    keywords: ['cagr', 'annual growth', 'investment return'],
  },
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    href: '/lumpsum-calculator',
    category: 'investing',
    shortDescription:
      'Estimate future value and profit from a one-time investment with compound annual growth.',
    keywords: ['lumpsum', 'mutual fund', 'investment return', 'one-time investment'],
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    href: '/emi-calculator',
    category: 'loans',
    shortDescription:
      'Calculate monthly EMI, total interest, total payment, and full amortization schedule.',
    keywords: ['emi', 'loan emi', 'mortgage', 'home loan', 'amortization'],
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    href: '/gst-calculator',
    category: 'taxes',
    shortDescription:
      'Add or remove GST — get GST amount, final amount, and visual tax breakdown.',
    keywords: ['gst', 'tax calculator', 'gst inclusive', 'add gst'],
  },
];

export const calculatorsByCategory = {
  investing: calculators.filter((c) => c.category === 'investing'),
  loans: calculators.filter((c) => c.category === 'loans'),
  taxes: calculators.filter((c) => c.category === 'taxes'),
} as const;

export function getCalculatorById(id: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.id === id);
}

export function getRelatedCalculators(
  currentId: string,
  limit = 3,
): CalculatorMeta[] {
  const current = getCalculatorById(currentId);
  if (!current) return calculators.slice(0, limit);
  return calculators
    .filter((c) => c.id !== currentId)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, limit);
}
