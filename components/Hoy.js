"use client";

import { SEMANAS } from "../lib/curso";
import {
  semanaActual,
  semanaCompleta,
  esperandoProximaSemana,
  diaDeLaSemana,
  semanasHechas,
  SEMANAS_RUEDA,
} from "../lib/progreso";
import Icono from "../lib/iconos";

// ============================================================
// HOY - una sola cosa: lo que te toca esta semana.
// Un solo boton de salida, segun el momento del programa.
// El mapa y el edificio viven en el Camino (no aca).
// El ritmo lo marca el calendario: 7 dias = 1 semana.
// ============================================================

export default function Hoy({ state, update, goTo }) {
  const nombre = (state.onboarding?.nombre || "").split(" ")[0];
  const sueno = state.onboarding?.sueno || "";
  const n = semanaActual(state);
  const w = SEMANAS.find((s) => s.n === n);
  const hechas = semanasHechas(state);
  const dia = diaDeLaSemana(state);
  const completaTodo = hechas >= SEMANAS.length;
  const esperando = esperandoProximaSemana(state);

  // Que le falta a la semana actual, en orden.
  const ruedaPendiente =
    SEMANAS_RUEDA.includes(n) && !(state.ruedaTramos || {})[n];
  const bitacoraPendiente = !(state.bitacoraSemanas || []).includes(n);

  // Decidir el UNICO paso de hoy.
  let paso;
  if (completaTodo) {
    paso = { tipo: "fin" };
  } else if (esperando) {
    paso = { tipo: "espera" };
  } else if (ruedaPendiente) {
    paso = { tipo: "rueda" };
  } else {
    // La semana tiene sus clases/practicas en el Camino; desde Hoy se entra ahi.
    // Cuando ya vio todo, el paso es la actividad (bitacora).
    paso = bitacoraPendiente ? { tipo: "semana" } : { tipo: "actividad" };
  }

  return (
    <div className="screen">
      <div className="eyebrow">Hoy</div>

      <h1 className="screen-title">
        {paso.tipo === "fin" ? (
          <>Lo <em>completaste</em>.</>
        ) : (
          <>
            Semana {n}
            <span className="hoy-sub-titulo"> · {w?.subtitulo}</span>
          </>
        )}
      </h1>

      {/* Rueda de este tramo */}
      {paso.tipo === "rueda" && (
        <div className="paso-card paso-rueda">
          <div className="paso-lbl">Tu paso de esta semana</div>
          <div className="paso-titulo">
            {n === 1 ? "Tu punto de partida" : "Vuelve a mirar tu rueda"}
          </div>
          <p className="paso-detalle">
            {n === 1
              ? "Antes de empezar, una foto honesta de dónde está hoy tu vida."
              : "Han pasado semanas. Mira cómo cambió tu rueda desde la última vez."}
          </p>
          <button className="btn btn-g" onClick={() => goTo("rueda")}>
            {n === 1 ? "Medir mi punto de partida" : "Volver a medir mi rueda"}
          </button>
        </div>
      )}

      {/* La semana en marcha: un solo boton al Camino */}
      {paso.tipo === "semana" && (
        <div className="paso-card">
          <div className="paso-lbl">Tu semana · día {dia} de 7</div>
          <div className="paso-titulo">Lo que trabajas esta semana</div>
          <p className="paso-detalle">
            Cada semana trabaja una capa. Entra al camino y haz las prácticas y
            la clase de esta semana. Las prácticas son para repetir cada día.
          </p>
          <button className="btn btn-g" onClick={() => goTo("camino")}>
            Ir a mi semana
          </button>
        </div>
      )}

      {/* Vio todo, falta bajar la bitacora */}
      {paso.tipo === "actividad" && (
        <div className="paso-card paso-actividad">
          <div className="paso-lbl">Tu paso de esta semana · La bitácora</div>
          <div className="paso-titulo">Baja lo que te llevas</div>
          <p className="paso-detalle">
            Ya recorriste esta semana. Ahora escríbelo en tu bitácora. Ahí es
            donde el proceso se vuelve tuyo.
          </p>
          <button className="btn btn-g" onClick={() => goTo("diario")}>
            Escribir mi bitácora
          </button>
        </div>
      )}

      {/* Termino la semana, el calendario aun no abre la proxima */}
      {paso.tipo === "espera" && (
        <div className="paso-card paso-listo">
          <div className="paso-lbl">Semana {n} completa</div>
          <div className="paso-titulo">Cerraste esta semana.</div>
          <p className="paso-detalle">
            El diseño se sostiene cuando cada semana queda de pie antes de la
            siguiente. Sigue con tus prácticas diarias; la próxima semana se
            abre a su tiempo.
          </p>
          <button className="btn btn-s" onClick={() => goTo("camino")}>
            Seguir mis prácticas
          </button>
        </div>
      )}

      {/* Fin del programa */}
      {paso.tipo === "fin" && (
        <div className="paso-card paso-listo">
          <div className="paso-lbl">Las doce semanas</div>
          <div className="paso-titulo">No eres el mismo que empezó.</div>
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
          <span className="hoy-sueno-lbl">Tu dirección</span>
          <p className="hoy-sueno-texto">{sueno}</p>
        </div>
      )}
    </div>
  );
}
