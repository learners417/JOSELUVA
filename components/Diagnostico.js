"use client";

import { useState } from "react";
import { DIAGNOSTICOS, ESCALA, calcularResultado } from "../lib/diagnosticos";

// ============================================================
// EL MOTOR DE DIAGNOSTICO - corre cualquiera de los 6.
// Preguntas tipo escala -> informe por tramo. Guarda el
// resultado en el estado (instrumentosHechos + diagResultados)
// para que VALLE lo conozca y La Obra levante la planta.
// ============================================================

export default function Diagnostico({ clave, state, update, onClose }) {
  const d = DIAGNOSTICOS[clave];
  const [paso, setPaso] = useState(-1); // -1 = intro, 0..n-1 preguntas, n = resultado
  const [resp, setResp] = useState([]);

  if (!d) return null;

  const total = d.preguntas.length;
  const enResultado = paso >= total;
  const resultado = enResultado ? calcularResultado(clave, resp) : null;

  function responder(v) {
    const nuevas = [...resp];
    nuevas[paso] = v;
    setResp(nuevas);
    setTimeout(() => setPaso(paso + 1), 180);
  }

  function guardarYcerrar() {
    const hechos = state.instrumentosHechos || [];
    const nuevos = hechos.includes(clave) ? hechos : [...hechos, clave];
    const resultados = { ...(state.diagResultados || {}) };
    resultados[clave] = {
      score: resultado.score,
      tramo: resultado.tramo,
      titulo: resultado.informe.titulo,
      ts: Date.now(),
    };
    update({ instrumentosHechos: nuevos, diagResultados: resultados });
    onClose();
  }

  return (
    <div className="diag-overlay">
      <div className="diag-box">
        <button className="diag-x" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>

        {/* INTRO */}
        {paso === -1 && (
          <>
            <div className="eyebrow">{d.nombre}</div>
            <p className="diag-intro">{d.intro}</p>
            <button className="btn btn-g" onClick={() => setPaso(0)}>
              Empezar
            </button>
          </>
        )}

        {/* PREGUNTAS */}
        {paso >= 0 && paso < total && (
          <>
            <div className="diag-prog">
              <div
                className="diag-prog-fill"
                style={{ width: ((paso + 1) / total) * 100 + "%" }}
              />
            </div>
            <div className="diag-qn">
              {paso + 1} de {total}
            </div>
            <p className="diag-q">{d.preguntas[paso]}</p>
            <div className="diag-escala">
              {ESCALA.map((e) => (
                <button
                  key={e.v}
                  className={"diag-opt" + (resp[paso] === e.v ? " sel" : "")}
                  onClick={() => responder(e.v)}
                >
                  {e.label}
                </button>
              ))}
            </div>
            {paso > 0 && (
              <button
                className="btn-ghost"
                onClick={() => setPaso(paso - 1)}
              >
                Volver
              </button>
            )}
          </>
        )}

        {/* RESULTADO */}
        {enResultado && resultado && (
          <>
            <div className="eyebrow">Lo que escucho</div>
            <div className="diag-score">
              <div className="diag-ring-wrap">
                <svg viewBox="0 0 120 120" className="diag-ring-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(207,176,83,0.12)" strokeWidth="6" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="url(#ringfoil)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - resultado.score / 100)}
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
                  />
                  <defs>
                    <linearGradient id="ringfoil" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#B8963F" />
                      <stop offset="50%" stopColor="#E8D4A0" />
                      <stop offset="100%" stopColor="#CFB053" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="diag-ring-n">{resultado.score}</span>
              </div>
              <div className="diag-score-lbl">Índice de alineación</div>
            </div>
            <h2 className="diag-res-titulo">{resultado.informe.titulo}</h2>
            <p className="diag-res-texto">{resultado.informe.texto}</p>
            <button className="btn btn-g" onClick={guardarYcerrar}>
              Guardar en mi obra
            </button>
            <p className="diag-nota">
              Este resultado queda en tu obra y Valle lo tiene presente.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
