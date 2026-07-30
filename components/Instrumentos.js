"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { INSTRUMENTOS } from "../lib/programa";
import { DIAGNOSTICOS } from "../lib/diagnosticos";
import Diagnostico from "./Diagnostico";

// ============================================================
// INSTRUMENTOS v3 - los 6 diagnosticos corren DENTRO de la app.
// Ya no son links que sacan afuera: abren el motor nativo,
// guardan resultado, lo ve VALLE y levantan la planta de La Obra.
// Los que son solo audio/contenido siguen como enlace.
// ============================================================

export default function Instrumentos({ state, update }) {
  const [abierto, setAbierto] = useState(null); // clave del diagnostico activo
  const hechos = state.instrumentosHechos || [];
  const resultados = state.diagResultados || {};

  return (
    <div className="screen">
      <div className="eyebrow">Instrumentos</div>
      <h1 className="screen-title">
        Tus <em>instrumentos</em>
      </h1>
      <p className="screen-sub">{T.instrumentos.sub}</p>

      {INSTRUMENTOS.map((ins) => {
        const esDiag = !!DIAGNOSTICOS[ins.clave];
        const hecho = hechos.includes(ins.clave);
        const res = resultados[ins.clave];

        // Diagnostico nativo
        if (esDiag) {
          return (
            <button
              key={ins.clave}
              className={"instr-card" + (hecho ? " instr-done" : "")}
              onClick={() => setAbierto(ins.clave)}
            >
              <div className="instr-card-top">
                <div className="instr-nombre">{ins.nombre}</div>
                {hecho && res ? (
                  <span className="instr-score">{res.score}</span>
                ) : (
                  <span className="instr-cta">Hacerlo &rarr;</span>
                )}
              </div>
              <div className="instr-desc">
                {hecho && res ? res.titulo : ins.desc}
              </div>
            </button>
          );
        }

        // Audio / contenido: sigue como enlace
        return (
          <a
            key={ins.clave}
            className="instr-card"
            href={ins.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="instr-card-top">
              <div className="instr-nombre">{ins.nombre}</div>
              <span className="instr-cta">Abrir &rarr;</span>
            </div>
            <div className="instr-desc">{ins.desc}</div>
          </a>
        );
      })}

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>

      {abierto && (
        <Diagnostico
          clave={abierto}
          state={state}
          update={update}
          onClose={() => setAbierto(null)}
        />
      )}
    </div>
  );
}
