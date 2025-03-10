import { d as e, g as t, c as r } from '../../../nitro/nitro.mjs';
import { f as o } from '../../../_/chunk-KRMY7ATX.mjs';
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
const generateSlug = (e) =>
    e
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  s = Array.from({ length: 500 }, () => {
    const e = o.music.songName(),
      t = Math.random() > 0.9 ? 2 : 1;
    return {
      name: e,
      slug: generateSlug(e),
      artists: Array.from({ length: t }, (e, r) =>
        ((e, t) => {
          const r = o.person.fullName();
          return {
            creditName: r,
            joinPhrase: e === t - 1 ? '' : ' & ',
            slug: generateSlug(r)
          };
        })(r, t)
      )
    };
  }).sort((e, t) =>
    e.artists[0].creditName.localeCompare(t.artists[0].creditName)
  ),
  i = e(async (e) => {
    const { page: o = 1, limit: i = 100 } = t(e),
      a = Number(o),
      m = Math.min(Number(i), 100);
    if (isNaN(a) || a < 1 || !Number.isInteger(a))
      throw r({ statusCode: 400, message: 'Page must be a positive integer' });
    if (isNaN(m) || m < 1 || !Number.isInteger(m))
      throw r({ statusCode: 400, message: 'Limit must be a positive integer' });
    const n = (a - 1) * m;
    return {
      albums: s.slice(n, n + m),
      pagination: { currentPage: a, pageSize: m, totalItems: 500 }
    };
  });
export { i as default };
//# sourceMappingURL=albums.mjs.map
