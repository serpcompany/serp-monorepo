import { d as e, a as r, c as t } from '../../../../nitro/nitro.mjs';
import { f as o } from '../../../../_/chunk-KRMY7ATX.mjs';
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
const n = new Map(),
  a = e(async (e) => {
    const a = r(e, 'slug');
    if (!a) throw t({ statusCode: 400, message: 'Slug parameter is required' });
    let m = n.get(a);
    return (
      m ||
        ((m = ((e) => {
          const r = o.company.name();
          return {
            id: o.number.int(),
            name: r,
            slug: e,
            oneLiner: o.company.catchPhrase(),
            excerpt: o.lorem.paragraph(),
            logo: 'https://placehold.co/250x250',
            screenshots: [
              'https://placehold.co/500x500',
              'https://placehold.co/500x500',
              'https://placehold.co/500x500',
              'https://placehold.co/500x500'
            ],
            serplyLink: o.internet.url(),
            article: o.lorem.paragraphs(7),
            features: Array.from({ length: 5 }, () => ({
              id: o.number.int(),
              item: o.commerce.productName(),
              description: o.lorem.sentence()
            })),
            faqs: Array.from({ length: 3 }, () => ({
              question: o.lorem.sentence(),
              answer: o.lorem.paragraph()
            })),
            alternatives: [o.company.name(), o.company.name()],
            categories: Array.from({ length: 10 }, () => ({
              id: o.number.int(),
              name: o.commerce.department(),
              slug: o.helpers.slugify(o.commerce.department())
            }))
          };
        })(a)),
        n.set(a, m)),
      m
    );
  });
export { a as default };
//# sourceMappingURL=_slug_.mjs.map
