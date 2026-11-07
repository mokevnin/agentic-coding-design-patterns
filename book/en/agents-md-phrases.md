---
source_rev: 1783b390e65340a1007dcf87e8249a49f0d07c69
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

The rule permits removing unnecessary compatibility layers when the team controls all consumers. For an external API, compatibility is part of the contract. [Refactoring](refactoring.md) explains how to choose between a coordinated change and a gradual migration.

## Choose the simplest implementation that fully meets the current requirements

The rule keeps the agent within current requirements and requires completing the whole agreed scenario, including errors. [Refactoring](refactoring.md) covers its application to unnecessary abstractions; [Premature Specification](premature-specification.md) covers choosing a solution structure too early.

## Prefer established, well-maintained libraries over custom implementations

The agent may write its own date parser that passes a simple example and fails at a time zone transition. A mature library may already have such cases worked out and covered by tests. The rule prompts the agent to check existing solutions and reduce the amount of code the team will have to maintain itself.

Before choosing a library, check the state of its repository, its releases, and its support for the scenarios you need. An abandoned dependency can require more work than your own implementation.

## Fix the cause, not the symptom

Faced with a failing test, the agent may add a `try/catch` that makes the symptom disappear. If the error came from an unexpected `null`, such a fix leaves the source of the invalid value in place. The rule requires finding out where the `null` came from and which contract was broken.

The rule combines well with [reflection](reflection.md). Before the edit, the agent explains the cause of the failure, and you check whether the proposed change removes that cause.

## Suggest best practices, even if they may require refactoring

The rule permits the agent to propose a structural improvement and explain its benefit for the task. You choose the scope; a proposal alone does not authorize edits. [Refactoring](refactoring.md) explains how to assess and verify the improvement.

## Prefer retrieval over pre-training

This is the exact wording from the [Cloudflare Agents SDK skill](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/agents-sdk/SKILL.md#L8). The agent may remember an SDK method that has since been renamed or a service limit that has changed. The rule prompts it to open documentation or source code before choosing an API or citing limits.

Check the version the project actually uses. The [general Cloudflare skill](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L157) explicitly mentions pinned package versions, installed types, and the configuration schema. If the project uses the previous major version of a library, an example from the latest documentation may not apply.

For your project, specify where to find the primary source: internal documentation, the dependency's repository, or an official reference. If the source is unavailable, the agent should say what it could not verify. The rule helps with changing APIs; it does not require a web search for every simple operation.

## Keep changes focused on the requested task

This adapts the [Cloudflare skill's working principles](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L161). The rule retains implementation, caller, test, and documentation changes needed for the task while limiting incidental cleanup. [Refactoring](refactoring.md) covers choosing the scope of a structural change.

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
- [Refactoring](refactoring.md) shows how to apply the rules on simplification, compatibility, and task scope.
