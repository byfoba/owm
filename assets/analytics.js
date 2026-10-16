(() => {
  const id = document.body.dataset.analyticsId;
  const productionOrigin = document.body.dataset.siteOrigin;
  const enabled = /^G-[A-Z0-9]+$/.test(id || '') && window.location.origin === productionOrigin;
  const banner = document.getElementById('analytics-consent');
  if (!banner) return;

  const key = 'ortega.analytics.consent.v1';
  const duration = 180 * 24 * 60 * 60 * 1000;
  const events = new Set(['click_whatsapp', 'click_email', 'click_open_account', 'click_instagram']);
  const placements = new Set(['hero', 'content', 'footer', 'closing', 'floating', 'resident', 'nonresident']);
  let choice = null;
  let initialized = false;
  let pageViewSent = false;
  let returnFocus = null;

  try {
    const stored = JSON.parse(window.localStorage.getItem(key));
    if (stored && stored.expires > Date.now() && ['granted', 'denied'].includes(stored.choice)) choice = stored.choice;
  } catch { /* A blocked or invalid store does not grant consent. */ }

  function referrerOrigin() {
    try {
      const referrer = new URL(document.referrer);
      return ['https:', 'http:'].includes(referrer.protocol) ? referrer.origin : '';
    } catch { return ''; }
  }

  function start() {
    if (!enabled || choice !== 'granted') return;
    window[`ga-disable-${id}`] = false;
    if (!initialized) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      });
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('js', new Date());
      window.gtag('config', id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_domain: 'none',
        cookie_expires: duration / 1000,
        cookie_update: false,
        cookie_flags: 'SameSite=Lax;Secure',
        page_location: document.querySelector('link[rel="canonical"]').href,
        page_referrer: referrerOrigin(),
      });
      initialized = true;
      const script = document.createElement('script');
      script.async = true;
      script.referrerPolicy = 'origin';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
    if (!pageViewSent) {
      window.gtag('event', 'page_view', { send_to: id });
      pageViewSent = true;
    }
  }

  function clearAnalyticsCookies() {
    for (const entry of document.cookie.split(';')) {
      const name = entry.trim().split('=')[0];
      if (/^_ga(?:_|$)/.test(name)) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
    }
  }

  function choose(value) {
    choice = value;
    try { window.localStorage.setItem(key, JSON.stringify({ choice, expires: Date.now() + duration })); } catch { /* Keep the current page choice in memory. */ }
    banner.hidden = true;
    returnFocus?.focus();
    if (choice === 'granted') {
      start();
    } else {
      window[`ga-disable-${id}`] = true;
      clearAnalyticsCookies();
      // Unload an already started tag; do not switch to cookieless collection.
      if (initialized) window.location.reload();
    }
  }

  for (const button of document.querySelectorAll('[data-consent-choice]')) {
    button.addEventListener('click', () => choose(button.dataset.consentChoice));
  }
  for (const button of document.querySelectorAll('[data-open-consent]')) {
    button.hidden = false;
    button.addEventListener('click', () => {
      returnFocus = button;
      banner.hidden = false;
      document.querySelector('[data-consent-choice="denied"]').focus();
    });
  }

  document.addEventListener('ortega:interaction', ({ detail }) => {
    if (!enabled || choice !== 'granted' || !initialized || !events.has(detail?.event)) return;
    window.gtag('event', detail.event, {
      send_to: id,
      page: document.body.dataset.page,
      placement: placements.has(detail.placement) ? detail.placement : 'content',
    });
  });

  banner.hidden = choice !== null;
  if (choice === 'granted') start();
})();
