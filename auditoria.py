#!/usr/bin/env python3
# Auditoria de la app Serena Ambicion (version del panel YO + libro).
import os

def leer(p):
    try:
        return open(p, encoding='utf-8').read()
    except: return ""

oks, fails = 0, 0
def check(nombre, cond):
    global oks, fails
    print(f"  {'OK  ' if cond else 'FAIL'} {nombre}")
    if cond: oks += 1
    else: fails += 1

print("="*52)
print("  AUDITORIA - Serena Ambicion")
print("="*52)

# Estructura del curso
curso = leer("lib/curso.js")
check("Curso: 12 semanas", "SEMANAS" in curso)
bita = leer("lib/bitacora.js")
check("Bitacora: preguntas del Excel", "BITACORA_SEMANAS" in bita and "preguntasSemana" in bita)

# Motor de progreso
prog = leer("lib/progreso.js")
check("Motor: bloqueo estricto", "semanaDesbloqueada" in prog and "proximoPaso" in prog)
check("Motor: rueda en 1,4,8,12", "SEMANAS_RUEDA" in prog and "[1, 4, 8, 12]" in prog)

# Programas (escalera)
programas = leer("lib/programas.js")
check("Programas: 3 niveles", "autoguiado" in programas and "coaching" in programas and "mentoria" in programas)

# Pantallas nuevas
check("HOY (pantalla guia)", "proximoPaso" in leer("components/Hoy.js"))
check("CAMINO (mapa con bloqueo)", "semanaDesbloqueada" in leer("components/Camino.js"))
check("BITACORA (matriz + historial)", "HistorialBitacora" in leer("components/Diario.js"))
check("RUEDA (evolucion + cierre)", "rueda-evol" in leer("components/RuedaVida.js"))
check("VALLE (voz del libro)", "DOCE SEMANAS" in leer("app/api/valle/route.js"))

# YO - panel de usuario
yo = leer("components/Yo.js")
check("YO: perfil + foto", "cambiarFoto" in yo and "yo-foto" in yo)
check("YO: sueno editable", "guardarSueno" in yo)
check("YO: subir de plan", "SubirPlan" in yo)
check("YO: soporte a Jose", "soporteMensajes" in yo)

# El libro
libro = leer("lib/libro.js")
check("LIBRO: 10 capitulos", libro.count("titulo:") >= 10)
check("LIBRO: lector en la app", "libro-prosa" in leer("components/Libro.js"))

# Admin
admin = leer("components/Admin.js")
check("ADMIN: ver progreso", "VerProgreso" in admin)
check("ADMIN: mensajes de clientes", "function Mensajes" in admin)
check("ADMIN: generar codigos", "GenerarCodigos" in admin)

# Nav limpio (5 tabs)
shell = leer("components/AppShell.js")
check("NAV: 5 tabs (Hoy/Camino/Bitacora/Valle/Yo)", shell.count('key: "') == 5)

# Sin restos del avatar viejo
sin_viejo = not any(os.path.exists(f"components/{c}.js") for c in ["Obra","Plano","Mesa","Ritual","Diagnostico","Mas","Agenda"])
check("Limpio: sin componentes del avatar viejo", sin_viejo)

print("="*52)
print(f"  {oks} OK / {fails} FAIL")
print("="*52)
