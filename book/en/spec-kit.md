---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# GitHub Spec Kit

[Spec Kit](https://github.com/github/spec-kit) is GitHub's open-source toolkit
and the most direct translation of
[spec-driven development](spec-driven-development.md) into a tool: a slash
command per pipeline phase, an artifact per command. It was the
[Spec Kit announcement](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
that made the SDD acronym common currency.

Spec Kit is not tied to a specific agent: the same commands work in Claude
Code, GitHub Copilot, Cursor, Gemini CLI, Codex CLI, and dozens of other
integrations (see the full list with `specify integration list`).

## Installation

The toolkit is installed via the `specify` CLI (Python):

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init my-project --integration claude
```

`specify init` places a `.specify/` directory into the project — artifact
templates, project memory (`memory/constitution.md`), and extensions — and
registers the slash commands with the chosen agent.

## Workflow

The phases run strictly in order; each command leaves an artifact that the
developer reviews before moving to the next one:

1. `/speckit.constitution` — project conventions: principles, stack, quality
   standards. Written once, applies to every feature.
2. `/speckit.specify` — the feature specification: user stories and
   requirements. Deliberately free of technical decisions: the command refuses
   to discuss the stack — that belongs to the plan.
3. `/speckit.clarify` (optional) — the agent finds underspecified spots in the
   specification, asks questions, and writes the answers back into it.
4. `/speckit.plan` — the technical plan: architecture, contracts, data model.
5. `/speckit.tasks` — the plan sliced into tasks with dependencies.
6. `/speckit.analyze` (optional) — a consistency check: do the specification,
   plan, and tasks contradict each other?
7. `/speckit.implement` — executing the tasks down the list.

Among the newer commands: `/speckit.checklist` generates quality checklists,
`/speckit.taskstoissues` turns tasks into GitHub issues, and
`/speckit.converge` assesses an existing codebase against the artifacts — a
bridge for brownfield work.

## Artifacts

| Path | What lives there |
|------|------------------|
| `.specify/memory/constitution.md` | Project conventions |
| `.specify/templates/` | Artifact templates (can be overridden) |
| `specs/<number>-<feature>/spec.md` | Feature specification |
| `specs/<number>-<feature>/plan.md` | Technical plan |
| `specs/<number>-<feature>/tasks.md` | Task list |

All artifacts are plain Markdown in the repository: they are reviewed, edited,
and committed like code.

## What makes it different

Spec Kit's point of view is "specifications become executable": intent, not
code, is the source of truth. Distinctive traits:

- A hard separation of "what" and "how": the specification knows nothing about
  the stack, the plan does not override the requirements.
- A linear pipeline with a checkpoint after every command — the closest match
  to the canonical description of the pattern.
- An extension ecosystem: `specify extension add`, `specify preset add`,
  `specify bundle install` — commands and templates can be grown.
- Agent-agnostic: one process for the whole team, even when people work in
  different tools.

## When to choose it

Spec Kit shines when you want the canonical SDD pipeline out of the box and
the team works across different agents. Its weak spot is brownfield: the
process was designed for "a feature from scratch", and although
`/speckit.converge` narrows the gap, working from changes to an existing
system fits [OpenSpec](openspec.md) more naturally.
