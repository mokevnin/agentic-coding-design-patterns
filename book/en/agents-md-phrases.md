---
source_rev: 8b49e83488f16f3ca7d9690fd31bb9be3ef9720b
---

# Phrases for AGENTS.md

This page collects rules for [project memory](agents-md-memory.md) that help the agent make decisions when choosing an implementation. Tailor them to your project and add only the ones that change the agent's behavior in the direction you want.

The first five rules are based on a list by Marcos Hernanz; [Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830) added the phrasings about root causes and refactoring. They are followed by a rule from a Cloudflare skill and adaptations of instructions from open-source projects. The corresponding sections link to the primary sources.

Choose the rules your project needs from this block and put them in your project memory file. You do not need to copy the entire list.

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
- Prefer retrieval over pre-training.
- Keep changes focused on the requested task.
- Make behavior-changing assumptions explicit.
- Report what you verified and what you could not verify.
```

The rules are given in English. If you like, translate them into your team's language. As the [Project Memory](agents-md-memory.md) chapter explains, the file _guides_ the agent's behavior but does not guarantee the rules are followed. Keep the list short so it does not turn into [bloated memory](bloated-agents-md.md).

## Do not preserve backward compatibility

By default, the agent may keep old fields "just in case" and add compatibility layers around a change. In an internal module fully controlled by one team, such layers often create extra work. The rule lets the agent remove the old interface and update its callers in the same edit.

The rule fits applications and internal modules when the team controls their consumers. For a public library or an external API, compatibility is part of the contract with users, so there you need to require explicitly that it be preserved.

## Choose the simplest implementation that fully meets the current requirements

The agent may build in extension points for tasks that do not exist yet. The rule brings it back to YAGNI and the current requirements. For example, if one export format is needed, a universal plugin system adds code that nothing yet justifies. The word _fully_ requires implementing the whole agreed scenario, including error handling.

The same problem arises with [premature specification](premature-specification.md), when the team chooses how a solution is built before it has understood the task.

## Prefer established, well-maintained libraries over custom implementations

The agent may write its own date parser that passes a simple example and fails at a time zone transition. A mature library may already have such cases worked out and covered by tests. The rule prompts the agent to check existing solutions and reduce the amount of code the team will have to maintain itself.

Before choosing a library, check the state of its repository, its releases, and its support for the scenarios you need. An abandoned dependency can require more work than your own implementation.

## Fix the cause, not the symptom

Faced with a failing test, the agent may add a `try/catch` that makes the symptom disappear. If the error came from an unexpected `null`, such a fix leaves the source of the invalid value in place. The rule requires finding out where the `null` came from and which contract was broken.

The rule combines well with [reflection](reflection.md). Before the edit, the agent explains the cause of the failure, and you check whether the proposed change removes that cause.

## Suggest best practices, even if they may require refactoring

An agent aiming for the smallest diff may repeat a flaw of the surrounding code. The rule allows it to propose a refactoring and explain how it will help solve the task. A human weighs the benefit and agrees on the scope of work.

The agent may propose refactoring too often. Combine this rule with the requirements to choose the simplest implementation and to establish the cause of a problem first.

## Prefer retrieval over pre-training

This is the exact wording from the [Cloudflare Agents SDK skill](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/agents-sdk/SKILL.md#L8). The agent may remember an SDK method that has since been renamed or a service limit that has changed. The rule prompts it to open documentation or source code before choosing an API or citing limits.

Check the version the project actually uses. The [general Cloudflare skill](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L157) explicitly mentions pinned package versions, installed types, and the configuration schema. If the project uses the previous major version of a library, an example from the latest documentation may not apply.

For your project, specify where to find the primary source: internal documentation, the dependency's repository, or an official reference. If the source is unavailable, the agent should say what it could not verify. The rule helps with changing APIs; it does not require a web search for every simple operation.

## Keep changes focused on the requested task

This adapts the [Cloudflare skill's working principles](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L161): preserve the project's architecture and make the smallest change that satisfies the request. While fixing timeout handling, the agent may also rename nearby methods and reformat the module. Those edits enlarge the diff and make the fix harder to see.

The rule keeps everything the task needs in the diff: implementation, affected callers, tests, and documentation. It works with the earlier refactoring rule: the agent explains the value of a broader rework, and you agree on its scope. If the task requires changing a neighboring module, that change is part of the work.

## Make behavior-changing assumptions explicit

This adapts a rule in the [RustFS project's AGENTS.md](https://github.com/rustfs/rustfs/blob/7b010ddd70903028dc5d5d1f00d2356472132403/AGENTS.md#L30) that requires stating assumptions affecting behavior or verification. If a requirement does not specify the report's time zone, the agent may silently choose UTC. The code and tests will agree, but users will get a report for a different day. The rule requires naming that choice and its consequences so you can review them before implementation.

Not every decision needs a question. The agent first looks for an answer in the requirements and project code; if none exists and a mistaken choice would materially change the result, it asks a specific question. Choosing a local variable name rarely needs discussion; reporting-day boundaries or repeated-request behavior do.

## Report what you verified and what you could not verify

This adapts a prohibition in the [TransformerLens project's AGENTS.md](https://github.com/TransformerLensOrg/TransformerLens/blob/6bea1fa7cfcbf9064aa8ac99bbd5fb1e4a6c2240/AGENTS.md#L160) against claiming tests passed without running them. Saying "everything works" does not tell you whether the agent launched the application or only read the code. The rule requires a report with clear verification limits: for example, calculation tests passed, but sending email through the real service was not checked because the environment has no access to it.

Verification should match the change. Linters and a build are usually enough for a text edit, while a form change needs the affected scenario checked. If a check fails or cannot run, the agent names the cause and the remaining gap. This complements [giving the agent a way to verify](give-agent-a-way-to-verify.md): you can see the evidence behind the conclusion that the work is ready.

## Related chapters

- [Project Memory](agents-md-memory.md) explains where to keep these rules.
- [Bloated Memory](bloated-agents-md.md) shows why the list should stay short.
- [Context Engineering](context-engineering.md) explains how permanent instructions consume the context of every session.
