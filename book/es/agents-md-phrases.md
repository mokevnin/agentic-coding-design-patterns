---
source_rev: 8b49e83488f16f3ca7d9690fd31bb9be3ef9720b
---

# Frases para AGENTS.md

Aquí se reúnen reglas para la [memoria del proyecto](agents-md-memory.md) que ayudan al agente a tomar decisiones al elegir una implementación. Adáptalas a tu proyecto y añade solo las que cambien el comportamiento del agente en la dirección que buscas.

Las primeras cinco reglas se basan en una lista de Marcos Hernanz; [Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830) añadió las formulaciones sobre la causa del error y la refactorización. Después aparecen una regla de una skill de Cloudflare y adaptaciones de instrucciones de proyectos de código abierto. Cada sección enlaza a las fuentes primarias.

Elige del bloque las reglas que necesita tu proyecto y llévalas al archivo de memoria. No hace falta copiar la lista entera.

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
- Prefer retrieval over pre-training.
- Keep changes focused on the requested task.
- Make behavior-changing assumptions explicit.
- Report what you verified and what you could not verify.
```

Las reglas están en inglés. Si quieres, tradúcelas al idioma del equipo. Como explica el capítulo [«Memoria del proyecto»](agents-md-memory.md), el archivo _orienta_ el comportamiento del agente, pero no garantiza que se cumplan las reglas. Mantén la lista corta para que no se convierta en [memoria hinchada](bloated-agents-md.md).

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

## Prefer retrieval over pre-training

_Prefiere consultar las fuentes antes que recurrir al conocimiento aprendido por el modelo._

Es la formulación literal de la [skill de Cloudflare Agents SDK](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/agents-sdk/SKILL.md#L8). El agente puede recordar un método del SDK que ya cambió de nombre o un límite del servicio que ha cambiado. La regla lo lleva a abrir la documentación o el código fuente antes de elegir una API o citar límites.

Comprueba la versión que usa el proyecto. La [skill general de Cloudflare](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L157) menciona expresamente las versiones fijadas de los paquetes, los tipos instalados y el esquema de configuración. Si el proyecto usa la versión mayor anterior de una biblioteca, un ejemplo de la documentación más reciente puede no servirle.

Para tu proyecto, indica dónde encontrar la fuente primaria: documentación interna, el repositorio de la dependencia o una referencia oficial. Si la fuente no está disponible, el agente debe comunicar qué no pudo verificar. La regla ayuda al trabajar con API que cambian; no exige buscar en internet la confirmación de cada operación sencilla.

## Keep changes focused on the requested task

_Mantén los cambios dentro del alcance de la tarea._

Es una adaptación de los [principios de trabajo de la skill de Cloudflare](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L161): conservar la arquitectura del proyecto y hacer el cambio mínimo que resuelva la tarea. Al corregir el manejo de un timeout, el agente puede renombrar métodos cercanos y reformatear el módulo. Esas ediciones agrandan el diff y dificultan ver la corrección.

La regla conserva en el diff todo lo necesario para la tarea: implementación, llamadas afectadas, pruebas y documentación. Es compatible con la regla anterior sobre proponer refactorizaciones: el agente explica el valor de una revisión más amplia y tú acuerdas su alcance. Si resolver la tarea exige cambiar un módulo vecino, ese cambio forma parte del trabajo.

## Make behavior-changing assumptions explicit

_Explicita los supuestos que cambian el comportamiento de la solución._

Es una adaptación de una regla del [AGENTS.md de RustFS](https://github.com/rustfs/rustfs/blob/7b010ddd70903028dc5d5d1f00d2356472132403/AGENTS.md#L30), que exige declarar los supuestos que afecten al comportamiento o a la verificación. Si un requisito no define el huso horario del informe, el agente puede elegir UTC sin decirlo. El código y las pruebas serán coherentes entre sí, pero los usuarios recibirán un informe de otro día. La regla exige nombrar esa elección y sus consecuencias para que puedas revisarlas antes de la implementación.

No todas las decisiones requieren una pregunta. El agente primero busca la respuesta en los requisitos y el código del proyecto; si no la encuentra y equivocarse cambiaría sustancialmente el resultado, hace una pregunta concreta. Elegir el nombre de una variable local rara vez necesita discusión; los límites del día de un informe o el comportamiento ante solicitudes repetidas, sí.

## Report what you verified and what you could not verify

_Comunica qué verificaste y qué no pudiste verificar._

Es una adaptación de la prohibición del [AGENTS.md de TransformerLens](https://github.com/TransformerLensOrg/TransformerLens/blob/6bea1fa7cfcbf9064aa8ac99bbd5fb1e4a6c2240/AGENTS.md#L160) de afirmar que las pruebas pasaron sin ejecutarlas. Decir «todo funciona» no aclara si el agente abrió la aplicación o solo leyó el código. La regla exige un informe con los límites de la verificación: por ejemplo, las pruebas de cálculo pasaron, pero no se comprobó el envío de correo mediante el servicio real porque el entorno no tiene acceso a él.

La verificación debe corresponder al cambio. Para una edición de texto suelen bastar los linters y la compilación; cambiar un formulario requiere comprobar el escenario afectado. Si una comprobación falla o no puede ejecutarse, el agente indica la causa y lo que sigue sin verificar. Esto complementa [dar al agente una forma de verificar](give-agent-a-way-to-verify.md): puedes ver las pruebas en las que se basa la conclusión de que el trabajo está listo.

## Capítulos relacionados

- [Memoria del proyecto](agents-md-memory.md) explica dónde guardar estas reglas.
- [Memoria hinchada](bloated-agents-md.md) muestra por qué la lista debe mantenerse corta.
- [Ingeniería de contexto](context-engineering.md) explica cómo las instrucciones permanentes consumen el contexto de cada sesión.
