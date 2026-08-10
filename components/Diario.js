"use client";

import { useState } from "react";
import { SEMANAS } from "../lib/curso";
import { semanaActual } from "../lib/progreso";
import { preguntasSemana } from "../lib/bitacora";
import { rutasIncluidas } from "../lib/programas";
import Icono from "../lib/iconos";

// ============================================================
// LA BITACORA - fiel al proceso real de Jose (Excel oficial).
// Muestra solo las rutas incluidas en el PROGRAMA del cliente
// (autoguiado / coaching / mentoria). Cada ruta trae su
// pregunta textual ligada a la clase de esa semana.
// ============================================================

export default function Diario({ state, update }) {
  const actual = semanaActual(state);
  const semanaObj = SEMANAS.find((w) => w.n === actual);
  // Filtra las preguntas: solo las rutas que el cliente compro.
  const incluidas = rutasIncluidas(state.programa);
  const preguntas = preguntasSemana(actual).filter((p) =>
    incluidas.includes(p.ruta)
  );
  const hechas = state.bitacoraSemanas || [];
  const yaHecha = hechas.includes(actual);

  // Respuestas guardadas de esta semana: { "s3-mindfulness": "texto", ... }
  const guardadas = (state.bitacoraRespuestas || {})[actual] || {};
  const [respuestas, setRespuestas] = useState(guardadas);

  function setResp(ruta, idx, val) {
    const key = ruta + "-" + idx;
    setRespuestas((r) => ({ ...r, [key]: val }));
  }

  // Cuantas respondio (con algo de texto)
  const respondidas = preguntas.filter(
    (p, i) => (respuestas[p.ruta + "-" + i] || "").trim().length > 2
  ).length;
  const completa = respondidas === preguntas.length && preguntas.length > 0;

  function guardar() {
    const nuevoTramo = { ...(state.bitacoraRespuestas || {}), [actual]: respuestas };
    // Entrada legible para el recorrido escrito
    const entradas = state.bitacora || [];
    const nueva = {
      semana: `Semana ${actual}`,
      semanaN: actual,
      subtitulo: semanaObj?.subtitulo || "",
      fecha: new Date().toISOString().slice(0, 10),
      items: preguntas.map((p, i) => ({
        nombre: p.nombre,
        etiqueta: p.etiqueta,
        pregunta: p.pregunta,
        respuesta: respuestas[p.ruta + "-" + i] || "",
      })).filter((x) => x.respuesta.trim()),
    };
    update({
      bitacoraRespuestas: nuevoTramo,
      bitacora: [nueva, ...entradas.filter((e) => e.semanaN !== actual)],
      bitacoraSemanas: completa && !hechas.includes(actual) ? [...hechas, actual] : hechas,
    });
  }

  return (
    <div className="screen">
      <div className="eyebrow">La actividad · Semana {actual}</div>
      <h1 className="screen-title">
        Tu <em>Bitácora</em>
      </h1>
      <p className="screen-sub">
        El curso se mira. El proceso se escribe. Cada práctica de esta semana
        deja una pregunta. Baja aquí lo que de verdad notas — así el proceso
        queda tuyo.
      </p>

      {/* Progreso de la semana */}
      <div className="bita-prog">
        <span className="bita-prog-n">
          {respondidas} <span>de {preguntas.length}</span>
        </span>
        <div className="bita-prog-bar">
          <span
            style={{
              width: preguntas.length
                ? (respondidas / preguntas.length) * 100 + "%"
                : "0%",
            }}
          />
        </div>
      </div>

      {/* Las rutas de la semana, cada una con su pregunta textual */}
      <div className="bita-lista">
        {preguntas.map((p, i) => {
          const key = p.ruta + "-" + i;
          const val = respuestas[key] || "";
          const lista = val.trim().length > 2;
          return (
            <div key={key} className={"bita-item" + (lista ? " bi-on" : "")}>
              <div className="bita-ruta">
                <span className="bita-ruta-nombre">{p.nombre}</span>
                {p.etiqueta && <span className="bita-ruta-tag">{p.etiqueta}</span>}
              </div>
              <p className="bita-pregunta">{p.pregunta}</p>
              <textarea
                className="textarea bita-ta"
                value={val}
                placeholder="Tu insight / reflexión..."
                onChange={(e) => setResp(p.ruta, i, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {preguntas.length === 0 && (
        <div className="card">
          <p className="mirror">
            Las preguntas de esta semana se cargan cuando abras sus clases.
          </p>
        </div>
      )}

      {/* Guardar */}
      {preguntas.length > 0 && (
        <button
          className="btn btn-g"
          style={{ marginTop: 8 }}
          onClick={guardar}
        >
          {completa ? "Completar la semana" : "Guardar mi avance"}
        </button>
      )}
      {yaHecha && (
        <div className="bitacora-hecha">
          <Icono name="check" size={15} /> Semana {actual} completa
        </div>
      )}

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
