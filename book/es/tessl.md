---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# Tessl

[Tessl](https://tessl.io) es la interpretación más radical del
[desarrollo orientado a especificaciones](spec-driven-development.md): la
especificación no es la compañera del código sino su *fuente*. El código es un
artefacto derivado, como un binario producido por la compilación; editarlo a
espaldas de la especificación es como parchear la salida del compilador. La
empresa la fundó Guy Podjarny (fundador de Snyk), con unos 125 millones de
dólares recaudados detrás de esta apuesta.

Tessl es agnóstico respecto al agente: declara funcionar con todos los agentes
de código populares.

## Del framework a la plataforma

Tessl ha evolucionado notablemente, y conviene tenerlo en cuenta al leer sobre
él:

- **El framework y el Spec Registry (2025).** En el framework original los
  archivos de código se marcaban con anotaciones: `@generate` — el código se
  genera desde la especificación y no se edita a mano; `@describe` — la
  especificación documenta código existente. Las capacidades (capabilities) de
  la especificación se enlazaban a tests, y los tests verificaban que el
  código regenerado era conforme. El Spec Registry ofrecía más de 10 000
  especificaciones listas de bibliotecas open source populares para que los
  agentes no alucinaran sus API.
- **La plataforma «context as code» (2026).** Hoy Tessl se posiciona más
  ampliamente — como plataforma de contexto para agentes: registro-gestor de
  paquetes, gobernanza, evals, observabilidad, su propio Tessl Agent. SDD pasó
  a ser uno de los plugins instalables de la plataforma.

## Flujo de trabajo

El plugin de SDD se instala con el CLI:

```sh
tessl init
tessl install tessl-labs/spec-driven-development
```

El proceso después es así:

1. **Recogida de requisitos.** El agente hace preguntas aclaratorias hasta que
   la intención es inequívoca.
2. **Especificaciones.** El agente escribe especificaciones en Markdown en el
   directorio `specs/`; las capacidades se enlazan a tests con marcas
   `[@test]` — cada afirmación de la especificación tiene su comprobación.
3. **Aprobación e implementación.** Tras revisar las especificaciones, el
   agente implementa el código contra ellas — y devuelve a las
   especificaciones todo lo descubierto durante el desarrollo: el documento y
   el código no se separan.

Alrededor están los comandos de la plataforma: `tessl search / install /
list / update` (trabajo con el registro), `tessl review run` (revisiones,
incluidas comprobaciones de seguridad con motor de Snyk), `tessl eval run`
(evals), `tessl skill new / publish` y `tessl plugin new / publish` (skills y
plugins propios).

## En qué se diferencia

- La relación especificación–código está invertida: la especificación no
  describe el código, el código implementa la especificación; en caso de
  conflicto, lo que se corrige es el código.
- Los tests están ligados a las afirmaciones de la especificación: «la
  especificación se cumple» significa literalmente una ejecución en verde de
  sus comprobaciones.
- El registro como gestor de paquetes: especificaciones, skills y plugins se
  distribuyen y versionan como paquetes.
- Maximalismo: los demás frameworks hacen que la especificación vaya
  *primero*; Tessl hace que *mande*.

## Cuándo elegirlo

Tessl es la opción para quien está dispuesto a aceptar entera la apuesta de
«el código es un artefacto derivado»: da la garantía más fuerte de sincronía
entre documento y código, pero exige el mayor cambio de hábitos. Para una
entrada más conservadora en SDD, mejor empezar con [Spec Kit](spec-kit.md) u
[OpenSpec](openspec.md) — ahí la especificación disciplina el proceso, pero el
código sigue siendo código normal.
