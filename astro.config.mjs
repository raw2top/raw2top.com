// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain: no `base` needed (see public/CNAME).
export default defineConfig({
  site: 'https://raw2top.com',
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
