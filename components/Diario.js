"use client";

import { useState } from "react";
import { SEMANAS } from "../lib/curso";
import { semanaActual, PREGUNTA_SEMANA, semanaCompleta } from "../lib/progreso";
import Icono from "../lib/iconos";

// ============================================================
// LA BITACORA - la actividad guiada de cada semana.
// No es un diario en blanco: cada semana trae SU pregunta
// (ligada a la clase). Responderla completa la semana y
// desbloquea la siguiente. Ahi el curso se vuelve tuyo.
// ============================================================

export default function Diario({ state, update }) {
  const entradas = state.bitacora || [];
  const hechas = state.bitacoraSemanas || [];
  const actual = semanaActual(state);
  const semanaObj = SEMANAS.find((w) => w.n === actual);
  const pregunta = PREGUNTA_SEMANA[actual] || "¿Que te llevas de esta semana?";
  const yaHecha = hechas.includes(actual);

  const [texto, setTexto] = useState("");

  function guardar() {
    if (texto.trim().length < 3) return;
    const nueva = {
      semana: `Semana ${actual}`,
      semanaN: actual,
      pregunta,
      texto: texto.trim(),
      fecha: new Date().toISOString().slice(0, 10),
    };
    update({
      bitacora: [nueva, ...entradas],
      bitacoraSemanas: hechas.includes(actual) ? hechas : [...hechas, actual],
    });
    setTexto("");
  }

  return (
    <div className="screen">
      <div className="eyebrow">La actividad · Semana {actual}</div>
      <h1 className="screen-title">
        Tu <em>Bitácora</em>
      </h1>
      <p className="screen-sub">
        El curso se mira. El proceso se escribe. Esta es la pregunta de tu
        semana: respóndela con honestidad y quedará registrada en tu camino.
      </p>

      {/* La pregunta de la semana - la actividad */}
      <div className="card card-gold">
        <div className="chip">Semana {actual} · {semanaObj?.subtitulo}</div>
        <p className="mirror" style={{ marginBottom: 20 }}>
          {pregunta}
        </p>
        <textarea
          className="textarea"
          value={texto}
          placeholder="Tómate un momento. Escribe lo que de verdad notas..."
          onChange={(e) => setTexto(e.target.value)}
          style={{ minHeight: 130 }}
        />
        <button
          className="btn btn-g"
          style={{ marginTop: 16 }}
          onClick={guardar}
          disabled={texto.trim().length < 3}
        >
          {yaHecha ? "Guardar otra reflexión" : "Completar la actividad"}
        </button>
        {yaHecha && (
          <div className="bitacora-hecha">
            <Icono name="check" size={15} /> Actividad de la semana {actual}{" "}
            completa
          </div>
        )}
      </div>

      {/* Lo registrado */}
      {entradas.length > 0 && (
        <>
          <div className="chip" style={{ marginTop: 28 }}>
            Tu recorrido escrito
          </div>
          <div className="diario-lista">
            {entradas.map((e, i) => (
              <div className="diario-entrada" key={i}>
                <div className="diario-top">
                  <span className="diario-semana">{e.semana}</span>
                  <span className="diario-fecha">{e.fecha}</span>
                </div>
                {e.pregunta && (
                  <p className="diario-pregunta">{e.pregunta}</p>
                )}
                <p className="diario-texto">{e.texto}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
