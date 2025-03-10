import { d as o } from '../../../nitro/nitro.mjs';
import { db as e } from '../index5.mjs';
import { p as r, e as t } from '../db/schema.mjs';
import { u as s } from '../../../_/useDataCache.mjs';
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
  const { value: m, addToCache: i } = await s('glossary-sitemap', o);
  if (m) return m;
  const n = (
    await e
      .select({ slug: r.slug })
      .from(r)
      .where(t(r.module, 'Glossary'))
      .execute()
  ).map((o) => `/posts/${o.slug}/`);
  return i(n, [], 36e3), n;
});
export { m as default };
//# sourceMappingURL=index7.mjs.map
