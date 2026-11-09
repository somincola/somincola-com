import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://somincola.com',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

  build: {
    // Emit /about.html instead of /about/index.html so Cloudflare Pages serves
    // clean URLs without a trailing-slash redirect (matches canonical URLs).
    format: 'file',
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        const url = item.url.replace(/\/$/, '') || item.url;
        const isHome = new URL(item.url).pathname === '/';
        return { ...item, url: isHome ? item.url : url, changefreq: undefined, priority: isHome ? 1 : 0.7 };
      },
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
