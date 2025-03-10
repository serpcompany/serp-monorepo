import { d as o, a as e, c as t } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { d as s, e as m } from '../db/schema.mjs';
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
const a = o(async (o) => {
  const a = e(o, 'slug'),
    i = `company-${a}`,
    { value: d, addToCache: p } = await n(i, o);
  if (d) return d;
  const c = r.select().from(s).where(m(s.slug, a)),
    u = await c.execute();
  if (!u.length) throw t({ statusCode: 404, message: 'Company not found' });
  const f = u[0];
  return p(f, [], 36e3), f;
});
export { a as default };
//# sourceMappingURL=_slug_.mjs.map
