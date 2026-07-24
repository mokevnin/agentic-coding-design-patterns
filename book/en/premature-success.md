---
kind: anti-pattern
status: draft
related: [give-agent-a-way-to-verify, feature-list-harness, tdd-with-agent]
source_rev: 0467919769ae9e07e7dfb6a41d92d54afd014895
---

# Premature Success

## Also known as

Premature success, the "works on my machine" of the agent era.

## Context

The agent has finished a feature: the unit tests are green, curl returned a
200, the build passed. It reports "done", the developer nods and moves on —
or an autonomous session flips the status and takes the next task.

## Problem

The work is declared done without an end-to-end check as a user. Units
verify pieces, curl verifies an endpoint — nobody verified that the feature
works whole: from the click in the interface to the result on the screen.

## Why people do it

- Green tests look like proof — though they verify only what is written in
  them.
- The end-to-end check is expensive: bringing up the environment and walking
  the scenario by hand or via browser automation takes longer than running
  the units.
- The agent is sincerely confident in the success: it isn't lying, it is
  extrapolating.
- "It compiles and the tests pass" is the habitual human criterion — carried
  over to an executor who writes both the code and the tests.

## Consequences

- ➖ The feature "works" until the first user: the gap is discovered in
  production or at the demo — the most expensive points.
- ➖ The [Feature List](feature-list-harness.md) lies: a `passing` status
  backed by units wouldn't survive a single click.
- ➖ Trust in the agent's reports breaks — and with it all autonomous work:
  "done" stops meaning anything.
- ➖ Integration gaps accumulate: every "finished" feature adds its own, and
  they have to be untangled in bulk.

## Signs

- The agent's report carries no evidence: no end-to-end run output, no
  screenshot — only words.
- "Verified" means "the unit tests passed".
- Nobody has opened the application: not the agent through a browser, not a
  human by hand.
- The demo is the feature's first showing.

## A better way

Separate "the code is written" from "the feature works" — and close the gap
with a [Feedback Loop](give-agent-a-way-to-verify.md) carrying an end-to-end
check: the agent walks the scenario as a user — for the web, through a
browser with screenshots — and presents the evidence. The
[Feature List](feature-list-harness.md) builds this rule in: only the
end-to-end run flips a status. Units and [TDD](tdd-with-agent.md) remain —
they catch regressions of the pieces — but they are not the work's finale.

## Example

**Before:**

> — The feature is done: all 14 tests pass.

**After:**

> Walk the scenario as a user: create a schedule through the UI, wait for
> the report email in the test inbox, attach screenshots of both steps.
> Done is when the scenario passes — not when the units are green.

## Related patterns and anti-patterns

- [Feedback Loop](give-agent-a-way-to-verify.md) — the antidote: a check
  with evidence instead of a "done" report.
- [Feature List](feature-list-harness.md) — institutionalizes the rule: an
  end-to-end run flips the status, not a feeling.
- [TDD with an Agent](tdd-with-agent.md) — the units are needed, but they
  insure the pieces, not the finale: a green red-green cycle doesn't cancel
  the end-to-end check.
- [Vibe Coding](vibe-coding.md) — the kindred spirit: there the code goes
  unread, here the behavior goes unchecked.
