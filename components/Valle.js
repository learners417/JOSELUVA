"use client";

import { useState, useRef, useEffect } from "react";
import { T } from "../lib/textos";

// ============================================================
// VALLE v3 - El Master Coach de bolsillo.
// Memoria persistente (localStorage ahora, Supabase en T8),
// contexto rico (dolores, proyecto, plano, castillo/reino),
// 3 modos de conversacion, y saludo distinto si vuelve.
// ============================================================

export default function Valle({ state, update }) {
  const nombre = state.onboarding?.nombre || "";
  const guardado = Array.isArray(state.valleChat) ? state.valleChat : [];
  const vuelve = guardado.length > 0;

  const [messages, setMessages] = useState(
    vuelve
      ? guardado
      : [{ role: "assistant", content: T.valle.saludo }]
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [modo, setModo] = useState(null);
  const winRef = useRef(null);

  useEffect(() => {
    if (winRef.current) winRef.current.scrollTop = winRef.current.scrollHeight;
  }, [messages, busy]);

  // Persistir la conversacion cada vez que cambia (menos el saludo solo).
  useEffect(() => {
    if (messages.length > 1) update({ valleChat: messages });
  }, [messages]);

  function fmt(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  // Contexto rico para el system prompt.
  function contexto() {
    const o = state.onboarding || {};
    const p = state.plano || {};
    const dr = state.diagResultados || {};
    // Resumen legible de los diagnosticos completados.
    const diag = Object.entries(dr).map(
      ([k, v]) => `${k}: ${v.titulo} (${v.score})`
    );
    return {
      nombre,
      dolores: o.dolores || (o.dolor ? [o.dolor] : []),
      proyecto: p.proyecto || "",
      castillo: p.castillo || "",
      reino: p.reino || "",
      tramo: p.tramo || "",
      diagnosticos: diag,
    };
  }

  async function enviar(textoForzado, modoActivo) {
    const txt = (textoForzado ?? input).trim();
    if (!txt || busy) return;
    const next = [...messages, { role: "user", content: txt }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/valle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== "system"),
          ...contexto(),
          modo: modoActivo || modo,
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "..." },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Se corto la linea un segundo. Repitemelo." },
      ]);
    }
    setBusy(false);
  }

  // Cada modo arranca la conversacion con una entrada distinta.
  function activarModo(m) {
    setModo(m.clave);
    const entradas = {
      profundizar:
        "Quiero profundizar en algo que vengo dando vueltas. Ayudame a mirarlo mejor.",
      conversacion:
        "Hay una conversacion que vengo evitando. Ayudame a verla.",
      roleplay:
        "Quiero ensayar una conversacion dificil antes de tenerla de verdad.",
    };
    enviar(entradas[m.clave], m.clave);
  }

  function reiniciar() {
    setMessages([{ role: "assistant", content: T.valle.saludo }]);
    setModo(null);
    update({ valleChat: [] });
  }

  const soloSaludo = messages.length <= 1;

  return (
    <div className="screen">
      <div className="eyebrow">{T.valle.titulo}</div>
      <h1 className="screen-title">Valle</h1>
      <p className="screen-sub">{T.valle.sub}</p>

      <div className="chat-win" ref={winRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={"msg " + (m.role === "assistant" ? "msg-ai" : "msg-me")}
          >
            <div className="msg-name">
              {m.role === "assistant" ? "Valle" : "Tu"}
            </div>
            <div dangerouslySetInnerHTML={{ __html: fmt(m.content) }} />
          </div>
        ))}
        {busy && (
          <div className="typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      {/* Modos: solo cuando la conversacion recien arranca */}
      {soloSaludo && !busy && (
        <div className="modos-row">
          {T.valle.modos.map((m) => (
            <button
              key={m.clave}
              className="modo-chip"
              onClick={() => activarModo(m)}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input">
        <textarea
          className="textarea"
          value={input}
          placeholder={T.valle.placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
          rows={2}
        />
        <button
          className="chat-send"
          onClick={() => enviar()}
          disabled={busy || input.trim().length < 2}
        >
          Enviar
        </button>
      </div>

      {/* Reiniciar: solo si hay conversacion guardada */}
      {!soloSaludo && (
        <button className="btn-ghost" onClick={reiniciar}>
          {T.valle.reset}
        </button>
      )}

      <p className="foot-note">Valle &middot; la voz de {T.autor}</p>
    </div>
  );
}
