import { d as e, g as t, c as o } from '../../nitro/nitro.mjs';
import { db as s } from './index5.mjs';
import { d as r, s as i, h as a, i as n } from './db/schema.mjs';
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
const u = e(async (e) => {
  const { page: u = 1, limit: d = 100, categorySlug: c } = t(e),
    g = `companies-${c}-${u}-${d}`,
    { value: p, addToCache: l } = await m(g, e);
  if (p) return p;
  const f = Number(u),
    h = Math.min(Number(d), 100);
  if (isNaN(f) || f < 1 || !Number.isInteger(f))
    throw o({ statusCode: 400, message: 'Page must be a positive integer.' });
  if (isNaN(h) || h < 1 || !Number.isInteger(h))
    throw o({ statusCode: 400, message: 'Limit must be a positive integer.' });
  const b = (f - 1) * h;
  let j = s
    .select({
      id: r.id,
      name: r.name,
      slug: r.slug,
      oneLiner: r.oneLiner,
      excerpt: r.excerpt,
      logo: r.logo,
      serplyLink: r.serplyLink,
      categories: r.categories,
      screenshots: r.screenshots,
      rating: r.rating,
      upvotes: r.upvotes,
      downvotes: r.downvotes,
      featured: r.featured,
      featuredOrder: r.featuredOrder
    })
    .from(r);
  c &&
    (j = j.where(i`
        jsonb_path_exists(
          ${r.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${c}::text)
        )
      `)),
    (j = j.orderBy(a(r.featured), n(r.featuredOrder)).limit(h).offset(b));
  let N = s.select({ count: i`count(*)` }).from(r);
  c &&
    (N = N.where(i`
        jsonb_path_exists(
          ${r.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${c}::text)
        )
      `));
  const [$, [{ count: x }]] = await Promise.all([j.execute(), N.execute()]);
  if (!$.length) throw o({ statusCode: 404, message: 'Not found' });
  const _ = $.map((e) => e),
    w = { currentPage: f, pageSize: h, totalItems: Number(x) },
    v = (() => {
      if (_ && _.length && _[0].categories) {
        for (const e of _[0].categories) if (e.slug === c) return e.name;
      } else;
    })(),
    y = { companies: _, pagination: w, categoryName: v };
  return l(y, [], 36e3), y;
});
export { u as default };
//# sourceMappingURL=index4.mjs.map
