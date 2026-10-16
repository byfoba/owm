# Alta y conexión de las herramientas de medición

Estado al 16/10/2026: el propietario está verificando Search Console por DNS; no confirmó propiedades existentes de GA4 ni Bing. No se dispone aún de un ID GA4. No se activa seguimiento con datos ficticios.

## Google Search Console

1. Completar la verificación DNS usando exactamente el registro que indica la propiedad elegida. Conservar el TXT de verificación.
2. En Sitemaps, enviar `https://inversiones.ortega.id/sitemap.xml`.
3. Usar Inspección de URLs para revisar inicio y las páginas principales. Tras el merge de las guías, inspeccionar también `/recursos/` y una guía.
4. Los datos y la indexación no son inmediatos. Registrar consultas, páginas, clics e impresiones cuando haya datos, sin confundir ausencia de datos con falta de funcionamiento.

Fuente: [Google: verificar propiedad](https://support.google.com/webmasters/answer/9008080?hl=es).

## Google Analytics 4

1. Entrar en [Google Analytics](https://analytics.google.com/). Si es una cuenta nueva, elegir Empezar a medir; si ya existe, Administrar → Crear → Propiedad.
2. Nombre sugerido: `Ezequiel Ortega — Inversiones`. Zona horaria: Argentina/Buenos Aires. Moneda: ARS. Objetivo de negocio: generar oportunidades de venta.
3. Crear un flujo Web con `https://inversiones.ortega.id/` y copiar su ID de medición `G-…`.
4. El propietario acepta las condiciones del servicio en su propia cuenta. Para integrar el sitio sólo hace falta el ID de medición, no contraseñas ni claves privadas.
5. Desactivar la medición mejorada de clics salientes: los enlaces de apertura contienen un correo de referido. Los eventos propios deben registrar únicamente tipo de interacción, página y ubicación del botón.
6. Con el ID real, conectar la etiqueta, configurar privacidad y comprobar los eventos en Tiempo real/DebugView. Revisar también consentimiento y cookies antes de publicar la integración. El sitio actual sigue sin analítica instalada.

Fuente: [Google: configurar Analytics y obtener el ID](https://support.google.com/analytics/answer/9304153?hl=es).

El sitio ya emite `ortega:interaction` localmente. Eventos: `click_whatsapp`, `click_email`, `click_open_account`, `click_instagram`. No transmitir href, mensajes, emails, teléfonos ni documentación financiera a GA4. Evitar registrar query strings o referencias que contengan datos personales. No activar audiencias publicitarias ni remarketing como parte de esta integración básica.

## Bing Webmaster Tools

1. Tras verificar Search Console, entrar en [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Elegir importar desde Google Search Console y seleccionar únicamente el sitio correspondiente.
3. El propietario revisa y autoriza la conexión de cuentas. Comprobar que se importó la propiedad correcta y que el sitemap figura en la lista.
4. Si no se importa el sitemap, enviarlo desde Sitemaps con su URL completa. Después revisar indexación y rastreo.

Fuente: [Bing: agregar y verificar un sitio](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b).

## Resultados comerciales

Un clic de WhatsApp es una interacción, no una consulta confirmada ni una cuenta abierta. Registrar por separado: contacto efectivo → lead calificado → cuenta abierta confirmada → cliente activado. Conciliar con Balanz o el registro comercial mediante datos autorizados. No cargar información personal o financiera de clientes en Analytics.

Para empezar basta una planilla o CRM con identificador interno, fecha, fuente, necesidad general y estado. La información identificatoria y las conversaciones quedan en los canales del responsable, con acceso y conservación acordes a sus obligaciones.
