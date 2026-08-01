"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "../lib/textos";
import { PASOS, FASES, evidenciaDePaso, plantasLevantadas } from "../lib/programa";
import Edificio from "./Edificio";
import Icono from "../lib/iconos";

// ============================================================
// LA OBRA v4 - premium. El edificio vivo arriba (misma
// ilustracion del Camino), y cada planta como tarjeta con
// profundidad. Se levantan por evidencia real, no por click.
// La voz: arquitectura, no autoayuda.
// ============================================================

export default function Obra({ state, update, goTo }) {
  const levantadas = plantasLevantadas(state);
  const [abierto, setAbierto] = useState(null);
  const [celebrar, setCelebrar] = useState(null);
  const prevRef = useRef(levantadas.length);

  useEffect(() => {
    if (levantadas.length > prevRef.current) {
      const nueva = levantadas[levantadas.length - 1];
      setCelebrar(nueva);
      const t = setTimeout(() => setCelebrar(null), 2600);
      return () => clearTimeout(t);
    }
    prevRef.current = levantadas.length;
  }, [levantadas.length]);

  const actual = PASOS.find((p) => !levantadas.includes(p.n))?.n || null;
  const n = levantadas.length;

  function irAPorEvidencia(paso) {
    if (paso.clave === "proyecto" || paso.clave === "instalacion")
      return goTo("plano");
    if (paso.clave === "optar-elegir" || paso.clave === "autonomia")
      return goTo("ritual");
    if (paso.instrumento || ["diagnostico","yo-atras","presencia","herencia-legado"].includes(paso.clave))
      return goTo("mas");
    return goTo("plano");
  }

  return (
    <div className="screen">
      <div className="eyebrow">{T.obra.titulo}</div>
      <h1 className="screen-title">
        Se construye de <em>abajo hacia arriba</em>
      </h1>
      <p className="screen-sub">
        Ninguna planta se levanta antes que su cimiento. Cada una queda de pie
        cuando el trabajo que la sostiene existe de verdad, no cuando lo marcas.
      </p>

      {/* El edificio vivo (misma ilustracion del Camino) */}
      <div className="camino-edificio">
        <Edificio plantas={n} total={PASOS.length} />
        <div className="camino-prog-lbl">
          <span className="camino-prog-n">{n}</span>
          <span className="camino-prog-de">de {PASOS.length} de pie</span>
        </div>
      </div>

      {/* Las plantas, de arriba (8) hacia abajo (1) para leer como edificio */}
      <div className="obra-plantas">
        {[...PASOS].reverse().map((p) => {
          const ev = evidenciaDePaso(p, state);
          const isDone = ev.hecha;
          const isCurrent = p.n === actual;
          const parcial = !isDone && ev.cuanto > 0;
          const open = abierto === p.n;
          return (
            <div
              key={p.n}
              className={
                "planta-card" +
                (isDone ? " pc-done" : "") +
                (isCurrent ? " pc-current" : "") +
                (celebrar === p.n ? " pc-celebra" : "")
              }
            >
              <button
                className="planta-head"
                onClick={() => setAbierto(open ? null : p.n)}
              >
                <div className="pc-n">
                  {isDone ? <Icono name="check" size={16} /> : p.n}
                </div>
                <div className="pc-body">
                  <div className="pc-titulo">{p.titulo}</div>
                  <div className="pc-sub">{p.subtitulo}</div>
                  {parcial && (
                    <div className="pc-prog">
                      <div className="pc-prog-track">
                        <div
                          className="pc-prog-fill"
                          style={{ width: (ev.cuanto / ev.meta) * 100 + "%" }}
                        />
                      </div>
                      <span className="pc-prog-lbl">
                        {ev.cuanto} / {ev.meta}
                      </span>
                    </div>
                  )}
                </div>
                <div className={"pc-caret" + (open ? " pc-caret-open" : "")}>
                  <Icono name="flecha" size={16} />
                </div>
              </button>

              {open && (
                <div className="planta-detalle">
                  <p className="body-p" style={{ marginBottom: 14 }}>
                    {p.descripcion}
                  </p>
                  <div className="pc-res">
                    <span className="pc-res-lbl">Lo que deja</span>
                    {p.resultado}
                  </div>
                  <div className="pc-como">
                    {isDone ? "Planta de pie" : "Cómo se levanta"}
                  </div>
                  <p className="body-p" style={{ marginBottom: isDone ? 0 : 16 }}>
                    {isDone ? p.evidencia : ev.comoV}
                  </p>
                  {!isDone && (
                    <button
                      className="btn btn-g"
                      onClick={() => irAPorEvidencia(p)}
                    >
                      Ir a construirla
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Las 3 fases */}
      <div className="chip" style={{ marginTop: 24 }}>Las tres fases</div>
      <div className="fases-premium">
        {FASES.map((f, i) => (
          <div className="fase-row" key={i}>
            <div className="fase-marca">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="fase-nombre">
                {f.nombre}
                <span className="fase-dias">{f.dias}</span>
              </div>
              <div className="fase-meta">{f.meta}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>
    </div>
  );
}
