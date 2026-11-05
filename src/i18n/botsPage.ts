// All copy for the /drops/ collection page (EN + ES). Bot facts come from src/data/landing-bots.json, never from here.
import type { Lang } from './utils';

export const botsPage = {
  en: {
    title: 'Drops',
    desc: 'AI drops by raw2top: one a month, of any kind. Testable drops come with a dated, public test card.',
    lab: 'The lab · {n} / {total}',
    h1: 'Drops',
    intro: 'Every drop we’ve shipped, in one place. Flip a card to see its test card.',
    count: '<em>{n}</em> of {total} drops',
    hintPointer: 'Click, drag sideways or press Enter to flip · hover to tilt',
    fhPointer: 'Drag or click to flip', fhTouch: 'Swipe or tap to flip',
    hintTouch: 'Tap or swipe to flip · press and hold, then drag to tilt',
    cardAl: '{name}. Press Enter to flip to its test card.',
    cardAlBack: '{name} test card. Press Enter to flip back.',
    imgAlt: '{name}, an electric-blue fur ball with a monocle magnifier, holding holo cards',
    gamesL: 'Card games',
    'back.lab': 'Test card', 'back.tested': 'Tested', 'back.app': 'App', 'back.skills': 'Skills', 'back.access': 'Access',
    pending: '— pending',
    'back.note': 'No test run yet. These fields fill in after the first dated test.', 'back.noteSkills': 'Skills list still to be confirmed.', 'back.see': 'See', 'back.seeAl': 'See the {n} skills',
    'back.open': 'Open bot ↗', 'back.flip': '↺ Flip back',
    slot: 'Slot {n}', soon: 'Coming soon', labNow: 'In the lab now',
    slotAl: 'Slot {n}: Coming soon. In the lab now.',
    follow: 'Follow on X for the next drop',
  },
  es: {
    title: 'Drops',
    desc: 'Drops de IA de raw2top: uno al mes, de cualquier cosa. Los que se pueden probar llevan una ficha de prueba pública y fechada.',
    lab: 'El laboratorio · {n} / {total}',
    h1: 'Drops',
    intro: 'Cada drop que hemos lanzado, en un solo sitio. Gira una carta para ver su ficha.',
    count: '<em>{n}</em> de {total} drops',
    hintPointer: 'Haz clic, arrastra a un lado o pulsa Intro para girar · pasa el cursor para inclinar',
    fhPointer: 'Arrastra o haz clic para girar', fhTouch: 'Desliza o toca para girar',
    hintTouch: 'Toca o desliza para girar · mantén y arrastra para inclinar',
    cardAl: '{name}. Pulsa Intro para ver su ficha de prueba.',
    cardAlBack: 'Ficha de prueba de {name}. Pulsa Intro para volver.',
    imgAlt: '{name}, una bola de pelo azul eléctrico con una lupa de monóculo y cartas holo',
    gamesL: 'Juegos de cartas',
    'back.lab': 'Ficha de prueba', 'back.tested': 'Probado', 'back.app': 'App', 'back.skills': 'Skills', 'back.access': 'Acceso',
    pending: '— pendiente',
    'back.note': 'Aún sin prueba. Estos campos se rellenan tras la primera prueba fechada.', 'back.noteSkills': 'Falta confirmar la lista de skills.', 'back.see': 'Ver', 'back.seeAl': 'Ver las {n} skills',
    'back.open': 'Abrir bot ↗', 'back.flip': '↺ Darle la vuelta',
    slot: 'Hueco {n}', soon: 'Próximamente', labNow: 'Ahora en el laboratorio',
    slotAl: 'Hueco {n}: Próximamente. Ahora en el laboratorio.',
    follow: 'Síguenos en X para ver el próximo drop',
  },
} as const;

export type BotsPageKey = keyof typeof botsPage.en;
export function bp(lang: Lang) {
  const d = botsPage[lang] as Record<string, string>;
  return (k: BotsPageKey, vars: Record<string, string | number> = {}) =>
    d[k].replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? `{${v}}`));
}
