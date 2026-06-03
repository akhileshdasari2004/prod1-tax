import { bindRange, setFormError } from '../lib/calculator-form';
import { sipFutureValue, sipProjectionByYear } from '../lib/finance';
import { onCurrencyChange } from '../lib/currency';
import { formatSelectedMoney, parsePositiveNumber } from '../lib/format';
import type { SipYearPoint } from '../lib/finance';

const PARAM_KEYS = { monthly: 'm', rate: 'r', years: 'y' } as const;

type SipInputs = {
  monthly: number;
  rate: number;
  years: number;
};

function readInputs(form: HTMLFormElement): SipInputs | null {
  const monthly = parsePositiveNumber(
    (form.elements.namedItem('amount') as HTMLInputElement).value,
  );
  const rate = parsePositiveNumber(
    (form.elements.namedItem('rate') as HTMLInputElement).value,
  );
  const years = parsePositiveNumber(
    (form.elements.namedItem('years') as HTMLInputElement).value,
  );
  if (monthly === null || rate === null || years === null || years < 1 || years > 50) {
    return null;
  }
  return { monthly, rate, years: Math.floor(years) };
}

function syncUrl(inputs: SipInputs): void {
  const params = new URLSearchParams();
  params.set(PARAM_KEYS.monthly, String(inputs.monthly));
  params.set(PARAM_KEYS.rate, String(inputs.rate));
  params.set(PARAM_KEYS.years, String(inputs.years));
  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', next);
}

function loadFromUrl(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  const monthly = params.get(PARAM_KEYS.monthly);
  const rate = params.get(PARAM_KEYS.rate);
  const years = params.get(PARAM_KEYS.years);
  if (monthly) (form.elements.namedItem('amount') as HTMLInputElement).value = monthly;
  if (rate) (form.elements.namedItem('rate') as HTMLInputElement).value = rate;
  if (years) (form.elements.namedItem('years') as HTMLInputElement).value = years;
}

function setText(id: string, value: string): void {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setPanelVisible(visible: boolean): void {
  const panel = document.getElementById('sip-results-panel');
  const chartBlock = document.getElementById('sip-chart-block');
  if (panel) {
    panel.hidden = !visible;
    if (visible) panel.classList.add('animate-in');
  }
  if (chartBlock) chartBlock.hidden = !visible;
}

function drawChart(canvas: HTMLCanvasElement, series: SipYearPoint[]): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || series.length === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const investedColor = styles.getPropertyValue('--accent').trim() || '#0071e3';
  const gainColor = styles.getPropertyValue('--success').trim() || '#34c759';
  const gridColor = styles.getPropertyValue('--border-subtle').trim();
  const textColor = styles.getPropertyValue('--text-tertiary').trim();

  const pad = { top: 16, right: 12, bottom: 36, left: 12 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...series.map((p) => p.maturityValue), 1);
  const barGap = chartW / series.length;
  const barW = Math.min(48, barGap * 0.55);

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();
  }

  series.forEach((point, index) => {
    const x = pad.left + barGap * index + (barGap - barW) / 2;
    const investedH = (point.invested / maxVal) * chartH;
    const gainH = (point.wealthGained / maxVal) * chartH;
    const baseY = pad.top + chartH;

    ctx.fillStyle = investedColor;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(x, baseY - investedH, barW, investedH);

    ctx.fillStyle = gainColor;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(x, baseY - investedH - gainH, barW, gainH);
    ctx.globalAlpha = 1;

    if (series.length <= 20 || index % Math.ceil(series.length / 10) === 0 || index === series.length - 1) {
      ctx.fillStyle = textColor;
      ctx.font = '11px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(String(point.year), x + barW / 2, height - 10);
    }
  });

  ctx.fillStyle = textColor;
  ctx.font = '12px var(--font-sans)';
  ctx.textAlign = 'left';
  ctx.fillText('Year', pad.left, height - 10);
}

function renderTable(tbody: HTMLElement, series: SipYearPoint[]): void {
  tbody.innerHTML = series
    .map(
      (row) => `
    <tr>
      <td>${row.year}</td>
      <td>${formatSelectedMoney(row.invested)}</td>
      <td>${formatSelectedMoney(row.wealthGained)}</td>
      <td>${formatSelectedMoney(row.maturityValue)}</td>
    </tr>`,
    )
    .join('');
}

export function initSipCalculator(): void {
  const form = document.getElementById('sip-form');
  if (!(form instanceof HTMLFormElement)) return;

  const canvas = document.getElementById('sip-chart');
  const tbody = document.getElementById('sip-chart-tbody');
  const amountInput = form.elements.namedItem('amount') as HTMLInputElement;
  const rateInput = form.elements.namedItem('rate') as HTMLInputElement;
  const yearsInput = form.elements.namedItem('years') as HTMLInputElement;
  const amountRange = document.getElementById('sip-amount-range') as HTMLInputElement | null;
  const rateRange = document.getElementById('sip-rate-range') as HTMLInputElement | null;
  const yearsRange = document.getElementById('sip-years-range') as HTMLInputElement | null;

  loadFromUrl(form);

  const calculate = () => {
    const inputs = readInputs(form);
    if (!inputs) {
      setFormError(
        form,
        'Enter a monthly amount, expected return, and duration between 1 and 50 years.',
      );
      setPanelVisible(false);
      return;
    }

    setFormError(form, null);

    const result = sipFutureValue(inputs.monthly, inputs.rate, inputs.years);
    const series = sipProjectionByYear(inputs.monthly, inputs.rate, inputs.years);

    setText('sip-invested', formatSelectedMoney(result.totalInvested));
    setText('sip-gain', formatSelectedMoney(result.wealthGained));
    setText('sip-fv', formatSelectedMoney(result.futureValue));
    setPanelVisible(true);
    syncUrl(inputs);

    if (canvas instanceof HTMLCanvasElement) drawChart(canvas, series);
    if (tbody) renderTable(tbody, series);
  };

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (amountRange) bindRange(amountInput, amountRange, calculate);
  if (rateRange) bindRange(rateInput, rateRange, calculate);
  if (yearsRange) bindRange(yearsInput, yearsRange, calculate);

  document.getElementById('sip-share-btn')?.addEventListener('click', async () => {
    const inputs = readInputs(form);
    if (!inputs) return;
    syncUrl(inputs);
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('sip-share-btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Link copied';
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      }
    } catch {
      window.prompt('Copy this link:', window.location.href);
    }
  });

  if (canvas instanceof HTMLCanvasElement) {
    const ro = new ResizeObserver(() => calculate());
    ro.observe(canvas);
  }

  onCurrencyChange(calculate);
  calculate();
}

initSipCalculator();
