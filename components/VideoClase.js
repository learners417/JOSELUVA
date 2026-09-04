"use client";

import { useState } from "react";
import Icono from "../lib/iconos";

// ============================================================
// VIDEO DE LA CLASE - reproductor dentro de la app.
// Soporta YouTube (nocookie, lo mas limpio posible) via videoId,
// o el respaldo a GHL si la clase aun no tiene video propio.
// Manana, para pasar a Bunny, solo se cambia esta pieza.
// ============================================================

// Construye la URL de embed mas limpia que YouTube permite:
// - youtube-nocookie.com (sin cookies hasta el play)
// - rel=0 (sugeridos solo del mismo canal, no de otros)
// - modestbranding, playsinline, sin info
function urlEmbed(videoId) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3", // sin anotaciones
    color: "white",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

export default function VideoClase({ clase, urlGhl }) {
  const [abierto, setAbierto] = useState(false);

  // Si la clase es una guia PDF (Comunicacion Ontologica), se muestra
  // el visor de Drive embebido dentro de la app.
  if (clase?.pdfId) {
    return (
      <div className="video-clase">
        {abierto ? (
          <div className="pdf-frame">
            <iframe
              src={`https://drive.google.com/file/d/${clase.pdfId}/preview`}
              title={clase.titulo}
              allow="autoplay"
            />
          </div>
        ) : (
          <button className="video-poster pdf-poster" onClick={() => setAbierto(true)}>
            <span className="video-play pdf-play">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5v14l7-2 7 2V5l-7 2-7-2z" />
                <path d="M11 5v14" />
              </svg>
            </span>
            <span className="video-poster-txt">Abrir la guía</span>
          </button>
        )}
      </div>
    );
  }

  // Si la clase tiene video propio (YouTube), se reproduce en la app.
  if (clase?.videoId) {
    return (
      <div className="video-clase">
        {abierto ? (
          <div className="video-frame">
            <iframe
              src={urlEmbed(clase.videoId) + "&autoplay=1"}
              title={clase.titulo}
              allow="accelerated-destination; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <button className="video-poster" onClick={() => setAbierto(true)}>
            <span className="video-play">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="video-poster-txt">Ver la clase</span>
          </button>
        )}
      </div>
    );
  }

  // Respaldo: la clase todavia vive en GHL, se abre alla.
  return (
    <a
      className="btn btn-g"
      href={urlGhl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icono name="flecha" size={17} /> Ver la clase
    </a>
  );
}
