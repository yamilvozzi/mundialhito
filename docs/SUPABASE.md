# Supabase de Mundialhito

Referencia de las tres tablas, políticas y permisos que utiliza el cliente.
Describe la configuración documentada; no es una migración ni una orden para
recrear tablas. No contiene registros de usuarios ni credenciales administrativas.
Antes de cambiar el servidor, contrastar esta referencia con sus catálogos actuales.

## Alcance y evidencia disponible

El responsable confirmó la aplicación de los permisos restringidos y el
funcionamiento de carga, guardado, preferencias y archivos. Una exportación de
permisos efectivos confirmó las seis combinaciones tabla/rol indicadas abajo,
con RLS habilitado. No se dispone de una prueba independiente completa de acceso
con dos cuentas distintas y una sesión anónima. La revisión local del 22 de octubre
de 2026 no consultó ni modificó el servidor; las pruebas simulan sus respuestas.

La evidencia de estructura cubre las tres tablas de `public`, los objetos públicos
consultados y los triggers no internos de esas tablas y `auth.users`. No certifica
otros servicios ni esquemas. La lista de esquemas expuestos por Data API no está
verificada; revisarla si se incorporan esquemas o funciones accesibles por API.

## Esquema conservado

Las tres tablas pertenecen a `postgres`. `id` es UUID, PRIMARY KEY, con
`gen_random_uuid()` por defecto. Todos los `user_id` son UUID NOT NULL y claves
foráneas validadas a `auth.users(id) ON DELETE CASCADE`.

| Tabla | Columnas específicas | Uso del cliente |
| --- | --- | --- |
| `game_state` | `user_id` UNIQUE; `state jsonb NOT NULL DEFAULT '{}'`; `updated_at timestamptz DEFAULT now()`, admite NULL | SELECT por usuario y upsert del estado completo |
| `seasons` | `name text NOT NULL`; `jugados`, `ganados`, `perdidos`, `empatados`, `copas`: integer DEFAULT 0, admiten NULL; `created_at timestamptz DEFAULT now()`, admite NULL | SELECT, INSERT y DELETE de temporadas archivadas |
| `racha_seasons` | `name text NOT NULL`; `data jsonb NOT NULL DEFAULT '{}'`; `created_at timestamptz DEFAULT now()`, admite NULL | SELECT, INSERT y DELETE de etapas de rachas archivadas |

Ningún `user_id` tiene valor por defecto. Los campos temporales permiten NULL; el
DEFAULT no impide que un registro anterior tenga NULL. No hay UNIQUE por usuario
en los dos archivos: cada usuario puede conservar varios registros.

Constraints de la exportación real: `game_state_pkey`, `game_state_user_id_key`,
`game_state_user_id_fkey`, `seasons_pkey`, `seasons_user_id_fkey`,
`racha_seasons_pkey`, `racha_seasons_user_id_fkey`; todas validadas.
Los cuatro índices únicos btree corresponden a las tres PK y al UNIQUE de
`game_state.user_id`. Las restricciones NOT NULL de las columnas siguen siendo necesarias además de
estas claves e índices.

Eliminar administrativamente una cuenta puede borrar por cascada su estado y todos
sus archivos. La app no expone eliminación administrativa de usuarios. No usar
cuentas con datos históricos para probar borrados ni recrear tablas para limpiar.

## RLS y políticas

RLS está habilitado y FORCE RLS es false en las tres tablas. Las siete políticas
son PERMISSIVE y se aplican al rol PUBLIC. En la tabla siguiente, `propio` significa
`auth.uid() = user_id`; `—` indica una expresión omitida en la definición exportada.

| Tabla | Nombre de política | Operación | USING | WITH CHECK |
| --- | --- | --- | --- | --- |
| `game_state` | usuario ve su propio estado | SELECT | propio | — |
| `game_state` | usuario inserta su propio estado | INSERT | — | propio |
| `game_state` | usuario actualiza su propio estado | UPDATE | propio | — |
| `seasons` | usuario ve sus temporadas | SELECT | propio | — |
| `seasons` | usuario inserta sus temporadas | INSERT | — | propio |
| `seasons` | usuario borra sus temporadas | DELETE | propio | — |
| `racha_seasons` | Users can manage their own racha_seasons | ALL | propio | propio |

En UPDATE de `game_state`, WITH CHECK omitido hereda USING. Las policies no permiten
reasignar el propietario a otra cuenta. PUBLIC no significa acceso a todas las
filas: sin sesión, UID nulo no satisface la condición. Los filtros `user_id` del
frontend son complementarios; el aislamiento está en RLS y los permisos del servidor.
La policy ALL de `racha_seasons` se conserva, pero el grant final no permite UPDATE.

## Permisos finales y evidencia

Esta tabla transcribe las seis filas verificadas tras la intervención. En todas,
`rls_enabled=true` y `coincide_con_propuesta=true`.

| Tabla | Rol | Permisos efectivos verificados |
| --- | --- | --- |
| `game_state` | anon | Ninguno |
| `game_state` | authenticated | SELECT, INSERT, UPDATE |
| `seasons` | anon | Ninguno |
| `seasons` | authenticated | SELECT, INSERT, DELETE |
| `racha_seasons` | anon | Ninguno |
| `racha_seasons` | authenticated | SELECT, INSERT, DELETE |

La verificación comprobó SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES,
TRIGGER y MAINTAIN mediante permisos efectivos, incluida herencia. Los reinicios
actualizan `game_state`; no requieren DELETE. Los archivos no necesitan UPDATE.
La autenticación mediante Supabase Auth no requiere acceso de anon a estas tablas.

Los permisos amplios de tabla no son necesarios para esta aplicación. No conceder
TRUNCATE, REFERENCES, TRIGGER ni MAINTAIN a anon/authenticated como solución a un
error del cliente. El estado necesita upsert; los archivos necesitan insertar,
consultar y borrar. Una modificación de grants no recupera datos eliminados.

## Roles y objetos del servidor

- anon y authenticated no son propietarios, superusuarios ni BYPASSRLS, no tienen
  LOGIN y sus membresías exportadas no les conceden otros roles. Que authenticator
  pueda asumirlos es parte del funcionamiento de la API; la relación no es inversa.
- service_role conserva BYPASSRLS. La clave del frontend declara rol anon.
  No se cambian roles del sistema, postgres ni service_role.
- En `public`, anon/authenticated tienen USAGE y no CREATE. El esquema pertenece
  a `pg_database_owner`; su ACL de referencia es
  `{pg_database_owner=UC/pg_database_owner,=U/pg_database_owner,postgres=U/pg_database_owner,anon=U/pg_database_owner,authenticated=U/pg_database_owner,service_role=U/pg_database_owner}`.
- Las secciones de triggers no internos, funciones públicas/de esos triggers y
  vistas/materializadas públicas devolvieron listas vacías. Esta evidencia no garantiza que no se hayan añadido objetos posteriormente.
- Se preservaron default privileges de postgres y supabase_admin en public:
  para ambos propietarios y los roles postgres/anon/authenticated/service_role,
  tablas `arwdDxtm`, secuencias `rwU`, funciones `X`, sin grant option. Esos defaults
  amplios deben revisarse al introducir objetos nuevos; los permisos restringidos de esta referencia se aplican
  a las tres tablas existentes.

No se identificó una vía de acceso cruzado entre cuentas en lo exportado. El exceso
de grants fue una reducción preventiva acotada, no una filtración demostrada.

## Compatibilidad y futuras verificaciones

`game_state.state` conserva el objeto completo; `racha_seasons.data` son fotografías
de las métricas, y `seasons` conserva sus acumulados por columnas. No se recalculan
archivos históricos ni se introduce versionado o un sistema de migraciones sin una
necesidad concreta. Las claves JSON, formatos anteriores, `rachaResetIndex`, el
contador antiguo y la cadena histórica española `Gran Final` tienen cobertura en
la suite. `FINAL` sigue siendo el identificador interno; su etiqueta visual se traduce.

Archivar no cierra ni reinicia un período. Reiniciar rachas inicia un período de
medición nuevo incluso con un torneo en curso, por decisión funcional aceptada.
El snapshot de Deshacer es deportivo y de sesión, no se persiste. El guardado de
partidos es inmediato, los errores son visibles y logout espera escrituras pendientes.
No se implementaron control de concurrencia entre dispositivos/pestañas ni
recuperación durable ante cierre forzado, conforme al alcance personal acordado.

Si cambia la estructura o los permisos, volver a consultar catálogos y comparar con
esta referencia. Verificar carga/recarga en una cuenta existente sin alterar sus
históricos; usar cuentas y registros desechables A/B para INSERT/UPDATE/DELETE y
comprobar que una sesión no puede consultar ni modificar datos ajenos, incluso sin
el filtro del frontend. Sin sesión, el acceso a las tres tablas debe ser denegado.
No usar TRUNCATE ni eliminar cuentas históricas como pruebas.
