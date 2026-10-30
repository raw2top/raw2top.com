import type { Lang } from './utils';

export const ui = {
  en: {
    'meta.desc': 'Bot templates for Grok Bot by raw2top. Each one comes with a dated, public test card.',
    'meta.home': 'raw2top · Tested bot templates',
    'skip': 'Skip to content',
    'nav.main': 'Main',
    'nav.bots': 'Bots', 'nav.about': 'About', 'nav.report': 'Report',
    'nav.home': 'raw2top home',
    'lang.switch': 'Language',
    'foot.tag': 'Bot templates for Grok Bot, built and tested by the raw2top team.',
    'foot.report': 'Report a problem',
    'foot.legal': 'Not affiliated with SpaceXSI. “Grok Bot” is used only to describe compatibility.',
    'card.example': 'Example bot · placeholder',
    'card.result': 'Result', 'card.tested': 'Tested', 'card.app': 'App', 'card.skills': 'Skills',
    'card.arrived': 'arrived',
    'soon.slot': 'Slot', 'soon.title': 'Coming soon', 'soon.sub': 'In the lab now.',
    'access.reads': 'Reads only', 'access.drafts': 'Drafts only', 'access.acts': 'Takes actions', 'access.moves-money': 'Moves money',
    'result.worked': '✓ Worked', 'result.partly': '◐ Partly worked', 'result.failed': '✕ Failed',
    'status.Tested': '✓ Tested', 'status.Tested-stale': 'Tested · stale', 'status.Listed': 'Listed · not tested yet',
    'test.title': 'Test card', 'test.date': 'Date', 'test.app': 'App version', 'test.platform': 'Platform',
    'test.task': 'Task tested', 'test.result': 'Result', 'test.evidence': 'Evidence', 'test.import': 'Import check',
    'test.preview': 'Skills in preview', 'test.arrived': 'skills that arrived', 'test.routines': 'Routines arrived',
    'test.none': 'No test yet. This bot is listed, but I have not run it end to end.',
    'test.note': 'A test is valid for {days} days or until the template is updated. After that it shows as “stale” until I test it again. A test describes one run on one date; it is not a guarantee.',
  },
  es: {
    'meta.desc': 'Plantillas de bots para Grok Bot, de raw2top. Cada una lleva una ficha de prueba pública y con fecha.',
    'meta.home': 'raw2top · Plantillas de bots probadas',
    'skip': 'Saltar al contenido',
    'nav.main': 'Principal',
    'nav.bots': 'Bots', 'nav.about': 'Sobre mí', 'nav.report': 'Aviso',
    'nav.home': 'Inicio de raw2top',
    'lang.switch': 'Idioma',
    'foot.tag': 'Plantillas de bots para Grok Bot, creadas y probadas por el equipo de raw2top.',
    'foot.report': 'Avisar de un problema',
    'foot.legal': 'Sin relación con SpaceXSI. «Grok Bot» solo se usa para indicar compatibilidad.',
    'card.example': 'Bot de ejemplo · marcador',
    'card.result': 'Resultado', 'card.tested': 'Probado', 'card.app': 'App', 'card.skills': 'Skills',
    'card.arrived': 'llegaron',
    'soon.slot': 'Hueco', 'soon.title': 'Muy pronto', 'soon.sub': 'Ahora en el laboratorio.',
    'access.reads': 'Solo lee', 'access.drafts': 'Solo redacta', 'access.acts': 'Hace acciones', 'access.moves-money': 'Mueve dinero',
    'result.worked': '✓ Funcionó', 'result.partly': '◐ Funcionó en parte', 'result.failed': '✕ Falló',
    'status.Tested': '✓ Probado', 'status.Tested-stale': 'Probado · caducado', 'status.Listed': 'En la lista · sin probar',
    'test.title': 'Ficha de prueba', 'test.date': 'Fecha', 'test.app': 'Versión de la app', 'test.platform': 'Plataforma',
    'test.task': 'Tarea probada', 'test.result': 'Resultado', 'test.evidence': 'Prueba', 'test.import': 'Comprobación de importación',
    'test.preview': 'Skills en la vista previa', 'test.arrived': 'skills que llegaron', 'test.routines': 'Llegaron las rutinas',
    'test.none': 'Todavía sin prueba. El bot está en la lista, pero aún no lo he probado de principio a fin.',
    'test.note': 'Una prueba vale {days} días o hasta que se actualice la plantilla. Después aparece como «caducada» hasta que la repita. Una prueba describe una ejecución en una fecha; no es una garantía.',
  },
} as const;

export type UIKey = keyof typeof ui.en;
export function useT(lang: Lang) {
  return (key: UIKey, vars: Record<string, string | number> = {}) => {
    let s: string = (ui[lang] as Record<string, string>)[key] ?? ui.en[key];
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  };
}
