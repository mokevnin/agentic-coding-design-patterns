# Product currency audit — 2026-11-21

## Implementation follow-up

The approved corrections are applied in Russian, English and Spanish. OpenSpec now describes the current skill-based workflow, with diagram labels expressing the stages rather than command syntax. Installation recipes and runtime prerequisites were removed from the tool profiles following the author's clarification; the Node minimum was not copied into the book. Memory descriptions retain the meaningful boundary, local state outside the repository, without replacing one transient Codex directory with another. Claude's default is scoped to local sessions.

Existing chapters now cover the instruction audit, plugin eval comparison, application verification and goal persistence, and parallel work through `/batch`. The pre-commit verification qualification stays with `/verify`; deterministic gates remain in CI. No paid agent runs or external publishing were performed. The original source findings below remain an audit trail, rather than instructions to reproduce setup details in the book.

## Original source findings

This is a focused follow-up to the [October audit](currency-audit-2026-10-31.md) and [October feature review](whats-new-2026-10-31.md). It checks time-sensitive statements in the canonical Russian chapters against current primary sources, especially the agent and toolkit sections. It does not claim a fresh empirical validation of every pattern or every translated sentence. No book content or candidate decisions were changed.

Read-only local checks reported Codex CLI 0.171.0 and Claude Code 2.1.330. The corresponding [Codex release](https://github.com/openai/codex/releases/tag/rust-v0.171.0) and [Claude Code changelog](https://code.claude.com/docs/en/changelog#2-1-330) are current stable references; alpha Codex releases were excluded. A historical check date alone is not an error.

## Corrections

| Priority | Canonical location | Finding and recommended correction | Primary evidence |
| --- | --- | --- | --- |
| P1 | `book/ru/openspec.md:28`, workflow examples and Mermaid labels | The chapter installs `@latest` but describes the removed `/opsx:*` commands. OpenSpec 2.0 removed those commands on November 11. Use the current skills: `/openspec-propose`, `/openspec-apply-change`, `/openspec-archive-change`, with the Codex `$` form where appropriate. Update the entire workflow and diagram together. The underlying specs/change/archive model remains applicable. | [2.0 breaking changes](https://github.com/Fission-AI/OpenSpec/releases/tag/v2.0.0), [2.1.1 examples](https://github.com/Fission-AI/OpenSpec/blob/v2.1.1/README.md#see-it-in-action). |
| P1 | `book/ru/openspec.md:20` | The npm prerequisite is now Node.js ≥22.20.0, rather than ≥22.12.0. The standalone install remains an alternative. Refresh the version/date after verifying the rewritten procedure. | [Versioned package engines](https://github.com/Fission-AI/OpenSpec/blob/v2.1.1/package.json#L58). |
| P2 | `book/ru/private-agent-memory.md:105`, `book/ru/scheduled-maintenance.md:383` | A single universal `~/.codex/memories/` path is stale. Fresh enabled CLI homes use `memories_v2/`; existing `memories/` stores can remain on v1. Desktop migration can involve both directories. Prefer describing generated state under the Codex home and linking the storage section, rather than sending every reader to one directory. Memories remain off by default. | [Current memory storage and controls](https://learn.chatgpt.com/docs/customization/memories#local-memory-storage). |
| P2 | `book/ru/private-agent-memory.md:16` | Scope “Claude Code memory is on by default” to local sessions. Self-hosted sessions generally default to off, with the documented Claude Tag exception. The book's recommendation to move team rules into reviewed repository instructions still stands. | [Auto-memory defaults](https://code.claude.com/docs/en/memory#enable-or-disable-auto-memory). |

The matching passages in EN and ES need the same corrections. OpenSpec's installation scope also deserves attention in that rewrite: 2.0 consolidated skills in `.agents/skills/`; 2.1 introduced global installation and an explicit project scope. In 2.1.1 the skills are bundled with the CLI, so the earlier 2.1.0 Git/GitHub requirement should not be copied into the book. Sources: [2.1 scope change](https://github.com/Fission-AI/OpenSpec/releases/tag/v2.1.0), [2.1.1 offline installation](https://github.com/Fission-AI/OpenSpec/releases/tag/v2.1.1).

## Useful additions, not factual defects

These October recommendations remain useful and are still absent or only generic in the relevant chapters. They improve existing chapters; they do not require new patterns.

| Destination | Addition | Primary evidence |
| --- | --- | --- |
| `scheduled-maintenance`, `bloated-agents-md` | `/doctor prompt-audit` already audits AGENTS.md, stale commands, contradictions and instructions written for older models. It reports proposed edits and waits for a request to apply them. The existing `writing-for-agents` pass remains valid; introduce the native option in the Claude Code block. | [Instruction audit](https://code.claude.com/docs/en/memory#audit-your-instruction-files). |
| `agent-workflow-evals` | `claude plugin eval` provides a concrete implementation: isolated cases, graders, a no-plugin baseline and a threshold for CI. It can test whether packaged guidance contributes anything. Keep model and judge versions controlled and cost bounded; an empty delta is distinct from an absolute passing score. | [Plugin evals](https://code.claude.com/docs/en/plugin-evals). |
| `give-agent-a-way-to-verify`, `quality-gates` | Explain the recorded project `/verify` recipe and its conditional pre-commit instruction. It depends on the skill's location, availability at session start and built-in Git instructions; bundled and plugin skills do not qualify. This is model-followed guidance, so deterministic checks remain necessary. | [Run checks before each commit](https://code.claude.com/docs/en/skills#run-your-checks-before-each-commit). |
| `give-agent-a-way-to-verify`, eventual retry-budget coverage | Name `/goal` as a persistence aid. Its model judges whether to continue; it is not independent evidence that the code works. Keep completion tied to observable checks. | [Goal behavior](https://code.claude.com/docs/en/goal). |
| `isolated-parallel-work` | Add Claude Code `/batch` as a packaged known use of splitting a large change into worktrees. The existing Git-based procedure remains valid. | [Commands across a workflow](https://code.claude.com/docs/en/commands#commands-across-a-typical-workflow). |

## Still current in the inspected areas

Claude Code's native AGENTS.md discovery, `/schedule`, `/code-review` and `/review` alias behavior, `/simplify`, `/skill-doctor` and `/run-skill-generator` remain documented. The four-pass simplification description added on November 7 matches the current [command reference](https://code.claude.com/docs/en/commands). The memory, review and instruction-loading caveats introduced by the October audit should be retained.

Codex's default 32 KiB combined instruction budget, scoped discovery and review rules remain in the [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md). The sandbox/rules distinction and most-restrictive-match rule remain in the [rules guide](https://learn.chatgpt.com/docs/agent-configuration/rules). Security Review plan prerequisites and `@codex security review` remain in the [Security Review guide](https://learn.chatgpt.com/docs/security/security-review).

Superpowers is now 7.0.2, but its short/full design split, builder check, human approval and planning sequence still agree with the book. The new release mostly improves which questions get asked and bootstrap reliability; refresh its snapshot during the next toolkit pass rather than calling the current conceptual description broken. See [7.0.2 release](https://github.com/obra/superpowers/releases/tag/v7.0.2) and [versioned brainstorming skill](https://github.com/obra/superpowers/blob/v7.0.2/skills/brainstorming/SKILL.md).

Matt Pocock's current installation commands still match the book. The current changelog records refinements to review, debugging and setup rather than invalidating the described tracker-based workflow. `implement-spec` has graduated to Engineering, consistent with its inclusion in the chapter. See [upstream README](https://github.com/mattpocock/skills#installation-30-second-setup) and [changelog](https://github.com/mattpocock/skills/blob/main/CHANGELOG.md).

No paid agent execution, schedule, security scan, external review, installation or upstream mutation was performed. Source availability establishes documented behavior, not that every feature is enabled on every account. The October audit's historical-attribution limits remain unresolved.
