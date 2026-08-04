"use client";

import { SEMANAS, urlClase, claseId } from "../lib/curso";
import {
  proximoPaso,
  semanaActual,
  semanasHechas,
  SEMANAS_RUEDA,
} from "../lib/progreso";
import Edificio from "./Edificio";
import Icono from "../lib/iconos";

// ============================================================
// HOY - la pantalla que te lleva de la mano.
// Te dice UNA cosa: que hacer ahora. El proximo paso, claro,
// con su boton. Nada de menus. Siempre sabes por donde seguir.
// Modelo Sol Peirano / TCD, en la voz de Jose.
// ============================================================

export default function Hoy({ state, update, goTo }) {
  const nombre = (state.onboarding?.nombre || "").split(" ")[0];
  const sueno = state.onboarding?.sueno || "";
  const paso = proximoPaso(state);
  const n = semanaActual(state);
  const hechas = semanasHechas(state);

  function verClase() {
    // marca la clase como vista al abrir el video
    const id = claseId(paso.semana, paso.claseIdx);
    const vistas = state.clasesVistas || [];
    if (!vistas.includes(id)) update({ clasesVistas: [...vistas, id] });
    window.open(urlClase(paso.clase.categoryId), "_blank", "noopener");
  }

  return (
    <div className="screen">
      <div className="eyebrow">Hoy</div>

      {/* Saludo breve + dónde estás */}
      <h1 className="screen-title">
        {paso.tipo === "fin" ? (
          <>Lo <em>completaste</em>.</>
        ) : (
          <>
            Semana {paso.semana}
            <span className="hoy-sub-titulo"> · {paso.subtitulo}</span>
          </>
        )}
      </h1>

      {/* LA TARJETA DEL PASO - lo único que importa ahora */}
      {paso.tipo === "rueda" && (
        <div className="paso-card paso-rueda">
          <div className="paso-lbl">Tu siguiente paso</div>
          <div className="paso-titulo">{paso.titulo}</div>
          <p className="paso-detalle">{paso.detalle}</p>
          <button className="btn btn-g" onClick={() => goTo("rueda")}>
            {paso.semana === 1 ? "Medir mi punto de partida" : "Volver a medir mi rueda"}
          </button>
        </div>
      )}

      {paso.tipo === "clase" && (
        <div className="paso-card">
          <div className="paso-lbl">
            Tu siguiente paso · Clase {paso.claseNum} de {paso.totalClases}
          </div>
          <div className="paso-titulo">{paso.clase.titulo}</div>
          <p className="paso-detalle">
            Ve la clase en tu portal. Cuando termines, vuelve aquí para el
            siguiente paso.
          </p>
          <button className="btn btn-g" onClick={verClase}>
            <Icono name="flecha" size={18} /> Ver la clase
          </button>
        </div>
      )}

      {paso.tipo === "actividad" && (
        <div className="paso-card paso-actividad">
          <div className="paso-lbl">Tu siguiente paso · La actividad</div>
          <div className="paso-titulo">{paso.titulo}</div>
          <p className="paso-detalle">
            Ya viste las clases de esta semana. Ahora baja lo que te llevas a tu
            bitácora. Ahí es donde el curso se vuelve tuyo.
          </p>
          <button className="btn btn-g" onClick={() => goTo("diario")}>
            Hacer la actividad
          </button>
        </div>
      )}

      {paso.tipo === "avanzar" && (
        <div className="paso-card paso-listo">
          <div className="paso-lbl">Semana {paso.semana} completa</div>
          <div className="paso-titulo">Cerraste esta semana.</div>
          <p className="paso-detalle">
            El diseño se sostiene cuando cada semana queda de pie antes de la
            siguiente. La próxima ya está abierta.
          </p>
        </div>
      )}

      {paso.tipo === "fin" && (
        <div className="paso-card paso-listo">
          <div className="paso-lbl">Las doce semanas</div>
          <div className="paso-titulo">
            No eres el mismo que empezó.
          </div>
          <p className="paso-detalle">
            Recorriste el camino entero. Ahora el diseño ya no depende de nadie
            más que de ti.
          </p>
          <button className="btn btn-s" onClick={() => goTo("rueda")}>
            Ver cómo cambió mi rueda
          </button>
        </div>
      )}

      {/* El sueño, siempre presente como norte */}
      {sueno && paso.tipo !== "fin" && (
        <div className="hoy-sueno">
          <span className="hoy-sueno-lbl">Hacia esto caminas</span>
          <p className="hoy-sueno-texto">{sueno}</p>
        </div>
      )}

      {/* El edificio: avance real por las doce semanas */}
      <div className="hoy-avance" onClick={() => goTo("camino")}>
        <Edificio plantas={hechas} total={SEMANAS.length} />
        <div className="hoy-avance-info">
          <span className="hoy-avance-n">
            {hechas} <span className="hoy-avance-de">de 12 semanas</span>
          </span>
          <span className="hoy-avance-link">
            Ver el camino completo <Icono name="flecha" size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
