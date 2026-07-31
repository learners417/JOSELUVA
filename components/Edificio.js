"use client";

// ============================================================
// EL EDIFICIO - la ilustracion viva del recorrido (como el
// arbol de NIDO, pero para Jose). Se levanta planta por planta
// segun cuantas estan hechas. SVG propio, se ilumina en dorado
// lo construido, queda en gris lo que falta.
// ============================================================

export default function Edificio({ plantas = 0, total = 8 }) {
  // 8 plantas apiladas. Cada una es una franja horizontal.
  const alto = 300;
  const anchoBase = 150;
  const pisoH = 26;
  const baseY = alto - 30;

  return (
    <svg
      viewBox="0 0 220 320"
      width="100%"
      style={{ maxWidth: 240, display: "block", margin: "0 auto" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8963F" />
          <stop offset="50%" stopColor="#E8D4A0" />
          <stop offset="100%" stopColor="#CFB053" />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* suelo / cimientos */}
      <line x1="30" y1="292" x2="190" y2="292" stroke="#CFB053" strokeWidth="1.5" opacity="0.5" />
      <text x="110" y="308" textAnchor="middle" fill="#6B6F78" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">CIMIENTOS</text>

      {/* 8 plantas de abajo hacia arriba */}
      {Array.from({ length: total }).map((_, i) => {
        const levantada = i < plantas;
        const y = 292 - (i + 1) * 30;
        // el edificio se afina hacia arriba (perspectiva sutil)
        const inset = i * 3.5;
        const x1 = 40 + inset;
        const x2 = 180 - inset;
        const esActual = i === plantas; // la proxima a construir
        return (
          <g key={i} style={{ transition: "opacity .6s" }}>
            {/* piso */}
            <rect
              x={x1}
              y={y}
              width={x2 - x1}
              height="26"
              rx="2"
              fill={levantada ? "url(#foil)" : "rgba(255,255,255,0.03)"}
              stroke={levantada ? "#E8D4A0" : esActual ? "#CFB053" : "rgba(255,255,255,0.08)"}
              strokeWidth={esActual ? "1.6" : "1"}
              strokeDasharray={esActual ? "3 3" : "0"}
              opacity={levantada ? 1 : esActual ? 0.9 : 0.4}
              filter={levantada ? "url(#glow)" : "none"}
            />
            {/* ventanas de la planta levantada */}
            {levantada &&
              [0, 1, 2].map((w) => (
                <rect
                  key={w}
                  x={x1 + 10 + w * ((x2 - x1 - 20) / 3)}
                  y={y + 8}
                  width="6"
                  height="10"
                  rx="1"
                  fill="#0A0D13"
                  opacity="0.55"
                />
              ))}
            {/* numero de planta */}
            <text
              x={x1 - 8}
              y={y + 18}
              textAnchor="end"
              fill={levantada ? "#E8D4A0" : "#6B6F78"}
              fontSize="10"
              fontFamily="Libre Baskerville, serif"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* remate / bandera dorada cuando esta completo */}
      {plantas >= total && (
        <g filter="url(#glow)">
          <line x1="110" y1="52" x2="110" y2="34" stroke="#E8D4A0" strokeWidth="1.5" />
          <path d="M110 34 L128 40 L110 46 Z" fill="url(#foil)" />
        </g>
      )}
    </svg>
  );
}
