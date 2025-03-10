import { d as e, g as t, c as o } from '../../nitro/nitro.mjs';
import { db as s } from './index5.mjs';
import { p as r, s as a, e as i, J as m } from './db/schema.mjs';
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
const u = e(async (e) => {
  const { page: u = 1, limit: d = 100, categorySlug: c, module: p = '' } = t(e),
    g = `posts-${c}-${u}-${d}-${p}`,
    { value: l, addToCache: f } = await n(g, e);
  if (l) return l;
  const h = Number(u),
    b = Math.min(Number(d), 100);
  if (isNaN(h) || h < 1 || !Number.isInteger(h))
    throw o({ statusCode: 400, message: 'Page must be a positive integer.' });
  if (isNaN(b) || b < 1 || !Number.isInteger(b))
    throw o({ statusCode: 400, message: 'Limit must be a positive integer.' });
  const N = (h - 1) * b,
    w = [];
  let j = s
    .select({
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      featuredImage: r.featuredImage,
      categories: r.categories,
      createdAt: r.createdAt,
      author: r.author,
      module: r.module,
      keyword: r.keyword
    })
    .from(r);
  c &&
    w.push(a`
          jsonb_path_exists(
            ${r.categories},
         '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${c}::text)
        )
        `),
    p && w.push(i(r.module, p)),
    (j = j.orderBy(r.title).limit(b).offset(N));
  let x = s.select({ count: a`count(*)` }).from(r);
  w.length > 0 && ((j = j.where(m(...w))), (x = x.where(m(...w))));
  const [$, [{ count: y }]] = await Promise.all([j.execute(), x.execute()]);
  if (!$.length) throw o({ statusCode: 404, message: 'Not found' });
  const _ = $.map((e) => e),
    C = { currentPage: h, pageSize: b, totalItems: Number(y) },
    I = (() => {
      if (_ && _.length && _[0].categories) {
        for (const e of _[0].categories) if (e.slug === c) return e.name;
      } else;
    })(),
    v = { posts: _, pagination: C, categoryName: I };
  return f(v, [], 36e3), v;
});
export { u as default };
//# sourceMappingURL=index6.mjs.map
