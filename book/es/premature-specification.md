---
kind: anti-pattern
status: draft
related: [explore-plan-code-commit]
source_rev: 8c338c7d59e316b9e8010a5e247c763c65c87f52
---

# Especificación prematura

## También conocido como

Premature Specification, «la solución en lugar del problema».

## Contexto

El desarrollador plantea una tarea al agente y, en lugar del objetivo, describe
de inmediato una implementación concreta: qué funciones llamar, qué biblioteca
usar, en qué orden ejecutar los pasos.

## Problema

Al agente se le entregan los detalles técnicos del «cómo hacerlo», saltándose
el «qué hace falta y para qué». La tarea se formula como un plan de
implementación ya hecho, no como un problema por resolver.

## Por qué se hace

- Ilusión de control: parece que una instrucción detallada reduce el riesgo.
- Sensación de velocidad: dictar tu propio plan es más fácil que explicar el
  objetivo.
- Trasladar tu propio borrador de solución — posiblemente no el mejor.

## Consecuencias

- ➖ El agente no aporta su conocimiento a la elección del enfoque — pierdes
  las opciones más simples o más fiables que podría haber propuesto.
- ➖ Se fija una solución prematura, a menudo subóptima; luego acabas depurando
  tus propias suposiciones tempranas.
- ➖ Se estrecha el espacio de soluciones: el agente optimiza el mecanismo
  indicado, no el objetivo original.
- ➖ Es más difícil notar que la tarea en sí está mal planteada.

## Señales

- En el prompt hay más «cómo» que «qué» y «para qué».
- Se enumeran funciones/bibliotecas/pasos concretos sin justificación.
- Se nombran técnicas de implementación antes de describir el resultado
  deseado.

## Cómo hacerlo mejor

Describe primero el objetivo, el contexto, las restricciones y los criterios de
completitud — y deja el «cómo» al agente. Fija la implementación solo donde sea
una restricción real (un contrato de API, un invariante, la compatibilidad), y
marca esos lugares explícitamente.

## Ejemplo

**Antes:**

> Añade un debounce de 300 ms con `lodash.debounce` en el manejador `onChange`
> del campo de búsqueda.

**Después:**

> El campo de búsqueda envía una petición con cada tecla y sobrecarga el
> backend. Quiero que la petición salga solo cuando el usuario haya terminado
> de escribir. Propón un enfoque; el contrato externo del componente no se
> puede cambiar.

## Patrones y antipatrones relacionados

- [Cuatro fases](explore-plan-code-commit.md) — el
  patrón cuya fase de plan degenera en especificación prematura si se exige
  detalle antes de entender el problema.
