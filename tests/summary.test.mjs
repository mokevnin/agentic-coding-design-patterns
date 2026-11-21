import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';

import { parseSummary, readSummary } from '../book/.vitepress/summary.mjs';

test('SUMMARY.md becomes top-level links, groups and nested groups', () => {
  const source = [
    '# Contents',
    '',
    '* [Introduction](README.md)',
    '* [Preface](preface.md)',
    '',
    '## Spec-driven development',
    '',
    '* [Overview](spec-driven-development.md)',
    '',
    '### Tool reviews',
    '',
    '* [OpenSpec](openspec.md)',
    '',
    '## Anti-patterns',
    '',
    '* [Vibe coding](vibe-coding.md)',
    ''
  ].join('\n');

  assert.deepEqual(parseSummary(source, 'en'), [
    { text: 'Introduction', link: '/en/' },
    { text: 'Preface', link: '/en/preface' },
    {
      text: 'Spec-driven development',
      items: [
        { text: 'Overview', link: '/en/spec-driven-development' },
        { text: 'Tool reviews', items: [{ text: 'OpenSpec', link: '/en/openspec' }] }
      ]
    },
    { text: 'Anti-patterns', items: [{ text: 'Vibe coding', link: '/en/vibe-coding' }] }
  ]);
});

test('a nested group before any group is an error', () => {
  assert.throws(() => parseSummary('### Orphan\n', 'en'), /before any "##"/);
});

test('every chapter in each SUMMARY.md exists in its locale', () => {
  for (const locale of ['ru', 'en', 'es']) {
    const links = readSummary(`book/${locale}/SUMMARY.md`, locale)
      .flatMap(function flatten(item) {
        return [item, ...(item.items ?? []).flatMap(flatten)];
      })
      .map((item) => item.link)
      .filter((link) => link !== undefined);

    assert.ok(links.length > 0, locale);
    for (const link of links) {
      const page = link.slice(`/${locale}/`.length) || 'README';
      assert.ok(fs.existsSync(`book/${locale}/${page}.md`), `${locale}: ${link}`);
    }
  }
});
