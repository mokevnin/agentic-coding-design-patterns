# Vendor article screening: Anthropic, Google, GitHub, Cursor

Checked on 2026-11-07 against the live official indexes and article bodies. This is the non-OpenAI portion of the vendor review. The main window is 2026-09-12 through 2026-11-07; it includes eight substantive articles published from September 16 to November 6. Publication dates below come from article headers, not search-engine crawl dates. No book chapters or candidate decisions are changed by this note.

The screening question is what changes how a reader works with a coding agent. Model launches, acquisitions, general AI infrastructure and product release announcements were screened out unless they supplied a concrete practice. These are vendor reports and demonstrations, not independent productivity studies. Product availability and instructions were not exercised end to end.

## Scope checked

| Vendor | Official entry point | Latest relevant material read | Coverage limit |
| --- | --- | --- | --- |
| Anthropic | [Engineering](https://www.anthropic.com/engineering) | November 6 memory article; October 13 source-control case study | Engineering index, not every Claude product announcement |
| Google | [Developers Blog](https://developers.googleblog.com/) | October 13 overnight optimization case study | Selected existing-codebase case study; broader agent-platform articles mostly concern building agents |
| GitHub | [AI & ML](https://github.blog/ai-and-ml/) | November 6 lifecycle guide; October 5 ReviewBench; September 16 migration | Selected engineering and workflow material, not every Copilot release |
| Cursor | [Blog](https://cursor.com/blog) | September 23 token-efficiency and rollout articles | October 20 SDK announcement concerns building integrations; October 29 marketplace security notice is an incident notice |

## Articles and book fit

### 1. Anthropic — The components of agent memory

Published **2026-11-06**. [Article](https://www.anthropic.com/research/components-of-agent-memory).

The article distinguishes session compaction from knowledge retained between sessions, separating transcripts, notes, derived representations and injected context. Offline passes can check notes against transcripts. Wikis sometimes outgrew their sources or offered no benefit over search. Rigid memory prescriptions reduced gains for stronger models in one benchmark.

Book inference: add evidence-linked correction to `bloated-agents-md` and `scheduled-maintenance`. Preserve the author’s `private-agent-memory` stance: gains do not establish shared, reproducible team knowledge or reviewed rules. Most examples are database, game or document tasks, not controlled coding-workflow trials. Dreaming does not automatically earn a chapter.

### 2. Anthropic — Redesigning source control at Anthropic

Published **2026-10-13**, updated **2026-10-15**. [Article](https://www.anthropic.com/research/redesigning-source-control).

Anthropic describes building Scion as agent-generated change volume strained source control, builds and CI. Review focused increasingly on intent and refusal of unnecessary additions. The team also assigned agents narrow operational areas with telemetry access. The article explicitly warns that this infrastructure fits extraordinary monorepo scale and an unusually large internal token budget. Its post-merge/pre-deploy testing design should not become generic advice to bypass pre-merge checks.

Book inference: useful supporting evidence for `reviewable-agent-delivery` and operational follow-up; it does not justify a source-control chapter or abandoning Git/worktrees. This source was already screened in `whats-new-2026-10-31.md`, so it is confirmation rather than a fresh discovery for the repository.

### 3. Google — Optimizing a 200,000-line Python codebase overnight with Gemini 4 Argon

Published **2026-10-13**. [Article](https://developers.googleblog.com/optimizing-a-200000-line-python-codebase-overnight-with-gemini-4-argon/).

Google reports an overnight ADK optimization run with repository skills and a persistent goal. The maintainer accepted two of six proposed optimizations; rejected changes included fragile state, dependence on private library internals and synthetic-only improvements. All public unit tests passing still missed internal tests that depended on patchable module attributes. The run compared baselines and delivered before/after evidence; human review determined what shipped.

Book inference: strong evidence for `benchmark-guided-optimization` and `reviewable-agent-delivery`; also reinforces skills and compatibility review. A holdout benchmark rejected complexity without end-to-end improvement. This selected case study changed multiple conditions between runs, so it does not isolate the effect of skills or goal mode. Elapsed runtime alone does not justify overnight autonomy.

### 4. GitHub — Beyond code generation: A developer’s guide to agentic engineering

Published **2026-11-06**. [Article](https://github.blog/ai-and-ml/github-copilot/beyond-code-generation-a-developers-guide-to-agentic-engineering/).

The guide organizes work as Plan, Build, Verify and Observe. Practices include scoped issues with acceptance criteria, isolated concurrent sessions, smaller dependent PRs and production investigation that yields an evidence-backed issue and regression test. It also describes shared repository memory and background memory maintenance; shared memory should not be conflated with the private local memory addressed by the book’s anti-pattern.

Book inference: most recommendations already map to `explore-plan-code-commit`, `tracer-bullet-tickets`, `isolated-parallel-work`, `quality-gates` and `hypothesis-driven-debugging`. The meaningful gap to discuss is explicit post-deployment verification and handoff to operational evidence. It could be an extension of the feedback loop rather than a new chapter. This is a vendor workflow guide; its third-party productivity figures were not independently verified here and should not be reused as established facts.

### 5. GitHub — ReviewBench: An open benchmark for AI code review

Published **2026-10-05**. [Article](https://github.blog/ai-and-ml/github-copilot/reviewbench-an-open-benchmark-for-ai-code-review/).

ReviewBench uses 219 public pull requests across 19 languages, with findings gathered from human review, follow-up commits, static analysis and several model families. Findings are deduplicated and evaluated under a published rubric; metrics distinguish matches to known issues from newly validated findings. The article reports expert validation and compares offline changes with production experiments.

Book inference: extend `agent-workflow-evals` with a reviewer example measuring missed defects and invalid comments by severity and task distribution. A fresh reviewer context alone does not establish quality. The benchmark favors substantive PRs and uses a model judge; it does not establish a universal winner. A small local set of representative PRs is the reader-scale adaptation.

### 6. GitHub — Migrating the GitHub Copilot runtime to Rust, using Copilot

Published **2026-09-16**, updated **2026-09-23**. [Article](https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/).

The migration shipped incrementally through 128 PRs. Existing end-to-end behavior tests ran against the replacement; the author stresses protecting those tests from silent changes by the implementing agent. Reported regressions included omitted behavior, language-semantic differences and wrong test oracles. The author recommends preserving behavior during translation and redesigning afterward, while humans own architecture, risk and merge decisions.

Book inference: add evidence to `give-agent-a-way-to-verify` and `quality-gates`, which already protect criteria. Oracle protection need not hide tests; separate ownership is another option. This supports `feedback-flywheel` and behavior recovery. A migration chapter would need a distinct workflow beyond existing patterns. The account acknowledges shipped regressions and lacks a controlled productivity comparison.

### 7. Cursor — Improved token efficiency for longer agent runs

Published **2026-09-23**. [Article](https://cursor.com/blog/improved-token-efficiency).

Cursor reports trimming obsolete system instructions, loading less-used tool definitions dynamically and reducing unnecessary subagent prompting. Subagents can isolate context but impose coordination costs; models may duplicate work. The team tested cost and behavior with production A/B experiments, noting that difficult offline evals need not represent everyday request distribution.

Book inference: evidence for `context-engineering`, `bloated-agents-md` and `agent-workflow-evals`: re-evaluate instructions as models improve, and measure behavior after deletion. Avoid turning implementation details of Cursor’s internal harness into user setup instructions. Its aggregate reported savings cannot be applied directly to an `AGENTS.md` edit in another tool. The current book already recommends removing rules the agent follows without reminders, so the novelty is stronger evidence and the distribution caveat, not a new pattern.

### 8. Cursor — Bots for the last mile: Rollouts, Security Review

Published **2026-09-23**. [Article](https://cursor.com/blog/rollouts-and-security-reviewer).

The rollout workflow creates a monitoring plan before merge: intended effects, risks and instrumentation gaps. After deployment it compares agreed signals with the earlier baseline. Responses depend on configuration and include notifying an author, pausing rollout or proposing a revert for approval. Some direct feature-flag actions were still described as forthcoming in this article.

Book inference: the transferable practice is an explicit production verification contract, not a requirement to use Cursor bots. Pair this with the November GitHub Observe section when discussing an extension to `give-agent-a-way-to-verify` or a candidate for deployment follow-up. It differs from routine `scheduled-maintenance` because a specific release triggers the check. This is a product announcement, with no independent assessment of detection or recovery reliability; verify current product behavior before writing tool-specific instructions.

## Proposed discussion order

These are editorial inferences, not accepted chapter changes:

1. **Memory claims and boundaries.** Read the November 6 Anthropic article against `private-agent-memory`, `bloated-agents-md` and scheduled maintenance. Preserve the distinction between useful learned knowledge, reviewable shared knowledge and hidden team instructions. Existing advice to shorten memory remains sound, but automatic prohibition of every kind of memory would exceed the evidence.
2. **Optimization with a fixed evaluator.** The Google account gives the existing `benchmark-guided-optimization` candidate unusually concrete source material, including rejected proposals and a holdout that contradicted the working benchmark. Consider this before inventing new candidates.
3. **Verification after deployment.** Two vendors independently describe comparing intended effects with production signals. Decide whether the feedback-loop chapter can cover this trigger, baseline, monitoring plan and response, or whether the workflow earns its own candidate. No candidate is added here.
4. **Oracle protection and reviewer quality.** Add concrete known uses and a small reviewer-eval example to existing verification chapters. They already contain the core constraints; avoid presenting them as newly discovered principles.
5. **Keep most vendor machinery out of the book.** Scion, model routing, Agent SDKs and autonomous platform architecture mostly concern how vendors build systems, rather than how the reader directs a coding agent.

## Limits and follow-up

This is a focused selection, not a complete census of four vendors’ publications. It does not include AWS, Microsoft Research, NVIDIA, JetBrains or every Google channel. All dates were visible in the selected article bodies. No version-specific claims from these posts should be copied into practical tool sections without checking current documentation. No benchmarks, product bots or overnight agent sessions were run.

Repository overlap was checked against `book/ru/SUMMARY.md`, `CANDIDATES.md`, the relevant verification and memory chapters, and `research/whats-new-2026-10-31.md`. The October 31 note already covers Scion, model-upgrade instruction audits and the older March harness article, so those do not count as discoveries from the last week. The Anthropic November 6 article is the clearest publication newer than that prior review.
