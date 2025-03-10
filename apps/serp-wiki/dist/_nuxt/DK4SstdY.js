import { _ as B } from './BT6izV9S.js';
import { u as h, _ as P } from './DHvnABUf.js';
import { u as R, _ as S, a as j } from './DN_b9KJc.js';
import {
  d as F,
  u as I,
  a as V,
  r as y,
  w as b,
  D as A,
  b as D,
  c as v,
  o as u,
  e as m,
  f as w,
  j as n,
  F as E,
  h as H,
  i as C,
  R as U
} from './D7-Dmtkj.js';
import { _ as z } from './DlAUqK2U.js';
import './BDzRyOtf.js';
const G = { class: 'pb-20' },
  J = { class: 'space-y-4' },
  K = F({
    __name: 'CategoryCollection',
    async setup(x) {
      let e, t;
      const p = I(),
        i = V(),
        a = y(Number(i.query.page) || 1),
        c = y(Number(i.query.limit) || 50),
        $ = (([e, t] = b(() => R())), (e = await e), t(), e),
        g = i.params.slug;
      let o =
        (([e, t] = b(() => h(a.value, c.value, g))), (e = await e), t(), e);
      return (
        o || p.push('/404'),
        A([a, c], async ([_, r]) => {
          const s = { ...i.query };
          _ !== 1 ? (s.page = String(_)) : delete s.page,
            r !== 50 ? (s.limit = String(r)) : delete s.limit,
            (o = await h(a.value, c.value, g)),
            p.push({ query: s });
        }),
        D({ title: () => `${o.categoryName} Posts` }),
        (_, r) => {
          var f, d;
          const s = B,
            N = P,
            k = S,
            q = j;
          return (
            u(),
            v('div', null, [
              m(
                s,
                {
                  headline:
                    `
    Category: ${n(o).categoryName}` ||
                    'If this is showing call 911, because something is very wrong.',
                  'show-search-bar': !1,
                  'show-buttons': !1
                },
                null,
                8,
                ['headline']
              ),
              w('main', G, [
                w('div', J, [
                  (u(!0),
                  v(
                    E,
                    null,
                    H(
                      n(o).posts,
                      (l) => (
                        u(), C(N, { key: l.id, post: l }, null, 8, ['post'])
                      )
                    ),
                    128
                  ))
                ]),
                m(
                  k,
                  {
                    page: n(a),
                    'onUpdate:page':
                      r[0] || (r[0] = (l) => (U(a) ? (a.value = l) : null)),
                    total:
                      (d = (f = n(o)) == null ? void 0 : f.pagination) == null
                        ? void 0
                        : d.totalItems,
                    'items-per-page': n(c),
                    'sibling-count': 3,
                    'aria-label': 'pagination',
                    class: 'mt-20 flex justify-center overflow-x-auto'
                  },
                  null,
                  8,
                  ['page', 'total', 'items-per-page']
                ),
                m(
                  q,
                  {
                    categories: n($),
                    headline: 'Categories',
                    class: 'mt-20',
                    'base-slug': 'posts/category'
                  },
                  null,
                  8,
                  ['categories']
                )
              ])
            ])
          );
        }
      );
    }
  }),
  L = {};
function M(x, e) {
  const t = K;
  return u(), C(t);
}
const Z = z(L, [['render', M]]);
export { Z as default };
