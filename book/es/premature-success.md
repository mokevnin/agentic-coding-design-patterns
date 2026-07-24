---
kind: anti-pattern
status: draft
related: [give-agent-a-way-to-verify, feature-list-harness, tdd-with-agent]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# Éxito prematuro

## También conocido como

Premature success, el «en mi máquina funciona» de la era de los agentes.

## Contexto

El agente terminó la funcionalidad: los tests unitarios en verde, curl
devolvió un 200, la compilación pasó. Informa «listo», el desarrollador
asiente y sigue — o la sesión autónoma cambia el estado y toma la siguiente
tarea.

## Problema

El trabajo se declara hecho sin una comprobación de extremo a extremo como
usuario. Las unidades verifican piezas, curl verifica un endpoint — nadie
verificó que la funcionalidad funciona entera: del clic en la interfaz al
resultado en pantalla.

## Por qué se hace

- Los tests verdes parecen una prueba — aunque verifican solo lo que está
  escrito en ellos.
- La comprobación de extremo a extremo es cara: levantar el entorno y
  recorrer el escenario a mano o con automatización del navegador tarda más
  que ejecutar las unidades.
- El agente confía sinceramente en el éxito: no miente, extrapola.
- «Compila y los tests pasan» es el criterio humano habitual — trasladado a
  un ejecutor que escribe tanto el código como los tests.

## Consecuencias

- ➖ La funcionalidad «funciona» hasta el primer usuario: la brecha se
  descubre en producción o en la demo — los puntos más caros.
- ➖ La [lista de funcionalidades](feature-list-harness.md) miente: un
  `passing` respaldado por unidades no sobreviviría un solo clic.
- ➖ Se rompe la confianza en los informes del agente — y con ella todo el
  trabajo autónomo: «listo» deja de significar algo.
- ➖ Las brechas de integración se acumulan: cada funcionalidad «terminada»
  añade la suya, y hay que desenredarlas en bloque.

## Señales

- El informe del agente no lleva evidencia: ni salida del recorrido
  completo, ni captura — solo palabras.
- «Verificado» significa «los tests unitarios pasaron».
- Nadie abrió la aplicación: ni el agente por el navegador, ni un humano a
  mano.
- La demo es el estreno de la funcionalidad.

## Cómo hacerlo mejor

Separar «el código está escrito» de «la funcionalidad funciona» — y cerrar
la brecha con un [bucle de retroalimentación](give-agent-a-way-to-verify.md)
que lleve una comprobación de extremo a extremo: el agente recorre el
escenario como usuario — en la web, por el navegador y con capturas — y
presenta la evidencia. La
[lista de funcionalidades](feature-list-harness.md) trae esta regla de
serie: solo el recorrido completo cambia el estado. Las unidades y el
[TDD](tdd-with-agent.md) se quedan — cazan regresiones de las piezas —, pero
no son el final del trabajo.

## Ejemplo

**Antes:**

> — La funcionalidad está lista: los 14 tests pasan.

**Después:**

> Recorre el escenario como usuario: crea el horario por la UI, espera el
> correo con el informe en el buzón de prueba, adjunta capturas de ambos
> pasos. Listo es cuando pasa el escenario — no cuando las unidades están en
> verde.

## Patrones y antipatrones relacionados

- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) — el
  antídoto: una comprobación con evidencia en vez de un informe de «listo».
- [Lista de funcionalidades](feature-list-harness.md) — institucionaliza la
  regla: el estado lo cambia el recorrido completo, no una sensación.
- [TDD con agente](tdd-with-agent.md) — las unidades hacen falta, pero
  aseguran las piezas, no el final: un ciclo rojo-verde en verde no anula la
  comprobación de extremo a extremo.
- [Vibe coding](vibe-coding.md) — el espíritu afín: allí el código va sin
  leer, aquí el comportamiento va sin comprobar.
