// ============================================================
// SYNC - capa opcional de Supabase (patron portado de TCD).
// La app funciona SIEMPRE, con o sin Supabase:
//  - Sin credenciales -> todo local (localStorage), sync = no-op.
//  - Con credenciales  -> ademas guarda/hidrata en la nube por
//    codigo de acceso, para que funcione en cualquier telefono.
// El cliente de Supabase se carga por import DINAMICO: si no hay
// credenciales, ni siquiera se descarga (no infla el bundle).
// ============================================================

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function syncDisponible() {
  return !!(URL && ANON);
}

let _client = null;
async function cliente() {
  if (!syncDisponible()) return null;
  if (_client) return _client;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    _client = createClient(URL, ANON);
    return _client;
  } catch (e) {
    return null;
  }
}

// Tabla esperada en Supabase:
//   create table progreso (
//     codigo text primary key,
//     estado jsonb,
//     updated_at timestamptz default now()
//   );

// Trae el estado guardado en la nube para este codigo (o null).
export async function hidratar(codigo) {
  if (!codigo) return null;
  const c = await cliente();
  if (!c) return null;
  try {
    const { data, error } = await c
      .from("progreso")
      .select("estado")
      .eq("codigo", codigo)
      .single();
    if (error || !data) return null;
    return data.estado || null;
  } catch (e) {
    return null;
  }
}

// Guarda el estado en la nube (upsert por codigo). Devuelve true/false.
export async function subir(codigo, estado) {
  if (!codigo) return false;
  const c = await cliente();
  if (!c) return false;
  try {
    const { error } = await c
      .from("progreso")
      .upsert(
        { codigo, estado, updated_at: new Date().toISOString() },
        { onConflict: "codigo" }
      );
    return !error;
  } catch (e) {
    return false;
  }
}
