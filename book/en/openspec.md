---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# OpenSpec

[OpenSpec](https://github.com/Fission-AI/OpenSpec) (Fission-AI) builds
[spec-driven development](spec-driven-development.md) not around a feature but
around a **change** with a propose → review → apply → archive lifecycle. The
key idea is to separate "what already is" from "what is changing": the
system's standing specifications are updated by deltas, the way migrations
update a database schema.

OpenSpec is an agent-agnostic toolkit: the slash commands work in Claude Code,
Cursor, GitHub Copilot, and two dozen other assistants.

## Installation

The CLI ships via npm (requires Node.js ≥ 20.19):

```sh
npm install -g @fission-ai/openspec@latest
openspec init
```

`openspec init` creates the `openspec/` directory and registers the slash
commands under the `/opsx:` prefix; `openspec update` refreshes the agent
instructions after an upgrade.

## Workflow

The command set depends on the chosen profile (`openspec config profile`).
The default profile is three commands along the change cycle:

1. `/opsx:explore` — thinking mode before any artifacts: the agent reads the
   code and weighs options, changing nothing.
2. `/opsx:propose <idea>` — a formal change proposal: the artifact bundle is
   created (see below). Reviewing the bundle is the checkpoint before the
   first line of code.
3. `/opsx:apply` — implementation following the task checklist.

The extended profile adds commands for long-running work: `/opsx:new`,
`/opsx:continue`, `/opsx:ff` (fast-forward), `/opsx:verify` (checking the
implementation against the artifacts), `/opsx:bulk-archive`, and
`/opsx:onboard` (rolling OpenSpec out on an existing project).

After the merge the change is archived: its deltas fold into the standing
specifications, and the change itself moves to the archive — the history of
decisions stays in the repository.

## Artifacts

Everything lives in `openspec/`, in two zones:

| Path | What lives there |
|------|------------------|
| `openspec/specs/` | Standing specifications — the current model of what is *already built* |
| `openspec/changes/<change>/proposal.md` | Why we are changing this |
| `openspec/changes/<change>/specs/` | Requirement deltas with concrete scenarios |
| `openspec/changes/<change>/design.md` | Technical approach |
| `openspec/changes/<change>/tasks.md` | Implementation checklist |
| `openspec/changes/archive/` | Completed changes |

## What makes it different

- The specification is not a one-off feature document but a continuously
  current model of the system: at any moment you can see what the system is
  obliged to do *right now*.
- Deltas instead of rewrites: a change describes the difference against the
  current requirements, not the whole system from scratch.
- An explicit bet on brownfield: the authors describe the process as "fluid,
  not rigid; iterative, not waterfall" — the pipeline is designed for a living
  codebase, not only greenfield.
- Team workflows: specifications are team-owned, with a shared dashboard,
  cross-repository coordination, and MCP integration.

## When to choose it

OpenSpec is the best fit when the work happens in an existing system and the
main value is an accumulating, always-current model of the requirements. If
what you need is the simplest linear pipeline for new features,
[Spec Kit](spec-kit.md) is the more canonical choice.
