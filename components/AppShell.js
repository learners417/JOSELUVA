"use client";

import { useState } from "react";
import { T } from "../lib/textos";

import Ritual from "./Ritual";
import Camino from "./Camino";
import RuedaVida from "./RuedaVida";
import Diario from "./Diario";
import PlanServicio from "./PlanServicio";
import Obra from "./Obra";
import Plano from "./Plano";
import Valle from "./Valle";
import Alto from "./Alto";
import Instrumentos from "./Instrumentos";
import Mesa from "./Mesa";
import Agenda from "./Agenda";
import Mas from "./Mas";
import Historia from "./Historia";

const NAV = [
  { key: "hoy", lbl: "Camino", ico: "map" },
  { key: "rueda", lbl: "Rueda", ico: "sun" },
  { key: "diario", lbl: "Bitácora", ico: "building" },
  { key: "valle", lbl: T.nav.valle, ico: "chat" },
  { key: "alto", lbl: T.nav.alto, ico: "pause" },
  { key: "mas", lbl: "Mas", ico: "grid" },
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
    pause: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 9v6M14 9v6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
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

  const nombre = state.onboarding?.nombre || "";
  const proyecto = state.plano?.proyecto || "";

  return (
    <div className="app-root">
      {tab === "hoy" && <Camino state={state} update={update} />}
      {tab === "rueda" && <RuedaVida state={state} update={update} />}
      {tab === "diario" && <Diario state={state} update={update} />}
      {tab === "plan" && <PlanServicio state={state} update={update} />}
      {tab === "ritual" && (
        <Ritual state={state} update={update} onReset={onReset} goTo={setTab} />
      )}
      {tab === "obra" && <Obra state={state} update={update} goTo={setTab} />}
      {tab === "plano" && <Plano state={state} update={update} />}
      {tab === "valle" && <Valle state={state} update={update} />}
      {tab === "alto" && <Alto state={state} update={update} />}
      {tab === "instrumentos" && <Instrumentos state={state} update={update} />}
      {tab === "mas" && <Mas goTo={setTab} />}
      {tab === "mesa" && <Mesa />}
      {tab === "agenda" && <Agenda state={state} />}
      {tab === "historia" && <Historia />}

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
