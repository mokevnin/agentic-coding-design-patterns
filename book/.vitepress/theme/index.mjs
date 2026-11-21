// @ts-check

import { enhanceAppWithMermaid } from '@mokevnin/vitepress-mermaid/client';
import '@mokevnin/vitepress-mermaid/style.css';
import DefaultTheme from 'vitepress/theme';

import './style.css';

import { bookPalette } from './mermaid-palette.mjs';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithMermaid(app, bookPalette());
  }
};
