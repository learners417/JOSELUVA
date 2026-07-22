"use client";

import { T } from "../lib/textos";
import { MARCA } from "../lib/programa";

const ITEMS = [
  {
    key: "historia",
    nombre: "Por que existe este metodo",
    desc: "La historia de Jose Luis, en sus palabras.",
  },
  {
    key: "instrumentos",
    nombre: "Instrumentos",
    desc: "Las 9 herramientas de medicion del metodo.",
  },
  {
    key: "agenda",
    nombre: "Entrevista de Expansion",
    desc: "45 minutos con Jose Luis. Sin costo.",
  },
  {
    key: "mesa",
    nombre: "La Mesa",
    desc: "La comunidad de pares. Proximamente.",
  },
];

export default function Mas({ goTo }) {
  return (
    <div className="screen">
      <div className="eyebrow">Mas</div>
      <h1 className="screen-title">
        Todo lo <em>demas</em>
      </h1>
      <p className="screen-sub">{MARCA.avatar}</p>

      {ITEMS.map((i) => (
        <button
          key={i.key}
          className="instr-link"
          style={{
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            font: "inherit",
          }}
          onClick={() => goTo(i.key)}
        >
          <div className="instr-nombre">{i.nombre}</div>
          <div className="instr-desc">{i.desc}</div>
        </button>
      ))}

      <p className="foot-note">
        {T.marca} · {T.firma}
      </p>
    </div>
  );
}
