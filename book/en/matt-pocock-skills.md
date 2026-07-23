---
group: sdd
status: draft
related: [spec-driven-development, explore-plan-code-commit]
source_rev: 69d336ebeb0525cf4dd7e9cd7d354ce31dffe499
---

# Matt Pocock's Skills

[Matt Pocock's skill pack](https://github.com/mattpocock/skills) is an
implementation of [spec-driven development](spec-driven-development.md) as a
set of Claude Code skills. Unlike Spec Kit and OpenSpec, which stack artifacts
in a repository directory, this pack builds the pipeline on top of the **issue
tracker**: the specification is published as an issue, tasks as linked
tickets, and the work then follows the team's usual process.

## Installation and setup

Two ways: editable — `npx skills@latest add mattpocock/skills` (the skills are
copied into the repository, ready to fork and edit) — and managed, via the
Claude Code plugin marketplace
(`/plugin install mattpocock-skills@mattpocock`). Then
`/setup-matt-pocock-skills` runs once per repository: the setup skill
establishes where the tracker lives (GitHub by default; a local Markdown-file
variant is also supported out of the box), the triage label vocabulary
(`needs-triage`, `ready-for-agent`, `ready-for-human`…), and the domain-doc
layout; the configuration lands in `docs/agents/`.

## Workflow

The main "idea → ship" flow is assembled from skills along the SDD phases:

1. **An interview instead of a rough prompt.** `/grill-me` relentlessly
   interviews *you*: one question at a time, with a recommended answer for
   each; the skill looks up facts in the codebase itself and leaves the
   decisions to the human. The `/grill-with-docs` variant maintains the domain
   documentation along the way via `domain-modeling`: the glossary in
   `CONTEXT.md` and ADRs are written down the moment a decision crystallizes.
2. **Specification.** `/to-spec` synthesizes the worked-through conversation
   into a self-contained specification (a PRD, essentially) — no new
   interview — and publishes it to the tracker with the `ready-for-agent`
   label. The specification deliberately contains no file paths or code
   snippets — those go stale fastest. A separate step is choosing the testing
   "seams": the skill presents them to the user for sign-off, preferring
   existing seams over new ones.
3. **Tasks.** `/to-tickets` slices the specification into **tracer-bullet
   tickets** — vertical slices "through every layer: schema, API, UI, tests",
   each sized to fit a single fresh context window and each explicitly
   declaring which tickets block it. On a real tracker the edges become native
   blocking links; in the local variant, text in the ticket file. The
   execution rule is "work the frontier": pick any ticket whose blockers are
   all done. The exception is wide mechanical refactors: those are not sliced
   but sequenced as expand–contract.
4. **Implementation.** `/implement` drives the work from the specification or
   tickets: `/tdd` inside, at the pre-agreed seams, regular typechecking and
   test runs, the full suite at the end.
5. **Review.** `/implement` finishes with `/code-review`: two axes —
   conformance to the repository's standards and conformance to the original
   specification — checked by parallel subagents so they don't pollute each
   other's context.

Around the main pipeline sit skills for scale and the edges of the process:

- `/wayfinder` — when the work is bigger than one specification: the idea
  unfolds into a map of investigation tickets on the tracker, and the agent
  resolves them one at a time until the way is clear.
- `/triage` — incoming issues move through the canonical labels
  (`needs-triage` → `ready-for-agent` / `ready-for-human`) and end up as an
  agent-ready brief.
- `/prototype` — a throwaway prototype answering a design question a
  conversation can't settle.
- `/handoff` — compacting the conversation into a handoff document for the
  next session, referencing the already-created artifacts instead of
  duplicating them.

## Artifacts

| Artifact | Where it lives |
|----------|----------------|
| Specification (PRD) | A tracker issue with the `ready-for-agent` label |
| Tickets with blocking edges | The tracker (or files in `.scratch/<feature>/issues/`, if the tracker is local) |
| `CONTEXT.md` | Repository root: the domain glossary |
| ADRs | `docs/adr/`: architectural decisions |
| Handoff document | The OS temp directory — deliberately outside the repo |

## What makes it different

- A pipeline on top of the tracker: the specification and tickets live where
  the humans' tasks live — the team's process doesn't fork in two.
- An interview as the first phase: the pack assumes holes in the idea are
  cheapest to find *before* the specification, in conversation.
- Tracer-bullet tickets: the slicing is not into "layers" (model, API, UI) but
  into vertical slices with an explicit blocking graph — every ticket brings
  the feature to a verifiable state.
- Domain documentation as a by-product: the glossary and ADRs are written
  during the interview, and the other skills are obliged to use that
  vocabulary.

## When to choose it

Matt Pocock's pack is the option for those who already live in Claude Code and
an issue tracker and want SDD without a new tool in the stack: the pipeline is
assembled from slash commands, and the artifacts land in familiar issues. If
you want a rigid frame with fixed artifact files in the repository,
[Spec Kit](spec-kit.md) or [OpenSpec](openspec.md) is closer; philosophically
the nearest neighbor is [Superpowers](superpowers.md) — another skill pack,
with stricter checkpoints.
