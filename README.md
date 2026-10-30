# raw2top.com (v0, local only)

Astro static site. English at `/`, Spanish at `/es/` (missing Spanish pages fall back to English).

- Dev: `npm run dev` · Build: `npm run build` (needs Node ≥ 22.12; tested with Node 24).
- Bots live in `src/data/bots.json` (schema in `src/data/SCHEMA.md`). The filler example bot was removed (`showExample: false`). The /bots/ page (collectible cards) reads `src/data/landing-bots.json`; its copy lives in `src/i18n/botsPage.ts`.
- UI strings: `src/i18n/ui.ts`. Page copy: `src/views/*.astro` (EN + ES side by side).
- Deploy (not active): `.github/workflows/deploy.yml` (official Astro action) + `public/CNAME`.
- No `[TODO` markers left. TCG Scout's test fields show “— pending” until a real dated test exists.
