---
source_rev: 9d4fa9eb519a20d480ec3d62833d521e412bdb0e
---

# Cómo leer este libro

## Qué es un patrón

Un patrón es una forma de resolver un problema que aparece una y otra vez. De un patrón tomas el principio y lo adaptas a las restricciones de tu proyecto.

Por ejemplo, el principio del [bucle de retroalimentación](give-agent-a-way-to-verify.md) es este: dale al agente una comprobación que pueda ejecutar por sí mismo. Si será un test, un build o la comparación de la salida con una referencia, lo decides tú.

## Estructura de un capítulo

La parte principal del libro son capítulos de tres tipos: patrones, antipatrones y perfiles de herramientas. Los capítulos de patrones siguen una plantilla común. Estas son sus secciones principales:

- **Propósito** — qué problema resuelve el patrón.
- **Problema** — en qué situación surge el problema y qué restricciones tiene.
- **Solución** — el principio en que se apoya el patrón.
- **Estructura** — un diagrama: qué participantes tiene el patrón y cómo se relacionan.
- **Cuándo aplicarlo** y **Consecuencias** — en qué condiciones encaja el patrón y qué compromisos tiene.
- **Implementación** y **Ejemplo** — cómo aplicar el principio en la práctica.
- **Antipatrones**, **Usos conocidos** y **Patrones relacionados** — errores frecuentes, práctica y enfoques vecinos.

Un antipatrón es una acción tentadora pero errónea. En un capítulo sobre un antipatrón verás a qué conduce y qué hacer en su lugar.

En los perfiles de [OpenSpec](openspec.md), [Superpowers](superpowers.md) y los [skills de Matt Pocock](matt-pocock-skills.md) verás cómo trabajar con cada herramienta y cuándo elegirla. Los comandos dependen de la versión de la herramienta, por eso cada perfil indica cuándo se comprobaron.

## Grupos

En el [contenido](SUMMARY.md) los patrones se dividen en grupos por área del trabajo con el agente. Los **antipatrones** están en una sección aparte. En el repositorio todos los capítulos de un idioma están en un mismo directorio, así que el libro también es cómodo de leer directamente en GitHub.

## Cómo elegir un patrón

Busca en la tabla una situación parecida a la tuya y empieza por el patrón de la segunda columna.

| Situación | Por dónde empezar | Qué obtienes | Coste principal |
| ---------- | --------------- | ---------------- | --------------- |
| Un cambio pequeño pero no evidente | [Cuatro fases](explore-plan-code-commit.md) | Apruebas el plan y solo entonces el agente escribe código | Un paso más antes del código: lees el plan |
| La idea solo está en tu cabeza | [Entrevista del agente](let-claude-interview-you.md) | Una especificación en el archivo SPEC.md que una sesión nueva entiende sin la entrevista | Tendrás que responder a las preguntas del agente |
| Un plan terminado parece demasiado liso | [Grilling](grilling.md) | El agente encuentra huecos en el plan y tú tomas las decisiones sobre ellos | Puede resultar que hay más trabajo del que parecía |
| La funcionalidad no cabe en una sesión | [Desarrollo orientado a especificaciones](spec-driven-development.md) | Especificación, plan y tareas con un resultado verificable | Hay que actualizar los documentos cuando cambian los requisitos |
| Necesitas pruebas de que el código funciona | [Bucle de retroalimentación](give-agent-a-way-to-verify.md) | El agente corrige el código hasta que pasa la comprobación y adjunta su resultado | Una comprobación débil dejará pasar un error |
| El trabajo es demasiado grande o se desborda | [Una funcionalidad a la vez](one-feature-at-a-time.md) y [tickets trazadores](tracer-bullet-tickets.md) | Partes pequeñas, y el agente verifica cada una por completo | Más partes pequeñas y conexiones entre ellas que vigilar |
| El trabajo debe continuar en una sesión nueva | [Diario de progreso](progress-file.md) o [traspaso de sesión](handoff.md) | La sesión nueva empieza donde se detuvo la anterior | Un documento desactualizado confundirá a la sesión nueva |
| No está claro si la idea funcionará en la práctica | [Prototipo desechable](prototype-to-answer.md) | La respuesta a una pregunta de diseño concreta | El prototipo habrá que tirarlo |

Algunos patrones resuelven problemas parecidos, pero en momentos distintos del trabajo. Por ejemplo, el agente actualiza el diario de progreso a medida que avanza. Y antes de cambiar de sesión, le pides al agente que prepare un documento de traspaso. La sesión nueva puede leer ambos documentos y saber qué está hecho y desde qué paso continuar.

En la [lista de funcionalidades](feature-list-harness.md) ves el estado de todo el trabajo. Y según la regla de [una funcionalidad a la vez](one-feature-at-a-time.md), el agente termina y verifica una funcionalidad antes de tomar la siguiente. Si todavía no sabes cómo resolver el problema, empieza por el [mapa de investigación](wayfinder.md): ayuda a cerrar las preguntas antes de que armes la siguiente cola de tareas.
