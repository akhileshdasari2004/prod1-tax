export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    rftTrack?: (name: string, params?: AnalyticsEventParams) => void;
  }
}

export function trackEvent(name: string, params?: AnalyticsEventParams): void {
  if (typeof window === 'undefined') return;
  if (typeof window.rftTrack === 'function') {
    window.rftTrack(name, params);
  }
}

export function trackCalculatorRun(calculator: string): void {
  trackEvent('calculator_run', { calculator });
}

export function trackCalculatorResultView(calculator: string): void {
  trackEvent('calculator_result_view', { calculator });
}

export function trackCurrencyChange(currency: string): void {
  trackEvent('currency_change', { currency });
}

export function trackShareClick(calculator: string): void {
  trackEvent('share_click', { calculator });
}

export function trackOutboundClick(url: string, label?: string): void {
  trackEvent('outbound_click', { link_url: url, link_label: label });
}
