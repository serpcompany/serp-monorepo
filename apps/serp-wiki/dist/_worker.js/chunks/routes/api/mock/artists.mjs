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
    const e = o.person.fullName();
    return {
      name: e,
      slug:
        ((t = e),
        t
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''))
    };
    var t;
  }).sort((e, t) => e.name.localeCompare(t.name)),
  i = e(async (e) => {
    const { page: o = 1, limit: i = 100 } = t(e),
      n = Number(o),
      m = Math.min(Number(i), 100);
    if (isNaN(n) || n < 1 || !Number.isInteger(n))
      throw r({ statusCode: 400, message: 'Page must be a positive integer' });
    if (isNaN(m) || m < 1 || !Number.isInteger(m))
      throw r({ statusCode: 400, message: 'Limit must be a positive integer' });
    const a = (n - 1) * m;
    return {
      artists: s.slice(a, a + m),
      pagination: { currentPage: n, pageSize: m, totalItems: 500 }
    };
  });
export { i as default };
//# sourceMappingURL=artists.mjs.map
