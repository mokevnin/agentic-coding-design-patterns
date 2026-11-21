// @ts-check

// Search and link-preview metadata for every page: a description taken from
// the chapter itself, canonical and hreflang links, and Open Graph and Twitter
// card tags. The sitemap is VitePress's own; `sitemapItems` only adds the
// x-default alternate and keeps the language picker out of the locale groups.
//
// The description lives in the page's frontmatter, filled while the Markdown
// renders, because the VitePress client rewrites <meta name="description"> to
// the frontmatter description (or the site's) as soon as the page hydrates.

import fs from 'node:fs';
import path from 'node:path';

import * as cheerio from 'cheerio';
import { createMarkdownRenderer } from 'vitepress';

const DESCRIPTION_LENGTH = 160;

// og:locale wants language_TERRITORY; hreflang takes the bare language.
/** @type {Record<string, string>} */
const OG_LOCALES = { ru: 'ru_RU', en: 'en_US', es: 'es_ES' };

/**
 * @typedef {object} SeoOptions
 * @property {string} baseUrl public URL of the site root, ending in "/"
 * @property {string} siteName
 * @property {string} siteDescription stands in when a page and its locale's
 *   home page have no prose to describe them
 * @property {string[]} locales
 * @property {string} defaultLocale the x-default and the picker's language
 * @property {string} image preview card path under baseUrl; "{locale}" is replaced
 * @property {number} imageWidth
 * @property {number} imageHeight
 * @property {string[]} descriptionSections heading ids, most preferred first
 */

/**
 * Cut text to the description length on a word boundary.
 *
 * @param {string} text
 * @returns {string}
 */
export function truncate(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= DESCRIPTION_LENGTH) {
    return clean;
  }
  const cut = clean.slice(0, DESCRIPTION_LENGTH - 1);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > 0 ? cut.slice(0, boundary) : cut).replace(/[\s,;:.—–-]+$/, '')}…`;
}

/**
 * The description of a rendered page: the first paragraph of the first section
 * listed in `sections` that the page has (a pattern's intent, an anti-pattern's
 * problem). Other pages use their first paragraph, skipping an all-italic note
 * such as a tool chapter's "checked on" line.
 *
 * @param {string} html the page's rendered Markdown
 * @param {string[]} sections heading ids, most preferred first
 * @returns {string}
 */
export function describe(html, sections) {
  const $ = cheerio.load(html, null, false);
  const content = $.root();

  /** @param {import('cheerio').Cheerio<any>} paragraphs */
  const firstProse = (paragraphs) =>
    paragraphs
      .toArray()
      .filter((element) => {
        const node = $(element);
        const onlyItalic =
          node.children('em').length === 1 && node.children('em').text() === node.text();
        return node.text().trim() !== '' && !onlyItalic;
      })
      .map((element) => $(element).text())[0];

  const heading = sections
    .map((id) => content.children(`h2[id="${id}"]`))
    .find((match) => match.length > 0);
  const paragraph = heading
    ? firstProse(heading.first().nextUntil('h2', 'p'))
    : firstProse(content.children('p'));
  return truncate(paragraph || '');
}

/**
 * Public path of a page source, relative to the site root.
 *
 * @param {string} page e.g. "ru/grilling.md" or "ru/index.md"
 * @returns {string}
 */
function pathFor(page) {
  return page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html');
}

/**
 * @param {SeoOptions} options
 */
export function createSeo(options) {
  const { baseUrl, locales, defaultLocale } = options;

  /** @type {Map<string, string[]> | null} */
  let alternatesBySlug = null;

  /**
   * Slug (path inside a locale) -> locales that have it.
   *
   * @param {import('vitepress').SiteConfig} siteConfig
   */
  const alternatesFor = (siteConfig) => {
    if (alternatesBySlug === null) {
      alternatesBySlug = new Map();
      for (const source of siteConfig.pages) {
        const page = siteConfig.rewrites.map[source] || source;
        const [locale, ...rest] = page.split('/');
        if (locales.includes(locale)) {
          const slug = rest.join('/');
          alternatesBySlug.set(slug, [...(alternatesBySlug.get(slug) || []), locale]);
        }
      }
    }
    return alternatesBySlug;
  };

  /**
   * @param {Record<string, string>} tags
   * @param {'name' | 'property'} key
   * @returns {import('vitepress').HeadConfig[]}
   */
  const meta = (tags, key) =>
    Object.entries(tags).map(([name, content]) => ['meta', { [key]: name, content }]);

  return {
    /**
     * markdown-it plugin: describe each page from its rendered content, unless
     * its frontmatter already has a description.
     *
     * @param {import('vitepress').MarkdownRenderer} md
     */
    markdown(md) {
      const render = md.renderer.render.bind(md.renderer);
      md.renderer.render = (tokens, markdownOptions, env) => {
        const html = render(tokens, markdownOptions, env);
        env.frontmatter ??= {};
        if (!env.frontmatter.description) {
          const description = describe(html, options.descriptionSections);
          if (description) {
            env.frontmatter.description = description;
          }
        }
        return html;
      };
    },

    /**
     * A locale page with no prose of its own (the table of contents) takes the
     * description of the locale's home page.
     *
     * @type {NonNullable<import('vitepress').UserConfig['transformPageData']>}
     */
    async transformPageData(pageData, { siteConfig }) {
      const [locale] = pageData.relativePath.split('/');
      const home = `${locale}/index.md`;
      if (pageData.description || !locales.includes(locale) || pageData.relativePath === home) {
        return;
      }
      const source = siteConfig.rewrites.inv[home] || home;
      const file = path.join(siteConfig.srcDir, source);
      const md = await createMarkdownRenderer(
        siteConfig.srcDir,
        siteConfig.markdown,
        siteConfig.site.base,
        siteConfig.logger
      );
      /** @type {import('vitepress').MarkdownEnv} */
      const env = { path: file, relativePath: home, cleanUrls: siteConfig.cleanUrls };
      await md.renderAsync(fs.readFileSync(file, 'utf8'), env);
      const description = env.frontmatter?.description;
      return description ? { description } : undefined;
    },

    /** @type {(context: import('vitepress').TransformContext) => import('vitepress').HeadConfig[]} */
    transformHead({ page, siteConfig, pageData }) {
      if (page === '404.md') {
        return [];
      }
      const [first, ...rest] = page.split('/');
      const isPicker = !locales.includes(first);
      const locale = isPicker ? defaultLocale : first;
      const slug = isPicker ? 'index.md' : rest.join('/');
      const isHome = slug === 'index.md';
      const alternates = alternatesFor(siteConfig).get(slug) || [];
      const url = baseUrl + pathFor(page);
      const title = isPicker ? options.siteName : pageData.title;
      const description = pageData.description || truncate(options.siteDescription);
      const image = baseUrl + options.image.replace('{locale}', locale);

      /** @type {import('vitepress').HeadConfig[]} */
      const links = [['link', { rel: 'canonical', href: url }]];
      for (const alternate of alternates) {
        links.push([
          'link',
          { rel: 'alternate', hreflang: alternate, href: baseUrl + pathFor(`${alternate}/${slug}`) }
        ]);
      }
      if (alternates.includes(defaultLocale)) {
        const href = isHome ? baseUrl : baseUrl + pathFor(`${defaultLocale}/${slug}`);
        links.push(['link', { rel: 'alternate', hreflang: 'x-default', href }]);
      }

      /** @type {Record<string, string>} */
      const og = {
        'og:type': isHome ? 'website' : 'article',
        'og:site_name': options.siteName,
        'og:title': title,
        'og:url': url,
        'og:locale': OG_LOCALES[locale] || locale,
        'og:description': description,
        'og:image': image,
        'og:image:alt': options.siteName,
        'og:image:width': String(options.imageWidth),
        'og:image:height': String(options.imageHeight)
      };

      return [
        // Replaces the tag VitePress emits, which falls back to the site description.
        ['meta', { name: 'description', content: description }],
        ...links,
        ...meta(og, 'property'),
        // VitePress keeps one meta per key (its id, else its first attribute
        // besides content), so repeated og:locale:alternate tags each need an id.
        ...alternates
          .filter((alternate) => alternate !== locale)
          .map(
            (alternate) =>
              /** @type {import('vitepress').HeadConfig} */ ([
                'meta',
                {
                  id: `og-locale-alternate-${alternate}`,
                  property: 'og:locale:alternate',
                  content: OG_LOCALES[alternate] || alternate
                }
              ])
          ),
        ...meta({ 'twitter:card': 'summary_large_image' }, 'name')
      ];
    },

    /**
     * VitePress groups pages by their path inside a locale, which lumps the
     * language picker (index.md) in with the locale home pages. Give the picker
     * no alternates, and point every group's x-default at the default locale,
     * or at the picker for the home pages.
     *
     * @param {import('vitepress').SitemapItem[]} items
     * @returns {import('vitepress').SitemapItem[]}
     */
    sitemapItems(items) {
      return items.map((item) => {
        if (item.url === '' || !item.links) {
          return { ...item, links: undefined };
        }
        const links = item.links.filter((link) => link.url !== '');
        const fallback = links.find((link) => link.lang === defaultLocale);
        if (fallback) {
          const isHome = fallback.url === `${defaultLocale}/`;
          links.push({ lang: 'x-default', url: isHome ? '' : fallback.url });
        }
        return { ...item, links };
      });
    }
  };
}
