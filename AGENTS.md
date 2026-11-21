# AGENTS.md

Operating guide for agents (and humans) working in this repository.

## Language

- Book content lives in `book/<locale>/` (ru/en/es); localized chapter skeletons in `templates/<locale>/`.
- Everything else — READMEs, configs, CI, and the `book/` chrome outside locale folders — is written in **English**.
- Book prose addresses the reader as «вы» in `ru` ("you" in `en`), never «ты»: the reader acts instead of an abstract third-person «разработчик» («вы утверждаете план», «включите режим планирования»). The developer may still appear as a named role in lists of participants and in diagrams. The `es` edition addresses the reader as «tú».

## Diagrams

- Diagrams are written as ```` ```mermaid ```` fences directly in the chapter, so the labels are translated together with the prose and GitHub renders them in the repo.
- [vitepress-mermaid](https://github.com/mokevnin/vitepress-mermaid) turns the fences into a `<Mermaid>` component that draws the diagram in the reader's browser and redraws it when dark mode is toggled. Rendering happens in the browser, so `mise run build` does not catch a Mermaid syntax error: open the page after editing a diagram and look for red source text (a `data-mermaid-error` element).
- Shared palette and theme live in `mermaid.config.json`. Use the `accent`, `warn` and `muted` classes (`node:::accent`) instead of per-diagram `classDef`.
- Dark mode uses a dark palette: `mermaid.config.dark.json` holds only the keys that differ and is merged over `mermaid.config.json` in `book/.vitepress/theme/mermaid-palette.mjs`. A new color or class in the light config needs its dark counterpart there, including the `accent`/`warn`/`muted` rules in `themeCSS`. `fontFamily` is ignored: diagrams use the page font.
- Beyond `flowchart`, the types that survive this pipeline and the palette are `sequenceDiagram`, `stateDiagram-v2`, `gitGraph`, `quadrantChart`, `pie` and `sankey-beta`.
- `sankey-beta` accepts **ASCII only in node names** (Mermaid 12.0.0) — quoting does not help, and Cyrillic or even Spanish accents raise a parse error. Its `title:` and `%%` comments do take non-ASCII. Where it is used, node labels stay English with a `%% TODO` to localize them once upstream is fixed.
- Types that silently drop the frontmatter `title:` the book uses as a caption: `sankey-beta`, `mindmap`, `timeline`, `kanban`, `block-beta`, `architecture-beta`. Put the thesis in the paragraph under the diagram instead. `treemap-beta` scales label size with box area, so the smallest — usually most important — share is the least readable.
- A diagram is read inside a ~690px column. Keep it under ~1200px wide — prefer `flowchart TB` over a long left-to-right chain, and remember that a note hung off a node with `-.-` widens the diagram.

## SEO and link previews

- `book/.vitepress/seo.mjs` adds per-page head tags in VitePress's `transformHead`: `meta description` from the chapter text, canonical, `hreflang` and Open Graph/Twitter tags. `sitemap.xml` is VitePress's own, with an x-default alternate added.
- The public URL, base path and preview image live in `book/.vitepress/config.mjs`; change `BASE_URL` and `base` there when the site moves to its own domain.
- The description is the first paragraph of a pattern's intent section, or an anti-pattern's problem section; other pages use their first paragraph, skipping an all-italic note. The section heading ids per locale are `descriptionSections` in the same config: add the id there when a new chapter kind opens differently. That paragraph should state the chapter's point on its own.
- Preview cards are `book/assets/og/<locale>.png`, rendered from `book/.vitepress/og-card.html`; the command to rerender one is at the top of that file.

## Markdown formatting

- Do not hard-wrap prose to a fixed column width. Keep each paragraph, list item, and blockquote on one physical source line; use line breaks only for intentional Markdown structure such as headings, separate list items, tables, fenced code, and paragraph boundaries.

## Chapter content

- Write from practice: say what the reader does and why. No procedural filler such as «составьте список проходов и для каждого определите четыре вещи».
- Example prompts are what practitioners actually type. A skill is invoked bare or with a few generic words: `/retro`, `/code-review за последние 3 дня`, `/writing-for-agents проверь доки`. Never tell a skill what to do step by step, never enumerate checks in a prompt, and never use a skill's internal jargon (e.g. "Standards axis") — the skill already knows its job.
- Show prompts, not configs. Readers ask the agent to change its own settings («выключи автопамять в этом проекте»), so a chapter shows that request and what it achieves (scope, who it affects, what to commit) — never a settings key, a JSON/TOML/YAML snippet, or the file it goes into. This covers agent, tool and CI setup; content artifacts the chapter is about (a feature list, an eval spec, a script's output, a guardrail script being demonstrated) stay as code blocks.
- Tool profiles explain purpose, workflow, artifacts and selection criteria. Leave installation commands, runtime prerequisites and package-manager details to linked upstream documentation; they do not belong in the book. A dated verification snapshot may identify the version checked.
- Planning mode is assumed everywhere; call it «режим планирования» with no per-tool parentheticals. Prompts carry only the task (ideally just a ticket id); no «код не пиши», «план утверждаю» or front-loaded constraints — plan approval is the tool's confirmation, shown as narration.
- Tool-specific material comes in three blocks, in this order: what doesn't depend on the agent, then Claude Code, then Codex. Nothing agent-specific goes into the first block; each agent's built-ins live in its own block. State the checked version and date at the top of each agent block.
- In a practical how-to section, each tool or pass gets its own subheading one level below its block, and each example gets its own subheading one level lower still (`##### Пример`, or `##### Пример: …` when there are several). Write the body as prose — no tables, no bullet lists, no bold pseudo-labels like «**Что это.**». Say what it is (built-in command, bundled skill, third-party skill, app feature, or a plain prompt), how it works, when to run it, and link its source or docs.

## Commits

- Follow [Conventional Commits](https://www.conventionalcommits.org/), written in **English**.
- Enforced by [commitlint](https://commitlint.js.org/) in the `commit-msg` git hook ([hk](https://hk.jdx.dev), `hk.pkl`, installed by `mise run setup`) and over the PR range in CI.
- Examples: `feat: add reflection pattern`, `docs: translate preface to es`, `ci: bump actions to latest`.

## Checks

- `mise run check` runs every check (jactionlint, betterleaks, typos, rumdl, agnix, oxlint, oxfmt, syncpack, local links, merge/case conflicts and symlinks) and must pass before a change is done; CI runs the same task, and the hk `pre-commit` hook runs the same steps on staged files. Steps live in `hk.pkl`. `mise run fix` applies the safe autofixes. Tool versions are pinned in `mise.toml` and `mise.lock`; pnpm is read from `package.json`. Oxfmt formats code and configuration; rumdl owns Markdown.
- `.agents/skills/` (and the `.claude/skills/` symlinks into it) are vendored and pinned by hash in `skills-lock.json`: never edit them by hand.
- Prefer an existing tool over a hand-written script, and install tools through `mise`, never through shell fallback chains.
- Never disable a lint rule to get a change through. An exception is narrow (one path, one rule), carries a reason in the config, and needs a human decision.

## Build / preview

- Use mise 2026.11.3 or newer; CI pins 2026.11.8. Commit `mise.lock` alongside tool updates; it covers Linux x64 and macOS arm64.
- `mise run setup` — install locked deps, pinned linters and git hooks
- `mise run serve` — local preview with hot reload (VitePress dev server)
- `mise run build` — static build into `./dist`; VitePress fails it on a dead link between pages
- `mise run preview` — serve the `./dist` build locally
- `mise run update` — bump project tools and dependencies; when hk changes, also update both versioned Pkl imports in `hk.pkl`

## Structure conventions

- Chapter titles are short GoF-style noun names, 1–3 words per locale («Четыре фазы», not «Исследование — план — код — коммит»); the source's long name goes under «Также известен как».
- A new chapter ships in `ru`, `en` and `es` in the same pass, each with its `SUMMARY.md` entry.
- Patterns are flat files `book/<locale>/<slug>.md`; grouping lives only in `book/<locale>/SUMMARY.md`.
- Shared binary assets in `book/assets/<slug>/`, referenced via `../assets/<slug>/...`. Diagrams are not assets — see above.
- Canonical locale is `ru`: write a pattern in Russian first, then translate.
- New pattern ideas are tracked in [CANDIDATES.md](CANDIDATES.md) — check it before writing a chapter, and record accepted/rejected there.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring workflow.
