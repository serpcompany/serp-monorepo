import { d as e, g as o } from '../../../nitro/nitro.mjs';
import { db as t } from '../index5.mjs';
import { s as r, p as m, e as s } from '../db/schema.mjs';
import { u as i } from '../../../_/useDataCache.mjs';
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
const n = e(async (e) => {
  const { page: n, count: a = !1 } = o(e),
    d = 5e4,
    p = `movies-sitemap-${n}-${a}`,
    { value: u, addToCache: c } = await i(p, e);
  if (u) return u;
  if (a) {
    const e = await t
        .select({ count: r`count(*)` })
        .from(m)
        .where(s(m.module, 'movies'))
        .execute(),
      o = Math.ceil(Number(e[0].count) / d);
    return c(o, [], 604800), o;
  }
  const f = (
    await t
      .select({ slug: m.slug })
      .from(m)
      .where(s(m.module, 'movies'))
      .limit(d)
      .offset(d * (Number(n) - 1))
      .execute()
  ).map((e) => `/movies/${encodeURIComponent(e.slug)}/`);
  return c(f, [], 36e3), f;
});
export { n as default };
//# sourceMappingURL=index8.mjs.map
