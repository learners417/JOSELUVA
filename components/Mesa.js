"use client";

import { T } from "../lib/textos";
import { MARCA } from "../lib/programa";

// ============================================================
// LA MESA v3 - el circulo de pares (nivel superior de la escalera).
// Ya no es "proximamente" vacio: tiene presencia real. Explica
// que es, para quien, y por que existe, aunque abra a futuro.
// ============================================================

const PILARES = [
  {
    t: "Pares, no publico",
    d: "Personas que ya cruzaron la misma bisagra. Nadie explicando lo obvio. El nivel de conversacion que no encuentras en otro lado.",
  },
  {
    t: "El trabajo no se apaga a los 90 dias",
    d: "El programa te da el sistema. La Mesa te da el sosten para que no vuelvas al piloto automatico cuando la vida empuje.",
  },
  {
    t: "Diseno en voz alta",
    d: "Traes tu decada de oro a la mesa. La miras con otros que estan disenando la suya. Lo que no ves solo, lo ven ellos.",
  },
];

export default function Mesa() {
  return (
    <div className="screen">
      <div className="eyebrow">El circulo</div>
      <h1 className="screen-title">
        La <em>Mesa</em>
      </h1>
      <p className="screen-sub">
        El circulo de quienes decidieron no arrastrar su proyecto hasta el
        final.
      </p>

      <div className="card card-gold">
        <p className="mirror">
          Diseñar solo es dificil. No porque falte capacidad: porque nadie ve
          sus propios puntos ciegos. La Mesa es el lugar donde se miran entre
          pares.
        </p>
      </div>

      {PILARES.map((p, i) => (
        <div className="card" key={i}>
          <div className="mesa-pilar-t">{p.t}</div>
          <p className="body-p">{p.d}</p>
        </div>
      ))}

      <div className="card">
        <div className="chip">Como se entra</div>
        <p className="body-p">
          La Mesa abre para quienes completan el programa de 90 dias. Es el paso
          natural despues de instalar el sistema: pasar de construir tu obra a
          sostenerla, en compania.
        </p>
      </div>

      <p className="foot-note">
        {T.marca} &middot; {T.autor}
      </p>
    </div>
  );
}
