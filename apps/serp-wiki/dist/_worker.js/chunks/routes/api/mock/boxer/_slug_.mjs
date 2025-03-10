import { d as e, a as r, c as t } from '../../../../nitro/nitro.mjs';
import { f as n } from '../../../../_/chunk-KRMY7ATX.mjs';
import 'node:buffer';
import 'node:process';
import 'node:events';
import 'node:net';
import 'node:timers';
import 'node:assert';
import 'node:util';
import 'node:url';
import 'node:stream';
import 'node:crypto';
import 'node:dns';
import 'node:string_decoder';
const o = new Map(),
  a = e(async (e) => {
    const a = r(e, 'slug');
    if (!a) throw t({ statusCode: 400, message: 'Slug parameter is required' });
    let i = o.get(a);
    return (
      i ||
        ((i = ((e) => {
          const r = n.person.fullName();
          return {
            id: n.number.int(),
            name: r,
            slug: e,
            birthName: n.person.fullName(),
            career: n.lorem.sentence(),
            debut: n.date.past().toISOString(),
            status: n.helpers.arrayElement(['active', 'retired']),
            gender: n.helpers.arrayElement(['male', 'female']),
            nationality: n.location.country(),
            residence: n.location.city(),
            nicknames: [n.word.adjective(), n.word.adjective()],
            stance: n.helpers.arrayElement(['orthodox', 'southpaw']),
            birthPlace: n.location.city(),
            heightCm: n.number.int({ min: 160, max: 210 }),
            reachCm: n.number.int({ min: 160, max: 210 }),
            division: {
              name: n.word.words(2),
              slug: n.helpers.slugify(n.word.words(2))
            },
            content: n.lorem.paragraphs(3),
            numWins: n.number.int({ min: 0, max: 100 }),
            numDraws: n.number.int({ min: 0, max: 50 }),
            numLosses: n.number.int({ min: 0, max: 50 }),
            bouts: Array.from(
              { length: n.number.int({ min: 1, max: 10 }) },
              () => ({
                date: n.date.past().toISOString(),
                opponent: {
                  name: n.person.fullName(),
                  slug: n.helpers.slugify(n.person.fullName())
                },
                result: n.helpers.arrayElement(['win', 'loss', 'draw']),
                location: n.location.city()
              })
            )
          };
        })(a)),
        o.set(a, i)),
      i
    );
  });
export { a as default };
//# sourceMappingURL=_slug_.mjs.map
