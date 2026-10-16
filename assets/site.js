const toggle = document.querySelector('[aria-controls="mobile-menu"]');
const menu = document.getElementById('mobile-menu');
function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
if (toggle && menu) {
  // Links remain available if JavaScript is disabled.
  toggle.hidden = false;
  setMenu(false);
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
}

// Only event type, page identifier and placement; never the link or message.
// analytics.js forwards these events only after consent.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-event]');
  if (!link) return;
  const detail = {
    event: link.dataset.event,
    page: document.body.dataset.page,
    placement: link.dataset.placement || 'content',
  };
  document.dispatchEvent(new CustomEvent('ortega:interaction', { detail }));
});
