# Ezequiel Ortega · Inversiones

Sitio estático para `https://inversiones.ortega.id/`. El contenido se entrega en HTML, sin depender de JavaScript para leerlo o para seguir los enlaces de contacto.

## Desarrollo y publicación

Requiere Node.js 20 o superior.

```sh
npm ci
npm run build
npm test
npm run dev
```

La vista previa está en `http://127.0.0.1:8080`. `dev` sirve la última compilación: después de editar, volver a ejecutar `build`.

`scripts/content.mjs` contiene los textos comerciales, las páginas y los enlaces de contacto. `scripts/articles.mjs` contiene las cinco guías educativas completas con sus fuentes y fechas de actualización. `scripts/build.mjs` contiene la plantilla compartida y genera los quince HTML, robots, sitemap y CSS local. No editar manualmente los HTML generados ni `assets/site.css`.

Se conserva el esquema de publicación estática del repositorio: los archivos generados están versionados y pueden publicarse desde la raíz de la rama. `dist/` contiene el mismo sitio para hosts que utilicen un directorio de salida. Se conserva `CNAME` y se añade `.nojekyll`. No se cambia el dominio ni se habilita un despliegue automático nuevo. La rama de trabajo se debe revisar antes de integrarla en `main`.

El paquete anterior declaraba React/Vite y numerosas dependencias de una plantilla que el HTML no utilizaba. La compilación ahora usa únicamente Tailwind como dependencia de desarrollo. El navegador recibe CSS generado y un pequeño script local para el menú accesible y eventos de interacción; no descarga Tailwind desde un CDN.

## Contactos y fuentes

WhatsApp `+54 9 11 2622-0548` y referido de Balanz confirmados por el propietario. Ficha individual consultada el 16/10/2026 en CNV: [ORTEGA EZEQUIEL JOSE, AP — Persona Humana, matrícula 2299](https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/DetallesRegistrosPublicos/105340?tipoEntidadId=2&tipoAgente=302). La vigencia fue confirmada además por el propietario. No se agregan títulos académicos, métricas comerciales ni testimonios sin respaldo.

Instagram: https://www.instagram.com/ezequielortega.bolsa

Tarifario oficial consultado el 16/10/2026: https://balanz.com/comisiones/. Confirma apertura y mantenimiento sin cargo y distingue comisiones operativas. No se copian tasas que puedan quedar desactualizadas.

## Validación

`npm test` comprueba el artefacto real en `dist/`: metadata, canonical, datos estructurados, enlaces internos y fragmentos, imágenes, contactos, referido, sitemap, robots y ausencia de claims retirados. No mide posicionamiento ni conversiones reales.

El plan de ejecución, decisiones, pendientes y medición están en [docs/PLAN-DE-ACCION.md](docs/PLAN-DE-ACCION.md). Las guías se generan en `/recursos/`, con fuentes, enlaces relacionados, índices y marcado Article. No se atribuye autoría ni revisión profesional inexistente. Las herramientas de analítica requieren el ID real de la propiedad y configuración de privacidad antes de activarlas. El alta de propiedades está explicada en [docs/MEDICION.md](docs/MEDICION.md).
