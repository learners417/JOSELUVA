#!/usr/bin/env python3
# ============================================================
# AUDITORIA MAESTRA - Serena Ambicion
# Certifica las 10 cirugias. Valida por presencia real en el
# codigo, no por promesas. Sale con exit code 0 solo si TODO
# pasa. Regla de TCD: se valida por exit code, nunca por log.
# ============================================================
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
fails = []
oks = []

def leer(rel):
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        return None
    with open(p, encoding="utf-8") as f:
        return f.read()

def check(nombre, cond):
    (oks if cond else fails).append(nombre)

# ---------- LEXICO BLINDADO (el corazon) ----------
# Palabras prohibidas que NO deben aparecer como copy visible.
PROHIBIDAS = ["proposito", "propósito", "crisis", "mindfulness",
              "motivacion", "motivación", "bienestar", "abundancia",
              "tu mejor version", "sanar"]

# Archivos de contenido visible (no la logica del lexico ni el prompt
# que LISTA las prohibidas para vetarlas).
CONTENIDO = ["lib/textos.js", "lib/programa.js", "lib/avatar.js",
             "lib/diagnosticos.js", "components/Onboarding.js",
             "components/Obra.js", "components/Plano.js",
             "components/Ritual.js", "components/Alto.js",
             "components/Valle.js", "components/Instrumentos.js",
             "components/Diagnostico.js", "components/Mesa.js",
             "components/Agenda.js", "components/Historia.js",
             "components/Mas.js"]

def negada(texto, idx):
    antes = texto[max(0, idx-28):idx].lower()
    return bool(re.search(r"\bno\b[^.]*$|\bni\b[^.]*$|tampoco", antes))

lexico_sucio = []
for rel in CONTENIDO:
    s = leer(rel)
    if not s:
        continue
    low = s.lower()
    # quitar URLs
    low = re.sub(r"https?://\S+", "", low)
    for p in PROHIBIDAS:
        for m in re.finditer(re.escape(p), low):
            if not negada(low, m.start()):
                lexico_sucio.append(f"{rel}: '{p}'")
check("Lexico blindado (cero palabras prohibidas como copy)", len(lexico_sucio) == 0)

# ---------- SIN CONTAMINACION DE ROBERTO (KENSHO) ----------
ROBERTO = ["KENSHO", "Martin Cardenas", "Martín Cárdenas", "El Cronista",
           "El Guardian", "Retiro Ecuador", "3:17"]
roberto_hallado = []
for rel in CONTENIDO + ["app/api/valle/route.js"]:
    s = leer(rel)
    if not s:
        continue
    for r in ROBERTO:
        if r in s:
            roberto_hallado.append(f"{rel}: '{r}'")
check("Sin contaminacion de Roberto/KENSHO", len(roberto_hallado) == 0)

# ---------- TURNO 1: cerebro del avatar + lexico ----------
av = leer("lib/avatar.js") or ""
lx = leer("lib/lexico.js") or ""
check("T1 avatar.js (3 dolores + personas)",
      "DOLORES" in av and "PERSONAS" in av and "detectarDolor" in av)
check("T1 lexico.js (revisor + saneador)",
      "revisarLexico" in lx and "sanearLexico" in lx and "PROHIBIDAS" in lx)

# ---------- TURNO 2: onboarding alineado al curso ----------
ob = leer("components/Onboarding.js") or ""
check("T2 onboarding (nombre + sueno, entrada al camino)",
      "sueno" in ob and "Doce semanas" in ob and "diseñar" in ob)

# ---------- TURNO 3: El Plano - decada de oro ----------
pl = leer("components/Plano.js") or ""
check("T3 plano (decada de oro + castillo/reino)",
      "decada" in pl.lower() and "castillo" in pl.lower() and "reino" in pl.lower())

# ---------- TURNO 4: VALLE Master Coach ----------
va = leer("components/Valle.js") or ""
rt = leer("app/api/valle/route.js") or ""
check("T4 VALLE (memoria + modos + contexto)",
      "valleChat" in va and "activarModo" in va and "castillo" in va)
check("T4 VALLE API (blindaje + modos + dolores)",
      "BLINDAJE" in rt and "MODOS" in rt and "nombresDolor" in rt)

# ---------- TURNO 5: La Obra por evidencia ----------
ob5 = leer("components/Obra.js") or ""
pr = leer("lib/programa.js") or ""
check("T5 obra por evidencia (no toggle)",
      "evidenciaDePaso" in pr and "plantasLevantadas" in pr and "celebra" in ob5)

# ---------- TURNO 6: 6 diagnosticos nativos ----------
dg = leer("lib/diagnosticos.js") or ""
dgc = leer("components/Diagnostico.js") or ""
seis = all(k in dg for k in ["vaso", "mapa", "decada", "arquitecto", "copiloto", "redescubrimiento"])
check("T6 seis diagnosticos definidos", seis)
check("T6 motor de diagnostico (scoring + guarda)",
      "calcularResultado" in dg and "diagResultados" in dgc)

# ---------- TURNO 7: El Alto + ritual sofisticado ----------
al = leer("components/Alto.js") or ""
ri = leer("components/Ritual.js") or ""
check("T7 Alto (respiracion guiada + Copiloto)",
      "Inhala" in al and "copiloto" in al)
check("T7 ritual (hito hacia La Obra)", "ritual-hito" in ri)

# ---------- TURNO 8: Supabase + Guardado ----------
sy = leer("lib/sync.js") or ""
pg = leer("app/page.js") or ""
gu = leer("components/Guardado.js") or ""
check("T8 sync opcional (import dinamico)",
      "syncDisponible" in sy and 'import("@supabase/supabase-js")' in sy)
check("T8 hidratacion + guardado visible",
      "hidratar" in pg and gu != "")

# ---------- TURNO 9: Mesa + escalera ----------
me = leer("components/Mesa.js") or ""
ag = leer("components/Agenda.js") or ""
check("T9 Mesa con presencia real", "PILARES" in me)
check("T9 escalera (mapa del camino)",
      "ESCALERA" in pr and "ESCALERA.map" in ag)
check("T9 sin precios exactos en la app",
      "2997" not in ag and "2.997" not in ag and "5000" not in ag)

# ---------- RESULTADO ----------
print("=" * 52)
print("  AUDITORIA MAESTRA - Serena Ambicion")
print("=" * 52)
for o in oks:
    print(f"  OK   {o}")
if lexico_sucio:
    print("\n  Lexico sucio:")
    for l in lexico_sucio:
        print(f"       {l}")
if roberto_hallado:
    print("\n  Contaminacion Roberto:")
    for r in roberto_hallado:
        print(f"       {r}")
for f in fails:
    print(f"  FAIL {f}")
print("=" * 52)
print(f"  {len(oks)} OK / {len(fails)} FAIL")
print("=" * 52)

sys.exit(1 if fails else 0)
