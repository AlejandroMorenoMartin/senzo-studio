# Pending — senzo-studio

<!-- Formato: - [ ] **Descripción** `[ALTA|MEDIA|BAJA]` — _entrada: YYYY-MM-DD_ -->
<!-- Contexto opcional:  > descripción ampliada -->
<!-- Próximo paso:       > next: acción concreta y ejecutable -->

- [ ] **Vídeo hero — peso excesivo (55 MB), evaluar estrategia de carga** `[MEDIA]` — _entrada: 2026-05-08_
  > Versión actual `introWeb_SenzoStudio_v2.mp4` pesa 55 MB. Medir tiempo de carga real en primera visita (DevTools Network, Disable cache). Decidir entre: (a) recomprimir más agresivamente manteniendo calidad aceptable, (b) servir desde almacenamiento en nube (Cloudflare R2, Bunny CDN) y referenciar la URL en `content.ts`.
  > next: abrir DevTools → Network → Disable cache → recargar → anotar tiempo de carga del mp4

