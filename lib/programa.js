// ============================================================
// SERENA AMBICION - CONTENIDO DEL METODO
// Este es el UNICO archivo que Jose Luis edita para cambiar el contenido.
// Todo lo demas (pantallas, logica) queda igual.
//
// v2 - CORREGIDO contra las paginas en vivo (joseluis-valle.com)
// Cambios: URLs reales, "Entrevista de Expansion", el hilo del
// PROYECTO VITAL POSTERGADO como eje central, tono de la VSL.
// ============================================================

// --- MARCA ---
export const MARCA = {
  metodo: "Serena Ambicion",
  autor: "Jose Luis Valle Tulian",
  firma: "Jose Luva",
  tagline: "Del exito al sentido.",
  avatar: "Empresarios y profesionales +50 con un proyecto vital postergado",
  // La sesion gratuita se llama asi en la VSL. No inventar otro nombre.
  sesion: "Entrevista de Expansion",
  agendaUrl: "https://api.leadconnectorhq.com/widget/booking/eYarxw7z0Py6za36XvpV",
  vslUrl: "https://joseluis-valle.com/vsl-alternativo",
};

// --- EL EJE: EL PROYECTO POSTERGADO ---
// Todo el metodo gira alrededor de esto. Es lo que la VSL nombra en su headline.
export const EJE = {
  headline: "El proyecto pendiente no se hace mas facil con los anos. Solo mas pesado de cargar.",
  premisa:
    "Aqui no vienes a sentirte mejor con tu postergacion. Vienes a decidir si la terminas o la arrastras hasta el final.",
  activo: "El tiempo es el unico activo que no puedes recuperar.",
  conversion: 'Transformar "algun dia" en una fecha.',
};

// --- LOS 8 PASOS (= las 8 plantas de La Obra) ---
// Cada paso se levanta con EVIDENCIA real, no con "lei el contenido".
export const PASOS = [
  {
    n: 1,
    clave: "diagnostico",
    titulo: "Diagnostico de arquitectura",
    subtitulo: "Donde estas realmente parado",
    descripcion:
      "Antes de redisenar cualquier cosa hay que ver el plano actual con precision. No como te sientes: como esta construida tu vida hoy, y cuanto de tu semana sostiene algo que ya no elegis.",
    resultado: "Tienes tu Indice de Rentabilidad Vital y sabes que pieza sostiene todo.",
    instrumento: "irv",
    evidencia: "Completar el diagnostico de arquitectura (IRV).",
  },
  {
    n: 2,
    clave: "proyecto",
    titulo: "Nombrar el proyecto",
    subtitulo: "Lo que llevas anos posponiendo",
    descripcion:
      'Hay algo que viene diciendo "algun dia" hace demasiado. El viaje, el libro, la empresa, la conversacion, el cambio. Mientras no tenga nombre no existe, y lo que no existe no se puede empezar.',
    resultado: "Tu proyecto postergado tiene nombre, escrito con tus palabras.",
    instrumento: null,
    evidencia: "Escribir el proyecto en El Plano.",
  },
  {
    n: 3,
    clave: "yo-atras",
    titulo: "El yo que quedo atras",
    subtitulo: "Quien lo queria antes de que lo pospusieras",
    descripcion:
      "Ese proyecto lo eligio alguien. Una version tuya con menos armadura y mas apetito. No desaparecio: quedo esperando debajo de las decisiones correctas.",
    resultado: "Recuperas el porque original, no la version razonable que armaste despues.",
    instrumento: "redescubrimiento",
    evidencia: "Completar la sesion de Redescubrimiento.",
  },
  {
    n: 4,
    clave: "optar-elegir",
    titulo: "Optar vs. elegir",
    subtitulo: "Por que se sigue posponiendo",
    descripcion:
      "Treinta anos haciendo lo correcto te convirtieron en especialista en opciones y aprendiz en elecciones. La postergacion no es pereza: es un musculo que se atrofio.",
    resultado: "Distingues, en tu semana real, que elegiste tu y que se instalo solo.",
    instrumento: null,
    evidencia: "Registrar 5 elecciones conscientes en el ritual diario.",
  },
  {
    n: 5,
    clave: "presencia",
    titulo: "Auditoria de presencia",
    subtitulo: "Donde estas y donde solo apareces",
    descripcion:
      "Estar fisicamente no es estar. El mismo mecanismo que pospone tu proyecto te tiene presente a medias con los que amas.",
    resultado: "Tienes tu mapa de presencia y un momento diario recuperado.",
    instrumento: "copiloto",
    evidencia: "Completar la Auditoria de presencia (Copiloto).",
  },
  {
    n: 6,
    clave: "herencia-legado",
    titulo: "Herencia vs. legado",
    subtitulo: "Que queda si el proyecto no se hace",
    descripcion:
      "Herencia es dinero, propiedades, empresa. Legado es la huella de quien fuiste. El legado no se hereda: se disena. Y no a los 75.",
    resultado: "Defines la linea que quieres que se diga sobre ti, y que la sostiene.",
    instrumento: "arquitecto",
    evidencia: "Completar el mapa de Arquitecto de Legado.",
  },
  {
    n: 7,
    clave: "instalacion",
    titulo: "Instalacion",
    subtitulo: 'De "algun dia" a una fecha',
    descripcion:
      "Un plano sin obra es una intencion, y a las intenciones el tiempo se las come. Aqui lo importante deja de esperar turno: primera pieza concreta, con fecha.",
    resultado: "Tienes 3 movimientos con fecha: esta semana, este mes, este trimestre.",
    instrumento: null,
    evidencia: "Registrar los 3 movimientos con fecha en El Plano.",
  },
  {
    n: 8,
    clave: "autonomia",
    titulo: "Autonomia",
    subtitulo: "Sostener el diseno sin el arquitecto",
    descripcion:
      "El diseno que necesita al arquitecto para sostenerse no es diseno. Aqui el sistema queda funcionando en ti, sin depender de la sesion.",
    resultado: "Sostienes el ritual solo. La Obra queda en pie.",
    instrumento: null,
    evidencia: "Completar 21 dias de ritual diario.",
  },
];

// --- LAS 3 FASES DEL PROGRAMA (sistema de 90 dias) ---
export const FASES = [
  {
    nombre: "Diagnostico",
    dias: "Dias 1-30",
    pasos: [1, 2, 3],
    meta: "Ver el plano actual y ponerle nombre a lo que pospusiste.",
  },
  {
    nombre: "Diseno",
    dias: "Dias 31-60",
    pasos: [4, 5, 6],
    meta: "Entender por que se pospone y disenar lo que sigue.",
  },
  {
    nombre: "Instalacion",
    dias: "Dias 61-90",
    pasos: [7, 8],
    meta: 'Convertir "algun dia" en fechas y que se sostenga sin el arquitecto.',
  },
];

// --- LAS DISTINCIONES (aparecen en el ritual diario) ---
// Propiedad conceptual de Jose Luis. Nadie mas las usa asi.
export const DISTINCIONES = [
  {
    par: "Algun dia vs. Una fecha",
    texto:
      '"Algun dia" es el nombre elegante que le pusimos a "nunca". Un proyecto sin fecha no es un plan: es una forma educada de renunciar.',
  },
  {
    par: "Herencia vs. Legado",
    texto:
      "Herencia es lo que dejas cuando te vas. Legado es lo que empiezas antes de irte. Una se hereda; el otro se disena.",
  },
  {
    par: "Optar vs. Elegir",
    texto:
      "Optar es tomar de un menu que alguien mas armo. Elegir es crear la opcion desde cero. Con los anos, casi todos dejamos de elegir.",
  },
  {
    par: "Sintoma vs. Diseno",
    texto:
      "Los retiros, los cursos, la motivacion: todos gestionan el sintoma. Tu problema no es sintoma. Es diseno. Y el diseno se rehace, no se calma.",
  },
  {
    par: "Presencia vs. Presente",
    texto:
      "Estar presente es que tu cuerpo este ahi. Tener presencia es que tu estes ahi. No es lo mismo, y los que te aman lo notan.",
  },
  {
    par: "Exito vs. Sentido",
    texto:
      "El exito es que los demas reconozcan lo que hiciste. El sentido es que tu reconozcas tu vida como propia. Se puede tener uno sin el otro.",
  },
  {
    par: "Administrar vs. Ser autor",
    texto:
      "Puedes administrar tu vida con eficiencia impecable y aun asi no ser su autor. La pregunta no es si funciona. Es de quien es.",
  },
  {
    par: "Peso vs. Tiempo",
    texto:
      "El proyecto pendiente no se hace mas facil con los anos. Solo mas pesado de cargar. Lo que hoy cuesta una decision, en cinco anos cuesta una explicacion.",
  },
];

// --- LA PREGUNTA DE LA MANANA (nucleo del ritual) ---
export const PREGUNTA_MANANA =
  "De todo lo que voy a hacer hoy, cuanto es mio y cuanto es un papel que sigo interpretando?";

// --- LA PREGUNTA DEL PROYECTO (segundo eje del ritual) ---
export const PREGUNTA_PROYECTO =
  "Lo que vengo posponiendo: avanza hoy, aunque sea un centimetro?";

// --- LOS INSTRUMENTOS (URLs REALES en vivo, verificadas) ---
export const INSTRUMENTOS = [
  {
    clave: "irv",
    nombre: "Auditoria de Rentabilidad Vital",
    desc: "Tu indice de arquitectura actual.",
    url: "https://joseluis-valle.com/auditoria-rentabilidad-vital",
  },
  {
    clave: "decada",
    nombre: "Planificador de la Decada de Oro",
    desc: "La urgencia real de esta etapa.",
    url: "https://joseluis-valle.com/planificador-decada-de-oro",
  },
  {
    clave: "mapa",
    nombre: "Mapa de Fugas",
    desc: "Donde se te va la semana sin que lo notes.",
    url: "https://joseluis-valle.com/mapa-fugas",
  },
  {
    clave: "vaso",
    nombre: "El Vaso Lleno",
    desc: "Logros contra sentido: cuanta es la brecha.",
    url: "https://joseluis-valle.com/diagnostico-vacio",
  },
  {
    clave: "copiloto",
    nombre: "Copiloto de Cabina",
    desc: "Tu patron bajo presion, con audio.",
    url: "https://joseluis-valle.com/copiloto-regulacion",
  },
  {
    clave: "arquitecto",
    nombre: "Arquitecto de Legado",
    desc: "Herencia vs. legado: tus proximos 20 anos.",
    url: "https://joseluis-valle.com/lm---arquitecto-legado",
  },
  {
    clave: "redescubrimiento",
    nombre: "Redescubre tu Proyecto Vital",
    desc: "El yo que quedo atras, en conversacion.",
    url: "https://joseluis-valle.com/redescubre-proposito-vital",
  },
  {
    clave: "audio",
    nombre: "El metodo simple para calmar tu dia",
    desc: "3 ejercicios para priorizarte. Audio de 5 min.",
    url: "https://joseluis-valle.com/audio-calmar",
  },
  {
    clave: "momento",
    nombre: "Un momento para volver a ti",
    desc: "Un alto grabado por Jose Luis.",
    url: "https://joseluis-valle.com/momento-para-volver",
  },
];

// --- AUDIO DE EL ALTO (el mismo del LM audio-calmar) ---
export const AUDIO_ALTO =
  "https://assets.cdn.filesafe.space/m0oQv3eLz3Ewj8PeqgqY/media/6a47d55e1bf938e547d260ed.mp4";

// --- VOZ MAESTRO (Jose Luis en primera persona) ---
// v3 - AHORA CON SU HISTORIA REAL, tomada de su carrusel de Instagram.
// A los 50 salio de su propio cumpleanos con miedo. El peor momento fue
// ver que se habia pasado la vida postergando sus suenos, siempre para
// el futuro. Ocho anos y varios maestros despues, le dio salida.
export const VOZ_MAESTRO = {
  bienvenida:
    "Soy Jose Luis. A los 50 sali de mi propio cumpleanos lleno de miedo. Tarde en entender por que: me habia pasado la vida postergando lo que mas queria, siempre para el futuro. No estas aqui para sentirte mejor con eso. Estas aqui para decidir si lo terminas o lo arrastras hasta el final.",
  proyecto:
    "El peor dia de mi reinvencion fue cuando vi el patron: toda la vida repitiendo el mismo ciclo, dejando mis suenos mas importantes para despues. Ponerle nombre no lo resuelve. Pero mientras no tenga nombre, no existe.",
  mitad:
    "Cuando empece crei que alcanzaba con entusiasmo y lindas ideas. Arme planes, proyecte viajes. No alcanzo. Lo que viste hasta aqui no es un problema: es material. Con eso se construye.",
  instalacion:
    'Necesite maestros y ocho anos para cumplir los suenos que tenia eternamente postergados. Lo unico que no se recupera es el tiempo. Aqui "algun dia" se convierte en una fecha, o no se convierte en nada.',
  graduacion:
    "Hoy me levanto con un motivo potente. No porque desapareciera el miedo, sino porque le di salida a lo que llevaba dentro. El plano esta. Lo que sigue lo sostienes tu.",
};

// --- SU HISTORIA (para pantallas de contexto y para VALLE) ---
export const HISTORIA = {
  breve:
    "Cumpli 50 y sali de mi propio cumpleanos lleno de miedo. Lo peor no fue eso: fue darme cuenta de que me habia pasado la vida postergando mis suenos mas importantes, siempre para el futuro. Necesite ocho anos y varios maestros para salir de ahi. Hoy acompano a otros a hacerlo.",
  miedos: [
    "Preocupacion por la vejez",
    "Miedo a no estar vigente",
    "Incertidumbre financiera",
    "El deseo de disfrutar los anos que quedan",
  ],
  sintomas: [
    "Sensacion de vacio interno",
    "Dolores corporales y fatiga",
    "Melancolia por el pasado",
    "Nuevos temores ilogicos",
  ],
  logros: [
    "Vivir con un motivo potente para levantarme cada dia",
    "Cumplir decenas de suenos eternamente postergados",
    "Reinventar mi carrera profesional",
    "Liberarme de miedos financieros",
    "Amar profundamente mi soledad",
    "Disfrutar mas de mis vinculos",
    "Sentirme plenamente vigente",
  ],
  formacion:
    "Diseno Ontologico, Neurobiologia del Comportamiento, Flujo Cuantico Existencial, Neurociencias para el cambio. Master Certified Coach por la ICF.",
};

// --- CODIGOS DE ACCESO ---
export const PREFIJOS_VALIDOS = ["DISENO", "AUTOGUIADO", "DEMO"];
