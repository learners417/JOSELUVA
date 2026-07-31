// ============================================================
// ICONOGRAFIA SVG PROPIA - cero emojis (patron de NIDO).
// Trazo fino y sobrio, para el mundo de Jose: arquitectura,
// tiempo, direccion. Se usan por nombre: Icono({name, size}).
// ============================================================

const P = {
  // plano / blueprint
  plano: "M4 4h16v16H4z M4 9h16 M9 9v11 M13 4v5",
  // columna / edificio
  obra: "M5 21V8l7-4 7 4v13 M9 21v-6h6v6 M5 12h14",
  // reloj de arena / decada
  reloj: "M7 3h10 M7 21h10 M7 3c0 4 5 5 5 9s-5 5-5 9 M17 3c0 4-5 5-5 9s5 5 5 9",
  // brujula / direccion
  brujula: "M12 2a10 10 0 100 20 10 10 0 000-20z M15.5 8.5l-2 5-5 2 2-5z",
  // conversacion / dialogo
  dialogo: "M4 5h16v10H9l-4 4V5z",
  // llave / acceso
  llave: "M14 7a4 4 0 11-4 4l-6 6 2 2 1-1 2 2 2-2-2-2 1-1",
  // pausa / alto
  alto: "M8 5v14 M16 5v14",
  // check
  check: "M4 12l5 5L20 6",
  // mesa / circulo
  mesa: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8v8 M8 12h8",
  // flecha derecha
  flecha: "M5 12h14 M13 6l6 6-6 6",
  // instrumento / medir
  medir: "M4 20L20 4 M9 4h11v11 M14 9l-4 4",
  // corazon / legado
  legado: "M12 20s-7-4.5-7-10a4 4 0 018-1 4 4 0 018 1c0 5.5-7 10-7 10z",
};

export default function Icono({ name, size = 22, stroke = "currentColor", width = 1.7 }) {
  const d = P[name] || P.plano;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i === 0 ? "" : "M") + seg} />
      ))}
    </svg>
  );
}
