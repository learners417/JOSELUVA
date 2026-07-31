"use client";

import { PASOS, evidenciaDePaso, plantasLevantadas } from "../lib/programa";
import Edificio from "./Edificio";
import Icono from "../lib/iconos";

// ============================================================
// EL CAMINO - la pantalla principal del recorrido autonomo.
// Te lleva de la mano: el edificio que crece, el SIGUIENTE PASO
// siempre claro, y el sendero vertical de los 8 pasos. Pensada
// para funcionar sola, sin mentoria: siempre sabes que sigue.
// ============================================================

export default function Camino({ state, update, goTo }) {
  const nombre = (state.onboarding?.nombre || "").split(" ")[0];
  const levantadas = plantasLevantadas(state);
  const n = levantadas.length;
  const sueno = state.plano?.proyecto || "";

  // El siguiente paso = el primero no levantado.
  const siguiente = PASOS.find((p) => !levantadas.includes(p.n)) || null;
  const evSig = siguiente ? evidenciaDePaso(siguiente, state) : null;

  // A donde manda cada paso para conseguir su evidencia.
  function irAPaso(paso) {
    if (!paso) return;
    if (paso.clave === "proyecto" || paso.clave === "instalacion")
      return goTo("plano");
    if (paso.clave === "optar-elegir" || paso.clave === "autonomia")
      return goTo("ritual");
    if (paso.instrumento || ["diagnostico","yo-atras","presencia","herencia-legado"].includes(paso.clave))
      return goTo("mas");
    return goTo("plano");
  }

  const completo = n >= PASOS.length;
  const pct = Math.round((n / PASOS.length) * 100);

  return (
    <div className="screen">
      {/* Encabezado en la voz de Jose: nombra, no saluda */}
      <div className="eyebrow">El recorrido</div>
      <h1 className="screen-title">
        {completo ? (
          <>La obra está <em>de pie</em>.</>
        ) : n === 0 ? (
          <>Todo esto ya <em>está en ti</em>.</>
        ) : (
          <>Lo estás <em>construyendo</em>.</>
        )}
      </h1>
      <p className="screen-sub">
        {completo
          ? "Ya no se trata de levantarla. Se trata de habitarla, y de sostenerla sin que nadie más la sostenga por ti."
          : sueno
          ? <>No hay un problema que resolver. Hay un proyecto que diseñar: <em>{sueno}</em></>
          : "Esto no es para sentirte mejor con la espera. Es para diseñar. Un paso, y luego el siguiente."}
      </p>

      {/* El edificio vivo */}
      <div className="camino-edificio">
        <Edificio plantas={n} total={PASOS.length} />
        <div className="camino-prog-lbl">
          <span className="camino-prog-n">{n}</span>
          <span className="camino-prog-de">de {PASOS.length} plantas</span>
        </div>
      </div>

      {/* La tarjeta del SIGUIENTE PASO - te lleva de la mano */}
      {siguiente ? (
        <div className="siguiente-card" onClick={() => irAPaso(siguiente)}>
          <div className="siguiente-top">
            <span className="siguiente-lbl">Lo que sigue</span>
            <span className="siguiente-n">Paso {siguiente.n}</span>
          </div>
          <div className="siguiente-titulo">{siguiente.titulo}</div>
          <div className="siguiente-sub">{siguiente.subtitulo}</div>
          {evSig && evSig.meta > 1 && (
            <div className="siguiente-prog">
              <div className="siguiente-prog-track">
                <div
                  className="siguiente-prog-fill"
                  style={{ width: (evSig.cuanto / evSig.meta) * 100 + "%" }}
                />
              </div>
              <span className="siguiente-prog-lbl">
                {evSig.cuanto} / {evSig.meta}
              </span>
            </div>
          )}
          <div className="siguiente-cta">
            <span>{evSig && evSig.cuanto > 0 ? "Seguir con esto" : "Dar este paso"}</span>
            <Icono name="flecha" size={18} />
          </div>
        </div>
      ) : (
        <div className="siguiente-card siguiente-completo">
          <div className="siguiente-lbl">El diseño quedó instalado</div>
          <div className="siguiente-titulo">Las ocho plantas están de pie</div>
          <div className="siguiente-sub">
            Lo que al principio alguien sostenía contigo, hoy lo sostienes tú.
            Eso era, desde el comienzo, el verdadero trabajo.
          </div>
        </div>
      )}

      {/* El sendero: los 8 pasos en vertical */}
      <div className="chip" style={{ marginTop: 28 }}>Los ocho pasos</div>
      <div className="sendero">
        {PASOS.map((p, i) => {
          const hecho = levantadas.includes(p.n);
          const esSig = siguiente && p.n === siguiente.n;
          const bloqueado = !hecho && !esSig;
          return (
            <button
              key={p.n}
              className={
                "sendero-paso" +
                (hecho ? " sp-hecho" : "") +
                (esSig ? " sp-actual" : "") +
                (bloqueado ? " sp-bloq" : "")
              }
              onClick={() => (!bloqueado ? irAPaso(p) : null)}
              disabled={bloqueado}
            >
              <div className="sp-linea">
                <div className="sp-nodo">
                  {hecho ? <Icono name="check" size={15} /> : p.n}
                </div>
                {i < PASOS.length - 1 && <div className="sp-bar" />}
              </div>
              <div className="sp-body">
                <div className="sp-titulo">{p.titulo}</div>
                <div className="sp-sub">{p.subtitulo}</div>
              </div>
              {!bloqueado && (
                <div className="sp-arrow">
                  <Icono name="flecha" size={16} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
