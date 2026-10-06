const assistant = document.querySelector('.ai-assistant');
const floatingButton = document.querySelector('.ai-floating-button');
const closeButton = document.querySelector('.ai-close-button');
const input = document.querySelector('.ai-input-area input');
const sendButton = document.querySelector('.ai-input-area button');
const suggestionButtons = document.querySelectorAll('.ai-suggestions button');
const navLinks = document.querySelectorAll('.nav-link');

function toggleAssistant(forceOpen) {
  if (!assistant) return;

  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : assistant.classList.contains('is-hidden');
  assistant.classList.toggle('is-hidden', !shouldOpen);
  floatingButton?.classList.toggle('is-hidden', shouldOpen);
}

floatingButton?.addEventListener('click', () => toggleAssistant(true));
closeButton?.addEventListener('click', () => toggleAssistant(false));

suggestionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!input) return;
    input.value = button.textContent.trim();
    input.focus();
  });
});

sendButton?.addEventListener('click', () => {
  if (!input || !assistant) return;

  const value = input.value.trim();
  if (!value) return;

  const content = assistant.querySelector('.ai-content');
  if (!content) return;

  const message = document.createElement('p');
  message.className = 'ai-message';
  message.textContent = value;
  content.appendChild(message);

  input.value = '';
  assistant.scrollTop = assistant.scrollHeight;
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

if (assistant) {
  assistant.classList.remove('is-hidden');
}
