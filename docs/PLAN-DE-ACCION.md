# Implementación de la auditoría 2026–2027

Fecha de trabajo: 16/10/2026. Fuente: Auditoria_Ortega_2026.pdf aportado por el propietario (34 páginas). El documento se tomó como referencia estratégica. Los cambios se realizan dentro de los pedidos del propietario en la conversación.

## Segunda etapa: guías, registro profesional y validación

- Enforce HTTPS activado en GitHub Pages el 16/10/2026. Se verificó que HTTP ya termina en HTTPS, con respuesta final 200.
- Ficha individual consultada en CNV: ORTEGA EZEQUIEL JOSE, AP — Persona Humana, matrícula 2299. Se incorpora el enlace directo en perfil e información profesional. No se publican identificadores fiscales ni otros datos del registro que no sean necesarios.
- Cinco guías completas preparadas para publicación, con sección `/recursos/`, índices, fuentes primarias, fechas, enlaces relacionados y marcado Article/BreadcrumbList. Con la incorporación, el sitio pasa de nueve a quince URLs. Las guías no se atribuyen a un revisor inexistente ni incluyen experiencias inventadas.
- Los borradores iniciales de `docs/editorial/` se sustituyen por el contenido completo de `scripts/articles.mjs`.
- PageSpeed Insights del sitio actualmente publicado: 100 en las cuatro categorías de laboratorio en móvil y escritorio. Sin datos de experiencia real (CrUX). Resultados y límites documentados en `docs/VALIDACION-2026-10-16.md`. Las nuevas guías se validan localmente y en CI; el informe PSI es anterior a su publicación.
- Propietario verificando Search Console por DNS. GA4 y Bing pendientes de alta; instrucciones en `docs/MEDICION.md`. Falta el ID GA4 para activar la integración.

## Entregado en esta propuesta

- Portada con un único H1 comercial, propuesta centrada en objetivos y riesgos, consulta como CTA principal y proceso visible.
- Nueve páginas HTML indexables: inicio, perfil, asesoramiento, Balanz, proceso, preguntas frecuentes, información profesional, contacto y privacidad.
- Instagram con icono y texto accesible en todos los footers; perfil incluido en `Person.sameAs`.
- WhatsApp unificado en +54 9 11 2622-0548, con mensajes contextuales. El referido de Balanz se conserva exactamente como confirmó el propietario.
- Apertura/mantenimiento de cuenta y asesoramiento gratuitos. Las condiciones operativas se explican en FAQ y páginas de servicios, sin detallar el acuerdo comercial del asesor.
- Retiro de promesas de seguridad/rentabilidad, cifras comerciales, testimonios y credenciales académicas pendientes de evidencia. El historial de Git conserva los originales.
- Canonical, títulos y descripciones únicos, Open Graph, Twitter Cards, idioma es-AR, datos estructurados WebSite/Person/WebPage/AboutPage/ContactPage, sitemap y robots.
- CSS local compilado, imágenes con tamaño reservado, imagen principal prioritaria, imagen inferior diferida; menú con nombre accesible, estado expandido, Escape y navegación disponible sin JavaScript.
- Eventos locales preparados, sin instalar analítica ni transmitir datos. Los clics nunca se cuentan como clientes.
- Compilación y pruebas automatizadas sobre los archivos destinados a publicación.

## Decisiones y evidencia

| Dato | Evidencia y decisión |
| --- | --- |
| WhatsApp | Propietario confirma +54 9 11 2622-0548. Se elimina el número alternativo. |
| Referido Balanz | Propietario confirma `williamson.ez@protonmail.com`. No reemplazarlo por el correo de contacto. Un clic no prueba una apertura atribuida. |
| Matrícula 2299 | Propietario confirma vigencia. Ficha individual contrastada el 16/10/2026: AP — Persona Humana, matrícula 2299. [Ficha oficial](https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/DetallesRegistrosPublicos/105340?tipoEntidadId=2&tipoAgente=302). |
| Asesoramiento | Propietario confirma que no cobra al cliente un honorario adicional. No se publica el acuerdo interno de remuneración. |
| Cuenta gratuita | El tarifario oficial de Balanz confirma apertura y mantenimiento sin cargo. Se distingue de operar. |
| Yale/BYMA, clientes, capital y años | Sin evidencia individual aportada. Se retiran hasta contar con respaldo. |
| Dominio | Se conserva `inversiones.ortega.id`. Una migración necesita datos de GSC, enlaces, decisión de marca y control DNS. |
| No residentes | Se conserva el enlace existente; no se garantiza admisión ni requisitos. Confirmar con Balanz antes de desarrollar una landing específica. |
| Guías | Cinco textos completos integrados en el código para publicación mediante PR. Sin falsa atribución de autoría o revisión profesional. |
| Analítica | No hay identificador GA4, acceso GSC/Bing ni inventario comercial. Se preparan hooks sin inventar mediciones. |
| Privacidad | Página adaptada a esta versión estática y enlaces externos. Requiere revisión del responsable sobre tratamiento posterior de mensajes y obligaciones legales. |

Fuentes consultadas: [Balanz, aranceles y comisiones](https://balanz.com/comisiones/), [CNV, agentes](https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/Agentes). El registro de Balanz no acredita por sí solo el registro individual de Ezequiel.

## Comprobaciones iniciales del 16/10/2026, antes del primer merge

| Prueba | Producción actual | Propuesta local |
| --- | --- | --- |
| HTTPS inicio | 200, sin X-Robots-Tag | Inicio y página Balanz: 200 |
| robots.txt | 404 | Archivo generado; validación automatizada del contenido |
| sitemap.xml | 404 | Nueve URLs canónicas; validación automatizada |
| HTTP inicio | 200 sin redirigir a HTTPS | Requiere ajuste en hosting |
| GitHub Pages | `main`, ruta `/`, dominio actual | Archivos generados compatibles con la misma publicación |
| Enforce HTTPS | `https_enforced: false` según API de GitHub Pages | Activar al publicar y verificar redirección; no se modificó el hosting |
| URL inexistente local | No medida en producción | 404 |
| Escritorio | Sitio original consultado | Portada y footer inspeccionados en navegador |
| Móvil | Sin medición de campo | Vista de teléfono revisada; menú abre/cierra con Escape; sin desborde horizontal en portada |

Estas comprobaciones no equivalen a un rastreo completo ni a mediciones de Core Web Vitals. La falta de robots o sitemap no demuestra por sí sola que el sitio no esté indexado.

## Matriz del action plan

“Implementado” significa incluido y probado en la propuesta, no desplegado ni indexado.

| Acción | Estado | Próximo paso / responsable |
| --- | --- | --- |
| A01 Credenciales | Registro contrastado: AP — Persona Humana, matrícula 2299; ficha individual enlazada | Pendientes sólo alcance contractual, permisos y acreditaciones de formación para ampliaciones futuras. |
| A02 Promesas | Implementado | Mantener revisión del lenguaje en contenidos nuevos. |
| A03 Referidos | Parcial: enlaces confirmados y preservados | Ezequiel/Balanz: prueba autorizada de atribución real; no se abrió una cuenta de prueba. |
| A04 Estadísticas | Implementado: retiradas | Restituir sólo con definición, período y soporte. |
| A05 Testimonios | Implementado: retirados | Obtener consentimiento y documentación antes de republicar. |
| A06 Línea de base | Propietario verificando GSC; GA4/Bing sin alta confirmada | Completar las altas de docs/MEDICION.md. No existen datos históricos que se puedan fabricar. |
| A07 Costos | Implementado con fuente oficial y confirmación del propietario | Revisar el enlace y condiciones periódicamente. |
| A08 Hero | Implementado | Validar claridad y consultas reales tras publicar. |
| A09 SEO técnico | Base publicada, robots/sitemap 200; HTTPS forzado y validación de laboratorio realizada | Indexación en consolas y datos de campo pendientes. Nuevas guías listas en propuesta. |
| A10 Dominio | Se conserva el actual | Decisión posterior con tráfico, enlaces y disponibilidad; no se compran dominios. |
| A11 Perfil | Página publicada; ficha/categoría CNV integradas en esta etapa | Formación y experiencia adicional sólo con acreditaciones. |
| A12 Balanz | Implementado | Revisar alcance comercial y confirmar atribución con Balanz. |
| A13 Asesoramiento | Implementado | Confirmar que metodología y seguimiento describen el servicio real. |
| A14 Cinco guías | Implementadas en esta propuesta, con hub, fuentes y fechas | Publicar el PR; mejorar y actualizar con datos de consultas cuando estén disponibles. |
| A15 Metadata y Schema | Base publicada; Article/BreadcrumbList añadidos y probados para guías | Comprobar las nuevas URLs en producción tras el merge; no se promete rich result ni cita de IA. |
| A16 Privacidad | Parcial: texto ajustado al funcionamiento técnico actual | Responsable/jurídico: revisar recepción, conservación y ejercicio de derechos en sus canales. |
| A17 Medición | Hooks implementados; colector/CRM pendientes | Analista: configurar con consentimiento y política adecuados. |
| A18 Autoridad | Instagram enlazado; resto pendiente | Ezequiel: perfiles y colaboraciones auténticas, sin comprar enlaces. |
| A19 GEO/AEO | Protocolo del informe pendiente de ejecución | Analista: repetir preguntas con región, fecha, motor y enlaces citados; no fabricar resultados. |
| A20 SEO local | Pendiente de elegibilidad | Confirmar atención presencial real antes de crear perfiles. |
| A21 Expansión | Backlog condicionado a datos | Priorizar trimestralmente por consultas calificadas. |
| A22 Rendimiento | PSI móvil/escritorio realizado: laboratorio 100/100 en las cuatro categorías; CrUX sin datos | Seguimiento de campo cuando exista muestra; imágenes/cache como optimización menor pendiente. |

## Medición: integración preparada

El navegador emite `ortega:interaction` en `document` con `{ event, page, placement }`. Valores de evento: `click_whatsapp`, `click_email`, `click_open_account`, `click_instagram`. No incluye el href, texto del mensaje, email, teléfono, parámetros de referido, query string ni datos financieros.

Un futuro colector debe escuchar ese evento e integrarlo con el proveedor elegido. No activar un tracking de clicks salientes que envíe URLs con el correo de referido sin revisar la configuración de privacidad. Revisar política y requisitos aplicables antes de agregar proveedores o cookies. No se instala GA4 con un ID ficticio.

El registro comercial separado debe distinguir contacto efectivo, lead calificado, cuenta abierta y cliente activado. Esos estados se confirman en CRM o con datos autorizados del intermediario, nunca a partir de un clic. Puede usarse un ID interno y datos agregados para atribución, sin enviar información personal a la analítica.

## Verificación posterior a la publicación

1. Comprobar 200 en las nueve rutas, CSS/JS, imágenes, robots y sitemap. Una ruta inexistente debe devolver 404.
2. Confirmar HTTPS y redirección desde HTTP; revisar variantes www sólo si existen en DNS. La configuración del hosting queda fuera de los archivos del repositorio.
3. Inspeccionar canonical y HTML sin JavaScript; probar navegación y CTA en móvil y escritorio. Verificar que referido y teléfono no cambien en producción.
4. Enviar sitemap a GSC y Bing con acceso del propietario. Revisar exclusiones y consultas, sin asumir indexación inmediata.
5. Ejecutar PSI móvil/escritorio y revisar CrUX si hay muestra. Comparar LCP/INP/CLS en condiciones consistentes.
6. Confirmar la atribución de aperturas con Balanz y conciliar consultas reales. No enviar documentación real durante QA.

No se ejecutó migración, contratación, apertura de cuentas, cambio de perfiles externos ni modificación de propiedades GSC/Bing/GA4. Se activó únicamente Enforce HTTPS en GitHub Pages como ajuste de hosting de esta etapa.
