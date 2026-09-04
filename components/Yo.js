"use client";

import { useState } from "react";
import { MARCA } from "../lib/programa";
import { nombrePrograma, PROGRAMAS } from "../lib/programas";
import Icono from "../lib/iconos";

// ============================================================
// YO - el panel del usuario. Reemplaza al viejo "Mas".
// Perfil (nombre, foto, programa), su sueno, el libro, El Alto,
// subir de plan y soporte directo a Jose. Todo lo personal y
// util, en un solo lugar, sin salir de la app.
// ============================================================

export default function Yo({ state, update, goTo }) {
  const nombre = state.onboarding?.nombre || "";
  const sueno = state.onboarding?.sueno || "";
  const foto = state.foto || "";
  const programa = state.programa || "autoguiado";

  const [editSueno, setEditSueno] = useState(false);
  const [nuevoSueno, setNuevoSueno] = useState(sueno);
  const [vista, setVista] = useState(null); // null | 'plan' | 'soporte'

  function cambiarFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ foto: reader.result });
    reader.readAsDataURL(file);
  }

  function guardarSueno() {
    update({ onboarding: { ...state.onboarding, sueno: nuevoSueno.trim() } });
    setEditSueno(false);
  }

  if (vista === "plan") return <SubirPlan state={state} update={update} onVolver={() => setVista(null)} />;
  if (vista === "soporte") return <Soporte state={state} update={update} onVolver={() => setVista(null)} />;

  return (
    <div className="screen">
      <div className="eyebrow">Tu espacio</div>
      <h1 className="screen-title">
        Hola, <em>{nombre.split(" ")[0] || "bienvenido"}</em>
      </h1>

      {/* Perfil: foto + programa */}
      <div className="yo-perfil">
        <label className="yo-foto">
          {foto ? (
            <img src={foto} alt="Tu foto" />
          ) : (
            <span className="yo-foto-ph">{(nombre[0] || "?").toUpperCase()}</span>
          )}
          <span className="yo-foto-edit"><Icono name="camara" size={14} /></span>
          <input type="file" accept="image/*" onChange={cambiarFoto} hidden />
        </label>
        <div className="yo-perfil-info">
          <div className="yo-perfil-nombre">{nombre || "Tu nombre"}</div>
          <div className="yo-perfil-prog">{nombrePrograma(programa)}</div>
        </div>
      </div>

      {/* Su sueño, editable */}
      <div className="yo-sueno">
        <div className="yo-sueno-top">
          <span className="yo-sueno-lbl">Hacia esto caminas</span>
          {!editSueno && (
            <button className="yo-edit-btn" onClick={() => { setNuevoSueno(sueno); setEditSueno(true); }}>
              Editar
            </button>
          )}
        </div>
        {editSueno ? (
          <>
            <textarea
              className="textarea"
              value={nuevoSueno}
              onChange={(e) => setNuevoSueno(e.target.value)}
              style={{ marginBottom: 12 }}
            />
            <button className="btn btn-g" onClick={guardarSueno}>Guardar</button>
          </>
        ) : (
          <p className="yo-sueno-texto">{sueno || "Aún no definiste tu sueño."}</p>
        )}
      </div>

      {/* Accesos */}
      <div className="yo-accesos">
        <button className="yo-acceso" onClick={() => goTo("alto")}>
          <span className="yo-acceso-ico"><Icono name="pause" size={20} /></span>
          <span className="yo-acceso-texto">
            <span className="yo-acceso-nom">El Alto</span>
            <span className="yo-acceso-desc">Una pausa guiada, con la voz de José</span>
          </span>
          <Icono name="flecha" size={14} />
        </button>
        {programa !== "mentoria" && (
          <button className="yo-acceso" onClick={() => setVista("plan")}>
            <span className="yo-acceso-ico"><Icono name="mas" size={20} /></span>
            <span className="yo-acceso-texto">
              <span className="yo-acceso-nom">Ampliar mi acompañamiento</span>
              <span className="yo-acceso-desc">Sumar coaching o mentoría con José</span>
            </span>
            <Icono name="flecha" size={14} />
          </button>
        )}
        <button className="yo-acceso" onClick={() => setVista("soporte")}>
          <span className="yo-acceso-ico"><Icono name="chat" size={20} /></span>
          <span className="yo-acceso-texto">
            <span className="yo-acceso-nom">Escribir a José</span>
            <span className="yo-acceso-desc">Una consulta, un pedido, lo que necesites</span>
          </span>
          <Icono name="flecha" size={14} />
        </button>
      </div>

      <p className="foot-note">Serena Ambición · José Luis Valle</p>
    </div>
  );
}

// --- Subir de plan ---
function SubirPlan({ state, update, onVolver }) {
  const actual = state.programa || "autoguiado";
  const [enviado, setEnviado] = useState(false);
  // Los planes por encima del actual
  const orden = ["autoguiado", "coaching", "mentoria"];
  const disponibles = orden.slice(orden.indexOf(actual) + 1);

  function pedir(planId) {
    const pedidos = state.pedidosPlan || [];
    update({
      pedidosPlan: [...pedidos, { plan: planId, fecha: new Date().toISOString() }],
      soporteMensajes: [
        ...(state.soporteMensajes || []),
        {
          tipo: "plan",
          texto: `Quiere ampliar a: ${nombrePrograma(planId)}`,
          fecha: new Date().toISOString(),
          leido: false,
        },
      ],
    });
    setEnviado(true);
  }

  return (
    <div className="screen">
      <button className="volver-link" onClick={onVolver}>
        <Icono name="flecha" size={14} /> Volver
      </button>
      <div className="eyebrow">Ampliar acompañamiento</div>
      <h1 className="screen-title">Sumá más <em>cercanía</em></h1>
      <p className="screen-sub">
        Tu proceso puede ir más lejos con el acompañamiento en vivo de José.
        Elige y él se pondrá en contacto contigo.
      </p>

      {enviado ? (
        <div className="card card-gold">
          <div className="chip">Pedido enviado</div>
          <p className="body-p">
            José recibió tu interés. Se pondrá en contacto contigo para dar el
            siguiente paso. Gracias por confiar en el proceso.
          </p>
        </div>
      ) : (
        <div className="yo-planes">
          {disponibles.map((id) => (
            <div key={id} className="yo-plan-card">
              <div className="yo-plan-nom">{PROGRAMAS[id].nombre}</div>
              <div className="yo-plan-desc">{PROGRAMAS[id].descripcion}</div>
              <button className="btn btn-g" onClick={() => pedir(id)}>
                Me interesa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Soporte: mensaje que llega a José en admin ---
function Soporte({ state, update, onVolver }) {
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar() {
    if (texto.trim().length < 3) return;
    const msgs = state.soporteMensajes || [];
    update({
      soporteMensajes: [
        ...msgs,
        {
          tipo: "consulta",
          texto: texto.trim(),
          de: state.onboarding?.nombre || "Cliente",
          codigo: state.acceso?.codigo || "",
          fecha: new Date().toISOString(),
          leido: false,
        },
      ],
    });
    setEnviado(true);
    setTexto("");
  }

  return (
    <div className="screen">
      <button className="volver-link" onClick={onVolver}>
        <Icono name="flecha" size={14} /> Volver
      </button>
      <div className="eyebrow">Escribir a José</div>
      <h1 className="screen-title">¿En qué <em>estás</em>?</h1>
      <p className="screen-sub">
        Una consulta, una duda del proceso, un pedido. Tu mensaje le llega
        directo a José. Te responderá por su vía habitual.
      </p>

      {enviado ? (
        <div className="card card-gold">
          <div className="chip">Mensaje enviado</div>
          <p className="body-p">
            José recibió tu mensaje. Te responderá pronto. Mientras tanto, sigue
            tu camino con tranquilidad.
          </p>
        </div>
      ) : (
        <>
          <textarea
            className="textarea"
            value={texto}
            placeholder="Escribe aquí lo que necesites..."
            onChange={(e) => setTexto(e.target.value)}
            style={{ minHeight: 140, marginBottom: 16 }}
          />
          <button className="btn btn-g" onClick={enviar} disabled={texto.trim().length < 3}>
            Enviar a José
          </button>
        </>
      )}
    </div>
  );
}
