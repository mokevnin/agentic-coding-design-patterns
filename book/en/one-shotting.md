---
kind: anti-pattern
status: draft
related: [one-feature-at-a-time, give-agent-a-way-to-verify, tracer-bullet-tickets]
source_rev: 41f20b64d89358e2498c46bae2c21a0f13ac74f4
---

# One-Shotting

## Also known as

One-shotting, "do it all in one prompt".

## Context

You ask to "build an app" and expect a finished result after a single pass without intermediate checks. A successful demo can reinforce this expectation.

## Problem

The first result looks complete, even though the agent has not yet verified the scenarios and constraints. The problem arises when this result is accepted as a finished application.

## Why people do it

- A demo shows a successful run and may not reveal how many attempts failed.
- The agent quickly produces a convincing main scenario.
- Planning and repeated checks seem unnecessary after a successful first result.
- The context window seems infinite until it runs out.

## Consequences

- ➖ The window can run out in the middle of several unfinished parts.
- ➖ A mistake in an early decision spreads into the code that follows.
- ➖ The first run reveals defects that were invisible on reading.
- ➖ The next session spends time figuring out what state the work is in.

## Signs

- The prompt describes a large release, and no intermediate results are planned.
- The agent does not run the tests or the application along the way.
- Several scenarios remain "almost working".
- The next session starts with archaeology.

## A better way

Use a quick first pass to explore an idea. For a production implementation, prepare [Tracer-Bullet Tickets](tracer-bullet-tickets.md) or a [Feature List](feature-list-harness.md), finish [one feature at a time](one-feature-at-a-time.md), and verify each result with a [Feedback Loop](give-agent-a-way-to-verify.md). Then a broken-off session leaves already verified parts and one current task.

## Example

**Before**

> Build a task tracker with teams, a kanban board, notifications, access permissions, and a dark theme.

**After**

> Break the task tracker into tickets. The first one: create a task and see it on the board

## Related patterns and anti-patterns

- [One Feature at a Time](one-feature-at-a-time.md) limits the scope of a pass.
- [Feedback Loop](give-agent-a-way-to-verify.md) lets you fix mistakes as the work goes on.
- [Tracer-Bullet Tickets](tracer-bullet-tickets.md) turns a large task into verifiable parts.
- [Vibe Coding](vibe-coding.md) describes accepting generated code without understanding or verification.
