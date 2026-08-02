"use client";

import { useState } from "react";
import { SEMANAS } from "../lib/curso";
import Icono from "../lib/iconos";

// ============================================================
// LA BITACORA DE APRENDIZAJE - el diario del proceso.
// Registras lo que te llevas de cada semana. Lo que se escribe,
// se integra. Herramienta nativa del curso real.
// ============================================================

export default function Diario({ state, update }) {
  const entradas = state.bitacora || [];
  const [semana, setSemana] = useState("");
  const [texto, setTexto] = useState("");

  function guardar() {
    if (!texto.trim()) return;
    const nueva = {
      semana: semana || "General",
      texto: texto.trim(),
      fecha: new Date().toISOString().slice(0, 10),
    };
    update({ bitacora: [nueva, ...entradas] });
    setTexto("");
    setSemana("");
  }

  return (
    <div className="screen">
      <div className="eyebrow">Herramienta</div>
      <h1 className="screen-title">
        Tu <em>Bitácora</em>
      </h1>
      <p className="screen-sub">
        El curso se mira. El proceso se escribe. Deja acá lo que cada semana
        movió en ti: una idea, una decisión, una conversación que te faltaba.
      </p>

      {/* Nueva entrada */}
      <div className="card">
        <div className="chip">Nueva entrada</div>
        <select
          className="input"
          value={semana}
          onChange={(e) => setSemana(e.target.value)}
          style={{ marginBottom: 12 }}
        >
          <option value="">¿De qué semana?</option>
          {SEMANAS.map((w) => (
            <option key={w.n} value={`Semana ${w.n}`}>
              Semana {w.n} · {w.subtitulo}
            </option>
          ))}
        </select>
        <textarea
          className="textarea"
          value={texto}
          placeholder="Lo que me llevo de esto..."
          onChange={(e) => setTexto(e.target.value)}
          style={{ minHeight: 100 }}
        />
        <button
          className="btn btn-g"
          style={{ marginTop: 14 }}
          onClick={guardar}
          disabled={texto.trim().length < 3}
        >
          Guardar en mi bitácora
        </button>
      </div>

      {/* Entradas anteriores */}
      {entradas.length > 0 && (
        <>
          <div className="chip" style={{ marginTop: 24 }}>
            Lo que vengo registrando
          </div>
          <div className="diario-lista">
            {entradas.map((e, i) => (
              <div className="diario-entrada" key={i}>
                <div className="diario-top">
                  <span className="diario-semana">{e.semana}</span>
                  <span className="diario-fecha">{e.fecha}</span>
                </div>
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
