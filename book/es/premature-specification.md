---
kind: anti-pattern
status: draft
related: [explore-plan-code-commit]
source_rev: 41f20b64d89358e2498c46bae2c21a0f13ac74f4
---

# Especificación prematura

## También conocido como

Premature Specification, «la solución en lugar del problema».

## Contexto

Indicas de entrada las funciones, la biblioteca y el orden de las llamadas, aunque todavía no has explicado el objetivo de la tarea.

## Problema

El agente recibe un plan ya hecho y empieza a ejecutarlo. Sin una descripción del problema, le cuesta valorar si el mecanismo elegido resuelve la tarea original.

## Por qué se hace

- Una instrucción detallada da la sensación de controlar el resultado.
- Dictar un plan que ya tienes pensado parece más rápido que explicar el objetivo.
- Trasladas a la petición tu primera idea de solución sin compararla con alternativas.

## Consecuencias

- ➖ Al agente le cuesta más proponer un enfoque más sencillo si la implementación ya está prescrita.
- ➖ Se fija una solución prematura, a menudo subóptima; luego acabas depurando tus propias suposiciones tempranas.
- ➖ El agente perfecciona el mecanismo indicado aunque la tarea original requiera otra solución.
- ➖ Cuesta más darse cuenta de que la tarea en sí está mal planteada.

## Señales

- En el prompt hay más «cómo» que «qué» y «para qué».
- Se enumeran funciones/bibliotecas/pasos concretos sin justificación.
- Se nombran técnicas de implementación antes de describir el resultado deseado.

## Cómo hacerlo mejor

Describe primero el objetivo, las restricciones y los criterios de finalización. Pide al agente que proponga un enfoque. Fija una implementación concreta solo donde se derive de un contrato obligatorio o de un requisito de compatibilidad, y explica esa restricción.

## Ejemplo

**Antes:**

> Añade un debounce de 300 ms con `lodash.debounce` en el manejador `onChange` del campo de búsqueda.

**Después:**

> El campo de búsqueda envía una petición con cada carácter y sobrecarga el backend. Hace falta que la petición salga cuando el usuario haya terminado de escribir

## Patrones y antipatrones relacionados

- [Cuatro fases](explore-plan-code-commit.md) permite explorar la tarea antes de elegir la implementación.
