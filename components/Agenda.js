"use client";

import { T } from "../lib/textos";
import { MARCA, EJE, ESCALERA } from "../lib/programa";

// ============================================================
// AGENDA v3 - la Entrevista de Expansion + el mapa de la escalera.
// Muestra el camino completo (donde estas, hacia donde) sin venta
// agresiva ni precios: el valor y el orden, no la tarifa.
// ============================================================

export default function Agenda({ state }) {
  // Donde esta la persona en el camino: si tiene obra empezada,
  // ya paso el primer paso mentalmente.
  const tieneObra =
    (state?.plano?.proyecto || "").trim().length > 0 ||
    (state?.instrumentosHechos || []).length > 0;

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
        <div className="ag-item">
          <div className="instr-nombre">Que te frena de verdad</div>
          <div className="instr-desc">
            La creencia invisible que te tiene esperando, aunque lo tengas todo
            para avanzar.
          </div>
        </div>
        <div className="ag-item">
          <div className="instr-nombre">Por donde empezar</div>
          <div className="instr-desc">
            El primer trazo de tu plan para cumplir ese proyecto sin perder la
            calma.
          </div>
        </div>
        <div className="ag-item ag-item-last">
          <div className="instr-nombre">Cuando se vuelve real</div>
          <div className="instr-desc">
            Como el sistema de 90 dias convierte "algun dia" en una fecha.
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

      {/* EL MAPA DE LA ESCALERA - el camino completo */}
      <div className="divider" />
      <div className="eyebrow" style={{ marginTop: 8 }}>
        El camino
      </div>
      <h2 className="sh-mini">De aqui, hacia donde</h2>

      <div className="escalera">
        {ESCALERA.map((e, i) => {
          const esActual = e.clave === "entrevista";
          return (
            <div
              key={e.clave}
              className={
                "esc-nivel" +
                (e.destacado ? " esc-destacado" : "") +
                (esActual ? " esc-actual" : "")
              }
            >
              <div className="esc-linea">
                <span className="esc-dot" />
                {i < ESCALERA.length - 1 && <span className="esc-bar" />}
              </div>
              <div className="esc-body">
                <div className="esc-top">
                  <span className="esc-nivel-lbl">{e.nivel}</span>
                  <span className="esc-precio">{e.precio}</span>
                </div>
                <div className="esc-nombre">{e.nombre}</div>
                <p className="esc-desc">{e.desc}</p>
                {esActual && (
                  <span className="esc-aqui">Estas aqui</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a
        className="btn btn-s"
        style={{ marginTop: 18 }}
        href={MARCA.vslUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver el metodo completo
      </a>

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>
    </div>
  );
}
