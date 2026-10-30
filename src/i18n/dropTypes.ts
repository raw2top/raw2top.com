// Drop type tag shown on the /drops/ card front and the landing tile. Key = `type` in src/data/landing-bots.json.
import type { Lang } from './utils';

export const DROP_TYPES = {
  bot:     { en: 'Bot',     es: 'Bot' },
  prompt:  { en: 'Prompt',  es: 'Prompt' },
  utility: { en: 'Tool',    es: 'Utilidad' },
  content: { en: 'Content', es: 'Contenido' },
  course:  { en: 'Course',  es: 'Curso' },
} as const;

export type DropType = keyof typeof DROP_TYPES;

/** Label for a drop type (rendered uppercase by CSS); unknown types render nothing. */
export function dropTypeLabel(type: string | undefined, lang: Lang): string | null {
  const t = type ? (DROP_TYPES as Record<string, Record<Lang, string>>)[type] : undefined;
  return t ? t[lang] : null;
}
