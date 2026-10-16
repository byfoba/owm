# Validación técnica del 16 de octubre de 2026

## Sitio publicado

Se verificaron mediante consultas HTTP las nueve páginas originales de la nueva estructura, robots, sitemap y los recursos CSS, JS y SVG de WhatsApp. Todos respondieron 200 con tipos de contenido acordes. El sitemap publicado contiene nueve URLs; esta propuesta incorpora seis adicionales (hub y cinco guías).

Enforce HTTPS estaba desactivado. Se comprobó el certificado aprobado para `inversiones.ortega.id`, se activó el ajuste por API de GitHub Pages y se verificó que una petición a `http://inversiones.ortega.id/` termina en `https://inversiones.ortega.id/` con respuesta final 200.

## Registro profesional

Consulta en el buscador público de agentes CNV por apellido Ortega y matrícula 2299. La ficha resultante identifica `ORTEGA EZEQUIEL JOSE`, categoría `AP — Persona Humana`, matrícula `2299`.

[Ficha oficial de CNV](https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/DetallesRegistrosPublicos/105340?tipoEntidadId=2&tipoAgente=302).

Se revisaron las pestañas de información general e inscripciones. No se publica CUIT, ni se atribuyen a esa ficha una acreditación académica o facultades contractuales que no muestra. El propietario confirmó la vigencia en la conversación.

## Apertura Balanz

Las consultas automatizadas HEAD recibieron 403. Esto no se trató como prueba de enlaces rotos: ambos enlaces se abrieron después en un navegador normal y mostraron la pantalla inicial de apertura con el campo email.

La redirección de `www.balanz.com` a `balanz.com` conservó `reference`. No se completaron campos ni se inició una solicitud de cuenta. Esto comprueba destino y conservación del parámetro, no atribución comercial efectiva ni admisión de no residentes.

## PageSpeed Insights

La API pública sin clave devolvió 429 por cuota. La medición se realizó mediante la interfaz oficial de PageSpeed Insights. Reporte capturado el 16/10/2026 a las 20:36 (Argentina), Lighthouse 13.5.0.

[Informe móvil](https://pagespeed.web.dev/analysis/https-inversiones-ortega-id/v5g1cuadps?form_factor=mobile) · [Informe de escritorio](https://pagespeed.web.dev/analysis/https-inversiones-ortega-id/v5g1cuadps?form_factor=desktop).

| Categoría / métrica | Móvil, Moto G Power emulado, Slow 4G | Escritorio emulado |
| --- | --- | --- |
| Rendimiento | 100 | 100 |
| Accesibilidad automática | 100 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO técnico de Lighthouse | 100 | 100 |
| FCP | 0,8 s | 0,2 s |
| LCP | 0,8 s | 0,5 s |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0 |
| Speed Index | 0,8 s | 0,4 s |

Son resultados de una ejecución de laboratorio sobre la portada publicada, antes del merge de las nuevas guías. No se presentan como datos de campo, cobertura de todo el sitio, aprobación total de accesibilidad ni garantía de ranking. CrUX muestra “No Data”; no hay evaluación real de INP ni aprobación de Core Web Vitals de campo.

Oportunidades menores señaladas: entrega de imágenes, caché y CSS bloqueante. La caché de GitHub Pages no se personaliza en este repositorio. No se realizaron cambios de arquitectura ni optimizaciones especulativas para mejorar una puntuación que ya es 100.

## Propuesta de guías

Se generan quince páginas con contenido HTML legible sin JavaScript. Se comprueban enlaces internos y fragmentos, recursos locales, metadatos únicos, canonical, datos estructurados, destinos de contacto y sitemap. Las guías incorporan Article y BreadcrumbList, fechas visibles y fuentes primarias.

Las cinco guías se revisaron en el navegador con una vista de teléfono: ancho útil de 375 px, sin desborde horizontal. Se probaron enlaces del índice y la navegación desde el hub. La vista de escritorio del hub también fue inspeccionada.

## Google Analytics

El propietario aportó `G-DPKDSMXB34` y confirmó Enhanced measurement desactivado. Se añade consentimiento básico con rechazo, aceptación y preferencias en el footer. El permiso de publicidad permanece denegado. Las vistas usan canonical sin parámetros y referencia limitada al origen; los eventos propios sólo envían tipo de clic, página y ubicación.

Las pruebas JS en memoria verifican: ausencia de Google antes de consentir y después de rechazar; carga única y una sola vista al aceptar; exclusión de URL/email/teléfono de los eventos propios; revocación con bloqueo y eliminación de cookies; persistencia, caducidad y almacenamiento bloqueado. No se envían eventos de prueba a Google y localhost permanece desactivado.

La recepción en la propiedad real se comprobará después del merge desde Realtime. No se fabrican datos de visitas, leads ni clientes. Las mediciones PSI anteriores son previas a esta integración y deberán repetirse cuando esté publicada si aparece una regresión o una señal de rendimiento que lo justifique.
