"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "../lib/textos";
import { AUDIO_ALTO } from "../lib/programa";

// ============================================================
// EL ALTO v3 - regulacion, no wellness.
// Respiracion guiada real (inhala/sosten/exhala), la frase de
// corte, el audio de Jose, y conexion al diagnostico Copiloto
// de Regulacion. Estetica de cabina, no de meditacion.
// ============================================================

const FASES = [
  { nombre: "Inhala", seg: 4 },
  { nombre: "Sosten", seg: 4 },
  { nombre: "Exhala", seg: 6 },
];

export default function Alto({ state, update }) {
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState(0);
  const [ronda, setRonda] = useState(0);
  const timerRef = useRef(null);


  useEffect(() => {
    if (!activo) return;
    timerRef.current = setTimeout(() => {
      const sig = (fase + 1) % FASES.length;
      if (sig === 0) {
        if (ronda + 1 >= 4) {
          setActivo(false);
          setRonda(0);
          setFase(0);
          return;
        }
        setRonda(ronda + 1);
      }
      setFase(sig);
    }, FASES[fase].seg * 1000);
    return () => clearTimeout(timerRef.current);
  }, [activo, fase, ronda]);

  function toggle() {
    if (activo) {
      setActivo(false);
      setFase(0);
      setRonda(0);
    } else {
      setActivo(true);
      setFase(0);
      setRonda(0);
    }
  }

  const faseActual = FASES[fase];

  return (
    <div className="screen">
      <div className="eyebrow">{T.alto.titulo}</div>
      <h1 className="screen-title">
        Volver de la inercia <em>a la eleccion</em>
      </h1>
      <p className="screen-sub">{T.alto.sub}</p>

      {/* Respiracion guiada real */}
      <div className="card">
        <div className="chip">{T.alto.respiracion}</div>
        <div
          className={"breath-orb" + (activo ? " breath-live breath-" + fase : "")}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        >
          <span>{activo ? faseActual.nombre : "Empezar"}</span>
        </div>
        <p className="body-p" style={{ textAlign: "center", fontSize: 14, color: "var(--dim)" }}>
          {activo
            ? `Ronda ${ronda + 1} de 4`
            : "Cuatro rondas. 4 segundos inhala, 4 sosten, 6 exhala. Toca para empezar."}
        </p>
      </div>

      {/* Frase de corte */}
      <div className="card card-gold">
        <div className="chip">{T.alto.fraseTitulo}</div>
        <p className="mirror">{T.alto.frase}</p>
      </div>

      {/* Audio de Jose */}
      <div className="card">
        <div className="chip">{T.alto.audioTitulo}</div>
        <p className="body-p" style={{ marginBottom: 8, fontSize: 14, color: "var(--dim)" }}>
          {T.alto.audioSub}
        </p>
        <audio controls preload="metadata" src={AUDIO_ALTO}>
          Tu navegador no soporta audio.
        </audio>
      </div>

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>
</div>
  );
}
