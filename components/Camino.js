"use client";

import { useState } from "react";
import { SEMANAS, urlClase, claseId, tipoDeClase } from "../lib/curso";
import {
  semanaCompleta,
  semanaDesbloqueada,
  semanaActual,
  semanasHechas,
  SEMANAS_RUEDA,
} from "../lib/progreso";
import Icono from "../lib/iconos";
import VideoClase from "./VideoClase";
import Edificio from "./Edificio";

// ============================================================
// EL CAMINO - el mapa completo + el edificio.
// Aca vive el recorrido entero con BLOQUEO, las clases con su
// TIPO (Activacion/Practica/Podcast/Clase/Ruta), el check de
// "ya lo vi" y el tilde diario para las practicas.
// ============================================================

// fecha de hoy como "YYYY-MM-DD"
function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Camino({ state, update }) {
  const actual = semanaActual(state);
  const [abierta, setAbierta] = useState(actual);
  const [videoAbierto, setVideoAbierto] = useState(null);
  const vistas = state.vistosConfirmados || [];
  const diarias = state.practicasDiarias || {};
  const hechas = semanasHechas(state);

  // Check "ya lo vi" (para clase, podcast, guia — una sola vez).
  function toggleVisto(semanaN, idx, e) {
    if (e) e.stopPropagation();
    const id = claseId(semanaN, idx);
    const next = vistas.includes(id)
      ? vistas.filter((x) => x !== id)
      : [...vistas, id];
    update({ vistosConfirmados: next });
  }

  // Tilde diario (para practicas: Activacion, Practica, Podcast).
  function tildarHoy(semanaN, idx, e) {
    if (e) e.stopPropagation();
    const id = claseId(semanaN, idx);
    const dias = diarias[id] || [];
    const hoy = hoyISO();
    const next = dias.includes(hoy)
      ? dias.filter((d) => d !== hoy)
      : [...dias, hoy];
    update({ practicasDiarias: { ...diarias, [id]: next } });
  }

  return (
    <div className="screen">
      <div className="eyebrow">El camino</div>
      <h1 className="screen-title">
        Las doce <em>semanas</em>
      </h1>
      <p className="screen-sub">
        Un camino que se hace en orden. Cada semana se abre a su tiempo. Las
        prácticas se repiten cada día; las clases se ven una vez.
      </p>

      {/* El edificio: avance real por las doce semanas */}
      <div className="camino-edificio">
        <Edificio plantas={hechas} total={SEMANAS.length} />
        <div className="camino-edificio-info">
          <span className="camino-edificio-n">
            {hechas} <span className="camino-edificio-de">de 12 semanas</span>
          </span>
        </div>
      </div>

      <div className="mapa-semanas">
        {SEMANAS.map((w) => {
          const completa = semanaCompleta(w.n, state);
          const abierta_ = semanaDesbloqueada(w.n, state);
          const esActual = w.n === actual;
          const bloqueada = !abierta_;
          const open = abierta === w.n && !bloqueada;
          const conRueda = SEMANAS_RUEDA.includes(w.n);

          return (
            <div
              key={w.n}
              className={
                "mapa-semana" +
                (completa ? " ms-done" : "") +
                (esActual ? " ms-actual" : "") +
                (bloqueada ? " ms-bloq" : "")
              }
            >
              <button
                className="mapa-head"
                onClick={() => !bloqueada && setAbierta(open ? null : w.n)}
                disabled={bloqueada}
              >
                <div className="mapa-n">
                  {completa ? (
                    <Icono name="check" size={15} />
                  ) : bloqueada ? (
                    <Icono name="llave" size={14} />
                  ) : (
                    w.n
                  )}
                </div>
                <div className="mapa-body">
                  <div className="mapa-titulo">Semana {w.n}</div>
                  <div className="mapa-subt">{w.subtitulo}</div>
                </div>
                {conRueda && <span className="mapa-tag">Rueda</span>}
                {esActual && !completa && (
                  <span className="mapa-aqui">Aquí estás</span>
                )}
                {!bloqueada && (
                  <div className={"pc-caret" + (open ? " pc-caret-open" : "")}>
                    <Icono name="flecha" size={14} />
                  </div>
                )}
              </button>

              {open && (
                <div className="mapa-clases">
                  {w.clases.map((c, i) => {
                    const id = claseId(w.n, i);
                    const tipo = tipoDeClase(c);
                    const visto = vistas.includes(id);
                    const hoy = hoyISO();
                    const hechaHoy = (diarias[id] || []).includes(hoy);
                    const vecesHecha = (diarias[id] || []).length;
                    const esPdf = !!c.pdfId;
                    // texto del botón según el tipo
                    const textoBtn =
                      videoAbierto === id
                        ? "Cerrar"
                        : esPdf
                        ? "Ver ruta"
                        : `Ver ${tipo.etiqueta.toLowerCase()}`;

                    return (
                      <div key={i} className="clase-card">
                        <div className="clase-card-top">
                          <span className={"clase-tipo tipo-" + c.ruta}>
                            {esPdf ? "Ruta" : tipo.etiqueta}
                          </span>
                          {tipo.diaria && vecesHecha > 0 && (
                            <span className="clase-veces">
                              {vecesHecha} {vecesHecha === 1 ? "vez" : "veces"}
                            </span>
                          )}
                        </div>
                        <div className="clase-card-titulo">{c.titulo}</div>

                        <div className="clase-card-acciones">
                          {c.videoId || c.pdfId ? (
                            <button
                              className="clase-ver"
                              onClick={() =>
                                setVideoAbierto(videoAbierto === id ? null : id)
                              }
                            >
                              {textoBtn}
                            </button>
                          ) : (
                            <a
                              className="clase-ver"
                              href={urlClase(c.categoryId)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver {esPdf ? "ruta" : tipo.etiqueta.toLowerCase()}
                            </a>
                          )}

                          {/* Check: diario para prácticas, único para clase/ruta */}
                          {tipo.diaria ? (
                            <button
                              className={"check-diario" + (hechaHoy ? " cd-on" : "")}
                              onClick={(e) => tildarHoy(w.n, i, e)}
                            >
                              {hechaHoy ? (
                                <>
                                  <Icono name="check" size={14} /> Hecho hoy
                                </>
                              ) : (
                                "Marcar hoy"
                              )}
                            </button>
                          ) : (
                            <button
                              className={"check-unico" + (visto ? " cu-on" : "")}
                              onClick={(e) => toggleVisto(w.n, i, e)}
                            >
                              {visto ? (
                                <>
                                  <Icono name="check" size={14} /> Visto
                                </>
                              ) : (
                                "Marcar visto"
                              )}
                            </button>
                          )}
                        </div>

                        {(c.videoId || c.pdfId) && videoAbierto === id && (
                          <div className="clase-video">
                            <VideoClase clase={c} urlGhl={urlClase(c.categoryId)} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}
