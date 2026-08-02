"use client";

import { useState } from "react";

// ============================================================
// LA RUTA DEL PLAN DE SERVICIO - el plan de accion del curso.
// Donde el proceso se vuelve algo concreto que se lleva al mundo.
// Herramienta nativa del curso real de Serena.
// ============================================================

const CAMPOS = [
  { clave: "que", label: "Qué quieres poner al servicio", ph: "El don, la experiencia o el proyecto que hoy no está circulando..." },
  { clave: "aQuien", label: "A quién sirve", ph: "Las personas que se benefician de esto..." },
  { clave: "como", label: "Cómo se entrega", ph: "La forma concreta en que llega al otro..." },
  { clave: "primerPaso", label: "El primer paso", ph: "Lo que puedes hacer esta semana para que empiece a existir..." },
];

export default function PlanServicio({ state, update }) {
  const guardado = state.planServicio || {};
  const [plan, setPlan] = useState(guardado);
  const [editando, setEditando] = useState(!guardado.que);

  function guardar() {
    update({ planServicio: plan });
    setEditando(false);
  }

  const completo = CAMPOS.every((c) => (guardado[c.clave] || "").trim());

  return (
    <div className="screen">
      <div className="eyebrow">Herramienta</div>
      <h1 className="screen-title">
        Tu Ruta del <em>Plan de Servicio</em>
      </h1>
      <p className="screen-sub">
        El sentido no se piensa: se pone en movimiento. Este es el puente entre
        lo que trabajaste y lo que dejas en el mundo.
      </p>

      {editando ? (
        <div className="card">
          {CAMPOS.map((c) => (
            <div key={c.clave} style={{ marginBottom: 20 }}>
              <label className="field-label">{c.label}</label>
              <textarea
                className="textarea"
                value={plan[c.clave] || ""}
                placeholder={c.ph}
                onChange={(e) => setPlan({ ...plan, [c.clave]: e.target.value })}
                style={{ minHeight: 70 }}
              />
            </div>
          ))}
          <button
            className="btn btn-g"
            onClick={guardar}
            disabled={!(plan.que || "").trim()}
          >
            Guardar mi plan
          </button>
        </div>
      ) : (
        <>
          {CAMPOS.map((c) => (
            <div className="card" key={c.clave}>
              <div className="chip">{c.label}</div>
              <p className="mirror">
                {guardado[c.clave] || (
                  <span style={{ color: "var(--faint)", fontStyle: "italic" }}>
                    Sin definir
                  </span>
                )}
              </p>
            </div>
          ))}
          <button className="btn btn-s" onClick={() => setEditando(true)}>
            Editar mi plan
          </button>
        </>
      )}

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
