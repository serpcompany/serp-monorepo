import { d as o } from '../../../nitro/nitro.mjs';
import { db as e } from '../index5.mjs';
import { m as t } from '../db/schema.mjs';
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
const m = o(async (o) => {
  const { value: m, addToCache: s } = await r('album-sitemap', o);
  if (m) return m;
  const i = (await e.select({ slug: t.slug }).from(t).execute()).map(
    (o) => `/albums/${o.slug}/`
  );
  return s(i, [], 36e3), i;
});
export { m as default };
//# sourceMappingURL=index.mjs.map
