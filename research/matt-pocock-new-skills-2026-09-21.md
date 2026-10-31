# Matt Pocock skills: pattern screening

Checked 2026-09-21 against current upstream source and the local `CANDIDATES.md` / Russian chapters. Recommendations below are editorial judgments about this book's developer-facing scope, not evidence of measured effectiveness. Reviewed skills were treated as source material, not invoked as workflows.

## What is new

The [upstream changelog](https://github.com/mattpocock/skills/blob/main/CHANGELOG.md) currently reaches 1.2.3. Under 1.2.0 it records promotion of `wizard` and `to-questionnaire`, addition of `wait-what`, and the rename and expansion of `writing-great-skills` to `writing-for-agents`. Promotion is not initial creation. Release headings do not give dates, so this note makes no claim about their release dates. `resolving-merge-conflicts` exists upstream, but this check did not establish its original addition date.

## Strong chapter candidates and conditional extensions

### Guided manual procedure — `wizard`

The agent turns the human-only part of setup or migration into an interactive script: ordered stages, dashboard links, focused instructions, captured values, and explicit destinations. A fixed helper library supplies hidden secret input, environment-file updates, CI configuration, and confirmations. Current verification includes shell syntax checks and tracing every collected value to its destination; the agent does not run the human interaction end to end. [Source](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md).

**Priority: high.** Unlike `reproducible-agent-bootstrap`, the developer executes steps an agent cannot complete, such as selecting account settings or granting access. The transferable move is an executable human procedure rather than a numbered chat message. A chapter should demonstrate a small setup journey with an observable final check. Keep the distinction between verifying the generated script and proving that the user's setup succeeded.

### Hypothesis-driven debugging — `diagnosing-bugs`

The workflow establishes a reproducible failing command, reduces the case, lists falsifiable hypotheses, varies one factor per experiment, and finishes with a regression test. [Source](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md).

**Priority: high.** This fills a gap between the existing feedback-loop and TDD chapters: the developer constrains investigation so the agent discriminates causes before patching. The subject is causal diagnosis, not merely running checks. This substantiates and expands the provisional `reproduce-before-fix` lead in [the earlier catalog survey](pattern-sources-2026-09-21-round-2-catalogs.md); it is a worthwhile existing skill to extract, not a claim that it was just added.

### Questionnaire for the missing expert — `to-questionnaire`

The agent asks the developer who has the missing knowledge and which decision needs that knowledge. It produces a portable questionnaire for that recipient, with sufficient context, prioritized questions, answer space, and explicit room for uncertainty. [Source](https://github.com/mattpocock/skills/blob/main/skills/productivity/to-questionnaire/SKILL.md).

**Priority: conditional; extend the interview chapter first.** Existing interviewing and grilling assume the current user can answer. Here the knowledgeable person is absent: the developer uses the agent to prepare an artifact that crosses that boundary. This is a useful variation, but the current source ends at questionnaire delivery and does not supply a separate answer-validation or reconciliation workflow. A coding example, such as a migration blocked on billing rules, fits a section in `let-claude-interview-you`. Returning the answers to the specification is a useful proposed adaptation, not an upstream skill step. Sending the questionnaire is a separate action from drafting it.

## Secondary candidates

- **Resolve conflicts from intent:** reconstruct both changes from commits, PRs, and issues before reconciling the code, then validate the combined result. [Source](https://github.com/mattpocock/skills/blob/main/skills/engineering/resolving-merge-conflicts/SKILL.md). Medium priority: useful as a section of `isolated-parallel-work`; a standalone chapter must earn its place through semantic conflicts. Do not copy upstream's blanket instructions to stage everything or never abort; preserve unrelated work and allow an explicit stop when the intended behavior cannot be established.
- **Refactor where change is happening:** inspect active areas, present before/after interface options, and let the developer choose a bounded improvement. [Source](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md). Medium priority: a concrete developer-agent selection workflow could fit; a general chapter on deep modules would drift into ordinary software architecture.

## Extend existing chapters

- **`writing-for-agents`:** strengthen `skills-as-packaged-workflows`, `claude-md-memory`, and `bloated-claude-md` with conditional references, checkable completion criteria, and the distinction between tacit knowledge and cheap facts discoverable from configuration. Reference activation also supports the existing `instruction-activation-checks` candidate. Claims about special leading words and the effects of negation are the author's proposed mechanisms, not demonstrated universal model behavior. [Source](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md).
- **`wait-what`:** a useful corrective prompt that asks for missing context and familiar domain terms; too small for a separate pattern. Add an example to `domain-context-file`. [Source](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md).
- **Grilling:** upstream now batches questions whose prerequisites are settled into rounds, while the local chapter currently prescribes one question at a time and treats batches as an error. Update the comparison and explain dependencies; do not automatically replace one rigid rule with another. [Changelog](https://github.com/mattpocock/skills/blob/main/CHANGELOG.md).
- **Design it twice and two-axis review:** the existing prototype and writer-reviewer chapters already cover these ideas. Treat additional mechanics as examples or updates, not new chapter titles. [Design source](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DESIGN-IT-TWICE.md), [review source](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md).

## Follow-up comparison with the current book

The follow-up checked the actual purpose, solution, implementation, and examples of neighboring Russian chapters, including current working-tree edits. This narrows the initial shortlist to two strong standalone proposals. The table records editorial recommendations, not accepted backlog statuses.

| Proposal | Existing coverage | Remaining mechanism and disposition |
| --- | --- | --- |
| Guided manual procedure | [Reproducible agent bootstrap](../book/ru/reproducible-agent-bootstrap.md) prepares a safe local baseline through an agent-runnable command. | **Standalone proposal: `guided-manual-procedure`, project-org.** The generated artifact coordinates human-only actions and carries their results into configuration. A setup example should visibly distinguish script validation, completed human stages, and the final service check. |
| Hypothesis-driven debugging | [TDD](../book/ru/tdd-with-agent.md) already demonstrates a failing bug test before a fix; [feedback loops](../book/ru/give-agent-a-way-to-verify.md) already require executed checks. | **Standalone proposal: `hypothesis-driven-debugging`, verification.** The missing contribution is discriminating competing causal explanations through experiments. Reproduction and a red test alone would duplicate TDD. Absorb the earlier `reproduce-before-fix` research lead into this treatment rather than opening two chapters. |
| External expert questionnaire | [Interviewing](../book/ru/let-claude-interview-you.md) elicits requirements, records unresolved questions, and creates a self-contained specification. | **Extend interviewing first.** Add the case where the current developer lacks the answer: identify the knowledgeable recipient and required decision, prepare a portable questionnaire, then bring the answers back into requirements. The final return step is our adaptation. |
| Conflict resolution from intent | [Isolated parallel work](../book/ru/isolated-parallel-work.md) already requires integration in task context and renewed checks. | **Extend its integration procedure.** Add tracing each side to its originating issue or PR and checking both intended behaviors. Separate semantic-conflict treatment remains conditional. |
| Architecture improvement survey | [Four phases](../book/ru/explore-plan-code-commit.md) covers inspection and approval before implementation; [prototyping](../book/ru/prototype-to-answer.md) covers alternatives and records Design It Twice as an application. | **Reserve.** Prioritizing frequently changed code and presenting before/after choices adds a concrete example; a standalone pattern still needs a distinct developer-agent decision mechanism beyond the existing combination. |
| Writing for agents | [Skills](../book/ru/skills-as-packaged-workflows.md) already includes on-demand references, applicability descriptions, completion criteria, and single-source rules. [Bloated memory](../book/ru/bloated-agents-md.md) already removes facts discoverable from code. | **Mostly covered.** Add at most a precise example of a reference that names both its target and its trigger. Avoid restating existing principles as newly missing material. |
| Wait what | [Domain context](../book/ru/domain-context-file.md) already establishes shared vocabulary. | **Optional prompt example.** Repairing an unclear response does not currently earn a separate chapter. |
| Independent alternative designs and two-axis review | [Prototype](../book/ru/prototype-to-answer.md) names Design It Twice; [writer-reviewer](../book/ru/writer-reviewer.md) names standards/spec review. | **Covered at the pattern level, not every implementation detail.** Independent briefs with different design constraints and separate standards/spec reviewers can enrich examples. |

### Concrete upstream alignment issue

The [current grilling source](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) asks a round of questions whose prerequisites are settled. The [grilling chapter](../book/ru/grilling.md) explicitly requires one question at a time and classifies batches as an anti-pattern; the [Matt Pocock tool profile](../book/ru/matt-pocock-skills.md) also describes the one-question behavior. The tool profile should match upstream. The transferable chapter should distinguish dependent questions, which must wait, from a manageable set of independent questions that can be asked together. This does not establish that batching is universally superior.

The screening initially changed only this note. The subsequent author instruction authorized implementation; see the disposition below.

## Implemented disposition

- Added `hypothesis-driven-debugging` in Russian, English, and Spanish, with a shared executable Python example and navigation/backlinks. The teaching fixture distinguishes data lookup from cache-key collisions and checks the repaired key.
- Updated grilling and the Matt Pocock profile, added the external-expert questionnaire to interviewing, and added intent recovery to parallel integration. Clarified the current HTML-based prototype source while retaining terminal prototypes as a valid adaptation.
- Added only `guided-manual-procedure` as a new candidate. Architecture surveying remains a lead; the other mechanisms extend existing chapters.
- Synchronized all three reader candidate lists, including the already-recorded instruction-activation and bounded-retry candidates missing from those lists. Existing GitHub discussions were checked; the three topics without threads are labeled as not yet open. No public discussion was created.
- Translation `source_rev` fields for revised chapters are left empty until the corresponding Russian revision is committed; they do not claim an exact match to an older commit.
