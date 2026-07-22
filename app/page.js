"use client";

import { useState, useEffect } from "react";
import { loadState, saveState, resetState } from "../lib/store";
import { PREFIJOS_VALIDOS } from "../lib/programa";
import { T } from "../lib/textos";

import Login from "../components/Login";
import Onboarding from "../components/Onboarding";
import AppShell from "../components/AppShell";

export default function Page() {
  const [state, setState] = useState(null);
  const [ready, setReady] = useState(false);

  // cargar estado al montar (cliente)
  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  // persistir cada cambio
  useEffect(() => {
    if (ready && state) saveState(state);
  }, [state, ready]);

  function update(patch) {
    setState((s) => ({ ...s, ...patch }));
  }

  function handleAccess(codigo) {
    const prefijo = codigo.split("-")[0].toUpperCase();
    if (!PREFIJOS_VALIDOS.includes(prefijo)) return false;
    update({
      acceso: { codigo, plan: prefijo },
      createdAt: state.createdAt || new Date().toISOString(),
    });
    return true;
  }

  function handleDemo() {
    update({
      acceso: { codigo: "DEMO-0000", plan: "DEMO" },
      createdAt: new Date().toISOString(),
    });
  }

  function handleOnboarding(data) {
    update({ onboarding: data });
  }

  function handleReset() {
    resetState();
    setState(loadState());
  }

  if (!ready || !state) {
    return (
      <div className="center-screen" style={{ textAlign: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!state.acceso) {
    return <Login onAccess={handleAccess} onDemo={handleDemo} />;
  }

  if (!state.onboarding) {
    return <Onboarding onDone={handleOnboarding} />;
  }

  return <AppShell state={state} update={update} onReset={handleReset} />;
}
