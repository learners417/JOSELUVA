"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { PASOS, FASES } from "../lib/programa";

export default function Obra({ state, update, goTo }) {
  const done = state.pasosCompletados || [];
  const [abierto, setAbierto] = useState(null);

  // el paso actual es el primero no completado
  const actual = PASOS.find((p) => !done.includes(p.n))?.n || null;

  function toggleEvidencia(n) {
    const nuevos = done.includes(n)
      ? done.filter((x) => x !== n)
      : [...done, n];
    update({ pasosCompletados: nuevos });
  }

  return (
    <div className="screen">
      <div className="eyebrow">{T.obra.titulo}</div>
      <h1 className="screen-title">
        Tu obra, planta <em>por planta</em>
      </h1>
      <p className="screen-sub">{T.obra.sub}</p>

      <div style={{ marginBottom: 8 }}>
        <span className="pill">
          {done.length} / {PASOS.length} plantas
        </span>
      </div>
      <div className="prog-track">
        <div
          className="prog-fill"
          style={{ width: (done.length / PASOS.length) * 100 + "%" }}
        />
      </div>

      {/* Edificio (de arriba hacia abajo se ve el techo; usamos column-reverse) */}
      <div className="obra-wrap">
        {PASOS.map((p) => {
          const isDone = done.includes(p.n);
          const isCurrent = p.n === actual;
          return (
            <div key={p.n}>
              <button
                className={
                  "planta" +
                  (isDone ? " done" : "") +
                  (isCurrent ? " current" : "")
                }
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => setAbierto(abierto === p.n ? null : p.n)}
              >
                <div className="planta-n">{p.n}</div>
                <div className="planta-body">
                  <div className="planta-t">{p.titulo}</div>
                  <div className="planta-s">{p.subtitulo}</div>
                </div>
              </button>

              {abierto === p.n && (
                <div className="card" style={{ marginTop: 4 }}>
                  <p className="body-p" style={{ marginBottom: 14 }}>
                    {p.descripcion}
                  </p>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--goldb)",
                      fontWeight: 600,
                      marginBottom: 14,
                    }}
                  >
                    Resultado: {p.resultado}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "var(--dim)",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    Evidencia para levantar la planta
                  </div>
                  <p className="body-p" style={{ marginBottom: 14 }}>
                    {p.evidencia}
                  </p>
                  <button
                    className={isDone ? "btn btn-s" : "btn btn-g"}
                    onClick={() => toggleEvidencia(p.n)}
                  >
                    {isDone ? "Marcar como pendiente" : "Levantar esta planta"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="obra-base">Cimientos · Punto de partida</div>

      <div className="divider" />
      <div className="card">
        <div className="chip">Las 3 fases</div>
        {FASES.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "12px 0",
              borderBottom:
                i < FASES.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--sf)",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--cream)",
              }}
            >
              {f.nombre}{" "}
              <span
                style={{
                  fontSize: 12,
                  color: "var(--dim)",
                  fontWeight: 400,
                  fontFamily: "var(--sn)",
                }}
              >
                · {f.dias}
              </span>
            </div>
            <div style={{ fontSize: 14, color: "var(--dim)", marginTop: 3 }}>
              {f.meta}
            </div>
          </div>
        ))}
      </div>

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
