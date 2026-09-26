---
kind: anti-pattern
status: draft
related: [explore-plan-code-commit]
source_rev: d253b2fa683fffdf21e8092f64de4c599f31343f
---

# Premature Specification

## Also known as

Premature Specification, "a solution instead of the problem".

## Context

You go straight to naming the functions, the library, and the call order before you have explained the goal of the task.

## Problem

The agent receives a ready-made plan and starts executing it. Without a description of the problem, it is hard for the agent to judge whether the chosen mechanism solves the original task.

## Why people do it

- A detailed instruction creates a feeling of control over the result.
- Dictating a plan you have already worked out seems faster than explaining the goal.
- You carry your first idea for a solution into the request without comparing alternatives.

## Consequences

- ➖ It is harder for the agent to suggest a simpler approach when the implementation is already prescribed.
- ➖ A premature, often suboptimal solution gets locked in; later you end up debugging your own early assumptions.
- ➖ The agent polishes the specified mechanism even if the original task calls for a different solution.
- ➖ It is harder to notice that the task itself is framed wrong.

## Signs

- The prompt has more "how" than "what" and "why".
- Specific functions/libraries/steps are listed without justification.
- Implementation techniques are named before the desired result is described.

## A better way

First describe the goal, the constraints, and the completion criteria. Ask the agent to propose an approach. Specify a concrete implementation only where it follows from a mandatory contract or a compatibility requirement, and explain that constraint.

## Example

**Before:**

> Add a 300 ms debounce using `lodash.debounce` in the search field's `onChange` handler.

**After:**

> The search field sends a request on every keystroke and overloads the backend. I want the request to go out only when the user has finished typing. Suggest an approach; the component's external contract must not change.

## Related patterns and anti-patterns

- [Four Phases](explore-plan-code-commit.md) lets you explore the task before choosing an implementation.
