import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createSeo, describe, truncate } from '../book/.vitepress/seo.mjs';

const newSeo = () =>
  createSeo({
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

/**
 * @param {string} page
 * @param {string[]} pages
 * @param {Record<string, unknown>} pageData
 */
const headFor = (page, pages, pageData) =>
  // The page list is read once per instance, so each case gets its own.
  newSeo().transformHead(
    /** @type {any} */ ({
      page,
      siteConfig: { pages, rewrites: { map: { 'ru/README.md': 'ru/index.md' } } },
      pageData: { title: 'T', ...pageData }
    })
  );

/**
 * @param {import('vitepress').HeadConfig[]} head
 * @param {Record<string, string>} attributes
 */
const find = (head, attributes) =>
  head.find(([, attrs]) =>
    Object.entries(attributes).every(([key, value]) => attrs[key] === value)
  )?.[1];

test('the description is the first paragraph of the preferred section', () => {
  const html =
    '<h1 id="t">Title</h1><p>Lead.</p>' +
    '<h2 id="problem">Problem</h2><p>The problem.</p>' +
    '<h2 id="intent">Intent</h2><p><em>A note.</em></p><p>The intent.</p>';
  assert.equal(describe(html, ['intent', 'problem']), 'The intent.');
  assert.equal(describe(html, ['propósito', 'problem']), 'The problem.');
});

test('without a listed section the description skips an all-italic note', () => {
  const html = '<h1 id="t">Tool</h1><p><em>Checked on 2026-11-01.</em></p><p>What it is.</p>';
  assert.equal(describe(html, ['intent']), 'What it is.');
});

test('a long description is cut on a word boundary', () => {
  const text = `${'word '.repeat(40)}end`;
  const result = truncate(text);
  assert.ok(result.length <= 160, String(result.length));
  assert.match(result, /word…$/);
});

test('the markdown plugin puts the description into the frontmatter', () => {
  const html = '<h1 id="г">Гриллинг</h1><h2 id="назначение">Назначение</h2><p>Суть.</p>';
  const md = /** @type {any} */ ({ renderer: { render: () => html } });
  newSeo().markdown(md);

  /** @type {Record<string, any>} */
  const env = {};
  assert.equal(md.renderer.render([], {}, env), html);
  assert.equal(env.frontmatter.description, 'Суть.');

  const written = { frontmatter: { description: 'Written by hand.' } };
  md.renderer.render([], {}, written);
  assert.equal(written.frontmatter.description, 'Written by hand.');
});

test('head tags carry the description, canonical, hreflang and x-default links', () => {
  const head = headFor('ru/grilling.md', ['ru/grilling.md', 'en/grilling.md', 'ru/README.md'], {
    description: 'Суть.'
  });

  assert.equal(find(head, { name: 'description' })?.content, 'Суть.');
  assert.equal(find(head, { property: 'og:description' })?.content, 'Суть.');
  assert.equal(find(head, { rel: 'canonical' })?.href, 'https://example.org/book/ru/grilling.html');
  assert.equal(find(head, { hreflang: 'en' })?.href, 'https://example.org/book/en/grilling.html');
  assert.equal(
    find(head, { hreflang: 'x-default' })?.href,
    'https://example.org/book/en/grilling.html'
  );
  assert.equal(find(head, { hreflang: 'es' }), undefined);
  assert.equal(
    find(head, { property: 'og:image' })?.content,
    'https://example.org/book/assets/og/ru.png'
  );
});

test('a page with no description falls back to the site description', () => {
  const head = headFor('ru/SUMMARY.md', ['ru/SUMMARY.md'], { description: '' });
  assert.equal(find(head, { name: 'description' })?.content, 'About the book');
});

// VitePress's mergeHead keeps one meta per key: its id, else its first
// attribute other than content.
/** @param {import('vitepress').HeadConfig} tag */
const headKey = ([type, attrs]) => {
  if (attrs.id) {
    return `id=${attrs.id}`;
  }
  if (type === 'meta') {
    const name = Object.keys(attrs).find((key) => key !== 'content');
    return name && `${name}=${attrs[name]}`;
  }
  return undefined;
};

test('every locale alternate survives VitePress head deduplication', () => {
  const head = headFor('ru/grilling.md', ['ru/grilling.md', 'en/grilling.md', 'es/grilling.md'], {
    description: 'Суть.'
  });
  const keys = head.map(headKey).filter(Boolean);
  assert.deepEqual(keys, [...new Set(keys)]);
  const alternates = head
    .filter(([, attrs]) => attrs.property === 'og:locale:alternate')
    .map(([, attrs]) => attrs.content);
  assert.deepEqual(alternates, ['en_US', 'es_ES']);
});
