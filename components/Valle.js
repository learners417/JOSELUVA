"use client";

import { useState, useRef, useEffect } from "react";
import { T } from "../lib/textos";

export default function Valle({ nombre, proyecto }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: T.valle.saludo },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const winRef = useRef(null);

  useEffect(() => {
    if (winRef.current) winRef.current.scrollTop = winRef.current.scrollHeight;
  }, [messages, busy]);

  function fmt(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  async function send() {
    const txt = input.trim();
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
          nombre,
          proyecto,
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
        {
          role: "assistant",
          content: "Se corto la linea un segundo. Repitemelo.",
        },
      ]);
    }
    setBusy(false);
  }

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

      <div className="chat-input">
        <textarea
          className="textarea"
          value={input}
          placeholder={T.valle.placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={2}
        />
        <button
          className="chat-send"
          onClick={send}
          disabled={busy || input.trim().length < 2}
        >
          Enviar
        </button>
      </div>
      <p className="foot-note">Valle · la voz de {T.autor}</p>
    </div>
  );
}
