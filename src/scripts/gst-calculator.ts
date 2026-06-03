import { analyzeGst, type GstMode } from '../lib/finance';
import { formatINR, parsePositiveNumber } from '../lib/format';

const PARAM_KEYS = { mode: 'm', amount: 'a', rate: 'r' } as const;

type GstInputs = {
  amount: number;
  rate: number;
  mode: GstMode;
};

function readMode(form: HTMLFormElement): GstMode {
  const modeInput = form.querySelector('input[name="mode"]:checked') as HTMLInputElement | null;
  return modeInput?.value === 'remove' ? 'remove' : 'add';
}

function readInputs(form: HTMLFormElement): GstInputs | null {
  const amount = parsePositiveNumber(
    (form.elements.namedItem('amount') as HTMLInputElement).value,
  );
  const rate = parsePositiveNumber(
    (form.elements.namedItem('rate') as HTMLInputElement).value,
  );
  const mode = readMode(form);
  if (amount === null || rate === null || rate > 100) return null;
  return { amount, rate, mode };
}

function syncUrl(inputs: GstInputs): void {
  const params = new URLSearchParams();
  params.set(PARAM_KEYS.mode, inputs.mode);
  params.set(PARAM_KEYS.amount, String(inputs.amount));
  params.set(PARAM_KEYS.rate, String(inputs.rate));
  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', next);
}

function loadFromUrl(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get(PARAM_KEYS.mode);
  const amount = params.get(PARAM_KEYS.amount);
  const rate = params.get(PARAM_KEYS.rate);
  if (mode === 'add' || mode === 'remove') {
    const radio = form.querySelector(`input[name="mode"][value="${mode}"]`) as HTMLInputElement | null;
    if (radio) radio.checked = true;
  }
  if (amount) (form.elements.namedItem('amount') as HTMLInputElement).value = amount;
  if (rate) (form.elements.namedItem('rate') as HTMLInputElement).value = rate;
}

function setText(id: string, value: string): void {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setPanelVisible(visible: boolean): void {
  const panel = document.getElementById('gst-results-panel');
  if (panel) {
    panel.hidden = !visible;
    if (visible) panel.classList.add('animate-in');
  }
}

function updateModeCopy(mode: GstMode): void {
  const amountLabel = document.getElementById('gst-amount-label');
  const finalLabel = document.getElementById('gst-final-label');
  const baseLabel = document.getElementById('gst-base-label');
  const hint = document.getElementById('gst-mode-hint');

  if (mode === 'add') {
    if (amountLabel) amountLabel.textContent = 'Amount (exclusive)';
    if (finalLabel) finalLabel.textContent = 'Final amount (inclusive)';
    if (baseLabel) baseLabel.textContent = 'Base amount (input)';
    if (hint) hint.textContent = 'Add GST: amount is exclusive (before tax). Final amount includes GST.';
  } else {
    if (amountLabel) amountLabel.textContent = 'Amount (inclusive)';
    if (finalLabel) finalLabel.textContent = 'Final amount (exclusive)';
    if (baseLabel) baseLabel.textContent = 'Inclusive total (input)';
    if (hint) hint.textContent = 'Remove GST: amount is inclusive (tax included). Final amount is the pre-tax base.';
  }
}

function updateBreakdownBar(baseShare: number, taxShare: number): void {
  const baseBar = document.getElementById('gst-bar-base');
  const taxBar = document.getElementById('gst-bar-tax');
  if (baseBar) baseBar.style.width = `${baseShare * 100}%`;
  if (taxBar) taxBar.style.width = `${taxShare * 100}%`;
}

function syncRateChips(rate: number): void {
  document.querySelectorAll<HTMLButtonElement>('.gst-rate-chip').forEach((chip) => {
    const preset = Number(chip.dataset.rate);
    chip.setAttribute('aria-pressed', preset === rate ? 'true' : 'false');
  });
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

export function initGstCalculator(): void {
  const form = document.getElementById('gst-form');
  if (!(form instanceof HTMLFormElement)) return;

  const amountInput = form.elements.namedItem('amount') as HTMLInputElement;
  const rateInput = form.elements.namedItem('rate') as HTMLInputElement;
  const amountRange = document.getElementById('gst-amount-range') as HTMLInputElement | null;

  loadFromUrl(form);

  const calculate = () => {
    const inputs = readInputs(form);
    if (!inputs) {
      setPanelVisible(false);
      return;
    }

    const analysis = analyzeGst(inputs.amount, inputs.rate, inputs.mode);
    updateModeCopy(inputs.mode);

    setText('gst-tax', formatINR(analysis.gstAmount, true));
    setText('gst-final', formatINR(analysis.finalAmount, true));
    setText(
      'gst-base',
      inputs.mode === 'add'
        ? formatINR(analysis.baseAmount, true)
        : formatINR(analysis.totalAmount, true),
    );

    const baseShare = 1 - analysis.gstShare;
    updateBreakdownBar(baseShare, analysis.gstShare);
    syncRateChips(inputs.rate);
    setPanelVisible(true);
    syncUrl(inputs);
  };

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (amountRange) bindRange(amountInput, amountRange, calculate);

  document.querySelectorAll<HTMLButtonElement>('.gst-rate-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const rate = chip.dataset.rate;
      if (rate) {
        rateInput.value = rate;
        calculate();
      }
    });
  });

  document.getElementById('gst-share-btn')?.addEventListener('click', async () => {
    const inputs = readInputs(form);
    if (!inputs) return;
    syncUrl(inputs);
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('gst-share-btn');
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

  calculate();
}

initGstCalculator();
