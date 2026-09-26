# Claude Code and Codex best-practice collections: screening

Reviewed on 2026-09-26 against `CANDIDATES.md` and the Russian chapters. Two community collections were used as an index, not as sources: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) and its sister [shanraisshan/codex-cli-best-practice](https://github.com/shanraisshan/codex-cli-best-practice). Both aggregate tips from X posts, talks, and vendor docs. Every claim below was traced to the original post, transcript, or documentation page; the collections themselves are not cited in the book. Star counts in the two READMEs disagree with each other and were not copied.

The vendor guide [*Codex best practices*](https://learn.chatgpt.com/guides/best-practices) (formerly `developers.openai.com/codex/learn/best-practices`) was read as a primary source in the same pass.

## Already covered

Most of the collections' tips restate chapters already in the book: plan mode first (`explore-plan-code-commit`), a minimal spec plus interview (`let-claude-interview-you`), vertical slices (`tracer-bullet-tickets`), a second session reviewing the plan or diff (`writer-reviewer`), giving the agent a way to verify (`give-agent-a-way-to-verify`), packaging repeated work (`skills-as-packaged-workflows`), worktrees (`isolated-parallel-work`), the ~200-line memory guideline (`claude-md-memory`), `.claude/rules/` (`bloated-claude-md`), a Stop hook for verification (`executable-guardrails`), and `/compact` with a focus hint (`handoff`, `context-engineering`). These add no new candidate.

## Candidate: hindsight-rewrite

Group: `verification`. After a working but mediocre result, keep what the session learned and discard the code: ask the agent to reimplement from scratch using that knowledge, then compare both versions against the same checks. Boris Cherny, [X, 2026-02-01](https://x.com/bcherny/status/2017742752566632544): "After a mediocre fix, say: 'Knowing everything you know now, scrap this and implement the elegant solution.'"

Boundary: `reflection` improves the existing artifact incrementally; this replaces it. `design-it-twice` compares designs before any implementation; this starts after one. `prototype-to-answer` builds a throwaway on purpose to answer a question; here the first version was meant to ship and turned out to be scaffolding. Recommendation: conditional candidate. A chapter needs a criterion for when a rewrite is cheaper than repair and a guard against discarding verified behavior; otherwise fold it into `reflection` or `prototype-to-answer` as a variant.

## Candidate: half-finished-migration

Group: `anti-pattern`. The codebase is left in a partially migrated state: two HTTP clients, two state libraries, an old and a new API style coexist. The agent copies whichever variant it finds first and the developer keeps correcting it. Boris Cherny, *The Pragmatic Engineer* podcast, 2026-03-04, [18:32](https://youtu.be/julbw1JuAz0?t=1112): "the codebase is in a partially migrated state where all of these are around the code somewhere. […] As a model, you might just pick the wrong thing and then, you know, like the user has to course correct you. […] always make sure that when you start a migration you finish the migration".

Proposed remedy: finish migrations; until then, make the old path visibly deprecated to the agent in an enforceable way (a lint rule forbidding new uses, a note in the shared instruction file naming the target variant), and track the remaining sites in a progress file. Boundary: `bloated-claude-md` concerns instructions; this concerns the code the agent learns from by example. `executable-guardrails` supplies the enforcement mechanism but not the diagnosis. Evidence limit: Cherny himself says there is "very little data" for models; the claim rests on analogy with human onboarding.

## Additions to existing candidates

- `context-forking`: Thariq Shihipar, [*Using Claude Code: session management and 1M context*](https://claude.com/blog/using-claude-code-session-management-and-1m-context), 2026-04-15. Rewind (`Esc Esc`, `/rewind`) instead of correcting: "Correcting […] leaves the failed attempt in context", whereas rewinding to just after the file reads and re-prompting with what was learned keeps "reads + one informed prompt + the fix". "Summarize from here" writes a handoff message before rewinding. Codex has `/fork` for the same branching move. This strengthens the candidate: the practice has vendor-documented tooling in two agents.
- `feedback-flywheel` and `actionable-diagnostics`: Cherny, same podcast, [45:15](https://youtu.be/julbw1JuAz0?t=2715): when a coworker's PR contains something lintable, he tags `@claude` on the PR to write a lint rule for it — "you want these deterministic steps". A concrete, small flywheel turn: a review comment becomes a deterministic check.
- `reviewable-agent-delivery`: Cherny, [X, 2026-03-25](https://x.com/bcherny/status/2038552880018538749): 141 PRs in one day, always squash-merged, median 118 lines changed (p90 ≈ 500). Evidence of small PRs at high agent throughput; one person's day, not a study.
- `private-agent-memory`: Codex [*Memories*](https://learn.chatgpt.com/docs/customization/memories.md) are off by default, stored locally under `~/.codex/memories/`, per user. The docs say: "Keep required team guidance in `AGENTS.md` or checked-in documentation. Treat memories as a helpful recall layer, not as the only source for rules that must always apply." `memories.disable_on_external_context` keeps chats that used MCP or web search out of memory generation. A second vendor stating the candidate's remedy in its own docs.
- `approval-fatigue`: the Codex best-practices guide lists among common mistakes "granting full permissions before understanding workflows" and recommends starting restrictive and loosening only when necessary. Supports the bounded-permissions side of the candidate; it does not discuss fatigue itself.

## Additions to existing chapters

- `skills-as-packaged-workflows`: Thariq Shihipar, [*Lessons from Building Claude Code: How We Use Skills*](https://x.com/trq212/status/2033949937936085378), 2026-03-17. Three writing rules: the description is read by the model to decide whether to load the skill, so it states *when* to trigger, not what the skill is; a Gotchas section built from observed failures is "the highest-signal content in any skill"; give goals and constraints rather than railroading the agent with step-by-step instructions. The Codex guide gives the same advice in shorter form (narrow scope, descriptive title that says when to apply, extract from a working workflow).
- `writer-reviewer`: OpenAI's [codex-plugin-cc](https://github.com/openai/codex-plugin-cc) runs Codex inside Claude Code: `/codex:review` (read-only review of uncommitted changes or a branch) and `/codex:adversarial-review` (a steerable review that questions implementation and design choices). A different model as reviewer is a further step of independence beyond a fresh context. Codex itself ships `/review` against a branch, uncommitted changes, or a commit.
- `context-engineering`: rewind instead of correct (source above) as a way to remove a failed attempt from context rather than argue with it.

## Resources

For `resources.md`: spec- and plan-driven workflow packs listed in the collections and not yet in the book — Get Shit Done ([gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)), Compound Engineering ([EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)), and HumanLayer's research → plan → implement commands ([humanlayer/humanlayer](https://github.com/humanlayer/humanlayer)). gstack, oh-my-claudecode, and Everything Claude Code are broader toolkits without a spec lifecycle and do not fit the page's scope. Catalogs: the Codex best-practices guide and [awesome-codex-cli](https://github.com/RoggeOhta/awesome-codex-cli).

## Dropped

- "Dumb zone at 40% of context" (Dex Horthy, talk): not traced to a verifiable quote in this pass.
- `<important if="...">` wrapping in CLAUDE.md (HumanLayer blog): a prompt formatting trick, not a mechanism; not checked.
- "Prototype over PRD: build 20–30 versions" (Cherny, same podcast): already the thesis of `prototype-to-answer`.
- Codex `AGENTS.override.md`: documented as a temporary override in the same discovery chain, not personal memory; does not support `private-agent-memory`.
- Tool-feature tips (status line, spinner verbs, voice dictation, fast mode, terminal choice): product usage, not developer-agent patterns.
