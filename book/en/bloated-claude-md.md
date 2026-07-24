---
kind: anti-pattern
status: draft
related: [claude-md-memory, skills-as-packaged-workflows, context-engineering]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# Bloated Memory

## Also known as

Bloated CLAUDE.md, the over-specified memory file, the memory dump.

## Context

For months the team keeps adding to the project's memory file: every
incident with the agent births a new rule, every onboarding a new section.
The file grows and never shrinks.

## Problem

The memory file is overloaded: hundreds of lines, duplicates,
contradictions, retellings of what the agent sees in the code anyway. An
overloaded memory doesn't strengthen control — it switches it off: the
important rules drown in the noise, and the agent ignores half of what is
written.

## Why people do it

- Adding feels safe, deleting feels risky: every rule was needed once, and
  nobody remembers whether it can be touched.
- The illusion of control: it seems that more rules make a more obedient
  agent. In reality it's the reverse: bloated memory files cause the agent
  to ignore the actual instructions.
- The memory is used as a warehouse: architecture overviews, dependency
  lists, and multi-step procedures get dumped there — none of which belongs.
- The file has no owner: everyone adds, nobody prunes.

## Consequences

- ➖ The agent breaks written rules: the rule exists but got lost in the
  noise — the most common symptom.
- ➖ Every line is paid for in tokens in every session of every developer —
  bloated memory gets more expensive in proportion to the team.
- ➖ Contradictory rules resolve arbitrarily: today the agent picks one,
  tomorrow the other.
- ➖ People stop reading the file too: a new colleague opens four hundred
  lines and closes them.

## Signs

- The memory file is hundreds of lines long, and it only grows.
- The agent does what the memory explicitly forbids.
- The file contains the directory layout, the dependency list, an
  architecture overview — what the agent sees in the code itself.
- There are rules the agent follows even without the instruction.
- Nobody can say what half the lines are for.

## A better way

Restore the discipline from the [pattern of the same name](claude-md-memory.md):
for every line, ask "if I delete this, will the agent start making
mistakes?" — and if not, delete it. Everything derivable from the code goes
out wholesale. Multi-step procedures go to
[skills](skills-as-packaged-workflows.md): they load on demand and cost
nothing until invoked. Rules needed only by part of the codebase go to
modular path-scoped files. Hard prohibitions go to hooks: mechanics are more
reliable than wishes. And pruning on a schedule — like updating
dependencies.

## Example

**Before:**

> A 420-line CLAUDE.md: a three-screen architecture overview, a list of
> every package, a style guide copied from the linter's documentation, a
> 30-step release procedure, and a "don't touch the legacy folder" rule on
> line 287 — which the agent broke yesterday.

**After:**

> A 60-line CLAUDE.md: the commands that aren't in the Makefile, the
> conventions that diverge from the defaults, and the hard boundaries. The
> release procedure is a `/release` skill. The frontend rules are in
> `.claude/rules/` scoped to paths. "Don't touch legacy" is a PreToolUse
> hook that simply refuses writes to the folder.

## Related patterns and anti-patterns

- [Project Memory](claude-md-memory.md) — the pattern whose degeneration
  bloated memory is; the discipline that cures it lives there too.
- [Skills](skills-as-packaged-workflows.md) — the main relief valve:
  procedures leave the memory for on-demand files.
- [Context Engineering](context-engineering.md) — explains the mechanism of
  the harm: the attention budget is finite, and every extra line pays out
  of it.
- [Premature Specification](premature-specification.md) — the kindred
  illusion of control: there the task gets over-detailed, here the rules
  do.
