"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { VOZ_MAESTRO } from "../lib/programa";

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [nombre, setNombre] = useState("");
  const [dolor, setDolor] = useState(null);

  function finish() {
    onDone({ nombre: nombre.trim(), dolor, irv: null, ts: Date.now() });
  }

  return (
    <div className="screen" style={{ paddingTop: 48 }}>
      <div className="eyebrow">{T.onboarding.titulo}</div>
      <h1 className="screen-title">
        El primer <em>trazo</em>
      </h1>
      <p className="screen-sub">{T.onboarding.sub}</p>

      {step === 0 && (
        <div className="card">
          <label className="field-label">{T.onboarding.nombreLabel}</label>
          <input
            className="input"
            type="text"
            value={nombre}
            placeholder={T.onboarding.nombrePlaceholder}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && nombre.trim().length >= 2 && setStep(1)}
            autoFocus
          />
          <button
            className="btn btn-g"
            style={{ marginTop: 16 }}
            onClick={() => setStep(1)}
            disabled={nombre.trim().length < 2}
          >
            Continuar
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="card">
            <div className="chip">{T.onboarding.dolorTitulo}</div>
            {T.onboarding.dolores.map((d) => (
              <button
                key={d.clave}
                className={"opt" + (dolor === d.clave ? " sel" : "")}
                onClick={() => setDolor(d.clave)}
              >
                <span className="mk" />
                <span>{d.texto}</span>
              </button>
            ))}
          </div>
          <button
            className="btn btn-g"
            onClick={() => setStep(2)}
            disabled={!dolor}
          >
            {T.onboarding.boton}
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="card card-gold">
            <div className="chip">Jose Luis</div>
            <p className="mirror">{VOZ_MAESTRO.bienvenida}</p>
          </div>
          <button className="btn btn-g" onClick={finish}>
            Entrar a mi obra
          </button>
        </div>
      )}
    </div>
  );
}
