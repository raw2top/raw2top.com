import data from '../data/bots.json';
import type { LocalizedText } from '../i18n/utils';

export type Access = 'reads' | 'drafts' | 'acts' | 'moves-money';
export type Result = 'worked' | 'partly' | 'failed';
export type Status = 'Tested' | 'Listed' | 'Tested-stale';

export interface TestRun {
  date: string;
  appVersion: string;
  platform: string;
  task: LocalizedText;
  result: Result;
  evidence: LocalizedText;
  skillsPreview: number | string;
  skillsArrived: number | string;
  routinesArrived: string;
}

export interface Bot {
  slug: string;
  name: string;
  oneLiner: LocalizedText;
  description?: LocalizedText;
  templateUrl: string | null;
  access: Access;
  connectors: string[];
  status: 'Tested' | 'Listed';
  tested: TestRun | null;
  isExample?: boolean;
}

export const STALE_DAYS = 30;

/** Tested + older than 30 days => Tested-stale (computed at build time). */
export function statusOf(bot: Bot, now = new Date()): Status {
  if (bot.status !== 'Tested' || !bot.tested) return 'Listed';
  const d = new Date(bot.tested.date);
  if (Number.isNaN(d.getTime())) return 'Tested';
  const days = (now.getTime() - d.getTime()) / 86_400_000;
  return days > STALE_DAYS ? 'Tested-stale' : 'Tested';
}

function validate(b: Bot) {
  if (b.templateUrl && !b.templateUrl.startsWith('https://x.ai/bot/')) {
    throw new Error(`bots.json: ${b.slug} templateUrl must start with https://x.ai/bot/`);
  }
  if (b.status === 'Tested' && !b.tested) throw new Error(`bots.json: ${b.slug} is Tested but has no test`);
  return b;
}

export const realBots: Bot[] = (data.bots as Bot[]).map(validate);
export const exampleBot: Bot | null = data.showExample
  ? { ...(data.example as unknown as Bot), isExample: true }
  : null;

/** What the grid shows: real bots, then the example (if enabled). */
export const shownBots: Bot[] = [...realBots, ...(exampleBot ? [exampleBot] : [])];
export const SLOTS = 3;
export const comingSoonCount = Math.max(0, SLOTS - shownBots.length);
