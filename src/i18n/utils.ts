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

/** '/bots/' + 'es' -> '/es/bots/' */
export function localize(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** Strip a locale prefix from a pathname. */
export function unlocalize(pathname: string): string {
  const p = pathname.replace(/^\/es(?=\/|$)/, '');
  return p === '' ? '/' : p;
}
