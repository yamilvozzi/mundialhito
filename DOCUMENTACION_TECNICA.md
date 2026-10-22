# Documentación técnica de Mundialhito

Referencia del funcionamiento actual para mantener, probar y desplegar la app.
Mundialhito es un registro personal de partidos con un torneo ficticio superpuesto.
La solución está dimensionada para pocos usuarios: JavaScript clásico, un estado
por cuenta y persistencia en Supabase. No requiere reconstruir un proceso de trabajo
previo para comprender sus decisiones.

## Modelo deportivo y pantallas

Un **torneo** comienza con tres partidos de grupos. Dos o tres victorias competitivas
clasifican a octavos; con menos se vuelve a grupos. Después se juegan octavos,
cuartos, semifinal y final. Perder una eliminatoria reinicia el torneo. Ganar la
final suma una **copa** y deja preparado un nuevo torneo antes de guardar o celebrar.

Se distinguen resultado estadístico y competitivo. Un empate suma a empatados,
y una moneda decide victoria/derrota competitiva, también en grupos. Se puede
cancelar antes de girar; después del giro hay que confirmar el resultado. Los empates
son neutros para las rachas: victoria, empate, victoria equivale a dos victorias
de racha. La moneda es un recurso recreativo, no un mecanismo de azar certificado.

La **campaña** cuenta partidos hasta la próxima copa e incluye torneos fallidos.
La copa más rápida/lenta mide ese intervalo. Reiniciar rachas abre otro período
de medición, aunque el torneo esté en curso; una copa de ese período puede abarcar
menos de siete partidos. Es un comportamiento deliberado.

| Pantalla | Contenido |
| --- | --- |
| Mundialhito | Totales, torneo actual, registrar resultado, Deshacer y copas |
| Actividad | Últimos 20 partidos visibles y plan de 10 |
| Historial | Fotografías de estadísticas de temporadas |
| Rachas | Rachas, intervalos entre copas, campaña y finales del período |
| Historial de Rachas | Fotografías de récords y finales archivados |
| Configuración | Nombre, nacionalidad, idioma, celebración, sonido y volumen |

**Archivar** inserta una fotografía con nombre; no cierra ni reinicia ningún período.
La selección inicial del diálogo es Temporada incluso desde Rachas. Una temporada
archivada guarda totales, no una copia de todos los partidos. El archivo de rachas
guarda récords y finales, no rachas actuales ni campaña abierta.

El plan opcional representa diez partidos prepagados: `contadorRenov` guarda 1..11,
y la interfaz muestra 0..10 completados. El partido siguiente a diez inicia otro
ciclo con uno completado. Renovar manualmente vuelve a cero visible.

## Organización real

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| `index.html` | CSS, SVG, dos layouts, pantallas, estado global, auth, persistencia, reglas, render y eventos |
| `i18n/i18n.js` | Registro de diccionarios, traducción, interpolación y notificaciones de idioma |
| `i18n/es.js` y otros nueve idiomas | Textos de interfaz |
| `i18n/template.js` | Base completa en español para mantener/agregar idiomas; no se carga en producción |
| `celebracion/celebracion.js` | Confeti, reproducción de audio y limpieza de recursos |
| `celebracion/paises-data.js`, `audio/himnos/` | Colores y fragmentos de himnos de 15 países |
| `manifest.json`, `sw.js`, iconos | Metadatos e integración PWA |
| `tests/` y archivos npm | Suite permanente y dependencias reproducibles de desarrollo |
| `docs/`, este documento y README | Mantenimiento, evidencia y despliegue |

Se cargan scripts clásicos en orden: SDK, motor i18n, diccionarios, celebración,
datos de países y script inline de la aplicación. No hay bundler ni módulos ES.
`state` es el estado en memoria; `currentUser`, `estadoCargadoUsuario` y
`cargaEstadoVersion` vinculan las operaciones con la sesión válida.

Las reglas están en `procesarResultado`; `renderizar` dibuja estadísticas, torneo,
plan y actividad. Hay renders específicos de configuración, rachas y archivos.
La navegación comparte `destinosNavegacion`, `activarPantalla` y listeners; conserva
seis sidebars y layouts duplicados. El mismo bloque de copas se mueve a la posición
estable de la sidebar activa. El cambio desktop/mobile está en 900 px.

Los diálogos comparten apertura/cierre, foco, Tab/Shift+Tab, Escape y `inert` para
el fondo. El giro comprometido no admite cancelación. Al invalidar sesión se cierran
diálogos y audio, se limpian campos y listas y se descartan respuestas tardías.
Los controles de configuración se renderizan en ambos layouts desde el mismo estado.

## Datos en Supabase

- `game_state`: una fila por `user_id` mediante UNIQUE. `state` contiene torneo,
  totales, copas, historial, plan, rachas y preferencias. `updated_at` lo escribe el
  cliente; no es un control de concurrencia.
- `seasons`: varias fotografías por usuario, con nombre y totales por columnas.
- `racha_seasons`: varias fotografías por usuario, con nombre y métricas en `data`.

Las tres tienen UUID y FK a `auth.users(id) ON DELETE CASCADE`: eliminar una cuenta
administrativamente elimina también sus registros. La app no ofrece esa operación.

RLS restringe filas mediante `auth.uid() = user_id`. `anon` no tiene permisos de tabla;
`authenticated` tiene SELECT/INSERT/UPDATE en estado y SELECT/INSERT/DELETE en
ambos archivos. Los filtros del cliente refuerzan la intención pero no reemplazan
la seguridad del servidor. La clave anon del HTML es pública; nunca agregar claves
service_role o administrativas al cliente, tests o documentación.

El [documento de Supabase](docs/SUPABASE.md) contiene columnas, defaults, índices,
políticas exactas, permisos, roles y alcance de la evidencia. Describe la configuración
documentada, no certifica que el servidor no haya cambiado. Falta una comprobación
independiente completa con dos cuentas y una sesión anónima contra el servicio real.

## Carga, guardado y errores

`inicializar` configura el listener de autenticación y consulta `getSession`.
Con sesión, `cargarYMostrarApp` llama a `cargarEstado` antes de habilitar la app.
La consulta filtra `game_state` por usuario y debe devolver cero o una fila.
Solo una lista vacía exitosa representa usuario nuevo. Un error, varias filas,
estado vacío, fase desconocida o ausencia de los tres arrays deportivos bloquea
la carga y el guardado. Se ofrece Reintentar o salir; no se sustituye por un estado
vacío ni se rellenan datos deportivos. Los arrays esenciales son `fgResultados`,
`eliminatoriasDone` e `historial`. La validación es mínima, no un esquema exhaustivo
para cualquier JSON arbitrario; no reparar datos dañados sin revisar su origen.

Se completan preferencias ausentes compatibles y se reconstruyen rachas en memoria
cuando el historial es interpretable. Leer no provoca un guardado. La carga y las
operaciones asíncronas llevan una versión de sesión; una respuesta vieja no habilita
ni modifica otra sesión, incluso de la misma cuenta.

`guardar` toma una copia independiente de `state`, excluye `snapshot` y hace upsert
por `user_id`. La cola admite una escritura en vuelo y retiene la versión pendiente
más reciente. Los partidos guardan inmediatamente; las preferencias habituales usan
800 ms de debounce. El nombre de perfil espera guardado desde su diálogo.

El estado visible informa Guardando, Guardado o Error. Un error conserva los cambios
en memoria y ofrece reintento; no anuncia éxito ni celebra una final fallida. Otra
acción posterior puede enviar el estado actualizado. La celebración no se recupera
como evento pendiente al recargar o reintentar; la copa sí queda en el estado guardado.

Logout bloquea interacción, vacía pendientes y espera confirmación antes de cerrar
sesión. Si guardar falla, conserva la sesión y los cambios. Una invalidación externa
limpia la sesión y avisa si había cambios sin confirmar. `beforeunload` advierte y
adelanta el envío; pasar a segundo plano también vacía debounce. El navegador puede
interrumpirlo: **no hay garantía durable ante cierre forzado ni funcionamiento offline**.

Los archivos usan INSERT/SELECT/DELETE separados del guardado de estado. No existe
transacción conjunta entre ambas operaciones. Un archivo puede representar cambios
locales todavía no confirmados si el guardado de estado falló. Ante respuesta de red
ambigua al archivar, revisar la lista antes de repetir: no hay clave de idempotencia.
Los errores de consulta/borrado se muestran; volver a abrir la pantalla repite la lectura.

## Compatibilidad y Deshacer

El historial persiste entradas `{res, draw, texto}` con texto deportivo español.
No traducir ni reescribir esos datos por uniformidad. La interfaz traduce sus etiquetas,
pero los partidos guardados conservan `Gran Final`, las frases de penales y los códigos
de fase `FG`, `E8`, `E4`, `SF`, `FINAL`. Los dos últimos códigos numéricos significan
octavos y cuartos, no referencias documentales. `FINAL` solo se traduce visualmente.

`interpretarPartidoHistorico` reconoce textos con o sin fecha, penales antiguos con
`res` win/loss y los posteriores con `res` draw. `reconstruirRachasDesdeHistorial`
parte de `rachaResetIndex`. Si encuentra una entrada contradictoria, desconocida o
un corte inválido, conserva los acumuladores existentes; no adivina una reconstrucción
parcial. Las fotografías archivadas nunca se recalculan. El historial completo se
conserva aunque Actividad solo muestre los últimos 20.

`crearSnapshotPartido` conserva únicamente los datos deportivos anteriores, longitud
del historial, plan y métricas necesarias. No anida snapshots ni copia el historial
completo. Permite deshacer **un partido en la sesión actual** y no se persiste.
El botón puede seguir visible tras recargar; informa que no hay nada que deshacer.
Preferencias posteriores se conservan. Un reinicio posterior de rachas también se
conserva, ajustando el corte si se quita el último partido. La renovación manual
del plan se conserva. Los reinicios de torneo/estadísticas invalidan Deshacer.

Reiniciar torneo conserva totales y rachas. «Reiniciar todo» reinicia torneo,
estadísticas principales y copas; conserva historial, plan, rachas y preferencias,
como explica su confirmación. Los archivos se eliminan únicamente mediante su
acción específica. Las fechas ausentes o inválidas se muestran como «—» sin
modificar el registro; las fechas válidas usan el formato local día/mes/año corto.

No hay versionado formal del JSON ni migraciones automáticas. Cualquier formato
nuevo requiere estudiar estados antiguos y sus fixtures antes de modificar datos.

## Autenticación y producción

Se ofrecen correo/contraseña, registro y Google OAuth. El registro sin sesión
muestra la indicación de confirmar el correo. El SDK recupera y renueva sesión;
`SIGNED_OUT` limpia el cliente y `TOKEN_REFRESHED` actualiza al usuario vigente.
La cola deportiva no es una copia local durable; el almacenamiento de sesión del
SDK y la preferencia de idioma tienen fines diferentes.

La redirección OAuth está fijada en `https://mundialhito.vercel.app/`, también cuando
se abre el cliente local. Revisar la URL y la allowlist de Supabase si cambia el
dominio; no cambiarlo incidentalmente. El proveedor Google, correos y configuración
real de Auth requieren validación con el servicio. No hay flujo propio de recuperación
de contraseña; incorporarlo sería una funcionalidad separada.

Si falta el SDK, falla su creación o la obtención inicial de sesión, se muestra
un error de inicio con foco en Reintentar. Ese botón recarga la página. Las credenciales
y nombres se insertan como texto, y los valores archivados/históricos se escapan al
renderizar. Los nombres accesibles de borrado se traducen sin alterar las tarjetas.

## Dependencias y actualización

Supabase JS **2.118.0** está fijado en el CDN de `index.html` y como dependencia de
desarrollo. Playwright **1.62.1** es solo desarrollo. `package-lock.json` fija además
versiones transitivas e integridades. Node **>=22** es el mínimo de desarrollo porque
el SDK lo requiere; Playwright por sí solo admite una versión menor. No rebajar el
requisito por el hecho de que npm pueda instalar con advertencias. Node no ejecuta
la aplicación en producción.

Se evitan URLs flotantes para que una actualización externa no cambie el SDK sin
pruebas. Para actualizar: revisar notas oficiales y requisitos, elegir versión
explícita, actualizar package y lock mediante npm, sincronizar la URL del HTML y
la suite de inicio, instalar desde cero y ejecutar toda la batería. Validar después
inicio, sesión, carga, guardado y recarga. No usar `npm audit fix --force` a ciegas.
La fuente Nunito se obtiene de Google Fonts, con fallback sans-serif del sistema.

## PWA y celebraciones

El manifest usa `start_url: /`, `display: standalone`, orientación portrait y color
`#272727` tanto para tema como fondo, coherente con HTML y CSS. Iconos: 192×192 y
512×512 (`any maskable`), Apple 180×180, favicon 512×512. `icon.png` (774×774) es el
original conservado. No se rediseña la identidad para generar variantes técnicas.

`sw.js` activa con `skipWaiting` y reclama clientes. Intercepta con política solo
red, sin precache ni Cache Storage. Preserva respuestas HTTP, incluidos 404/500.
Si el transporte falla en navegación devuelve HTML español 503 `no-store`; en
JS/CSS/imágenes/fuentes/API devuelve error de red. Al volver internet consulta otra
vez. Esto no desactiva el caché HTTP normal del navegador/CDN; revisar cabeceras del
hosting al publicar, especialmente HTML y worker. La instalación real depende del
navegador/plataforma y no queda certificada por validar el manifest.

País e idioma son independientes. Las celebraciones reciben preferencias explícitas;
los países sin datos usan colores de marca y no reproducen audio. El audio opcional
consulta HEAD antes de reproducir. Confeti y sonido tienen interruptores separados.
El avance de audio mantiene un temporizador de seguridad; sin progreso o audio se
detiene la emisión. Cerrar el modal/sesión limpia audio, canvas y listeners.
Las políticas de autoplay pueden bloquear sonido sin impedir registrar la copa.

## Idiomas

Diez diccionarios: es, ca, en, fr, pt, it, de, zh, ja y ko; **195 claves** por idioma
y plantilla. Español es la base. Una clave ausente cae a español; si tampoco existe,
se devuelve la propia clave. Un código de idioma desconocido cae a español.
`{{parametro}}` se interpola como texto literal, incluso valores con símbolos `$`.

`data-i18n`, `data-i18n-placeholder`, `data-i18n-title` y `data-i18n-aria-label`
actualizan el DOM. Los renders dinámicos usan `I18N.t` y listeners de idioma.
`state.idioma` es la preferencia de cuenta; `mundialhito_idioma` en localStorage solo
permite mostrar el login en el último idioma elegido. No contiene datos deportivos.

Para cambiar textos, mantener claves y parámetros en los diez diccionarios y en
`template.js`. Para agregar idioma, copiar la plantilla, traducir, registrar su
código, cargarlo en el head y agregarlo a `IDIOMAS`; ampliar las listas de idiomas
de las pruebas. Añadir país requiere también sus traducciones y, si corresponde,
colores/audio. Validar texto largo, nombres accesibles y ambos layouts. El historial
persistido queda fuera de estas traducciones por compatibilidad.

## Pruebas y mantenimiento

[tests/README.md](tests/README.md) contiene instalación con `npm ci`, Chromium,
comandos, fixtures y guía para agregar pruebas. `npm test` ejecuta 59 tests de lógica
y 11 suites de navegador. Se conservan por su valor permanente. El runner no necesita
rutas locales particulares ni credenciales; puede usar Chromium descargado o uno
indicado por variable de entorno.

## Decisiones y límites

- Mantener Vanilla JS y la estructura actual mientras no exista una necesidad
  concreta de separación; no migrar framework ni reconstruir sidebars por estética.
- Preservar formatos y datos históricos, fotografías y reglas de reinicio.
- Requerir conexión; no agregar caché offline completo ni recuperación durable.
- No resolver concurrencia multi-dispositivo/pestañas: dos copias del estado pueden
  sobrescribirse. Evitar editar simultáneamente desde más de un cliente.
- No introducir migraciones, transacciones distribuidas o arquitectura de gran escala
  para este uso personal. Evaluarlas solo ante una necesidad comprobada.

La [auditoría final](docs/AUDITORIA_FINAL.md) separa defectos comprobados, riesgos
aceptados y mejoras opcionales. El pendiente visual comprobado a 320 px no impide
el flujo, pero conviene revisarlo antes de prometer soporte a ese ancho. RLS en vivo,
OAuth, correos, instalación física y navegadores distintos requieren pruebas propias.
La auditoría UX/UI permanece en un Word separado y no forma parte de estas decisiones.
