import { DEFAULT_CURRENCY } from '../config/currencies';
import { formatMoney, formatSelectedMoney } from './currency';

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** @deprecated Use formatMoney(value, precise, 'USD') or formatSelectedMoney in the browser */
export function formatUSD(value: number, precise = false): string {
  return formatMoney(value, precise, 'USD');
}

/** @deprecated Use formatMoney(value, precise, 'INR') or formatSelectedMoney in the browser */
export function formatINR(value: number, precise = false): string {
  return formatMoney(value, precise, 'INR');
}

export function formatPercent(decimal: number): string {
  if (!Number.isFinite(decimal)) return '—';
  return percentFormatter.format(decimal);
}

/** CAGR display with configurable decimals (decimal input, e.g. 0.1247). */
export function formatCagrPercent(decimal: number, fractionDigits = 2): string {
  if (!Number.isFinite(decimal)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(decimal);
}

export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

export function parsePositiveNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '');
  if (trimmed === '') return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

export { formatMoney, formatSelectedMoney };
export { DEFAULT_CURRENCY };
