# Candidate Patterns

A backlog of pattern ideas for the book. Every pattern starts life here as a
`candidate`. This is the first place to look before writing a new chapter and the
first place to add a new idea.

**Scope reminder:** this book is about *how a developer works with an AI coding
agent* — not about how to build autonomous agent systems. Patterns where the
**developer** does or sets something up belong here; patterns describing what an
agent does *internally* (orchestration, routing, tool-use loops) are mostly out of
scope — see [Out of scope](#out-of-scope--author-decision).

## Workflow

1. **Before writing** — scan the tables below. If the idea already exists, reuse
   its row instead of opening a new one.
2. **New idea** — add a row with status `candidate` and a one-line pitch. No file
   needed yet.
3. **Accepted** — when you start the chapter, set status to `accepted`, assign the
   group, and follow [CONTRIBUTING.md](CONTRIBUTING.md) to create `book/ru/<slug>.md`.
4. **Done** — once the `ru` chapter is written (and, ideally, translated), set
   status to `done`.
5. **Rejected** — if the idea does not earn a chapter, set status to `rejected`
   and record **why** in Note. Keep the row: a documented "no" saves us from
   re-litigating it later.

## Legend

| Status      | Meaning                                             |
|-------------|-----------------------------------------------------|
| `candidate` | On the table, not yet decided                       |
| `accepted`  | Greenlit, chapter in progress                       |
| `done`      | Chapter written (at least in `ru`)                  |
| `rejected`  | Deliberately not doing — reason in Note             |

Groups mirror the headings in `book/ru/SUMMARY.md`:
`task-setting` · `context` · `verification` · `project-org` · `anti-pattern`.

Source labels (`[xx]`) are resolved in [Sources](#sources) at the bottom.

## Task-setting

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| explore-plan-code-commit | candidate | Four-phase workflow — explore, plan (plan mode), implement, commit — so the agent doesn't solve the wrong problem. | [cc-bp] |
| let-claude-interview-you | candidate | Start minimal, let the agent interview you (AskUserQuestion), crystallize a self-contained `SPEC.md`, then execute in a fresh session. | [cc-bp] |
| spec-driven-development | candidate | Treat the spec as the source of truth (intent, not code): Specify → Plan → Tasks → Implement. Absorbs "start high-level, let the agent expand it" [addy]. | [speckit] |

## Context

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| context-engineering | candidate | Curate and maintain the optimal set of tokens for the task — the successor discipline to prompt engineering. | [ctx] |
| claude-md-memory | candidate | A persistent memory file loaded every session; keep it concise (bloat is a separate anti-pattern). Consider merging with `agents-md`. | [cc-mem] |
| agents-md-convention | candidate | Cross-tool `AGENTS.md` convention for repo/agent instructions. Decide: one pattern with `claude-md-memory` or two? | [agentsmd] |
| progress-file | candidate | A dedicated progress log (e.g. `claude-progress.txt`) beside git history so a fresh-context agent can recover state. | [harness] |
| json-spec-file | candidate | Use JSON (not Markdown) for the machine-updated spec/status file; agents edit only the status field, less prone to overwriting. | [harness] |

## Verification

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| give-agent-a-way-to-verify | candidate | Hand the agent a pass/fail check (tests, build, linter, screenshot); it runs, reads, and iterates until it passes. | [cc-bp] |
| tdd-with-agent | candidate | Enforce red-green-refactor with phase-specific prompts, else the agent defaults to implementation-first and writes tests retroactively. | [cc-bp] |
| reflection | candidate | Self-critique loop: generate → evaluate → improve. The `evaluator-optimizer` workflow reframed for the human-driven case. | [ng], [bea] |
| writer-reviewer | candidate | Review the diff in a *fresh* context (separate session/subagent) so the agent isn't biased toward code it just wrote. | [cc-bp] |
| adversarial-review | candidate | A fresh model tries to *refute* the result before it counts as done — grader ≠ author. Possibly one pattern with `writer-reviewer`. | [cc-bp] |

## Project organization

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| feature-list-harness | candidate | A persistent feature list where items start `failing` and flip to `passing` only after verification — the backbone of long-running work. | [harness] |
| one-feature-at-a-time | candidate | Constrain the agent to a single feature per pass; counters its tendency to do too much at once. | [harness] |

## Anti-patterns

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| premature-specification | done | Nailing down details before the problem is understood. Already in the book. | — |
| premature-success | candidate | Declaring the job done on unit tests / curl without end-to-end verification as a real user. Distinct from `premature-specification`. | [harness] |
| bloated-claude-md | candidate | An over-specified memory file — the agent ignores half of it because rules get lost in the noise. Inverse of `claude-md-memory`. | [cc-bp] |
| vibe-coding | candidate | Describe a goal, paste back whatever compiles; fine for throwaways, a trap on real/existing codebases. | [speckit] |
| one-shotting | candidate | Expecting a whole feature from a single prompt instead of an iterative, verified loop. Confirm it has a clean primary source before accepting. | [cc-bp] |

## Out of scope / author decision

Agent-*architecture* patterns surfaced by the research. They describe what an agent
does internally and don't map cleanly to the five groups above. Not pre-accepted —
each needs an explicit author call on whether it fits a book about *working with*
an agent.

| Slug | Note | Src |
|------|------|-----|
| prompt-chaining | Building-effective-agents workflow; agent-architecture, not developer workflow. | [bea] |
| routing | Classify input, dispatch to a specialized path. Agent-architecture. | [bea] |
| parallelization | Sectioning / voting across parallel LLM calls. Agent-architecture. | [bea] |
| orchestrator-workers | A lead model spawns and coordinates sub-agents. Agent-architecture. | [bea] |
| tool-use | Ng's canonical pattern; largely a model capability, not a developer move. | [ng] |
| planning | Ng frames it as agent-side autonomy; overlaps `explore-plan-code-commit` on the human side. | [ng] |
| multi-agent-collaboration | Multiple agents split/debate work. Could seed a "project-org" chapter — author call. | [ng] |
| react | Interleave reasoning traces and actions in one loop — the canonical agentic-cycle. Model-internal. | [react] |
| reflexion | Verbal self-reflection stored in an episodic memory buffer across trials. Agent-internal origin of `reflection`. | [reflexion] |
| tree-of-thoughts | Deliberate reasoning over a tree of thoughts with look-ahead / backtracking. Model-internal. | [tot] |
| manager-pattern | A central agent coordinates specialists via tool calls. Overlaps `orchestrator-workers`. | [openai-guide] |
| decentralized-handoff | Peer agents hand off execution one-way. Agent-architecture. | [openai-guide] |
| structure-vs-autonomy | Design axis: successful agentic software sits between a rigid DAG and full autonomy. Meta-principle, could inform task-setting. | [llamaindex] |

## Sources

- `[bea]` — Anthropic, *Building effective agents* — https://www.anthropic.com/engineering/building-effective-agents
- `[harness]` — Anthropic, *Effective harnesses for long-running agents* — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- `[ctx]` — Anthropic, *Effective context engineering for AI agents* — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- `[cc-bp]` — Anthropic, *Claude Code best practices* — https://code.claude.com/docs/en/best-practices
- `[cc-mem]` — Anthropic, *Claude Code — Memory* — https://code.claude.com/docs/en/memory
- `[ng]` — Andrew Ng, *Four agentic design patterns* — https://x.com/AndrewYNg/status/1773393357022298617
- `[speckit]` — GitHub, *Spec-driven development with AI (Spec Kit)* — https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- `[agentsmd]` — *AGENTS.md convention* — https://agents.md/
- `[addy]` — Addy Osmani, *What makes a good AI spec* — https://addyosmani.com/blog/good-spec/
- `[sdd-survey]` — Piskala, *Spec-driven development survey*, arXiv:2602.00180 — https://arxiv.org/html/2602.00180v1
- `[adp-paper]` — Dao et al., *Agentic Design Patterns: A System-Theoretic Framework*, arXiv:2601.19752 — https://arxiv.org/html/2601.19752v1
