import { d as e, g as t, c as s } from '../../nitro/nitro.mjs';
import { db as o } from './index5.mjs';
import { b as i, s as r } from './db/schema.mjs';
import { u as n } from '../../_/useDataCache.mjs';
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
  const { page: a = 1, limit: m = 100, weightClassSlug: u } = t(e),
    d = `boxers-${u}-${a}-${m}`,
    { value: p, addToCache: l } = await n(d, e);
  if (p) return p;
  const g = Number(a),
    c = Math.min(Number(m), 100);
  if (isNaN(g) || g < 1 || !Number.isInteger(g))
    throw s({ statusCode: 400, message: 'Page must be a positive integer.' });
  if (isNaN(c) || c < 1 || !Number.isInteger(c))
    throw s({ statusCode: 400, message: 'Limit must be a positive integer.' });
  const b = (g - 1) * c;
  let f = o
    .select({ id: i.id, name: i.name, slug: i.slug, division: i.division })
    .from(i);
  u &&
    (f = f.where(r`
        jsonb_path_exists(
          ${i.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${u}::text)
        )
      `)),
    (f = f.orderBy(i.name).limit(c).offset(b));
  let h = o.select({ count: r`count(*)` }).from(i);
  u &&
    (h = h.where(r`
        jsonb_path_exists(
          ${i.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${u}::text)
        )
      `));
  const [j, [{ count: $ }]] = await Promise.all([f.execute(), h.execute()]);
  if (!j.length) throw s({ statusCode: 404, message: 'Not found' });
  const x = {
    boxers: j.map((e) => e),
    pagination: { currentPage: g, pageSize: c, totalItems: Number($) }
  };
  return l(x, [], 36e3), x;
});
export { a as default };
//# sourceMappingURL=index3.mjs.map
