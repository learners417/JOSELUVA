"use client";

import { useState } from "react";
import { SEMANAS, TOTAL_CLASES, urlClase, claseId } from "../lib/curso";
import Edificio from "./Edificio";
import Icono from "../lib/iconos";

// ============================================================
// EL CAMINO v5 - las 12 semanas REALES del curso.
// El edificio mide tu avance por las 47 lecciones. Cada semana
// se despliega y cada clase tiene su boton "Ver la clase" que
// abre el video en el portal de GHL. Los videos alla, el
// recorrido y el trabajo aca (Bitacora).
// ============================================================

export default function Camino({ state, update }) {
  const nombre = (state.onboarding?.nombre || "").split(" ")[0];
  const sueno = state.onboarding?.sueno || "";
  const vistas = state.clasesVistas || [];
  const [abierta, setAbierta] = useState(null);

  const n = vistas.length;
  const pct = Math.round((n / TOTAL_CLASES) * 100);
  // "plantas" del edificio = las 12 semanas; se levantan al completar cada una.
  const semanasHechas = SEMANAS.filter((w) =>
    w.clases.every((_, i) => vistas.includes(claseId(w.n, i)))
  ).length;

  // La proxima semana con algo pendiente.
  const proxima = SEMANAS.find(
    (w) => !w.clases.every((_, i) => vistas.includes(claseId(w.n, i)))
  );

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
        {n === 0 ? (
          <>Doce semanas para volver a ser <em>autor</em> de tu vida.</>
        ) : semanasHechas >= SEMANAS.length ? (
          <>Llegaste. Y no sos el mismo que <em>empezó</em>.</>
        ) : (
          <>Semana a semana, <em>te construyes</em>.</>
        )}
      </h1>
      <p className="screen-sub">
        {nombre ? nombre + ", e" : "E"}ste camino no te da respuestas. Te da algo
        más difícil de encontrar: las habilidades internas para cumplir lo que
        de verdad quieres. La forma de verte, de decidir, de habitar tu vida.
        Sea cual sea tu sueño, vas a salir con lo necesario para sostenerlo.
      </p>

      {/* El edificio: mide tu avance por las doce semanas */}
      <div className="camino-edificio">
        <Edificio plantas={semanasHechas} total={SEMANAS.length} />
        <div className="camino-prog-lbl">
          <span className="camino-prog-n">{semanasHechas}</span>
          <span className="camino-prog-de">
            {semanasHechas === 1 ? "semana recorrida" : "semanas recorridas"}
          </span>
        </div>
      </div>

      {/* El sueno que trae, presente sin gritar */}
      {sueno && (
        <div className="sueno-card">
          <span className="sueno-lbl">Hacia esto caminas</span>
          <p className="sueno-texto">{sueno}</p>
        </div>
      )}

      {/* Tarjeta de la semana en curso */}
      {proxima && (
        <div className="siguiente-card" onClick={() => setAbierta(proxima.n)}>
          <div className="siguiente-top">
            <span className="siguiente-lbl">Tu semana en curso</span>
            <span className="siguiente-n">Semana {proxima.n}</span>
          </div>
          <div className="siguiente-titulo">{proxima.subtitulo}</div>
          <div className="siguiente-cta">
            <span>Entrar a la semana</span>
            <Icono name="flecha" size={18} />
          </div>
        </div>
      )}

      {/* Las 12 semanas */}
      <div className="chip" style={{ marginTop: 28 }}>Las doce semanas</div>
      <div className="semanas-lista">
        {SEMANAS.map((w) => {
          const hechas = w.clases.filter((_, i) =>
            vistas.includes(claseId(w.n, i))
          ).length;
          const completa = hechas === w.clases.length;
          const open = abierta === w.n;
          return (
            <div
              key={w.n}
              className={"semana-card" + (completa ? " sem-done" : "")}
            >
              <button
                className="semana-head"
                onClick={() => setAbierta(open ? null : w.n)}
              >
                <div className="semana-n">
                  {completa ? <Icono name="check" size={15} /> : w.n}
                </div>
                <div className="semana-body">
                  <div className="semana-titulo">Semana {w.n}</div>
                  <div className="semana-sub">{w.subtitulo}</div>
                </div>
                <div className="semana-meta">
                  <div className={"pc-caret" + (open ? " pc-caret-open" : "")}>
                    <Icono name="flecha" size={15} />
                  </div>
                </div>
              </button>

              {open && (
                <div className="semana-clases">
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
