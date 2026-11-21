// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import slugid from 'github-slugid';
import { mermaidMarkdown } from '@mokevnin/vitepress-mermaid/markdown';
import { defineConfig } from 'vitepress';

import { createSeo } from './seo.mjs';
import { readSummary } from './summary.mjs';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const bookRoot = path.join(repoRoot, 'book');

const SITE_NAME = 'Agentic Design Patterns';
const SITE_DESCRIPTION =
  'Design patterns for coding with AI agents, in the spirit of the Gang of Four';
const REPO_URL = 'https://github.com/mokevnin/agentic-coding-design-patterns';
// The public URL. Change it (and `base`) when the site moves to its own domain.
const BASE_URL = 'https://mokevnin.github.io/agentic-coding-design-patterns/';

const seo = createSeo({
  baseUrl: BASE_URL,
  siteName: SITE_NAME,
  siteDescription: SITE_DESCRIPTION,
  locales: ['ru', 'en', 'es'],
  defaultLocale: 'en',
  image: 'assets/og/{locale}.png',
  imageWidth: 1200,
  imageHeight: 630,
  // Heading ids of the section whose first paragraph becomes the description:
  // a pattern's intent, then an anti-pattern's problem, in every locale.
  descriptionSections: ['назначение', 'intent', 'propósito', 'проблема', 'problem', 'problema']
});

/**
 * Settings shared by every locale, plus the strings each one translates.
 *
 * @param {string} locale
 * @param {Partial<import('vitepress').DefaultTheme.Config>} strings
 * @returns {import('vitepress').DefaultTheme.Config}
 */
function themeFor(locale, strings) {
  return {
    sidebar: readSummary(path.join(bookRoot, locale, 'SUMMARY.md'), locale),
    ...strings
  };
}

export default defineConfig({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  lang: 'en',
  base: '/agentic-coding-design-patterns/',
  outDir: '../dist',
  // Keep the .html URLs the book has always had.
  cleanUrls: false,
  // README.md is the home page of the book and of each locale, as on GitHub.
  rewrites: {
    'README.md': 'index.md',
    ':locale/README.md': ':locale/index.md'
  },
  // SUMMARY.md also builds the sidebar; as a page it is the table of contents
  // the locale home pages link to.
  srcExclude: ['dist/**'],

  // No root locale: the site root is the language picker, outside all three.
  locales: {
    ru: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: themeFor('ru', {
        outline: { level: [2, 3], label: 'На этой странице' },
        docFooter: { prev: 'Назад', next: 'Далее' },
        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Светлая тема',
        darkModeSwitchTitle: 'Тёмная тема',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Наверх',
        langMenuLabel: 'Язык',
        skipToContentLabel: 'Перейти к содержимому',
        notFound: {
          title: 'Страница не найдена',
          quote: 'Такой страницы в книге нет.',
          linkLabel: 'на главную',
          linkText: 'На главную'
        }
      })
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: themeFor('en', { outline: { level: [2, 3] } })
    },
    es: {
      label: 'Español',
      lang: 'es',
      themeConfig: themeFor('es', {
        outline: { level: [2, 3], label: 'En esta página' },
        docFooter: { prev: 'Anterior', next: 'Siguiente' },
        darkModeSwitchLabel: 'Apariencia',
        lightModeSwitchTitle: 'Team claro',
        darkModeSwitchTitle: 'Team oscuro',
        sidebarMenuLabel: 'Menú',
        returnToTopLabel: 'Volver arriba',
        langMenuLabel: 'Idioma',
        skipToContentLabel: 'Saltar al contenido',
        notFound: {
          title: 'Página no encontrada',
          quote: 'Esta página no existe en el libro.',
          linkLabel: 'ir al inicio',
          linkText: 'Ir al inicio'
        }
      })
    }
  },

  themeConfig: {
    nav: [
      {
        text: 'Telegram',
        items: [
          { text: 'Hexlet AI Club', link: 'https://t.me/hexletclub' },
          { text: 'Organized Programming', link: 'https://t.me/orgprog' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: REPO_URL, ariaLabel: 'GitHub' },
      {
        icon: 'youtube',
        link: 'https://www.youtube.com/@mokevnin',
        ariaLabel: 'Organized Programming (YouTube)'
      }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          ru: {
            translations: {
              button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
              modal: {
                displayDetails: 'Подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Ничего не найдено',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перейти',
                  closeText: 'закрыть'
                }
              }
            }
          },
          es: {
            translations: {
              button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
              modal: {
                displayDetails: 'Lista detallada',
                resetButtonTitle: 'Restablecer búsqueda',
                backButtonTitle: 'Cerrar búsqueda',
                noResultsText: 'Sin resultados',
                footer: {
                  selectText: 'seleccionar',
                  navigateText: 'navegar',
                  closeText: 'cerrar'
                }
              }
            }
          }
        }
      }
    }
  },

  markdown: {
    // Honkit's heading ids, so links into a section keep working. The default
    // slugify strips accents and й/ё, which breaks ru and es anchors.
    anchor: { slugify: (text) => slugid(text.trim()) },
    config: (md) => {
      md.use(mermaidMarkdown);
      const linkOpen = md.renderer.rules.link_open;
      md.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const token = tokens[index];
        const href = token.attrGet('href');
        if (href && !/^[a-z]+:/i.test(href)) {
          // Rewrites move README.md to index.md but leave links alone, so
          // point links at README.md to the folder before VitePress resolves them.
          token.attrSet('href', href.replace(/(^|\/)README\.md(?=#|$)/, '$1./'));
          // A shared file under book/assets/ (copied in buildEnd) is not a page:
          // a target keeps VitePress from adding .html and the router from
          // taking the click. lychee in `mise run check` verifies the file.
          if (/(^|\/)assets\//.test(href) && !token.attrGet('target')) {
            token.attrSet('target', '_self');
          }
        }
        return linkOpen
          ? linkOpen(tokens, index, options, env, self)
          : self.renderToken(tokens, index, options);
      };
    }
  },

  sitemap: {
    hostname: BASE_URL,
    transformItems: seo.sitemapItems
  },

  transformHead: seo.transformHead,

  // Shared files (preview cards, chapter samples) keep their plain URLs under
  // assets/, next to the hashed bundles VitePress writes there.
  buildEnd(siteConfig) {
    fs.cpSync(path.join(bookRoot, 'assets'), path.join(siteConfig.outDir, 'assets'), {
      recursive: true
    });
  }
});
