# Serena Ambición — App

App del Método **Serena Ambición** de José Luis Valle Tulián (*José Luva*).
*Del éxito al sentido.*

**Avatar:** Empresarios y profesionales +50 con un **proyecto vital postergado**.

Next.js 14 (App Router) · PWA instalable · IA (VALLE) vía proxy seguro sin API key en el cliente.

---

## v2 — Corregido contra las páginas en vivo

Esta versión se corrigió leyendo `joseluis-valle.com`. Cambios respecto a la v1:

- **La sesión gratuita se llama "Entrevista de Expansión"** (antes se había inventado "Sesión de Diseño de Vida").
- **El eje del método es el PROYECTO VITAL POSTERGADO**, no un malestar difuso. Toda la app gira alrededor de eso.
- **Tono frontal**, tomado de la VSL: *"Aquí no vienes a sentirte mejor con tu postergación. Vienes a decidir si la terminas o la arrastras hasta el final."*
- **URLs reales de los 9 instrumentos** (varios slugs no coincidían con lo asumido).
- **Link de agenda real:** el widget de booking de LeadConnector.
- Marca: **José Luva** como firma corta, **José Luis Valle Tulián** como nombre completo.

---

## Qué es esto

La capa de experiencia y ejecución del sistema de 90 días. Entre las sesiones 1-a-1, el cliente:

- **Hoy** — ritual de 5 min: la pregunta de la mañana, una distinción, una elección consciente, y el tracker de si el proyecto avanzó.
- **La Obra** — los 8 pasos como plantas de un edificio que suben con evidencia real.
- **El Plano** — el proyecto postergado con nombre, los 3 movimientos con fecha, y los hitos a 12 años.
- **Valle** — la IA con la voz de José Luis, que conoce su proyecto y empuja hacia la fecha.
- **El Alto** — respiración + el audio real + la frase de corte.
- **Más** — Instrumentos (los 9 lead magnets), Entrevista de Expansión, La Mesa.

---

## Deploy en 5 pasos (GitHub → Vercel)

### 1. Subir a GitHub
Repo nuevo, archivos en la **raíz**:

```bash
git init
git add .
git commit -m "Serena Ambicion app v2"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/serena-ambicion-app.git
git push -u origin main
```

### 2. Conectar a Vercel
vercel.com → **Add New → Project** → importás el repo → Framework: **Next.js** (lo detecta solo) → **Deploy**.

### 3. Variables de entorno
**Ninguna necesaria.** VALLE usa el proxy `apighl.vercel.app`, que no requiere key. Ver `.env.example` para el futuro (Supabase / Anthropic directa).

### 4. Listo
Vercel te da la URL. Cada `git push` re-deploya solo.

### 5. Probar
Código: cualquiera con prefijo `DISENO-`, `AUTOGUIADO-` o `DEMO-` (ej: `DISENO-1234`), o **Probar en modo demo**.

---

## Correr local

```bash
npm install
npm run dev
```
http://localhost:3000

---

## Dónde se edita el contenido

**Todo el método vive en `lib/programa.js`:** los 8 pasos, las 3 fases, las 8 distinciones, la pregunta de la mañana, los 9 instrumentos con sus URLs, los mensajes de José Luis (VOZ MAESTRO), el link de agenda y el eje del proyecto postergado.

Los textos de interfaz están en `lib/textos.js`.
El system prompt de VALLE está en `app/api/valle/route.js`.

---

## Los 9 instrumentos conectados (URLs en vivo)

| Instrumento | URL |
|---|---|
| Auditoría de Rentabilidad Vital | `/auditoria-rentabilidad-vital` |
| Planificador Década de Oro | `/planificador-decada-de-oro` |
| Mapa de Fugas | `/mapa-fugas` |
| El Vaso Lleno | `/diagnostico-vacio` |
| Copiloto de Cabina | `/copiloto-regulacion` |
| Arquitecto de Legado | `/lm---arquitecto-legado` |
| Redescubre tu Proyecto Vital | `/redescubre-proposito-vital` |
| El método simple para calmar tu día | `/audio-calmar` |
| Un momento para volver a ti | `/momento-para-volver` |

---

## Seguridad

**Cero API keys en el cliente.** VALLE llama al proxy desde el servidor (`app/api/valle/route.js`). Si algún día se usa la API de Anthropic directa, la key va en variable de entorno de Vercel, nunca en el código.

---

## Roadmap

**FASE 1 (este código):** esqueleto vivo completo. Persistencia local (localStorage).
**FASE 2:** instrumentos embebidos como diagnósticos dentro de la app; video de los 8 pasos si lo hay.
**FASE 3:** Supabase — progreso en la nube, memoria real de VALLE, La Mesa activa. Se reemplaza `lib/store.js` sin tocar pantallas.
**FASE 4:** tier autoguiado + Nivel 4 (mastermind anual) en La Mesa.

---

## Pendientes de José Luis

- **Su historia personal** para la VOZ MAESTRO (`VOZ_MAESTRO` en `lib/programa.js`). Hoy el tono está tomado de la VSL, pero falta su herida propia — el mismo hueco marcado en el documento de marca.
- **Validar los 8 pasos** tal como quedaron cargados.
- Íconos PWA (`public/icon-192.png`, `icon-512.png`) — opcional.
