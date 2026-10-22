# Mundialhito

Mundialhito registra partidos personales y los convierte en un torneo permanente:
tres partidos de grupos, eliminatorias y una copa al ganar la final. Conserva
estadísticas, actividad, rachas, campañas y archivos de temporadas. Está pensado
para uso personal y pocos usuarios.

Es una aplicación estática en HTML, CSS y JavaScript, con autenticación y datos en
Supabase. Requiere conexión. No tiene compilación, framework ni servidor propio.

## Documentación

- [Documentación técnica](DOCUMENTACION_TECNICA.md): funcionamiento, arquitectura,
  persistencia, compatibilidad, autenticación y mantenimiento.
- [Supabase](docs/SUPABASE.md): esquema, RLS, permisos y límites de la evidencia.
- [Pruebas](tests/README.md): preparación, comandos, cobertura y ampliación.
- [Auditoría final](docs/AUDITORIA_FINAL.md): revisión del estado actual, resultados,
  correcciones y riesgos pendientes.
- `AUDITORIA UX.UI.docx`: revisión visual y de experiencia reservada para otra etapa.

## Desarrollo y pruebas

Requiere Node.js >=22 y npm. Las versiones están fijadas en `package.json` y
`package-lock.json`.

```sh
npm ci
npx playwright install chromium
npm test
```

Para ejecutar la app, servir esta carpeta con un servidor HTTP estático y abrirla
en el navegador. No abrir `index.html` mediante `file://`. El service worker requiere
HTTPS o localhost. El acceso local por correo usa el proyecto Supabase configurado;
Google OAuth vuelve al dominio de producción. Las pruebas automatizadas interceptan
la red y usan datos ficticios, sin escribir en Supabase real.

## Despliegue

Publicar en la raíz de un sitio HTTPS:

- `index.html`, `manifest.json`, `sw.js`;
- `icon-180.png`, `icon-192.png`, `icon-512.png`;
- `i18n/` (motor y diez diccionarios), `celebracion/` y `audio/`.

No se necesita Node en producción. `icon.png` es el original de los iconos y se
conserva para mantenimiento; `i18n/template.js` es una plantilla y no se carga.
El manifest y el registro del service worker usan `/`: publicar en un subdirectorio
requiere revisar rutas expresamente. El SDK usa jsDelivr con versión fija y la
fuente Nunito usa Google Fonts; esos servicios necesitan estar accesibles.

Excluir del sitio publicado `.git/`, `node_modules/`, tests, documentación, Word
y archivos npm. En Git sí se conservan las pruebas, documentación y ambos archivos
npm; `node_modules/` está excluido mediante `.gitignore` y se reconstruye con `npm ci`.
No hay secretos administrativos requeridos por el cliente. La clave pública anon
incluida en el HTML depende de RLS y permisos correctos en el servidor.

Antes de publicar, ejecutar las pruebas y revisar los límites de validación remota
en la auditoría final. No cambiar políticas, formatos históricos ni versiones de
dependencias como parte incidental de un despliegue.
