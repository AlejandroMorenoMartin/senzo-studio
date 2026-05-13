# Senzo Studio — Arquitectura y referencia técnica

Web oficial de Senzo Studio. VFX & CGI boutique con sede en Madrid.
One-pager scroll-driven con estética de monitor de postproducción.

## Stack

- **React 19** + **Vite 6** + **TypeScript strict**
- **Tailwind CSS v4** — configurado via `@tailwindcss/vite`, sin `tailwind.config.js`
- **Framer Motion v11** — animaciones de scroll y transiciones
- **i18next + react-i18next** — internacionalización (ES, EN, ZH, RU)
- **react-hook-form + zod + @hookform/resolvers** — formularios con validación
- **pnpm** como gestor de paquetes

## Estructura

```
src/
  components/
    sections/     # Una sección = un archivo (Hero, About, Services, Work, Clients, Contact, Faq, Footer, Statement)
    form/         # FormField, InputText, InputSelect, InputTextarea
  data/
    content.ts    # Datos estáticos: URLs de vídeo, thumbnails, proyectos
    countries.ts  # Lista de países para el formulario
  hooks/
    useBeforeAfter.ts     # Slider before/after en Services
    useFrameCounter.ts    # Contador de frames del hero
    useHover.ts           # Estado hover genérico
    useKittScheduler.ts   # Animación KITT del SplashScreen
  locales/
    es/ en/ zh/ ru/       # Archivos JSON por idioma y sección
  styles/
    index.css     # FUENTE DE VERDAD: tokens CSS, clases, breakpoints
public/
  video/          # introWeb_SenzoStudio.mp4 (14 MB, hero loop)
  images/         # Thumbnails de proyectos y before/after
  fonts/          # Tipografías locales
  og-image.webp   # Open Graph image
  robots.txt / sitemap.xml / llms.txt
```

## Archivos clave

- `src/styles/index.css` — tokens de color, tipografía, espaciado y breakpoint
- `src/data/content.ts` — URLs de vídeo, thumbnails, datos de proyectos
- `src/locales/` — todo el texto visible de la web
- `vercel.json` — configuración de deploy (build, output, SPA rewrite)

## i18n

- Idiomas: ES (defecto), EN, ZH, RU
- Archivos en `src/locales/{idioma}/{seccion}.json`
- En componentes: `useTranslation('seccion')` + hook `t()`
- Para HTML embebido: componente `<Trans>`
- El selector de idioma está en `Navbar` vía `LangSelector`

## Formularios

Dos modales de contacto:
- `ModalBusiness` — clientes empresa. POST a `/api/submit-business`
- `ModalFreelancer` — freelancers. POST a `/api/submit-freelancer`

Validación con zod. Los endpoints de Vercel Functions **aún no existen** — pendiente conectar con Airtable.

## Deploy

- **Producción:** `main` → `senzostudio.com` (Vercel)
- **Staging:** `dev` → `dev.senzostudio.com` (Vercel, rama `dev`)
- **DNS:** gestionado en Cloudflare (registros CNAME apuntando a Vercel)
- **Email:** Google Workspace, registros MX en Cloudflare — no tocar
- **Repo:** https://github.com/AlejandroMorenoMartin/senzo-studio

Cualquier push a `main` despliega automáticamente en producción.
