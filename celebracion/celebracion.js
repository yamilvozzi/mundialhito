// ── CELEBRACIÓN: MOTOR DE CELEBRACIÓN POR NACIONALIDAD ────────────────
// Desacoplado de los datos por país (ver celebracion/paises-data.js) y del
// resto de la app — no depende de `state` ni de ningún otro módulo: recibe
// las preferencias (celebracionesActivas, sonidoActivo, volumenSonido) como
// parámetros explícitos, siguiendo el mismo espíritu que i18n.js.
//
// Uso:
//   CELEBRACION.registrarPais('AR', { colores: [...], himno: 'audio/himnos/AR.mp3' })
//   CELEBRACION.celebrar(state.nacionalidad, {
//     celebracionesActivas: state.celebracionesActivas,
//     sonidoActivo: state.sonidoActivo,
//     volumenSonido: state.volumenSonido
//   })
//   CELEBRACION.detener()   // corta audio y limpia el confetti (ej. al cerrar el modal)
//
// Agregar un país nuevo NO requiere tocar este archivo: solo se agrega una
// entrada en celebracion/paises-data.js. Si un país no tiene entrada
// registrada (o no tiene "himno"), se usa una celebración genérica:
// confetti con los colores de marca de la app (leídos en vivo desde las
// CSS custom properties, para no duplicar hex codes acá) y sin audio.
(function (global) {
  'use strict';

  const PAISES_DATA = {};   // se completa vía registrarPais() desde paises-data.js
  const DURACION_MS = 10000; // duración mínima de la caída del confetti (10s) — acompaña la duración típica de los himnos
  const RECICLADO_CORTE_MS = 1200; // ms antes del final en que se deja de reciclar partículas, para que la lluvia se apague gradualmente
  const CANTIDAD_PARTICULAS = 140;

  let canvas = null;
  let ctx = null;
  let animationFrameId = null;
  let audioActual = null;
  let particulas = [];
  let inicioAnimacion = 0;

  function registrarPais(code, data) {
    PAISES_DATA[code] = data;
  }

  function get(code) {
    return PAISES_DATA[code] || null;
  }

  // Lee los colores de marca directamente de las CSS custom properties
  // (--yellow, --text, --text-sec), para que la celebración genérica se
  // mantenga sincronizada si la paleta de la app cambia, sin duplicar
  // valores hexadecimales en este archivo.
  function coloresGenericos() {
    const estilos = getComputedStyle(document.documentElement);
    const amarillo = estilos.getPropertyValue('--yellow').trim() || '#FFE033';
    const hueso    = estilos.getPropertyValue('--text').trim() || '#F0EDE6';
    const gris     = estilos.getPropertyValue('--text-sec').trim() || '#C0BCB5';
    return [amarillo, hueso, gris];
  }

  function crearCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'celebracionCanvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '8600'; // por encima del modal-overlay (8000) y del champion-modal
    document.body.appendChild(canvas);
    resizeCanvas();
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function crearParticulas(colores) {
    particulas = [];
    for (let i = 0; i < CANTIDAD_PARTICULAS; i++) {
      particulas.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.5,
        w: 6 + Math.random() * 5,
        h: 9 + Math.random() * 6,
        color: colores[Math.floor(Math.random() * colores.length)],
        velY: 2.2 + Math.random() * 2.6,
        velX: (Math.random() - 0.5) * 1.6,
        rot: Math.random() * 360,
        velRot: (Math.random() - 0.5) * 10
      });
    }
  }

  function tick(timestamp) {
    if (!inicioAnimacion) inicioAnimacion = timestamp;
    const transcurrido = timestamp - inicioAnimacion;
    const quedan = DURACION_MS - transcurrido;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(function (p) {
      p.x += p.velX;
      p.y += p.velY;
      p.rot += p.velRot;

      // Si la partícula ya cruzó el piso del canvas, se recicla arriba con
      // una nueva posición/velocidad aleatoria — así la lluvia de confetti
      // se mantiene activa durante toda la duración en vez de una sola
      // tanda que se vacía a mitad de la celebración. Cerca del final se
      // deja de reciclar para que la caída se apague de forma natural.
      if (p.y - p.h / 2 > canvas.height && quedan > RECICLADO_CORTE_MS) {
        p.x = Math.random() * canvas.width;
        p.y = -20 - Math.random() * 80;
        p.velY = 2.2 + Math.random() * 2.6;
        p.velX = (Math.random() - 0.5) * 1.6;
        p.rot = Math.random() * 360;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (transcurrido < DURACION_MS) {
      animationFrameId = requestAnimationFrame(tick);
    } else {
      limpiarConfetti();
    }
  }

  function limpiarConfetti() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    inicioAnimacion = 0;
    if (canvas) {
      window.removeEventListener('resize', resizeCanvas);
      canvas.remove();
      canvas = null;
      ctx = null;
    }
    particulas = [];
  }

  function lanzarConfetti(colores) {
    limpiarConfetti(); // por si quedó una celebración anterior sin cerrar prolijamente
    crearCanvas();
    crearParticulas(colores);
    animationFrameId = requestAnimationFrame(tick);
  }

  function reproducirHimno(ruta, volumen) {
    try {
      const audio = new Audio(ruta);
      audioActual = audio;
      audio.volume = Math.max(0, Math.min(1, (volumen != null ? volumen : 70) / 100));
      // Si el archivo no existe o falla la carga, no debe romper nada más.
      audio.addEventListener('error', function () { /* no-op */ });
      // Si el himno termina de sonar solo (6-12s) antes de que el usuario
      // cierre el modal, liberamos la referencia y el buffer decodificado
      // de inmediato, sin esperar al click en "Continuar" (→ detener()).
      audio.addEventListener('ended', function () {
        if (audioActual === audio) {
          audio.src = '';
          audioActual = null;
        }
      });
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          // Reproducción bloqueada (política de autoplay del navegador) o
          // archivo faltante. Se ignora: el confetti sigue funcionando igual.
        });
      }
    } catch (e) {
      // No-op — un país sin audio válido no debe interrumpir la celebración.
    }
  }

  // Dispara la celebración para un país. Si el país no está registrado (o
  // le falta algún dato), cae automáticamente a la celebración genérica.
  function celebrar(codigoPais, opciones) {
    opciones = opciones || {};
    const celebracionesActivas = opciones.celebracionesActivas !== false;
    const sonidoActivo = opciones.sonidoActivo !== false;
    const volumenSonido = opciones.volumenSonido;

    const datosPais = get(codigoPais);
    const colores = (datosPais && datosPais.colores && datosPais.colores.length)
      ? datosPais.colores
      : coloresGenericos();

    if (celebracionesActivas) {
      lanzarConfetti(colores);
    }

    if (sonidoActivo && datosPais && datosPais.himno) {
      reproducirHimno(datosPais.himno, volumenSonido);
    }
  }

  // Corta el audio (si está sonando) y limpia el confetti. Pensado para
  // llamarse al cerrar el modal de campeón o al salir de la sesión.
  function detener() {
    limpiarConfetti();
    if (audioActual) {
      try {
        audioActual.pause();
        audioActual.currentTime = 0;
        audioActual.src = ''; // libera el buffer decodificado sin esperar al GC
      } catch (e) { /* no-op */ }
      audioActual = null;
    }
  }

  global.CELEBRACION = {
    registrarPais: registrarPais,
    get: get,
    celebrar: celebrar,
    detener: detener
  };
})(window);
