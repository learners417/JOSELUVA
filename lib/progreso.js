// ============================================================
// EL MOTOR DE PROGRESO - el cerebro del recorrido.
// Define que esta desbloqueado, que toca AHORA, cuando medir
// la Rueda, y si se puede avanzar. Bloqueo estricto: una
// semana no se abre hasta completar la actividad de la anterior.
// ============================================================

import { SEMANAS } from "./curso";

// Semanas en las que se mide la Rueda de la Vida (ver el cambio).
export const SEMANAS_RUEDA = [1, 4, 8, 12];

// --- Estado de una semana ---
// Una semana esta COMPLETA cuando su actividad (bitacora) esta hecha
// Y, si le toca Rueda, la Rueda de ese tramo esta registrada.
export function semanaCompleta(semanaN, state) {
  const bitacoraHecha = (state.bitacoraSemanas || []).includes(semanaN);
  if (SEMANAS_RUEDA.includes(semanaN)) {
    const ruedaHecha = !!(state.ruedaTramos || {})[semanaN];
    return bitacoraHecha && ruedaHecha;
  }
  return bitacoraHecha;
}

// --- La semana ACTUAL (la primera no completa) ---
export function semanaActual(state) {
  for (const w of SEMANAS) {
    if (!semanaCompleta(w.n, state)) return w.n;
  }
  return SEMANAS.length; // todo completo -> la ultima
}

// --- Una semana esta DESBLOQUEADA si es la actual o anterior ---
export function semanaDesbloqueada(semanaN, state) {
  return semanaN <= semanaActual(state);
}

// --- Cuantas semanas completas (para el edificio) ---
export function semanasHechas(state) {
  return SEMANAS.filter((w) => semanaCompleta(w.n, state)).length;
}

// --- El PROXIMO PASO concreto (lo que la pantalla Hoy muestra) ---
// Devuelve un objeto que dice exactamente que hacer ahora.
export function proximoPaso(state) {
  // Si todas las semanas estan completas, el camino terminó.
  if (semanasHechas(state) >= SEMANAS.length) return { tipo: "fin" };

  const n = semanaActual(state);
  const w = SEMANAS.find((s) => s.n === n);
  if (!w) return { tipo: "fin" };

  const vistas = state.clasesVistas || [];
  const claseId = (i) => `s${n}-c${i}`;

  // 1. Si toca Rueda de esta semana y no esta hecha -> medir la Rueda.
  if (SEMANAS_RUEDA.includes(n) && !(state.ruedaTramos || {})[n]) {
    return {
      tipo: "rueda",
      semana: n,
      subtitulo: w.subtitulo,
      titulo: n === 1 ? "Tu punto de partida" : "Vuelve a mirar tu rueda",
      detalle:
        n === 1
          ? "Antes de empezar, una foto honesta de donde esta hoy tu vida."
          : "Han pasado semanas. Mira como cambio tu rueda desde la ultima vez.",
    };
  }

  // 2. Si quedan clases por ver esta semana -> ver la proxima clase.
  const claseePendiente = w.clases.findIndex((_, i) => !vistas.includes(claseId(i)));
  if (claseePendiente !== -1) {
    return {
      tipo: "clase",
      semana: n,
      subtitulo: w.subtitulo,
      clase: w.clases[claseePendiente],
      claseIdx: claseePendiente,
      totalClases: w.clases.length,
      claseNum: claseePendiente + 1,
    };
  }

  // 3. Clases vistas pero falta la actividad (bitacora) -> hacer la actividad.
  if (!(state.bitacoraSemanas || []).includes(n)) {
    return {
      tipo: "actividad",
      semana: n,
      subtitulo: w.subtitulo,
      titulo: "La actividad de esta semana",
    };
  }

  // 4. Todo lo de la semana hecho -> avanzar.
  return { tipo: "avanzar", semana: n, subtitulo: w.subtitulo };
}

// --- La pregunta de bitacora de cada semana (la actividad) ---
// Ligada al tema de la semana, en la voz de Jose.
export const PREGUNTA_SEMANA = {
  1: "Despues de esta primera semana, ¿que notaste sobre el punto donde estas parado hoy?",
  2: "¿Que primer cimiento empezaste a poner esta semana?",
  3: "¿Que se acomodo cuando lograste centrarte?",
  4: "¿Que estas viendo ahora que antes no percibias?",
  5: "¿A que te estas abriendo que antes tenias cerrado?",
  6: "¿Donde encontraste mas estabilidad esta semana?",
  7: "¿Donde apareció tu determinacion, y donde tu flexibilidad?",
  8: "¿Que dejo de afectarte como antes?",
  9: "Tu sueno, ¿se esta volviendo un proposito concreto? ¿Como?",
  10: "¿Donde sentiste que volvio tu creatividad y tu energia?",
  11: "¿Que empezo a fluir con mas abundancia en tu vida?",
  12: "Al cerrar las doce semanas: ¿quien eres ahora que no eras al empezar?",
};
