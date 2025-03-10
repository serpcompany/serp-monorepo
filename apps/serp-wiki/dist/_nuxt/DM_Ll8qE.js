const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['./CQAWEB--.js', './D7-Dmtkj.js'])
) => i.map((i) => d[i]);
import {
  ae as He,
  r as R,
  n as A,
  d as N,
  Y as ye,
  X as Ke,
  V as je,
  W as H,
  i as E,
  o as b,
  g as C,
  p as z,
  j as t,
  P,
  af as Be,
  D as me,
  y as ve,
  ag as at,
  e as $,
  q as B,
  H as M,
  ah as fe,
  z as nt,
  ai as oe,
  aj as We,
  ak as it,
  al as _e,
  am as ot,
  an as st,
  a0 as xe,
  ao as lt,
  ap as Se,
  aq as Ue,
  ar as de,
  c as D,
  F as j,
  as as rt,
  at as ut,
  au as ct,
  L as X,
  N as W,
  M as T,
  O as we,
  t as ne,
  Q as ge,
  I as Ce,
  K as dt,
  a6 as vt,
  av as ft,
  aw as ie,
  l as be,
  h as ae,
  ax as Ne,
  ay as gt,
  az as se,
  aA as le,
  aB as re,
  f as S,
  aC as pt,
  aD as ht,
  S as mt,
  k as bt,
  _ as kt,
  $ as yt,
  Z as _t,
  aE as xt,
  aF as wt,
  aG as Ct,
  aH as It,
  aI as qe,
  u as Lt,
  aJ as $t,
  aK as Tt,
  ab as Z,
  G as Et,
  aL as Ot,
  aM as zt,
  a1 as Mt,
  a2 as Dt
} from './D7-Dmtkj.js';
import { _ as Rt } from './CSVnevZN.js';
import './DlAUqK2U.js';
function Bt(l) {
  const a = He({ dir: R('ltr') });
  return A(() => {
    var e;
    return (
      (l == null ? void 0 : l.value) ||
      ((e = a.dir) == null ? void 0 : e.value) ||
      'ltr'
    );
  });
}
const [Xe, St] = ye('CollapsibleRoot'),
  Nt = N({
    __name: 'CollapsibleRoot',
    props: {
      defaultOpen: { type: Boolean, default: !1 },
      open: { type: Boolean, default: void 0 },
      disabled: { type: Boolean },
      unmountOnHide: { type: Boolean, default: !0 },
      asChild: { type: Boolean },
      as: {}
    },
    emits: ['update:open'],
    setup(l, { expose: a, emit: e }) {
      const r = l,
        d = Ke(r, 'open', e, {
          defaultValue: r.defaultOpen,
          passive: r.open === void 0
        }),
        { disabled: u, unmountOnHide: s } = je(r);
      return (
        St({
          contentId: '',
          disabled: u,
          open: d,
          unmountOnHide: s,
          onOpenToggle: () => {
            d.value = !d.value;
          }
        }),
        a({ open: d }),
        H(),
        (f, c) => (
          b(),
          E(
            t(P),
            {
              as: f.as,
              'as-child': r.asChild,
              'data-state': t(d) ? 'open' : 'closed',
              'data-disabled': t(u) ? '' : void 0
            },
            {
              default: C(() => [z(f.$slots, 'default', { open: t(d) })]),
              _: 3
            },
            8,
            ['as', 'as-child', 'data-state', 'data-disabled']
          )
        )
      );
    }
  }),
  At = ['INPUT', 'TEXTAREA'];
function Ge(l, a, e, r = {}) {
  if (!a || (r.enableIgnoredElement && At.includes(a.nodeName))) return null;
  const {
      arrowKeyOptions: o = 'both',
      attributeName: d = '[data-reka-collection-item]',
      itemsArray: u = [],
      loop: s = !0,
      dir: f = 'ltr',
      preventScroll: c = !0,
      focus: p = !1
    } = r,
    [n, x, L, i, m, k] = [
      l.key === 'ArrowRight',
      l.key === 'ArrowLeft',
      l.key === 'ArrowUp',
      l.key === 'ArrowDown',
      l.key === 'Home',
      l.key === 'End'
    ],
    w = L || i,
    g = n || x;
  if (
    !m &&
    !k &&
    ((!w && !g) || (o === 'vertical' && g) || (o === 'horizontal' && w))
  )
    return null;
  const v = u;
  if (!v.length) return null;
  c && l.preventDefault();
  let y = null;
  return (
    g || w
      ? (y = Qe(v, a, { goForward: w ? i : f === 'ltr' ? n : x, loop: s }))
      : m
        ? (y = v.at(0) || null)
        : k && (y = v.at(-1) || null),
    p && (y == null || y.focus()),
    y
  );
}
function Qe(l, a, e, r = l.length) {
  if (--r === 0) return null;
  const o = l.indexOf(a),
    d = e.goForward ? o + 1 : o - 1;
  if (!e.loop && (d < 0 || d >= l.length)) return null;
  const u = (d + l.length) % l.length,
    s = l[u];
  return s
    ? s.hasAttribute('disabled') && s.getAttribute('disabled') !== 'false'
      ? Qe(l, s, e, r)
      : s
    : null;
}
let Pt = 0;
function Ie(l, a = 'reka') {
  if (l) return l;
  const e = He({ useId: void 0 });
  return Be ? `${a}-${Be()}` : e.useId ? `${a}-${e.useId()}` : `${a}-${++Pt}`;
}
const Vt = N({
    inheritAttrs: !1,
    __name: 'CollapsibleContent',
    props: {
      forceMount: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    emits: ['contentFound'],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        o = Xe();
      o.contentId || (o.contentId = Ie(void 0, 'reka-collapsible-content'));
      const d = R(),
        { forwardRef: u, currentElement: s } = H(),
        f = R(0),
        c = R(0),
        p = A(() => o.open.value),
        n = R(p.value),
        x = R();
      me(
        () => {
          var i;
          return [p.value, (i = d.value) == null ? void 0 : i.present];
        },
        async () => {
          await nt();
          const i = s.value;
          if (!i) return;
          (x.value = x.value || {
            transitionDuration: i.style.transitionDuration,
            animationName: i.style.animationName
          }),
            (i.style.transitionDuration = '0s'),
            (i.style.animationName = 'none');
          const m = i.getBoundingClientRect();
          (c.value = m.height),
            (f.value = m.width),
            n.value ||
              ((i.style.transitionDuration = x.value.transitionDuration),
              (i.style.animationName = x.value.animationName));
        },
        { immediate: !0 }
      );
      const L = A(() => n.value && o.open.value);
      return (
        ve(() => {
          requestAnimationFrame(() => {
            n.value = !1;
          });
        }),
        at(s, 'beforematch', (i) => {
          requestAnimationFrame(() => {
            o.onOpenToggle(), r('contentFound');
          });
        }),
        (i, m) => (
          b(),
          E(
            t(fe),
            {
              ref_key: 'presentRef',
              ref: d,
              present: i.forceMount || t(o).open.value,
              'force-mount': !0
            },
            {
              default: C(({ present: k }) => {
                var w;
                return [
                  $(
                    t(P),
                    B(i.$attrs, {
                      id: t(o).contentId,
                      ref: t(u),
                      'as-child': e.asChild,
                      as: i.as,
                      hidden: k
                        ? void 0
                        : t(o).unmountOnHide.value
                          ? ''
                          : 'until-found',
                      'data-state': L.value
                        ? void 0
                        : t(o).open.value
                          ? 'open'
                          : 'closed',
                      'data-disabled':
                        (w = t(o).disabled) != null && w.value ? '' : void 0,
                      style: {
                        '--reka-collapsible-content-height': `${c.value}px`,
                        '--reka-collapsible-content-width': `${f.value}px`
                      }
                    }),
                    {
                      default: C(() => [
                        !t(o).unmountOnHide.value || k
                          ? z(i.$slots, 'default', { key: 0 })
                          : M('', !0)
                      ]),
                      _: 2
                    },
                    1040,
                    [
                      'id',
                      'as-child',
                      'as',
                      'hidden',
                      'data-state',
                      'data-disabled',
                      'style'
                    ]
                  )
                ];
              }),
              _: 3
            },
            8,
            ['present']
          )
        )
      );
    }
  }),
  Ft = N({
    __name: 'CollapsibleTrigger',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(l) {
      const a = l;
      H();
      const e = Xe();
      return (r, o) => {
        var d, u;
        return (
          b(),
          E(
            t(P),
            {
              type: r.as === 'button' ? 'button' : void 0,
              as: r.as,
              'as-child': a.asChild,
              'aria-controls': t(e).contentId,
              'aria-expanded': t(e).open.value,
              'data-state': t(e).open.value ? 'open' : 'closed',
              'data-disabled':
                (d = t(e).disabled) != null && d.value ? '' : void 0,
              disabled: (u = t(e).disabled) == null ? void 0 : u.value,
              onClick: t(e).onOpenToggle
            },
            { default: C(() => [z(r.$slots, 'default')]), _: 3 },
            8,
            [
              'type',
              'as',
              'as-child',
              'aria-controls',
              'aria-expanded',
              'data-state',
              'data-disabled',
              'disabled',
              'onClick'
            ]
          )
        );
      };
    }
  }),
  [Q, Ht] = ye(
    ['NavigationMenuRoot', 'NavigationMenuSub'],
    'NavigationMenuContext'
  ),
  Kt = N({
    __name: 'NavigationMenuRoot',
    props: {
      modelValue: { default: void 0 },
      defaultValue: {},
      dir: {},
      orientation: { default: 'horizontal' },
      delayDuration: { default: 200 },
      skipDelayDuration: { default: 300 },
      disableClickTrigger: { type: Boolean, default: !1 },
      disableHoverTrigger: { type: Boolean, default: !1 },
      disablePointerLeaveClose: { type: Boolean },
      unmountOnHide: { type: Boolean, default: !0 },
      asChild: { type: Boolean },
      as: { default: 'nav' }
    },
    emits: ['update:modelValue'],
    setup(l, { emit: a }) {
      const e = l,
        o = Ke(e, 'modelValue', a, {
          defaultValue: e.defaultValue ?? '',
          passive: e.modelValue === void 0
        }),
        d = R(''),
        { forwardRef: u, currentElement: s } = H(),
        f = R(),
        c = R(),
        p = R(),
        { getItems: n, CollectionSlot: x } = oe({
          key: 'NavigationMenu',
          isProvider: !0
        }),
        {
          delayDuration: L,
          skipDelayDuration: i,
          dir: m,
          disableClickTrigger: k,
          disableHoverTrigger: w,
          unmountOnHide: g
        } = je(e),
        v = Bt(m),
        y = We(!1, i),
        h = A(() => (o.value !== '' || y.value ? 150 : L.value)),
        I = it((_) => {
          typeof _ == 'string' && ((d.value = o.value), (o.value = _));
        }, h);
      return (
        _e(() => {
          if (!o.value) return;
          const _ = n().map((O) => O.ref);
          p.value = _.find((O) => O.id.includes(o.value));
        }),
        Ht({
          isRootMenu: !0,
          modelValue: o,
          previousValue: d,
          baseId: Ie(void 0, 'reka-navigation-menu'),
          disableClickTrigger: k,
          disableHoverTrigger: w,
          dir: v,
          unmountOnHide: g,
          orientation: e.orientation,
          rootNavigationMenu: s,
          indicatorTrack: f,
          activeTrigger: p,
          onIndicatorTrackChange: (_) => {
            f.value = _;
          },
          viewport: c,
          onViewportChange: (_) => {
            c.value = _;
          },
          onTriggerEnter: (_) => {
            I(_);
          },
          onTriggerLeave: () => {
            (y.value = !0), I('');
          },
          onContentEnter: () => {
            I();
          },
          onContentLeave: () => {
            e.disablePointerLeaveClose || I('');
          },
          onItemSelect: (_) => {
            (d.value = o.value), (o.value = _);
          },
          onItemDismiss: () => {
            (d.value = o.value), (o.value = '');
          }
        }),
        (_, O) => (
          b(),
          E(t(x), null, {
            default: C(() => [
              $(
                t(P),
                {
                  ref: t(u),
                  'aria-label': 'Main',
                  as: _.as,
                  'as-child': _.asChild,
                  'data-orientation': _.orientation,
                  dir: t(v),
                  'data-reka-navigation-menu': ''
                },
                {
                  default: C(() => [
                    z(_.$slots, 'default', { modelValue: t(o) })
                  ]),
                  _: 3
                },
                8,
                ['as', 'as-child', 'data-orientation', 'dir']
              )
            ]),
            _: 3
          })
        )
      );
    }
  });
function pe(l) {
  return l ? 'open' : 'closed';
}
function Ye(l, a) {
  return `${l}-trigger-${a}`;
}
function Le(l, a) {
  return `${l}-content-${a}`;
}
const jt = 'navigationMenu.linkSelect',
  ue = 'navigationMenu.rootContentDismiss';
function ke(l) {
  const a = [],
    e = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      }
    });
  for (; e.nextNode(); ) a.push(e.currentNode);
  return a;
}
function Je(l) {
  const a = document.activeElement;
  return l.some((e) =>
    e === a ? !0 : (e.focus(), document.activeElement !== a)
  );
}
function Wt(l) {
  return (
    l.forEach((a) => {
      (a.dataset.tabindex = a.getAttribute('tabindex') || ''),
        a.setAttribute('tabindex', '-1');
    }),
    () => {
      l.forEach((a) => {
        const e = a.dataset.tabindex;
        a.setAttribute('tabindex', e);
      });
    }
  );
}
function Ze(l) {
  return (a) => (a.pointerType === 'mouse' ? l(a) : void 0);
}
const [$e, Ut] = ye('NavigationMenuItem'),
  qt = N({
    __name: 'NavigationMenuItem',
    props: { value: {}, asChild: { type: Boolean }, as: { default: 'li' } },
    setup(l) {
      const a = l;
      H();
      const { getItems: e } = oe({ key: 'NavigationMenu' }),
        r = Q(),
        o = Ie(a.value),
        d = R(),
        u = R(),
        s = Le(r.baseId, o);
      let f = () => ({});
      const c = R(!1);
      async function p(i = 'start') {
        const m = document.getElementById(s);
        if (m) {
          f();
          const k = ke(m);
          k.length && Je(i === 'start' ? k : k.reverse());
        }
      }
      function n() {
        const i = document.getElementById(s);
        if (i) {
          const m = ke(i);
          m.length && (f = Wt(m));
        }
      }
      Ut({
        value: o,
        contentId: s,
        triggerRef: d,
        focusProxyRef: u,
        wasEscapeCloseRef: c,
        onEntryKeyDown: p,
        onFocusProxyEnter: p,
        onContentFocusOutside: n,
        onRootContentClose: n
      });
      function x() {
        var i;
        r.onItemDismiss(), (i = d.value) == null || i.focus();
      }
      function L(i) {
        const m = document.activeElement;
        if (i.keyCode === 32 || i.key === 'Enter')
          if (r.modelValue.value === o) {
            x(), i.preventDefault();
            return;
          } else {
            i.target.click(), i.preventDefault();
            return;
          }
        const k = e()
          .filter((g) => {
            var v;
            return (v = g.ref.parentElement) == null
              ? void 0
              : v.hasAttribute('data-menu-item');
          })
          .map((g) => g.ref);
        if (!k.includes(m)) return;
        const w = Ge(i, m, void 0, { itemsArray: k, loop: !1 });
        w && (w == null || w.focus()), i.preventDefault(), i.stopPropagation();
      }
      return (i, m) => (
        b(),
        E(
          t(P),
          {
            'as-child': i.asChild,
            as: i.as,
            'data-menu-item': '',
            onKeydown: ot(L, [
              'up',
              'down',
              'left',
              'right',
              'home',
              'end',
              'space'
            ])
          },
          { default: C(() => [z(i.$slots, 'default')]), _: 3 },
          8,
          ['as-child', 'as']
        )
      );
    }
  }),
  Xt = N({
    __name: 'NavigationMenuContentImpl',
    props: {
      disableOutsidePointerEvents: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside'
    ],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        { getItems: o } = oe({ key: 'NavigationMenu' }),
        { forwardRef: d, currentElement: u } = H(),
        s = Q(),
        f = $e(),
        c = Ye(s.baseId, f.value),
        p = Le(s.baseId, f.value),
        n = R(null),
        x = A(() => {
          const g = o().map((O) => O.ref.id.split('trigger-')[1]);
          s.dir.value === 'rtl' && g.reverse();
          const v = g.indexOf(s.modelValue.value),
            y = g.indexOf(s.previousValue.value),
            h = f.value === s.modelValue.value,
            I = y === g.indexOf(f.value);
          if (!h && !I) return n.value;
          const _ = (() => {
            if (v !== y) {
              if (h && y !== -1) return v > y ? 'from-end' : 'from-start';
              if (I && v !== -1) return v > y ? 'to-start' : 'to-end';
            }
            return null;
          })();
          return (n.value = _), _;
        });
      function L(g) {
        var y, h;
        if (
          (r('focusOutside', g),
          r('interactOutside', g),
          g.detail.originalEvent.target.hasAttribute(
            'data-navigation-menu-trigger'
          ) && g.preventDefault(),
          !g.defaultPrevented)
        ) {
          f.onContentFocusOutside();
          const I = g.target;
          (h = (y = s.rootNavigationMenu) == null ? void 0 : y.value) != null &&
            h.contains(I) &&
            g.preventDefault();
        }
      }
      function i(g) {
        var v;
        if ((r('pointerDownOutside', g), !g.defaultPrevented)) {
          const y = g.target,
            h = o().some((_) => _.ref.contains(y)),
            I =
              s.isRootMenu &&
              ((v = s.viewport.value) == null ? void 0 : v.contains(y));
          (h || I || !s.isRootMenu) && g.preventDefault();
        }
      }
      _e((g) => {
        const v = u.value;
        if (s.isRootMenu && v) {
          const y = () => {
            var h;
            s.onItemDismiss(),
              f.onRootContentClose(),
              v.contains(document.activeElement) &&
                ((h = f.triggerRef.value) == null || h.focus());
          };
          v.addEventListener(ue, y), g(() => v.removeEventListener(ue, y));
        }
      });
      function m(g) {
        var v, y;
        r('escapeKeyDown', g),
          g.defaultPrevented ||
            (s.onItemDismiss(),
            (y = (v = f.triggerRef) == null ? void 0 : v.value) == null ||
              y.focus(),
            (f.wasEscapeCloseRef.value = !0));
      }
      function k(g) {
        var _;
        if (
          g.target.closest('[data-reka-navigation-menu]') !==
          s.rootNavigationMenu.value
        )
          return;
        const v = g.altKey || g.ctrlKey || g.metaKey,
          y = g.key === 'Tab' && !v,
          h = ke(g.currentTarget);
        if (y) {
          const O = document.activeElement,
            K = h.findIndex((q) => q === O),
            V = g.shiftKey ? h.slice(0, K).reverse() : h.slice(K + 1, h.length);
          if (Je(V)) g.preventDefault();
          else {
            (_ = f.focusProxyRef.value) == null || _.focus();
            return;
          }
        }
        const I = Ge(g, document.activeElement, void 0, {
          itemsArray: h,
          loop: !1,
          enableIgnoredElement: !0
        });
        I == null || I.focus();
      }
      function w() {
        var v;
        const g = new Event(ue, { bubbles: !0, cancelable: !0 });
        (v = u.value) == null || v.dispatchEvent(g);
      }
      return (g, v) => (
        b(),
        E(
          t(st),
          B(
            {
              id: t(p),
              ref: t(d),
              'aria-labelledby': t(c),
              'data-motion': x.value,
              'data-state': t(pe)(t(s).modelValue.value === t(f).value),
              'data-orientation': t(s).orientation
            },
            e,
            {
              onKeydown: k,
              onEscapeKeyDown: m,
              onPointerDownOutside: i,
              onFocusOutside: L,
              onDismiss: w
            }
          ),
          { default: C(() => [z(g.$slots, 'default')]), _: 3 },
          16,
          [
            'id',
            'aria-labelledby',
            'data-motion',
            'data-state',
            'data-orientation'
          ]
        )
      );
    }
  }),
  Gt = N({
    inheritAttrs: !1,
    __name: 'NavigationMenuContent',
    props: {
      forceMount: { type: Boolean },
      disableOutsidePointerEvents: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside'
    ],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        o = xe(lt(e, 'forceMount'), r),
        { forwardRef: d } = H(),
        u = Q(),
        s = $e(),
        f = A(() => s.value === u.modelValue.value),
        c = A(() =>
          u.viewport.value && !u.modelValue.value && u.previousValue.value
            ? u.previousValue.value === s.value
            : !1
        );
      return (p, n) => (
        b(),
        E(
          Ue,
          {
            to: t(Se) && t(u).viewport.value ? t(u).viewport.value : 'body',
            disabled: t(Se) && t(u).viewport.value ? !t(u).viewport.value : !0
          },
          [
            $(
              t(fe),
              {
                present: p.forceMount || f.value || c.value,
                'force-mount': !t(u).unmountOnHide.value
              },
              {
                default: C(({ present: x }) => [
                  $(
                    Xt,
                    B(
                      {
                        ref: t(d),
                        'data-state': t(pe)(f.value),
                        style: {
                          pointerEvents:
                            !f.value && t(u).isRootMenu ? 'none' : void 0
                        }
                      },
                      { ...p.$attrs, ...t(o) },
                      {
                        hidden: !x,
                        onPointerenter:
                          n[0] ||
                          (n[0] = (L) => t(u).onContentEnter(t(s).value)),
                        onPointerleave:
                          n[1] ||
                          (n[1] = (L) => t(Ze)(() => t(u).onContentLeave())(L)),
                        onPointerDownOutside:
                          n[2] || (n[2] = (L) => r('pointerDownOutside', L)),
                        onFocusOutside:
                          n[3] || (n[3] = (L) => r('focusOutside', L)),
                        onInteractOutside:
                          n[4] || (n[4] = (L) => r('interactOutside', L))
                      }
                    ),
                    { default: C(() => [z(p.$slots, 'default')]), _: 2 },
                    1040,
                    ['data-state', 'style', 'hidden']
                  )
                ]),
                _: 3
              },
              8,
              ['present', 'force-mount']
            )
          ],
          8,
          ['to', 'disabled']
        )
      );
    }
  }),
  Qt = N({
    inheritAttrs: !1,
    __name: 'NavigationMenuIndicator',
    props: {
      forceMount: { type: Boolean },
      asChild: { type: Boolean },
      as: {}
    },
    setup(l) {
      const a = l,
        { forwardRef: e } = H(),
        r = Q(),
        o = R(),
        d = A(() => r.orientation === 'horizontal'),
        u = A(() => !!r.modelValue.value),
        { activeTrigger: s } = r;
      function f() {
        s.value &&
          (o.value = {
            size: d.value ? s.value.offsetWidth : s.value.offsetHeight,
            offset: d.value ? s.value.offsetLeft : s.value.offsetTop
          });
      }
      return (
        _e(() => {
          if (!r.modelValue.value) {
            o.value = void 0;
            return;
          }
          f();
        }),
        de(s, f),
        de(r.indicatorTrack, f),
        (c, p) => {
          var n;
          return t(r).indicatorTrack.value
            ? (b(),
              E(
                Ue,
                { key: 0, to: t(r).indicatorTrack.value },
                [
                  $(
                    t(fe),
                    {
                      present:
                        (c.forceMount || u.value) &&
                        !!((n = o.value) != null && n.size)
                    },
                    {
                      default: C(() => {
                        var x, L, i, m;
                        return [
                          $(
                            t(P),
                            B(
                              {
                                ref: t(e),
                                'aria-hidden': 'true',
                                'data-state': u.value ? 'visible' : 'hidden',
                                'data-orientation': t(r).orientation,
                                'as-child': a.asChild,
                                as: c.as,
                                style: {
                                  position: 'absolute',
                                  ...(d.value
                                    ? {
                                        left: 0,
                                        width: `${(x = o.value) == null ? void 0 : x.size}px`,
                                        transform: `translateX(${(L = o.value) == null ? void 0 : L.offset}px)`
                                      }
                                    : {
                                        top: 0,
                                        height: `${(i = o.value) == null ? void 0 : i.size}px`,
                                        transform: `translateY(${(m = o.value) == null ? void 0 : m.offset}px)`
                                      })
                                }
                              },
                              c.$attrs
                            ),
                            {
                              default: C(() => [z(c.$slots, 'default')]),
                              _: 3
                            },
                            16,
                            [
                              'data-state',
                              'data-orientation',
                              'as-child',
                              'as',
                              'style'
                            ]
                          )
                        ];
                      }),
                      _: 3
                    },
                    8,
                    ['present']
                  )
                ],
                8,
                ['to']
              ))
            : M('', !0);
        }
      );
    }
  }),
  he = N({
    __name: 'NavigationMenuLink',
    props: {
      active: { type: Boolean },
      asChild: { type: Boolean },
      as: { default: 'a' }
    },
    emits: ['select'],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        { CollectionItem: o } = oe({ key: 'NavigationMenu' });
      H();
      async function d(u) {
        var f;
        const s = new CustomEvent(jt, {
          bubbles: !0,
          cancelable: !0,
          detail: { originalEvent: u }
        });
        if ((r('select', s), !s.defaultPrevented && !u.metaKey)) {
          const c = new CustomEvent(ue, { bubbles: !0, cancelable: !0 });
          (f = u.target) == null || f.dispatchEvent(c);
        }
      }
      return (u, s) => (
        b(),
        E(t(o), null, {
          default: C(() => [
            $(
              t(P),
              {
                as: u.as,
                'data-active': u.active ? '' : void 0,
                'aria-current': u.active ? 'page' : void 0,
                'as-child': e.asChild,
                onClick: d
              },
              { default: C(() => [z(u.$slots, 'default')]), _: 3 },
              8,
              ['as', 'data-active', 'aria-current', 'as-child']
            )
          ]),
          _: 3
        })
      );
    }
  }),
  Yt = N({
    inheritAttrs: !1,
    __name: 'NavigationMenuList',
    props: { asChild: { type: Boolean }, as: { default: 'ul' } },
    setup(l) {
      const a = l,
        e = Q(),
        { forwardRef: r, currentElement: o } = H();
      return (
        ve(() => {
          e.onIndicatorTrackChange(o.value);
        }),
        (d, u) => (
          b(),
          E(
            t(P),
            { ref: t(r), style: { position: 'relative' } },
            {
              default: C(() => [
                $(
                  t(P),
                  B(d.$attrs, {
                    'as-child': a.asChild,
                    as: d.as,
                    'data-orientation': t(e).orientation
                  }),
                  { default: C(() => [z(d.$slots, 'default')]), _: 3 },
                  16,
                  ['as-child', 'as', 'data-orientation']
                )
              ]),
              _: 3
            },
            512
          )
        )
      );
    }
  }),
  Jt = ['aria-owns'],
  Zt = N({
    inheritAttrs: !1,
    __name: 'NavigationMenuTrigger',
    props: {
      disabled: { type: Boolean },
      asChild: { type: Boolean },
      as: { default: 'button' }
    },
    setup(l) {
      const a = l,
        e = Q(),
        r = $e(),
        { CollectionItem: o } = oe({ key: 'NavigationMenu' }),
        { forwardRef: d, currentElement: u } = H(),
        s = R(''),
        f = R(''),
        c = We(!1, 300),
        p = R(!1),
        n = A(() => r.value === e.modelValue.value);
      ve(() => {
        (r.triggerRef = u),
          (s.value = Ye(e.baseId, r.value)),
          (f.value = Le(e.baseId, r.value));
      });
      function x() {
        e.disableHoverTrigger.value ||
          ((p.value = !1), (r.wasEscapeCloseRef.value = !1));
      }
      function L(v) {
        if (!e.disableHoverTrigger.value && v.pointerType === 'mouse') {
          if (a.disabled || p.value || r.wasEscapeCloseRef.value || c.value)
            return;
          e.onTriggerEnter(r.value), (c.value = !0);
        }
      }
      function i(v) {
        if (!e.disableHoverTrigger.value && v.pointerType === 'mouse') {
          if (a.disabled) return;
          e.onTriggerLeave(), (c.value = !1);
        }
      }
      function m(v) {
        (v.pointerType === 'mouse' && e.disableClickTrigger.value) ||
          c.value ||
          (n.value ? e.onItemSelect('') : e.onItemSelect(r.value),
          (p.value = n.value));
      }
      function k(v) {
        const h = {
          horizontal: 'ArrowDown',
          vertical: e.dir.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
        }[e.orientation];
        n.value &&
          v.key === h &&
          (r.onEntryKeyDown(), v.preventDefault(), v.stopPropagation());
      }
      function w(v) {
        r.focusProxyRef.value = ut(v);
      }
      function g(v) {
        const y = document.getElementById(r.contentId),
          h = v.relatedTarget,
          I = h === u.value,
          _ = y == null ? void 0 : y.contains(h);
        (I || !_) && r.onFocusProxyEnter(I ? 'start' : 'end');
      }
      return (v, y) => (
        b(),
        D(
          j,
          null,
          [
            $(t(o), null, {
              default: C(() => [
                $(
                  t(P),
                  B(
                    {
                      id: s.value,
                      ref: t(d),
                      disabled: v.disabled,
                      'data-disabled': v.disabled ? '' : void 0,
                      'data-state': t(pe)(n.value),
                      'data-navigation-menu-trigger': '',
                      'aria-expanded': n.value,
                      'aria-controls': f.value,
                      'as-child': a.asChild,
                      as: v.as
                    },
                    v.$attrs,
                    {
                      onPointerenter: x,
                      onPointermove: L,
                      onPointerleave: i,
                      onClick: m,
                      onKeydown: k
                    }
                  ),
                  { default: C(() => [z(v.$slots, 'default')]), _: 3 },
                  16,
                  [
                    'id',
                    'disabled',
                    'data-disabled',
                    'data-state',
                    'aria-expanded',
                    'aria-controls',
                    'as-child',
                    'as'
                  ]
                )
              ]),
              _: 3
            }),
            n.value
              ? (b(),
                D(
                  j,
                  { key: 0 },
                  [
                    $(t(rt), {
                      ref: w,
                      'aria-hidden': 'true',
                      tabindex: 0,
                      onFocus: g
                    }),
                    t(e).viewport
                      ? (b(),
                        D(
                          'span',
                          { key: 0, 'aria-owns': f.value },
                          null,
                          8,
                          Jt
                        ))
                      : M('', !0)
                  ],
                  64
                ))
              : M('', !0)
          ],
          64
        )
      );
    }
  }),
  ea = N({
    inheritAttrs: !1,
    __name: 'NavigationMenuViewport',
    props: {
      forceMount: { type: Boolean },
      align: { default: 'center' },
      asChild: { type: Boolean },
      as: {}
    },
    setup(l) {
      var L;
      const a = l,
        { forwardRef: e, currentElement: r } = H(),
        o = Q(),
        { activeTrigger: d, rootNavigationMenu: u, modelValue: s } = o,
        f = R(),
        c = R(),
        p = A(() => !!o.modelValue.value);
      me(r, () => {
        r.value && o.onViewportChange(r.value);
      });
      const n = R();
      me(
        [s, p],
        () => {
          r.value &&
            requestAnimationFrame(() => {
              var m, k, w;
              const i =
                (w =
                  (k =
                    (m = r.value) == null
                      ? void 0
                      : m.querySelector('[data-state=open]')) == null
                    ? void 0
                    : k.children) == null
                  ? void 0
                  : w[0];
              n.value = i;
            });
        },
        { immediate: !0, flush: 'post' }
      );
      function x() {
        if (n.value && d.value && u.value) {
          const i = document.documentElement.offsetWidth,
            m = document.documentElement.offsetHeight,
            k = u.value.getBoundingClientRect(),
            w = d.value.getBoundingClientRect(),
            { offsetWidth: g, offsetHeight: v } = n.value,
            y = w.left - k.left,
            h = w.top - k.top;
          let I = null,
            _ = null;
          switch (a.align) {
            case 'start':
              (I = y), (_ = h);
              break;
            case 'end':
              (I = y - g + w.width), (_ = h - v + w.height);
              break;
            default:
              (I = y - g / 2 + w.width / 2), (_ = h - v / 2 + w.height / 2);
          }
          const O = 10;
          I + k.left < O && (I = O - k.left);
          const K = I + k.left + g;
          K > i - O && ((I -= K - i + O), I < O - k.left && (I = O - k.left)),
            _ + k.top < O && (_ = O - k.top);
          const U = _ + k.top + v;
          U > m - O && ((_ -= U - m + O), _ < O - k.top && (_ = O - k.top)),
            (I = Math.round(I)),
            (_ = Math.round(_)),
            (c.value = { left: I, top: _ });
        }
      }
      return (
        de(n, () => {
          n.value &&
            ((f.value = {
              width: n.value.offsetWidth,
              height: n.value.offsetHeight
            }),
            x());
        }),
        de([(L = globalThis.document) == null ? void 0 : L.body, u], () => {
          x();
        }),
        (i, m) => (
          b(),
          E(
            t(fe),
            {
              present: i.forceMount || p.value,
              'force-mount': !t(o).unmountOnHide.value,
              onAfterLeave:
                m[2] ||
                (m[2] = () => {
                  (f.value = void 0), (c.value = void 0);
                })
            },
            {
              default: C(({ present: k }) => {
                var w, g, v, y;
                return [
                  $(
                    t(P),
                    B(i.$attrs, {
                      ref: t(e),
                      as: i.as,
                      'as-child': i.asChild,
                      'data-state': t(pe)(p.value),
                      'data-orientation': t(o).orientation,
                      style: {
                        pointerEvents:
                          !p.value && t(o).isRootMenu ? 'none' : void 0,
                        '--reka-navigation-menu-viewport-width': f.value
                          ? `${(w = f.value) == null ? void 0 : w.width}px`
                          : void 0,
                        '--reka-navigation-menu-viewport-height': f.value
                          ? `${(g = f.value) == null ? void 0 : g.height}px`
                          : void 0,
                        '--reka-navigation-menu-viewport-left': c.value
                          ? `${(v = c.value) == null ? void 0 : v.left}px`
                          : void 0,
                        '--reka-navigation-menu-viewport-top': c.value
                          ? `${(y = c.value) == null ? void 0 : y.top}px`
                          : void 0
                      },
                      hidden: !k,
                      onPointerenter:
                        m[0] ||
                        (m[0] = (h) =>
                          t(o).onContentEnter(t(o).modelValue.value)),
                      onPointerleave:
                        m[1] ||
                        (m[1] = (h) => t(Ze)(() => t(o).onContentLeave())(h))
                    }),
                    { default: C(() => [z(i.$slots, 'default')]), _: 2 },
                    1040,
                    [
                      'as',
                      'as-child',
                      'data-state',
                      'data-orientation',
                      'style',
                      'hidden'
                    ]
                  )
                ];
              }),
              _: 3
            },
            8,
            ['present', 'force-mount']
          )
        )
      );
    }
  }),
  ta = {
    slots: {
      base: 'rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center',
      label: 'truncate',
      leadingIcon: 'shrink-0',
      leadingAvatar: 'shrink-0',
      leadingAvatarSize: '',
      trailingIcon: 'shrink-0'
    },
    variants: {
      color: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
        neutral: ''
      },
      variant: { solid: '', outline: '', soft: '', subtle: '' },
      size: {
        sm: {
          base: 'text-xs px-1.5 py-0.5 gap-1',
          leadingIcon: 'size-4',
          leadingAvatarSize: '3xs',
          trailingIcon: 'size-4'
        },
        md: {
          base: 'text-xs px-2 py-1 gap-1',
          leadingIcon: 'size-4',
          leadingAvatarSize: '3xs',
          trailingIcon: 'size-4'
        },
        lg: {
          base: 'text-sm px-2 py-1 gap-1.5',
          leadingIcon: 'size-5',
          leadingAvatarSize: '2xs',
          trailingIcon: 'size-5'
        }
      }
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'solid',
        class: 'bg-[var(--ui-primary)] text-[var(--ui-bg)]'
      },
      {
        color: 'secondary',
        variant: 'solid',
        class: 'bg-[var(--ui-secondary)] text-[var(--ui-bg)]'
      },
      {
        color: 'success',
        variant: 'solid',
        class: 'bg-[var(--ui-success)] text-[var(--ui-bg)]'
      },
      {
        color: 'info',
        variant: 'solid',
        class: 'bg-[var(--ui-info)] text-[var(--ui-bg)]'
      },
      {
        color: 'warning',
        variant: 'solid',
        class: 'bg-[var(--ui-warning)] text-[var(--ui-bg)]'
      },
      {
        color: 'error',
        variant: 'solid',
        class: 'bg-[var(--ui-error)] text-[var(--ui-bg)]'
      },
      {
        color: 'primary',
        variant: 'outline',
        class:
          'text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/50'
      },
      {
        color: 'secondary',
        variant: 'outline',
        class:
          'text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/50'
      },
      {
        color: 'success',
        variant: 'outline',
        class:
          'text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/50'
      },
      {
        color: 'info',
        variant: 'outline',
        class: 'text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/50'
      },
      {
        color: 'warning',
        variant: 'outline',
        class:
          'text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/50'
      },
      {
        color: 'error',
        variant: 'outline',
        class:
          'text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/50'
      },
      {
        color: 'primary',
        variant: 'soft',
        class: 'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]'
      },
      {
        color: 'secondary',
        variant: 'soft',
        class: 'bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)]'
      },
      {
        color: 'success',
        variant: 'soft',
        class: 'bg-[var(--ui-success)]/10 text-[var(--ui-success)]'
      },
      {
        color: 'info',
        variant: 'soft',
        class: 'bg-[var(--ui-info)]/10 text-[var(--ui-info)]'
      },
      {
        color: 'warning',
        variant: 'soft',
        class: 'bg-[var(--ui-warning)]/10 text-[var(--ui-warning)]'
      },
      {
        color: 'error',
        variant: 'soft',
        class: 'bg-[var(--ui-error)]/10 text-[var(--ui-error)]'
      },
      {
        color: 'primary',
        variant: 'subtle',
        class:
          'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25'
      },
      {
        color: 'secondary',
        variant: 'subtle',
        class:
          'bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25'
      },
      {
        color: 'success',
        variant: 'subtle',
        class:
          'bg-[var(--ui-success)]/10 text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25'
      },
      {
        color: 'info',
        variant: 'subtle',
        class:
          'bg-[var(--ui-info)]/10 text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25'
      },
      {
        color: 'warning',
        variant: 'subtle',
        class:
          'bg-[var(--ui-warning)]/10 text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25'
      },
      {
        color: 'error',
        variant: 'subtle',
        class:
          'bg-[var(--ui-error)]/10 text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25'
      },
      {
        color: 'neutral',
        variant: 'solid',
        class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
      },
      {
        color: 'neutral',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
      },
      {
        color: 'neutral',
        variant: 'soft',
        class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
      },
      {
        color: 'neutral',
        variant: 'subtle',
        class:
          'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
      }
    ],
    defaultVariants: { color: 'primary', variant: 'solid', size: 'md' }
  },
  aa = ge;
var Ae;
const na = X({
    extend: X(ta),
    ...(((Ae = aa.ui) == null ? void 0 : Ae.badge) || {})
  }),
  ia = N({
    __name: 'Badge',
    props: {
      as: { default: 'span' },
      label: {},
      color: {},
      variant: {},
      size: {},
      class: {},
      ui: {},
      icon: {},
      avatar: {},
      leading: { type: Boolean },
      leadingIcon: {},
      trailing: { type: Boolean },
      trailingIcon: {}
    },
    setup(l) {
      const a = l,
        {
          isLeading: e,
          isTrailing: r,
          leadingIconName: o,
          trailingIconName: d
        } = ct(a),
        u = A(() => na({ color: a.color, variant: a.variant, size: a.size }));
      return (s, f) => {
        var p;
        const c = we;
        return (
          b(),
          E(
            t(P),
            {
              as: s.as,
              class: T(
                u.value.base({
                  class: [a.class, (p = a.ui) == null ? void 0 : p.base]
                })
              )
            },
            {
              default: C(() => [
                z(s.$slots, 'leading', {}, () => {
                  var n, x, L;
                  return [
                    t(e) && t(o)
                      ? (b(),
                        E(
                          W,
                          {
                            key: 0,
                            name: t(o),
                            class: T(
                              u.value.leadingIcon({
                                class:
                                  (n = a.ui) == null ? void 0 : n.leadingIcon
                              })
                            )
                          },
                          null,
                          8,
                          ['name', 'class']
                        ))
                      : s.avatar
                        ? (b(),
                          E(
                            c,
                            B(
                              {
                                key: 1,
                                size:
                                  ((x = a.ui) == null
                                    ? void 0
                                    : x.leadingAvatarSize) ||
                                  u.value.leadingAvatarSize()
                              },
                              s.avatar,
                              {
                                class: u.value.leadingAvatar({
                                  class:
                                    (L = a.ui) == null
                                      ? void 0
                                      : L.leadingAvatar
                                })
                              }
                            ),
                            null,
                            16,
                            ['size', 'class']
                          ))
                        : M('', !0)
                  ];
                }),
                z(s.$slots, 'default', {}, () => {
                  var n;
                  return [
                    s.label
                      ? (b(),
                        D(
                          'span',
                          {
                            key: 0,
                            class: T(
                              u.value.label({
                                class: (n = a.ui) == null ? void 0 : n.label
                              })
                            )
                          },
                          ne(s.label),
                          3
                        ))
                      : M('', !0)
                  ];
                }),
                z(s.$slots, 'trailing', {}, () => {
                  var n;
                  return [
                    t(r) && t(d)
                      ? (b(),
                        E(
                          W,
                          {
                            key: 0,
                            name: t(d),
                            class: T(
                              u.value.trailingIcon({
                                class:
                                  (n = a.ui) == null ? void 0 : n.trailingIcon
                              })
                            )
                          },
                          null,
                          8,
                          ['name', 'class']
                        ))
                      : M('', !0)
                  ];
                })
              ]),
              _: 3
            },
            8,
            ['as', 'class']
          )
        );
      };
    }
  }),
  oa = {
    slots: {
      root: '',
      content:
        'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden'
    }
  },
  sa = ge;
var Pe;
const la = X({
    extend: X(oa),
    ...(((Pe = sa.ui) == null ? void 0 : Pe.collapsible) || {})
  }),
  ra = N({
    __name: 'Collapsible',
    props: {
      as: {},
      class: {},
      ui: {},
      defaultOpen: { type: Boolean },
      open: { type: Boolean },
      disabled: { type: Boolean },
      unmountOnHide: { type: Boolean }
    },
    emits: ['update:open'],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        o = Ce(),
        d = xe(
          dt(e, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'),
          r
        ),
        u = la();
      return (s, f) => {
        var c;
        return (
          b(),
          E(
            t(Nt),
            B(t(d), {
              class: t(u).root({
                class: [e.class, (c = e.ui) == null ? void 0 : c.root]
              })
            }),
            {
              default: C(({ open: p }) => {
                var n;
                return [
                  o.default
                    ? (b(),
                      E(
                        t(Ft),
                        { key: 0, 'as-child': '' },
                        {
                          default: C(() => [
                            z(s.$slots, 'default', { open: p })
                          ]),
                          _: 2
                        },
                        1024
                      ))
                    : M('', !0),
                  $(
                    t(Vt),
                    {
                      class: T(
                        t(u).content({
                          class: (n = e.ui) == null ? void 0 : n.content
                        })
                      )
                    },
                    { default: C(() => [z(s.$slots, 'content')]), _: 3 },
                    8,
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
  ua = {
    slots: {
      root: 'relative flex gap-1.5 [&>div]:min-w-0',
      list: 'isolate min-w-0',
      item: 'min-w-0',
      link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
      linkLeadingIcon: 'shrink-0 size-5',
      linkLeadingAvatar: 'shrink-0',
      linkLeadingAvatarSize: '2xs',
      linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
      linkTrailingBadge: 'shrink-0 rounded-[var(--ui-radius)]',
      linkTrailingBadgeSize: 'sm',
      linkTrailingIcon:
        'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
      linkLabel: 'truncate',
      linkLabelExternalIcon:
        'inline-block size-3 align-top text-[var(--ui-text-dimmed)]',
      childList: '',
      childItem: '',
      childLink:
        'group size-full px-3 py-2 rounded-[calc(var(--ui-radius)*1.5)] flex items-start gap-2 text-start',
      childLinkWrapper: 'flex flex-col items-start',
      childLinkIcon: 'size-5 shrink-0',
      childLinkLabel: 'font-semibold text-sm relative inline-flex',
      childLinkLabelExternalIcon:
        'inline-block size-3 align-top text-[var(--ui-text-dimmed)]',
      childLinkDescription: 'text-sm text-[var(--ui-text-muted)]',
      separator: 'px-2 h-px bg-[var(--ui-border)]',
      viewportWrapper: 'absolute top-full left-0 flex w-full justify-center',
      viewport:
        'relative overflow-hidden bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-[var(--ui-border)] h-[var(--reka-navigation-menu-viewport-height)] w-full transition-[width,height] origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      content:
        'absolute top-0 left-0 w-full data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
      indicator:
        'data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] bottom-0 z-[1] flex h-2.5 items-end justify-center overflow-hidden transition-transform duration-200 ease-out',
      arrow:
        'relative top-[50%] size-2.5 rotate-45 border border-[var(--ui-border)] bg-[var(--ui-bg)] z-[1] rounded-[calc(var(--ui-radius)/2)]'
    },
    variants: {
      color: {
        primary: {
          link: 'focus-visible:before:ring-[var(--ui-primary)]',
          childLink: 'focus-visible:outline-[var(--ui-primary)]'
        },
        secondary: {
          link: 'focus-visible:before:ring-[var(--ui-secondary)]',
          childLink: 'focus-visible:outline-[var(--ui-secondary)]'
        },
        success: {
          link: 'focus-visible:before:ring-[var(--ui-success)]',
          childLink: 'focus-visible:outline-[var(--ui-success)]'
        },
        info: {
          link: 'focus-visible:before:ring-[var(--ui-info)]',
          childLink: 'focus-visible:outline-[var(--ui-info)]'
        },
        warning: {
          link: 'focus-visible:before:ring-[var(--ui-warning)]',
          childLink: 'focus-visible:outline-[var(--ui-warning)]'
        },
        error: {
          link: 'focus-visible:before:ring-[var(--ui-error)]',
          childLink: 'focus-visible:outline-[var(--ui-error)]'
        },
        neutral: {
          link: 'focus-visible:before:ring-[var(--ui-border-inverted)]',
          childLink: 'focus-visible:outline-[var(--ui-border-inverted)]'
        }
      },
      highlightColor: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
        neutral: ''
      },
      variant: { pill: '', link: '' },
      orientation: {
        horizontal: {
          root: 'w-full items-center justify-between',
          list: 'flex items-center',
          item: 'py-2',
          link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
          childList: 'grid grid-cols-2 gap-2 p-2'
        },
        vertical: {
          root: 'flex-col',
          link: 'flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0',
          childList: 'ms-5 border-s border-[var(--ui-border)]',
          childItem: 'ps-1.5 -ms-px'
        }
      },
      active: {
        true: {
          childLink:
            'bg-[var(--ui-bg-elevated)] text-[var(--ui-text-highlighted)]',
          childLinkIcon: 'text-[var(--ui-text)]'
        },
        false: {
          link: 'text-[var(--ui-text-muted)]',
          linkLeadingIcon: 'text-[var(--ui-text-dimmed)]',
          childLink: [
            'hover:bg-[var(--ui-bg-elevated)]/50 text-[var(--ui-text)] hover:text-[var(--ui-text-highlighted)]',
            'transition-colors'
          ],
          childLinkIcon: [
            'text-[var(--ui-text-dimmed)] group-hover:text-[var(--ui-text)]',
            'transition-colors'
          ]
        }
      },
      disabled: { true: { link: 'cursor-not-allowed opacity-75' } },
      highlight: { true: '' }
    },
    compoundVariants: [
      {
        highlight: !0,
        orientation: 'horizontal',
        class: {
          item: '-mb-px',
          link: 'after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full'
        }
      },
      {
        highlight: !0,
        orientation: 'vertical',
        class: {
          item: 'px-1.5 -ms-px',
          link: 'after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full'
        }
      },
      {
        disabled: !1,
        active: !1,
        variant: 'pill',
        class: {
          link: [
            'hover:text-[var(--ui-text-highlighted)] hover:before:bg-[var(--ui-bg-elevated)]/50 data-[state=open]:text-[var(--ui-text-highlighted)]',
            'transition-colors before:transition-colors'
          ],
          linkLeadingIcon: [
            'group-hover:text-[var(--ui-text)] group-data-[state=open]:text-[var(--ui-text)]',
            'transition-colors'
          ]
        }
      },
      {
        disabled: !1,
        variant: 'pill',
        highlight: !0,
        orientation: 'horizontal',
        class: {
          link: 'data-[state=open]:before:bg-[var(--ui-bg-elevated)]/50'
        }
      },
      {
        disabled: !1,
        variant: 'pill',
        highlight: !1,
        active: !1,
        orientation: 'horizontal',
        class: {
          link: 'data-[state=open]:before:bg-[var(--ui-bg-elevated)]/50'
        }
      },
      {
        color: 'primary',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-primary)]',
          linkLeadingIcon: 'text-[var(--ui-primary)]'
        }
      },
      {
        color: 'secondary',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-secondary)]',
          linkLeadingIcon: 'text-[var(--ui-secondary)]'
        }
      },
      {
        color: 'success',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-success)]',
          linkLeadingIcon: 'text-[var(--ui-success)]'
        }
      },
      {
        color: 'info',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-info)]',
          linkLeadingIcon: 'text-[var(--ui-info)]'
        }
      },
      {
        color: 'warning',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-warning)]',
          linkLeadingIcon: 'text-[var(--ui-warning)]'
        }
      },
      {
        color: 'error',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-error)]',
          linkLeadingIcon: 'text-[var(--ui-error)]'
        }
      },
      {
        color: 'neutral',
        variant: 'pill',
        active: !0,
        class: {
          link: 'text-[var(--ui-text-highlighted)]',
          linkLeadingIcon: 'text-[var(--ui-text-highlighted)]'
        }
      },
      {
        variant: 'pill',
        active: !0,
        highlight: !1,
        class: { link: 'before:bg-[var(--ui-bg-elevated)]' }
      },
      {
        variant: 'pill',
        active: !0,
        highlight: !0,
        class: {
          link: [
            'hover:before:bg-[var(--ui-bg-elevated)]/50',
            'before:transition-colors'
          ]
        }
      },
      {
        disabled: !1,
        active: !1,
        variant: 'link',
        class: {
          link: [
            'hover:text-[var(--ui-text-highlighted)] data-[state=open]:text-[var(--ui-text-highlighted)]',
            'transition-colors'
          ],
          linkLeadingIcon: [
            'group-hover:text-[var(--ui-text)] group-data-[state=open]:text-[var(--ui-text)]',
            'transition-colors'
          ]
        }
      },
      {
        color: 'primary',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-primary)]',
          linkLeadingIcon: 'text-[var(--ui-primary)]'
        }
      },
      {
        color: 'secondary',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-secondary)]',
          linkLeadingIcon: 'text-[var(--ui-secondary)]'
        }
      },
      {
        color: 'success',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-success)]',
          linkLeadingIcon: 'text-[var(--ui-success)]'
        }
      },
      {
        color: 'info',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-info)]',
          linkLeadingIcon: 'text-[var(--ui-info)]'
        }
      },
      {
        color: 'warning',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-warning)]',
          linkLeadingIcon: 'text-[var(--ui-warning)]'
        }
      },
      {
        color: 'error',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-error)]',
          linkLeadingIcon: 'text-[var(--ui-error)]'
        }
      },
      {
        color: 'neutral',
        variant: 'link',
        active: !0,
        class: {
          link: 'text-[var(--ui-text-highlighted)]',
          linkLeadingIcon: 'text-[var(--ui-text-highlighted)]'
        }
      },
      {
        highlightColor: 'primary',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-primary)]' }
      },
      {
        highlightColor: 'secondary',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-secondary)]' }
      },
      {
        highlightColor: 'success',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-success)]' }
      },
      {
        highlightColor: 'info',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-info)]' }
      },
      {
        highlightColor: 'warning',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-warning)]' }
      },
      {
        highlightColor: 'error',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-error)]' }
      },
      {
        highlightColor: 'neutral',
        highlight: !0,
        active: !0,
        class: { link: 'after:bg-[var(--ui-bg-inverted)]' }
      }
    ],
    defaultVariants: {
      color: 'primary',
      highlightColor: 'primary',
      variant: 'pill'
    }
  },
  ce = ge;
var Ve;
const ca = X({
    extend: X(ua),
    ...(((Ve = ce.ui) == null ? void 0 : Ve.navigationMenu) || {})
  }),
  da = N({
    __name: 'NavigationMenu',
    props: {
      as: {},
      trailingIcon: {},
      items: {},
      color: {},
      variant: {},
      orientation: { default: 'horizontal' },
      highlight: { type: Boolean },
      highlightColor: {},
      content: {},
      arrow: { type: Boolean },
      labelKey: { default: 'label' },
      class: {},
      ui: {},
      modelValue: {},
      defaultValue: {},
      delayDuration: { default: 0 },
      disableClickTrigger: { type: Boolean },
      disableHoverTrigger: { type: Boolean },
      skipDelayDuration: {},
      disablePointerLeaveClose: { type: Boolean },
      unmountOnHide: { type: Boolean, default: !0 }
    },
    emits: ['update:modelValue'],
    setup(l, { emit: a }) {
      const e = l,
        r = a,
        o = Ce(),
        d = xe(
          A(() => ({
            as: e.as,
            modelValue: e.modelValue,
            defaultValue: e.defaultValue,
            delayDuration: e.delayDuration,
            skipDelayDuration: e.skipDelayDuration,
            orientation: e.orientation,
            disableClickTrigger: e.disableClickTrigger,
            disableHoverTrigger: e.disableHoverTrigger,
            disablePointerLeaveClose: e.disablePointerLeaveClose,
            unmountOnHide: e.unmountOnHide
          })),
          r
        ),
        u = vt(() => e.content),
        [s, f] = ft(),
        c = A(() =>
          ca({
            orientation: e.orientation,
            color: e.color,
            variant: e.variant,
            highlight: e.highlight,
            highlightColor: e.highlightColor || e.color
          })
        ),
        p = A(() => {
          var n;
          return (n = e.items) != null && n.length
            ? Array.isArray(e.items[0])
              ? e.items
              : [e.items]
            : [];
        });
      return (n, x) => {
        var L;
        return (
          b(),
          D(
            j,
            null,
            [
              $(t(s), null, {
                default: C(({ item: i, active: m, index: k }) => [
                  z(n.$slots, i.slot || 'item', { item: i, index: k }, () => {
                    var w, g, v, y, h;
                    return [
                      z(
                        n.$slots,
                        i.slot ? `${i.slot}-leading` : 'item-leading',
                        { item: i, active: m, index: k },
                        () => {
                          var I, _, O;
                          return [
                            i.avatar
                              ? (b(),
                                E(
                                  we,
                                  B(
                                    {
                                      key: 0,
                                      size:
                                        ((I = e.ui) == null
                                          ? void 0
                                          : I.linkLeadingAvatarSize) ||
                                        c.value.linkLeadingAvatarSize()
                                    },
                                    i.avatar,
                                    {
                                      class: c.value.linkLeadingAvatar({
                                        class:
                                          (_ = e.ui) == null
                                            ? void 0
                                            : _.linkLeadingAvatar,
                                        active: m,
                                        disabled: !!i.disabled
                                      })
                                    }
                                  ),
                                  null,
                                  16,
                                  ['size', 'class']
                                ))
                              : i.icon
                                ? (b(),
                                  E(
                                    W,
                                    {
                                      key: 1,
                                      name: i.icon,
                                      class: T(
                                        c.value.linkLeadingIcon({
                                          class:
                                            (O = e.ui) == null
                                              ? void 0
                                              : O.linkLeadingIcon,
                                          active: m,
                                          disabled: !!i.disabled
                                        })
                                      )
                                    },
                                    null,
                                    8,
                                    ['name', 'class']
                                  ))
                                : M('', !0)
                          ];
                        }
                      ),
                      t(ie)(i, e.labelKey) ||
                      o[i.slot ? `${i.slot}-label` : 'item-label']
                        ? (b(),
                          D(
                            'span',
                            {
                              key: 0,
                              class: T(
                                c.value.linkLabel({
                                  class:
                                    (w = e.ui) == null ? void 0 : w.linkLabel
                                })
                              )
                            },
                            [
                              z(
                                n.$slots,
                                i.slot ? `${i.slot}-label` : 'item-label',
                                { item: i, active: m, index: k },
                                () => [be(ne(t(ie)(i, e.labelKey)), 1)]
                              ),
                              i.target === '_blank'
                                ? (b(),
                                  E(
                                    W,
                                    {
                                      key: 0,
                                      name: t(ce).ui.icons.external,
                                      class: T(
                                        c.value.linkLabelExternalIcon({
                                          class:
                                            (g = e.ui) == null
                                              ? void 0
                                              : g.linkLabelExternalIcon,
                                          active: m
                                        })
                                      )
                                    },
                                    null,
                                    8,
                                    ['name', 'class']
                                  ))
                                : M('', !0)
                            ],
                            2
                          ))
                        : M('', !0),
                      i.badge ||
                      (n.orientation === 'horizontal' &&
                        (((v = i.children) != null && v.length) ||
                          o[i.slot ? `${i.slot}-content` : 'item-content'])) ||
                      (n.orientation === 'vertical' &&
                        (y = i.children) != null &&
                        y.length) ||
                      i.trailingIcon ||
                      o[i.slot ? `${i.slot}-trailing` : 'item-trailing']
                        ? (b(),
                          D(
                            'span',
                            {
                              key: 1,
                              class: T(
                                c.value.linkTrailing({
                                  class:
                                    (h = e.ui) == null ? void 0 : h.linkTrailing
                                })
                              )
                            },
                            [
                              z(
                                n.$slots,
                                i.slot ? `${i.slot}-trailing` : 'item-trailing',
                                { item: i, active: m, index: k },
                                () => {
                                  var I, _, O, K, U, V;
                                  return [
                                    i.badge
                                      ? (b(),
                                        E(
                                          ia,
                                          B(
                                            {
                                              key: 0,
                                              color: 'neutral',
                                              variant: 'outline',
                                              size:
                                                ((I = e.ui) == null
                                                  ? void 0
                                                  : I.linkTrailingBadgeSize) ||
                                                c.value.linkTrailingBadgeSize()
                                            },
                                            typeof i.badge == 'string' ||
                                              typeof i.badge == 'number'
                                              ? { label: i.badge }
                                              : i.badge,
                                            {
                                              class: c.value.linkTrailingBadge({
                                                class:
                                                  (_ = e.ui) == null
                                                    ? void 0
                                                    : _.linkTrailingBadge
                                              })
                                            }
                                          ),
                                          null,
                                          16,
                                          ['size', 'class']
                                        ))
                                      : M('', !0),
                                    (n.orientation === 'horizontal' &&
                                      (((O = i.children) != null && O.length) ||
                                        o[
                                          i.slot
                                            ? `${i.slot}-content`
                                            : 'item-content'
                                        ])) ||
                                    (n.orientation === 'vertical' &&
                                      (K = i.children) != null &&
                                      K.length)
                                      ? (b(),
                                        E(
                                          W,
                                          {
                                            key: 1,
                                            name:
                                              i.trailingIcon ||
                                              n.trailingIcon ||
                                              t(ce).ui.icons.chevronDown,
                                            class: T(
                                              c.value.linkTrailingIcon({
                                                class:
                                                  (U = e.ui) == null
                                                    ? void 0
                                                    : U.linkTrailingIcon,
                                                active: m
                                              })
                                            )
                                          },
                                          null,
                                          8,
                                          ['name', 'class']
                                        ))
                                      : i.trailingIcon
                                        ? (b(),
                                          E(
                                            W,
                                            {
                                              key: 2,
                                              name: i.trailingIcon,
                                              class: T(
                                                c.value.linkTrailingIcon({
                                                  class:
                                                    (V = e.ui) == null
                                                      ? void 0
                                                      : V.linkTrailingIcon,
                                                  active: m
                                                })
                                              )
                                            },
                                            null,
                                            8,
                                            ['name', 'class']
                                          ))
                                        : M('', !0)
                                  ];
                                }
                              )
                            ],
                            2
                          ))
                        : M('', !0)
                    ];
                  })
                ]),
                _: 3
              }),
              $(
                t(Kt),
                B(t(d), {
                  class: c.value.root({
                    class: [e.class, (L = e.ui) == null ? void 0 : L.root]
                  })
                }),
                {
                  default: C(() => {
                    var i, m, k;
                    return [
                      (b(!0),
                      D(
                        j,
                        null,
                        ae(p.value, (w, g) => {
                          var v, y;
                          return (
                            b(),
                            D(
                              j,
                              { key: `list-${g}` },
                              [
                                $(
                                  t(Yt),
                                  {
                                    class: T(
                                      c.value.list({
                                        class:
                                          (v = e.ui) == null ? void 0 : v.list
                                      })
                                    )
                                  },
                                  {
                                    default: C(() => [
                                      (b(!0),
                                      D(
                                        j,
                                        null,
                                        ae(w, (h, I) => {
                                          var _, O, K, U;
                                          return (
                                            b(),
                                            E(
                                              Ne(
                                                (_ = h.children) != null &&
                                                  _.length &&
                                                  n.orientation === 'vertical'
                                                  ? ra
                                                  : t(qt)
                                              ),
                                              {
                                                key: `list-${g}-${I}`,
                                                as: 'li',
                                                value: h.value || String(I),
                                                'default-open': h.defaultOpen,
                                                'unmount-on-hide':
                                                  (O = h.children) != null &&
                                                  O.length &&
                                                  n.orientation === 'vertical'
                                                    ? n.unmountOnHide
                                                    : void 0,
                                                open: h.open,
                                                class: T(
                                                  c.value.item({
                                                    class:
                                                      (K = e.ui) == null
                                                        ? void 0
                                                        : K.item
                                                  })
                                                )
                                              },
                                              gt(
                                                {
                                                  default: C(() => [
                                                    $(
                                                      se,
                                                      B(
                                                        { ref_for: !0 },
                                                        t(le)(h),
                                                        { custom: '' }
                                                      ),
                                                      {
                                                        default: C(
                                                          ({
                                                            active: V,
                                                            ...q
                                                          }) => {
                                                            var ee, te, Y;
                                                            return [
                                                              (b(),
                                                              E(
                                                                Ne(
                                                                  n.orientation ===
                                                                    'horizontal' &&
                                                                    (((ee =
                                                                      h.children) !=
                                                                      null &&
                                                                      ee.length) ||
                                                                      o[
                                                                        h.slot
                                                                          ? `${h.slot}-content`
                                                                          : 'item-content'
                                                                      ])
                                                                    ? t(Zt)
                                                                    : t(he)
                                                                ),
                                                                {
                                                                  'as-child':
                                                                    '',
                                                                  active: V,
                                                                  disabled:
                                                                    h.disabled,
                                                                  onSelect:
                                                                    h.onSelect
                                                                },
                                                                {
                                                                  default: C(
                                                                    () => {
                                                                      var G;
                                                                      return [
                                                                        $(
                                                                          re,
                                                                          B(
                                                                            {
                                                                              ref_for:
                                                                                !0
                                                                            },
                                                                            q,
                                                                            {
                                                                              class:
                                                                                c.value.link(
                                                                                  {
                                                                                    class:
                                                                                      [
                                                                                        (G =
                                                                                          e.ui) ==
                                                                                        null
                                                                                          ? void 0
                                                                                          : G.link,
                                                                                        h.class
                                                                                      ],
                                                                                    active:
                                                                                      V,
                                                                                    disabled:
                                                                                      !!h.disabled
                                                                                  }
                                                                                )
                                                                            }
                                                                          ),
                                                                          {
                                                                            default:
                                                                              C(
                                                                                () => [
                                                                                  $(
                                                                                    t(
                                                                                      f
                                                                                    ),
                                                                                    {
                                                                                      item: h,
                                                                                      active:
                                                                                        V,
                                                                                      index:
                                                                                        I
                                                                                    },
                                                                                    null,
                                                                                    8,
                                                                                    [
                                                                                      'item',
                                                                                      'active',
                                                                                      'index'
                                                                                    ]
                                                                                  )
                                                                                ]
                                                                              ),
                                                                            _: 2
                                                                          },
                                                                          1040,
                                                                          [
                                                                            'class'
                                                                          ]
                                                                        )
                                                                      ];
                                                                    }
                                                                  ),
                                                                  _: 2
                                                                },
                                                                1064,
                                                                [
                                                                  'active',
                                                                  'disabled',
                                                                  'onSelect'
                                                                ]
                                                              )),
                                                              n.orientation ===
                                                                'horizontal' &&
                                                              (((te =
                                                                h.children) !=
                                                                null &&
                                                                te.length) ||
                                                                o[
                                                                  h.slot
                                                                    ? `${h.slot}-content`
                                                                    : 'item-content'
                                                                ])
                                                                ? (b(),
                                                                  E(
                                                                    t(Gt),
                                                                    B(
                                                                      {
                                                                        key: 0,
                                                                        ref_for:
                                                                          !0
                                                                      },
                                                                      u.value,
                                                                      {
                                                                        class:
                                                                          c.value.content(
                                                                            {
                                                                              class:
                                                                                (Y =
                                                                                  e.ui) ==
                                                                                null
                                                                                  ? void 0
                                                                                  : Y.content
                                                                            }
                                                                          )
                                                                      }
                                                                    ),
                                                                    {
                                                                      default:
                                                                        C(
                                                                          () => [
                                                                            z(
                                                                              n.$slots,
                                                                              h.slot
                                                                                ? `${h.slot}-content`
                                                                                : 'item-content',
                                                                              {
                                                                                item: h,
                                                                                active:
                                                                                  V,
                                                                                index:
                                                                                  I
                                                                              },
                                                                              () => {
                                                                                var G;
                                                                                return [
                                                                                  S(
                                                                                    'ul',
                                                                                    {
                                                                                      class:
                                                                                        T(
                                                                                          c.value.childList(
                                                                                            {
                                                                                              class:
                                                                                                (G =
                                                                                                  e.ui) ==
                                                                                                null
                                                                                                  ? void 0
                                                                                                  : G.childList
                                                                                            }
                                                                                          )
                                                                                        )
                                                                                    },
                                                                                    [
                                                                                      (b(
                                                                                        !0
                                                                                      ),
                                                                                      D(
                                                                                        j,
                                                                                        null,
                                                                                        ae(
                                                                                          h.children,
                                                                                          (
                                                                                            F,
                                                                                            et
                                                                                          ) => {
                                                                                            var Te;
                                                                                            return (
                                                                                              b(),
                                                                                              D(
                                                                                                'li',
                                                                                                {
                                                                                                  key: et,
                                                                                                  class:
                                                                                                    T(
                                                                                                      c.value.childItem(
                                                                                                        {
                                                                                                          class:
                                                                                                            (Te =
                                                                                                              e.ui) ==
                                                                                                            null
                                                                                                              ? void 0
                                                                                                              : Te.childItem
                                                                                                        }
                                                                                                      )
                                                                                                    )
                                                                                                },
                                                                                                [
                                                                                                  $(
                                                                                                    se,
                                                                                                    B(
                                                                                                      {
                                                                                                        ref_for:
                                                                                                          !0
                                                                                                      },
                                                                                                      t(
                                                                                                        le
                                                                                                      )(
                                                                                                        F
                                                                                                      ),
                                                                                                      {
                                                                                                        custom:
                                                                                                          ''
                                                                                                      }
                                                                                                    ),
                                                                                                    {
                                                                                                      default:
                                                                                                        C(
                                                                                                          ({
                                                                                                            active:
                                                                                                              J,
                                                                                                            ...tt
                                                                                                          }) => [
                                                                                                            $(
                                                                                                              t(
                                                                                                                he
                                                                                                              ),
                                                                                                              {
                                                                                                                'as-child':
                                                                                                                  '',
                                                                                                                active:
                                                                                                                  J,
                                                                                                                onSelect:
                                                                                                                  F.onSelect
                                                                                                              },
                                                                                                              {
                                                                                                                default:
                                                                                                                  C(
                                                                                                                    () => {
                                                                                                                      var Ee;
                                                                                                                      return [
                                                                                                                        $(
                                                                                                                          re,
                                                                                                                          B(
                                                                                                                            {
                                                                                                                              ref_for:
                                                                                                                                !0
                                                                                                                            },
                                                                                                                            tt,
                                                                                                                            {
                                                                                                                              class:
                                                                                                                                c.value.childLink(
                                                                                                                                  {
                                                                                                                                    class:
                                                                                                                                      [
                                                                                                                                        (Ee =
                                                                                                                                          e.ui) ==
                                                                                                                                        null
                                                                                                                                          ? void 0
                                                                                                                                          : Ee.childLink,
                                                                                                                                        F.class
                                                                                                                                      ],
                                                                                                                                    active:
                                                                                                                                      J
                                                                                                                                  }
                                                                                                                                )
                                                                                                                            }
                                                                                                                          ),
                                                                                                                          {
                                                                                                                            default:
                                                                                                                              C(
                                                                                                                                () => {
                                                                                                                                  var Oe,
                                                                                                                                    ze,
                                                                                                                                    Me,
                                                                                                                                    De,
                                                                                                                                    Re;
                                                                                                                                  return [
                                                                                                                                    F.icon
                                                                                                                                      ? (b(),
                                                                                                                                        E(
                                                                                                                                          W,
                                                                                                                                          {
                                                                                                                                            key: 0,
                                                                                                                                            name: F.icon,
                                                                                                                                            class:
                                                                                                                                              T(
                                                                                                                                                c.value.childLinkIcon(
                                                                                                                                                  {
                                                                                                                                                    class:
                                                                                                                                                      (Oe =
                                                                                                                                                        e.ui) ==
                                                                                                                                                      null
                                                                                                                                                        ? void 0
                                                                                                                                                        : Oe.childLinkIcon,
                                                                                                                                                    active:
                                                                                                                                                      J
                                                                                                                                                  }
                                                                                                                                                )
                                                                                                                                              )
                                                                                                                                          },
                                                                                                                                          null,
                                                                                                                                          8,
                                                                                                                                          [
                                                                                                                                            'name',
                                                                                                                                            'class'
                                                                                                                                          ]
                                                                                                                                        ))
                                                                                                                                      : M(
                                                                                                                                          '',
                                                                                                                                          !0
                                                                                                                                        ),
                                                                                                                                    S(
                                                                                                                                      'div',
                                                                                                                                      {
                                                                                                                                        class:
                                                                                                                                          T(
                                                                                                                                            c.value.childLinkWrapper(
                                                                                                                                              {
                                                                                                                                                class:
                                                                                                                                                  (ze =
                                                                                                                                                    e.ui) ==
                                                                                                                                                  null
                                                                                                                                                    ? void 0
                                                                                                                                                    : ze.childLinkWrapper
                                                                                                                                              }
                                                                                                                                            )
                                                                                                                                          )
                                                                                                                                      },
                                                                                                                                      [
                                                                                                                                        S(
                                                                                                                                          'p',
                                                                                                                                          {
                                                                                                                                            class:
                                                                                                                                              T(
                                                                                                                                                c.value.childLinkLabel(
                                                                                                                                                  {
                                                                                                                                                    class:
                                                                                                                                                      (Me =
                                                                                                                                                        e.ui) ==
                                                                                                                                                      null
                                                                                                                                                        ? void 0
                                                                                                                                                        : Me.childLinkLabel,
                                                                                                                                                    active:
                                                                                                                                                      J
                                                                                                                                                  }
                                                                                                                                                )
                                                                                                                                              )
                                                                                                                                          },
                                                                                                                                          [
                                                                                                                                            be(
                                                                                                                                              ne(
                                                                                                                                                t(
                                                                                                                                                  ie
                                                                                                                                                )(
                                                                                                                                                  F,
                                                                                                                                                  e.labelKey
                                                                                                                                                )
                                                                                                                                              ) +
                                                                                                                                                ' ',
                                                                                                                                              1
                                                                                                                                            ),
                                                                                                                                            F.target ===
                                                                                                                                            '_blank'
                                                                                                                                              ? (b(),
                                                                                                                                                E(
                                                                                                                                                  W,
                                                                                                                                                  {
                                                                                                                                                    key: 0,
                                                                                                                                                    name: t(
                                                                                                                                                      ce
                                                                                                                                                    )
                                                                                                                                                      .ui
                                                                                                                                                      .icons
                                                                                                                                                      .external,
                                                                                                                                                    class:
                                                                                                                                                      T(
                                                                                                                                                        c.value.childLinkLabelExternalIcon(
                                                                                                                                                          {
                                                                                                                                                            class:
                                                                                                                                                              (De =
                                                                                                                                                                e.ui) ==
                                                                                                                                                              null
                                                                                                                                                                ? void 0
                                                                                                                                                                : De.childLinkLabelExternalIcon,
                                                                                                                                                            active:
                                                                                                                                                              J
                                                                                                                                                          }
                                                                                                                                                        )
                                                                                                                                                      )
                                                                                                                                                  },
                                                                                                                                                  null,
                                                                                                                                                  8,
                                                                                                                                                  [
                                                                                                                                                    'name',
                                                                                                                                                    'class'
                                                                                                                                                  ]
                                                                                                                                                ))
                                                                                                                                              : M(
                                                                                                                                                  '',
                                                                                                                                                  !0
                                                                                                                                                )
                                                                                                                                          ],
                                                                                                                                          2
                                                                                                                                        ),
                                                                                                                                        F.description
                                                                                                                                          ? (b(),
                                                                                                                                            D(
                                                                                                                                              'p',
                                                                                                                                              {
                                                                                                                                                key: 0,
                                                                                                                                                class:
                                                                                                                                                  T(
                                                                                                                                                    c.value.childLinkDescription(
                                                                                                                                                      {
                                                                                                                                                        class:
                                                                                                                                                          (Re =
                                                                                                                                                            e.ui) ==
                                                                                                                                                          null
                                                                                                                                                            ? void 0
                                                                                                                                                            : Re.childLinkDescription,
                                                                                                                                                        active:
                                                                                                                                                          J
                                                                                                                                                      }
                                                                                                                                                    )
                                                                                                                                                  )
                                                                                                                                              },
                                                                                                                                              ne(
                                                                                                                                                F.description
                                                                                                                                              ),
                                                                                                                                              3
                                                                                                                                            ))
                                                                                                                                          : M(
                                                                                                                                              '',
                                                                                                                                              !0
                                                                                                                                            )
                                                                                                                                      ],
                                                                                                                                      2
                                                                                                                                    )
                                                                                                                                  ];
                                                                                                                                }
                                                                                                                              ),
                                                                                                                            _: 2
                                                                                                                          },
                                                                                                                          1040,
                                                                                                                          [
                                                                                                                            'class'
                                                                                                                          ]
                                                                                                                        )
                                                                                                                      ];
                                                                                                                    }
                                                                                                                  ),
                                                                                                                _: 2
                                                                                                              },
                                                                                                              1032,
                                                                                                              [
                                                                                                                'active',
                                                                                                                'onSelect'
                                                                                                              ]
                                                                                                            )
                                                                                                          ]
                                                                                                        ),
                                                                                                      _: 2
                                                                                                    },
                                                                                                    1040
                                                                                                  )
                                                                                                ],
                                                                                                2
                                                                                              )
                                                                                            );
                                                                                          }
                                                                                        ),
                                                                                        128
                                                                                      ))
                                                                                    ],
                                                                                    2
                                                                                  )
                                                                                ];
                                                                              }
                                                                            )
                                                                          ]
                                                                        ),
                                                                      _: 2
                                                                    },
                                                                    1040,
                                                                    ['class']
                                                                  ))
                                                                : M('', !0)
                                                            ];
                                                          }
                                                        ),
                                                        _: 2
                                                      },
                                                      1040
                                                    )
                                                  ]),
                                                  _: 2
                                                },
                                                [
                                                  n.orientation ===
                                                    'vertical' &&
                                                  (U = h.children) != null &&
                                                  U.length
                                                    ? {
                                                        name: 'content',
                                                        fn: C(() => {
                                                          var V;
                                                          return [
                                                            S(
                                                              'ul',
                                                              {
                                                                class: T(
                                                                  c.value.childList(
                                                                    {
                                                                      class:
                                                                        (V =
                                                                          e.ui) ==
                                                                        null
                                                                          ? void 0
                                                                          : V.childList
                                                                    }
                                                                  )
                                                                )
                                                              },
                                                              [
                                                                (b(!0),
                                                                D(
                                                                  j,
                                                                  null,
                                                                  ae(
                                                                    h.children,
                                                                    (q, ee) => {
                                                                      var te;
                                                                      return (
                                                                        b(),
                                                                        D(
                                                                          'li',
                                                                          {
                                                                            key: ee,
                                                                            class:
                                                                              T(
                                                                                c.value.childItem(
                                                                                  {
                                                                                    class:
                                                                                      (te =
                                                                                        e.ui) ==
                                                                                      null
                                                                                        ? void 0
                                                                                        : te.childItem
                                                                                  }
                                                                                )
                                                                              )
                                                                          },
                                                                          [
                                                                            $(
                                                                              se,
                                                                              B(
                                                                                {
                                                                                  ref_for:
                                                                                    !0
                                                                                },
                                                                                t(
                                                                                  le
                                                                                )(
                                                                                  q
                                                                                ),
                                                                                {
                                                                                  custom:
                                                                                    ''
                                                                                }
                                                                              ),
                                                                              {
                                                                                default:
                                                                                  C(
                                                                                    ({
                                                                                      active:
                                                                                        Y,
                                                                                      ...G
                                                                                    }) => [
                                                                                      $(
                                                                                        t(
                                                                                          he
                                                                                        ),
                                                                                        {
                                                                                          'as-child':
                                                                                            '',
                                                                                          active:
                                                                                            Y,
                                                                                          onSelect:
                                                                                            q.onSelect
                                                                                        },
                                                                                        {
                                                                                          default:
                                                                                            C(
                                                                                              () => {
                                                                                                var F;
                                                                                                return [
                                                                                                  $(
                                                                                                    re,
                                                                                                    B(
                                                                                                      {
                                                                                                        ref_for:
                                                                                                          !0
                                                                                                      },
                                                                                                      G,
                                                                                                      {
                                                                                                        class:
                                                                                                          c.value.link(
                                                                                                            {
                                                                                                              class:
                                                                                                                [
                                                                                                                  (F =
                                                                                                                    e.ui) ==
                                                                                                                  null
                                                                                                                    ? void 0
                                                                                                                    : F.link,
                                                                                                                  q.class
                                                                                                                ],
                                                                                                              active:
                                                                                                                Y,
                                                                                                              disabled:
                                                                                                                !!q.disabled
                                                                                                            }
                                                                                                          )
                                                                                                      }
                                                                                                    ),
                                                                                                    {
                                                                                                      default:
                                                                                                        C(
                                                                                                          () => [
                                                                                                            $(
                                                                                                              t(
                                                                                                                f
                                                                                                              ),
                                                                                                              {
                                                                                                                item: q,
                                                                                                                active:
                                                                                                                  Y,
                                                                                                                index:
                                                                                                                  ee
                                                                                                              },
                                                                                                              null,
                                                                                                              8,
                                                                                                              [
                                                                                                                'item',
                                                                                                                'active',
                                                                                                                'index'
                                                                                                              ]
                                                                                                            )
                                                                                                          ]
                                                                                                        ),
                                                                                                      _: 2
                                                                                                    },
                                                                                                    1040,
                                                                                                    [
                                                                                                      'class'
                                                                                                    ]
                                                                                                  )
                                                                                                ];
                                                                                              }
                                                                                            ),
                                                                                          _: 2
                                                                                        },
                                                                                        1032,
                                                                                        [
                                                                                          'active',
                                                                                          'onSelect'
                                                                                        ]
                                                                                      )
                                                                                    ]
                                                                                  ),
                                                                                _: 2
                                                                              },
                                                                              1040
                                                                            )
                                                                          ],
                                                                          2
                                                                        )
                                                                      );
                                                                    }
                                                                  ),
                                                                  128
                                                                ))
                                                              ],
                                                              2
                                                            )
                                                          ];
                                                        }),
                                                        key: '0'
                                                      }
                                                    : void 0
                                                ]
                                              ),
                                              1032,
                                              [
                                                'value',
                                                'default-open',
                                                'unmount-on-hide',
                                                'open',
                                                'class'
                                              ]
                                            )
                                          );
                                        }),
                                        128
                                      ))
                                    ]),
                                    _: 2
                                  },
                                  1032,
                                  ['class']
                                ),
                                n.orientation === 'vertical' &&
                                g < p.value.length - 1
                                  ? (b(),
                                    D(
                                      'div',
                                      {
                                        key: 0,
                                        class: T(
                                          c.value.separator({
                                            class:
                                              (y = e.ui) == null
                                                ? void 0
                                                : y.separator
                                          })
                                        )
                                      },
                                      null,
                                      2
                                    ))
                                  : M('', !0)
                              ],
                              64
                            )
                          );
                        }),
                        128
                      )),
                      n.orientation === 'horizontal'
                        ? (b(),
                          D(
                            'div',
                            {
                              key: 0,
                              class: T(
                                c.value.viewportWrapper({
                                  class:
                                    (i = e.ui) == null
                                      ? void 0
                                      : i.viewportWrapper
                                })
                              )
                            },
                            [
                              n.arrow
                                ? (b(),
                                  E(
                                    t(Qt),
                                    {
                                      key: 0,
                                      class: T(
                                        c.value.indicator({
                                          class:
                                            (m = e.ui) == null
                                              ? void 0
                                              : m.indicator
                                        })
                                      )
                                    },
                                    {
                                      default: C(() => {
                                        var w;
                                        return [
                                          S(
                                            'div',
                                            {
                                              class: T(
                                                c.value.arrow({
                                                  class:
                                                    (w = e.ui) == null
                                                      ? void 0
                                                      : w.arrow
                                                })
                                              )
                                            },
                                            null,
                                            2
                                          )
                                        ];
                                      }),
                                      _: 1
                                    },
                                    8,
                                    ['class']
                                  ))
                                : M('', !0),
                              $(
                                t(ea),
                                {
                                  class: T(
                                    c.value.viewport({
                                      class:
                                        (k = e.ui) == null ? void 0 : k.viewport
                                    })
                                  )
                                },
                                null,
                                8,
                                ['class']
                              )
                            ],
                            2
                          ))
                        : M('', !0)
                    ];
                  }),
                  _: 3
                },
                16,
                ['class']
              )
            ],
            64
          )
        );
      };
    }
  }),
  va = Symbol.for('nuxt:client-only'),
  fa = N({
    name: 'ClientOnly',
    inheritAttrs: !1,
    props: ['fallback', 'placeholder', 'placeholderTag', 'fallbackTag'],
    setup(l, { slots: a, attrs: e }) {
      const r = R(!1);
      return (
        ve(() => {
          r.value = !0;
        }),
        pt(va, !0),
        (o) => {
          var f;
          if (r.value) return (f = a.default) == null ? void 0 : f.call(a);
          const d = a.fallback || a.placeholder;
          if (d) return d();
          const u = o.fallback || o.placeholder || '',
            s = o.fallbackTag || o.placeholderTag || 'span';
          return D(s, e, u);
        }
      );
    }
  }),
  ga = () => ht('color-mode').value,
  pa = N({
    __name: 'ColorModeButton',
    setup(l) {
      const a = ga(),
        e = A({
          get() {
            return a.value === 'dark';
          },
          set() {
            a.preference = a.value === 'dark' ? 'light' : 'dark';
          }
        });
      return (r, o) => {
        const d = mt,
          u = fa;
        return (
          b(),
          E(u, null, {
            fallback: C(
              () => o[1] || (o[1] = [S('div', { class: 'size-8' }, null, -1)])
            ),
            default: C(() => [
              $(
                d,
                {
                  icon: t(e) ? 'i-lucide-moon' : 'i-lucide-sun',
                  color: 'neutral',
                  variant: 'ghost',
                  'aria-label': 'Toggle color mode',
                  onClick: o[0] || (o[0] = (s) => (e.value = !t(e)))
                },
                null,
                8,
                ['icon']
              )
            ]),
            _: 1
          })
        );
      };
    }
  }),
  ha = { class: 'flex h-16 items-center justify-between' },
  ma = { class: 'flex-shrink-0' },
  ba = { class: 'hidden max-w-[700px] flex-1 justify-center lg:flex' },
  ka = { class: 'lg:hidden' },
  ya = ['aria-expanded'],
  _a = { class: 'hidden items-center lg:flex' },
  xa = { key: 0, class: 'lg:hidden' },
  wa = { class: 'space-y-1 px-2 pt-2 pb-3' },
  Ca = {
    __name: 'SHeader',
    setup(l) {
      const e = bt().public.headerNavItems,
        r = R(!1),
        o = () => {
          r.value = !r.value;
        };
      return (d, u) => {
        const s = Rt,
          f = kt,
          c = da,
          p = pa;
        return (
          b(),
          D('header', null, [
            S('div', null, [
              S('div', ha, [
                S('div', ma, [
                  $(
                    f,
                    { to: '/', 'aria-label': 'home' },
                    { default: C(() => [$(s)]), _: 1 }
                  )
                ]),
                S('div', ba, [
                  $(
                    c,
                    {
                      class: 'flex-1 justify-center lg:flex',
                      'aria-label': 'Main navigation',
                      orientation: 'horizontal',
                      highlight: '',
                      items: t(e)
                    },
                    null,
                    8,
                    ['items']
                  )
                ]),
                S('div', ka, [
                  S(
                    'button',
                    {
                      type: 'button',
                      class:
                        'rounded-md p-2 hover:text-[var(--ui-primary)] focus:ring-2 focus:ring-[var(--ui-primary)] focus:outline-none focus:ring-inset',
                      'aria-expanded': t(r),
                      onClick: o
                    },
                    u[0] ||
                      (u[0] = [
                        S('span', { class: 'sr-only' }, 'Open main menu', -1),
                        S(
                          'svg',
                          {
                            class: 'h-6 w-6',
                            xmlns: 'http://www.w3.org/2000/svg',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            'aria-hidden': 'true'
                          },
                          [
                            S('path', {
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              'stroke-width': '2',
                              d: 'M4 6h16M4 12h16M4 18h16'
                            })
                          ],
                          -1
                        )
                      ]),
                    8,
                    ya
                  )
                ]),
                S('div', _a, [$(p)])
              ])
            ]),
            t(r)
              ? (b(),
                D('div', xa, [
                  S('div', wa, [
                    $(
                      c,
                      {
                        orientation: 'vertical',
                        highlight: '',
                        items: t(e),
                        class: 'w-full'
                      },
                      null,
                      8,
                      ['items']
                    )
                  ])
                ]))
              : M('', !0)
          ])
        );
      };
    }
  },
  Ia = {
    slots: {
      root: 'relative min-w-0',
      list: 'flex items-center gap-1.5',
      item: 'flex min-w-0',
      link: 'group relative flex items-center gap-1.5 text-sm min-w-0 focus-visible:outline-[var(--ui-primary)]',
      linkLeadingIcon: 'shrink-0 size-5',
      linkLeadingAvatar: 'shrink-0',
      linkLeadingAvatarSize: '2xs',
      linkLabel: 'truncate',
      separator: 'flex',
      separatorIcon: 'shrink-0 size-5 text-[var(--ui-text-muted)]'
    },
    variants: {
      active: {
        true: { link: 'text-[var(--ui-primary)] font-semibold' },
        false: { link: 'text-[var(--ui-text-muted)] font-medium' }
      },
      disabled: { true: { link: 'cursor-not-allowed opacity-75' } },
      to: { true: '' }
    },
    compoundVariants: [
      {
        disabled: !1,
        active: !1,
        to: !0,
        class: { link: ['hover:text-[var(--ui-text)]', 'transition-colors'] }
      }
    ]
  },
  La = ge;
var Fe;
const $a = X({
    extend: X(Ia),
    ...(((Fe = La.ui) == null ? void 0 : Fe.breadcrumb) || {})
  }),
  Ta = N({
    __name: 'Breadcrumb',
    props: {
      as: { default: 'nav' },
      items: {},
      separatorIcon: {},
      labelKey: { default: 'label' },
      class: {},
      ui: {}
    },
    setup(l) {
      const a = l,
        e = Ce(),
        { dir: r } = yt(),
        o = _t(),
        d = A(
          () =>
            a.separatorIcon ||
            (r.value === 'rtl'
              ? o.ui.icons.chevronLeft
              : o.ui.icons.chevronRight)
        ),
        u = $a();
      return (s, f) => {
        var c;
        return (
          b(),
          E(
            t(P),
            {
              as: s.as,
              'aria-label': 'breadcrumb',
              class: T(
                t(u).root({
                  class: [a.class, (c = a.ui) == null ? void 0 : c.root]
                })
              )
            },
            {
              default: C(() => {
                var p;
                return [
                  S(
                    'ol',
                    {
                      class: T(
                        t(u).list({
                          class: (p = a.ui) == null ? void 0 : p.list
                        })
                      )
                    },
                    [
                      (b(!0),
                      D(
                        j,
                        null,
                        ae(s.items, (n, x) => {
                          var L, i;
                          return (
                            b(),
                            D(
                              j,
                              { key: x },
                              [
                                S(
                                  'li',
                                  {
                                    class: T(
                                      t(u).item({
                                        class:
                                          (L = a.ui) == null ? void 0 : L.item
                                      })
                                    )
                                  },
                                  [
                                    $(
                                      se,
                                      B({ ref_for: !0 }, t(le)(n), {
                                        custom: ''
                                      }),
                                      {
                                        default: C(({ active: m, ...k }) => {
                                          var w;
                                          return [
                                            $(
                                              re,
                                              B({ ref_for: !0 }, k, {
                                                as: 'span',
                                                'aria-current':
                                                  m && x === s.items.length - 1
                                                    ? 'page'
                                                    : void 0,
                                                class: t(u).link({
                                                  class: [
                                                    (w = a.ui) == null
                                                      ? void 0
                                                      : w.link,
                                                    n.class
                                                  ],
                                                  active:
                                                    x === s.items.length - 1,
                                                  disabled: !!n.disabled,
                                                  to: !!n.to
                                                })
                                              }),
                                              {
                                                default: C(() => [
                                                  z(
                                                    s.$slots,
                                                    n.slot || 'item',
                                                    { item: n, index: x },
                                                    () => {
                                                      var g;
                                                      return [
                                                        z(
                                                          s.$slots,
                                                          n.slot
                                                            ? `${n.slot}-leading`
                                                            : 'item-leading',
                                                          {
                                                            item: n,
                                                            active:
                                                              x ===
                                                              s.items.length -
                                                                1,
                                                            index: x
                                                          },
                                                          () => {
                                                            var v, y, h;
                                                            return [
                                                              n.icon
                                                                ? (b(),
                                                                  E(
                                                                    W,
                                                                    {
                                                                      key: 0,
                                                                      name: n.icon,
                                                                      class: T(
                                                                        t(
                                                                          u
                                                                        ).linkLeadingIcon(
                                                                          {
                                                                            class:
                                                                              (v =
                                                                                a.ui) ==
                                                                              null
                                                                                ? void 0
                                                                                : v.linkLeadingIcon,
                                                                            active:
                                                                              x ===
                                                                              s
                                                                                .items
                                                                                .length -
                                                                                1
                                                                          }
                                                                        )
                                                                      )
                                                                    },
                                                                    null,
                                                                    8,
                                                                    [
                                                                      'name',
                                                                      'class'
                                                                    ]
                                                                  ))
                                                                : n.avatar
                                                                  ? (b(),
                                                                    E(
                                                                      we,
                                                                      B(
                                                                        {
                                                                          key: 1,
                                                                          size:
                                                                            ((y =
                                                                              a.ui) ==
                                                                            null
                                                                              ? void 0
                                                                              : y.linkLeadingAvatarSize) ||
                                                                            t(
                                                                              u
                                                                            ).linkLeadingAvatarSize(),
                                                                          ref_for:
                                                                            !0
                                                                        },
                                                                        n.avatar,
                                                                        {
                                                                          class:
                                                                            t(
                                                                              u
                                                                            ).linkLeadingAvatar(
                                                                              {
                                                                                class:
                                                                                  (h =
                                                                                    a.ui) ==
                                                                                  null
                                                                                    ? void 0
                                                                                    : h.linkLeadingAvatar,
                                                                                active:
                                                                                  x ===
                                                                                  s
                                                                                    .items
                                                                                    .length -
                                                                                    1
                                                                              }
                                                                            )
                                                                        }
                                                                      ),
                                                                      null,
                                                                      16,
                                                                      [
                                                                        'size',
                                                                        'class'
                                                                      ]
                                                                    ))
                                                                  : M('', !0)
                                                            ];
                                                          }
                                                        ),
                                                        t(ie)(n, a.labelKey) ||
                                                        e[
                                                          n.slot
                                                            ? `${n.slot}-label`
                                                            : 'item-label'
                                                        ]
                                                          ? (b(),
                                                            D(
                                                              'span',
                                                              {
                                                                key: 0,
                                                                class: T(
                                                                  t(
                                                                    u
                                                                  ).linkLabel({
                                                                    class:
                                                                      (g =
                                                                        a.ui) ==
                                                                      null
                                                                        ? void 0
                                                                        : g.linkLabel
                                                                  })
                                                                )
                                                              },
                                                              [
                                                                z(
                                                                  s.$slots,
                                                                  n.slot
                                                                    ? `${n.slot}-label`
                                                                    : 'item-label',
                                                                  {
                                                                    item: n,
                                                                    active:
                                                                      x ===
                                                                      s.items
                                                                        .length -
                                                                        1,
                                                                    index: x
                                                                  },
                                                                  () => [
                                                                    be(
                                                                      ne(
                                                                        t(ie)(
                                                                          n,
                                                                          a.labelKey
                                                                        )
                                                                      ),
                                                                      1
                                                                    )
                                                                  ]
                                                                )
                                                              ],
                                                              2
                                                            ))
                                                          : M('', !0),
                                                        z(
                                                          s.$slots,
                                                          n.slot
                                                            ? `${n.slot}-trailing`
                                                            : 'item-trailing',
                                                          {
                                                            item: n,
                                                            active:
                                                              x ===
                                                              s.items.length -
                                                                1,
                                                            index: x
                                                          }
                                                        )
                                                      ];
                                                    }
                                                  )
                                                ]),
                                                _: 2
                                              },
                                              1040,
                                              ['aria-current', 'class']
                                            )
                                          ];
                                        }),
                                        _: 2
                                      },
                                      1040
                                    )
                                  ],
                                  2
                                ),
                                x < s.items.length - 1
                                  ? (b(),
                                    D(
                                      'li',
                                      {
                                        key: 0,
                                        role: 'presentation',
                                        'aria-hidden': 'true',
                                        class: T(
                                          t(u).separator({
                                            class:
                                              (i = a.ui) == null
                                                ? void 0
                                                : i.separator
                                          })
                                        )
                                      },
                                      [
                                        z(s.$slots, 'separator', {}, () => {
                                          var m;
                                          return [
                                            $(
                                              W,
                                              {
                                                name: d.value,
                                                class: T(
                                                  t(u).separatorIcon({
                                                    class:
                                                      (m = a.ui) == null
                                                        ? void 0
                                                        : m.separatorIcon
                                                  })
                                                )
                                              },
                                              null,
                                              8,
                                              ['name', 'class']
                                            )
                                          ];
                                        })
                                      ],
                                      2
                                    ))
                                  : M('', !0)
                              ],
                              64
                            )
                          );
                        }),
                        128
                      ))
                    ],
                    2
                  )
                ];
              }),
              _: 3
            },
            8,
            ['as', 'class']
          )
        );
      };
    }
  });
function Ea(l, a = '/') {
  const e = xt(l),
    r = wt(e.pathname),
    o = (d, u = []) => {
      const s = Ct(d),
        f = d.pathname || '/';
      return (
        u.push(s || '/'),
        f !== a &&
          f !== '/' &&
          ((d.pathname = f.substring(0, f.lastIndexOf('/'))),
          r &&
            (d.pathname = It(
              d.pathname.substring(0, d.pathname.lastIndexOf('/'))
            )),
          o(d, u)),
        u
      );
    };
  return o(e).reverse();
}
function Oa() {
  const l = qe();
  return {
    t: (a, e, r) => e,
    te: (a) => !1,
    strategy: 'no_prefix',
    defaultLocale: R(l.defaultLocale || 'en'),
    locale: R(l.currentLocale || l.defaultLocale || 'en')
  };
}
function za(l) {
  return l.split('?')[0];
}
function Ma(l) {
  return l
    .replaceAll('-', ' ')
    .replace(
      /\w\S*/g,
      (a) => a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
    );
}
function Da(l = {}) {
  const a = Lt(),
    e = Oa();
  $t({ canonical: !0, absolute: !0 });
  const r = qe(),
    o = A(() => {
      var c;
      let d = '/';
      const u = za(
          Tt(
            Z(
              l.path || ((c = a.currentRoute.value) == null ? void 0 : c.path)
            ) || d
          )
        ),
        s = Z(l.overrides) || [],
        f = Ea(u, d).map((p, n) => {
          let x = { to: p };
          if (typeof s[n] < 'u') {
            if (s[n] === !1) return !1;
            x = Et(s[n], x);
          }
          return x;
        });
      return (
        l.prepend && f.unshift(...Z(l.prepend)),
        l.append && f.push(...Z(l.append)),
        f
          .filter(Boolean)
          .map((p) => {
            var i, m;
            let n = Ma(String((p.to || '').split('/').pop())),
              x = '';
            const L =
              (m = (i = a.resolve(p.to)) == null ? void 0 : i.matched) == null
                ? void 0
                : m[0];
            if (L) {
              const k = (L == null ? void 0 : L.meta) || {};
              k.breadcrumb && (p = { ...p, ...k.breadcrumb });
              const w = String(L.name).split('___')[0];
              w === 'index' && (n = 'Home'),
                (n = k.breadcrumbLabel || k.breadcrumbTitle || k.title || n),
                (n = e.t(`breadcrumb.items.${w}.label`, n, {
                  missingWarn: !0
                })),
                (x = e.t(`breadcrumb.items.${w}.ariaLabel`, x, {
                  missingWarn: !1
                }));
            }
            return (
              (p.label = p.label || n),
              (p.ariaLabel = p.ariaLabel || x || p.label),
              (p.current = p.current || p.to === u),
              Z(l.hideCurrent) && p.current ? !1 : p
            );
          })
          .map((p) =>
            p &&
            p.to &&
            ((p.to = Ot(r.trailingSlash, p.to)), p.to === d && Z(l.hideRoot))
              ? !1
              : p
          )
          .filter(Boolean)
      );
    });
  return typeof l.schemaOrg > 'u' || l.schemaOrg, o;
}
const Ra = Mt(() =>
    Dt(
      () => import('./CQAWEB--.js'),
      __vite__mapDeps([0, 1]),
      import.meta.url
    ).then((l) => l.default || l)
  ),
  Ba = { class: 'container mx-auto' },
  Pa = N({
    __name: 'default',
    setup(l) {
      const a = zt(),
        e = Da({
          schemaOrg: !0,
          overrides: [
            void 0,
            void 0,
            {
              label: Array.isArray(a.params.slug)
                ? a.params.slug.join('')
                : a.params.slug || '',
              to: String(a.fullPath),
              type: void 0
            }
          ]
        }).value;
      return (r, o) => {
        const d = Ca,
          u = Ta,
          s = Ra;
        return (
          b(),
          D('div', Ba, [
            $(d),
            $(u, { class: 'mt-10 mb-4', items: t(e) }, null, 8, ['items']),
            z(r.$slots, 'default'),
            $(s)
          ])
        );
      };
    }
  });
export { Pa as default };
