import { d as e, g as t, c as o } from '../../nitro/nitro.mjs';
import { db as s } from './index5.mjs';
import { g as r, s as i } from './db/schema.mjs';
import { u as a } from '../../_/useDataCache.mjs';
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
const m = e(async (e) => {
  const { page: m = 1, limit: n = 50 } = t(e),
    u = Number(m),
    p = Math.min(Number(n), 100);
  if (isNaN(u) || u < 1 || !Number.isInteger(u))
    throw o({ statusCode: 400, message: 'Page must be a positive integer' });
  if (isNaN(p) || p < 1 || !Number.isInteger(p))
    throw o({ statusCode: 400, message: 'Limit must be a positive integer' });
  const d = `songs-${u}-${p}`,
    { value: c, addToCache: g } = await a(d, e);
  if (c) return c;
  const l = (u - 1) * p,
    f = s
      .select({
        name: r.name,
        slug: r.slug,
        artists: r.artists,
        releaseGroup: r.releaseGroup
      })
      .from(r)
      .orderBy(i`${r.artists}->0->>'credit_name'`, r.name)
      .limit(p)
      .offset(l),
    b = s.select({ count: i`count(*)` }).from(r),
    [N, [{ count: h }]] = await Promise.all([f.execute(), b.execute()]),
    j = {
      songs: N.map((e) => e),
      pagination: { currentPage: u, pageSize: p, totalItems: Number(h) }
    };
  return g(j, [], 36e3), j;
});
export { m as default };
//# sourceMappingURL=index7.mjs.map
