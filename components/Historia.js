"use client";

import { T } from "../lib/textos";
import { HISTORIA, VOZ_MAESTRO } from "../lib/programa";

export default function Historia() {
  return (
    <div className="screen">
      <div className="eyebrow">Por que existe este metodo</div>
      <h1 className="screen-title">
        Yo tambien lo <em>postergue</em>
      </h1>

      <div className="card card-gold">
        <div className="chip">Jose Luis</div>
        <p className="mirror">{HISTORIA.breve}</p>
      </div>

      <div className="card">
        <div className="chip">Lo que tenia a los 50</div>
        {HISTORIA.miedos.map((m, i) => (
          <div className="eleccion-item" key={i}>
            <span className="arrow">&rarr;</span>
            <div>{m}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="chip">Cuando el entusiasmo no alcanzo</div>
        <p className="body-p" style={{ marginBottom: 14 }}>
          Arme planes nuevos, proyecte viajes, organice encuentros. Duro poco.
          Despues llego esto:
        </p>
        {HISTORIA.sintomas.map((m, i) => (
          <div className="eleccion-item" key={i}>
            <span className="arrow">&rarr;</span>
            <div>{m}</div>
          </div>
        ))}
      </div>

      <div className="card card-gold">
        <div className="chip">El peor momento</div>
        <p className="mirror">
          "Me di cuenta de que toda mi vida me la pase repitiendo un mismo
          ciclo, en el que postergaba mis mas importantes suenos, siempre para
          el futuro."
        </p>
      </div>

      <div className="card">
        <div className="chip">Lo que necesite</div>
        <p className="body-p" style={{ marginBottom: 12 }}>
          Entendi dos cosas. Que iba a necesitar mucho mas que entusiasmo y
          lindas ideas. Y que no lo iba a lograr solo.
        </p>
        <p className="body-p">{HISTORIA.formacion}</p>
      </div>

      <div className="card">
        <div className="chip">Ocho anos despues</div>
        {HISTORIA.logros.map((m, i) => (
          <div className="eleccion-item" key={i}>
            <span className="arrow">&rarr;</span>
            <div>{m}</div>
          </div>
        ))}
      </div>

      <div className="card card-gold">
        <div className="chip">Por eso este metodo</div>
        <p className="mirror">{VOZ_MAESTRO.bienvenida}</p>
      </div>

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
