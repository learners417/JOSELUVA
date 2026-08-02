// ============================================================
// LA ESTRUCTURA REAL DEL CURSO - Serena Ambicion (47 lecciones)
// Fuente de verdad. Las 12 semanas y sus clases, tal como estan
// en el portal de GHL. El lenguaje del curso se respeta.
// Los videos viven en GHL; la Bitacora ordena y acompana.
// ============================================================

// Portal del curso en GHL.
export const PORTAL = {
  base: "https://joseluis-valle.app.clientclub.net",
  productId: "868daeb6-28fe-454d-a9ac-eebdfeaa6a8d",
};

// URL del curso (a la clase puntual cuando tengamos su categoryId).
export function urlClase(categoryId) {
  const p = `${PORTAL.base}/courses/products/${PORTAL.productId}`;
  return categoryId ? `${p}/categories/${categoryId}` : p;
}

// Las 5 rutas fijas que se repiten (con su color/acento).
export const RUTAS = {
  biohacking: { nombre: "Biohacking", acento: "cuerpo" },
  biocuantico: { nombre: "Flujo Biocuantico", acento: "diseno" },
  mindfulness: { nombre: "Mindfulness", acento: "presencia" },
  neurociencias: { nombre: "Neurociencias para el cambio", acento: "cambio" },
  comunicacion: { nombre: "Comunicacion con Diseno Ontologico", acento: "conversacion" },
};

// Intro del curso.
export const INTRO = [
  { id: "bienvenida", titulo: "Bienvenida", tipo: "video", categoryId: null },
];

// Las 12 semanas. Cada clase: { ruta, titulo (real del portal), categoryId }.
// categoryId se completa cuando Javo pase las URLs; por ahora null => abre el curso.
export const SEMANAS = [
  {
    n: 1, subtitulo: "El punto de partida",
    clases: [
      { ruta: "mindfulness", titulo: "Mindfulness - S1", categoryId: null },
      { ruta: "neurociencias", titulo: "Neurociencias - S1", categoryId: null },
      { ruta: "comunicacion", titulo: "Ruta 1 - Comunicacion con Diseno Ontologico", categoryId: null },
    ],
  },
  {
    n: 2, subtitulo: "Los primeros cimientos",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness", categoryId: null },
    ],
  },
  {
    n: 3, subtitulo: "Centramiento",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Centramiento", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Soltando patrones", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Pensar en blanco", categoryId: null },
      { ruta: "neurociencias", titulo: "Neurociencias - Experimenta el cambio", categoryId: null },
      { ruta: "comunicacion", titulo: "Ruta 2 - Comunicacion con Diseno Ontologico", categoryId: null },
    ],
  },
  {
    n: 4, subtitulo: "Percepcion",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Percepcion", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Ve mas alla de tus habitos", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Estar presente", categoryId: null },
    ],
  },
  {
    n: 5, subtitulo: "Apertura",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Apertura", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Conecta con la energia universal", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Atencion plena", categoryId: null },
      { ruta: "neurociencias", titulo: "Neurociencias", categoryId: null },
      { ruta: "comunicacion", titulo: "Ruta 3 - Comunicacion con Diseno Ontologico", categoryId: null },
    ],
  },
  {
    n: 6, subtitulo: "Estabilidad",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Estabilidad", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Fortalece la energia vital", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Menos es mas", categoryId: null },
    ],
  },
  {
    n: 7, subtitulo: "Flexibilidad y determinacion",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Flexibilidad", categoryId: null },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Calibra tu cuerpo y manifiesta tus suenos", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Determinacion", categoryId: null },
      { ruta: "neurociencias", titulo: "Neurociencias - Cultiva bienestar", categoryId: null },
      { ruta: "comunicacion", titulo: "Ruta 4 - Comunicacion con Diseno Ontologico", categoryId: null },
    ],
  },
  {
    n: 8, subtitulo: "Impermeabilidad",
    clases: [
      { ruta: "mindfulness", titulo: "Mindfulness - Impermeabilidad", categoryId: null },
    ],
  },
  {
    n: 9, subtitulo: "Convierte tus suenos en propositos",
    clases: [
      { ruta: "neurociencias", titulo: "Neurociencias - Convierte tus suenos en propositos de realidad", categoryId: null },
      { ruta: "comunicacion", titulo: "Ruta 5 - Comunicacion con Diseno Ontologico", categoryId: null },
    ],
  },
  {
    n: 10, subtitulo: "Creatividad y energia",
    clases: [
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Creatividad y Energia", categoryId: null },
    ],
  },
  {
    n: 11, subtitulo: "Manifiesta abundancia",
    clases: [
      { ruta: "comunicacion", titulo: "Ruta 6 - Comunicacion con Diseno Ontologico", categoryId: null },
      { ruta: "neurociencias", titulo: "Neurociencias - Manifiesta abundancia en tu vida", categoryId: null },
    ],
  },
  {
    n: 12, subtitulo: "Proposito",
    clases: [
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Integracion de la energia universal en tu proposito vital", categoryId: null },
      { ruta: "mindfulness", titulo: "Mindfulness - Proposito", categoryId: null },
    ],
  },
];

// Total de clases (para el progreso).
export const TOTAL_CLASES = SEMANAS.reduce((s, w) => s + w.clases.length, 0);

// Helper: id unico de una clase (semana-indice).
export function claseId(semanaN, idx) {
  return `s${semanaN}-c${idx}`;
}
