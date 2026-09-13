const amount = document.querySelector('[aria-label="USDT amount"]');
const slider = document.querySelector('[aria-label="USDT amount slider"]');
const output = document.getElementById('inr-output');
const buttons = Array.from(document.querySelectorAll('[data-rate]'));
let rate = 108.12;
function update(source) {
  const raw = Number(source.value);
  const value = Number.isFinite(raw) ? Math.min(50000, Math.max(0, raw)) : 0;
  if (source !== amount) amount.value = String(value);
  if (source !== slider) slider.value = String(value);
  output.textContent = '₹' + (value * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 });
}
amount.addEventListener('input', () => update(amount));
slider.addEventListener('input', () => update(slider));
buttons.forEach(button => button.addEventListener('click', () => {
  rate = Number(button.dataset.rate);
  buttons.forEach(item => {
    item.setAttribute('aria-pressed', String(item === button));
    item.classList.toggle('seo-rate-active', item === button);
  });
  update(amount);
}));
update(amount);
