# raw2top.com (v0, local only)

Astro static site. English at `/`, Spanish at `/es/` (missing Spanish pages fall back to English).

- Dev: `npm run dev` · Build: `npm run build` (needs Node ≥ 22.12; tested with Node 24).
- Bots live in `src/data/bots.json` (schema in `src/data/SCHEMA.md`). Set `showExample` to `false` once real bots exist.
- UI strings: `src/i18n/ui.ts`. Page copy: `src/views/*.astro` (EN + ES side by side).
- Deploy (not active): `.github/workflows/deploy.yml` (official Astro action) + `public/CNAME`.
- Search `[TODO` for things Sergio must fill in.
