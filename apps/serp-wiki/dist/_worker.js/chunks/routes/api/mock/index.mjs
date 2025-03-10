import { d as e, g as t, c as i } from '../../../nitro/nitro.mjs';
import { f as r } from '../../../_/chunk-KRMY7ATX.mjs';
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
const g = [
    { name: 'Bantamweight', slug: 'bantamweight' },
    { name: 'Cruiserweight', slug: 'cruiserweight' },
    { name: 'Featherweight', slug: 'featherweight' },
    { name: 'Flyweight', slug: 'flyweight' },
    { name: 'Heavyweight', slug: 'heavyweight' },
    { name: 'Light Flyweight', slug: 'light-flyweight' },
    { name: 'Light Heavyweight', slug: 'light-heavyweight' },
    { name: 'Lightweight', slug: 'lightweight' },
    { name: 'Middleweight', slug: 'middleweight' },
    { name: 'Minimumweight', slug: 'minimumweight' },
    { name: 'Super Bantamweight', slug: 'super-bantamweight' },
    { name: 'Super Featherweight', slug: 'super-featherweight' },
    { name: 'Super Flyweight', slug: 'super-flyweight' },
    { name: 'Super Lightweight', slug: 'super-lightweight' },
    { name: 'Super Middleweight', slug: 'super-middleweight' },
    { name: 'Super Welterweight', slug: 'super-welterweight' },
    { name: 'Welterweight', slug: 'welterweight' }
  ],
  s = Array.from({ length: 500 }, () => {
    const e = r.person.fullName(),
      t = r.helpers.arrayElement(g);
    return {
      id: r.number.int(),
      name: e,
      slug: r.helpers.slugify(e),
      division: t
    };
  }).sort((e, t) => e.name.localeCompare(t.name)),
  n = e(async (e) => {
    const { page: r = 1, limit: g = 100, weightClassSlug: n = '' } = t(e),
      a = Number(r),
      m = Math.min(Number(g), 100);
    if (isNaN(a) || a < 1 || !Number.isInteger(a))
      throw i({ statusCode: 400, message: 'Page must be a positive integer.' });
    if (isNaN(m) || m < 1 || !Number.isInteger(m))
      throw i({
        statusCode: 400,
        message: 'Limit must be a positive integer.'
      });
    let o = s;
    n && (o = s.filter((e) => e.division.slug === n));
    const h = o.length;
    if (0 === h) throw i({ statusCode: 404, message: 'Not found' });
    const l = (a - 1) * m;
    return {
      boxers: o.slice(l, l + m),
      pagination: { currentPage: a, pageSize: m, totalItems: h }
    };
  });
export { n as default };
//# sourceMappingURL=index.mjs.map
