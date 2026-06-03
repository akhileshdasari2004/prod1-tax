const FORM_ERROR_ID = 'calc-form-error';

export function setFormError(form: HTMLFormElement, message: string | null): void {
  let el = document.getElementById(FORM_ERROR_ID);

  if (!message) {
    if (el) {
      el.textContent = '';
      el.setAttribute('hidden', '');
    }
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });
    return;
  }

  if (!(el instanceof HTMLElement)) {
    el = document.createElement('p');
    el.id = FORM_ERROR_ID;
    el.className = 'calc-form-error';
    el.setAttribute('role', 'alert');
    form.prepend(el);
  }

  el.textContent = message;
  el.removeAttribute('hidden');
}

export function clampToRange(value: string, range: HTMLInputElement): string {
  const num = Number(value);
  if (!Number.isFinite(num)) return value;

  const min = Number(range.min);
  const max = Number(range.max);

  if (Number.isFinite(min) && num < min) return String(min);
  if (Number.isFinite(max) && num > max) return String(max);
  return value;
}

export function bindRange(
  input: HTMLInputElement,
  range: HTMLInputElement,
  onChange: () => void,
): void {
  input.addEventListener('input', () => {
    range.value = clampToRange(input.value, range);
    onChange();
  });
  range.addEventListener('input', () => {
    input.value = range.value;
    onChange();
  });
}
