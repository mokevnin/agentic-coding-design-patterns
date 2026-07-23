---
kind: anti-pattern
status: draft
related: [explore-plan-code-commit]
source_rev: 8c338c7d59e316b9e8010a5e247c763c65c87f52
---

# Premature Specification

## Also known as

«Преждевременная спецификация», "a solution instead of the problem".

## Context

A developer gives an agent a task and, instead of the goal, immediately
describes a concrete implementation: which functions to call, which library to
use, in what order to perform the steps.

## Problem

The agent is handed the technical details of "how to do it", bypassing "what is
needed and why". The task is phrased as a ready-made implementation plan rather
than a problem to be solved.

## Why people do it

- The illusion of control: a detailed instruction feels like it reduces risk.
- A sense of speed: dictating your own plan is easier than explaining the goal.
- Carrying over your own draft of a solution — possibly not the best one.

## Consequences

- ➖ The agent doesn't bring its knowledge to bear on choosing the approach —
  you lose the simpler or more reliable options it could have proposed.
- ➖ A premature, often suboptimal solution gets locked in; later you end up
  debugging your own early assumptions.
- ➖ The solution space narrows: the agent optimizes the specified mechanism,
  not the original goal.
- ➖ It becomes harder to notice that the task itself is framed wrong.

## Signs

- The prompt contains more "how" than "what" and "why".
- Specific functions/libraries/steps are listed without justification.
- Implementation techniques are named before the desired outcome is described.

## A better way

Describe the goal, the context, the constraints, and the definition of done
first — and leave the "how" to the agent. Pin down the implementation only
where it is a genuine constraint (an API contract, an invariant, compatibility),
and mark those places explicitly.

## Example

**Before:**

> Add a 300 ms debounce via `lodash.debounce` in the `onChange` handler of the
> search field.

**After:**

> The search field fires a request on every keystroke and overloads the
> backend. I want the request to go out only once the user has finished typing.
> Propose an approach; the component's external contract must not change.

## Related patterns and anti-patterns

- [Four Phases](explore-plan-code-commit.md) — the pattern
  whose planning phase degrades into premature specification when you demand
  detail before the problem is understood.
