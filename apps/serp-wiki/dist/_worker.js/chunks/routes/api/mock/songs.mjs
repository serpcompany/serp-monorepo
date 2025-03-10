import { d as e, g as r, c as t } from '../../../nitro/nitro.mjs';
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
  generateReleaseGroup = () => {
    if (Math.random() > 0.7) return null;
    const e = o.music.songName();
    return { name: e, slug: generateSlug(e) };
  },
  s = Array.from({ length: 500 }, () => {
    const e = o.music.songName(),
      r = Math.random() > 0.85 ? 2 : 1;
    return {
      name: e,
      slug: generateSlug(e),
      artists: Array.from({ length: r }, (e, t) =>
        ((e, r) => {
          const t = o.person.fullName();
          return {
            creditName: t,
            joinPhrase: e === r - 1 ? '' : ' & ',
            slug: generateSlug(t)
          };
        })(t, r)
      ),
      releaseGroup: generateReleaseGroup()
    };
  }).sort((e, r) => {
    const t = e.artists[0].creditName.localeCompare(r.artists[0].creditName);
    return 0 !== t ? t : e.name.localeCompare(r.name);
  }),
  n = e(async (e) => {
    const { page: o = 1, limit: n = 100 } = r(e),
      a = Number(o),
      i = Math.min(Number(n), 100);
    if (isNaN(a) || a < 1 || !Number.isInteger(a))
      throw t({ statusCode: 400, message: 'Page must be a positive integer' });
    if (isNaN(i) || i < 1 || !Number.isInteger(i))
      throw t({ statusCode: 400, message: 'Limit must be a positive integer' });
    const m = (a - 1) * i;
    return {
      songs: s.slice(m, m + i),
      pagination: { currentPage: a, pageSize: i, totalItems: 500 }
    };
  });
export { n as default };
//# sourceMappingURL=songs.mjs.map
