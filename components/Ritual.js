"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import {
  PREGUNTA_MANANA,
  PREGUNTA_PROYECTO,
  DISTINCIONES,
} from "../lib/programa";
import { hoyISO } from "../lib/store";

export default function Ritual({ state, update, onReset }) {
  const hoy = hoyISO();
  const yaHoy = (state.ritualDias || []).includes(hoy);

  const [eleccion, setEleccion] = useState("");
  const [guardado, setGuardado] = useState(yaHoy);

  const nombre = state.onboarding?.nombre || "";
  const proyecto = state.plano?.proyecto || "";

  const idx =
    Math.abs(hoy.split("-").reduce((a, b) => a + parseInt(b, 10), 0)) %
    DISTINCIONES.length;
  const distincion = DISTINCIONES[idx];

  const racha = (state.ritualDias || []).length;
  const avances = (state.avancesProyecto || []).length;

  function guardar(avanzo) {
    if (eleccion.trim().length < 3) return;
    const nuevasElecciones = [
      { texto: eleccion.trim(), fecha: hoy },
      ...(state.elecciones || []),
    ];
    const nuevosDias = (state.ritualDias || []).includes(hoy)
      ? state.ritualDias
      : [...(state.ritualDias || []), hoy];
    const nuevosAvances = avanzo
      ? [...new Set([...(state.avancesProyecto || []), hoy])]
      : state.avancesProyecto || [];
    update({
      elecciones: nuevasElecciones,
      ritualDias: nuevosDias,
      avancesProyecto: nuevosAvances,
    });
    setGuardado(true);
  }

  return (
    <div className="screen">
      <div className="eyebrow">{nombre ? `Hola, ${nombre}` : "Hoy"}</div>
      <h1 className="screen-title">{T.ritual.titulo}</h1>
      <p className="screen-sub">{T.ritual.sub}</p>

      {(racha > 0 || avances > 0) && (
        <div style={{ marginBottom: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {racha > 0 && (
            <span className="pill">
              {racha} {racha === 1 ? "dia" : "dias"} de ritual
            </span>
          )}
          {avances > 0 && (
            <span className="pill">
              {avances} {avances === 1 ? "dia" : "dias"} que el proyecto avanzo
            </span>
          )}
        </div>
      )}

      {/* Paso 1 */}
      <div className="card">
        <div className="chip">{T.ritual.paso1}</div>
        <p className="mirror">{PREGUNTA_MANANA}</p>
      </div>

      {/* Paso 2 */}
      <div className="card">
        <div className="chip">{T.ritual.paso2}</div>
        <p
          style={{
            fontFamily: "var(--sf)",
            fontSize: 18,
            color: "var(--goldb)",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          {distincion.par}
        </p>
        <p className="body-p">{distincion.texto}</p>
      </div>

      {/* Paso 3 */}
      <div className="card card-gold">
        <div className="chip">{T.ritual.paso3}</div>
        {!guardado ? (
          <>
            <label className="field-label">{T.ritual.eleccionLabel}</label>
            <textarea
              className="textarea"
              value={eleccion}
              placeholder={T.ritual.eleccionPlaceholder}
              onChange={(e) => setEleccion(e.target.value)}
            />

            {proyecto && (
              <>
                <div
                  style={{
                    marginTop: 22,
                    paddingTop: 18,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <label className="field-label">{PREGUNTA_PROYECTO}</label>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--dim)",
                      fontStyle: "italic",
                      marginBottom: 14,
                      fontFamily: "var(--sf)",
                    }}
                  >
                    "{proyecto.slice(0, 110)}
                    {proyecto.length > 110 ? "..." : ""}"
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="btn btn-g"
                      onClick={() => guardar(true)}
                      disabled={eleccion.trim().length < 3}
                    >
                      {T.ritual.proyectoSi}
                    </button>
                    <button
                      className="btn btn-s"
                      onClick={() => guardar(false)}
                      disabled={eleccion.trim().length < 3}
                    >
                      {T.ritual.proyectoNo}
                    </button>
                  </div>
                </div>
              </>
            )}

            {!proyecto && (
              <button
                className="btn btn-g"
                style={{ marginTop: 14 }}
                onClick={() => guardar(false)}
                disabled={eleccion.trim().length < 3}
              >
                {T.ritual.guardar}
              </button>
            )}
          </>
        ) : (
          <p className="mirror">{T.ritual.hecho}</p>
        )}
      </div>

      {/* Ultimas elecciones */}
      {(state.elecciones || []).length > 0 && (
        <div className="card">
          <div className="chip">Tus elecciones</div>
          {(state.elecciones || []).slice(0, 5).map((e, i) => (
            <div className="eleccion-item" key={i}>
              <span className="arrow">&rarr;</span>
              <div>
                {e.texto}
                <div className="eleccion-fecha">{e.fecha}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="divider" />
      <button className="btn-ghost" onClick={onReset}>
        Reiniciar mi progreso (demo)
      </button>
      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
