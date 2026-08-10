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

      {/* HISTORIAL: lo escrito en semanas anteriores */}
      <HistorialBitacora entradas={state.bitacora || []} actual={actual} />

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}

// Semanas ya completadas, colapsables. El cliente vuelve a leer lo que escribio.
function HistorialBitacora({ entradas, actual }) {
  const previas = entradas
    .filter((e) => e.semanaN && e.semanaN < actual && (e.items || []).length)
    .sort((a, b) => b.semanaN - a.semanaN);
  const [abierta, setAbierta] = useState(null);

  if (previas.length === 0) return null;

  return (
    <div className="hist-bita">
      <div className="chip" style={{ marginBottom: 16 }}>
        Tu recorrido escrito
      </div>
      {previas.map((e) => {
        const open = abierta === e.semanaN;
        return (
          <div key={e.semanaN} className="hist-sem">
            <button
              className="hist-head"
              onClick={() => setAbierta(open ? null : e.semanaN)}
            >
              <div>
                <span className="hist-sem-n">Semana {e.semanaN}</span>
                {e.subtitulo && <span className="hist-sem-sub"> · {e.subtitulo}</span>}
              </div>
              <span className={"pc-caret" + (open ? " pc-caret-open" : "")}>
                <Icono name="flecha" size={13} />
              </span>
            </button>
            {open && (
              <div className="hist-items">
                {e.items.map((it, i) => (
                  <div className="hist-item" key={i}>
                    <div className="hist-item-ruta">
                      {it.nombre}
                      {it.etiqueta && <span className="hist-item-tag"> · {it.etiqueta}</span>}
                    </div>
                    <p className="hist-item-preg">{it.pregunta}</p>
                    <p className="hist-item-resp">{it.respuesta}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
