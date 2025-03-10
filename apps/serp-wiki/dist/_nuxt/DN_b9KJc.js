import {
  d as b,
  V as Z,
  W as $,
  X as _,
  n as g,
  Y as G,
  i as c,
  o as u,
  g as p,
  p as v,
  j as o,
  P as I,
  l as z,
  q as y,
  s as J,
  v as O,
  t as A,
  I as U,
  Z as x,
  $ as ee,
  a0 as ae,
  K as te,
  L as K,
  e as C,
  M as Q,
  H as F,
  c as N,
  S as w,
  F as j,
  h as X,
  Q as se,
  f as M,
  _ as oe
} from './D7-Dmtkj.js';
import { u as ne } from './BDzRyOtf.js';
const [B, le] = G('PaginationRoot'),
  ie = b({
    __name: 'PaginationRoot',
    props: {
      page: {},
      defaultPage: { default: 1 },
      itemsPerPage: {},
      total: { default: 0 },
      siblingCount: { default: 2 },
      disabled: { type: Boolean },
      showEdges: { type: Boolean, default: !1 },
      asChild: { type: Boolean },
      as: { default: 'nav' }
    },
    emits: ['update:page'],
    setup(s, { emit: n }) {
      const e = s,
        i = n,
        { siblingCount: l, disabled: a, showEdges: d } = Z(e);
      $();
      const m = _(e, 'page', i, {
          defaultValue: e.defaultPage,
          passive: e.page === void 0
        }),
        h = g(() => Math.max(1, Math.ceil(e.total / (e.itemsPerPage || 1))));
      return (
        le({
          page: m,
          onPageChange(f) {
            m.value = f;
          },
          pageCount: h,
          siblingCount: l,
          disabled: a,
          showEdges: d
        }),
        (f, k) => (
          u(),
          c(
            o(I),
            { as: f.as, 'as-child': f.asChild },
            {
              default: p(() => [
                v(f.$slots, 'default', { page: o(m), pageCount: h.value })
              ]),
              _: 3
            },
            8,
            ['as', 'as-child']
          )
        )
      );
    }
  }),
  re = b({
    __name: 'PaginationEllipsis',
    props: { asChild: { type: Boolean }, as: {} },
    setup(s) {
      const n = s;
      return (
        $(),
        (e, i) => (
          u(),
          c(
            o(I),
            y(n, { 'data-type': 'ellipsis' }),
            {
              default: p(() => [
                v(e.$slots, 'default', {}, () => [i[0] || (i[0] = z('…'))])
              ]),
              _: 3
            },
            16
          )
        )
      );
    }
  }),
  ue = b({
    __name: 'PaginationFirst',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(s) {
      const n = s,
        e = B();
      $();
      const i = g(() => e.page.value === 1 || e.disabled.value);
      return (l, a) => (
        u(),
        c(
          o(I),
          y(n, {
            'aria-label': 'First Page',
            type: l.as === 'button' ? 'button' : void 0,
            disabled: i.value,
            onClick: a[0] || (a[0] = (d) => !i.value && o(e).onPageChange(1))
          }),
          {
            default: p(() => [
              v(l.$slots, 'default', {}, () => [
                a[1] || (a[1] = z('First page'))
              ])
            ]),
            _: 3
          },
          16,
          ['type', 'disabled']
        )
      );
    }
  }),
  de = b({
    __name: 'PaginationLast',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(s) {
      const n = s,
        e = B();
      $();
      const i = g(() => e.page.value === e.pageCount.value || e.disabled.value);
      return (l, a) => (
        u(),
        c(
          o(I),
          y(n, {
            'aria-label': 'Last Page',
            type: l.as === 'button' ? 'button' : void 0,
            disabled: i.value,
            onClick:
              a[0] ||
              (a[0] = (d) =>
                !i.value && o(e).onPageChange(o(e).pageCount.value))
          }),
          {
            default: p(() => [
              v(l.$slots, 'default', {}, () => [
                a[1] || (a[1] = z('Last page'))
              ])
            ]),
            _: 3
          },
          16,
          ['type', 'disabled']
        )
      );
    }
  });
function P(s, n) {
  const e = n - s + 1;
  return Array.from({ length: e }, (i, l) => l + s);
}
function pe(s) {
  return s.map((n) =>
    typeof n == 'number' ? { type: 'page', value: n } : { type: 'ellipsis' }
  );
}
const D = 'ellipsis';
function ce(s, n, e, i) {
  const a = n,
    d = Math.max(s - e, 1),
    m = Math.min(s + e, a);
  if (i) {
    const f = Math.min(2 * e + 5, n) - 2,
      k = d > 3 && Math.abs(a - f - 1 + 1) > 2 && Math.abs(d - 1) > 2,
      L = m < a - 2 && Math.abs(a - f) > 2 && Math.abs(a - m) > 2;
    if (!k && L) return [...P(1, f), D, a];
    if (k && !L) {
      const t = P(a - f + 1, a);
      return [1, D, ...t];
    }
    if (k && L) {
      const t = P(d, m);
      return [1, D, ...t, D, a];
    }
    return P(1, a);
  } else {
    const h = e * 2 + 1;
    return n < h
      ? P(1, a)
      : s <= e + 1
        ? P(1, h)
        : n - s <= e
          ? P(n - h + 1, a)
          : P(d, m);
  }
}
const ve = b({
    __name: 'PaginationList',
    props: { asChild: { type: Boolean }, as: {} },
    setup(s) {
      const n = s;
      $();
      const e = B(),
        i = g(() =>
          pe(
            ce(
              e.page.value,
              e.pageCount.value,
              e.siblingCount.value,
              e.showEdges.value
            )
          )
        );
      return (l, a) => (
        u(),
        c(
          o(I),
          J(O(n)),
          {
            default: p(() => [v(l.$slots, 'default', { items: i.value })]),
            _: 3
          },
          16
        )
      );
    }
  }),
  fe = b({
    __name: 'PaginationListItem',
    props: { value: {}, asChild: { type: Boolean }, as: { default: 'button' } },
    setup(s) {
      const n = s;
      $();
      const e = B(),
        i = g(() => e.page.value === n.value),
        l = g(() => e.disabled.value);
      return (a, d) => (
        u(),
        c(
          o(I),
          y(n, {
            'data-type': 'page',
            'aria-label': `Page ${a.value}`,
            'aria-current': i.value ? 'page' : void 0,
            'data-selected': i.value ? 'true' : void 0,
            disabled: l.value,
            type: a.as === 'button' ? 'button' : void 0,
            onClick:
              d[0] || (d[0] = (m) => !l.value && o(e).onPageChange(a.value))
          }),
          {
            default: p(() => [
              v(a.$slots, 'default', {}, () => [z(A(a.value), 1)])
            ]),
            _: 3
          },
          16,
          ['aria-label', 'aria-current', 'data-selected', 'disabled', 'type']
        )
      );
    }
  }),
  ge = b({
    __name: 'PaginationNext',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(s) {
      const n = s;
      $();
      const e = B(),
        i = g(() => e.page.value === e.pageCount.value || e.disabled.value);
      return (l, a) => (
        u(),
        c(
          o(I),
          y(n, {
            'aria-label': 'Next Page',
            type: l.as === 'button' ? 'button' : void 0,
            disabled: i.value,
            onClick:
              a[0] ||
              (a[0] = (d) => !i.value && o(e).onPageChange(o(e).page.value + 1))
          }),
          {
            default: p(() => [
              v(l.$slots, 'default', {}, () => [
                a[1] || (a[1] = z('Next page'))
              ])
            ]),
            _: 3
          },
          16,
          ['type', 'disabled']
        )
      );
    }
  }),
  me = b({
    __name: 'PaginationPrev',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(s) {
      const n = s;
      $();
      const e = B(),
        i = g(() => e.page.value === 1 || e.disabled.value);
      return (l, a) => (
        u(),
        c(
          o(I),
          y(n, {
            'aria-label': 'Previous Page',
            type: l.as === 'button' ? 'button' : void 0,
            disabled: i.value,
            onClick:
              a[0] ||
              (a[0] = (d) => !i.value && o(e).onPageChange(o(e).page.value - 1))
          }),
          {
            default: p(() => [
              v(l.$slots, 'default', {}, () => [
                a[1] || (a[1] = z('Prev page'))
              ])
            ]),
            _: 3
          },
          16,
          ['type', 'disabled']
        )
      );
    }
  }),
  be = {
    slots: {
      root: '',
      list: 'flex items-center gap-1',
      ellipsis: 'pointer-events-none',
      label: 'min-w-5 text-center'
    }
  },
  he = se;
var T;
const Pe = K({
    extend: K(be),
    ...(((T = he.ui) == null ? void 0 : T.pagination) || {})
  }),
  we = b({
    __name: 'Pagination',
    props: {
      as: {},
      firstIcon: {},
      prevIcon: {},
      nextIcon: {},
      lastIcon: {},
      ellipsisIcon: {},
      color: { default: 'neutral' },
      variant: { default: 'outline' },
      activeColor: { default: 'primary' },
      activeVariant: { default: 'solid' },
      showControls: { type: Boolean, default: !0 },
      size: { default: 'md' },
      to: {},
      class: {},
      ui: {},
      defaultPage: {},
      disabled: { type: Boolean },
      itemsPerPage: { default: 10 },
      page: {},
      showEdges: { type: Boolean, default: !1 },
      siblingCount: { default: 2 },
      total: { default: 0 }
    },
    emits: ['update:page'],
    setup(s, { emit: n }) {
      const e = s,
        i = n,
        l = U(),
        a = x(),
        { dir: d } = ee(),
        m = ae(
          te(
            e,
            'as',
            'defaultPage',
            'disabled',
            'itemsPerPage',
            'page',
            'showEdges',
            'siblingCount',
            'total'
          ),
          i
        ),
        h = g(
          () =>
            e.firstIcon ||
            (d.value === 'rtl'
              ? a.ui.icons.chevronDoubleRight
              : a.ui.icons.chevronDoubleLeft)
        ),
        f = g(
          () =>
            e.prevIcon ||
            (d.value === 'rtl'
              ? a.ui.icons.chevronRight
              : a.ui.icons.chevronLeft)
        ),
        k = g(
          () =>
            e.nextIcon ||
            (d.value === 'rtl'
              ? a.ui.icons.chevronLeft
              : a.ui.icons.chevronRight)
        ),
        L = g(
          () =>
            e.lastIcon ||
            (d.value === 'rtl'
              ? a.ui.icons.chevronDoubleLeft
              : a.ui.icons.chevronDoubleRight)
        ),
        S = Pe();
      return (t, ze) => {
        var H;
        return (
          u(),
          c(
            o(ie),
            y(o(m), {
              class: o(S).root({
                class: [e.class, (H = e.ui) == null ? void 0 : H.root]
              })
            }),
            {
              default: p(({ page: R, pageCount: V }) => {
                var W;
                return [
                  C(
                    o(ve),
                    {
                      class: Q(
                        o(S).list({
                          class: (W = e.ui) == null ? void 0 : W.list
                        })
                      )
                    },
                    {
                      default: p(({ items: Y }) => [
                        t.showControls || l.first
                          ? (u(),
                            c(
                              o(ue),
                              { key: 0, 'as-child': '' },
                              {
                                default: p(() => [
                                  v(t.$slots, 'first', {}, () => {
                                    var r;
                                    return [
                                      C(
                                        w,
                                        {
                                          color: t.color,
                                          variant: t.variant,
                                          size: t.size,
                                          icon: h.value,
                                          to:
                                            (r = t.to) == null
                                              ? void 0
                                              : r.call(t, 1)
                                        },
                                        null,
                                        8,
                                        [
                                          'color',
                                          'variant',
                                          'size',
                                          'icon',
                                          'to'
                                        ]
                                      )
                                    ];
                                  })
                                ]),
                                _: 3
                              }
                            ))
                          : F('', !0),
                        t.showControls || l.prev
                          ? (u(),
                            c(
                              o(me),
                              { key: 1, 'as-child': '' },
                              {
                                default: p(() => [
                                  v(t.$slots, 'prev', {}, () => {
                                    var r;
                                    return [
                                      C(
                                        w,
                                        {
                                          color: t.color,
                                          variant: t.variant,
                                          size: t.size,
                                          icon: f.value,
                                          to:
                                            R > 1
                                              ? (r = t.to) == null
                                                ? void 0
                                                : r.call(t, R - 1)
                                              : void 0
                                        },
                                        null,
                                        8,
                                        [
                                          'color',
                                          'variant',
                                          'size',
                                          'icon',
                                          'to'
                                        ]
                                      )
                                    ];
                                  })
                                ]),
                                _: 2
                              },
                              1024
                            ))
                          : F('', !0),
                        (u(!0),
                        N(
                          j,
                          null,
                          X(
                            Y,
                            (r, q) => (
                              u(),
                              N(
                                j,
                                null,
                                [
                                  r.type === 'page'
                                    ? (u(),
                                      c(
                                        o(fe),
                                        {
                                          key: q,
                                          'as-child': '',
                                          value: r.value
                                        },
                                        {
                                          default: p(() => [
                                            v(
                                              t.$slots,
                                              'item',
                                              y(
                                                { ref_for: !0 },
                                                {
                                                  item: r,
                                                  index: q,
                                                  page: R,
                                                  pageCount: V
                                                }
                                              ),
                                              () => {
                                                var E;
                                                return [
                                                  C(
                                                    w,
                                                    {
                                                      color:
                                                        R === r.value
                                                          ? t.activeColor
                                                          : t.color,
                                                      variant:
                                                        R === r.value
                                                          ? t.activeVariant
                                                          : t.variant,
                                                      size: t.size,
                                                      label: String(r.value),
                                                      ui: {
                                                        label: o(S).label()
                                                      },
                                                      to:
                                                        (E = t.to) == null
                                                          ? void 0
                                                          : E.call(t, r.value),
                                                      square: ''
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      'color',
                                                      'variant',
                                                      'size',
                                                      'label',
                                                      'ui',
                                                      'to'
                                                    ]
                                                  )
                                                ];
                                              }
                                            )
                                          ]),
                                          _: 2
                                        },
                                        1032,
                                        ['value']
                                      ))
                                    : (u(),
                                      c(
                                        o(re),
                                        {
                                          key: r.type,
                                          index: q,
                                          'as-child': ''
                                        },
                                        {
                                          default: p(() => [
                                            v(t.$slots, 'ellipsis', {}, () => {
                                              var E;
                                              return [
                                                C(
                                                  w,
                                                  {
                                                    color: t.color,
                                                    variant: t.variant,
                                                    size: t.size,
                                                    icon:
                                                      t.ellipsisIcon ||
                                                      o(a).ui.icons.ellipsis,
                                                    class: Q(
                                                      o(S).ellipsis({
                                                        class:
                                                          (E = e.ui) == null
                                                            ? void 0
                                                            : E.ellipsis
                                                      })
                                                    )
                                                  },
                                                  null,
                                                  8,
                                                  [
                                                    'color',
                                                    'variant',
                                                    'size',
                                                    'icon',
                                                    'class'
                                                  ]
                                                )
                                              ];
                                            })
                                          ]),
                                          _: 2
                                        },
                                        1032,
                                        ['index']
                                      ))
                                ],
                                64
                              )
                            )
                          ),
                          256
                        )),
                        t.showControls || l.next
                          ? (u(),
                            c(
                              o(ge),
                              { key: 2, 'as-child': '' },
                              {
                                default: p(() => [
                                  v(t.$slots, 'next', {}, () => {
                                    var r;
                                    return [
                                      C(
                                        w,
                                        {
                                          color: t.color,
                                          variant: t.variant,
                                          size: t.size,
                                          icon: k.value,
                                          to:
                                            R < V
                                              ? (r = t.to) == null
                                                ? void 0
                                                : r.call(t, V)
                                              : void 0
                                        },
                                        null,
                                        8,
                                        [
                                          'color',
                                          'variant',
                                          'size',
                                          'icon',
                                          'to'
                                        ]
                                      )
                                    ];
                                  })
                                ]),
                                _: 2
                              },
                              1024
                            ))
                          : F('', !0),
                        t.showControls || l.last
                          ? (u(),
                            c(
                              o(de),
                              { key: 3, 'as-child': '' },
                              {
                                default: p(() => [
                                  v(t.$slots, 'last', {}, () => {
                                    var r;
                                    return [
                                      C(
                                        w,
                                        {
                                          color: t.color,
                                          variant: t.variant,
                                          size: t.size,
                                          icon: L.value,
                                          to:
                                            (r = t.to) == null
                                              ? void 0
                                              : r.call(t, V)
                                        },
                                        null,
                                        8,
                                        [
                                          'color',
                                          'variant',
                                          'size',
                                          'icon',
                                          'to'
                                        ]
                                      )
                                    ];
                                  })
                                ]),
                                _: 2
                              },
                              1024
                            ))
                          : F('', !0)
                      ]),
                      _: 2
                    },
                    1032,
                    ['class']
                  )
                ];
              }),
              _: 3
            },
            16,
            ['class']
          )
        );
      };
    }
  }),
  Ce = { class: 'mx-auto' },
  ye = { class: 'pt-12' },
  $e = { class: 'inline-block py-4 text-3xl font-bold' },
  Ie = {
    class:
      'mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  },
  Be = b({
    __name: 'SLinkHub',
    props: {
      categories: { type: Array, required: !0 },
      headline: { type: String, default: null },
      baseSlug: { type: String }
    },
    setup(s) {
      return (n, e) => {
        const i = oe;
        return (
          u(),
          N('section', null, [
            M('div', Ce, [
              M('div', ye, [M('div', null, [M('span', $e, A(s.headline), 1)])]),
              M('div', Ie, [
                (u(!0),
                N(
                  j,
                  null,
                  X(
                    s.categories,
                    (l) => (
                      u(),
                      N('div', { key: l.slug, class: 'border-t' }, [
                        C(
                          i,
                          {
                            to: `/${s.baseSlug}/${l.slug}/`,
                            class: 'mt-3 flex font-medium'
                          },
                          { default: p(() => [z(A(l.name), 1)]), _: 2 },
                          1032,
                          ['to']
                        )
                      ])
                    )
                  ),
                  128
                ))
              ])
            ])
          ])
        );
      };
    }
  }),
  Le = async (s = '') => await ne(`/post-categories?module=${s}`);
export { we as _, Be as a, Le as u };
