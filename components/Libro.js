"use client";

import { useState } from "react";
import { LIBRO } from "../lib/libro";
import Icono from "../lib/iconos";

// ============================================================
// EL LIBRO - Serena Ambicion, para leer dentro de la app.
// Indice de capitulos; al abrir uno, se lee su prosa completa.
// La voz de Jose, siempre a mano.
// ============================================================

export default function Libro() {
  const [cap, setCap] = useState(null);

  if (cap !== null) {
    const c = LIBRO.find((x) => x.num === cap);
    const idx = LIBRO.findIndex((x) => x.num === cap);
    return (
      <div className="screen">
        <button className="volver-link" onClick={() => setCap(null)}>
          <Icono name="flecha" size={14} /> Todos los capítulos
        </button>
        <div className="eyebrow">Capítulo {c.num}</div>
        <h1 className="libro-cap-titulo">{c.titulo}</h1>
        <div className="libro-prosa">
          {c.parrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="libro-nav">
          {idx > 0 && (
            <button className="btn btn-s" onClick={() => setCap(LIBRO[idx - 1].num)}>
              Capítulo anterior
            </button>
          )}
          {idx < LIBRO.length - 1 && (
            <button className="btn btn-g" onClick={() => { setCap(LIBRO[idx + 1].num); window.scrollTo(0,0); }}>
              Siguiente capítulo
            </button>
          )}
        </div>
        <p className="foot-note">Serena Ambición · José Luis Valle</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="eyebrow">El libro</div>
      <h1 className="screen-title">
        Serena <em>Ambición</em>
      </h1>
      <p className="screen-sub">
        Del éxito al sentido. El libro completo de José Luis, para leer a tu
        ritmo — el mismo camino que recorres aquí, en sus palabras.
      </p>

      <div className="libro-epigrafe">
        «Lo que nos enferma no es el dolor, sino vivir una vida que no es la
        nuestra.»
      </div>

      <div className="libro-indice">
        {LIBRO.map((c) => (
          <button
            key={c.num}
            className="libro-cap-item"
            onClick={() => { setCap(c.num); window.scrollTo(0, 0); }}
          >
            <span className="libro-cap-n">{c.num}</span>
            <span className="libro-cap-nom">{c.titulo}</span>
            <Icono name="flecha" size={14} />
          </button>
        ))}
      </div>
      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
