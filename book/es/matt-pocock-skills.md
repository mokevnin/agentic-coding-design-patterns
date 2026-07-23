---
group: sdd
status: draft
related: [spec-driven-development, explore-plan-code-commit]
source_rev: 69d336ebeb0525cf4dd7e9cd7d354ce31dffe499
---

# Skills de Matt Pocock

El [pack de skills de Matt Pocock](https://github.com/mattpocock/skills) es
una implementación del
[desarrollo orientado a especificaciones](spec-driven-development.md) como un
conjunto de skills de Claude Code. A diferencia de Spec Kit y OpenSpec, que
apilan los artefactos en un directorio del repositorio, este pack construye la
tubería sobre el **gestor de incidencias**: la especificación se publica como
una issue, las tareas como tickets enlazados, y el trabajo sigue después el
proceso habitual del equipo.

## Instalación y configuración

Dos vías: la editable — `npx skills@latest add mattpocock/skills` (los skills
se copian al repositorio, listos para forkear y editar) — y la gestionada, vía
el marketplace de plugins de Claude Code
(`/plugin install mattpocock-skills@mattpocock`). Después,
`/setup-matt-pocock-skills` se ejecuta una vez por repositorio: el skill de
configuración establece dónde vive el tracker (GitHub por defecto; también se
soporta de serie una variante local con archivos Markdown), el vocabulario de
etiquetas de triaje (`needs-triage`, `ready-for-agent`, `ready-for-human`…) y
la disposición de los documentos de dominio; la configuración aterriza en
`docs/agents/`.

## Flujo de trabajo

El flujo principal «idea → producción» se monta con skills a lo largo de las
fases de SDD:

1. **Una entrevista en vez de un prompt en bruto.** `/grill-me` te entrevista
   *a ti* sin piedad: una pregunta cada vez, con una respuesta recomendada
   para cada una; los hechos los busca el propio skill en la base de código y
   las decisiones se las deja al humano. La variante `/grill-with-docs`
   mantiene por el camino la documentación de dominio vía `domain-modeling`:
   el glosario en `CONTEXT.md` y los ADR se escriben en el momento en que una
   decisión cristaliza.
2. **Especificación.** `/to-spec` sintetiza la conversación ya trabajada en
   una especificación autocontenida (un PRD, en esencia) — sin nueva
   entrevista — y la publica en el tracker con la etiqueta `ready-for-agent`.
   La especificación deliberadamente no contiene rutas de archivos ni
   fragmentos de código — es lo que antes caduca. Un paso aparte es elegir las
   «costuras» de testing: el skill se las presenta al usuario para su visto
   bueno, prefiriendo las costuras existentes a las nuevas.
3. **Tareas.** `/to-tickets` corta la especificación en **tickets bala
   trazadora** — cortes verticales «a través de todas las capas: esquema, API,
   UI, tests», cada uno dimensionado para caber en una ventana de contexto
   fresca y cada uno declarando explícitamente qué tickets lo bloquean. En un
   tracker real las aristas se vuelven enlaces de bloqueo nativos; en la
   variante local, texto en el archivo del ticket. La regla de ejecución es
   «trabaja el frente»: toma cualquier ticket cuyos bloqueadores estén todos
   cerrados. La excepción son los refactors mecánicos amplios: no se cortan en
   rebanadas sino que se secuencian como expand–contract.
4. **Implementación.** `/implement` conduce el trabajo desde la especificación
   o los tickets: dentro, `/tdd` en las costuras preacordadas, typechecking y
   tests con regularidad, la suite completa al final.
5. **Revisión.** `/implement` termina con `/code-review`: dos ejes —
   conformidad con los estándares del repositorio y conformidad con la
   especificación original — comprobados por subagentes paralelos para no
   contaminarse el contexto mutuamente.

Alrededor de la tubería principal hay skills para la escala y los bordes del
proceso:

- `/wayfinder` — cuando el trabajo es más grande que una especificación: la
  idea se despliega en un mapa de tickets de investigación en el tracker, y el
  agente los resuelve de uno en uno hasta que el camino queda claro.
- `/triage` — las issues entrantes pasan por las etiquetas canónicas
  (`needs-triage` → `ready-for-agent` / `ready-for-human`) y acaban como un
  brief listo para el agente.
- `/prototype` — un prototipo desechable que responde a una pregunta de diseño
  que una conversación no puede zanjar.
- `/handoff` — compactar la conversación en un documento de traspaso para la
  siguiente sesión, referenciando los artefactos ya creados en vez de
  duplicarlos.

## Artefactos

| Artefacto | Dónde vive |
|-----------|------------|
| Especificación (PRD) | Una issue del tracker con la etiqueta `ready-for-agent` |
| Tickets con aristas de bloqueo | El tracker (o archivos en `.scratch/<funcionalidad>/issues/`, si el tracker es local) |
| `CONTEXT.md` | Raíz del repositorio: el glosario de dominio |
| ADR | `docs/adr/`: decisiones arquitectónicas |
| Documento de handoff | El directorio temporal del SO — deliberadamente fuera del repo |

## En qué se diferencia

- Una tubería sobre el tracker: la especificación y los tickets viven donde
  viven las tareas de los humanos — el proceso del equipo no se bifurca.
- La entrevista como primera fase: el pack asume que los agujeros de la idea
  salen más baratos *antes* de la especificación, conversando.
- Tickets bala trazadora: el corte no es en «capas» (modelo, API, UI) sino en
  cortes verticales con un grafo de bloqueos explícito — cada ticket lleva la
  funcionalidad a un estado verificable.
- La documentación de dominio como subproducto: el glosario y los ADR se
  escriben durante la entrevista, y el resto de skills están obligados a usar
  ese vocabulario.

## Cuándo elegirlo

El pack de Matt Pocock es la opción para quien ya vive en Claude Code y un
gestor de incidencias y quiere SDD sin una herramienta nueva en el stack: la
tubería se monta con comandos slash y los artefactos aterrizan en issues
familiares. Si quieres un marco rígido con archivos-artefacto fijos en el
repositorio, quedan más cerca [Spec Kit](spec-kit.md) u
[OpenSpec](openspec.md); filosóficamente el vecino más próximo es
[Superpowers](superpowers.md) — otro pack de skills, con puntos de control más
estrictos.
