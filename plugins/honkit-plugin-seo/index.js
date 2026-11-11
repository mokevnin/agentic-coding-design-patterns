// @ts-check
'use strict';

// Adds search and link-preview metadata to the website build: a description
// taken from the chapter itself, canonical and hreflang links, Open Graph and
// Twitter card tags, and a sitemap.xml with the locale alternates.
//
// Honkit lets a `page` hook change only the page body, never <head>, and a
// template cannot see the sibling locales hreflang needs. So the plugin works
// on the finished HTML once, in the `finish` hook of the multilingual root book,
// which runs after every locale has been written.
//
// Pages carry large inline Mermaid SVGs, so the HTML is never re-serialised:
// cheerio only reads the title and the lead paragraph, and the tags are spliced
// into <head> as text.

const fs = require('node:fs');
const path = require('node:path');

const cheerio = require('cheerio');

const DESCRIPTION_LENGTH = 160;

const MARKER_START = '<!-- honkit-plugin-seo -->';
const MARKER_END = '<!-- /honkit-plugin-seo -->';

// og:locale wants language_TERRITORY; hreflang takes the bare language.
const OG_LOCALES = { ru: 'ru_RU', en: 'en_US', es: 'es_ES' };

/**
 * @param {string} value
 * @returns {string}
 */
function escapeAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Cut text to the description length on a word boundary.
 *
 * @param {string} text
 * @returns {string}
 */
function truncate(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= DESCRIPTION_LENGTH) {
    return clean;
  }
  const cut = clean.slice(0, DESCRIPTION_LENGTH - 1);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > 0 ? cut.slice(0, boundary) : cut).replace(/[\s,;:.—–-]+$/, '')}…`;
}

/**
 * Every .html file under a folder, as paths relative to it.
 *
 * @param {string} root
 * @param {string} [dir]
 * @returns {string[]}
 */
function listHtml(root, dir = '') {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listHtml(root, relative);
    }
    return entry.name.endsWith('.html') ? [relative] : [];
  });
}

/**
 * Locales are the output folders whose index.html declares that language,
 * so the list follows LANGS.md without repeating it here.
 *
 * @param {string} root
 * @returns {string[]}
 */
function findLocales(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      const index = path.join(root, name, 'index.html');
      if (!fs.existsSync(index)) {
        return false;
      }
      const lang = cheerio.load(fs.readFileSync(index, 'utf8'))('html').attr('lang');
      return lang === name;
    });
}

/**
 * Public URL of an output file; index pages map to their folder.
 *
 * @param {string} baseUrl
 * @param {string} file
 * @returns {string}
 */
function urlFor(baseUrl, file) {
  return baseUrl + file.replace(/(^|\/)index\.html$/, '$1');
}

/**
 * Title and description read from a rendered page.
 *
 * The description is the first paragraph of the first section listed in
 * `sections` that the page has (a pattern's intent, an anti-pattern's problem).
 * Other pages use their first paragraph, skipping an all-italic note such as
 * a tool chapter's "checked on" line.
 *
 * @param {string} html
 * @param {string[]} sections heading ids, most preferred first
 * @returns {{ title: string, description: string }}
 */
function readPage(html, sections) {
  const $ = cheerio.load(html);
  const content = $('.markdown-section').first();
  const title = content.find('h1').first().text().trim() || $('title').text().split(' · ')[0];

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
    .map((id) => content.children('h2').filter((_, element) => $(element).attr('id') === id))
    .find((match) => match.length > 0);
  const paragraph = heading
    ? firstProse(heading.first().nextUntil('h2', 'p'))
    : firstProse(content.children('p'));
  return { title: title.trim(), description: truncate(paragraph || '') };
}

/**
 * @param {Record<string, string>} tags
 * @param {'name' | 'property'} key
 * @returns {string[]}
 */
function metaTags(tags, key) {
  return Object.entries(tags).map(
    ([name, content]) => `<meta ${key}="${name}" content="${escapeAttribute(content)}">`
  );
}

module.exports = {
  hooks: {
    finish: function () {
      // PDFs and single-locale builds (`honkit pdf ./book/ru`) are left alone.
      if (this.output.name !== 'website' || !this.isMultilingual()) {
        return;
      }

      /** @type {{ baseUrl?: string, image?: string, imageWidth?: number, imageHeight?: number, descriptionSections?: string[] }} */
      const options = this.config.get('pluginsConfig.seo', {});
      if (!options.baseUrl) {
        throw new Error('honkit-plugin-seo: set pluginsConfig.seo.baseUrl in book.json');
      }
      const baseUrl = options.baseUrl.endsWith('/') ? options.baseUrl : `${options.baseUrl}/`;
      const siteName = this.config.get('title');
      const root = this.output.root();
      const locales = findLocales(root);
      const defaultLocale = locales.includes('en') ? 'en' : locales[0];

      // Slug -> locales that have it, for hreflang and the sitemap.
      /** @type {Map<string, string[]>} */
      const slugs = new Map();
      for (const locale of locales) {
        for (const file of listHtml(path.join(root, locale))) {
          slugs.set(file, [...(slugs.get(file) || []), locale]);
        }
      }

      /**
       * @param {string} locale
       * @returns {string}
       */
      const imageFor = (locale) =>
        options.image ? baseUrl + options.image.replace('{locale}', locale) : '';

      /**
       * Tags for one page, spliced into its <head>.
       *
       * @param {object} page
       * @param {string} page.file output path relative to the root
       * @param {string} page.locale
       * @param {string[]} page.alternates locales that have the same slug
       * @param {string} page.slug path inside the locale folder
       * @param {string} [page.url] public URL, when it is not the file's own
       * @param {string} [page.title] preview title, when the heading does not fit
       * @param {string} [page.fallbackDescription] for a page with no lead paragraph
       */
      const enrich = ({
        file,
        locale,
        alternates,
        slug,
        url = urlFor(baseUrl, file),
        title: titleOverride,
        fallbackDescription = ''
      }) => {
        const filePath = path.join(root, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const page = readPage(html, options.descriptionSections || []);
        const title = titleOverride || page.title;
        const description = page.description || fallbackDescription;
        const isHome = slug === 'index.html';
        const image = imageFor(locale);

        const links = [`<link rel="canonical" href="${url}">`];
        for (const alternate of alternates) {
          const href = urlFor(baseUrl, `${alternate}/${slug}`);
          links.push(`<link rel="alternate" hreflang="${alternate}" href="${href}">`);
        }
        if (alternates.includes(defaultLocale)) {
          const href = isHome ? baseUrl : urlFor(baseUrl, `${defaultLocale}/${slug}`);
          links.push(`<link rel="alternate" hreflang="x-default" href="${href}">`);
        }

        /** @type {Record<string, string>} */
        const og = {
          'og:type': isHome ? 'website' : 'article',
          'og:site_name': siteName,
          'og:title': title,
          'og:url': url,
          'og:locale': OG_LOCALES[locale] || locale
        };
        if (description) {
          og['og:description'] = description;
        }
        if (image) {
          og['og:image'] = image;
          og['og:image:alt'] = siteName;
          if (options.imageWidth && options.imageHeight) {
            og['og:image:width'] = String(options.imageWidth);
            og['og:image:height'] = String(options.imageHeight);
          }
        }
        const tags = [
          ...links,
          ...metaTags(og, 'property'),
          ...alternates
            .filter((alternate) => alternate !== locale)
            .map(
              (alternate) =>
                `<meta property="og:locale:alternate" content="${OG_LOCALES[alternate] || alternate}">`
            ),
          ...metaTags({ 'twitter:card': image ? 'summary_large_image' : 'summary' }, 'name')
        ];

        // Replacements are functions so a "$" in the text is never read as a
        // replacement pattern. The markers let a rebuild under `honkit serve`
        // that keeps an already processed page replace the block, not repeat it.
        const descriptionTag = `<meta name="description" content="${escapeAttribute(description)}">`;
        const block = [MARKER_START, ...tags, MARKER_END].join('\n        ');
        const result = html
          .replace(/<meta name="description" content="[^"]*">/, () => descriptionTag)
          .replace(new RegExp(`\\s*${MARKER_START}[\\s\\S]*?${MARKER_END}`), '')
          .replace(/\s*<\/head>/, () => `\n        ${block}\n    </head>`);
        fs.writeFileSync(filePath, result);
      };

      for (const [slug, alternates] of slugs) {
        for (const locale of alternates) {
          enrich({ file: `${locale}/${slug}`, locale, alternates, slug });
        }
      }

      // The root page is the language picker and the x-default for the home
      // pages. It has no prose of its own, so the book description stands in;
      // it is written in the default locale, like the picker itself.
      enrich({
        file: 'index.html',
        locale: defaultLocale,
        alternates: slugs.get('index.html') || [],
        slug: 'index.html',
        url: baseUrl,
        title: siteName,
        fallbackDescription: truncate(this.config.get('description', ''))
      });

      const entries = [...slugs].flatMap(([slug, alternates]) =>
        alternates.map((locale) => {
          const links = alternates.map(
            (alternate) =>
              `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${urlFor(baseUrl, `${alternate}/${slug}`)}"/>`
          );
          return [
            '  <url>',
            `    <loc>${urlFor(baseUrl, `${locale}/${slug}`)}</loc>`,
            ...links,
            '  </url>'
          ].join('\n');
        })
      );
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        `  <url>\n    <loc>${baseUrl}</loc>\n  </url>`,
        ...entries,
        '</urlset>',
        ''
      ].join('\n');
      fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
    }
  }
};
