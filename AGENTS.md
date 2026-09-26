# AGENTS.md

Operating guide for agents (and humans) working in this repository.

## Language

- Book content lives in `book/<locale>/` (ru/en/es); localized chapter skeletons in `templates/<locale>/`.
- Everything else — READMEs, configs, CI, and the `book/` chrome outside locale folders — is written in **English**.
- Book prose addresses the reader as «вы» in `ru` ("you" in `en`), never «ты»: the reader acts instead of an abstract third-person «разработчик» («вы утверждаете план», «включите режим планирования»). The developer may still appear as a named role in lists of participants and in diagrams.

## Diagrams

- Diagrams are written as ```` ```mermaid ```` fences directly in the chapter, so the labels are translated together with the prose and GitHub renders them in the repo.
- `plugins/honkit-plugin-mermaid` renders the fences into inline SVG at build time (Mermaid in headless Playwright), so diagrams also survive `honkit pdf`, which never runs JS.
- Shared palette and theme live in `mermaid.config.json`. Use the `accent`, `warn` and `muted` classes (`node:::accent`) instead of per-diagram `classDef`.
- The website also gets every diagram in a dark palette for the Honkit night theme: `mermaid.config.dark.json` holds only the keys that differ and is merged over `mermaid.config.json`. A new color or class in the light config needs its dark counterpart there, including the `accent`/`warn`/`muted` rules in `themeCSS`. The PDF gets the light palette only.
- Rendered SVGs are cached in `node_modules/.cache/honkit-mermaid`, keyed by diagram source plus theme config. The theme is read once at startup, so restart `make serve` after editing `mermaid.config.json` or `mermaid.config.dark.json`.
- Beyond `flowchart`, the types that survive this pipeline and the palette are `sequenceDiagram`, `stateDiagram-v2`, `gitGraph`, `quadrantChart`, `pie` and `sankey-beta`.
- `sankey-beta` accepts **ASCII only in node names** (Mermaid 12.0.0) — quoting does not help, and Cyrillic or even Spanish accents raise a parse error. Its `title:` and `%%` comments do take non-ASCII. Where it is used, node labels stay English with a `%% TODO` to localize them once upstream is fixed.
- Types that silently drop the frontmatter `title:` the book uses as a caption: `sankey-beta`, `mindmap`, `timeline`, `kanban`, `block-beta`, `architecture-beta`. Put the thesis in the paragraph under the diagram instead. `treemap-beta` scales label size with box area, so the smallest — usually most important — share is the least readable.
- A diagram is read inside a ~770px column. Keep it under ~1200px wide — prefer `flowchart TB` over a long left-to-right chain, and remember that a note hung off a node with `-.-` widens the diagram.

## Markdown formatting

- Do not hard-wrap prose to a fixed column width. Keep each paragraph, list item, and blockquote on one physical source line; use line breaks only for intentional Markdown structure such as headings, separate list items, tables, fenced code, and paragraph boundaries.

## Chapter content

- Write from practice: say what the reader does and why. No procedural filler such as «составьте список проходов и для каждого определите четыре вещи».
- Example prompts are what practitioners actually type. A skill is invoked bare or with a few generic words: `/retro`, `/code-review за последние 3 дня`, `/writing-for-agents проверь доки`. Never tell a skill what to do step by step, never enumerate checks in a prompt, and never use a skill's internal jargon (e.g. "Standards axis") — the skill already knows its job.
- Planning mode is assumed everywhere; call it «режим планирования» with no per-tool parentheticals. Prompts carry only the task (ideally just a ticket id); no «код не пиши», «план утверждаю» or front-loaded constraints — plan approval is the tool's confirmation, shown as narration.
- Tool-specific material comes in three blocks, in this order: what doesn't depend on the agent, then Claude Code, then Codex. Nothing agent-specific goes into the first block; each agent's built-ins live in its own block. State the checked version and date at the top of each agent block.
- In a practical how-to section, each tool or pass gets its own subheading one level below its block, and each example gets its own subheading one level lower still (`##### Пример`, or `##### Пример: …` when there are several). Write the body as prose — no tables, no bullet lists, no bold pseudo-labels like «**Что это.**». Say what it is (built-in command, bundled skill, third-party skill, app feature, or a plain prompt), how it works, when to run it, and link its source or docs.

## Commits

- Follow [Conventional Commits](https://www.conventionalcommits.org/), written in **English**.
- Enforced locally by a `commit-msg` hook: [lefthook](https://github.com/evilmartians/lefthook) (config in `lefthook.yml`) runs [commitlint](https://commitlint.js.org/). Both come from `pnpm install`, which also installs the hooks.
- Examples: `feat: add reflection pattern`, `docs: translate preface to es`, `ci: bump actions to latest`.

## Build / preview

- `make setup` — install deps and git hooks
- `make serve` — local preview (Honkit serve)
- `make build` — static build into `./dist`
- `pnpm exec playwright install chromium` — one-off, needed to render diagrams
- `make pdf` — PDFs for all locales
- `make update` — bump all dependencies to latest (npm-check-updates)

## Structure conventions

- Patterns are flat files `book/<locale>/<slug>.md`; grouping lives only in `book/<locale>/SUMMARY.md`.
- Shared binary assets in `book/assets/<slug>/`, referenced via `../assets/<slug>/...`. Diagrams are not assets — see above.
- Canonical locale is `ru`: write a pattern in Russian first, then translate.
- New pattern ideas are tracked in [CANDIDATES.md](CANDIDATES.md) — check it before writing a chapter, and record accepted/rejected there.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring workflow.
