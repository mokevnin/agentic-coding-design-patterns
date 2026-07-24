---
kind: anti-pattern
status: draft
related: [prototype-to-answer, spec-driven-development, premature-success]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# Vibe Coding

## Also known as

Vibe coding — Andrej Karpathy's term: "fully give in to the vibes... and
forget that the code even exists."

## Context

The developer describes the goal in one phrase, the agent generates, the
developer accepts whatever runs and looks like it works. The diff goes
unread; errors are cured by pasting the message back into the chat. On a
weekend prototype this is intoxicatingly productive — and the habit moves
into the real project.

## Problem

The conversation's product is accepted without understanding and without
verification: the code is unread, the requirements are recorded nowhere,
the acceptance criterion is "seems to work". A living codebase grows a
layer nobody can say what it is *supposed* to do.

## Why people do it

- The speed is intoxicating: a feature in an evening versus a week — it is
  hard to make yourself slow down to read a diff.
- On prototypes it honestly works: the cost of a mistake there is zero, and
  the habit sets in as "just the way to work".
- Reading someone else's code is boring, and the agent's is long besides.
- "The agent knows this framework better than I do" — true, and it does not
  follow that the result is correct.

## Consequences

- ➖ Code without an owner: nobody understands how the feature works — so
  nobody can review, fix, or grow it.
- ➖ The intent is lost: a month later "by design" can't be told from "by
  accident" — the requirements existed only in a head and a chat.
- ➖ Edge cases and security are unknown: nobody checked them, because the
  criterion was "looks like it works".
- ➖ Every next change costs more: the layer of un-understood code grows,
  and the agent builds the new on top of the unverified old.

## Signs

- The diff was merged unread.
- The answer to "how does this work" is "no idea, the agent wrote it".
- Requirements are reconstructed by reading the code, because they exist
  nowhere else.
- The quality argument is "but it works".

## A better way

Split the modes by the cost of a mistake. Give the vibe its legitimate
zone: [throwaway prototypes](prototype-to-answer.md), one-off scripts,
experiments — everything that dies before it needs to be understood. Give
real code the real process: the intent gets recorded (a
[specification](spec-driven-development.md), or at least a plan from the
[Four Phases](explore-plan-code-commit.md)), the result gets verified (the
[Feedback Loop](give-agent-a-way-to-verify.md)), and the diff gets read —
by you or by a [fresh-context reviewer](writer-reviewer.md). The line is
simple: code that will live must be understood by someone.

## Example

**Before:**

> — Build the subscription payment page. — … — It works, merge it.

**After:**

> For the landing prototype — vibe away, unread: it dies this week. For the
> payment — a spec with criteria, implementation by plan, an end-to-end run
> of the payment scenario, and a diff review by a fresh subagent: this code
> will be handling money longer than we'll remember this conversation.

## Related patterns and anti-patterns

- [Throwaway Prototype](prototype-to-answer.md) — the vibe's legal form:
  disposable code with a question and a verdict, instead of code without an
  owner.
- [Spec-Driven Development](spec-driven-development.md) — the opposite
  pole: the intent is written down and outlives the conversation.
- [Premature Success](premature-success.md) — the faithful companion: the
  code unread *and* the behavior unchecked.
- [One-Shotting](one-shotting.md) — the sibling from the same demo culture:
  there everything is expected from one prompt, here everything after it is
  accepted.
