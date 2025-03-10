import { d as o, a as e, c as t } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { b as s, e as m } from '../db/schema.mjs';
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
const i = o(async (o) => {
  const i = e(o, 'slug'),
    a = `boxer-${i}`,
    { value: d, addToCache: p } = await n(a, o);
  if (d) return d;
  const c = r.select().from(s).where(m(s.slug, i)),
    u = await c.execute();
  if (!u.length) throw t({ statusCode: 404, message: 'Boxer not found' });
  const f = u[0];
  return p(f, [], 36e3), f;
});
export { i as default };
//# sourceMappingURL=_slug_.mjs.map
