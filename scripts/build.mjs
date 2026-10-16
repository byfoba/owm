import { mkdir, writeFile, readFile, copyFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { site, pages, questions, risk, costs } from './content.mjs';
import { articles } from './articles.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url = (slug) => `${site.origin}/${slug ? `${slug}/` : ''}`;
const whatsapp = (context) => `https://wa.me/${site.phone}?text=${encodeURIComponent(context === 'balanz' ? 'Hola Ezequiel, estoy evaluando abrir una cuenta en Balanz y quisiera consultar cómo funciona el asesoramiento.' : 'Hola Ezequiel, vi tu web y me gustaría conocer cómo funciona tu servicio de asesoramiento financiero.')}`;
const contact = (context, placement = 'content', label = 'Consultar por WhatsApp', classes = 'btn') => `<a class="${classes}" href="${esc(whatsapp(context))}" target="_blank" rel="noopener noreferrer" data-event="click_whatsapp" data-placement="${placement}">${label}</a>`;
const instagramIcon = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>';
const navLinks = [
  ['asesoramiento-financiero', 'Servicios'], ['como-trabajo', 'Cómo trabajo'],
  ['invertir-con-balanz', 'Balanz'], ['recursos', 'Recursos'], ['sobre-ezequiel-ortega', 'Sobre mí'],
];
function nav(page) {
  const links = navLinks.map(([slug, label]) => `<a class="text-sm font-medium text-gray-700 hover:text-brand-700" href="/${slug}/"${page.slug === slug || (slug === 'recursos' && page.type === 'Article') ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a href="#contenido" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-4">Saltar al contenido</a>
  <header class="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm"><div class="wrap flex items-center justify-between gap-4 py-4">
    <a class="flex items-center gap-2 font-semibold text-gray-900" href="/" aria-label="Ezequiel Ortega, inicio"><span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-sm text-white" aria-hidden="true">EO</span><span>Ezequiel Ortega</span></a>
    <nav aria-label="Navegación principal" class="hidden items-center gap-6 lg:flex">${links}<a class="btn text-sm" href="/contacto/">Consultar</a></nav>
    <button hidden class="rounded-lg border border-gray-200 px-3 py-2 lg:!hidden" aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menú">Menú</button>
  </div><nav id="mobile-menu" aria-label="Navegación móvil" class="wrap border-t border-gray-100 pb-5 lg:hidden"><div class="flex flex-col items-start gap-5 pt-5">${links}<a class="btn text-sm" href="/contacto/">Consultar</a></div></nav></header>`;
}
function footer(page) {
  return `<footer class="bg-gray-900 pb-24 pt-14 text-white"><div class="wrap">
    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div><a href="/" class="text-lg font-semibold">Ezequiel Ortega</a><p class="mt-4 text-sm leading-relaxed text-gray-300">Asesoramiento financiero e inversiones en Argentina. Matrícula CNV N.º 2299.</p></div>
      <div><h2 class="mb-4 font-semibold">Asesoramiento</h2><ul class="space-y-3 text-sm"><li><a class="footer-link" href="/asesoramiento-financiero/">Servicios</a></li><li><a class="footer-link" href="/como-trabajo/">Cómo trabajo</a></li><li><a class="footer-link" href="/invertir-con-balanz/">Invertir con Balanz</a></li><li><a class="footer-link" href="/preguntas-frecuentes/">Preguntas frecuentes</a></li></ul></div>
      <div><h2 class="mb-4 font-semibold">Información</h2><ul class="space-y-3 text-sm"><li><a class="footer-link" href="/recursos/">Guías educativas</a></li><li><a class="footer-link" href="/sobre-ezequiel-ortega/">Perfil profesional</a></li><li><a class="footer-link" href="/informacion-profesional/">Información regulatoria</a></li><li><a class="footer-link" href="/privacidad/">Privacidad y uso del sitio</a></li></ul></div>
      <div><h2 class="mb-4 font-semibold">Contacto</h2><ul class="space-y-3 text-sm"><li><a class="footer-link break-all" href="mailto:${site.email}" data-event="click_email" data-placement="footer">${site.email}</a></li><li>${contact(page.context, 'footer', 'WhatsApp', 'footer-link')}</li><li><a class="footer-link inline-flex items-center gap-2" href="${site.instagram}" target="_blank" rel="noopener noreferrer" data-event="click_instagram" data-placement="footer">${instagramIcon}<span>Instagram<span class="sr-only"> de Ezequiel Ortega (abre en otra pestaña)</span></span></a></li></ul></div>
    </div>
    <div class="mt-10 space-y-4 border-t border-gray-700 pt-7 text-sm leading-relaxed text-gray-300"><p>${risk}</p><p>© ${new Date().getUTCFullYear()} Ezequiel Ortega. Todos los derechos reservados.</p></div>
  </div></footer>
  ${contact(page.context, 'floating', '<img src="/assets/whatsapp.svg" alt="" aria-hidden="true" width="28" height="28" class="h-7 w-7 shrink-0"/> WhatsApp', 'fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-900')}`;
}
const cards = [
  ['01', 'Empezar a invertir', 'Definir objetivos, plazos y necesidades de liquidez antes de elegir instrumentos.'],
  ['02', 'Revisar tu cartera', 'Evaluar diversificación, concentración y la relación entre tus inversiones y tu perfil.'],
  ['03', 'Planificar decisiones', 'Comprender alternativas, riesgos y condiciones para decidir con información.'],
];
function faq(items) {
  return `<div class="divide-y divide-gray-200">${items.map(([q, a]) => `<details class="group py-5"><summary class="cursor-pointer pr-3 text-lg font-semibold text-gray-900">${q}</summary><div class="copy mt-4 max-w-3xl"><p>${a}</p>${q === '¿Invertir tiene otros costos?' ? `<a href="${site.fees}" target="_blank" rel="noopener noreferrer">Ver tarifario oficial de Balanz →</a>` : ''}</div></details>`).join('')}</div>`;
}
function home(page) {
  return `<section class="bg-gradient-to-br from-gray-50 to-brand-50 py-16 lg:py-24"><div class="wrap grid items-center gap-12 lg:grid-cols-2">
    <div><p class="eyebrow">Ezequiel Ortega · Inversiones</p><h1 class="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">${page.heading}</h1>
      <p class="mt-6 text-xl leading-relaxed">Te acompaño a evaluar alternativas de inversión según tus objetivos, tus plazos y tu perfil de riesgo, con atención personalizada y acceso al mercado de capitales a través de Balanz.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">${contact('home', 'hero')}<a class="btn btn-outline" href="/como-trabajo/">Conocer cómo trabajo</a></div>
      <p class="mt-6 text-sm">Matrícula CNV N.º 2299 · <a class="font-medium text-brand-800 underline underline-offset-4" href="/informacion-profesional/">Información profesional</a></p>
      <p class="mt-4 text-sm leading-relaxed text-gray-600">Toda inversión implica riesgos. El asesoramiento no garantiza resultados.</p>
    </div>
    <figure class="overflow-hidden rounded-2xl bg-gray-200 shadow-xl"><img class="aspect-[4/3] w-full object-cover" src="/images/ezequiel-picture.jpeg" alt="Ezequiel Ortega, asesor financiero" width="1600" height="1200" fetchpriority="high" decoding="async"/><figcaption class="bg-white px-6 py-4 text-sm">Ezequiel Ortega · Asesoramiento financiero personalizado</figcaption></figure>
  </div></section>
  <section class="border-y border-brand-100 bg-brand-50 py-5"><div class="wrap text-center text-sm leading-relaxed text-brand-900"><strong>Tu cuenta comitente en Balanz, sin costo de apertura ni mantenimiento.</strong> El asesoramiento no tiene un costo adicional para vos.</div></section>
  <section id="servicios" class="py-20"><div class="wrap"><p class="eyebrow">Tus objetivos primero</p><h2 class="heading">Una mirada personal sobre tus inversiones</h2><p class="mt-5 max-w-2xl text-lg leading-relaxed">Para quienes buscan empezar a invertir o entender si su cartera actual sigue acompañando sus necesidades.</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">${cards.map(([n, title, text]) => `<div class="card"><span class="text-sm font-bold text-brand-700">${n}</span><h3 class="mb-4 mt-5 text-xl font-semibold text-gray-900">${title}</h3><p class="leading-relaxed">${text}</p></div>`).join('')}</div><a class="mt-8 inline-block font-semibold text-brand-800 underline underline-offset-4" href="/asesoramiento-financiero/">Conocer el alcance del asesoramiento →</a>
  </div></section>
  <section id="experiencia" class="bg-gradient-to-br from-brand-700 to-purple-800 py-20 text-white"><div class="wrap grid items-start gap-10 lg:grid-cols-2"><div><p class="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-100">Sobre mí</p><h2 class="text-3xl font-bold md:text-4xl">Soy Ezequiel Ortega</h2><p class="mt-6 text-lg leading-relaxed">Acompaño decisiones de inversión con una conversación directa sobre lo que querés lograr y el riesgo que podés asumir.</p><a class="btn btn-light mt-7" href="/sobre-ezequiel-ortega/">Conocer mi perfil</a></div><div class="rounded-2xl border border-white/30 bg-white/10 p-8"><h3 class="text-xl font-semibold">Información que podés consultar</h3><p class="mt-4 leading-relaxed">Matrícula CNV N.º 2299. Los registros del asesor y de Balanz corresponden a inscripciones distintas.</p><p class="mt-4 leading-relaxed">Consultá los registros oficiales y el alcance del servicio antes de comenzar.</p><a class="mt-6 inline-block font-semibold text-white underline underline-offset-4" href="/informacion-profesional/">Ver información profesional y fuentes →</a></div></div></section>
  <section id="como-trabajo" class="bg-gray-50 py-20"><div class="wrap"><p class="eyebrow">Un proceso claro</p><h2 class="heading">Primero entender. Después invertir.</h2><ol class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${[
    ['Conversamos', 'Qué querés resolver y qué esperás del asesoramiento.'],
    ['Definimos el perfil', 'Objetivos, horizonte y disponibilidad del dinero.'],
    ['Evaluamos alternativas', 'Riesgos, diversificación y condiciones de cada instrumento.'],
    ['Revisamos', 'Seguimiento con el alcance acordado al comenzar.'],
  ].map(([title, text], i) => `<li class="card"><p class="mb-4 text-sm font-semibold text-brand-700">Paso ${i + 1}</p><h3 class="mb-3 text-lg font-bold text-gray-900">${title}</h3><p class="leading-relaxed">${text}</p></li>`).join('')}</ol><a class="mt-8 inline-block font-semibold text-brand-800 underline underline-offset-4" href="/como-trabajo/">Ver el proceso completo →</a></div></section>
  <section class="py-20"><div class="wrap grid items-center gap-10 lg:grid-cols-2"><img class="aspect-[3/2] w-full rounded-2xl object-cover" src="/images/oficinas_balanz.jpg" width="1500" height="1000" loading="lazy" decoding="async" alt="Oficinas de Balanz Capital Valores"/><div><p class="eyebrow">Cuenta de inversión</p><h2 class="heading">Invertir con Balanz y acompañamiento personal</h2><p class="mt-5 text-lg leading-relaxed">Conocé cómo iniciar la apertura de una cuenta a tu nombre, el rol del intermediario y las condiciones que conviene revisar antes de operar.</p><a class="btn mt-7" href="/invertir-con-balanz/">Conocer la cuenta en Balanz</a></div></div></section>
  <section id="preguntas-frecuentes" class="border-t border-gray-100 bg-gray-50 py-20"><div class="wrap max-w-4xl"><p class="eyebrow">Antes de empezar</p><h2 class="heading mb-8">Preguntas frecuentes</h2>${faq(questions.slice(1, 6))}<a class="mt-8 inline-block font-semibold text-brand-800 underline underline-offset-4" href="/preguntas-frecuentes/">Ver todas las preguntas →</a></div></section>
  <section class="py-20"><div class="wrap"><p class="eyebrow">Para leer con calma</p><h2 class="heading">Guías para preparar tus decisiones</h2><div class="mt-10 grid gap-6 md:grid-cols-3">${resourceCards(articles.slice(0, 3), 3)}</div><a class="mt-8 inline-block font-semibold text-brand-800 underline underline-offset-4" href="/recursos/">Explorar las cinco guías →</a></div></section>
  ${contactBlock(page)}`;
}
function contactBlock(page) {
  return `<section id="contacto" class="bg-brand-700 py-16 text-white"><div class="wrap text-center"><h2 class="text-3xl font-bold md:text-4xl">Conversemos sobre tus objetivos</h2><p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed">Si querés empezar a invertir o revisar tu cartera, podés consultar cómo funciona el asesoramiento.</p><div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">${contact(page.context, 'closing', 'Consultar por WhatsApp', 'btn btn-light')}<a class="btn border border-white/50 bg-transparent hover:bg-brand-800" href="mailto:${site.email}" data-event="click_email" data-placement="closing">Escribir por correo</a></div></div></section>`;
}
function accountLinks() {
  return `<section class="card copy mt-8"><h2>Iniciar la apertura en Balanz</h2><p>${costs}</p><div class="flex flex-col items-start gap-4"><a class="btn !text-white !no-underline" href="${esc(site.resident)}" target="_blank" rel="noopener noreferrer" data-event="click_open_account" data-placement="resident">Abrir cuenta: residentes argentinos ↗</a><a class="font-semibold" href="${esc(site.nonresident)}" target="_blank" rel="noopener noreferrer" data-event="click_open_account" data-placement="nonresident">Apertura para no residentes ↗</a></div><p class="mb-0 mt-5 text-sm">Se abre el sitio de Balanz. La admisión y la documentación requerida dependen del intermediario.</p></section>`;
}
function inner(page) {
  return `<section class="border-b border-brand-100 bg-brand-50 py-14 md:py-20"><div class="wrap max-w-4xl"><nav class="mb-6 text-sm" aria-label="Ruta de navegación"><a class="text-brand-800 underline underline-offset-4" href="/">Inicio</a><span aria-hidden="true"> / </span><span>${page.heading}</span></nav><h1 class="heading">${page.heading}</h1><p class="mt-6 text-xl leading-relaxed">${page.intro}</p></div></section>
  <div class="wrap max-w-4xl py-14"><div class="space-y-10">${page.sections.map(([heading, html]) => `<section class="copy"><h2>${heading}</h2>${html}</section>`).join('')}</div>${page.context === 'balanz' ? accountLinks() : ''}</div>${page.context !== 'privacidad' ? contactBlock(page) : ''}`;
}
function resourceCards(items, headingLevel = 2) {
  return items.map(a => `<a class="card block transition-colors hover:border-brand-200" href="/${a.slug}/"><p class="eyebrow">${esc(a.topic)}</p><h${headingLevel} class="mb-4 text-xl font-bold leading-snug text-gray-900">${esc(a.heading)}</h${headingLevel}><p class="leading-relaxed text-gray-600">${esc(a.description)}</p><span class="mt-6 inline-block font-semibold text-brand-800">Leer guía →</span></a>`).join('');
}
function resourceHub(page) {
  return `<section class="border-b border-brand-100 bg-brand-50 py-16"><div class="wrap max-w-4xl"><p class="eyebrow">Recursos educativos</p><h1 class="heading">${esc(page.heading)}</h1><p class="mt-6 text-xl leading-relaxed">${esc(page.intro)}</p></div></section><div class="wrap py-14"><div class="grid gap-6 md:grid-cols-2">${resourceCards(articles)}</div><p class="mt-10 max-w-3xl text-sm leading-relaxed">${risk}</p></div>${contactBlock(page)}`;
}
function article(page) {
  const date = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date(`${page.updatedAt}T12:00:00-03:00`));
  const related = page.related.map(slug => articles.find(a => a.slug === slug));
  return `<article><header class="border-b border-brand-100 bg-brand-50 py-14 md:py-20"><div class="wrap max-w-4xl"><nav class="mb-7 text-sm" aria-label="Ruta de navegación"><a class="text-brand-800 underline underline-offset-4" href="/">Inicio</a><span aria-hidden="true"> / </span><a class="text-brand-800 underline underline-offset-4" href="/recursos/">Recursos</a></nav><p class="eyebrow">${esc(page.topic)}</p><h1 class="heading">${esc(page.heading)}</h1><p class="mt-6 text-xl leading-relaxed">${esc(page.intro)}</p><p class="mt-6 text-sm text-gray-600">Guía educativa · Actualizada el <time datetime="${page.updatedAt}">${date}</time></p></div></header>
  <div class="wrap max-w-4xl py-12"><nav aria-label="En esta guía" class="mb-12 rounded-2xl border border-gray-200 bg-gray-50 p-6"><h2 class="mb-4 font-semibold text-gray-900">En esta guía</h2><ol class="space-y-3">${page.sections.map(([heading], i) => `<li><a class="font-medium text-brand-800 underline underline-offset-4" href="#seccion-${i + 1}">${esc(heading)}</a></li>`).join('')}</ol></nav><div class="space-y-12">${page.sections.map(([heading, html], i) => `<section class="copy" id="seccion-${i + 1}"><h2>${esc(heading)}</h2>${html}</section>`).join('')}</div>
  <section class="copy mt-12 border-t border-gray-200 pt-8"><h2>Fuentes y actualización</h2><p>Fuentes consultadas el ${date}. Las condiciones y los registros pueden cambiar; revisá la referencia oficial antes de tomar una decisión.</p><ul>${page.sources.map(([label, href]) => `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join('')}</ul>${page.sourceNote ? `<p>${esc(page.sourceNote)}</p>` : ''}<p class="text-sm">${risk}</p></section></div></article>
  <section class="bg-gray-50 py-14"><div class="wrap"><h2 class="heading mb-8">Seguí leyendo</h2><div class="grid gap-6 md:grid-cols-2">${resourceCards(related, 3)}</div></div></section>${contactBlock(page)}`;
}
function render(page) {
  const canonical = url(page.slug);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': `${site.origin}/#ezequiel`, name: site.name, url: `${site.origin}/sobre-ezequiel-ortega/`, image: `${site.origin}/images/ezequiel-picture.jpeg`, description: 'Asesoramiento financiero e inversiones en Argentina.', sameAs: [site.instagram] },
      { '@type': 'WebSite', '@id': `${site.origin}/#website`, url: `${site.origin}/`, name: `${site.name} | Asesoramiento financiero`, inLanguage: 'es-AR', publisher: { '@id': `${site.origin}/#ezequiel` } },
      { '@type': page.type === 'Article' ? 'WebPage' : page.type, '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, inLanguage: 'es-AR', isPartOf: { '@id': `${site.origin}/#website` }, ...(page.type === 'AboutPage' ? { mainEntity: { '@id': `${site.origin}/#ezequiel` } } : {}), ...(page.type === 'Article' ? { mainEntity: { '@id': `${canonical}#article` } } : {}) },
      ...(page.type === 'Article' ? [{ '@type': 'Article', '@id': `${canonical}#article`, headline: page.heading, description: page.description, url: canonical, inLanguage: 'es-AR', dateModified: page.updatedAt, mainEntityOfPage: { '@id': `${canonical}#webpage` }, publisher: { '@id': `${site.origin}/#ezequiel` }, citation: page.sources.map(([, href]) => href) }] : []),
      ...(page.slug.startsWith('recursos') ? [{ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site.origin}/` }, { '@type': 'ListItem', position: 2, name: 'Recursos', item: `${site.origin}/recursos/` }, ...(page.type === 'Article' ? [{ '@type': 'ListItem', position: 3, name: page.heading, item: canonical }] : [])] }] : []),
    ],
  };
  return `<!doctype html>
<!-- Generado por scripts/build.mjs. Editar scripts/content.mjs y la plantilla. -->
<html lang="es-AR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"/>
<link rel="canonical" href="${canonical}"/><meta name="robots" content="index,follow"/>
<link rel="icon" href="/images/favicon-32x32.png" type="image/png"/><link rel="stylesheet" href="/assets/site.css"/>
<meta property="og:type" content="${page.type === 'Article' ? 'article' : 'website'}"/><meta property="og:locale" content="es_AR"/><meta property="og:site_name" content="Ezequiel Ortega"/>
<meta property="og:title" content="${esc(page.title)}"/><meta property="og:description" content="${esc(page.description)}"/><meta property="og:url" content="${canonical}"/>
<meta property="og:image" content="${site.origin}/images/ezequiel-picture.jpeg"/><meta property="og:image:width" content="1600"/><meta property="og:image:height" content="1200"/><meta property="og:image:alt" content="Ezequiel Ortega, asesor financiero"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(page.title)}"/><meta name="twitter:description" content="${esc(page.description)}"/><meta name="twitter:image" content="${site.origin}/images/ezequiel-picture.jpeg"/><meta name="twitter:image:alt" content="Ezequiel Ortega, asesor financiero"/>
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script><script src="/assets/site.js" defer></script>
</head><body data-page="${page.slug || page.context}">${nav(page)}<main id="contenido">${page.type === 'Article' ? article(page) : page.context === 'recursos' ? resourceHub(page) : page.slug ? inner(page) : home(page)}</main>${footer(page)}</body></html>\n`;
}

for (const page of pages) {
  const folder = path.join(root, page.slug);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), render(page));
}
await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${url(p.slug)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(root, '.nojekyll'), '');
const css = spawnSync(process.execPath, [path.join(root, 'node_modules/tailwindcss/lib/cli.js'), '-c', 'tailwind.site.config.cjs', '-i', 'assets/input.css', '-o', 'assets/site.css', '--minify'], { cwd: root, stdio: 'inherit' });
if (css.status !== 0) process.exit(css.status || 1);
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });
for (const page of pages) {
  await mkdir(path.join(dist, page.slug), { recursive: true });
  await copyFile(path.join(root, page.slug, 'index.html'), path.join(dist, page.slug, 'index.html'));
}
for (const filename of ['robots.txt', 'sitemap.xml', 'CNAME', '.nojekyll']) await copyFile(path.join(root, filename), path.join(dist, filename));
await mkdir(path.join(dist, 'assets'), { recursive: true });
for (const filename of ['site.css', 'site.js', 'whatsapp.svg']) await copyFile(path.join(root, 'assets', filename), path.join(dist, 'assets', filename));
await cp(path.join(root, 'images'), path.join(dist, 'images'), { recursive: true });
console.log(`Built ${pages.length} static pages for ${site.origin}. Output: dist/ (also compatible with publishing repository root).`);
