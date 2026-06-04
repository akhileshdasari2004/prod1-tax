import {
  trackCalculatorResultView,
  trackCalculatorRun,
  trackShareClick,
} from '../lib/analytics-events';
import { bindRange, setFormError } from '../lib/calculator-form';
import { analyzeCagr } from '../lib/finance';
import type { CagrYearPoint } from '../lib/finance';
import { onCurrencyChange } from '../lib/currency';
import { formatCagrPercent, formatSelectedMoney, parsePositiveNumber } from '../lib/format';

const TOOL_ID = 'cagr';
const PARAM_KEYS = { begin: 'b', end: 'e', years: 'y' } as const;
let hasTrackedRun = false;

type CagrInputs = {
  begin: number;
  end: number;
  years: number;
};

function readInputs(form: HTMLFormElement): CagrInputs | null {
  const begin = parsePositiveNumber(
    (form.elements.namedItem('begin') as HTMLInputElement).value,
  );
  const end = parsePositiveNumber(
    (form.elements.namedItem('end') as HTMLInputElement).value,
  );
  const years = parsePositiveNumber(
    (form.elements.namedItem('years') as HTMLInputElement).value,
  );
  if (begin === null || end === null || years === null || begin <= 0 || years < 1 || years > 50) {
    return null;
  }
  return { begin, end, years: Math.floor(years) };
}

function syncUrl(inputs: CagrInputs): void {
  const params = new URLSearchParams();
  params.set(PARAM_KEYS.begin, String(inputs.begin));
  params.set(PARAM_KEYS.end, String(inputs.end));
  params.set(PARAM_KEYS.years, String(inputs.years));
  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', next);
}

function loadFromUrl(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  const begin = params.get(PARAM_KEYS.begin);
  const end = params.get(PARAM_KEYS.end);
  const years = params.get(PARAM_KEYS.years);
  if (begin) (form.elements.namedItem('begin') as HTMLInputElement).value = begin;
  if (end) (form.elements.namedItem('end') as HTMLInputElement).value = end;
  if (years) (form.elements.namedItem('years') as HTMLInputElement).value = years;
}

function setText(id: string, value: string): void {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setPanelVisible(visible: boolean): void {
  const panel = document.getElementById('cagr-results-panel');
  const chartBlock = document.getElementById('cagr-chart-block');
  if (panel) {
    panel.hidden = !visible;
    if (visible) panel.classList.add('animate-in');
  }
  if (chartBlock) chartBlock.hidden = !visible;
}

function drawLineChart(canvas: HTMLCanvasElement, series: CagrYearPoint[], begin: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || series.length === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const lineColor = styles.getPropertyValue('--accent').trim() || '#0071e3';
  const fillColor = styles.getPropertyValue('--accent').trim() || '#0071e3';
  const gridColor = styles.getPropertyValue('--border-subtle').trim();
  const textColor = styles.getPropertyValue('--text-tertiary').trim();

  const pad = { top: 20, right: 16, bottom: 36, left: 16 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...series.map((p) => p.value), begin, 1);
  const minVal = Math.min(begin, ...series.map((p) => p.value));
  const range = maxVal - minVal || 1;

  const xAt = (index: number) =>
    pad.left + (chartW * index) / Math.max(series.length - 1, 1);
  const yAt = (value: number) => pad.top + chartH - ((value - minVal) / range) * chartH;

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

  const points = series.map((p, i) => ({ x: xAt(i), y: yAt(p.value) }));

  ctx.beginPath();
  ctx.moveTo(points[0].x, pad.top + chartH);
  points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.globalAlpha = 0.12;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.beginPath();
  points.forEach((pt, i) => {
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  points.forEach((pt, index) => {
    if (series.length <= 15 || index % Math.ceil(series.length / 8) === 0 || index === series.length - 1) {
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = textColor;
      ctx.font = '11px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(String(series[index].year), pt.x, height - 10);
    }
  });

  ctx.fillStyle = textColor;
  ctx.font = '12px var(--font-sans)';
  ctx.textAlign = 'left';
  ctx.fillText('Year', pad.left, height - 10);
}

function renderTable(tbody: HTMLElement, series: CagrYearPoint[], begin: number): void {
  tbody.innerHTML = series
    .map(
      (row) => `
    <tr>
      <td>${row.year === 0 ? 'Start' : row.year}</td>
      <td>${formatSelectedMoney(row.value)}</td>
      <td>${formatSelectedMoney(row.value - begin)}</td>
    </tr>`,
    )
    .join('');
}

export function initCagrCalculator(): void {
  const form = document.getElementById('cagr-form');
  if (!(form instanceof HTMLFormElement)) return;

  const canvas = document.getElementById('cagr-chart');
  const tbody = document.getElementById('cagr-chart-tbody');
  const beginInput = form.elements.namedItem('begin') as HTMLInputElement;
  const endInput = form.elements.namedItem('end') as HTMLInputElement;
  const yearsInput = form.elements.namedItem('years') as HTMLInputElement;
  const beginRange = document.getElementById('cagr-begin-range') as HTMLInputElement | null;
  const endRange = document.getElementById('cagr-end-range') as HTMLInputElement | null;
  const yearsRange = document.getElementById('cagr-years-range') as HTMLInputElement | null;

  loadFromUrl(form);

  const calculate = () => {
    const inputs = readInputs(form);
    if (!inputs) {
      setFormError(
        form,
        'Enter a beginning value, ending value, and duration between 1 and 50 years.',
      );
      setPanelVisible(false);
      return;
    }

    const analysis = analyzeCagr(inputs.begin, inputs.end, inputs.years);
    if (!analysis) {
      setFormError(form, 'Ending value must be greater than the beginning value to calculate CAGR.');
      setPanelVisible(false);
      return;
    }

    setFormError(form, null);
    setText('cagr-percent', formatCagrPercent(analysis.cagr));
    setText('cagr-gain', formatSelectedMoney(analysis.absoluteGain));
    setText(
      'cagr-total-return',
      new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(analysis.totalReturnPercent / 100),
    );
    setPanelVisible(true);
    syncUrl(inputs);

    if (!hasTrackedRun) {
      trackCalculatorRun(TOOL_ID);
      hasTrackedRun = true;
    }
    trackCalculatorResultView(TOOL_ID);

    if (canvas instanceof HTMLCanvasElement) drawLineChart(canvas, analysis.curve, inputs.begin);
    if (tbody) renderTable(tbody, analysis.curve, inputs.begin);
  };

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (beginRange) bindRange(beginInput, beginRange, calculate);
  if (endRange) bindRange(endInput, endRange, calculate);
  if (yearsRange) bindRange(yearsInput, yearsRange, calculate);

  document.getElementById('cagr-share-btn')?.addEventListener('click', async () => {
    const inputs = readInputs(form);
    if (!inputs) return;
    syncUrl(inputs);
    trackShareClick(TOOL_ID);
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('cagr-share-btn');
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

initCagrCalculator();
