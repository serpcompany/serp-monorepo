import {
  d as S,
  n as _,
  i as k,
  o as p,
  g as T,
  p as $,
  q as M,
  j as g,
  P as re,
  s as q,
  v as Q,
  x as se,
  c as b,
  y as V,
  z as ae,
  A as ne,
  B as ie,
  C as J,
  D as x,
  r as P,
  E as le,
  b as K,
  G,
  f as c,
  H as w,
  e as C,
  I as ce,
  J as ue,
  K as de,
  L as H,
  M as L,
  F as pe,
  t as I,
  N as fe,
  O as me,
  Q as ve,
  a as he,
  u as ye,
  w as _e
} from './D7-Dmtkj.js';
import { _ as Z } from './DlAUqK2U.js';
import { _ as U } from './CSVnevZN.js';
import { _ as ge } from './DLomW_ZE.js';
import { _ as be, u as we } from './BDzRyOtf.js';
const Pe = S({
    __name: 'BaseSeparator',
    props: {
      orientation: { default: 'horizontal' },
      decorative: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    setup(t) {
      const e = t,
        r = ['horizontal', 'vertical'];
      function o(i) {
        return r.includes(i);
      }
      const a = _(() => (o(e.orientation) ? e.orientation : 'horizontal')),
        s = _(() => (a.value === 'vertical' ? e.orientation : void 0)),
        n = _(() =>
          e.decorative
            ? { role: 'none' }
            : { 'aria-orientation': s.value, role: 'separator' }
        );
      return (i, l) => (
        p(),
        k(
          g(re),
          M(
            { as: i.as, 'as-child': i.asChild, 'data-orientation': a.value },
            n.value
          ),
          { default: T(() => [$(i.$slots, 'default')]), _: 3 },
          16,
          ['as', 'as-child', 'data-orientation']
        )
      );
    }
  }),
  ke = S({
    __name: 'Separator',
    props: {
      orientation: { default: 'horizontal' },
      decorative: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    setup(t) {
      const e = t;
      return (r, o) => (
        p(),
        k(Pe, q(Q(e)), { default: T(() => [$(r.$slots, 'default')]), _: 3 }, 16)
      );
    }
  }),
  ze = ['styles'],
  $e = S({
    __name: 'ScriptLoadingIndicator',
    props: { color: { default: 'currentColor' }, size: { default: 30 } },
    setup(t) {
      se((o) => ({ '7189be02': o.color }));
      const e = t,
        r = _(() => ({ width: `${e.size}px`, height: `${e.size}px` }));
      return (o, a) => (
        p(),
        b(
          'div',
          {
            class: 'loader',
            styles: g(r),
            'aria-label': 'Loading...',
            role: 'status'
          },
          null,
          8,
          ze
        )
      );
    }
  }),
  Se = Z($e, [['__scopeId', 'data-v-be18f53e']]);
function Y(t) {
  return ne() ? (ie(t), !0) : !1;
}
function N(t) {
  return typeof t == 'function' ? t() : g(t);
}
const Ce = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const Te = (t) => t != null,
  xe = Object.prototype.toString,
  Ae = (t) => xe.call(t) === '[object Object]',
  O = () => {};
function Le(t) {
  return J();
}
function Ie(t, e = !0, r) {
  Le() ? V(t, r) : e ? t() : ae(t);
}
const X = Ce ? window : void 0;
function B(t) {
  var e;
  const r = N(t);
  return (e = r == null ? void 0 : r.$el) != null ? e : r;
}
function Ee(...t) {
  let e, r, o, a;
  if (
    (typeof t[0] == 'string' || Array.isArray(t[0])
      ? (([r, o, a] = t), (e = X))
      : ([e, r, o, a] = t),
    !e)
  )
    return O;
  Array.isArray(r) || (r = [r]), Array.isArray(o) || (o = [o]);
  const s = [],
    n = () => {
      s.forEach((u) => u()), (s.length = 0);
    },
    i = (u, d, m, v) => (
      u.addEventListener(d, m, v), () => u.removeEventListener(d, m, v)
    ),
    l = x(
      () => [B(e), N(a)],
      ([u, d]) => {
        if ((n(), !u)) return;
        const m = Ae(d) ? { ...d } : d;
        s.push(...r.flatMap((v) => o.map((h) => i(u, v, h, m))));
      },
      { immediate: !0, flush: 'post' }
    ),
    f = () => {
      l(), n();
    };
  return Y(f), f;
}
function Oe() {
  const t = P(!1),
    e = J();
  return (
    e &&
      V(() => {
        t.value = !0;
      }, e),
    t
  );
}
function Be(t) {
  const e = Oe();
  return _(() => (e.value, !!t()));
}
function Me(t, e, r = {}) {
  const {
      root: o,
      rootMargin: a = '0px',
      threshold: s = 0,
      window: n = X,
      immediate: i = !0
    } = r,
    l = Be(() => n && 'IntersectionObserver' in n),
    f = _(() => {
      const h = N(t);
      return (Array.isArray(h) ? h : [h]).map(B).filter(Te);
    });
  let u = O;
  const d = P(i),
    m = l.value
      ? x(
          () => [f.value, B(o), d.value],
          ([h, R]) => {
            if ((u(), !d.value || !h.length)) return;
            const A = new IntersectionObserver(e, {
              root: B(R),
              rootMargin: a,
              threshold: s
            });
            h.forEach((E) => E && A.observe(E)),
              (u = () => {
                A.disconnect(), (u = O);
              });
          },
          { immediate: i, flush: 'post' }
        )
      : O,
    v = () => {
      u(), m(), (d.value = !1);
    };
  return (
    Y(v),
    {
      isSupported: l,
      isActive: d,
      pause() {
        u(), (d.value = !1);
      },
      resume() {
        d.value = !0;
      },
      stop: v
    }
  );
}
function Ye(t) {
  let e;
  return new Promise((r) => {
    (e = Me(
      t,
      (o) => {
        for (const a of o) a.isIntersecting && r(!0);
      },
      { rootMargin: '30px 0px 0px 0px', threshold: 0 }
    )),
      Y(() => r(!1));
  }).finally(() => {
    e.stop();
  });
}
function Re(t) {
  const { el: e, trigger: r } = t,
    o = (Array.isArray(t.trigger) ? t.trigger : [t.trigger]).filter(Boolean);
  if (!r || o.includes('immediate') || o.includes('onNuxtReady'))
    return 'onNuxtReady';
  if (o.some((n) => ['visibility', 'visible'].includes(n)))
    return e ? Ye(e) : new Promise(() => {});
  const a = {},
    s = new Promise((n) => {
      const i = typeof e < 'u' ? e : document.body,
        l = Ee(
          i,
          o,
          () => {
            l(), n(!0);
          },
          { once: !0, passive: !0 }
        );
      Ie(() => {
        x(
          i,
          (f) => {
            f &&
              o.forEach((u) => {
                f.dataset[`script_${u}`] && (l(), n(!0));
              });
          },
          { immediate: !0 }
        );
      }),
        Y(() => n(!1));
    });
  return Object.assign(s, { ssrAttrs: a });
}
function Ve(t) {
  let e = Promise.resolve();
  const r = le(
    'youtubePlayer',
    () => ({
      scriptInput: {
        src: 'https://www.youtube.com/iframe_api',
        crossorigin: !1
      },
      scriptOptions: {
        use() {
          return { YT: window.YT || e.then(() => window.YT) };
        }
      },
      clientInit: () => {
        e = new Promise((o) => {
          window.onYouTubeIframeAPIReady = o;
        });
      }
    }),
    t
  );
  {
    const o = x(r.status, (a) => {
      a === 'loading' &&
        (K({
          link: [
            { rel: 'preconnect', href: 'https://www.youtube-nocookie.com' },
            { rel: 'preconnect', href: 'https://www.google.com' },
            { rel: 'preconnect', href: 'https://googleads.g.doubleclick.net' },
            { rel: 'preconnect', href: 'https://static.doubleclick.net' }
          ]
        }),
        o());
    });
  }
  return r;
}
const Ne = S({
    __name: 'SScriptYouTubePlayer',
    props: {
      placeholderAttrs: {},
      rootAttrs: {},
      aboveTheFold: { type: Boolean },
      trigger: { default: 'mousedown' },
      videoId: {},
      playerVars: { default: { autoplay: 0, playsinline: 1 } },
      width: { default: 640 },
      height: { default: 360 }
    },
    emits: [
      'ready',
      'state-change',
      'playback-quality-change',
      'playback-rate-change',
      'error'
    ],
    setup(t, { expose: e, emit: r }) {
      const o = t,
        a = r,
        s = [
          'onReady',
          'onStateChange',
          'onPlaybackQualityChange',
          'onPlaybackRateChange',
          'onError',
          'onApiChange'
        ],
        n = P(),
        i = P(),
        l = P(!1),
        f = Re({ trigger: () => o.trigger, el: n }),
        u = Ve({ scriptOptions: { trigger: f } }),
        { onLoaded: d, status: m } = u,
        v = P();
      let h = !1;
      o.trigger === 'mousedown' &&
        f instanceof Promise &&
        f.then((y) => {
          y && (h = !0);
        }),
        V(() => {
          d(async (y) => {
            const j = y.YT instanceof Promise ? await y.YT : y.YT;
            await new Promise((z) => {
              typeof YT.Player > 'u' ? j.ready(z) : z();
            }),
              (v.value = new YT.Player(i.value, {
                ...o,
                events: Object.fromEntries(
                  s.map((z) => [
                    z,
                    (te) => {
                      var F;
                      const oe = z
                        .replace(/([A-Z])/g, '-$1')
                        .replace('on-', '')
                        .toLowerCase();
                      a(oe, te),
                        z === 'onReady' &&
                          ((l.value = !0),
                          h &&
                            ((F = v.value) == null || F.playVideo(), (h = !1)),
                          x(
                            () => o.videoId,
                            () => {
                              var W;
                              (W = v.value) == null ||
                                W.loadVideoById(o.videoId);
                            }
                          ));
                    }
                  ])
                )
              }));
          }),
            x(m, (y) => {
              y === 'error' && a('error');
            });
        }),
        e({ player: v });
      const R = _(() =>
          G(o.rootAttrs, {
            'aria-busy': m.value === 'loading',
            'aria-label':
              m.value === 'awaitingLoad'
                ? 'YouTube Player - Placeholder'
                : m.value === 'loading'
                  ? 'YouTube Player - Loading'
                  : 'YouTube Player - Loaded',
            'aria-live': 'polite',
            role: 'application',
            style: {
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: 'black',
              maxWidth: '100%',
              width: `${o.width}px`,
              height: 'auto',
              aspectRatio: `${o.width}/${o.height}`
            },
            ...(f instanceof Promise ? f.ssrAttrs || {} : {})
          })
        ),
        A = _(() => `https://i.ytimg.com/vi_webp/${o.videoId}/sddefault.webp`),
        E = _(() =>
          G(o.placeholderAttrs, {
            src: A.value,
            alt: '',
            loading: o.aboveTheFold ? 'eager' : 'lazy',
            style: { width: '100%', objectFit: 'cover', height: '100%' }
          })
        );
      return (y, j) => {
        const z = Se;
        return (
          p(),
          b(
            'div',
            M({ ref_key: 'rootEl', ref: n }, R.value),
            [
              c(
                'div',
                {
                  ref_key: 'youtubeEl',
                  ref: i,
                  style: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                  }
                },
                null,
                512
              ),
              l.value
                ? w('', !0)
                : $(
                    y.$slots,
                    'placeholder',
                    { key: 0, placeholder: A.value },
                    () => [c('img', q(Q(E.value)), null, 16)]
                  ),
              g(m) === 'loading'
                ? $(y.$slots, 'loading', { key: 1 }, () => [C(z)])
                : w('', !0),
              g(m) === 'awaitingLoad'
                ? $(y.$slots, 'awaitingLoad', { key: 2 })
                : g(m) === 'error'
                  ? $(y.$slots, 'error', { key: 3 })
                  : w('', !0),
              $(y.$slots, 'default')
            ],
            16
          )
        );
      };
    }
  }),
  je = {
    slots: {
      root: 'flex items-center align-center text-center',
      border: '',
      container: 'font-medium text-[var(--ui-text)] flex',
      icon: 'shrink-0 size-5',
      avatar: 'shrink-0',
      avatarSize: '2xs',
      label: 'text-sm'
    },
    variants: {
      color: {
        primary: { border: 'border-[var(--ui-primary)]' },
        secondary: { border: 'border-[var(--ui-secondary)]' },
        success: { border: 'border-[var(--ui-success)]' },
        info: { border: 'border-[var(--ui-info)]' },
        warning: { border: 'border-[var(--ui-warning)]' },
        error: { border: 'border-[var(--ui-error)]' },
        neutral: { border: 'border-[var(--ui-border)]' }
      },
      orientation: {
        horizontal: {
          root: 'w-full flex-row',
          border: 'w-full',
          container: 'mx-3 whitespace-nowrap'
        },
        vertical: {
          root: 'h-full flex-col',
          border: 'h-full',
          container: 'my-2'
        }
      },
      size: { xs: '', sm: '', md: '', lg: '', xl: '' },
      type: {
        solid: { border: 'border-solid' },
        dashed: { border: 'border-dashed' },
        dotted: { border: 'border-dotted' }
      }
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'xs', class: { border: 'border-t' } },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: { border: 'border-t-[2px]' }
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: { border: 'border-t-[3px]' }
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: { border: 'border-t-[4px]' }
      },
      {
        orientation: 'horizontal',
        size: 'xl',
        class: { border: 'border-t-[5px]' }
      },
      { orientation: 'vertical', size: 'xs', class: { border: 'border-s' } },
      {
        orientation: 'vertical',
        size: 'sm',
        class: { border: 'border-s-[2px]' }
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: { border: 'border-s-[3px]' }
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: { border: 'border-s-[4px]' }
      },
      {
        orientation: 'vertical',
        size: 'xl',
        class: { border: 'border-s-[5px]' }
      }
    ],
    defaultVariants: { color: 'neutral', size: 'xs', type: 'solid' }
  },
  Fe = ve;
var D;
const We = H({
    extend: H(je),
    ...(((D = Fe.ui) == null ? void 0 : D.separator) || {})
  }),
  ee = S({
    __name: 'Separator',
    props: {
      as: {},
      label: {},
      icon: {},
      avatar: {},
      color: {},
      size: {},
      type: {},
      orientation: { default: 'horizontal' },
      class: {},
      ui: {},
      decorative: { type: Boolean }
    },
    setup(t) {
      const e = t,
        r = ce(),
        o = ue(de(e, 'as', 'decorative', 'orientation')),
        a = _(() =>
          We({
            color: e.color,
            orientation: e.orientation,
            size: e.size,
            type: e.type
          })
        );
      return (s, n) => {
        var i;
        return (
          p(),
          k(
            g(ke),
            M(g(o), {
              class: a.value.root({
                class: [e.class, (i = e.ui) == null ? void 0 : i.root]
              })
            }),
            {
              default: T(() => {
                var l, f, u;
                return [
                  c(
                    'div',
                    {
                      class: L(
                        a.value.border({
                          class: (l = e.ui) == null ? void 0 : l.border
                        })
                      )
                    },
                    null,
                    2
                  ),
                  s.label || s.icon || s.avatar || r.default
                    ? (p(),
                      b(
                        pe,
                        { key: 0 },
                        [
                          c(
                            'div',
                            {
                              class: L(
                                a.value.container({
                                  class:
                                    (f = e.ui) == null ? void 0 : f.container
                                })
                              )
                            },
                            [
                              $(s.$slots, 'default', {}, () => {
                                var d, m, v, h;
                                return [
                                  s.label
                                    ? (p(),
                                      b(
                                        'span',
                                        {
                                          key: 0,
                                          class: L(
                                            a.value.label({
                                              class:
                                                (d = e.ui) == null
                                                  ? void 0
                                                  : d.label
                                            })
                                          )
                                        },
                                        I(s.label),
                                        3
                                      ))
                                    : s.icon
                                      ? (p(),
                                        k(
                                          fe,
                                          {
                                            key: 1,
                                            name: s.icon,
                                            class: L(
                                              a.value.icon({
                                                class:
                                                  (m = e.ui) == null
                                                    ? void 0
                                                    : m.icon
                                              })
                                            )
                                          },
                                          null,
                                          8,
                                          ['name', 'class']
                                        ))
                                      : s.avatar
                                        ? (p(),
                                          k(
                                            me,
                                            M(
                                              {
                                                key: 2,
                                                size:
                                                  ((v = e.ui) == null
                                                    ? void 0
                                                    : v.avatarSize) ||
                                                  a.value.avatarSize()
                                              },
                                              s.avatar,
                                              {
                                                class: a.value.avatar({
                                                  class:
                                                    (h = e.ui) == null
                                                      ? void 0
                                                      : h.avatar
                                                })
                                              }
                                            ),
                                            null,
                                            16,
                                            ['size', 'class']
                                          ))
                                        : w('', !0)
                                ];
                              })
                            ],
                            2
                          ),
                          c(
                            'div',
                            {
                              class: L(
                                a.value.border({
                                  class: (u = e.ui) == null ? void 0 : u.border
                                })
                              )
                            },
                            null,
                            2
                          )
                        ],
                        64
                      ))
                    : w('', !0)
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
  Ge = { class: 'mt-10 grid grid-cols-1 lg:grid-cols-3' },
  He = { class: 'col-span-2 pb-10' },
  De = { class: 'text-4xl font-bold lg:text-6xl' },
  qe = { key: 0, class: 'prose dark:prose-invert mt-4' },
  Qe = { class: 'col-span-1 pb-10' },
  Je = { class: 'prose dark:prose-invert col-span-2' },
  Ke = ['innerHTML'],
  Ze = { key: 0 },
  Ue = S({
    __name: 'GlossaryPost',
    props: { data: {} },
    setup(t) {
      const e = P(!1),
        r = P(!1),
        o = P();
      function a(s) {
        r.value = s.data === 1;
      }
      return (s, n) => {
        const i = Ne,
          l = U,
          f = ee;
        return (
          p(),
          b('div', null, [
            c('div', Ge, [
              c('div', He, [
                c('h1', De, I(s.data.keyword || s.data.title), 1),
                s.data.oneLiner
                  ? (p(), b('p', qe, I(s.data.oneLiner), 1))
                  : w('', !0)
              ]),
              c('div', Qe, [
                s.data.videoId
                  ? (p(),
                    k(
                      i,
                      {
                        key: 0,
                        ref_key: 'video',
                        ref: o,
                        'video-id': s.data.videoId,
                        onReady: n[0] || (n[0] = (u) => (e.value = !0)),
                        onStateChange: a
                      },
                      {
                        awaitingLoad: T(
                          () =>
                            n[1] ||
                            (n[1] = [
                              c(
                                'div',
                                {
                                  class:
                                    'absolute top-1/2 left-1/2 h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 transform'
                                },
                                [
                                  c(
                                    'svg',
                                    {
                                      height: '100%',
                                      version: '1.1',
                                      viewBox: '0 0 68 48',
                                      width: '100%'
                                    },
                                    [
                                      c('path', {
                                        d: 'M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z',
                                        fill: '#f00'
                                      }),
                                      c('path', {
                                        d: 'M 45,24 27,14 27,34',
                                        fill: '#fff'
                                      })
                                    ]
                                  )
                                ],
                                -1
                              )
                            ])
                        ),
                        _: 1
                      },
                      8,
                      ['video-id']
                    ))
                  : w('', !0)
              ]),
              C(
                f,
                { class: 'col-span-3 my-4' },
                { default: T(() => [C(l)]), _: 1 }
              ),
              c('div', Je, [
                c('article', { innerHTML: s.data.content }, null, 8, Ke),
                s.data.relatedPosts && s.data.relatedPosts.length === 0
                  ? (p(),
                    b(
                      'div',
                      Ze,
                      n[2] ||
                        (n[2] = [
                          c('h2', null, 'Related Posts', -1),
                          c(
                            'ul',
                            null,
                            [
                              c('li', null, 'Term 1'),
                              c('li', null, 'Term 2'),
                              c('li', null, 'Term 3')
                            ],
                            -1
                          )
                        ])
                    ))
                  : w('', !0)
              ]),
              n[3] || (n[3] = c('div', { class: 'col-span-1' }, null, -1))
            ])
          ])
        );
      };
    }
  }),
  Xe = { class: 'mb-8' },
  et = { class: 'items-end justify-between lg:flex' },
  tt = { key: 0 },
  ot = { key: 1 },
  rt = ['innerHTML'],
  st = S({
    __name: 'Post',
    props: { data: {} },
    setup(t) {
      return (e, r) => {
        var i, l;
        const o = ge,
          a = be,
          s = U,
          n = ee;
        return (
          p(),
          b('div', null, [
            c('section', Xe, [
              C(o, { title: e.data.title }, null, 8, ['title']),
              C(
                a,
                { 'base-slug': 'posts/category', items: e.data.categories },
                null,
                8,
                ['items']
              )
            ]),
            c('div', et, [
              (i = e.data) != null && i.author
                ? (p(), b('div', tt, 'Author: ' + I(e.data.author), 1))
                : w('', !0),
              (l = e.data) != null && l.createdAt
                ? (p(), b('div', ot, 'Published: ' + I(e.data.createdAt), 1))
                : w('', !0)
            ]),
            C(n, { class: 'my-4' }, { default: T(() => [C(s)]), _: 1 }),
            c(
              'article',
              { class: 'prose dark:prose-invert', innerHTML: e.data.content },
              null,
              8,
              rt
            )
          ])
        );
      };
    }
  }),
  at = async (t, e = '') => we(`/post/${t}?module=${e}`),
  nt = S({
    __name: 'Single',
    props: { module: {} },
    async setup(t) {
      let e, r;
      const o = t,
        a = _(() => o.module),
        n = he().params.slug,
        i = ye(),
        l = (([e, r] = _e(() => at(n, a.value))), (e = await e), r(), e);
      return (
        l || i.push('/404'),
        K({ title: () => l.title }),
        (f, u) => {
          const d = Ue,
            m = st;
          return (
            p(),
            b('div', null, [
              c('main', null, [
                g(l).module === 'Glossary'
                  ? (p(), k(d, { key: 0, data: g(l) }, null, 8, ['data']))
                  : (p(), k(m, { key: 1, data: g(l) }, null, 8, ['data']))
              ])
            ])
          );
        }
      );
    }
  }),
  it = {};
function lt(t, e) {
  const r = nt;
  return p(), k(r);
}
const mt = Z(it, [['render', lt]]);
export { mt as default };
