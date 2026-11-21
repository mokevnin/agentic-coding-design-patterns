# Contributing

The book is built from Markdown with [VitePress](https://vitepress.dev/). Navigation and grouping come from `book/<locale>/SUMMARY.md` — a separate file per language; the site config turns it into the sidebar.

## Add a new pattern

0. Check [CANDIDATES.md](CANDIDATES.md) first. New ideas start there as a `candidate` row; adding a chapter means moving the idea to `accepted`. Rejected ideas stay documented so we don't reconsider them by accident.
1. Pick a kebab-case `slug` (e.g. `chain-of-thought`). It becomes the file name in every locale and the key under `book/assets/`.
2. Create the chapter in the canonical locale: copy [`templates/ru/pattern.md`](templates/ru/pattern.md) to `book/ru/<slug>.md` and fill it in. Do not change the section headings — they are the same across all chapters of that language.
3. Add a link in `book/ru/SUMMARY.md` under the right group heading (line order = order in the book).
4. Draw diagrams as ```` ```mermaid ```` fences right in the chapter — they are drawn in the reader's browser by [vitepress-mermaid](https://github.com/mokevnin/vitepress-mermaid) and translated together with the surrounding text. The build does not catch a syntax error, so check the page in `mise run serve`. Use the shared `accent` / `warn` / `muted` classes (`node:::accent`) so every diagram in the book shares one palette; the theme lives in `mermaid.config.json`, and its dark-mode counterpart in `mermaid.config.dark.json`.
5. Anything that is genuinely a file — images, sample code — goes in `book/assets/<slug>/` and is referenced with a relative path `../assets/<slug>/...`.
6. Preview with `mise run serve`.

## Extend an existing pattern

The book has no margin notes or comment threads: an addition becomes part of the chapter text.

1. Decide where it belongs. A new step, variant, consequence, or pitfall of the same technique goes into the matching template section of that chapter (`Implementation`, `Consequences and trade-offs`, `Anti-patterns and common mistakes`, and so on). If the idea works on its own and is useful outside this pattern, it is a candidate for a separate chapter — add it to [CANDIDATES.md](CANDIDATES.md) and link it from `Related patterns` instead.
2. For anything larger than a wording fix, open an issue first and describe the addition and the experience behind it, so the placement can be agreed before you write.
3. Edit `book/ru/<slug>.md` first. Keep the template headings; extend a section rather than adding a new one.
4. Update `book/en/` and `book/es/` in the same PR if you can; otherwise say so in the PR and the maintainer will translate. Refresh `source_rev` in every translation you touch.

Anti-patterns go into the separate "Anti-patterns" chapter and use `templates/<locale>/anti-pattern.md`.

Tool profiles are not patterns. Put them under the relevant methodology section, add `kind: tool` and `checked_on: YYYY-MM-DD` to their front matter, and use the practical-card structure: installation, workflow, artifacts, distinctions, and selection criteria. Show the check date to readers because commands and product capabilities change faster than pattern descriptions.

Recheck a tool profile against the tool's primary documentation before each book release and whenever its commands or capabilities are edited. Advance `checked_on` only after that verification; changing prose alone is not evidence that the product details are current.

## Chapter front matter (optional but useful)

VitePress takes the title from the first `#` and navigation from `SUMMARY.md`. A small front matter is handy as metadata and reads well on GitHub. Avoid keys VitePress reserves (`title`, `description`, `layout`, `outline`, `sidebar` and the like) unless you mean to override the page:

```yaml
---
group: task-setting      # area (mirrors the heading in SUMMARY.md)
status: draft            # draft | review | translated | done
related: [some-slug]
source_rev:              # for NON-canonical locales only (see below)
---
```

## Translation

- The canonical locale is `ru`. A pattern is written in Russian first.
- To translate, copy `book/ru/<slug>.md` to `book/<locale>/<slug>.md`, translate the text, and add a link to `book/<locale>/SUMMARY.md` in the same group. Use the matching template under `templates/<locale>/` for the localized headings.
- In the translation's front matter set `source_rev` — the git SHA of the ru chapter at the time of translating, so staleness can be tracked:

  ```sh
  git log -1 --format=%H -- book/ru/<slug>.md
  ```

## Conventions

- Do not hard-wrap Markdown prose to a fixed column width. Keep each paragraph, list item, and blockquote on one physical source line; use line breaks only for intentional Markdown structure.
- Inside `book/<locale>/` chapters are a flat list — no group folders.
- The set of `<slug>.md` files and the `SUMMARY.md` structure should match across locales.
- Assets are shared in `book/assets/` — do not duplicate images per locale.
- All text outside the language folders (`book/<locale>/`) and the localized templates is in English.

For environment setup and commit conventions, see [AGENTS.md](AGENTS.md).

## Reader-facing candidates

`CANDIDATES.md` is the authoritative backlog. Keep the brief candidate lists in `book/ru/candidates.md`, `book/en/candidates.md`, and `book/es/candidates.md` synchronized when a candidate is added, renamed, accepted, completed, or rejected. Include rows with status `candidate`; once a topic leaves that status, remove it from the brief list and update its existing discussion with the outcome and the chapter link, if available.

Reader discussions use GitHub Issues with the title `[Candidate] <slug>`. Search open and closed issues before creating one; reuse the existing thread to preserve votes. Readers vote with a thumbs-up reaction on the opening post. Keep the slug consistent across locales so all three editions link to the same discussion. The issue template supplies the common format; votes inform editorial priority rather than automatically accepting chapters.
