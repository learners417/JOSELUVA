"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { VOZ_MAESTRO } from "../lib/programa";
import { DOLORES, PERSONAS } from "../lib/avatar";

// ============================================================
// ONBOARDING v3 - La Entrevista de Expansion en miniatura.
// No es un test: es la primera conversacion. Entra por el
// lenguaje que la persona YA usa (los 3 dolores con voz de reel),
// deja marcar las que resuenan, y devuelve un ESPEJO quirurgico
// con el reencuadre de Jose (no es crisis: es diseno).
// ============================================================

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [nombre, setNombre] = useState("");
  const [marcados, setMarcados] = useState([]); // claves de DOLORES que resuenan

  function toggle(clave) {
    setMarcados((prev) =>
      prev.includes(clave) ? prev.filter((c) => c !== clave) : [...prev, clave]
    );
  }

  // El dolor dominante = el primero que marco (o el de mas peso si marco varios).
  const dominante = marcados.length ? marcados[0] : null;
  const dolorDominante = DOLORES.find((d) => d.clave === dominante) || null;

  function finish() {
    onDone({
      nombre: nombre.trim(),
      dolor: dominante,
      dolores: marcados,
      irv: null,
      ts: Date.now(),
    });
  }

  return (
    <div className="screen" style={{ paddingTop: 44 }}>
      {/* PASO 0 - Apertura sobria + nombre */}
      {step === 0 && (
        <>
          <div className="eyebrow">La Entrevista de Expansion</div>
          <h1 className="screen-title">
            Antes de construir,<br />
            una <em>conversacion</em>.
          </h1>
          <p className="screen-sub">
            Esto no es un test. Nadie corrige nada. Es el primer trazo de tu
            plano, y empieza por tu nombre.
          </p>
          <div className="card">
            <label className="field-label">Como te llamas</label>
            <input
              className="input"
              type="text"
              value={nombre}
              placeholder="Tu nombre"
              onChange={(e) => setNombre(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && nombre.trim().length >= 2 && setStep(1)
              }
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
        </>
      )}

      {/* PASO 1 - Entrada por su lenguaje (las 3 voces de los reels) */}
      {step === 1 && (
        <>
          <div className="eyebrow">Paso 1 de 2</div>
          <h1 className="screen-title">
            {nombre.split(" ")[0]}, leelas sin apuro.
          </h1>
          <p className="screen-sub">
            Marca las que reconoces. Puede ser una, pueden ser las tres. No hay
            respuesta correcta: hay la tuya.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DOLORES.map((d) => {
              const on = marcados.includes(d.clave);
              return (
                <button
                  key={d.clave}
                  className={"voz-card" + (on ? " voz-on" : "")}
                  onClick={() => toggle(d.clave)}
                >
                  <span className="voz-mark">{on ? "\u2713" : ""}</span>
                  <span className="voz-text">"{d.voz}"</span>
                </button>
              );
            })}
          </div>
          <button
            className="btn btn-g"
            style={{ marginTop: 20 }}
            onClick={() => setStep(2)}
            disabled={marcados.length === 0}
          >
            Ver lo que esto dice de mi
          </button>
        </>
      )}

      {/* PASO 2 - EL ESPEJO QUIRURGICO + VOZ MAESTRO */}
      {step === 2 && dolorDominante && (
        <>
          <div className="eyebrow">Lo que escucho</div>
          <h1 className="screen-title">
            {nombre.split(" ")[0]}, esto no es{" "}
            <em>lo que crees que es.</em>
          </h1>

          {/* El reencuadre del dolor dominante - la voz de arquitecto */}
          <div className="card card-gold">
            <p className="mirror">{dolorDominante.reencuadre}</p>
          </div>

          {/* Si marco mas de uno, nombrar el patron sin patologizar */}
          {marcados.length > 1 && (
            <p
              className="screen-sub"
              style={{ marginTop: 18, marginBottom: 0 }}
            >
              Marcaste {marcados.length === 3 ? "las tres" : "mas de una"}. No
              son tres problemas distintos: son el mismo mecanismo mirado desde
              tres ventanas. Eso, en realidad, simplifica el trabajo.
            </p>
          )}

          {/* VOZ MAESTRO - Jose en primera persona */}
          <div className="card" style={{ marginTop: 18 }}>
            <div className="chip">Jose Luis</div>
            <p className="mirror">{VOZ_MAESTRO.bienvenida}</p>
          </div>

          <button className="btn btn-g" onClick={finish}>
            Entrar a mi obra
          </button>
          <button
            className="btn-ghost"
            style={{ marginTop: 10 }}
            onClick={() => setStep(1)}
          >
            Volver
          </button>
        </>
      )}
    </div>
  );
}
