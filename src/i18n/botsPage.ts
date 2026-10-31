// All copy for the /drops/ collection page (EN + ES). Bot facts come from src/data/landing-bots.json, never from here.
import type { Lang } from './utils';

export const botsPage = {
  en: {
    title: 'Drops',
    desc: 'Drops by raw2top: bots, prompts, tools, content and courses. Testable drops come with a dated, public test card.',
    lab: 'The collection · {n} / {total}',
    h1: 'Drops',
    intro: 'Everything we launch, in one place: bots, prompts, tools, content and courses. Open a drop to see its test card.',
    count: '<em>{n}</em> of {total} collected',
    hintPointer: 'Click, drag sideways or press Enter to flip · hover to tilt',
    fhPointer: 'Drag or click to flip', fhTouch: 'Swipe or tap to flip',
    hintTouch: 'Tap or swipe to flip · press and hold, then drag to tilt',
    cardAl: '{name}. Status: {status}. Press Enter to flip to its test card.',
    cardAlBack: '{name} test card. Press Enter to flip back.',
    imgAlt: '{name}, an electric-blue fur ball with a monocle magnifier, holding holo cards',
    gamesL: 'Card games',
    'st.Tested': 'Tested', 'st.Tested-stale': 'Stale', 'st.Listed': 'Listed',
    'back.lab': 'Test card', 'back.tested': 'Tested', 'back.app': 'App', 'back.skills': 'Skills', 'back.access': 'Access',
    pending: '— pending',
    'back.note': 'No test run yet. These fields fill in after the first dated test.', 'back.noteSkills': 'Skills list still to be confirmed.', 'back.see': 'See', 'back.seeAl': 'See the {n} skills',
    'back.open': 'Open bot ↗', 'back.flip': '↺ Flip back',
    slot: 'Slot {n}', soon: 'Coming soon', labNow: 'In the lab now',
    slotAl: 'Slot {n}: Coming soon. In the lab now.',
    follow: 'Follow on X for the next drop',
    'leg.status': 'Status', 'leg.tested': 'test card under 30 days old', 'leg.stale': 'older, waiting for a re-test', 'leg.listed': 'published, not tested yet',
  },
  es: {
    title: 'Drops',
    desc: 'Drops de raw2top: bots, prompts, utilidades, contenido y cursos. Los que se pueden probar llevan una ficha de prueba pública y fechada.',
    lab: 'La colección · {n} / {total}',
    h1: 'Drops',
    intro: 'Todo lo que lanzamos, en un solo sitio: bots, prompts, utilidades, contenido y cursos. Abre un drop para ver su ficha de prueba.',
    count: '<em>{n}</em> de {total} en la colección',
    hintPointer: 'Haz clic, arrastra a un lado o pulsa Intro para girar · pasa el cursor para inclinar',
    fhPointer: 'Arrastra o haz clic para girar', fhTouch: 'Desliza o toca para girar',
    hintTouch: 'Toca o desliza para girar · mantén y arrastra para inclinar',
    cardAl: '{name}. Estado: {status}. Pulsa Intro para ver su ficha de prueba.',
    cardAlBack: 'Ficha de prueba de {name}. Pulsa Intro para volver.',
    imgAlt: '{name}, una bola de pelo azul eléctrico con una lupa de monóculo y cartas holo',
    gamesL: 'Juegos de cartas',
    'st.Tested': 'Probado', 'st.Tested-stale': 'Caducado', 'st.Listed': 'En la lista',
    'back.lab': 'Ficha de prueba', 'back.tested': 'Probado', 'back.app': 'App', 'back.skills': 'Skills', 'back.access': 'Acceso',
    pending: '— pendiente',
    'back.note': 'Aún sin prueba. Estos campos se rellenan tras la primera prueba fechada.', 'back.noteSkills': 'Falta confirmar la lista de skills.', 'back.see': 'Ver', 'back.seeAl': 'Ver las {n} skills',
    'back.open': 'Abrir bot ↗', 'back.flip': '↺ Darle la vuelta',
    slot: 'Hueco {n}', soon: 'Próximamente', labNow: 'Ahora en el laboratorio',
    slotAl: 'Hueco {n}: Próximamente. Ahora en el laboratorio.',
    follow: 'Síguenos en X para el próximo drop',
    'leg.status': 'Estado', 'leg.tested': 'ficha de menos de 30 días', 'leg.stale': 'más antigua, pendiente de repetir', 'leg.listed': 'publicado, aún sin probar',
  },
} as const;

export type BotsPageKey = keyof typeof botsPage.en;
export function bp(lang: Lang) {
  const d = botsPage[lang] as Record<string, string>;
  return (k: BotsPageKey, vars: Record<string, string | number> = {}) =>
    d[k].replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? `{${v}}`));
}
