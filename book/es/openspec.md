---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# OpenSpec

[OpenSpec](https://github.com/Fission-AI/OpenSpec) (Fission-AI) construye el
[desarrollo orientado a especificaciones](spec-driven-development.md) no
alrededor de una funcionalidad sino de un **cambio** con ciclo de vida
propose → review → apply → archive. La idea clave es separar «lo que ya es» de
«lo que está cambiando»: las especificaciones permanentes del sistema se
actualizan con deltas, como las migraciones actualizan el esquema de una base
de datos.

OpenSpec es un toolkit agnóstico respecto al agente: los comandos slash
funcionan en Claude Code, Cursor, GitHub Copilot y una veintena más de
asistentes.

## Instalación

El CLI se distribuye por npm (requiere Node.js ≥ 20.19):

```sh
npm install -g @fission-ai/openspec@latest
openspec init
```

`openspec init` crea el directorio `openspec/` y registra los comandos slash
con el prefijo `/opsx:`; `openspec update` refresca las instrucciones de los
agentes tras una actualización.

## Flujo de trabajo

El conjunto de comandos depende del perfil elegido
(`openspec config profile`). El perfil por defecto son tres comandos a lo
largo del ciclo del cambio:

1. `/opsx:explore` — modo de reflexión antes de cualquier artefacto: el agente
   lee el código y sopesa opciones sin cambiar nada.
2. `/opsx:propose <idea>` — propuesta formal de cambio: se crea el paquete de
   artefactos (ver abajo). La revisión del paquete es el punto de control
   antes de la primera línea de código.
3. `/opsx:apply` — implementación siguiendo el checklist de tareas.

El perfil extendido añade comandos para trabajos largos: `/opsx:new`,
`/opsx:continue`, `/opsx:ff` (fast-forward), `/opsx:verify` (contrastar la
implementación con los artefactos), `/opsx:bulk-archive` y `/opsx:onboard`
(desplegar OpenSpec en un proyecto existente).

Tras el merge el cambio se archiva: sus deltas se funden en las
especificaciones permanentes y el cambio pasa al archivo — la historia de
decisiones queda en el repositorio.

## Artefactos

Todo vive en `openspec/`, en dos zonas:

| Ruta | Qué contiene |
|------|--------------|
| `openspec/specs/` | Especificaciones permanentes — el modelo actual de lo que *ya está construido* |
| `openspec/changes/<cambio>/proposal.md` | Por qué cambiamos esto |
| `openspec/changes/<cambio>/specs/` | Deltas de requisitos con escenarios concretos |
| `openspec/changes/<cambio>/design.md` | Enfoque técnico |
| `openspec/changes/<cambio>/tasks.md` | Checklist de implementación |
| `openspec/changes/archive/` | Cambios completados |

## En qué se diferencia

- La especificación no es un documento de usar y tirar, sino un modelo del
  sistema siempre actual: en cualquier momento se ve qué está obligado a hacer
  el sistema *ahora mismo*.
- Deltas en vez de reescrituras: un cambio describe la diferencia respecto a
  los requisitos actuales, no todo el sistema desde cero.
- Apuesta explícita por el brownfield: los autores describen el proceso como
  «fluid, not rigid; iterative, not waterfall» — la tubería está pensada para
  una base de código viva, no solo para greenfield.
- Trabajo en equipo: las especificaciones pertenecen al equipo, con dashboard
  compartido, coordinación entre repositorios e integración por MCP.

## Cuándo elegirlo

OpenSpec es la mejor opción cuando el trabajo ocurre en un sistema existente y
el valor principal es un modelo de requisitos acumulativo y siempre actual. Si
lo que necesitas es la tubería lineal más simple para funcionalidades nuevas,
[Spec Kit](spec-kit.md) es la elección más canónica.
