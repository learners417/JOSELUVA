"use client";

import { T } from "../lib/textos";
import { INSTRUMENTOS } from "../lib/programa";

export default function Instrumentos() {
  return (
    <div className="screen">
      <div className="eyebrow">Instrumentos</div>
      <h1 className="screen-title">
        Tus <em>instrumentos</em>
      </h1>
      <p className="screen-sub">{T.instrumentos.sub}</p>

      {INSTRUMENTOS.map((ins) => (
        <a
          key={ins.clave}
          className="instr-link"
          href={ins.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="instr-nombre">{ins.nombre}</div>
          <div className="instr-desc">{ins.desc}</div>
        </a>
      ))}

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
