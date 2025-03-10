import { d as e, a as o, c as t } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { m as s, e as m } from '../db/schema.mjs';
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
const a = e(async (e) => {
  const a = o(e, 'slug');
  if (!a) throw t({ statusCode: 400, message: 'Slug parameter is required' });
  const n = `album-${a}`,
    { value: d, addToCache: p } = await i(n, e);
  if (d) return d;
  const u = r.select().from(s).where(m(s.slug, a)).limit(1),
    c = await u.execute();
  if (!c.length) throw t({ statusCode: 404, message: 'Album not found' });
  const f = c[0];
  return p(f, [], 604800), f;
});
export { a as default };
//# sourceMappingURL=_slug_.mjs.map
