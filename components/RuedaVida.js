"use client";

import { useState } from "react";
import Icono from "../lib/iconos";
import { semanaActual, SEMANAS_RUEDA } from "../lib/progreso";

// ============================================================
// LA RUEDA DE LA VIDA - herramienta nativa e interactiva.
// Marcas tu nivel (1-10) en 8 areas; la rueda se dibuja en vivo
// y muestra tus desequilibrios. Del curso real de Serena.
// ============================================================

const AREAS = [
  { clave: "salud", nombre: "Salud y energia" },
  { clave: "trabajo", nombre: "Trabajo y proposito" },
  { clave: "dinero", nombre: "Dinero y finanzas" },
  { clave: "relaciones", nombre: "Relaciones" },
  { clave: "familia", nombre: "Familia" },
  { clave: "crecimiento", nombre: "Crecimiento personal" },
  { clave: "ocio", nombre: "Ocio y disfrute" },
  { clave: "entorno", nombre: "Entorno y espacio" },
];

export default function RuedaVida({ state, update }) {
  // De que tramo es esta medicion (S1/S4/S8/S12). El motor decide cual toca.
  const actual = semanaActual(state);
  const tramo = SEMANAS_RUEDA.filter((s) => s <= actual).pop() || 1;
  const tramosPrevios = state.ruedaTramos || {};
  const yaGuardada = tramosPrevios[tramo] || {};

  const [niveles, setNiveles] = useState(() => {
    const init = {};
    AREAS.forEach((a) => (init[a.clave] = yaGuardada[a.clave] || 0));
    return init;
  });

  function setNivel(clave, v) {
    const next = { ...niveles, [clave]: v };
    setNiveles(next);
    // Guarda en el tramo actual Y en ruedaVida (última, para compatibilidad).
    const completa = AREAS.every((a) => next[a.clave] > 0);
    const upd = { ruedaVida: next };
    if (completa) {
      upd.ruedaTramos = { ...tramosPrevios, [tramo]: next };
    }
    update(upd);
  }

  // Geometria de la rueda (SVG).
  const cx = 150, cy = 150, rMax = 120;
  const n = AREAS.length;
  const puntos = AREAS.map((a, i) => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    const nivel = niveles[a.clave] || 0;
    const r = (nivel / 10) * rMax;
    return {
      x: cx + Math.cos(ang) * r,
      y: cy + Math.sin(ang) * r,
      ax: cx + Math.cos(ang) * rMax,
      ay: cy + Math.sin(ang) * rMax,
      lx: cx + Math.cos(ang) * (rMax + 18),
      ly: cy + Math.sin(ang) * (rMax + 18),
    };
  });
  const poly = puntos.map((p) => `${p.x},${p.y}`).join(" ");

  const completa = AREAS.every((a) => niveles[a.clave] > 0);
  const promedio =
    AREAS.reduce((s, a) => s + (niveles[a.clave] || 0), 0) / n;

  return (
    <div className="screen">
      <div className="eyebrow">Herramienta</div>
      <h1 className="screen-title">
        La <em>Rueda de la Vida</em>
      </h1>
      <p className="screen-sub">
        No para juzgarte. Para ver, con honestidad, dónde está hoy tu energía
        repartida. Lo que se ve, se puede diseñar.
      </p>

      {/* La rueda en vivo */}
      <div className="rueda-wrap">
        <svg viewBox="0 0 300 300" className="rueda-svg">
          <defs>
            <radialGradient id="ruedaFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(207,176,83,0.22)" />
              <stop offset="100%" stopColor="rgba(207,176,83,0.06)" />
            </radialGradient>
          </defs>
          {/* aros guia */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <circle
              key={f}
              cx={cx} cy={cy} r={rMax * f}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"
            />
          ))}
          {/* radios */}
          {puntos.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {/* el area marcada */}
          {completa || Object.values(niveles).some((v) => v > 0) ? (
            <polygon points={poly} fill="url(#ruedaFill)"
              stroke="#CFB053" strokeWidth="2" strokeLinejoin="round" />
          ) : null}
          {/* puntos */}
          {puntos.map((p, i) =>
            niveles[AREAS[i].clave] > 0 ? (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#E8D4A0" />
            ) : null
          )}
        </svg>
      </div>

      {completa && (
        <div className="rueda-prom">
          <span className="rueda-prom-n">{promedio.toFixed(1)}</span>
          <span className="rueda-prom-lbl">Promedio de tu rueda</span>
        </div>
      )}

      {/* Los sliders por area */}
      <div className="rueda-areas">
        {AREAS.map((a) => (
          <div className="rueda-area" key={a.clave}>
            <div className="rueda-area-top">
              <span className="rueda-area-nombre">{a.nombre}</span>
              <span className="rueda-area-val">{niveles[a.clave] || "-"}</span>
            </div>
            <div className="rueda-dots">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                <button
                  key={v}
                  className={
                    "rueda-dot" + (niveles[a.clave] >= v ? " rd-on" : "")
                  }
                  onClick={() => setNivel(a.clave, v)}
                  aria-label={`${a.nombre} nivel ${v}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {completa && (
        <div className="card card-gold" style={{ marginTop: 20 }}>
          <div className="chip">Lo que muestra tu rueda</div>
          <p className="body-p">
            {promedio >= 7
              ? "Tu rueda gira redonda. El trabajo aquí es sostener ese equilibrio cuando la vida empuje."
              : promedio >= 4
              ? "Hay áreas que sostienen tu peso y otras que lo frenan. La rueda gira, pero con esfuerzo. Ahí está el diseño por hacer."
              : "Tu rueda hoy gira desigual. No es un problema: es un punto de partida honesto. Desde acá se rediseña."}
          </p>
        </div>
      )}

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
