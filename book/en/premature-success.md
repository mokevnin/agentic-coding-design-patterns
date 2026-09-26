---
kind: anti-pattern
status: draft
related: [give-agent-a-way-to-verify, feature-list-harness, tdd-with-agent]
source_rev: d253b2fa683fffdf21e8092f64de4c599f31343f
---

# Premature Success

## Also known as

Premature success, the agentic era's "works on my machine".

## Context

The unit tests pass, curl returns 200, the build succeeds. The agent declares the feature done and takes the next task.

## Problem

Yet nobody has run the user scenario end to end. Checks of individual functions and of the endpoint can miss a bug in how data passes between the interface and the server.

## Why people do it

- Passing tests look like sufficient proof, even though they cover only the cases they were given.
- Setting up the environment and an end-to-end scenario takes extra time.
- The agent extends the success of individual checks to the whole feature.
- The team treats passing tests as the definition of done without checking whether the tests themselves are complete.

## Consequences

- ➖ A user or a demo is the first to hit the integration failure.
- ➖ The status in the [feature list](feature-list-harness.md) does not match the product's behavior.
- ➖ You have to re-check the agent's reports by hand.
- ➖ Several missed integration bugs make later diagnosis harder.

## Signs

- The report has no end-to-end check result.
- "Verified" means "the unit tests passed".
- Nobody has opened the application since the implementation.
- The feature is shown for the first time at the demo.

## A better way

Include the user scenario in the [feedback loop](give-agent-a-way-to-verify.md). The agent should walk through it via the real interface and save the result. In the [feature list](feature-list-harness.md), tie the status to this check. Unit tests and [TDD](tdd-with-agent.md) continue to protect individual pieces of behavior.

## Example

**Before:**

> The feature is done, all 14 tests pass.

**After:**

> Create a schedule through the UI, wait for the report email in the test inbox, and attach screenshots of both steps. Finish the task once this scenario passes.

## Related patterns and anti-patterns

- [Feedback Loop](give-agent-a-way-to-verify.md) ties readiness to evidence from verification.
- [Feature List](feature-list-harness.md) stores the statuses of verified scenarios.
- [TDD with an Agent](tdd-with-agent.md) helps verify individual behavior before implementation.
- [Vibe Coding](vibe-coding.md) describes a similar loss of control when accepting unverified code.
