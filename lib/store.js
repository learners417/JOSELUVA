// ============================================================
// STORE - persistencia local (Fase 1)
// En Fase 3 esto se reemplaza por Supabase sin tocar las pantallas.
// ============================================================

const KEY = "serena_ambicion_v1";

const DEFAULT_STATE = {
  acceso: null, // { codigo, plan }
  onboarding: null, // { nombre, dolor, irv }
  pasosCompletados: [], // [1, 2, ...]
  elecciones: [], // [{ texto, fecha }]
  ritualDias: [], // ["2026-07-18", ...]
  plano: null, // { hitos: [...] }
  movimientos: [], // [{ texto, cuando, fecha }]
  createdAt: null,
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
