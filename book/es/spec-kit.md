---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# GitHub Spec Kit

[Spec Kit](https://github.com/github/spec-kit) es el toolkit open source de
GitHub y la traducción más directa del
[desarrollo orientado a especificaciones](spec-driven-development.md) a una
herramienta: un comando slash por fase de la tubería, un artefacto por
comando. Fue el
[anuncio de Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
el que convirtió la sigla SDD en moneda corriente.

Spec Kit no está atado a un agente concreto: los mismos comandos funcionan en
Claude Code, GitHub Copilot, Cursor, Gemini CLI, Codex CLI y decenas de
integraciones más (la lista completa, con `specify integration list`).

## Instalación

El toolkit se instala con el CLI `specify` (Python):

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init my-project --integration claude
```

`specify init` coloca en el proyecto el directorio `.specify/` — plantillas de
artefactos, memoria del proyecto (`memory/constitution.md`) y extensiones — y
registra los comandos slash en el agente elegido.

## Flujo de trabajo

Las fases van estrictamente en orden; cada comando deja un artefacto que el
desarrollador revisa antes de pasar a la siguiente:

1. `/speckit.constitution` — convenciones del proyecto: principios, stack,
   estándares de calidad. Se escribe una vez y aplica a todas las
   funcionalidades.
2. `/speckit.specify` — la especificación de la funcionalidad: historias de
   usuario y requisitos. Deliberadamente sin decisiones técnicas: el comando
   se niega a discutir el stack — eso es asunto del plan.
3. `/speckit.clarify` (opcional) — el agente encuentra los puntos
   infraespecificados de la especificación, hace preguntas y escribe las
   respuestas en ella misma.
4. `/speckit.plan` — el plan técnico: arquitectura, contratos, modelo de
   datos.
5. `/speckit.tasks` — el plan cortado en tareas con dependencias.
6. `/speckit.analyze` (opcional) — comprobación de consistencia: ¿se
   contradicen la especificación, el plan y las tareas?
7. `/speckit.implement` — ejecución de las tareas según la lista.

Entre los comandos más nuevos: `/speckit.checklist` genera checklists de
calidad, `/speckit.taskstoissues` convierte las tareas en issues de GitHub y
`/speckit.converge` evalúa una base de código existente contra los
artefactos — un puente para el brownfield.

## Artefactos

| Ruta | Qué contiene |
|------|--------------|
| `.specify/memory/constitution.md` | Convenciones del proyecto |
| `.specify/templates/` | Plantillas de artefactos (se pueden sobreescribir) |
| `specs/<número>-<funcionalidad>/spec.md` | Especificación de la funcionalidad |
| `specs/<número>-<funcionalidad>/plan.md` | Plan técnico |
| `specs/<número>-<funcionalidad>/tasks.md` | Lista de tareas |

Todos los artefactos son Markdown normal en el repositorio: se revisan, se
editan y se commitean como código.

## En qué se diferencia

El punto de vista de Spec Kit es «las especificaciones se vuelven
ejecutables»: la fuente de verdad es la intención, no el código. Rasgos
distintivos:

- Separación dura del «qué» y el «cómo»: la especificación no sabe nada del
  stack, el plan no redefine los requisitos.
- Una tubería lineal con punto de control tras cada comando — lo más parecido
  a la descripción canónica del patrón.
- Ecosistema de extensiones: `specify extension add`, `specify preset add`,
  `specify bundle install` — comandos y plantillas se pueden ampliar.
- Agnóstico respecto al agente: un solo proceso para todo el equipo aunque
  cada uno trabaje en una herramienta distinta.

## Cuándo elegirlo

Spec Kit brilla cuando quieres la tubería SDD canónica lista para usar y el
equipo trabaja con agentes distintos. Su punto débil es el brownfield: el
proceso nació para «una funcionalidad desde cero», y aunque
`/speckit.converge` acorta la distancia, trabajar desde cambios sobre un
sistema existente encaja más naturalmente en [OpenSpec](openspec.md).
