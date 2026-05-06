# Senzo Studio — Pendientes

## MVP — antes del deploy

- [ ] Sustituir placeholders por assets reales (vídeo hero, thumbnails, before/after)
- [ ] Actualizar URL del reel de Vimeo en `src/data/content.ts`
- [ ] Actualizar email y redes sociales reales en `src/data/content.ts`
- [ ] Revisar y aprobar copy con el cliente (Statement, About, FAQ)
- [ ] Migración de dominio: IONOS → Cloudflare DNS → Vercel (preservar MX de Google Workspace)

## Post-MVP

- Crosshair cursor con coordenadas X/Y dinámicas (desktop only)
- i18n: ES, ZH, RU
- Google Search Console tras migración de dominio
- Auditoría de rendimiento (optimización de vídeo, SVG)
- Analytics (Hotjar o equivalente)

## Accesibilidad (no bloquea demo)

- [ ] Focus trap + `role="dialog"` + `aria-modal="true"` en `ModalVimeo.tsx` y `ModalImage.tsx`
- [ ] Filas de Work: cambiar `<div>` a `<button>` o añadir `role="button"` + `tabIndex` + `onKeyDown`
- [ ] `aria-expanded` en botón de acordeón en `Faq.tsx`
- [ ] `role="slider"` + `aria-valuenow/min/max` + teclado en `BeforeAfterSlider` (`Services.tsx`)
