"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { VOZ_MAESTRO, EJE, MARCA } from "../lib/programa";

export default function Plano({ state, update }) {
  const anioBase = new Date().getFullYear();
  const HITOS = [3, 6, 9, 12];

  const p = state.plano || {};
  const [proyecto, setProyecto] = useState(p.proyecto || "");
  const [desde, setDesde] = useState(p.desde || "");
  const [hitos, setHitos] = useState(p.hitos || {});
  const [movs, setMovs] = useState(p.movimientos || {});
  const [editando, setEditando] = useState(!p.proyecto);

  function guardar() {
    update({ plano: { proyecto, desde, hitos, movimientos: movs } });
    setEditando(false);
  }

  const tieneProyecto = !!(p.proyecto && p.proyecto.trim());

  const OPC_DESDE = [
    "Menos de un ano",
    "Entre 1 y 3 anos",
    "Entre 3 y 10 anos",
    "Mas de 10 anos",
  ];

  return (
    <div className="screen">
      <div className="eyebrow">{T.plano.titulo}</div>
      <h1 className="screen-title">
        Lo que vienes <em>posponiendo</em>
      </h1>
      <p className="screen-sub">{T.plano.sub}</p>

      {/* Premisa */}
      <div className="card card-gold">
        <div className="chip">La premisa</div>
        <p className="mirror">{EJE.headline}</p>
      </div>

      {/* EL PROYECTO */}
      <div className="card">
        <div className="chip">{T.plano.proyectoTitulo}</div>
        {editando ? (
          <>
            <label className="field-label">{T.plano.proyectoLabel}</label>
            <textarea
              className="textarea"
              value={proyecto}
              placeholder={T.plano.proyectoPlaceholder}
              onChange={(e) => setProyecto(e.target.value)}
            />
            <label className="field-label" style={{ marginTop: 20 }}>
              {T.plano.proyectoDesde}
            </label>
            {OPC_DESDE.map((o) => (
              <button
                key={o}
                className={"opt" + (desde === o ? " sel" : "")}
                onClick={() => setDesde(o)}
              >
                <span className="mk" />
                <span>{o}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <p className="mirror">{p.proyecto}</p>
            {p.desde && (
              <div style={{ marginTop: 14 }}>
                <span className="pill">Postergado: {p.desde}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Voz maestro tras nombrarlo */}
      {tieneProyecto && !editando && (
        <div className="card">
          <div className="chip">Jose Luis</div>
          <p className="body-p">{VOZ_MAESTRO.proyecto}</p>
        </div>
      )}

      {/* LOS 3 MOVIMIENTOS (de algun dia a una fecha) */}
      <div className="card card-gold">
        <div className="chip">{T.plano.movimientosTitulo}</div>
        {T.plano.movLabels.map((lbl, i) => (
          <div
            key={i}
            style={{
              padding: "14px 0",
              borderBottom:
                i < 2 ? "1px solid rgba(255,255,255,.06)" : "none",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--goldb)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {lbl}
            </div>
            {editando ? (
              <input
                className="input"
                value={movs[i] || ""}
                placeholder="Que se mueve, concretamente..."
                onChange={(e) => setMovs({ ...movs, [i]: e.target.value })}
              />
            ) : (
              <p className="body-p">
                {(p.movimientos || {})[i] || (
                  <span style={{ color: "var(--dim)", fontStyle: "italic" }}>
                    Sin definir
                  </span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* LOS 12 ANOS */}
      <div className="card">
        <div className="chip">{T.plano.hitosTitulo}</div>
        {HITOS.map((off) => (
          <div
            key={off}
            style={{
              padding: "14px 0",
              borderBottom:
                off < 12 ? "1px solid rgba(255,255,255,.06)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--sf)",
                fontSize: 14,
                color: "var(--goldb)",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              +{off} anos · {anioBase + off}
            </div>
            {editando ? (
              <input
                className="input"
                value={hitos[off] || ""}
                placeholder="Que quieres que exista para esta fecha..."
                onChange={(e) => setHitos({ ...hitos, [off]: e.target.value })}
              />
            ) : (
              <p className="body-p">
                {(p.hitos || {})[off] || (
                  <span style={{ color: "var(--dim)", fontStyle: "italic" }}>
                    Sin definir
                  </span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {editando ? (
        <button
          className="btn btn-g"
          onClick={guardar}
          disabled={proyecto.trim().length < 4}
        >
          Guardar mi plano
        </button>
      ) : (
        <button className="btn btn-s" onClick={() => setEditando(true)}>
          Editar mi plano
        </button>
      )}

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
