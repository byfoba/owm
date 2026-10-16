# Implementación de la auditoría 2026–2027

Fecha de trabajo: 16/10/2026. Fuente: Auditoria_Ortega_2026.pdf aportado por el propietario (34 páginas). El documento se tomó como referencia estratégica, no como autorización para contratar servicios, publicar datos privados o modificar cuentas externas.

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
| Matrícula 2299 | Propietario confirma vigencia. Se publica el número; no se declara haber verificado la ficha individual ni se inventa categoría o identificador de ficha. |
| Asesoramiento | Propietario confirma que no cobra al cliente un honorario adicional. No se publica el acuerdo interno de remuneración. |
| Cuenta gratuita | El tarifario oficial de Balanz confirma apertura y mantenimiento sin cargo. Se distingue de operar. |
| Yale/BYMA, clientes, capital y años | Sin evidencia individual aportada. Se retiran hasta contar con respaldo. |
| Dominio | Se conserva `inversiones.ortega.id`. Una migración necesita datos de GSC, enlaces, decisión de marca y control DNS. |
| No residentes | Se conserva el enlace existente; no se garantiza admisión ni requisitos. Confirmar con Balanz antes de desarrollar una landing específica. |
| Guías | Borradores en docs, sin falsa atribución de autoría/revisión ni publicación automática. |
| Analítica | No hay identificador GA4, acceso GSC/Bing ni inventario comercial. Se preparan hooks sin inventar mediciones. |
| Privacidad | Página adaptada a esta versión estática y enlaces externos. Requiere revisión del responsable sobre tratamiento posterior de mensajes y obligaciones legales. |

Fuentes consultadas: [Balanz, aranceles y comisiones](https://balanz.com/comisiones/), [CNV, agentes](https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/Agentes). El registro de Balanz no acredita por sí solo el registro individual de Ezequiel.

## Comprobaciones técnicas del 16/10/2026

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
| A01 Credenciales | Parcial: número y vigencia confirmados por propietario, enlaces oficiales | Ezequiel: categoría, ficha individual, relación exacta y permisos de marca. |
| A02 Promesas | Implementado | Mantener revisión del lenguaje en contenidos nuevos. |
| A03 Referidos | Parcial: enlaces confirmados y preservados | Ezequiel/Balanz: prueba autorizada de atribución real; no se abrió una cuenta de prueba. |
| A04 Estadísticas | Implementado: retiradas | Restituir sólo con definición, período y soporte. |
| A05 Testimonios | Implementado: retirados | Obtener consentimiento y documentación antes de republicar. |
| A06 Línea de base | Pendiente de datos | Analista/propietario: exportaciones GSC, Bing y GA4 de 3–6 meses, si existen; no compartir contraseñas. |
| A07 Costos | Implementado con fuente oficial y confirmación del propietario | Revisar el enlace y condiciones periódicamente. |
| A08 Hero | Implementado | Validar claridad y consultas reales tras publicar. |
| A09 SEO técnico | Implementado en código; validación pública pendiente de publicación | Verificar HTTP, redirecciones, indexación y rendimiento de campo. |
| A10 Dominio | Se conserva el actual | Decisión posterior con tráfico, enlaces y disponibilidad; no se compran dominios. |
| A11 Perfil | Parcial: página publicada en la propuesta | Completar formación/experiencia únicamente con acreditaciones. |
| A12 Balanz | Implementado | Revisar alcance comercial y confirmar atribución con Balanz. |
| A13 Asesoramiento | Implementado | Confirmar que metodología y seguimiento describen el servicio real. |
| A14 Cinco guías | Borradores preparados, no indexables | Ezequiel/editor: aportar experiencia y aprobar antes de publicar por etapas. |
| A15 Metadata y Schema | Implementado y probado | Validación remota tras publicar; sin promesa de rich results o citas de IA. |
| A16 Privacidad | Parcial: texto ajustado al funcionamiento técnico actual | Responsable/jurídico: revisar recepción, conservación y ejercicio de derechos en sus canales. |
| A17 Medición | Hooks implementados; colector/CRM pendientes | Analista: configurar con consentimiento y política adecuados. |
| A18 Autoridad | Instagram enlazado; resto pendiente | Ezequiel: perfiles y colaboraciones auténticas, sin comprar enlaces. |
| A19 GEO/AEO | Protocolo del informe pendiente de ejecución | Analista: repetir preguntas con región, fecha, motor y enlaces citados; no fabricar resultados. |
| A20 SEO local | Pendiente de elegibilidad | Confirmar atención presencial real antes de crear perfiles. |
| A21 Expansión | Backlog condicionado a datos | Priorizar trimestralmente por consultas calificadas. |
| A22 Rendimiento | Correcciones básicas de recursos; CWV sin medir | PSI/CrUX y datos de campo después de publicar. No se atribuye un score sin medición. |

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

No se ejecutó migración, contratación, apertura de cuentas, cambio de perfiles externos ni modificación de propiedades GSC/Bing/GA4.
