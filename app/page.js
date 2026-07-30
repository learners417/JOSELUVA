"use client";

import { useState, useEffect, useRef } from "react";
import { loadState, saveState, resetState } from "../lib/store";
import { syncDisponible, hidratar, subir } from "../lib/sync";
import { PREFIJOS_VALIDOS } from "../lib/programa";

import Login from "../components/Login";
import Onboarding from "../components/Onboarding";
import AppShell from "../components/AppShell";
import Guardado from "../components/Guardado";

export default function Page() {
  const [state, setState] = useState(null);
  const [ready, setReady] = useState(false);
  const [guardando, setGuardando] = useState("idle"); // idle | saving | saved
  const subeTimer = useRef(null);
  const primeraCarga = useRef(true);

  // Cargar estado local al montar.
  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  // Persistir cada cambio: local siempre, nube con debounce + indicador.
  useEffect(() => {
    if (!ready || !state) return;
    saveState(state); // local: instantaneo

    // No mostrar "guardando" en la primera carga.
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }

    if (syncDisponible() && state.acceso?.codigo) {
      setGuardando("saving");
      clearTimeout(subeTimer.current);
      subeTimer.current = setTimeout(async () => {
        const ok = await subir(state.acceso.codigo, state);
        setGuardando(ok ? "saved" : "idle");
        if (ok) setTimeout(() => setGuardando("idle"), 1800);
      }, 900);
    }
  }, [state, ready]);

  function update(patch) {
    setState((s) => ({ ...s, ...patch }));
  }

  // Al acceder: hidratar desde la nube si hay progreso mas completo.
  async function handleAccess(codigo) {
    const prefijo = codigo.split("-")[0].toUpperCase();
    if (!PREFIJOS_VALIDOS.includes(prefijo)) return false;

    let base = {
      ...state,
      acceso: { codigo, plan: prefijo },
      createdAt: state.createdAt || new Date().toISOString(),
    };

    // Traer de la nube (si esta configurada) y fusionar.
    if (syncDisponible()) {
      setGuardando("saving");
      const remoto = await hidratar(codigo);
      if (remoto && typeof remoto === "object") {
        // La nube manda para el progreso; conservamos el acceso actual.
        base = { ...base, ...remoto, acceso: { codigo, plan: prefijo } };
      }
      setGuardando("idle");
    }

    setState(base);
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
    return (
      <>
        <Onboarding onDone={handleOnboarding} />
        <Guardado estado={guardando} />
      </>
    );
  }

  return (
    <>
      <AppShell state={state} update={update} onReset={handleReset} />
      <Guardado estado={guardando} />
    </>
  );
}
