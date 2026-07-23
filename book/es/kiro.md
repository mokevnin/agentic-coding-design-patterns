---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# Kiro

[Kiro](https://kiro.dev) es la respuesta de AWS al
[desarrollo orientado a especificaciones](spec-driven-development.md): no un
toolkit sobre el agente de otro, sino un producto con SDD integrado como modo.
Kiro existe en dos formas: el IDE (un fork de Code OSS lanzado a mediados de
2025) y Kiro CLI — el Amazon Q Developer CLI renombrado. El agente es el
propio de Kiro, sobre modelos de la familia Claude; no soporta otros
asistentes.

## Flujo de trabajo

Junto a las sesiones vibe normales, Kiro tiene **sesiones spec**: la propia
interfaz te lleva por tres fases, y cada una exige la aprobación explícita del
desarrollador — sin comandos slash, con botones del IDE:

1. **Requirements** → `requirements.md` — historias de usuario con criterios
   de aceptación en notación EARS: «WHEN *condición* THEN the system SHALL
   *acción*». Formulaciones así se pueden comprobar mecánicamente. El botón
   «Analyze Requirements» lanza un análisis de requisitos en profundidad.
2. **Design** → `design.md` — arquitectura, interfaces, diagramas de
   secuencia; Kiro genera el diseño leyendo el código existente.
3. **Tasks** → `tasks.md` — plan de implementación con tareas ligadas a los
   requisitos. Las tareas se marcan de una en una, y «Run all Tasks» construye
   un grafo de dependencias y ejecuta las tareas independientes en paralelo —
   en «olas».

Hay varias entradas a una sesión spec: Requirements-First (la clásica),
Design-First (cuando la arquitectura es la cuestión principal) y Quick Spec
(la variante abreviada). Los bugs tienen su propio tipo de spec — la spec de
bugfix con `bugfix.md` y formulaciones tipo «WHEN *condición* THEN the system
SHALL CONTINUE TO *comportamiento existente*»: la regresión descrita como
requisito.

## Artefactos

| Ruta | Qué contiene |
|------|--------------|
| `.kiro/specs/<funcionalidad>/requirements.md` | Requisitos en notación EARS |
| `.kiro/specs/<funcionalidad>/design.md` | Diseño técnico |
| `.kiro/specs/<funcionalidad>/tasks.md` | Plan de implementación |
| `.kiro/steering/` | Archivos de steering del proyecto |
| `~/.kiro/steering/` | Archivos de steering globales |
| `.kiro/hooks/` | Hooks de automatización (JSON) |

El papel de convenciones del proyecto lo cumplen los **archivos de
steering** — reglas que se mezclan en cada sesión. Por defecto hay tres:
`product.md` (qué es el producto), `tech.md` (stack y restricciones),
`structure.md` (estructura del repositorio). El modo de inclusión se define en
el front matter: always (por defecto), fileMatch (por patrón de archivos),
manual (mencionando `#nombre-del-archivo`), auto.

Completan el cuadro los **hooks de agente**: archivos JSON con disparadores
(`PostFileSave`, `PreToolUse`, `SessionStart`, `Stop` y otros) que lanzan
automatizaciones — por ejemplo, actualizar los tests al guardar un archivo.

## En qué se diferencia

- SDD como modo del producto, no disciplina del desarrollador: la interfaz
  impide físicamente saltar de los requisitos al código — la siguiente fase
  solo se abre tras aprobar la anterior.
- Notación EARS en los requisitos: los criterios de aceptación se formulan de
  manera verificable, no en prosa.
- Ejecución de tareas por olas: el grafo de dependencias se construye
  automáticamente y las tareas independientes corren en paralelo.
- Steering y hooks dan contexto persistente y automatización sin herramientas
  externas.

## Cuándo elegirlo

Kiro encaja cuando quieres que sea la propia herramienta la que imponga la
disciplina de la tubería y no estás atado a otro agente — el precio es que
Kiro es un ecosistema cerrado de AWS. Si el agente ya está elegido (Claude
Code, Cursor, Copilot), los agnósticos [Spec Kit](spec-kit.md) y
[OpenSpec](openspec.md) se integran en el proceso existente sin cambiar de
herramientas.
