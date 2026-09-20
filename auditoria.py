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
check("HOY (pantalla guia)", "semanaActual" in leer("components/Hoy.js"))
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


# --- Cambios 16 sep 2026 ---
prog = leer("lib/progreso.js")
check("Motor de días (ritmo fijo)", "semanaPorFecha" in prog and "diasDesdeIngreso" in prog)
curso = leer("lib/curso.js")
check("Tipos de ruta (Activación/Práctica/Podcast/Clase)", "TIPO_RUTA" in curso and "Activación" in curso)
camino = leer("components/Camino.js")
check("Camino: edificio + checks diario/único", "camino-edificio" in camino and "check-diario" in camino and "check-unico" in camino)
hoy = leer("components/Hoy.js")
check("Hoy: un solo paso por semana", "Ir a mi semana" in hoy and "diaDeLaSemana" in hoy)
diario = leer("components/Diario.js")
check("Bitácora: mínimo de caracteres con aviso", "Te faltan" in diario and "MIN = 20" in diario)
check("Bitácora: cards con ícono", "bita-icono" in diario and "ICONO_RUTA" in diario)
yo = leer("components/Yo.js")
check("Escribir a José: correo directo", "soy.joseluva@gmail.com" in yo and "sop-mail-link" in yo)
check("Escribir a José: más entidad", "José Luis Valle Tulián" in yo)
login = leer("components/Login.js")
check("Login: bienvenida (sin nicho)", "Bienvenido a Serena" in login)
video = leer("components/VideoClase.js")
check("PDF dice Ruta", "Abrir la ruta" in video)

print("="*52)
print(f"  {oks} OK / {fails} FAIL")
print("="*52)
