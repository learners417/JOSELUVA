"use client";

import { T } from "../lib/textos";
import { MARCA } from "../lib/programa";

const ITEMS = [
  {
    key: "plan",
    nombre: "Ruta del Plan de Servicio",
    desc: "El puente entre lo que trabajas y lo que dejas en el mundo.",
  },
  {
    key: "alto",
    nombre: "El Alto",
    desc: "Regulación y presencia. Volver de la inercia a la elección.",
  },
  {
    key: "historia",
    nombre: "Por qué existe este método",
    desc: "La historia de José Luis, en sus palabras.",
  },
  {
    key: "agenda",
    nombre: "Entrevista de Expansión",
    desc: "45 minutos con José Luis. Sin costo.",
  },
];

const FOTO_JOSE =
  "https://assets.cdn.filesafe.space/m0oQv3eLz3Ewj8PeqgqY/media/67be22d3d5a8ef69127c6b6c.png";

export default function Mas({ goTo }) {
  return (
    <div className="screen">
      <div className="eyebrow">Mas</div>
      <h1 className="screen-title">
        Todo lo <em>demas</em>
      </h1>
      <p className="screen-sub">{MARCA.avatar}</p>

      {/* Jose Luis - cara humana, credencial */}
      <div className="jose-card">
        <img className="jose-foto" src={FOTO_JOSE} alt="Jose Luis Valle Tulian" />
        <div className="jose-info">
          <div className="jose-nombre">Jose Luis Valle Tulian</div>
          <div className="jose-cred">Master Certified Coach · ICF</div>
        </div>
      </div>

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
