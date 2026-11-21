// @ts-check

// Renders ```mermaid fences to SVG at build time with mermaid-isomorphic
// (Mermaid inside headless Playwright), so a diagram needs no JavaScript in
// the reader's browser and every one shares the palette in mermaid.config.json.
//
// Each diagram becomes two <img> tags, one per palette; the theme CSS shows the
// one that matches the light or dark mode. The SVG goes into an image file
// rather than inline markup because Vue drops the <style> element Mermaid puts
// inside the SVG, and an inline copy would also land in every page's JS chunk.
//
// markdown-it renders synchronously while rendering is async, so the work is
// split in two: the fence rule only remembers the source under a content hash
// and emits `<img src="@mermaid/<hash>.svg">`; Vue turns that into an import,
// and the Vite plugin renders the file when Vite loads it.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const PREFIX = '@mermaid/';

/**
 * @typedef {import('mermaid').MermaidConfig} MermaidConfig
 * @typedef {{ light: MermaidConfig, dark: MermaidConfig }} Themes
 */

/**
 * The light config, and the dark one merged over it: the dark file holds only
 * what differs, and nested sections merge key by key.
 *
 * @param {string} lightFile
 * @param {string} darkFile
 * @returns {Themes}
 */
export function loadThemes(lightFile, darkFile) {
  /** @type {MermaidConfig} */
  const light = JSON.parse(fs.readFileSync(lightFile, 'utf8'));
  /** @type {Record<string, any>} */
  const overrides = JSON.parse(fs.readFileSync(darkFile, 'utf8'));
  /** @type {Record<string, any>} */
  const dark = { ...light, ...overrides };
  for (const section of ['themeVariables', 'flowchart', 'sequence', 'sankey']) {
    dark[section] = {
      .../** @type {Record<string, any>} */ (light)[section],
      ...overrides[section]
    };
  }
  return { light, dark };
}

/**
 * Cache key for a diagram: its source plus the theme it is rendered with.
 *
 * @param {string} source
 * @param {MermaidConfig} config
 * @returns {string}
 */
function digest(source, config) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(config))
    .update(source)
    .digest('hex')
    .slice(0, 16);
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Mermaid sizes its SVG for inline use (width="100%" plus a max-width style).
 * As an image it needs an intrinsic size, taken from the viewBox, so a small
 * diagram keeps its natural width and a wide one shrinks to the column.
 *
 * @param {string} svg
 * @returns {string}
 */
function sizeForImage(svg) {
  return svg.replace(/^<svg\b[^>]*>/, (tag) => {
    const viewBox = /viewBox="[\d.-]+ [\d.-]+ ([\d.]+) ([\d.]+)"/.exec(tag);
    if (!viewBox) {
      return tag;
    }
    return tag
      .replace(/\swidth="[^"]*"/, '')
      .replace(/\sheight="[^"]*"/, '')
      .replace(/\sstyle="[^"]*"/, '')
      .replace(/^<svg/, `<svg width="${viewBox[1]}" height="${viewBox[2]}"`);
  });
}

/**
 * @param {object} options
 * @param {string} options.cacheDir rendered SVGs, keyed by source and theme
 * @param {Themes} options.themes
 */
export function createMermaid({ cacheDir, themes }) {
  /** @type {Map<string, { source: string, config: MermaidConfig }>} */
  const pending = new Map();

  /** @type {Promise<import('mermaid-isomorphic').MermaidRenderer> | null} */
  let rendererPromise = null;

  /** @type {Map<string, Promise<void>>} */
  const rendering = new Map();

  /**
   * @param {string} key
   * @returns {Promise<void>}
   */
  async function render(key) {
    const file = path.join(cacheDir, `${key}.svg`);
    if (fs.existsSync(file)) {
      return;
    }
    const diagram = pending.get(key);
    if (!diagram) {
      throw new Error(`Mermaid: no diagram source for ${key}`);
    }
    // One browser for the whole build, started on the first uncached diagram.
    rendererPromise ??= import('mermaid-isomorphic').then(({ createMermaidRenderer }) =>
      createMermaidRenderer()
    );
    const renderer = await rendererPromise;
    // One diagram per call, so the SVG ids derive from the content.
    const [result] = await renderer([diagram.source], {
      mermaidConfig: diagram.config,
      prefix: `mermaid-${key}`
    });
    if (result.status === 'rejected') {
      const reason = result.reason?.message ?? String(result.reason);
      throw new Error(`Mermaid diagram failed to render: ${reason}\n\n${diagram.source}`);
    }
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(file, sizeForImage(result.value.svg));
  }

  /**
   * @param {string} source
   * @param {'light' | 'dark'} theme
   * @param {string} alt
   * @returns {string}
   */
  function image(source, theme, alt) {
    const config = themes[theme];
    const key = digest(source, config);
    pending.set(key, { source, config });
    return `<img class="mermaid-${theme}" src="${PREFIX}${key}.svg" alt="${escapeAttribute(alt)}" loading="lazy">`;
  }

  return {
    /**
     * markdown-it plugin: swaps mermaid fences for the two images.
     *
     * @param {import('markdown-it').default} md
     */
    markdown(md) {
      const fallback = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index];
        if (token.info.trim() !== 'mermaid') {
          return fallback ? fallback(tokens, index, options, env, self) : '';
        }
        const source = token.content;
        // The diagram's own `title:` is its caption; it doubles as alt text.
        const title = /^---\s*\n(?:.*\n)*?title:\s*(.+)\n(?:.*\n)*?---/.exec(source)?.[1];
        const alt = title?.trim() || 'Diagram';
        return `<figure class="mermaid">${image(source, 'light', alt)}${image(source, 'dark', alt)}</figure>\n`;
      };
    },

    /** @returns {import('vite').Plugin} */
    vite() {
      return {
        name: 'book-mermaid',
        enforce: 'pre',
        resolveId(id) {
          return id.startsWith(PREFIX) ? path.join(cacheDir, id.slice(PREFIX.length)) : null;
        },
        // Render the file before Vite's asset plugin reads it; returning
        // nothing hands the file on to that plugin.
        async load(id) {
          if (!id.startsWith(cacheDir + path.sep)) {
            return null;
          }
          const key = path.basename(id.split('?')[0], '.svg');
          // Both the client and the SSR build load each file; render it once.
          // A failure is not memoised, so `vitepress dev` retries after a fix.
          if (!rendering.has(key)) {
            rendering.set(
              key,
              render(key).catch((error) => {
                rendering.delete(key);
                throw error;
              })
            );
          }
          await rendering.get(key);
          return null;
        }
      };
    }
  };
}
