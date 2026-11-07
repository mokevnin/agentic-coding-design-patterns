# Regular refactoring: additions to Scheduled Maintenance

Checked on 2026-11-07. This is research for extending [Scheduled Maintenance](../book/ru/scheduled-maintenance.md), not a chapter edit or a recommendation to install more tools. Sources are first-party documentation, skill instructions and the authors' original material. Product behavior is distinguished below from proposed editorial guidance. Local read-only checks reported Claude Code 2.1.319 and Codex CLI 0.167.0; neither refactoring workflow was executed.

## Recommendation

Extend the existing chapter with a small set of semantic discovery passes, led by the user's example: “find implicit state machines and propose their descriptions.” The current chapter already has a weekly simplification prompt, standards review and an interactive architecture survey; its main gap is what to ask the agent to discover beyond generic cleanup. Keep the cadence and runner discussion in this chapter, and link to the existing chapters for design, domain vocabulary and verification. [Current chapter](../book/ru/scheduled-maintenance.md), [domain vocabulary](../book/ru/domain-context-file.md), [alternative designs](../book/ru/design-it-twice.md), [verification](../book/ru/give-agent-a-way-to-verify.md).

The proposed distinction is between a discovery pass, whose useful result can be a behavior model or a well-supported candidate, and a refactoring pass, which changes structure while retaining observable behavior. A scheduled scan need not produce code every time. This is editorial guidance, supported by the separation between candidate presentation and user selection in Matt Pocock's architecture skill and the behavior-preserving passes in OpenAI's refactoring guidance. [Architecture skill](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/improve-codebase-architecture/SKILL.md), [OpenAI refactoring use case](https://learn.chatgpt.com/use-cases/refactor-your-codebase).

## Verified tool and skill findings

### Claude Code: retain the existing simplify facts

The current official command reference confirms `/simplify [target]` is a bundled skill: four parallel review agents cover reuse, simplification, efficiency and abstraction level; it applies fixes and accepts a path or PR reference. It explicitly does not look for correctness bugs. The chapter's four-agent and target claims are therefore supported, not corrections to make. Keep `/simplify app/services` as a concrete tool-specific example, but explain that a path target is not a promise to discover every architectural issue in the directory. [Command reference](https://code.claude.com/docs/en/commands).

The local-review documentation distinguishes `/code-review`, `/simplify` and `/verify`; it also explains an earlier command-name change. Use current documentation rather than an old blog or copied prompt when describing their roles. A project skill can override a bundled name, so an invocation's behavior can depend on the installation. [Local review documentation](https://code.claude.com/docs/en/code-review-local), [skill resolution](https://code.claude.com/docs/en/skills#resolve-skills-that-share-a-name).

The official `code-simplifier` plugin contains a separate agent instruction: retain behavior, concentrate on recent changes, and prefer clarity over line-count reduction. It also includes concrete JavaScript and React style preferences. It is useful source material for a custom pass, but should not become a second default recommendation beside `/simplify` or a supposedly language-neutral standard. [Plugin agent source](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-simplifier/agents/code-simplifier.md).

`/batch` is a different bundled skill: it plans a broad change as 5–30 independent units, then uses isolated worktrees after plan approval. Add, at most, a short cross-reference for an already chosen repetitive migration; it is not the mechanism for open-ended weekly architectural discovery. [Command reference](https://code.claude.com/docs/en/commands).

### Codex: document a prompt and a reusable team skill, not an invented built-in

OpenAI's current refactoring use case recommends mapping the area, choosing one cleanup theme, identifying the existing behavior and a validation check, then landing small passes. It separates structural cleanup from framework, dependency and architecture migrations, and recommends packaging repeated patterns as skills. The inspected documentation does not establish a universal bundled `$simplify` or `$refactor`; this is a source limit, not proof that no plugin can provide one. Add a Codex subsection using a plain scoped prompt and explain how a successful team-specific pass can become a skill. [Official refactoring use case](https://learn.chatgpt.com/use-cases/refactor-your-codebase).

Codex supports explicit skill invocation with `$` and a built-in `$skill-creator`; repository skills are discovered through `.agents/skills`. Present a request such as `Создай скил для нашего прохода по неявным машинам состояний` after a real pass has established its useful inputs and output. Do not present a proposed skill name as already installed, and do not reproduce configuration. [Official skill documentation](https://learn.chatgpt.com/docs/build-skills).

Scheduled tasks can invoke skills. Local tasks need the computer and app running; web tasks do not directly access a local repository folder. The documentation advises testing a task prompt and inspecting early runs. Scheduling alone does not establish that a code refactor or a PR was created: the task needs accessible source, the necessary tools and an explicit deliverable. The chapter already distinguishes a `codex-action` run from the separate step that creates its PR; retain that distinction. [Scheduled tasks](https://learn.chatgpt.com/docs/automations), [current chapter's Codex section](../book/ru/scheduled-maintenance.md#codex).

### Matt Pocock: describe the skills that actually exist

The checked upstream `main` is commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`, authored 2026-10-31. Its engineering directory has `improve-codebase-architecture`, `codebase-design`, `domain-modeling`, `to-spec`, `to-tickets` and `tdd`; it has no `simplify`, `refactor` or `request-refactor-plan` directory. Do not revive a historical command name from a secondary skill catalog. [Pinned engineering directory](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering).

`improve-codebase-architecture` scopes to a named area or recent-change hot spots, reads glossary and ADRs, delegates exploration to a fresh-context subagent, presents candidates and then interviews the user about the selected one. This fits a periodic interactive survey, not an unattended end-to-end refactoring promise. The current skill instructions are harness-neutral; the explanatory documentation still refers to a Claude-specific Explore tool. Cite the pinned skill when describing current procedure. [Skill instructions](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/improve-codebase-architecture/SKILL.md), [explanatory documentation](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/engineering/improve-codebase-architecture.md).

`codebase-design` is a vocabulary and design reference, not a scheduled survey driver. Its optional Design It Twice procedure compares alternative interfaces for an already selected candidate. `to-tickets` explicitly gives wide mechanical refactors an expand–contract sequence rather than forcing them into vertical feature slices. `tdd` emphasizes behavior at agreed public seams. These are useful links around the selected improvement, not four extra weekly jobs. [Design reference](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/codebase-design/SKILL.md), [Design It Twice](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/codebase-design/DESIGN-IT-TWICE.md), [ticket planning](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md), [TDD](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/tdd/SKILL.md).

## Proposed passes and prompts

The following six prompts are authored examples for this book, not commands copied from a vendor or measured claims about model performance. Give each retained pass its own subsection and example heading in the agent-neutral block. Put the method and expected evidence in the surrounding prose; the reader's prompt stays short, as required by [AGENTS.md](../AGENTS.md#chapter-content).

### P1 — Describe implicit state machines

User-provided direction: `Найди все неявные машины состояний и предложи их описание`. For a repeatable task, use the scoped form `Найди неявные машины состояний в оплате и предложи их описание`.

Proposed prose: the pass looks for lifecycle state encoded across status values, flags, nullable fields, timestamps and repeated conditionals. Its result connects those fields and branches to named states, initiating events, transition conditions and effects, with links to the code and tests. It distinguishes observed behavior from inferred intent and records uncertain or invalid combinations for discussion. A small Mermaid `stateDiagram-v2` can make the recovered model reviewable. This is an editorial application of statechart concepts: SCXML specifies states, transitions, conditions and actions; Stately distinguishes finite state from extended context. [SCXML core constructs](https://www.w3.org/TR/scxml/#Core), [finite states and context](https://stately.ai/docs/finite-states), [events and transitions](https://stately.ai/docs/transitions).

Interpretation comes before implementation. Independent dimensions may require parallel regions rather than one exclusive enum. The output can remain a useful description; an enum, discriminated union, transition function or library is a later design choice. A newly discovered forbidden transition is a potential bug or requirements question, not permission to silently change behavior during cleanup. These are editorial safeguards; the distinction between exclusive and simultaneous state regions is grounded in the statechart sources. [Parallel states](https://stately.ai/docs/parallel-states), [SCXML legal configurations](https://www.w3.org/TR/scxml/#LegalStateConfigurations).

Illustrative output, invented rather than a repository finding: payment state is encoded by `status`, `settled_at` and `refund_pending`; the proposed states are Pending, Paid and Refunding. A settlement event moves Pending to Paid; a refund request moves Paid to Refunding only when the existing eligibility condition holds. The report links each transition to its handler and test. It also identifies a contradictory combination, `status=pending` with `settled_at` populated, and asks whether that is a transient state or corrupted data. Notification delivery is tracked separately rather than multiplied into every payment state. The next decision is whether the description matches the domain, not which library to install.

### P1 — Find scattered business rules

Prompt: `Найди бизнес-правила оплаты, которые реализованы в нескольких местах`.

Proposed result: identify the rule, its call sites and meaningful differences; show which changes currently require coordinated edits. Do not merge code merely because expressions resemble one another: the point is one domain rule with multiple owners. This is an editorial discovery pass that complements glossary maintenance: the existing domain chapter maintains terminology, while the architecture skill seeks improvements in change locality. [Domain chapter](../book/ru/domain-context-file.md), [design vocabulary and locality](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/codebase-design/SKILL.md).

### P1 — Remove unnecessary abstraction

Prompt: `Найди в app/services абстракции, которые можно удалить`.

Proposed result: show the indirection and what callers would look like without it; explain where responsibility would concentrate. This counters a reflex to solve every problem by extracting another helper. Fowler's catalog includes Inline Class as the inverse of Extract Class; the architecture skill also asks whether deleting a shallow module concentrates complexity or merely moves it. [Inline Class](https://refactoring.com/catalog/inlineClass.html), [architecture skill](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/improve-codebase-architecture/SKILL.md).

### P2 — Expose domain concepts hidden in primitives

Prompt: `Найди доменные понятия, спрятанные в строках и числах`.

Proposed result: identify values that carry repeated validation, units, comparison or conversion rules, and suggest a domain name and invariants. The catalog's Replace Primitive with Object supplies a concrete precedent; the proposal is to discover worthwhile concepts, not to wrap every string in a class. Keep this shorter than the state-machine pass. [Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html).

### P2 — Separate decisions from effects

Prompt: `Найди в оплате места, где вычисления смешаны с побочными эффектами`.

Proposed result: show where calculations or policy decisions are entangled with database, network or message operations and what observable boundary could preserve behavior during separation. Preserve effect ordering and error behavior. Fowler's Separate Query from Modifier illustrates separating a calculation from sending a bill; this gives the pass a concrete aim without promising that every effect belongs in a new layer. [Separate Query from Modifier](https://refactoring.com/catalog/separateQueryFromModifier.html).

### P2 — Remove dead paths with evidence

Prompt: `Найди в оплате мёртвый код и устаревшие обходные пути`.

Proposed result: show callers, relevant runtime entry points and the evidence that a flag or compatibility branch has expired. A missing static reference alone should not decide deletion in a dynamic system. Prefer the project's deterministic unused-code checks when they cover the case, then use the agent to interpret gaps. This is editorial guidance; the quality-gates chapter already covers enforced checks, and OpenAI's use case includes dead-code cleanup. [Quality Gates](../book/ru/quality-gates.md), [refactoring use case](https://learn.chatgpt.com/use-cases/refactor-your-codebase).

## Cadence, validation and publication

Recommend a rotation of a few narrow passes rather than running all six across the whole repository every week. Scope to an active domain area or repeated maintenance pain, retain the last reviewed commit as the next pass's starting point, and skip already open or explicitly deferred findings. These are proposed operating choices, not vendor guarantees or a proven optimal schedule.

Weekly work complements cleanup during ordinary development. Fowler explicitly prefers continuous opportunistic refactoring while allowing scheduled efforts; he also warns against refactoring with a failing test or inadequate test coverage. The chapter should not imply that all cleanup waits for Monday. [Opportunistic Refactoring](https://martinfowler.com/bliki/OpportunisticRefactoring.html).

Before a chosen structural change, identify the current contract and the check that observes it. Where evidence is insufficient, make behavior recovery or a focused characterization test the next task. After each meaningful pass, run the relevant checks, then the repository's required gate. Do not rewrite expected outputs merely to make changed behavior appear equivalent. This is editorial guidance extending the book's existing verification and TDD material. [Feedback Loop](../book/ru/give-agent-a-way-to-verify.md), [TDD with an agent](../book/ru/tdd-with-agent.md).

Publish a small change with its behavior evidence, or a candidate with code links, uncertainty and the next decision. It is acceptable for the outcome to be “nothing worth changing.” The existing anti-pattern “report instead of change” needs that qualification: an ignored report is waste, but a reviewed recovered state model can be the intended deliverable. [Current anti-patterns](../book/ru/scheduled-maintenance.md#антипаттерны-и-частые-ошибки).

## Chapter insertion map

| Priority | Existing location | Proposed edit |
| --- | --- | --- |
| P1 | Solution | Distinguish scheduled discovery, selected refactoring and everyday cleanup; make the weekly cadence a starting recommendation. |
| P1 | Implementation → agent-neutral passes → Simplification | Expand the generic prompt into scoped cleanup with behavior evidence and a justified no-change outcome. |
| P1 | After Glossary check, before Architecture | Add implicit state machines first, then scattered business rules. Explain the difference between recovering a model and changing implementation. |
| P1 | Architecture | Add the deletion prompt and retain the interactive skill example; show one candidate becoming a spec or tickets. |
| P2 | Agent-neutral passes | Add the primitive, effect and dead-path examples selectively; do not grow six full tutorials if they obscure the main workflow. |
| P1 | Claude Code → Simplification | Retain the confirmed four-agent/path facts, add the clarity-versus-correctness distinction and a link to verification. Refresh the block's checked version/date only with the described verification scope. |
| P1 | Codex, after Review | Add a refactoring subsection with a plain scoped prompt, a link to official guidance and a later request to package the proven pass as a skill. |
| P1 | Example | Replace one cosmetic duplication finding with a recovered payment lifecycle, one uncertain transition and a selected small follow-up. |
| P1 | Anti-patterns | Add model-to-library jumping, inventing a cleanup for every run, conflating refactoring with behavior change, and deleting code from a static-reference absence alone. |
| P2 | Related patterns | Link domain vocabulary, alternative designs, verification and ticket slicing; retain each chapter's existing ownership. |

The same substantive additions should be translated to English and Spanish after the Russian revision. The repository already tracks per-task residue cleanup and evidence-linked behavior recovery as separate candidates; this extension should mention their boundaries without changing their status or silently creating a new chapter. [Contribution rules](../CONTRIBUTING.md#extend-an-existing-pattern), [candidate backlog](../CANDIDATES.md).

## Exclusions and evidence limits

Do not add a generic skill marketplace catalog, automatic conversion of every lifecycle to a state-machine library, line-count targets, mandatory decomposition into small functions, broad framework migrations disguised as housekeeping, or an assurance that every scheduled run opens a PR. Do not duplicate skill internals in the reader's prompt. These are editorial exclusions for this revision.

No productivity, correctness or cost benchmark was conducted. Documentation establishes advertised workflows, not their effectiveness on this repository. The six semantic prompts have not been evaluated here. “No built-in found” is restricted to the inspected Codex documentation and local CLI surface. Matt Pocock sources are pinned; vendor documentation and the code-simplifier source are mutable. Stately pages currently show XState v6 beta; they are used for conceptual explanations, not a recommendation of that package or version. The check date is the session date, not a claim that every page was published on that date.
