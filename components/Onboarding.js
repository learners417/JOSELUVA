"use client";

import { useState } from "react";

// ============================================================
// ONBOARDING - la entrada al camino. Sobrio, editorial.
// No es un test: es el primer trazo. Pide el nombre y el sueno
// que trae, y abre las doce semanas. Alineado al curso real.
// ============================================================

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [nombre, setNombre] = useState("");
  const [sueno, setSueno] = useState("");

  function finish() {
    onDone({
      nombre: nombre.trim(),
      sueno: sueno.trim(),
      ts: Date.now(),
    });
  }

  return (
    <div className="screen" style={{ paddingTop: 56 }}>
      {/* PASO 0 - Bienvenida + nombre */}
      {step === 0 && (
        <>
          <div className="eyebrow">Serena Ambición</div>
          <h1 className="screen-title">
            Antes de empezar,<br />
            una <em>conversación</em>.
          </h1>
          <p className="screen-sub">
            Este no es un curso más para mirar. Es un camino para recorrer. Y
            todo camino empieza por saber quién lo anda.
          </p>
          <div className="card">
            <label className="field-label">Cómo te llamas</label>
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
              style={{ marginTop: 20 }}
              onClick={() => setStep(1)}
              disabled={nombre.trim().length < 2}
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* PASO 1 - El sueno que trae */}
      {step === 1 && (
        <>
          <div className="eyebrow">Paso 1</div>
          <h1 className="screen-title">
            {nombre.split(" ")[0]}, ¿qué viniste a <em>diseñar</em>?
          </h1>
          <p className="screen-sub">
            No hace falta que sea perfecto ni definitivo. Solo eso que hace
            tiempo dejaste para "algún día". Escríbelo como se lo dirías a
            alguien de confianza.
          </p>
          <div className="card">
            <label className="field-label">Tu proyecto pendiente</label>
            <textarea
              className="textarea"
              value={sueno}
              placeholder="Eso que vengo posponiendo..."
              onChange={(e) => setSueno(e.target.value)}
              style={{ minHeight: 110 }}
              autoFocus
            />
            <button
              className="btn btn-g"
              style={{ marginTop: 20 }}
              onClick={() => setStep(2)}
              disabled={sueno.trim().length < 4}
            >
              Continuar
            </button>
            <button
              className="btn-ghost"
              style={{ marginTop: 12 }}
              onClick={() => setStep(2)}
            >
              Todavía no lo tengo claro
            </button>
          </div>
        </>
      )}

      {/* PASO 2 - El pacto de entrada */}
      {step === 2 && (
        <>
          <div className="eyebrow">El camino</div>
          <h1 className="screen-title">
            Doce semanas para <em>volver a ser autor</em>.
          </h1>
          <div className="card card-gold">
            <p className="mirror">
              {sueno
                ? "Lo que anotaste no es un problema a resolver. Es un proyecto a diseñar. Y en estas doce semanas vas a construir las habilidades internas para sostenerlo."
                : "Aunque hoy no tengas claro tu sueño, estas doce semanas son para encontrarlo, y para construir lo necesario para sostenerlo cuando aparezca."}
            </p>
          </div>
          <p className="body-p" style={{ margin: "24px 0 8px" }}>
            No vas a hacerlo solo. Cada semana trabaja una capa: el cuerpo, el
            diseño, la presencia, el cambio, las conversaciones que faltan. Todo
            apunta a lo mismo: que salgas con la forma de ver y de decidir que
            este momento de tu vida te pide.
          </p>
          <button
            className="btn btn-g"
            style={{ marginTop: 24 }}
            onClick={finish}
          >
            Empezar el camino
          </button>
        </>
      )}
    </div>
  );
}
