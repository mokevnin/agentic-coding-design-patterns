---
kind: anti-pattern
status: draft
related: [give-agent-a-way-to-verify, feature-list-harness, tdd-with-agent]
source_rev: 41f20b64d89358e2498c46bae2c21a0f13ac74f4
---

# Éxito prematuro

## También conocido como

Premature success, el «en mi máquina funciona» de la era de los agentes.

## Contexto

Los tests unitarios pasan, curl devuelve 200, la compilación termina con éxito. El agente declara lista la funcionalidad y coge la siguiente tarea.

## Problema

Sin embargo, nadie ha recorrido el escenario de usuario completo. Las comprobaciones de funciones sueltas y del endpoint pueden pasar por alto un error en el paso de datos entre la interfaz y el servidor.

## Por qué se hace

- Los tests superados parecen prueba suficiente, aunque solo cubren los casos previstos.
- Preparar el entorno y el escenario de extremo a extremo requiere tiempo adicional.
- El agente extiende el éxito de comprobaciones sueltas a toda la funcionalidad.
- El equipo usa el paso de los tests como criterio de finalización sin comprobar que los propios tests estén completos.

## Consecuencias

- ➖ Un usuario o una demo es quien descubre primero el fallo de integración.
- ➖ El estado en la [lista de funcionalidades](feature-list-harness.md) no se corresponde con el comportamiento del producto.
- ➖ Tienes que volver a comprobar a mano los informes del agente.
- ➖ Varios errores de integración pasados por alto complican el diagnóstico posterior.

## Señales

- En el informe no hay resultado de una comprobación de extremo a extremo.
- «Comprobado» significa «los tests unitarios pasaron».
- Nadie ha abierto la aplicación después de la implementación.
- La funcionalidad se muestra por primera vez en la demo.

## Cómo hacerlo mejor

Incluye el escenario de usuario en el [bucle de retroalimentación](give-agent-a-way-to-verify.md). El agente debe recorrerlo a través de la interfaz real y guardar el resultado. En la [lista de funcionalidades](feature-list-harness.md), vincula el estado a esta comprobación. Los tests unitarios y el [TDD](tdd-with-agent.md) siguen protegiendo partes concretas del comportamiento.

## Ejemplo

**Antes:**

> La funcionalidad está lista, los 14 tests pasan.

**Después:**

> Recorre el horario de principio a fin: créalo por la UI, espera el correo con el informe y adjunta capturas

## Patrones y antipatrones relacionados

- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) vincula la finalización con las pruebas de la verificación.
- [Lista de funcionalidades](feature-list-harness.md) guarda los estados de los escenarios verificados.
- [TDD con agente](tdd-with-agent.md) ayuda a comprobar un comportamiento concreto antes de implementarlo.
- [Vibe coding](vibe-coding.md) describe una pérdida de control parecida al aceptar código sin verificar.
