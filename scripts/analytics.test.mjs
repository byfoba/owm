import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const code = await readFile(new URL('../assets/analytics.js', import.meta.url), 'utf8');
const id = 'G-DPKDSMXB34';
const origin = 'https://inversiones.ortega.id';

// In-memory JS harness: no browser, Google script or network request is run.
function run({ saved, local = false, blockedStorage = false } = {}) {
  const scripts = [];
  const writes = [];
  const storage = new Map();
  const handlers = new Map();
  let reloads = 0;
  const key = 'ortega.analytics.consent.v1';
  if (saved) storage.set(key, JSON.stringify(saved));
  function button(dataset = {}) {
    return { dataset, hidden: true, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; }, focus() {} };
  }
  const accept = button({ consentChoice: 'granted' });
  const reject = button({ consentChoice: 'denied' });
  const preferences = button();
  const banner = { hidden: true };
  const document = {
    body: { dataset: { analyticsId: id, siteOrigin: origin, page: 'recursos/como-elegir-asesor-financiero' } },
    referrer: 'https://search.example/private?email=private@example.com',
    getElementById: () => banner,
    querySelector(selector) { return selector.startsWith('link') ? { href: `${origin}/recursos/como-elegir-asesor-financiero/` } : reject; },
    querySelectorAll(selector) { return selector === '[data-consent-choice]' ? [reject, accept] : [preferences]; },
    createElement: () => ({}),
    head: { appendChild(script) { scripts.push(script); } },
    addEventListener(type, fn) { handlers.set(type, fn); },
  };
  Object.defineProperty(document, 'cookie', {
    get: () => '_ga=123; _ga_DPKDSMXB34=456; unrelated=keep',
    set: (value) => writes.push(value),
  });
  const window = {
    location: { origin: local ? 'http://127.0.0.1:8080' : origin, reload() { reloads++; } },
    localStorage: {
      getItem(k) { if (blockedStorage) throw new Error('blocked'); return storage.get(k) || null; },
      setItem(k, v) { if (blockedStorage) throw new Error('blocked'); storage.set(k, v); },
    },
  };
  vm.runInNewContext(code, { window, document, URL, Date });
  return {
    window, banner, scripts, writes, storage,
    accept: () => accept.listeners.click(), reject: () => reject.listeners.click(), open: () => preferences.listeners.click(),
    interaction: (detail) => handlers.get('ortega:interaction')({ detail }),
    commands: () => JSON.parse(JSON.stringify((window.dataLayer || []).map(a => Array.from(a)))),
    get reloads() { return reloads; },
  };
}

test('No Google script or events before consent, after rejection, or from a preview', () => {
  const page = run();
  assert.equal(page.banner.hidden, false);
  page.interaction({ event: 'click_whatsapp', placement: 'hero' });
  assert.equal(page.scripts.length, 0);
  assert.deepEqual(page.commands(), []);
  page.reject();
  assert.equal(page.banner.hidden, true);
  assert.equal(page.scripts.length, 0);
  const preview = run({ local: true });
  preview.accept();
  assert.equal(preview.scripts.length, 0);
});

test('Acceptance loads one tag and sends exactly one page view with advertising denied', () => {
  const page = run();
  page.accept(); page.accept();
  assert.equal(page.scripts.length, 1);
  assert.equal(page.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${id}`);
  const commands = page.commands();
  assert.equal(commands.filter(x => x[0] === 'event' && x[1] === 'page_view').length, 1);
  const defaults = commands.find(x => x[0] === 'consent' && x[1] === 'default')[2];
  assert.equal(defaults.ad_storage, 'denied');
  assert.equal(defaults.ad_user_data, 'denied');
  assert.equal(defaults.ad_personalization, 'denied');
  const config = commands.find(x => x[0] === 'config')[2];
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.send_page_view, false);
  assert.equal(config.page_referrer, 'https://search.example');
  assert.ok(!config.page_location.includes('?'));
});

test('Click events discard link URLs, contact details and arbitrary parameters', () => {
  const page = run();
  page.accept();
  page.interaction({ event: 'click_open_account', placement: 'resident', href: 'https://balanz.com/?reference=private@example.com', email: 'private@example.com', phone: 'secret' });
  const event = page.commands().find(x => x[0] === 'event' && x[1] === 'click_open_account');
  assert.deepEqual(event[2], { send_to: id, page: 'recursos/como-elegir-asesor-financiero', placement: 'resident' });
  assert.ok(!JSON.stringify(event).includes('private'));
  const count = page.commands().length;
  page.interaction({ event: 'arbitrary', placement: 'hero' });
  assert.equal(page.commands().length, count);
});

test('Revoking consent disables tracking, clears host analytics cookies and reloads', () => {
  const page = run();
  page.accept(); page.open();
  assert.equal(page.banner.hidden, false);
  page.reject();
  assert.equal(page.window[`ga-disable-${id}`], true);
  assert.equal(page.reloads, 1);
  assert.equal(page.writes.length, 2);
  assert.ok(page.writes.every(x => !x.includes('unrelated') && x.includes('Max-Age=0')));
  const count = page.commands().length;
  page.interaction({ event: 'click_whatsapp', placement: 'floating' });
  assert.equal(page.commands().length, count);
});

test('Stored decisions, expiration and unavailable storage fail safely', () => {
  const granted = run({ saved: { choice: 'granted', expires: Date.now() + 60000 } });
  assert.equal(granted.scripts.length, 1);
  assert.equal(granted.banner.hidden, true);
  const denied = run({ saved: { choice: 'denied', expires: Date.now() + 60000 } });
  assert.equal(denied.scripts.length, 0);
  assert.equal(denied.banner.hidden, true);
  const expired = run({ saved: { choice: 'granted', expires: 1 } });
  assert.equal(expired.scripts.length, 0);
  assert.equal(expired.banner.hidden, false);
  const blocked = run({ blockedStorage: true });
  assert.equal(blocked.scripts.length, 0);
  blocked.accept();
  assert.equal(blocked.scripts.length, 1);
});
