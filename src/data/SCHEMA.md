# bots.json schema

- `showExample` (boolean): show the placeholder "Example bot" card and page. Now `false` and the `example` object was removed (2026-10-30); add both back only if a layout placeholder is needed again.
- `bots` (array of Bot): Sergio's own templates only.
- `example` (Bot, optional): placeholder, never listed as real. Currently absent.

The /bots/ collection page reads `src/data/landing-bots.json` (TCG Scout: no dated test yet, so its test sheet shows "pending").

## Bot
| field | type | notes |
|---|---|---|
| slug | string | URL: /bots/<slug> |
| name | string | |
| oneLiner | string | one sentence |
| description | string | optional, longer text |
| templateUrl | string \| null | must start with https://x.ai/bot/ |
| access | "reads" \| "drafts" \| "acts" \| "moves-money" | highest access level the bot needs |
| connectors | string[] | apps the bot asks for |
| status | "Tested" \| "Listed" | "Tested-stale" is computed: Tested + test older than 30 days |
| tested | object \| null | required when status is "Tested" |
| tested.date | YYYY-MM-DD | date of the test |
| tested.appVersion | string | e.g. v0.78.1 |
| tested.platform | string | macOS, Windows, Linux, iOS, Android |
| tested.task | string | the one task tested |
| tested.result | "worked" \| "partly" \| "failed" | |
| tested.evidence | string | one line |
| tested.skillsPreview | number | skills shown in the template preview |
| tested.skillsArrived | number | skills present after import |
| tested.routinesArrived | string | "yes", "no", "paused" |

## Languages
`oneLiner`, `description`, `tested.task` and `tested.evidence` accept either a plain string (English)
or `{ "en": "...", "es": "..." }`. Missing `es` falls back to `en`.
