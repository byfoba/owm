# playbook_deploy.md - Guía de Despliegue

## GitHub Pages Deployment

### Prerrequisitos
- Acceso al repositorio: https://github.com/byfoba/owc
- Permisos de escritura (push)
- Git instalado localmente

---

## 1. Preparación del Branch

### Crear branch de trabajo
```bash
# Clonar repositorio
git clone https://github.com/byfoba/owc.git
cd owc

# Crear branch para SEO
git checkout -b technical-seo/initial-audit-and-templates

# Verificar que estás en el branch correcto
git branch
```

### Copiar archivos nuevos
```bash
# Los archivos deben estar en:
# - robots.txt (root)
# - sitemap.xml (root)
# - data/jsonld/base.jsonld
# - data/jsonld/faq.jsonld
# - _templates/seo_head.html
# - servicios/servicio-template.html
# - servicios/gestion-de-portafolio/index.html
# - servicios/planificacion-financiera/index.html
# - blog/post-template.html
# - CHANGES.md
# - CONTENT_NEXT_STEPS.md
# - playbook_deploy.md
```

---

## 2. Commits Atómicos

### Estructura de commits recomendada
```bash
# Commit 1: Infraestructura SEO básica
git add robots.txt sitemap.xml
git commit -m "feat(seo): add robots.txt and sitemap.xml"

# Commit 2: JSON-LD schemas
git add data/jsonld/
git commit -m "feat(schema): implement JSON-LD for Person, Service, FAQ"

# Commit 3: Templates
git add _templates/
git commit -m "feat(templates): add reusable SEO head template"

# Commit 4: Páginas de servicio
git add servicios/
git commit -m "feat(pages): create service page templates with SEO"

# Commit 5: Template de blog
git add blog/
git commit -m "feat(blog): add blog post template with Article schema"

# Commit 6: Documentación
git add CHANGES.md CONTENT_NEXT_STEPS.md playbook_deploy.md
git commit -m "docs(seo): add implementation docs and deployment guide"
```

---

## 3. Push y Pull Request

### Subir cambios
```bash
git push -u origin technical-seo/initial-audit-and-templates
```

### Crear Pull Request
1. Ir a: https://github.com/byfoba/owc/pulls
2. Click "New Pull Request"
3. Base: `main` ← Compare: `technical-seo/initial-audit-and-templates`
4. Título: `feat(seo): Phase A - Initial SEO audit and templates`
5. Descripción: Copiar contenido de CHANGES.md

### Checklist del PR
```markdown
## Changes
- [x] robots.txt added
- [x] sitemap.xml added  
- [x] JSON-LD schemas implemented
- [x] SEO head template created
- [x] Service pages with placeholders
- [x] Blog post template

## Testing
- [ ] Local server tested
- [ ] JSON-LD validated (attach screenshot)
- [ ] Mobile responsive verified

## Documentation
- [x] CHANGES.md included
- [x] CONTENT_NEXT_STEPS.md for copywriter
- [x] playbook_deploy.md for deployment
```

---

## 4. Configuración de GitHub Pages

### Verificar configuración actual
1. Ir a: https://github.com/byfoba/owc/settings/pages
2. Confirmar:
   - Source: Deploy from branch
   - Branch: `main` / `(root)`
   - Custom domain: `inversiones.ortega.id`

### DNS Configuration (si aplica)
```
# CNAME record
inversiones.ortega.id -> byfoba.github.io

# O A records para apex domain
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Archivo CNAME
Si el dominio personalizado no está configurado, crear:
```bash
echo "inversiones.ortega.id" > CNAME
git add CNAME
git commit -m "chore: add CNAME for custom domain"
```

---

## 5. Cache Headers (GitHub Pages Limitaciones)

GitHub Pages no permite configurar headers personalizados. Alternativas:

### Opción A: Cloudflare (Recomendado)
1. Configurar DNS a través de Cloudflare
2. Page Rules:
   ```
   inversiones.ortega.id/assets/*
   Cache Level: Standard
   Edge Cache TTL: 1 month
   ```

### Opción B: Service Worker
```javascript
// En un futuro, implementar caching con SW
// Ver: https://developers.google.com/web/fundamentals/primers/service-workers
```

---

## 6. Post-Deploy Verification

### Checklist inmediato
```bash
# 1. Verificar robots.txt
curl https://inversiones.ortega.id/robots.txt

# 2. Verificar sitemap
curl https://inversiones.ortega.id/sitemap.xml

# 3. Verificar páginas de servicio
curl -I https://inversiones.ortega.id/servicios/gestion-de-portafolio/
```

### Google Search Console
1. Ir a: https://search.google.com/search-console
2. Agregar propiedad: `https://inversiones.ortega.id`
3. Verificar con:
   - HTML tag (agregar a index.html)
   - O archivo HTML de verificación
4. Enviar sitemap: `https://inversiones.ortega.id/sitemap.xml`

### Google Rich Results Test
1. Ir a: https://search.google.com/test/rich-results
2. Probar URL de homepage
3. Verificar que detecta:
   - Person
   - FinancialService
   - FAQPage
   - BreadcrumbList

---

## 7. Monitoreo Post-Deploy

### Primera semana
- [ ] Verificar indexación en Google (`site:inversiones.ortega.id`)
- [ ] Revisar errores en Search Console
- [ ] Monitorear Core Web Vitals

### Lighthouse Audit
```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Ejecutar auditoría
lighthouse https://inversiones.ortega.id --output html --output-path ./lighthouse-report.html

# O usar la versión web
# https://pagespeed.web.dev/
```

### Métricas objetivo
| Métrica | Target | Actual |
|---------|--------|--------|
| Performance | >90 | - |
| Accessibility | >90 | - |
| Best Practices | >90 | - |
| SEO | >95 | - |
| LCP | <2.5s | - |
| CLS | <0.1 | - |
| FID | <100ms | - |

---

## 8. Troubleshooting

### El sitio no actualiza
```bash
# Forzar cache bust
# Agregar query string temporal a recursos
?v=2026021301
```

### 404 en páginas de servicio
- Verificar que las carpetas tienen `index.html`
- Verificar que GitHub Pages está configurado en `/root`

### JSON-LD no aparece en Rich Results
- Esperar 24-48h para indexación
- Verificar que no hay errores de sintaxis
- Usar herramienta de prueba de Google

### Dominio no resuelve
```bash
# Verificar DNS
dig inversiones.ortega.id

# Verificar propagación
nslookup inversiones.ortega.id 8.8.8.8
```

---

## Contactos y Recursos

### Documentación
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Reference](https://schema.org)

### Soporte
- GitHub Issues: https://github.com/byfoba/owc/issues

---

*Documento generado: Febrero 2026*
