// ============================================================
// SERENA AMBICION - EL CEREBRO DEL AVATAR
// Fuente unica de verdad sobre a quien le habla la app.
// Lo usan: el onboarding, VALLE, los textos, los diagnosticos.
// Extraido del material real de Jose Luis (sus reels y su analisis
// de avatar). Es Jose Luis Valle puro, no otro cliente.
// ============================================================

// --- LA REGLA DE ORO ---
// El avatar NO se auto-percibe "en crisis". Patologizarlo lo aleja.
// Se ve "en etapa de replanteo", "en piloto automatico".
// Y YA PROBO TODO: es un sofisticado que descarto lo obvio.
// Nunca hablarle como a un novato.
export const REGLA_DE_ORO =
  'El avatar no se llama a si mismo "en crisis" ni "con vacio". Se ve "en una etapa de replanteo", "con sensacion de piloto automatico". Entrar por el lenguaje que el ya usa; nunca patologizar.';

// --- QUIEN ES ---
export const AVATAR = {
  edad: "50 a 65 (punto justo: 52-58)",
  perfil:
    "Empresario, ejecutivo senior o profesional independiente con 25-35 anos de trayectoria. Exito consolidado. Autonomia de decision economica.",
  nivel: "ABC1 - C2. Puede invertir en su diseno sin consultar.",
  autopercepcion_publica:
    "Soy el que ya lo logro, el que esta en buen momento, planificando el mediano plazo.",
  autopercepcion_privada:
    "Llegue a todo lo que me propuse y algo esencial no esta donde esperaba encontrarlo.",
  ya_probo:
    "Coach ejecutivo, terapia, retiros de liderazgo, Sinek, Collins, Robbins, MBA tardio, sabaticos, hobbies intensivos. Todo le dio piezas sueltas, ninguna el nucleo.",
  frase_interna:
    "Lo que sea que me propongan probar, seguramente ya lo probe. El problema no es de motivacion.",
};

// --- LAS BUYER PERSONAS (para dar cara concreta, nunca "empresarios +50") ---
export const PERSONAS = [
  {
    nombre: "Ricardo",
    edad: 54,
    rol: "Director de multinacional",
    linea: "Teme un infarto como el de su colega. Quiere sentido, no otro cargo.",
  },
  {
    nombre: "Marcela",
    edad: 51,
    rol: "Duena de agencia",
    linea: "Atrapada en su propio exito. Quiere salir del piloto automatico.",
  },
  {
    nombre: "Jorge",
    edad: 58,
    rol: "Abogado senior",
    linea: "Busca disenar su legado antes de los 70, mientras tiene energia.",
  },
];

// --- LOS 3 DOLORES NUCLEO (con la voz TEXTUAL de los reels de Jose) ---
// Cada dolor se conecta con el diagnostico IA que lo mide.
export const DOLORES = [
  {
    clave: "piloto",
    nombre: "El piloto automatico",
    voz: "Si me preguntas que hice el martes de hace tres semanas, no recuerdo nada. La vida se esta pasando, pero la textura esta borrosa. 52 semanas al ano, y solo puedo recordar dos o tres momentos.",
    reencuadre:
      "El piloto automatico no es pereza. Es un mecanismo que tu sistema instalo para sobrevivir la presion. El problema es que tambien apago la conciencia.",
    diagnostico: "mapa", // Mapa de Fuga
    entrada:
      "Hace cuanto que los dias se repiten sin que recuerdes ninguno en particular?",
  },
  {
    clave: "vaso",
    nombre: "El vaso lleno que se siente vacio",
    voz: "Llegue a todo lo que me propuse. Empresa, patrimonio, reconocimiento, familia. Y algo esencial no esta donde esperaba encontrarlo. No es depresion, no es crisis. Es una sensacion precisa de que falta algo que deberia estar ahi.",
    reencuadre:
      "Eso no es un problema psicologico. Es un problema de diseno: tu vida quedo disenada para una version de ti que ya no existe.",
    diagnostico: "vaso", // Diagnostico de Vacio
    entrada:
      "Que llenaste durante 30 anos, y de que se lleno realmente?",
  },
  {
    clave: "decada",
    nombre: "La decada de oro que se escapa",
    voz: "Tengo 55. En 10 anos voy a tener 65. Los 10 anos mas importantes de claridad, recursos y libertad, todos juntos como nunca antes y nunca despues, estan pasando ahora. Y no tengo un plan. Tengo inercia.",
    reencuadre:
      "Maxima claridad, maximos recursos, maxima libertad, todos a la vez y una sola vez. Sin diseno, es el mayor desperdicio posible.",
    diagnostico: "decada", // Planificador Decada de Oro
    entrada:
      "Si esta es tu decada de mayor claridad y libertad, que estas poniendo en ella?",
  },
];

// --- EL DESEO PROFUNDO (nunca aparece en formularios; solo en la conversacion) ---
export const DESEO_PROFUNDO = [
  "Saber quien soy sin el cargo.",
  "Tener una conversacion de verdad con mi hijo antes de que se vaya del todo.",
  "Llegar a los 70 con memoria de haber vivido, no solo de haber hecho.",
  "Dejar de performar diez minutos por dia sin que se caiga todo.",
];

// --- LAS 3 SENALES DE QUE ESTA LISTO ---
export const SENALES_COMPRA = [
  "Evento disparador reciente: cumpleanos redondo, salud propia o cercana, hijos que se van, un amigo que se enferma.",
  "Ya consumio 2-3 piezas de contenido que le rompieron el marco.",
  "Sensacion de ventana que se cierra: si no actua este ano, los proximos 10 se consumen igual que los ultimos 10.",
];

// --- HELPERS ---
// Detecta que dolor esta expresando la persona por lo que escribe.
// Devuelve la clave del dolor o null. Lo usa VALLE y el onboarding.
export function detectarDolor(texto) {
  const t = (texto || "").toLowerCase();
  if (
    /repit|piloto|automatic|no recuerd|los dias|rutina|siempre igual|borros/.test(
      t
    )
  )
    return "piloto";
  if (
    /vacio|falta algo|no alcanza|lleno pero|logre todo|sin sentido|no me llena/.test(
      t
    )
  )
    return "vaso";
  if (
    /tiempo|edad|anos|decada|tarde|se me escapa|ventana|jubilar|retir/.test(t)
  )
    return "decada";
  return null;
}

export function personaAlAzar() {
  return PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
}
