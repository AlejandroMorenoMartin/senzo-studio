# Senzo Studio — Referencia de proyecto

Web oficial de Senzo Studio. One-pager scroll-driven con estética de monitor de postproducción.
Stack: React 19 + Vite 6 + Tailwind v4 + TypeScript strict + Framer Motion.

## Archivos clave

- `src/styles/index.css` — fuente de verdad: tokens, clases, breakpoints
- `src/data/content.ts` — fuente de verdad: texto y datos de placeholder
- `src/components/sections/` — una sección = un archivo
- `src/hooks/` — lógica de interacciones (frame counter, before/after slider)
- `docs/design-references/` — capturas Figma y referencias visuales del cliente

## Regla de oro: Foundations First

Cero valores hardcodeados en componentes:
- Texto y datos → `src/data/content.ts`
- Colores, fuentes, espaciado → variables CSS en `index.css`

## Breakpoint

Un único breakpoint: **768px**. Mobile-first.
**Nunca usar `sm:`, `md:`, `lg:` de Tailwind** — todo breakpoint va en CSS manual.

## Identidad de marca

- Senzo no es "especialistas en cine" — el cine es su origen y credencial, no su posicionamiento
- Mensaje clave: **Senzo's origin is cinema. Their offer is any screen.**
- El rojo es el playhead — solo aparece donde algo está activo o en movimiento

@apps/senzo-studio/docs/design-references/
@apps/senzo-studio/docs/pending.md
