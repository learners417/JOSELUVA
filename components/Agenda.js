"use client";

import { T } from "../lib/textos";
import { MARCA, EJE } from "../lib/programa";

export default function Agenda() {
  return (
    <div className="screen">
      <div className="eyebrow">{T.agenda.titulo}</div>
      <h1 className="screen-title">
        Reclama tu <em>lugar</em>
      </h1>
      <p className="screen-sub">{T.agenda.sub}</p>

      <div className="card card-gold">
        <div className="chip">Por que ahora</div>
        <p className="mirror">{EJE.activo}</p>
      </div>

      <div className="card">
        <div className="chip">En esta entrevista</div>
        <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="instr-nombre">Mentalidad focalizada</div>
          <div className="instr-desc">
            Que creencia invisible te impide disfrutar de tus logros actuales.
          </div>
        </div>
        <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="instr-nombre">Hoja de ruta personalizada</div>
          <div className="instr-desc">
            Los proximos pasos para construir tu legado, sin sacrificar tu vida.
          </div>
        </div>
        <div style={{ padding: "12px 0" }}>
          <div className="instr-nombre">Certeza de ejecucion</div>
          <div className="instr-desc">
            Como aplicar el sistema de 90 dias para transformar "algun dia" en
            una fecha.
          </div>
        </div>
      </div>

      <a
        className="btn btn-g"
        href={MARCA.agendaUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {T.agenda.boton}
      </a>

      <a
        className="btn btn-s"
        style={{ marginTop: 12 }}
        href={MARCA.vslUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver el metodo completo
      </a>

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
