"use client";

import { T } from "../lib/textos";

export default function Mesa() {
  return (
    <div className="screen">
      <div className="eyebrow">{T.mesa.titulo}</div>
      <h1 className="screen-title">
        La <em>Mesa</em>
      </h1>
      <p className="screen-sub">{T.mesa.sub}</p>

      <div className="card card-gold">
        <div className="chip">Proximamente</div>
        <p className="body-p">{T.mesa.proximamente}</p>
      </div>

      <p className="foot-note">
        {T.marca} · {T.autor}
      </p>
    </div>
  );
}
