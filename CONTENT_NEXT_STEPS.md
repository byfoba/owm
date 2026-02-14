# CONTENT_NEXT_STEPS.md - Guía para el Equipo de Contenido

## Resumen
Este documento explica cómo reemplazar los placeholders en las páginas de servicio y blog creadas por el equipo técnico. Los placeholders están marcados con el formato `{{PLACEHOLDER_NAME}}` y deben ser reemplazados con contenido SEO-optimizado.

---

## Sistema de Placeholders

### Formato
Todos los placeholders siguen el patrón: `{{NOMBRE_DEL_PLACEHOLDER}}`

### Ubicación en el código
Los placeholders también tienen comentarios HTML asociados para facilitar la búsqueda:
```html
<!-- CONTENT: placeholder_name -->
```

---

## Archivos a Completar

### 1. Página de Gestión de Portafolio
**Archivo**: `/servicios/gestion-de-portafolio/index.html`

| Placeholder | Descripción | Ejemplo |
|-------------|-------------|---------|
| `{{SEO_META_TITLE}}` | Título para SEO (50-60 caracteres) | "Gestión de Portafolio Profesional | Ezequiel Ortega - Asesor CNV" |
| `{{SEO_META_DESC}}` | Meta descripción (150-160 caracteres) | "Servicio de gestión activa de portafolio con Ezequiel Ortega, asesor financiero matriculado CNV. Estrategias personalizadas para hacer crecer tu capital." |
| `{{HERO_TITLE}}` | Título principal H1 | "Gestión Profesional de tu Portafolio de Inversiones" |
| `{{HERO_SUBTITLE}}` | Subtítulo descriptivo | "Delegá la gestión de tu capital a un profesional matriculado en la CNV con más de 5 años de experiencia." |
| `{{BENEFICIO_1_TITULO}}` | Título beneficio 1 | "Gestión Activa" |
| `{{BENEFICIO_1_DESC}}` | Descripción beneficio 1 | "Monitoreo constante y ajustes estratégicos basados en las condiciones del mercado." |
| `{{BENEFICIO_2_TITULO}}` | Título beneficio 2 | "Diversificación Inteligente" |
| `{{BENEFICIO_2_DESC}}` | Descripción beneficio 2 | "Distribución óptima entre acciones, bonos, CEDEARs y otros instrumentos." |
| `{{BENEFICIO_3_TITULO}}` | Título beneficio 3 | "Transparencia Total" |
| `{{BENEFICIO_3_DESC}}` | Descripción beneficio 3 | "Reportes periódicos y acceso directo a tu cuenta en Balanz." |
| `{{SERVICIO_FAQ_1_Q}}` | Pregunta FAQ 1 | "¿Cuál es el monto mínimo para empezar?" |
| `{{SERVICIO_FAQ_1_A}}` | Respuesta FAQ 1 | "No hay monto mínimo estricto. Podemos diseñar una estrategia adaptada a tu capital disponible." |
| `{{SERVICIO_FAQ_2_Q}}` | Pregunta FAQ 2 | "¿Cómo se cobra el servicio de gestión?" |
| `{{SERVICIO_FAQ_2_A}}` | Respuesta FAQ 2 | "El servicio de asesoramiento no tiene costo adicional. Solo se aplican las comisiones estándar de operación." |
| `{{SERVICIO_FAQ_3_Q}}` | Pregunta FAQ 3 | "¿Puedo ver mi portafolio en cualquier momento?" |
| `{{SERVICIO_FAQ_3_A}}` | Respuesta FAQ 3 | "Sí, tu cuenta en Balanz es 100% transparente. Podés acceder cuando quieras y ver todos los movimientos." |
| `{{CTA_TITULO}}` | Título del CTA | "¿Listo para profesionalizar tus inversiones?" |
| `{{CTA_DESC}}` | Descripción del CTA | "Agendá una consulta gratuita y descubrí cómo puedo ayudarte a alcanzar tus objetivos financieros." |

---

### 2. Página de Planificación Financiera
**Archivo**: `/servicios/planificacion-financiera/index.html`

| Placeholder | Descripción | Ejemplo |
|-------------|-------------|---------|
| `{{SEO_META_TITLE}}` | Título para SEO | "Planificación Financiera Personal | Ezequiel Ortega - Asesor CNV" |
| `{{SEO_META_DESC}}` | Meta descripción | "Planificá tu futuro financiero con la guía de un asesor certificado. Metas personalizadas, optimización fiscal y estrategias claras." |
| `{{HERO_TITLE}}` | Título principal H1 | "Planificación Financiera Personalizada" |
| `{{HERO_SUBTITLE}}` | Subtítulo descriptivo | "Ordenar tus finanzas para alcanzar tus metas con claridad y seguridad." |
| `{{BENEFICIO_1_TITULO}}` | Título beneficio 1 | "Diagnóstico Financiero" |
| `{{BENEFICIO_1_DESC}}` | Descripción beneficio 1 | "Análisis completo de tu situación actual: ingresos, gastos, deudas y patrimonio." |
| `{{BENEFICIO_2_TITULO}}` | Título beneficio 2 | "Plan Personalizado" |
| `{{BENEFICIO_2_DESC}}` | Descripción beneficio 2 | "Estrategia adaptada a tus objetivos: ahorro, inversión, retiro o educación." |
| `{{BENEFICIO_3_TITULO}}` | Título beneficio 3 | "Seguimiento Continuo" |
| `{{BENEFICIO_3_DESC}}` | Descripción beneficio 3 | "Revisiones periódicas para ajustar el plan según tu evolución financiera." |
| `{{SERVICIO_FAQ_1_Q}}` | Pregunta FAQ 1 | "¿Qué incluye la planificación financiera?" |
| `{{SERVICIO_FAQ_1_A}}` | Respuesta FAQ 1 | "Incluye diagnóstico de situación actual, definición de metas, plan de acción, y seguimiento periódico." |
| `{{SERVICIO_FAQ_2_Q}}` | Pregunta FAQ 2 | "¿Cada cuánto se revisa el plan?" |
| `{{SERVICIO_FAQ_2_A}}` | Respuesta FAQ 2 | "Generalmente hacemos revisiones trimestrales, pero podemos ajustar según tus necesidades." |
| `{{SERVICIO_FAQ_3_Q}}` | Pregunta FAQ 3 | "¿La planificación tiene costo?" |
| `{{SERVICIO_FAQ_3_A}}` | Respuesta FAQ 3 | "La consulta inicial es gratuita. El servicio de planificación está incluido para clientes con cuenta activa." |
| `{{CTA_TITULO}}` | Título del CTA | "¿Querés ordenar tus finanzas?" |
| `{{CTA_DESC}}` | Descripción del CTA | "Empezá con una consulta gratuita y demos el primer paso hacia tu tranquilidad financiera." |

---

### 3. Template de Blog Post
**Archivo**: `/blog/post-template.html`

Cuando crees un nuevo artículo, copiá este template y reemplazá:

| Placeholder | Descripción | Notas |
|-------------|-------------|-------|
| `{{POST_TITLE}}` | Título del artículo | Debe ser descriptivo y contener keyword principal |
| `{{SEO_META_TITLE}}` | Título SEO | 50-60 caracteres, incluir keyword |
| `{{SEO_META_DESC}}` | Meta descripción | 150-160 caracteres, incluir keyword |
| `{{POST_SLUG}}` | URL slug | Ej: "como-armar-tu-primer-portafolio" |
| `{{POST_SUMMARY}}` | Resumen corto | 2-3 oraciones que resuman el artículo |
| `{{READING_TIME}}` | Tiempo de lectura | Ej: "5 min de lectura" |
| `{{PUBLISH_DATE}}` | Fecha de publicación | Formato: "13 de febrero, 2026" |
| `{{PUBLISH_DATE_ISO}}` | Fecha ISO | Formato: "2026-02-13" |
| `{{TAG_1}}`, `{{TAG_2}}`, `{{TAG_3}}` | Tags del artículo | Ej: "Inversiones", "Principiantes", "Portafolio" |
| `{{SECCION_1_TITULO}}` | Título sección 1 (H2) | Subtítulo del artículo |
| `{{SECCION_1_CONTENIDO}}` | Contenido sección 1 | Párrafos de la sección |
| `{{CONCLUSION}}` | Conclusión del artículo | Resumen final con CTA |

---

## Imágenes Open Graph

### Especificaciones
- **Dimensiones**: 1200 x 630 píxeles
- **Formato**: JPG o WebP
- **Ubicación**: `/assets/og/`

### Archivos necesarios
| Archivo | Uso |
|---------|-----|
| `og-homepage.jpg` | Página principal |
| `og-gestion-portafolio.jpg` | Servicio de Gestión |
| `og-planificacion-financiera.jpg` | Servicio de Planificación |
| `og-blog-default.jpg` | Default para artículos |

### Recomendaciones de diseño
- Incluir logo de Ezequiel Ortega
- Texto legible en miniatura
- Colores de marca (brand-600: #5950e9)
- Evitar texto pequeño (se ve en 600x315 en algunas plataformas)

---

## Cómo Reemplazar los Placeholders

### Método 1: Buscar y Reemplazar (Recomendado)
1. Abrí el archivo en tu editor de código
2. Usá Ctrl+H (o Cmd+H en Mac)
3. Buscá: `{{PLACEHOLDER_NAME}}`
4. Reemplazá con el contenido final
5. Guardá el archivo

### Método 2: Buscar por comentarios
```bash
# En terminal, encontrar todos los placeholders
grep -r "CONTENT:" servicios/ blog/
```

---

## Checklist de Contenido

### Antes de publicar cada página:
- [ ] Todos los `{{...}}` fueron reemplazados
- [ ] Meta title tiene 50-60 caracteres
- [ ] Meta description tiene 150-160 caracteres
- [ ] Título H1 incluye keyword principal
- [ ] FAQs responden preguntas reales de clientes
- [ ] CTAs tienen texto claro y accionable
- [ ] Imágenes OG están en `/assets/og/`
- [ ] Links internos funcionan correctamente

### Validación SEO:
- [ ] Ejecutar en https://search.google.com/test/rich-results
- [ ] Verificar que no hay errores de JSON-LD
- [ ] Probar preview de OG en https://www.opengraph.xyz/

---

## Contacto

Para dudas técnicas sobre los placeholders o la estructura de las páginas, contactar al equipo de desarrollo.

---

*Documento generado: Febrero 2026*
