# AGENTS.md

Operating guide for agents (and humans) working in this repository.

## Language

- Book content lives in `book/<locale>/` (ru/en/es); localized chapter skeletons
  in `templates/<locale>/`.
- Everything else — READMEs, configs, CI, and the `book/` chrome outside locale
  folders — is written in **English**.

## Commits

- Follow [Conventional Commits](https://www.conventionalcommits.org/), written in
  **English**.
- Enforced locally by a `commit-msg` hook: [lefthook](https://github.com/evilmartians/lefthook)
  (config in `lefthook.yml`) runs [commitlint](https://commitlint.js.org/).
  Both come from `npm install`, which also installs the hooks.
- Examples: `feat: add reflection pattern`, `docs: translate preface to es`,
  `ci: bump actions to latest`.

## Build / preview

- `make setup` — install deps and git hooks
- `make serve` — local preview (Honkit serve)
- `make build` — static build into `./dist`
- `make pdf` — PDFs for all locales

## Structure conventions

- Patterns are flat files `book/<locale>/<slug>.md`; grouping lives only in
  `book/<locale>/SUMMARY.md`.
- Shared assets in `book/assets/<slug>/`, referenced via `../assets/<slug>/...`.
- Canonical locale is `ru`: write a pattern in Russian first, then translate.
- New pattern ideas are tracked in [CANDIDATES.md](CANDIDATES.md) — check it
  before writing a chapter, and record accepted/rejected there.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring workflow.
