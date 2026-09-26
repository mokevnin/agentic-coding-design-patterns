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
`task-setting` · `sdd` · `context` · `verification` · `project-org` · `anti-pattern`.

Source labels (`[xx]`) are resolved in [Sources](#sources) at the bottom.

## Task-setting

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| explore-plan-code-commit | done | Four-phase workflow — explore, plan (plan mode), implement, commit — so the agent doesn't solve the wrong problem. | [cc-bp] |
| let-claude-interview-you | done | Start minimal, let the agent interview you (AskUserQuestion), crystallize a self-contained `SPEC.md`, then execute in a fresh session. | [cc-bp] |
| grilling | done | The agent relentlessly interviews you about a plan/decision until the holes surface — a stress-test of *your* thinking before work starts. Not `let-claude-interview-you`: that interview *builds* a spec, this one *attacks* a finished plan. | [mp] |
| design-it-twice | done | Compare structurally different designs against shared requirements and caller scenarios before implementation. RU, EN and ES chapters complete. Complements grilling (challenge a plan) and prototype-to-answer (resolve a question experimentally). | [ousterhout], [mp] |
| tracer-bullet-tickets | done | Slice a conversation/spec into tracer-bullet tickets with explicit blocking edges — the agent gets executable chunks, not an epic. Plugs into `spec-driven-development` (the Tasks step) with concrete mechanics. | [mp] |
| visual-specification | candidate | Give the agent a focused UI reference plus behavior and technology constraints, then compare screenshots of the implementation and annotate discrepancies. Unlike a prose spec, the reference communicates visual intent; it does not establish responsive behavior, accessibility, or backend semantics by itself. | [duvall-patterns] |

## Spec-driven development

Own section in the book (decided 2026-07-23): an overview chapter plus one
article per framework.

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| spec-driven-development | done | Overview: treat the spec as the source of truth (intent, not code): Specify → Plan → Tasks → Implement. Absorbs "start high-level, let the agent expand it" [addy]. | [speckit] |
| spec-kit | rejected | Chapter removed 2026-07-24 — section trimmed to OpenSpec/Superpowers/Matt Pocock; tool still linked from `resources.md` and named in the overview. | [speckit] |
| openspec | done | Change lifecycle propose → review → apply → archive; standing specs updated by deltas, brownfield-first. | [openspec] |
| kiro | rejected | Chapter removed 2026-07-24 — section trimmed to OpenSpec/Superpowers/Matt Pocock; tool still linked from `resources.md` and named in the overview. | [kiro] |
| tessl | rejected | Chapter removed 2026-07-24 — section trimmed to OpenSpec/Superpowers/Matt Pocock; tool still linked from `resources.md` and named in the overview. | [tessl] |
| superpowers | done | SDD as a Claude Code skill pack: brainstorm → plan → subagent TDD implementation with mandatory checkpoints. | [superpowers] |
| matt-pocock-skills | done | SDD on top of the issue tracker: grill interview → spec → tracer-bullet tickets → implement with TDD and two-axis review. | [mp] |

## Context

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| context-engineering | done | Curate and maintain the optimal set of tokens for the task — the successor discipline to prompt engineering. | [ctx] |
| claude-md-memory | done | A persistent memory file loaded every session; keep it concise (bloat is a separate anti-pattern). Covers the cross-tool `AGENTS.md` convention as a section (merge decided 2026-07-23). | [cc-mem], [agentsmd] |
| agents-md-convention | rejected | Merged into `claude-md-memory` (author decision 2026-07-23): two chapters would retell each other. | [agentsmd] |
| progress-file | done | A dedicated progress log (e.g. `claude-progress.txt`) beside git history so a fresh-context agent can recover state. | [harness] |
| json-spec-file | rejected | Merged into `feature-list-harness` (author decision 2026-07-23): a format choice, not a standalone pattern — becomes a section on the status-file format there. | [harness] |
| handoff | done | Deliberately compact the session into a handoff document for the next agent — instead of trusting auto-summarization. Neighbor of `progress-file`, but a different moment: progress is a running log, handoff is a session boundary. | [mp] |
| domain-context-file | done | A domain glossary + ADRs in the repo (`CONTEXT.md`) as the canonical language the agent reads every session — cures term drift and renaming churn. Separate axis from `claude-md-memory`: that's "how to work", this is "what words mean". | [mp] |
| executable-guardrails | done | Move enforceable constraints out of prose and into hooks, sandbox boundaries, permissions, and deterministic checks, so the agent can work autonomously inside explicit limits. | [gh-hooks], [cc-sandbox] |
| working-example-library | candidate | Keep a searchable collection of working examples and give the agent selected exemplars to adapt or combine, with their assumptions and verification commands. Unlike `skills-as-packaged-workflows`, the reusable unit is demonstrated code rather than a procedure; unlike `prototype-to-answer`, the question has already been answered. | [sw-hoard], [ap-library] |
| context-forking | done | Branch from a researched conversation state to explore alternative designs or recover from a distracting detour. Unlike `handoff`, reuse the existing context rather than write a transfer summary; unlike worktrees, this isolates conversation history. Keep code state aligned with each branch of the conversation. Known uses: Claude Code rewind (`Esc Esc`, `/rewind`) with "summarize from here" to drop a failed attempt instead of correcting it; Codex `/fork`. | [hl-forking], [cc-session] |
| evidence-linked-behavior-recovery | candidate | Ask the agent to reconstruct an existing system's behavior from complementary artifacts, link each inferred rule to evidence, and resolve contradictions with observations and domain experts before using the result as a specification. Unlike `linear-code-walkthrough`, the deliverable is a validated behavioral contract, including when source code is incomplete. | [mf-blackbox] |
| instruction-activation-checks | candidate | Diagnose instruction failures by distinguishing file presence, discovery, context loading, and observed application. Unlike `context-engineering`, this supplies a troubleshooting procedure; unlike `agent-workflow-evals`, it diagnoses a particular activation failure. Conditional: may extend `skills-as-packaged-workflows`; tool-specific traces and loading semantics need independent verification. | [sdlc-load] |

## Verification

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| give-agent-a-way-to-verify | done | Hand the agent a pass/fail check (tests, build, linter, screenshot); it runs, reads, and iterates until it passes. | [cc-bp] |
| tdd-with-agent | done | Enforce red-green-refactor with phase-specific prompts, else the agent defaults to implementation-first and writes tests retroactively. | [cc-bp] |
| hypothesis-driven-debugging | done | Establish a reproducer, distinguish falsifiable causes with controlled experiments, then fix and preserve a regression test. Extends the earlier reproduce-before-fix research lead; reproduction alone is already covered by TDD. | [mp-diagnosis] |
| reflection | done | Self-critique loop: generate → evaluate → improve. The `evaluator-optimizer` workflow reframed for the human-driven case. | [ng], [bea] |
| writer-reviewer | done | Review the diff in a *fresh* context (separate session/subagent) so the agent isn't biased toward code it just wrote. Includes adversarial refutation (grader ≠ author) as a hardened variant (merge decided 2026-07-23). | [cc-bp] |
| adversarial-review | rejected | Merged into `writer-reviewer` (author decision 2026-07-23): difference in degree, not structure. | [cc-bp] |
| prototype-to-answer | done | Build a throwaway prototype to answer a design question ("does this state model even fly?") before the real implementation — verify the design, not the code. | [mp] |
| agent-workflow-evals | done | Maintain a small suite of representative tasks that measures whether agent instructions and skills still produce correct, bounded, and efficient behavior after changes. | [agent-evals] |
| linear-code-walkthrough | candidate | Ask the agent for an ordered explanation of an execution path, extracting actual snippets from the repository so the developer can check and understand the implementation. Unlike `writer-reviewer`, the deliverable is human understanding rather than a defect verdict. Consider a shared chapter with `interactive-code-explanation`. | [sw-walkthrough] |
| interactive-code-explanation | candidate | Have the agent turn a difficult algorithm into an explorable explanation with inputs, intermediate states, and step controls; compare its behavior with the actual implementation. Unlike `prototype-to-answer`, this explains an existing design rather than testing a proposed one. A separate chapter must earn its place alongside `linear-code-walkthrough`. | [sw-interactive] |
| benchmark-guided-optimization | candidate | Define a fixed evaluator, allowed edit surface, baseline, and experiment budget; have the agent record trials and retain only measured improvements that preserve correctness. Unlike `agent-workflow-evals`, the object measured is the program being optimized, not the agent workflow. Adapt the autoresearch mechanism with an explicit total stop condition. | [kagan-ratchet], [autoresearch-program] |
| approved-scenario-fixtures | candidate | Use a reviewed test runner and domain-readable fixtures containing inputs and expected outputs, so a developer reviews behavior changes rather than masses of generated assertion code. Complements TDD with a concrete human review surface. Expectations require independent approval; blindly updating snapshots invalidates the check. | [acp-scenarios] |
| held-out-acceptance-scenarios | candidate | Maintain separate acceptance scenarios outside the implementing agent's editable and fully visible context, while keeping requirements explicit, to check generalization beyond its working tests. Unlike `writer-reviewer`, independence comes from the acceptance evidence; unlike workflow evals, the subject is the delivered application. Inspired by StrongDM's holdout analogy; exact access boundaries are our proposed adaptation. | [sdm-factory] |
| mutation-guided-test-hardening | candidate | Deliberately mutate production code and use surviving mutations to direct the agent toward missing or weak assertions. Unlike TDD, this challenges the tests' detection power after they exist. Neither a mutation score nor killing every mutant proves adequate requirements coverage. | [mf-sensors] |
| actionable-diagnostics | candidate | Attach project-specific repair guidance to linter and dependency-rule failures so the agent receives instructions at the point of correction. Conditional: could extend `executable-guardrails`; a separate chapter must focus on designing feedback, not merely enabling checks. | [mf-sensors], [bc-pragmatic] |
| hindsight-rewrite | candidate | After a working but mediocre result, keep what the session learned and discard the code: the agent reimplements from scratch and both versions face the same checks. Unlike `reflection`, the artifact is replaced rather than improved; unlike `design-it-twice`, it starts after one implementation; unlike `prototype-to-answer`, the first version was meant to ship. Conditional: needs a criterion for when rewriting beats repair and a guard against losing verified behavior, else fold into `reflection`. | [bc-prompting] |

## Project organization

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| feature-list-harness | done | A persistent feature list where items start `failing` and flip to `passing` only after verification — the backbone of long-running work. Absorbs `json-spec-file` as a section on the status-file format. | [harness] |
| one-feature-at-a-time | done | Constrain the agent to a single feature per pass; counters its tendency to do too much at once. | [harness] |
| wayfinder | done | Work bigger than one session is planned as a map of investigation tickets on the tracker; the agent resolves them one at a time until the way is clear. Extends `feature-list-harness` toward *investigation*, not features. | [mp] |
| triage-state-machine | done | Incoming issues move through a fixed set of role labels (`needs-triage` → `ready-for-agent` / `ready-for-human`) ending in an agent-ready brief. | [mp] |
| skills-as-packaged-workflows | done | Package recurring procedures as skills/slash-commands instead of re-explaining them in every prompt. Meta-pattern over most others in this list. | [mp] |
| isolated-parallel-work | done | Give every concurrent task its own branch and Git worktree, with explicit ownership and integration order, so parallel sessions cannot corrupt shared state. | [cc-bp], [parallel-claude] |
| reproducible-agent-bootstrap | done | Provide one command that installs dependencies, prepares safe local configuration and fixtures, and proves a green baseline for every fresh session or worktree. | [harness] |
| guided-manual-procedure | candidate | Have the agent generate an interactive procedure for human-only steps, collect their results, and put them in the required configuration. Unlike agent bootstrap, the human performs the inaccessible actions; distinguish script validation from successful completion of the procedure. | [mp-wizard] |
| reviewable-agent-delivery | candidate | Deliver agent work as a scoped change with rationale, check evidence tied to the revision, and actionable review feedback that drives the next iteration. Unlike `writer-reviewer`, this defines the delivery artifact and human review cycle, not independent agent critique. Known use: 141 squash-merged PRs in a day with a median of 118 changed lines. | [aipb-pr], [bc-pr-size] |
| feedback-flywheel | candidate | Capture recurring corrections, identify their causes, update the appropriate shared instruction, skill, or check, and assess subsequent work. Conditional: `claude-md-memory` already covers learning from repeated mistakes; a standalone chapter must add the team-level maintenance cycle across multiple artifacts. The source presents a proposed practice, not validated productivity gains. Known use: tagging `@claude` on a PR to turn a lintable review comment into a lint rule. | [rg-flywheel], [bc-pragmatic] |
| verified-recovery-points | candidate | Preserve coherent, verified recovery points before risky work and choose a scoped recovery when a later attempt fails. Unlike `isolated-parallel-work`, this handles recovery inside one task; unlike `progress-file`, it restores state rather than describing it. A chapter must cover effects outside Git and preservation of unrelated work. | [seml-rollback] |
| agent-residue-cleanup | candidate | Include a bounded completion pass that removes task-created scaffolding, debug artifacts, and obsolete text, then rerun relevant checks. Unlike `premature-success`, the problem is residue left by otherwise working code. Conditional: may fit inside `reviewable-agent-delivery`; never turn cleanup into unrelated refactoring or deletion of failing tests. | [seml-cleanup] |
| bounded-retry-escalation | candidate | Define observable progress and an attempt or resource budget before delegating; when attempts stall, preserve verified work and failed hypotheses, then change the approach, split the task, or escalate. Unlike `premature-success`, this prevents continued work without progress; unlike `verified-recovery-points`, it decides when to abandon a strategy rather than how to restore state. Budget exhaustion is not task completion. | [sdlc-failures] |

## Anti-patterns

| Slug | Status | Pitch / Note | Src |
|------|--------|--------------|-----|
| premature-specification | done | Nailing down details before the problem is understood. Already in the book. | — |
| premature-success | done | Declaring the job done on unit tests / curl without end-to-end verification as a real user. Distinct from `premature-specification`. | [harness] |
| bloated-claude-md | done | An over-specified memory file — the agent ignores half of it because rules get lost in the noise. Inverse of `claude-md-memory`. | [cc-bp] |
| vibe-coding | done | Describe a goal, paste back whatever compiles; fine for throwaways, a trap on real/existing codebases. | [speckit] |
| one-shotting | done | Expecting a whole feature from a single prompt instead of an iterative, verified loop. Primary sources confirmed: the one-shot attempt quote in [harness] plus the trust-then-verify gap in [cc-bp]. | [harness], [cc-bp] |
| private-agent-memory | candidate | The agent writes its own persistent notes about the project into memory outside the repository (developer machine or vendor side); conventions learned from one developer's corrections never reach teammates, other tools, or review, and age unnoticed. Remedy: project knowledge goes to reviewed repo files, agent memory keeps personal preferences only, disable or redirect it per project where the tool allows. Conditional: may fold into `claude-md-memory` as a shared-vs-personal memory section. Tool-neutral: Claude Code auto memory, Windsurf Memories, Copilot Memory, Codex Memories are known uses, not the subject; the Codex docs themselves route required team guidance to `AGENTS.md`. | [cc-mem], [ws-mem], [gh-mem], [sg-memory], [codex-mem] |
| approval-fatigue | candidate | Requiring confirmation for every routine action trains the developer to approve mechanically; define bounded permissions and reserve human decisions for meaningful risk boundaries. Complements `executable-guardrails` by explaining how excessive interruptions undermine oversight. | [aipb-fatigue], [codex-bp] |
| self-confirming-tests | candidate | The agent calculates expected results through the same production logic under test, so implementation errors appear on both sides of the assertion. Require an independent oracle or reviewed expectations. Unlike `premature-success`, the failure is circular evidence even when the suite genuinely ran; may become a section of TDD or approved fixtures. | [mf-tdd-loop] |
| half-finished-migration | candidate | The codebase stays partially migrated (two HTTP clients, old and new API styles), so the agent copies whichever variant it meets first and the developer keeps correcting it. Remedy: finish migrations; until then forbid new uses of the old path with a lint rule, name the target variant in the shared instruction file, and track remaining sites. Unlike `bloated-claude-md`, the misleading signal is the code the agent imitates, not the instructions. Evidence is practitioner opinion; the source admits "very little data" for models. | [bc-pragmatic] |

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
| multi-agent-collaboration | Developer-side isolation mechanics are accepted as `isolated-parallel-work`; general multi-agent orchestration remains out of scope. | [ng], [cc-bp], [parallel-claude] |
| react | Interleave reasoning traces and actions in one loop — the canonical agentic-cycle. Model-internal. | [react] |
| reflexion | Verbal self-reflection stored in an episodic memory buffer across trials. Agent-internal origin of `reflection`. | [reflexion] |
| tree-of-thoughts | Deliberate reasoning over a tree of thoughts with look-ahead / backtracking. Model-internal. | [tot] |
| manager-pattern | A central agent coordinates specialists via tool calls. Overlaps `orchestrator-workers`. | [openai-guide] |
| decentralized-handoff | Peer agents hand off execution one-way. Agent-architecture. | [openai-guide] |
| structure-vs-autonomy | Design axis: successful agentic software sits between a rigid DAG and full autonomy. Meta-principle, could inform task-setting. | [llamaindex] |

## Sources

### Matt Pocock follow-up checked on 2026-09-21

- `[mp-diagnosis]` — Matt Pocock, *Diagnosing Bugs* — https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md
- `[mp-wizard]` — Matt Pocock, *Wizard* — https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md

The [comparison](research/matt-pocock-new-skills-2026-09-21.md) distinguishes new chapters from extensions. The expert questionnaire and intent-based merge resolution extend existing chapters; the architecture survey remains a research lead until it earns a distinct interaction mechanism.


### Candidate collection checked on 2026-09-21

These are research candidates, not accepted chapters. “New” means newly examined for this backlog, not a claim about when a site launched. The linked pages establish the authors' proposed mechanisms; inclusion does not establish effectiveness. Distinctions and merge suggestions in the rows are our editorial assessment.

- `[sw-hoard]` — Simon Willison, *Hoard things you know how to do* — https://simonwillison.net/guides/agentic-engineering-patterns/hoard-things-you-know-how-to-do/
- `[ap-library]` — AgentPatterns.ai, *Codebase-Derived Pattern Libraries as Agent Context* — https://agentpatterns.ai/context-engineering/codebase-pattern-library-context/ ; implementation checked against https://arunksingh16.github.io/pattern-vault/getting-started/
- `[sw-walkthrough]` — Simon Willison, *Linear walkthroughs* — https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/
- `[sw-interactive]` — Simon Willison, *Interactive explanations* — https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/
- `[aipb-pr]` — Bartley Editions, *Encyclopedia of Agentic Coding Patterns: Agentic Pull Request* — https://aipatternbook.com/agentic-pull-request
- `[aipb-fatigue]` — Bartley Editions, *Encyclopedia of Agentic Coding Patterns: Approval Fatigue* — https://aipatternbook.com/approval-fatigue
- `[rg-flywheel]` — Rahul Garg, *Feedback Flywheel*, part of *Patterns for Reducing Friction in AI-Assisted Development* — https://martinfowler.com/articles/reduce-friction-ai/feedback-flywheel.html
- `[seml-rollback]` — Alex Serban, SE-ML, *Rollback & Reversibility* — https://se-ml.github.io/agentic_patterns/08-rollback-reversibility/
- `[seml-cleanup]` — Alex Serban, SE-ML, *Cleanup & Hygiene* — https://se-ml.github.io/agentic_patterns/09-cleanup-hygiene/
- `[kagan-ratchet]` — kagan.ai, *Patterns of AI Agent Workflows*, entry *Autoresearch (Ratchet Loop)* — https://kagan.ai/catalog/vol-01/
- `[autoresearch-program]` — Andrej Karpathy, *autoresearch: program.md*, executable-workflow instructions behind the optimization candidate — https://github.com/karpathy/autoresearch/blob/master/program.md

Simon Willison was already a source-survey lead; the three entries above were checked at chapter level in this pass. His TDD, test-baseline, and manual-testing chapters are additional evidence for existing topics rather than new candidates. Likewise, the other patterns in Rahul Garg's series largely overlap context engineering, planning, project memory, and shared workflows. No previous rejection is reversed by this collection.

The SE-ML catalog explicitly describes its patterns as practices, not evidence-backed guarantees. Its destructive Git examples need adaptation before reuse. The kagan.ai catalog mainly concerns agent architecture; only the developer-configured experiment workflow is proposed here. Further source screening and overlap notes are in [the research notes](research/pattern-sources-2026-09-21.md).

### Second source pass, 2026-09-21

- `[acp-catalog]` — *Augmented Coding Patterns*, contributor-authored catalog of patterns, obstacles, and antipatterns — https://ai-coding-patterns.dev/pattern-catalog/ ; source repository https://github.com/lexler/augmented-coding-patterns
- `[acp-scenarios]` — Ivett Ördög, *Approved Scenarios* — https://ai-coding-patterns.dev/patterns/approved-scenarios/
- `[acp-slice]` — Ivett Ördög, *Slice for Review*; supporting material for `reviewable-agent-delivery`, not a separate candidate yet — https://ai-coding-patterns.dev/patterns/slice-for-review/
- `[hl-forking]` — HumanLayer, *Context Forking to Save Time, Tokens and Trouble* — https://www.humanlayer.dev/blog/context-forking-to-save-time-trouble-and-tokens
- `[hl-output]` — HumanLayer, *Context-Efficient Backpressure for Coding Agents*; concrete output-control example for existing context and verification chapters — https://www.humanlayer.dev/blog/context-efficient-backpressure
- `[sdm-factory]` — Justin McCarthy, StrongDM, *Software Factories and the Agentic Moment*; scenarios outside the codebase as holdout validation — https://factory.strongdm.ai/
- `[sdm-techniques]` — StrongDM, *Techniques*; behavioral dependency doubles and layered summaries are supporting leads, not accepted standalone chapters — https://factory.strongdm.ai/techniques
- `[duvall-patterns]` — Paul Duvall, *AI Development Patterns*; lifecycle catalog, with *Image Spec* as a further candidate lead — https://github.com/PaulDuvall/ai-development-patterns#image-spec
- `[kp-workflows]` — Kauan Polydoro, *Agentic Workflows*; task recipes and recipe-audit conventions, useful for implementation examples; individual recipes require their own verification — https://github.com/kauanpolydoro/agentic-workflows
- `[gsa-patterns]` — GSA TTS, *Agentic Coding Patterns*; community-maintained instructions and workflows, currently experimental rather than established evidence — https://github.com/GSA-TTS/agentic-coding-patterns

The [second-pass notes](research/pattern-sources-2026-09-21-round-2.md) record checked entries, overlaps, and source limitations. These sources do not establish that generated test expectations are correct, that short summaries are lossless, or that human review should be abandoned.

The [companion catalog survey](research/pattern-sources-2026-09-21-round-2-catalogs.md) records the Duvall, Polydoro, and GSA sources, including entries that remain partially checked leads.

### Fowler follow-up, 2026-09-21

- `[mf-blackbox]` — Thiyagu Palanisamy and Chandirasekar Thiagarajan, *From Black Box to Blueprint* — https://martinfowler.com/articles/black-box-to-blueprint.html
- `[mf-archaeologist]` — Nik Malykhin, *The Archaeologist's Copilot*; supporting experience report for bootstrap, baseline verification, and staged modernization — https://martinfowler.com/articles/archaeologist-copilot.html
- `[mf-spdd]` — *Structured-Prompt-Driven Development*; supporting SDD methodology, not automatically another pattern or tool-profile chapter — https://martinfowler.com/articles/structured-prompt-driven/
- `[mf-sensors]` — Birgitta Böckeler, *Maintainability sensors for coding agents* — https://martinfowler.com/articles/sensors-for-coding-agents.html
- `[mf-tdd-loop]` — Birgitta Böckeler, *TDD inside the agent loop - theater or actual value?* — https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html

These are articles hosted by Martin Fowler, not necessarily authored by him. The black-box report describes a thin-slice experiment; it does not establish whole-system migration success. SPDD overlaps the book's existing spec lifecycle, domain modeling, and packaged workflows. Its additional structure is useful comparative material without reopening rejected tool-profile chapters.

The [Böckeler research notes](research/fowler-bockeler-candidates-2026-09-21.md) record the candidate boundaries and the limits of her experiments. Together with `visual-specification` from the previous source survey, this pass adds five candidates. The existing `feedback-flywheel` remains the distinct candidate from Rahul Garg's series; its other four named patterns overlap chapters already present.

### Agentic SDLC Handbook follow-up, 2026-09-21

- `[sdlc-load]` — Daniel Meppiel, *The Load Lifecycle*, chapter 14 — https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch14-the-load-lifecycle.html
- `[sdlc-failures]` — Daniel Meppiel, *Anti-Patterns and Failure Modes*, chapter 20, especially sections 20.4.4–20.4.5 — https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch20-anti-patterns-and-failure-modes.html

The [screening notes](research/agentic-sdlc-handbook-2026-09-21.md) record two candidate adaptations, additions to existing chapters, and evidence limits. The handbook is practitioner guidance, not independent validation of universal loading behavior, retry thresholds, or productivity gains. Its package-manager and orchestration architecture is broader than this book's developer-workflow scope.

### Agent memory follow-up, 2026-09-26

- `[ws-mem]` — Windsurf (Devin Desktop), *Cascade Memories*; auto-generated, stored in `~/.codeium/windsurf/memories/`, not committed — https://docs.devin.ai/desktop/cascade/memories
- `[gh-mem]` — GitHub Docs, *About GitHub Copilot Memory*; repository-scoped, shared, citation-validated, 28-day expiry, stored GitHub-side — https://docs.github.com/en/copilot/concepts/agents/copilot-memory
- `[sg-memory]` — Softwareguru, *Coding Agents Do Not Need Personal Memory*, 2026-05-15; opinion piece arguing the repository is the agent's memory — https://softwareguru.substack.com/p/coding-agents-do-not-need-personal
- `[acp-grooming]` — svetkis, *Memory Grooming*, Augmented Coding Patterns; supporting material for `bloated-claude-md` — https://ai-coding-patterns.dev/patterns/memory-grooming/

The [screening notes](research/agent-memory-2026-09-26.md) record the candidate boundary, per-tool storage and controls, and evidence limits. No source measures the cost of private memory; the case rests on where the tools store it.

### Claude Code and Codex best-practice collections, 2026-09-26

Found through the community indexes [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) and [codex-cli-best-practice](https://github.com/shanraisshan/codex-cli-best-practice); the labels below point to the original posts, talks, and docs, not to the indexes.

- `[cc-session]` — Thariq Shihipar, *Using Claude Code: session management and 1M context*, 2026-04-15 — https://claude.com/blog/using-claude-code-session-management-and-1m-context
- `[cc-skills-lessons]` — Thariq Shihipar, *Lessons from Building Claude Code: How We Use Skills*, 2026-03-17 — https://x.com/trq212/status/2033949937936085378
- `[bc-prompting]` — Boris Cherny, prompting tips ("Knowing everything you know now, scrap this and implement the elegant solution"), 2026-02-01 — https://x.com/bcherny/status/2017742752566632544
- `[bc-pr-size]` — Boris Cherny, 141 squash-merged PRs and their size distribution, 2026-03-25 — https://x.com/bcherny/status/2038552880018538749
- `[bc-pragmatic]` — Boris Cherny on *The Pragmatic Engineer* podcast, 2026-03-04; unfinished migrations at 18:32, lint rules from PR comments at 45:15 — https://youtu.be/julbw1JuAz0
- `[codex-plugin-cc]` — OpenAI, *Codex plugin for Claude Code* (`/codex:review`, `/codex:adversarial-review`) — https://github.com/openai/codex-plugin-cc
- `[codex-bp]` — OpenAI, *Codex best practices* — https://learn.chatgpt.com/guides/best-practices
- `[codex-mem]` — OpenAI, *Codex Memories* — https://learn.chatgpt.com/docs/customization/memories.md

The [screening notes](research/claude-code-best-practice-2026-09-26.md) list the tips already covered by chapters, the chapter additions, and the dropped leads. Most tips in both indexes restate existing chapters; the two new candidates and the known uses above are what remained.

### Existing sources

- `[bea]` — Anthropic, *Building effective agents* — https://www.anthropic.com/engineering/building-effective-agents
- `[harness]` — Anthropic, *Effective harnesses for long-running agents* — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- `[ctx]` — Anthropic, *Effective context engineering for AI agents* — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- `[cc-bp]` — Anthropic, *Claude Code best practices* — https://code.claude.com/docs/en/best-practices
- `[cc-mem]` — Anthropic, *Claude Code — Memory* — https://code.claude.com/docs/en/memory
- `[cc-sandbox]` — Anthropic, *Claude Code Sandboxing* — https://www.anthropic.com/engineering/claude-code-sandboxing
- `[parallel-claude]` — Anthropic, *Building a C compiler with a team of parallel Claudes* — https://www.anthropic.com/engineering/building-c-compiler
- `[agent-evals]` — Anthropic, *Demystifying evals for AI agents* — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- `[gh-hooks]` — GitHub Docs, *About hooks* — https://docs.github.com/en/copilot/concepts/agents/hooks
- `[ng]` — Andrew Ng, *Four agentic design patterns* — https://x.com/AndrewYNg/status/1773393357022298617
- `[speckit]` — GitHub, *Spec-driven development with AI (Spec Kit)* — https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- `[agentsmd]` — *AGENTS.md convention* — https://agents.md/
- `[openspec]` — Fission-AI, *OpenSpec* (spec-driven change lifecycle: propose → review → apply → archive) — https://github.com/Fission-AI/OpenSpec
- `[kiro]` — AWS, *Kiro — Specs* (spec sessions: EARS requirements → design → tasks; steering; hooks) — https://kiro.dev/docs/specs/
- `[tessl]` — Tessl (spec as the source of code; SDD plugin on a "context as code" platform) — https://docs.tessl.io
- `[superpowers]` — Jesse Vincent (obra), *Superpowers* (Claude Code skill pack: brainstorm → plan → subagent TDD → review) — https://github.com/obra/superpowers
- `[mp]` — Matt Pocock, *skills* (engineering/productivity skill pack; vendored in this repo under `.agents/skills/`) — https://github.com/mattpocock/skills
- `[ousterhout]` — John Ousterhout, *A Philosophy of Software Design* and CS 190 discussion of Design It Twice — https://web.stanford.edu/~ouster/cgi-bin/aposd.php and https://web.stanford.edu/~ouster/cs190-winter24/lectures/aposd/
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
