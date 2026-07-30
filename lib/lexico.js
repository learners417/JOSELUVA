// ============================================================
// SERENA AMBICION - EL LEXICO BLINDADO
// Regla de hierro escrita en codigo (como en Metodo eSe).
// Ninguna pantalla, ningun texto y ni siquiera VALLE puede
// usar el vocabulario del nicho generico. Se audita.
// ============================================================

// --- PROHIBIDO ---
// Palabras gastadas del nicho que debilitan el posicionamiento
// premium de Jose. "proposito" es la mas peligrosa: la usan todos.
export const PROHIBIDAS = [
  "proposito",
  "propósito",
  "crisis",
  "tu mejor version",
  "tu mejor versión",
  "bienestar",
  "mindfulness",
  "motivacion",
  "motivación",
  "sanar",
  "abundancia",
  "energia positiva",
  "energía positiva",
  "vos podes",
  "vos podés",
  "tu puedes",
  "tú puedes",
];

// "transformacion" solo se permite como sustantivo del rol
// ("arquitecto de transformacion"), nunca como cliche de venta.
export const CONDICIONALES = ["transformacion", "transformación"];

// --- PROPIO ---
// El vocabulario que SI construye la marca.
export const PROPIAS = [
  "alineacion",
  "diseno consciente",
  "arquitectura de vida",
  "legado",
  "optar vs elegir",
  "herencia vs legado",
  "sintoma vs diseno",
  "los dias que se repiten",
  "la decada de oro",
  "volver a ser autor",
  "conversaciones ausentes",
  "el proyecto postergado",
  "algun dia vs una fecha",
  "castillo vs reino",
  "presencia",
];

// --- LA FILOSOFIA MADRE ---
export const FILOSOFIA =
  "En la vida no existen los problemas, solo existen conversaciones aun ausentes.";

// --- EL REVISOR ---
// Devuelve { limpio, hallazgos } para cualquier texto.
// Se usa en desarrollo y para auditar la salida de VALLE.
// Ignora dos usos legitimos:
//  1. Negaciones ("no es crisis", "el problema no es de motivacion"):
//     Jose usa la palabra para DESACTIVARLa, no para vender con ella.
//  2. URLs (los lead magnets en vivo tienen la palabra en su slug).
export function revisarLexico(texto) {
  const original = texto || "";
  // Quitar URLs antes de revisar.
  const sinUrls = original.replace(/https?:\/\/\S+/g, "");
  const t = sinUrls.toLowerCase();
  const hallazgos = [];
  for (const p of PROHIBIDAS) {
    let i = t.indexOf(p);
    while (i !== -1) {
      // Ventana de ~24 chars antes: si hay una negacion, es uso legitimo.
      const antes = t.slice(Math.max(0, i - 24), i);
      const negada = /\bno\b[^.]*$|\bni\b[^.]*$|tampoco|sin\s+$/.test(antes);
      if (!negada && !hallazgos.includes(p)) hallazgos.push(p);
      i = t.indexOf(p, i + p.length);
    }
  }
  // Exclamaciones = urgencia artificial de coach.
  if (/!/.test(sinUrls)) hallazgos.push("exclamacion (!)");
  return { limpio: hallazgos.length === 0, hallazgos };
}

// Sanea un texto reemplazando lo prohibido por su equivalente sereno.
// Ultimo escudo si algo se coló (ej. respuesta cruda de la IA).
const REEMPLAZOS = {
  proposito: "sentido",
  propósito: "sentido",
  crisis: "bisagra",
  motivacion: "direccion",
  motivación: "direccion",
  bienestar: "alineacion",
  sanar: "redisenar",
};
export function sanearLexico(texto) {
  let out = texto || "";
  for (const [mal, bien] of Object.entries(REEMPLAZOS)) {
    out = out.replace(new RegExp(mal, "gi"), bien);
  }
  return out;
}
