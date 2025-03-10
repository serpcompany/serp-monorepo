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
const generatePostIndex = (e) => {
    const r = o.lorem.words(5);
    return {
      id: o.number.int(),
      title: r,
      slug: e,
      excerpt: o.lorem.sentence(),
      author: o.person.fullName(),
      createdAt: o.date.recent().toISOString(),
      image: 'https://placehold.co/250x250',
      categories: Array.from({ length: 10 }, () => ({
        id: o.number.int(),
        name: o.commerce.department(),
        slug: o.helpers.slugify(o.commerce.department())
      })),
      oneLiner: o.lorem.sentence(),
      module: o.helpers.arrayElement(['blog', 'glossary'])
    };
  },
  n = new Map(),
  m = e(async (e) => {
    const m = r(e, 'slug');
    if (!m) throw t({ statusCode: 400, message: 'Slug parameter is required' });
    let s = n.get(m);
    return (
      s ||
        ((s = ((e) => {
          const r = o.lorem.words(5);
          return {
            id: o.number.int(),
            title: r,
            slug: e,
            excerpt: o.lorem.sentence(),
            author: o.person.fullName(),
            createdAt: o.date.recent().toISOString(),
            updatedAt: o.date.recent().toISOString(),
            image: 'https://placehold.co/250x250',
            content: o.lorem.paragraphs(7),
            categories: Array.from({ length: 10 }, () => ({
              id: o.number.int(),
              name: o.commerce.department(),
              slug: o.helpers.slugify(o.commerce.department())
            })),
            oneLiner: o.lorem.sentence(),
            videoId: 'r2py_Z-bMuY',
            relatedPosts: Array.from({ length: 10 }, generatePostIndex),
            module: o.helpers.arrayElement(['blog', 'glossary'])
          };
        })(m)),
        n.set(m, s)),
      s
    );
  });
export { m as default };
//# sourceMappingURL=_slug_.mjs.map
