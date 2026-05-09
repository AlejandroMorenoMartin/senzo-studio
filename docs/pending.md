# Pending — senzo-studio

<!-- Formato: - [ ] **Descripción** `[ALTA|MEDIA|BAJA]` — _entrada: YYYY-MM-DD_ -->
<!-- Contexto opcional:  > descripción ampliada -->
<!-- Próximo paso:       > next: acción concreta y ejecutable -->

- [ ] **Conectar formularios a Airtable — endpoint serverless en Vercel** `[ALTA]` — _entrada: 2026-05-09_
  > Los formularios de Business y Freelancer hacen POST a `/api/submit-business` y `/api/submit-freelancer`. Ambos endpoints no existen aún. Conectar via Airtable API + Vercel Functions.
  > next: tras el deploy, crear Vercel Function en `api/submit-business.ts`, configurar Airtable base y API key, probar end-to-end con el cliente

- [ ] **Aprender Airtable y preparar demo para el cliente** `[MEDIA]` — _entrada: 2026-05-09_
  > El cliente necesita ver cómo llegan los leads del formulario a Airtable antes de aprobar el flujo. Familiarizarse con la interfaz, crear la base con los campos del formulario, y preparar una demo funcional.
  > next: crear cuenta / acceder a Airtable, crear base "Senzo Leads" con campos equivalentes al formulario de Business, conectar con el endpoint serverless

