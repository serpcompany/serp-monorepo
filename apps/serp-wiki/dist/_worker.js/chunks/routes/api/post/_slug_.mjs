import { d as o, a as e, g as t, c as s } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { e as m, p as n, J as a } from '../db/schema.mjs';
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
const d = o(async (o) => {
  const d = e(o, 'slug'),
    { module: p } = t(o),
    u = `post-${d}-${p}`,
    { value: c, addToCache: f } = await i(u, o);
  if (c) return c;
  const l = [m(n.slug, d)];
  p && l.push(m(n.module, p));
  const h = r
      .select()
      .from(n)
      .where(a(...l)),
    g = await h.execute();
  if (!g.length) throw s({ statusCode: 404, message: 'Post not found' });
  const j = g[0];
  return f(j, [], 36e3), j;
});
export { d as default };
//# sourceMappingURL=_slug_.mjs.map
