# Useful project instructions: source review

Checked on 2026-11-07. This note supports additions to `book/ru/agents-md-phrases.md`. The existing chapter covers compatibility, simplicity, libraries, root causes, and proposed refactoring. The four additions below address different decisions: evidence, scope, assumptions, and verification. Except for the short Cloudflare retrieval phrase, the proposed wording is an editorial adaptation, not a quotation.

## Prefer retrieval over pre-training

Cloudflare's official Agents SDK skill contains the exact phrase “Prefer retrieval over pre-training”. Its surrounding instruction says the agent's SDK knowledge may be outdated, and the skill routes the agent to official documentation for the task. This is a verified use in a skill, not evidence that Cloudflare originated the expression. [Source: Agents SDK skill, pinned revision](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/agents-sdk/SKILL.md#L8).

Use this exact phrase as the chapter heading and copyable instruction. Explain retrieval concretely: inspect the project and retrieve relevant primary documentation before relying on remembered API details. For example, before adding an SDK integration, establish the installed package version and check the matching API instead of copying a plausible example from model memory. The general Cloudflare skill also tells agents to inspect pinned versions and use locally installed types or schemas when those represent the project's version. This supports folding version matching into the explanation rather than adding another nearly identical rule. [Source: Cloudflare skill, Working principles](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L157).

The boundary is version relevance: the newest documentation can describe an API absent from an older checkout. If the necessary source cannot be read, disclose the missing verification rather than presenting a remembered signature as confirmed. Retrieval does not require searching the web for every trivial edit; the relevant evidence may already be in source, types, tests, or versioned documentation. These boundaries are editorial guidance, not additional Cloudflare quotations.

## Keep changes focused on the requested task

Proposed adaptation: “Keep changes focused on the requested task.” Cloudflare's general skill asks for the smallest satisfying change while preserving the project's architecture. Its exact relevant fragment is “make the smallest change that satisfies the request”. [Source: Cloudflare skill, Working principles](https://github.com/cloudflare/skills/blob/6eb6c781aa9b6438e0c7307bd102788a75fe1a6d/skills/cloudflare/SKILL.md#L161).

This changes scope decisions, whereas the chapter's simplicity rule changes implementation choices. A request to fix pagination need not trigger unrelated renaming or wholesale formatting. Necessary changes across callers, tests, and documentation remain part of the task. Avoid turning this into an absolute minimum-diff requirement: a tiny patch can preserve a broken design. RustFS explicitly permits restructuring relevant code when evidence warrants it and rejects unrelated cleanup. [Source: RustFS delivery contract](https://github.com/rustfs/rustfs/blob/7b010ddd70903028dc5d5d1f00d2356472132403/AGENTS.md#L18).

Reconcile this addition with the existing refactoring instruction in prose: the agent may suggest broader improvements and explain them, while their implementation requires inclusion in the agreed task.

## Make behavior-changing assumptions explicit

Proposed adaptation: “Make behavior-changing assumptions explicit.” RustFS's repository instructions say “State assumptions only when they affect behavior or verification.” The next sentence restricts questions to cases where a mistaken assumption would materially alter the result. [Source: RustFS operating model](https://github.com/rustfs/rustfs/blob/7b010ddd70903028dc5d5d1f00d2356472132403/AGENTS.md#L30).

Use this when a plausible default affects the product contract, such as which time zone defines the end of a reporting day or whether an empty filter returns all records. The agent should surface the assumption while the plan can still be reviewed. Routine naming or formatting choices do not need repeated questions. For material ambiguity that the repository cannot resolve, ask a specific question; merely declaring an assumption does not make every choice acceptable. This is an editorial example and boundary, not a claim measured by RustFS.

## Report what you verified and what you could not verify

Proposed adaptation: “Report what you verified and what you could not verify.” TransformerLens's repository instructions include “Never fabricate test counts or claim passes without running.” RustFS separately distinguishes implementation, local verification, CI success, publication, and merge. [Source: TransformerLens hard rules](https://github.com/TransformerLensOrg/TransformerLens/blob/6bea1fa7cfcbf9064aa8ac99bbd5fb1e4a6c2240/AGENTS.md#L160), [source: RustFS delivery contract](https://github.com/rustfs/rustfs/blob/7b010ddd70903028dc5d5d1f00d2356472132403/AGENTS.md#L23).

The practical result is a reviewable completion report: which meaningful check ran, its outcome, and what remains unverified. Passing unit tests does not establish that a real external integration worked; an unavailable service should be reported as a limit. The rule does not demand a new exhaustive test suite for every prose edit and does not replace the repository's required checks.

## Evidence limits and editorial recommendation

These are verified examples of instructions maintained in primary repositories. They establish provenance and intended behavior, not that adding the sentences improves a model's measured success rate. No controlled evaluation of these exact four phrases was found or claimed in this review. Keep the chapter's existing warning that instructions guide behavior without guaranteeing compliance.

Add the four sections to the chapter and keep the copyable block an optional menu. Combining the original five with these four should not imply every project needs all nine. Use pinned source links for provenance; the upstream default branches may change. The exact Cloudflare retrieval phrase belongs to the Agents SDK skill at the checked revision; do not attribute it to the current general Cloudflare skill, which expresses the same direction in different words.
