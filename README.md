# Agentic Coding Design Patterns

A catalog of patterns in the spirit of the "Gang of Four" (GoF) about **how a
developer works with an AI agent when writing code**. It is a book built from
markdown with [Honkit](https://github.com/honkit/honkit) (a GitBook fork), with
print (PDF/EPUB) in mind.

📖 **Online:** https://mokevnin.github.io/agentic-coding-design-patterns/

**Languages:** [Русский](book/ru/) · [English](book/en/) · [Español](book/es/)

## Repository layout

```
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
npm install
npm start          # local preview (honkit serve)
npm run build      # static build into ./dist
npm run pdf:ru     # PDF for a locale (requires Calibre/ebook-convert)
```

- How to add a pattern and how translations work — see [CONTRIBUTING.md](CONTRIBUTING.md).
- The canonical locale is `ru`: a pattern is first written in Russian, then
  translated to `en`/`es`.

## License

Text and diagrams — [CC BY-SA 4.0](LICENSE); code samples — CC0.
