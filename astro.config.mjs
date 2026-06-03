// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: 'https://financetoolshub.com',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    filter: (page) => !page.includes('/404') && !page.includes('/500'),
    serialize(item) {
      const url = item.url.replace(/\/$/, '');
      if (url === 'https://financetoolshub.com') {
        return { ...item, priority: 1.0, changefreq: 'weekly' };
      }
      const calculatorPaths = [
        '/sip-calculator',
        '/cagr-calculator',
        '/lumpsum-calculator',
        '/emi-calculator',
        '/gst-calculator',
      ];
      if (calculatorPaths.some((path) => url.endsWith(path))) {
        return { ...item, priority: 0.9, changefreq: 'monthly' };
      }
      if (url.endsWith('/calculators')) {
        return { ...item, priority: 0.85, changefreq: 'weekly' };
      }
      const hubPaths = ['/investing', '/loans', '/taxes'];
      if (hubPaths.some((path) => url.endsWith(path))) {
        return { ...item, priority: 0.8, changefreq: 'weekly' };
      }
      return { ...item, priority: 0.6, changefreq: 'monthly' };
    },
  }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});