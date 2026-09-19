"use client";

import { useState } from "react";
import { LIBRO } from "../lib/libro";
import { semanasHechas } from "../lib/progreso";
import Icono from "../lib/iconos";

// ============================================================
// EL LIBRO - Serena Ambicion, para leer dentro de la app.
// Se abre por AVANCE: al inicio solo el capitulo 1.
// Cada capitulo nuevo se desbloquea al avanzar en el camino.
// Prosa aireada, legible, no un choclo.
// ============================================================

// Cuantas semanas completas hacen falta para abrir cada capitulo.
// Cap 1 desde el dia cero; el resto va abriendo con el avance.
function semanaQueAbre(num) {
  if (num <= 1) return 0;
  // 10 capitulos repartidos en 12 semanas: ~1 cada semana y media.
  return Math.min(Math.ceil((num - 1) * 1.2), 12);
}

export default function Libro({ state }) {
  const [cap, setCap] = useState(null);
  const hechas = semanasHechas(state || {});

  function abierto(num) {
    return hechas >= semanaQueAbre(num);
  }

  // --- Vista de un capitulo ---
  if (cap !== null) {
    const c = LIBRO.find((x) => x.num === cap);
    const idx = LIBRO.findIndex((x) => x.num === cap);
    const sigAbierto = idx < LIBRO.length - 1 && abierto(LIBRO[idx + 1].num);
    return (
      <div className="screen">
        <button className="volver-link" onClick={() => setCap(null)}>
          <Icono name="flecha" size={14} /> Todos los capítulos
        </button>
        <div className="eyebrow">Capítulo {c.num}</div>
        <h1 className="libro-cap-titulo">{c.titulo}</h1>
        <div className="libro-prosa">
          {c.parrafos.map((p, i) => (
            <p key={i} className={i === 0 ? "libro-p-primero" : ""}>
              {p}
            </p>
          ))}
        </div>
        <div className="libro-nav">
          {idx > 0 && (
            <button
              className="btn btn-s"
              onClick={() => { setCap(LIBRO[idx - 1].num); window.scrollTo(0, 0); }}
            >
              Capítulo anterior
            </button>
          )}
          {idx < LIBRO.length - 1 && sigAbierto && (
            <button
              className="btn btn-g"
              onClick={() => { setCap(LIBRO[idx + 1].num); window.scrollTo(0, 0); }}
            >
              Siguiente capítulo
            </button>
          )}
          {idx < LIBRO.length - 1 && !sigAbierto && (
            <div className="libro-sig-bloq">
              <Icono name="llave" size={14} /> El siguiente capítulo se abre al
              avanzar en tu camino
            </div>
          )}
        </div>
        <p className="foot-note">Serena Ambición · José Luis Valle</p>
      </div>
    );
  }

  // --- Indice ---
  return (
    <div className="screen">
      <div className="eyebrow">El libro</div>
      <h1 className="screen-title">
        Serena <em>Ambición</em>
      </h1>
      <p className="screen-sub">
        Del éxito al sentido. El libro que acompaña tu camino — cada capítulo se
        abre a medida que avanzas.
      </p>

      <div className="libro-epigrafe">
        «Lo que nos enferma no es el dolor, sino vivir una vida que no es la
        nuestra.»
      </div>

      <div className="libro-indice">
        {LIBRO.map((c) => {
          const ok = abierto(c.num);
          return (
            <button
              key={c.num}
              className={"libro-cap-item" + (ok ? "" : " lci-bloq")}
              onClick={() => { if (ok) { setCap(c.num); window.scrollTo(0, 0); } }}
              disabled={!ok}
            >
              <span className="libro-cap-n">
                {ok ? c.num : <Icono name="llave" size={15} />}
              </span>
              <span className="libro-cap-nom">{c.titulo}</span>
              {ok && <Icono name="flecha" size={14} />}
            </button>
          );
        })}
      </div>
      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
