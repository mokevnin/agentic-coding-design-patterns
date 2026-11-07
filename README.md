# Agentic Coding Design Patterns

A catalog of patterns in the spirit of the "Gang of Four" (GoF) about **how a
developer works with an AI agent when writing code**. It is a book built from
markdown with [Honkit](https://github.com/honkit/honkit) (a GitBook fork), with
print (PDF/EPUB) in mind.

📖 **Online:** <https://mokevnin.github.io/agentic-coding-design-patterns/>

**Languages:** [Русский](book/ru/) · [English](book/en/) · [Español](book/es/)

## Repository layout

```text
book/                 — the book root (Honkit)
  book.json           — Honkit config
  LANGS.md            — list of languages (Honkit multilingual)
  <locale>/
    SUMMARY.md        — table of contents: groups = headings, patterns = links
    README.md         — locale landing page
    <slug>.md         — a chapter (flat list, no group folders)
  assets/<slug>/      — diagrams and code samples shared across languages
templates/<locale>/   — localized pattern.md and anti-pattern.md skeletons
```

Patterns are grouped by area of working with an agent: task setting, working with
context, verification, project organization. **Anti-patterns** live in a separate
general chapter. There are no group folders in the tree: patterns are flat files,
convenient to read right on GitHub. Grouping and order come from each locale's
`SUMMARY.md`. Assets are shared in `book/assets/` and referenced via
`../assets/<slug>/...`.

One pattern = a file `book/<locale>/<slug>.md`. The file name (`<slug>`) is the
same across all locales.

## Development

```sh
mise run setup    # locked toolchain, workspace dependencies and git hooks
mise run serve    # local preview (honkit serve)
mise run check    # the same quality gates as CI
mise run build    # static build into ./dist
mise run pdf      # PDFs for all locales (requires Calibre/ebook-convert)
mise run update   # update project tools and all workspace dependencies
```

Use [mise](https://mise.jdx.dev/) 2026.11.3 or newer; CI pins 2026.11.4. Node is pinned in `mise.toml`; mise reads pnpm from `package.json`. `mise.lock` records tool downloads and checksums for Linux x64 and macOS arm64. Both setup and CI install from the committed lockfiles. After updating hk, update the two versioned Pkl imports in `hk.pkl` as well.

The [Dev Quality Gates](https://github.com/mokevnin/dev-quality-gates) checks run through `hk.pkl`: code lint and formatting, workspace dependency consistency, Markdown, spelling, agent configuration, workflow security, secrets, local documentation links, conflict markers, filename case collisions and broken symlinks. Local links are checked offline so commits do not depend on external websites. Known dependency vulnerabilities are checked by the scheduled audit workflow.

- How to add a pattern and how translations work — see [CONTRIBUTING.md](CONTRIBUTING.md).
- The canonical locale is `ru`: a pattern is first written in Russian, then
  translated to `en`/`es`.

## License

Text and diagrams — [CC BY-SA 4.0](LICENSE); code samples — CC0.
