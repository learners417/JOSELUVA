"use client";

import { useState } from "react";
import { T } from "../lib/textos";

import Camino from "./Camino";
import Hoy from "./Hoy";
import RuedaVida from "./RuedaVida";
import Diario from "./Diario";
import Valle from "./Valle";
import Alto from "./Alto";
import Yo from "./Yo";
import Libro from "./Libro";

const NAV = [
  { key: "hoy", lbl: "Hoy", ico: "sun" },
  { key: "camino", lbl: "Camino", ico: "map" },
  { key: "diario", lbl: "Bitácora", ico: "building" },
  { key: "valle", lbl: T.nav.valle, ico: "chat" },
  { key: "yo", lbl: "Yo", ico: "user" },
];

function Icon({ name }) {
  const paths = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    building: (
      <>
        <path d="M6 22V4a1 1 0 011-1h10a1 1 0 011 1v18" />
        <path d="M3 22h18M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      </>
    ),
    map: (
      <>
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="9" r="4" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export default function AppShell({ state, update, onReset }) {
  const [tab, setTab] = useState("hoy");

  return (
    <div className="app-root">
      {tab === "hoy" && <Hoy state={state} update={update} goTo={setTab} />}
      {tab === "camino" && <Camino state={state} update={update} />}
      {tab === "rueda" && <RuedaVida state={state} update={update} goTo={setTab} />}
      {tab === "diario" && <Diario state={state} update={update} />}
      {tab === "valle" && <Valle state={state} update={update} />}
      {tab === "alto" && <Alto state={state} update={update} />}
      {tab === "yo" && <Yo state={state} update={update} goTo={setTab} />}
      {tab === "libro" && <Libro onVolver={() => setTab("yo")} />}

      <nav className="bottomnav">
        {NAV.map((n) => (
          <button
            key={n.key}
            className={"navitem" + (tab === n.key ? " active" : "")}
            onClick={() => setTab(n.key)}
          >
            <span className="nav-ico">
              <Icon name={n.ico} />
            </span>
            <span className="nav-lbl">{n.lbl}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
