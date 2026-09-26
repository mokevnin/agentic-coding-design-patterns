---
kind: anti-pattern
status: draft
related: [one-feature-at-a-time, give-agent-a-way-to-verify, tracer-bullet-tickets]
source_rev: d253b2fa683fffdf21e8092f64de4c599f31343f
---

# One-shotting

## También conocido como

One-shotting, «hazlo todo con un solo prompt».

## Contexto

Pides «haz una aplicación» y esperas un resultado terminado tras una sola pasada, sin comprobaciones intermedias. Una demo exitosa puede reforzar esa expectativa.

## Problema

El primer resultado parece completo, aunque el agente todavía no ha verificado los escenarios ni las restricciones. El problema surge cuando ese resultado se acepta como una aplicación terminada.

## Por qué se hace

- Una demo muestra una ejecución exitosa y puede no revelar cuántos intentos fallaron.
- El agente crea rápidamente un escenario principal convincente.
- La planificación y las comprobaciones repetidas parecen innecesarias tras un primer resultado exitoso.
- La ventana de contexto parece infinita hasta que se acaba.

## Consecuencias

- ➖ La ventana puede acabarse en medio de varias partes sin terminar.
- ➖ El error de una decisión temprana se propaga al código posterior.
- ➖ La primera ejecución revela defectos que no se veían al leer.
- ➖ La siguiente sesión pierde tiempo en averiguar en qué estado está el trabajo.

## Señales

- El prompt describe un release grande y no se prevén resultados intermedios.
- El agente no ejecuta los tests ni la aplicación sobre la marcha.
- Varios escenarios quedan «casi funcionando».
- La siguiente sesión empieza con arqueología.

## Cómo hacerlo mejor

Usa una primera pasada rápida para explorar la idea. Para una implementación de producción, prepara [tickets trazadores](tracer-bullet-tickets.md) o una [lista de funcionalidades](feature-list-harness.md), termina [una funcionalidad a la vez](one-feature-at-a-time.md) y verifica cada resultado con un [bucle de retroalimentación](give-agent-a-way-to-verify.md). Así, si la sesión se corta, quedan las partes ya verificadas y una tarea en curso.

## Ejemplo

**Antes**

> Haz un gestor de tareas con equipos, tablero kanban, notificaciones, permisos de acceso y tema oscuro.

**Después**

> Primero preparamos una especificación y los tickets. El primer ticket debe permitir crear una tarea y verla en el tablero. Implementa los cambios necesarios en el esquema, la API y la UI, verifica el escenario en el navegador y luego pasa al siguiente.

## Patrones y antipatrones relacionados

- [Una funcionalidad a la vez](one-feature-at-a-time.md) limita el alcance de una pasada.
- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) permite corregir errores sobre la marcha.
- [Tickets trazadores](tracer-bullet-tickets.md) convierte una tarea grande en partes verificables.
- [Vibe coding](vibe-coding.md) describe aceptar código generado sin entenderlo ni verificarlo.
