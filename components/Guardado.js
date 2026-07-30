"use client";

// ============================================================
// GUARDADO - indicador flotante que mata la ansiedad de perder
// el trabajo (patron de TCD). Aparece "Guardando..." y luego
// "Guardado" con un check. Sobrio, discreto, esquina inferior.
// ============================================================

export default function Guardado({ estado }) {
  if (estado === "idle") return null;
  const saving = estado === "saving";
  return (
    <div className={"guardado-chip" + (saving ? " g-saving" : " g-saved")}>
      {saving ? (
        <>
          <span className="g-dot" />
          Guardando
        </>
      ) : (
        <>
          <span className="g-check">&#10003;</span>
          Guardado
        </>
      )}
    </div>
  );
}
