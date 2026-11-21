import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createSeo, describe, truncate } from '../book/.vitepress/seo.mjs';

/** @param {string} body */
const page = (body) => `<div class="VPDoc"><div class="vp-doc _x"><div>${body}</div></div></div>`;

test('the description is the first paragraph of the preferred section', () => {
  const html = page(
    '<h1 id="t">Title</h1><p>Lead.</p>' +
      '<h2 id="problem">Problem</h2><p>The problem.</p>' +
      '<h2 id="intent">Intent</h2><p><em>A note.</em></p><p>The intent.</p>'
  );
  assert.equal(describe(html, ['intent', 'problem']), 'The intent.');
  assert.equal(describe(html, ['propósito', 'problem']), 'The problem.');
});

test('without a listed section the description skips an all-italic note', () => {
  const html = page('<h1 id="t">Tool</h1><p><em>Checked on 2026-11-01.</em></p><p>What it is.</p>');
  assert.equal(describe(html, ['intent']), 'What it is.');
});

test('a long description is cut on a word boundary', () => {
  const text = `${'word '.repeat(40)}end`;
  const result = truncate(text);
  assert.ok(result.length <= 160, String(result.length));
  assert.match(result, /word…$/);
});

test('head tags carry canonical, hreflang and x-default links', () => {
  const seo = createSeo({
    baseUrl: 'https://example.org/book/',
    siteName: 'Book',
    siteDescription: 'About the book',
    locales: ['ru', 'en', 'es'],
    defaultLocale: 'en',
    image: 'assets/og/{locale}.png',
    imageWidth: 1200,
    imageHeight: 630,
    descriptionSections: ['назначение']
  });
  const siteConfig = /** @type {any} */ ({
    pages: ['ru/grilling.md', 'en/grilling.md', 'ru/README.md'],
    rewrites: { map: { 'ru/README.md': 'ru/index.md' } }
  });
  const head = seo.transformHead(
    /** @type {any} */ ({
      page: 'ru/grilling.md',
      siteConfig,
      pageData: { title: 'Гриллинг' },
      content: page('<h1 id="г">Гриллинг</h1><h2 id="назначение">Назначение</h2><p>Суть.</p>')
    })
  );
  const find = (/** @type {Record<string, string>} */ attributes) =>
    head.find(([, attrs]) =>
      Object.entries(attributes).every(([key, value]) => attrs[key] === value)
    )?.[1];

  assert.equal(find({ name: 'description' })?.content, 'Суть.');
  assert.equal(find({ rel: 'canonical' })?.href, 'https://example.org/book/ru/grilling.html');
  assert.equal(find({ hreflang: 'en' })?.href, 'https://example.org/book/en/grilling.html');
  assert.equal(find({ hreflang: 'x-default' })?.href, 'https://example.org/book/en/grilling.html');
  assert.equal(find({ hreflang: 'es' }), undefined);
  assert.equal(
    find({ property: 'og:image' })?.content,
    'https://example.org/book/assets/og/ru.png'
  );
});
