import { d as t, a as e, c as o } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { a as s, e as i } from '../db/schema.mjs';
import { u as m } from '../../../_/useDataCache.mjs';
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
const a = t(async (t) => {
  const a = e(t, 'slug');
  if (!a) throw o({ statusCode: 400, message: 'Slug parameter is required' });
  const n = `artist-${a}`,
    { value: d, addToCache: p } = await m(n, t);
  if (d) return d;
  const u = r.select().from(s).where(i(s.slug, a)).limit(1),
    c = await u.execute();
  if (!c.length) throw o({ statusCode: 404, message: 'Artist not found' });
  const f = c[0];
  return p(f, [], 604800), f;
});
export { a as default };
//# sourceMappingURL=_slug_.mjs.map
