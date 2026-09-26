---
source_rev: 959018d2502c29a9c2d8977271bb39cc6e903d87
---

# Glossary

**Agent** carries out tasks using an LLM and tools. In this book it reads and changes code, runs checks, and saves the results of its work.

**Task setting** explains to the agent what needs to be done and why.

**Context** includes the instructions, code, history, and other data available to the agent while it works.

**Specification** describes the system's goal, scenarios, requirements, constraints, and acceptance criteria. The technical approach is described in the plan.

**Plan** explains how to implement the specification, which parts of the system to change, and how to verify the result.

**Context window** limits the amount of data the model can take into account in a single call.

**Skill** saves a recurring procedure as instructions and, when needed, supplements it with scripts, templates, and reference material.

**Subagent** carries out a bounded part of a task in a separate context on behalf of the main agent.

**Oracle** gives grounds for judging whether a result is correct. This role can be played by a test, a reference output, or a verifiable user scenario.

**Testing seam** lets you observe the system's behavior without coupling to internal implementation details.

**Tracer-bullet ticket** describes a small vertical slice of functionality through the necessary system layers with an independently verifiable result.

**Brownfield** means working with an existing system and its accumulated constraints. **Greenfield** means building a new system.

**SDD** stands for Spec-Driven Development. In this approach an agreed specification guides planning and implementation.

**Pattern** describes a recurring problem and a way to solve it.

**Anti-pattern** describes a common mistaken move, its consequences, and a suitable replacement.
