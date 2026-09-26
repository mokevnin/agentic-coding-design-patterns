# Agent-written memory: candidate screening

Reviewed on 2026-09-26 against `CANDIDATES.md`, the Russian chapters on project memory, and the catalogs already listed in Sources. The question: what happens to project knowledge when the agent itself decides what to remember, and where that memory lives. The candidate name, boundary, and exercise below are our editorial adaptation. The proposal is recorded as a candidate, not an accepted chapter.

## Candidate: private-agent-memory

Group: `anti-pattern`. Several agents now write their own persistent notes about a project and load them in later sessions. By default this memory lives outside the repository: on the developer's machine or on the vendor's side. Project conventions that the agent learns from one developer's corrections then stay invisible to teammates, other tools, and code review. Behavior differs between machines, the notes age without anyone noticing, and knowledge leaves with the person who taught it.

Proposed remedy: route project knowledge to repository files that go through review (the shared instruction file, a domain glossary, ADRs, a progress file) and keep agent memory for personal preferences only. Where the tool allows it, disable agent memory for the project or point it into the repository, and write the routing rule itself into the shared instruction file. The rule alone is a recommendation; the setting is the enforceable part.

Proposed exercise: in two weeks of work, the agent's private memory has accumulated "use pnpm", "events between domains", and "the API tests need a local Redis". A new teammate's agent runs `npm install` and calls the notification service directly. Audit the memory, move each project fact to the file where it belongs, delete it from memory, and disable project-level memory. Verify that a fresh session on another machine follows the moved rules.

Boundary: `claude-md-memory` describes the shared instruction file; this anti-pattern describes knowledge that bypasses it. `bloated-claude-md` concerns too much in the shared file; this concerns project facts that never reach it. `progress-file` is repository-level memory for one long task. Recommendation: conditional candidate. If the example cannot carry its own failure story, fold it into `claude-md-memory` as a section on shared versus personal memory, with the tool-level levels diagram made tool-neutral at the same time.

## Tool evidence

- **Claude Code** ([docs](https://code.claude.com/docs/en/memory)): auto memory is on by default, stored in `~/.claude/projects/<project>/memory/`, machine-local, not shared across machines. The first 200 lines or 25KB of `MEMORY.md` load every session. "Remember X" goes to auto memory; the shared file is written only on request. Controls: `autoMemoryEnabled` (any settings scope, including project), `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`, and `autoMemoryDirectory` to relocate it.
- **Windsurf / Devin Desktop Cascade** ([docs](https://docs.devin.ai/desktop/cascade/memories)): memories are generated automatically, stored in `~/.codeium/windsurf/memories/`, workspace-specific, and "not committed to your repository". The docs themselves recommend writing knowledge worth reusing as a Rule or into `AGENTS.md`. No disable setting is documented on that page.
- **GitHub Copilot Memory** ([docs](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)): the counterexample. Repository-level facts are shared with everyone who has Copilot Memory on that repository, stored with code citations, validated against the current branch before use, and deleted after 28 days unused. Still stored on the GitHub side rather than in git, so not reviewable as a diff and not visible to other tools. On by default for individual plans; admins enable it for organizations, users can opt out.

## Practitioner sources

- Softwareguru, [*Coding Agents Do Not Need Personal Memory*](https://softwareguru.substack.com/p/coding-agents-do-not-need-personal), 2026-05-15: the closest statement of the thesis. "The repository is the memory for a coding agent. Everything else is overhead until proven otherwise." Opinion piece, no measurements.
- svetkis, [*Memory Grooming*](https://ai-coding-patterns.dev/patterns/memory-grooming/), Augmented Coding Patterns: memory lives in repository files (`AGENTS.md`, `CLAUDE.md`, `.serena/memories/`) and needs scheduled grooming. Supports `bloated-claude-md` rather than this candidate, but assumes the same repository placement.
- Paul Duvall, [*Agent Memory*](https://github.com/PaulDuvall/ai-development-patterns#agent-memory): memory as structured files (task lists, session notes) persisted outside the context window. Closer to `progress-file`; does not address where tool-managed memory lives.

## Evidence limits

None of the sources measures the cost of private memory; the argument rests on how the tools store it. Tool behavior changes quickly: Copilot's shared, validated memory already weakens the "invisible to the team" claim for that tool. A chapter must state the placement per tool as of its writing and keep the principle (project knowledge goes through review) separate from any tool's settings.
