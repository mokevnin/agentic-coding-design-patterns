---
source_rev: d253b2fa683fffdf21e8092f64de4c599f31343f
---

# Phrases for AGENTS.md

This page collects rules for [project memory](claude-md-memory.md) that help the agent make decisions when choosing an implementation. Tailor them to your project and add only the ones that change the agent's behavior in the direction you want.

The basis is a list by Marcos Hernanz. The last two phrasings were added by [Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830).

You can copy this block into your project memory file.

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
```

The rules are given in English. If you like, translate them into your team's language. As the [Project Memory](claude-md-memory.md) chapter explains, the file _guides_ the agent's behavior but does not guarantee the rules are followed. Keep the list short so it does not turn into [bloated memory](bloated-claude-md.md).

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

## Related chapters

- [Project Memory](claude-md-memory.md) explains where to keep these rules.
- [Bloated Memory](bloated-claude-md.md) shows why the list should stay short.
- [Context Engineering](context-engineering.md) explains how permanent instructions consume the context of every session.
