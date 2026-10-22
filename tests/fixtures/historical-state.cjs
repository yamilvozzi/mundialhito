// Estructura y partidos de la muestra histórica de regresión; nombre anonimizado.
// Los totales principales están reiniciados y el corte de rachas llega a 60.
module.exports = function historicalState() {
  const historial = [];
  const phases = ['FG · P1','FG · P2','FG · P3','Octavos de Final','Cuartos de Final','Semifinal','Gran Final'];
  function match(date, phase, res) {
    historial.push({ res, draw: res === 'draw', texto: `${date} · ${phase} — ${res === 'win' ? 'Victoria' : res === 'loss' ? 'Derrota' : 'Empate → ganó por penales'}` });
  }
  function cup(date, loss = -1, draw = -1) {
    phases.forEach((phase,i) => match(date, phase, i === loss ? 'loss' : i === draw ? 'draw' : 'win'));
  }
  cup('27/07/26',0); cup('27/07/26'); cup('27/07/26',0);
  match('27/07/26',phases[0],'win');
  cup('01/08/26',1); cup('01/08/26',-1,1);
  cup('08/08/26'); cup('08/08/26'); cup('08/08/26');
  phases.slice(0,3).forEach(phase => match('08/08/26',phase,'loss'));
  return {
    fase:'FG',copas:0,idioma:'es',historial,fgResultados:[],nacionalidad:'AR',nombrePerfil:'Perfil de prueba',
    rachaLossMax:0,rachaWinsMax:0,sonidoActivo:true,totalGanados:0,totalJugados:0,contadorRenov:1,totalPerdidos:0,
    volumenSonido:100,finalesGanadas:0,finalesJugadas:0,totalEmpatados:0,finalesPerdidas:0,rachaLossActual:0,
    rachaResetIndex:60,rachaWinsActual:0,copaPeorCampaña:0,copaMejorCampaña:0,eliminatoriasDone:[],
    copaCampañaActual:0,celebracionesActivas:true
  };
};
