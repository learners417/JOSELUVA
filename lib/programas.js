// ============================================================
// LOS 3 PROGRAMAS - la escalera de Serena Ambicion.
// Cada nivel incluye mas rutas. Jose/admin asigna cual
// compro cada cliente; la Bitacora muestra solo lo incluido.
// ============================================================

// Las rutas base (las 5 practicas autoguiadas)
const RUTAS_BASE = [
  "mindfulness",
  "biohacking",
  "neurociencias",
  "biocuantico",
  "ontologica",
];

export const PROGRAMAS = {
  autoguiado: {
    id: "autoguiado",
    nombre: "Programa Autoguiado",
    descripcion: "Las cinco prácticas, a tu ritmo.",
    rutas: [...RUTAS_BASE],
  },
  coaching: {
    id: "coaching",
    nombre: "Programa con Coaching",
    descripcion: "Las prácticas más tus sesiones de coaching en vivo.",
    rutas: [...RUTAS_BASE, "coaching"],
  },
  mentoria: {
    id: "mentoria",
    nombre: "Programa con Mentoría",
    descripcion: "El acompañamiento completo: prácticas, coaching y mentoría.",
    rutas: [...RUTAS_BASE, "coaching", "mentoria"],
  },
};

// Programa por defecto si aun no fue asignado.
export const PROGRAMA_DEFAULT = "autoguiado";

// Devuelve el set de rutas incluidas para el programa dado.
export function rutasIncluidas(programaId) {
  const p = PROGRAMAS[programaId] || PROGRAMAS[PROGRAMA_DEFAULT];
  return p.rutas;
}

// Nombre legible del programa.
export function nombrePrograma(programaId) {
  const p = PROGRAMAS[programaId] || PROGRAMAS[PROGRAMA_DEFAULT];
  return p.nombre;
}
