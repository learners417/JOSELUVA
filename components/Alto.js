"use client";

import { T } from "../lib/textos";

import { AUDIO_ALTO } from "../lib/programa";

export default function Alto() {
  return (
    <div className="screen">
      <div className="eyebrow">{T.alto.titulo}</div>
      <h1 className="screen-title">
        Un alto en el <em>camino</em>
      </h1>
      <p className="screen-sub">{T.alto.sub}</p>

      {/* Respiracion */}
      <div className="card">
        <div className="chip">{T.alto.respiracion}</div>
        <div className="breath-orb">
          <span>Respira</span>
        </div>
        <p
          className="body-p"
          style={{ textAlign: "center", fontSize: 14, color: "var(--dim)" }}
        >
          Sigue el circulo. Inhala cuando crece, exhala cuando baja. Cuatro
          rondas alcanzan.
        </p>
      </div>

      {/* Frase */}
      <div className="card card-gold">
        <div className="chip">{T.alto.fraseTitulo}</div>
        <p className="mirror">{T.alto.frase}</p>
      </div>

      {/* Audio */}
      <div className="card">
        <div className="chip">{T.alto.audioTitulo}</div>
        <p
          className="body-p"
          style={{ marginBottom: 8, fontSize: 14, color: "var(--dim)" }}
        >
          {T.alto.audioSub}
        </p>
        <audio controls preload="metadata" src={AUDIO_ALTO}>
          Tu navegador no soporta audio.
        </audio>
      </div>

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
