export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: 'Calculators', href: '/calculators' },
  { label: 'Investing', href: '/investing' },
  { label: 'Loans', href: '/loans' },
  { label: 'Taxes', href: '/taxes' },
];

export const footerNav = {
  tools: [
    { label: 'SIP Calculator', href: '/sip-calculator' },
    { label: 'CAGR Calculator', href: '/cagr-calculator' },
    { label: 'Lumpsum Calculator', href: '/lumpsum-calculator' },
    { label: 'EMI Calculator', href: '/emi-calculator' },
    { label: 'GST Calculator', href: '/gst-calculator' },
  ] satisfies NavItem[],
  categories: [
    { label: 'All Calculators', href: '/calculators' },
    { label: 'Investing', href: '/investing' },
    { label: 'Loans', href: '/loans' },
    { label: 'Taxes', href: '/taxes' },
  ] satisfies NavItem[],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ] satisfies NavItem[],
} as const;
