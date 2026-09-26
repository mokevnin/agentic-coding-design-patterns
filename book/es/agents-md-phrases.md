---
source_rev: d253b2fa683fffdf21e8092f64de4c599f31343f
---

# Frases para AGENTS.md

Aquí se reúnen reglas para la [memoria del proyecto](claude-md-memory.md) que ayudan al agente a tomar decisiones al elegir una implementación. Adáptalas a tu proyecto y añade solo las que cambien el comportamiento del agente en la dirección que buscas.

La base es una lista de Marcos Hernanz. Las dos últimas formulaciones las añadió [Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830).

Puedes copiar este bloque en el archivo de memoria del proyecto.

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
```

Las reglas están en inglés. Si quieres, tradúcelas al idioma del equipo. Como explica el capítulo [«Memoria del proyecto»](claude-md-memory.md), el archivo _orienta_ el comportamiento del agente, pero no garantiza que se cumplan las reglas. Mantén la lista corta para que no se convierta en [memoria hinchada](bloated-claude-md.md).

## Do not preserve backward compatibility

_No arrastres la compatibilidad hacia atrás._

Por defecto, el agente puede dejar campos viejos «por si acaso» y añadir capas de compatibilidad alrededor de un cambio. En un módulo interno que controla por completo un solo equipo, esas capas a menudo crean trabajo de más. La regla permite al agente eliminar la interfaz antigua y actualizar sus llamadas en la misma edición.

La regla encaja en aplicaciones y módulos internos si el equipo controla a sus consumidores. En una biblioteca pública o una API externa, la compatibilidad forma parte del contrato con los usuarios, así que allí hay que exigir explícitamente que se conserve.

## Choose the simplest implementation that fully meets the current requirements

_Elige la implementación más simple que cubra por completo los requisitos actuales._

El agente puede prever puntos de extensión para tareas que aún no existen. La regla lo devuelve al principio YAGNI y a los requisitos actuales. Por ejemplo, si hace falta un solo formato de exportación, un sistema universal de plugins añade código que por ahora nada justifica. La palabra _fully_ exige implementar todo el escenario acordado, incluido el manejo de errores.

El mismo problema aparece con la [especificación prematura](premature-specification.md), cuando el equipo elige cómo se construirá la solución antes de haber entendido la tarea.

## Prefer established, well-maintained libraries over custom implementations

_Prefiere bibliotecas maduras y mantenidas antes que implementaciones propias._

El agente puede escribir su propio parser de fechas que pasa un ejemplo sencillo y falla en un cambio de huso horario. En una biblioteca madura esos casos pueden estar ya resueltos y cubiertos por pruebas. La regla empuja a revisar las soluciones existentes y a reducir el volumen de código que el equipo tendrá que mantener por su cuenta.

Antes de elegir una biblioteca, revisa el estado del repositorio, las releases y el soporte de los escenarios que necesitas. Una dependencia abandonada puede exigir más trabajo que una implementación propia.

## Fix the cause, not the symptom

_Encuentra y corrige la causa del error._

Ante un test que falla, el agente puede añadir un `try/catch` tras el cual el síntoma desaparece. Si el error surgió por un `null` inesperado, esa corrección deja en su sitio el origen del valor incorrecto. La regla exige averiguar de dónde vino el `null` y qué contrato se violó.

La regla se puede combinar con la [reflexión](reflection.md). Antes de la edición, el agente explica la causa del fallo y tú compruebas si el cambio propuesto elimina esa causa.

## Suggest best practices, even if they may require refactoring

_Propón buenas prácticas, aunque puedan requerir refactorización._

Un agente que busca el diff mínimo puede repetir un defecto del código vecino. La regla le permite proponer una refactorización y explicar cómo ayudará a resolver la tarea. Una persona valora el beneficio y acuerda el volumen de trabajo.

El agente puede proponer refactorizaciones con demasiada frecuencia. Combina esta regla con la exigencia de elegir la implementación más simple y de establecer primero la causa del problema.

## Capítulos relacionados

- [Memoria del proyecto](claude-md-memory.md) explica dónde guardar estas reglas.
- [Memoria hinchada](bloated-claude-md.md) muestra por qué la lista debe mantenerse corta.
- [Ingeniería de contexto](context-engineering.md) explica cómo las instrucciones permanentes consumen el contexto de cada sesión.
