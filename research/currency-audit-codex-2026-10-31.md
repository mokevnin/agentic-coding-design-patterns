# Codex and OpenAI currency audit — 2026-10-31

Scope: explicit Codex/OpenAI claims in every Markdown file under `book/ru`, `book/en`, and `book/es`, plus a full contextual read of the requested context, maintenance, isolation, workflow, and bootstrap chapters. This is a documentation audit, not an execution test of paid services. Book content was not changed. Paths below use the canonical Russian edition; the same maintenance paragraphs and line numbers occur in English and Spanish unless stated otherwise.

Evidence date is the session date, 2026-10-31. The installed CLI reports `codex-cli 0.166.0`; the book explicitly records a 0.156.1 check on 2026-09-26. An older check date is not, by itself, a factual defect. Official pages were opened, not merely found in search. Several old `developers.openai.com/codex/...` URLs redirect to `learn.chatgpt.com/docs/...`.

## Findings requiring correction or qualification

### C1 — Explain the sandbox boundary before command rules

- **Priority:** P1, misleading permissions model; not established to be a recent regression.
- **Locations:** `book/ru/scheduled-maintenance.md:411`, `book/en/scheduled-maintenance.md:411`, `book/es/scheduled-maintenance.md:411`.
- **Book claim:** permissions in Codex are set by command execution rules.
- **Verified:** `.rules` govern command execution outside the sandbox. The sandbox, approval policy, and approval reviewer are separate controls. Actions already permitted inside the sandbox need no escalation review.
- **Impact:** the current paragraph can be read as a complete description of the permission boundary. Readers may incorrectly expect a command rule to provide general filesystem confinement.
- **Correction:** introduce `sandbox_mode`, `approval_policy`, and, where applicable, `approvals_reviewer`; then explain `.rules` as exceptions/decisions for commands outside that boundary. Keep the existing strictest-match rule and trusted project-layer explanation.
- **Sources:** [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules), [Sandbox](https://learn.chatgpt.com/docs/sandboxing).

### C2 — Distinguish one-time approval from adding a persistent allow rule

- **Priority:** P2, overbroad behavioral claim.
- **Locations:** `book/{ru,en,es}/scheduled-maintenance.md:413`.
- **Book claim:** every TUI “allow” appends a rule to `~/.codex/rules/default.rules`.
- **Verified:** documentation says that adding a command to the allow list writes to that file; accepting an approval once and accepting a proposed prefix rule are different choices.
- **Correction:** say that accepting a persistent command-prefix allowance writes a user-layer rule. Do not describe every one-time permission decision as persistent.
- **Source:** [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules), “Create a rules file”.

### C3 — Refresh the scheduled-task product scope

- **Priority:** P2, incomplete current product description; local workflow remains valid.
- **Locations:** `book/{ru,en,es}/scheduled-maintenance.md:347`, `:349`.
- **Book claim:** scheduled tasks are an app feature, with the computer and app running.
- **Verified:** local project/worktree tasks still require the machine and desktop app. Scheduled tasks can also be created and managed from ChatGPT/Work on the web when enabled; those tasks use accessible uploads, skills, plugins, and connected tools rather than a local folder. The desktop documentation now names the ChatGPT desktop app with Codex selected.
- **Correction:** explicitly label the existing instructions as the local-project variant. Add the web variant and its lack of direct local-folder access if describing scheduling generally. Avoid applying the machine-on requirement to every scheduled task. The GitHub Action alternative remains useful.
- **Source:** [Scheduled tasks](https://learn.chatgpt.com/docs/automations), “Where scheduled tasks run” and local-project sections.

### C4 — State the prerequisites for Security Review

- **Priority:** P2, practical setup omission, not a broken command.
- **Locations:** `book/{ru,en,es}/scheduled-maintenance.md:397` and `:402`.
- **Book claim:** a PR comment containing `@codex security review` starts the review.
- **Verified:** the trigger and Security Report tab are still documented. Access and repository setup are prerequisites; the current feature is available to Enterprise, Business, Edu, and Pro customers and is unavailable on Plus. Workspace access and a connected cloud repository are required.
- **Correction:** precede the example with a short access/setup condition and link the dedicated Security Review setup page. A comment alone is insufficient in an unconfigured repository. State plan availability as dated information if listing it explicitly.
- **Sources:** [Security Review](https://learn.chatgpt.com/docs/security/security-review), [GitHub integration](https://learn.chatgpt.com/docs/third-party/github).

## Confirmed current; do not remove as obsolete

| Book locations | Checked assertion | Evidence |
| --- | --- | --- |
| `context-engineering.md:133`; `context-forking.md:125`, all locales | `/compact`, `/fork`, `/side`, and `/worktree` exist. Fork copies the chat; side is a temporary separate chat; worktree can continue the current conversation in an isolated checkout. | [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli). |
| `scheduled-maintenance.md:385-392`; `writer-reviewer.md:128`, all locales | `codex review`, `/review`, branch/uncommitted/commit scopes. | Installed `codex review --help` lists `--base`, `--uncommitted`, `--commit`; [Code review](https://learn.chatgpt.com/docs/code-review) describes client-specific scopes. |
| `scheduled-maintenance.md:387`, all locales | Applicable `AGENTS.md` files supply review guidance; `## Code Review Rules` is the documented recommended section. GitHub review emphasizes P0/P1. | [GitHub integration](https://learn.chatgpt.com/docs/third-party/github). The heading is a convention, not evidence that other instructions are ignored. |
| `scheduled-maintenance.md:397`, all locales | `@codex security review` and Security Report tab. | [Security Review](https://learn.chatgpt.com/docs/security/security-review). See C4 for prerequisites. |
| `scheduled-maintenance.md:407`, all locales | Memories off by default, generated local state in `~/.codex/memories/`, `memories.generate_memories` controls generation. | [Memories](https://learn.chatgpt.com/docs/customization/memories). `/memories` now supplies a chat control surface; adding it would improve practicality but the current config instruction remains valid. |
| `scheduled-maintenance.md:413-422`, all locales | Prefix syntax, strictest matching decision, user and trusted project rule layers, `codex execpolicy check --pretty --rules ... -- ...`. | [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules); installed `codex execpolicy check --help`. See C1/C2 for qualifications. |
| `scheduled-maintenance.md:425-436`, all locales | `codex doctor` is real; the installation/config/auth/runtime/Git/terminal diagnostic is supported. | Installed CLI help; [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli). |
| `scheduled-maintenance.md:441`, all locales | Default `project_doc_max_bytes` is 32 KiB. | [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md). See unresolved caveat below. |
| `scheduled-maintenance.md:453-455`, all locales | `.agents/skills` is scanned; skills can be disabled with `[[skills.config]]` and `enabled = false`. | [Build skills](https://learn.chatgpt.com/docs/build-skills). Restart after config changes is documented. |
| `skills-as-packaged-workflows.md:146`, all locales | `$skill-creator`, one-job skills, deriving a skill from a working process. | [Best practices](https://learn.chatgpt.com/guides/best-practices), “Turn repeatable work into skills”. |
| `scheduled-maintenance.md:347-380`, all locales | `openai/codex-action@v1`, `openai-api-key`, `prompt-file`, GitHub event triggers, and `codex exec`. | [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action). No actual CI run or PR creation was performed. |
| `scheduled-maintenance.md:467`, all locales | Local environments can provide worktree setup scripts and actions for starting servers/tests. | [Local environments](https://learn.chatgpt.com/docs/environments/local-environment). |
| `resources.md:32`, all locales | The linked OpenAI best-practice guide remains accessible and covers tasks, project instructions, skills, and reviews. | [Best practices](https://learn.chatgpt.com/guides/best-practices). |
| `writer-reviewer.md:127`, all locales | `/codex:review` handles uncommitted changes or a base-branch comparison; `/codex:adversarial-review` also challenges design choices. | Parent auditor independently opened the [official plugin README](https://github.com/openai/codex-plugin-cc), command descriptions at rendered lines 246–278. |

## Evidence limits and unresolved points

1. `scheduled-maintenance.md:443` says the instruction cap silently drops later files. The current [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md) describes a combined cap and root-to-working-directory order, but does not establish the absence of every warning. The linked [Advanced Configuration](https://learn.chatgpt.com/docs/config-file/config-advanced) instead labels `project_doc_max_bytes` as a per-file quantity. These official descriptions conflict. Keep the 32 KiB default, remove the unsupported absolute “no warning,” and verify implementation behavior in the exact release before prescribing a precise overflow algorithm. This is an evidence gap, not a proven reverse behavior.
2. `context-forking.md:125` double-Escape editing was not established by the currently opened Developer commands page. Absence from that page does not prove removal. `/fork`, `/side`, and `/worktree` are confirmed independently; the key binding needs a terminal interaction or exact-release source check.
3. Negative claims “no equivalent of `/skill-doctor`” (`:453`) and “no run-skill generator” (`:467`) were not treated as proven simply because a command was absent from an index. No contradiction was found, but listing the supported current mechanism is more durable than universal negatives.
4. Estimating skill usage from `~/.codex/sessions` (`:455`) depends on retained logs and the local session backend. The installed CLI now exposes `migrate-rollouts` and a shared app-server. An absence from legacy JSONL must not be treated as proof that a skill was unused. No private session contents were read in this audit.
5. `scheduled-maintenance.md:349` hardcodes unattended operation to `approval_policy = "never"`. The current scheduling page confirms unattended operation and default sandbox settings but does not expose that implementation constant. Retain the behavior, avoid promising the literal internal setting unless checked in the exact app release.
6. `$openspec-propose`, Superpowers compatibility, and community catalogs require their owning upstream sources. They are included in the book-wide explicit-mention inventory and assigned to the companion upstream audit, rather than being judged from OpenAI documentation alone. The parent auditor separately verified `codex-plugin-cc`; its stated commands are current.
7. The first-party historical Harness engineering article (`scheduled-maintenance.md:491`) is a report about an experiment, not a claim that every current Codex installation automatically creates housekeeping PRs. It should remain attributed. This sub-audit did not independently re-fetch that `openai.com` article because the applicable OpenAI Docs skill limits browsing to its designated documentation domains; the parent auditor successfully opened it through web despite an HTTP 403 from a separate Python URL checker.

## Coverage

| Canonical chapter / group | Coverage and outcome |
| --- | --- |
| `scheduled-maintenance` | Full chapter context and every explicit Codex subsection reviewed; C1–C4 and evidence caveats above. EN/ES corresponding assertions compared directly. Claude-only commands are handled by the companion audit. |
| `claude-md-memory` | Full RU contextual read; Codex `AGENTS.md` convention compared across all locales and checked against the official guide. No Codex-specific contradiction found. Other agents' discovery semantics belong to their documentation. |
| `context-forking` | Full RU read and all-locale command comparison; commands confirmed, keyboard binding remains unverified. |
| `context-engineering` | Full RU read and all-locale Codex claim comparison; `/compact` and `/fork` current. General attention/context recommendations are conditional practices, not verified guarantees. |
| `handoff` | Full RU read. No explicit Codex product claim found; temporary-file handoff is a repository workflow convention. |
| `reflection` | Full RU read. No explicit Codex product claim found; no product-currency defect established. |
| `isolated-parallel-work` | Full RU contextual read. No Codex-specific command claim; Git worktree/isolation rationale does not depend on a Codex release. |
| `explore-plan-code-commit` | Full RU contextual read. No explicit Codex product claim; four-phase workflow remains a convention. |
| `reproducible-agent-bootstrap` | Full RU contextual read and all-locale agent-name/config sweep. No explicit Codex product claim requiring release correction. |
| `resources` | OpenAI official guide fetched; community repositories left to upstream/link sweep. |
| `writer-reviewer` | All explicit Codex command and plugin paragraphs compared in all locales; built-in review confirmed, plugin upstream delegated to parent audit. |
| `skills-as-packaged-workflows` | All explicit Codex helper/source assertions compared across locales and checked against official skills/best-practice pages. |
| `openspec`, `superpowers` | Codex mentions inventoried across locales; owning upstream evidence is covered by the companion tools audit. |
| Every other `book/{ru,en,es}/*.md` file | Searched for Codex, OpenAI, model identifiers, `$` skill calls, and forking/review/config commands. No additional explicit Codex product assertions were found beyond this inventory. This is a Codex sweep, not a full independent fact-check of every non-Codex source in those files. |

## Validation performed

Read-only local checks: `codex --version`, `codex --help`, `codex review --help`, and `codex execpolicy check --help`. No inference run, external comment, scheduled task, permission change, credential inspection, commit, or push was made. The CLI printed a PATH-alias write warning from the sandbox while still returning help successfully; this is not a book defect. No build is necessary for adding this research note because no book content or executable code changed.
