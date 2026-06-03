import { formatSelectedMoney, onCurrencyChange } from '../lib/currency';

export function bindMoneyDisplay(inputId: string, displayId: string): void {
  const input = document.getElementById(inputId);
  const display = document.getElementById(displayId);
  if (!input || !display) return;

  const sync = () => {
    if (!(input instanceof HTMLInputElement)) return;
    const value = Number(input.value);
    display.textContent = Number.isFinite(value) ? formatSelectedMoney(value) : '—';
  };

  input.addEventListener('input', sync);
  input.addEventListener('change', sync);
  onCurrencyChange(sync);
  sync();
}
