// @ts-check

// The book's Mermaid palette for vitepress-mermaid, which draws diagrams in the
// browser and redraws them when the reader toggles dark mode.
//
// The package takes one config for both modes, and spreads it on every render.
// So the keys that differ between the palettes are getters: each render reads
// the light or the dark value for the mode the page is in at that moment.

import light from '../../../mermaid.config.json';
import overrides from '../../../mermaid.config.dark.json';

// Sections the dark file overrides only in part; they merge key by key.
const NESTED = ['themeVariables', 'flowchart', 'sequence', 'sankey'];

/** @typedef {import('mermaid').MermaidConfig} MermaidConfig */

/**
 * The dark palette: the light config with the dark file merged over it.
 *
 * @returns {Record<string, any>}
 */
function darkConfig() {
  /** @type {Record<string, any>} */
  const base = light;
  /** @type {Record<string, any>} */
  const dark = { ...base, ...overrides };
  for (const section of NESTED) {
    dark[section] = {
      ...base[section],
      .../** @type {Record<string, any>} */ (overrides)[section]
    };
  }
  return dark;
}

/** @returns {MermaidConfig} */
export function bookPalette() {
  const dark = darkConfig();
  /** @type {Record<string, any>} */
  const config = {};
  for (const key of new Set([...Object.keys(light), ...Object.keys(dark)])) {
    // The page font, which the package measures labels with, replaces ours.
    if (key === 'fontFamily') {
      continue;
    }
    Object.defineProperty(config, key, {
      enumerable: true,
      get: () =>
        document.documentElement.classList.contains('dark')
          ? dark[key]
          : /** @type {Record<string, any>} */ (light)[key]
    });
  }
  return config;
}
