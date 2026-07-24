---
kind: anti-pattern
status: draft
related: [one-feature-at-a-time, give-agent-a-way-to-verify, tracer-bullet-tickets]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# One-shotting

## También conocido como

One-shotting, «hazlo todo en un prompt».

## Contexto

Una tarea grande se plantea con un solo prompt: «haz la aplicación»,
«implementa la funcionalidad entera» — y de una sola pasada se espera el
resultado terminado. A veces es el desarrollador, inspirado por las demos
de las redes; a veces, un agente autónomo al que no le pusieron marco.

## Problema

De una pasada sin comprobaciones intermedias ni iteraciones se espera una
funcionalidad entera o una aplicación entera. El one-shotting es el modo
demo trasladado al modo trabajo: un primer resultado impresionante tomado
por proceso normal.

## Por qué se hace

- Las demos de las redes: «hice una app de un solo golpe en una tarde» —
  solo sobreviven y se enseñan los aciertos.
- El primer resultado impresiona de verdad: un agente puede llegar lejos
  con un prompt — por el camino feliz.
- Montar el ciclo — plan, comprobaciones, iteraciones — parece burocracia
  cuando «se puede simplemente pedir».
- La ventana de contexto parece infinita hasta que se acaba.

## Consecuencias

- ➖ El frente es más ancho que la ventana: el contexto muere a mitad,
  dejando un reguero de piezas a medias — ninguna terminada, ninguna
  verificada.
- ➖ Un error al principio de la pasada se arrastra por todo el resultado:
  sin puntos de control, nada pudo atraparlo.
- ➖ Plausibilidad en vez de funcionamiento: el resultado parece terminado
  exactamente hasta la primera ejecución.
- ➖ La limpieza cuesta más de lo que habrían costado las iteraciones: la
  siguiente sesión primero averigua qué de lo generado funciona.

## Señales

- Un prompt del tamaño de un épico — y una expectativa del tamaño de un
  release.
- En toda la pasada, ni una comprobación: ni test, ni ejecución, ni
  captura.
- El resultado «casi funciona»: en todas partes falta algo pequeño.
- La siguiente sesión empieza con arqueología.

## Cómo hacerlo mejor

Reconocerle al one-shotting su género — las demos y el reconocimiento («a
ver hasta dónde llega») — y no confundirlo con un proceso. El modo de
trabajo se arma con patrones: el trabajo grande se trocea — en
[tickets trazadores](tracer-bullet-tickets.md) o una
[lista de funcionalidades](feature-list-harness.md); se ejecuta a
[una funcionalidad por pasada](one-feature-at-a-time.md); y cada pasada se
cierra con un [bucle de retroalimentación](give-agent-a-way-to-verify.md).
El mismo volumen de trabajo, los mismos prompts — pero cada paso aterriza
verificado, y el corte en cualquier punto cuesta un paso, no todo.

## Ejemplo

**Antes:**

> Hazme un gestor de tareas: equipos, tablero kanban, notificaciones,
> control de acceso. Ah, y modo oscuro.

**Después:**

> Lo desplegamos en una especificación y lo troceamos en tickets. El primer
> trazador: «una tarea se crea y aparece en el tablero» — a través del
> esquema, la API y la UI, verificado por el navegador. De uno en uno; el
> siguiente, tras la pasada en verde del anterior.

## Patrones y antipatrones relacionados

- [Una funcionalidad a la vez](one-feature-at-a-time.md) — el antídoto
  directo: el marco de la pasada contra el intento de hacerlo todo de
  golpe.
- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) — lo que al
  one-shotting le falta por definición: verificación dentro del proceso,
  no esperanza al final.
- [Tickets trazadores](tracer-bullet-tickets.md) — cómo un épico del
  tamaño de un prompt se vuelve una cola ejecutable.
- [Vibe coding](vibe-coding.md) — el antipatrón pareja: el one-shotting
  espera todo de un prompt, el vibe coding acepta todo lo que salió de él.
