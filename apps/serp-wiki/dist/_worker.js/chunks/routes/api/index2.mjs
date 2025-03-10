import { d as e, g as t, c as o } from '../../nitro/nitro.mjs';
import { db as r } from './index5.mjs';
import { a as s, s as i } from './db/schema.mjs';
import { u as m } from '../../_/useDataCache.mjs';
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
const a = e(async (e) => {
  const { page: a = 1, limit: n = 100 } = t(e),
    u = Number(a),
    p = Math.min(Number(n), 100);
  if (isNaN(u) || u < 1 || !Number.isInteger(u))
    throw o({ statusCode: 400, message: 'Page must be a positive integer' });
  if (isNaN(p) || p < 1 || !Number.isInteger(p))
    throw o({ statusCode: 400, message: 'Limit must be a positive integer' });
  const d = `artists-${u}-${p}`,
    { value: c, addToCache: g } = await m(d, e);
  if (c) return c;
  const f = (u - 1) * p,
    l = r
      .select({ name: s.name, slug: s.slug })
      .from(s)
      .orderBy(s.name)
      .limit(p)
      .offset(f),
    b = r.select({ count: i`count(*)` }).from(s),
    [N, [{ count: h }]] = await Promise.all([l.execute(), b.execute()]),
    j = {
      artists: N.map((e) => e),
      pagination: { currentPage: u, pageSize: p, totalItems: Number(h) }
    };
  return g(j, [], 36e3), j;
});
export { a as default };
//# sourceMappingURL=index2.mjs.map
