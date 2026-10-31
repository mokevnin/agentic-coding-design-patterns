# Book currency audit: toolkits and derived patterns

Checked on 2026-10-31 against repository commit `8becaab8d5612db01fbe467d142cf34eaae6f274`. This is an audit, not a book edit. Canonical Russian chapters were read; English and Spanish command, URL and artifact-name inventories and the affected factual passages were compared. Educational examples and recommendations are distinguished from claims about current upstream behavior. No agent or toolkit was installed into the project.

## Confirmed changes requiring correction

### T1 — High: the documented OpenSpec Node floor no longer supports the latest npm release

Locations: `book/ru/openspec.md:20`, `book/en/openspec.md:20`, `book/es/openspec.md:20`; the adjacent installation command explicitly installs `@latest`.

The book says Node.js >=20.19. OpenSpec v1.16.0, published 2026-10-30, raises the npm-install requirement to >=22.12.0. This is a released breaking change, not merely an unreleased main-branch difference. The release also says standalone binaries became the default installation in v1.15.0; npm is still supported. A reader following the stated minimum can therefore install an incompatible release.

Correction: update the npm prerequisite to >=22.12.0; distinguish the Node requirement for npm from the standalone binary, which does not require Node. Consider documenting the current default installation alongside npm. Recheck the supported installation method when updating `checked_on`.

Evidence: [v1.16.0 release](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.16.0), [package engines](https://github.com/Fission-AI/OpenSpec/blob/v1.16.0/package.json). Fetched main package blob: `4482b2ae5951b1b28d3d983237a4595a750a06b9` (`version: 1.16.0`, `engines.node: >=22.12.0`).

### T2 — High: Superpowers' three-route description no longer matches the released workflow

Locations in all three locales: `superpowers.md:28`, `:32`, `:45`, `:55`, `:73`, `:77`.

The book describes `spike`, `bounded`, and `architectural` routes and says bounded changes need only a short design in chat, without separate specification or plan. Current `brainstorming` distinguishes a small change from a project, writes a short or full design document, obtains approval, and invokes `writing-plans`. Projects receive a fresh builder-check subagent before human review; without a subagent tool it performs the builder check itself. The documented three-route classifier is gone. Explicitly clear trivial requests, opting out of questions, and approved throwaway spikes are exceptions, so the book should not turn the design gate into an unconditional claim either.

Correction: rewrite the route table, diagram and artifact explanation together; describe the short/full written design and current exceptions. Update the statement that specification review is only agent self-review plus human review. `writing-plans` places worktree creation at execution time, so also refresh the numbered sequence rather than preserving worktrees as a mandatory pre-planning step.

Evidence: [released v7.0.1 announcement](https://github.com/obra/superpowers/releases/tag/v7.0.1) (2026-10-21), [brainstorming source](https://github.com/obra/superpowers/blob/v7.0.1/skills/brainstorming/SKILL.md), [current writing-plans](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md). Fetched main brainstorming blob: `7f5eef02f894c4f24cea313660c0465ce9c084ed`.

### T3 — Medium: Matt Pocock's domain documents have been renamed

Locations in all three locales: `matt-pocock-skills.md:24`, `:65`; `let-claude-interview-you.md:129`; `domain-context-file.md:104`. The surrounding domain chapter also uses the legacy example names at lines 16, 32, 52, 54, 65, 69, 71, 96, 100 and 102.

Current `domain-modeling` reads and writes `GLOSSARY.md`; multi-context projects use `GLOSSARY-MAP.md`. Setup explicitly recognizes `CONTEXT.md` and `CONTEXT-MAP.md` as legacy files and offers a migration. The book's assertion that the current skill maintains CONTEXT.md is stale. Using CONTEXT.md as an arbitrary team-selected filename remains technically possible; the factual defect is equating it with the current upstream convention.

Correction: update direct toolkit descriptions to GLOSSARY.md / GLOSSARY-MAP.md; either align the chapter's examples and import with that convention or explicitly label their names as project choices and explain the upstream rename.

Evidence: [domain-modeling](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/domain-modeling/SKILL.md), [setup and explicit legacy migration](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/setup-matt-pocock-skills/SKILL.md). Source blobs: `a4438c6879c517d1a08e2b5fbca049b632688dfe` and `2df0b07981718fa5d9a51526dfbcaee87e3a543d`.

### T4 — Medium: the Matt Pocock installation profile omits current managed installations

Locations: `book/{ru,en,es}/matt-pocock-skills.md:18` and `:78`.

The profile presents managed installation through Claude Code and editable installation as the alternative. Upstream now documents managed plugins for Codex and GitHub Copilot as well. Its current explicit Claude command is `claude plugin install mattpocock-skills@claude-plugins-official`. The bare book command is not demonstrated to be invalid on an already configured installation; this finding is an incomplete current profile, not a proven command failure.

Correction: document the current managed options by harness, or avoid implying Claude is the only managed option; use a fully qualified marketplace command for a reproducible installation example. Keep editable installation as a supported alternative.

Evidence: [upstream installation instructions](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/README.md#installation-30-second-setup). README blob `f7038f139299985eea6c3e18398dbafb379a0010`. This verifies the third-party package's own installation guidance; no local Codex plugin installation was attempted.

### T5 — High: resolving-merge-conflicts was removed, rather than simply moved

Additional location supplied by the main audit: `book/{ru,en,es}/isolated-parallel-work.md:135`.

The linked `skills/engineering/resolving-merge-conflicts/SKILL.md` returns 404. The upstream archive explicitly states that the skill was removed from the plugin in v1.3.0, is no longer maintained, and has no replacement: the agent resolves merge/rebase conflicts without a dedicated skill. Replacing only the link would leave a false present-tense product recommendation.

Correction: retain the useful instruction to recover both branches' intent and verify the combined behavior, but remove the claim that a current packaged skill provides it; alternatively label the archived implementation as historical.

Evidence: [upstream archived documentation](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/engineering/resolving-merge-conflicts.md), blob `4b277f95db47425b38a06c0f5b69c8e2a5795bfa`; recursive upstream tree confirms no current skill directory.

### T6 — Medium: retro is no longer in-progress; its source URL is broken

Additional location supplied by the main audit: `book/{ru,en,es}/scheduled-maintenance.md:101`.

The linked `skills/in-progress/retro` returns 404. The current skill is `skills/engineering/retro/SKILL.md`. Its `disable-model-invocation: true` agrees with the book's statement that the user invokes it. Its procedure suggests improvements; it does not apply them automatically. The main issue here is the stale maturity label and source location.

Correction: remove “in-progress” and link to the current engineering skill. Preserve the distinction between receiving recommendations and applying selected changes.

Evidence: [current retro source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/retro/SKILL.md), blob `12149acf2dd23b4514dec57b04a6293eaa1352fa`; [maintainer explanation](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/engineering/retro.md).

## Lower-priority updates and attribution limits

`book/{ru,en,es}/openspec.md:31` describes a usable core path but does not explain the new `/opsx:update` command for revising planning artifacts. Current core includes propose, explore, apply, update, sync and archive. This is an omission, not proof that the listed path stopped working. Existing proposal/delta artifacts, MODIFIED requirement examples, archive synchronization, and per-harness invocation spellings still agree with [command reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md) and [concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md).

`book/{ru,en,es}/let-claude-interview-you.md:127` attributes AskUserQuestion specifically to Claude Code best practices. The current [best-practices page](https://code.claude.com/docs/en/best-practices#brainstorm-with-claude-first) still recommends interviewing, SPEC.md and a fresh implementation session, but no longer names that internal tool in this passage. Prefer linking the current passage and describing the user-visible interview; the tool-specific attribution needs a separate current reference if retained.

Matt's profile can optionally mention the newer `/implement-spec` whole-spec orchestrator and `/retro`; absence from a selective list is not itself a factual error. Current [README](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/README.md) documents both. No claim is made that every new upstream skill needs a new book chapter.

## Coverage

The table covers every assigned slug in RU, EN and ES. “No material drift found” means inspected factual/tool claims agree with the sources consulted; it is not a benchmark of the technique's effectiveness or a guarantee of agent compliance.

| Chapter | Result and primary-source check |
| --- | --- |
| openspec | T1 plus optional update-command refresh. Checked latest released version, engines, command/profile reference, invocation spellings, concepts and artifacts. |
| superpowers | T2. Installation command remains documented; current README still supports the listed harnesses. Scope and order of brainstorming/design/planning changed. |
| matt-pocock-skills | T3 and T4. Checked current README, setup, to-spec, to-tickets, prototype, triage, wayfinder, domain-modeling and grilling sources. Specification label, test-seam discussion, vertical tickets, expand–contract and two-axis review remain supported. |
| skills-as-packaged-workflows | No material drift found in examined Claude skill claims. [Official skills docs](https://code.claude.com/docs/en/skills) support SKILL.md, lazy loading, description-based selection and disable-model-invocation. Upstream writing-for-agents still exists. OpenAI-specific claims are handled by the main audit. The X post was not independently recovered; its historical attributed details remain a verification limit. |
| grilling | No material drift found. [Current source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md) still asks the independent frontier in rounds, recommends answers, looks up facts, and waits for shared-understanding confirmation. |
| let-claude-interview-you | T3 plus narrower current-doc attribution above. [to-questionnaire](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/to-questionnaire/SKILL.md) still asks who receives it and what information is needed, then writes a Markdown questionnaire. |
| design-it-twice | No material drift found. [Stanford CS190 lecture](https://web.stanford.edu/~ouster/cs190-winter24/lectures/aposd/) explicitly lists Design it twice; [upstream implementation](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/codebase-design/DESIGN-IT-TWICE.md) uses 3+ separate agents, distinct interfaces, usage examples, and comparison. The chapter explicitly distinguishes its single-session adaptation. JS snippets are labeled sketches, not runnable implementations. |
| prototype-to-answer | No material drift found. [Current prototype source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/prototype/SKILL.md) still has logic HTML/UI variations, throwaway scope, in-memory default, and archive branch/context pointer. Educational cancellation results are explicitly illustrative. |
| wayfinder | No material drift found in the described default planning process. [Current source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/wayfinder/SKILL.md) supports map/index, decision tickets, frontier, research/prototype/grilling/task labels and resolution comments. Upstream allows execution via explicit Notes override and parallel research; the chapter's ordinary one-question planning workflow is a narrower choice, not a universal restriction on all upstream modes. |
| tracer-bullet-tickets | No material drift found. [to-tickets](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md) still publishes vertical slices with blocking edges, user approval, optional prefactoring and expand–contract exception. |
| triage-state-machine | No material drift found. [triage source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/triage/SKILL.md) retains category/state roles, maintainer control, reproduction, briefs, AI-origin disclaimer and rejection knowledge base. The book presents one variant of the process. |
| spec-driven-development | No material drift found in the generic workflow; toolkit-specific changes are covered above. The spec/plan/tasks split is a chosen explanatory model, not a universal file-format promise. |
| domain-context-file | T3. Generic glossary/ADR approach still applies. [Kiro steering docs](https://kiro.dev/docs/steering/) still describe product.md as product context. DDD and ADR attribution was not re-audited against the complete original books. |
| hypothesis-driven-debugging | No material drift found. [diagnosing-bugs](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/diagnosing-bugs/SKILL.md) retains a red-capable feedback loop, minimization, ranked falsifiable hypotheses, one-variable probes and regression validation. Local cache_probe.py was executed in shared/bypass/distinct/reverse/fixed modes: outputs and exit codes exactly matched the chapter (1/0/0/1/0). |

## Evidence and limits

Primary GitHub files were fetched through the connected GitHub API, after an ordinary shell fetch failed DNS resolution. Current Matt Pocock repository head was `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d` (2026-10-31). The report uses that immutable reference for Matt links; raw file blob hashes above identify the content inspected. Superpowers v7.0.1 and OpenSpec v1.16.0 were separately confirmed through their latest-release API endpoints, preventing confusion between released changes and main-branch-only work.

Cross-locale inventories matched command names, external URLs and artifact names for the 14 assigned chapter triplets, allowing for translated placeholder arguments. No translation-specific additional drift was found in those inventories and affected passages. This was not an independent literary review of every translated paragraph. Extra findings T5 and T6 were followed up from the main auditor's full link check; the complete extra chapters are outside this sub-audit's assigned reading scope. No changes were made to chapters, source_rev or checked_on metadata.
