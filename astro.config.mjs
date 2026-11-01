// @ts-check
import { defineConfig } from 'astro/config';
import cspMeta from './integrations/csp-meta.mjs';

// Custom domain: no `base` needed (see public/CNAME).
export default defineConfig({
  site: 'https://raw2top.com',
  // Per-page Content-Security-Policy <meta>, hashes computed after the build.
  integrations: [cspMeta()],
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    // Any page missing under /es/ renders the English one at the /es/ URL.
    fallback: { es: 'en' },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
});
