import { d as o, a as t, c as e } from '../../../nitro/nitro.mjs';
import { db as r } from '../index5.mjs';
import { g as s, e as i } from '../db/schema.mjs';
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
const m = o(async (o) => {
  const m = t(o, 'slug');
  if (!m) throw e({ statusCode: 400, message: 'Slug parameter is required' });
  const a = `song-${m}`,
    { value: d, addToCache: p } = await n(a, o);
  if (d) return d;
  const c = r.select().from(s).where(i(s.slug, m)).limit(1),
    u = await c.execute();
  if (!u.length) throw e({ statusCode: 404, message: 'Song not found' });
  const l = u[0];
  var f;
  return (
    l.lyrics &&
      (l.lyrics = (f = l.lyrics)
        ? f
            .split('\n')
            .map((o) => (o.trim() ? `<p>${o}</p>` : '<br>'))
            .join('')
        : null),
    p(l, [], 604800),
    l
  );
});
export { m as default };
//# sourceMappingURL=_slug_.mjs.map
