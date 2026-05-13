# Senzo Studio — Referencia de proyecto

Web oficial de Senzo Studio. VFX & CGI boutique con sede en Madrid.
One-pager scroll-driven con estética de monitor de postproducción.

## Regla de oro: Foundations First

Cero valores hardcodeados en componentes:
- Texto visible → archivos en `src/locales/`
- Datos estáticos (URLs, nombres) → `src/data/content.ts`
- Colores, fuentes, espaciado → variables CSS en `src/styles/index.css`

## Breakpoint

Un único breakpoint: **768px**. Mobile-first.
**Nunca usar `sm:`, `md:`, `lg:` de Tailwind** — todo breakpoint va en CSS manual.

## Identidad de marca

- Senzo no es "especialistas en cine" — el cine es su origen y credencial, no su posicionamiento
- Mensaje clave: **Senzo's origin is cinema. Their offer is any screen.**
- El rojo es el playhead — solo aparece donde algo está activo o en movimiento

@apps/senzo-studio/docs/architecture.md
@apps/senzo-studio/docs/design-references/
@apps/senzo-studio/docs/pending.md
@apps/senzo-studio/docs/done.md
