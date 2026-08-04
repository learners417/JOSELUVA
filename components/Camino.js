"use client";

import { useState } from "react";
import { SEMANAS, urlClase, claseId } from "../lib/curso";
import {
  semanaCompleta,
  semanaDesbloqueada,
  semanaActual,
  SEMANAS_RUEDA,
} from "../lib/progreso";
import Icono from "../lib/iconos";

// ============================================================
// EL CAMINO - el mapa completo de las doce semanas.
// Vista secundaria (la home es Hoy). Muestra el recorrido
// entero con BLOQUEO: las semanas futuras estan con candado.
// Solo entras donde te toca. Orden y claridad.
// ============================================================

export default function Camino({ state, update }) {
  const actual = semanaActual(state);
  const [abierta, setAbierta] = useState(actual);
  const vistas = state.clasesVistas || [];

  function toggleVista(semanaN, idx, e) {
    e.stopPropagation();
    const id = claseId(semanaN, idx);
    const next = vistas.includes(id)
      ? vistas.filter((x) => x !== id)
      : [...vistas, id];
    update({ clasesVistas: next });
  }

  return (
    <div className="screen">
      <div className="eyebrow">El camino</div>
      <h1 className="screen-title">
        Las doce <em>semanas</em>
      </h1>
      <p className="screen-sub">
        Un camino que se hace en orden. Cada semana se abre cuando la anterior
        quedó de pie. Así se construye lo que dura.
      </p>

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
                {conRueda && (
                  <span className="mapa-tag">Rueda</span>
                )}
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
                    const vista = vistas.includes(id);
                    return (
                      <div key={i} className="clase-row">
                        <button
                          className={"clase-check" + (vista ? " cc-on" : "")}
                          onClick={(e) => toggleVista(w.n, i, e)}
                          aria-label="Marcar como vista"
                        >
                          {vista && <Icono name="check" size={13} />}
                        </button>
                        <div className="clase-info">
                          <div className="clase-titulo">{c.titulo}</div>
                        </div>
                        <a
                          className="clase-ver"
                          href={urlClase(c.categoryId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (!vista) toggleVista(w.n, i, { stopPropagation() {} });
                          }}
                        >
                          Ver clase
                        </a>
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
