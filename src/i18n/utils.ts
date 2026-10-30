export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export type LocalizedText = string | { en: string; es?: string };

/** Pick the text for a language, falling back to English. */
export function tx(v: LocalizedText | undefined | null, lang: Lang): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return (lang !== 'en' && v[lang]) || v.en;
}

export function getLang(current: string | undefined): Lang {
  return current === 'es' ? 'es' : 'en';
}

/** Pages whose slug is translated: English path -> path inside each other locale. */
const SLUGS: Record<string, Partial<Record<Lang, string>>> = {
  '/privacy/': { es: '/privacidad/' },
};
const slash = (p: string) => (p.endsWith('/') ? p : `${p}/`);

/** '/drops/' + 'es' -> '/es/drops/'; '/privacy/' + 'es' -> '/es/privacidad/' */
export function localize(path: string, lang: Lang): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (lang !== defaultLang) {
    const m = clean.match(/^([^#?]*)(.*)$/)!;
    const t = SLUGS[slash(m[1])]?.[lang];
    if (t) clean = t + m[2];
  }
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** Strip a locale prefix from a pathname (and map a translated slug back to its English path). */
export function unlocalize(pathname: string): string {
  let p = pathname.replace(/^\/es(?=\/|$)/, '');
  p = p === '' ? '/' : p;
  if (p !== pathname) for (const [en, tr] of Object.entries(SLUGS)) if (tr.es && slash(p) === tr.es) return en;
  return p;
}
