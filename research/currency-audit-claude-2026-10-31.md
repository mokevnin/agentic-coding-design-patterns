# Book currency audit: Claude Code and Anthropic

Checked on 2026-10-31. Scope: Claude Code and Anthropic claims in `book/ru`, with matching tool passages in `book/en` and `book/es`. This report changes no book text. Local read-only checks returned Claude Code **2.1.316**; the maintenance chapter records a **2.1.283 / 2026-09-26** snapshot. An older checked version alone is not a factual defect. Current documentation was opened, rather than relying on search snippets.

## Findings requiring correction

### CC-1 — Skill discovery is described too narrowly

Priority: P2. Confirmed factual overstatement, present in all three editions.

Locations: `book/ru/scheduled-maintenance.md:317`, `book/en/scheduled-maintenance.md:317`, `book/es/scheduled-maintenance.md:317`; related setup wording at line 97 in each edition.

The text says Claude Code cannot see skills outside `.claude/skills`. [The skills reference](https://code.claude.com/docs/en/skills#choose-where-skills-load) also lists personal, enterprise, plugin and account-synced sources, plus legacy `.claude/commands`. Symlinks remain supported. Keep the narrower advice that a bare repository `.agents/skills` directory is not a documented Claude discovery location; remove the universal claim. Installation through a plugin is already a valid alternative described elsewhere in the book.

### CC-2 — Scheduled-task output is presented as a guaranteed PR

Priority: P2. Confirmed overgeneralization, all editions.

Locations: `book/{ru,en,es}/scheduled-maintenance.md:239`, with the same expectation in the general description at lines 61 and 93.

[Scheduled-task documentation](https://code.claude.com/docs/en/routines#view-and-interact-with-runs) supports reviewing a run and creating a PR; tasks can instead produce comments, summaries or other outputs. Specify PR creation in the task prompt when it is required. The default branch and `claude/` prefix are defaults that prompts can override; a PR-triggered run can start at the PR head. Qualify “each run” accordingly. The schedule itself does not guarantee the requested work succeeded.

### CC-3 — Local-only wording no longer covers every documented review mode

Priority: P2. Confirmed scope overstatement, all editions.

Locations: `book/{ru,en,es}/scheduled-maintenance.md:233`, versus the review subsection at line 249.

The claim that everything except `/schedule` runs locally conflicts with the current [command reference](https://code.claude.com/docs/en/commands): `/code-review ultra` invokes cloud review. Narrow the statement to the local modes actually shown. Ordinary `/review` remains an alias and the documented alias escape from a same-named project skill remains valid.

### CC-4 — `/skill-doctor` needs its availability conditions

Priority: P2. Incomplete operational guidance, all editions.

Locations: `book/{ru,en,es}/scheduled-maintenance.md:315` and `:317`.

The version threshold is correct. However, the [skills reference](https://code.claude.com/docs/en/skills#find-unused-skills) says the report requires feature-flag fetching, excludes bundled and enterprise skills, and cannot be requested over Remote Control. Replace “for every skill” with the actual scope and add the conditions needed to reproduce the example.

## Material updates and evidence limits

### CC-5 — Native AGENTS.md support should precede the compatibility workaround

Priority: P2 for usability; existing commands are still valid.

Locations: `book/{ru,en,es}/claude-md-memory.md:99` and `:101`; related diagram at line 52.

[Current memory documentation](https://code.claude.com/docs/en/memory#agentsmd) documents native `AGENTS.md` loading since v2.1.277. By default it loads only when no relevant project `CLAUDE.md` or `CLAUDE.local.md` takes precedence; a configurable mode loads both. Explain this before symlink/import compatibility options. The existing `@AGENTS.md` and symlink recipes still work, so this is an incomplete current model, not a broken command.

### CC-6 — A separate subagent window does not necessarily provide independent history

Priority: P2 operational clarification; the pattern already asks for fresh context.

Locations: `book/{ru,en,es}/writer-reviewer.md:98`; related claims at `context-engineering.md:131` and `explore-plan-code-commit.md:95`.

[Current subagent documentation](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation) distinguishes non-fork workers from forks that inherit the entire conversation. Fork mode is enabled by default, including all relevant interactive surfaces since v2.1.302. For independent review, explicitly use a fresh separate session or a non-fork reviewer definition. Do not count a fork as satisfying the book's “fresh context” requirement merely because it has another window. The separate-session recipe remains sound.

### CC-7 — autoDreamEnabled exists locally, but the public documentation does not establish the full promise

Priority: evidence gap, not a confirmed removed feature.

Locations: `book/{ru,en,es}/scheduled-maintenance.md:283`.

The [memory page](https://code.claude.com/docs/en/memory) supports the default storage path and `/memory` controls. Neither it nor the [full settings reference](https://code.claude.com/docs/en/settings-reference) currently documents `autoDreamEnabled` or the promised contradiction-marking behavior. Read-only inspection of the installed 2.1.316 binary did find this key, its background-consolidation setting description, and a server-side availability gate. Therefore **do not report the feature as removed**. Cite a versioned implementation/source for the exact behavior or remove the unsupported detailed promise; describe availability as conditional. No consolidation was run.

### CC-8 — Some “best practices” attributions now point to a rewritten living page

Priority: P3 source maintenance, not evidence that TDD ceased to work.

Locations: `book/{ru,en,es}/tdd-with-agent.md:124`; also verify the wording at `writer-reviewer.md:126` and `let-claude-interview-you.md:127`.

The [current best-practices page](https://code.claude.com/docs/en/best-practices) retains interview-to-`SPEC.md` and independent review advice. It no longer establishes the particular TDD sequence of freezing tests and checking implementation overfitting attributed to it. Use a dated historical source or a dedicated current source for that sequence. The same page now explicitly treats aggressive context-window management as older advice for current Claude models; the book's qualified context-cost and noise arguments remain compatible, but should not be sold as mandatory window housekeeping on every task.

### CC-9 — Security-review link now lands on another mechanism

Priority: P3 source maintenance.

Location: `book/{ru,en,es}/scheduled-maintenance.md:271`.

[The linked security-guidance page](https://code.claude.com/docs/en/security-guidance) describes an installed plugin performing checks during work. The on-demand `/security-review` command still exists and is described in the [command reference](https://code.claude.com/docs/en/commands). Point the command's documentation link there, and identify the plugin as a separate mechanism if mentioned. Do not classify the command as removed.

## Coverage and claims retained

Each entry below was checked for Claude/Anthropic claims in RU and matching EN/ES passages. “Retained” means no contrary evidence was found for the specific claim, not an empirical guarantee that the workflow improves every task.

| Chapter | Result and evidence |
| --- | --- |
| `scheduled-maintenance` | CC-1 through CC-4, CC-7 and CC-9. `/schedule`/`/routines`, four-agent `/simplify`, `/doctor` as a bundled skill, `/security-review` branch diff, `/run-skill-generator` and `/review` alias behavior remain documented in the command and skills references. |
| `claude-md-memory` | CC-5. `/init`, `@` imports, `.claude/rules` and path scoping remain documented in the memory reference. |
| `context-forking` | `/rewind`, double Esc on an empty input, code/conversation restore choices, `/branch`, and `--continue --fork-session` retained. [Checkpointing](https://code.claude.com/docs/en/checkpointing) and [CLI reference](https://code.claude.com/docs/en/cli-reference) confirm these. |
| `context-engineering` | Minimum useful context, compaction, notes and subagent result summaries retained against [context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents); CC-6 qualifies independence. |
| `handoff` | Focus instructions for `/compact` and continuity within the current session retained; supported by command/checkpoint references. |
| `reflection` | Evaluator-optimizer retained against [Building effective agents](https://www.anthropic.com/research/building-effective-agents). This is an architectural example, not a claim about a current Claude command. |
| `isolated-parallel-work` | Separate worktrees retained against current best practices. Container/clone/task-lock historical example matches [C compiler experiment](https://www.anthropic.com/research/building-c-compiler). |
| `explore-plan-code-commit` | Claude planning mode retained; independent plan review needs CC-6. The four-stage process is an editorial workflow, not an automatic Claude guarantee. |
| `reproducible-agent-bootstrap` | Initializer, `init.sh` and baseline verification retained against [Effective harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents). |
| `writer-reviewer` | Independent session review remains supported; CC-6 and CC-8. OpenAI plugin details belong to the separate Codex audit. |
| `agent-workflow-evals` | Task/trial/transcript/outcome/grader/harness distinctions and regression-history example match [Demystifying evals](https://www.anthropic.com/research/demystifying-evals-for-ai-agents). |
| `skills-as-packaged-workflows` | `SKILL.md`, deferred body loading, `/name` and `disable-model-invocation` retained against the skills reference. The X post about authoring philosophy was not independently retrieved; do not count that attribution as freshly verified. |
| `executable-guardrails` | OS filesystem/network boundaries and subprocess coverage match [sandboxing article](https://www.anthropic.com/research/claude-code-sandboxing). No claim of perfect security is validated. |
| `bloated-claude-md` | Scoped rules and hooks remain documented; shortening to the illustrated line count is an example, not a product limit. |
| `domain-context-file` | `@CONTEXT.md` import retained against memory documentation. |
| `progress-file` | `claude-progress.txt`, Git history and file-based handover match the Effective harnesses historical example. |
| `feature-list-harness` | Feature registry and browser verification match the same historical example. |
| `one-feature-at-a-time` | Selected-feature restriction matches that historical harness, not an inherent current model limitation. |
| `give-agent-a-way-to-verify` | External checks and baseline smoke tests retained against best practices and Effective harnesses. |
| `tdd-with-agent` | Workflow not disproven; specific source attribution needs CC-8. |
| `let-claude-interview-you` | Interview, saved spec and fresh implementation session retained in current best practices. |
| `resources` | Official best-practices link still resolves. Community collections are indexes rather than authority for tool behavior. |
| `preface` | Broad source-provenance statement has no current tool-version promise. |
| `openspec`, `superpowers`, `matt-pocock-skills` | Claude integration mentions identified; third-party installation/workflow details assigned to the separate toolkit audit. |

Additional primary checks: [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) still supports external persistent notes; [multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system) supports the historical coordinator/subagent summary example. The session-management article [still resolves](https://claude.com/resources/articles/using-claude-code-session-management-and-1m-context) and supports rewind, focused compaction and handoff advice. Several `/engineering/` URLs redirect successfully to `/research/`; these redirects are not broken links.

## Limits

This was a documentation and local read-only audit, not a paid end-to-end run of every slash command. No tasks, schedules, reviews, memory updates or permission changes were created. Account, plan, provider, feature flags and organization policy may further limit commands. The audit does not assert a complete list of every new Claude feature, and does not treat a missing new feature as a book defect by itself. Generic pattern effectiveness requires task-specific evaluation; historical examples remain historical even when newer models need less scaffolding.
