"use client";

import { useState } from "react";
import { T } from "../lib/textos";
import { MARCA } from "../lib/programa";

export default function Login({ onAccess, onDemo }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);

  function submit() {
    if (codigo.trim().length < 3) return;
    const ok = onAccess(codigo.trim());
    if (!ok) setError(true);
  }

  return (
    <div className="center-screen">
      <div className="brand-badge">
        <span className="dot" />
        {MARCA.avatar}
      </div>
      <h1 className="hero-title">
        Serena
        <br />
        <em>Ambicion</em>
      </h1>
      <div className="hero-line" />
      <p className="hero-tag">{T.tagline}</p>

      <div className="card card-gold">
        <label className="field-label">{T.login.sub}</label>
        <input
          className="input"
          type="text"
          value={codigo}
          placeholder={T.login.placeholder}
          onChange={(e) => {
            setCodigo(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoCapitalize="characters"
        />
        {error && (
          <p style={{ color: "var(--red)", fontSize: 13, marginTop: 10 }}>
            {T.login.error}
          </p>
        )}
        <button
          className="btn btn-g"
          style={{ marginTop: 16 }}
          onClick={submit}
          disabled={codigo.trim().length < 3}
        >
          {T.login.boton}
        </button>
      </div>

      <button className="btn-ghost" style={{ marginTop: 8 }} onClick={onDemo}>
        {T.login.demo}
      </button>

      <p className="foot-note">
        {T.autor}
      </p>
    </div>
  );
}
