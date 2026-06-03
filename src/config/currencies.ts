export const CURRENCY_STORAGE_KEY = 'fth-currency';

export const DEFAULT_CURRENCY = 'USD' as const;

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', label: 'Euro', locale: 'en-IE' },
  { code: 'GBP', label: 'British Pound', locale: 'en-GB' },
  { code: 'INR', label: 'Indian Rupee', locale: 'en-IN' },
  { code: 'CAD', label: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', label: 'Australian Dollar', locale: 'en-AU' },
  { code: 'JPY', label: 'Japanese Yen', locale: 'ja-JP', zeroDecimal: true },
  { code: 'CHF', label: 'Swiss Franc', locale: 'de-CH' },
  { code: 'CNY', label: 'Chinese Yuan', locale: 'zh-CN' },
  { code: 'SGD', label: 'Singapore Dollar', locale: 'en-SG' },
  { code: 'HKD', label: 'Hong Kong Dollar', locale: 'en-HK' },
  { code: 'NZD', label: 'New Zealand Dollar', locale: 'en-NZ' },
  { code: 'MXN', label: 'Mexican Peso', locale: 'es-MX' },
  { code: 'BRL', label: 'Brazilian Real', locale: 'pt-BR' },
  { code: 'ZAR', label: 'South African Rand', locale: 'en-ZA' },
  { code: 'KRW', label: 'South Korean Won', locale: 'ko-KR', zeroDecimal: true },
  { code: 'SEK', label: 'Swedish Krona', locale: 'sv-SE' },
  { code: 'NOK', label: 'Norwegian Krone', locale: 'nb-NO' },
  { code: 'DKK', label: 'Danish Krone', locale: 'da-DK' },
  { code: 'PLN', label: 'Polish Złoty', locale: 'pl-PL' },
  { code: 'AED', label: 'UAE Dirham', locale: 'ar-AE' },
  { code: 'SAR', label: 'Saudi Riyal', locale: 'ar-SA' },
  { code: 'TRY', label: 'Turkish Lira', locale: 'tr-TR' },
  { code: 'THB', label: 'Thai Baht', locale: 'th-TH' },
  { code: 'PHP', label: 'Philippine Peso', locale: 'en-PH' },
  { code: 'IDR', label: 'Indonesian Rupiah', locale: 'id-ID', zeroDecimal: true },
  { code: 'MYR', label: 'Malaysian Ringgit', locale: 'ms-MY' },
  { code: 'VND', label: 'Vietnamese Dong', locale: 'vi-VN', zeroDecimal: true },
  { code: 'ILS', label: 'Israeli Shekel', locale: 'he-IL' },
  { code: 'TWD', label: 'New Taiwan Dollar', locale: 'zh-TW' },
  { code: 'HUF', label: 'Hungarian Forint', locale: 'hu-HU', zeroDecimal: true },
  { code: 'CZK', label: 'Czech Koruna', locale: 'cs-CZ' },
  { code: 'RON', label: 'Romanian Leu', locale: 'ro-RO' },
  { code: 'CLP', label: 'Chilean Peso', locale: 'es-CL', zeroDecimal: true },
  { code: 'COP', label: 'Colombian Peso', locale: 'es-CO', zeroDecimal: true },
  { code: 'PEN', label: 'Peruvian Sol', locale: 'es-PE' },
  { code: 'ARS', label: 'Argentine Peso', locale: 'es-AR' },
  { code: 'EGP', label: 'Egyptian Pound', locale: 'ar-EG' },
  { code: 'NGN', label: 'Nigerian Naira', locale: 'en-NG' },
  { code: 'PKR', label: 'Pakistani Rupee', locale: 'en-PK' },
  { code: 'BDT', label: 'Bangladeshi Taka', locale: 'bn-BD' },
  { code: 'LKR', label: 'Sri Lankan Rupee', locale: 'si-LK' },
  { code: 'NPR', label: 'Nepalese Rupee', locale: 'ne-NP' },
  { code: 'RUB', label: 'Russian Ruble', locale: 'ru-RU' },
  { code: 'UAH', label: 'Ukrainian Hryvnia', locale: 'uk-UA' },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

export type CurrencyDefinition = {
  code: CurrencyCode;
  label: string;
  locale: string;
  /** ISO 4217 currencies with no minor units */
  zeroDecimal?: boolean;
};

const currencyByCode = new Map<CurrencyCode, CurrencyDefinition>(
  CURRENCIES.map((currency) => [currency.code, currency]),
);

export function isCurrencyCode(value: string): value is CurrencyCode {
  return currencyByCode.has(value as CurrencyCode);
}

export function getCurrencyMeta(code: string): CurrencyDefinition {
  if (isCurrencyCode(code)) return currencyByCode.get(code)!;
  return currencyByCode.get(DEFAULT_CURRENCY)!;
}
