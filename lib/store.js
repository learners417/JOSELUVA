// ============================================================
// STORE - persistencia local + sync opcional a Supabase (lib/sync.js)
// Local siempre; la nube se activa con las variables NEXT_PUBLIC_SUPABASE_*
// ============================================================

const KEY = "serena_ambicion_v1";

const DEFAULT_STATE = {
  acceso: null, // { codigo, plan }
  onboarding: null, // { nombre, sueno }
  programa: "autoguiado", // autoguiado | coaching | mentoria - asignado por admin
  foto: "", // dataURL de la foto de perfil del usuario
  soporteMensajes: [], // mensajes de soporte/plan que le llegan a José en admin
  pedidosPlan: [], // pedidos de ampliar programa
  pasosCompletados: [], // [1, 2, ...]
  elecciones: [], // [{ texto, fecha }]
  ritualDias: [], // ["2026-07-18", ...]
  avancesProyecto: [], // ["2026-07-18", ...] - dias que el proyecto avanzo
  plano: null, // { proyecto, desde, tramo, castillo, reino, hitos, movimientos }
  valleChat: [], // [{ role, content }] - memoria persistente de VALLE
  instrumentosHechos: [], // diagnosticos completados
  diagResultados: {}, // { clave: { score, tramo, titulo } } - resultado de cada diagnostico
  movimientos: [], // [{ texto, cuando, fecha }]
  createdAt: null,
  // --- BITACORA: el curso real + las 3 herramientas nativas ---
  clasesVistas: [], // ["s1-c0", ...] - clases marcadas como vistas
  ruedaVida: {}, // { area: nivel 1-10 } - la Rueda actual (legacy/última)
  ruedaTramos: {}, // { 1: {areas}, 4: {...}, 8, 12 } - Rueda por tramo
  bitacora: [], // [{ semana, subtitulo, fecha, items }] - entradas legibles
  bitacoraSemanas: [], // [1,2,...] - semanas cuya actividad está completa
  bitacoraRespuestas: {}, // { 3: { "mindfulness-0": "texto", ... } } - respuestas por semana/ruta
  planServicio: {}, // { que, aQuien, como, primerPaso } - plan de servicio
};

export function loadState() {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    // silencioso
  }
}

export function resetState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}
