---
kind: anti-pattern
status: draft
related: [spec-driven-development, premature-specification, prototype-to-answer, tracer-bullet-tickets, give-agent-a-way-to-verify]
source_rev: 2120ac2dd7e347455215b88163b0a90c9c49e739
---

# Especificación por adelantado

## También conocido como

Big spec up front, Big Design Up Front, especificación en cascada, especificación exhaustiva.

## Contexto

Trabajas con [especificaciones](spec-driven-development.md) y quieres que el agente lo haga todo bien a la primera. Así que antes de la primera línea de código, tú y el agente lo escribís todo: estados, pantallas, errores, el modelo de datos, casos límite. El agente genera texto con gusto, y los documentos crecen hasta decenas de páginas.

## Problema

La mayor parte del tiempo se va en la especificación, y sigue sin haber una versión que funcione. Además, una especificación detallada no da aquello para lo que se escribió. Lo que de verdad necesitas solo queda claro cuando ves la cosa funcionando e intentas usarla. El agente igualmente no sigue todas las instrucciones, y algunas las sigue demasiado al pie de la letra. Revisar cientos de líneas de Markdown cuesta más que revisar código.

## Por qué se hace

- Una especificación detallada da sensación de control sobre el agente.
- Se recorre todo el proceso disponible en un toolkit de SDD sin tener en cuenta el tamaño ni la incertidumbre de la tarea.
- El agente escribe texto rápido, así que una sección más parece no costar nada.
- Parece que cuanto más detallada es la descripción, más preciso es el resultado.
- Da miedo que, sin una descripción completa, el agente se desvíe.

## Consecuencias

- ➖ La primera retroalimentación de código que funciona llega en días, no en una hora.
- ➖ Tras la primera demostración se reescribe buena parte de la especificación, porque los requisitos solo aparecieron con el prototipo.
- ➖ La especificación y el código divergen, y hay que mantener ambos.
- ➖ Los documentos largos se leen en diagonal, así que su revisión detecta poco.
- ➖ El agente se salta parte de las instrucciones o se entusiasma con las secundarias.
- ➖ Las tareas pequeñas se ahogan en un proceso que cuesta más que el propio trabajo.

## Señales

- La especificación es más larga que el código que saldrá de ella.
- Tras el primer día de trabajo no hay una versión que se pueda ejecutar.
- Lees más Markdown que código.
- La especificación tiene secciones «por si acaso» que nadie pidió.
- Tras la primera demostración hubo que reescribir la mitad de la especificación.

## Cómo hacerlo mejor

Limita la especificación a aquello sin lo que el agente no puede empezar: el objetivo, las restricciones, los criterios de aceptación y lo que seguro queda fuera. Para un cambio pequeño y reversible suele bastar media página. Si un error tendría un coste alto, acuerda las restricciones y los criterios de aceptación con más detalle. Resuelve la incertidumbre mediante un prototipo funcional temprano: un corte fino de extremo a extremo que se pueda ejecutar y tocar (ver [tickets trazadores](tracer-bullet-tickets.md)). A partir de ahí, corrígelo según lo que veas y añade a la especificación lo que reveló el prototipo. Así la especificación pasa a ser también un resultado del trabajo, no solo una entrada.

Un prototipo rápido no significa [vibe coding](vibe-coding.md). Mantienes el objetivo, los criterios y un [bucle de retroalimentación](give-agent-a-way-to-verify.md) que evita que las iteraciones rompan lo hecho. A diferencia de un [prototipo desechable](prototype-to-answer.md), que responde a una pregunta y se tira, este prototipo se convierte en la primera versión. Birgitta Böckeler, al analizar los toolkits de SDD, escribe que los pasos pequeños e iterativos son la mejor manera de mantener el control, y se muestra escéptica ante mucho diseño de especificación por adelantado ([artículo](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)).

## Ejemplo

**Antes**

> Escribe la especificación completa del módulo de suscripciones: todos los estados, pantallas, errores, migraciones y casos límite

Se van tres días en cuarenta páginas de especificación y su revisión. En la primera demostración, la product manager pide que la cancelación surta efecto al final del periodo pagado y que la prueba gratuita no exija tarjeta. El modelo de estados y la mitad de las pantallas se reescriben.

**Después**

> Haz un prototipo funcional de suscripciones según SPEC.md: alta y cancelación de principio a fin

_SPEC.md_ ocupa media página: el objetivo, las restricciones del proveedor de pagos, los criterios de aceptación y lo que queda fuera de la primera versión. Una hora después el prototipo funciona. Recorres el escenario tú mismo, se lo enseñas a la product manager y haces cambios según sus comentarios:

> La cancelación debe surtir efecto al final del periodo pagado. Añádelo a SPEC.md

La especificación crece junto con el prototipo y describe lo que de verdad se comprobó.

## Patrones y antipatrones relacionados

- [Desarrollo orientado a especificaciones](spec-driven-development.md) conserva los requisitos acordados y los afina según los resultados del trabajo.
- [Especificación prematura](premature-specification.md) describe un error vecino: dictar al agente la implementación en lugar del objetivo.
- [Tickets trazadores](tracer-bullet-tickets.md) ayudan a conseguir enseguida un corte fino de extremo a extremo.
- [Prototipo desechable](prototype-to-answer.md) responde a una pregunta de diseño y se tira.
- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) hace seguras las iteraciones rápidas.
- [One-shotting](one-shotting.md) es el extremo opuesto: esperar una funcionalidad terminada de un solo prompt, sin iteraciones.
