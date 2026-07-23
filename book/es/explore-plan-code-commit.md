---
group: task-setting
status: draft
related: [premature-specification]
source_rev: 85c685dd28a5296866480a22d8bf26a869b8889c
---

# Exploración — plan — código — commit

## Propósito

Dividir el trabajo del agente sobre una tarea no trivial en cuatro fases
explícitas — exploración, planificación, implementación y confirmación del
resultado — para que el agente primero entienda la tarea y acuerde el enfoque
con el desarrollador, y solo después escriba código.

## También conocido como

Explore–Plan–Code–Commit (EPCC), «primero el plan, después el código».

## Problema

Por defecto, el agente empieza a escribir código desde el primer mensaje. Para
un cambio simple está bien, pero en una tarea no trivial aún no ha visto los
archivos relevantes, no conoce las convenciones del proyecto y fácilmente
resuelve el problema equivocado. El desarrollador lo descubre solo al revisar
el diff terminado — en el punto más caro: rehacer el trabajo cuesta más que
toda la conversación anterior.

Intentar asegurarse con un prompt más detallado lleva al extremo opuesto — la
especificación prematura: dictas la implementación en lugar de la tarea. Hace
falta una forma de detectar una dirección equivocada a tiempo, sin quitarle al
agente la elección del enfoque.

## Solución

Guiar al agente explícitamente por cuatro fases secuenciales y prohibirle
escribir código en las dos primeras.

1. **Exploración.** El agente lee el código relevante y reúne contexto. Nada de
   cambios — solo entender la tarea.
2. **Plan.** El agente propone un enfoque: qué cambiar, en qué orden, qué
   riesgos hay. El desarrollador lee el plan y lo aprueba o lo corrige. Es el
   punto de control principal: corregir el rumbo a nivel de plan es mucho más
   barato que a nivel de código.
3. **Código.** El agente implementa el plan aprobado, contrastándolo con el
   plan y con las verificaciones disponibles (tests, build, linter).
4. **Commit.** El resultado se fija: un commit con un mensaje con sentido, un
   pull request y, si hace falta, la actualización de la documentación.

## Estructura

![Estructura del patrón](../assets/explore-plan-code-commit/structure.es.svg)

Las fases van estrictamente en orden, pero el proceso no es unidireccional: si
durante la implementación el plan se aparta de la realidad, lo correcto es
volver a la fase de plan y reacordarlo — no estirar el código para que encaje
en un documento obsoleto. El punto de control entre el plan y el código
pertenece al desarrollador: sin su «sí» explícito el agente no pasa a la
implementación.

## Participantes / Componentes

- **Desarrollador** — plantea la tarea, lee y aprueba el plan, acepta el
  resultado.
- **Agente** — explora la base de código, propone un plan, lo implementa.
- **Plan** — el artefacto intermediario: un documento breve de «qué y cómo». Se
  puede editar, guardar, ejecutar en una sesión nueva o pasar a otro agente.
- **Base de código** — la fuente de contexto en la fase de exploración y el
  objeto de cambio en la fase de código.

## Cuándo aplicarlo

- La tarea no es trivial: toca varios módulos, una parte desconocida del
  sistema o exige elegir entre enfoques.
- Una dirección equivocada sale cara: un diff grande, una migración, un
  contrato público.
- Quieres revisar la dirección, no solo el resultado terminado.

Para cambios de una línea y ediciones mecánicas el patrón es excesivo — las
cuatro fases solo ralentizan el trabajo.

## Consecuencias y compromisos

- ➕ El agente resuelve el problema que realmente tenías en mente: la dirección
  equivocada se detecta en el plan, no en la revisión del diff.
- ➕ Revisar un plan es un orden de magnitud más barato que revisar código —
  tanto para el humano como en tokens.
- ➕ El plan queda como artefacto: se puede refinar, ejecutar en una sesión
  nueva o reutilizar como descripción del pull request.
- ➖ Para tareas simples el ciclo es más lento y caro que un «hazlo» directo.
- ➖ El plan se queda obsoleto durante la implementación — volver a la fase de
  plan exige disciplina; si no, código y plan divergen en silencio.
- ➖ La tentación de convertir el plan en una instrucción paso a paso devuelve
  a la especificación prematura.

## Implementación

1. Empieza por la exploración y prohíbe el código explícitamente: «Lee los
   archivos responsables de X y entiende cómo funciona Y. De momento no
   escribas nada».
2. Pide un plan: «Redacta un plan de solución; no escribas código». Si la
   herramienta tiene un modo de planificación (en Claude Code — plan mode),
   actívalo: la prohibición de editar la garantiza la propia herramienta, no
   solo el prompt.
3. Lee el plan como si revisaras código: haz preguntas, tacha lo innecesario,
   exige alternativas. Itera hasta estar de acuerdo — es la fase más barata
   para discutir.
4. Aprobado el plan, pide la implementación e indica con qué puede verificarse
   el agente: tests, build, linter.
5. Cierra con la fase de commit: mensaje con sentido, pull request con el plan
   en la descripción y actualización de la documentación si los cambios la
   tocaron.

## Ejemplo

Tarea: en la exportación de informes a CSV, la hora aparece desplazada una hora
para algunos usuarios.

**Exploración:**

> Lee el código de exportación de informes y averigua de dónde sale la hora en
> el CSV y dónde puede desplazarse con el cambio de horario de verano. De
> momento no cambies nada.

**Plan:**

> Redacta un plan de corrección. El formato del archivo no se puede cambiar —
> lo leen integraciones externas. No escribas código.

El agente propone dos opciones: convertir la hora al escribir o al leer. El
desarrollador responde:

> Convertir al leer rompe los archivos ya exportados. Toma la primera opción y
> añade al plan un test para el límite del cambio de horario.

**Código:**

> Plan aprobado. Impleméntalo y ejecuta los tests del exportador.

**Commit:**

> Haz commit y abre un pull request; pon en la descripción el plan y la opción
> que elegimos.

La dirección equivocada — corregir en el lado de lectura — se descartó con una
sola réplica en la fase de plan. De haber aparecido en la revisión, habría que
tirar una implementación terminada.

## Antipatrones y errores comunes

- **Saltarse la exploración.** El agente planifica a partir de suposiciones
  sobre la base de código — el plan parece convincente pero no encaja con el
  código real.
- **Aprobar el plan sin leerlo.** El punto de control se vuelve un trámite y el
  patrón solo añade sobrecarga a un simple «hazlo».
- **El plan como instrucción.** Exigir al plan detalle paso a paso antes de
  entender el problema es especificación prematura.
- **Estirar el código hacia un plan obsoleto.** Si la realidad se apartó del
  plan, vuelve a la fase de plan en lugar de forzar el código a coincidir con
  el documento.

## Usos conocidos

- **Claude Code** — plan mode como soporte integrado de la fase de plan; el
  propio flujo aparece el primero en [Claude Code best
  practices](https://code.claude.com/docs/en/best-practices).
- Existen modos análogos de «primero el plan» en otros agentes — por ejemplo,
  plan mode en Cursor y architect mode en aider.
- **GitHub Spec Kit** desarrolla la misma idea hasta una metodología completa
  (Specify → Plan → Tasks → Implement), donde el plan pasa a formar parte de la
  especificación.

## Patrones relacionados

- [Especificación prematura](premature-specification.md) — el antipatrón en el
  que degenera la fase de plan si se exige detalle antes de entender el
  problema.
