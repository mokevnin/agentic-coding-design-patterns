---
kind: anti-pattern
status: draft
related: [one-feature-at-a-time, give-agent-a-way-to-verify, tracer-bullet-tickets]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# One-Shotting

## Also known as

One-shotting, "do it all in one prompt".

## Context

A large task is set with a single prompt: "build the app", "implement the
whole feature" — and a finished result is expected from one pass. Sometimes
it's the developer, inspired by social media demos; sometimes it's an
autonomous agent that wasn't given a frame.

## Problem

A whole feature or a whole application is expected from one pass, with no
intermediate checks and no iterations. One-shotting is demo mode carried
into work mode: an impressive first result mistaken for a normal process.

## Why people do it

- The social media demos: "one-shotted an app in an evening" — only the
  successes survive and get shown.
- The first result really is impressive: an agent genuinely can get far on
  one prompt — on the happy path.
- Building the cycle — a plan, checks, iterations — feels like bureaucracy
  when "you could just ask".
- The context window looks infinite until it runs out.

## Consequences

- ➖ The front is wider than the window: the context dies midway, leaving a
  scattering of half-done pieces — none finished, none verified.
- ➖ A mistake early in the pass drags through the whole result: with no
  checkpoints, nothing was there to catch it.
- ➖ Plausibility instead of workability: the result looks finished exactly
  until the first run.
- ➖ The cleanup costs more than iterations would have: the next session
  first has to figure out what of the generated actually works.

## Signs

- A prompt the size of an epic — and an expectation the size of a release.
- Not a single check in the whole pass: no test, no run, no screenshot.
- The result "almost works": something small is missing everywhere.
- The next session starts with archaeology.

## A better way

Grant one-shotting its genre — demos and reconnaissance ("let's see how far
it gets") — and don't confuse it with a process. The working mode is
assembled from patterns: big work gets sliced — into
[tracer-bullet tickets](tracer-bullet-tickets.md) or a
[feature list](feature-list-harness.md); executed
[one feature per pass](one-feature-at-a-time.md); and every pass is closed
by a [Feedback Loop](give-agent-a-way-to-verify.md). The same volume of
work, the same prompts — but every step lands verified, and a cutoff at any
point costs one step, not everything.

## Example

**Before:**

> Build me a task tracker: teams, a kanban board, notifications, access
> control. Oh, and dark mode.

**After:**

> We expand it into a spec and slice it into tickets. The first tracer: "a
> task can be created and appears on the board" — through the schema, the
> API, and the UI, verified through the browser. One at a time; the next
> one starts after the previous one's green run.

## Related patterns and anti-patterns

- [One Feature at a Time](one-feature-at-a-time.md) — the direct antidote:
  the pass frame against the attempt to do everything at once.
- [Feedback Loop](give-agent-a-way-to-verify.md) — what one-shotting lacks
  by definition: verification inside the process, not hope at the end.
- [Tracer-Bullet Tickets](tracer-bullet-tickets.md) — how a prompt-sized
  epic becomes an executable queue.
- [Vibe Coding](vibe-coding.md) — the paired anti-pattern: one-shotting
  expects everything from one prompt, vibe coding accepts everything that
  came out of it.
