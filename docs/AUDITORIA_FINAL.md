# Auditoría final de Mundialhito

Revisión del cliente y del repositorio realizada el 22 de octubre de 2026.
El flujo principal funciona en las pruebas locales y conserva las reglas y formatos
históricos. Se corrigieron tres defectos acotados y se consolidó documentación
autosuficiente. Queda un defecto visual menor comprobado a 320 px y verificaciones
remotas pendientes; no se presenta esta revisión como certificación del servidor.

## Alcance y método

Se revisaron la estructura completa, HTML/CSS/script inline, los diez diccionarios
y motor i18n, celebraciones y sus referencias a audio, manifest, worker, iconos,
configuración npm, documentación, runner, fixtures y todas las suites existentes.
Se contrastaron flujos actuales y casos límite, sin tratar decisiones históricas
como errores que hubiera que volver a corregir.

Las interacciones usan Chromium con datos ficticios y tráfico interceptado. La suite
de inicio y el recorrido final usan el SDK real instalado, con endpoints simulados.
El worker se ejecuta realmente contra un servidor local. No se ingresó al proyecto
remoto ni se modificaron Supabase, RLS, permisos, usuarios o datos.

## Hallazgos corregidos

| Problema y reproducción | Corrección y alcance | Evidencia |
| --- | --- | --- |
| Un objeto de estado no vacío pero incompleto, por ejemplo `{marcador: 'incompleto'}`, superaba la carga y dejaba la app parcialmente abierta, con escritura habilitada | Validar fase reconocida y arrays esenciales antes de asignar estado/habilitar la app. Mostrar el error de carga existente. No rellenar, migrar ni guardar datos deportivos | Caso fallaba antes; pruebas de carga comprueban bloqueo y cero escrituras. Navegador con SDK real comprueba error, reintento y recuperación del estado válido |
| `created_at: null` se convertía en fecha del epoch, mostrada como 31/12/69 en Buenos Aires; valores inválidos producían NaN | Formateador compartido para ambos archivos: «—» ante ausencia/fecha inválida; fechas válidas conservan formato y zona local. Registro original intacto | Suite de archivos verifica null, ausencia y texto inválido en ambos layouts |
| Borrado de un archivo de rachas tenía únicamente «✕» como nombre accesible | `aria-label` traducido y escapado en ambos tipos de tarjeta, sin cambiar apariencia ni acción | Comprobación de etiquetas detectó ausencia antes del ajuste; ahora pasa en español, inglés y japonés junto con pruebas XSS |

La validación de carga es deliberadamente mínima: exige los campos sin los que el
render y el registro de partidos no pueden operar. Los estados históricos conocidos
conservan esas estructuras; siguen admitiéndose preferencias/métricas ausentes y
textos antiguos no interpretables. No es un validador de todos los valores posibles
de JSON. Datos dañados fuera de este contrato necesitan diagnóstico, no normalización
masiva ni sobrescritura automática.

## Problema real pendiente

**Desborde horizontal menor a 320 px con fuente alternativa.** En Chromium, sin
la fuente externa, las cuatro tarjetas de estadísticas de la pantalla principal
ocupan aproximadamente 330 px. Las otras cinco pantallas no desbordan en ese caso.
El flujo de login, campeonato, guardado, recarga, archivos, idiomas y logout funciona
también a 320 px. No se reprodujo ese desborde a 390 ni a 1440 px.

No se modificó CSS: ajustar distribución, partición de etiquetas o tipografía merece
una revisión visual específica en anchos pequeños y varios idiomas. Es un defecto
localizado, no una pérdida de datos. No implica ejecutar ni reemplazar el documento
separado de UX/UI. No se afirma soporte visual completo a 320 px.

## Resultados por área

- **Deporte:** ocho combinaciones de grupos, eliminaciones en las cuatro fases,
  finales directas/penales, campaña entre copas, empates neutros, contador, reinicios
  y Deshacer. Ganar final persiste el nuevo torneo antes de celebrar; recargar no
  vuelve a sumar copa.
- **Persistencia:** copia independiente sin snapshot, una escritura en vuelo,
  versión pendiente más reciente, debounce de preferencias, error visible, reintento,
  descarga de pendientes al salir y bloqueo ante carga inválida.
- **Sesiones:** recuperación inicial, errores de SDK/sesión, login, registro simulado,
  limpieza de pantallas y overlays, invalidación de respuestas tardías y logout.
- **Datos históricos:** fixtures con 60 partidos, cortes de rachas, formatos de penales,
  campos de métricas ausentes y conservación ante texto no reconocido. Archivos como
  fotografías independientes y nombres renderizados literalmente.
- **Seguridad del cliente:** nombres, texto de partidos, IDs y métricas escapados;
  payloads HTML/JS no se ejecutan. No se encontraron claves privilegiadas en archivos
  propios a versionar. La clave pública anon no reemplaza el aislamiento del servidor.
- **Supabase:** operaciones del cliente coherentes con el esquema y permisos
  documentados. RLS en vivo no verificado de manera independiente en esta revisión.
- **Idiomas:** diez idiomas y plantilla con 195 claves y parámetros compatibles;
  fallback español, interpolación literal, etiquetas visuales de final y datos intactos.
  Los textos persistidos siguen en español por compatibilidad.
- **Navegación:** seis pantallas, desktop/mobile, menú de copas estable, cambios de
  ancho, sin escrituras por navegar y sin renders duplicados por clic.
- **Accesibilidad:** foco y teclado de modales, aislamiento `inert`, cancelación antes
  del giro, controles de configuración etiquetados y borrado traducido. No es una
  certificación WCAG ni una prueba con lectores de pantalla físicos.
- **PWA:** manifest válido, iconos decodificables 180/192/512, tema/fondo #272727,
  registro y activación del worker, solo red, 503 de navegación sin caché, errores
  de recursos y recuperación. No se probó instalación nativa en dispositivos físicos.
- **Dependencias:** Supabase JS 2.118.0 y Playwright 1.62.1 fijados. Node >=22 coherente
  con el SDK. Sin actualizaciones de versiones en esta revisión.

## Validación ejecutada

| Comprobación | Resultado |
| --- | --- |
| Batería antes de cambios | 58 tests de lógica y 11 suites de navegador aprobados |
| Batería final | 59 tests de lógica y 11 suites de navegador aprobados |
| Regresión deportiva añadida | Ocho grupos, cuatro eliminaciones y copa mediante siete empates ganados competitivamente |
| Regresiones extendidas | Carga incompleta/fase inválida, recuperación con SDK real, nombres accesibles y fechas de archivos |
| Recorrido directo desktop/mobile | Inicio, login, siete victorias/copa, guardar, recargar, seis pantallas, archivo de temporada y rachas, japonés y logout; datos simulados |
| Anchos | Recorrido a 1440/390/320; suite de copas a 900/1024/1440/1920/390; defecto visual a 320 registrado arriba |
| Instalación limpia | `npm ci` desde package y lock en carpeta aislada: 11 paquetes instalados; npm informó cero vulnerabilidades conocidas |
| Integridad de recursos y documentación | Referencias locales comprobadas, iconos válidos, 15 audios referenciados, sin dependencia de archivos auxiliares de esta computadora |

Entorno: Node 24.14.1 y Chrome instalado indicado por `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.
La falta de paquetes en la caché impidió un intento offline de instalación; la
instalación normal posterior terminó correctamente. Cero vulnerabilidades informadas
por npm no equivale a ausencia garantizada de vulnerabilidades futuras o del servidor.

## Riesgos residuales y verificaciones importantes

1. **Aislamiento real:** contrastar el servidor con la referencia de Supabase y probar
   con dos cuentas desechables y sesión anónima, incluidas peticiones sin filtros del
   cliente. La evidencia exportada respalda permisos/RLS documentados, pero no es una
   prueba en vivo actual. No usar datos históricos para operaciones destructivas.
2. **Integraciones externas:** Google OAuth, correo de confirmación y configuración
   del dominio necesitan comprobación real. OAuth vuelve a producción también desde
   local. Un fallo del CDN puede impedir arrancar; hay error y reintento visibles.
3. **Concurrencia y cierres:** el último estado completo escrito puede reemplazar otro
   cliente. Cambios pendientes en memoria pueden perderse en un cierre forzado. Son
   límites aceptados del uso personal; no se añadió sincronización compleja ni offline.
4. **Archivos independientes:** estado y fotografía no comparten transacción; una
   respuesta ambigua al insertar puede motivar un reintento duplicado. Revisar la lista
   antes de repetir. No se cambiaron contratos ni permisos para añadir idempotencia.
5. **Alcance de plataforma:** faltan instalación PWA física, Safari/Firefox, lectura
   asistida real y audio en cada dispositivo. El fallback offline del worker está en
   español y no carga el motor de traducción. Las cabeceras HTTP del hosting no se
   inspeccionaron; el worker sin Cache Storage no desactiva caché HTTP del servidor.

No se detectó una regresión pendiente del flujo deportivo o de persistencia probado.
Esto no promete ausencia de errores fuera de los casos y plataformas revisados.

## Mejoras opcionales y límites deliberados

Recuperación de contraseña, exportación de datos, prueba automatizada con otros
navegadores y ajustes de anchos pequeños pueden evaluarse por necesidad. No son
prerrequisitos para conservar las reglas y datos actuales. Si crecen el volumen de
historial o la colaboración entre dispositivos, revisar entonces paginación,
versionado, conflictos y modelo estructurado de partidos. No se introdujeron como
arquitectura preventiva.

Se mantienen los términos y decisiones funcionales actuales: empates neutros,
reinicios independientes, archivos que no cierran períodos, selector inicial de
Temporada y Deshacer solo de sesión. No se migró framework ni se rehicieron layouts.

## Limpieza y documentación

- Creada `DOCUMENTACION_TECNICA.md` como referencia principal de mantenimiento.
- Creada esta auditoría final; actualizados README, documentación de Supabase y guía
  de pruebas con comandos, versiones, cobertura y límites actuales.
- Sustituidas referencias de trabajo crípticas por nombres de comportamientos en
  documentos, comentarios y mensajes de pruebas. Los códigos deportivos de octavos,
  cuartos y final permanecen porque son datos de la aplicación.
- Retirado `AUDITORÍA MUNDIALHITO.docx` tras leer sus decisiones y comprobar que están
  recogidas en documentación autosuficiente. No se conserva un diario cronológico
  dentro del repositorio. Se mantuvo una copia de seguridad fuera del proyecto.
- `AUDITORIA UX.UI.docx` permanece byte por byte intacto y reservado para otra etapa.
- Conservados todos los tests y el fixture histórico, package/lock, plantilla de
  idiomas, icono original, variantes PWA y los recursos de celebración/audio.
- Eliminadas tres variables locales sin uso (`rwa`, `rla`, `cca`) de la extracción
  de métricas para archivar. No se eliminaron funciones ni listeners activos.
- No quedaron diagnósticos, SQL, CSV o capturas de esta revisión dentro del proyecto.
  La referencia permanente de Supabase permanece en `docs/SUPABASE.md`.

## Preparación para Git y despliegue

El repositorio conserva aplicación, recursos, documentación y herramientas justificadas.
`node_modules/` está ignorado; package y lock son coherentes y la instalación limpia
fue comprobada. No se encontraron rutas personales accidentales ni credenciales
privilegiadas en los archivos propios. Los scripts temporales y capturas están fuera
del proyecto. No se eliminaron recursos indirectos de idiomas, audio o tests.

Se puede revisar y versionar este estado. El despliegue es estático en la raíz de
HTTPS y tiene el conjunto de archivos indicado en README. Excluir `.git`, dependencias
de desarrollo y documentación del contenido público. Quedan las verificaciones
remotas/plataformas indicadas y el defecto visual de ancho pequeño; no se hizo commit,
push ni deploy y no se considera certificado el entorno de producción.
