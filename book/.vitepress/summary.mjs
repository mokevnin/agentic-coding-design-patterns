// @ts-check

// Builds a locale's sidebar from its SUMMARY.md, so the book's grouping keeps
// living in one Markdown file per language:
//
//   * [Title](file.md)   a chapter; README.md is the locale's home page
//   ## Heading           a sidebar group
//   ### Heading          a group nested in the current `##` group
//
// The `#` title and anything else in the file are ignored.

import fs from 'node:fs';

const LINK = /^\s*[*-]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/;
const HEADING = /^(#{2,3})\s+(.+?)\s*$/;

/**
 * @typedef {{ text: string, link?: string, items?: SidebarItem[] }} SidebarItem
 */

/**
 * @param {string} locale
 * @param {string} file chapter path from SUMMARY.md
 * @returns {string}
 */
function linkFor(locale, file) {
  const page = file.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '');
  return `/${locale}/${page}`;
}

/**
 * @param {string} source SUMMARY.md contents
 * @param {string} locale
 * @returns {SidebarItem[]}
 */
export function parseSummary(source, locale) {
  /** @type {SidebarItem[]} */
  const sidebar = [];
  /** @type {SidebarItem | null} */
  let group = null;
  /** @type {SidebarItem | null} */
  let subgroup = null;

  for (const line of source.split('\n')) {
    const heading = HEADING.exec(line);
    if (heading) {
      const item = { text: heading[2], items: [] };
      if (heading[1] === '##') {
        group = item;
        subgroup = null;
        sidebar.push(group);
      } else {
        if (group === null) {
          throw new Error(`SUMMARY.md (${locale}): "### ${heading[2]}" comes before any "##"`);
        }
        subgroup = item;
        group.items?.push(subgroup);
      }
      continue;
    }
    const link = LINK.exec(line);
    if (link) {
      const item = { text: link[1], link: linkFor(locale, link[2]) };
      const parent = subgroup ?? group;
      if (parent) {
        parent.items?.push(item);
      } else {
        sidebar.push(item);
      }
    }
  }
  return sidebar;
}

/**
 * @param {string} file path to a SUMMARY.md
 * @param {string} locale
 * @returns {SidebarItem[]}
 */
export function readSummary(file, locale) {
  return parseSummary(fs.readFileSync(file, 'utf8'), locale);
}
