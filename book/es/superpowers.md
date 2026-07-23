---
group: sdd
status: draft
related: [spec-driven-development, explore-plan-code-commit]
source_rev: 69d336ebeb0525cf4dd7e9cd7d354ce31dffe499
---

# Superpowers

[Superpowers](https://github.com/obra/superpowers), de Jesse Vincent (obra),
es «una metodología completa de desarrollo de software para tus agentes de
código, construida sobre un conjunto de skills componibles»: una
implementación del
[desarrollo orientado a especificaciones](spec-driven-development.md) como
plugin que trae un pack de skills. De todas las soluciones de esta sección,
Superpowers tiene la disciplina más estricta: sus puntos de control no son una
convención sino un «HARD-GATE» — así los llama literalmente el texto de los
skills. Es uno de los proyectos más populares del ecosistema de skills para
agentes (cientos de miles de estrellas en GitHub).

## Instalación

La vía principal es el marketplace de plugins de Claude Code:

```
/plugin install superpowers@claude-plugins-official
```

El pack hace tiempo que desbordó una sola herramienta: hay manifiestos para
Codex, Cursor, Antigravity, GitHub Copilot CLI, OpenCode y otros. El pack
contiene 14 skills.

## Flujo de trabajo

Superpowers no tiene comandos slash — deliberadamente. Un hook al inicio de la
sesión carga el skill `using-superpowers`, que obliga al agente a comprobar si
hay skills aplicables antes de *cualquier* respuesta: «si hay siquiera un 1 %
de probabilidad de que un skill aplique, es obligatorio invocarlo». Un
«construyamos X» enruta automáticamente a `brainstorming`, un «arregla este
bug» a `systematic-debugging`; hasta la entrada en plan mode se intercepta —
primero el brainstorm.

1. **`brainstorming`** — refinamiento socrático de la idea: preguntas
   estrictamente de una en una (preferiblemente con opciones), dos o tres
   enfoques con sus compromisos, el diseño presentado sección a sección y cada
   sección aprobada por separado. El HARD-GATE: nada de código ni de skills de
   implementación hasta que el diseño entero esté aprobado —
   «independientemente de la simplicidad percibida». Los skills incluso
   nombran el antipatrón: «This Is Too Simple To Need A Design».
2. **`using-git-worktrees`** — el trabajo se aísla en un git worktree aparte,
   en una rama nueva.
3. **`writing-plans`** — el diseño se despliega en un plan de tareas pequeñas;
   cada paso es una sola acción de 2–5 minutos («escribe el test que falla»,
   «comprueba que falla», «implementa lo mínimo», «ejecuta los tests»,
   «commitea»). El plan se escribe para «un ingeniero sin contexto de nuestra
   base de código y de gusto dudoso».
4. **`subagent-driven-development`** o **`executing-plans`** — dos modos de
   ejecución. El primero despacha un subagente fresco por tarea con revisión
   en dos etapas (prompts separados para el implementador y el revisor de la
   tarea); `dispatching-parallel-agents` permite llevar tareas independientes
   en paralelo. Dentro de la implementación, `test-driven-development`
   sostiene el ciclo red–green–refactor.
5. **`requesting-code-review`** — el trabajo terminado se contrasta con el
   plan (el skill pareja `receiving-code-review` cubre cómo recibir la
   revisión).
6. **`finishing-a-development-branch`** — el final: verificación de tests y
   opciones de cierre (merge, PR).

Skills de apoyo: `systematic-debugging` para la depuración y
`verification-before-completion` — la prohibición de declarar el trabajo hecho
sin verificarlo.

## Artefactos

| Artefacto | Dónde vive |
|-----------|------------|
| Documento de diseño | `docs/superpowers/specs/AAAA-MM-DD-<tema>-design.md` |
| Plan de implementación | `docs/superpowers/plans/AAAA-MM-DD-<funcionalidad>.md` |

Ambos son Markdown en el repositorio: el diseño pasa primero la autorrevisión
del agente y después la del usuario; la ubicación de los planes puede
sobreescribirse con las preferencias del usuario.

## En qué se diferencia

- Los puntos de control más estrictos de la sección: el HARD-GATE entre diseño
  y código aplica siempre, sin excepción para las tareas «simples».
- Activación automática: la metodología no hay que recordarla ni invocarla —
  el hook enruta cada tarea al skill adecuado por sí solo.
- Un subagente fresco por tarea: el implementador de cada tarea no arrastra el
  lastre de las anteriores, y su resultado pasa una revisión independiente.
- TDD no es una recomendación sino parte de la tubería: el plan de
  `writing-plans` ya viene escrito en pasos red–green–refactor.

## Cuándo elegirlo

Superpowers encaja cuando quieres que la metodología sea obligatoria: el pack
no dejará ni al agente ni a ti recortar la esquina con un «es que esta tarea
es simple». El precio es un proceso notablemente más ceremonioso; para
retoques rápidos su disciplina es excesiva. Si quieres la misma tubería pero
sobre un gestor de incidencias, con una entrevista en vez de un brainstorm,
mira los [skills de Matt Pocock](matt-pocock-skills.md).
