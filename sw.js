// Mundialhito — Service Worker (solo red, sin caché)
// Propósito: habilitar instalación como PWA. No cachea nada para evitar
// que los usuarios vean versiones desactualizadas después de un deploy.

self.addEventListener('install', function(event) {
  // Activar inmediatamente sin esperar a que se cierren otras pestañas
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Tomar control de todas las pestañas abiertas de inmediato
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Solo red: conservar las respuestas HTTP (también 4xx/5xx).
  // Ante un fallo de transporte, el HTML alternativo solo corresponde
  // a navegaciones; scripts, estilos, imágenes y API deben fallar como red.
  event.respondWith(
    fetch(event.request).catch(function() {
      if (event.request.mode !== 'navigate') return Response.error();
      return new Response(
        '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sin conexión — Mundialhito</title></head><body style="font-family:sans-serif;background:#272727;color:#F0EDE6;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><p style="text-align:center;opacity:0.6;">Sin conexión.<br>Volvé a intentarlo cuando tengas internet.</p></body></html>',
        { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
      );
    })
  );
});
