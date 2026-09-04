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
  { id: "bienvenida", titulo: "Bienvenida", tipo: "video", categoryId: null, videoId: null },
];

// Las 12 semanas. Cada clase: { ruta, titulo (real del portal), categoryId }.
// videoId: ID de YouTube (unlisted) -> el video se ve DENTRO de la app.
// categoryId: respaldo a GHL si aun no hay video propio.
// Cuando ambos son null, el boton abre el portal del curso.
export const SEMANAS = [
  {
    n: 1, subtitulo: "El punto de partida",
    clases: [
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - S1", categoryId: null, videoId: "vs85HugqJGI" },
      { ruta: "mindfulness", titulo: "Mindfulness - S1", categoryId: null, videoId: "OoPzKFjhTRA" },
      { ruta: "neurociencias", titulo: "Neurociencias - S1", categoryId: null, videoId: "62RGSg3pmLQ" },
      { ruta: "comunicacion", titulo: "Ruta 1 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "1ZCbvCpl4H6scAnc0LZCgKDVGv9321uyH" },
    ],
  },
  {
    n: 2, subtitulo: "Los primeros cimientos",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking", categoryId: null, videoId: "Lz3CAFexk0o" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico", categoryId: null, videoId: "yj9YWL_-IcY" },
      { ruta: "mindfulness", titulo: "Mindfulness", categoryId: null, videoId: "2YaS_M4xhNg" },
    ],
  },
  {
    n: 3, subtitulo: "Centramiento",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Centramiento", categoryId: null, videoId: "6wk3MNCKDrM" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Soltando patrones", categoryId: null, videoId: "XUJJjdBBJdQ" },
      { ruta: "mindfulness", titulo: "Mindfulness - Pensar en blanco", categoryId: null, videoId: "5YwkBkVODcU" },
      { ruta: "neurociencias", titulo: "Neurociencias - Experimenta el cambio", categoryId: null, videoId: "VVjb6UTICQA" },
      { ruta: "comunicacion", titulo: "Ruta 2 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "1I5Jj_IP1ugS_-4cqN_TLSCeULATJrEHw" },
    ],
  },
  {
    n: 4, subtitulo: "Percepcion",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Percepcion", categoryId: null, videoId: "IVHVjgrTNAc" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Ve mas alla de tus habitos", categoryId: null, videoId: "4h0qzhq0330" },
      { ruta: "mindfulness", titulo: "Mindfulness - Estar presente", categoryId: null, videoId: "dE7QtjAay9s" },
    ],
  },
  {
    n: 5, subtitulo: "Apertura",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Apertura", categoryId: null, videoId: "iFdqVKMZe58" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Conecta con la energia universal", categoryId: null, videoId: "i-sekzgQEfU" },
      { ruta: "mindfulness", titulo: "Mindfulness - Atencion plena", categoryId: null, videoId: "mOBzGFVkfgM" },
      { ruta: "neurociencias", titulo: "Neurociencias", categoryId: null, videoId: "Sp4S4M_huyM" },
      { ruta: "comunicacion", titulo: "Ruta 3 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "1Lqek7BAJjHMuAV43rw3kJ56EVysN9mhM" },
    ],
  },
  {
    n: 6, subtitulo: "Estabilidad",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Estabilidad", categoryId: null, videoId: "vlO3_Txc6nk" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Fortalece la energia vital", categoryId: null, videoId: "7Th0GAuubv0" },
      { ruta: "mindfulness", titulo: "Mindfulness - Menos es mas", categoryId: null, videoId: "IxoqM3WbRSE" },
    ],
  },
  {
    n: 7, subtitulo: "Flexibilidad y determinacion",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Flexibilidad", categoryId: null, videoId: "c9Up7aW0ZJk" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Calibra tu cuerpo y manifiesta tus suenos", categoryId: null, videoId: "hxihmcZ1nmU" },
      { ruta: "mindfulness", titulo: "Mindfulness - Determinacion", categoryId: null, videoId: "ycvU2FjoFCI" },
      { ruta: "neurociencias", titulo: "Neurociencias - Cultiva bienestar", categoryId: null, videoId: "VYxMDIkofTk" },
      { ruta: "comunicacion", titulo: "Ruta 4 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "1sp1RIKLoUiRw3yPbwAZkwAYNb99xebr3" },
    ],
  },
  {
    n: 8, subtitulo: "Impermeabilidad",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Impermeabilidad", categoryId: null, videoId: "oivTpbpy-fw" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Impermeabilidad", categoryId: null, videoId: "52zKQo-bFSc" },
      { ruta: "mindfulness", titulo: "Mindfulness - Impermeabilidad", categoryId: null, videoId: "83ml3YmaFbY" },
    ],
  },
  {
    n: 9, subtitulo: "Convierte tus suenos en propositos",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Proposito", categoryId: null, videoId: "mZ_9rDzmscs" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Proposito", categoryId: null, videoId: "7YhFoFk-TPo" },
      { ruta: "neurociencias", titulo: "Neurociencias - Convierte tus suenos en propositos de realidad", categoryId: null, videoId: "nny4kUJFHuM" },
      { ruta: "mindfulness", titulo: "Mindfulness - Proposito", categoryId: null, videoId: "ltcQzvuI7lA" },
      { ruta: "comunicacion", titulo: "Ruta 5 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "10MPq0oob4D7t_6skbZ7IcgAVqmJHBDn9" },
    ],
  },
  {
    n: 10, subtitulo: "Creatividad y energia",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Creatividad y Energia", categoryId: null, videoId: "9tIZF0Pk2Wo" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Creatividad y Energia", categoryId: null, videoId: "VzUn8JotpM8" },
      { ruta: "mindfulness", titulo: "Mindfulness - Creatividad y Energia", categoryId: null, videoId: "hC-ZMhb32Ms" },
    ],
  },
  {
    n: 11, subtitulo: "Manifiesta abundancia",
    clases: [
      { ruta: "biohacking", titulo: "Biohacking - Manifiesta abundancia", categoryId: null, videoId: "u1IkHic5NYg" },
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Manifiesta abundancia", categoryId: null, videoId: "rMcjxPbL8RE" },
      { ruta: "mindfulness", titulo: "Mindfulness - Manifiesta abundancia", categoryId: null, videoId: "mzgvY-0cML4" },
      { ruta: "neurociencias", titulo: "Neurociencias - Manifiesta abundancia en tu vida", categoryId: null, videoId: "D-EIEQDk_yg" },
      { ruta: "comunicacion", titulo: "Ruta 6 - Comunicacion con Diseno Ontologico", categoryId: null, videoId: null, pdfId: "11IOKeGACIutBPGMQE12gXW8Qh_ArClNl" },
    ],
  },
  {
    n: 12, subtitulo: "Proposito",
    clases: [
      { ruta: "biocuantico", titulo: "Flujo Biocuantico - Integracion de la energia universal en tu proposito vital", categoryId: null, videoId: "cs3nxHHdQc8" },
      { ruta: "mindfulness", titulo: "Mindfulness - Proposito", categoryId: null, videoId: "NPXjpEkAztQ" },
    ],
  },
];

// Total de clases (para el progreso).
export const TOTAL_CLASES = SEMANAS.reduce((s, w) => s + w.clases.length, 0);

// Helper: id unico de una clase (semana-indice).
export function claseId(semanaN, idx) {
  return `s${semanaN}-c${idx}`;
}
