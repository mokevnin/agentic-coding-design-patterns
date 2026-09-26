---
source_rev: 9d4fa9eb519a20d480ec3d62833d521e412bdb0e
---

# How to read this book

## What a pattern is

A pattern is a way to solve a problem that comes up again and again. From a pattern you take the principle and adapt it to the constraints of your project.

For example, the principle of the [Feedback Loop](give-agent-a-way-to-verify.md) is this: give the agent a check it can run on its own. Whether that is a test, a build, or comparing output with a reference is up to you.

## Chapter structure

The main part of the book consists of three kinds of chapters: patterns, anti-patterns, and tool profiles. Pattern chapters follow a common template. Here are its main sections:

- **Intent** — what problem the pattern solves.
- **Problem** — in what situation the problem arises and what constraints it has.
- **Solution** — the principle the pattern rests on.
- **Structure** — a diagram: who the pattern's participants are and how they are connected.
- **When to use** and **Consequences** — under what conditions the pattern fits and what its trade-offs are.
- **Implementation** and **Example** — how to apply the principle in practice.
- **Anti-patterns**, **Known uses**, and **Related patterns** — common mistakes, practice, and neighboring approaches.

An anti-pattern is a tempting but mistaken move. In an anti-pattern chapter you will learn what it leads to and what to do instead.

From the profiles of [OpenSpec](openspec.md), [Superpowers](superpowers.md), and [Matt Pocock's Skills](matt-pocock-skills.md) you will learn how to work with each tool and when to choose it. Commands depend on the tool version, so each profile states when they were checked.

## Groups

In the [table of contents](SUMMARY.md) the patterns are split into groups by area of working with an agent. **Anti-patterns** have a separate section. In the repository all chapters of one language live in one directory, so the book is also convenient to read right on GitHub.

## How to choose a pattern

Find a situation in the table that resembles yours and start with the pattern in the second column.

| Situation | Start with | What you get | Main cost |
| ---------- | --------------- | ---------------- | --------------- |
| A small but non-obvious change | [Four Phases](explore-plan-code-commit.md) | You approve the plan, and only then the agent writes code | One more step before the code: you read the plan |
| The idea still lives only in your head | [Agent-Led Interview](let-claude-interview-you.md) | A specification in a SPEC.md file that a new session understands without the interview | You have to answer the agent's questions |
| A finished plan looks too smooth | [Grilling](grilling.md) | The agent finds gaps in the plan, and you make the decisions about them | It may turn out there is more work than it seemed |
| The feature won't fit in one session | [Spec-Driven Development](spec-driven-development.md) | A specification, a plan, and tasks with verifiable results | The documents must be updated when requirements change |
| You need proof that the code works | [Feedback Loop](give-agent-a-way-to-verify.md) | The agent fixes the code until the check passes and attaches its result | A weak check will let a bug through |
| The work is too large or keeps spreading | [One Feature at a Time](one-feature-at-a-time.md) and [Tracer-Bullet Tickets](tracer-bullet-tickets.md) | Small pieces, each of which the agent verifies as a whole | More small pieces and links between them to keep track of |
| Work must continue in a new session | [Progress Journal](progress-file.md) or [Session Handoff](handoff.md) | The new session starts where the previous one stopped | An outdated document will confuse the new session |
| It's unclear whether an idea will work in practice | [Throwaway Prototype](prototype-to-answer.md) | An answer to a specific design question | The prototype has to be thrown away |

Some patterns solve similar problems, but at different moments of the work. For example, the agent updates the progress journal as the work goes on. Before switching sessions, you ask the agent to prepare a handoff document. The new session can read both documents and learn what has already been done and which step to continue from.

In the [Feature List](feature-list-harness.md) you see the state of the whole body of work. Under the rule of [One Feature at a Time](one-feature-at-a-time.md), the agent finishes and verifies one feature before taking the next. If you don't yet know how to solve the problem, start with an [Investigation Map](wayfinder.md): it helps close the open questions before you build the next task queue.
