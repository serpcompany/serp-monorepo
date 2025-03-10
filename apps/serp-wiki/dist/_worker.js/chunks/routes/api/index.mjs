import { d as e, g as t, c as o } from '../../nitro/nitro.mjs';
import { db as s } from './index5.mjs';
import { m as r, s as i } from './db/schema.mjs';
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
    d = Math.min(Number(n), 100);
  if (isNaN(u) || u < 1 || !Number.isInteger(u))
    throw o({ statusCode: 400, message: 'Page must be a positive integer..' });
  if (isNaN(d) || d < 1 || !Number.isInteger(d))
    throw o({ statusCode: 400, message: 'Limit must be a positive integer' });
  const p = `albums-${u}-${d}`,
    { value: c, addToCache: g } = await m(p, e);
  if (c) return c;
  const l = (u - 1) * d,
    f = s
      .select({ name: r.name, slug: r.slug, artists: r.artists })
      .from(r)
      .orderBy(i`${r.artists}->0->>'credit_name'`, r.name)
      .limit(d)
      .offset(l),
    b = s.select({ count: i`count(*)` }).from(r),
    [N, [{ count: h }]] = await Promise.all([f.execute(), b.execute()]),
    j = {
      albums: N.map((e) => e),
      pagination: { currentPage: u, pageSize: d, totalItems: Number(h) }
    };
  return g(j, [], 36e3), j;
});
export { a as default };
//# sourceMappingURL=index.mjs.map
