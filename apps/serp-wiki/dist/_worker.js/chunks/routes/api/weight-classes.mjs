import { d as o, c as t } from '../../nitro/nitro.mjs';
import { db as e } from './index5.mjs';
import { w as r } from './db/schema.mjs';
import { u as s } from '../../_/useDataCache.mjs';
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
  const { value: m, addToCache: n } = await s('weight-classes', o);
  if (m) return m;
  const i = e.select().from(r),
    a = await i.execute();
  if (!a.length) throw t({ statusCode: 404, message: 'Not found' });
  const d = a.map((o) => o);
  return n(d, [], 36e3), d;
});
export { m as default };
//# sourceMappingURL=weight-classes.mjs.map
