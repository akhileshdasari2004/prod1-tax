import {
  CURRENCY_STORAGE_KEY,
  CURRENCIES,
  DEFAULT_CURRENCY,
  getCurrencyMeta,
  isCurrencyCode,
  type CurrencyCode,
} from '../config/currencies';

export const CURRENCY_CHANGE_EVENT = 'rft-currency-change';

const formatterCache = new Map<string, Intl.NumberFormat>();

function cacheKey(code: string, precise: boolean): string {
  return `${code}:${precise ? 'p' : 'n'}`;
}

function getFormatter(code: string, precise: boolean): Intl.NumberFormat {
  const key = cacheKey(code, precise);
  const cached = formatterCache.get(key);
  if (cached) return cached;

  const meta = getCurrencyMeta(code);
  const formatter = new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency: meta.code,
    minimumFractionDigits: precise ? (meta.zeroDecimal ? 0 : 2) : 0,
    maximumFractionDigits: precise ? (meta.zeroDecimal ? 0 : 2) : meta.zeroDecimal ? 0 : 0,
  });
  formatterCache.set(key, formatter);
  return formatter;
}

/** Format a monetary value (SSR-safe; defaults to USD). */
export function formatMoney(
  value: number,
  precise = false,
  currencyCode: string = DEFAULT_CURRENCY,
): string {
  if (!Number.isFinite(value)) return '—';
  const code = isCurrencyCode(currencyCode) ? currencyCode : DEFAULT_CURRENCY;
  return getFormatter(code, precise).format(value);
}

export function getSelectedCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (stored && isCurrencyCode(stored)) return stored;
  return DEFAULT_CURRENCY;
}

export function setSelectedCurrency(code: CurrencyCode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENCY_STORAGE_KEY, code);
  window.dispatchEvent(
    new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { code } }),
  );
}

/** Format using the user's selected currency (browser) or USD (SSR). */
export function formatSelectedMoney(value: number, precise = false): string {
  return formatMoney(value, precise, getSelectedCurrency());
}

export function onCurrencyChange(handler: () => void): void {
  if (typeof window === 'undefined') return;
  window.addEventListener(CURRENCY_CHANGE_EVENT, handler);
}

export function getCurrencyOptions() {
  return CURRENCIES;
}
