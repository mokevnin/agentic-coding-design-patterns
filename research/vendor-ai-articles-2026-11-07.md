# Vendor AI articles: screening for the book

Checked on 2026-11-07. The request was to read recent vendor articles, then discuss their implications for the book. This is a research note and a proposed decision map; no chapter or candidate status is changed by it. Focus: how a person works with a coding agent. Primary coverage is September–November 2026, with one older workflow example explicitly marked. The companion [vendor survey](vendor-ai-articles-other-vendors-2026-11-07.md) covers Anthropic, Google, GitHub and Cursor.

## What is new relative to the previous review

The [2026-10-31 review](whats-new-2026-10-31.md) already examined OpenAI's maintenance and instruction articles and Anthropic's source-control article. Those are supporting evidence, not newly discovered patterns. Current OpenAI pages now explicitly date the maintenance article to October 14 and the instruction article to September 11; the earlier note could not establish those dates. Publication dates do not establish that all current text existed on first publication: the September 23 cookbook now reports results with a later Codex version. Treat these as current page contents, not immutable release records. [Codex blog index](https://developers.openai.com/blog/topic/codex), [cookbook index](https://developers.openai.com/cookbook/topic/codex), [current cookbook](https://developers.openai.com/cookbook/examples/partners/harness_aware_plugin_evals/harness_aware_plugin_evals).

## OpenAI sources

### November 4: A thousand fewer paths to root

The most useful observation is a failed acceptance criterion: in an early run, 20 of 200 apparent successes used a different vulnerability from the assigned one. OpenAI added an independent check that the result used the intended vulnerability. The article also recommends stopping attempts that make no progress and reassessing scaffolding as models improve. These are observations from specialized security research, not a demonstration that an ordinary coding agent has the same capabilities. [Article](https://openai.com/index/a-thousand-fewer-paths-to-root/).

Editorial proposal: use the wrong-path example in [Feedback Loop](../book/ru/give-agent-a-way-to-verify.md) and [Workflow Evals](../book/ru/agent-workflow-evals.md). Their existing outcome/trajectory distinction already owns it. Add the cost-of-stalled-attempts evidence to the existing `bounded-retry-escalation` candidate if that candidate is developed. A separate security chapter or orchestration chapter is unnecessary for these lessons.

### October 14: Maintaining software with the GPT-6 family

Cleanup decisions combine repository history, live feature-flag configuration, production profiles and human review. A flag marked permanent was escalated rather than automatically removed. Findings are prioritized by measured benefit; some proposals cost more complexity than they justify. The article also proposes replaying a failed session with one instruction changed, keeping the starting snapshot and model fixed. These are an internal team's reports, not controlled productivity estimates. [Article](https://developers.openai.com/blog/maintaining-software-with-the-gpt-6-family).

Editorial proposal: strengthen [Scheduled Maintenance](../book/ru/scheduled-maintenance.md) with evidence from outside source code and a measured benefit for each selected cleanup. Its current revision already adds semantic refactoring passes, behavior preservation and a valid no-change result; do not repeat those additions. Put the instruction replay in [Workflow Evals](../book/ru/agent-workflow-evals.md), with repeated trials rather than a conclusion from one pair of runs. This source was already screened on October 31.

### September 23: Harness-aware evaluation of plugins

This OpenAI/deepsense.ai cookbook compares direct tool tests, a standalone model loop and the product harness. The recorded five-case example passes in the standalone loop, fails two cases in Codex and passes after product-visible instructions are added. The 108-question production study is separate and not shipped as reproducible code/data. Across three repeated runs, 23 questions change pass/fail despite similar aggregate scores. SDK evaluation is supplemented by a desktop spot check, not equated with full client verification. [Article](https://developers.openai.com/cookbook/examples/partners/harness_aware_plugin_evals/harness_aware_plugin_evals).

Editorial proposal: add a concrete example to [Workflow Evals](../book/ru/agent-workflow-evals.md). Run representative cases through the actual intended agent environment, inspect traces and report per-case stability alongside the mean. Its existing advice already covers fixed fixtures, versions, multiple trials and outcome versus trajectory; the missing emphasis is environment fidelity. Do not copy the plugin implementation into a chapter about working with coding agents.

### September 11: Rethinking skills and prompts for GPT-6 Astra

The article recommends narrow skill triggers, short descriptions, progressive disclosure and reassessing instructions after model changes. Instructions that helped an older model may impose unnecessary work or pauses on another model. It proposes explicit completion boundaries and permissions for known safe workflows. This is model-specific vendor guidance, not a reason to delete required tests or security boundaries. [Article](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).

Editorial proposal: [Skills](../book/ru/skills-as-packaged-workflows.md) already covers compact descriptions, loading by need and avoiding rigid recipes. A narrow-trigger example and a model-change eval trigger are sufficient. Follow the October 31 second opinion: no new `model-upgrade-review` chapter.

### August 25: Automating repetitive work at OpenAI with Codex

Older supporting example: the author keeps goals, approved plans, commands, outputs, decisions and failed approaches in a shareable Runme notebook. Searchable companion indexes help later agents discover previous runs. Human decisions remain at consequential choices; automatic approval review does not expand permissions. This describes a workflow, not a measured improvement over skills or repository documentation. [Article](https://developers.openai.com/blog/automating-repetitive-work-at-openai-with-codex).

Editorial proposal: use as supporting evidence for `feedback-flywheel`, [Progress File](../book/ru/progress-file.md) and [Skills](../book/ru/skills-as-packaged-workflows.md). A reusable procedure and the evidence from one execution have different maintenance needs. No separate Runme tool chapter is proposed.

### November 3 and 6: engineering and laboratory research

OpenAI's physical-engineering article reports prototype work that still required manufacturing review and iteration. The wet-lab article introduces a benchmark for experimental data interpretation. They are fresh publications, but neither supplies a sufficiently distinct practice for this software-development book in this pass. Keep the scope on coding-agent work. [Physical engineering](https://openai.com/index/accelerating-engineering-for-the-physical-world/), [wet-lab benchmark](https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/).

## Proposed discussion order

These are editorial judgments, not accepted changes. Supporting sources for other vendors are in the [companion note](vendor-ai-articles-other-vendors-2026-11-07.md).

| Priority | Decision | Existing home |
| --- | --- | --- |
| First | Clarify the difference between useful memory and private, unreviewed team knowledge. Discuss the new Anthropic memory article against the chapter's actual team-reproducibility argument. | Private Agent Memory, Context Engineering, Project Memory |
| First | Strengthen independent acceptance evidence: protect the behavioral oracle and verify that the result satisfies the intended task. | Feedback Loop, Workflow Evals, TDD; existing `self-confirming-tests` candidate |
| First | Add evaluation through the intended harness, with per-case stability and traces. | Workflow Evals |
| Discuss | Decide whether release-triggered production verification, with agreed signals and a response, extends the feedback loop or earns a separate candidate. | Feedback Loop; Cursor rollout article and GitHub Observe guide in the companion note |
| Next | Evaluate cleanup with runtime and organizational evidence, then prioritize by benefit and review cost. | Scheduled Maintenance; existing `reviewable-agent-delivery` candidate |
| Next | Consider bounded optimization with a fixed evaluator and stopping condition. | Existing `benchmark-guided-optimization` candidate |
| Supporting | Reassess instructions when changing models; keep only useful scaffolding. | Skills, Bloated Project Memory, Workflow Evals |

The first decision may change the explanation in Private Agent Memory without changing its recommendation: capability benchmarks and shared, reviewable project knowledge answer different questions. That is a proposed distinction to discuss with the author, not an automatic policy reversal. No new chapter is accepted in this pass.

## Method and limits

Opened official article pages and indexes and compared them with the current Russian table of contents, candidate backlog and relevant chapters. Existing work in the checkout was left intact. Publication dates and check date are recorded separately; current pages are mutable. Sources establish vendor observations and advertised mechanisms, not independently reproduced effectiveness in this repository. No agent benchmark, model invocation, vulnerability experiment or paid evaluation was run. The full repository check is the validation for the new research files; it does not validate vendor claims.
