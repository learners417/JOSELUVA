// ============================================================
// LOS 6 DIAGNOSTICOS IA - definidos como datos.
// Un solo motor (components/Diagnostico.js) los corre a todos.
// Cada uno: preguntas tipo escala + un informe por tramos de score.
// El tono sale de los reels de Jose (objetos fisicos, sereno,
// sin patologizar). El resultado se guarda y VALLE lo conoce.
// ============================================================

// Escala comun para las preguntas (0 a 3).
export const ESCALA = [
  { v: 0, label: "Casi nunca" },
  { v: 1, label: "A veces" },
  { v: 2, label: "Seguido" },
  { v: 3, label: "Casi siempre" },
];

export const DIAGNOSTICOS = {
  // ---------- 1. EL VASO LLENO (Diagnostico de Vacio) → paso 'vaso'/D2 ----------
  vaso: {
    clave: "vaso",
    nombre: "El Vaso Lleno",
    intro:
      "A los 55, tu vaso esta lleno: carrera, patrimonio, reconocimiento. La pregunta no es si esta lleno. Es de que.",
    objeto: "vaso",
    preguntas: [
      "Cuando logras algo que perseguiste, la satisfaccion dura menos de lo que esperabas.",
      "Si te preguntaran para que haces lo que haces, la respuesta te sonaria a discurso repetido.",
      "Tienes lo que querias tener, y aun asi hay una sensacion de que falta algo que no sabes nombrar.",
      "Lo que llenaste durante 30 anos lo elegiste tu, mas que heredarlo de lo que se esperaba.",
      "Podrias describir con precision que te daria sentido hoy, no hace 20 anos.",
    ],
    // preguntas 4 y 5 son inversas (mas puntaje = mejor alineacion): se invierten
    inversas: [3, 4],
    informe: {
      alto: {
        titulo: "Tu vaso esta lleno de lo tuyo",
        texto:
          "Lo que construiste responde a lo que eliges, no solo a lo que se esperaba. Eso es raro. El trabajo aca no es llenar: es cuidar que siga siendo tuyo cuando cambie la etapa.",
      },
      medio: {
        titulo: "Una parte es tuya, otra es herencia",
        texto:
          "Parte de tu vaso lo llenaste eligiendo. Otra parte se lleno con lo que correspondia, sin que lo decidieras del todo. La distancia entre esas dos partes es exactamente el trabajo de esta etapa.",
      },
      bajo: {
        titulo: "Lleno, pero no de lo que creias",
        texto:
          "Llenaste el vaso con lo que se esperaba de ti, y funciono: diste resultados. Pero eso no es un problema psicologico. Es un problema de diseno: tu vida quedo disenada para una version tuya que ya no eres. Y el diseno se rehace.",
      },
    },
  },

  // ---------- 2. MAPA DE FUGAS → paso mapa/D1 (piloto automatico) ----------
  mapa: {
    clave: "mapa",
    nombre: "Mapa de Fugas",
    intro:
      "El piloto automatico no es pereza. Es un mecanismo que instalaste para sobrevivir la presion. Veamos donde se te va la semana sin que lo notes.",
    objeto: "reloj",
    preguntas: [
      "Si te pregunto que hiciste el martes de hace tres semanas, no recuerdas nada memorable.",
      "Tus dias de semana se parecen tanto entre si que se mezclan.",
      "Reaccionas a la agenda del dia mas de lo que eliges como pasa el dia.",
      "Terminas jornadas llenas de actividad con la sensacion de no haber hecho nada que importe.",
      "Cuando tienes tiempo libre, lo llenas rapido para no quedar a solas con la pregunta de que quieres.",
    ],
    inversas: [],
    informe: {
      alto: {
        titulo: "Estas despierto en tu semana",
        texto:
          "Recuerdas tus dias porque los vives con conciencia, no en automatico. Es una base solida. El trabajo aca es proteger esa conciencia cuando suba la presion.",
      },
      medio: {
        titulo: "El automatico gana algunos tramos",
        texto:
          "Hay zonas de tu semana que vives despierto y otras que se te van en piloto automatico. Identificarlas es el primer movimiento: no se cambia lo que no se ve.",
      },
      bajo: {
        titulo: "Vives la misma semana muchas veces",
        texto:
          "El piloto automatico tomo el control de la mayor parte de tu semana. No es tu culpa: es un mecanismo de defensa que funciono. El problema es que tambien apago la conciencia, y vivir sin conciencia es vivir la misma semana 52 veces al ano.",
      },
    },
  },

  // ---------- 3. PLANIFICADOR DECADA DE ORO → paso decada/D3 ----------
  decada: {
    clave: "decada",
    nombre: "Planificador de la Decada de Oro",
    intro:
      "De los 55 a los 65: maxima claridad, maximos recursos, maxima libertad, todos juntos. Una sola vez. La pregunta es si la estas disenando o dejando pasar.",
    objeto: "reloj-arena",
    preguntas: [
      "Tienes un plan concreto para lo que quieres construir en los proximos 10 anos, mas alla de seguir como vas.",
      "Sabes que quieres que exista en tu vida a los 65 que hoy no existe.",
      "Sientes que estas usando esta etapa de recursos y libertad, no solo administrandola.",
      "Cada ano que pasa lo vives como avance hacia algo elegido, no como inercia.",
      "Si nada cambiara, tus proximos 10 anos serian sustancialmente distintos a los ultimos 10.",
    ],
    inversas: [0, 1, 2, 3, 4], // todas positivas: mas score = mejor
    informe: {
      alto: {
        titulo: "Tu decada tiene diseno",
        texto:
          "Estas usando esta etapa, no dejandola correr. Tienes destino, no solo inercia. El trabajo aca es afinar el plan y sostenerlo cuando la vida empuje a volver al automatico.",
      },
      medio: {
        titulo: "Tienes intencion, falta diseno",
        texto:
          "Sabes que esta etapa importa y algo quieres hacer con ella. Pero intencion no es diseno. La diferencia entre quien vive esta decada con plenitud y quien la vive con angustia no es la salud ni el dinero: es tener o no un plano de hacia donde va.",
      },
      bajo: {
        titulo: "La decada de oro se esta gastando en inercia",
        texto:
          "Llegaste al destino que programaste hace 30 anos, y sigues conduciendo por caminos que ya alcanzaste. Sin un destino nuevo, la inercia no lleva a ningun lado elegido. Y esta decada, la de los tres maximos juntos, no vuelve a repetirse.",
      },
    },
  },

  // ---------- 4. ARQUITECTO DE LEGADO → paso arquitecto (herencia/legado) ----------
  arquitecto: {
    clave: "arquitecto",
    nombre: "Arquitecto de Legado",
    intro:
      "Dos cajas. Una es tu herencia: patrimonio, propiedades, lo que queda en numeros. La otra es tu legado: lo que queda de ti en las personas. Veamos cuanto disenaste cada una.",
    objeto: "cajas",
    preguntas: [
      "Dedicaste tanto tiempo a lo que vas a dejar en las personas como a lo que vas a dejar en bienes.",
      "Las personas que mas te importan sabrian decir que representas, no solo que lograste.",
      "Tienes conversaciones pendientes con gente cercana que vienes postergando.",
      "Tu presencia con los tuyos es algo que diseñas, no lo que queda despues del trabajo.",
      "Si todo terminara pronto, sentirias que dejaste dicho y hecho lo esencial con quienes amas.",
    ],
    inversas: [0, 1, 3, 4], // 2 (conversaciones pendientes) es la unica negativa
    informe: {
      alto: {
        titulo: "Estas construyendo legado, no solo herencia",
        texto:
          "Diseñas tu huella en las personas con la misma seriedad con que construiste tu patrimonio. Poco comun. El trabajo aca es no aflojar: el legado se riega, no se hereda solo.",
      },
      medio: {
        titulo: "Herencia solida, legado a medio diseñar",
        texto:
          "Tu herencia esta cuidada. Tu legado, esa huella en las personas, esta empezado pero sin el mismo diseno. Y el legado no se llena con dinero: se llena con presencia y con conversaciones que hoy sigues postergando.",
      },
      bajo: {
        titulo: "Una caja llena, la otra vacia",
        texto:
          "Pusiste casi todo en la caja de la herencia y dejaste la del legado esperando. Quienes llegan al final con una llena y la otra vacia describen un arrepentimiento sin nombre: haber dejado dinero en lugar de presencia. Todavia hay tiempo de diseñar la segunda. Pero se diseña ahora, no al final.",
      },
    },
  },

  // ---------- 5. COPILOTO DE REGULACION → paso copiloto (presencia) ----------
  copiloto: {
    clave: "copiloto",
    nombre: "Copiloto de Cabina",
    intro:
      "Tu sistema nervioso lleva anos funcionando como si hubiera un tigre. No hay tigre: hay agenda. Veamos como esta tu cabina bajo presion.",
    objeto: "vaso-desborde",
    preguntas: [
      "Aprendiste a funcionar bien incluso cuando por dentro estas desbordado.",
      "Tu respiracion, la mayor parte del dia, es corta y alta en el pecho, no profunda.",
      "Te cuesta bajar de revoluciones aunque el dia ya termino.",
      "Tomas decisiones importantes en estados de activacion que no elegiste.",
      "Sabes regular tu estado en pocos minutos cuando lo necesitas, no solo aguantar.",
    ],
    inversas: [4], // la ultima es positiva
    informe: {
      alto: {
        titulo: "Tu cabina responde",
        texto:
          "Sabes regularte, no solo aguantar. Tu sistema nervioso trabaja a tu favor. El trabajo aca es mantener esa regulacion como habito, no como rescate de emergencia.",
      },
      medio: {
        titulo: "Funcionas, pero pagando un costo",
        texto:
          "Sostienes el rendimiento, pero a costa de un sistema nervioso que rara vez baja del todo. Funcionar desbordado tiene un precio documentado: calidad de decisiones, presencia, salud. No es normal aunque se haya vuelto costumbre.",
      },
      bajo: {
        titulo: "Vives en activacion constante",
        texto:
          "Tu cabina lleva anos en emergencia sin emergencia real. Aprendiste a operar asi y por eso ni lo notas. Pero el sistema nervioso que esta debajo de todos tus logros es el trabajo mas urgente que no esta en tu agenda.",
      },
    },
  },

  // ---------- 6. REDESCUBRIMIENTO → paso redescubrimiento (el yo que quedo atras) ----------
  redescubrimiento: {
    clave: "redescubrimiento",
    nombre: "Redescubre tu Proyecto Vital",
    intro:
      "Pasaste 30 anos agregando capas: el rol, la imagen, lo que se esperaba. Esta es una conversacion con lo que quedo en el centro.",
    objeto: "matrushka",
    preguntas: [
      "Sabrias decir quien eres sin mencionar tu cargo, tu profesion o lo que lograste.",
      "Hay partes tuyas que dejaste de lado para encajar y que extranas.",
      "Te reconoces en el espejo, no solo en tus resultados.",
      "Sabes que te daba alegria genuina antes de que todo fuera rendimiento.",
      "Lo que hoy proyecta tu vida sigue siendo lo que tu quieres, no lo que decidiste hace decadas.",
    ],
    inversas: [0, 2, 3, 4], // 1 (partes que extranas) es la negativa
    informe: {
      alto: {
        titulo: "Sabes quien eres bajo las capas",
        texto:
          "No te perdiste en el rol. Debajo del ejecutivo hay una persona que reconoces. Esa es la base para escribir una segunda mitad que sea tuya. El trabajo aca es darle lugar, no solo saber que esta.",
      },
      medio: {
        titulo: "El centro sigue ahi, algo tapado",
        texto:
          "No te perdiste del todo, pero hay capas que se volvieron tan automaticas que a veces tapan quien eres. Reinventarse no es cambiar quien eres: es limpiar el espejo para volver a verte con claridad.",
      },
      bajo: {
        titulo: "Las capas taparon el centro",
        texto:
          "Agregaste tantas capas para ser tomado en serio que cuesta encontrar quien esta debajo. No es un fracaso: es el sintoma de una vida construida hacia afuera. Pero si no sabes quien eres sin las capas, la segunda mitad se vuelve terreno de perdida en vez de libertad. Y eso se trabaja.",
      },
    },
  },
};

// --- MOTOR DE SCORING ---
// Regla unica: cada 'inversa' marca las preguntas donde una respuesta
// ALTA significa MAS problema. Tras invertir esas, un score alto
// SIEMPRE significa mejor alineacion, y el tramo mapea directo al
// informe (alto=bien, medio=en proceso, bajo=el trabajo por hacer).
// Devuelve { score0a100, tramo, informe }.
export function calcularResultado(clave, respuestas) {
  const d = DIAGNOSTICOS[clave];
  if (!d) return null;
  const n = d.preguntas.length;
  const inversas = d.inversas || [];
  let suma = 0;
  respuestas.forEach((r, i) => {
    const v = typeof r === "number" ? r : 0;
    // Si la pregunta i esta en 'inversas', respuesta alta = problema:
    // la invertimos para que sumar siempre premie la alineacion.
    suma += inversas.includes(i) ? v : 3 - v;
  });
  const maxCrudo = n * 3;
  const pct = Math.round((suma / maxCrudo) * 100);

  let tramo;
  if (pct >= 67) tramo = "alto";
  else if (pct >= 34) tramo = "medio";
  else tramo = "bajo";

  return {
    score: pct,
    tramo,
    informe: d.informe[tramo] || d.informe.medio,
  };
}
