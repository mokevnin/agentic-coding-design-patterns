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
| explore-plan-code-commit | accepted | Four-phase workflow — explore, plan (plan mode), implement, commit — so the agent doesn't solve the wrong problem. | [cc-bp] |
| let-claude-interview-you | candidate | Start minimal, let the agent interview you (AskUserQuestion), crystallize a self-contained `SPEC.md`, then execute in a fresh session. | [cc-bp] |
| spec-driven-development | done | Treat the spec as the source of truth (intent, not code): Specify → Plan → Tasks → Implement. Absorbs "start high-level, let the agent expand it" [addy]. Chapter covers Spec Kit, OpenSpec, Kiro, Tessl, BMAD, skill packs (ru+en+es, 2026-07-23). | [speckit] |
| grilling | candidate | The agent relentlessly interviews you about a plan/decision until the holes surface — a stress-test of *your* thinking before work starts. Not `let-claude-interview-you`: that interview *builds* a spec, this one *attacks* a finished plan. | [mp] |
| tracer-bullet-tickets | candidate | Slice a conversation/spec into tracer-bullet tickets with explicit blocking edges — the agent gets executable chunks, not an epic. Plugs into `spec-driven-development` (the Tasks step) with concrete mechanics. | [mp] |

## Context

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| context-engineering | candidate | Curate and maintain the optimal set of tokens for the task — the successor discipline to prompt engineering. | [ctx] |
| claude-md-memory | candidate | A persistent memory file loaded every session; keep it concise (bloat is a separate anti-pattern). Covers the cross-tool `AGENTS.md` convention as a section (merge decided 2026-07-23). | [cc-mem], [agentsmd] |
| agents-md-convention | rejected | Merged into `claude-md-memory` (author decision 2026-07-23): two chapters would retell each other. | [agentsmd] |
| progress-file | candidate | A dedicated progress log (e.g. `claude-progress.txt`) beside git history so a fresh-context agent can recover state. | [harness] |
| json-spec-file | candidate | Use JSON (not Markdown) for the machine-updated spec/status file; agents edit only the status field, less prone to overwriting. | [harness] |
| handoff | candidate | Deliberately compact the session into a handoff document for the next agent — instead of trusting auto-summarization. Neighbor of `progress-file`, but a different moment: progress is a running log, handoff is a session boundary. | [mp] |
| domain-context-file | candidate | A domain glossary + ADRs in the repo (`CONTEXT.md`) as the canonical language the agent reads every session — cures term drift and renaming churn. Separate axis from `claude-md-memory`: that's "how to work", this is "what words mean". | [mp] |

## Verification

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| give-agent-a-way-to-verify | candidate | Hand the agent a pass/fail check (tests, build, linter, screenshot); it runs, reads, and iterates until it passes. | [cc-bp] |
| tdd-with-agent | candidate | Enforce red-green-refactor with phase-specific prompts, else the agent defaults to implementation-first and writes tests retroactively. | [cc-bp] |
| reflection | candidate | Self-critique loop: generate → evaluate → improve. The `evaluator-optimizer` workflow reframed for the human-driven case. | [ng], [bea] |
| writer-reviewer | candidate | Review the diff in a *fresh* context (separate session/subagent) so the agent isn't biased toward code it just wrote. Includes adversarial refutation (grader ≠ author) as a hardened variant (merge decided 2026-07-23). | [cc-bp] |
| adversarial-review | rejected | Merged into `writer-reviewer` (author decision 2026-07-23): difference in degree, not structure. | [cc-bp] |
| prototype-to-answer | candidate | Build a throwaway prototype to answer a design question ("does this state model even fly?") before the real implementation — verify the design, not the code. | [mp] |

## Project organization

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| feature-list-harness | candidate | A persistent feature list where items start `failing` and flip to `passing` only after verification — the backbone of long-running work. | [harness] |
| one-feature-at-a-time | candidate | Constrain the agent to a single feature per pass; counters its tendency to do too much at once. | [harness] |
| wayfinder | candidate | Work bigger than one session is planned as a map of investigation tickets on the tracker; the agent resolves them one at a time until the way is clear. Extends `feature-list-harness` toward *investigation*, not features. | [mp] |
| triage-state-machine | candidate | Incoming issues move through a fixed set of role labels (`needs-triage` → `ready-for-agent` / `ready-for-human`) ending in an agent-ready brief. | [mp] |
| skills-as-packaged-workflows | candidate | Package recurring procedures as skills/slash-commands instead of re-explaining them in every prompt. Meta-pattern over most others in this list. | [mp] |

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
- `[openspec]` — Fission-AI, *OpenSpec* (spec-driven change lifecycle: propose → review → apply → archive) — https://github.com/Fission-AI/OpenSpec
- `[superpowers]` — Jesse Vincent (obra), *Superpowers* (Claude Code skill pack: brainstorm → plan → subagent TDD → review) — https://github.com/obra/superpowers
- `[mp]` — Matt Pocock, *skills* (engineering/productivity skill pack; vendored in this repo under `.agents/skills/`) — https://github.com/mattpocock/skills
- `[addy]` — Addy Osmani, *What makes a good AI spec* — https://addyosmani.com/blog/good-spec/
- `[sdd-survey]` — Piskala, *Spec-driven development survey*, arXiv:2602.00180 — https://arxiv.org/html/2602.00180v1
- `[adp-paper]` — Dao et al., *Agentic Design Patterns: A System-Theoretic Framework*, arXiv:2601.19752 — https://arxiv.org/html/2601.19752v1

### From the source survey (deep-research run, 2026-07)

Places to mine for patterns, found and fact-checked by a deep-research pass on
*"where to source agentic design patterns."* Verification votes are the run's
adversarial 3-vote check (3-0 = unanimous). See the [caveats](#caveats) below.

Pattern catalogs & books (closest prior art to this book's format):

- `[gulli]` — Antonio Gulli, *Agentic Design Patterns: A Hands-On Guide to Building Intelligent Systems* (Springer, 2025) — 21 patterns, one chapter each (overview / use cases / code / takeaways). GoF-style catalog to model our structure on. Code in LangChain, CrewAI, Google ADK. *Verified 3-0.* — https://link.springer.com/book/10.1007/978-3-032-01402-3
- `[batch-ng]` — Andrew Ng, *How agents can improve LLM performance* (DeepLearning.ai, The Batch) — the four canonical patterns (Reflection, Tool Use, Planning, Multi-Agent); fuller citation than the `[ng]` tweet. *Verified 3-0.* — https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/

Vendor engineering guidance (named patterns with intent/structure):

- `[openai-guide]` — OpenAI, *A Practical Guide to Building Agents* (PDF) — single/multi-agent taxonomy + Manager and Decentralized patterns. *Verified 3-0.* — https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
- `[google-agents]` — Google, *Introduction to Agents* whitepaper (Nov 2025; co-author Gulli) — Coordinator, Sequential, Iterative Refinement, Human-in-the-Loop. *Fetched, claims not verified in this run.* — https://vanducng.dev/2026/01/10/Google-Introduction-to-Agents-Whitepaper-Summary/
- `[llamaindex]` — LlamaIndex, *Bending Without Breaking* (Laurie Voss, 2025) — the structure-vs-autonomy design axis. *Verified 3-0 but single vendor blog → medium confidence; a separate claim from this post was refuted 0-3.* — https://www.llamaindex.ai/blog/bending-without-breaking-optimal-design-patterns-for-effective-agents

Academic surveys & primary papers (rich catalogs of named patterns):

- `[survey-arch]` — Masterman et al., *The Landscape of Emerging AI Agent Architectures*, arXiv:2404.11584 — ReAct, RAISE, Reflexion, AutoGPT+P, LATS; Vertical vs Horizontal multi-agent. *Verified 3-0 (planning-categories sub-claim 2-1; that taxonomy traces to arXiv:2402.02716, Huang et al.).* — https://arxiv.org/html/2404.11584v1
- `[csiro-tax]` — Zhou/Lu et al. (CSIRO Data61), *taxonomy of foundation-model agent architectures*, arXiv:2408.02920 — 12 taxonomy branches; reflection & coordination sub-patterns. Already structured as a design-option catalog. *Verified 3-0.* — https://arxiv.org/pdf/2408.02920
- `[react]` — Yao et al., *ReAct*, arXiv:2210.03629 (ICLR 2023). *Verified 3-0.* — https://arxiv.org/abs/2210.03629
- `[reflexion]` — Shinn et al., *Reflexion*, arXiv:2303.11366 (NeurIPS 2023). *Verified 3-0.* — https://arxiv.org/abs/2303.11366
- `[tot]` — Yao et al., *Tree of Thoughts*, arXiv:2305.10601 (NeurIPS 2023). *Verified 3-0.* — https://arxiv.org/abs/2305.10601
- `[toolformer]` — Schick et al., *Toolformer*, arXiv:2302.04761 (Meta AI) — historical origin of Tool Use. *Verified 3-0.* — https://arxiv.org/abs/2302.04761

Framework docs & reference code (runnable pattern implementations):

- `[spring-ai]` — Spring AI, *Effective agents* — the five Anthropic patterns with runnable Java. *Verified 3-0.* — https://docs.spring.io/spring-ai/reference/api/effective-agents.html
- `[langgraph]` — LangGraph, *Multi-Agent Systems* — Supervisor and Swarm as first-class abstractions. *Fetched, claims not verified in this run.* — https://langchain-ai.github.io/langgraph/concepts/multi_agent/
- `[autogen]` — Microsoft AutoGen, *Design Patterns* docs + the DeepLearning.ai course *AI Agentic Design Patterns with AutoGen*. *Fetched, claims not verified in this run.* — https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/index.html
- `[crewai]` — CrewAI docs. *Fetched, claims not verified in this run.* — https://docs.crewai.com/

Practitioner communities & open-source repos:

- `[willison]` — Simon Willison, *Agentic Engineering Patterns* — a living guide explicitly modeled on the GoF format. *Fetched, claims not verified in this run.* — https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/
- `[awesome-agentic]` — nibzard, *awesome-agentic-patterns* (curated pattern index). *Fetched, claims not verified in this run.* — https://github.com/nibzard/awesome-agentic-patterns
- `[cookbook]` — Anthropic, *anthropic-cookbook / patterns / agents* (reference implementations). *Fetched, claims not verified in this run.* — https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents

#### Caveats

- **Scope gap:** most verified evidence is about *general* agentic design (building
  agents), not *agentic coding* specifically (working with a coding agent). Filter
  hard against this book's scope before promoting any row out of *Out of scope*.
- **Coverage gap:** courses, communities, and repos were under-verified — the
  entries above marked *not verified in this run* are leads, not fact-checked
  claims. Confirm each before citing.
- **Refuted (do not use):** the claim that LlamaIndex's *Bending Without Breaking*
  attributes chains/branches/loops/fan-outs to Anthropic, implemented via LlamaIndex
  Workflows, was refuted 0-3.
- **Time sensitivity:** sources span Dec 2024 – Oct 2025; conceptual taxonomies are
  stable, specific frameworks/SDKs drift.
