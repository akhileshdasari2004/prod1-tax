import { analyzeEmi } from '../lib/finance';
import type { EmiAmortizationRow, EmiYearPoint } from '../lib/finance';
import { formatUSD, parsePositiveNumber } from '../lib/format';

const PARAM_KEYS = { principal: 'p', rate: 'r', years: 'y' } as const;

type EmiInputs = {
  principal: number;
  rate: number;
  years: number;
};

function readInputs(form: HTMLFormElement): EmiInputs | null {
  const principal = parsePositiveNumber(
    (form.elements.namedItem('principal') as HTMLInputElement).value,
  );
  const rate = parsePositiveNumber(
    (form.elements.namedItem('rate') as HTMLInputElement).value,
  );
  const years = parsePositiveNumber(
    (form.elements.namedItem('years') as HTMLInputElement).value,
  );
  if (principal === null || rate === null || years === null || principal <= 0 || years < 1 || years > 40) {
    return null;
  }
  return { principal, rate, years: Math.floor(years) };
}

function tenureMonths(years: number): number {
  return Math.min(years * 12, 480);
}

function syncUrl(inputs: EmiInputs): void {
  const params = new URLSearchParams();
  params.set(PARAM_KEYS.principal, String(inputs.principal));
  params.set(PARAM_KEYS.rate, String(inputs.rate));
  params.set(PARAM_KEYS.years, String(inputs.years));
  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', next);
}

function loadFromUrl(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  const principal = params.get(PARAM_KEYS.principal);
  const rate = params.get(PARAM_KEYS.rate);
  const years = params.get(PARAM_KEYS.years);
  if (principal) (form.elements.namedItem('principal') as HTMLInputElement).value = principal;
  if (rate) (form.elements.namedItem('rate') as HTMLInputElement).value = rate;
  if (years) (form.elements.namedItem('years') as HTMLInputElement).value = years;
}

function setText(id: string, value: string): void {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setPanelVisible(visible: boolean): void {
  const panel = document.getElementById('emi-results-panel');
  const chartBlock = document.getElementById('emi-chart-block');
  if (panel) {
    panel.hidden = !visible;
    if (visible) panel.classList.add('animate-in');
  }
  if (chartBlock) chartBlock.hidden = !visible;
}

function drawChart(canvas: HTMLCanvasElement, yearly: EmiYearPoint[]): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || yearly.length === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const principalColor = styles.getPropertyValue('--accent').trim() || '#0071e3';
  const interestColor = styles.getPropertyValue('--warning').trim() || '#ff9500';
  const gridColor = styles.getPropertyValue('--border-subtle').trim();
  const textColor = styles.getPropertyValue('--text-tertiary').trim();

  const pad = { top: 16, right: 12, bottom: 36, left: 12 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxVal = Math.max(
    ...yearly.map((p) => p.principalPaid + p.interestPaid),
    1,
  );
  const barGap = chartW / yearly.length;
  const barW = Math.min(40, barGap * 0.55);

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

  yearly.forEach((point, index) => {
    const x = pad.left + barGap * index + (barGap - barW) / 2;
    const principalH = (point.principalPaid / maxVal) * chartH;
    const interestH = (point.interestPaid / maxVal) * chartH;
    const baseY = pad.top + chartH;

    ctx.fillStyle = principalColor;
    ctx.globalAlpha = 0.88;
    ctx.fillRect(x, baseY - principalH, barW, principalH);

    ctx.fillStyle = interestColor;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(x, baseY - principalH - interestH, barW, interestH);
    ctx.globalAlpha = 1;

    const labelEvery =
      yearly.length <= 12 ? 1 : Math.max(1, Math.ceil(yearly.length / 8));
    if (index % labelEvery === 0 || index === yearly.length - 1) {
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

function renderAmortTable(tbody: HTMLElement, schedule: EmiAmortizationRow[]): void {
  tbody.innerHTML = schedule
    .map(
      (row) => `
    <tr>
      <td>${row.month}</td>
      <td>${formatUSD(row.emi, true)}</td>
      <td>${formatUSD(row.principalPaid, true)}</td>
      <td>${formatUSD(row.interestPaid, true)}</td>
      <td>${formatUSD(row.balance)}</td>
    </tr>`,
    )
    .join('');
}

function bindRange(
  input: HTMLInputElement,
  range: HTMLInputElement,
  onChange: () => void,
): void {
  const sync = (source: HTMLInputElement, target: HTMLInputElement) => {
    target.value = source.value;
    onChange();
  };
  input.addEventListener('input', () => sync(input, range));
  range.addEventListener('input', () => sync(range, input));
}

export function initEmiCalculator(): void {
  const form = document.getElementById('emi-form');
  if (!(form instanceof HTMLFormElement)) return;

  const canvas = document.getElementById('emi-chart');
  const tbody = document.getElementById('emi-amort-tbody');
  const principalInput = form.elements.namedItem('principal') as HTMLInputElement;
  const rateInput = form.elements.namedItem('rate') as HTMLInputElement;
  const yearsInput = form.elements.namedItem('years') as HTMLInputElement;
  const principalRange = document.getElementById('emi-principal-range') as HTMLInputElement | null;
  const rateRange = document.getElementById('emi-rate-range') as HTMLInputElement | null;
  const yearsRange = document.getElementById('emi-years-range') as HTMLInputElement | null;

  loadFromUrl(form);

  const calculate = () => {
    const inputs = readInputs(form);
    if (!inputs) {
      setPanelVisible(false);
      return;
    }

    const analysis = analyzeEmi(inputs.principal, inputs.rate, tenureMonths(inputs.years));
    if (!analysis) {
      setPanelVisible(false);
      return;
    }

    setText('emi-monthly', formatUSD(analysis.emi, true));
    setText('emi-interest', formatUSD(analysis.totalInterest));
    setText('emi-total', formatUSD(analysis.totalPayment));
    setPanelVisible(true);
    syncUrl(inputs);

    if (canvas instanceof HTMLCanvasElement) drawChart(canvas, analysis.yearly);
    if (tbody) renderAmortTable(tbody, analysis.schedule);
  };

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (principalRange) bindRange(principalInput, principalRange, calculate);
  if (rateRange) bindRange(rateInput, rateRange, calculate);
  if (yearsRange) bindRange(yearsInput, yearsRange, calculate);

  document.getElementById('emi-share-btn')?.addEventListener('click', async () => {
    const inputs = readInputs(form);
    if (!inputs) return;
    syncUrl(inputs);
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('emi-share-btn');
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

  calculate();
}

initEmiCalculator();
