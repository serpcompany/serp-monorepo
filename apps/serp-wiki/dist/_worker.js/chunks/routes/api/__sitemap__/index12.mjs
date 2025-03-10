import { d as o } from '../../../nitro/nitro.mjs';
import { db as e } from '../index5.mjs';
import { g as t } from '../db/schema.mjs';
import { u as r } from '../../../_/useDataCache.mjs';
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
const s = o(async (o) => {
  const { value: s, addToCache: m } = await r('song-sitemap', o);
  if (s) return s;
  const n = (await e.select({ slug: t.slug }).from(t).execute()).map(
    (o) => `/songs/${o.slug}/`
  );
  return m(n, [], 36e3), n;
});
export { s as default };
//# sourceMappingURL=index12.mjs.map
