---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# Kiro

[Kiro](https://kiro.dev) is AWS's answer to
[spec-driven development](spec-driven-development.md): not a toolkit on top of
somebody else's agent but a product with SDD built in as a mode. Kiro exists
in two forms: the IDE (a Code OSS fork launched in mid-2025) and Kiro CLI —
the rebranded Amazon Q Developer CLI. The agent is Kiro's own, running on
Claude-family models; other assistants are not supported.

## Workflow

Alongside ordinary vibe sessions Kiro has **spec sessions**: the interface
itself walks you through three phases, and each requires the developer's
explicit approval — no slash commands, just IDE buttons:

1. **Requirements** → `requirements.md` — user stories with acceptance
   criteria in EARS notation: "WHEN *condition* THEN the system SHALL
   *action*". Wording like this can be checked mechanically. A dedicated
   "Analyze Requirements" button runs a deeper requirements analysis.
2. **Design** → `design.md` — architecture, interfaces, sequence diagrams;
   Kiro generates the design by reading the existing code.
3. **Tasks** → `tasks.md` — an implementation plan with tasks tied to
   requirements. Tasks are checked off one by one, and "Run all Tasks" builds
   a dependency graph and executes independent tasks in parallel — in "waves".

There are several entry points into a spec session: Requirements-First (the
classic), Design-First (when architecture is the main question), and Quick
Spec (the shortened variant). Bugs get their own spec type — a bugfix spec
with `bugfix.md` and wording like "WHEN *condition* THEN the system SHALL
CONTINUE TO *existing behavior*" — a regression described as a requirement.

## Artifacts

| Path | What lives there |
|------|------------------|
| `.kiro/specs/<feature>/requirements.md` | Requirements in EARS notation |
| `.kiro/specs/<feature>/design.md` | Technical design |
| `.kiro/specs/<feature>/tasks.md` | Implementation plan |
| `.kiro/steering/` | Project steering files |
| `~/.kiro/steering/` | Global steering files |
| `.kiro/hooks/` | Automation hooks (JSON) |

The role of project conventions is played by **steering files** — rules mixed
into every session. There are three by default: `product.md` (what the product
is), `tech.md` (stack and constraints), `structure.md` (repository layout).
The inclusion mode is set in front matter: always (default), fileMatch (by
file glob), manual (by mentioning `#file-name`), auto.

**Agent hooks** complete the picture: JSON files with triggers
(`PostFileSave`, `PreToolUse`, `SessionStart`, `Stop`, and others) that run
automations — for example, updating tests after a file is saved.

## What makes it different

- SDD as a product mode, not developer discipline: the interface physically
  keeps you from jumping from requirements into code — the next phase opens
  only after the previous one is approved.
- EARS notation in the requirements: acceptance criteria are worded
  verifiably, not as prose.
- Wave-based task execution: the dependency graph is built automatically and
  independent tasks run in parallel.
- Steering and hooks provide persistent context and automation with no
  external tools.

## When to choose it

Kiro fits when you want the tool itself to enforce the pipeline's discipline
and you are not attached to another agent — the price is that Kiro is a closed
AWS ecosystem. If your agent is already chosen (Claude Code, Cursor, Copilot),
the agent-agnostic [Spec Kit](spec-kit.md) and [OpenSpec](openspec.md) slot
into the existing setup without switching tools.
