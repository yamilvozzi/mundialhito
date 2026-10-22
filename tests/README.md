# Pruebas de Mundialhito

Suite permanente de regresión del cliente. Ejecuta funciones reales extraídas del
HTML y la aplicación completa en Chromium, con datos ficticios y Supabase simulado.
No requiere credenciales, no ejecuta SQL y no modifica usuarios ni datos remotos.

## Preparación y ejecución

Requiere Node.js >=22, npm y Chromium compatible con Playwright 1.62.1.

```sh
npm ci
npx playwright install chromium
npm test
```

La instalación inicial necesita acceso al registro npm y a la descarga de Chromium.
En Linux pueden requerirse dependencias del sistema (`npx playwright install --with-deps chromium`).
La app desplegada es estática y no necesita Node.

- `npm test`: los 59 tests de lógica de seis archivos y las 11 suites de navegador.
- `npm run test:unit`: solo lógica.
- `npm run test:browser`: solo navegador.
- `node --test tests/undo.test.cjs`: un archivo de lógica.
- `node tests/archive-xss.browser.cjs`: una suite de navegador.

`tests/run.cjs` descubre automáticamente `*.test.cjs` y `*.browser.cjs` en esta
carpeta. Ejecuta primero lógica y después cada navegador en secuencia. Un fallo o
un proceso que exceda tres minutos termina con código distinto de cero.

Opciones de entorno:

- `PLAYWRIGHT_CHROMIUM_EXECUTABLE`: ruta a Chromium/Chrome ya instalado, como
  alternativa a descargar el navegador de Playwright; comprobar compatibilidad.
- `NODE_PATH`: ubicación alternativa de módulos para runtimes preparados.
- `QA_OUTPUT_DIR`: carpeta existente **fuera del repositorio** para capturas opcionales.

El service worker usa un servidor temporal en `127.0.0.1`, iniciado por su propia
suite. El resto sirve archivos mediante rutas interceptadas. No hay que iniciar
otro servidor. El entorno debe permitir abrir procesos de navegador y puertos locales.

## Cobertura

| Comportamiento | Archivos |
| --- | --- |
| Ocho grupos posibles, cuatro eliminaciones, copa por penales, snapshot acotado y Deshacer | `undo.test.cjs` |
| Carga fallida o incompleta sin sobrescritura, reintento, usuario nuevo y respuestas tardías | `load-state.test.cjs` |
| Cola de escrituras, debounce, errores, reintento, logout y final persistida | `save-state.test.cjs` |
| Históricos, campañas, finales por penales, corte de rachas y lectura sin escrituras | `history-reconstruction.test.cjs`, `history-reconstruction.browser.cjs` |
| Claves, parámetros, plantilla, fallback y vocabulario | `i18n.test.cjs` |
| Diez idiomas en seis pantallas, representación visual de la final y datos intactos | `i18n.browser.cjs` |
| Texto malicioso literal, IDs sin ejecutar código fechas ausentes y nombres accesibles de borrado en español, inglés y japonés | `archive-xss.browser.cjs` |
| Seis pantallas, overlays, cambio de cuenta y respuestas de sesiones invalidadas | `session-ui.browser.cjs` |
| Contador 0–10, renovación, valores antiguos, recarga y Deshacer | `plan-counter.browser.cjs` |
| Preferencias coherentes entre layouts, volumen, idioma y nombre | `preferences.browser.cjs` |
| Tab, Shift+Tab, Escape, foco, aislamiento del fondo y tirada comprometida | `modals.browser.cjs` |
| 72 rutas entre pantallas, un render por clic, menús y acciones | `navigation.browser.cjs` |
| Copas y menú estable: 900 transiciones en cinco anchos | `cups-navigation.browser.cjs` |
| Política solo red, fallos de navegación y recursos | `service-worker.test.cjs` |
| Worker real, recuperación de red, manifest, dimensiones de iconos y colores | `service-worker.browser.cjs` |
| SDK real, inicio/login/guardado/recarga/logout, fallo de CDN y sesión | `startup.browser.cjs` |

`startup.browser.cjs` sirve el UMD instalado de Supabase JS 2.118.0 e intercepta
sus endpoints. Comprueba integración con el SDK, no con un servidor real. Las demás
pruebas usan un cliente simulado o funciones aisladas.

## Fixtures y compatibilidad

`fixtures/historical-state.cjs` conserva un estado representativo anonimizado con
60 partidos y un corte de rachas. Es un recurso permanente de compatibilidad.
Las pruebas también construyen estados mínimos, variantes de penales con/sin fecha,
campos ausentes, acumuladores, contador antiguo y formatos no reconocidos.

No renombrar `Gran Final`, los identificadores de fase ni las claves JSON para
simplificar una prueba. La reconstrucción se realiza al cargar; consultar o archivar
no altera el historial. Un reinicio de rachas inicia un nuevo período incluso dentro
de un torneo. Las fotografías archivadas no se recalculan.

## Agregar una regresión

Usar `node:test` y `assert` en un `*.test.cjs` para reglas y contratos de estado.
Para DOM, interacción, foco o SDK, agregar el caso a la suite de navegador pertinente;
crear otro `*.browser.cjs` solo si representa un área distinta. El runner lo descubre
sin configuración adicional. Evitar copiar reglas de producción como resultado esperado:
expresar el comportamiento desde entradas y resultados verificables.

Reproducir primero el fallo, comprobar que la prueba lo detecta, corregir y ejecutar
`npm test`. Probar ambos layouts cuando la interfaz participa. Toda petición remota
debe interceptarse; usar identidades ficticias y nunca claves administrativas.
Si cambia un formato, incorporar ejemplos antiguos antes de evaluar cualquier migración.

## Versiones y límites

Supabase JS 2.118.0 y Playwright 1.62.1 están fijados en ambos archivos npm. El SDK
requiere Node >=22; Node 20 puede instalar con advertencias si `engine-strict` es
false, pero no es una versión soportada por el proyecto. La validación local usa
Node 24.14.1 y Chrome instalado mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

Esta batería no certifica RLS, correo de confirmación, Google OAuth ni recuperación
de cuenta. Tampoco instalación nativa de PWA, audio en todos los dispositivos,
Safari/Firefox, lectores de pantalla, concurrencia entre equipos ni recuperación
tras cierre forzado. El esquema y la verificación remota pendiente se describen en
[Supabase](../docs/SUPABASE.md); decisiones y límites funcionales en la
[documentación técnica](../DOCUMENTACION_TECNICA.md).
