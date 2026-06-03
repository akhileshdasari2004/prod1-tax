import { lumpsumFutureValue, lumpsumProjectionByYear } from '../lib/finance';
import type { LumpsumYearPoint } from '../lib/finance';
import { onCurrencyChange } from '../lib/currency';
import { formatSelectedMoney, parsePositiveNumber } from '../lib/format';

const PARAM_KEYS = { principal: 'p', rate: 'r', years: 'y' } as const;

type LumpsumInputs = {
  principal: number;
  rate: number;
  years: number;
};

function readInputs(form: HTMLFormElement): LumpsumInputs | null {
  const principal = parsePositiveNumber(
    (form.elements.namedItem('principal') as HTMLInputElement).value,
  );
  const rate = parsePositiveNumber(
    (form.elements.namedItem('rate') as HTMLInputElement).value,
  );
  const years = parsePositiveNumber(
    (form.elements.namedItem('years') as HTMLInputElement).value,
  );
  if (principal === null || rate === null || years === null || principal <= 0 || years < 1 || years > 50) {
    return null;
  }
  return { principal, rate, years: Math.floor(years) };
}

function syncUrl(inputs: LumpsumInputs): void {
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
  const panel = document.getElementById('ls-results-panel');
  const chartBlock = document.getElementById('ls-chart-block');
  if (panel) {
    panel.hidden = !visible;
    if (visible) panel.classList.add('animate-in');
  }
  if (chartBlock) chartBlock.hidden = !visible;
}

function drawChart(
  canvas: HTMLCanvasElement,
  series: LumpsumYearPoint[],
  principal: number,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || series.length === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const principalColor = styles.getPropertyValue('--accent').trim() || '#0071e3';
  const profitColor = styles.getPropertyValue('--success').trim() || '#34c759';
  const gridColor = styles.getPropertyValue('--border-subtle').trim();
  const textColor = styles.getPropertyValue('--text-tertiary').trim();

  const pad = { top: 16, right: 12, bottom: 36, left: 12 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...series.map((p) => p.futureValue), principal, 1);
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
    const principalH = (principal / maxVal) * chartH;
    const profitH = (point.profitEarned / maxVal) * chartH;
    const baseY = pad.top + chartH;

    ctx.fillStyle = principalColor;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(x, baseY - principalH, barW, principalH);

    ctx.fillStyle = profitColor;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(x, baseY - principalH - profitH, barW, profitH);
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

function renderTable(tbody: HTMLElement, series: LumpsumYearPoint[]): void {
  tbody.innerHTML = series
    .map(
      (row) => `
    <tr>
      <td>${row.year}</td>
      <td>${formatSelectedMoney(row.futureValue)}</td>
      <td>${formatSelectedMoney(row.profitEarned)}</td>
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

export function initLumpsumCalculator(): void {
  const form = document.getElementById('lumpsum-form');
  if (!(form instanceof HTMLFormElement)) return;

  const canvas = document.getElementById('ls-chart');
  const tbody = document.getElementById('ls-chart-tbody');
  const principalInput = form.elements.namedItem('principal') as HTMLInputElement;
  const rateInput = form.elements.namedItem('rate') as HTMLInputElement;
  const yearsInput = form.elements.namedItem('years') as HTMLInputElement;
  const principalRange = document.getElementById('ls-principal-range') as HTMLInputElement | null;
  const rateRange = document.getElementById('ls-rate-range') as HTMLInputElement | null;
  const yearsRange = document.getElementById('ls-years-range') as HTMLInputElement | null;

  loadFromUrl(form);

  const calculate = () => {
    const inputs = readInputs(form);
    if (!inputs) {
      setPanelVisible(false);
      return;
    }

    const result = lumpsumFutureValue(inputs.principal, inputs.rate, inputs.years);
    const series = lumpsumProjectionByYear(inputs.principal, inputs.rate, inputs.years);

    setText('ls-fv', formatSelectedMoney(result.futureValue));
    setText('ls-profit', formatSelectedMoney(result.profitEarned));
    setPanelVisible(true);
    syncUrl(inputs);

    if (canvas instanceof HTMLCanvasElement) drawChart(canvas, series, inputs.principal);
    if (tbody) renderTable(tbody, series);
  };

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (principalRange) bindRange(principalInput, principalRange, calculate);
  if (rateRange) bindRange(rateInput, rateRange, calculate);
  if (yearsRange) bindRange(yearsInput, yearsRange, calculate);

  document.getElementById('ls-share-btn')?.addEventListener('click', async () => {
    const inputs = readInputs(form);
    if (!inputs) return;
    syncUrl(inputs);
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('ls-share-btn');
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

initLumpsumCalculator();
