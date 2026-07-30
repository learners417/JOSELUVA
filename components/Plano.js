"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { VOZ_MAESTRO, EJE, MARCA } from "../lib/programa";

// ============================================================
// EL PLANO v3 - El blueprint de la decada de oro.
// De formulario a activo central: la linea de tiempo real de
// los 10 anos (segun la edad), el contraste castillo -> reino,
// y estetica de documento de arquitecto (descargable).
// ============================================================

const TRAMOS = [
  { clave: "50-54", base: 52, label: "50 a 54" },
  { clave: "55-59", base: 57, label: "55 a 59" },
  { clave: "60-65", base: 62, label: "60 a 65" },
];

export default function Plano({ state, update }) {
  const p = state.plano || {};
  const [proyecto, setProyecto] = useState(p.proyecto || "");
  const [desde, setDesde] = useState(p.desde || "");
  const [tramo, setTramo] = useState(p.tramo || "");
  const [castillo, setCastillo] = useState(p.castillo || "");
  const [reino, setReino] = useState(p.reino || "");
  const [hitos, setHitos] = useState(p.hitos || {});
  const [movs, setMovs] = useState(p.movimientos || {});
  const [editando, setEditando] = useState(!p.proyecto);

  // La decada de oro arranca en la edad base del tramo elegido.
  const edadBase = (TRAMOS.find((t) => t.clave === (tramo || p.tramo)) || {})
    .base;
  const anioActual = new Date().getFullYear();
  // 4 marcas dentro de la decada: +1, +3, +6, +10 anos.
  const MARCAS = [1, 3, 6, 10];

  function guardar() {
    update({
      plano: {
        proyecto,
        desde,
        tramo,
        castillo,
        reino,
        hitos,
        movimientos: movs,
      },
    });
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
      {/* Encabezado tipo documento de arquitecto */}
      <div className="plano-doc-head">
        <div>
          <div className="eyebrow">{T.plano.titulo}</div>
          <h1 className="screen-title" style={{ marginBottom: 6 }}>
            El plano de tu <em>decada de oro</em>
          </h1>
        </div>
        <div className="plano-sello">SA</div>
      </div>
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

      {/* CASTILLO -> REINO (la distincion visual) */}
      <div className="card">
        <div className="chip">Castillo y reino</div>
        <p className="body-p" style={{ marginBottom: 18 }}>
          El castillo es lo que construiste y se ve desde afuera. El reino es la
          vida que de verdad habitas. No siempre coinciden.
        </p>
        <div className="cr-grid">
          <div className="cr-col cr-castillo">
            <div className="cr-label">El castillo que ya tienes</div>
            {editando ? (
              <textarea
                className="textarea cr-ta"
                value={castillo}
                placeholder="Lo construido: empresa, patrimonio, cargo, reconocimiento..."
                onChange={(e) => setCastillo(e.target.value)}
              />
            ) : (
              <p className="cr-text">
                {p.castillo || (
                  <span className="cr-empty">Sin definir</span>
                )}
              </p>
            )}
          </div>
          <div className="cr-arrow">&rarr;</div>
          <div className="cr-col cr-reino">
            <div className="cr-label">El reino que quieres habitar</div>
            {editando ? (
              <textarea
                className="textarea cr-ta"
                value={reino}
                placeholder="La vida que quieres vivir de verdad, no solo tener..."
                onChange={(e) => setReino(e.target.value)}
              />
            ) : (
              <p className="cr-text">
                {p.reino || <span className="cr-empty">Sin definir</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TU PUNTO DE PARTIDA (edad -> ancla la decada) */}
      <div className="card">
        <div className="chip">{T.plano.edadTitulo}</div>
        {editando ? (
          <>
            <label className="field-label">{T.plano.edadLabel}</label>
            <div className="tramo-row">
              {TRAMOS.map((tr) => (
                <button
                  key={tr.clave}
                  className={"tramo-btn" + (tramo === tr.clave ? " sel" : "")}
                  onClick={() => setTramo(tr.clave)}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          p.tramo && (
            <p className="body-p">
              Tu decada de oro corre entre los{" "}
              <strong>
                {(TRAMOS.find((t) => t.clave === p.tramo) || {}).label} anos
              </strong>
              . Son estos 10 anos, no otros.
            </p>
          )
        )}
      </div>

      {/* LA DECADA DE ORO - linea de tiempo real */}
      {(tramo || p.tramo) && edadBase && (
        <div className="card card-gold">
          <div className="chip">{T.plano.hitosTitulo}</div>
          <p className="body-p" style={{ marginBottom: 6 }}>
            {T.plano.hitosSub}
          </p>
          <div className="decada-line">
            {MARCAS.map((off, i) => (
              <div key={off} className="decada-hito">
                <div className="decada-nodo">
                  <span className="decada-dot" />
                  {i < MARCAS.length - 1 && <span className="decada-bar" />}
                </div>
                <div className="decada-body">
                  <div className="decada-edad">
                    {edadBase + off} anos &middot; {anioActual + off}
                  </div>
                  {editando ? (
                    <input
                      className="input"
                      value={hitos[off] || ""}
                      placeholder="Que quieres que exista para esta edad..."
                      onChange={(e) =>
                        setHitos({ ...hitos, [off]: e.target.value })
                      }
                    />
                  ) : (
                    <p className="body-p">
                      {(p.hitos || {})[off] || (
                        <span className="cr-empty">Sin definir</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOS 3 MOVIMIENTOS (de algun dia a una fecha) */}
      <div className="card">
        <div className="chip">{T.plano.movimientosTitulo}</div>
        {T.plano.movLabels.map((lbl, i) => (
          <div
            key={i}
            style={{
              padding: "14px 0",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none",
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
                  <span className="cr-empty">Sin definir</span>
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
        {MARCA.metodo} &middot; {MARCA.autor}
      </p>
    </div>
  );
}
