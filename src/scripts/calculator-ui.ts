export function bindCalculatorForm(
  formId: string,
  onCalculate: (form: HTMLFormElement) => void,
): void {
  const form = document.getElementById(formId);
  if (!(form instanceof HTMLFormElement)) return;

  const run = () => onCalculate(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run();
  });

  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('input', run);
    field.addEventListener('change', run);
  });

  run();
}

export function setText(id: string, value: string): void {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

export function setResultsVisible(panelId: string, visible: boolean): void {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.hidden = !visible;
  panel.setAttribute('aria-live', visible ? 'polite' : 'off');
  if (visible) {
    panel.classList.add('animate-in');
  }
}
