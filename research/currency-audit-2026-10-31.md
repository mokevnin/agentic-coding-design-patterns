# Book currency audit — 2026-10-31

## Follow-up corrections

The user authorized all corrections and made AGENTS.md the book's sole project-instruction filename. The confirmed findings and six operational qualifications below have now been addressed in RU, EN and ES. The memory chapters are `agents-md-memory.md` and `bloated-agents-md.md`; navigation, related-pattern metadata, the candidate backlog and an older research link were updated with the renames. Tool profiles carry the refreshed check date and inspected version.

Unsupported implementation details were removed or narrowed: automatic memory consolidation, silent instruction overflow, a Codex keyboard shortcut, universal negative feature claims and legacy-session usage inference. TDD remains a workflow choice without the unsupported living-page attribution. Historical author acknowledgements and terminology attributions remain attributed statements rather than freshly authenticated evidence.

Validation: `mise run check` passed; the multilingual build generated 43 pages per locale. Changed memory, toolkit, glossary and cleanup diagrams were inspected in light and dark palettes for all three languages. Locale file sets, navigation and external-source inventories match; inline relative-link targets exist. The original audit and evidence below describe the pre-correction snapshot. The translation metadata is refreshed after committing the corrected canonical text. No push or deployment is part of this follow-up.

## Original audit

Audited book revision: `8becaab8d5612db01fbe467d142cf34eaae6f274`. The Russian edition is canonical. All 44 Russian Markdown files were covered; corresponding factual passages, commands, URLs and artifact names in English and Spanish were compared. The total inventory is 132 locale files plus `book/README.md` and `book/LANGS.md`. This is a factual currency audit, not an editorial rewrite or an empirical validation of every proposed practice. No chapters, translation revisions or `checked_on` values were changed.

The conceptual patterns retain support in the consulted sources. The main corrections concern current product behavior, toolkit workflows and installation prerequisites. The September check dates correctly identify historical snapshots, but instructions installing `@latest` and present-tense descriptions now require an update. An old version number alone was not counted as an error.

## Evidence files

- [Toolkits and derived patterns](currency-audit-tools-2026-10-31.md): versioned OpenSpec and Superpowers releases; pinned Matt Pocock sources; exact locations and corrections.
- [Claude Code and Anthropic](currency-audit-claude-2026-10-31.md): commands, memory, discovery, schedules, independent review and source qualifications.
- [Codex and OpenAI](currency-audit-codex-2026-10-31.md): permissions, schedules, review, memory, configuration and unresolved details.
- [External-link inventory](currency-audit-links-2026-10-31.json): all 97 unique URLs, their locations, GET outcomes and redirects. Availability does not establish the truth of a page's contents.

## Confirmed corrections

P1 means the stated prerequisite or advertised workflow can send a reader down an incompatible or unavailable path. P2 means a factual overstatement or stale convention should be corrected. These are editorial priorities, not security-vulnerability scores. Identifiers refer to the companion reports.

| ID | Priority | Canonical location | What needs to change | Primary evidence |
| --- | --- | --- | --- | --- |
| T1 | P1 | `book/ru/openspec.md:20` | Node >=20.19 is incompatible with the current npm prerequisite. OpenSpec v1.16.0, released October 30, requires >=22.12.0. The book installs `@latest`. Explain the npm floor and optionally the standalone installation. | [Released breaking change](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.16.0), [versioned engines](https://github.com/Fission-AI/OpenSpec/blob/v1.16.0/package.json). |
| T2 | P1 | `book/ru/superpowers.md:28`, `:32`, `:45`, `:55`, `:73`, `:77` | The spike/bounded/architectural table and diagram describe an obsolete workflow. Current released brainstorming uses short/full written designs, approval and planning, with explicit exceptions. Refresh the artifact and review descriptions together. | [v7.0.1 brainstorming](https://github.com/obra/superpowers/blob/v7.0.1/skills/brainstorming/SKILL.md). |
| T3 | P2 | `book/ru/matt-pocock-skills.md:24`, `:65`; `let-claude-interview-you.md:129`; `domain-context-file.md:104` | The current domain-modeling convention is GLOSSARY.md / GLOSSARY-MAP.md. CONTEXT.md / CONTEXT-MAP.md are legacy names. Update claims about the skill; a team may still choose another filename for its own glossary. | [Pinned domain-modeling source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/domain-modeling/SKILL.md). |
| T5 | P1 | `book/ru/isolated-parallel-work.md:135` | resolving-merge-conflicts was removed from the plugin, not moved to another active skill. Retain the intent-based merge practice, but remove the current-skill recommendation or label its archived implementation historical. | [Upstream archive and removal notice](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/engineering/resolving-merge-conflicts.md). |
| T6 | P2 | `book/ru/scheduled-maintenance.md:101` | retro is now an engineering skill, not in-progress; its old URL returns 404. The manual invocation and recommendation-only behavior remain accurate. | [Current retro source](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/retro/SKILL.md). |
| CC-1 | P2 | `book/ru/scheduled-maintenance.md:97`, `:317` | “Claude sees no skills outside .claude/skills” is too broad. Distinguish the repository-directory convention from personal, enterprise, plugin and synced skill sources. | [Skill locations](https://code.claude.com/docs/en/skills#choose-where-skills-load). |
| CC-2 | P2 | `book/ru/scheduled-maintenance.md:239`, also `:61`, `:93` | A scheduled run does not invariably create a PR. Output depends on the task; branch defaults also have exceptions. Make PR creation part of the intended maintenance task. | [Scheduled runs and outputs](https://code.claude.com/docs/en/routines#view-and-interact-with-runs). |
| CC-3 | P2 | `book/ru/scheduled-maintenance.md:233` | The blanket statement that everything except /schedule runs locally excludes current cloud review modes. Scope the statement to the local examples being shown. | [Commands, including cloud review](https://code.claude.com/docs/en/commands). |
| C1 | P2 | `book/ru/scheduled-maintenance.md:411` | .rules are presented as the permissions model. Explain the sandbox and approval controls first; command rules govern execution outside that boundary. | [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules), [sandbox](https://learn.chatgpt.com/docs/sandboxing). |
| C2 | P2 | `book/ru/scheduled-maintenance.md:413` | A one-time approval is not the same as accepting a persistent command-prefix allowance. Only the latter should be described as writing an allow rule. | [Creating rules](https://learn.chatgpt.com/docs/agent-configuration/rules). |
| R1 | P2 | `book/ru/resources.md:20`; `book/en/resources.md:24`; `book/es/resources.md:24` | Traycer is described as working in VS Code. The publisher retires the IDE extension on October 31, 2026 and directs users to Traycer Desktop. Update the product description and link the migration notice. | [Official retirement notice](https://docs.traycer.ai/extension), corroborated by the publisher's extension README in Open VSX v2.16.10. |

Except for R1's differing line numbers, the corresponding main finding passages are at the same lines in the other locales, as recorded in the companion reports. Findings should be fixed in all three editions; translation freshness alone does not detect shared stale facts.

## Useful qualifications, without claiming commands are broken

1. **T4 — Managed installation:** `matt-pocock-skills.md:18` and `:78` should acknowledge managed Codex and Copilot plugins alongside Claude. The existing editable-install option remains supported. Use the fully qualified installation command from the [pinned upstream README](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/README.md).
2. **CC-4 — Skill diagnostics:** `scheduled-maintenance.md:315` and `:317` should state /skill-doctor's availability and reporting scope. Its version threshold is correct, but feature-flag fetching is required, some skill categories are excluded, and Remote Control cannot invoke it. See [skill diagnostics](https://code.claude.com/docs/en/skills#find-unused-skills).
3. **CC-5 — Shared project instructions:** `claude-md-memory.md:99` and `:101` should introduce native AGENTS.md loading before symlink/import compatibility recipes. CLAUDE.md precedence matters. The existing recipes still work. See [native discovery](https://code.claude.com/docs/en/memory#agentsmd).
4. **CC-6 — Independent reviewers:** `writer-reviewer.md:98` asks for fresh context, which remains sound. Clarify that a forked subagent inherits history and does not satisfy that requirement automatically; use a separate session or a non-fork reviewer. See [subagent forks](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation).
5. **C3 — Scheduling surfaces:** `scheduled-maintenance.md:347` and `:349` describe a valid local-project task. Label that scope explicitly because web/Work scheduled tasks also exist; the computer-on requirement belongs to local tasks. See [scheduled tasks](https://learn.chatgpt.com/docs/automations).
6. **C4 — Security Review prerequisites:** `scheduled-maintenance.md:397` and `:402` use a valid trigger, but require access and repository setup. The currently documented plans are Enterprise, Business, Edu and Pro; Plus is excluded. Prefer a dated setup link over a universal promise that a comment alone starts a review. See [Security Review](https://learn.chatgpt.com/docs/security/security-review).

Other optional updates include OpenSpec's /opsx:update, canonical redirect targets and direct links for the mechanism actually described. A selective book does not need to mention every new feature.

## Evidence gaps to resolve before making stronger claims

- `scheduled-maintenance.md:283`: autoDreamEnabled exists in the installed Claude binary, but public documentation does not establish the full contradiction-marking promise or universal availability. Do not call it removed; narrow or version-source the behavior (CC-7).
- `tdd-with-agent.md:124`: the current living Claude best-practices page no longer establishes the precise freeze-tests/overfitting sequence attributed to it. Preserve the practice, but add a historical or dedicated source (CC-8). The interview and independent-review advice still have current support.
- `scheduled-maintenance.md:443`: the absolute statement that overflowing AGENTS.md files disappear without a warning was not verified. Official descriptions of the 32 KiB cap also differ on combined versus per-file wording. Keep the documented default and test the exact-release behavior before describing a precise overflow algorithm.
- `context-forking.md:125`: Codex double-Escape editing was not independently reproduced; absence from a documentation index is not evidence of removal. Its /fork, /side and /worktree commands were confirmed.
- Historical X attributions in `agents-md-phrases`, `skills-as-packaged-workflows` and the original Karpathy terminology were not independently recovered as readable primary posts. Successful HTTP responses from X are not enough to authenticate their contents. No contrary evidence was established.
- Author/support acknowledgements are treated as the book author's statements, not externally audited contractual relationships. Hexlet's practice/project/mentor description matches its public site. Praxor's URL is reachable, but its full service description was not independently established through a readable fetched page.
- No statistics or productivity gains were inferred from the worked examples. Cadences, recommended file sizes and suggested task counts are workflow choices, not experimentally validated universal thresholds.

## Mechanical and executable checks

| Check | Result |
| --- | --- |
| Locale file sets | 44 Markdown files in each locale; no missing or extra slug. |
| SUMMARY link sequence | Identical between RU, EN and ES. |
| Translation metadata | All 42 files per translation with source_rev have no Russian source change relative to that revision. SUMMARY and candidates intentionally have no such field. This checks source consistency, not translation quality or external currency. |
| External URL sets | Identical for every corresponding chapter in the three locales. |
| Relative file targets | No missing target found by Markdown inline-link extraction. Anchor validity was not exhaustively checked. |
| Candidate inventories | All three reader-facing lists contain the same 22 candidate slugs as current CANDIDATES.md candidate rows. Public issue URLs were reachable; editorial decisions were checked against the local authoritative backlog. |
| External HTTP sweep | 97 unique URLs: 94 returned 200 after redirects; 2 returned 404 (T5/T6); 1 returned 403 to the automated reader. The 403 URL, OpenAI Harness engineering, was successfully opened through the web tool and is not classified as broken. |
| Cache debugging fixture | shared/reverse fail with exit 1; bypass/distinct/fixed pass with exit 0; displayed values match the chapter. |
| Workflow grader example | Python example prints trial 1 PASS and trial 2 FAIL, as shown. |
| Git guardrail example | In an isolated temporary Git repository, exits 0 without staged migrations and 1 after staging db/migrations/001.sql. No user repository was committed. |
| Agent command surfaces | Read-only CLI help/version checks confirmed the listed review/diagnostic interfaces. No paid agent execution, cloud schedule or external review was started. |

## Chapter coverage

Every row refers to the canonical file and matching translated factual passages. “No material drift found” is limited to the statements and sources inspected; it is not proof that a practice always works.

| Slug | Outcome / evidence route |
| --- | --- |
| README | Author acknowledgements retained with evidence limit above; Hexlet description checked. |
| SUMMARY | Matching locale navigation and existing targets. |
| agent-workflow-evals | No material drift found; Anthropic eval definitions and SWE-bench checked; inline Python reproduced. |
| agents-md-phrases | Scoped recommendations remain qualified; historical attribution limit above. |
| bloated-claude-md | No material drift found in the scoped-memory principle; diagnostic example is illustrative. |
| candidates | 22 current backlog candidates match across locales. |
| claude-md-memory | CC-5; Claude/Codex discovery and toolkit context reviewed. |
| context-engineering | Core principles remain supported; CC-6 qualifies subagent independence. |
| context-forking | Commands confirmed; Codex keyboard detail remains unverified. |
| design-it-twice | No material drift found; Stanford and pinned skill sources checked. |
| domain-context-file | T3; generic glossary/ADR practice remains valid. |
| executable-guardrails | No material drift found; GitHub hooks reference and Anthropic sandboxing checked; Git example reproduced. |
| explore-plan-code-commit | No material drift found in four-phase convention; CC-6 reviewer caveat. |
| feature-list-harness | Matches the cited historical Anthropic harness; no current universal model-limit claim inferred. |
| give-agent-a-way-to-verify | No material drift found; primary best practices and harness evidence remain relevant. |
| glossary | Definitions checked for consistency with the book; conventional terminology, not product API claims. |
| grilling | No material drift found against current pinned upstream. |
| handoff | No material drift found; compaction and external notes checked. |
| how-to-read | Current structure and chapter/file types agree; tool instructions inherit the findings above. |
| hypothesis-driven-debugging | No material drift found; skill source checked and all fixture modes reproduced. |
| isolated-parallel-work | T5; Git worktree semantics and historical compiler example confirmed. |
| let-claude-interview-you | T3 and a narrower living-page attribution caveat; current interview practice retained. |
| matt-pocock-skills | T3/T4. |
| one-feature-at-a-time | No material drift found; historical harness and upstream implementation checked. |
| one-shotting | No time-sensitive contradiction found; framed as accepting an unverified first result. |
| openspec | T1; optional expanded command coverage. |
| preface | No current-version assertion; provenance and acknowledgements retained with limits. |
| premature-specification | No time-sensitive contradiction found; advice includes mandatory constraints and compatibility exceptions. |
| premature-success | No time-sensitive contradiction found; distinguishes unit-level success from the required scenario. |
| progress-file | Matches cited historical harness; current memory features do not invalidate repository logs. |
| prototype-to-answer | No material drift found against pinned prototype source. |
| reflection | Reflexion, Constitutional AI and evaluator-optimizer descriptions checked against primary sources; no efficacy guarantee inferred. |
| reproducible-agent-bootstrap | No product-currency defect found; Make snippet explicitly labeled a skeleton, not a complete runnable service. |
| resources | R1; Spec Kitty redirect and all link targets inspected. Tessl still has an SDD tile despite changed homepage positioning. |
| scheduled-maintenance | T6, CC-1–CC-4, C1–C4; additional evidence qualifications above. |
| skills-as-packaged-workflows | Current skill packaging/lazy loading retained; historical X attribution limit. |
| spec-driven-development | Generic spec/plan/tasks model remains a supported workflow; toolkit specifics inherit updates above. |
| superpowers | T2. |
| tdd-with-agent | Practice remains valid; living source attribution needs CC-8. |
| tracer-bullet-tickets | No material drift found against pinned to-tickets. |
| triage-state-machine | No material drift found against pinned triage. |
| vibe-coding | Conditional risk-based advice remains coherent; original primary-post attribution not freshly authenticated. |
| wayfinder | No material drift found in the described default planning workflow. |
| writer-reviewer | CC-6; current built-in and cross-tool review commands confirmed. |

## Additional primary sources consulted

- [Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) supports the historical initializer, feature registry, progress-log and baseline-check examples.
- [Demystifying evals](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) and [SWE-bench evaluation](https://www.swebench.com/SWE-bench/guides/evaluation/) support the eval vocabulary and outcome-based benchmark description.
- [Effective context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents), [Building effective agents](https://www.anthropic.com/research/building-effective-agents), [Reflexion](https://arxiv.org/abs/2303.11366) and [Constitutional AI](https://arxiv.org/abs/2212.08073) support the limited conceptual attributions, not guaranteed gains from a self-critique prompt.
- [Git worktree](https://git-scm.com/docs/git-worktree), [Copilot hooks](https://docs.github.com/en/copilot/concepts/customizations/hooks) and [C compiler experiment](https://www.anthropic.com/research/building-c-compiler) support the isolation and guardrail descriptions.
- [OpenAI's cross-tool review plugin](https://github.com/openai/codex-plugin-cc) still documents /codex:review and /codex:adversarial-review. [Harness engineering](https://openai.com/index/harness-engineering/) remains a historical experiment, not automatic housekeeping in every Codex installation.
- [Kiro specs](https://kiro.dev/docs/specs/), [Tessl's SDD tile](https://tessl.io/registry/tessl-labs/spec-driven-development), [Spec Kitty](https://github.com/spec-kitty/spec-kitty), [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin), [HumanLayer](https://github.com/humanlayer/humanlayer), [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) and [GSD](https://github.com/gsd-build/get-shit-done) were inspected for the short resource descriptions. No new tool recommendation follows merely from its presence in this list.

## Delivery status and limits

The output is local research notes and a link inventory. Book text and tool check dates remain unchanged. No commit, push or publication was requested or performed by this audit. Concurrent CI, Dependabot and mise changes were left untouched. A final recovery check found HEAD had advanced to `8888fc8017af38b02e1a1ae34dfd50ba98ff4234`; its book tree is identical to the audited revision, and there are no working-tree book changes.

This audit did not run every workflow, install every toolkit, assess paid-plan access using a live account, exhaustively validate rendered diagrams/anchors, or repeat experiments claimed by historical authors. Those limits do not turn unavailable evidence into a confirmed defect. Follow-up editing should address the confirmed corrections first, update the corresponding translations, and only then advance each tool profile's checked date after rechecking its final instructions.
