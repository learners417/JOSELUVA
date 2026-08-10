"use client";

import { useState } from "react";
import { hidratar, syncDisponible } from "../lib/sync";
import { SEMANAS } from "../lib/curso";
import { PROGRAMAS, nombrePrograma } from "../lib/programas";
import { semanasHechas, SEMANAS_RUEDA } from "../lib/progreso";
import Icono from "../lib/iconos";

// ============================================================
// MODO ADMIN - para Jose y su equipo.
// Dos funciones: ver el progreso de un cliente, y generar
// codigos de acceso por programa. En la voz sobria de la marca.
// ============================================================

export default function Admin({ onSalir }) {
  const [tab, setTab] = useState("progreso");

  return (
    <div className="screen admin-screen">
      <div className="admin-top">
        <div className="eyebrow">Panel · Serena Ambición</div>
        <button className="admin-salir" onClick={onSalir}>
          Salir
        </button>
      </div>
      <h1 className="screen-title">
        Modo <em>administrador</em>
      </h1>

      <div className="admin-tabs">
        <button
          className={"admin-tab" + (tab === "progreso" ? " at-on" : "")}
          onClick={() => setTab("progreso")}
        >
          Ver progreso
        </button>
        <button
          className={"admin-tab" + (tab === "codigos" ? " at-on" : "")}
          onClick={() => setTab("codigos")}
        >
          Generar códigos
        </button>
      </div>

      {tab === "progreso" ? <VerProgreso /> : <GenerarCodigos />}

      <p className="foot-note">Uso interno · José Luis Valle</p>
    </div>
  );
}

// --- Ver el progreso de un cliente por su código ---
function VerProgreso() {
  const [codigo, setCodigo] = useState("");
  const [data, setData] = useState(null);
  const [estado, setEstado] = useState("idle"); // idle | cargando | ok | error

  async function buscar() {
    if (codigo.trim().length < 3) return;
    if (!syncDisponible()) {
      setEstado("nosync");
      return;
    }
    setEstado("cargando");
    try {
      const remoto = await hidratar(codigo.trim());
      if (remoto && typeof remoto === "object") {
        setData(remoto);
        setEstado("ok");
      } else {
        setData(null);
        setEstado("vacio");
      }
    } catch {
      setEstado("error");
    }
  }

  return (
    <div>
      <p className="admin-hint">
        Escribe el código del cliente para ver dónde está en su camino.
      </p>
      <div className="admin-buscar">
        <input
          className="input"
          value={codigo}
          placeholder="Ej. COACHING-1234"
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
        />
        <button className="btn btn-g" onClick={buscar}>
          Ver
        </button>
      </div>

      {estado === "cargando" && <p className="admin-msg">Cargando…</p>}
      {estado === "nosync" && (
        <p className="admin-msg">
          La sincronización en la nube no está configurada. El progreso de los
          clientes se ve cuando esté activa.
        </p>
      )}
      {estado === "vacio" && (
        <p className="admin-msg">Ese código todavía no tiene progreso guardado.</p>
      )}
      {estado === "error" && (
        <p className="admin-msg">No se pudo cargar. Revisa el código.</p>
      )}

      {estado === "ok" && data && <FichaCliente data={data} />}
    </div>
  );
}

// --- Ficha de progreso de un cliente ---
function FichaCliente({ data }) {
  const nombre = data.onboarding?.nombre || "Sin nombre";
  const sueno = data.onboarding?.sueno || "";
  const hechas = semanasHechas(data);
  const programa = nombrePrograma(data.programa);
  const bitacoraSem = (data.bitacoraSemanas || []).length;
  const ruedas = SEMANAS_RUEDA.filter((s) => (data.ruedaTramos || {})[s]);

  return (
    <div className="ficha">
      <div className="ficha-head">
        <div className="ficha-nombre">{nombre}</div>
        <div className="ficha-prog">{programa}</div>
      </div>
      {sueno && (
        <div className="ficha-sueno">
          <span className="ficha-lbl">Su sueño</span>
          <p>{sueno}</p>
        </div>
      )}
      <div className="ficha-stats">
        <div className="ficha-stat">
          <span className="ficha-n">{hechas}<span>/12</span></span>
          <span className="ficha-l">Semanas completas</span>
        </div>
        <div className="ficha-stat">
          <span className="ficha-n">{bitacoraSem}</span>
          <span className="ficha-l">Bitácoras hechas</span>
        </div>
        <div className="ficha-stat">
          <span className="ficha-n">{ruedas.length}<span>/4</span></span>
          <span className="ficha-l">Ruedas medidas</span>
        </div>
      </div>
      <div className="ficha-barra">
        <span style={{ width: (hechas / 12) * 100 + "%" }} />
      </div>
      <p className="ficha-nota">
        {hechas === 0
          ? "Aún no empezó su primera semana."
          : hechas === 12
          ? "Completó el camino entero."
          : `Va por la semana ${hechas + 1}.`}
      </p>
    </div>
  );
}

// --- Generar códigos de acceso ---
function GenerarCodigos() {
  const [programa, setPrograma] = useState("coaching");
  const [nombre, setNombre] = useState("");
  const [generado, setGenerado] = useState("");

  function generar() {
    const pref = programa.toUpperCase();
    const num = Math.floor(1000 + Math.random() * 9000);
    setGenerado(`${pref}-${num}`);
  }

  return (
    <div>
      <p className="admin-hint">
        Elige el programa que compró el cliente y genera su código de acceso.
      </p>

      <div className="admin-campo">
        <label className="admin-label">Programa</label>
        <div className="admin-opciones">
          {Object.values(PROGRAMAS).map((p) => (
            <button
              key={p.id}
              className={"admin-op" + (programa === p.id ? " ao-on" : "")}
              onClick={() => setPrograma(p.id)}
            >
              <span className="admin-op-nombre">{p.nombre}</span>
              <span className="admin-op-desc">{p.descripcion}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-g" style={{ marginTop: 20 }} onClick={generar}>
        Generar código
      </button>

      {generado && (
        <div className="admin-generado">
          <span className="admin-gen-lbl">Código para el cliente</span>
          <div className="admin-gen-cod">{generado}</div>
          <p className="admin-gen-nota">
            Entrégaselo al cliente. Al entrar con este código, verá el{" "}
            {nombrePrograma(programa)}.
          </p>
        </div>
      )}
    </div>
  );
}
