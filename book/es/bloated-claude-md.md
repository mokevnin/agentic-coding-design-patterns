---
kind: anti-pattern
status: draft
related: [claude-md-memory, skills-as-packaged-workflows, context-engineering]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# Memoria hinchada

## También conocido como

Bloated CLAUDE.md, el archivo de memoria sobreespecificado, la
memoria-vertedero.

## Contexto

El equipo lleva meses alimentando el archivo de memoria del proyecto: cada
incidente con el agente pare una regla nueva, cada onboarding una sección
nueva. El archivo crece y nunca encoge.

## Problema

El archivo de memoria está sobrecargado: cientos de líneas, duplicados,
contradicciones, recuentos de lo que el agente ve en el código de todos
modos. Una memoria sobrecargada no refuerza el control — lo apaga: las
reglas importantes se ahogan en el ruido, y el agente ignora la mitad de lo
escrito.

## Por qué se hace

- Añadir parece seguro, borrar da miedo: cada regla hizo falta alguna vez,
  y nadie recuerda si se puede tocar.
- La ilusión de control: parece que más reglas hacen un agente más
  obediente. En realidad es al revés: los archivos de memoria hinchados
  hacen que el agente ignore las instrucciones de verdad.
- La memoria se usa de almacén: ahí se vuelcan panoramas de arquitectura,
  listas de dependencias y procedimientos de varios pasos — nada de lo cual
  pertenece ahí.
- El archivo no tiene dueño: todos añaden, nadie poda.

## Consecuencias

- ➖ El agente rompe reglas escritas: la regla existe pero se perdió en el
  ruido — el síntoma más frecuente.
- ➖ Cada línea se paga en tokens en cada sesión de cada desarrollador — la
  memoria hinchada encarece en proporción al equipo.
- ➖ Las reglas contradictorias se resuelven al azar: hoy el agente elige
  una, mañana la otra.
- ➖ La gente también deja de leer el archivo: el colega nuevo abre
  cuatrocientas líneas y las cierra.

## Señales

- El archivo de memoria tiene cientos de líneas y solo crece.
- El agente hace lo que la memoria prohíbe explícitamente.
- En el archivo hay estructura de directorios, lista de dependencias,
  panorama de la arquitectura — lo que el agente ve en el código por sí
  mismo.
- Hay reglas que el agente cumple incluso sin la instrucción.
- Nadie sabe decir para qué sirve la mitad de las líneas.

## Cómo hacerlo mejor

Devolverle a la memoria la disciplina del
[patrón homónimo](claude-md-memory.md): a cada línea, la pregunta «si la
borro, ¿empezará el agente a equivocarse?» — y si no, borrarla. Lo derivable
del código, fuera en bloque. Los procedimientos de varios pasos, a los
[skills](skills-as-packaged-workflows.md): se cargan bajo demanda y no
cuestan nada hasta la invocación. Las reglas que solo necesita una parte de
la base, a archivos modulares ligados a rutas. Las prohibiciones duras, a
los hooks: la mecánica es más fiable que los deseos. Y la poda con
calendario — como la actualización de dependencias.

## Ejemplo

**Antes:**

> Un CLAUDE.md de 420 líneas: un panorama de arquitectura de tres
> pantallas, la lista de todos los paquetes, una guía de estilo copiada de
> la documentación del linter, un procedimiento de release de 30 pasos y la
> regla «no tocar la carpeta legacy» en la línea 287 — que el agente rompió
> ayer.

**Después:**

> Un CLAUDE.md de 60 líneas: los comandos que no están en el Makefile, las
> convenciones que se apartan de los valores por defecto y los límites
> duros. El procedimiento de release es el skill `/release`. Las reglas del
> frontend, en `.claude/rules/` ligadas a rutas. «No tocar legacy» es un
> hook PreToolUse que simplemente rechaza escrituras en la carpeta.

## Patrones y antipatrones relacionados

- [Memoria del proyecto](claude-md-memory.md) — el patrón cuya
  degeneración es la memoria hinchada; ahí vive también la disciplina que
  la cura.
- [Skills](skills-as-packaged-workflows.md) — la válvula de alivio
  principal: los procedimientos salen de la memoria hacia archivos bajo
  demanda.
- [Ingeniería de contexto](context-engineering.md) — explica el mecanismo
  del daño: el presupuesto de atención es finito, y cada línea de más paga
  de él.
- [Especificación prematura](premature-specification.md) — la ilusión de
  control emparentada: allí se sobredetalla la tarea, aquí las reglas.
