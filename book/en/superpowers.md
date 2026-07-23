---
group: sdd
status: draft
related: [spec-driven-development, explore-plan-code-commit]
source_rev: 69d336ebeb0525cf4dd7e9cd7d354ce31dffe499
---

# Superpowers

[Superpowers](https://github.com/obra/superpowers) by Jesse Vincent (obra) is
"a complete software development methodology for your coding agents, built on
top of a set of composable skills": an implementation of
[spec-driven development](spec-driven-development.md) as a plugin carrying a
skill pack. Of all the solutions in this section, Superpowers has the
strictest discipline: its checkpoints are not a convention but a "HARD-GATE" —
that is literally what the skill text calls them. It is one of the most
popular projects in the agent-skills ecosystem (hundreds of thousands of
GitHub stars).

## Installation

The primary route is the Claude Code plugin marketplace:

```
/plugin install superpowers@claude-plugins-official
```

The pack has long outgrown a single tool: there are manifests for Codex,
Cursor, Antigravity, GitHub Copilot CLI, OpenCode, and others. The pack
contains 14 skills.

## Workflow

Superpowers has no slash commands — deliberately. A session-start hook loads
the `using-superpowers` skill, which obliges the agent to check for applicable
skills before *any* response: "if there is even a 1% chance a skill might
apply, you absolutely must invoke it". "Let's build X" automatically routes
into `brainstorming`, "fix this bug" into `systematic-debugging`; even
entering plan mode is intercepted — brainstorm first.

1. **`brainstorming`** — Socratic refinement of the idea: questions strictly
   one at a time (multiple-choice preferred), two or three approaches with
   trade-offs, the design presented section by section with each section
   approved separately. The HARD-GATE: no code and no implementation skills
   until the whole design is approved — "regardless of perceived simplicity".
   The skills even name the anti-pattern: "This Is Too Simple To Need A
   Design".
2. **`using-git-worktrees`** — the work is isolated in a separate git worktree
   on a new branch.
3. **`writing-plans`** — the design unfolds into a plan of small tasks; every
   step is a single 2–5 minute action ("write the failing test", "make sure
   it fails", "implement the minimum", "run the tests", "commit"). The plan is
   written for "an engineer with zero context for our codebase and
   questionable taste".
4. **`subagent-driven-development`** or **`executing-plans`** — two execution
   modes. The former dispatches a fresh subagent per task with a two-stage
   review (separate prompts for the implementer and the task reviewer);
   `dispatching-parallel-agents` lets independent tasks run in parallel.
   Inside the implementation, `test-driven-development` holds the
   red–green–refactor cycle.
5. **`requesting-code-review`** — the finished work is checked against the
   plan (the paired skill `receiving-code-review` covers taking review
   feedback).
6. **`finishing-a-development-branch`** — the finale: verifying tests and the
   completion options (merge, PR).

Supporting skills: `systematic-debugging` for debugging and
`verification-before-completion` — a ban on declaring work done without
verifying it.

## Artifacts

| Artifact | Where it lives |
|----------|----------------|
| Design document | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| Implementation plan | `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` |

Both are Markdown in the repository: the design first passes the agent's
self-review, then the user's; the plan location can be overridden by user
preferences.

## What makes it different

- The strictest checkpoints of any solution in this section: the HARD-GATE
  between design and code always applies, with no exception for "simple"
  tasks.
- Automatic engagement: the methodology doesn't need to be remembered and
  invoked — the hook routes every task into the right skill by itself.
- A fresh subagent per task: each task's implementer carries no baggage from
  the previous ones, and its result passes an independent review.
- TDD is not a recommendation but part of the pipeline: the `writing-plans`
  plan is already written in red–green–refactor steps.

## When to choose it

Superpowers fits when you want the methodology to be enforced: the pack will
not let the agent — or you — cut the corner with "but this task is simple".
The price is a noticeably more ceremonial process; for quick edits its
discipline is overkill. If you want the same pipeline but on top of an issue
tracker, with an interview instead of a brainstorm, look at
[Matt Pocock's skills](matt-pocock-skills.md).
