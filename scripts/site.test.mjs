import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages } from './content.mjs';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const read = (file) => readFile(path.join(root, file), 'utf8');
const decode = (value) => value.replaceAll('&amp;', '&');

test('Every indexable page has distinct metadata, one H1 and valid JSON-LD', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const page of pages) {
    const html = await read(path.join(page.slug, 'index.html'));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page.slug);
    assert.match(html, /<html lang="es-AR">/);
    const title = html.match(/<title>(.*?)<\/title>/s)[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    assert.ok(!descriptions.has(description), `Duplicate description: ${description}`);
    titles.add(title); descriptions.add(description);
    const canonical = `${site.origin}/${page.slug ? `${page.slug}/` : ''}`;
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`));
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@graph'].find(x => x['@id'] === `${canonical}#webpage`).url, canonical);
    assert.deepEqual(schema['@graph'].find(x => x['@type'] === 'Person').sameAs, [site.instagram]);
    assert.match(html, /<main id="contenido">/);
  }
});

test('Internal links, fragments, scripts, images and styles resolve in the deploy artifact', async () => {
  for (const page of pages) {
    const html = await read(path.join(page.slug, 'index.html'));
    for (const [, encoded] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = decode(encoded);
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const parsed = new URL(href, `${site.origin}/${page.slug ? `${page.slug}/` : ''}`);
      const filename = parsed.pathname.endsWith('/') ? `${parsed.pathname}index.html` : parsed.pathname;
      await access(path.join(root, filename));
      if (parsed.hash) {
        const target = await read(filename);
        assert.ok(target.includes(`id="${parsed.hash.slice(1)}"`), `${page.slug}: broken ${href}`);
      }
    }
    for (const img of html.matchAll(/<img\b[^>]*>/g)) {
      for (const attr of ['alt', 'width', 'height']) assert.ok(img[0].includes(`${attr}="`));
    }
  }
});

test('Instagram, confirmed WhatsApp and Balanz referral are preserved, with safe external links', async () => {
  for (const page of pages) {
    const html = await read(path.join(page.slug, 'index.html'));
    assert.ok(html.includes(`href="${site.instagram}"`));
    assert.match(html, /Instagram<span class="sr-only"> de Ezequiel Ortega/);
    const whatsappLinks = [...html.matchAll(/href="(https:\/\/wa.me\/[^\"]+)"/g)];
    assert.ok(whatsappLinks.length > 0);
    for (const [, href] of whatsappLinks) assert.equal(new URL(decode(href)).pathname, '/5491126220548');
    assert.ok(!html.includes('5491125002526'));
    for (const [, tag] of html.matchAll(/(<a\b[^>]*target="_blank"[^>]*>)/g)) assert.match(tag, /rel="noopener noreferrer"/);
  }
  const balanz = await read('invertir-con-balanz/index.html');
  for (const href of [site.resident, site.nonresident]) assert.ok(balanz.includes(href.replaceAll('&', '&amp;')));
  assert.match(balanz, /apertura y el mantenimiento.*completamente gratuitos/);
  assert.match(balanz, /no tiene un costo adicional/);
  assert.match(balanz, /href="https:\/\/balanz.com\/comisiones\/"/);
});

test('Unsupported claims and third party runtime dependencies are absent', async () => {
  for (const page of pages) {
    const html = await read(path.join(page.slug, 'index.html'));
    assert.doesNotMatch(html, /\+50|\+\$500M|\+25%|Universidad de Yale|certificado en la CNV|Independiente|segura y rentable|riesgos controlados|100% transparente/);
    assert.doesNotMatch(html, /<script[^>]+src="https?:/);
    assert.doesNotMatch(html, /<img[^>]+src="https?:/);
    assert.doesNotMatch(html, /googletagmanager|google-analytics|llms\.txt/);
  }
  const js = await read('assets/site.js');
  assert.match(js, /CustomEvent\('ortega:interaction'/);
  assert.doesNotMatch(js, /fetch\(|localStorage|sessionStorage|document\.cookie|sendBeacon|gtag\(/);
});

test('Sitemap matches the indexable pages and robots advertises it', async () => {
  const xml = await read('sitemap.xml');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]);
  assert.equal(new Set(urls).size, pages.length);
  assert.deepEqual(new Set(urls), new Set(pages.map(p => `${site.origin}/${p.slug ? `${p.slug}/` : ''}`)));
  const robots = await read('robots.txt');
  assert.match(robots, /User-agent: \*\nAllow: \/\n/);
  assert.ok(robots.includes(`Sitemap: ${site.origin}/sitemap.xml`));
  assert.equal((await read('CNAME')).trim(), 'inversiones.ortega.id');
  await access(path.join(root, '.nojekyll'));
});
