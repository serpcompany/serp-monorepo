import { d as e, g as t, c as r } from '../../../nitro/nitro.mjs';
import { f as o } from '../../../_/chunk-KRMY7ATX.mjs';
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
const s = Array.from({ length: 500 }, () => {
    const e = o.lorem.sentence();
    return {
      id: o.number.int(),
      title: e,
      slug: o.helpers.slugify(e),
      excerpt: o.lorem.sentences(2),
      categories: Array.from({ length: 10 }, () => ({
        id: o.number.int(),
        name: o.commerce.department(),
        slug: o.helpers.slugify(o.commerce.department())
      })),
      createdAt: o.date.past().toISOString(),
      author: o.person.fullName(),
      image:
        'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
      oneLiner: o.lorem.sentence(),
      module: o.helpers.arrayElement(['blog', 'glossary'])
    };
  }).sort((e, t) => e.title.localeCompare(t.title)),
  n = e(async (e) => {
    const { page: n = 1, limit: m = 100, categorySlug: i = '' } = t(e),
      a = Number(n),
      p = Math.min(Number(m), 100);
    if (isNaN(a) || a < 1 || !Number.isInteger(a))
      throw r({ statusCode: 400, message: 'Page must be a positive integer' });
    if (isNaN(p) || p < 1 || !Number.isInteger(p))
      throw r({ statusCode: 400, message: 'Limit must be a positive integer' });
    const l = (a - 1) * p;
    return {
      posts: s.slice(l, l + p),
      pagination: { currentPage: a, pageSize: p, totalItems: 500 },
      categoryName: i ? o.lorem.words(2) : null
    };
  });
export { n as default };
//# sourceMappingURL=index3.mjs.map
