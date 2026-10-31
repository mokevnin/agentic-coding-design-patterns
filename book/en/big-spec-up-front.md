---
kind: anti-pattern
status: draft
related: [spec-driven-development, premature-specification, prototype-to-answer, tracer-bullet-tickets, give-agent-a-way-to-verify]
source_rev:
---

# Big Spec Up Front

## Also known as

Big Design Up Front, spec waterfall, exhaustive specification.

## Context

You work with [specs](spec-driven-development.md) and want the agent to get everything right the first time. So before the first line of code, you and the agent write everything down: states, screens, errors, the data model, edge cases. The agent happily generates text, and the documents grow to dozens of pages.

## Problem

Most of the time goes into the spec, and there is still no working version. Meanwhile, a detailed spec doesn't deliver what it was written for. What you actually need becomes clear only when you see the working thing and try to use it. The agent still doesn't follow every instruction, and follows some too literally. Reviewing hundreds of lines of Markdown is harder than reviewing code.

## Why people do it

- A detailed spec gives a feeling of control over the agent.
- SDD toolkits offer a full process for any task, and people go through all of it.
- The agent writes text fast, so one more section seems to cost nothing.
- It seems that the more detailed the description, the more accurate the result.
- There is a fear that without a complete description the agent will go astray.

## Consequences

- ➖ The first feedback from working code arrives in days instead of an hour.
- ➖ After the first demo a large part of the spec gets rewritten, because the requirements only surfaced on the prototype.
- ➖ The spec and the code drift apart, and both have to be maintained.
- ➖ Long documents get skimmed, so reviewing them catches little.
- ➖ The agent skips some instructions or gets carried away by minor ones.
- ➖ Small tasks drown in a process that costs more than the work itself.

## Signs

- The spec is longer than the code it will produce.
- After the first day of work there is no version you can run.
- You read more Markdown than code.
- The spec has "just in case" sections nobody asked for.
- After the first demo half of the spec had to be rewritten.

## A better way

Limit the spec to what the agent can't start without: the goal, constraints, acceptance criteria and what is definitely out of scope. That is usually half a page. Then get a working prototype as soon as possible: a thin end-to-end slice you can run and poke at (see [tracer-bullet tickets](tracer-bullet-tickets.md)). From there, edit it based on what you see, and add to the spec what the prototype revealed. That way the spec becomes an outcome of the work as well as an input.

A quick prototype doesn't mean [vibe coding](vibe-coding.md). You keep the goal, the criteria and a [feedback loop](give-agent-a-way-to-verify.md) that keeps iterations from breaking what is done. Unlike a [throwaway prototype](prototype-to-answer.md), which answers one question and is discarded, this prototype becomes the first version. Birgitta Böckeler, reviewing SDD toolkits, writes that small, iterative steps are the best way to stay in control, and is skeptical of lots of up-front spec design ([article](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)).

## Example

**Before**

> Write a complete spec for the subscriptions module: all states, screens, errors, migrations and edge cases

Three days go into forty pages of spec and their review. At the first demo the product manager asks for cancellation to take effect at the end of the paid period, and for the trial not to require a card. The state model and half of the screens get rewritten.

**After**

> Build a working subscriptions prototype from SPEC.md: sign-up and cancellation end to end

_SPEC.md_ is half a page: the goal, constraints from the payment provider, acceptance criteria and what is out of scope for the first version. An hour later the prototype works. You walk through the scenario yourself, show it to the product manager and make edits from the feedback:

> Cancellation should take effect at the end of the paid period. Add this to SPEC.md

The spec grows together with the prototype and describes what was actually tested.

## Related patterns and anti-patterns

- [Spec-Driven Development](spec-driven-development.md) works better when the spec is short and refined along the way.
- [Premature Specification](premature-specification.md) describes a neighboring mistake: dictating the implementation to the agent instead of the goal.
- [Tracer-Bullet Tickets](tracer-bullet-tickets.md) help get a thin end-to-end slice right away.
- [Throwaway Prototype](prototype-to-answer.md) answers one design question and is discarded.
- [Feedback Loop](give-agent-a-way-to-verify.md) makes fast iterations safe.
- [One-Shotting](one-shotting.md) is the opposite extreme: expecting a finished feature from one prompt without iterations.
