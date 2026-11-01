// Content-Security-Policy as a <meta http-equiv> tag (GitHub Pages can't send headers).
//
// Runs after the build, over every HTML file in dist/ (Astro pages, the landing that
// arrives through set:html, public/404.html and the redirect pages). For each page it
// hashes the exact text of every inline <script> and <style> (SHA-256, base64), builds
// that page's policy and writes the meta tag at the top of <head>, before any script
// or style. Hashes are recomputed on every build, so editing landing.html (or any page)
// can't leave a stale hash behind.
//
// Guards: inline event handlers (onclick=…) and javascript: URLs would be blocked by
// the policy, so the build stops if one appears. style="" attributes are allowed only
// through 'unsafe-hashes' + their hash, with a warning (none exist today).
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'", 'blob:', 'data:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'https://api.web3forms.com'],
  'object-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'self'", 'https://api.web3forms.com', 'mailto:'],
};

const sha = (text) => `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
const JS_TYPES = /^(|text\/javascript|application\/javascript|module)$/i;
const decode = (v) => v
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

export function policyFor(html, file = '') {
  const scripts = new Set(), styles = new Set(), attrStyles = new Set();
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/\ssrc\s*=/i.test(attrs)) continue;
    const type = (attrs.match(/\stype\s*=\s*["']?([^"'\s>]*)/i) || [, ''])[1];
    if (JS_TYPES.test(type)) scripts.add(sha(body));
  }
  for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) styles.add(sha(body));

  // Markup only (script/style bodies and comments removed) for the attribute checks.
  const markup = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[\s\S]*?(<\/script\s*>)/gi, '$1$2')
    .replace(/(<style\b[^>]*>)[\s\S]*?(<\/style\s*>)/gi, '$1$2');
  for (const [tag] of markup.matchAll(/<[a-z][^>]*>/gi)) {
    if (/\son[a-z]+\s*=/i.test(tag)) throw new Error(`[csp-meta] inline event handler in ${file}: ${tag.slice(0, 120)}`);
    if (/=\s*["']?\s*javascript:/i.test(tag)) throw new Error(`[csp-meta] javascript: URL in ${file}: ${tag.slice(0, 120)}`);
    for (const [, , v1, v2] of tag.matchAll(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi)) attrStyles.add(sha(decode(v1 ?? v2)));
  }

  const d = structuredClone(BASE);
  d['script-src'].push(...scripts);
  d['style-src'].push(...styles);
  if (attrStyles.size) d['style-src'].push("'unsafe-hashes'", ...attrStyles);
  return { csp: Object.entries(d).map(([k, v]) => `${k} ${v.join(' ')}`).join('; '), attrStyles: attrStyles.size };
}

export default function cspMeta() {
  return {
    name: 'csp-meta',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let n = 0;
        for await (const file of htmlFiles(root)) {
          const rel = relative(root, file);
          let html = await readFile(file, 'utf8');
          const head = html.match(/<head\b[^>]*>/i);
          if (!head) continue; // e.g. the Google site-verification file: must stay byte-identical
          if (/http-equiv\s*=\s*["']?content-security-policy/i.test(html)) throw new Error(`[csp-meta] ${rel} already has a CSP meta tag`);
          const { csp, attrStyles } = policyFor(html, rel);
          if (attrStyles) logger.warn(`${rel}: ${attrStyles} style="" attribute(s) allowed via 'unsafe-hashes'; prefer classes`);
          const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
          // Right after <meta charset> (keeps charset in the first bytes), else right after <head>;
          // either way before every <script>/<style>, so they are all covered.
          const charset = html.match(/<meta\s+charset\s*=\s*["']?[\w-]+["']?\s*\/?>/i);
          const at = charset && charset.index < html.search(/<(script|style|link)\b/i) ? charset.index + charset[0].length : head.index + head[0].length;
          html = html.slice(0, at) + meta + html.slice(at);
          await writeFile(file, html);
          n++;
        }
        logger.info(`CSP meta written to ${n} pages`);
      },
    },
  };
}
