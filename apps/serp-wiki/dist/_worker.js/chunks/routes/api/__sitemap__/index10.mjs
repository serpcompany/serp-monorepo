import { d as o } from '../../../nitro/nitro.mjs';
import { db as t } from '../index5.mjs';
import { p as e } from '../db/schema.mjs';
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
  const { value: s, addToCache: m } = await r('post-sitemap', o);
  if (s) return s;
  const i = (await t.select({ slug: e.slug }).from(e).execute()).map(
    (o) => `/posts/${o.slug}/`
  );
  return m(i, [], 36e3), i;
});
export { s as default };
//# sourceMappingURL=index10.mjs.map
