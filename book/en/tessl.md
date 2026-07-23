---
group: sdd
status: draft
related: [spec-driven-development]
source_rev: 07fc27a4a9be99f1aa6f1a42525711a2e8b2e9f3
---

# Tessl

[Tessl](https://tessl.io) is the most radical take on
[spec-driven development](spec-driven-development.md): the specification is
not a companion to the code but its *source*. Code is a derived artifact, like
a binary produced by compilation; editing it behind the specification's back
is like patching compiler output. The company was founded by Guy Podjarny
(founder of Snyk), with about $125M raised behind this bet.

Tessl is agent-agnostic: it claims to work with every popular coding agent.

## From framework to platform

Tessl has evolved noticeably, which is worth keeping in mind when reading
about it:

- **The framework and Spec Registry (2025).** In the original framework, code
  files were marked with annotations: `@generate` — the code is generated from
  the specification and never edited by hand; `@describe` — the specification
  documents existing code. The specification's capabilities were linked to
  tests, and the tests verified that the regenerated code conformed. The Spec
  Registry offered more than 10,000 ready-made specifications of popular
  open-source libraries so that agents would not hallucinate their APIs.
- **The "context as code" platform (2026).** Today Tessl positions itself more
  broadly — as a context platform for agents: a registry/package manager,
  governance, evals, observability, its own Tessl Agent. SDD became one of the
  platform's installable plugins.

## Workflow

The SDD plugin is installed via the CLI:

```sh
tessl init
tessl install tessl-labs/spec-driven-development
```

The process then looks like this:

1. **Requirements gathering.** The agent asks clarifying questions until the
   intent is unambiguous.
2. **Specifications.** The agent writes Markdown specifications into the
   `specs/` directory; capabilities are linked to tests with `[@test]` marks —
   every statement in the specification has a check.
3. **Approval and implementation.** After the specifications are reviewed, the
   agent implements the code against them — and folds back into the
   specifications everything discovered during development: the document and
   the code do not drift apart.

Around this sit the platform commands: `tessl search / install / list /
update` (working with the registry), `tessl review run` (reviews, including
Snyk-powered security checks), `tessl eval run` (evals), `tessl skill new /
publish` and `tessl plugin new / publish` (your own skills and plugins).

## What makes it different

- The specification–code relationship is inverted: the specification does not
  describe the code, the code implements the specification; on conflict, the
  code is what gets fixed.
- Tests are bound to the specification's statements: "the specification holds"
  literally means a green run of its checks.
- The registry as a package manager: specifications, skills, and plugins are
  distributed and versioned as packages.
- Maximalism: the other frameworks make the specification come *first*; Tessl
  makes it *rule*.

## When to choose it

Tessl is the choice for those ready to accept the "code is a derived artifact"
bet in full: it gives the strongest guarantee that document and code stay in
sync, but demands the biggest change of habits. For a more conservative entry
into SDD, start with [Spec Kit](spec-kit.md) or [OpenSpec](openspec.md) —
there the specification disciplines the process while the code remains
ordinary code.
