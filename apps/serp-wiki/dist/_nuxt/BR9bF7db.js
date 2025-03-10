import { _ as q } from './DLomW_ZE.js';
import { u as h, _ as R } from './DHvnABUf.js';
import { _ as U, u as I, a as j } from './DN_b9KJc.js';
import {
  d as T,
  T as F,
  U as G,
  i as g,
  o as l,
  u as H,
  a as z,
  r as B,
  n as b,
  w as S,
  D as A,
  b as D,
  c as k,
  e as x,
  f as P,
  H as E,
  M as J,
  F as K,
  h as L,
  j as a,
  R as O
} from './D7-Dmtkj.js';
import { _ as Q } from './DlAUqK2U.js';
import './BDzRyOtf.js';
const W = T({
    __name: 'SPagination',
    props: F(
      {
        totalItems: { default: 0 },
        limit: { default: 50 },
        siblingCount: { default: 3 }
      },
      { modelValue: {}, modelModifiers: {} }
    ),
    emits: ['update:modelValue'],
    setup(u) {
      const e = G(u, 'modelValue');
      return (t, s) => {
        const c = U;
        return (
          l(),
          g(
            c,
            {
              page: e.value,
              'onUpdate:page': s[0] || (s[0] = (i) => (e.value = i)),
              total: t.totalItems,
              'items-per-page': t.limit,
              'sibling-count': t.siblingCount,
              'aria-label': 'pagination',
              class: 'mt-20 flex justify-center overflow-x-auto rounded-none'
            },
            null,
            8,
            ['page', 'total', 'items-per-page', 'sibling-count']
          )
        );
      };
    }
  }),
  X = { class: 'pb-20' },
  Y = T({
    __name: 'Collection',
    props: {
      module: {},
      moduleTitle: {},
      baseSlug: {},
      seoTitle: {},
      useGrid: { type: Boolean },
      noCategories: { type: Boolean },
      useCategories: { type: Boolean }
    },
    async setup(u) {
      let e, t;
      const s = u,
        c = H(),
        i = z(),
        n = B(Number(i.query.page) || 1),
        p = B(Number(i.query.limit) || 50),
        V = b(() => s.useCategories),
        v = b(() => s.module),
        $ = b(() => s.seoTitle),
        _ = V.value ? (([e, t] = S(() => I())), (e = await e), t(), e) : null;
      let m =
        (([e, t] = S(() => h(n.value, p.value, '', v.value))),
        (e = await e),
        t(),
        e);
      return (
        m || c.push('/404'),
        A([n, p], async ([f, r]) => {
          const o = { ...i.query };
          f !== 1 ? (o.page = String(f)) : delete o.page,
            r !== 50 ? (o.limit = String(r)) : delete o.limit,
            (m = await h(n.value, p.value, '', v.value)),
            c.push({ query: o });
        }),
        D({ title: () => $.value || 'Posts' }),
        (f, r) => {
          var y, C;
          const o = q,
            w = R,
            M = W,
            N = j;
          return (
            l(),
            k('div', null, [
              x(o, { title: s.moduleTitle || 'Posts' }, null, 8, ['title']),
              P('div', X, [
                P(
                  'div',
                  {
                    class: J(
                      s.useGrid
                        ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
                        : 'space-y-4'
                    )
                  },
                  [
                    (l(!0),
                    k(
                      K,
                      null,
                      L(
                        a(m).posts,
                        (d) => (
                          l(),
                          g(
                            w,
                            { key: d.id, post: d, 'base-slug': s.baseSlug },
                            null,
                            8,
                            ['post', 'base-slug']
                          )
                        )
                      ),
                      128
                    ))
                  ],
                  2
                ),
                x(
                  M,
                  {
                    page: a(n),
                    'onUpdate:page':
                      r[0] || (r[0] = (d) => (O(n) ? (n.value = d) : null)),
                    total:
                      (C = (y = a(m)) == null ? void 0 : y.pagination) == null
                        ? void 0
                        : C.totalItems,
                    'items-per-page': a(p),
                    'sibling-count': 3
                  },
                  null,
                  8,
                  ['page', 'total', 'items-per-page']
                ),
                !s.noCategories && a(_) && a(_).length
                  ? (l(),
                    g(
                      N,
                      {
                        key: 0,
                        categories: a(_),
                        headline: 'Categories',
                        class: 'mt-20',
                        'base-slug': 'posts/category'
                      },
                      null,
                      8,
                      ['categories']
                    ))
                  : E('', !0)
              ])
            ])
          );
        }
      );
    }
  }),
  Z = {};
function ee(u, e) {
  const t = Y;
  return l(), g(t);
}
const ie = Q(Z, [['render', ee]]);
export { ie as default };
