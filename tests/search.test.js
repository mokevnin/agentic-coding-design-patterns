'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const honkitRequire = createRequire(require.resolve('honkit'));
const lunr = createRequire(honkitRequire.resolve('gitbook-plugin-lunr'))('lunr');

test('multilingual search indexes contain only visible text from their own edition', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'honkit-search-'));
  const output = path.join(root, '_book');
  const editions = {
    en: { title: 'English chapter', token: 'englishonly' },
    ru: { title: 'Русская глава', token: 'russianonly' },
    es: { title: 'Capítulo español', token: 'spanishonly' }
  };

  try {
    fs.writeFileSync(path.join(root, 'README.md'), '# Search fixture\n');
    fs.writeFileSync(
      path.join(root, 'LANGS.md'),
      '# Languages\n\n' +
        Object.keys(editions)
          .map((locale) => `* [${locale}](${locale}/)\n`)
          .join('')
    );
    for (const [locale, { title, token }] of Object.entries(editions)) {
      fs.mkdirSync(path.join(root, locale));
      fs.writeFileSync(
        path.join(root, locale, 'README.md'),
        `# ${title}\n\nagent ${token}\n\n<style>.invisiblestyle { color: red; }</style>\n`
      );
      fs.writeFileSync(
        path.join(root, locale, 'SUMMARY.md'),
        `# Summary\n\n* [${title}](README.md)\n`
      );
    }

    execFileSync(
      process.execPath,
      [require.resolve('honkit/bin/honkit.js'), 'build', root, output],
      {
        timeout: 30_000,
        stdio: 'pipe'
      }
    );

    for (const [locale, { title, token }] of Object.entries(editions)) {
      const { store, index } = JSON.parse(
        fs.readFileSync(path.join(output, locale, 'search_index.json'), 'utf8')
      );
      const documents = Object.values(store);
      assert.equal(documents.length, 1, `${locale}: unexpected search documents`);
      assert.equal(documents[0].title, title, `${locale}: wrong search result title`);
      assert.match(documents[0].body, new RegExp(token), `${locale}: wrong search excerpt`);
      assert.doesNotMatch(
        documents[0].body,
        /invisiblestyle/,
        `${locale}: styles are not searchable prose`
      );
      // Check the actual search index too: correcting the display store alone
      // would still let words from another edition match the current page.
      const search = lunr.Index.load(index);
      assert.equal(search.search(token).length, 1, `${locale}: local word must match`);
      assert.equal(search.search('invisiblestyle').length, 0, `${locale}: CSS must not match`);
      for (const other of Object.values(editions).filter((edition) => edition.token !== token)) {
        assert.equal(
          search.search(other.token).length,
          0,
          `${locale}: foreign word must not match`
        );
      }
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
