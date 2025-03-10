import { d as o } from '../../nitro/nitro.mjs';
import { db as e } from './index5.mjs';
import { f as t } from './db/schema.mjs';
import { u as r } from '../../_/useDataCache.mjs';
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
  const { value: m, addToCache: i } = await r('post-categories', o);
  if (m) return m;
  const s = e.select().from(t),
    n = (await s.execute()).map((o) => o);
  return i(n, [], 36e3), n;
});
export { m as default };
//# sourceMappingURL=post-categories.mjs.map
