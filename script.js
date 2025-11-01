document.getElementById('year').textContent = new Date().getFullYear().toString();

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const sendBtn = document.getElementById('send-btn');

sendBtn?.addEventListener('click', () => {
  feedback.textContent = 'Mensagem enviada! (demo) — Integraremos com seu e-mail/WhatsApp depois.';
});
