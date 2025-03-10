import { d as o } from '../../nitro/nitro.mjs';
import { db as e } from './index5.mjs';
import { c as t } from './db/schema.mjs';
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
  const { value: m, addToCache: i } = await r('company-categories', o);
  if (m) return m;
  const n = e.select().from(t),
    s = (await n.execute()).map((o) => o);
  return i(s, [], 36e3), s;
});
export { m as default };
//# sourceMappingURL=company-categories.mjs.map
