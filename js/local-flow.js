import { clearLegacyCredentials } from './privacy.js';

document.addEventListener('DOMContentLoaded', () => {
  clearLegacyCredentials();
  const sessionKey = 'toppay_demo_session_v1';
  if (sessionStorage.getItem(sessionKey) === 'active') {
    window.location.replace('./home.html');
    return;
  }
  const form = document.getElementById('loginForm');
  const mobile = document.getElementById('mobile');
  const password = document.getElementById('password');
  const overlay = document.getElementById('mpinOverlay');
  const digitBoxes = [...document.querySelectorAll('.mpin-digit')];
  let digitCount = 0;
  let completed = false;
  mobile.addEventListener('input', () => {
    mobile.value = mobile.value.replace(/\D/g, '');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Local screen preview only: no authentication, network calls or personal data retention.
    mobile.value = '';
    password.value = '';
    digitCount = 0;
    renderDigits();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
  document.querySelectorAll('[data-key]').forEach((button) => {
    button.addEventListener('click', () => {
      if (completed || digitCount >= 6) return;
      // Count taps only. Never read or assemble the entered digit values.
      digitCount += 1;
      renderDigits();
      if (digitCount === 6) {
        completed = true;
        digitCount = 0;
        sessionStorage.setItem(sessionKey, 'active');
        window.location.assign('./home.html');
      }
    });
  });
  document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    digitCount = Math.max(0, digitCount - 1);
    renderDigits();
  });
  window.addEventListener('pagehide', () => {
    mobile.value = '';
    password.value = '';
    digitCount = 0;
  });
  function renderDigits() {
    digitBoxes.forEach((box, index) => {
      box.classList.toggle('filled', index < digitCount);
      box.classList.toggle('active', index === Math.min(digitCount, 5));
    });
  }
  if (window.lucide) window.lucide.createIcons();
});
