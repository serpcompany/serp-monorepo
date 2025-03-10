import { d as e, g as o } from '../../../nitro/nitro.mjs';
import { db as t } from '../index5.mjs';
import { s as r, p as s, e as m } from '../db/schema.mjs';
import { u as n } from '../../../_/useDataCache.mjs';
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
const i = e(async (e) => {
  const { page: i, count: a = !1 } = o(e),
    p = 5e4,
    d = `shop-sitemap-${i}-${a}`,
    { value: u, addToCache: c } = await n(d, e);
  if (u) return u;
  if (a) {
    const e = await t
        .select({ count: r`count(*)` })
        .from(s)
        .where(m(s.module, 'shop'))
        .execute(),
      o = Math.ceil(Number(e[0].count) / p);
    return c(o, [], 604800), o;
  }
  const f = (
    await t
      .select({ slug: s.slug })
      .from(s)
      .where(m(s.module, 'shop'))
      .limit(p)
      .offset(p * (Number(i) - 1))
      .execute()
  ).map((e) => `/shop/best/${encodeURIComponent(e.slug)}/`);
  return c(f, [], 36e3), f;
});
export { i as default };
//# sourceMappingURL=index11.mjs.map
