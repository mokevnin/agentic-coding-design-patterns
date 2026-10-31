---
kind: anti-pattern
status: draft
related: [agents-md-memory, skills-as-packaged-workflows, context-engineering, scheduled-maintenance]
source_rev: 8b49e83488f16f3ca7d9690fd31bb9be3ef9720b
---

# Memoria hinchada

## También conocido como

Bloated AGENTS.md, archivo de memoria sobreespecificado, memoria vertedero.

## Contexto

Durante meses, el equipo va ampliando el archivo de memoria del proyecto. Después de cada incidente con el agente, los desarrolladores añaden una regla, pero rara vez comprueban si sigue haciendo falta. El archivo crece y nunca se reduce.

## Problema

En el archivo de memoria se acumulan cientos de líneas con duplicados, contradicciones y paráfrasis del código. Al agente le cuesta más distinguir las instrucciones aplicables entre las demás, así que incluso una regla escrita puede pasar desapercibida.

## Por qué se hace

- Cada regla fue necesaria en algún momento, y los desarrolladores temen borrarla sin conocer el motivo original.
- El equipo espera que más instrucciones hagan más predecible el comportamiento del agente y no comprueba el efecto de acumularlas.
- Los desarrolladores meten en la memoria descripciones de la arquitectura y procedimientos largos que estarían mejor en documentos aparte.
- Todo el equipo amplía el archivo, pero nadie se encarga de revisarlo.

## Consecuencias

- ➖ El agente pasa por alto la instrucción necesaria entre muchas otras.
- ➖ Cada línea sobrante gasta tokens en todas las sesiones que cargan el archivo.
- ➖ Cuando las instrucciones se contradicen, el agente puede elegir reglas distintas en sesiones distintas.
- ➖ Los nuevos compañeros tienen que desentrañar un archivo largo para encontrar la convención que buscan.

## Señales

- El archivo tiene cientos de líneas y sigue creciendo.
- El agente hace lo que la memoria prohíbe explícitamente.
- El archivo parafrasea la estructura de directorios y las dependencias que el agente puede leer en el repositorio.
- Hay reglas que el agente cumple incluso sin la instrucción.
- Nadie sabe decir para qué sirve la mitad de las líneas.

## Cómo hacerlo mejor

Revisa la memoria con la regla del [patrón del mismo nombre](agents-md-memory.md). Para cada línea, averigua qué error evita. Si el agente obtiene la misma información del código o cumple la regla sin recordatorio, la línea se puede borrar. Lleva los procedimientos largos a [skills](skills-as-packaged-workflows.md) que se cargan bajo demanda. Después de recortar el archivo, comprueba con tareas reales si se conserva el comportamiento necesario.

## Ejemplo

**Antes:**

> En AGENTS.md se han acumulado 420 líneas. La mayor parte la ocupan un panorama de la arquitectura, la lista de paquetes y reglas del linter copiadas. Entre ellas, en la línea 287, está la prohibición de tocar el código legacy que el agente incumplió ayer.

```mermaid
%% TODO: etiquetas en inglés — sankey-beta (mermaid 12.0.0) no admite caracteres no ASCII
%% en los nombres de nodo. Volver al español cuando se corrija.
sankey-beta

Architecture overview,Deleted,120
Package list,Deleted,60
Linter style guide,Deleted,85
Release procedure,Skill /release,95
Frontend rules,src/frontend/AGENTS.md,30
Legacy ban,Required CI check,5
Commands and conventions,AGENTS.md (stays),25
```

El diagrama elimina 265 líneas que repiten el código y los ajustes del linter. Lleva el procedimiento de release de 95 líneas a un skill, las 30 reglas del frontend a _src/frontend/AGENTS.md_ y la prohibición de legacy de cinco líneas a una comprobación obligatoria de CI. En la raíz quedan 25 líneas de comandos, convenciones y referencias a las instrucciones de cada área.

**Después**

> AGENTS.md queda en 25 líneas. El agente obtiene el procedimiento de release de `/release` y lee _src/frontend/AGENTS.md_ antes de trabajar en el frontend. Una comprobación obligatoria de CI rechaza cambios en legacy.

## Patrones y antipatrones relacionados

- [Memoria del proyecto](agents-md-memory.md) fija las reglas para seleccionar y revisar las instrucciones permanentes.
- [Skills](skills-as-packaged-workflows.md) permiten cargar procedimientos bajo demanda.
- [Ingeniería de contexto](context-engineering.md) explica cómo el texto sobrante impide usar la información necesaria.
- [Especificación prematura](premature-specification.md) describe un intento parecido de ganar control mediante instrucciones excesivas.
- [Mantenimiento programado](scheduled-maintenance.md) impide que la memoria se hinche: una pasada mensual quita duplicados y reglas que no cambian nada.
