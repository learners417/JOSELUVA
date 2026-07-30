"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "../lib/textos";
import { PASOS, FASES, evidenciaDePaso, plantasLevantadas } from "../lib/programa";

// ============================================================
// LA OBRA v3 - viva, por evidencia real.
// Las plantas se levantan cuando la EVIDENCIA existe en el
// estado (proyecto escrito, elecciones, dias de ritual,
// diagnosticos), no con un click. Celebracion medida al subir.
// ============================================================

export default function Obra({ state, update, goTo }) {
  const levantadas = plantasLevantadas(state);
  const [abierto, setAbierto] = useState(null);
  const [celebrar, setCelebrar] = useState(null); // n de la planta recien levantada
  const prevRef = useRef(levantadas.length);

  // Celebracion medida: solo cuando SUBE el numero de plantas.
  useEffect(() => {
    if (levantadas.length > prevRef.current) {
      const nueva = levantadas[levantadas.length - 1];
      setCelebrar(nueva);
      const t = setTimeout(() => setCelebrar(null), 2600);
      return () => clearTimeout(t);
    }
    prevRef.current = levantadas.length;
  }, [levantadas.length]);

  // El paso actual = el primero no levantado.
  const actual = PASOS.find((p) => !levantadas.includes(p.n))?.n || null;
  const pct = Math.round((levantadas.length / PASOS.length) * 100);

  // A donde manda cada paso para conseguir su evidencia.
  function irAPorEvidencia(paso) {
    if (paso.clave === "proyecto" || paso.clave === "instalacion")
      return goTo("plano");
    if (paso.clave === "optar-elegir" || paso.clave === "autonomia")
      return goTo("ritual");
    if (paso.instrumento) return goTo("mas"); // Instrumentos viven en Mas
    return goTo("plano");
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
          {levantadas.length} / {PASOS.length} plantas levantadas
        </span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: pct + "%" }} />
      </div>

      {/* Edificio: de abajo (cimientos) hacia arriba */}
      <div className="obra-wrap">
        {PASOS.map((p) => {
          const ev = evidenciaDePaso(p, state);
          const isDone = ev.hecha;
          const isCurrent = p.n === actual;
          const parcial = !isDone && ev.cuanto > 0;
          return (
            <div key={p.n}>
              <button
                className={
                  "planta" +
                  (isDone ? " done" : "") +
                  (isCurrent ? " current" : "") +
                  (celebrar === p.n ? " celebra" : "")
                }
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => setAbierto(abierto === p.n ? null : p.n)}
              >
                <div className="planta-n">{isDone ? "\u2713" : p.n}</div>
                <div className="planta-body">
                  <div className="planta-t">{p.titulo}</div>
                  <div className="planta-s">{p.subtitulo}</div>
                  {/* progreso parcial de la evidencia */}
                  {parcial && (
                    <div className="planta-ev">
                      <div className="planta-ev-track">
                        <div
                          className="planta-ev-fill"
                          style={{ width: (ev.cuanto / ev.meta) * 100 + "%" }}
                        />
                      </div>
                      <span className="planta-ev-lbl">
                        {ev.cuanto} / {ev.meta}
                      </span>
                    </div>
                  )}
                </div>
              </button>

              {abierto === p.n && (
                <div className="card" style={{ marginTop: 4 }}>
                  <p className="body-p" style={{ marginBottom: 14 }}>
                    {p.descripcion}
                  </p>
                  <div className="planta-res">Resultado: {p.resultado}</div>
                  <div className="planta-ev-head">
                    {isDone ? "Planta levantada" : "Como se levanta"}
                  </div>
                  <p className="body-p" style={{ marginBottom: 14 }}>
                    {isDone ? p.evidencia : ev.comoV}
                  </p>
                  {!isDone && (
                    <button
                      className="btn btn-g"
                      onClick={() => irAPorEvidencia(p)}
                    >
                      Ir a construirla
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="obra-base">Cimientos &middot; Punto de partida</div>

      <div className="divider" />
      <div className="card">
        <div className="chip">Las 3 fases</div>
        {FASES.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "12px 0",
              borderBottom:
                i < FASES.length - 1
                  ? "1px solid rgba(255,255,255,.06)"
                  : "none",
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
                &middot; {f.dias}
              </span>
            </div>
            <div style={{ fontSize: 14, color: "var(--dim)", marginTop: 3 }}>
              {f.meta}
            </div>
          </div>
        ))}
      </div>

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>
    </div>
  );
}
