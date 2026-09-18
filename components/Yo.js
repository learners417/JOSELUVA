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
            <span className="yo-acceso-nom">Escribir a José Luis</span>
            <span className="yo-acceso-desc">Para lo importante de tu proceso. Él te responde</span>
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
  const [contacto, setContacto] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // URL del webhook de GHL — José la crea en Automation → Inbound Webhook.
  // Cuando esté, pegar aquí. GHL dispara el mail a soy.joseluva@gmail.com.
  const WEBHOOK_JOSE =
    "https://services.leadconnectorhq.com/hooks/m0oQv3eLz3Ewj8PeqgqY/webhook-trigger/e5ee6284-d3ee-447b-85dc-6075feeb6d69";

  const valido = texto.trim().length >= 20 && contacto.trim().length >= 5;

  async function enviar() {
    if (!valido) return;
    setEnviando(true);
    const carga = {
      de: state.onboarding?.nombre || "Cliente",
      codigo: state.acceso?.codigo || "",
      contacto: contacto.trim(),
      mensaje: texto.trim(),
      fecha: new Date().toISOString(),
    };
    // Envía al webhook de GHL si está configurado.
    if (WEBHOOK_JOSE) {
      try {
        await fetch(WEBHOOK_JOSE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carga),
        });
      } catch (e) {
        // Falla silenciosa: igual se guarda abajo como respaldo.
      }
    }
    // Respaldo local (por si el webhook falla o aún no está).
    update({
      soporteMensajes: [
        ...(state.soporteMensajes || []),
        { tipo: "consulta", texto: carga.mensaje, de: carga.de, contacto: carga.contacto, codigo: carga.codigo, fecha: carga.fecha, leido: false },
      ],
    });
    setEnviando(false);
    setEnviado(true);
    setTexto("");
  }

  return (
    <div className="screen">
      <button className="volver-link" onClick={onVolver}>
        <Icono name="flecha" size={14} /> Volver
      </button>
      <div className="eyebrow">Un mensaje a José Luis Valle Tulián</div>
      <h1 className="screen-title">Escríbele a <em>José Luis</em></h1>
      <p className="screen-sub">
        Este espacio es para lo que de verdad importa en tu proceso: una
        pregunta profunda, una decisión que estás tomando, un pedido concreto.
        José lo lee personalmente y te responde a tu contacto.
      </p>

      {enviado ? (
        <div className="card card-gold">
          <div className="chip">Mensaje enviado</div>
          <p className="body-p">
            José Luis recibió tu mensaje. Te responderá a tu WhatsApp o correo.
            Sigue tu camino con tranquilidad.
          </p>
        </div>
      ) : (
        <>
          <textarea
            className="textarea"
            value={texto}
            placeholder="Escribe tu consulta con detalle..."
            onChange={(e) => setTexto(e.target.value)}
            style={{ minHeight: 140, marginBottom: 6 }}
          />
          {texto.trim().length > 0 && texto.trim().length < 20 && (
            <div className="bita-min" style={{ marginBottom: 12 }}>
              Te faltan {20 - texto.trim().length} caracteres.
            </div>
          )}
          <input
            className="input"
            value={contacto}
            placeholder="Tu WhatsApp o correo (para que José te responda)"
            onChange={(e) => setContacto(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <button className="btn btn-g" onClick={enviar} disabled={!valido || enviando}>
            {enviando ? "Enviando…" : "Enviar a José Luis"}
          </button>
        </>
      )}
    </div>
  );
}
