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
  const FALLBACK_MS = 15000; // salvavidas: si el evento 'ended' del himno nunca se dispara
  // (audio bloqueado, archivo faltante, error de carga, país sin himno o con sonido
  // desactivado), este timeout corta la EMISIÓN de confetti a los ~15s. En el caso
  // normal, la emisión se corta cuando el himno termina — ver reproducirHimno()
  // → 'ended' → detenerEmision(). Las partículas ya generadas siguen cayendo solas,
  // sin desaparecer de golpe — ver tick(), final en cascada natural.
  const CANTIDAD_PARTICULAS = 140;

  let canvas = null;
  let ctx = null;
  let animationFrameId = null;
  let audioActual = null;
  let solicitudHimno = 0;
  let particulas = [];
  let inicioAnimacion = 0;
  let emisionActiva = false;     // true mientras deben seguir generándose partículas nuevas
  let fallbackTimeoutId = null;  // id del setTimeout de salvavidas (ver FALLBACK_MS)

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
    const emitiendo = emisionActiva;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let quedanCayendo = false;

    particulas.forEach(function (p) {
      p.x += p.velX;
      p.y += p.velY;
      p.rot += p.velRot;

      const salioDePantalla = p.y - p.h / 2 > canvas.height;

      if (salioDePantalla) {
        if (emitiendo) {
          // Mientras dure la emisión, la partícula que sale por abajo se
          // recicla arriba con una nueva posición/velocidad aleatoria —
          // así la lluvia de confetti se mantiene continua durante toda
          // la duración, en vez de agotarse a mitad de camino.
          p.x = Math.random() * canvas.width;
          p.y = -20 - Math.random() * 80;
          p.velY = 2.2 + Math.random() * 2.6;
          p.velX = (Math.random() - 0.5) * 1.6;
          p.rot = Math.random() * 360;
        }
        // Si ya no se está emitiendo, la partícula que salió queda fuera
        // de juego — no se recicla ni se vuelve a contar como visible.
      } else {
        quedanCayendo = true;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    // Mientras dure la emisión, siempre se sigue animando (hay reciclado
    // continuo, nunca se vacía la pantalla). Terminada la emisión, la
    // animación se sostiene solo hasta que la última partícula ya emitida
    // termine de salir de pantalla por su cuenta — así la celebración se
    // apaga como una cascada natural, sin desapariciones bruscas.
    if (emitiendo || quedanCayendo) {
      animationFrameId = requestAnimationFrame(tick);
    } else {
      limpiarConfetti();
    }
  }

  function limpiarConfetti() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    inicioAnimacion = 0;
    emisionActiva = false;
    if (fallbackTimeoutId) { clearTimeout(fallbackTimeoutId); fallbackTimeoutId = null; }
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
    emisionActiva = true;
    crearCanvas();
    crearParticulas(colores);
    animationFrameId = requestAnimationFrame(tick);
  }

  // Corta la EMISIÓN de partículas nuevas (no borra las que ya están cayendo,
  // que terminan de salir de pantalla solas — ver tick()). Se invoca cuando
  // termina el himno ('ended' en reproducirHimno) o, como salvavidas, a los
  // FALLBACK_MS si ese evento nunca llega. Segura frente a llamadas repetidas.
  function detenerEmision() {
    if (fallbackTimeoutId) { clearTimeout(fallbackTimeoutId); fallbackTimeoutId = null; }
    emisionActiva = false;
  }

  function reproducirHimno(ruta, volumen) {
    try {
      const audio = new Audio(ruta);
      audioActual = audio;
      audio.volume = Math.max(0, Math.min(1, (volumen != null ? volumen : 70) / 100));
      // Si el archivo no existe o falla la carga, no debe romper nada más.
      audio.addEventListener('error', function () { /* no-op */ });
      // Cuando el himno termina de sonar solo, se corta la EMISIÓN de
      // confetti (detenerEmision) y liberamos la referencia y el buffer
      // decodificado de inmediato, sin esperar al click en "Continuar"
      // (→ detener()).
      audio.addEventListener('ended', function () {
        detenerEmision();
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

  // Para himnos que todavía no fueron subidos, se comprueba su presencia
  // antes de crear el reproductor. Un 404 así no llega al elemento Audio ni
  // genera mensajes en consola; cuando el archivo exista se usará solo.
  function reproducirHimnoSiExiste(ruta, volumen) {
    const solicitud = ++solicitudHimno;
    fetch(ruta, { method: 'HEAD' })
      .then(function (respuesta) {
        if (respuesta.ok && solicitud === solicitudHimno) {
          reproducirHimno(ruta, volumen);
        }
      })
      .catch(function () { /* no-op */ });
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
      // Salvavidas: si el himno no dispara 'ended' (sonido desactivado, país
      // sin himno configurado, archivo opcional faltante, audio bloqueado),
      // esto igual corta la emisión de confetti a los FALLBACK_MS.
      fallbackTimeoutId = setTimeout(detenerEmision, FALLBACK_MS);
    }

    if (sonidoActivo && datosPais && datosPais.himno) {
      if (datosPais.himnoOpcional) {
        reproducirHimnoSiExiste(datosPais.himno, volumenSonido);
      } else {
        solicitudHimno++;
        reproducirHimno(datosPais.himno, volumenSonido);
      }
    }
  }

  // Corta el audio (si está sonando) y limpia el confetti. Pensado para
  // llamarse al cerrar el modal de campeón o al salir de la sesión.
  function detener() {
    solicitudHimno++;
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
