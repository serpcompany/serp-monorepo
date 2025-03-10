import { d as o } from '../../../nitro/nitro.mjs';
import { db as e } from '../index5.mjs';
import { b as r } from '../db/schema.mjs';
import { u as t } from '../../../_/useDataCache.mjs';
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
  const { value: m, addToCache: s } = await t('boxers-sitemap', o);
  if (m) return m;
  const i = (await e.select({ slug: r.slug }).from(r).execute()).map(
    (o) => `/boxers/${o.slug}/`
  );
  return s(i, [], 36e3), i;
});
export { m as default };
//# sourceMappingURL=index4.mjs.map
