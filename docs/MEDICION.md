# Alta y conexión de las herramientas de medición

Estado al 16/10/2026: el propietario está verificando Search Console por DNS. Creó GA4 y proporcionó `G-DPKDSMXB34`; confirmó Enhanced measurement desactivado. La integración está preparada en esta propuesta. Bing sigue pendiente.

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
6. El ID ya se integró con consentimiento opcional y política actualizada. Después del merge, abrir el sitio publicado, aceptar la analítica y comprobar los eventos en Tiempo real/DebugView. Rechazarla impide cargar la etiqueta; localhost no envía datos. El código preparado no demuestra por sí solo que la propiedad haya recibido eventos.

Fuente: [Google: configurar Analytics y obtener el ID](https://support.google.com/analytics/answer/9304153?hl=es).

El sitio emite `ortega:interaction` localmente. Eventos: `click_whatsapp`, `click_email`, `click_open_account`, `click_instagram`. Después de aceptar, analytics.js los traduce a GA4 con campos `page` y `placement`. Las vistas usan la URL canónica sin query ni hash; el referrer se limita al dominio. No se transmiten href, mensajes, emails, teléfonos ni documentación financiera en los eventos propios. Google Signals y personalización publicitaria quedan desactivados.

El permiso se recuerda con vigencia de 180 días en localStorage. Las cookies de GA se configuran para el host, 180 días sin renovación. Al retirar el permiso se deshabilita GA, se eliminan cookies `_ga` de este host y se recarga la página para descargar la etiqueta. La integración permanece apagada en otros orígenes. Si el navegador bloquea almacenamiento, se respeta la decisión en memoria durante esa página y se vuelve a preguntar en una nueva carga.

Referencia técnica: [Google: consentimiento básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic), [parámetros GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).

## Comprobación de recepción después del merge

1. Abrir `https://inversiones.ortega.id/` y aceptar la analítica.
2. En GA4, abrir Reports → Realtime y comprobar `page_view`. No es necesario que haya otros visitantes para esta comprobación.
3. Navegar una guía y comprobar su ruta. Para probar una interacción de contacto basta hacer un clic en el enlace; no enviar mensajes ni iniciar una apertura de cuenta.
4. Confirmar `click_whatsapp`, `click_email`, `click_open_account` o `click_instagram` según el enlace probado. Un clic sigue siendo una interacción, no un lead confirmado.
5. Volver a Preferencias de privacidad → Rechazar. La página recarga y no debe volver a cargar la etiqueta de Google hasta una nueva aceptación.

La recepción sólo se da por verificada cuando se ve en la propiedad real. La prueba automatizada valida decisiones y payloads, sin transmitir datos de prueba a Google.

## Bing Webmaster Tools

1. Tras verificar Search Console, entrar en [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Elegir importar desde Google Search Console y seleccionar únicamente el sitio correspondiente.
3. El propietario revisa y autoriza la conexión de cuentas. Comprobar que se importó la propiedad correcta y que el sitemap figura en la lista.
4. Si no se importa el sitemap, enviarlo desde Sitemaps con su URL completa. Después revisar indexación y rastreo.

Fuente: [Bing: agregar y verificar un sitio](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b).

## Resultados comerciales

Un clic de WhatsApp es una interacción, no una consulta confirmada ni una cuenta abierta. Registrar por separado: contacto efectivo → lead calificado → cuenta abierta confirmada → cliente activado. Conciliar con Balanz o el registro comercial mediante datos autorizados. No cargar información personal o financiera de clientes en Analytics.

Para empezar basta una planilla o CRM con identificador interno, fecha, fuente, necesidad general y estado. La información identificatoria y las conversaciones quedan en los canales del responsable, con acceso y conservación acordes a sus obligaciones.
