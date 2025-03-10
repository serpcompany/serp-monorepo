const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './CKOjb-dU.js',
      './BT6izV9S.js',
      './DHvnABUf.js',
      './BDzRyOtf.js',
      './B97j2ZxQ.js',
      './DlAUqK2U.js',
      './CSVnevZN.js',
      './DLomW_ZE.js',
      './_slug_.B7glc6IN.css',
      './DK4SstdY.js',
      './DN_b9KJc.js',
      './BR9bF7db.js',
      './DM_Ll8qE.js'
    ])
) => i.map((i) => d[i]);
var Ip = Object.defineProperty;
var $p = (e, t, n) =>
  t in e
    ? Ip(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var sn = (e, t, n) => $p(e, typeof t != 'symbol' ? t + '' : t, n);
/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function oa(e) {
  const t = Object.create(null);
  for (const n of e.split(',')) t[n] = 1;
  return (n) => n in t;
}
const ge = {},
  Gn = [],
  kt = () => {},
  Mp = () => !1,
  Zr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ia = (e) => e.startsWith('onUpdate:'),
  Be = Object.assign,
  aa = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Lp = Object.prototype.hasOwnProperty,
  ve = (e, t) => Lp.call(e, t),
  ne = Array.isArray,
  Jn = (e) => es(e) === '[object Map]',
  nu = (e) => es(e) === '[object Set]',
  Np = (e) => es(e) === '[object RegExp]',
  oe = (e) => typeof e == 'function',
  Ie = (e) => typeof e == 'string',
  Zt = (e) => typeof e == 'symbol',
  Re = (e) => e !== null && typeof e == 'object',
  la = (e) => (Re(e) || oe(e)) && oe(e.then) && oe(e.catch),
  ru = Object.prototype.toString,
  es = (e) => ru.call(e),
  jp = (e) => es(e).slice(8, -1),
  su = (e) => es(e) === '[object Object]',
  ca = (e) =>
    Ie(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Qn = oa(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  co = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Hp = /-(\w)/g,
  et = co((e) => e.replace(Hp, (t, n) => (n ? n.toUpperCase() : ''))),
  Fp = /\B([A-Z])/g,
  en = co((e) => e.replace(Fp, '-$1').toLowerCase()),
  uo = co((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Es = co((e) => (e ? `on${uo(e)}` : '')),
  st = (e, t) => !Object.is(e, t),
  Ir = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  ou = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: r,
      value: n
    });
  },
  Dp = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  iu = (e) => {
    const t = Ie(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Za;
const fo = () =>
  Za ||
  (Za =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function wn(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = Ie(r) ? Vp(r) : wn(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else if (Ie(e) || Re(e)) return e;
}
const Bp = /;(?![^(]*\))/g,
  Up = /:([^]+)/,
  zp = /\/\*[^]*?\*\//g;
function Vp(e) {
  const t = {};
  return (
    e
      .replace(zp, '')
      .split(Bp)
      .forEach((n) => {
        if (n) {
          const r = n.split(Up);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Ue(e) {
  let t = '';
  if (Ie(e)) t = e;
  else if (ne(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ue(e[n]);
      r && (t += r + ' ');
    }
  else if (Re(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
function yn(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ie(t) && (e.class = Ue(t)), n && (e.style = wn(n)), e;
}
const Wp =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Kp = oa(Wp);
function au(e) {
  return !!e || e === '';
}
const lu = (e) => !!(e && e.__v_isRef === !0),
  Yt = (e) =>
    Ie(e)
      ? e
      : e == null
        ? ''
        : ne(e) || (Re(e) && (e.toString === ru || !oe(e.toString)))
          ? lu(e)
            ? Yt(e.value)
            : JSON.stringify(e, cu, 2)
          : String(e),
  cu = (e, t) =>
    lu(t)
      ? cu(e, t.value)
      : Jn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], o) => ((n[To(r, o) + ' =>'] = s), n),
              {}
            )
          }
        : nu(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => To(n)) }
          : Zt(t)
            ? To(t)
            : Re(t) && !ne(t) && !su(t)
              ? String(t)
              : t,
  To = (e, t = '') => {
    var n;
    return Zt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Xe;
class uu {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = Xe),
      !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Xe;
      try {
        return (Xe = this), t();
      } finally {
        Xe = n;
      }
    }
  }
  on() {
    Xe = this;
  }
  off() {
    Xe = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function fu(e) {
  return new uu(e);
}
function ua() {
  return Xe;
}
function js(e, t = !1) {
  Xe && Xe.cleanups.push(e);
}
let Ee;
const Ao = new WeakSet();
class du {
  constructor(t) {
    (this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Xe && Xe.active && Xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Ao.has(this) && (Ao.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || hu(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    (this.flags |= 2), el(this), gu(this);
    const t = Ee,
      n = Et;
    (Ee = this), (Et = !0);
    try {
      return this.fn();
    } finally {
      mu(this), (Ee = t), (Et = n), (this.flags &= -3);
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) pa(t);
      (this.deps = this.depsTail = void 0),
        el(this),
        this.onStop && this.onStop(),
        (this.flags &= -2);
    }
  }
  trigger() {
    this.flags & 64
      ? Ao.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    ni(this) && this.run();
  }
  get dirty() {
    return ni(this);
  }
}
let pu = 0,
  $r,
  Mr;
function hu(e, t = !1) {
  if (((e.flags |= 8), t)) {
    (e.next = Mr), (Mr = e);
    return;
  }
  (e.next = $r), ($r = e);
}
function fa() {
  pu++;
}
function da() {
  if (--pu > 0) return;
  if (Mr) {
    let t = Mr;
    for (Mr = void 0; t; ) {
      const n = t.next;
      (t.next = void 0), (t.flags &= -9), (t = n);
    }
  }
  let e;
  for (; $r; ) {
    let t = $r;
    for ($r = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function gu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t);
}
function mu(e) {
  let t,
    n = e.depsTail,
    r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), pa(r), qp(r)) : (t = r),
      (r.dep.activeLink = r.prevActiveLink),
      (r.prevActiveLink = void 0),
      (r = s);
  }
  (e.deps = t), (e.depsTail = n);
}
function ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (yu(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function yu(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Ur)
  )
    return;
  e.globalVersion = Ur;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !ni(e))) {
    e.flags &= -3;
    return;
  }
  const n = Ee,
    r = Et;
  (Ee = e), (Et = !0);
  try {
    gu(e);
    const s = e.fn(e._value);
    (t.version === 0 || st(s, e._value)) && ((e._value = s), t.version++);
  } catch (s) {
    throw (t.version++, s);
  } finally {
    (Ee = n), (Et = r), mu(e), (e.flags &= -3);
  }
}
function pa(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (
    (r && ((r.nextSub = s), (e.prevSub = void 0)),
    s && ((s.prevSub = r), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = r), !r && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) pa(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function qp(e) {
  const { prevDep: t, nextDep: n } = e;
  t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0));
}
let Et = !0;
const vu = [];
function _n() {
  vu.push(Et), (Et = !1);
}
function xn() {
  const e = vu.pop();
  Et = e === void 0 ? !0 : e;
}
function el(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = Ee;
    Ee = void 0;
    try {
      t();
    } finally {
      Ee = n;
    }
  }
}
let Ur = 0;
class Gp {
  constructor(t, n) {
    (this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0);
  }
}
class po {
  constructor(t) {
    (this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0);
  }
  track(t) {
    if (!Ee || !Et || Ee === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ee)
      (n = this.activeLink = new Gp(Ee, this)),
        Ee.deps
          ? ((n.prevDep = Ee.depsTail),
            (Ee.depsTail.nextDep = n),
            (Ee.depsTail = n))
          : (Ee.deps = Ee.depsTail = n),
        bu(n);
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const r = n.nextDep;
      (r.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = r),
        (n.prevDep = Ee.depsTail),
        (n.nextDep = void 0),
        (Ee.depsTail.nextDep = n),
        (Ee.depsTail = n),
        Ee.deps === n && (Ee.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ur++, this.notify(t);
  }
  notify(t) {
    fa();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      da();
    }
  }
}
function bu(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) bu(r);
    }
    const n = e.dep.subs;
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
  }
}
const Hs = new WeakMap(),
  Pn = Symbol(''),
  ri = Symbol(''),
  zr = Symbol('');
function Ke(e, t, n) {
  if (Et && Ee) {
    let r = Hs.get(e);
    r || Hs.set(e, (r = new Map()));
    let s = r.get(n);
    s || (r.set(n, (s = new po())), (s.map = r), (s.key = n)), s.track();
  }
}
function qt(e, t, n, r, s, o) {
  const i = Hs.get(e);
  if (!i) {
    Ur++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if ((fa(), t === 'clear')) i.forEach(a);
  else {
    const l = ne(e),
      u = l && ca(n);
    if (l && n === 'length') {
      const c = Number(r);
      i.forEach((f, d) => {
        (d === 'length' || d === zr || (!Zt(d) && d >= c)) && a(f);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && a(i.get(n)), u && a(i.get(zr)), t)
      ) {
        case 'add':
          l ? u && a(i.get('length')) : (a(i.get(Pn)), Jn(e) && a(i.get(ri)));
          break;
        case 'delete':
          l || (a(i.get(Pn)), Jn(e) && a(i.get(ri)));
          break;
        case 'set':
          Jn(e) && a(i.get(Pn));
          break;
      }
  }
  da();
}
function Jp(e, t) {
  const n = Hs.get(e);
  return n && n.get(t);
}
function Un(e) {
  const t = he(e);
  return t === e ? t : (Ke(t, 'iterate', zr), vt(e) ? t : t.map(qe));
}
function ho(e) {
  return Ke((e = he(e)), 'iterate', zr), e;
}
const Qp = {
  __proto__: null,
  [Symbol.iterator]() {
    return Po(this, Symbol.iterator, qe);
  },
  concat(...e) {
    return Un(this).concat(...e.map((t) => (ne(t) ? Un(t) : t)));
  },
  entries() {
    return Po(this, 'entries', (e) => ((e[1] = qe(e[1])), e));
  },
  every(e, t) {
    return Dt(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return Dt(this, 'filter', e, t, (n) => n.map(qe), arguments);
  },
  find(e, t) {
    return Dt(this, 'find', e, t, qe, arguments);
  },
  findIndex(e, t) {
    return Dt(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Dt(this, 'findLast', e, t, qe, arguments);
  },
  findLastIndex(e, t) {
    return Dt(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Dt(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return Ro(this, 'includes', e);
  },
  indexOf(...e) {
    return Ro(this, 'indexOf', e);
  },
  join(e) {
    return Un(this).join(e);
  },
  lastIndexOf(...e) {
    return Ro(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return Dt(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return br(this, 'pop');
  },
  push(...e) {
    return br(this, 'push', e);
  },
  reduce(e, ...t) {
    return tl(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return tl(this, 'reduceRight', e, t);
  },
  shift() {
    return br(this, 'shift');
  },
  some(e, t) {
    return Dt(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return br(this, 'splice', e);
  },
  toReversed() {
    return Un(this).toReversed();
  },
  toSorted(e) {
    return Un(this).toSorted(e);
  },
  toSpliced(...e) {
    return Un(this).toSpliced(...e);
  },
  unshift(...e) {
    return br(this, 'unshift', e);
  },
  values() {
    return Po(this, 'values', qe);
  }
};
function Po(e, t, n) {
  const r = ho(e),
    s = r[t]();
  return (
    r !== e &&
      !vt(e) &&
      ((s._next = s.next),
      (s.next = () => {
        const o = s._next();
        return o.value && (o.value = n(o.value)), o;
      })),
    s
  );
}
const Yp = Array.prototype;
function Dt(e, t, n, r, s, o) {
  const i = ho(e),
    a = i !== e && !vt(e),
    l = i[t];
  if (l !== Yp[t]) {
    const f = l.apply(e, o);
    return a ? qe(f) : f;
  }
  let u = n;
  i !== e &&
    (a
      ? (u = function (f, d) {
          return n.call(this, qe(f), d, e);
        })
      : n.length > 2 &&
        (u = function (f, d) {
          return n.call(this, f, d, e);
        }));
  const c = l.call(i, u, r);
  return a && s ? s(c) : c;
}
function tl(e, t, n, r) {
  const s = ho(e);
  let o = n;
  return (
    s !== e &&
      (vt(e)
        ? n.length > 3 &&
          (o = function (i, a, l) {
            return n.call(this, i, a, l, e);
          })
        : (o = function (i, a, l) {
            return n.call(this, i, qe(a), l, e);
          })),
    s[t](o, ...r)
  );
}
function Ro(e, t, n) {
  const r = he(e);
  Ke(r, 'iterate', zr);
  const s = r[t](...n);
  return (s === -1 || s === !1) && ma(n[0])
    ? ((n[0] = he(n[0])), r[t](...n))
    : s;
}
function br(e, t, n = []) {
  _n(), fa();
  const r = he(e)[t].apply(e, n);
  return da(), xn(), r;
}
const Xp = oa('__proto__,__v_isRef,__isVue'),
  wu = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Zt)
  );
function Zp(e) {
  Zt(e) || (e = String(e));
  const t = he(this);
  return Ke(t, 'has', e), t.hasOwnProperty(e);
}
class _u {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, r) {
    if (n === '__v_skip') return t.__v_skip;
    const s = this._isReadonly,
      o = this._isShallow;
    if (n === '__v_isReactive') return !s;
    if (n === '__v_isReadonly') return s;
    if (n === '__v_isShallow') return o;
    if (n === '__v_raw')
      return r === (s ? (o ? ch : ku) : o ? Cu : Su).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0;
    const i = ne(t);
    if (!s) {
      let l;
      if (i && (l = Qp[n])) return l;
      if (n === 'hasOwnProperty') return Zp;
    }
    const a = Reflect.get(t, n, Te(t) ? t : r);
    return (Zt(n) ? wu.has(n) : Xp(n)) || (s || Ke(t, 'get', n), o)
      ? a
      : Te(a)
        ? i && ca(n)
          ? a
          : a.value
        : Re(a)
          ? s
            ? ts(a)
            : tt(a)
          : a;
  }
}
class xu extends _u {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const l = vn(o);
      if (
        (!vt(r) && !vn(r) && ((o = he(o)), (r = he(r))),
        !ne(t) && Te(o) && !Te(r))
      )
        return l ? !1 : ((o.value = r), !0);
    }
    const i = ne(t) && ca(n) ? Number(n) < t.length : ve(t, n),
      a = Reflect.set(t, n, r, Te(t) ? t : s);
    return (
      t === he(s) && (i ? st(r, o) && qt(t, 'set', n, r) : qt(t, 'add', n, r)),
      a
    );
  }
  deleteProperty(t, n) {
    const r = ve(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && qt(t, 'delete', n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Zt(n) || !wu.has(n)) && Ke(t, 'has', n), r;
  }
  ownKeys(t) {
    return Ke(t, 'iterate', ne(t) ? 'length' : Pn), Reflect.ownKeys(t);
  }
}
class eh extends _u {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const th = new xu(),
  nh = new eh(),
  rh = new xu(!0);
const si = (e) => e,
  ps = (e) => Reflect.getPrototypeOf(e);
function sh(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = he(s),
      i = Jn(o),
      a = e === 'entries' || (e === Symbol.iterator && i),
      l = e === 'keys' && i,
      u = s[e](...r),
      c = n ? si : t ? oi : qe;
    return (
      !t && Ke(o, 'iterate', l ? ri : Pn),
      {
        next() {
          const { value: f, done: d } = u.next();
          return d
            ? { value: f, done: d }
            : { value: a ? [c(f[0]), c(f[1])] : c(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    );
  };
}
function hs(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function oh(e, t) {
  const n = {
    get(s) {
      const o = this.__v_raw,
        i = he(o),
        a = he(s);
      e || (st(s, a) && Ke(i, 'get', s), Ke(i, 'get', a));
      const { has: l } = ps(i),
        u = t ? si : e ? oi : qe;
      if (l.call(i, s)) return u(o.get(s));
      if (l.call(i, a)) return u(o.get(a));
      o !== i && o.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Ke(he(s), 'iterate', Pn), Reflect.get(s, 'size', s);
    },
    has(s) {
      const o = this.__v_raw,
        i = he(o),
        a = he(s);
      return (
        e || (st(s, a) && Ke(i, 'has', s), Ke(i, 'has', a)),
        s === a ? o.has(s) : o.has(s) || o.has(a)
      );
    },
    forEach(s, o) {
      const i = this,
        a = i.__v_raw,
        l = he(a),
        u = t ? si : e ? oi : qe;
      return (
        !e && Ke(l, 'iterate', Pn),
        a.forEach((c, f) => s.call(o, u(c), u(f), i))
      );
    }
  };
  return (
    Be(
      n,
      e
        ? {
            add: hs('add'),
            set: hs('set'),
            delete: hs('delete'),
            clear: hs('clear')
          }
        : {
            add(s) {
              !t && !vt(s) && !vn(s) && (s = he(s));
              const o = he(this);
              return (
                ps(o).has.call(o, s) || (o.add(s), qt(o, 'add', s, s)), this
              );
            },
            set(s, o) {
              !t && !vt(o) && !vn(o) && (o = he(o));
              const i = he(this),
                { has: a, get: l } = ps(i);
              let u = a.call(i, s);
              u || ((s = he(s)), (u = a.call(i, s)));
              const c = l.call(i, s);
              return (
                i.set(s, o),
                u ? st(o, c) && qt(i, 'set', s, o) : qt(i, 'add', s, o),
                this
              );
            },
            delete(s) {
              const o = he(this),
                { has: i, get: a } = ps(o);
              let l = i.call(o, s);
              l || ((s = he(s)), (l = i.call(o, s))), a && a.call(o, s);
              const u = o.delete(s);
              return l && qt(o, 'delete', s, void 0), u;
            },
            clear() {
              const s = he(this),
                o = s.size !== 0,
                i = s.clear();
              return o && qt(s, 'clear', void 0, void 0), i;
            }
          }
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      n[s] = sh(s, e, t);
    }),
    n
  );
}
function ha(e, t) {
  const n = oh(e, t);
  return (r, s, o) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
        ? e
        : s === '__v_raw'
          ? r
          : Reflect.get(ve(n, s) && s in r ? n : r, s, o);
}
const ih = { get: ha(!1, !1) },
  ah = { get: ha(!1, !0) },
  lh = { get: ha(!0, !1) };
const Su = new WeakMap(),
  Cu = new WeakMap(),
  ku = new WeakMap(),
  ch = new WeakMap();
function uh(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function fh(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : uh(jp(e));
}
function tt(e) {
  return vn(e) ? e : ga(e, !1, th, ih, Su);
}
function Jt(e) {
  return ga(e, !1, rh, ah, Cu);
}
function ts(e) {
  return ga(e, !0, nh, lh, ku);
}
function ga(e, t, n, r, s) {
  if (!Re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = fh(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return s.set(e, a), a;
}
function Rn(e) {
  return vn(e) ? Rn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vn(e) {
  return !!(e && e.__v_isReadonly);
}
function vt(e) {
  return !!(e && e.__v_isShallow);
}
function ma(e) {
  return e ? !!e.__v_raw : !1;
}
function he(e) {
  const t = e && e.__v_raw;
  return t ? he(t) : e;
}
function Eu(e) {
  return (
    !ve(e, '__v_skip') && Object.isExtensible(e) && ou(e, '__v_skip', !0), e
  );
}
const qe = (e) => (Re(e) ? tt(e) : e),
  oi = (e) => (Re(e) ? ts(e) : e);
function Te(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function X(e) {
  return Tu(e, !1);
}
function At(e) {
  return Tu(e, !0);
}
function Tu(e, t) {
  return Te(e) ? e : new dh(e, t);
}
class dh {
  constructor(t, n) {
    (this.dep = new po()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : he(t)),
      (this._value = n ? t : qe(t)),
      (this.__v_isShallow = n);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue,
      r = this.__v_isShallow || vt(t) || vn(t);
    (t = r ? t : he(t)),
      st(t, n) &&
        ((this._rawValue = t),
        (this._value = r ? t : qe(t)),
        this.dep.trigger());
  }
}
function E(e) {
  return Te(e) ? e.value : e;
}
function ze(e) {
  return oe(e) ? e() : E(e);
}
const ph = {
  get: (e, t, n) => (t === '__v_raw' ? e : E(Reflect.get(e, t, n))),
  set: (e, t, n, r) => {
    const s = e[t];
    return Te(s) && !Te(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  }
};
function Au(e) {
  return Rn(e) ? e : new Proxy(e, ph);
}
class hh {
  constructor(t) {
    (this.__v_isRef = !0), (this._value = void 0);
    const n = (this.dep = new po()),
      { get: r, set: s } = t(n.track.bind(n), n.trigger.bind(n));
    (this._get = r), (this._set = s);
  }
  get value() {
    return (this._value = this._get());
  }
  set value(t) {
    this._set(t);
  }
}
function ya(e) {
  return new hh(e);
}
function Xt(e) {
  const t = ne(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Pu(e, n);
  return t;
}
class gh {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0),
      (this._value = void 0);
  }
  get value() {
    const t = this._object[this._key];
    return (this._value = t === void 0 ? this._defaultValue : t);
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Jp(he(this._object), this._key);
  }
}
class mh {
  constructor(t) {
    (this._getter = t),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !0),
      (this._value = void 0);
  }
  get value() {
    return (this._value = this._getter());
  }
}
function On(e, t, n) {
  return Te(e)
    ? e
    : oe(e)
      ? new mh(e)
      : Re(e) && arguments.length > 1
        ? Pu(e, t, n)
        : X(e);
}
function Pu(e, t, n) {
  const r = e[t];
  return Te(r) ? r : new gh(e, t, n);
}
class yh {
  constructor(t, n, r) {
    (this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new po(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ur - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = r);
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && Ee !== this))
      return hu(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return yu(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function vh(e, t, n = !1) {
  let r, s;
  return oe(e) ? (r = e) : ((r = e.get), (s = e.set)), new yh(r, s, n);
}
const gs = {},
  Fs = new WeakMap();
let An;
function bh(e, t = !1, n = An) {
  if (n) {
    let r = Fs.get(n);
    r || Fs.set(n, (r = [])), r.push(e);
  }
}
function wh(e, t, n = ge) {
  const {
      immediate: r,
      deep: s,
      once: o,
      scheduler: i,
      augmentJob: a,
      call: l
    } = n,
    u = (m) => (s ? m : vt(m) || s === !1 || s === 0 ? Gt(m, 1) : Gt(m));
  let c,
    f,
    d,
    p,
    g = !1,
    y = !1;
  if (
    (Te(e)
      ? ((f = () => e.value), (g = vt(e)))
      : Rn(e)
        ? ((f = () => u(e)), (g = !0))
        : ne(e)
          ? ((y = !0),
            (g = e.some((m) => Rn(m) || vt(m))),
            (f = () =>
              e.map((m) => {
                if (Te(m)) return m.value;
                if (Rn(m)) return u(m);
                if (oe(m)) return l ? l(m, 2) : m();
              })))
          : oe(e)
            ? t
              ? (f = l ? () => l(e, 2) : e)
              : (f = () => {
                  if (d) {
                    _n();
                    try {
                      d();
                    } finally {
                      xn();
                    }
                  }
                  const m = An;
                  An = c;
                  try {
                    return l ? l(e, 3, [p]) : e(p);
                  } finally {
                    An = m;
                  }
                })
            : (f = kt),
    t && s)
  ) {
    const m = f,
      x = s === !0 ? 1 / 0 : s;
    f = () => Gt(m(), x);
  }
  const b = ua(),
    _ = () => {
      c.stop(), b && b.active && aa(b.effects, c);
    };
  if (o && t) {
    const m = t;
    t = (...x) => {
      m(...x), _();
    };
  }
  let v = y ? new Array(e.length).fill(gs) : gs;
  const h = (m) => {
    if (!(!(c.flags & 1) || (!c.dirty && !m)))
      if (t) {
        const x = c.run();
        if (s || g || (y ? x.some((C, P) => st(C, v[P])) : st(x, v))) {
          d && d();
          const C = An;
          An = c;
          try {
            const P = [x, v === gs ? void 0 : y && v[0] === gs ? [] : v, p];
            l ? l(t, 3, P) : t(...P), (v = x);
          } finally {
            An = C;
          }
        }
      } else c.run();
  };
  return (
    a && a(h),
    (c = new du(f)),
    (c.scheduler = i ? () => i(h, !1) : h),
    (p = (m) => bh(m, !1, c)),
    (d = c.onStop =
      () => {
        const m = Fs.get(c);
        if (m) {
          if (l) l(m, 4);
          else for (const x of m) x();
          Fs.delete(c);
        }
      }),
    t ? (r ? h(!0) : (v = c.run())) : i ? i(h.bind(null, !0), !0) : c.run(),
    (_.pause = c.pause.bind(c)),
    (_.resume = c.resume.bind(c)),
    (_.stop = _),
    _
  );
}
function Gt(e, t = 1 / 0, n) {
  if (t <= 0 || !Re(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e;
  if ((n.add(e), t--, Te(e))) Gt(e.value, t, n);
  else if (ne(e)) for (let r = 0; r < e.length; r++) Gt(e[r], t, n);
  else if (nu(e) || Jn(e))
    e.forEach((r) => {
      Gt(r, t, n);
    });
  else if (su(e)) {
    for (const r in e) Gt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Gt(e[r], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function ns(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    lr(s, t, n);
  }
}
function Pt(e, t, n, r) {
  if (oe(e)) {
    const s = ns(e, t, n, r);
    return (
      s &&
        la(s) &&
        s.catch((o) => {
          lr(o, t, n);
        }),
      s
    );
  }
  if (ne(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(Pt(e[o], t, n, r));
    return s;
  }
}
function lr(e, t, n, r = !0) {
  const s = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || ge;
  if (t) {
    let a = t.parent;
    const l = t.proxy,
      u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let f = 0; f < c.length; f++) if (c[f](e, l, u) === !1) return;
      }
      a = a.parent;
    }
    if (o) {
      _n(), ns(o, null, 10, [e, l, u]), xn();
      return;
    }
  }
  _h(e, n, s, r, i);
}
function _h(e, t, n, r = !0, s = !1) {
  if (s) throw e;
}
const Ze = [];
let Mt = -1;
const Yn = [];
let cn = null,
  Vn = 0;
const Ru = Promise.resolve();
let Ds = null;
function Ft(e) {
  const t = Ds || Ru;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xh(e) {
  let t = Mt + 1,
    n = Ze.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = Ze[r],
      o = Vr(s);
    o < e || (o === e && s.flags & 2) ? (t = r + 1) : (n = r);
  }
  return t;
}
function va(e) {
  if (!(e.flags & 1)) {
    const t = Vr(e),
      n = Ze[Ze.length - 1];
    !n || (!(e.flags & 2) && t >= Vr(n)) ? Ze.push(e) : Ze.splice(xh(t), 0, e),
      (e.flags |= 1),
      Ou();
  }
}
function Ou() {
  Ds || (Ds = Ru.then(Iu));
}
function Bs(e) {
  ne(e)
    ? Yn.push(...e)
    : cn && e.id === -1
      ? cn.splice(Vn + 1, 0, e)
      : e.flags & 1 || (Yn.push(e), (e.flags |= 1)),
    Ou();
}
function nl(e, t, n = Mt + 1) {
  for (; n < Ze.length; n++) {
    const r = Ze[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      Ze.splice(n, 1),
        n--,
        r.flags & 4 && (r.flags &= -2),
        r(),
        r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Us(e) {
  if (Yn.length) {
    const t = [...new Set(Yn)].sort((n, r) => Vr(n) - Vr(r));
    if (((Yn.length = 0), cn)) {
      cn.push(...t);
      return;
    }
    for (cn = t, Vn = 0; Vn < cn.length; Vn++) {
      const n = cn[Vn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
    }
    (cn = null), (Vn = 0);
  }
}
const Vr = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Iu(e) {
  try {
    for (Mt = 0; Mt < Ze.length; Mt++) {
      const t = Ze[Mt];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        ns(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Mt < Ze.length; Mt++) {
      const t = Ze[Mt];
      t && (t.flags &= -2);
    }
    (Mt = -1),
      (Ze.length = 0),
      Us(),
      (Ds = null),
      (Ze.length || Yn.length) && Iu();
  }
}
let De = null,
  $u = null;
function zs(e) {
  const t = De;
  return (De = e), ($u = (e && e.type.__scopeId) || null), t;
}
function ie(e, t = De, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && yl(-1);
    const o = zs(t);
    let i;
    try {
      i = e(...s);
    } finally {
      zs(o), r._d && yl(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Sh(e, t) {
  if (De === null) return e;
  const n = bo(De),
    r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [o, i, a, l = ge] = t[s];
    o &&
      (oe(o) && (o = { mounted: o, updated: o }),
      o.deep && Gt(i),
      r.push({
        dir: o,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: a,
        modifiers: l
      }));
  }
  return e;
}
function Lt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    o && (a.oldValue = o[i].value);
    let l = a.dir[r];
    l && (_n(), Pt(l, n, 8, [e.el, a, e, t]), xn());
  }
}
const Mu = Symbol('_vte'),
  Lu = (e) => e.__isTeleport,
  Lr = (e) => e && (e.disabled || e.disabled === ''),
  rl = (e) => e && (e.defer || e.defer === ''),
  sl = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  ol = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
  ii = (e, t) => {
    const n = e && e.to;
    return Ie(n) ? (t ? t(n) : null) : n;
  },
  Nu = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, n, r, s, o, i, a, l, u) {
      const {
          mc: c,
          pc: f,
          pbc: d,
          o: { insert: p, querySelector: g, createText: y, createComment: b }
        } = u,
        _ = Lr(t.props);
      let { shapeFlag: v, children: h, dynamicChildren: m } = t;
      if (e == null) {
        const x = (t.el = y('')),
          C = (t.anchor = y(''));
        p(x, n, r), p(C, n, r);
        const P = (R, A) => {
            v & 16 &&
              (s && s.isCE && (s.ce._teleportTarget = R),
              c(h, R, A, s, o, i, a, l));
          },
          N = () => {
            const R = (t.target = ii(t.props, g)),
              A = Hu(R, t, y, p);
            R &&
              (i !== 'svg' && sl(R)
                ? (i = 'svg')
                : i !== 'mathml' && ol(R) && (i = 'mathml'),
              _ || (P(R, A), Ts(t, !1)));
          };
        _ && (P(n, C), Ts(t, !0)),
          rl(t.props)
            ? He(() => {
                N(), (t.el.__isMounted = !0);
              }, o)
            : N();
      } else {
        if (rl(t.props) && !e.el.__isMounted) {
          He(() => {
            Nu.process(e, t, n, r, s, o, i, a, l, u), delete e.el.__isMounted;
          }, o);
          return;
        }
        (t.el = e.el), (t.targetStart = e.targetStart);
        const x = (t.anchor = e.anchor),
          C = (t.target = e.target),
          P = (t.targetAnchor = e.targetAnchor),
          N = Lr(e.props),
          R = N ? n : C,
          A = N ? x : P;
        if (
          (i === 'svg' || sl(C)
            ? (i = 'svg')
            : (i === 'mathml' || ol(C)) && (i = 'mathml'),
          m
            ? (d(e.dynamicChildren, m, R, s, o, i, a), Ca(e, t, !0))
            : l || f(e, t, R, A, s, o, i, a, !1),
          _)
        )
          N
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : ms(t, n, x, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const D = (t.target = ii(t.props, g));
          D && ms(t, D, null, u, 0);
        } else N && ms(t, C, P, u, 1);
        Ts(t, _);
      }
    },
    remove(e, t, n, { um: r, o: { remove: s } }, o) {
      const {
        shapeFlag: i,
        children: a,
        anchor: l,
        targetStart: u,
        targetAnchor: c,
        target: f,
        props: d
      } = e;
      if ((f && (s(u), s(c)), o && s(l), i & 16)) {
        const p = o || !Lr(d);
        for (let g = 0; g < a.length; g++) {
          const y = a[g];
          r(y, t, n, p, !!y.dynamicChildren);
        }
      }
    },
    move: ms,
    hydrate: Ch
  };
function ms(e, t, n, { o: { insert: r }, m: s }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: a, shapeFlag: l, children: u, props: c } = e,
    f = o === 2;
  if ((f && r(i, t, n), (!f || Lr(c)) && l & 16))
    for (let d = 0; d < u.length; d++) s(u[d], t, n, 2);
  f && r(a, t, n);
}
function Ch(
  e,
  t,
  n,
  r,
  s,
  o,
  {
    o: {
      nextSibling: i,
      parentNode: a,
      querySelector: l,
      insert: u,
      createText: c
    }
  },
  f
) {
  const d = (t.target = ii(t.props, l));
  if (d) {
    const p = Lr(t.props),
      g = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if (p)
        (t.anchor = f(i(e), t, a(e), n, r, s, o)),
          (t.targetStart = g),
          (t.targetAnchor = g && i(g));
      else {
        t.anchor = i(e);
        let y = g;
        for (; y; ) {
          if (y && y.nodeType === 8) {
            if (y.data === 'teleport start anchor') t.targetStart = y;
            else if (y.data === 'teleport anchor') {
              (t.targetAnchor = y),
                (d._lpa = t.targetAnchor && i(t.targetAnchor));
              break;
            }
          }
          y = i(y);
        }
        t.targetAnchor || Hu(d, t, c, u), f(g && i(g), t, d, n, r, s, o);
      }
    Ts(t, p);
  }
  return t.anchor && i(t.anchor);
}
const ju = Nu;
function Ts(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let r, s;
    for (
      t
        ? ((r = e.el), (s = e.anchor))
        : ((r = e.targetStart), (s = e.targetAnchor));
      r && r !== s;

    )
      r.nodeType === 1 && r.setAttribute('data-v-owner', n.uid),
        (r = r.nextSibling);
    n.ut();
  }
}
function Hu(e, t, n, r) {
  const s = (t.targetStart = n('')),
    o = (t.targetAnchor = n(''));
  return (s[Mu] = o), e && (r(s, e), r(o, e)), o;
}
const un = Symbol('_leaveCb'),
  ys = Symbol('_enterCb');
function kh() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map()
  };
  return (
    dt(() => {
      e.isMounted = !0;
    }),
    cr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const gt = [Function, Array],
  Fu = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: gt,
    onEnter: gt,
    onAfterEnter: gt,
    onEnterCancelled: gt,
    onBeforeLeave: gt,
    onLeave: gt,
    onAfterLeave: gt,
    onLeaveCancelled: gt,
    onBeforeAppear: gt,
    onAppear: gt,
    onAfterAppear: gt,
    onAppearCancelled: gt
  },
  Du = (e) => {
    const t = e.subTree;
    return t.component ? Du(t.component) : t;
  },
  Eh = {
    name: 'BaseTransition',
    props: Fu,
    setup(e, { slots: t }) {
      const n = Ve(),
        r = kh();
      return () => {
        const s = t.default && zu(t.default(), !0);
        if (!s || !s.length) return;
        const o = Bu(s),
          i = he(e),
          { mode: a } = i;
        if (r.isLeaving) return Oo(o);
        const l = il(o);
        if (!l) return Oo(o);
        let u = ai(l, i, r, n, (f) => (u = f));
        l.type !== Ne && nr(l, u);
        let c = n.subTree && il(n.subTree);
        if (c && c.type !== Ne && !Ct(l, c) && Du(n).type !== Ne) {
          let f = ai(c, i, r, n);
          if ((nr(c, f), a === 'out-in' && l.type !== Ne))
            return (
              (r.isLeaving = !0),
              (f.afterLeave = () => {
                (r.isLeaving = !1),
                  n.job.flags & 8 || n.update(),
                  delete f.afterLeave,
                  (c = void 0);
              }),
              Oo(o)
            );
          a === 'in-out' && l.type !== Ne
            ? (f.delayLeave = (d, p, g) => {
                const y = Uu(r, c);
                (y[String(c.key)] = c),
                  (d[un] = () => {
                    p(), (d[un] = void 0), delete u.delayedLeave, (c = void 0);
                  }),
                  (u.delayedLeave = () => {
                    g(), delete u.delayedLeave, (c = void 0);
                  });
              })
            : (c = void 0);
        } else c && (c = void 0);
        return o;
      };
    }
  };
function Bu(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ne) {
        t = n;
        break;
      }
  }
  return t;
}
const Th = Eh;
function Uu(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function ai(e, t, n, r, s) {
  const {
      appear: o,
      mode: i,
      persisted: a = !1,
      onBeforeEnter: l,
      onEnter: u,
      onAfterEnter: c,
      onEnterCancelled: f,
      onBeforeLeave: d,
      onLeave: p,
      onAfterLeave: g,
      onLeaveCancelled: y,
      onBeforeAppear: b,
      onAppear: _,
      onAfterAppear: v,
      onAppearCancelled: h
    } = t,
    m = String(e.key),
    x = Uu(n, e),
    C = (R, A) => {
      R && Pt(R, r, 9, A);
    },
    P = (R, A) => {
      const D = A[1];
      C(R, A),
        ne(R) ? R.every((k) => k.length <= 1) && D() : R.length <= 1 && D();
    },
    N = {
      mode: i,
      persisted: a,
      beforeEnter(R) {
        let A = l;
        if (!n.isMounted)
          if (o) A = b || l;
          else return;
        R[un] && R[un](!0);
        const D = x[m];
        D && Ct(e, D) && D.el[un] && D.el[un](), C(A, [R]);
      },
      enter(R) {
        let A = u,
          D = c,
          k = f;
        if (!n.isMounted)
          if (o) (A = _ || u), (D = v || c), (k = h || f);
          else return;
        let M = !1;
        const z = (R[ys] = (Q) => {
          M ||
            ((M = !0),
            Q ? C(k, [R]) : C(D, [R]),
            N.delayedLeave && N.delayedLeave(),
            (R[ys] = void 0));
        });
        A ? P(A, [R, z]) : z();
      },
      leave(R, A) {
        const D = String(e.key);
        if ((R[ys] && R[ys](!0), n.isUnmounting)) return A();
        C(d, [R]);
        let k = !1;
        const M = (R[un] = (z) => {
          k ||
            ((k = !0),
            A(),
            z ? C(y, [R]) : C(g, [R]),
            (R[un] = void 0),
            x[D] === e && delete x[D]);
        });
        (x[D] = e), p ? P(p, [R, M]) : M();
      },
      clone(R) {
        const A = ai(R, t, n, r, s);
        return s && s(A), A;
      }
    };
  return N;
}
function Oo(e) {
  if (rs(e)) return (e = Ht(e)), (e.children = null), e;
}
function il(e) {
  if (!rs(e)) return Lu(e.type) && e.children ? Bu(e.children) : e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && oe(n.default)) return n.default();
  }
}
function nr(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), nr(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function zu(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Me
      ? (i.patchFlag & 128 && s++, (r = r.concat(zu(i.children, t, a))))
      : (t || i.type !== Ne) && r.push(a != null ? Ht(i, { key: a }) : i);
  }
  if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */ function re(e, t) {
  return oe(e) ? Be({ name: e.name }, t, { setup: e }) : e;
}
function Ah() {
  const e = Ve();
  return e
    ? (e.appContext.config.idPrefix || 'v') + '-' + e.ids[0] + e.ids[1]++
    : '';
}
function ba(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function Wr(e, t, n, r, s = !1) {
  if (ne(e)) {
    e.forEach((g, y) => Wr(g, t && (ne(t) ? t[y] : t), n, r, s));
    return;
  }
  if (mn(r) && !s) {
    r.shapeFlag & 512 &&
      r.type.__asyncResolved &&
      r.component.subTree.component &&
      Wr(e, t, n, r.component.subTree);
    return;
  }
  const o = r.shapeFlag & 4 ? bo(r.component) : r.el,
    i = s ? null : o,
    { i: a, r: l } = e,
    u = t && t.r,
    c = a.refs === ge ? (a.refs = {}) : a.refs,
    f = a.setupState,
    d = he(f),
    p = f === ge ? () => !1 : (g) => ve(d, g);
  if (
    (u != null &&
      u !== l &&
      (Ie(u)
        ? ((c[u] = null), p(u) && (f[u] = null))
        : Te(u) && (u.value = null)),
    oe(l))
  )
    ns(l, a, 12, [i, c]);
  else {
    const g = Ie(l),
      y = Te(l);
    if (g || y) {
      const b = () => {
        if (e.f) {
          const _ = g ? (p(l) ? f[l] : c[l]) : l.value;
          s
            ? ne(_) && aa(_, o)
            : ne(_)
              ? _.includes(o) || _.push(o)
              : g
                ? ((c[l] = [o]), p(l) && (f[l] = c[l]))
                : ((l.value = [o]), e.k && (c[e.k] = l.value));
        } else
          g
            ? ((c[l] = i), p(l) && (f[l] = i))
            : y && ((l.value = i), e.k && (c[e.k] = i));
      };
      i ? ((b.id = -1), He(b, n)) : b();
    }
  }
}
let al = !1;
const zn = () => {
    al || (al = !0);
  },
  Ph = (e) => e.namespaceURI.includes('svg') && e.tagName !== 'foreignObject',
  Rh = (e) => e.namespaceURI.includes('MathML'),
  vs = (e) => {
    if (e.nodeType === 1) {
      if (Ph(e)) return 'svg';
      if (Rh(e)) return 'mathml';
    }
  },
  Kn = (e) => e.nodeType === 8;
function Oh(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: o,
        parentNode: i,
        remove: a,
        insert: l,
        createComment: u
      }
    } = e,
    c = (h, m) => {
      if (!m.hasChildNodes()) {
        n(null, h, m), Us(), (m._vnode = h);
        return;
      }
      f(m.firstChild, h, null, null, null), Us(), (m._vnode = h);
    },
    f = (h, m, x, C, P, N = !1) => {
      N = N || !!m.dynamicChildren;
      const R = Kn(h) && h.data === '[',
        A = () => y(h, m, x, C, P, R),
        { type: D, ref: k, shapeFlag: M, patchFlag: z } = m;
      let Q = h.nodeType;
      (m.el = h), z === -2 && ((N = !1), (m.dynamicChildren = null));
      let $ = null;
      switch (D) {
        case $n:
          Q !== 3
            ? m.children === ''
              ? (l((m.el = s('')), i(h), h), ($ = h))
              : ($ = A())
            : (h.data !== m.children && (zn(), (h.data = m.children)),
              ($ = o(h)));
          break;
        case Ne:
          v(h)
            ? (($ = o(h)), _((m.el = h.content.firstChild), h, x))
            : Q !== 8 || R
              ? ($ = A())
              : ($ = o(h));
          break;
        case Zn:
          if ((R && ((h = o(h)), (Q = h.nodeType)), Q === 1 || Q === 3)) {
            $ = h;
            const W = !m.children.length;
            for (let B = 0; B < m.staticCount; B++)
              W && (m.children += $.nodeType === 1 ? $.outerHTML : $.data),
                B === m.staticCount - 1 && (m.anchor = $),
                ($ = o($));
            return R ? o($) : $;
          } else A();
          break;
        case Me:
          R ? ($ = g(h, m, x, C, P, N)) : ($ = A());
          break;
        default:
          if (M & 1)
            (Q !== 1 || m.type.toLowerCase() !== h.tagName.toLowerCase()) &&
            !v(h)
              ? ($ = A())
              : ($ = d(h, m, x, C, P, N));
          else if (M & 6) {
            m.slotScopeIds = P;
            const W = i(h);
            if (
              (R
                ? ($ = b(h))
                : Kn(h) && h.data === 'teleport start'
                  ? ($ = b(h, h.data, 'teleport end'))
                  : ($ = o(h)),
              t(m, W, null, x, C, vs(W), N),
              mn(m) && !m.type.__asyncResolved)
            ) {
              let B;
              R
                ? ((B = ue(Me)),
                  (B.anchor = $ ? $.previousSibling : W.lastChild))
                : (B = h.nodeType === 3 ? Ln('') : ue('div')),
                (B.el = h),
                (m.component.subTree = B);
            }
          } else
            M & 64
              ? Q !== 8
                ? ($ = A())
                : ($ = m.type.hydrate(h, m, x, C, P, N, e, p))
              : M & 128 &&
                ($ = m.type.hydrate(h, m, x, C, vs(i(h)), P, N, e, f));
      }
      return k != null && Wr(k, null, C, m), $;
    },
    d = (h, m, x, C, P, N) => {
      N = N || !!m.dynamicChildren;
      const {
          type: R,
          props: A,
          patchFlag: D,
          shapeFlag: k,
          dirs: M,
          transition: z
        } = m,
        Q = R === 'input' || R === 'option';
      if (Q || D !== -1) {
        M && Lt(m, null, x, 'created');
        let $ = !1;
        if (v(h)) {
          $ = mf(null, z) && x && x.vnode.props && x.vnode.props.appear;
          const B = h.content.firstChild;
          $ && z.beforeEnter(B), _(B, h, x), (m.el = h = B);
        }
        if (k & 16 && !(A && (A.innerHTML || A.textContent))) {
          let B = p(h.firstChild, m, h, x, C, P, N);
          for (; B; ) {
            bs(h, 1) || zn();
            const ae = B;
            (B = B.nextSibling), a(ae);
          }
        } else if (k & 8) {
          let B = m.children;
          B[0] ===
            `
` &&
            (h.tagName === 'PRE' || h.tagName === 'TEXTAREA') &&
            (B = B.slice(1)),
            h.textContent !== B &&
              (bs(h, 0) || zn(), (h.textContent = m.children));
        }
        if (A) {
          if (Q || !N || D & 48) {
            const B = h.tagName.includes('-');
            for (const ae in A)
              ((Q && (ae.endsWith('value') || ae === 'indeterminate')) ||
                (Zr(ae) && !Qn(ae)) ||
                ae[0] === '.' ||
                B) &&
                r(h, ae, null, A[ae], void 0, x);
          } else if (A.onClick) r(h, 'onClick', null, A.onClick, void 0, x);
          else if (D & 4 && Rn(A.style)) for (const B in A.style) A.style[B];
        }
        let W;
        (W = A && A.onVnodeBeforeMount) && rt(W, x, m),
          M && Lt(m, null, x, 'beforeMount'),
          ((W = A && A.onVnodeMounted) || M || $) &&
            xf(() => {
              W && rt(W, x, m), $ && z.enter(h), M && Lt(m, null, x, 'mounted');
            }, C);
      }
      return h.nextSibling;
    },
    p = (h, m, x, C, P, N, R) => {
      R = R || !!m.dynamicChildren;
      const A = m.children,
        D = A.length;
      for (let k = 0; k < D; k++) {
        const M = R ? A[k] : (A[k] = ct(A[k])),
          z = M.type === $n;
        h
          ? (z &&
              !R &&
              k + 1 < D &&
              ct(A[k + 1]).type === $n &&
              (l(s(h.data.slice(M.children.length)), x, o(h)),
              (h.data = M.children)),
            (h = f(h, M, C, P, N, R)))
          : z && !M.children
            ? l((M.el = s('')), x)
            : (bs(x, 1) || zn(), n(null, M, x, null, C, P, vs(x), N));
      }
      return h;
    },
    g = (h, m, x, C, P, N) => {
      const { slotScopeIds: R } = m;
      R && (P = P ? P.concat(R) : R);
      const A = i(h),
        D = p(o(h), m, A, x, C, P, N);
      return D && Kn(D) && D.data === ']'
        ? o((m.anchor = D))
        : (zn(), l((m.anchor = u(']')), A, D), D);
    },
    y = (h, m, x, C, P, N) => {
      if ((bs(h.parentElement, 1) || zn(), (m.el = null), N)) {
        const D = b(h);
        for (;;) {
          const k = o(h);
          if (k && k !== D) a(k);
          else break;
        }
      }
      const R = o(h),
        A = i(h);
      return (
        a(h),
        n(null, m, A, R, x, C, vs(A), P),
        x && ((x.vnode.el = m.el), vo(x, m.el)),
        R
      );
    },
    b = (h, m = '[', x = ']') => {
      let C = 0;
      for (; h; )
        if (((h = o(h)), h && Kn(h) && (h.data === m && C++, h.data === x))) {
          if (C === 0) return o(h);
          C--;
        }
      return h;
    },
    _ = (h, m, x) => {
      const C = m.parentNode;
      C && C.replaceChild(h, m);
      let P = x;
      for (; P; )
        P.vnode.el === m && (P.vnode.el = P.subTree.el = h), (P = P.parent);
    },
    v = (h) => h.nodeType === 1 && h.tagName === 'TEMPLATE';
  return [c, f];
}
const ll = 'data-allow-mismatch',
  Ih = { 0: 'text', 1: 'children', 2: 'class', 3: 'style', 4: 'attribute' };
function bs(e, t) {
  if (t === 0 || t === 1)
    for (; e && !e.hasAttribute(ll); ) e = e.parentElement;
  const n = e && e.getAttribute(ll);
  if (n == null) return !1;
  if (n === '') return !0;
  {
    const r = n.split(',');
    return t === 0 && r.includes('children')
      ? !0
      : n.split(',').includes(Ih[t]);
  }
}
fo().requestIdleCallback;
fo().cancelIdleCallback;
function $h(e, t) {
  if (Kn(e) && e.data === '[') {
    let n = 1,
      r = e.nextSibling;
    for (; r; ) {
      if (r.nodeType === 1) {
        if (t(r) === !1) break;
      } else if (Kn(r))
        if (r.data === ']') {
          if (--n === 0) break;
        } else r.data === '[' && n++;
      r = r.nextSibling;
    }
  } else t(e);
}
const mn = (e) => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */ function Vu(e) {
  oe(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    hydrate: o,
    timeout: i,
    suspensible: a = !0,
    onError: l
  } = e;
  let u = null,
    c,
    f = 0;
  const d = () => (f++, (u = null), p()),
    p = () => {
      let g;
      return (
        u ||
        (g = u =
          t()
            .catch((y) => {
              if (((y = y instanceof Error ? y : new Error(String(y))), l))
                return new Promise((b, _) => {
                  l(
                    y,
                    () => b(d()),
                    () => _(y),
                    f + 1
                  );
                });
              throw y;
            })
            .then((y) =>
              g !== u && u
                ? u
                : (y &&
                    (y.__esModule || y[Symbol.toStringTag] === 'Module') &&
                    (y = y.default),
                  (c = y),
                  y)
            ))
      );
    };
  return re({
    name: 'AsyncComponentWrapper',
    __asyncLoader: p,
    __asyncHydrate(g, y, b) {
      const _ = o
        ? () => {
            const v = o(b, (h) => $h(g, h));
            v && (y.bum || (y.bum = [])).push(v);
          }
        : b;
      c ? _() : p().then(() => !y.isUnmounted && _());
    },
    get __asyncResolved() {
      return c;
    },
    setup() {
      const g = Fe;
      if ((ba(g), c)) return () => Io(c, g);
      const y = (h) => {
        (u = null), lr(h, g, 13, !r);
      };
      if ((a && g.suspense) || sr)
        return p()
          .then((h) => () => Io(h, g))
          .catch((h) => (y(h), () => (r ? ue(r, { error: h }) : null)));
      const b = X(!1),
        _ = X(),
        v = X(!!s);
      return (
        s &&
          setTimeout(() => {
            v.value = !1;
          }, s),
        i != null &&
          setTimeout(() => {
            if (!b.value && !_.value) {
              const h = new Error(`Async component timed out after ${i}ms.`);
              y(h), (_.value = h);
            }
          }, i),
        p()
          .then(() => {
            (b.value = !0), g.parent && rs(g.parent.vnode) && g.parent.update();
          })
          .catch((h) => {
            y(h), (_.value = h);
          }),
        () => {
          if (b.value && c) return Io(c, g);
          if (_.value && r) return ue(r, { error: _.value });
          if (n && !v.value) return ue(n);
        }
      );
    }
  });
}
function Io(e, t) {
  const { ref: n, props: r, children: s, ce: o } = t.vnode,
    i = ue(e, r, s);
  return (i.ref = n), (i.ce = o), delete t.vnode.ce, i;
}
const rs = (e) => e.type.__isKeepAlive,
  Mh = {
    name: 'KeepAlive',
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number]
    },
    setup(e, { slots: t }) {
      const n = Ve(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const v = t.default && t.default();
          return v && v.length === 1 ? v[0] : v;
        };
      const s = new Map(),
        o = new Set();
      let i = null;
      const a = n.suspense,
        {
          renderer: {
            p: l,
            m: u,
            um: c,
            o: { createElement: f }
          }
        } = r,
        d = f('div');
      (r.activate = (v, h, m, x, C) => {
        const P = v.component;
        u(v, h, m, 0, a),
          l(P.vnode, v, h, m, P, a, x, v.slotScopeIds, C),
          He(() => {
            (P.isDeactivated = !1), P.a && Ir(P.a);
            const N = v.props && v.props.onVnodeMounted;
            N && rt(N, P.parent, v);
          }, a);
      }),
        (r.deactivate = (v) => {
          const h = v.component;
          Ks(h.m),
            Ks(h.a),
            u(v, d, null, 1, a),
            He(() => {
              h.da && Ir(h.da);
              const m = v.props && v.props.onVnodeUnmounted;
              m && rt(m, h.parent, v), (h.isDeactivated = !0);
            }, a);
        });
      function p(v) {
        $o(v), c(v, n, a, !0);
      }
      function g(v) {
        s.forEach((h, m) => {
          const x = yi(h.type);
          x && !v(x) && y(m);
        });
      }
      function y(v) {
        const h = s.get(v);
        h && (!i || !Ct(h, i)) ? p(h) : i && $o(i), s.delete(v), o.delete(v);
      }
      Pe(
        () => [e.include, e.exclude],
        ([v, h]) => {
          v && g((m) => Pr(v, m)), h && g((m) => !Pr(h, m));
        },
        { flush: 'post', deep: !0 }
      );
      let b = null;
      const _ = () => {
        b != null &&
          (qs(n.subTree.type)
            ? He(() => {
                s.set(b, ws(n.subTree));
              }, n.subTree.suspense)
            : s.set(b, ws(n.subTree)));
      };
      return (
        dt(_),
        qu(_),
        cr(() => {
          s.forEach((v) => {
            const { subTree: h, suspense: m } = n,
              x = ws(h);
            if (v.type === x.type && v.key === x.key) {
              $o(x);
              const C = x.component.da;
              C && He(C, m);
              return;
            }
            p(v);
          });
        }),
        () => {
          if (((b = null), !t.default)) return (i = null);
          const v = t.default(),
            h = v[0];
          if (v.length > 1) return (i = null), v;
          if (!Mn(h) || (!(h.shapeFlag & 4) && !(h.shapeFlag & 128)))
            return (i = null), h;
          let m = ws(h);
          if (m.type === Ne) return (i = null), m;
          const x = m.type,
            C = yi(mn(m) ? m.type.__asyncResolved || {} : x),
            { include: P, exclude: N, max: R } = e;
          if ((P && (!C || !Pr(P, C))) || (N && C && Pr(N, C)))
            return (m.shapeFlag &= -257), (i = m), h;
          const A = m.key == null ? x : m.key,
            D = s.get(A);
          return (
            m.el && ((m = Ht(m)), h.shapeFlag & 128 && (h.ssContent = m)),
            (b = A),
            D
              ? ((m.el = D.el),
                (m.component = D.component),
                m.transition && nr(m, m.transition),
                (m.shapeFlag |= 512),
                o.delete(A),
                o.add(A))
              : (o.add(A),
                R && o.size > parseInt(R, 10) && y(o.values().next().value)),
            (m.shapeFlag |= 256),
            (i = m),
            qs(h.type) ? h : m
          );
        }
      );
    }
  },
  Lh = Mh;
function Pr(e, t) {
  return ne(e)
    ? e.some((n) => Pr(n, t))
    : Ie(e)
      ? e.split(',').includes(t)
      : Np(e)
        ? ((e.lastIndex = 0), e.test(t))
        : !1;
}
function wa(e, t) {
  Wu(e, 'a', t);
}
function _a(e, t) {
  Wu(e, 'da', t);
}
function Wu(e, t, n = Fe) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((go(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      rs(s.parent.vnode) && Nh(r, t, n, s), (s = s.parent);
  }
}
function Nh(e, t, n, r) {
  const s = go(t, e, r, !0);
  Hn(() => {
    aa(r[t], s);
  }, n);
}
function $o(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function ws(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function go(e, t, n = Fe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          _n();
          const a = Nn(n),
            l = Pt(t, n, e, i);
          return a(), xn(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const tn =
    (e) =>
    (t, n = Fe) => {
      (!sr || e === 'sp') && go(e, (...r) => t(...r), n);
    },
  jh = tn('bm'),
  dt = tn('m'),
  Ku = tn('bu'),
  qu = tn('u'),
  cr = tn('bum'),
  Hn = tn('um'),
  Hh = tn('sp'),
  Fh = tn('rtg'),
  Dh = tn('rtc');
function Gu(e, t = Fe) {
  go('ec', e, t);
}
const Ju = 'components';
function cl(e, t) {
  return Yu(Ju, e, !0, t) || e;
}
const Qu = Symbol.for('v-ndc');
function xa(e) {
  return Ie(e) ? Yu(Ju, e, !1) || e : e || Qu;
}
function Yu(e, t, n = !0, r = !1) {
  const s = De || Fe;
  if (s) {
    const o = s.type;
    {
      const a = yi(o, !1);
      if (a && (a === t || a === et(t) || a === uo(et(t)))) return o;
    }
    const i = ul(s[e] || o[e], t) || ul(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function ul(e, t) {
  return e && (e[t] || e[et(t)] || e[uo(et(t))]);
}
function li(e, t, n, r) {
  let s;
  const o = n,
    i = ne(e);
  if (i || Ie(e)) {
    const a = i && Rn(e);
    let l = !1;
    a && ((l = !vt(e)), (e = ho(e))), (s = new Array(e.length));
    for (let u = 0, c = e.length; u < c; u++)
      s[u] = t(l ? qe(e[u]) : e[u], u, void 0, o);
  } else if (typeof e == 'number') {
    s = new Array(e);
    for (let a = 0; a < e; a++) s[a] = t(a + 1, a, void 0, o);
  } else if (Re(e))
    if (e[Symbol.iterator]) s = Array.from(e, (a, l) => t(a, l, void 0, o));
    else {
      const a = Object.keys(e);
      s = new Array(a.length);
      for (let l = 0, u = a.length; l < u; l++) {
        const c = a[l];
        s[l] = t(e[c], c, l, o);
      }
    }
  else s = [];
  return s;
}
function lk(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (ne(r)) for (let s = 0; s < r.length; s++) e[r[s].name] = r[s].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...s) => {
              const o = r.fn(...s);
              return o && (o.key = r.key), o;
            }
          : r.fn);
  }
  return e;
}
function fe(e, t, n = {}, r, s) {
  if (De.ce || (De.parent && mn(De.parent) && De.parent.ce))
    return (
      t !== 'default' && (n.name = t),
      G(),
      ee(Me, null, [ue('slot', n, r && r())], 64)
    );
  let o = e[t];
  o && o._c && (o._d = !1), G();
  const i = o && Xu(o(n)),
    a = n.key || (i && i.key),
    l = ee(
      Me,
      { key: (a && !Zt(a) ? a : `_${t}`) + (!i && r ? '_fb' : '') },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    l.scopeId && (l.slotScopeIds = [l.scopeId + '-s']),
    o && o._c && (o._d = !0),
    l
  );
}
function Xu(e) {
  return e.some((t) =>
    Mn(t) ? !(t.type === Ne || (t.type === Me && !Xu(t.children))) : !0
  )
    ? e
    : null;
}
const ci = (e) => (e ? (Ef(e) ? bo(e) : ci(e.parent)) : null),
  Nr = Be(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ci(e.parent),
    $root: (e) => ci(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => nf(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        va(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Ft.bind(e.proxy)),
    $watch: (e) => lg.bind(e)
  }),
  Mo = (e, t) => e !== ge && !e.__isScriptSetup && ve(e, t),
  Bh = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: a,
        appContext: l
      } = e;
      let u;
      if (t[0] !== '$') {
        const p = i[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Mo(r, t)) return (i[t] = 1), r[t];
          if (s !== ge && ve(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && ve(u, t)) return (i[t] = 3), o[t];
          if (n !== ge && ve(n, t)) return (i[t] = 4), n[t];
          ui && (i[t] = 0);
        }
      }
      const c = Nr[t];
      let f, d;
      if (c) return t === '$attrs' && Ke(e.attrs, 'get', ''), c(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== ge && ve(n, t)) return (i[t] = 4), n[t];
      if (((d = l.config.globalProperties), ve(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Mo(s, t)
        ? ((s[t] = n), !0)
        : r !== ge && ve(r, t)
          ? ((r[t] = n), !0)
          : ve(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o
        }
      },
      i
    ) {
      let a;
      return (
        !!n[i] ||
        (e !== ge && ve(e, i)) ||
        Mo(t, i) ||
        ((a = o[0]) && ve(a, i)) ||
        ve(r, i) ||
        ve(Nr, i) ||
        ve(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ve(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    }
  };
function Zu() {
  return ef().slots;
}
function Uh() {
  return ef().attrs;
}
function ef() {
  const e = Ve();
  return e.setupContext || (e.setupContext = Af(e));
}
function Vs(e) {
  return ne(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function ck(e, t) {
  return !e || !t
    ? e || t
    : ne(e) && ne(t)
      ? e.concat(t)
      : Be({}, Vs(e), Vs(t));
}
function uk(e) {
  const t = Ve();
  let n = e();
  return (
    gi(),
    la(n) &&
      (n = n.catch((r) => {
        throw (Nn(t), r);
      })),
    [n, () => Nn(t)]
  );
}
let ui = !0;
function zh(e) {
  const t = nf(e),
    n = e.proxy,
    r = e.ctx;
  (ui = !1), t.beforeCreate && fl(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: o,
    methods: i,
    watch: a,
    provide: l,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: p,
    updated: g,
    activated: y,
    deactivated: b,
    beforeDestroy: _,
    beforeUnmount: v,
    destroyed: h,
    unmounted: m,
    render: x,
    renderTracked: C,
    renderTriggered: P,
    errorCaptured: N,
    serverPrefetch: R,
    expose: A,
    inheritAttrs: D,
    components: k,
    directives: M,
    filters: z
  } = t;
  if ((u && Vh(u, r, null), i))
    for (const W in i) {
      const B = i[W];
      oe(B) && (r[W] = B.bind(n));
    }
  if (s) {
    const W = s.call(n, n);
    Re(W) && (e.data = tt(W));
  }
  if (((ui = !0), o))
    for (const W in o) {
      const B = o[W],
        ae = oe(B) ? B.bind(n, n) : oe(B.get) ? B.get.bind(n, n) : kt,
        _e = !oe(B) && oe(B.set) ? B.set.bind(n) : kt,
        xe = F({ get: ae, set: _e });
      Object.defineProperty(r, W, {
        enumerable: !0,
        configurable: !0,
        get: () => xe.value,
        set: (Se) => (xe.value = Se)
      });
    }
  if (a) for (const W in a) tf(a[W], r, n, W);
  if (l) {
    const W = oe(l) ? l.call(n) : l;
    Reflect.ownKeys(W).forEach((B) => {
      Tt(B, W[B]);
    });
  }
  c && fl(c, e, 'c');
  function $(W, B) {
    ne(B) ? B.forEach((ae) => W(ae.bind(n))) : B && W(B.bind(n));
  }
  if (
    ($(jh, f),
    $(dt, d),
    $(Ku, p),
    $(qu, g),
    $(wa, y),
    $(_a, b),
    $(Gu, N),
    $(Dh, C),
    $(Fh, P),
    $(cr, v),
    $(Hn, m),
    $(Hh, R),
    ne(A))
  )
    if (A.length) {
      const W = e.exposed || (e.exposed = {});
      A.forEach((B) => {
        Object.defineProperty(W, B, {
          get: () => n[B],
          set: (ae) => (n[B] = ae)
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === kt && (e.render = x),
    D != null && (e.inheritAttrs = D),
    k && (e.components = k),
    M && (e.directives = M),
    R && ba(e);
}
function Vh(e, t, n = kt) {
  ne(e) && (e = fi(e));
  for (const r in e) {
    const s = e[r];
    let o;
    Re(s)
      ? 'default' in s
        ? (o = Ae(s.from || r, s.default, !0))
        : (o = Ae(s.from || r))
      : (o = Ae(s)),
      Te(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i)
          })
        : (t[r] = o);
  }
}
function fl(e, t, n) {
  Pt(ne(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function tf(e, t, n, r) {
  let s = r.includes('.') ? vf(n, r) : () => n[r];
  if (Ie(e)) {
    const o = t[e];
    oe(o) && Pe(s, o);
  } else if (oe(e)) Pe(s, e.bind(n));
  else if (Re(e))
    if (ne(e)) e.forEach((o) => tf(o, t, n, r));
    else {
      const o = oe(e.handler) ? e.handler.bind(n) : t[e.handler];
      oe(o) && Pe(s, o, e);
    }
}
function nf(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i }
    } = e.appContext,
    a = o.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !s.length && !n && !r
        ? (l = t)
        : ((l = {}),
          s.length && s.forEach((u) => Ws(l, u, i, !0)),
          Ws(l, t, i)),
    Re(t) && o.set(t, l),
    l
  );
}
function Ws(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ws(e, o, n, !0), s && s.forEach((i) => Ws(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const a = Wh[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Wh = {
  data: dl,
  props: pl,
  emits: pl,
  methods: Rr,
  computed: Rr,
  beforeCreate: Ye,
  created: Ye,
  beforeMount: Ye,
  mounted: Ye,
  beforeUpdate: Ye,
  updated: Ye,
  beforeDestroy: Ye,
  beforeUnmount: Ye,
  destroyed: Ye,
  unmounted: Ye,
  activated: Ye,
  deactivated: Ye,
  errorCaptured: Ye,
  serverPrefetch: Ye,
  components: Rr,
  directives: Rr,
  watch: qh,
  provide: dl,
  inject: Kh
};
function dl(e, t) {
  return t
    ? e
      ? function () {
          return Be(
            oe(e) ? e.call(this, this) : e,
            oe(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Kh(e, t) {
  return Rr(fi(e), fi(t));
}
function fi(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Rr(e, t) {
  return e ? Be(Object.create(null), e, t) : t;
}
function pl(e, t) {
  return e
    ? ne(e) && ne(t)
      ? [...new Set([...e, ...t])]
      : Be(Object.create(null), Vs(e), Vs(t ?? {}))
    : t;
}
function qh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Be(Object.create(null), e);
  for (const r in t) n[r] = Ye(e[r], t[r]);
  return n;
}
function rf() {
  return {
    app: null,
    config: {
      isNativeTag: Mp,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let Gh = 0;
function Jh(e, t) {
  return function (r, s = null) {
    oe(r) || (r = Be({}, r)), s != null && !Re(s) && (s = null);
    const o = rf(),
      i = new WeakSet(),
      a = [];
    let l = !1;
    const u = (o.app = {
      _uid: Gh++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Pf,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...f) {
        return (
          i.has(c) ||
            (c && oe(c.install)
              ? (i.add(c), c.install(u, ...f))
              : oe(c) && (i.add(c), c(u, ...f))),
          u
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), u;
      },
      component(c, f) {
        return f ? ((o.components[c] = f), u) : o.components[c];
      },
      directive(c, f) {
        return f ? ((o.directives[c] = f), u) : o.directives[c];
      },
      mount(c, f, d) {
        if (!l) {
          const p = u._ceVNode || ue(r, s);
          return (
            (p.appContext = o),
            d === !0 ? (d = 'svg') : d === !1 && (d = void 0),
            f && t ? t(p, c) : e(p, c, d),
            (l = !0),
            (u._container = c),
            (c.__vue_app__ = u),
            bo(p.component)
          );
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l &&
          (Pt(a, u._instance, 16),
          e(null, u._container),
          delete u._container.__vue_app__);
      },
      provide(c, f) {
        return (o.provides[c] = f), u;
      },
      runWithContext(c) {
        const f = In;
        In = u;
        try {
          return c();
        } finally {
          In = f;
        }
      }
    });
    return u;
  };
}
let In = null;
function Tt(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const r = Fe.parent && Fe.parent.provides;
    r === n && (n = Fe.provides = Object.create(r)), (n[e] = t);
  }
}
function Ae(e, t, n = !1) {
  const r = Fe || De;
  if (r || In) {
    const s = In
      ? In._context.provides
      : r
        ? r.parent == null
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && oe(t) ? t.call(r && r.proxy) : t;
  }
}
function sf() {
  return !!(Fe || De || In);
}
const of = {},
  af = () => Object.create(of),
  lf = (e) => Object.getPrototypeOf(e) === of;
function Qh(e, t, n, r = !1) {
  const s = {},
    o = af();
  (e.propsDefaults = Object.create(null)), cf(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Jt(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function Yh(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i }
    } = e,
    a = he(s),
    [l] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (yo(e.emitsOptions, d)) continue;
        const p = t[d];
        if (l)
          if (ve(o, d)) p !== o[d] && ((o[d] = p), (u = !0));
          else {
            const g = et(d);
            s[g] = di(l, a, g, p, e, !1);
          }
        else p !== o[d] && ((o[d] = p), (u = !0));
      }
    }
  } else {
    cf(e, t, s, o) && (u = !0);
    let c;
    for (const f in a)
      (!t || (!ve(t, f) && ((c = en(f)) === f || !ve(t, c)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (s[f] = di(l, a, f, void 0, e, !0))
          : delete s[f]);
    if (o !== a)
      for (const f in o) (!t || !ve(t, f)) && (delete o[f], (u = !0));
  }
  u && qt(e.attrs, 'set', '');
}
function cf(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let l in t) {
      if (Qn(l)) continue;
      const u = t[l];
      let c;
      s && ve(s, (c = et(l)))
        ? !o || !o.includes(c)
          ? (n[c] = u)
          : ((a || (a = {}))[c] = u)
        : yo(e.emitsOptions, l) ||
          ((!(l in r) || u !== r[l]) && ((r[l] = u), (i = !0)));
    }
  if (o) {
    const l = he(n),
      u = a || ge;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = di(s, l, f, u[f], e, !ve(u, f));
    }
  }
  return i;
}
function di(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const a = ve(i, 'default');
    if (a && r === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && oe(l)) {
        const { propsDefaults: u } = s;
        if (n in u) r = u[n];
        else {
          const c = Nn(s);
          (r = u[n] = l.call(null, t)), c();
        }
      } else r = l;
      s.ce && s.ce._setProp(n, r);
    }
    i[0] &&
      (o && !a ? (r = !1) : i[1] && (r === '' || r === en(n)) && (r = !0));
  }
  return r;
}
const Xh = new WeakMap();
function uf(e, t, n = !1) {
  const r = n ? Xh : t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    a = [];
  let l = !1;
  if (!oe(e)) {
    const c = (f) => {
      l = !0;
      const [d, p] = uf(f, t, !0);
      Be(i, d), p && a.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!o && !l) return Re(e) && r.set(e, Gn), Gn;
  if (ne(o))
    for (let c = 0; c < o.length; c++) {
      const f = et(o[c]);
      hl(f) && (i[f] = ge);
    }
  else if (o)
    for (const c in o) {
      const f = et(c);
      if (hl(f)) {
        const d = o[c],
          p = (i[f] = ne(d) || oe(d) ? { type: d } : Be({}, d)),
          g = p.type;
        let y = !1,
          b = !0;
        if (ne(g))
          for (let _ = 0; _ < g.length; ++_) {
            const v = g[_],
              h = oe(v) && v.name;
            if (h === 'Boolean') {
              y = !0;
              break;
            } else h === 'String' && (b = !1);
          }
        else y = oe(g) && g.name === 'Boolean';
        (p[0] = y), (p[1] = b), (y || ve(p, 'default')) && a.push(f);
      }
    }
  const u = [i, a];
  return Re(e) && r.set(e, u), u;
}
function hl(e) {
  return e[0] !== '$' && !Qn(e);
}
const ff = (e) => e[0] === '_' || e === '$stable',
  Sa = (e) => (ne(e) ? e.map(ct) : [ct(e)]),
  Zh = (e, t, n) => {
    if (t._n) return t;
    const r = ie((...s) => Sa(t(...s)), n);
    return (r._c = !1), r;
  },
  df = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (ff(s)) continue;
      const o = e[s];
      if (oe(o)) t[s] = Zh(s, o, r);
      else if (o != null) {
        const i = Sa(o);
        t[s] = () => i;
      }
    }
  },
  pf = (e, t) => {
    const n = Sa(t);
    e.slots.default = () => n;
  },
  hf = (e, t, n) => {
    for (const r in t) (n || r !== '_') && (e[r] = t[r]);
  },
  eg = (e, t, n) => {
    const r = (e.slots = af());
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? (hf(r, t, n), n && ou(r, '_', s, !0)) : df(t, r);
    } else t && pf(e, t);
  },
  tg = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = ge;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (o = !1)
          : hf(s, t, n)
        : ((o = !t.$stable), df(t, s)),
        (i = t);
    } else t && (pf(e, t), (i = { default: 1 }));
    if (o) for (const a in s) !ff(a) && i[a] == null && delete s[a];
  },
  He = xf;
function ng(e) {
  return gf(e);
}
function rg(e) {
  return gf(e, Oh);
}
function gf(e, t) {
  const n = fo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: a,
      createComment: l,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: d,
      setScopeId: p = kt,
      insertStaticContent: g
    } = e,
    y = (
      w,
      S,
      T,
      L = null,
      O = null,
      j = null,
      K = void 0,
      V = null,
      U = !!S.dynamicChildren
    ) => {
      if (w === S) return;
      w && !Ct(w, S) && ((L = I(w)), Se(w, O, j, !0), (w = null)),
        S.patchFlag === -2 && ((U = !1), (S.dynamicChildren = null));
      const { type: H, ref: se, shapeFlag: J } = S;
      switch (H) {
        case $n:
          b(w, S, T, L);
          break;
        case Ne:
          _(w, S, T, L);
          break;
        case Zn:
          w == null && v(S, T, L, K);
          break;
        case Me:
          k(w, S, T, L, O, j, K, V, U);
          break;
        default:
          J & 1
            ? x(w, S, T, L, O, j, K, V, U)
            : J & 6
              ? M(w, S, T, L, O, j, K, V, U)
              : (J & 64 || J & 128) && H.process(w, S, T, L, O, j, K, V, U, Z);
      }
      se != null && O && Wr(se, w && w.ref, j, S || w, !S);
    },
    b = (w, S, T, L) => {
      if (w == null) r((S.el = a(S.children)), T, L);
      else {
        const O = (S.el = w.el);
        S.children !== w.children && u(O, S.children);
      }
    },
    _ = (w, S, T, L) => {
      w == null ? r((S.el = l(S.children || '')), T, L) : (S.el = w.el);
    },
    v = (w, S, T, L) => {
      [w.el, w.anchor] = g(w.children, S, T, L, w.el, w.anchor);
    },
    h = ({ el: w, anchor: S }, T, L) => {
      let O;
      for (; w && w !== S; ) (O = d(w)), r(w, T, L), (w = O);
      r(S, T, L);
    },
    m = ({ el: w, anchor: S }) => {
      let T;
      for (; w && w !== S; ) (T = d(w)), s(w), (w = T);
      s(S);
    },
    x = (w, S, T, L, O, j, K, V, U) => {
      S.type === 'svg' ? (K = 'svg') : S.type === 'math' && (K = 'mathml'),
        w == null ? C(S, T, L, O, j, K, V, U) : R(w, S, O, j, K, V, U);
    },
    C = (w, S, T, L, O, j, K, V) => {
      let U, H;
      const { props: se, shapeFlag: J, transition: te, dirs: le } = w;
      if (
        ((U = w.el = i(w.type, j, se && se.is, se)),
        J & 8
          ? c(U, w.children)
          : J & 16 && N(w.children, U, null, L, O, Lo(w, j), K, V),
        le && Lt(w, null, L, 'created'),
        P(U, w, w.scopeId, K, L),
        se)
      ) {
        for (const ke in se)
          ke !== 'value' && !Qn(ke) && o(U, ke, null, se[ke], j, L);
        'value' in se && o(U, 'value', null, se.value, j),
          (H = se.onVnodeBeforeMount) && rt(H, L, w);
      }
      le && Lt(w, null, L, 'beforeMount');
      const pe = mf(O, te);
      pe && te.beforeEnter(U),
        r(U, S, T),
        ((H = se && se.onVnodeMounted) || pe || le) &&
          He(() => {
            H && rt(H, L, w),
              pe && te.enter(U),
              le && Lt(w, null, L, 'mounted');
          }, O);
    },
    P = (w, S, T, L, O) => {
      if ((T && p(w, T), L)) for (let j = 0; j < L.length; j++) p(w, L[j]);
      if (O) {
        let j = O.subTree;
        if (
          S === j ||
          (qs(j.type) && (j.ssContent === S || j.ssFallback === S))
        ) {
          const K = O.vnode;
          P(w, K, K.scopeId, K.slotScopeIds, O.parent);
        }
      }
    },
    N = (w, S, T, L, O, j, K, V, U = 0) => {
      for (let H = U; H < w.length; H++) {
        const se = (w[H] = V ? fn(w[H]) : ct(w[H]));
        y(null, se, S, T, L, O, j, K, V);
      }
    },
    R = (w, S, T, L, O, j, K) => {
      const V = (S.el = w.el);
      let { patchFlag: U, dynamicChildren: H, dirs: se } = S;
      U |= w.patchFlag & 16;
      const J = w.props || ge,
        te = S.props || ge;
      let le;
      if (
        (T && Cn(T, !1),
        (le = te.onVnodeBeforeUpdate) && rt(le, T, S, w),
        se && Lt(S, w, T, 'beforeUpdate'),
        T && Cn(T, !0),
        ((J.innerHTML && te.innerHTML == null) ||
          (J.textContent && te.textContent == null)) &&
          c(V, ''),
        H
          ? A(w.dynamicChildren, H, V, T, L, Lo(S, O), j)
          : K || B(w, S, V, null, T, L, Lo(S, O), j, !1),
        U > 0)
      ) {
        if (U & 16) D(V, J, te, T, O);
        else if (
          (U & 2 && J.class !== te.class && o(V, 'class', null, te.class, O),
          U & 4 && o(V, 'style', J.style, te.style, O),
          U & 8)
        ) {
          const pe = S.dynamicProps;
          for (let ke = 0; ke < pe.length; ke++) {
            const be = pe[ke],
              it = J[be],
              We = te[be];
            (We !== it || be === 'value') && o(V, be, it, We, O, T);
          }
        }
        U & 1 && w.children !== S.children && c(V, S.children);
      } else !K && H == null && D(V, J, te, T, O);
      ((le = te.onVnodeUpdated) || se) &&
        He(() => {
          le && rt(le, T, S, w), se && Lt(S, w, T, 'updated');
        }, L);
    },
    A = (w, S, T, L, O, j, K) => {
      for (let V = 0; V < S.length; V++) {
        const U = w[V],
          H = S[V],
          se =
            U.el && (U.type === Me || !Ct(U, H) || U.shapeFlag & 70)
              ? f(U.el)
              : T;
        y(U, H, se, null, L, O, j, K, !0);
      }
    },
    D = (w, S, T, L, O) => {
      if (S !== T) {
        if (S !== ge)
          for (const j in S) !Qn(j) && !(j in T) && o(w, j, S[j], null, O, L);
        for (const j in T) {
          if (Qn(j)) continue;
          const K = T[j],
            V = S[j];
          K !== V && j !== 'value' && o(w, j, V, K, O, L);
        }
        'value' in T && o(w, 'value', S.value, T.value, O);
      }
    },
    k = (w, S, T, L, O, j, K, V, U) => {
      const H = (S.el = w ? w.el : a('')),
        se = (S.anchor = w ? w.anchor : a(''));
      let { patchFlag: J, dynamicChildren: te, slotScopeIds: le } = S;
      le && (V = V ? V.concat(le) : le),
        w == null
          ? (r(H, T, L), r(se, T, L), N(S.children || [], T, se, O, j, K, V, U))
          : J > 0 && J & 64 && te && w.dynamicChildren
            ? (A(w.dynamicChildren, te, T, O, j, K, V),
              (S.key != null || (O && S === O.subTree)) && Ca(w, S, !0))
            : B(w, S, T, se, O, j, K, V, U);
    },
    M = (w, S, T, L, O, j, K, V, U) => {
      (S.slotScopeIds = V),
        w == null
          ? S.shapeFlag & 512
            ? O.ctx.activate(S, T, L, K, U)
            : z(S, T, L, O, j, K, U)
          : Q(w, S, U);
    },
    z = (w, S, T, L, O, j, K) => {
      const V = (w.component = Sg(w, L, O));
      if ((rs(w) && (V.ctx.renderer = Z), Cg(V, !1, K), V.asyncDep)) {
        if ((O && O.registerDep(V, $, K), !w.el)) {
          const U = (V.subTree = ue(Ne));
          _(null, U, S, T);
        }
      } else $(V, w, S, T, O, j, K);
    },
    Q = (w, S, T) => {
      const L = (S.component = w.component);
      if (pg(w, S, T))
        if (L.asyncDep && !L.asyncResolved) {
          W(L, S, T);
          return;
        } else (L.next = S), L.update();
      else (S.el = w.el), (L.vnode = S);
    },
    $ = (w, S, T, L, O, j, K) => {
      const V = () => {
        if (w.isMounted) {
          let { next: J, bu: te, u: le, parent: pe, vnode: ke } = w;
          {
            const at = yf(w);
            if (at) {
              J && ((J.el = ke.el), W(w, J, K)),
                at.asyncDep.then(() => {
                  w.isUnmounted || V();
                });
              return;
            }
          }
          let be = J,
            it;
          Cn(w, !1),
            J ? ((J.el = ke.el), W(w, J, K)) : (J = ke),
            te && Ir(te),
            (it = J.props && J.props.onVnodeBeforeUpdate) && rt(it, pe, J, ke),
            Cn(w, !0);
          const We = No(w),
            _t = w.subTree;
          (w.subTree = We),
            y(_t, We, f(_t.el), I(_t), w, O, j),
            (J.el = We.el),
            be === null && vo(w, We.el),
            le && He(le, O),
            (it = J.props && J.props.onVnodeUpdated) &&
              He(() => rt(it, pe, J, ke), O);
        } else {
          let J;
          const { el: te, props: le } = S,
            { bm: pe, m: ke, parent: be, root: it, type: We } = w,
            _t = mn(S);
          if (
            (Cn(w, !1),
            pe && Ir(pe),
            !_t && (J = le && le.onVnodeBeforeMount) && rt(J, be, S),
            Cn(w, !0),
            te && $e)
          ) {
            const at = () => {
              (w.subTree = No(w)), $e(te, w.subTree, w, O, null);
            };
            _t && We.__asyncHydrate ? We.__asyncHydrate(te, w, at) : at();
          } else {
            it.ce && it.ce._injectChildStyle(We);
            const at = (w.subTree = No(w));
            y(null, at, T, L, w, O, j), (S.el = at.el);
          }
          if ((ke && He(ke, O), !_t && (J = le && le.onVnodeMounted))) {
            const at = S;
            He(() => rt(J, be, at), O);
          }
          (S.shapeFlag & 256 ||
            (be && mn(be.vnode) && be.vnode.shapeFlag & 256)) &&
            w.a &&
            He(w.a, O),
            (w.isMounted = !0),
            (S = T = L = null);
        }
      };
      w.scope.on();
      const U = (w.effect = new du(V));
      w.scope.off();
      const H = (w.update = U.run.bind(U)),
        se = (w.job = U.runIfDirty.bind(U));
      (se.i = w), (se.id = w.uid), (U.scheduler = () => va(se)), Cn(w, !0), H();
    },
    W = (w, S, T) => {
      S.component = w;
      const L = w.vnode.props;
      (w.vnode = S),
        (w.next = null),
        Yh(w, S.props, L, T),
        tg(w, S.children, T),
        _n(),
        nl(w),
        xn();
    },
    B = (w, S, T, L, O, j, K, V, U = !1) => {
      const H = w && w.children,
        se = w ? w.shapeFlag : 0,
        J = S.children,
        { patchFlag: te, shapeFlag: le } = S;
      if (te > 0) {
        if (te & 128) {
          _e(H, J, T, L, O, j, K, V, U);
          return;
        } else if (te & 256) {
          ae(H, J, T, L, O, j, K, V, U);
          return;
        }
      }
      le & 8
        ? (se & 16 && Je(H, O, j), J !== H && c(T, J))
        : se & 16
          ? le & 16
            ? _e(H, J, T, L, O, j, K, V, U)
            : Je(H, O, j, !0)
          : (se & 8 && c(T, ''), le & 16 && N(J, T, L, O, j, K, V, U));
    },
    ae = (w, S, T, L, O, j, K, V, U) => {
      (w = w || Gn), (S = S || Gn);
      const H = w.length,
        se = S.length,
        J = Math.min(H, se);
      let te;
      for (te = 0; te < J; te++) {
        const le = (S[te] = U ? fn(S[te]) : ct(S[te]));
        y(w[te], le, T, null, O, j, K, V, U);
      }
      H > se ? Je(w, O, j, !0, !1, J) : N(S, T, L, O, j, K, V, U, J);
    },
    _e = (w, S, T, L, O, j, K, V, U) => {
      let H = 0;
      const se = S.length;
      let J = w.length - 1,
        te = se - 1;
      for (; H <= J && H <= te; ) {
        const le = w[H],
          pe = (S[H] = U ? fn(S[H]) : ct(S[H]));
        if (Ct(le, pe)) y(le, pe, T, null, O, j, K, V, U);
        else break;
        H++;
      }
      for (; H <= J && H <= te; ) {
        const le = w[J],
          pe = (S[te] = U ? fn(S[te]) : ct(S[te]));
        if (Ct(le, pe)) y(le, pe, T, null, O, j, K, V, U);
        else break;
        J--, te--;
      }
      if (H > J) {
        if (H <= te) {
          const le = te + 1,
            pe = le < se ? S[le].el : L;
          for (; H <= te; )
            y(null, (S[H] = U ? fn(S[H]) : ct(S[H])), T, pe, O, j, K, V, U),
              H++;
        }
      } else if (H > te) for (; H <= J; ) Se(w[H], O, j, !0), H++;
      else {
        const le = H,
          pe = H,
          ke = new Map();
        for (H = pe; H <= te; H++) {
          const lt = (S[H] = U ? fn(S[H]) : ct(S[H]));
          lt.key != null && ke.set(lt.key, H);
        }
        let be,
          it = 0;
        const We = te - pe + 1;
        let _t = !1,
          at = 0;
        const vr = new Array(We);
        for (H = 0; H < We; H++) vr[H] = 0;
        for (H = le; H <= J; H++) {
          const lt = w[H];
          if (it >= We) {
            Se(lt, O, j, !0);
            continue;
          }
          let $t;
          if (lt.key != null) $t = ke.get(lt.key);
          else
            for (be = pe; be <= te; be++)
              if (vr[be - pe] === 0 && Ct(lt, S[be])) {
                $t = be;
                break;
              }
          $t === void 0
            ? Se(lt, O, j, !0)
            : ((vr[$t - pe] = H + 1),
              $t >= at ? (at = $t) : (_t = !0),
              y(lt, S[$t], T, null, O, j, K, V, U),
              it++);
        }
        const Ya = _t ? sg(vr) : Gn;
        for (be = Ya.length - 1, H = We - 1; H >= 0; H--) {
          const lt = pe + H,
            $t = S[lt],
            Xa = lt + 1 < se ? S[lt + 1].el : L;
          vr[H] === 0
            ? y(null, $t, T, Xa, O, j, K, V, U)
            : _t && (be < 0 || H !== Ya[be] ? xe($t, T, Xa, 2) : be--);
        }
      }
    },
    xe = (w, S, T, L, O = null) => {
      const { el: j, type: K, transition: V, children: U, shapeFlag: H } = w;
      if (H & 6) {
        xe(w.component.subTree, S, T, L);
        return;
      }
      if (H & 128) {
        w.suspense.move(S, T, L);
        return;
      }
      if (H & 64) {
        K.move(w, S, T, Z);
        return;
      }
      if (K === Me) {
        r(j, S, T);
        for (let J = 0; J < U.length; J++) xe(U[J], S, T, L);
        r(w.anchor, S, T);
        return;
      }
      if (K === Zn) {
        h(w, S, T);
        return;
      }
      if (L !== 2 && H & 1 && V)
        if (L === 0) V.beforeEnter(j), r(j, S, T), He(() => V.enter(j), O);
        else {
          const { leave: J, delayLeave: te, afterLeave: le } = V,
            pe = () => r(j, S, T),
            ke = () => {
              J(j, () => {
                pe(), le && le();
              });
            };
          te ? te(j, pe, ke) : ke();
        }
      else r(j, S, T);
    },
    Se = (w, S, T, L = !1, O = !1) => {
      const {
        type: j,
        props: K,
        ref: V,
        children: U,
        dynamicChildren: H,
        shapeFlag: se,
        patchFlag: J,
        dirs: te,
        cacheIndex: le
      } = w;
      if (
        (J === -2 && (O = !1),
        V != null && Wr(V, null, T, w, !0),
        le != null && (S.renderCache[le] = void 0),
        se & 256)
      ) {
        S.ctx.deactivate(w);
        return;
      }
      const pe = se & 1 && te,
        ke = !mn(w);
      let be;
      if ((ke && (be = K && K.onVnodeBeforeUnmount) && rt(be, S, w), se & 6))
        rn(w.component, T, L);
      else {
        if (se & 128) {
          w.suspense.unmount(T, L);
          return;
        }
        pe && Lt(w, null, S, 'beforeUnmount'),
          se & 64
            ? w.type.remove(w, S, T, Z, L)
            : H && !H.hasOnce && (j !== Me || (J > 0 && J & 64))
              ? Je(H, S, T, !1, !0)
              : ((j === Me && J & 384) || (!O && se & 16)) && Je(U, S, T),
          L && wt(w);
      }
      ((ke && (be = K && K.onVnodeUnmounted)) || pe) &&
        He(() => {
          be && rt(be, S, w), pe && Lt(w, null, S, 'unmounted');
        }, T);
    },
    wt = (w) => {
      const { type: S, el: T, anchor: L, transition: O } = w;
      if (S === Me) {
        It(T, L);
        return;
      }
      if (S === Zn) {
        m(w);
        return;
      }
      const j = () => {
        s(T), O && !O.persisted && O.afterLeave && O.afterLeave();
      };
      if (w.shapeFlag & 1 && O && !O.persisted) {
        const { leave: K, delayLeave: V } = O,
          U = () => K(T, j);
        V ? V(w.el, j, U) : U();
      } else j();
    },
    It = (w, S) => {
      let T;
      for (; w !== S; ) (T = d(w)), s(w), (w = T);
      s(S);
    },
    rn = (w, S, T) => {
      const { bum: L, scope: O, job: j, subTree: K, um: V, m: U, a: H } = w;
      Ks(U),
        Ks(H),
        L && Ir(L),
        O.stop(),
        j && ((j.flags |= 8), Se(K, w, S, T)),
        V && He(V, S),
        He(() => {
          w.isUnmounted = !0;
        }, S),
        S &&
          S.pendingBranch &&
          !S.isUnmounted &&
          w.asyncDep &&
          !w.asyncResolved &&
          w.suspenseId === S.pendingId &&
          (S.deps--, S.deps === 0 && S.resolve());
    },
    Je = (w, S, T, L = !1, O = !1, j = 0) => {
      for (let K = j; K < w.length; K++) Se(w[K], S, T, L, O);
    },
    I = (w) => {
      if (w.shapeFlag & 6) return I(w.component.subTree);
      if (w.shapeFlag & 128) return w.suspense.next();
      const S = d(w.anchor || w.el),
        T = S && S[Mu];
      return T ? d(T) : S;
    };
  let Y = !1;
  const q = (w, S, T) => {
      w == null
        ? S._vnode && Se(S._vnode, null, null, !0)
        : y(S._vnode || null, w, S, null, null, null, T),
        (S._vnode = w),
        Y || ((Y = !0), nl(), Us(), (Y = !1));
    },
    Z = { p: y, um: Se, m: xe, r: wt, mt: z, mc: N, pc: B, pbc: A, n: I, o: e };
  let me, $e;
  return (
    t && ([me, $e] = t(Z)), { render: q, hydrate: me, createApp: Jh(q, me) }
  );
}
function Lo({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : n;
}
function Cn({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function mf(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ca(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (ne(r) && ne(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let a = s[o];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[o] = fn(s[o])), (a.el = i.el)),
        !n && a.patchFlag !== -2 && Ca(i, a)),
        a.type === $n && (a.el = i.el);
    }
}
function sg(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (a = (o + i) >> 1), e[n[a]] < u ? (o = a + 1) : (i = a);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
function yf(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : yf(t);
}
function Ks(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const og = Symbol.for('v-scx'),
  ig = () => Ae(og);
function jt(e, t) {
  return mo(e, null, t);
}
function ag(e, t) {
  return mo(e, null, { flush: 'sync' });
}
function Pe(e, t, n) {
  return mo(e, t, n);
}
function mo(e, t, n = ge) {
  const { immediate: r, deep: s, flush: o, once: i } = n,
    a = Be({}, n),
    l = (t && r) || (!t && o !== 'post');
  let u;
  if (sr) {
    if (o === 'sync') {
      const p = ig();
      u = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!l) {
      const p = () => {};
      return (p.stop = kt), (p.resume = kt), (p.pause = kt), p;
    }
  }
  const c = Fe;
  a.call = (p, g, y) => Pt(p, c, g, y);
  let f = !1;
  o === 'post'
    ? (a.scheduler = (p) => {
        He(p, c && c.suspense);
      })
    : o !== 'sync' &&
      ((f = !0),
      (a.scheduler = (p, g) => {
        g ? p() : va(p);
      })),
    (a.augmentJob = (p) => {
      t && (p.flags |= 4),
        f && ((p.flags |= 2), c && ((p.id = c.uid), (p.i = c)));
    });
  const d = wh(e, t, a);
  return sr && (u ? u.push(d) : l && d()), d;
}
function lg(e, t, n) {
  const r = this.proxy,
    s = Ie(e) ? (e.includes('.') ? vf(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  oe(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Nn(this),
    a = mo(s, o.bind(r), n);
  return i(), a;
}
function vf(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function fk(e, t, n = ge) {
  const r = Ve(),
    s = et(t),
    o = en(t),
    i = bf(e, s),
    a = ya((l, u) => {
      let c,
        f = ge,
        d;
      return (
        ag(() => {
          const p = e[s];
          st(c, p) && ((c = p), u());
        }),
        {
          get() {
            return l(), n.get ? n.get(c) : c;
          },
          set(p) {
            const g = n.set ? n.set(p) : p;
            if (!st(g, c) && !(f !== ge && st(p, f))) return;
            const y = r.vnode.props;
            (y &&
              (t in y || s in y || o in y) &&
              (`onUpdate:${t}` in y ||
                `onUpdate:${s}` in y ||
                `onUpdate:${o}` in y)) ||
              ((c = p), u()),
              r.emit(`update:${t}`, g),
              st(p, g) && st(p, f) && !st(g, d) && u(),
              (f = p),
              (d = g);
          }
        }
      );
    });
  return (
    (a[Symbol.iterator] = () => {
      let l = 0;
      return {
        next() {
          return l < 2 ? { value: l++ ? i || ge : a, done: !1 } : { done: !0 };
        }
      };
    }),
    a
  );
}
const bf = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${et(t)}Modifiers`] || e[`${en(t)}Modifiers`];
function cg(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ge;
  let s = n;
  const o = t.startsWith('update:'),
    i = o && bf(r, t.slice(7));
  i &&
    (i.trim && (s = n.map((c) => (Ie(c) ? c.trim() : c))),
    i.number && (s = n.map(Dp)));
  let a,
    l = r[(a = Es(t))] || r[(a = Es(et(t)))];
  !l && o && (l = r[(a = Es(en(t)))]), l && Pt(l, e, 6, s);
  const u = r[a + 'Once'];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Pt(u, e, 6, s);
  }
}
function wf(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    a = !1;
  if (!oe(e)) {
    const l = (u) => {
      const c = wf(u, t, !0);
      c && ((a = !0), Be(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !o && !a
    ? (Re(e) && r.set(e, null), null)
    : (ne(o) ? o.forEach((l) => (i[l] = null)) : Be(i, o),
      Re(e) && r.set(e, i),
      i);
}
function yo(e, t) {
  return !e || !Zr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ve(e, t[0].toLowerCase() + t.slice(1)) || ve(e, en(t)) || ve(e, t));
}
function No(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [o],
      slots: i,
      attrs: a,
      emit: l,
      render: u,
      renderCache: c,
      props: f,
      data: d,
      setupState: p,
      ctx: g,
      inheritAttrs: y
    } = e,
    b = zs(e);
  let _, v;
  try {
    if (n.shapeFlag & 4) {
      const m = s || r,
        x = m;
      (_ = ct(u.call(x, m, c, f, p, d, g))), (v = a);
    } else {
      const m = t;
      (_ = ct(
        m.length > 1 ? m(f, { attrs: a, slots: i, emit: l }) : m(f, null)
      )),
        (v = t.props ? a : fg(a));
    }
  } catch (m) {
    (jr.length = 0), lr(m, e, 1), (_ = ue(Ne));
  }
  let h = _;
  if (v && y !== !1) {
    const m = Object.keys(v),
      { shapeFlag: x } = h;
    m.length &&
      x & 7 &&
      (o && m.some(ia) && (v = dg(v, o)), (h = Ht(h, v, !1, !0)));
  }
  return (
    n.dirs &&
      ((h = Ht(h, null, !1, !0)),
      (h.dirs = h.dirs ? h.dirs.concat(n.dirs) : n.dirs)),
    n.transition && nr(h, n.transition),
    (_ = h),
    zs(b),
    _
  );
}
function ug(e, t = !0) {
  let n;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (Mn(s)) {
      if (s.type !== Ne || s.children === 'v-if') {
        if (n) return;
        n = s;
      }
    } else return;
  }
  return n;
}
const fg = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || Zr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  dg = (e, t) => {
    const n = {};
    for (const r in e) (!ia(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function pg(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: a, patchFlag: l } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? gl(r, i, u) : !!i;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (i[d] !== r[d] && !yo(u, d)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : r === i
        ? !1
        : r
          ? i
            ? gl(r, i, u)
            : !0
          : !!i;
  return !1;
}
function gl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !yo(n, o)) return !0;
  }
  return !1;
}
function vo({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const qs = (e) => e.__isSuspense;
let pi = 0;
const hg = {
    name: 'Suspense',
    __isSuspense: !0,
    process(e, t, n, r, s, o, i, a, l, u) {
      if (e == null) gg(t, n, r, s, o, i, a, l, u);
      else {
        if (o && o.deps > 0 && !e.suspense.isInFallback) {
          (t.suspense = e.suspense), (t.suspense.vnode = t), (t.el = e.el);
          return;
        }
        mg(e, t, n, r, s, i, a, l, u);
      }
    },
    hydrate: yg,
    normalize: vg
  },
  ka = hg;
function Kr(e, t) {
  const n = e.props && e.props[t];
  oe(n) && n();
}
function gg(e, t, n, r, s, o, i, a, l) {
  const {
      p: u,
      o: { createElement: c }
    } = l,
    f = c('div'),
    d = (e.suspense = _f(e, s, r, t, f, n, o, i, a, l));
  u(null, (d.pendingBranch = e.ssContent), f, null, r, d, o, i),
    d.deps > 0
      ? (Kr(e, 'onPending'),
        Kr(e, 'onFallback'),
        u(null, e.ssFallback, t, n, r, null, o, i),
        Xn(d, e.ssFallback))
      : d.resolve(!1, !0);
}
function mg(e, t, n, r, s, o, i, a, { p: l, um: u, o: { createElement: c } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const d = t.ssContent,
    p = t.ssFallback,
    { activeBranch: g, pendingBranch: y, isInFallback: b, isHydrating: _ } = f;
  if (y)
    (f.pendingBranch = d),
      Ct(d, y)
        ? (l(y, d, f.hiddenContainer, null, s, f, o, i, a),
          f.deps <= 0
            ? f.resolve()
            : b && (_ || (l(g, p, n, r, s, null, o, i, a), Xn(f, p))))
        : ((f.pendingId = pi++),
          _ ? ((f.isHydrating = !1), (f.activeBranch = y)) : u(y, s, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = c('div')),
          b
            ? (l(null, d, f.hiddenContainer, null, s, f, o, i, a),
              f.deps <= 0
                ? f.resolve()
                : (l(g, p, n, r, s, null, o, i, a), Xn(f, p)))
            : g && Ct(d, g)
              ? (l(g, d, n, r, s, f, o, i, a), f.resolve(!0))
              : (l(null, d, f.hiddenContainer, null, s, f, o, i, a),
                f.deps <= 0 && f.resolve()));
  else if (g && Ct(d, g)) l(g, d, n, r, s, f, o, i, a), Xn(f, d);
  else if (
    (Kr(t, 'onPending'),
    (f.pendingBranch = d),
    d.shapeFlag & 512
      ? (f.pendingId = d.component.suspenseId)
      : (f.pendingId = pi++),
    l(null, d, f.hiddenContainer, null, s, f, o, i, a),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: v, pendingId: h } = f;
    v > 0
      ? setTimeout(() => {
          f.pendingId === h && f.fallback(p);
        }, v)
      : v === 0 && f.fallback(p);
  }
}
function _f(e, t, n, r, s, o, i, a, l, u, c = !1) {
  const {
    p: f,
    m: d,
    um: p,
    n: g,
    o: { parentNode: y, remove: b }
  } = u;
  let _;
  const v = bg(e);
  v && t && t.pendingBranch && ((_ = t.pendingId), t.deps++);
  const h = e.props ? iu(e.props.timeout) : void 0,
    m = o,
    x = {
      vnode: e,
      parent: t,
      parentComponent: n,
      namespace: i,
      container: r,
      hiddenContainer: s,
      deps: 0,
      pendingId: pi++,
      timeout: typeof h == 'number' ? h : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !c,
      isHydrating: c,
      isUnmounted: !1,
      effects: [],
      resolve(C = !1, P = !1) {
        const {
          vnode: N,
          activeBranch: R,
          pendingBranch: A,
          pendingId: D,
          effects: k,
          parentComponent: M,
          container: z
        } = x;
        let Q = !1;
        x.isHydrating
          ? (x.isHydrating = !1)
          : C ||
            ((Q = R && A.transition && A.transition.mode === 'out-in'),
            Q &&
              (R.transition.afterLeave = () => {
                D === x.pendingId && (d(A, z, o === m ? g(R) : o, 0), Bs(k));
              }),
            R && (y(R.el) === z && (o = g(R)), p(R, M, x, !0)),
            Q || d(A, z, o, 0)),
          Xn(x, A),
          (x.pendingBranch = null),
          (x.isInFallback = !1);
        let $ = x.parent,
          W = !1;
        for (; $; ) {
          if ($.pendingBranch) {
            $.effects.push(...k), (W = !0);
            break;
          }
          $ = $.parent;
        }
        !W && !Q && Bs(k),
          (x.effects = []),
          v &&
            t &&
            t.pendingBranch &&
            _ === t.pendingId &&
            (t.deps--, t.deps === 0 && !P && t.resolve()),
          Kr(N, 'onResolve');
      },
      fallback(C) {
        if (!x.pendingBranch) return;
        const {
          vnode: P,
          activeBranch: N,
          parentComponent: R,
          container: A,
          namespace: D
        } = x;
        Kr(P, 'onFallback');
        const k = g(N),
          M = () => {
            x.isInFallback && (f(null, C, A, k, R, null, D, a, l), Xn(x, C));
          },
          z = C.transition && C.transition.mode === 'out-in';
        z && (N.transition.afterLeave = M),
          (x.isInFallback = !0),
          p(N, R, null, !0),
          z || M();
      },
      move(C, P, N) {
        x.activeBranch && d(x.activeBranch, C, P, N), (x.container = C);
      },
      next() {
        return x.activeBranch && g(x.activeBranch);
      },
      registerDep(C, P, N) {
        const R = !!x.pendingBranch;
        R && x.deps++;
        const A = C.vnode.el;
        C.asyncDep
          .catch((D) => {
            lr(D, C, 0);
          })
          .then((D) => {
            if (C.isUnmounted || x.isUnmounted || x.pendingId !== C.suspenseId)
              return;
            C.asyncResolved = !0;
            const { vnode: k } = C;
            mi(C, D), A && (k.el = A);
            const M = !A && C.subTree.el;
            P(C, k, y(A || C.subTree.el), A ? null : g(C.subTree), x, i, N),
              M && b(M),
              vo(C, k.el),
              R && --x.deps === 0 && x.resolve();
          });
      },
      unmount(C, P) {
        (x.isUnmounted = !0),
          x.activeBranch && p(x.activeBranch, n, C, P),
          x.pendingBranch && p(x.pendingBranch, n, C, P);
      }
    };
  return x;
}
function yg(e, t, n, r, s, o, i, a, l) {
  const u = (t.suspense = _f(
      t,
      r,
      n,
      e.parentNode,
      document.createElement('div'),
      null,
      s,
      o,
      i,
      a,
      !0
    )),
    c = l(e, (u.pendingBranch = t.ssContent), n, u, o, i);
  return u.deps === 0 && u.resolve(!1, !0), c;
}
function vg(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = ml(r ? n.default : n)),
    (e.ssFallback = r ? ml(n.fallback) : ue(Ne));
}
function ml(e) {
  let t;
  if (oe(e)) {
    const n = rr && e._c;
    n && ((e._d = !1), G()), (e = e()), n && ((e._d = !0), (t = ot), Sf());
  }
  return (
    ne(e) && (e = ug(e)),
    (e = ct(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function xf(e, t) {
  t && t.pendingBranch
    ? ne(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Bs(e);
}
function Xn(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e;
  let s = t.el;
  for (; !s && t.component; ) (t = t.component.subTree), (s = t.el);
  (n.el = s), r && r.subTree === n && ((r.vnode.el = s), vo(r, s));
}
function bg(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const Me = Symbol.for('v-fgt'),
  $n = Symbol.for('v-txt'),
  Ne = Symbol.for('v-cmt'),
  Zn = Symbol.for('v-stc'),
  jr = [];
let ot = null;
function G(e = !1) {
  jr.push((ot = e ? null : []));
}
function Sf() {
  jr.pop(), (ot = jr[jr.length - 1] || null);
}
let rr = 1;
function yl(e, t = !1) {
  (rr += e), e < 0 && ot && t && (ot.hasOnce = !0);
}
function Cf(e) {
  return (
    (e.dynamicChildren = rr > 0 ? ot || Gn : null),
    Sf(),
    rr > 0 && ot && ot.push(e),
    e
  );
}
function ut(e, t, n, r, s, o) {
  return Cf(hn(e, t, n, r, s, o, !0));
}
function ee(e, t, n, r, s) {
  return Cf(ue(e, t, n, r, s, !0));
}
function Mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const kf = ({ key: e }) => e ?? null,
  As = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? Ie(e) || Te(e) || oe(e)
        ? { i: De, r: e, k: t, f: !!n }
        : e
      : null
  );
function hn(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Me ? 0 : 1,
  i = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && kf(t),
    ref: t && As(t),
    scopeId: $u,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: De
  };
  return (
    a
      ? (Ea(l, n), o & 128 && e.normalize(l))
      : n && (l.shapeFlag |= Ie(n) ? 8 : 16),
    rr > 0 &&
      !i &&
      ot &&
      (l.patchFlag > 0 || o & 6) &&
      l.patchFlag !== 32 &&
      ot.push(l),
    l
  );
}
const ue = wg;
function wg(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === Qu) && (e = Ne), Mn(e))) {
    const a = Ht(e, t, !0);
    return (
      n && Ea(a, n),
      rr > 0 &&
        !o &&
        ot &&
        (a.shapeFlag & 6 ? (ot[ot.indexOf(e)] = a) : ot.push(a)),
      (a.patchFlag = -2),
      a
    );
  }
  if ((Tg(e) && (e = e.__vccOpts), t)) {
    t = ur(t);
    let { class: a, style: l } = t;
    a && !Ie(a) && (t.class = Ue(a)),
      Re(l) && (ma(l) && !ne(l) && (l = Be({}, l)), (t.style = wn(l)));
  }
  const i = Ie(e) ? 1 : qs(e) ? 128 : Lu(e) ? 64 : Re(e) ? 4 : oe(e) ? 2 : 0;
  return hn(e, t, n, r, s, i, o, !0);
}
function ur(e) {
  return e ? (ma(e) || lf(e) ? Be({}, e) : e) : null;
}
function Ht(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: a, transition: l } = e,
    u = t ? we(s || {}, t) : s,
    c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: u,
      key: u && kf(u),
      ref:
        t && t.ref
          ? n && o
            ? ne(o)
              ? o.concat(As(t))
              : [o, As(t)]
            : As(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: a,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Me ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: l,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Ht(e.ssContent),
      ssFallback: e.ssFallback && Ht(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
  return l && r && nr(c, l.clone(c)), c;
}
function Ln(e = ' ', t = 0) {
  return ue($n, null, e, t);
}
function dk(e, t) {
  const n = ue(Zn, null, e);
  return (n.staticCount = t), n;
}
function Le(e = '', t = !1) {
  return t ? (G(), ee(Ne, null, e)) : ue(Ne, null, e);
}
function ct(e) {
  return e == null || typeof e == 'boolean'
    ? ue(Ne)
    : ne(e)
      ? ue(Me, null, e.slice())
      : Mn(e)
        ? fn(e)
        : ue($n, null, String(e));
}
function fn(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ht(e);
}
function Ea(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (ne(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ea(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !lf(t)
        ? (t._ctx = De)
        : s === 3 &&
          De &&
          (De.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    oe(t)
      ? ((t = { default: t, _ctx: De }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ln(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function we(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = Ue([t.class, r.class]));
      else if (s === 'style') t.style = wn([t.style, r.style]);
      else if (Zr(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(ne(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function rt(e, t, n, r = null) {
  Pt(e, t, 7, [n, r]);
}
const _g = rf();
let xg = 0;
function Sg(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || _g,
    o = {
      uid: xg++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new uu(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: uf(r, s),
      emitsOptions: wf(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: r.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = cg.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Fe = null;
const Ve = () => Fe || De;
let Gs, hi;
{
  const e = fo(),
    t = (n, r) => {
      let s;
      return (
        (s = e[n]) || (s = e[n] = []),
        s.push(r),
        (o) => {
          s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
        }
      );
    };
  (Gs = t('__VUE_INSTANCE_SETTERS__', (n) => (Fe = n))),
    (hi = t('__VUE_SSR_SETTERS__', (n) => (sr = n)));
}
const Nn = (e) => {
    const t = Fe;
    return (
      Gs(e),
      e.scope.on(),
      () => {
        e.scope.off(), Gs(t);
      }
    );
  },
  gi = () => {
    Fe && Fe.scope.off(), Gs(null);
  };
function Ef(e) {
  return e.vnode.shapeFlag & 4;
}
let sr = !1;
function Cg(e, t = !1, n = !1) {
  t && hi(t);
  const { props: r, children: s } = e.vnode,
    o = Ef(e);
  Qh(e, r, o, t), eg(e, s, n);
  const i = o ? kg(e, t) : void 0;
  return t && hi(!1), i;
}
function kg(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Bh));
  const { setup: r } = n;
  if (r) {
    _n();
    const s = (e.setupContext = r.length > 1 ? Af(e) : null),
      o = Nn(e),
      i = ns(r, e, 0, [e.props, s]),
      a = la(i);
    if ((xn(), o(), (a || e.sp) && !mn(e) && ba(e), a)) {
      if ((i.then(gi, gi), t))
        return i
          .then((l) => {
            mi(e, l);
          })
          .catch((l) => {
            lr(l, e, 0);
          });
      e.asyncDep = i;
    } else mi(e, i);
  } else Tf(e);
}
function mi(e, t, n) {
  oe(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Re(t) && (e.setupState = Au(t)),
    Tf(e);
}
function Tf(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || kt);
  {
    const s = Nn(e);
    _n();
    try {
      zh(e);
    } finally {
      xn(), s();
    }
  }
}
const Eg = {
  get(e, t) {
    return Ke(e, 'get', ''), e[t];
  }
};
function Af(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Eg),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function bo(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(Au(Eu(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Nr) return Nr[n](e);
          },
          has(t, n) {
            return n in t || n in Nr;
          }
        }))
    : e.proxy;
}
function yi(e, t = !0) {
  return oe(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Tg(e) {
  return oe(e) && '__vccOpts' in e;
}
const F = (e, t) => vh(e, t, sr);
function Ce(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Re(t) && !ne(t)
      ? Mn(t)
        ? ue(e, null, [t])
        : ue(e, t)
      : ue(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Mn(n) && (n = [n]),
      ue(e, t, n));
}
const Pf = '3.5.13';
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let vi;
const vl = typeof window < 'u' && window.trustedTypes;
if (vl)
  try {
    vi = vl.createPolicy('vue', { createHTML: (e) => e });
  } catch {}
const Rf = vi ? (e) => vi.createHTML(e) : (e) => e,
  Ag = 'http://www.w3.org/2000/svg',
  Pg = 'http://www.w3.org/1998/Math/MathML',
  Wt = typeof document < 'u' ? document : null,
  bl = Wt && Wt.createElement('template'),
  Rg = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s =
        t === 'svg'
          ? Wt.createElementNS(Ag, e)
          : t === 'mathml'
            ? Wt.createElementNS(Pg, e)
            : n
              ? Wt.createElement(e, { is: n })
              : Wt.createElement(e);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: (e) => Wt.createTextNode(e),
    createComment: (e) => Wt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Wt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        bl.innerHTML = Rf(
          r === 'svg'
            ? `<svg>${e}</svg>`
            : r === 'mathml'
              ? `<math>${e}</math>`
              : e
        );
        const a = bl.content;
        if (r === 'svg' || r === 'mathml') {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ];
    }
  },
  on = 'transition',
  wr = 'animation',
  qr = Symbol('_vtc'),
  Of = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  Og = Be({}, Fu, Of),
  Ig = (e) => ((e.displayName = 'Transition'), (e.props = Og), e),
  $g = Ig((e, { slots: t }) => Ce(Th, Mg(e), t)),
  kn = (e, t = []) => {
    ne(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  wl = (e) => (e ? (ne(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Mg(e) {
  const t = {};
  for (const k in e) k in Of || (t[k] = e[k]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: s,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = o,
      appearActiveClass: u = i,
      appearToClass: c = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: p = `${n}-leave-to`
    } = e,
    g = Lg(s),
    y = g && g[0],
    b = g && g[1],
    {
      onBeforeEnter: _,
      onEnter: v,
      onEnterCancelled: h,
      onLeave: m,
      onLeaveCancelled: x,
      onBeforeAppear: C = _,
      onAppear: P = v,
      onAppearCancelled: N = h
    } = t,
    R = (k, M, z, Q) => {
      (k._enterCancelled = Q), En(k, M ? c : a), En(k, M ? u : i), z && z();
    },
    A = (k, M) => {
      (k._isLeaving = !1), En(k, f), En(k, p), En(k, d), M && M();
    },
    D = (k) => (M, z) => {
      const Q = k ? P : v,
        $ = () => R(M, k, z);
      kn(Q, [M, $]),
        _l(() => {
          En(M, k ? l : o), Bt(M, k ? c : a), wl(Q) || xl(M, r, y, $);
        });
    };
  return Be(t, {
    onBeforeEnter(k) {
      kn(_, [k]), Bt(k, o), Bt(k, i);
    },
    onBeforeAppear(k) {
      kn(C, [k]), Bt(k, l), Bt(k, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave(k, M) {
      k._isLeaving = !0;
      const z = () => A(k, M);
      Bt(k, f),
        k._enterCancelled ? (Bt(k, d), kl()) : (kl(), Bt(k, d)),
        _l(() => {
          k._isLeaving && (En(k, f), Bt(k, p), wl(m) || xl(k, r, b, z));
        }),
        kn(m, [k, z]);
    },
    onEnterCancelled(k) {
      R(k, !1, void 0, !0), kn(h, [k]);
    },
    onAppearCancelled(k) {
      R(k, !0, void 0, !0), kn(N, [k]);
    },
    onLeaveCancelled(k) {
      A(k), kn(x, [k]);
    }
  });
}
function Lg(e) {
  if (e == null) return null;
  if (Re(e)) return [jo(e.enter), jo(e.leave)];
  {
    const t = jo(e);
    return [t, t];
  }
}
function jo(e) {
  return iu(e);
}
function Bt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[qr] || (e[qr] = new Set())).add(t);
}
function En(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[qr];
  n && (n.delete(t), n.size || (e[qr] = void 0));
}
function _l(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ng = 0;
function xl(e, t, n, r) {
  const s = (e._endId = ++Ng),
    o = () => {
      s === e._endId && r();
    };
  if (n != null) return setTimeout(o, n);
  const { type: i, timeout: a, propCount: l } = jg(e, t);
  if (!i) return r();
  const u = i + 'end';
  let c = 0;
  const f = () => {
      e.removeEventListener(u, d), o();
    },
    d = (p) => {
      p.target === e && ++c >= l && f();
    };
  setTimeout(() => {
    c < l && f();
  }, a + 1),
    e.addEventListener(u, d);
}
function jg(e, t) {
  const n = window.getComputedStyle(e),
    r = (g) => (n[g] || '').split(', '),
    s = r(`${on}Delay`),
    o = r(`${on}Duration`),
    i = Sl(s, o),
    a = r(`${wr}Delay`),
    l = r(`${wr}Duration`),
    u = Sl(a, l);
  let c = null,
    f = 0,
    d = 0;
  t === on
    ? i > 0 && ((c = on), (f = i), (d = o.length))
    : t === wr
      ? u > 0 && ((c = wr), (f = u), (d = l.length))
      : ((f = Math.max(i, u)),
        (c = f > 0 ? (i > u ? on : wr) : null),
        (d = c ? (c === on ? o.length : l.length) : 0));
  const p =
    c === on && /\b(transform|all)(,|$)/.test(r(`${on}Property`).toString());
  return { type: c, timeout: f, propCount: d, hasTransform: p };
}
function Sl(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Cl(n) + Cl(e[r])));
}
function Cl(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function kl() {
  return document.body.offsetHeight;
}
function Hg(e, t, n) {
  const r = e[qr];
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
        ? e.setAttribute('class', t)
        : (e.className = t);
}
const Js = Symbol('_vod'),
  If = Symbol('_vsh'),
  Fg = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[Js] = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : _r(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), _r(e, !0), r.enter(e))
            : r.leave(e, () => {
                _r(e, !1);
              })
          : _r(e, t));
    },
    beforeUnmount(e, { value: t }) {
      _r(e, t);
    }
  };
function _r(e, t) {
  (e.style.display = t ? e[Js] : 'none'), (e[If] = !t);
}
const $f = Symbol('');
function pk(e) {
  const t = Ve();
  if (!t) return;
  const n = (t.ut = (s = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((o) => Qs(o, s));
    }),
    r = () => {
      const s = e(t.proxy);
      t.ce ? Qs(t.ce, s) : bi(t.subTree, s), n(s);
    };
  Ku(() => {
    Bs(r);
  }),
    dt(() => {
      Pe(r, kt, { flush: 'post' });
      const s = new MutationObserver(r);
      s.observe(t.subTree.el.parentNode, { childList: !0 }),
        Hn(() => s.disconnect());
    });
}
function bi(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          bi(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) Qs(e.el, t);
  else if (e.type === Me) e.children.forEach((n) => bi(n, t));
  else if (e.type === Zn) {
    let { el: n, anchor: r } = e;
    for (; n && (Qs(n, t), n !== r); ) n = n.nextSibling;
  }
}
function Qs(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let r = '';
    for (const s in t) n.setProperty(`--${s}`, t[s]), (r += `--${s}: ${t[s]};`);
    n[$f] = r;
  }
}
const Dg = /(^|;)\s*display\s*:/;
function Bg(e, t, n) {
  const r = e.style,
    s = Ie(n);
  let o = !1;
  if (n && !s) {
    if (t)
      if (Ie(t))
        for (const i of t.split(';')) {
          const a = i.slice(0, i.indexOf(':')).trim();
          n[a] == null && Ps(r, a, '');
        }
      else for (const i in t) n[i] == null && Ps(r, i, '');
    for (const i in n) i === 'display' && (o = !0), Ps(r, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = r[$f];
      i && (n += ';' + i), (r.cssText = n), (o = Dg.test(n));
    }
  } else t && e.removeAttribute('style');
  Js in e && ((e[Js] = o ? r.display : ''), e[If] && (r.display = 'none'));
}
const El = /\s*!important$/;
function Ps(e, t, n) {
  if (ne(n)) n.forEach((r) => Ps(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = Ug(e, t);
    El.test(n)
      ? e.setProperty(en(r), n.replace(El, ''), 'important')
      : (e[r] = n);
  }
}
const Tl = ['Webkit', 'Moz', 'ms'],
  Ho = {};
function Ug(e, t) {
  const n = Ho[t];
  if (n) return n;
  let r = et(t);
  if (r !== 'filter' && r in e) return (Ho[t] = r);
  r = uo(r);
  for (let s = 0; s < Tl.length; s++) {
    const o = Tl[s] + r;
    if (o in e) return (Ho[t] = o);
  }
  return t;
}
const Al = 'http://www.w3.org/1999/xlink';
function Pl(e, t, n, r, s, o = Kp(t)) {
  r && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(Al, t.slice(6, t.length))
      : e.setAttributeNS(Al, t, n)
    : n == null || (o && !au(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? '' : Zt(n) ? String(n) : n);
}
function Rl(e, t, n, r, s) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? Rf(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === 'value' && o !== 'PROGRESS' && !o.includes('-')) {
    const a = o === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      l = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
    (a !== l || !('_value' in e)) && (e.value = l),
      n == null && e.removeAttribute(t),
      (e._value = n);
    return;
  }
  let i = !1;
  if (n === '' || n == null) {
    const a = typeof e[t];
    a === 'boolean'
      ? (n = au(n))
      : n == null && a === 'string'
        ? ((n = ''), (i = !0))
        : a === 'number' && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(s || t);
}
function zg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Vg(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ol = Symbol('_vei');
function Wg(e, t, n, r, s = null) {
  const o = e[Ol] || (e[Ol] = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [a, l] = Kg(t);
    if (r) {
      const u = (o[t] = Jg(r, s));
      zg(e, a, u, l);
    } else i && (Vg(e, a, i, l), (o[t] = void 0));
  }
}
const Il = /(?:Once|Passive|Capture)$/;
function Kg(e) {
  let t;
  if (Il.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Il)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : en(e.slice(2)), t];
}
let Fo = 0;
const qg = Promise.resolve(),
  Gg = () => Fo || (qg.then(() => (Fo = 0)), (Fo = Date.now()));
function Jg(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Pt(Qg(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Gg()), n;
}
function Qg(e, t) {
  if (ne(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const $l = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Yg = (e, t, n, r, s, o) => {
    const i = s === 'svg';
    t === 'class'
      ? Hg(e, r, i)
      : t === 'style'
        ? Bg(e, n, r)
        : Zr(t)
          ? ia(t) || Wg(e, t, n, r, o)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Xg(e, t, r, i)
              )
            ? (Rl(e, t, r),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Pl(e, t, r, i, o, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !Ie(r))
              ? Rl(e, et(t), r, o, t)
              : (t === 'true-value'
                  ? (e._trueValue = r)
                  : t === 'false-value' && (e._falseValue = r),
                Pl(e, t, r, i));
  };
function Xg(e, t, n, r) {
  if (r)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && $l(t) && oe(n))
    );
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const s = e.tagName;
    if (s === 'IMG' || s === 'VIDEO' || s === 'CANVAS' || s === 'SOURCE')
      return !1;
  }
  return $l(t) && Ie(n) ? !1 : t in e;
}
const Zg = ['ctrl', 'shift', 'alt', 'meta'],
  em = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => Zg.some((n) => e[`${n}Key`] && !t.includes(n))
  },
  Rs = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      r = t.join('.');
    return (
      n[r] ||
      (n[r] = (s, ...o) => {
        for (let i = 0; i < t.length; i++) {
          const a = em[t[i]];
          if (a && a(s, t)) return;
        }
        return e(s, ...o);
      })
    );
  },
  tm = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace'
  },
  hk = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      r = t.join('.');
    return (
      n[r] ||
      (n[r] = (s) => {
        if (!('key' in s)) return;
        const o = en(s.key);
        if (t.some((i) => i === o || tm[i] === o)) return e(s);
      })
    );
  },
  Mf = Be({ patchProp: Yg }, Rg);
let Hr,
  Ml = !1;
function nm() {
  return Hr || (Hr = ng(Mf));
}
function rm() {
  return (Hr = Ml ? Hr : rg(Mf)), (Ml = !0), Hr;
}
const sm = (...e) => {
    const t = nm().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Nf(r);
        if (!s) return;
        const o = t._component;
        !oe(o) && !o.render && !o.template && (o.template = s.innerHTML),
          s.nodeType === 1 && (s.textContent = '');
        const i = n(s, !1, Lf(s));
        return (
          s instanceof Element &&
            (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
          i
        );
      }),
      t
    );
  },
  om = (...e) => {
    const t = rm().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Nf(r);
        if (s) return n(s, !0, Lf(s));
      }),
      t
    );
  };
function Lf(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml';
}
function Nf(e) {
  return Ie(e) ? document.querySelector(e) : e;
}
const im =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  am =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  lm = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function cm(e, t) {
  if (
    e === '__proto__' ||
    (e === 'constructor' && t && typeof t == 'object' && 'prototype' in t)
  ) {
    return;
  }
  return t;
}
function Ys(e, t = {}) {
  if (typeof e != 'string') return e;
  const n = e.trim();
  if (e[0] === '"' && e.endsWith('"') && !e.includes('\\'))
    return n.slice(1, -1);
  if (n.length <= 9) {
    const r = n.toLowerCase();
    if (r === 'true') return !0;
    if (r === 'false') return !1;
    if (r === 'undefined') return;
    if (r === 'null') return null;
    if (r === 'nan') return Number.NaN;
    if (r === 'infinity') return Number.POSITIVE_INFINITY;
    if (r === '-infinity') return Number.NEGATIVE_INFINITY;
  }
  if (!lm.test(e)) {
    if (t.strict) throw new SyntaxError('[destr] Invalid JSON');
    return e;
  }
  try {
    if (im.test(e) || am.test(e)) {
      if (t.strict) throw new Error('[destr] Possible prototype pollution');
      return JSON.parse(e, cm);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict) throw r;
    return e;
  }
}
const um = /#/g,
  fm = /&/g,
  dm = /\//g,
  pm = /=/g,
  Ta = /\+/g,
  hm = /%5e/gi,
  gm = /%60/gi,
  mm = /%7c/gi,
  ym = /%20/gi;
function vm(e) {
  return encodeURI('' + e).replace(mm, '|');
}
function wi(e) {
  return vm(typeof e == 'string' ? e : JSON.stringify(e))
    .replace(Ta, '%2B')
    .replace(ym, '+')
    .replace(um, '%23')
    .replace(fm, '%26')
    .replace(gm, '`')
    .replace(hm, '^')
    .replace(dm, '%2F');
}
function Do(e) {
  return wi(e).replace(pm, '%3D');
}
function Xs(e = '') {
  try {
    return decodeURIComponent('' + e);
  } catch {
    return '' + e;
  }
}
function bm(e) {
  return Xs(e.replace(Ta, ' '));
}
function wm(e) {
  return Xs(e.replace(Ta, ' '));
}
function jf(e = '') {
  const t = {};
  e[0] === '?' && (e = e.slice(1));
  for (const n of e.split('&')) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const s = bm(r[1]);
    if (s === '__proto__' || s === 'constructor') continue;
    const o = wm(r[2] || '');
    t[s] === void 0
      ? (t[s] = o)
      : Array.isArray(t[s])
        ? t[s].push(o)
        : (t[s] = [t[s], o]);
  }
  return t;
}
function _m(e, t) {
  return (
    (typeof t == 'number' || typeof t == 'boolean') && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map((n) => `${Do(e)}=${wi(n)}`).join('&')
        : `${Do(e)}=${wi(t)}`
      : Do(e)
  );
}
function Hf(e) {
  return Object.keys(e)
    .filter((t) => e[t] !== void 0)
    .map((t) => _m(t, e[t]))
    .filter(Boolean)
    .join('&');
}
const xm = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
  Ff = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
  Sm = /^([/\\]\s*){2,}[^/\\]/,
  Cm = /^[\s\0]*(blob|data|javascript|vbscript):$/i,
  km = /\/$|\/\?|\/#/,
  Em = /^\.?\//;
function ft(e, t = {}) {
  return (
    typeof t == 'boolean' && (t = { acceptRelative: t }),
    t.strict ? xm.test(e) : Ff.test(e) || (t.acceptRelative ? Sm.test(e) : !1)
  );
}
function Tm(e) {
  return !!e && Cm.test(e);
}
function _i(e = '', t) {
  return t ? km.test(e) : e.endsWith('/');
}
function Fn(e = '', t) {
  if (!t) return (_i(e) ? e.slice(0, -1) : e) || '/';
  if (!_i(e, !0)) return e || '/';
  let n = e,
    r = '';
  const s = e.indexOf('#');
  s >= 0 && ((n = e.slice(0, s)), (r = e.slice(s)));
  const [o, ...i] = n.split('?');
  return (
    ((o.endsWith('/') ? o.slice(0, -1) : o) || '/') +
    (i.length > 0 ? `?${i.join('?')}` : '') +
    r
  );
}
function or(e = '', t) {
  if (!t) return e.endsWith('/') ? e : e + '/';
  if (_i(e, !0)) return e || '/';
  let n = e,
    r = '';
  const s = e.indexOf('#');
  if (s >= 0 && ((n = e.slice(0, s)), (r = e.slice(s)), !n)) return r;
  const [o, ...i] = n.split('?');
  return o + '/' + (i.length > 0 ? `?${i.join('?')}` : '') + r;
}
function Am(e = '') {
  return e.startsWith('/');
}
function Zs(e = '') {
  return Am(e) ? e : '/' + e;
}
function xi(e, t) {
  if (Df(t) || ft(e)) return e;
  const n = Fn(t);
  return e.startsWith(n) ? e : ss(n, e);
}
function Ll(e, t) {
  if (Df(t)) return e;
  const n = Fn(t);
  if (!e.startsWith(n)) return e;
  const r = e.slice(n.length);
  return r[0] === '/' ? r : '/' + r;
}
function Aa(e, t) {
  const n = os(e),
    r = { ...jf(n.search), ...t };
  return (n.search = Hf(r)), $m(n);
}
function Df(e) {
  return !e || e === '/';
}
function Pm(e) {
  return e && e !== '/';
}
function ss(e, ...t) {
  let n = e || '';
  for (const r of t.filter((s) => Pm(s)))
    if (n) {
      const s = r.replace(Em, '');
      n = or(n) + s;
    } else n = r;
  return n;
}
function Bf(...e) {
  var i, a, l, u;
  const t = /\/(?!\/)/,
    n = e.filter(Boolean),
    r = [];
  let s = 0;
  for (const c of n)
    if (!(!c || c === '/')) {
      for (const [f, d] of c.split(t).entries())
        if (!(!d || d === '.')) {
          if (d === '..') {
            if (r.length === 1 && ft(r[0])) continue;
            r.pop(), s--;
            continue;
          }
          if (f === 1 && (i = r[r.length - 1]) != null && i.endsWith(':/')) {
            r[r.length - 1] += '/' + d;
            continue;
          }
          r.push(d), s++;
        }
    }
  let o = r.join('/');
  return (
    s >= 0
      ? (a = n[0]) != null && a.startsWith('/') && !o.startsWith('/')
        ? (o = '/' + o)
        : (l = n[0]) != null &&
          l.startsWith('./') &&
          !o.startsWith('./') &&
          (o = './' + o)
      : (o = '../'.repeat(-1 * s) + o),
    (u = n[n.length - 1]) != null &&
      u.endsWith('/') &&
      !o.endsWith('/') &&
      (o += '/'),
    o
  );
}
function Rm(e) {
  return Om(e, 'https://');
}
function Om(e, t) {
  let n = e.match(Ff);
  return n || (n = e.match(/^\/{2,}/)), n ? t + e.slice(n[0].length) : t + e;
}
function Im(e, t, n = {}) {
  return (
    n.trailingSlash || ((e = or(e)), (t = or(t))),
    n.leadingSlash || ((e = Zs(e)), (t = Zs(t))),
    n.encoding || ((e = Xs(e)), (t = Xs(t))),
    e === t
  );
}
const Uf = Symbol.for('ufo:protocolRelative');
function os(e = '', t) {
  const n = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (n) {
    const [, f, d = ''] = n;
    return {
      protocol: f.toLowerCase(),
      pathname: d,
      href: f + d,
      auth: '',
      host: '',
      search: '',
      hash: ''
    };
  }
  if (!ft(e, { acceptRelative: !0 })) return Nl(e);
  const [, r = '', s, o = ''] =
    e.replace(/\\/g, '/').match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) ||
    [];
  let [, i = '', a = ''] = o.match(/([^#/?]*)(.*)?/) || [];
  r === 'file:' && (a = a.replace(/\/(?=[A-Za-z]:)/, ''));
  const { pathname: l, search: u, hash: c } = Nl(a);
  return {
    protocol: r.toLowerCase(),
    auth: s ? s.slice(0, Math.max(0, s.length - 1)) : '',
    host: i,
    pathname: l,
    search: u,
    hash: c,
    [Uf]: !r
  };
}
function Nl(e = '') {
  const [t = '', n = '', r = ''] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: n, hash: r };
}
function $m(e) {
  const t = e.pathname || '',
    n = e.search ? (e.search.startsWith('?') ? '' : '?') + e.search : '',
    r = e.hash || '',
    s = e.auth ? e.auth + '@' : '',
    o = e.host || '';
  return (
    (e.protocol || e[Uf] ? (e.protocol || '') + '//' : '') + s + o + t + n + r
  );
}
class Mm extends Error {
  constructor(t, n) {
    super(t, n),
      (this.name = 'FetchError'),
      n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function Lm(e) {
  var l, u, c, f, d;
  const t =
      ((l = e.error) == null ? void 0 : l.message) ||
      ((u = e.error) == null ? void 0 : u.toString()) ||
      '',
    n =
      ((c = e.request) == null ? void 0 : c.method) ||
      ((f = e.options) == null ? void 0 : f.method) ||
      'GET',
    r = ((d = e.request) == null ? void 0 : d.url) || String(e.request) || '/',
    s = `[${n}] ${JSON.stringify(r)}`,
    o = e.response
      ? `${e.response.status} ${e.response.statusText}`
      : '<no response>',
    i = `${s}: ${o}${t ? ` ${t}` : ''}`,
    a = new Mm(i, e.error ? { cause: e.error } : void 0);
  for (const p of ['request', 'options', 'response'])
    Object.defineProperty(a, p, {
      get() {
        return e[p];
      }
    });
  for (const [p, g] of [
    ['data', '_data'],
    ['status', 'status'],
    ['statusCode', 'status'],
    ['statusText', 'statusText'],
    ['statusMessage', 'statusText']
  ])
    Object.defineProperty(a, p, {
      get() {
        return e.response && e.response[g];
      }
    });
  return a;
}
const Nm = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));
function jl(e = 'GET') {
  return Nm.has(e.toUpperCase());
}
function jm(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === 'string' || t === 'number' || t === 'boolean' || t === null
    ? !0
    : t !== 'object'
      ? !1
      : Array.isArray(e)
        ? !0
        : e.buffer
          ? !1
          : (e.constructor && e.constructor.name === 'Object') ||
            typeof e.toJSON == 'function';
}
const Hm = new Set([
    'image/svg',
    'application/xml',
    'application/xhtml',
    'application/html'
  ]),
  Fm = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Dm(e = '') {
  if (!e) return 'json';
  const t = e.split(';').shift() || '';
  return Fm.test(t)
    ? 'json'
    : Hm.has(t) || t.startsWith('text/')
      ? 'text'
      : 'blob';
}
function Bm(e, t, n, r) {
  const s = Um(
    (t == null ? void 0 : t.headers) ?? (e == null ? void 0 : e.headers),
    n == null ? void 0 : n.headers,
    r
  );
  let o;
  return (
    ((n != null && n.query) ||
      (n != null && n.params) ||
      (t != null && t.params) ||
      (t != null && t.query)) &&
      (o = {
        ...(n == null ? void 0 : n.params),
        ...(n == null ? void 0 : n.query),
        ...(t == null ? void 0 : t.params),
        ...(t == null ? void 0 : t.query)
      }),
    { ...n, ...t, query: o, params: o, headers: s }
  );
}
function Um(e, t, n) {
  if (!t) return new n(e);
  const r = new n(t);
  if (e)
    for (const [s, o] of Symbol.iterator in e || Array.isArray(e)
      ? e
      : new n(e))
      r.set(s, o);
  return r;
}
async function _s(e, t) {
  if (t)
    if (Array.isArray(t)) for (const n of t) await n(e);
    else await t(e);
}
const zm = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
  Vm = new Set([101, 204, 205, 304]);
function zf(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function s(a) {
    const l =
      (a.error && a.error.name === 'AbortError' && !a.options.timeout) || !1;
    if (a.options.retry !== !1 && !l) {
      let c;
      typeof a.options.retry == 'number'
        ? (c = a.options.retry)
        : (c = jl(a.options.method) ? 0 : 1);
      const f = (a.response && a.response.status) || 500;
      if (
        c > 0 &&
        (Array.isArray(a.options.retryStatusCodes)
          ? a.options.retryStatusCodes.includes(f)
          : zm.has(f))
      ) {
        const d =
          typeof a.options.retryDelay == 'function'
            ? a.options.retryDelay(a)
            : a.options.retryDelay || 0;
        return (
          d > 0 && (await new Promise((p) => setTimeout(p, d))),
          o(a.request, { ...a.options, retry: c - 1 })
        );
      }
    }
    const u = Lm(a);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, o), u);
  }
  const o = async function (l, u = {}) {
      const c = {
        request: l,
        options: Bm(l, u, e.defaults, n),
        response: void 0,
        error: void 0
      };
      c.options.method && (c.options.method = c.options.method.toUpperCase()),
        c.options.onRequest && (await _s(c, c.options.onRequest)),
        typeof c.request == 'string' &&
          (c.options.baseURL && (c.request = xi(c.request, c.options.baseURL)),
          c.options.query &&
            ((c.request = Aa(c.request, c.options.query)),
            delete c.options.query),
          'query' in c.options && delete c.options.query,
          'params' in c.options && delete c.options.params),
        c.options.body &&
          jl(c.options.method) &&
          (jm(c.options.body)
            ? ((c.options.body =
                typeof c.options.body == 'string'
                  ? c.options.body
                  : JSON.stringify(c.options.body)),
              (c.options.headers = new n(c.options.headers || {})),
              c.options.headers.has('content-type') ||
                c.options.headers.set('content-type', 'application/json'),
              c.options.headers.has('accept') ||
                c.options.headers.set('accept', 'application/json'))
            : (('pipeTo' in c.options.body &&
                typeof c.options.body.pipeTo == 'function') ||
                typeof c.options.body.pipe == 'function') &&
              ('duplex' in c.options || (c.options.duplex = 'half')));
      let f;
      if (!c.options.signal && c.options.timeout) {
        const p = new r();
        (f = setTimeout(() => {
          const g = new Error(
            '[TimeoutError]: The operation was aborted due to timeout'
          );
          (g.name = 'TimeoutError'), (g.code = 23), p.abort(g);
        }, c.options.timeout)),
          (c.options.signal = p.signal);
      }
      try {
        c.response = await t(c.request, c.options);
      } catch (p) {
        return (
          (c.error = p),
          c.options.onRequestError && (await _s(c, c.options.onRequestError)),
          await s(c)
        );
      } finally {
        f && clearTimeout(f);
      }
      if (
        (c.response.body || c.response._bodyInit) &&
        !Vm.has(c.response.status) &&
        c.options.method !== 'HEAD'
      ) {
        const p =
          (c.options.parseResponse ? 'json' : c.options.responseType) ||
          Dm(c.response.headers.get('content-type') || '');
        switch (p) {
          case 'json': {
            const g = await c.response.text(),
              y = c.options.parseResponse || Ys;
            c.response._data = y(g);
            break;
          }
          case 'stream': {
            c.response._data = c.response.body || c.response._bodyInit;
            break;
          }
          default:
            c.response._data = await c.response[p]();
        }
      }
      return (
        c.options.onResponse && (await _s(c, c.options.onResponse)),
        !c.options.ignoreResponseError &&
        c.response.status >= 400 &&
        c.response.status < 600
          ? (c.options.onResponseError &&
              (await _s(c, c.options.onResponseError)),
            await s(c))
          : c.response
      );
    },
    i = async function (l, u) {
      return (await o(l, u))._data;
    };
  return (
    (i.raw = o),
    (i.native = (...a) => t(...a)),
    (i.create = (a = {}, l = {}) =>
      zf({ ...e, ...l, defaults: { ...e.defaults, ...l.defaults, ...a } })),
    i
  );
}
const eo = (function () {
    if (typeof globalThis < 'u') return globalThis;
    if (typeof self < 'u') return self;
    if (typeof window < 'u') return window;
    if (typeof global < 'u') return global;
    throw new Error('unable to locate global object');
  })(),
  Wm = eo.fetch
    ? (...e) => eo.fetch(...e)
    : () =>
        Promise.reject(new Error('[ofetch] global.fetch is not supported!')),
  Km = eo.Headers,
  qm = eo.AbortController,
  Gm = zf({ fetch: Wm, Headers: Km, AbortController: qm }),
  Jm = Gm,
  Qm = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  to = Qm().app,
  Ym = () => to.baseURL,
  Xm = () => to.buildAssetsDir,
  Pa = (...e) => Bf(Vf(), Xm(), ...e),
  Vf = (...e) => {
    const t = to.cdnURL || to.baseURL;
    return e.length ? Bf(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = Pa), (globalThis.__publicAssetsURL = Vf);
globalThis.$fetch || (globalThis.$fetch = Jm.create({ baseURL: Ym() }));
function Si(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      o = n ? `${n}:${r}` : r;
    typeof s == 'object' && s !== null
      ? Si(s, t, o)
      : typeof s == 'function' && (t[o] = s);
  }
  return t;
}
const Zm = { run: (e) => e() },
  ey = () => Zm,
  Wf = typeof console.createTask < 'u' ? console.createTask : ey;
function ty(e, t) {
  const n = t.shift(),
    r = Wf(n);
  return e.reduce(
    (s, o) => s.then(() => r.run(() => o(...t))),
    Promise.resolve()
  );
}
function ny(e, t) {
  const n = t.shift(),
    r = Wf(n);
  return Promise.all(e.map((s) => r.run(() => s(...t))));
}
function Bo(e, t) {
  for (const n of [...e]) n(t);
}
class ry {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != 'function') return () => {};
    const s = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      (o = this._deprecatedHooks[t]), (t = o.to);
    if (o && !r.allowDeprecated) {
      let i = o.message;
      i ||
        (i =
          `${s} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) || this._deprecatedMessages.add(i);
    }
    if (!n.name)
      try {
        Object.defineProperty(n, 'name', {
          get: () => '_' + t.replace(/\W+/g, '_') + '_hook_cb',
          configurable: !0
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...o) => (
        typeof r == 'function' && r(), (r = void 0), (s = void 0), n(...o)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == 'string' ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = Si(t),
      r = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = Si(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(ty, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(ny, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Bo(this._before, s);
    const o = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && s && Bo(this._after, s);
        })
      : (this._after && s && Bo(this._after, s), o);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function Kf() {
  return new ry();
}
function sy(e = {}) {
  let t,
    n = !1;
  const r = (i) => {
    if (t && t !== i) throw new Error('Context conflict');
  };
  let s;
  if (e.asyncContext) {
    const i = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    i && (s = new i());
  }
  const o = () => {
    if (s) {
      const i = s.getStore();
      if (i !== void 0) return i;
    }
    return t;
  };
  return {
    use: () => {
      const i = o();
      if (i === void 0) throw new Error('Context is not available');
      return i;
    },
    tryUse: () => o(),
    set: (i, a) => {
      a || r(i), (t = i), (n = !0);
    },
    unset: () => {
      (t = void 0), (n = !1);
    },
    call: (i, a) => {
      r(i), (t = i);
      try {
        return s ? s.run(i, a) : a();
      } finally {
        n || (t = void 0);
      }
    },
    async callAsync(i, a) {
      t = i;
      const l = () => {
          t = i;
        },
        u = () => (t === i ? l : void 0);
      Ci.add(u);
      try {
        const c = s ? s.run(i, a) : a();
        return n || (t = void 0), await c;
      } finally {
        Ci.delete(u);
      }
    }
  };
}
function oy(e = {}) {
  const t = {};
  return {
    get(n, r = {}) {
      return t[n] || (t[n] = sy({ ...e, ...r })), t[n];
    }
  };
}
const no =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof global < 'u'
          ? global
          : typeof window < 'u'
            ? window
            : {},
  Hl = '__unctx__',
  iy = no[Hl] || (no[Hl] = oy()),
  ay = (e, t = {}) => iy.get(e, t),
  Fl = '__unctx_async_handlers__',
  Ci = no[Fl] || (no[Fl] = new Set());
function er(e) {
  const t = [];
  for (const s of Ci) {
    const o = s();
    o && t.push(o);
  }
  const n = () => {
    for (const s of t) s();
  };
  let r = e();
  return (
    r &&
      typeof r == 'object' &&
      'catch' in r &&
      (r = r.catch((s) => {
        throw (n(), s);
      })),
    [r, n]
  );
}
const ly = !1,
  ki = !1,
  cy = !1,
  uy = {
    componentName: 'NuxtLink',
    prefetch: !0,
    prefetchOn: { visibility: !0 }
  },
  gk = { value: null, errorValue: null, deep: !0 },
  fy = null,
  mk = {},
  dy = '#__nuxt',
  qf = 'nuxt-app',
  Dl = 36e5,
  py = 'vite:preloadError';
function Gf(e = qf) {
  return ay(e, { asyncContext: !1 });
}
const hy = '__nuxt_plugin';
function gy(e) {
  var s;
  let t = 0;
  const n = {
    _id: e.id || qf || 'nuxt-app',
    _scope: fu(),
    provide: void 0,
    globalName: 'nuxt',
    versions: {
      get nuxt() {
        return '3.15.4';
      },
      get vue() {
        return n.vueApp.version;
      }
    },
    payload: Jt({
      ...(((s = e.ssrContext) == null ? void 0 : s.payload) || {}),
      data: Jt({}),
      state: tt({}),
      once: new Set(),
      _errors: Jt({})
    }),
    static: { data: {} },
    runWithContext(o) {
      return n._scope.active && !ua() ? n._scope.run(() => Bl(n, o)) : Bl(n, o);
    },
    isHydrating: !0,
    deferHydration() {
      if (!n.isHydrating) return () => {};
      t++;
      let o = !1;
      return () => {
        if (!o && ((o = !0), t--, t === 0))
          return (n.isHydrating = !1), n.callHook('app:suspense:resolve');
      };
    },
    _asyncDataPromises: {},
    _asyncData: Jt({}),
    _payloadRevivers: {},
    ...e
  };
  {
    const o = window.__NUXT__;
    if (o)
      for (const i in o)
        switch (i) {
          case 'data':
          case 'state':
          case '_errors':
            Object.assign(n.payload[i], o[i]);
            break;
          default:
            n.payload[i] = o[i];
        }
  }
  (n.hooks = Kf()),
    (n.hook = n.hooks.hook),
    (n.callHook = n.hooks.callHook),
    (n.provide = (o, i) => {
      const a = '$' + o;
      xs(n, a, i), xs(n.vueApp.config.globalProperties, a, i);
    }),
    xs(n.vueApp, '$nuxt', n),
    xs(n.vueApp.config.globalProperties, '$nuxt', n);
  {
    window.addEventListener(py, (i) => {
      n.callHook('app:chunkError', { error: i.payload }),
        (n.isHydrating ||
          i.payload.message.includes('Unable to preload CSS')) &&
          i.preventDefault();
    }),
      (window.useNuxtApp = window.useNuxtApp || de);
    const o = n.hook('app:error', (...i) => {});
    n.hook('app:mounted', o);
  }
  const r = n.payload.config;
  return n.provide('config', r), n;
}
function my(e, t) {
  t.hooks && e.hooks.addHooks(t.hooks);
}
async function yy(e, t) {
  if (typeof t == 'function') {
    const { provide: n } = (await e.runWithContext(() => t(e))) || {};
    if (n && typeof n == 'object') for (const r in n) e.provide(r, n[r]);
  }
}
async function vy(e, t) {
  const n = [],
    r = [],
    s = [],
    o = [];
  let i = 0;
  async function a(l) {
    var c;
    const u =
      ((c = l.dependsOn) == null
        ? void 0
        : c.filter((f) => t.some((d) => d._name === f) && !n.includes(f))) ??
      [];
    if (u.length > 0) r.push([new Set(u), l]);
    else {
      const f = yy(e, l).then(async () => {
        l._name &&
          (n.push(l._name),
          await Promise.all(
            r.map(async ([d, p]) => {
              d.has(l._name) &&
                (d.delete(l._name), d.size === 0 && (i++, await a(p)));
            })
          ));
      });
      l.parallel ? s.push(f.catch((d) => o.push(d))) : await f;
    }
  }
  for (const l of t) my(e, l);
  for (const l of t) await a(l);
  if ((await Promise.all(s), i))
    for (let l = 0; l < i; l++) await Promise.all(s);
  if (o.length) throw o[0];
}
function je(e) {
  if (typeof e == 'function') return e;
  const t = e._name || e.name;
  return (
    delete e.name,
    Object.assign(e.setup || (() => {}), e, { [hy]: !0, _name: t })
  );
}
function Bl(e, t, n) {
  const r = () => t();
  return Gf(e._id).set(e), e.vueApp.runWithContext(r);
}
function by(e) {
  var n;
  let t;
  return (
    sf() && (t = (n = Ve()) == null ? void 0 : n.appContext.app.$nuxt),
    (t = t || Gf(e).tryUse()),
    t || null
  );
}
function de(e) {
  const t = by(e);
  if (!t) throw new Error('[nuxt] instance unavailable');
  return t;
}
function bt(e) {
  return de().$config;
}
function xs(e, t, n) {
  Object.defineProperty(e, t, { get: () => n });
}
function wy(e, t) {
  return { ctx: { table: e }, matchAll: (n) => Qf(n, e) };
}
function Jf(e) {
  const t = {};
  for (const n in e)
    t[n] =
      n === 'dynamic'
        ? new Map(Object.entries(e[n]).map(([r, s]) => [r, Jf(s)]))
        : new Map(Object.entries(e[n]));
  return t;
}
function _y(e) {
  return wy(Jf(e));
}
function Qf(e, t, n) {
  e.endsWith('/') && (e = e.slice(0, -1) || '/');
  const r = [];
  for (const [o, i] of Ul(t.wildcard))
    (e === o || e.startsWith(o + '/')) && r.push(i);
  for (const [o, i] of Ul(t.dynamic))
    if (e.startsWith(o + '/')) {
      const a = '/' + e.slice(o.length).split('/').splice(2).join('/');
      r.push(...Qf(a, i));
    }
  const s = t.static.get(e);
  return s && r.push(s), r.filter(Boolean);
}
function Ul(e) {
  return [...e.entries()].sort((t, n) => t[0].length - n[0].length);
}
function Uo(e) {
  if (e === null || typeof e != 'object') return !1;
  const t = Object.getPrototypeOf(e);
  return (t !== null &&
    t !== Object.prototype &&
    Object.getPrototypeOf(t) !== null) ||
    Symbol.iterator in e
    ? !1
    : Symbol.toStringTag in e
      ? Object.prototype.toString.call(e) === '[object Module]'
      : !0;
}
function Ei(e, t, n = '.', r) {
  if (!Uo(t)) return Ei(e, {}, n, r);
  const s = Object.assign({}, t);
  for (const o in e) {
    if (o === '__proto__' || o === 'constructor') continue;
    const i = e[o];
    i != null &&
      ((r && r(s, o, i, n)) ||
        (Array.isArray(i) && Array.isArray(s[o])
          ? (s[o] = [...i, ...s[o]])
          : Uo(i) && Uo(s[o])
            ? (s[o] = Ei(i, s[o], (n ? `${n}.` : '') + o.toString(), r))
            : (s[o] = i)));
  }
  return s;
}
function Yf(e) {
  return (...t) => t.reduce((n, r) => Ei(n, r, '', e), {});
}
const nn = Yf(),
  xy = Yf((e, t, n) => {
    if (e[t] !== void 0 && typeof n == 'function') return (e[t] = n(e[t])), !0;
  });
function Sy(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
class Ti extends Error {
  constructor(n, r = {}) {
    super(n, r);
    sn(this, 'statusCode', 500);
    sn(this, 'fatal', !1);
    sn(this, 'unhandled', !1);
    sn(this, 'statusMessage');
    sn(this, 'data');
    sn(this, 'cause');
    r.cause && !this.cause && (this.cause = r.cause);
  }
  toJSON() {
    const n = { message: this.message, statusCode: Pi(this.statusCode, 500) };
    return (
      this.statusMessage && (n.statusMessage = Xf(this.statusMessage)),
      this.data !== void 0 && (n.data = this.data),
      n
    );
  }
}
sn(Ti, '__h3_error__', !0);
function Ai(e) {
  if (typeof e == 'string') return new Ti(e);
  if (Cy(e)) return e;
  const t = new Ti(e.message ?? e.statusMessage ?? '', { cause: e.cause || e });
  if (Sy(e, 'stack'))
    try {
      Object.defineProperty(t, 'stack', {
        get() {
          return e.stack;
        }
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = Pi(e.statusCode, t.statusCode))
      : e.status && (t.statusCode = Pi(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const n = t.statusMessage,
      r = Xf(t.statusMessage);
  }
  return (
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function Cy(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const ky = /[^\u0009\u0020-\u007E]/g;
function Xf(e = '') {
  return e.replace(ky, '');
}
function Pi(e, t = 200) {
  return !e ||
    (typeof e == 'string' && (e = Number.parseInt(e, 10)), e < 100 || e > 999)
    ? t
    : e;
}
const Zf = Symbol('layout-meta'),
  is = Symbol('route'),
  Ge = () => {
    var e;
    return (e = de()) == null ? void 0 : e.$router;
  },
  fr = () => (sf() ? Ae(is, de()._route) : de()._route);
const Ey = () => {
    try {
      if (de()._processingMiddleware) return !0;
    } catch {
      return !1;
    }
    return !1;
  },
  Ra = (e, t) => {
    e || (e = '/');
    const n =
      typeof e == 'string' ? e : 'path' in e ? Ri(e) : Ge().resolve(e).href;
    if (t != null && t.open) {
      const { target: l = '_blank', windowFeatures: u = {} } = t.open,
        c = Object.entries(u)
          .filter(([f, d]) => d !== void 0)
          .map(([f, d]) => `${f.toLowerCase()}=${d}`)
          .join(', ');
      return open(n, l, c), Promise.resolve();
    }
    const r = ft(n, { acceptRelative: !0 }),
      s = (t == null ? void 0 : t.external) || r;
    if (s) {
      if (!(t != null && t.external))
        throw new Error(
          'Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.'
        );
      const { protocol: l } = new URL(n, window.location.href);
      if (l && Tm(l))
        throw new Error(`Cannot navigate to a URL with '${l}' protocol.`);
    }
    const o = Ey();
    if (!s && o)
      return t != null && t.replace
        ? typeof e == 'string'
          ? { path: e, replace: !0 }
          : { ...e, replace: !0 }
        : e;
    const i = Ge(),
      a = de();
    return s
      ? (a._scope.stop(),
        t != null && t.replace ? location.replace(n) : (location.href = n),
        o ? (a.isHydrating ? new Promise(() => {}) : !1) : Promise.resolve())
      : t != null && t.replace
        ? i.replace(e)
        : i.push(e);
  };
function Ri(e) {
  return Aa(e.path || '', e.query || {}) + (e.hash || '');
}
const ed = '__nuxt_error',
  Dn = () => On(de().payload, 'error'),
  qn = (e) => {
    const t = wo(e);
    try {
      const n = de(),
        r = Dn();
      n.hooks.callHook('app:error', t), (r.value = r.value || t);
    } catch {
      throw t;
    }
    return t;
  },
  td = async (e = {}) => {
    const t = de(),
      n = Dn();
    t.callHook('app:error:cleared', e),
      e.redirect && (await Ge().replace(e.redirect)),
      (n.value = fy);
  },
  Ty = (e) => !!e && typeof e == 'object' && ed in e,
  wo = (e) => {
    const t = Ai(e);
    return (
      Object.defineProperty(t, ed, {
        value: !0,
        configurable: !1,
        writable: !1
      }),
      t
    );
  };
function zl(e) {
  const t = Py(e),
    n = new ArrayBuffer(t.length),
    r = new DataView(n);
  for (let s = 0; s < n.byteLength; s++) r.setUint8(s, t.charCodeAt(s));
  return n;
}
const Ay = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function Py(e) {
  e.length % 4 === 0 && (e = e.replace(/==?$/, ''));
  let t = '',
    n = 0,
    r = 0;
  for (let s = 0; s < e.length; s++)
    (n <<= 6),
      (n |= Ay.indexOf(e[s])),
      (r += 6),
      r === 24 &&
        ((t += String.fromCharCode((n & 16711680) >> 16)),
        (t += String.fromCharCode((n & 65280) >> 8)),
        (t += String.fromCharCode(n & 255)),
        (n = r = 0));
  return (
    r === 12
      ? ((n >>= 4), (t += String.fromCharCode(n)))
      : r === 18 &&
        ((n >>= 2),
        (t += String.fromCharCode((n & 65280) >> 8)),
        (t += String.fromCharCode(n & 255))),
    t
  );
}
const Ry = -1,
  Oy = -2,
  Iy = -3,
  $y = -4,
  My = -5,
  Ly = -6;
function Ny(e, t) {
  return jy(JSON.parse(e), t);
}
function jy(e, t) {
  if (typeof e == 'number') return s(e, !0);
  if (!Array.isArray(e) || e.length === 0) throw new Error('Invalid input');
  const n = e,
    r = Array(n.length);
  function s(o, i = !1) {
    if (o === Ry) return;
    if (o === Iy) return NaN;
    if (o === $y) return 1 / 0;
    if (o === My) return -1 / 0;
    if (o === Ly) return -0;
    if (i) throw new Error('Invalid input');
    if (o in r) return r[o];
    const a = n[o];
    if (!a || typeof a != 'object') r[o] = a;
    else if (Array.isArray(a))
      if (typeof a[0] == 'string') {
        const l = a[0],
          u = t == null ? void 0 : t[l];
        if (u) return (r[o] = u(s(a[1])));
        switch (l) {
          case 'Date':
            r[o] = new Date(a[1]);
            break;
          case 'Set':
            const c = new Set();
            r[o] = c;
            for (let p = 1; p < a.length; p += 1) c.add(s(a[p]));
            break;
          case 'Map':
            const f = new Map();
            r[o] = f;
            for (let p = 1; p < a.length; p += 2) f.set(s(a[p]), s(a[p + 1]));
            break;
          case 'RegExp':
            r[o] = new RegExp(a[1], a[2]);
            break;
          case 'Object':
            r[o] = Object(a[1]);
            break;
          case 'BigInt':
            r[o] = BigInt(a[1]);
            break;
          case 'null':
            const d = Object.create(null);
            r[o] = d;
            for (let p = 1; p < a.length; p += 2) d[a[p]] = s(a[p + 1]);
            break;
          case 'Int8Array':
          case 'Uint8Array':
          case 'Uint8ClampedArray':
          case 'Int16Array':
          case 'Uint16Array':
          case 'Int32Array':
          case 'Uint32Array':
          case 'Float32Array':
          case 'Float64Array':
          case 'BigInt64Array':
          case 'BigUint64Array': {
            const p = globalThis[l],
              g = a[1],
              y = zl(g),
              b = new p(y);
            r[o] = b;
            break;
          }
          case 'ArrayBuffer': {
            const p = a[1],
              g = zl(p);
            r[o] = g;
            break;
          }
          default:
            throw new Error(`Unknown type ${l}`);
        }
      } else {
        const l = new Array(a.length);
        r[o] = l;
        for (let u = 0; u < a.length; u += 1) {
          const c = a[u];
          c !== Oy && (l[u] = s(c));
        }
      }
    else {
      const l = {};
      r[o] = l;
      for (const u in a) {
        const c = a[u];
        l[u] = s(c);
      }
    }
    return r[o];
  }
  return s(0);
}
const Hy = new Set(['title', 'titleTemplate', 'script', 'style', 'noscript']),
  Os = new Set(['base', 'meta', 'link', 'style', 'script', 'noscript']),
  Fy = new Set([
    'title',
    'titleTemplate',
    'templateParams',
    'base',
    'htmlAttrs',
    'bodyAttrs',
    'meta',
    'link',
    'style',
    'script',
    'noscript'
  ]),
  Dy = new Set([
    'base',
    'title',
    'titleTemplate',
    'bodyAttrs',
    'htmlAttrs',
    'templateParams'
  ]),
  nd = new Set([
    'tagPosition',
    'tagPriority',
    'tagDuplicateStrategy',
    'children',
    'innerHTML',
    'textContent',
    'processTemplateParams'
  ]),
  By = typeof window < 'u';
function Gr(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function Oi(e) {
  if (e._h) return e._h;
  if (e._d) return Gr(e._d);
  let t = `${e.tag}:${e.textContent || e.innerHTML || ''}:`;
  for (const n in e.props) t += `${n}:${String(e.props[n])},`;
  return Gr(t);
}
function Uy(e, t) {
  return e instanceof Promise ? e.then(t) : t(e);
}
function Ii(e, t, n, r) {
  const s =
    r ||
    sd(
      typeof t == 'object' && typeof t != 'function' && !(t instanceof Promise)
        ? { ...t }
        : {
            [e === 'script' || e === 'noscript' || e === 'style'
              ? 'innerHTML'
              : 'textContent']: t
          },
      e === 'templateParams' || e === 'titleTemplate'
    );
  if (s instanceof Promise) return s.then((i) => Ii(e, t, n, i));
  const o = { tag: e, props: s };
  for (const i of nd) {
    const a = o.props[i] !== void 0 ? o.props[i] : n[i];
    a !== void 0 &&
      ((!(i === 'innerHTML' || i === 'textContent' || i === 'children') ||
        Hy.has(o.tag)) &&
        (o[i === 'children' ? 'innerHTML' : i] = a),
      delete o.props[i]);
  }
  return (
    o.props.body && ((o.tagPosition = 'bodyClose'), delete o.props.body),
    o.tag === 'script' &&
      typeof o.innerHTML == 'object' &&
      ((o.innerHTML = JSON.stringify(o.innerHTML)),
      (o.props.type = o.props.type || 'application/json')),
    Array.isArray(o.props.content)
      ? o.props.content.map((i) => ({
          ...o,
          props: { ...o.props, content: i }
        }))
      : o
  );
}
function zy(e, t) {
  var r;
  const n = e === 'class' ? ' ' : ';';
  return (
    t &&
      typeof t == 'object' &&
      !Array.isArray(t) &&
      (t = Object.entries(t)
        .filter(([, s]) => s)
        .map(([s, o]) => (e === 'style' ? `${s}:${o}` : s))),
    (r = String(Array.isArray(t) ? t.join(n) : t)) == null
      ? void 0
      : r
          .split(n)
          .filter((s) => !!s.trim())
          .join(n)
  );
}
function rd(e, t, n, r) {
  for (let s = r; s < n.length; s += 1) {
    const o = n[s];
    if (o === 'class' || o === 'style') {
      e[o] = zy(o, e[o]);
      continue;
    }
    if (e[o] instanceof Promise)
      return e[o].then((i) => ((e[o] = i), rd(e, t, n, s)));
    if (!t && !nd.has(o)) {
      const i = String(e[o]),
        a = o.startsWith('data-');
      i === 'true' || i === ''
        ? (e[o] = a ? 'true' : !0)
        : e[o] || (a && i === 'false' ? (e[o] = 'false') : delete e[o]);
    }
  }
}
function sd(e, t = !1) {
  const n = rd(e, t, Object.keys(e), 0);
  return n instanceof Promise ? n.then(() => e) : e;
}
const Vy = 10;
function od(e, t, n) {
  for (let r = n; r < t.length; r += 1) {
    const s = t[r];
    if (s instanceof Promise) return s.then((o) => ((t[r] = o), od(e, t, r)));
    Array.isArray(s) ? e.push(...s) : e.push(s);
  }
}
function Wy(e) {
  const t = [],
    n = e.resolvedInput;
  for (const s in n) {
    if (!Object.prototype.hasOwnProperty.call(n, s)) continue;
    const o = n[s];
    if (!(o === void 0 || !Fy.has(s))) {
      if (Array.isArray(o)) {
        for (const i of o) t.push(Ii(s, i, e));
        continue;
      }
      t.push(Ii(s, o, e));
    }
  }
  if (t.length === 0) return [];
  const r = [];
  return Uy(od(r, t, 0), () =>
    r.map(
      (s, o) => (
        (s._e = e._i), e.mode && (s._m = e.mode), (s._p = (e._i << Vy) + o), s
      )
    )
  );
}
const Vl = new Set([
    'onload',
    'onerror',
    'onabort',
    'onprogress',
    'onloadstart'
  ]),
  Wl = { base: -10, title: 10 },
  Kl = { critical: -80, high: -10, low: 20 };
function ro(e) {
  const t = e.tagPriority;
  if (typeof t == 'number') return t;
  let n = 100;
  return (
    e.tag === 'meta'
      ? e.props['http-equiv'] === 'content-security-policy'
        ? (n = -30)
        : e.props.charset
          ? (n = -20)
          : e.props.name === 'viewport' && (n = -15)
      : e.tag === 'link' && e.props.rel === 'preconnect'
        ? (n = 20)
        : e.tag in Wl && (n = Wl[e.tag]),
    t && t in Kl ? n + Kl[t] : n
  );
}
const Ky = [
    { prefix: 'before:', offset: -1 },
    { prefix: 'after:', offset: 1 }
  ],
  qy = ['name', 'property', 'http-equiv'];
function id(e) {
  const { props: t, tag: n } = e;
  if (Dy.has(n)) return n;
  if (n === 'link' && t.rel === 'canonical') return 'canonical';
  if (t.charset) return 'charset';
  if (t.id) return `${n}:id:${t.id}`;
  for (const r of qy) if (t[r] !== void 0) return `${n}:${r}:${t[r]}`;
  return !1;
}
const dn = '%separator';
function Gy(e, t, n = !1) {
  var s;
  let r;
  if (t === 's' || t === 'pageTitle') r = e.pageTitle;
  else if (t.includes('.')) {
    const o = t.indexOf('.');
    r = (s = e[t.substring(0, o)]) == null ? void 0 : s[t.substring(o + 1)];
  } else r = e[t];
  if (r !== void 0) return n ? (r || '').replace(/"/g, '\\"') : r || '';
}
const Jy = new RegExp(`${dn}(?:\\s*${dn})*`, 'g');
function Ss(e, t, n, r = !1) {
  if (typeof e != 'string' || !e.includes('%')) return e;
  let s = e;
  try {
    s = decodeURI(e);
  } catch {}
  const o = s.match(/%\w+(?:\.\w+)?/g);
  if (!o) return e;
  const i = e.includes(dn);
  return (
    (e = e
      .replace(/%\w+(?:\.\w+)?/g, (a) => {
        if (a === dn || !o.includes(a)) return a;
        const l = Gy(t, a.slice(1), r);
        return l !== void 0 ? l : a;
      })
      .trim()),
    i &&
      (e.endsWith(dn) && (e = e.slice(0, -dn.length)),
      e.startsWith(dn) && (e = e.slice(dn.length)),
      (e = e.replace(Jy, n).trim())),
    e
  );
}
function $i(e, t) {
  return e == null ? t || null : typeof e == 'function' ? e(t) : e;
}
async function ad(e, t = {}) {
  const n = t.document || e.resolvedOptions.document;
  if (!n || !e.dirty) return;
  const r = { shouldRender: !0, tags: [] };
  if ((await e.hooks.callHook('dom:beforeRender', r), !!r.shouldRender))
    return (
      e._domUpdatePromise ||
        (e._domUpdatePromise = new Promise(async (s) => {
          var f;
          const o = (await e.resolveTags()).map((d) => ({
            tag: d,
            id: Os.has(d.tag) ? Oi(d) : d.tag,
            shouldRender: !0
          }));
          let i = e._dom;
          if (!i) {
            i = { elMap: { htmlAttrs: n.documentElement, bodyAttrs: n.body } };
            const d = new Set();
            for (const p of ['body', 'head']) {
              const g = (f = n[p]) == null ? void 0 : f.children;
              for (const y of g) {
                const b = y.tagName.toLowerCase();
                if (!Os.has(b)) continue;
                const _ = {
                    tag: b,
                    props: await sd(
                      y
                        .getAttributeNames()
                        .reduce(
                          (x, C) => ({ ...x, [C]: y.getAttribute(C) }),
                          {}
                        )
                    ),
                    innerHTML: y.innerHTML
                  },
                  v = id(_);
                let h = v,
                  m = 1;
                for (; h && d.has(h); ) h = `${v}:${m++}`;
                h && ((_._d = h), d.add(h)),
                  (i.elMap[y.getAttribute('data-hid') || Oi(_)] = y);
              }
            }
          }
          (i.pendingSideEffects = { ...i.sideEffects }), (i.sideEffects = {});
          function a(d, p, g) {
            const y = `${d}:${p}`;
            (i.sideEffects[y] = g), delete i.pendingSideEffects[y];
          }
          function l({ id: d, $el: p, tag: g }) {
            const y = g.tag.endsWith('Attrs');
            if (
              ((i.elMap[d] = p),
              y ||
                (g.textContent &&
                  g.textContent !== p.textContent &&
                  (p.textContent = g.textContent),
                g.innerHTML &&
                  g.innerHTML !== p.innerHTML &&
                  (p.innerHTML = g.innerHTML),
                a(d, 'el', () => {
                  var b;
                  (b = i.elMap[d]) == null || b.remove(), delete i.elMap[d];
                })),
              g._eventHandlers)
            )
              for (const b in g._eventHandlers)
                Object.prototype.hasOwnProperty.call(g._eventHandlers, b) &&
                  p.getAttribute(`data-${b}`) !== '' &&
                  ((g.tag === 'bodyAttrs' ? n.defaultView : p).addEventListener(
                    b.substring(2),
                    g._eventHandlers[b].bind(p)
                  ),
                  p.setAttribute(`data-${b}`, ''));
            for (const b in g.props) {
              if (!Object.prototype.hasOwnProperty.call(g.props, b)) continue;
              const _ = g.props[b],
                v = `attr:${b}`;
              if (b === 'class') {
                if (!_) continue;
                for (const h of _.split(' '))
                  y && a(d, `${v}:${h}`, () => p.classList.remove(h)),
                    !p.classList.contains(h) && p.classList.add(h);
              } else if (b === 'style') {
                if (!_) continue;
                for (const h of _.split(';')) {
                  const m = h.indexOf(':'),
                    x = h.substring(0, m).trim(),
                    C = h.substring(m + 1).trim();
                  a(d, `${v}:${x}`, () => {
                    p.style.removeProperty(x);
                  }),
                    p.style.setProperty(x, C);
                }
              } else
                p.getAttribute(b) !== _ &&
                  p.setAttribute(b, _ === !0 ? '' : String(_)),
                  y && a(d, v, () => p.removeAttribute(b));
            }
          }
          const u = [],
            c = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
          for (const d of o) {
            const { tag: p, shouldRender: g, id: y } = d;
            if (g) {
              if (p.tag === 'title') {
                n.title = p.textContent;
                continue;
              }
              (d.$el = d.$el || i.elMap[y]),
                d.$el ? l(d) : Os.has(p.tag) && u.push(d);
            }
          }
          for (const d of u) {
            const p = d.tag.tagPosition || 'head';
            (d.$el = n.createElement(d.tag.tag)),
              l(d),
              (c[p] = c[p] || n.createDocumentFragment()),
              c[p].appendChild(d.$el);
          }
          for (const d of o) await e.hooks.callHook('dom:renderTag', d, n, a);
          c.head && n.head.appendChild(c.head),
            c.bodyOpen && n.body.insertBefore(c.bodyOpen, n.body.firstChild),
            c.bodyClose && n.body.appendChild(c.bodyClose);
          for (const d in i.pendingSideEffects) i.pendingSideEffects[d]();
          (e._dom = i),
            await e.hooks.callHook('dom:rendered', { renders: o }),
            s();
        }).finally(() => {
          (e._domUpdatePromise = void 0), (e.dirty = !1);
        })),
      e._domUpdatePromise
    );
}
function Qy(e, t = {}) {
  const n = t.delayFn || ((r) => setTimeout(r, 10));
  return (e._domDebouncedUpdatePromise =
    e._domDebouncedUpdatePromise ||
    new Promise((r) =>
      n(() =>
        ad(e, t).then(() => {
          delete e._domDebouncedUpdatePromise, r();
        })
      )
    ));
}
function Yy(e) {
  return (t) => {
    var r, s;
    const n =
      ((s =
        (r = t.resolvedOptions.document) == null
          ? void 0
          : r.head.querySelector('script[id="unhead:payload"]')) == null
        ? void 0
        : s.innerHTML) || !1;
    return (
      n && t.push(JSON.parse(n)),
      {
        mode: 'client',
        hooks: {
          'entries:updated': (o) => {
            Qy(o, e);
          }
        }
      }
    );
  };
}
const Xy = new Set(['templateParams', 'htmlAttrs', 'bodyAttrs']),
  Zy = {
    hooks: {
      'tag:normalise': ({ tag: e }) => {
        e.props.hid && ((e.key = e.props.hid), delete e.props.hid),
          e.props.vmid && ((e.key = e.props.vmid), delete e.props.vmid),
          e.props.key && ((e.key = e.props.key), delete e.props.key);
        const t = id(e);
        t &&
          !t.startsWith('meta:og:') &&
          !t.startsWith('meta:twitter:') &&
          delete e.key;
        const n = t || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      'tags:resolve': (e) => {
        const t = Object.create(null);
        for (const r of e.tags) {
          const s = (r.key ? `${r.tag}:${r.key}` : r._d) || Oi(r),
            o = t[s];
          if (o) {
            let a = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!a && Xy.has(r.tag) && (a = 'merge'), a === 'merge')) {
              const l = o.props;
              l.style &&
                r.props.style &&
                (l.style[l.style.length - 1] !== ';' && (l.style += ';'),
                (r.props.style = `${l.style} ${r.props.style}`)),
                l.class && r.props.class
                  ? (r.props.class = `${l.class} ${r.props.class}`)
                  : l.class && (r.props.class = l.class),
                (t[s].props = { ...l, ...r.props });
              continue;
            } else if (r._e === o._e) {
              (o._duped = o._duped || []),
                (r._d = `${o._d}:${o._duped.length + 1}`),
                o._duped.push(r);
              continue;
            } else if (ro(r) > ro(o)) continue;
          }
          if (
            !(
              r.innerHTML ||
              r.textContent ||
              Object.keys(r.props).length !== 0
            ) &&
            Os.has(r.tag)
          ) {
            delete t[s];
            continue;
          }
          t[s] = r;
        }
        const n = [];
        for (const r in t) {
          const s = t[r],
            o = s._duped;
          n.push(s), o && (delete s._duped, n.push(...o));
        }
        (e.tags = n),
          (e.tags = e.tags.filter(
            (r) =>
              !(
                r.tag === 'meta' &&
                (r.props.name || r.props.property) &&
                !r.props.content
              )
          ));
      }
    }
  },
  ev = new Set(['script', 'link', 'bodyAttrs']),
  tv = (e) => ({
    hooks: {
      'tags:resolve': (t) => {
        for (const n of t.tags) {
          if (!ev.has(n.tag)) continue;
          const r = n.props;
          for (const s in r) {
            if (
              s[0] !== 'o' ||
              s[1] !== 'n' ||
              !Object.prototype.hasOwnProperty.call(r, s)
            )
              continue;
            const o = r[s];
            typeof o == 'function' &&
              (e.ssr && Vl.has(s)
                ? (r[s] = `this.dataset.${s}fired = true`)
                : delete r[s],
              (n._eventHandlers = n._eventHandlers || {}),
              (n._eventHandlers[s] = o));
          }
          e.ssr &&
            n._eventHandlers &&
            (n.props.src || n.props.href) &&
            (n.key = n.key || Gr(n.props.src || n.props.href));
        }
      },
      'dom:renderTag': ({ $el: t, tag: n }) => {
        var s, o;
        const r = t == null ? void 0 : t.dataset;
        if (r)
          for (const i in r) {
            if (!i.endsWith('fired')) continue;
            const a = i.slice(0, -5);
            Vl.has(a) &&
              ((o = (s = n._eventHandlers) == null ? void 0 : s[a]) == null ||
                o.call(t, new Event(a.substring(2))));
          }
      }
    }
  }),
  nv = new Set(['link', 'style', 'script', 'noscript']),
  rv = {
    hooks: {
      'tag:normalise': ({ tag: e }) => {
        e.key && nv.has(e.tag) && (e.props['data-hid'] = e._h = Gr(e.key));
      }
    }
  },
  sv = {
    mode: 'server',
    hooks: {
      'tags:beforeResolve': (e) => {
        const t = {};
        let n = !1;
        for (const r of e.tags)
          r._m !== 'server' ||
            (r.tag !== 'titleTemplate' &&
              r.tag !== 'templateParams' &&
              r.tag !== 'title') ||
            ((t[r.tag] =
              r.tag === 'title' || r.tag === 'titleTemplate'
                ? r.textContent
                : r.props),
            (n = !0));
        n &&
          e.tags.push({
            tag: 'script',
            innerHTML: JSON.stringify(t),
            props: { id: 'unhead:payload', type: 'application/json' }
          });
      }
    }
  },
  ov = {
    hooks: {
      'tags:resolve': (e) => {
        var t;
        for (const n of e.tags)
          if (typeof n.tagPriority == 'string')
            for (const { prefix: r, offset: s } of Ky) {
              if (!n.tagPriority.startsWith(r)) continue;
              const o = n.tagPriority.substring(r.length),
                i =
                  (t = e.tags.find((a) => a._d === o)) == null ? void 0 : t._p;
              if (i !== void 0) {
                n._p = i + s;
                break;
              }
            }
        e.tags.sort((n, r) => {
          const s = ro(n),
            o = ro(r);
          return s < o ? -1 : s > o ? 1 : n._p - r._p;
        });
      }
    }
  },
  iv = { meta: 'content', link: 'href', htmlAttrs: 'lang' },
  av = ['innerHTML', 'textContent'],
  lv = (e) => ({
    hooks: {
      'tags:resolve': (t) => {
        var i;
        const { tags: n } = t;
        let r;
        for (let a = 0; a < n.length; a += 1)
          n[a].tag === 'templateParams' &&
            ((r = t.tags.splice(a, 1)[0].props), (a -= 1));
        const s = r || {},
          o = s.separator || '|';
        delete s.separator,
          (s.pageTitle = Ss(
            s.pageTitle ||
              ((i = n.find((a) => a.tag === 'title')) == null
                ? void 0
                : i.textContent) ||
              '',
            s,
            o
          ));
        for (const a of n) {
          if (a.processTemplateParams === !1) continue;
          const l = iv[a.tag];
          if (l && typeof a.props[l] == 'string')
            a.props[l] = Ss(a.props[l], s, o);
          else if (
            a.processTemplateParams ||
            a.tag === 'titleTemplate' ||
            a.tag === 'title'
          )
            for (const u of av)
              typeof a[u] == 'string' &&
                (a[u] = Ss(
                  a[u],
                  s,
                  o,
                  a.tag === 'script' && a.props.type.endsWith('json')
                ));
        }
        (e._templateParams = s), (e._separator = o);
      },
      'tags:afterResolve': ({ tags: t }) => {
        let n;
        for (let r = 0; r < t.length; r += 1) {
          const s = t[r];
          s.tag === 'title' && s.processTemplateParams !== !1 && (n = s);
        }
        n != null &&
          n.textContent &&
          (n.textContent = Ss(n.textContent, e._templateParams, e._separator));
      }
    }
  }),
  cv = {
    hooks: {
      'tags:resolve': (e) => {
        const { tags: t } = e;
        let n, r;
        for (let s = 0; s < t.length; s += 1) {
          const o = t[s];
          o.tag === 'title' ? (n = o) : o.tag === 'titleTemplate' && (r = o);
        }
        if (r && n) {
          const s = $i(r.textContent, n.textContent);
          s !== null
            ? (n.textContent = s || n.textContent)
            : e.tags.splice(e.tags.indexOf(n), 1);
        } else if (r) {
          const s = $i(r.textContent);
          s !== null && ((r.textContent = s), (r.tag = 'title'), (r = void 0));
        }
        r && e.tags.splice(e.tags.indexOf(r), 1);
      }
    }
  },
  uv = {
    hooks: {
      'tags:afterResolve': (e) => {
        for (const t of e.tags)
          typeof t.innerHTML == 'string' &&
            (t.innerHTML &&
            (t.props.type === 'application/ld+json' ||
              t.props.type === 'application/json')
              ? (t.innerHTML = t.innerHTML.replace(/</g, '\\u003C'))
              : (t.innerHTML = t.innerHTML.replace(
                  new RegExp(`</${t.tag}`, 'g'),
                  `<\\/${t.tag}`
                )));
      }
    }
  };
let ld;
function fv(e = {}) {
  const t = dv(e);
  return t.use(Yy()), (ld = t);
}
function ql(e, t) {
  return !e || (e === 'server' && t) || (e === 'client' && !t);
}
function dv(e = {}) {
  const t = Kf();
  t.addHooks(e.hooks || {}),
    (e.document = e.document || (By ? document : void 0));
  const n = !e.document,
    r = () => {
      (a.dirty = !0), t.callHook('entries:updated', a);
    };
  let s = 0,
    o = [];
  const i = [],
    a = {
      plugins: i,
      dirty: !1,
      resolvedOptions: e,
      hooks: t,
      headEntries() {
        return o;
      },
      use(l) {
        const u = typeof l == 'function' ? l(a) : l;
        (!u.key || !i.some((c) => c.key === u.key)) &&
          (i.push(u), ql(u.mode, n) && t.addHooks(u.hooks || {}));
      },
      push(l, u) {
        u == null || delete u.head;
        const c = { _i: s++, input: l, ...u };
        return (
          ql(c.mode, n) && (o.push(c), r()),
          {
            dispose() {
              (o = o.filter((f) => f._i !== c._i)), r();
            },
            patch(f) {
              for (const d of o) d._i === c._i && (d.input = c.input = f);
              r();
            }
          }
        );
      },
      async resolveTags() {
        const l = { tags: [], entries: [...o] };
        await t.callHook('entries:resolve', l);
        for (const u of l.entries) {
          const c = u.resolvedInput || u.input;
          if (
            ((u.resolvedInput = await (u.transform ? u.transform(c) : c)),
            u.resolvedInput)
          )
            for (const f of await Wy(u)) {
              const d = {
                tag: f,
                entry: u,
                resolvedOptions: a.resolvedOptions
              };
              await t.callHook('tag:normalise', d), l.tags.push(d.tag);
            }
        }
        return (
          await t.callHook('tags:beforeResolve', l),
          await t.callHook('tags:resolve', l),
          await t.callHook('tags:afterResolve', l),
          l.tags
        );
      },
      ssr: n
    };
  return (
    [
      Zy,
      sv,
      tv,
      rv,
      ov,
      lv,
      cv,
      uv,
      ...((e == null ? void 0 : e.plugins) || [])
    ].forEach((l) => a.use(l)),
    a.hooks.callHook('init', a),
    a
  );
}
function pv() {
  return ld;
}
function hv(e) {
  return (
    e.key || Gr(e.src || (typeof e.innerHTML == 'string' ? e.innerHTML : ''))
  );
}
const gv = Pf[0] === '3';
function mv(e) {
  return typeof e == 'function' ? e() : E(e);
}
function so(e) {
  if (e instanceof Promise || e instanceof Date || e instanceof RegExp)
    return e;
  const t = mv(e);
  if (!e || !t) return t;
  if (Array.isArray(t)) return t.map((n) => so(n));
  if (typeof t == 'object') {
    const n = {};
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r)) {
        if (r === 'titleTemplate' || (r[0] === 'o' && r[1] === 'n')) {
          n[r] = E(t[r]);
          continue;
        }
        n[r] = so(t[r]);
      }
    return n;
  }
  return t;
}
const yv = {
    hooks: {
      'entries:resolve': (e) => {
        for (const t of e.entries) t.resolvedInput = so(t.input);
      }
    }
  },
  cd = 'usehead';
function vv(e) {
  return {
    install(n) {
      gv &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(cd, e));
    }
  }.install;
}
function bv(e = {}) {
  e.domDelayFn = e.domDelayFn || ((n) => Ft(() => setTimeout(() => n(), 0)));
  const t = fv(e);
  return t.use(yv), (t.install = vv(t)), t;
}
const Mi =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  Li = '__unhead_injection_handler__';
function wv(e) {
  Mi[Li] = e;
}
function _v() {
  return Li in Mi ? Mi[Li]() : Ae(cd) || pv();
}
function xv(e, t = {}) {
  const n = t.head || _v();
  if (n) return n.ssr ? n.push(e, t) : Sv(n, e, t);
}
function Sv(e, t, n = {}) {
  const r = X(!1),
    s = X({});
  jt(() => {
    s.value = r.value ? {} : so(t);
  });
  const o = e.push(s.value, n);
  return (
    Pe(s, (a) => {
      o.patch(a);
    }),
    Ve() &&
      (cr(() => {
        o.dispose();
      }),
      _a(() => {
        r.value = !0;
      }),
      wa(() => {
        r.value = !1;
      })),
    o
  );
}
const Cv = 'modulepreload',
  kv = function (e, t) {
    return new URL(e, t).href;
  },
  Gl = {},
  yt = function (t, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      const i = document.getElementsByTagName('link'),
        a = document.querySelector('meta[property=csp-nonce]'),
        l =
          (a == null ? void 0 : a.nonce) ||
          (a == null ? void 0 : a.getAttribute('nonce'));
      s = Promise.allSettled(
        n.map((u) => {
          if (((u = kv(u, r)), u in Gl)) return;
          Gl[u] = !0;
          const c = u.endsWith('.css'),
            f = c ? '[rel="stylesheet"]' : '';
          if (!!r)
            for (let g = i.length - 1; g >= 0; g--) {
              const y = i[g];
              if (y.href === u && (!c || y.rel === 'stylesheet')) return;
            }
          else if (document.querySelector(`link[href="${u}"]${f}`)) return;
          const p = document.createElement('link');
          if (
            ((p.rel = c ? 'stylesheet' : Cv),
            c || (p.as = 'script'),
            (p.crossOrigin = ''),
            (p.href = u),
            l && p.setAttribute('nonce', l),
            document.head.appendChild(p),
            c)
          )
            return new Promise((g, y) => {
              p.addEventListener('load', g),
                p.addEventListener('error', () =>
                  y(new Error(`Unable to preload CSS for ${u}`))
                );
            });
        })
      );
    }
    function o(i) {
      const a = new Event('vite:preloadError', { cancelable: !0 });
      if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
        throw i;
    }
    return s.then((i) => {
      for (const a of i || []) a.status === 'rejected' && o(a.reason);
      return t().catch(o);
    });
  };
let Is, Ni;
function Ev() {
  return (
    (Is = $fetch(Pa(`builds/meta/${bt().app.buildId}.json`), {
      responseType: 'json'
    })),
    Is.then((e) => {
      Ni = _y(e.matcher);
    }).catch((e) => {}),
    Is
  );
}
function _o() {
  return Is || Ev();
}
async function Oa(e) {
  const t = typeof e == 'string' ? e : e.path;
  if ((await _o(), !Ni)) return {};
  try {
    return nn({}, ...Ni.matchAll(t).reverse());
  } catch {
    return {};
  }
}
async function Jl(e, t = {}) {
  const n = await Av(e, t),
    r = de(),
    s = (r._payloadCache = r._payloadCache || {});
  return n in s
    ? s[n] || null
    : ((s[n] = fd(e).then((o) =>
        o ? ud(n).then((i) => i || (delete s[n], null)) : ((s[n] = null), null)
      )),
      s[n]);
}
const Tv = '_payload.json';
async function Av(e, t = {}) {
  const n = new URL(e, 'http://localhost');
  if (n.host !== 'localhost' || ft(n.pathname, { acceptRelative: !0 }))
    throw new Error('Payload URL must not include hostname: ' + e);
  const r = bt(),
    s = t.hash || (t.fresh ? Date.now() : r.app.buildId),
    o = r.app.cdnURL,
    i = o && (await fd(e)) ? o : r.app.baseURL;
  return ss(i, n.pathname, Tv + (s ? `?${s}` : ''));
}
async function ud(e) {
  const t = fetch(e).then((n) => n.text().then(dd));
  try {
    return await t;
  } catch {}
  return null;
}
async function fd(e = fr().path) {
  const t = de();
  return (
    (e = Fn(e)),
    (await _o()).prerendered.includes(e)
      ? !0
      : t.runWithContext(async () => {
          const r = await Oa({ path: e });
          return !!r.prerender && !r.redirect;
        })
  );
}
let Tn = null;
async function Pv() {
  var r;
  if (Tn) return Tn;
  const e = document.getElementById('__NUXT_DATA__');
  if (!e) return {};
  const t = await dd(e.textContent || ''),
    n = e.dataset.src ? await ud(e.dataset.src) : void 0;
  return (
    (Tn = { ...t, ...n, ...window.__NUXT__ }),
    (r = Tn.config) != null &&
      r.public &&
      (Tn.config.public = tt(Tn.config.public)),
    Tn
  );
}
async function dd(e) {
  return await Ny(e, de()._payloadRevivers);
}
function Rv(e, t) {
  de()._payloadRevivers[e] = t;
}
const Ov = [
    ['NuxtError', (e) => wo(e)],
    [
      'EmptyShallowRef',
      (e) => At(e === '_' ? void 0 : e === '0n' ? BigInt(0) : Ys(e))
    ],
    ['EmptyRef', (e) => X(e === '_' ? void 0 : e === '0n' ? BigInt(0) : Ys(e))],
    ['ShallowRef', (e) => At(e)],
    ['ShallowReactive', (e) => Jt(e)],
    ['Ref', (e) => X(e)],
    ['Reactive', (e) => tt(e)]
  ],
  Iv = je({
    name: 'nuxt:revive-payload:client',
    order: -30,
    async setup(e) {
      let t, n;
      for (const [r, s] of Ov) Rv(r, s);
      Object.assign(
        e.payload,
        (([t, n] = er(() => e.runWithContext(Pv))), (t = await t), n(), t)
      ),
        (window.__NUXT__ = e.payload);
    }
  });
function $v(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function pd(e, t) {
  const n = [],
    r = t.resolveKeyData || ((o) => o.key),
    s = t.resolveValueData || ((o) => o.value);
  for (const [o, i] of Object.entries(e))
    n.push(
      ...(Array.isArray(i) ? i : [i])
        .map((a) => {
          const l = { key: o, value: a },
            u = s(l);
          return typeof u == 'object'
            ? pd(u, t)
            : Array.isArray(u)
              ? u
              : {
                  [typeof t.key == 'function' ? t.key(l) : t.key]: r(l),
                  [typeof t.value == 'function' ? t.value(l) : t.value]: u
                };
        })
        .flat()
    );
  return n;
}
function hd(e, t) {
  return Object.entries(e)
    .map(([n, r]) => {
      if ((typeof r == 'object' && (r = hd(r, t)), t.resolve)) {
        const s = t.resolve({ key: n, value: r });
        if (typeof s < 'u') return s;
      }
      return (
        typeof r == 'number' && (r = r.toString()),
        typeof r == 'string' &&
          t.wrapValue &&
          ((r = r.replace(new RegExp(t.wrapValue, 'g'), `\\${t.wrapValue}`)),
          (r = `${t.wrapValue}${r}${t.wrapValue}`)),
        `${n}${t.keyValueSeparator || ''}${r}`
      );
    })
    .join(t.entrySeparator || '');
}
const Qe = (e) => ({ keyValue: e, metaKey: 'property' }),
  zo = (e) => ({ keyValue: e }),
  Ia = {
    appleItunesApp: {
      unpack: {
        entrySeparator: ', ',
        resolve({ key: e, value: t }) {
          return `${Qt(e)}=${t}`;
        }
      }
    },
    articleExpirationTime: Qe('article:expiration_time'),
    articleModifiedTime: Qe('article:modified_time'),
    articlePublishedTime: Qe('article:published_time'),
    bookReleaseDate: Qe('book:release_date'),
    charset: { metaKey: 'charset' },
    contentSecurityPolicy: {
      unpack: {
        entrySeparator: '; ',
        resolve({ key: e, value: t }) {
          return `${Qt(e)} ${t}`;
        }
      },
      metaKey: 'http-equiv'
    },
    contentType: { metaKey: 'http-equiv' },
    defaultStyle: { metaKey: 'http-equiv' },
    fbAppId: Qe('fb:app_id'),
    msapplicationConfig: zo('msapplication-Config'),
    msapplicationTileColor: zo('msapplication-TileColor'),
    msapplicationTileImage: zo('msapplication-TileImage'),
    ogAudioSecureUrl: Qe('og:audio:secure_url'),
    ogAudioUrl: Qe('og:audio'),
    ogImageSecureUrl: Qe('og:image:secure_url'),
    ogImageUrl: Qe('og:image'),
    ogSiteName: Qe('og:site_name'),
    ogVideoSecureUrl: Qe('og:video:secure_url'),
    ogVideoUrl: Qe('og:video'),
    profileFirstName: Qe('profile:first_name'),
    profileLastName: Qe('profile:last_name'),
    profileUsername: Qe('profile:username'),
    refresh: {
      metaKey: 'http-equiv',
      unpack: {
        entrySeparator: ';',
        resolve({ key: e, value: t }) {
          if (e === 'seconds') return `${t}`;
        }
      }
    },
    robots: {
      unpack: {
        entrySeparator: ', ',
        resolve({ key: e, value: t }) {
          return typeof t == 'boolean' ? `${Qt(e)}` : `${Qt(e)}:${t}`;
        }
      }
    },
    xUaCompatible: { metaKey: 'http-equiv' }
  },
  gd = new Set(['og', 'book', 'article', 'profile']);
function md(e) {
  var r;
  const t = Qt(e),
    n = t.indexOf(':');
  return gd.has(t.substring(0, n))
    ? 'property'
    : ((r = Ia[e]) == null ? void 0 : r.metaKey) || 'name';
}
function Mv(e) {
  var t;
  return ((t = Ia[e]) == null ? void 0 : t.keyValue) || Qt(e);
}
function Qt(e) {
  const t = e.replace(/([A-Z])/g, '-$1').toLowerCase(),
    n = t.indexOf('-'),
    r = t.substring(0, n);
  return r === 'twitter' || gd.has(r)
    ? e.replace(/([A-Z])/g, ':$1').toLowerCase()
    : t;
}
function ji(e) {
  if (Array.isArray(e)) return e.map((n) => ji(n));
  if (typeof e != 'object' || Array.isArray(e)) return e;
  const t = {};
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[Qt(n)] = ji(e[n]));
  return t;
}
function Lv(e, t) {
  const n = Ia[t];
  return t === 'refresh'
    ? `${e.seconds};url=${e.url}`
    : hd(ji(e), {
        keyValueSeparator: '=',
        entrySeparator: ', ',
        resolve({ value: r, key: s }) {
          if (r === null) return '';
          if (typeof r == 'boolean') return `${s}`;
        },
        ...(n == null ? void 0 : n.unpack)
      });
}
const yd = new Set(['og:image', 'og:video', 'og:audio', 'twitter:image']);
function vd(e) {
  const t = {};
  for (const n in e) {
    if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
    const r = e[n];
    String(r) !== 'false' && n && (t[n] = r);
  }
  return t;
}
function Ql(e, t) {
  const n = vd(t),
    r = Qt(e),
    s = md(r);
  if (yd.has(r)) {
    const o = {};
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) &&
        (o[`${e}${i === 'url' ? '' : `${i[0].toUpperCase()}${i.slice(1)}`}`] =
          n[i]);
    return $a(o).sort((i, a) => {
      var l, u;
      return (
        (((l = i[s]) == null ? void 0 : l.length) || 0) -
        (((u = a[s]) == null ? void 0 : u.length) || 0)
      );
    });
  }
  return [{ [s]: r, ...n }];
}
function $a(e) {
  const t = [],
    n = {};
  for (const s in e) {
    if (!Object.prototype.hasOwnProperty.call(e, s)) continue;
    const o = e[s];
    if (!Array.isArray(o)) {
      if (typeof o == 'object' && o) {
        if (yd.has(Qt(s))) {
          t.push(...Ql(s, o));
          continue;
        }
        n[s] = vd(o);
      } else n[s] = o;
      continue;
    }
    for (const i of o)
      t.push(...(typeof i == 'string' ? $a({ [s]: i }) : Ql(s, i)));
  }
  const r = pd(n, {
    key({ key: s }) {
      return md(s);
    },
    value({ key: s }) {
      return s === 'charset' ? 'charset' : 'content';
    },
    resolveKeyData({ key: s }) {
      return Mv(s);
    },
    resolveValueData({ value: s, key: o }) {
      return s === null
        ? '_null'
        : typeof s == 'object'
          ? Lv(s, o)
          : typeof s == 'number'
            ? s.toString()
            : s;
    }
  });
  return [...t, ...r].map(
    (s) => (s.content === '_null' && (s.content = null), s)
  );
}
const Nv = new Set(['onload', 'onerror']);
let jv;
function bd() {
  return jv;
}
const wd = Symbol('ScriptProxyTarget');
function _d() {}
_d[wd] = !0;
function Hv(e) {
  return (
    e.key || $v(e.src || (typeof e.innerHTML == 'string' ? e.innerHTML : ''))
  );
}
function Fv(e, t) {
  var y, b, _;
  const n = typeof e == 'string' ? { src: e } : e,
    r = t || {},
    s = r.head || bd();
  if (!s) throw new Error('Missing Unhead context.');
  const o = Hv(n),
    i = (y = s._scripts) == null ? void 0 : y[o];
  if (i) return i.setupTriggerHandler(r.trigger), i;
  (b = r.beforeInit) == null || b.call(r);
  const a = (v) => {
    (f.status = v), s.hooks.callHook('script:updated', d);
  };
  Nv.forEach((v) => {
    const h = typeof n[v] == 'function' ? n[v].bind(r.eventContext) : null;
    n[v] = (m) => {
      a(v === 'onload' ? 'loaded' : v === 'onerror' ? 'error' : 'loading'),
        h == null || h(m);
    };
  });
  const l = { loaded: [], error: [] },
    u = (v, h) => {
      if (l[v]) {
        const m = l[v].push(h);
        return () => {
          var x;
          return (x = l[v]) == null ? void 0 : x.splice(m - 1, 1);
        };
      }
      return h(f.instance), () => {};
    },
    c = new Promise((v) => {
      if (s.ssr) return;
      const h = (x) => requestAnimationFrame(() => v(x)),
        m = s.hooks.hook('script:updated', ({ script: x }) => {
          const C = x.status;
          if (x.id === o && (C === 'loaded' || C === 'error')) {
            if (C === 'loaded')
              if (typeof r.use == 'function') {
                const P = r.use();
                P && h(P);
              } else h({});
            else C === 'error' && v(!1);
            m();
          }
        });
    }),
    f = Object.assign(c, {
      instance:
        (!s.ssr &&
          ((_ = r == null ? void 0 : r.use) == null ? void 0 : _.call(r))) ||
        null,
      proxy: null,
      id: o,
      status: 'awaitingLoad',
      remove() {
        var v, h;
        return (
          (v = f._triggerAbortController) == null || v.abort(),
          (f._triggerPromises = []),
          f.entry
            ? (f.entry.dispose(),
              a('removed'),
              (h = s._scripts) == null || delete h[o],
              !0)
            : !1
        );
      },
      load(v) {
        var h;
        if (
          ((h = f._triggerAbortController) == null || h.abort(),
          (f._triggerPromises = []),
          !f.entry)
        ) {
          a('loading');
          const m = { defer: !0, fetchpriority: 'low' };
          n.src &&
            (n.src.startsWith('http') || n.src.startsWith('//')) &&
            ((m.crossorigin = 'anonymous'), (m.referrerpolicy = 'no-referrer')),
            (f.entry = s.push(
              { script: [{ ...m, ...n, key: `script.${o}` }] },
              r
            ));
        }
        return v && u('loaded', v), c;
      },
      onLoaded(v) {
        return u('loaded', v);
      },
      onError(v) {
        return u('error', v);
      },
      setupTriggerHandler(v) {
        if (f.status === 'awaitingLoad')
          if (((typeof v > 'u' || v === 'client') && !s.ssr) || v === 'server')
            f.load();
          else if (v instanceof Promise) {
            if (s.ssr) return;
            f._triggerAbortController ||
              ((f._triggerAbortController = new AbortController()),
              (f._triggerAbortPromise = new Promise((m) => {
                f._triggerAbortController.signal.addEventListener(
                  'abort',
                  () => {
                    (f._triggerAbortController = null), m();
                  }
                );
              }))),
              (f._triggerPromises = f._triggerPromises || []);
            const h = f._triggerPromises.push(
              Promise.race([
                v.then((m) => (typeof m > 'u' || m ? f.load : void 0)),
                f._triggerAbortPromise
              ])
                .catch(() => {})
                .then((m) => {
                  m == null || m();
                })
                .finally(() => {
                  var m;
                  (m = f._triggerPromises) == null || m.splice(h, 1);
                })
            );
          } else typeof v == 'function' && v(f.load);
      },
      _cbs: l
    });
  c.then((v) => {
    var h, m;
    v !== !1
      ? ((f.instance = v),
        (h = l.loaded) == null || h.forEach((x) => x(v)),
        (l.loaded = null))
      : ((m = l.error) == null || m.forEach((x) => x()), (l.error = null));
  });
  const d = { script: f };
  f.setupTriggerHandler(r.trigger), (f.$script = f);
  const p = (v, h, m) =>
    new Proxy((h ? (v == null ? void 0 : v[h]) : v) || _d, {
      get(x, C, P) {
        var N;
        if (
          (s.hooks.callHook('script:instance-fn', {
            script: f,
            fn: C,
            exists: C in x
          }),
          !h)
        ) {
          const R =
            (N = r.stub) == null ? void 0 : N.call(r, { script: f, fn: C });
          if (R) return R;
        }
        return x && C in x && typeof x[C] < 'u'
          ? Reflect.get(x, C, P)
          : C === Symbol.iterator
            ? [][Symbol.iterator]
            : p(h ? (v == null ? void 0 : v[h]) : v, C, m || [C]);
      },
      async apply(x, C, P) {
        if (s.ssr && x[wd]) return;
        let N;
        const R = (D) => {
          N = D || N;
          for (let k = 0; k < (m || []).length; k++) {
            const M = (m || [])[k];
            D = D == null ? void 0 : D[M];
          }
          return D;
        };
        let A = R(f.instance);
        return (
          A ||
            (A = await new Promise((D) => {
              f.onLoaded((k) => {
                D(R(k));
              });
            })),
          typeof A == 'function' ? Reflect.apply(A, N, P) : A
        );
      }
    });
  f.proxy = p(f.instance);
  const g = new Proxy(f, {
    get(v, h) {
      const m = h in f || String(h)[0] === '_' ? f : f.proxy;
      return h === 'then' || h === 'catch'
        ? f[h].bind(f)
        : Reflect.get(m, h, m);
    }
  });
  return (s._scripts = Object.assign(s._scripts || {}, { [o]: g })), g;
}
function Dv(e) {
  return typeof e == 'function' ? e() : E(e);
}
function Hi(e) {
  if (e instanceof Promise || e instanceof Date || e instanceof RegExp)
    return e;
  const t = Dv(e);
  if (!e || !t) return t;
  if (Array.isArray(t)) return t.map((n) => Hi(n));
  if (typeof t == 'object') {
    const n = {};
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r)) {
        if (r === 'titleTemplate' || (r[0] === 'o' && r[1] === 'n')) {
          n[r] = E(t[r]);
          continue;
        }
        n[r] = Hi(t[r]);
      }
    return n;
  }
  return t;
}
const Bv = 'usehead',
  Yl =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  Xl = '__unhead_injection_handler__';
function as() {
  return Xl in Yl ? Yl[Xl]() : Ae(Bv) || bd();
}
function ls(e, t = {}) {
  const n = t.head || as();
  if (n) return n.ssr ? n.push(e, t) : Uv(n, e, t);
}
function Uv(e, t, n = {}) {
  const r = X(!1),
    s = X({});
  jt(() => {
    s.value = r.value ? {} : Hi(t);
  });
  const o = e.push(s.value, n);
  return (
    Pe(s, (a) => {
      o.patch(a);
    }),
    Ve() &&
      (cr(() => {
        o.dispose();
      }),
      _a(() => {
        r.value = !0;
      }),
      wa(() => {
        r.value = !1;
      })),
    o
  );
}
function zv(e, t) {
  if (!t) return;
  const n = (r, s) => {
    if (!e._cbs[r]) return s(e.instance), () => {};
    let o = e._cbs[r].push(s);
    const i = () => {
      var a;
      o && ((a = e._cbs[r]) == null || a.splice(o - 1, 1), (o = null));
    };
    return js(i), i;
  };
  (e.onLoaded = (r) => n('loaded', r)),
    (e.onError = (r) => n('error', r)),
    js(() => {
      var r;
      (r = e._triggerAbortController) == null || r.abort();
    });
}
function Vv(e, t) {
  const n = typeof e == 'string' ? { src: e } : e,
    r = t || {},
    s = (r == null ? void 0 : r.head) || as();
  r.head = s;
  const o = Ve();
  if (((r.eventContext = o), o && typeof r.trigger > 'u')) r.trigger = dt;
  else if (Te(r.trigger)) {
    const a = r.trigger;
    let l;
    r.trigger = new Promise((u) => {
      (l = Pe(
        a,
        (c) => {
          c && u(!0);
        },
        { immediate: !0 }
      )),
        js(() => u(!1), !0);
    }).then((u) => (l == null || l(), u));
  }
  s._scriptStatusWatcher =
    s._scriptStatusWatcher ||
    s.hooks.hook('script:updated', ({ script: a }) => {
      a._statusRef.value = a.status;
    });
  const i = Fv(n, r);
  return (
    (i._statusRef = i._statusRef || X(i.status)),
    zv(i, o),
    new Proxy(i, {
      get(a, l, u) {
        return Reflect.get(a, l === 'status' ? '_statusRef' : l, u);
      }
    })
  );
}
function Wv(e, t) {
  const { title: n, titleTemplate: r, ...s } = e;
  return ls(
    { title: n, titleTemplate: r, _flatMeta: s },
    {
      ...t,
      transform(o) {
        const i = $a({ ...o._flatMeta });
        return delete o._flatMeta, { ...o, meta: i };
      }
    }
  );
}
const Kv = [],
  qv = je({
    name: 'nuxt:head',
    enforce: 'pre',
    setup(e) {
      const t = bv({ plugins: Kv });
      wv(() => de().vueApp._context.provides.usehead), e.vueApp.use(t);
      {
        let n = !0;
        const r = async () => {
          (n = !1), await ad(t);
        };
        t.hooks.hook('dom:beforeRender', (s) => {
          s.shouldRender = !n;
        }),
          e.hooks.hook('page:start', () => {
            n = !0;
          }),
          e.hooks.hook('page:finish', () => {
            e.isHydrating || r();
          }),
          e.hooks.hook('app:error', r),
          e.hooks.hook('app:suspense:resolve', r);
      }
    }
  });
/*!
 * vue-router v4.5.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const Wn = typeof document < 'u';
function xd(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function Gv(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === 'Module' ||
    (e.default && xd(e.default))
  );
}
const ye = Object.assign;
function Vo(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Rt(s) ? s.map(e) : e(s);
  }
  return n;
}
const Fr = () => {},
  Rt = Array.isArray,
  Sd = /#/g,
  Jv = /&/g,
  Qv = /\//g,
  Yv = /=/g,
  Xv = /\?/g,
  Cd = /\+/g,
  Zv = /%5B/g,
  eb = /%5D/g,
  kd = /%5E/g,
  tb = /%60/g,
  Ed = /%7B/g,
  nb = /%7C/g,
  Td = /%7D/g,
  rb = /%20/g;
function Ma(e) {
  return encodeURI('' + e)
    .replace(nb, '|')
    .replace(Zv, '[')
    .replace(eb, ']');
}
function sb(e) {
  return Ma(e).replace(Ed, '{').replace(Td, '}').replace(kd, '^');
}
function Fi(e) {
  return Ma(e)
    .replace(Cd, '%2B')
    .replace(rb, '+')
    .replace(Sd, '%23')
    .replace(Jv, '%26')
    .replace(tb, '`')
    .replace(Ed, '{')
    .replace(Td, '}')
    .replace(kd, '^');
}
function ob(e) {
  return Fi(e).replace(Yv, '%3D');
}
function ib(e) {
  return Ma(e).replace(Sd, '%23').replace(Xv, '%3F');
}
function ab(e) {
  return e == null ? '' : ib(e).replace(Qv, '%2F');
}
function Jr(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
const lb = /\/$/,
  cb = (e) => e.replace(lb, '');
function Wo(e, t, n = '/') {
  let r,
    s = {},
    o = '',
    i = '';
  const a = t.indexOf('#');
  let l = t.indexOf('?');
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((r = t.slice(0, l)),
      (o = t.slice(l + 1, a > -1 ? a : t.length)),
      (s = e(o))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = pb(r ?? t, n)),
    { fullPath: r + (o && '?') + o + i, path: r, query: s, hash: Jr(i) }
  );
}
function ub(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function Zl(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function fb(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    ir(t.matched[r], n.matched[s]) &&
    Ad(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function ir(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ad(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!db(e[n], t[n])) return !1;
  return !0;
}
function db(e, t) {
  return Rt(e) ? ec(e, t) : Rt(t) ? ec(t, e) : e === t;
}
function ec(e, t) {
  return Rt(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function pb(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/'),
    s = r[r.length - 1];
  (s === '..' || s === '.') && r.push('');
  let o = n.length - 1,
    i,
    a;
  for (i = 0; i < r.length; i++)
    if (((a = r[i]), a !== '.'))
      if (a === '..') o > 1 && o--;
      else break;
  return n.slice(0, o).join('/') + '/' + r.slice(i).join('/');
}
const St = {
  path: '/',
  name: void 0,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var Qr;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(Qr || (Qr = {}));
var Dr;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(Dr || (Dr = {}));
function hb(e) {
  if (!e)
    if (Wn) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), cb(e);
}
const gb = /^[^#]+#/;
function mb(e, t) {
  return e.replace(gb, '#') + t;
}
function yb(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const xo = () => ({ left: window.scrollX, top: window.scrollY });
function vb(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = yb(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY
      );
}
function tc(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Di = new Map();
function bb(e, t) {
  Di.set(e, t);
}
function wb(e) {
  const t = Di.get(e);
  return Di.delete(e), t;
}
let _b = () => location.protocol + '//' + location.host;
function Pd(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf('#');
  if (o > -1) {
    let a = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = s.slice(a);
    return l[0] !== '/' && (l = '/' + l), Zl(l, '');
  }
  return Zl(n, e) + r + s;
}
function xb(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const a = ({ state: d }) => {
    const p = Pd(e, location),
      g = n.value,
      y = t.value;
    let b = 0;
    if (d) {
      if (((n.value = p), (t.value = d), i && i === g)) {
        i = null;
        return;
      }
      b = y ? d.position - y.position : 0;
    } else r(p);
    s.forEach((_) => {
      _(n.value, g, {
        delta: b,
        type: Qr.pop,
        direction: b ? (b > 0 ? Dr.forward : Dr.back) : Dr.unknown
      });
    });
  };
  function l() {
    i = n.value;
  }
  function u(d) {
    s.push(d);
    const p = () => {
      const g = s.indexOf(d);
      g > -1 && s.splice(g, 1);
    };
    return o.push(p), p;
  }
  function c() {
    const { history: d } = window;
    d.state && d.replaceState(ye({}, d.state, { scroll: xo() }), '');
  }
  function f() {
    for (const d of o) d();
    (o = []),
      window.removeEventListener('popstate', a),
      window.removeEventListener('beforeunload', c);
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', c, { passive: !0 }),
    { pauseListeners: l, listen: u, destroy: f }
  );
}
function nc(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? xo() : null
  };
}
function Sb(e) {
  const { history: t, location: n } = window,
    r = { value: Pd(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
      },
      !0
    );
  function o(l, u, c) {
    const f = e.indexOf('#'),
      d =
        f > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(f)) + l
          : _b() + e + l;
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', d), (s.value = u);
    } catch {
      n[c ? 'replace' : 'assign'](d);
    }
  }
  function i(l, u) {
    const c = ye({}, t.state, nc(s.value.back, l, s.value.forward, !0), u, {
      position: s.value.position
    });
    o(l, c, !0), (r.value = l);
  }
  function a(l, u) {
    const c = ye({}, s.value, t.state, { forward: l, scroll: xo() });
    o(c.current, c, !0);
    const f = ye({}, nc(r.value, l, null), { position: c.position + 1 }, u);
    o(l, f, !1), (r.value = l);
  }
  return { location: r, state: s, push: a, replace: i };
}
function Cb(e) {
  e = hb(e);
  const t = Sb(e),
    n = xb(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = ye(
    { location: '', base: e, go: r, createHref: mb.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value
    }),
    s
  );
}
function kb(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function Rd(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const Od = Symbol('');
var rc;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(rc || (rc = {}));
function ar(e, t) {
  return ye(new Error(), { type: e, [Od]: !0 }, t);
}
function Ut(e, t) {
  return e instanceof Error && Od in e && (t == null || !!(e.type & t));
}
const sc = '[^/]+?',
  Eb = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Tb = /[.+*?^${}()[\]/\\]/g;
function Ab(e, t) {
  const n = ye({}, Eb, t),
    r = [];
  let s = n.start ? '^' : '';
  const o = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (s += '/');
    for (let f = 0; f < u.length; f++) {
      const d = u[f];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (s += '/'), (s += d.value.replace(Tb, '\\$&')), (p += 40);
      else if (d.type === 1) {
        const { value: g, repeatable: y, optional: b, regexp: _ } = d;
        o.push({ name: g, repeatable: y, optional: b });
        const v = _ || sc;
        if (v !== sc) {
          p += 10;
          try {
            new RegExp(`(${v})`);
          } catch (m) {
            throw new Error(
              `Invalid custom RegExp for param "${g}" (${v}): ` + m.message
            );
          }
        }
        let h = y ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
        f || (h = b && u.length < 2 ? `(?:/${h})` : '/' + h),
          b && (h += '?'),
          (s += h),
          (p += 20),
          b && (p += -8),
          y && (p += -20),
          v === '.*' && (p += -50);
      }
      c.push(p);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'),
    n.end ? (s += '$') : n.strict && !s.endsWith('/') && (s += '(?:/|$)');
  const i = new RegExp(s, n.sensitive ? '' : 'i');
  function a(u) {
    const c = u.match(i),
      f = {};
    if (!c) return null;
    for (let d = 1; d < c.length; d++) {
      const p = c[d] || '',
        g = o[d - 1];
      f[g.name] = p && g.repeatable ? p.split('/') : p;
    }
    return f;
  }
  function l(u) {
    let c = '',
      f = !1;
    for (const d of e) {
      (!f || !c.endsWith('/')) && (c += '/'), (f = !1);
      for (const p of d)
        if (p.type === 0) c += p.value;
        else if (p.type === 1) {
          const { value: g, repeatable: y, optional: b } = p,
            _ = g in u ? u[g] : '';
          if (Rt(_) && !y)
            throw new Error(
              `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
            );
          const v = Rt(_) ? _.join('/') : _;
          if (!v)
            if (b)
              d.length < 2 &&
                (c.endsWith('/') ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${g}"`);
          c += v;
        }
    }
    return c || '/';
  }
  return { re: i, score: r, keys: o, parse: a, stringify: l };
}
function Pb(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0;
}
function Id(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = Pb(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (oc(r)) return 1;
    if (oc(s)) return -1;
  }
  return s.length - r.length;
}
function oc(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Rb = { type: 0, value: '' },
  Ob = /[a-zA-Z0-9_]/;
function Ib(e) {
  if (!e) return [[]];
  if (e === '/') return [[Rb]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${u}": ${p}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let a = 0,
    l,
    u = '',
    c = '';
  function f() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (l === '*' || l === '+') &&
              t(
                `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
              ),
            o.push({
              type: 1,
              value: u,
              regexp: c,
              repeatable: l === '*' || l === '+',
              optional: l === '*' || l === '?'
            }))
          : t('Invalid state to consume buffer'),
      (u = ''));
  }
  function d() {
    u += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === '/' ? (u && f(), i()) : l === ':' ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        l === '('
          ? (n = 2)
          : Ob.test(l)
            ? d()
            : (f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--);
        break;
      case 2:
        l === ')'
          ? c[c.length - 1] == '\\'
            ? (c = c.slice(0, -1) + l)
            : (n = 3)
          : (c += l);
        break;
      case 3:
        f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--, (c = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), s;
}
function $b(e, t, n) {
  const r = Ab(Ib(e.path), n),
    s = ye(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Mb(e, t) {
  const n = [],
    r = new Map();
  t = cc({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return r.get(f);
  }
  function o(f, d, p) {
    const g = !p,
      y = ac(f);
    y.aliasOf = p && p.record;
    const b = cc(t, f),
      _ = [y];
    if ('alias' in f) {
      const m = typeof f.alias == 'string' ? [f.alias] : f.alias;
      for (const x of m)
        _.push(
          ac(
            ye({}, y, {
              components: p ? p.record.components : y.components,
              path: x,
              aliasOf: p ? p.record : y
            })
          )
        );
    }
    let v, h;
    for (const m of _) {
      const { path: x } = m;
      if (d && x[0] !== '/') {
        const C = d.record.path,
          P = C[C.length - 1] === '/' ? '' : '/';
        m.path = d.record.path + (x && P + x);
      }
      if (
        ((v = $b(m, d, b)),
        p
          ? p.alias.push(v)
          : ((h = h || v),
            h !== v && h.alias.push(v),
            g && f.name && !lc(v) && i(f.name)),
        $d(v) && l(v),
        y.children)
      ) {
        const C = y.children;
        for (let P = 0; P < C.length; P++) o(C[P], v, p && p.children[P]);
      }
      p = p || v;
    }
    return h
      ? () => {
          i(h);
        }
      : Fr;
  }
  function i(f) {
    if (Rd(f)) {
      const d = r.get(f);
      d &&
        (r.delete(f),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(i),
        d.alias.forEach(i));
    } else {
      const d = n.indexOf(f);
      d > -1 &&
        (n.splice(d, 1),
        f.record.name && r.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(f) {
    const d = jb(f, n);
    n.splice(d, 0, f), f.record.name && !lc(f) && r.set(f.record.name, f);
  }
  function u(f, d) {
    let p,
      g = {},
      y,
      b;
    if ('name' in f && f.name) {
      if (((p = r.get(f.name)), !p)) throw ar(1, { location: f });
      (b = p.record.name),
        (g = ye(
          ic(
            d.params,
            p.keys
              .filter((h) => !h.optional)
              .concat(p.parent ? p.parent.keys.filter((h) => h.optional) : [])
              .map((h) => h.name)
          ),
          f.params &&
            ic(
              f.params,
              p.keys.map((h) => h.name)
            )
        )),
        (y = p.stringify(g));
    } else if (f.path != null)
      (y = f.path),
        (p = n.find((h) => h.re.test(y))),
        p && ((g = p.parse(y)), (b = p.record.name));
    else {
      if (((p = d.name ? r.get(d.name) : n.find((h) => h.re.test(d.path))), !p))
        throw ar(1, { location: f, currentLocation: d });
      (b = p.record.name),
        (g = ye({}, d.params, f.params)),
        (y = p.stringify(g));
    }
    const _ = [];
    let v = p;
    for (; v; ) _.unshift(v.record), (v = v.parent);
    return { name: b, path: y, params: g, matched: _, meta: Nb(_) };
  }
  e.forEach((f) => o(f));
  function c() {
    (n.length = 0), r.clear();
  }
  return {
    addRoute: o,
    resolve: u,
    removeRoute: i,
    clearRoutes: c,
    getRoutes: a,
    getRecordMatcher: s
  };
}
function ic(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function ac(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Lb(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component }
  };
  return Object.defineProperty(t, 'mods', { value: {} }), t;
}
function Lb(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n;
  return t;
}
function lc(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Nb(e) {
  return e.reduce((t, n) => ye(t, n.meta), {});
}
function cc(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function jb(e, t) {
  let n = 0,
    r = t.length;
  for (; n !== r; ) {
    const o = (n + r) >> 1;
    Id(e, t[o]) < 0 ? (r = o) : (n = o + 1);
  }
  const s = Hb(e);
  return s && (r = t.lastIndexOf(s, r - 1)), r;
}
function Hb(e) {
  let t = e;
  for (; (t = t.parent); ) if ($d(t) && Id(e, t) === 0) return t;
}
function $d({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function Fb(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(Cd, ' '),
      i = o.indexOf('='),
      a = Jr(i < 0 ? o : o.slice(0, i)),
      l = i < 0 ? null : Jr(o.slice(i + 1));
    if (a in t) {
      let u = t[a];
      Rt(u) || (u = t[a] = [u]), u.push(l);
    } else t[a] = l;
  }
  return t;
}
function uc(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = ob(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Rt(r) ? r.map((o) => o && Fi(o)) : [r && Fi(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o));
    });
  }
  return t;
}
function Db(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Rt(r)
        ? r.map((s) => (s == null ? null : '' + s))
        : r == null
          ? r
          : '' + r);
  }
  return t;
}
const Bb = Symbol(''),
  fc = Symbol(''),
  La = Symbol(''),
  Na = Symbol(''),
  Bi = Symbol('');
function xr() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function pn(e, t, n, r, s, o = (i) => i()) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((a, l) => {
      const u = (d) => {
          d === !1
            ? l(ar(4, { from: n, to: t }))
            : d instanceof Error
              ? l(d)
              : kb(d)
                ? l(ar(2, { from: t, to: d }))
                : (i &&
                    r.enterCallbacks[s] === i &&
                    typeof d == 'function' &&
                    i.push(d),
                  a());
        },
        c = o(() => e.call(r && r.instances[s], t, n, u));
      let f = Promise.resolve(c);
      e.length < 3 && (f = f.then(u)), f.catch((d) => l(d));
    });
}
function Ko(e, t, n, r, s = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const a in i.components) {
      let l = i.components[a];
      if (!(t !== 'beforeRouteEnter' && !i.instances[a]))
        if (xd(l)) {
          const c = (l.__vccOpts || l)[t];
          c && o.push(pn(c, n, r, i, a, s));
        } else {
          let u = l();
          o.push(() =>
            u.then((c) => {
              if (!c)
                throw new Error(
                  `Couldn't resolve component "${a}" at "${i.path}"`
                );
              const f = Gv(c) ? c.default : c;
              (i.mods[a] = c), (i.components[a] = f);
              const p = (f.__vccOpts || f)[t];
              return p && pn(p, n, r, i, a, s)();
            })
          );
        }
    }
  return o;
}
function dc(e) {
  const t = Ae(La),
    n = Ae(Na),
    r = F(() => {
      const l = E(e.to);
      return t.resolve(l);
    }),
    s = F(() => {
      const { matched: l } = r.value,
        { length: u } = l,
        c = l[u - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const d = f.findIndex(ir.bind(null, c));
      if (d > -1) return d;
      const p = pc(l[u - 2]);
      return u > 1 && pc(c) === p && f[f.length - 1].path !== p
        ? f.findIndex(ir.bind(null, l[u - 2]))
        : d;
    }),
    o = F(() => s.value > -1 && Kb(n.params, r.value.params)),
    i = F(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        Ad(n.params, r.value.params)
    );
  function a(l = {}) {
    if (Wb(l)) {
      const u = t[E(e.replace) ? 'replace' : 'push'](E(e.to)).catch(Fr);
      return (
        e.viewTransition &&
          typeof document < 'u' &&
          'startViewTransition' in document &&
          document.startViewTransition(() => u),
        u
      );
    }
    return Promise.resolve();
  }
  return {
    route: r,
    href: F(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: a
  };
}
function Ub(e) {
  return e.length === 1 ? e[0] : e;
}
const zb = re({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: dc,
    setup(e, { slots: t }) {
      const n = tt(dc(e)),
        { options: r } = Ae(La),
        s = F(() => ({
          [hc(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [hc(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive
        }));
      return () => {
        const o = t.default && Ub(t.default(n));
        return e.custom
          ? o
          : Ce(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
              },
              o
            );
      };
    }
  }),
  Vb = zb;
function Wb(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Kb(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (!Rt(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function pc(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const hc = (e, t, n) => e ?? t ?? n,
  qb = re({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ae(Bi),
        s = F(() => e.route || r.value),
        o = Ae(fc, 0),
        i = F(() => {
          let u = E(o);
          const { matched: c } = s.value;
          let f;
          for (; (f = c[u]) && !f.components; ) u++;
          return u;
        }),
        a = F(() => s.value.matched[i.value]);
      Tt(
        fc,
        F(() => i.value + 1)
      ),
        Tt(Bb, a),
        Tt(Bi, s);
      const l = X();
      return (
        Pe(
          () => [l.value, a.value, e.name],
          ([u, c, f], [d, p, g]) => {
            c &&
              ((c.instances[f] = u),
              p &&
                p !== c &&
                u &&
                u === d &&
                (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
                c.updateGuards.size || (c.updateGuards = p.updateGuards))),
              u &&
                c &&
                (!p || !ir(c, p) || !d) &&
                (c.enterCallbacks[f] || []).forEach((y) => y(u));
          },
          { flush: 'post' }
        ),
        () => {
          const u = s.value,
            c = e.name,
            f = a.value,
            d = f && f.components[c];
          if (!d) return gc(n.default, { Component: d, route: u });
          const p = f.props[c],
            g = p
              ? p === !0
                ? u.params
                : typeof p == 'function'
                  ? p(u)
                  : p
              : null,
            b = Ce(
              d,
              ye({}, g, t, {
                onVnodeUnmounted: (_) => {
                  _.component.isUnmounted && (f.instances[c] = null);
                },
                ref: l
              })
            );
          return gc(n.default, { Component: b, route: u }) || b;
        }
      );
    }
  });
function gc(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Md = qb;
function Gb(e) {
  const t = Mb(e.routes, e),
    n = e.parseQuery || Fb,
    r = e.stringifyQuery || uc,
    s = e.history,
    o = xr(),
    i = xr(),
    a = xr(),
    l = At(St);
  let u = St;
  Wn &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const c = Vo.bind(null, (I) => '' + I),
    f = Vo.bind(null, ab),
    d = Vo.bind(null, Jr);
  function p(I, Y) {
    let q, Z;
    return (
      Rd(I) ? ((q = t.getRecordMatcher(I)), (Z = Y)) : (Z = I), t.addRoute(Z, q)
    );
  }
  function g(I) {
    const Y = t.getRecordMatcher(I);
    Y && t.removeRoute(Y);
  }
  function y() {
    return t.getRoutes().map((I) => I.record);
  }
  function b(I) {
    return !!t.getRecordMatcher(I);
  }
  function _(I, Y) {
    if (((Y = ye({}, Y || l.value)), typeof I == 'string')) {
      const S = Wo(n, I, Y.path),
        T = t.resolve({ path: S.path }, Y),
        L = s.createHref(S.fullPath);
      return ye(S, T, {
        params: d(T.params),
        hash: Jr(S.hash),
        redirectedFrom: void 0,
        href: L
      });
    }
    let q;
    if (I.path != null) q = ye({}, I, { path: Wo(n, I.path, Y.path).path });
    else {
      const S = ye({}, I.params);
      for (const T in S) S[T] == null && delete S[T];
      (q = ye({}, I, { params: f(S) })), (Y.params = f(Y.params));
    }
    const Z = t.resolve(q, Y),
      me = I.hash || '';
    Z.params = c(d(Z.params));
    const $e = ub(r, ye({}, I, { hash: sb(me), path: Z.path })),
      w = s.createHref($e);
    return ye(
      { fullPath: $e, hash: me, query: r === uc ? Db(I.query) : I.query || {} },
      Z,
      { redirectedFrom: void 0, href: w }
    );
  }
  function v(I) {
    return typeof I == 'string' ? Wo(n, I, l.value.path) : ye({}, I);
  }
  function h(I, Y) {
    if (u !== I) return ar(8, { from: Y, to: I });
  }
  function m(I) {
    return P(I);
  }
  function x(I) {
    return m(ye(v(I), { replace: !0 }));
  }
  function C(I) {
    const Y = I.matched[I.matched.length - 1];
    if (Y && Y.redirect) {
      const { redirect: q } = Y;
      let Z = typeof q == 'function' ? q(I) : q;
      return (
        typeof Z == 'string' &&
          ((Z = Z.includes('?') || Z.includes('#') ? (Z = v(Z)) : { path: Z }),
          (Z.params = {})),
        ye(
          {
            query: I.query,
            hash: I.hash,
            params: Z.path != null ? {} : I.params
          },
          Z
        )
      );
    }
  }
  function P(I, Y) {
    const q = (u = _(I)),
      Z = l.value,
      me = I.state,
      $e = I.force,
      w = I.replace === !0,
      S = C(q);
    if (S)
      return P(
        ye(v(S), {
          state: typeof S == 'object' ? ye({}, me, S.state) : me,
          force: $e,
          replace: w
        }),
        Y || q
      );
    const T = q;
    T.redirectedFrom = Y;
    let L;
    return (
      !$e &&
        fb(r, Z, q) &&
        ((L = ar(16, { to: T, from: Z })), xe(Z, Z, !0, !1)),
      (L ? Promise.resolve(L) : A(T, Z))
        .catch((O) => (Ut(O) ? (Ut(O, 2) ? O : _e(O)) : B(O, T, Z)))
        .then((O) => {
          if (O) {
            if (Ut(O, 2))
              return P(
                ye({ replace: w }, v(O.to), {
                  state: typeof O.to == 'object' ? ye({}, me, O.to.state) : me,
                  force: $e
                }),
                Y || T
              );
          } else O = k(T, Z, !0, w, me);
          return D(T, Z, O), O;
        })
    );
  }
  function N(I, Y) {
    const q = h(I, Y);
    return q ? Promise.reject(q) : Promise.resolve();
  }
  function R(I) {
    const Y = It.values().next().value;
    return Y && typeof Y.runWithContext == 'function'
      ? Y.runWithContext(I)
      : I();
  }
  function A(I, Y) {
    let q;
    const [Z, me, $e] = Jb(I, Y);
    q = Ko(Z.reverse(), 'beforeRouteLeave', I, Y);
    for (const S of Z)
      S.leaveGuards.forEach((T) => {
        q.push(pn(T, I, Y));
      });
    const w = N.bind(null, I, Y);
    return (
      q.push(w),
      Je(q)
        .then(() => {
          q = [];
          for (const S of o.list()) q.push(pn(S, I, Y));
          return q.push(w), Je(q);
        })
        .then(() => {
          q = Ko(me, 'beforeRouteUpdate', I, Y);
          for (const S of me)
            S.updateGuards.forEach((T) => {
              q.push(pn(T, I, Y));
            });
          return q.push(w), Je(q);
        })
        .then(() => {
          q = [];
          for (const S of $e)
            if (S.beforeEnter)
              if (Rt(S.beforeEnter))
                for (const T of S.beforeEnter) q.push(pn(T, I, Y));
              else q.push(pn(S.beforeEnter, I, Y));
          return q.push(w), Je(q);
        })
        .then(
          () => (
            I.matched.forEach((S) => (S.enterCallbacks = {})),
            (q = Ko($e, 'beforeRouteEnter', I, Y, R)),
            q.push(w),
            Je(q)
          )
        )
        .then(() => {
          q = [];
          for (const S of i.list()) q.push(pn(S, I, Y));
          return q.push(w), Je(q);
        })
        .catch((S) => (Ut(S, 8) ? S : Promise.reject(S)))
    );
  }
  function D(I, Y, q) {
    a.list().forEach((Z) => R(() => Z(I, Y, q)));
  }
  function k(I, Y, q, Z, me) {
    const $e = h(I, Y);
    if ($e) return $e;
    const w = Y === St,
      S = Wn ? history.state : {};
    q &&
      (Z || w
        ? s.replace(I.fullPath, ye({ scroll: w && S && S.scroll }, me))
        : s.push(I.fullPath, me)),
      (l.value = I),
      xe(I, Y, q, w),
      _e();
  }
  let M;
  function z() {
    M ||
      (M = s.listen((I, Y, q) => {
        if (!rn.listening) return;
        const Z = _(I),
          me = C(Z);
        if (me) {
          P(ye(me, { replace: !0, force: !0 }), Z).catch(Fr);
          return;
        }
        u = Z;
        const $e = l.value;
        Wn && bb(tc($e.fullPath, q.delta), xo()),
          A(Z, $e)
            .catch((w) =>
              Ut(w, 12)
                ? w
                : Ut(w, 2)
                  ? (P(ye(v(w.to), { force: !0 }), Z)
                      .then((S) => {
                        Ut(S, 20) &&
                          !q.delta &&
                          q.type === Qr.pop &&
                          s.go(-1, !1);
                      })
                      .catch(Fr),
                    Promise.reject())
                  : (q.delta && s.go(-q.delta, !1), B(w, Z, $e))
            )
            .then((w) => {
              (w = w || k(Z, $e, !1)),
                w &&
                  (q.delta && !Ut(w, 8)
                    ? s.go(-q.delta, !1)
                    : q.type === Qr.pop && Ut(w, 20) && s.go(-1, !1)),
                D(Z, $e, w);
            })
            .catch(Fr);
      }));
  }
  let Q = xr(),
    $ = xr(),
    W;
  function B(I, Y, q) {
    _e(I);
    const Z = $.list();
    return Z.length && Z.forEach((me) => me(I, Y, q)), Promise.reject(I);
  }
  function ae() {
    return W && l.value !== St
      ? Promise.resolve()
      : new Promise((I, Y) => {
          Q.add([I, Y]);
        });
  }
  function _e(I) {
    return (
      W ||
        ((W = !I),
        z(),
        Q.list().forEach(([Y, q]) => (I ? q(I) : Y())),
        Q.reset()),
      I
    );
  }
  function xe(I, Y, q, Z) {
    const { scrollBehavior: me } = e;
    if (!Wn || !me) return Promise.resolve();
    const $e =
      (!q && wb(tc(I.fullPath, 0))) ||
      ((Z || !q) && history.state && history.state.scroll) ||
      null;
    return Ft()
      .then(() => me(I, Y, $e))
      .then((w) => w && vb(w))
      .catch((w) => B(w, I, Y));
  }
  const Se = (I) => s.go(I);
  let wt;
  const It = new Set(),
    rn = {
      currentRoute: l,
      listening: !0,
      addRoute: p,
      removeRoute: g,
      clearRoutes: t.clearRoutes,
      hasRoute: b,
      getRoutes: y,
      resolve: _,
      options: e,
      push: m,
      replace: x,
      go: Se,
      back: () => Se(-1),
      forward: () => Se(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: $.add,
      isReady: ae,
      install(I) {
        const Y = this;
        I.component('RouterLink', Vb),
          I.component('RouterView', Md),
          (I.config.globalProperties.$router = Y),
          Object.defineProperty(I.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => E(l)
          }),
          Wn &&
            !wt &&
            l.value === St &&
            ((wt = !0), m(s.location).catch((me) => {}));
        const q = {};
        for (const me in St)
          Object.defineProperty(q, me, {
            get: () => l.value[me],
            enumerable: !0
          });
        I.provide(La, Y), I.provide(Na, Jt(q)), I.provide(Bi, l);
        const Z = I.unmount;
        It.add(I),
          (I.unmount = function () {
            It.delete(I),
              It.size < 1 &&
                ((u = St),
                M && M(),
                (M = null),
                (l.value = St),
                (wt = !1),
                (W = !1)),
              Z();
          });
      }
    };
  function Je(I) {
    return I.reduce((Y, q) => Y.then(() => R(q)), Promise.resolve());
  }
  return rn;
}
function Jb(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const a = t.matched[i];
    a && (e.matched.find((u) => ir(u, a)) ? r.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((u) => ir(u, l)) || s.push(l));
  }
  return [n, r, s];
}
function Qb(e) {
  return Ae(Na);
}
const Yb = /(:\w+)\([^)]+\)/g,
  Xb = /(:\w+)[?+*]/g,
  Zb = /:\w+/g,
  ew = (e, t) =>
    t.path
      .replace(Yb, '$1')
      .replace(Xb, '$1')
      .replace(Zb, (n) => {
        var r;
        return (
          ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ''
        );
      }),
  Ui = (e, t) => {
    const n = e.route.matched.find((s) => {
        var o;
        return (
          ((o = s.components) == null ? void 0 : o.default) === e.Component.type
        );
      }),
      r = t ?? (n == null ? void 0 : n.meta.key) ?? (n && ew(e.route, n));
    return typeof r == 'function' ? r(e.route) : r;
  },
  tw = (e, t) => ({ default: () => (e ? Ce(Lh, e === !0 ? {} : e, t) : t) });
function ja(e) {
  return Array.isArray(e) ? e : [e];
}
const qo = [
    {
      name: 'index',
      path: '/',
      component: () =>
        yt(
          () => import('./CKOjb-dU.js'),
          __vite__mapDeps([0, 1, 2, 3]),
          import.meta.url
        )
    },
    {
      name: 'legal-affiliate-disclosure',
      path: '/legal/affiliate-disclosure',
      component: () => yt(() => import('./Cb7HAAdy.js'), [], import.meta.url)
    },
    {
      name: 'legal-dmca',
      path: '/legal/dmca',
      component: () => yt(() => import('./BQa-MhgX.js'), [], import.meta.url)
    },
    {
      name: 'legal',
      path: '/legal',
      component: () => yt(() => import('./DnScx8gv.js'), [], import.meta.url)
    },
    {
      name: 'legal-privacy-policy',
      path: '/legal/privacy-policy',
      component: () => yt(() => import('./CUUsJxSe.js'), [], import.meta.url)
    },
    {
      name: 'legal-terms-conditions',
      path: '/legal/terms-conditions',
      component: () => yt(() => import('./BZ2j3QDh.js'), [], import.meta.url)
    },
    {
      name: 'posts-slug',
      path: '/posts/:slug()',
      component: () =>
        yt(
          () => import('./B97j2ZxQ.js'),
          __vite__mapDeps([4, 5, 6, 7, 3, 8]),
          import.meta.url
        )
    },
    {
      name: 'posts-category-slug',
      path: '/posts/category/:slug()',
      component: () =>
        yt(
          () => import('./DK4SstdY.js'),
          __vite__mapDeps([9, 1, 2, 3, 10, 5]),
          import.meta.url
        )
    },
    {
      name: 'posts-category',
      path: '/posts/category',
      component: () => yt(() => import('./BAS3JTGW.js'), [], import.meta.url)
    },
    {
      name: 'posts',
      path: '/posts',
      component: () =>
        yt(
          () => import('./BR9bF7db.js'),
          __vite__mapDeps([11, 7, 2, 3, 10, 5]),
          import.meta.url
        )
    }
  ],
  Ld = (e, t) => ({
    default: () => {
      var n;
      return e
        ? Ce($g, e === !0 ? {} : e, t)
        : (n = t.default) == null
          ? void 0
          : n.call(t);
    }
  }),
  nw = /(:\w+)\([^)]+\)/g,
  rw = /(:\w+)[?+*]/g,
  sw = /:\w+/g;
function mc(e) {
  const t =
    (e == null ? void 0 : e.meta.key) ??
    e.path
      .replace(nw, '$1')
      .replace(rw, '$1')
      .replace(sw, (n) => {
        var r;
        return (
          ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ''
        );
      });
  return typeof t == 'function' ? t(e) : t;
}
function ow(e, t) {
  return e === t || t === St
    ? !1
    : mc(e) !== mc(t)
      ? !0
      : !e.matched.every((r, s) => {
          var o, i;
          return (
            r.components &&
            r.components.default ===
              ((i = (o = t.matched[s]) == null ? void 0 : o.components) == null
                ? void 0
                : i.default)
          );
        });
}
const iw = {
  scrollBehavior(e, t, n) {
    var u;
    const r = de(),
      s =
        ((u = Ge().options) == null ? void 0 : u.scrollBehaviorType) ?? 'auto';
    let o = n || void 0;
    const i =
      typeof e.meta.scrollToTop == 'function'
        ? e.meta.scrollToTop(e, t)
        : e.meta.scrollToTop;
    if (
      (!o && t && e && i !== !1 && ow(e, t) && (o = { left: 0, top: 0 }),
      e.path === t.path)
    )
      return t.hash && !e.hash
        ? { left: 0, top: 0 }
        : e.hash
          ? { el: e.hash, top: yc(e.hash), behavior: s }
          : !1;
    const a = (c) => !!(c.meta.pageTransition ?? ki),
      l = a(t) && a(e) ? 'page:transition:finish' : 'page:finish';
    return new Promise((c) => {
      r.hooks.hookOnce(l, async () => {
        await new Promise((f) => setTimeout(f, 0)),
          e.hash && (o = { el: e.hash, top: yc(e.hash), behavior: s }),
          c(o);
      });
    });
  }
};
function yc(e) {
  try {
    const t = document.querySelector(e);
    if (t)
      return (
        (Number.parseFloat(getComputedStyle(t).scrollMarginTop) || 0) +
        (Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop
        ) || 0)
      );
  } catch {}
  return 0;
}
const aw = { hashMode: !1, scrollBehaviorType: 'auto' },
  mt = { ...aw, ...iw },
  lw = async (e) => {
    var l;
    let t, n;
    if (!((l = e.meta) != null && l.validate)) return;
    const r = de(),
      s = Ge(),
      o =
        (([t, n] = er(() => Promise.resolve(e.meta.validate(e)))),
        (t = await t),
        n(),
        t);
    if (o === !0) return;
    const i = wo({
        statusCode: (o && o.statusCode) || 404,
        statusMessage:
          (o && o.statusMessage) || `Page Not Found: ${e.fullPath}`,
        data: { path: e.fullPath }
      }),
      a = s.beforeResolve((u) => {
        if ((a(), u === e)) {
          const c = s.afterEach(async () => {
            c(),
              await r.runWithContext(() => qn(i)),
              window == null || window.history.pushState({}, '', e.fullPath);
          });
          return !1;
        }
      });
  },
  cw = (e, t) => {
    if (e.path !== '/' && !e.path.endsWith('/') && !e.path.endsWith('.xml')) {
      const { path: n, query: r, hash: s } = e,
        i = { path: n + '/', query: r, hash: s };
      return Ra(i, {});
    }
  },
  uw = {},
  fw = (e, t) => {
    const { path: n, query: r, hash: s } = e,
      o = n.replace(/\/$/, ''),
      i = uw[o];
    if (i) return Ra({ path: i, query: r, hash: s }, {});
  },
  dw = async (e) => {
    let t, n;
    const r =
      (([t, n] = er(() => Oa({ path: e.path }))), (t = await t), n(), t);
    if (r.redirect)
      return ft(r.redirect, { acceptRelative: !0 })
        ? ((window.location.href = r.redirect), !1)
        : r.redirect;
  },
  pw = [lw, cw, fw, dw],
  Br = {};
function hw(e, t, n) {
  const { pathname: r, search: s, hash: o } = t,
    i = e.indexOf('#');
  if (i > -1) {
    const u = o.includes(e.slice(i)) ? e.slice(i).length : 1;
    let c = o.slice(u);
    return c[0] !== '/' && (c = '/' + c), Ll(c, '');
  }
  const a = Ll(r, e),
    l = !n || Im(a, n, { trailingSlash: !0 }) ? a : n;
  return l + (l.includes('?') ? '' : s) + o;
}
const gw = je({
    name: 'nuxt:router',
    enforce: 'pre',
    async setup(e) {
      var b;
      let t,
        n,
        r = bt().app.baseURL;
      const s = ((b = mt.history) == null ? void 0 : b.call(mt, r)) ?? Cb(r),
        o = mt.routes
          ? (([t, n] = er(() => mt.routes(qo))), (t = await t), n(), t ?? qo)
          : qo;
      let i;
      const a = Gb({
        ...mt,
        scrollBehavior: (_, v, h) => {
          if (v === St) {
            i = h;
            return;
          }
          if (mt.scrollBehavior) {
            if (
              ((a.options.scrollBehavior = mt.scrollBehavior),
              'scrollRestoration' in window.history)
            ) {
              const m = a.beforeEach(() => {
                m(), (window.history.scrollRestoration = 'manual');
              });
            }
            return mt.scrollBehavior(_, St, i || h);
          }
        },
        history: s,
        routes: o
      });
      mt.routes && mt.routes,
        'scrollRestoration' in window.history &&
          (window.history.scrollRestoration = 'auto'),
        e.vueApp.use(a);
      const l = At(a.currentRoute.value);
      a.afterEach((_, v) => {
        l.value = v;
      }),
        Object.defineProperty(
          e.vueApp.config.globalProperties,
          'previousRoute',
          { get: () => l.value }
        );
      const u = hw(r, window.location, e.payload.path),
        c = At(a.currentRoute.value),
        f = () => {
          c.value = a.currentRoute.value;
        };
      e.hook('page:finish', f),
        a.afterEach((_, v) => {
          var h, m, x, C;
          ((m = (h = _.matched[0]) == null ? void 0 : h.components) == null
            ? void 0
            : m.default) ===
            ((C = (x = v.matched[0]) == null ? void 0 : x.components) == null
              ? void 0
              : C.default) && f();
        });
      const d = {};
      for (const _ in c.value)
        Object.defineProperty(d, _, { get: () => c.value[_], enumerable: !0 });
      (e._route = Jt(d)),
        (e._middleware = e._middleware || { global: [], named: {} });
      const p = Dn();
      a.afterEach(async (_, v, h) => {
        delete e._processingMiddleware,
          !e.isHydrating && p.value && (await e.runWithContext(td)),
          h && (await e.callHook('page:loading:end'));
      });
      try {
        ([t, n] = er(() => a.isReady())), await t, n();
      } catch (_) {
        ([t, n] = er(() => e.runWithContext(() => qn(_)))), await t, n();
      }
      const g =
        u !== a.currentRoute.value.fullPath
          ? a.resolve(u)
          : a.currentRoute.value;
      f();
      const y = e.payload.state._layout;
      return (
        a.beforeEach(async (_, v) => {
          var h;
          await e.callHook('page:loading:start'),
            (_.meta = tt(_.meta)),
            e.isHydrating && y && !vn(_.meta.layout) && (_.meta.layout = y),
            (e._processingMiddleware = !0);
          {
            const m = new Set([...pw, ...e._middleware.global]);
            for (const x of _.matched) {
              const C = x.meta.middleware;
              if (C) for (const P of ja(C)) m.add(P);
            }
            {
              const x = await e.runWithContext(() => Oa({ path: _.path }));
              if (x.appMiddleware)
                for (const C in x.appMiddleware)
                  x.appMiddleware[C] ? m.add(C) : m.delete(C);
            }
            for (const x of m) {
              const C =
                typeof x == 'string'
                  ? e._middleware.named[x] ||
                    (await ((h = Br[x]) == null
                      ? void 0
                      : h.call(Br).then((N) => N.default || N)))
                  : x;
              if (!C) throw new Error(`Unknown route middleware: '${x}'.`);
              const P = await e.runWithContext(() => C(_, v));
              if (
                !e.payload.serverRendered &&
                e.isHydrating &&
                (P === !1 || P instanceof Error)
              ) {
                const N =
                  P ||
                  Ai({
                    statusCode: 404,
                    statusMessage: `Page Not Found: ${u}`
                  });
                return await e.runWithContext(() => qn(N)), !1;
              }
              if (P !== !0 && (P || P === !1)) return P;
            }
          }
        }),
        a.onError(async () => {
          delete e._processingMiddleware, await e.callHook('page:loading:end');
        }),
        a.afterEach(async (_, v) => {
          _.matched.length === 0 &&
            (await e.runWithContext(() =>
              qn(
                Ai({
                  statusCode: 404,
                  fatal: !1,
                  statusMessage: `Page not found: ${_.fullPath}`,
                  data: { path: _.fullPath }
                })
              )
            ));
        }),
        e.hooks.hookOnce('app:created', async () => {
          try {
            'name' in g && (g.name = void 0),
              await a.replace({ ...g, force: !0 }),
              (a.options.scrollBehavior = mt.scrollBehavior);
          } catch (_) {
            await e.runWithContext(() => qn(_));
          }
        }),
        { provide: { router: a } }
      );
    }
  }),
  zi =
    globalThis.requestIdleCallback ||
    ((e) => {
      const t = Date.now(),
        n = {
          didTimeout: !1,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - t))
        };
      return setTimeout(() => {
        e(n);
      }, 1);
    }),
  mw =
    globalThis.cancelIdleCallback ||
    ((e) => {
      clearTimeout(e);
    }),
  cs = (e) => {
    const t = de();
    t.isHydrating
      ? t.hooks.hookOnce('app:suspense:resolve', () => {
          zi(() => e());
        })
      : zi(() => e());
  },
  yw = '$s';
function Ha(...e) {
  const t = typeof e[e.length - 1] == 'string' ? e.pop() : void 0;
  typeof e[0] != 'string' && e.unshift(t);
  const [n, r] = e;
  if (!n || typeof n != 'string')
    throw new TypeError('[nuxt] [useState] key must be a string: ' + n);
  if (r !== void 0 && typeof r != 'function')
    throw new Error('[nuxt] [useState] init must be a function: ' + r);
  const s = yw + n,
    o = de(),
    i = On(o.payload.state, s);
  if (i.value === void 0 && r) {
    const a = r();
    if (Te(a)) return (o.payload.state[s] = a), a;
    i.value = a;
  }
  return i;
}
const vc = Object.freeze({
  ignoreUnknown: !1,
  respectType: !1,
  respectFunctionNames: !1,
  respectFunctionProperties: !1,
  unorderedObjects: !0,
  unorderedArrays: !1,
  unorderedSets: !1,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function Vi(e, t) {
  t ? (t = { ...vc, ...t }) : (t = vc);
  const n = Nd(t);
  return n.dispatch(e), n.toString();
}
const vw = Object.freeze(['prototype', '__proto__', 'constructor']);
function Nd(e) {
  let t = '',
    n = new Map();
  const r = (s) => {
    t += s;
  };
  return {
    toString() {
      return t;
    },
    getContext() {
      return n;
    },
    dispatch(s) {
      return (
        e.replacer && (s = e.replacer(s)),
        this[s === null ? 'null' : typeof s](s)
      );
    },
    object(s) {
      if (s && typeof s.toJSON == 'function') return this.object(s.toJSON());
      const o = Object.prototype.toString.call(s);
      let i = '';
      const a = o.length;
      a < 10 ? (i = 'unknown:[' + o + ']') : (i = o.slice(8, a - 1)),
        (i = i.toLowerCase());
      let l = null;
      if ((l = n.get(s)) === void 0) n.set(s, n.size);
      else return this.dispatch('[CIRCULAR:' + l + ']');
      if (typeof Buffer < 'u' && Buffer.isBuffer && Buffer.isBuffer(s))
        return r('buffer:'), r(s.toString('utf8'));
      if (i !== 'object' && i !== 'function' && i !== 'asyncfunction')
        this[i] ? this[i](s) : e.ignoreUnknown || this.unkown(s, i);
      else {
        let u = Object.keys(s);
        e.unorderedObjects && (u = u.sort());
        let c = [];
        e.respectType !== !1 && !bc(s) && (c = vw),
          e.excludeKeys &&
            ((u = u.filter((d) => !e.excludeKeys(d))),
            (c = c.filter((d) => !e.excludeKeys(d)))),
          r('object:' + (u.length + c.length) + ':');
        const f = (d) => {
          this.dispatch(d),
            r(':'),
            e.excludeValues || this.dispatch(s[d]),
            r(',');
        };
        for (const d of u) f(d);
        for (const d of c) f(d);
      }
    },
    array(s, o) {
      if (
        ((o = o === void 0 ? e.unorderedArrays !== !1 : o),
        r('array:' + s.length + ':'),
        !o || s.length <= 1)
      ) {
        for (const l of s) this.dispatch(l);
        return;
      }
      const i = new Map(),
        a = s.map((l) => {
          const u = Nd(e);
          u.dispatch(l);
          for (const [c, f] of u.getContext()) i.set(c, f);
          return u.toString();
        });
      return (n = i), a.sort(), this.array(a, !1);
    },
    date(s) {
      return r('date:' + s.toJSON());
    },
    symbol(s) {
      return r('symbol:' + s.toString());
    },
    unkown(s, o) {
      if ((r(o), !!s && (r(':'), s && typeof s.entries == 'function')))
        return this.array(Array.from(s.entries()), !0);
    },
    error(s) {
      return r('error:' + s.toString());
    },
    boolean(s) {
      return r('bool:' + s);
    },
    string(s) {
      r('string:' + s.length + ':'), r(s);
    },
    function(s) {
      r('fn:'),
        bc(s) ? this.dispatch('[native]') : this.dispatch(s.toString()),
        e.respectFunctionNames !== !1 &&
          this.dispatch('function-name:' + String(s.name)),
        e.respectFunctionProperties && this.object(s);
    },
    number(s) {
      return r('number:' + s);
    },
    xml(s) {
      return r('xml:' + s.toString());
    },
    null() {
      return r('Null');
    },
    undefined() {
      return r('Undefined');
    },
    regexp(s) {
      return r('regex:' + s.toString());
    },
    uint8array(s) {
      return r('uint8array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    uint8clampedarray(s) {
      return (
        r('uint8clampedarray:'), this.dispatch(Array.prototype.slice.call(s))
      );
    },
    int8array(s) {
      return r('int8array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    uint16array(s) {
      return r('uint16array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    int16array(s) {
      return r('int16array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    uint32array(s) {
      return r('uint32array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    int32array(s) {
      return r('int32array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    float32array(s) {
      return r('float32array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    float64array(s) {
      return r('float64array:'), this.dispatch(Array.prototype.slice.call(s));
    },
    arraybuffer(s) {
      return r('arraybuffer:'), this.dispatch(new Uint8Array(s));
    },
    url(s) {
      return r('url:' + s.toString());
    },
    map(s) {
      r('map:');
      const o = [...s];
      return this.array(o, e.unorderedSets !== !1);
    },
    set(s) {
      r('set:');
      const o = [...s];
      return this.array(o, e.unorderedSets !== !1);
    },
    file(s) {
      return r('file:'), this.dispatch([s.name, s.size, s.type, s.lastModfied]);
    },
    blob() {
      if (e.ignoreUnknown) return r('[blob]');
      throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`);
    },
    domwindow() {
      return r('domwindow');
    },
    bigint(s) {
      return r('bigint:' + s.toString());
    },
    process() {
      return r('process');
    },
    timer() {
      return r('timer');
    },
    pipe() {
      return r('pipe');
    },
    tcp() {
      return r('tcp');
    },
    udp() {
      return r('udp');
    },
    tty() {
      return r('tty');
    },
    statwatcher() {
      return r('statwatcher');
    },
    securecontext() {
      return r('securecontext');
    },
    connection() {
      return r('connection');
    },
    zlib() {
      return r('zlib');
    },
    context() {
      return r('context');
    },
    nodescript() {
      return r('nodescript');
    },
    httpparser() {
      return r('httpparser');
    },
    dataview() {
      return r('dataview');
    },
    signal() {
      return r('signal');
    },
    fsevent() {
      return r('fsevent');
    },
    tlswrap() {
      return r('tlswrap');
    }
  };
}
const jd = '[native code] }',
  bw = jd.length;
function bc(e) {
  return typeof e != 'function'
    ? !1
    : Function.prototype.toString.call(e).slice(-bw) === jd;
}
function ww(e, t, n = {}) {
  const r = Wi(e, n),
    s = Wi(t, n);
  return Hd(r, s, n);
}
function Hd(e, t, n = {}) {
  var o, i;
  const r = [],
    s = new Set([...Object.keys(e.props || {}), ...Object.keys(t.props || {})]);
  if (e.props && t.props)
    for (const a of s) {
      const l = e.props[a],
        u = t.props[a];
      l && u
        ? r.push(
            ...Hd(
              (o = e.props) == null ? void 0 : o[a],
              (i = t.props) == null ? void 0 : i[a],
              n
            )
          )
        : (l || u) &&
          r.push(new wc((u || l).key, l ? 'removed' : 'added', u, l));
    }
  return (
    s.size === 0 &&
      e.hash !== t.hash &&
      r.push(new wc((t || e).key, 'changed', t, e)),
    r
  );
}
function Wi(e, t, n = '') {
  if (e && typeof e != 'object') return new _c(n, e, Vi(e, t));
  const r = {},
    s = [];
  for (const o in e)
    (r[o] = Wi(e[o], t, n ? `${n}.${o}` : o)), s.push(r[o].hash);
  return new _c(n, e, `{${s.join(':')}}`, r);
}
class wc {
  constructor(t, n, r, s) {
    (this.key = t), (this.type = n), (this.newValue = r), (this.oldValue = s);
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    var t;
    switch (this.type) {
      case 'added':
        return `Added   \`${this.key}\``;
      case 'removed':
        return `Removed \`${this.key}\``;
      case 'changed':
        return `Changed \`${this.key}\` from \`${((t = this.oldValue) == null ? void 0 : t.toString()) || '-'}\` to \`${this.newValue.toString()}\``;
    }
  }
}
class _c {
  constructor(t, n, r, s) {
    (this.key = t), (this.value = n), (this.hash = r), (this.props = s);
  }
  toString() {
    return this.props
      ? `{${Object.keys(this.props).join(',')}}`
      : JSON.stringify(this.value);
  }
  toJSON() {
    const t = this.key || '.';
    return this.props
      ? `${t}({${Object.keys(this.props).join(',')}})`
      : `${t}(${this.value})`;
  }
}
function xc(e, t, n = {}) {
  return e === t || Vi(e, n) === Vi(t, n);
}
async function Fd(e, t = Ge()) {
  const { path: n, matched: r } = t.resolve(e);
  if (
    !r.length ||
    (t._routePreloaded || (t._routePreloaded = new Set()),
    t._routePreloaded.has(n))
  )
    return;
  const s = (t._preloadPromises = t._preloadPromises || []);
  if (s.length > 4) return Promise.all(s).then(() => Fd(e, t));
  t._routePreloaded.add(n);
  const o = r
    .map((i) => {
      var a;
      return (a = i.components) == null ? void 0 : a.default;
    })
    .filter((i) => typeof i == 'function');
  for (const i of o) {
    const a = Promise.resolve(i())
      .catch(() => {})
      .finally(() => s.splice(s.indexOf(a)));
    s.push(a);
  }
  await Promise.all(s);
}
function _w(e = {}) {
  const t = e.path || window.location.pathname;
  let n = {};
  try {
    n = Ys(sessionStorage.getItem('nuxt:reload') || '{}');
  } catch {}
  if (
    e.force ||
    (n == null ? void 0 : n.path) !== t ||
    (n == null ? void 0 : n.expires) < Date.now()
  ) {
    try {
      sessionStorage.setItem(
        'nuxt:reload',
        JSON.stringify({ path: t, expires: Date.now() + (e.ttl ?? 1e4) })
      );
    } catch {}
    if (e.persistState)
      try {
        sessionStorage.setItem(
          'nuxt:reload:state',
          JSON.stringify({ state: de().payload.state })
        );
      } catch {}
    window.location.pathname !== t
      ? (window.location.href = t)
      : window.location.reload();
  }
}
const xw = (...e) => e.find((t) => t !== void 0);
function Sw(e) {
  const t = e.componentName || 'NuxtLink';
  function n(o) {
    return typeof o == 'string' && o.startsWith('#');
  }
  function r(o, i) {
    if (!o || (e.trailingSlash !== 'append' && e.trailingSlash !== 'remove'))
      return o;
    if (typeof o == 'string') return Sc(o, e.trailingSlash);
    const a = 'path' in o && o.path !== void 0 ? o.path : i(o).path;
    return { ...o, name: void 0, path: Sc(a, e.trailingSlash) };
  }
  function s(o) {
    const i = Ge(),
      a = bt(),
      l = F(() => !!o.target && o.target !== '_self'),
      u = F(() => {
        const b = o.to || o.href || '';
        return typeof b == 'string' && ft(b, { acceptRelative: !0 });
      }),
      c = cl('RouterLink'),
      f = typeof c != 'string' ? c.useLink : void 0,
      d = F(() => {
        if (o.external) return !0;
        const b = o.to || o.href || '';
        return typeof b == 'object' ? !1 : b === '' || u.value;
      }),
      p = F(() => {
        const b = o.to || o.href || '';
        return d.value ? b : r(b, i.resolve);
      }),
      g = d.value || f == null ? void 0 : f({ ...o, to: p }),
      y = F(() => {
        var b;
        if (!p.value || u.value || n(p.value)) return p.value;
        if (d.value) {
          const _ =
              typeof p.value == 'object' && 'path' in p.value
                ? Ri(p.value)
                : p.value,
            v = typeof _ == 'object' ? i.resolve(_).href : _;
          return r(v, i.resolve);
        }
        return typeof p.value == 'object'
          ? (((b = i.resolve(p.value)) == null ? void 0 : b.href) ?? null)
          : r(ss(a.app.baseURL, p.value), i.resolve);
      });
    return {
      to: p,
      hasTarget: l,
      isAbsoluteUrl: u,
      isExternal: d,
      href: y,
      isActive:
        (g == null ? void 0 : g.isActive) ??
        F(() => p.value === i.currentRoute.value.path),
      isExactActive:
        (g == null ? void 0 : g.isExactActive) ??
        F(() => p.value === i.currentRoute.value.path),
      route: (g == null ? void 0 : g.route) ?? F(() => i.resolve(p.value)),
      async navigate() {
        await Ra(y.value, { replace: o.replace, external: d.value || l.value });
      }
    };
  }
  return re({
    name: t,
    props: {
      to: { type: [String, Object], default: void 0, required: !1 },
      href: { type: [String, Object], default: void 0, required: !1 },
      target: { type: String, default: void 0, required: !1 },
      rel: { type: String, default: void 0, required: !1 },
      noRel: { type: Boolean, default: void 0, required: !1 },
      prefetch: { type: Boolean, default: void 0, required: !1 },
      prefetchOn: { type: [String, Object], default: void 0, required: !1 },
      noPrefetch: { type: Boolean, default: void 0, required: !1 },
      activeClass: { type: String, default: void 0, required: !1 },
      exactActiveClass: { type: String, default: void 0, required: !1 },
      prefetchedClass: { type: String, default: void 0, required: !1 },
      replace: { type: Boolean, default: void 0, required: !1 },
      ariaCurrentValue: { type: String, default: void 0, required: !1 },
      external: { type: Boolean, default: void 0, required: !1 },
      custom: { type: Boolean, default: void 0, required: !1 }
    },
    useLink: s,
    setup(o, { slots: i }) {
      const a = Ge(),
        {
          to: l,
          href: u,
          navigate: c,
          isExternal: f,
          hasTarget: d,
          isAbsoluteUrl: p
        } = s(o),
        g = X(!1),
        y = X(null),
        b = (h) => {
          var m;
          y.value = o.custom
            ? (m = h == null ? void 0 : h.$el) == null
              ? void 0
              : m.nextElementSibling
            : h == null
              ? void 0
              : h.$el;
        };
      function _(h) {
        var m, x;
        return (
          !g.value &&
          (typeof o.prefetchOn == 'string'
            ? o.prefetchOn === h
            : (((m = o.prefetchOn) == null ? void 0 : m[h]) ??
              ((x = e.prefetchOn) == null ? void 0 : x[h]))) &&
          (o.prefetch ?? e.prefetch) !== !1 &&
          o.noPrefetch !== !0 &&
          o.target !== '_blank' &&
          !Tw()
        );
      }
      async function v(h = de()) {
        if (g.value) return;
        g.value = !0;
        const m =
            typeof l.value == 'string'
              ? l.value
              : f.value
                ? Ri(l.value)
                : a.resolve(l.value).fullPath,
          x = f.value ? new URL(m, window.location.href).href : m;
        await Promise.all([
          h.hooks.callHook('link:prefetch', x).catch(() => {}),
          !f.value && !d.value && Fd(l.value, a).catch(() => {})
        ]);
      }
      if (_('visibility')) {
        const h = de();
        let m,
          x = null;
        dt(() => {
          const C = kw();
          cs(() => {
            m = zi(() => {
              var P;
              (P = y == null ? void 0 : y.value) != null &&
                P.tagName &&
                (x = C.observe(y.value, async () => {
                  x == null || x(), (x = null), await v(h);
                }));
            });
          });
        }),
          cr(() => {
            m && mw(m), x == null || x(), (x = null);
          });
      }
      return () => {
        var x;
        if (!f.value && !d.value && !n(l.value)) {
          const C = {
            ref: b,
            to: l.value,
            activeClass: o.activeClass || e.activeClass,
            exactActiveClass: o.exactActiveClass || e.exactActiveClass,
            replace: o.replace,
            ariaCurrentValue: o.ariaCurrentValue,
            custom: o.custom
          };
          return (
            o.custom ||
              (_('interaction') &&
                ((C.onPointerenter = v.bind(null, void 0)),
                (C.onFocus = v.bind(null, void 0))),
              g.value && (C.class = o.prefetchedClass || e.prefetchedClass),
              (C.rel = o.rel || void 0)),
            Ce(cl('RouterLink'), C, i.default)
          );
        }
        const h = o.target || null,
          m =
            xw(
              o.noRel ? '' : o.rel,
              e.externalRelAttribute,
              p.value || d.value ? 'noopener noreferrer' : ''
            ) || null;
        return o.custom
          ? i.default
            ? i.default({
                href: u.value,
                navigate: c,
                prefetch: v,
                get route() {
                  if (!u.value) return;
                  const C = new URL(u.value, window.location.href);
                  return {
                    path: C.pathname,
                    fullPath: C.pathname,
                    get query() {
                      return jf(C.search);
                    },
                    hash: C.hash,
                    params: {},
                    name: void 0,
                    matched: [],
                    redirectedFrom: void 0,
                    meta: {},
                    href: u.value
                  };
                },
                rel: m,
                target: h,
                isExternal: f.value || d.value,
                isActive: !1,
                isExactActive: !1
              })
            : null
          : Ce(
              'a',
              { ref: y, href: u.value || null, rel: m, target: h },
              (x = i.default) == null ? void 0 : x.call(i)
            );
      };
    }
  });
}
const Cw = Sw(uy);
function Sc(e, t) {
  const n = t === 'append' ? or : Fn;
  return ft(e) && !e.startsWith('http') ? e : n(e, !0);
}
function kw() {
  const e = de();
  if (e._observer) return e._observer;
  let t = null;
  const n = new Map(),
    r = (o, i) => (
      t ||
        (t = new IntersectionObserver((a) => {
          for (const l of a) {
            const u = n.get(l.target);
            (l.isIntersecting || l.intersectionRatio > 0) && u && u();
          }
        })),
      n.set(o, i),
      t.observe(o),
      () => {
        n.delete(o),
          t == null || t.unobserve(o),
          n.size === 0 && (t == null || t.disconnect(), (t = null));
      }
    );
  return (e._observer = { observe: r });
}
const Ew = /2g/;
function Tw() {
  const e = navigator.connection;
  return !!(e && (e.saveData || Ew.test(e.effectiveType)));
}
const Aw = {
    ui: {
      colors: { primary: 'blue', neutral: 'neutral' },
      button: {
        slots: {
          base: [
            'rounded-none font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
            'transition-colors'
          ]
        }
      },
      textarea: {
        slots: {
          base: [
            'w-full rounded-none border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
            'transition-colors'
          ]
        }
      }
    }
  },
  Pw = { myLayer: { name: '@serp/ui' } },
  Rw = { myLayer: { name: '@serp/types' } },
  Ow = { myLayer: { name: '@serp/utils' } },
  Iw = {
    nuxt: {},
    ui: {
      colors: {
        primary: 'green',
        secondary: 'blue',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        neutral: 'slate'
      },
      icons: {
        arrowLeft: 'i-lucide-arrow-left',
        arrowRight: 'i-lucide-arrow-right',
        check: 'i-lucide-check',
        chevronDoubleLeft: 'i-lucide-chevrons-left',
        chevronDoubleRight: 'i-lucide-chevrons-right',
        chevronDown: 'i-lucide-chevron-down',
        chevronLeft: 'i-lucide-chevron-left',
        chevronRight: 'i-lucide-chevron-right',
        chevronUp: 'i-lucide-chevron-up',
        close: 'i-lucide-x',
        ellipsis: 'i-lucide-ellipsis',
        external: 'i-lucide-arrow-up-right',
        loading: 'i-lucide-refresh-cw',
        minus: 'i-lucide-minus',
        plus: 'i-lucide-plus',
        search: 'i-lucide-search'
      }
    },
    icon: {
      provider: 'server',
      class: '',
      aliases: {},
      iconifyApiEndpoint: 'https://api.iconify.design',
      localApiEndpoint: '/api/_nuxt_icon',
      fallbackToApi: !0,
      cssSelectorPrefix: 'i-',
      cssWherePseudo: !0,
      cssLayer: 'components',
      mode: 'css',
      attrs: { 'aria-hidden': !0 },
      collections: [
        'academicons',
        'akar-icons',
        'ant-design',
        'arcticons',
        'basil',
        'bi',
        'bitcoin-icons',
        'bpmn',
        'brandico',
        'bx',
        'bxl',
        'bxs',
        'bytesize',
        'carbon',
        'catppuccin',
        'cbi',
        'charm',
        'ci',
        'cib',
        'cif',
        'cil',
        'circle-flags',
        'circum',
        'clarity',
        'codicon',
        'covid',
        'cryptocurrency',
        'cryptocurrency-color',
        'dashicons',
        'devicon',
        'devicon-plain',
        'ei',
        'el',
        'emojione',
        'emojione-monotone',
        'emojione-v1',
        'entypo',
        'entypo-social',
        'eos-icons',
        'ep',
        'et',
        'eva',
        'f7',
        'fa',
        'fa-brands',
        'fa-regular',
        'fa-solid',
        'fa6-brands',
        'fa6-regular',
        'fa6-solid',
        'fad',
        'fe',
        'feather',
        'file-icons',
        'flag',
        'flagpack',
        'flat-color-icons',
        'flat-ui',
        'flowbite',
        'fluent',
        'fluent-emoji',
        'fluent-emoji-flat',
        'fluent-emoji-high-contrast',
        'fluent-mdl2',
        'fontelico',
        'fontisto',
        'formkit',
        'foundation',
        'fxemoji',
        'gala',
        'game-icons',
        'geo',
        'gg',
        'gis',
        'gravity-ui',
        'gridicons',
        'grommet-icons',
        'guidance',
        'healthicons',
        'heroicons',
        'heroicons-outline',
        'heroicons-solid',
        'hugeicons',
        'humbleicons',
        'ic',
        'icomoon-free',
        'icon-park',
        'icon-park-outline',
        'icon-park-solid',
        'icon-park-twotone',
        'iconamoon',
        'iconoir',
        'icons8',
        'il',
        'ion',
        'iwwa',
        'jam',
        'la',
        'lets-icons',
        'line-md',
        'logos',
        'ls',
        'lucide',
        'lucide-lab',
        'mage',
        'majesticons',
        'maki',
        'map',
        'marketeq',
        'material-symbols',
        'material-symbols-light',
        'mdi',
        'mdi-light',
        'medical-icon',
        'memory',
        'meteocons',
        'mi',
        'mingcute',
        'mono-icons',
        'mynaui',
        'nimbus',
        'nonicons',
        'noto',
        'noto-v1',
        'octicon',
        'oi',
        'ooui',
        'openmoji',
        'oui',
        'pajamas',
        'pepicons',
        'pepicons-pencil',
        'pepicons-pop',
        'pepicons-print',
        'ph',
        'pixelarticons',
        'prime',
        'ps',
        'quill',
        'radix-icons',
        'raphael',
        'ri',
        'rivet-icons',
        'si-glyph',
        'simple-icons',
        'simple-line-icons',
        'skill-icons',
        'solar',
        'streamline',
        'streamline-emojis',
        'subway',
        'svg-spinners',
        'system-uicons',
        'tabler',
        'tdesign',
        'teenyicons',
        'token',
        'token-branded',
        'topcoat',
        'twemoji',
        'typcn',
        'uil',
        'uim',
        'uis',
        'uit',
        'uiw',
        'unjs',
        'vaadin',
        'vs',
        'vscode-icons',
        'websymbol',
        'weui',
        'whh',
        'wi',
        'wpf',
        'zmdi',
        'zondicons',
        'custom'
      ],
      fetchTimeout: 1500,
      customCollections: ['custom']
    }
  },
  dr = xy(Aw, Pw, Rw, Ow, Iw);
function Sn() {
  const e = de();
  return e._appConfig || (e._appConfig = tt(dr)), e._appConfig;
}
function $w(e) {
  typeof e.indexable < 'u' && (e.indexable = String(e.indexable) !== 'false'),
    typeof e.trailingSlash < 'u' &&
      !e.trailingSlash &&
      (e.trailingSlash = String(e.trailingSlash) !== 'false'),
    e.url &&
      !ft(String(e.url), { acceptRelative: !0, strict: !1 }) &&
      (e.url = Rm(String(e.url)));
  const t = Object.keys(e).sort((r, s) => r.localeCompare(s)),
    n = {};
  for (const r of t) n[r] = e[r];
  return n;
}
function Mw(e) {
  const n = [];
  function r(o) {
    if (!o || typeof o != 'object' || Object.keys(o).length === 0)
      return () => {};
    o._context;
    const i = {};
    for (const l in o) {
      const u = o[l];
      typeof u < 'u' && u !== '' && (i[l] = u);
    }
    let a;
    return (
      Object.keys(i).filter((l) => !l.startsWith('_')).length > 0 &&
        (a = n.push(i)),
      () => {
        typeof a < 'u' && n.splice(a - 1, 1);
      }
    );
  }
  function s(o) {
    var a;
    const i = {};
    o != null && o.debug && (i._context = {}), (i._priority = {});
    for (const l in n.sort((u, c) => (u._priority || 0) - (c._priority || 0)))
      for (const u in n[l]) {
        const c = u,
          f = o != null && o.resolveRefs ? ze(n[l][u]) : n[l][u];
        !u.startsWith('_') &&
          typeof f < 'u' &&
          f !== '' &&
          ((i[u] = f),
          typeof n[l]._priority < 'u' &&
            n[l]._priority !== -1 &&
            (i._priority[c] = n[l]._priority),
          o != null &&
            o.debug &&
            (i._context[c] =
              ((a = n[l]._context) == null ? void 0 : a[c]) ||
              n[l]._context ||
              'anonymous'));
      }
    return o != null && o.skipNormalize ? i : $w(i);
  }
  return { stack: n, push: r, get: s };
}
const Lw = je({
    name: 'nuxt-site-config:init',
    enforce: 'pre',
    async setup(e) {
      var r;
      const t = Mw(),
        n = Ha('site-config');
      {
        const s = n.value || window.__NUXT_SITE_CONFIG__ || {};
        for (const o in s)
          o[0] !== '_' &&
            t.push({
              [o]: s[o],
              _priority: ((r = s._priority) == null ? void 0 : r[o]) || -1
            });
      }
      return { provide: { nuxtSiteConfig: t } };
    }
  }),
  Nw = je({
    name: 'nuxt:payload',
    setup(e) {
      Ge().beforeResolve(async (t, n) => {
        if (t.path === n.path) return;
        const r = await Jl(t.path);
        r && Object.assign(e.static.data, r.data);
      }),
        cs(() => {
          var t;
          e.hooks.hook('link:prefetch', async (n) => {
            const { hostname: r } = new URL(n, window.location.href);
            r === window.location.hostname && (await Jl(n));
          }),
            ((t = navigator.connection) == null ? void 0 : t.effectiveType) !==
              'slow-2g' && setTimeout(_o, 1e3);
        });
    }
  }),
  jw = je(() => {
    const e = Ge();
    cs(() => {
      e.beforeResolve(async () => {
        await new Promise((t) => {
          setTimeout(t, 100),
            requestAnimationFrame(() => {
              setTimeout(t, 0);
            });
        });
      });
    });
  }),
  Hw = je((e) => {
    let t;
    async function n() {
      const r = await _o();
      t && clearTimeout(t), (t = setTimeout(n, Dl));
      try {
        const s = await $fetch(Pa('builds/latest.json') + `?${Date.now()}`);
        s.id !== r.id && e.hooks.callHook('app:manifest:update', s);
      } catch {}
    }
    cs(() => {
      t = setTimeout(n, Dl);
    });
  }),
  Fw = je({
    name: 'nuxt:chunk-reload',
    setup(e) {
      const t = Ge(),
        n = bt(),
        r = new Set();
      t.beforeEach(() => {
        r.clear();
      }),
        e.hook('app:chunkError', ({ error: o }) => {
          r.add(o);
        });
      function s(o) {
        const a =
          'href' in o && o.href[0] === '#'
            ? n.app.baseURL + o.href
            : ss(n.app.baseURL, o.fullPath);
        _w({ path: a, persistState: !0 });
      }
      e.hook('app:manifest:update', () => {
        t.beforeResolve(s);
      }),
        t.onError((o, i) => {
          r.has(o) && s(i);
        });
    }
  });
function Dw() {
  return bt().public['nuxt-scripts'];
}
const Bw = ['onNuxtReady', 'client'],
  Uw = ['preconnect', 'dns-prefetch'];
function zw(e, t, n) {
  const { src: r } = e,
    s = os(r),
    o = t && Uw.includes(t),
    i = o ? `${s.protocol}${s.host}` : r,
    a = !!s.host;
  if (!t || (o && !a)) return;
  const l = {
      href: i,
      rel: t,
      ...Jw(e, ['crossorigin', 'referrerpolicy', 'fetchpriority', 'integrity'])
    },
    u = { fetchpriority: 'low' };
  return (
    t === 'preload' && (u.as = 'script'),
    a && ((u.crossorigin = 'anonymous'), (u.referrerpolicy = 'no-referrer')),
    ls({ link: [nn(l, u)] }, { head: n, tagPriority: 'high' })
  );
}
function Vw(e, t) {
  var l, u, c;
  (e = typeof e == 'string' ? { src: e } : e),
    (t = nn(t, (l = Dw()) == null ? void 0 : l.defaultScriptOptions));
  const n = String(hv(e)),
    r = de(),
    s = t.head || as();
  r.$scripts = r.$scripts || tt({});
  const o = !!((u = r.$scripts) != null && u[n]);
  !t.warmupStrategy &&
    Bw.includes(String(t.trigger)) &&
    (t.warmupStrategy = 'preload'),
    t.trigger === 'onNuxtReady' && (t.trigger = cs),
    o ||
      (c = performance == null ? void 0 : performance.mark) == null ||
      c.call(performance, 'mark_feature_usage', {
        detail: { feature: t.performanceMarkFeature ?? `nuxt-scripts:${n}` }
      });
  const i = Vv(e, t);
  (i.warmup = (f) => {
    i._warmupEl || (i._warmupEl = zw(e, f, s));
  }),
    t.warmupStrategy && i.warmup(t.warmupStrategy);
  const a = i.remove;
  return (
    (i.remove = () => {
      var f;
      return (
        (f = i._warmupEl) == null || f.dispose(), (r.$scripts[n] = void 0), a()
      );
    }),
    (r.$scripts[n] = i),
    i
  );
}
const Fa = Object.assign(() => {}, { __unenv__: !0 }),
  Ww = Fa,
  Cc = Fa,
  Kw = Fa;
function qw(e) {
  return (bt().public.scripts || {})[e];
}
function Gw(e, t, n) {
  const r = qw(e),
    s = Object.assign(n || {}, typeof r == 'object' ? r : {}),
    o = t(s),
    i = nn(s.scriptInput, o.scriptInput, { key: e }),
    a = Object.assign(
      (s == null ? void 0 : s.scriptOptions) || {},
      o.scriptOptions || {}
    ),
    l = a.beforeInit;
  return (
    (a.beforeInit = () => {
      var u;
      l == null || l(), (u = o.clientInit) == null || u.call(o);
    }),
    Vw(i, a)
  );
}
function Jw(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
Ww({ id: Cc(), l: Kw(Cc()) });
function Qw(e) {
  return {
    dataLayer: window[e.l ?? 'dataLayer'],
    google_tag_manager: window.google_tag_manager
  };
}
function Yw(e) {
  return Gw(
    (e == null ? void 0 : e.key) || 'googleTagManager',
    (t) => ({
      scriptInput: {
        src: Aa('https://www.googletagmanager.com/gtm.js', {
          id: t == null ? void 0 : t.id,
          l: t == null ? void 0 : t.l
        })
      },
      schema: void 0,
      scriptOptions: {
        use: () => Qw(t),
        stub: void 0,
        performanceMarkFeature: 'nuxt-third-parties-gtm',
        tagPriority: 1
      },
      clientInit: () => {
        (window[(t == null ? void 0 : t.l) ?? 'dataLayer'] =
          window[(t == null ? void 0 : t.l) ?? 'dataLayer'] || []),
          window[(t == null ? void 0 : t.l) ?? 'dataLayer'].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
      }
    }),
    e
  );
}
const Xw = je({
    name: 'scripts:init',
    env: { islands: !1 },
    parallel: !0,
    setup() {
      return {
        provide: { $scripts: { googleTagManager: Yw({ id: 'GTM-PDJLSTWM' }) } }
      };
    }
  }),
  Zw = Vu(() =>
    yt(() => Promise.resolve().then(() => CS), void 0, import.meta.url).then(
      (e) => e.default || e.default || e
    )
  ),
  e_ = [['Icon', Zw]],
  t_ = je({
    name: 'nuxt:global-components',
    setup(e) {
      for (const [t, n] of e_)
        e.vueApp.component(t, n), e.vueApp.component('Lazy' + t, n);
    }
  }),
  gn = {
    default: Vu(() =>
      yt(
        () => import('./DM_Ll8qE.js'),
        __vite__mapDeps([12, 6, 5]),
        import.meta.url
      ).then((e) => e.default || e)
    )
  },
  n_ = je({
    name: 'nuxt:prefetch',
    setup(e) {
      const t = Ge();
      e.hooks.hook('app:mounted', () => {
        t.beforeEach(async (n) => {
          var s;
          const r =
            (s = n == null ? void 0 : n.meta) == null ? void 0 : s.layout;
          r && typeof gn[r] == 'function' && (await gn[r]());
        });
      }),
        e.hooks.hook('link:prefetch', (n) => {
          if (ft(n)) return;
          const r = t.resolve(n);
          if (!r) return;
          const s = r.meta.layout;
          let o = ja(r.meta.middleware);
          o = o.filter((i) => typeof i == 'string');
          for (const i of o) typeof Br[i] == 'function' && Br[i]();
          s && typeof gn[s] == 'function' && gn[s]();
        });
    }
  });
function So(e) {
  const t = tt({});
  return (
    jt(() => {
      const n = de().$nuxtSiteConfig.get(nn({ resolveRefs: !0 }, e));
      Object.assign(t, n);
    }),
    delete t._priority,
    t
  );
}
const r_ = je(() => {
  const e = as();
  if (!e) return;
  const t = So(),
    n = {
      meta: [],
      templateParams: { site: t, siteUrl: t.url, siteName: t.name }
    };
  t.separator && (n.templateParams.separator = t.separator),
    t.titleSeparator && (n.templateParams.titleSeparator = t.titleSeparator),
    t.description &&
      ((n.templateParams.siteDescription = t.description),
      n.meta.push({ name: 'description', content: '%site.description' })),
    e.push(n, { tagPriority: 150 });
});
function s_(e = {}) {
  return {
    hooks: {
      entries: {
        resolve({ entries: t }) {
          var s, o;
          let n = null,
            r = 999;
          for (const i of t) {
            const a = i.resolvedInput ? 'resolvedInput' : 'input',
              l = i[a],
              u =
                (typeof l.titleTemplate == 'object'
                  ? (s = l.titleTemplate) == null
                    ? void 0
                    : s.tagPriority
                  : !1) ||
                i.tagPriority ||
                100;
            l.titleTemplate !== void 0 &&
              u <= r &&
              ((n = l.titleTemplate), (r = u));
          }
          for (const i of t) {
            const a = i.resolvedInput ? 'resolvedInput' : 'input',
              l = i[a],
              u = l.meta || [];
            n = $i(n, l.title);
            const c = l.title,
              f =
                (o = u.find((b) => b.name === 'description')) == null
                  ? void 0
                  : o.content,
              d = u.some((b) => b.property === 'og:title'),
              p = u.some((b) => b.property === 'og:image'),
              g = u.some((b) => b.name === 'twitter:card'),
              y = u.some((b) => b.property === 'og:description');
            if (
              ((i[a].meta = l.meta || []), !d && (l.titleTemplate || l.title))
            ) {
              let b = (e == null ? void 0 : e.ogTitle) || n || l.title;
              typeof b == 'function' && (b = b(c)),
                b &&
                  i[a].meta.push({ property: 'og:title', content: String(b) });
            }
            if (f && !y) {
              let b = (e == null ? void 0 : e.ogDescription) || f;
              typeof b == 'function' && (b = b(c)),
                b &&
                  i[a].meta.push({
                    property: 'og:description',
                    content: String(b)
                  });
            }
            p &&
              !g &&
              i[a].meta.push({
                name: 'twitter:card',
                content:
                  (e == null ? void 0 : e.twitterCard) || 'summary_large_image'
              });
          }
        }
      }
    }
  };
}
const o_ = je(() => {
    const e = as();
    e && e.use(s_());
  }),
  i_ = /\d/,
  a_ = ['-', '_', '/', '.'];
function l_(e = '') {
  if (!i_.test(e)) return e !== e.toLowerCase();
}
function c_(e, t) {
  const n = a_,
    r = [];
  if (!e || typeof e != 'string') return r;
  let s = '',
    o,
    i;
  for (const a of e) {
    const l = n.includes(a);
    if (l === !0) {
      r.push(s), (s = ''), (o = void 0);
      continue;
    }
    const u = l_(a);
    if (i === !1) {
      if (o === !1 && u === !0) {
        r.push(s), (s = a), (o = u);
        continue;
      }
      if (o === !0 && u === !1 && s.length > 1) {
        const c = s.at(-1);
        r.push(s.slice(0, Math.max(0, s.length - 1))), (s = c + a), (o = u);
        continue;
      }
    }
    (s += a), (o = u), (i = l);
  }
  return r.push(s), r;
}
function u_(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : '';
}
const f_ = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function d_(e, t) {
  return (Array.isArray(e) ? e : c_(e))
    .filter(Boolean)
    .map((n) => (f_.test(n) ? n.toLowerCase() : u_(n)))
    .join(' ');
}
const p_ = je({
  name: 'nuxt-seo:fallback-titles',
  env: { islands: !1 },
  setup() {
    const e = fr(),
      t = Dn(),
      n = F(() => {
        var i, a, l;
        if ([404, 500].includes((i = t.value) == null ? void 0 : i.statusCode))
          return `${t.value.statusCode} - ${t.value.message}`;
        if (typeof ((a = e.meta) == null ? void 0 : a.title) == 'string')
          return (l = e.meta) == null ? void 0 : l.title;
        const o = Fn(e.path || '/')
          .split('/')
          .pop();
        return o ? d_(o) : null;
      });
    ls({ title: () => n.value }, { tagPriority: 101 });
  }
});
function pr(e) {
  return ua() ? (js(e), !0) : !1;
}
function Da(e) {
  let t = 0,
    n,
    r;
  const s = () => {
    (t -= 1), r && t <= 0 && (r.stop(), (n = void 0), (r = void 0));
  };
  return (...o) => (
    (t += 1), r || ((r = fu(!0)), (n = r.run(() => e(...o)))), pr(s), n
  );
}
function h_(e, t) {
  if (typeof Symbol < 'u') {
    const n = { ...e };
    return (
      Object.defineProperty(n, Symbol.iterator, {
        enumerable: !1,
        value() {
          let r = 0;
          return { next: () => ({ value: t[r++], done: r > t.length }) };
        }
      }),
      n
    );
  } else return Object.assign([...t], e);
}
function g_(e) {
  if (!Te(e)) return tt(e);
  const t = new Proxy(
    {},
    {
      get(n, r, s) {
        return E(Reflect.get(e.value, r, s));
      },
      set(n, r, s) {
        return (
          Te(e.value[r]) && !Te(s) ? (e.value[r].value = s) : (e.value[r] = s),
          !0
        );
      },
      deleteProperty(n, r) {
        return Reflect.deleteProperty(e.value, r);
      },
      has(n, r) {
        return Reflect.has(e.value, r);
      },
      ownKeys() {
        return Object.keys(e.value);
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      }
    }
  );
  return tt(t);
}
function Dd(e) {
  return g_(F(e));
}
function m_(e, ...t) {
  const n = t.flat(),
    r = n[0];
  return Dd(() =>
    Object.fromEntries(
      typeof r == 'function'
        ? Object.entries(Xt(e)).filter(([s, o]) => !r(ze(o), s))
        : Object.entries(Xt(e)).filter((s) => !n.includes(s[0]))
    )
  );
}
const hr = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const y_ = (e) => typeof e < 'u',
  v_ = Object.prototype.toString,
  b_ = (e) => v_.call(e) === '[object Object]',
  oo = () => {};
function w_(e, t) {
  function n(...r) {
    return new Promise((s, o) => {
      Promise.resolve(
        e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })
      )
        .then(s)
        .catch(o);
    });
  }
  return n;
}
function __(e, t = {}) {
  let n,
    r,
    s = oo;
  const o = (l) => {
    clearTimeout(l), s(), (s = oo);
  };
  let i;
  return (l) => {
    const u = ze(e),
      c = ze(t.maxWait);
    return (
      n && o(n),
      u <= 0 || (c !== void 0 && c <= 0)
        ? (r && (o(r), (r = null)), Promise.resolve(l()))
        : new Promise((f, d) => {
            (s = t.rejectOnCancel ? d : f),
              (i = l),
              c &&
                !r &&
                (r = setTimeout(() => {
                  n && o(n), (r = null), f(i());
                }, c)),
              (n = setTimeout(() => {
                r && o(r), (r = null), f(l());
              }, u));
          })
    );
  };
}
function x_(e) {
  const t = Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}
const S_ = /-(\w)/g,
  C_ = x_((e) => e.replace(S_, (t, n) => (n ? n.toUpperCase() : '')));
function Go(e) {
  return Array.isArray(e) ? e : [e];
}
function k_(...e) {
  if (e.length !== 1) return On(...e);
  const t = e[0];
  return typeof t == 'function' ? ts(ya(() => ({ get: t, set: oo }))) : X(t);
}
function gr(e, ...t) {
  const n = t.flat(),
    r = n[0];
  return Dd(() =>
    Object.fromEntries(
      typeof r == 'function'
        ? Object.entries(Xt(e)).filter(([s, o]) => r(ze(o), s))
        : n.map((s) => [s, k_(e, s)])
    )
  );
}
function yk(e, t = 1e4) {
  return ya((n, r) => {
    let s = ze(e),
      o;
    const i = () =>
      setTimeout(() => {
        (s = ze(e)), r();
      }, ze(t));
    return (
      pr(() => {
        clearTimeout(o);
      }),
      {
        get() {
          return n(), s;
        },
        set(a) {
          (s = a), r(), clearTimeout(o), (o = i());
        }
      }
    );
  });
}
function vk(e, t = 200, n = {}) {
  return w_(__(t, n), e);
}
function Bd(e, t, n = {}) {
  const { immediate: r = !0, immediateCallback: s = !1 } = n,
    o = At(!1);
  let i = null;
  function a() {
    i && (clearTimeout(i), (i = null));
  }
  function l() {
    (o.value = !1), a();
  }
  function u(...c) {
    s && e(),
      a(),
      (o.value = !0),
      (i = setTimeout(() => {
        (o.value = !1), (i = null), e(...c);
      }, ze(t)));
  }
  return (
    r && ((o.value = !0), hr && u()),
    pr(l),
    { isPending: ts(o), start: u, stop: l }
  );
}
function E_(e = 1e3, t = {}) {
  const { controls: n = !1, callback: r } = t,
    s = Bd(r ?? oo, e, t),
    o = F(() => !s.isPending.value);
  return n ? { ready: o, ...s } : o;
}
function T_(e, t, n) {
  return Pe(e, t, { ...n, immediate: !0 });
}
function bk(e = {}) {
  const { inheritAttrs: t = !0 } = e,
    n = At(),
    r = re({
      setup(o, { slots: i }) {
        return () => {
          n.value = i.default;
        };
      }
    }),
    s = re({
      inheritAttrs: t,
      props: e.props,
      setup(o, { attrs: i, slots: a }) {
        return () => {
          var l;
          n.value;
          const u =
            (l = n.value) == null
              ? void 0
              : l.call(n, { ...(e.props == null ? A_(i) : o), $slots: a });
          return t && (u == null ? void 0 : u.length) === 1 ? u[0] : u;
        };
      }
    });
  return h_({ define: r, reuse: s }, [r, s]);
}
function A_(e) {
  const t = {};
  for (const n in e) t[C_(n)] = e[n];
  return t;
}
const us = hr ? window : void 0;
function bn(e) {
  var t;
  const n = ze(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function P_(...e) {
  const t = [],
    n = () => {
      t.forEach((a) => a()), (t.length = 0);
    },
    r = (a, l, u, c) => (
      a.addEventListener(l, u, c), () => a.removeEventListener(l, u, c)
    ),
    s = F(() => {
      const a = Go(ze(e[0])).filter((l) => l != null);
      return a.every((l) => typeof l != 'string') ? a : void 0;
    }),
    o = T_(
      () => {
        var a, l;
        return [
          (l = (a = s.value) == null ? void 0 : a.map((u) => bn(u))) != null
            ? l
            : [us].filter((u) => u != null),
          Go(ze(s.value ? e[1] : e[0])),
          Go(E(s.value ? e[2] : e[1])),
          ze(s.value ? e[3] : e[2])
        ];
      },
      ([a, l, u, c]) => {
        if (
          (n(),
          !(a != null && a.length) ||
            !(l != null && l.length) ||
            !(u != null && u.length))
        )
          return;
        const f = b_(c) ? { ...c } : c;
        t.push(
          ...a.flatMap((d) => l.flatMap((p) => u.map((g) => r(d, p, g, f))))
        );
      },
      { flush: 'post' }
    ),
    i = () => {
      o(), n();
    };
  return pr(n), i;
}
function Ud() {
  const e = At(!1),
    t = Ve();
  return (
    t &&
      dt(() => {
        e.value = !0;
      }, t),
    e
  );
}
function R_(e) {
  const t = Ud();
  return F(() => (t.value, !!e()));
}
function O_(e) {
  return typeof e == 'function'
    ? e
    : typeof e == 'string'
      ? (t) => t.key === e
      : Array.isArray(e)
        ? (t) => e.includes(t.key)
        : () => !0;
}
function Ba(...e) {
  let t,
    n,
    r = {};
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (r = e[2]))
    : e.length === 2
      ? typeof e[1] == 'object'
        ? ((t = !0), (n = e[0]), (r = e[1]))
        : ((t = e[0]), (n = e[1]))
      : ((t = !0), (n = e[0]));
  const {
      target: s = us,
      eventName: o = 'keydown',
      passive: i = !1,
      dedupe: a = !1
    } = r,
    l = O_(t);
  return P_(
    s,
    o,
    (c) => {
      (c.repeat && ze(a)) || (l(c) && n(c));
    },
    i
  );
}
function zd(e, t = {}) {
  const {
      immediate: n = !0,
      fpsLimit: r = void 0,
      window: s = us,
      once: o = !1
    } = t,
    i = At(!1),
    a = F(() => (r ? 1e3 / ze(r) : null));
  let l = 0,
    u = null;
  function c(p) {
    if (!i.value || !s) return;
    l || (l = p);
    const g = p - l;
    if (a.value && g < a.value) {
      u = s.requestAnimationFrame(c);
      return;
    }
    if (((l = p), e({ delta: g, timestamp: p }), o)) {
      (i.value = !1), (u = null);
      return;
    }
    u = s.requestAnimationFrame(c);
  }
  function f() {
    !i.value &&
      s &&
      ((i.value = !0), (l = 0), (u = s.requestAnimationFrame(c)));
  }
  function d() {
    (i.value = !1), u != null && s && (s.cancelAnimationFrame(u), (u = null));
  }
  return n && f(), pr(d), { isActive: ts(i), pause: d, resume: f };
}
function I_(e) {
  return JSON.parse(JSON.stringify(e));
}
function wk(e, t, n = {}) {
  const { window: r = us, ...s } = n;
  let o;
  const i = R_(() => r && 'ResizeObserver' in r),
    a = () => {
      o && (o.disconnect(), (o = void 0));
    },
    l = F(() => {
      const f = ze(e);
      return Array.isArray(f) ? f.map((d) => bn(d)) : [bn(f)];
    }),
    u = Pe(
      l,
      (f) => {
        if ((a(), i.value && r)) {
          o = new ResizeObserver(t);
          for (const d of f) d && o.observe(d, s);
        }
      },
      { immediate: !0, flush: 'post' }
    ),
    c = () => {
      a(), u();
    };
  return pr(c), { isSupported: i, stop: c };
}
function $_(e, t, n, r = {}) {
  var s, o, i;
  const {
      clone: a = !1,
      passive: l = !1,
      eventName: u,
      deep: c = !1,
      defaultValue: f,
      shouldEmit: d
    } = r,
    p = Ve(),
    g =
      n ||
      (p == null ? void 0 : p.emit) ||
      ((s = p == null ? void 0 : p.$emit) == null ? void 0 : s.bind(p)) ||
      ((i = (o = p == null ? void 0 : p.proxy) == null ? void 0 : o.$emit) ==
      null
        ? void 0
        : i.bind(p == null ? void 0 : p.proxy));
  let y = u;
  t || (t = 'modelValue'), (y = y || `update:${t.toString()}`);
  const b = (h) => (a ? (typeof a == 'function' ? a(h) : I_(h)) : h),
    _ = () => (y_(e[t]) ? b(e[t]) : f),
    v = (h) => {
      d ? d(h) && g(y, h) : g(y, h);
    };
  if (l) {
    const h = _(),
      m = X(h);
    let x = !1;
    return (
      Pe(
        () => e[t],
        (C) => {
          x || ((x = !0), (m.value = b(C)), Ft(() => (x = !1)));
        }
      ),
      Pe(
        m,
        (C) => {
          !x && (C !== e[t] || c) && v(C);
        },
        { deep: c }
      ),
      m
    );
  } else
    return F({
      get() {
        return _();
      },
      set(h) {
        v(h);
      }
    });
}
const Ua = Symbol('nuxt-ui.slideover');
function M_() {
  const e = Ae(Ua),
    t = X(!1);
  function n(i, a) {
    if (!e) throw new Error('useSlideover() is called without provider');
    (e.value = { component: i, props: a ?? {} }), (t.value = !0);
  }
  async function r() {
    e && (t.value = !1);
  }
  function s() {
    e && (e.value = { component: 'div', props: {} });
  }
  function o(i) {
    e && (e.value = { ...e.value, props: { ...e.value.props, ...i } });
  }
  return { open: n, close: r, reset: s, patch: o, isOpen: t };
}
const L_ = Da(M_),
  N_ = je((e) => {
    const t = At({ component: 'div', props: {} });
    e.vueApp.provide(Ua, t);
  }),
  za = Symbol('nuxt-ui.modal');
function j_() {
  const e = Ae(za),
    t = X(!1);
  function n(i, a) {
    if (!e) throw new Error('useModal() is called without provider');
    (e.value = { component: i, props: a ?? {} }), (t.value = !0);
  }
  async function r() {
    e && (t.value = !1);
  }
  function s() {
    e && (e.value = { component: 'div', props: {} });
  }
  function o(i) {
    e && (e.value = { ...e.value, props: { ...e.value.props, ...i } });
  }
  return { open: n, close: r, reset: s, patch: o, isOpen: t };
}
const H_ = Da(j_),
  F_ = je((e) => {
    const t = At({ component: 'div', props: {} });
    e.vueApp.provide(za, t);
  }),
  D_ = je(() => {
    const e = Sn(),
      t = de(),
      n = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    function r(a, l) {
      return `${n.map((u) => `--ui-color-${a}-${u}: var(--color-${l}-${u});`)
        .join(`
  `)}`;
    }
    function s(a, l) {
      return `--ui-${a}: var(--ui-color-${a}-${l});`;
    }
    const o = F(() => {
        const { neutral: a, ...l } = e.ui.colors;
        return `:root {
  ${Object.entries(e.ui.colors).map(([u, c]) => r(u, c)).join(`
  `)}

  ${Object.keys(l).map((u) => s(u, 500)).join(`
  `)}
}
.dark {
  ${Object.keys(l).map((u) => s(u, 400)).join(`
  `)}
}`;
      }),
      i = {
        style: [
          {
            innerHTML: () => o.value,
            tagPriority: -2,
            id: 'nuxt-ui-colors',
            type: 'text/css'
          }
        ]
      };
    if (t.isHydrating && !t.payload.serverRendered) {
      const a = document.createElement('style');
      (a.innerHTML = o.value),
        a.setAttribute('data-nuxt-ui-colors', ''),
        document.head.appendChild(a),
        (i.script = [
          {
            innerHTML:
              "document.head.removeChild(document.querySelector('[data-nuxt-ui-colors]'))"
          }
        ]);
    }
    xv(i);
  }),
  B_ = '__NUXT_COLOR_MODE__',
  Jo = 'nuxt-color-mode',
  U_ = 'localStorage',
  zt = window[B_] || {},
  z_ = je((e) => {
    const t = Ha('color-mode', () =>
      tt({
        preference: zt.preference,
        value: zt.value,
        unknown: !1,
        forced: !1
      })
    ).value;
    Ge().afterEach((o) => {
      const i = o.meta.colorMode;
      i && i !== 'system'
        ? ((t.value = i), (t.forced = !0))
        : ((t.forced = !1),
          (t.value =
            t.preference === 'system' ? zt.getColorScheme() : t.preference));
    });
    let n;
    function r() {
      n ||
        !window.matchMedia ||
        ((n = window.matchMedia('(prefers-color-scheme: dark)')),
        n.addEventListener('change', () => {
          !t.forced &&
            t.preference === 'system' &&
            (t.value = zt.getColorScheme());
        }));
    }
    function s(o, i) {
      var a, l;
      switch (o) {
        case 'cookie':
          window.document.cookie = Jo + '=' + i;
          break;
        case 'sessionStorage':
          (a = window.sessionStorage) == null || a.setItem(Jo, i);
          break;
        case 'localStorage':
        default:
          (l = window.localStorage) == null || l.setItem(Jo, i);
      }
    }
    Pe(
      () => t.preference,
      (o) => {
        t.forced ||
          (o === 'system'
            ? ((t.value = zt.getColorScheme()), r())
            : (t.value = o),
          s(U_, o));
      },
      { immediate: !0 }
    ),
      Pe(
        () => t.value,
        (o, i) => {
          let a;
          (a = window.document.createElement('style')),
            a.appendChild(
              document.createTextNode(
                '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
              )
            ),
            window.document.head.appendChild(a),
            zt.removeColorScheme(i),
            zt.addColorScheme(o),
            window.getComputedStyle(a).opacity,
            document.head.removeChild(a);
        }
      ),
      t.preference === 'system' && r(),
      e.hook('app:mounted', () => {
        t.unknown &&
          ((t.preference = zt.preference),
          (t.value = zt.value),
          (t.unknown = !1));
      }),
      e.provide('colorMode', t);
  }),
  Vd = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  fs = (e, t, n, r = '') => {
    const s = e.split(':');
    if (e.slice(0, 1) === '@') {
      if (s.length < 2 || s.length > 3) return null;
      r = s.shift().slice(1);
    }
    if (s.length > 3 || !s.length) return null;
    if (s.length > 1) {
      const a = s.pop(),
        l = s.pop(),
        u = { provider: s.length > 0 ? s[0] : r, prefix: l, name: a };
      return t && !$s(u) ? null : u;
    }
    const o = s[0],
      i = o.split('-');
    if (i.length > 1) {
      const a = { provider: r, prefix: i.shift(), name: i.join('-') };
      return t && !$s(a) ? null : a;
    }
    if (n && r === '') {
      const a = { provider: r, prefix: '', name: o };
      return t && !$s(a, n) ? null : a;
    }
    return null;
  },
  $s = (e, t) => (e ? !!(((t && e.prefix === '') || e.prefix) && e.name) : !1),
  Wd = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  io = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  mr = Object.freeze({ ...Wd, ...io }),
  Ki = Object.freeze({ ...mr, body: '', hidden: !1 });
function V_(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0),
    !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return r && (n.rotate = r), n;
}
function kc(e, t) {
  const n = V_(e, t);
  for (const r in Ki)
    r in io
      ? r in e && !(r in n) && (n[r] = io[r])
      : r in t
        ? (n[r] = t[r])
        : r in e && (n[r] = e[r]);
  return n;
}
function W_(e, t) {
  const n = e.icons,
    r = e.aliases || Object.create(null),
    s = Object.create(null);
  function o(i) {
    if (n[i]) return (s[i] = []);
    if (!(i in s)) {
      s[i] = null;
      const a = r[i] && r[i].parent,
        l = a && o(a);
      l && (s[i] = [a].concat(l));
    }
    return s[i];
  }
  return Object.keys(n).concat(Object.keys(r)).forEach(o), s;
}
function K_(e, t, n) {
  const r = e.icons,
    s = e.aliases || Object.create(null);
  let o = {};
  function i(a) {
    o = kc(r[a] || s[a], o);
  }
  return i(t), n.forEach(i), kc(e, o);
}
function Kd(e, t) {
  const n = [];
  if (typeof e != 'object' || typeof e.icons != 'object') return n;
  e.not_found instanceof Array &&
    e.not_found.forEach((s) => {
      t(s, null), n.push(s);
    });
  const r = W_(e);
  for (const s in r) {
    const o = r[s];
    o && (t(s, K_(e, s, o)), n.push(s));
  }
  return n;
}
const q_ = { provider: '', aliases: {}, not_found: {}, ...Wd };
function Qo(e, t) {
  for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
  return !0;
}
function qd(e) {
  if (typeof e != 'object' || e === null) return null;
  const t = e;
  if (
    typeof t.prefix != 'string' ||
    !e.icons ||
    typeof e.icons != 'object' ||
    !Qo(e, q_)
  )
    return null;
  const n = t.icons;
  for (const s in n) {
    const o = n[s];
    if (!s || typeof o.body != 'string' || !Qo(o, Ki)) return null;
  }
  const r = t.aliases || Object.create(null);
  for (const s in r) {
    const o = r[s],
      i = o.parent;
    if (!s || typeof i != 'string' || (!n[i] && !r[i]) || !Qo(o, Ki))
      return null;
  }
  return t;
}
const Ec = Object.create(null);
function G_(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: Object.create(null),
    missing: new Set()
  };
}
function jn(e, t) {
  const n = Ec[e] || (Ec[e] = Object.create(null));
  return n[t] || (n[t] = G_(e, t));
}
function Gd(e, t) {
  return qd(t)
    ? Kd(t, (n, r) => {
        r ? (e.icons[n] = r) : e.missing.add(n);
      })
    : [];
}
function J_(e, t, n) {
  try {
    if (typeof n.body == 'string') return (e.icons[t] = { ...n }), !0;
  } catch {}
  return !1;
}
let Yr = !1;
function Jd(e) {
  return typeof e == 'boolean' && (Yr = e), Yr;
}
function Va(e) {
  const t = typeof e == 'string' ? fs(e, !0, Yr) : e;
  if (t) {
    const n = jn(t.provider, t.prefix),
      r = t.name;
    return n.icons[r] || (n.missing.has(r) ? null : void 0);
  }
}
function Wa(e, t) {
  const n = fs(e, !0, Yr);
  if (!n) return !1;
  const r = jn(n.provider, n.prefix);
  return t ? J_(r, n.name, t) : (r.missing.add(n.name), !0);
}
function Q_(e, t) {
  if (typeof e != 'object') return !1;
  if ((typeof t != 'string' && (t = e.provider || ''), Yr && !t && !e.prefix)) {
    let s = !1;
    return (
      qd(e) &&
        ((e.prefix = ''),
        Kd(e, (o, i) => {
          Wa(o, i) && (s = !0);
        })),
      s
    );
  }
  const n = e.prefix;
  if (!$s({ prefix: n, name: 'a' })) return !1;
  const r = jn(t, n);
  return !!Gd(r, e);
}
function qi(e) {
  const t = Va(e);
  return t && { ...mr, ...t };
}
const Qd = Object.freeze({ width: null, height: null }),
  Yd = Object.freeze({ ...Qd, ...io }),
  Y_ = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  X_ = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Tc(e, t, n) {
  if (t === 1) return e;
  if (((n = n || 100), typeof e == 'number')) return Math.ceil(e * t * n) / n;
  if (typeof e != 'string') return e;
  const r = e.split(Y_);
  if (r === null || !r.length) return e;
  const s = [];
  let o = r.shift(),
    i = X_.test(o);
  for (;;) {
    if (i) {
      const a = parseFloat(o);
      isNaN(a) ? s.push(o) : s.push(Math.ceil(a * t * n) / n);
    } else s.push(o);
    if (((o = r.shift()), o === void 0)) return s.join('');
    i = !i;
  }
}
function Z_(e, t = 'defs') {
  let n = '';
  const r = e.indexOf('<' + t);
  for (; r >= 0; ) {
    const s = e.indexOf('>', r),
      o = e.indexOf('</' + t);
    if (s === -1 || o === -1) break;
    const i = e.indexOf('>', o);
    if (i === -1) break;
    (n += e.slice(s + 1, o).trim()),
      (e = e.slice(0, r).trim() + e.slice(i + 1));
  }
  return { defs: n, content: e };
}
function e0(e, t) {
  return e ? '<defs>' + e + '</defs>' + t : t;
}
function t0(e, t, n) {
  const r = Z_(e);
  return e0(r.defs, t + r.content + n);
}
const n0 = (e) => e === 'unset' || e === 'undefined' || e === 'none';
function r0(e, t) {
  const n = { ...mr, ...e },
    r = { ...Yd, ...t },
    s = { left: n.left, top: n.top, width: n.width, height: n.height };
  let o = n.body;
  [n, r].forEach((y) => {
    const b = [],
      _ = y.hFlip,
      v = y.vFlip;
    let h = y.rotate;
    _
      ? v
        ? (h += 2)
        : (b.push(
            'translate(' +
              (s.width + s.left).toString() +
              ' ' +
              (0 - s.top).toString() +
              ')'
          ),
          b.push('scale(-1 1)'),
          (s.top = s.left = 0))
      : v &&
        (b.push(
          'translate(' +
            (0 - s.left).toString() +
            ' ' +
            (s.height + s.top).toString() +
            ')'
        ),
        b.push('scale(1 -1)'),
        (s.top = s.left = 0));
    let m;
    switch ((h < 0 && (h -= Math.floor(h / 4) * 4), (h = h % 4), h)) {
      case 1:
        (m = s.height / 2 + s.top),
          b.unshift('rotate(90 ' + m.toString() + ' ' + m.toString() + ')');
        break;
      case 2:
        b.unshift(
          'rotate(180 ' +
            (s.width / 2 + s.left).toString() +
            ' ' +
            (s.height / 2 + s.top).toString() +
            ')'
        );
        break;
      case 3:
        (m = s.width / 2 + s.left),
          b.unshift('rotate(-90 ' + m.toString() + ' ' + m.toString() + ')');
        break;
    }
    h % 2 === 1 &&
      (s.left !== s.top && ((m = s.left), (s.left = s.top), (s.top = m)),
      s.width !== s.height &&
        ((m = s.width), (s.width = s.height), (s.height = m))),
      b.length && (o = t0(o, '<g transform="' + b.join(' ') + '">', '</g>'));
  });
  const i = r.width,
    a = r.height,
    l = s.width,
    u = s.height;
  let c, f;
  i === null
    ? ((f = a === null ? '1em' : a === 'auto' ? u : a), (c = Tc(f, l / u)))
    : ((c = i === 'auto' ? l : i),
      (f = a === null ? Tc(c, u / l) : a === 'auto' ? u : a));
  const d = {},
    p = (y, b) => {
      n0(b) || (d[y] = b.toString());
    };
  p('width', c), p('height', f);
  const g = [s.left, s.top, l, u];
  return (d.viewBox = g.join(' ')), { attributes: d, viewBox: g, body: o };
}
const s0 = /\sid="(\S+)"/g,
  o0 =
    'IconifyId' +
    Date.now().toString(16) +
    ((Math.random() * 16777216) | 0).toString(16);
let i0 = 0;
function a0(e, t = o0) {
  const n = [];
  let r;
  for (; (r = s0.exec(e)); ) n.push(r[1]);
  if (!n.length) return e;
  const s = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16);
  return (
    n.forEach((o) => {
      const i = typeof t == 'function' ? t(o) : t + (i0++).toString(),
        a = o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      e = e.replace(
        new RegExp('([#;"])(' + a + ')([")]|\\.[a-z])', 'g'),
        '$1' + i + s + '$3'
      );
    }),
    (e = e.replace(new RegExp(s, 'g'), '')),
    e
  );
}
const Gi = Object.create(null);
function Xd(e, t) {
  Gi[e] = t;
}
function Ji(e) {
  return Gi[e] || Gi[''];
}
function Ka(e) {
  let t;
  if (typeof e.resources == 'string') t = [e.resources];
  else if (((t = e.resources), !(t instanceof Array) || !t.length)) return null;
  return {
    resources: t,
    path: e.path || '/',
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const Co = Object.create(null),
  Sr = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
  Ms = [];
for (; Sr.length > 0; )
  Sr.length === 1 || Math.random() > 0.5
    ? Ms.push(Sr.shift())
    : Ms.push(Sr.pop());
Co[''] = Ka({ resources: ['https://api.iconify.design'].concat(Ms) });
function Zd(e, t) {
  const n = Ka(t);
  return n === null ? !1 : ((Co[e] = n), !0);
}
function ko(e) {
  return Co[e];
}
function l0() {
  return Object.keys(Co);
}
const c0 = () => {
  let e;
  try {
    if (((e = fetch), typeof e == 'function')) return e;
  } catch {}
};
let ao = c0();
function u0(e) {
  ao = e;
}
function f0() {
  return ao;
}
function d0(e, t) {
  const n = ko(e);
  if (!n) return 0;
  let r;
  if (!n.maxURL) r = 0;
  else {
    let s = 0;
    n.resources.forEach((i) => {
      s = Math.max(s, i.length);
    });
    const o = t + '.json?icons=';
    r = n.maxURL - s - n.path.length - o.length;
  }
  return r;
}
function p0(e) {
  return e === 404;
}
const h0 = (e, t, n) => {
  const r = [],
    s = d0(e, t),
    o = 'icons';
  let i = { type: o, provider: e, prefix: t, icons: [] },
    a = 0;
  return (
    n.forEach((l, u) => {
      (a += l.length + 1),
        a >= s &&
          u > 0 &&
          (r.push(i),
          (i = { type: o, provider: e, prefix: t, icons: [] }),
          (a = l.length)),
        i.icons.push(l);
    }),
    r.push(i),
    r
  );
};
function g0(e) {
  if (typeof e == 'string') {
    const t = ko(e);
    if (t) return t.path;
  }
  return '/';
}
const m0 = (e, t, n) => {
    if (!ao) {
      n('abort', 424);
      return;
    }
    let r = g0(t.provider);
    switch (t.type) {
      case 'icons': {
        const o = t.prefix,
          a = t.icons.join(','),
          l = new URLSearchParams({ icons: a });
        r += o + '.json?' + l.toString();
        break;
      }
      case 'custom': {
        const o = t.uri;
        r += o.slice(0, 1) === '/' ? o.slice(1) : o;
        break;
      }
      default:
        n('abort', 400);
        return;
    }
    let s = 503;
    ao(e + r)
      .then((o) => {
        const i = o.status;
        if (i !== 200) {
          setTimeout(() => {
            n(p0(i) ? 'abort' : 'next', i);
          });
          return;
        }
        return (s = 501), o.json();
      })
      .then((o) => {
        if (typeof o != 'object' || o === null) {
          setTimeout(() => {
            o === 404 ? n('abort', o) : n('next', s);
          });
          return;
        }
        setTimeout(() => {
          n('success', o);
        });
      })
      .catch(() => {
        n('next', s);
      });
  },
  y0 = { prepare: h0, send: m0 };
function v0(e) {
  const t = { loaded: [], missing: [], pending: [] },
    n = Object.create(null);
  e.sort((s, o) =>
    s.provider !== o.provider
      ? s.provider.localeCompare(o.provider)
      : s.prefix !== o.prefix
        ? s.prefix.localeCompare(o.prefix)
        : s.name.localeCompare(o.name)
  );
  let r = { provider: '', prefix: '', name: '' };
  return (
    e.forEach((s) => {
      if (
        r.name === s.name &&
        r.prefix === s.prefix &&
        r.provider === s.provider
      )
        return;
      r = s;
      const o = s.provider,
        i = s.prefix,
        a = s.name,
        l = n[o] || (n[o] = Object.create(null)),
        u = l[i] || (l[i] = jn(o, i));
      let c;
      a in u.icons
        ? (c = t.loaded)
        : i === '' || u.missing.has(a)
          ? (c = t.missing)
          : (c = t.pending);
      const f = { provider: o, prefix: i, name: a };
      c.push(f);
    }),
    t
  );
}
function ep(e, t) {
  e.forEach((n) => {
    const r = n.loaderCallbacks;
    r && (n.loaderCallbacks = r.filter((s) => s.id !== t));
  });
}
function b0(e) {
  e.pendingCallbacksFlag ||
    ((e.pendingCallbacksFlag = !0),
    setTimeout(() => {
      e.pendingCallbacksFlag = !1;
      const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
      if (!t.length) return;
      let n = !1;
      const r = e.provider,
        s = e.prefix;
      t.forEach((o) => {
        const i = o.icons,
          a = i.pending.length;
        (i.pending = i.pending.filter((l) => {
          if (l.prefix !== s) return !0;
          const u = l.name;
          if (e.icons[u]) i.loaded.push({ provider: r, prefix: s, name: u });
          else if (e.missing.has(u))
            i.missing.push({ provider: r, prefix: s, name: u });
          else return (n = !0), !0;
          return !1;
        })),
          i.pending.length !== a &&
            (n || ep([e], o.id),
            o.callback(
              i.loaded.slice(0),
              i.missing.slice(0),
              i.pending.slice(0),
              o.abort
            ));
      });
    }));
}
let w0 = 0;
function _0(e, t, n) {
  const r = w0++,
    s = ep.bind(null, n, r);
  if (!t.pending.length) return s;
  const o = { id: r, icons: t, callback: e, abort: s };
  return (
    n.forEach((i) => {
      (i.loaderCallbacks || (i.loaderCallbacks = [])).push(o);
    }),
    s
  );
}
function x0(e, t = !0, n = !1) {
  const r = [];
  return (
    e.forEach((s) => {
      const o = typeof s == 'string' ? fs(s, t, n) : s;
      o && r.push(o);
    }),
    r
  );
}
var S0 = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function C0(e, t, n, r) {
  const s = e.resources.length,
    o = e.random ? Math.floor(Math.random() * s) : e.index;
  let i;
  if (e.random) {
    let C = e.resources.slice(0);
    for (i = []; C.length > 1; ) {
      const P = Math.floor(Math.random() * C.length);
      i.push(C[P]), (C = C.slice(0, P).concat(C.slice(P + 1)));
    }
    i = i.concat(C);
  } else i = e.resources.slice(o).concat(e.resources.slice(0, o));
  const a = Date.now();
  let l = 'pending',
    u = 0,
    c,
    f = null,
    d = [],
    p = [];
  typeof r == 'function' && p.push(r);
  function g() {
    f && (clearTimeout(f), (f = null));
  }
  function y() {
    l === 'pending' && (l = 'aborted'),
      g(),
      d.forEach((C) => {
        C.status === 'pending' && (C.status = 'aborted');
      }),
      (d = []);
  }
  function b(C, P) {
    P && (p = []), typeof C == 'function' && p.push(C);
  }
  function _() {
    return {
      startTime: a,
      payload: t,
      status: l,
      queriesSent: u,
      queriesPending: d.length,
      subscribe: b,
      abort: y
    };
  }
  function v() {
    (l = 'failed'),
      p.forEach((C) => {
        C(void 0, c);
      });
  }
  function h() {
    d.forEach((C) => {
      C.status === 'pending' && (C.status = 'aborted');
    }),
      (d = []);
  }
  function m(C, P, N) {
    const R = P !== 'success';
    switch (((d = d.filter((A) => A !== C)), l)) {
      case 'pending':
        break;
      case 'failed':
        if (R || !e.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (P === 'abort') {
      (c = N), v();
      return;
    }
    if (R) {
      (c = N), d.length || (i.length ? x() : v());
      return;
    }
    if ((g(), h(), !e.random)) {
      const A = e.resources.indexOf(C.resource);
      A !== -1 && A !== e.index && (e.index = A);
    }
    (l = 'completed'),
      p.forEach((A) => {
        A(N);
      });
  }
  function x() {
    if (l !== 'pending') return;
    g();
    const C = i.shift();
    if (C === void 0) {
      if (d.length) {
        f = setTimeout(() => {
          g(), l === 'pending' && (h(), v());
        }, e.timeout);
        return;
      }
      v();
      return;
    }
    const P = {
      status: 'pending',
      resource: C,
      callback: (N, R) => {
        m(P, N, R);
      }
    };
    d.push(P), u++, (f = setTimeout(x, e.rotate)), n(C, t, P.callback);
  }
  return setTimeout(x), _;
}
function tp(e) {
  const t = { ...S0, ...e };
  let n = [];
  function r() {
    n = n.filter((a) => a().status === 'pending');
  }
  function s(a, l, u) {
    const c = C0(t, a, l, (f, d) => {
      r(), u && u(f, d);
    });
    return n.push(c), c;
  }
  function o(a) {
    return n.find((l) => a(l)) || null;
  }
  return {
    query: s,
    find: o,
    setIndex: (a) => {
      t.index = a;
    },
    getIndex: () => t.index,
    cleanup: r
  };
}
function Ac() {}
const Yo = Object.create(null);
function k0(e) {
  if (!Yo[e]) {
    const t = ko(e);
    if (!t) return;
    const n = tp(t),
      r = { config: t, redundancy: n };
    Yo[e] = r;
  }
  return Yo[e];
}
function np(e, t, n) {
  let r, s;
  if (typeof e == 'string') {
    const o = Ji(e);
    if (!o) return n(void 0, 424), Ac;
    s = o.send;
    const i = k0(e);
    i && (r = i.redundancy);
  } else {
    const o = Ka(e);
    if (o) {
      r = tp(o);
      const i = e.resources ? e.resources[0] : '',
        a = Ji(i);
      a && (s = a.send);
    }
  }
  return !r || !s ? (n(void 0, 424), Ac) : r.query(t, s, n)().abort;
}
function Pc() {}
function E0(e) {
  e.iconsLoaderFlag ||
    ((e.iconsLoaderFlag = !0),
    setTimeout(() => {
      (e.iconsLoaderFlag = !1), b0(e);
    }));
}
function T0(e) {
  const t = [],
    n = [];
  return (
    e.forEach((r) => {
      (r.match(Vd) ? t : n).push(r);
    }),
    { valid: t, invalid: n }
  );
}
function Cr(e, t, n) {
  function r() {
    const s = e.pendingIcons;
    t.forEach((o) => {
      s && s.delete(o), e.icons[o] || e.missing.add(o);
    });
  }
  if (n && typeof n == 'object')
    try {
      if (!Gd(e, n).length) {
        r();
        return;
      }
    } catch {}
  r(), E0(e);
}
function Rc(e, t) {
  e instanceof Promise
    ? e
        .then((n) => {
          t(n);
        })
        .catch(() => {
          t(null);
        })
    : t(e);
}
function A0(e, t) {
  e.iconsToLoad
    ? (e.iconsToLoad = e.iconsToLoad.concat(t).sort())
    : (e.iconsToLoad = t),
    e.iconsQueueFlag ||
      ((e.iconsQueueFlag = !0),
      setTimeout(() => {
        e.iconsQueueFlag = !1;
        const { provider: n, prefix: r } = e,
          s = e.iconsToLoad;
        if ((delete e.iconsToLoad, !s || !s.length)) return;
        const o = e.loadIcon;
        if (e.loadIcons && (s.length > 1 || !o)) {
          Rc(e.loadIcons(s, r, n), (c) => {
            Cr(e, s, c);
          });
          return;
        }
        if (o) {
          s.forEach((c) => {
            const f = o(c, r, n);
            Rc(f, (d) => {
              const p = d ? { prefix: r, icons: { [c]: d } } : null;
              Cr(e, [c], p);
            });
          });
          return;
        }
        const { valid: i, invalid: a } = T0(s);
        if ((a.length && Cr(e, a, null), !i.length)) return;
        const l = r.match(Vd) ? Ji(n) : null;
        if (!l) {
          Cr(e, i, null);
          return;
        }
        l.prepare(n, r, i).forEach((c) => {
          np(n, c, (f) => {
            Cr(e, c.icons, f);
          });
        });
      }));
}
const rp = (e, t) => {
    const n = x0(e, !0, Jd()),
      r = v0(n);
    if (!r.pending.length) {
      let l = !0;
      return (
        t &&
          setTimeout(() => {
            l && t(r.loaded, r.missing, r.pending, Pc);
          }),
        () => {
          l = !1;
        }
      );
    }
    const s = Object.create(null),
      o = [];
    let i, a;
    return (
      r.pending.forEach((l) => {
        const { provider: u, prefix: c } = l;
        if (c === a && u === i) return;
        (i = u), (a = c), o.push(jn(u, c));
        const f = s[u] || (s[u] = Object.create(null));
        f[c] || (f[c] = []);
      }),
      r.pending.forEach((l) => {
        const { provider: u, prefix: c, name: f } = l,
          d = jn(u, c),
          p = d.pendingIcons || (d.pendingIcons = new Set());
        p.has(f) || (p.add(f), s[u][c].push(f));
      }),
      o.forEach((l) => {
        const u = s[l.provider][l.prefix];
        u.length && A0(l, u);
      }),
      t ? _0(t, r, o) : Pc
    );
  },
  P0 = (e) =>
    new Promise((t, n) => {
      const r = typeof e == 'string' ? fs(e, !0) : e;
      if (!r) {
        n(e);
        return;
      }
      rp([r || e], (s) => {
        if (s.length && r) {
          const o = Va(r);
          if (o) {
            t({ ...mr, ...o });
            return;
          }
        }
        n(e);
      });
    });
function R0(e, t, n) {
  jn('', t).loadIcons = e;
}
function O0(e, t) {
  const n = { ...e };
  for (const r in t) {
    const s = t[r],
      o = typeof s;
    r in Qd
      ? (s === null || (s && (o === 'string' || o === 'number'))) && (n[r] = s)
      : o === typeof n[r] && (n[r] = r === 'rotate' ? s % 4 : s);
  }
  return n;
}
const I0 = /[\s,]+/;
function $0(e, t) {
  t.split(I0).forEach((n) => {
    switch (n.trim()) {
      case 'horizontal':
        e.hFlip = !0;
        break;
      case 'vertical':
        e.vFlip = !0;
        break;
    }
  });
}
function M0(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, '');
  function r(s) {
    for (; s < 0; ) s += 4;
    return s % 4;
  }
  if (n === '') {
    const s = parseInt(e);
    return isNaN(s) ? 0 : r(s);
  } else if (n !== e) {
    let s = 0;
    switch (n) {
      case '%':
        s = 25;
        break;
      case 'deg':
        s = 90;
    }
    if (s) {
      let o = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(o) ? 0 : ((o = o / s), o % 1 === 0 ? r(o) : 0);
    }
  }
  return t;
}
function L0(e, t) {
  let n =
    e.indexOf('xlink:') === -1
      ? ''
      : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t) n += ' ' + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + '>' + e + '</svg>';
}
function N0(e) {
  return e
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ');
}
function j0(e) {
  return 'data:image/svg+xml,' + N0(e);
}
function H0(e) {
  return 'url("' + j0(e) + '")';
}
const Oc = { ...Yd, inline: !1 },
  F0 = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'aria-hidden': !0,
    role: 'img'
  },
  D0 = { display: 'inline-block' },
  Qi = { backgroundColor: 'currentColor' },
  sp = { backgroundColor: 'transparent' },
  Ic = { Image: 'var(--svg)', Repeat: 'no-repeat', Size: '100% 100%' },
  $c = { webkitMask: Qi, mask: Qi, background: sp };
for (const e in $c) {
  const t = $c[e];
  for (const n in Ic) t[e + n] = Ic[n];
}
const Ls = {};
['horizontal', 'vertical'].forEach((e) => {
  const t = e.slice(0, 1) + 'Flip';
  (Ls[e + '-flip'] = t),
    (Ls[e.slice(0, 1) + '-flip'] = t),
    (Ls[e + 'Flip'] = t);
});
function Mc(e) {
  return e + (e.match(/^[-0-9.]+$/) ? 'px' : '');
}
const Lc = (e, t) => {
  const n = O0(Oc, t),
    r = { ...F0 },
    s = t.mode || 'svg',
    o = {},
    i = t.style,
    a = typeof i == 'object' && !(i instanceof Array) ? i : {};
  for (let y in t) {
    const b = t[y];
    if (b !== void 0)
      switch (y) {
        case 'icon':
        case 'style':
        case 'onLoad':
        case 'mode':
        case 'ssr':
          break;
        case 'inline':
        case 'hFlip':
        case 'vFlip':
          n[y] = b === !0 || b === 'true' || b === 1;
          break;
        case 'flip':
          typeof b == 'string' && $0(n, b);
          break;
        case 'color':
          o.color = b;
          break;
        case 'rotate':
          typeof b == 'string'
            ? (n[y] = M0(b))
            : typeof b == 'number' && (n[y] = b);
          break;
        case 'ariaHidden':
        case 'aria-hidden':
          b !== !0 && b !== 'true' && delete r['aria-hidden'];
          break;
        default: {
          const _ = Ls[y];
          _
            ? (b === !0 || b === 'true' || b === 1) && (n[_] = !0)
            : Oc[y] === void 0 && (r[y] = b);
        }
      }
  }
  const l = r0(e, n),
    u = l.attributes;
  if ((n.inline && (o.verticalAlign = '-0.125em'), s === 'svg')) {
    (r.style = { ...o, ...a }), Object.assign(r, u);
    let y = 0,
      b = t.id;
    return (
      typeof b == 'string' && (b = b.replace(/-/g, '_')),
      (r.innerHTML = a0(l.body, b ? () => b + 'ID' + y++ : 'iconifyVue')),
      Ce('svg', r)
    );
  }
  const { body: c, width: f, height: d } = e,
    p = s === 'mask' || (s === 'bg' ? !1 : c.indexOf('currentColor') !== -1),
    g = L0(c, { ...u, width: f + '', height: d + '' });
  return (
    (r.style = {
      ...o,
      '--svg': H0(g),
      width: Mc(u.width),
      height: Mc(u.height),
      ...D0,
      ...(p ? Qi : sp),
      ...a
    }),
    Ce('span', r)
  );
};
Jd(!0);
Xd('', y0);
if (typeof document < 'u' && typeof window < 'u') {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload,
      n = 'Invalid IconifyPreload syntax.';
    typeof t == 'object' &&
      t !== null &&
      (t instanceof Array ? t : [t]).forEach((r) => {
        try {
          typeof r != 'object' ||
            r === null ||
            r instanceof Array ||
            typeof r.icons != 'object' ||
            typeof r.prefix != 'string' ||
            Q_(r);
        } catch {}
      });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == 'object' && t !== null)
      for (let n in t) {
        const r = 'IconifyProviders[' + n + '] is invalid.';
        try {
          const s = t[n];
          if (typeof s != 'object' || !s || s.resources === void 0) continue;
          Zd(n, s);
        } catch {}
      }
  }
}
const B0 = { ...mr, body: '' },
  U0 = re({
    inheritAttrs: !1,
    data() {
      return { _name: '', _loadingIcon: null, iconMounted: !1, counter: 0 };
    },
    mounted() {
      this.iconMounted = !0;
    },
    unmounted() {
      this.abortLoading();
    },
    methods: {
      abortLoading() {
        this._loadingIcon &&
          (this._loadingIcon.abort(), (this._loadingIcon = null));
      },
      getIcon(e, t, n) {
        if (typeof e == 'object' && e !== null && typeof e.body == 'string')
          return (this._name = ''), this.abortLoading(), { data: e };
        let r;
        if (typeof e != 'string' || (r = fs(e, !1, !0)) === null)
          return this.abortLoading(), null;
        let s = Va(r);
        if (!s)
          return (
            (!this._loadingIcon || this._loadingIcon.name !== e) &&
              (this.abortLoading(),
              (this._name = ''),
              s !== null &&
                (this._loadingIcon = {
                  name: e,
                  abort: rp([r], () => {
                    this.counter++;
                  })
                })),
            null
          );
        if (
          (this.abortLoading(),
          this._name !== e && ((this._name = e), t && t(e)),
          n)
        ) {
          s = Object.assign({}, s);
          const i = n(s.body, r.name, r.prefix, r.provider);
          typeof i == 'string' && (s.body = i);
        }
        const o = ['iconify'];
        return (
          r.prefix !== '' && o.push('iconify--' + r.prefix),
          r.provider !== '' && o.push('iconify--' + r.provider),
          { data: s, classes: o }
        );
      }
    },
    render() {
      this.counter;
      const e = this.$attrs,
        t =
          this.iconMounted || e.ssr
            ? this.getIcon(e.icon, e.onLoad, e.customise)
            : null;
      if (!t) return Lc(B0, e);
      let n = e;
      return (
        t.classes &&
          (n = {
            ...e,
            class:
              (typeof e.class == 'string' ? e.class + ' ' : '') +
              t.classes.join(' ')
          }),
        Lc({ ...mr, ...t.data }, n)
      );
    }
  }),
  z0 = {
    getAPIConfig: ko,
    setAPIModule: Xd,
    sendAPIQuery: np,
    setFetch: u0,
    getFetch: f0,
    listAPIProviders: l0
  },
  V0 = je({
    name: '@nuxt/icon',
    setup() {
      var s, o;
      const e = bt(),
        t = Sn().icon;
      z0.setFetch($fetch.native);
      const n = [];
      if (t.provider === 'server') {
        const i =
          ((o = (s = e.app) == null ? void 0 : s.baseURL) == null
            ? void 0
            : o.replace(/\/$/, '')) ?? '';
        n.push(i + (t.localApiEndpoint || '/api/_nuxt_icon')),
          (t.fallbackToApi === !0 || t.fallbackToApi === 'client-only') &&
            n.push(t.iconifyApiEndpoint);
      } else n.push(t.iconifyApiEndpoint);
      async function r(i, a) {
        try {
          const l = await $fetch(n[0] + '/' + a + '.json', {
            query: { icons: i.join(',') }
          });
          if (!l || l.prefix !== a || !l.icons)
            throw new Error('Invalid data' + JSON.stringify(l));
          return l;
        } catch {
          return null;
        }
      }
      Zd('', { resources: n });
      for (const i of t.customCollections || []) i && R0(r, i);
    }
  });
function W0(e, t) {
  let n = e;
  ft(e, { strict: !1, acceptRelative: !0 }) && (n = os(e).pathname);
  const r = Zs(t.base || '/');
  r !== '/' && n.startsWith(r) && (n = n.slice(r.length));
  let s = Fn(t.absolute ? t.siteUrl : '');
  r !== '/' && s.endsWith(r) && (s = s.slice(0, s.indexOf(r)));
  const o = t.withBase ? xi(r, s || '/') : s,
    i = xi(n, o);
  return n === '/' && !t.withBase ? or(i) : q0(t.trailingSlash, i);
}
function K0(e) {
  var n;
  return !!(
    (n = (e.split('/').pop() || e).match(/\.[0-9a-z]+$/i)) != null && n[0]
  );
}
function q0(e, t) {
  const n = os(t);
  if (K0(n.pathname)) return t;
  const r = e ? or(n.pathname) : Fn(n.pathname);
  return `${n.protocol ? `${n.protocol}//` : ''}${n.host || ''}${r}${n.search || ''}${n.hash || ''}`;
}
function G0(e) {
  return window.location.origin;
}
function J0(e = {}) {
  const t = So(),
    n = G0(),
    r = bt().app.baseURL || '/';
  return (s) =>
    F(() =>
      W0(E(s), {
        absolute: E(e.absolute),
        withBase: E(e.withBase),
        siteUrl: E(e.canonical) !== !1 ? t.url : n,
        trailingSlash: t.trailingSlash,
        base: r
      })
    );
}
function Q0(e) {
  const { canonicalQueryWhitelist: t } = bt().public['seo-utils'],
    n = So(),
    r = fr(),
    s = J0({ withBase: !0, absolute: !0 }),
    o = Dn(),
    i = F(() => {
      if (o.value) return null;
      const { query: c } = r,
        f = s(r.path || '/').value || r.path,
        d = Object.fromEntries(
          Object.entries(c).filter(([p]) => t.includes(p))
        );
      return Object.keys(d).length ? `${f}?${Hf(d)}` : f;
    }),
    a = X({ site: n, siteName: n.name });
  Pe(
    n,
    (c) => {
      a.value = { site: c, siteName: c.name || '' };
    },
    { deep: !0 }
  );
  const l = { tagPriority: 101 };
  ls(
    {
      htmlAttrs: { lang: e.locale },
      templateParams: a,
      titleTemplate: '%s %separator %siteName',
      link: [{ rel: 'canonical', href: () => i.value }]
    },
    l
  );
  const u = {
    ogType: 'website',
    ogUrl: () => i.value,
    ogLocale: () => e.locale.value,
    ogSiteName: n.name
  };
  if ((n.description && (u.description = n.description), n.twitter)) {
    const c = n.twitter.startsWith('@') ? n.twitter : `@${n.twitter}`;
    (u.twitterCreator = c), (u.twitterSite = c);
  }
  Wv(u, l);
}
const Y0 = je({
    name: 'nuxt-seo:defaults',
    order: 999,
    env: { islands: !1 },
    setup() {
      const e = So(),
        t = X(e.currentLocale || e.defaultLocale);
      Q0({ locale: t });
    }
  }),
  X0 = [
    Iv,
    qv,
    gw,
    Lw,
    Nw,
    jw,
    Hw,
    Fw,
    Xw,
    t_,
    n_,
    r_,
    o_,
    p_,
    N_,
    F_,
    D_,
    z_,
    V0,
    Y0
  ],
  Z0 = re({
    props: {
      vnode: { type: Object, required: !0 },
      route: { type: Object, required: !0 },
      vnodeRef: Object,
      renderKey: String,
      trackRootNodes: Boolean
    },
    setup(e) {
      const t = e.renderKey,
        n = e.route,
        r = {};
      for (const s in e.route)
        Object.defineProperty(r, s, {
          get: () => (t === e.renderKey ? e.route[s] : n[s]),
          enumerable: !0
        });
      return Tt(is, Jt(r)), () => Ce(e.vnode, { ref: e.vnodeRef });
    }
  }),
  ex = re({
    name: 'NuxtPage',
    inheritAttrs: !1,
    props: {
      name: { type: String },
      transition: { type: [Boolean, Object], default: void 0 },
      keepalive: { type: [Boolean, Object], default: void 0 },
      route: { type: Object },
      pageKey: { type: [Function, String], default: null }
    },
    setup(e, { attrs: t, slots: n, expose: r }) {
      const s = de(),
        o = X(),
        i = Ae(is, null);
      let a;
      r({ pageRef: o });
      const l = Ae(Zf, null);
      let u;
      const c = s.deferHydration();
      if (s.isHydrating) {
        const d = s.hooks.hookOnce('app:error', c);
        Ge().beforeEach(d);
      }
      e.pageKey &&
        Pe(
          () => e.pageKey,
          (d, p) => {
            d !== p && s.callHook('page:loading:start');
          }
        );
      let f = !1;
      return () =>
        Ce(
          Md,
          { name: e.name, route: e.route, ...t },
          {
            default: (d) => {
              const p = nx(i, d.route, d.Component),
                g = i && i.matched.length === d.route.matched.length;
              if (!d.Component) {
                if (u && !g) return u;
                c();
                return;
              }
              if (u && l && !l.isCurrent(d.route)) return u;
              if (p && i && (!l || (l != null && l.isCurrent(i))))
                return g ? u : null;
              const y = Ui(d, e.pageKey);
              !s.isHydrating &&
                !rx(i, d.route, d.Component) &&
                a === y &&
                (s.callHook('page:loading:end'), (f = !0)),
                (a = y);
              const b = !!(e.transition ?? d.route.meta.pageTransition ?? ki),
                _ =
                  b &&
                  tx(
                    [
                      e.transition,
                      d.route.meta.pageTransition,
                      ki,
                      {
                        onAfterLeave: () => {
                          s.callHook('page:transition:finish', d.Component);
                        }
                      }
                    ].filter(Boolean)
                  ),
                v = e.keepalive ?? d.route.meta.keepalive ?? cy;
              return (
                (u = Ld(
                  b && _,
                  tw(
                    v,
                    Ce(
                      ka,
                      {
                        suspensible: !0,
                        onPending: () => s.callHook('page:start', d.Component),
                        onResolve: () => {
                          Ft(() =>
                            s
                              .callHook('page:finish', d.Component)
                              .then(() => {
                                if (!f) return s.callHook('page:loading:end');
                                f = !1;
                              })
                              .finally(c)
                          );
                        }
                      },
                      {
                        default: () => {
                          const h = Ce(Z0, {
                            key: y || void 0,
                            vnode: n.default
                              ? Ce(Me, void 0, n.default(d))
                              : d.Component,
                            route: d.route,
                            renderKey: y || void 0,
                            trackRootNodes: b,
                            vnodeRef: o
                          });
                          return (
                            v &&
                              (h.type.name =
                                d.Component.type.name ||
                                d.Component.type.__name ||
                                'RouteProvider'),
                            h
                          );
                        }
                      }
                    )
                  )
                ).default()),
                u
              );
            }
          }
        );
    }
  });
function tx(e) {
  const t = e.map((n) => ({
    ...n,
    onAfterLeave: n.onAfterLeave ? ja(n.onAfterLeave) : void 0
  }));
  return nn(...t);
}
function nx(e, t, n) {
  if (!e) return !1;
  const r = t.matched.findIndex((s) => {
    var o;
    return (
      ((o = s.components) == null ? void 0 : o.default) ===
      (n == null ? void 0 : n.type)
    );
  });
  return !r || r === -1
    ? !1
    : t.matched.slice(0, r).some((s, o) => {
        var i, a, l;
        return (
          ((i = s.components) == null ? void 0 : i.default) !==
          ((l = (a = e.matched[o]) == null ? void 0 : a.components) == null
            ? void 0
            : l.default)
        );
      }) ||
        (n &&
          Ui({ route: t, Component: n }) !== Ui({ route: e, Component: n }));
}
function rx(e, t, n) {
  return e
    ? t.matched.findIndex((s) => {
        var o;
        return (
          ((o = s.components) == null ? void 0 : o.default) ===
          (n == null ? void 0 : n.type)
        );
      }) <
        t.matched.length - 1
    : !1;
}
const sx = re({
    name: 'LayoutLoader',
    inheritAttrs: !1,
    props: { name: String, layoutProps: Object },
    setup(e, t) {
      return () => Ce(gn[e.name], e.layoutProps, t.slots);
    }
  }),
  op = re({
    name: 'NuxtLayout',
    inheritAttrs: !1,
    props: {
      name: { type: [String, Boolean, Object], default: null },
      fallback: { type: [String, Object], default: null }
    },
    setup(e, t) {
      const n = de(),
        r = Ae(is),
        s = r === fr() ? Qb() : r,
        o = F(() => {
          let l = E(e.name) ?? s.meta.layout ?? 'default';
          return l && !(l in gn) && e.fallback && (l = E(e.fallback)), l;
        }),
        i = X();
      t.expose({ layoutRef: i });
      const a = n.deferHydration();
      if (n.isHydrating) {
        const l = n.hooks.hookOnce('app:error', a);
        Ge().beforeEach(l);
      }
      return () => {
        const l = o.value && o.value in gn,
          u = s.meta.layoutTransition ?? ly;
        return Ld(l && u, {
          default: () =>
            Ce(
              ka,
              {
                suspensible: !0,
                onResolve: () => {
                  Ft(a);
                }
              },
              {
                default: () =>
                  Ce(
                    ox,
                    {
                      layoutProps: we(t.attrs, { ref: i }),
                      key: o.value || void 0,
                      name: o.value,
                      shouldProvide: !e.name,
                      hasTransition: !!u
                    },
                    t.slots
                  )
              }
            )
        }).default();
      };
    }
  }),
  ox = re({
    name: 'NuxtLayoutProvider',
    inheritAttrs: !1,
    props: {
      name: { type: [String, Boolean] },
      layoutProps: { type: Object },
      hasTransition: { type: Boolean },
      shouldProvide: { type: Boolean }
    },
    setup(e, t) {
      const n = e.name;
      return (
        e.shouldProvide &&
          Tt(Zf, { isCurrent: (r) => n === (r.meta.layout ?? 'default') }),
        () => {
          var r, s;
          return !n || (typeof n == 'string' && !(n in gn))
            ? (s = (r = t.slots).default) == null
              ? void 0
              : s.call(r)
            : Ce(sx, { key: n, layoutProps: e.layoutProps, name: n }, t.slots);
        }
      );
    }
  });
function qa(e) {
  return e ? e.flatMap((t) => (t.type === Me ? qa(t.children) : [t])) : [];
}
const Yi = re({
    name: 'PrimitiveSlot',
    inheritAttrs: !1,
    setup(e, { attrs: t, slots: n }) {
      return () => {
        var l, u;
        if (!n.default) return null;
        const r = qa(n.default()),
          s = r.findIndex((c) => c.type !== Ne);
        if (s === -1) return r;
        const o = r[s];
        (l = o.props) == null || delete l.ref;
        const i = o.props ? we(t, o.props) : t;
        t.class && (u = o.props) != null && u.class && delete o.props.class;
        const a = Ht(o, i);
        for (const c in i)
          c.startsWith('on') &&
            (a.props || (a.props = {}), (a.props[c] = i[c]));
        return r.length === 1 ? a : ((r[s] = a), r);
      };
    }
  }),
  pt = re({
    name: 'Primitive',
    inheritAttrs: !1,
    props: {
      asChild: { type: Boolean, default: !1 },
      as: { type: [String, Object], default: 'div' }
    },
    setup(e, { attrs: t, slots: n }) {
      const r = e.asChild ? 'template' : e.as;
      return typeof r == 'string' && ['area', 'img', 'input'].includes(r)
        ? () => Ce(r, t)
        : r !== 'template'
          ? () => Ce(e.as, t, { default: n.default })
          : () => Ce(Yi, t, { default: n.default });
    }
  }),
  ip = re({
    __name: 'VisuallyHidden',
    props: {
      feature: { default: 'focusable' },
      asChild: { type: Boolean },
      as: { default: 'span' }
    },
    setup(e) {
      return (t, n) => (
        G(),
        ee(
          E(pt),
          {
            as: t.as,
            'as-child': t.asChild,
            'aria-hidden': t.feature === 'focusable' ? 'true' : void 0,
            'data-hidden': t.feature === 'fully-hidden' ? '' : void 0,
            tabindex: t.feature === 'fully-hidden' ? '-1' : void 0,
            style: {
              position: 'absolute',
              border: 0,
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              clipPath: 'inset(50%)',
              whiteSpace: 'nowrap',
              wordWrap: 'normal'
            }
          },
          { default: ie(() => [fe(t.$slots, 'default')]), _: 3 },
          8,
          ['as', 'as-child', 'aria-hidden', 'data-hidden', 'tabindex']
        )
      );
    }
  });
function ds(e, t) {
  const n = typeof e == 'string' && !t ? `${e}Context` : t,
    r = Symbol(n);
  return [
    (i) => {
      const a = Ae(r, i);
      if (a || a === null) return a;
      throw new Error(
        `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(', ')}` : `\`${e}\``}`
      );
    },
    (i) => (Tt(r, i), i)
  ];
}
const [_k, ix] = ds('ConfigProvider'),
  ax = re({
    inheritAttrs: !1,
    __name: 'ConfigProvider',
    props: {
      dir: { default: 'ltr' },
      locale: { default: 'en' },
      scrollBody: { type: [Boolean, Object], default: !0 },
      nonce: { default: void 0 },
      useId: { type: Function, default: void 0 }
    },
    setup(e) {
      const t = e,
        { dir: n, locale: r, scrollBody: s, nonce: o } = Xt(t);
      return (
        ix({ dir: n, locale: r, scrollBody: s, nonce: o, useId: t.useId }),
        (i, a) => fe(i.$slots, 'default')
      );
    }
  });
function ht() {
  const e = Ve(),
    t = X(),
    n = F(() => {
      var i, a;
      return ['#text', '#comment'].includes(
        (i = t.value) == null ? void 0 : i.$el.nodeName
      )
        ? (a = t.value) == null
          ? void 0
          : a.$el.nextElementSibling
        : bn(t);
    }),
    r = Object.assign({}, e.exposed),
    s = {};
  for (const i in e.props)
    Object.defineProperty(s, i, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[i]
    });
  if (Object.keys(r).length > 0)
    for (const i in r)
      Object.defineProperty(s, i, {
        enumerable: !0,
        configurable: !0,
        get: () => r[i]
      });
  Object.defineProperty(s, '$el', {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }),
    (e.exposed = s);
  function o(i) {
    (t.value = i),
      !(i instanceof Element || !i) &&
        (Object.defineProperty(s, '$el', {
          enumerable: !0,
          configurable: !0,
          get: () => i.$el
        }),
        (e.exposed = s));
  }
  return { forwardRef: o, currentRef: t, currentElement: n };
}
function lx(e, t) {
  const n = X(e);
  function r(o) {
    return t[n.value][o] ?? n.value;
  }
  return {
    state: n,
    dispatch: (o) => {
      n.value = r(o);
    }
  };
}
function cx(e, t) {
  var b;
  const n = X({}),
    r = X('none'),
    s = X(e),
    o = e.value ? 'mounted' : 'unmounted';
  let i;
  const a =
      ((b = t.value) == null ? void 0 : b.ownerDocument.defaultView) ?? us,
    { state: l, dispatch: u } = lx(o, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' }
    }),
    c = (_) => {
      var v;
      if (hr) {
        const h = new CustomEvent(_, { bubbles: !1, cancelable: !1 });
        (v = t.value) == null || v.dispatchEvent(h);
      }
    };
  Pe(
    e,
    async (_, v) => {
      var m;
      const h = v !== _;
      if ((await Ft(), h)) {
        const x = r.value,
          C = Cs(t.value);
        _
          ? (u('MOUNT'), c('enter'), C === 'none' && c('after-enter'))
          : C === 'none' ||
              ((m = n.value) == null ? void 0 : m.display) === 'none'
            ? (u('UNMOUNT'), c('leave'), c('after-leave'))
            : v && x !== C
              ? (u('ANIMATION_OUT'), c('leave'))
              : (u('UNMOUNT'), c('after-leave'));
      }
    },
    { immediate: !0 }
  );
  const f = (_) => {
      const v = Cs(t.value),
        h = v.includes(_.animationName),
        m = l.value === 'mounted' ? 'enter' : 'leave';
      if (
        _.target === t.value &&
        h &&
        (c(`after-${m}`), u('ANIMATION_END'), !s.value)
      ) {
        const x = t.value.style.animationFillMode;
        (t.value.style.animationFillMode = 'forwards'),
          (i =
            a == null
              ? void 0
              : a.setTimeout(() => {
                  var C;
                  ((C = t.value) == null
                    ? void 0
                    : C.style.animationFillMode) === 'forwards' &&
                    (t.value.style.animationFillMode = x);
                }));
      }
      _.target === t.value && v === 'none' && u('ANIMATION_END');
    },
    d = (_) => {
      _.target === t.value && (r.value = Cs(t.value));
    },
    p = Pe(
      t,
      (_, v) => {
        _
          ? ((n.value = getComputedStyle(_)),
            _.addEventListener('animationstart', d),
            _.addEventListener('animationcancel', f),
            _.addEventListener('animationend', f))
          : (u('ANIMATION_END'),
            a == null || a.clearTimeout(i),
            v == null || v.removeEventListener('animationstart', d),
            v == null || v.removeEventListener('animationcancel', f),
            v == null || v.removeEventListener('animationend', f));
      },
      { immediate: !0 }
    ),
    g = Pe(l, () => {
      const _ = Cs(t.value);
      r.value = l.value === 'mounted' ? _ : 'none';
    });
  return (
    Hn(() => {
      p(), g();
    }),
    { isPresent: F(() => ['mounted', 'unmountSuspended'].includes(l.value)) }
  );
}
function Cs(e) {
  return (e && getComputedStyle(e).animationName) || 'none';
}
const ux = re({
  name: 'Presence',
  props: {
    present: { type: Boolean, required: !0 },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var u;
    const { present: r, forceMount: s } = Xt(e),
      o = X(),
      { isPresent: i } = cx(r, o);
    n({ present: i });
    let a = t.default({ present: i.value });
    a = qa(a || []);
    const l = Ve();
    if (a && (a == null ? void 0 : a.length) > 1) {
      const c =
        (u = l == null ? void 0 : l.parent) != null && u.type.name
          ? `<${l.parent.type.name} />`
          : 'component';
      throw new Error(
        [
          `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
          '',
          'Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
          'You can apply a few solutions:',
          [
            'Provide a single child element so that `presence` directive attach correctly.',
            'Ensure the first child is an actual element instead of a raw text node or comment node.'
          ].map((f) => `  - ${f}`).join(`
`)
        ].join(`
`)
      );
    }
    return () =>
      s.value || r.value || i.value
        ? Ce(t.default({ present: i.value })[0], {
            ref: (c) => {
              const f = bn(c);
              return (
                typeof (f == null ? void 0 : f.hasAttribute) > 'u' ||
                  (f != null &&
                  f.hasAttribute('data-reka-popper-content-wrapper')
                    ? (o.value = f.firstElementChild)
                    : (o.value = f)),
                f
              );
            }
          })
        : null;
  }
});
function fx(e) {
  const t = Ve(),
    n = t == null ? void 0 : t.type.emits,
    r = {};
  return (
    n != null && n.length,
    n == null ||
      n.forEach((s) => {
        r[Es(et(s))] = (...o) => e(s, ...o);
      }),
    r
  );
}
function Bn(e) {
  const t = Ve(),
    n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce(
      (s, o) => {
        const i = (t == null ? void 0 : t.type.props[o]).default;
        return i !== void 0 && (s[o] = i), s;
      },
      {}
    ),
    r = On(e);
  return F(() => {
    const s = {},
      o = (t == null ? void 0 : t.vnode.props) ?? {};
    return (
      Object.keys(o).forEach((i) => {
        s[et(i)] = o[i];
      }),
      Object.keys({ ...n, ...s }).reduce(
        (i, a) => (r.value[a] !== void 0 && (i[a] = r.value[a]), i),
        {}
      )
    );
  });
}
function dx(e, t) {
  const n = Bn(e),
    r = t ? fx(t) : {};
  return F(() => ({ ...n.value, ...r }));
}
const px = re({
  __name: 'Teleport',
  props: {
    to: { default: 'body' },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ud();
    return (n, r) =>
      E(t) || n.forceMount
        ? (G(),
          ee(
            ju,
            { key: 0, to: n.to, disabled: n.disabled },
            [fe(n.$slots, 'default')],
            8,
            ['to', 'disabled']
          ))
        : Le('', !0);
  }
});
function ap(e, t, n) {
  const r = n.originalEvent.target,
    s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(s);
}
const hx = 'dismissableLayer.pointerDownOutside',
  gx = 'dismissableLayer.focusOutside';
function lp(e, t) {
  const n = t.closest('[data-dismissable-layer]'),
    r =
      e.dataset.dismissableLayer === ''
        ? e
        : e.querySelector('[data-dismissable-layer]'),
    s = Array.from(
      e.ownerDocument.querySelectorAll('[data-dismissable-layer]')
    );
  return !!((n && r === n) || s.indexOf(r) < s.indexOf(n));
}
function mx(e, t) {
  var o;
  const n =
      ((o = t == null ? void 0 : t.value) == null ? void 0 : o.ownerDocument) ??
      (globalThis == null ? void 0 : globalThis.document),
    r = X(!1),
    s = X(() => {});
  return (
    jt((i) => {
      if (!hr) return;
      const a = async (u) => {
          const c = u.target;
          if (t != null && t.value) {
            if (lp(t.value, c)) {
              r.value = !1;
              return;
            }
            if (u.target && !r.value) {
              let f = function () {
                ap(hx, e, d);
              };
              const d = { originalEvent: u };
              u.pointerType === 'touch'
                ? (n.removeEventListener('click', s.value),
                  (s.value = f),
                  n.addEventListener('click', s.value, { once: !0 }))
                : f();
            } else n.removeEventListener('click', s.value);
            r.value = !1;
          }
        },
        l = window.setTimeout(() => {
          n.addEventListener('pointerdown', a);
        }, 0);
      i(() => {
        window.clearTimeout(l),
          n.removeEventListener('pointerdown', a),
          n.removeEventListener('click', s.value);
      });
    }),
    { onPointerDownCapture: () => (r.value = !0) }
  );
}
function yx(e, t) {
  var s;
  const n =
      ((s = t == null ? void 0 : t.value) == null ? void 0 : s.ownerDocument) ??
      (globalThis == null ? void 0 : globalThis.document),
    r = X(!1);
  return (
    jt((o) => {
      if (!hr) return;
      const i = async (a) => {
        t != null &&
          t.value &&
          (await Ft(),
          !(!t.value || lp(t.value, a.target)) &&
            a.target &&
            !r.value &&
            ap(gx, e, { originalEvent: a }));
      };
      n.addEventListener('focusin', i),
        o(() => n.removeEventListener('focusin', i));
    }),
    {
      onFocusCapture: () => (r.value = !0),
      onBlurCapture: () => (r.value = !1)
    }
  );
}
const xt = tt({
    layersRoot: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set()
  }),
  xk = re({
    __name: 'DismissableLayer',
    props: {
      disableOutsidePointerEvents: { type: Boolean, default: !1 },
      asChild: { type: Boolean },
      as: {}
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'dismiss'
    ],
    setup(e, { emit: t }) {
      const n = e,
        r = t,
        { forwardRef: s, currentElement: o } = ht(),
        i = F(() => {
          var g;
          return (
            ((g = o.value) == null ? void 0 : g.ownerDocument) ??
            globalThis.document
          );
        }),
        a = F(() => xt.layersRoot),
        l = F(() => (o.value ? Array.from(a.value).indexOf(o.value) : -1)),
        u = F(() => xt.layersWithOutsidePointerEventsDisabled.size > 0),
        c = F(() => {
          const g = Array.from(a.value),
            [y] = [...xt.layersWithOutsidePointerEventsDisabled].slice(-1),
            b = g.indexOf(y);
          return l.value >= b;
        }),
        f = mx(async (g) => {
          const y = [...xt.branches].some((b) =>
            b == null ? void 0 : b.contains(g.target)
          );
          !c.value ||
            y ||
            (r('pointerDownOutside', g),
            r('interactOutside', g),
            await Ft(),
            g.defaultPrevented || r('dismiss'));
        }, o),
        d = yx((g) => {
          [...xt.branches].some((b) =>
            b == null ? void 0 : b.contains(g.target)
          ) ||
            (r('focusOutside', g),
            r('interactOutside', g),
            g.defaultPrevented || r('dismiss'));
        }, o);
      Ba('Escape', (g) => {
        l.value === a.value.size - 1 &&
          (r('escapeKeyDown', g), g.defaultPrevented || r('dismiss'));
      });
      let p;
      return (
        jt((g) => {
          o.value &&
            (n.disableOutsidePointerEvents &&
              (xt.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((p = i.value.body.style.pointerEvents),
                (i.value.body.style.pointerEvents = 'none')),
              xt.layersWithOutsidePointerEventsDisabled.add(o.value)),
            a.value.add(o.value),
            g(() => {
              n.disableOutsidePointerEvents &&
                xt.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (i.value.body.style.pointerEvents = p);
            }));
        }),
        jt((g) => {
          g(() => {
            o.value &&
              (a.value.delete(o.value),
              xt.layersWithOutsidePointerEventsDisabled.delete(o.value));
          });
        }),
        (g, y) => (
          G(),
          ee(
            E(pt),
            {
              ref: E(s),
              'as-child': g.asChild,
              as: g.as,
              'data-dismissable-layer': '',
              style: wn({
                pointerEvents: u.value ? (c.value ? 'auto' : 'none') : void 0
              }),
              onFocusCapture: E(d).onFocusCapture,
              onBlurCapture: E(d).onBlurCapture,
              onPointerdownCapture: E(f).onPointerDownCapture
            },
            { default: ie(() => [fe(g.$slots, 'default')]), _: 3 },
            8,
            [
              'as-child',
              'as',
              'style',
              'onFocusCapture',
              'onBlurCapture',
              'onPointerdownCapture'
            ]
          )
        )
      );
    }
  });
function Xo(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((wx(r, { select: t }), document.activeElement !== n)) return !0;
}
function vx(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const s = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || s
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      }
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function bx(e) {
  return e instanceof HTMLInputElement && 'select' in e;
}
function wx(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && bx(e) && t && e.select();
  }
}
const [cp, _x] = ds('AvatarRoot'),
  xx = re({
    __name: 'AvatarRoot',
    props: { asChild: { type: Boolean }, as: { default: 'span' } },
    setup(e) {
      return (
        ht(),
        _x({ imageLoadingStatus: X('loading') }),
        (t, n) => (
          G(),
          ee(
            E(pt),
            { 'as-child': t.asChild, as: t.as },
            { default: ie(() => [fe(t.$slots, 'default')]), _: 3 },
            8,
            ['as-child', 'as']
          )
        )
      );
    }
  }),
  Sx = re({
    __name: 'AvatarFallback',
    props: {
      delayMs: { default: 0 },
      asChild: { type: Boolean },
      as: { default: 'span' }
    },
    setup(e) {
      const t = e,
        n = cp();
      ht();
      const r = X(!1);
      let s;
      return (
        Pe(
          n.imageLoadingStatus,
          (o) => {
            o === 'loading' &&
              ((r.value = !1),
              t.delayMs
                ? (s = setTimeout(() => {
                    (r.value = !0), clearTimeout(s);
                  }, t.delayMs))
                : (r.value = !0));
          },
          { immediate: !0 }
        ),
        (o, i) =>
          r.value && E(n).imageLoadingStatus.value !== 'loaded'
            ? (G(),
              ee(
                E(pt),
                { key: 0, 'as-child': o.asChild, as: o.as },
                { default: ie(() => [fe(o.$slots, 'default')]), _: 3 },
                8,
                ['as-child', 'as']
              ))
            : Le('', !0)
      );
    }
  });
function Cx(e, t) {
  const n = X('idle'),
    r = X(!1),
    s = (o) => () => {
      r.value && (n.value = o);
    };
  return (
    dt(() => {
      (r.value = !0),
        Pe(
          [() => e.value, () => (t == null ? void 0 : t.value)],
          ([o, i]) => {
            if (!o) n.value = 'error';
            else {
              const a = new window.Image();
              (n.value = 'loading'),
                (a.onload = s('loaded')),
                (a.onerror = s('error')),
                (a.src = o),
                i && (a.referrerPolicy = i);
            }
          },
          { immediate: !0 }
        );
    }),
    Hn(() => {
      r.value = !1;
    }),
    n
  );
}
const kx = re({
  __name: 'AvatarImage',
  props: {
    src: {},
    referrerPolicy: {},
    asChild: { type: Boolean },
    as: { default: 'img' }
  },
  emits: ['loadingStatusChange'],
  setup(e, { emit: t }) {
    const n = e,
      r = t,
      { src: s, referrerPolicy: o } = Xt(n);
    ht();
    const i = cp(),
      a = Cx(s, o);
    return (
      Pe(
        a,
        (l) => {
          r('loadingStatusChange', l),
            l !== 'idle' && (i.imageLoadingStatus.value = l);
        },
        { immediate: !0 }
      ),
      (l, u) =>
        Sh(
          (G(),
          ee(
            E(pt),
            {
              role: 'img',
              'as-child': l.asChild,
              as: l.as,
              src: E(s),
              'referrer-policy': E(o)
            },
            { default: ie(() => [fe(l.$slots, 'default')]), _: 3 },
            8,
            ['as-child', 'as', 'src', 'referrer-policy']
          )),
          [[Fg, E(a) === 'loaded']]
        )
    );
  }
});
function Nc() {
  const e = X(),
    t = F(() => {
      var n, r;
      return ['#text', '#comment'].includes(
        (n = e.value) == null ? void 0 : n.$el.nodeName
      )
        ? (r = e.value) == null
          ? void 0
          : r.$el.nextElementSibling
        : bn(e);
    });
  return { primitiveElement: e, currentElement: t };
}
const jc = 'data-reka-collection-item';
function Ga(e = {}) {
  const { key: t = '', isProvider: n = !1 } = e,
    r = `${t}CollectionProvider`;
  let s;
  if (n) {
    const c = X(new Map());
    (s = { collectionRef: X(), itemMap: c }), Tt(r, s);
  } else s = Ae(r);
  const o = (c = !1) => {
      const f = s.collectionRef.value;
      if (!f) return [];
      const d = Array.from(f.querySelectorAll(`[${jc}]`)),
        g = Array.from(s.itemMap.value.values()).sort(
          (y, b) => d.indexOf(y.ref) - d.indexOf(b.ref)
        );
      return c ? g : g.filter((y) => y.ref.dataset.disabled !== '');
    },
    i = re({
      name: 'CollectionSlot',
      setup(c, { slots: f }) {
        const { primitiveElement: d, currentElement: p } = Nc();
        return (
          Pe(p, () => {
            s.collectionRef.value = p.value;
          }),
          () => Ce(Yi, { ref: d }, f)
        );
      }
    }),
    a = re({
      name: 'CollectionItem',
      inheritAttrs: !1,
      props: { value: { validator: () => !0 } },
      setup(c, { slots: f, attrs: d }) {
        const { primitiveElement: p, currentElement: g } = Nc();
        return (
          jt((y) => {
            if (g.value) {
              const b = Eu(g.value);
              s.itemMap.value.set(b, { ref: g.value, value: c.value }),
                y(() => s.itemMap.value.delete(b));
            }
          }),
          () => Ce(Yi, { ...d, [jc]: '', ref: p }, f)
        );
      }
    }),
    l = F(() => Array.from(s.itemMap.value.values())),
    u = F(() => s.itemMap.value.size);
  return {
    getItems: o,
    reactiveItems: l,
    itemMapSize: u,
    CollectionSlot: i,
    CollectionItem: a
  };
}
const [Eo, Ex] = ds('ToastProvider'),
  Tx = re({
    inheritAttrs: !1,
    __name: 'ToastProvider',
    props: {
      label: { default: 'Notification' },
      duration: { default: 5e3 },
      swipeDirection: { default: 'right' },
      swipeThreshold: { default: 50 }
    },
    setup(e) {
      const t = e,
        { label: n, duration: r, swipeDirection: s, swipeThreshold: o } = Xt(t);
      Ga({ isProvider: !0 });
      const i = X(),
        a = X(0),
        l = X(!1),
        u = X(!1);
      if (t.label && typeof t.label == 'string' && !t.label.trim()) {
        const c =
          'Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.';
        throw new Error(c);
      }
      return (
        Ex({
          label: n,
          duration: r,
          swipeDirection: s,
          swipeThreshold: o,
          toastCount: a,
          viewport: i,
          onViewportChange(c) {
            i.value = c;
          },
          onToastAdd() {
            a.value++;
          },
          onToastRemove() {
            a.value--;
          },
          isFocusedToastEscapeKeyDownRef: l,
          isClosePausedRef: u
        }),
        (c, f) => fe(c.$slots, 'default')
      );
    }
  }),
  Ax = 'toast.swipeStart',
  Px = 'toast.swipeMove',
  Rx = 'toast.swipeCancel',
  Ox = 'toast.swipeEnd',
  Xi = 'toast.viewportPause',
  Zi = 'toast.viewportResume';
function ks(e, t, n) {
  const r = n.originalEvent.currentTarget,
    s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(s);
}
function Hc(e, t, n = 0) {
  const r = Math.abs(e.x),
    s = Math.abs(e.y),
    o = r > s;
  return t === 'left' || t === 'right' ? o && r > n : !o && s > n;
}
function Ix(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function up(e) {
  const t = [];
  return (
    Array.from(e.childNodes).forEach((r) => {
      if (
        (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent),
        Ix(r))
      ) {
        const s = r.ariaHidden || r.hidden || r.style.display === 'none',
          o = r.dataset.rekaToastAnnounceExclude === '';
        if (!s)
          if (o) {
            const i = r.dataset.rekaToastAnnounceAlt;
            i && t.push(i);
          } else t.push(...up(r));
      }
    }),
    t
  );
}
const $x = re({
    __name: 'ToastAnnounce',
    setup(e) {
      const t = Eo(),
        n = E_(1e3),
        r = X(!1);
      return (
        zd(() => {
          r.value = !0;
        }),
        (s, o) =>
          E(n) || r.value
            ? (G(),
              ee(
                E(ip),
                { key: 0 },
                {
                  default: ie(() => [
                    Ln(Yt(E(t).label.value) + ' ', 1),
                    fe(s.$slots, 'default')
                  ]),
                  _: 3
                }
              ))
            : Le('', !0)
      );
    }
  }),
  [Mx, Lx] = ds('ToastRoot'),
  Nx = re({
    inheritAttrs: !1,
    __name: 'ToastRootImpl',
    props: {
      type: {},
      open: { type: Boolean, default: !1 },
      duration: {},
      asChild: { type: Boolean },
      as: { default: 'li' }
    },
    emits: [
      'close',
      'escapeKeyDown',
      'pause',
      'resume',
      'swipeStart',
      'swipeMove',
      'swipeCancel',
      'swipeEnd'
    ],
    setup(e, { emit: t }) {
      const n = e,
        r = t,
        { forwardRef: s, currentElement: o } = ht(),
        { CollectionItem: i } = Ga(),
        a = Eo(),
        l = X(null),
        u = X(null),
        c = F(() =>
          typeof n.duration == 'number' ? n.duration : a.duration.value
        ),
        f = X(0),
        d = X(c.value),
        p = X(0),
        g = X(c.value),
        y = zd(
          () => {
            const h = new Date().getTime() - f.value;
            g.value = Math.max(d.value - h, 0);
          },
          { fpsLimit: 60 }
        );
      function b(h) {
        h <= 0 ||
          h === Number.POSITIVE_INFINITY ||
          (hr &&
            (window.clearTimeout(p.value),
            (f.value = new Date().getTime()),
            (p.value = window.setTimeout(_, h))));
      }
      function _() {
        var m, x;
        ((m = o.value) == null ? void 0 : m.contains(document.activeElement)) &&
          ((x = a.viewport.value) == null || x.focus()),
          (a.isClosePausedRef.value = !1),
          r('close');
      }
      const v = F(() => (o.value ? up(o.value) : null));
      if (n.type && !['foreground', 'background'].includes(n.type)) {
        const h =
          'Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.';
        throw new Error(h);
      }
      return (
        jt((h) => {
          const m = a.viewport.value;
          if (m) {
            const x = () => {
                b(d.value), y.resume(), r('resume');
              },
              C = () => {
                const P = new Date().getTime() - f.value;
                (d.value = d.value - P),
                  window.clearTimeout(p.value),
                  y.pause(),
                  r('pause');
              };
            return (
              m.addEventListener(Xi, C),
              m.addEventListener(Zi, x),
              () => {
                m.removeEventListener(Xi, C), m.removeEventListener(Zi, x);
              }
            );
          }
        }),
        Pe(
          () => [n.open, c.value],
          () => {
            (d.value = c.value),
              n.open && !a.isClosePausedRef.value && b(c.value);
          },
          { immediate: !0 }
        ),
        Ba('Escape', (h) => {
          r('escapeKeyDown', h),
            h.defaultPrevented ||
              ((a.isFocusedToastEscapeKeyDownRef.value = !0), _());
        }),
        dt(() => {
          a.onToastAdd();
        }),
        Hn(() => {
          a.onToastRemove();
        }),
        Lx({ onClose: _ }),
        (h, m) => (
          G(),
          ut(
            Me,
            null,
            [
              v.value
                ? (G(),
                  ee(
                    $x,
                    {
                      key: 0,
                      role: 'status',
                      'aria-live':
                        h.type === 'foreground' ? 'assertive' : 'polite',
                      'aria-atomic': ''
                    },
                    { default: ie(() => [Ln(Yt(v.value), 1)]), _: 1 },
                    8,
                    ['aria-live']
                  ))
                : Le('', !0),
              E(a).viewport.value
                ? (G(),
                  ee(
                    ju,
                    { key: 1, to: E(a).viewport.value },
                    [
                      ue(E(i), null, {
                        default: ie(() => [
                          ue(
                            E(pt),
                            we(
                              {
                                ref: E(s),
                                role: 'status',
                                'aria-live': 'off',
                                'aria-atomic': '',
                                tabindex: '0'
                              },
                              h.$attrs,
                              {
                                as: h.as,
                                'as-child': h.asChild,
                                'data-state': h.open ? 'open' : 'closed',
                                'data-swipe-direction':
                                  E(a).swipeDirection.value,
                                style: {
                                  userSelect: 'none',
                                  touchAction: 'none'
                                },
                                onPointerdown:
                                  m[0] ||
                                  (m[0] = Rs(
                                    (x) => {
                                      l.value = { x: x.clientX, y: x.clientY };
                                    },
                                    ['left']
                                  )),
                                onPointermove:
                                  m[1] ||
                                  (m[1] = (x) => {
                                    if (!l.value) return;
                                    const C = x.clientX - l.value.x,
                                      P = x.clientY - l.value.y,
                                      N = !!u.value,
                                      R = ['left', 'right'].includes(
                                        E(a).swipeDirection.value
                                      ),
                                      A = ['left', 'up'].includes(
                                        E(a).swipeDirection.value
                                      )
                                        ? Math.min
                                        : Math.max,
                                      D = R ? A(0, C) : 0,
                                      k = R ? 0 : A(0, P),
                                      M = x.pointerType === 'touch' ? 10 : 2,
                                      z = { x: D, y: k },
                                      Q = { originalEvent: x, delta: z };
                                    N
                                      ? ((u.value = z),
                                        E(ks)(
                                          E(Px),
                                          ($) => r('swipeMove', $),
                                          Q
                                        ))
                                      : E(Hc)(z, E(a).swipeDirection.value, M)
                                        ? ((u.value = z),
                                          E(ks)(
                                            E(Ax),
                                            ($) => r('swipeStart', $),
                                            Q
                                          ),
                                          x.target.setPointerCapture(
                                            x.pointerId
                                          ))
                                        : (Math.abs(C) > M ||
                                            Math.abs(P) > M) &&
                                          (l.value = null);
                                  }),
                                onPointerup:
                                  m[2] ||
                                  (m[2] = (x) => {
                                    const C = u.value,
                                      P = x.target;
                                    if (
                                      (P.hasPointerCapture(x.pointerId) &&
                                        P.releasePointerCapture(x.pointerId),
                                      (u.value = null),
                                      (l.value = null),
                                      C)
                                    ) {
                                      const N = x.currentTarget,
                                        R = { originalEvent: x, delta: C };
                                      E(Hc)(
                                        C,
                                        E(a).swipeDirection.value,
                                        E(a).swipeThreshold.value
                                      )
                                        ? E(ks)(
                                            E(Ox),
                                            (A) => r('swipeEnd', A),
                                            R
                                          )
                                        : E(ks)(
                                            E(Rx),
                                            (A) => r('swipeCancel', A),
                                            R
                                          ),
                                        N == null ||
                                          N.addEventListener(
                                            'click',
                                            (A) => A.preventDefault(),
                                            { once: !0 }
                                          );
                                    }
                                  })
                              }
                            ),
                            {
                              default: ie(() => [
                                fe(h.$slots, 'default', {
                                  remaining: g.value,
                                  duration: c.value
                                })
                              ]),
                              _: 3
                            },
                            16,
                            [
                              'as',
                              'as-child',
                              'data-state',
                              'data-swipe-direction'
                            ]
                          )
                        ]),
                        _: 3
                      })
                    ],
                    8,
                    ['to']
                  ))
                : Le('', !0)
            ],
            64
          )
        )
      );
    }
  }),
  jx = re({
    __name: 'ToastRoot',
    props: {
      defaultOpen: { type: Boolean, default: !0 },
      forceMount: { type: Boolean },
      type: { default: 'foreground' },
      open: { type: Boolean, default: void 0 },
      duration: {},
      asChild: { type: Boolean },
      as: { default: 'li' }
    },
    emits: [
      'escapeKeyDown',
      'pause',
      'resume',
      'swipeStart',
      'swipeMove',
      'swipeCancel',
      'swipeEnd',
      'update:open'
    ],
    setup(e, { emit: t }) {
      const n = e,
        r = t,
        { forwardRef: s } = ht(),
        o = $_(n, 'open', r, {
          defaultValue: n.defaultOpen,
          passive: n.open === void 0
        });
      return (i, a) => (
        G(),
        ee(
          E(ux),
          { present: i.forceMount || E(o) },
          {
            default: ie(() => [
              ue(
                Nx,
                we(
                  {
                    ref: E(s),
                    open: E(o),
                    type: i.type,
                    as: i.as,
                    'as-child': i.asChild,
                    duration: i.duration
                  },
                  i.$attrs,
                  {
                    onClose: a[0] || (a[0] = (l) => (o.value = !1)),
                    onPause: a[1] || (a[1] = (l) => r('pause')),
                    onResume: a[2] || (a[2] = (l) => r('resume')),
                    onEscapeKeyDown:
                      a[3] || (a[3] = (l) => r('escapeKeyDown', l)),
                    onSwipeStart:
                      a[4] ||
                      (a[4] = (l) => {
                        r('swipeStart', l),
                          l.currentTarget.setAttribute('data-swipe', 'start');
                      }),
                    onSwipeMove:
                      a[5] ||
                      (a[5] = (l) => {
                        const { x: u, y: c } = l.detail.delta,
                          f = l.currentTarget;
                        f.setAttribute('data-swipe', 'move'),
                          f.style.setProperty(
                            '--reka-toast-swipe-move-x',
                            `${u}px`
                          ),
                          f.style.setProperty(
                            '--reka-toast-swipe-move-y',
                            `${c}px`
                          );
                      }),
                    onSwipeCancel:
                      a[6] ||
                      (a[6] = (l) => {
                        const u = l.currentTarget;
                        u.setAttribute('data-swipe', 'cancel'),
                          u.style.removeProperty('--reka-toast-swipe-move-x'),
                          u.style.removeProperty('--reka-toast-swipe-move-y'),
                          u.style.removeProperty('--reka-toast-swipe-end-x'),
                          u.style.removeProperty('--reka-toast-swipe-end-y');
                      }),
                    onSwipeEnd:
                      a[7] ||
                      (a[7] = (l) => {
                        const { x: u, y: c } = l.detail.delta,
                          f = l.currentTarget;
                        f.setAttribute('data-swipe', 'end'),
                          f.style.removeProperty('--reka-toast-swipe-move-x'),
                          f.style.removeProperty('--reka-toast-swipe-move-y'),
                          f.style.setProperty(
                            '--reka-toast-swipe-end-x',
                            `${u}px`
                          ),
                          f.style.setProperty(
                            '--reka-toast-swipe-end-y',
                            `${c}px`
                          ),
                          (o.value = !1);
                      })
                  }
                ),
                {
                  default: ie(({ remaining: l, duration: u }) => [
                    fe(i.$slots, 'default', {
                      remaining: l,
                      duration: u,
                      open: E(o)
                    })
                  ]),
                  _: 3
                },
                16,
                ['open', 'type', 'as', 'as-child', 'duration']
              )
            ]),
            _: 3
          },
          8,
          ['present']
        )
      );
    }
  }),
  Hx = re({
    __name: 'ToastPortal',
    props: {
      to: {},
      disabled: { type: Boolean },
      forceMount: { type: Boolean }
    },
    setup(e) {
      const t = e;
      return (n, r) => (
        G(),
        ee(
          E(px),
          yn(ur(t)),
          { default: ie(() => [fe(n.$slots, 'default')]), _: 3 },
          16
        )
      );
    }
  }),
  fp = re({
    __name: 'ToastAnnounceExclude',
    props: { altText: {}, asChild: { type: Boolean }, as: {} },
    setup(e) {
      return (t, n) => (
        G(),
        ee(
          E(pt),
          {
            as: t.as,
            'as-child': t.asChild,
            'data-reka-toast-announce-exclude': '',
            'data-reka-toast-announce-alt': t.altText || void 0
          },
          { default: ie(() => [fe(t.$slots, 'default')]), _: 3 },
          8,
          ['as', 'as-child', 'data-reka-toast-announce-alt']
        )
      );
    }
  }),
  dp = re({
    __name: 'ToastClose',
    props: { asChild: { type: Boolean }, as: { default: 'button' } },
    setup(e) {
      const t = e,
        n = Mx(),
        { forwardRef: r } = ht();
      return (s, o) => (
        G(),
        ee(
          fp,
          { 'as-child': '' },
          {
            default: ie(() => [
              ue(
                E(pt),
                we(t, {
                  ref: E(r),
                  type: s.as === 'button' ? 'button' : void 0,
                  onClick: o[0] || (o[0] = (i) => E(n).onClose())
                }),
                { default: ie(() => [fe(s.$slots, 'default')]), _: 3 },
                16,
                ['type']
              )
            ]),
            _: 3
          }
        )
      );
    }
  }),
  Fc = re({
    __name: 'ToastAction',
    props: { altText: {}, asChild: { type: Boolean }, as: {} },
    setup(e) {
      if (!e.altText)
        throw new Error('Missing prop `altText` expected on `ToastAction`');
      const { forwardRef: n } = ht();
      return (r, s) =>
        r.altText
          ? (G(),
            ee(
              fp,
              { key: 0, 'alt-text': r.altText, 'as-child': '' },
              {
                default: ie(() => [
                  ue(
                    dp,
                    { ref: E(n), as: r.as, 'as-child': r.asChild },
                    { default: ie(() => [fe(r.$slots, 'default')]), _: 3 },
                    8,
                    ['as', 'as-child']
                  )
                ]),
                _: 3
              },
              8,
              ['alt-text']
            ))
          : Le('', !0);
    }
  }),
  Dc = re({
    __name: 'FocusProxy',
    emits: ['focusFromOutsideViewport'],
    setup(e, { emit: t }) {
      const n = t,
        r = Eo();
      return (s, o) => (
        G(),
        ee(
          E(ip),
          {
            'aria-hidden': 'true',
            tabindex: '0',
            style: { position: 'fixed' },
            onFocus:
              o[0] ||
              (o[0] = (i) => {
                var u;
                const a = i.relatedTarget;
                !((u = E(r).viewport.value) != null && u.contains(a)) &&
                  n('focusFromOutsideViewport');
              })
          },
          { default: ie(() => [fe(s.$slots, 'default')]), _: 3 }
        )
      );
    }
  }),
  Fx = re({
    __name: 'DismissableLayerBranch',
    props: { asChild: { type: Boolean }, as: {} },
    setup(e) {
      const t = e,
        { forwardRef: n, currentElement: r } = ht();
      return (
        dt(() => {
          xt.branches.add(r.value);
        }),
        Hn(() => {
          xt.branches.delete(r.value);
        }),
        (s, o) => (
          G(),
          ee(
            E(pt),
            we({ ref: E(n) }, t),
            { default: ie(() => [fe(s.$slots, 'default')]), _: 3 },
            16
          )
        )
      );
    }
  }),
  Dx = re({
    inheritAttrs: !1,
    __name: 'ToastViewport',
    props: {
      hotkey: { default: () => ['F8'] },
      label: { type: [String, Function], default: 'Notifications ({hotkey})' },
      asChild: { type: Boolean },
      as: { default: 'ol' }
    },
    setup(e) {
      const t = e,
        { hotkey: n, label: r } = Xt(t),
        { forwardRef: s, currentElement: o } = ht(),
        { CollectionSlot: i, getItems: a } = Ga(),
        l = Eo(),
        u = F(() => l.toastCount.value > 0),
        c = X(),
        f = X(),
        d = F(() =>
          n.value.join('+').replace(/Key/g, '').replace(/Digit/g, '')
        );
      Ba(n.value, () => {
        o.value.focus();
      }),
        dt(() => {
          l.onViewportChange(o.value);
        }),
        jt((g) => {
          const y = o.value;
          if (u.value && y) {
            const b = () => {
                if (!l.isClosePausedRef.value) {
                  const x = new CustomEvent(Xi);
                  y.dispatchEvent(x), (l.isClosePausedRef.value = !0);
                }
              },
              _ = () => {
                if (l.isClosePausedRef.value) {
                  const x = new CustomEvent(Zi);
                  y.dispatchEvent(x), (l.isClosePausedRef.value = !1);
                }
              },
              v = (x) => {
                !y.contains(x.relatedTarget) && _();
              },
              h = () => {
                y.contains(document.activeElement) || _();
              },
              m = (x) => {
                var N, R, A;
                const C = x.altKey || x.ctrlKey || x.metaKey;
                if (x.key === 'Tab' && !C) {
                  const D = document.activeElement,
                    k = x.shiftKey;
                  if (x.target === y && k) {
                    (N = c.value) == null || N.focus();
                    return;
                  }
                  const Q = p({
                      tabbingDirection: k ? 'backwards' : 'forwards'
                    }),
                    $ = Q.findIndex((W) => W === D);
                  Xo(Q.slice($ + 1))
                    ? x.preventDefault()
                    : k
                      ? (R = c.value) == null || R.focus()
                      : (A = f.value) == null || A.focus();
                }
              };
            y.addEventListener('focusin', b),
              y.addEventListener('focusout', v),
              y.addEventListener('pointermove', b),
              y.addEventListener('pointerleave', h),
              y.addEventListener('keydown', m),
              window.addEventListener('blur', b),
              window.addEventListener('focus', _),
              g(() => {
                y.removeEventListener('focusin', b),
                  y.removeEventListener('focusout', v),
                  y.removeEventListener('pointermove', b),
                  y.removeEventListener('pointerleave', h),
                  y.removeEventListener('keydown', m),
                  window.removeEventListener('blur', b),
                  window.removeEventListener('focus', _);
              });
          }
        });
      function p({ tabbingDirection: g }) {
        const b = a()
          .map((_) => _.ref)
          .map((_) => {
            const v = [_, ...vx(_)];
            return g === 'forwards' ? v : v.reverse();
          });
        return (g === 'forwards' ? b.reverse() : b).flat();
      }
      return (g, y) => (
        G(),
        ee(
          E(Fx),
          {
            role: 'region',
            'aria-label':
              typeof E(r) == 'string'
                ? E(r).replace('{hotkey}', d.value)
                : E(r)(d.value),
            tabindex: '-1',
            style: wn({ pointerEvents: u.value ? void 0 : 'none' })
          },
          {
            default: ie(() => [
              u.value
                ? (G(),
                  ee(
                    Dc,
                    {
                      key: 0,
                      ref: (b) => {
                        c.value = E(bn)(b);
                      },
                      onFocusFromOutsideViewport:
                        y[0] ||
                        (y[0] = () => {
                          const b = p({ tabbingDirection: 'forwards' });
                          E(Xo)(b);
                        })
                    },
                    null,
                    512
                  ))
                : Le('', !0),
              ue(E(i), null, {
                default: ie(() => [
                  ue(
                    E(pt),
                    we(
                      {
                        ref: E(s),
                        tabindex: '-1',
                        as: g.as,
                        'as-child': g.asChild
                      },
                      g.$attrs
                    ),
                    { default: ie(() => [fe(g.$slots, 'default')]), _: 3 },
                    16,
                    ['as', 'as-child']
                  )
                ]),
                _: 3
              }),
              u.value
                ? (G(),
                  ee(
                    Dc,
                    {
                      key: 1,
                      ref: (b) => {
                        f.value = E(bn)(b);
                      },
                      onFocusFromOutsideViewport:
                        y[1] ||
                        (y[1] = () => {
                          const b = p({ tabbingDirection: 'backwards' });
                          E(Xo)(b);
                        })
                    },
                    null,
                    512
                  ))
                : Le('', !0)
            ]),
            _: 3
          },
          8,
          ['aria-label', 'style']
        )
      );
    }
  }),
  Bx = re({
    __name: 'ToastTitle',
    props: { asChild: { type: Boolean }, as: {} },
    setup(e) {
      const t = e;
      return (
        ht(),
        (n, r) => (
          G(),
          ee(
            E(pt),
            yn(ur(t)),
            { default: ie(() => [fe(n.$slots, 'default')]), _: 3 },
            16
          )
        )
      );
    }
  }),
  Ux = re({
    __name: 'ToastDescription',
    props: { asChild: { type: Boolean }, as: {} },
    setup(e) {
      const t = e;
      return (
        ht(),
        (n, r) => (
          G(),
          ee(
            E(pt),
            yn(ur(t)),
            { default: ie(() => [fe(n.$slots, 'default')]), _: 3 },
            16
          )
        )
      );
    }
  }),
  [Sk, zx] = ds('TooltipProvider'),
  Vx = re({
    inheritAttrs: !1,
    __name: 'TooltipProvider',
    props: {
      delayDuration: { default: 700 },
      skipDelayDuration: { default: 300 },
      disableHoverableContent: { type: Boolean, default: !1 },
      disableClosingTrigger: { type: Boolean },
      disabled: { type: Boolean },
      ignoreNonKeyboardFocus: { type: Boolean, default: !1 }
    },
    setup(e) {
      const t = e,
        {
          delayDuration: n,
          skipDelayDuration: r,
          disableHoverableContent: s,
          disableClosingTrigger: o,
          ignoreNonKeyboardFocus: i,
          disabled: a
        } = Xt(t);
      ht();
      const l = X(!0),
        u = X(!1),
        { start: c, stop: f } = Bd(
          () => {
            l.value = !0;
          },
          r,
          { immediate: !1 }
        );
      return (
        zx({
          isOpenDelayed: l,
          delayDuration: n,
          onOpen() {
            f(), (l.value = !1);
          },
          onClose() {
            c();
          },
          isPointerInTransitRef: u,
          disableHoverableContent: s,
          disableClosingTrigger: o,
          disabled: a,
          ignoreNonKeyboardFocus: i
        }),
        (d, p) => fe(d.$slots, 'default')
      );
    }
  });
function Wx() {
  const e = Ha('toasts', () => []);
  function t(o) {
    const i = { id: new Date().getTime().toString(), open: !0, ...o };
    return (
      e.value.findIndex((l) => l.id === i.id) === -1 && e.value.push(i),
      (e.value = e.value.slice(-5)),
      i
    );
  }
  function n(o, i) {
    const a = e.value.findIndex((l) => l.id === o);
    a !== -1 && (e.value[a] = { ...e.value[a], ...i });
  }
  function r(o) {
    const i = e.value.findIndex((a) => a.id === o);
    i !== -1 && (e.value[i] = { ...e.value[i], open: !1 }),
      setTimeout(() => {
        e.value = e.value.filter((a) => a.id !== o);
      }, 200);
  }
  function s() {
    e.value = [];
  }
  return { toasts: e, add: t, update: n, remove: r, clear: s };
}
function pp(e, t) {
  const n = { ...e };
  for (const r of t) delete n[r];
  return n;
}
function Kx(e, t, n) {
  typeof t == 'string' &&
    (t = t.split('.').map((s) => {
      const o = Number(s);
      return Number.isNaN(o) ? s : o;
    }));
  let r = e;
  for (const s of t) {
    if (r == null) return n;
    r = r[s];
  }
  return r !== void 0 ? r : n;
}
function qx(e) {
  return (t, n) => Gx(t, n, E(e));
}
function Gx(e, t, n) {
  return Kx(n, `messages.${e}`, e).replace(
    /\{(\w+)\}/g,
    (s, o) => `${(t == null ? void 0 : t[o]) ?? `{${o}}`}`
  );
}
function Jx(e) {
  const t = F(() => E(e).name),
    n = F(() => E(e).code),
    r = F(() => E(e).dir),
    s = Te(e) ? e : X(e);
  return { lang: t, code: n, dir: r, locale: s, t: qx(e) };
}
function Qx(e) {
  return nn(e, { dir: 'ltr' });
}
const Yx = Qx({
    name: 'English',
    code: 'en',
    messages: {
      inputMenu: {
        noMatch: 'No matching data',
        noData: 'No data',
        create: 'Create "{label}"'
      },
      calendar: {
        prevYear: 'Previous year',
        nextYear: 'Next year',
        prevMonth: 'Previous month',
        nextMonth: 'Next month'
      },
      inputNumber: { increment: 'Increment', decrement: 'Decrement' },
      commandPalette: {
        noMatch: 'No matching data',
        noData: 'No data',
        close: 'Close'
      },
      selectMenu: {
        noMatch: 'No matching data',
        noData: 'No data',
        create: 'Create "{label}"'
      },
      toast: { close: 'Close' },
      carousel: { prev: 'Prev', next: 'Next', goto: 'Go to slide {slide}' },
      modal: { close: 'Close' },
      slideover: { close: 'Close' },
      alert: { close: 'Close' },
      table: { noData: 'No data' }
    }
  }),
  hp = Symbol('nuxt-ui.locale-context'),
  Xx = (e) => {
    const t = e || Ae(hp, X());
    return Jx(F(() => t.value || Yx));
  },
  Zx = Da(Xx),
  eS = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  gp = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  Ja = Object.freeze({ ...eS, ...gp });
Object.freeze({ ...Ja, body: '', hidden: !1 });
function tS(e, t) {
  let n =
    e.indexOf('xlink:') === -1
      ? ''
      : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t) n += ' ' + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + '>' + e + '</svg>';
}
const nS = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  rS = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ea(e, t, n) {
  if (t === 1) return e;
  if (((n = n || 100), typeof e == 'number')) return Math.ceil(e * t * n) / n;
  if (typeof e != 'string') return e;
  const r = e.split(nS);
  if (r === null || !r.length) return e;
  const s = [];
  let o = r.shift(),
    i = rS.test(o);
  for (;;) {
    if (i) {
      const a = parseFloat(o);
      isNaN(a) ? s.push(o) : s.push(Math.ceil(a * t * n) / n);
    } else s.push(o);
    if (((o = r.shift()), o === void 0)) return s.join('');
    i = !i;
  }
}
function sS(e) {
  return e
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ');
}
function oS(e) {
  return 'data:image/svg+xml,' + sS(e);
}
function iS(e) {
  return 'url("' + oS(e) + '")';
}
function aS(e) {
  const [t, n, r, s] = e;
  if (r !== s) {
    const o = Math.max(r, s);
    return [t - (o - r) / 2, n - (o - s) / 2, o, o];
  }
  return e;
}
const lS = Object.freeze({ width: null, height: null }),
  cS = Object.freeze({ ...lS, ...gp });
function uS(e, t = 'defs') {
  let n = '';
  const r = e.indexOf('<' + t);
  for (; r >= 0; ) {
    const s = e.indexOf('>', r),
      o = e.indexOf('</' + t);
    if (s === -1 || o === -1) break;
    const i = e.indexOf('>', o);
    if (i === -1) break;
    (n += e.slice(s + 1, o).trim()),
      (e = e.slice(0, r).trim() + e.slice(i + 1));
  }
  return { defs: n, content: e };
}
function fS(e, t) {
  return e ? '<defs>' + e + '</defs>' + t : t;
}
function dS(e, t, n) {
  const r = uS(e);
  return fS(r.defs, t + r.content + n);
}
const pS = (e) => e === 'unset' || e === 'undefined' || e === 'none';
function hS(e, t) {
  const n = { ...Ja, ...e },
    r = { ...cS, ...t },
    s = { left: n.left, top: n.top, width: n.width, height: n.height };
  let o = n.body;
  [n, r].forEach((y) => {
    const b = [],
      _ = y.hFlip,
      v = y.vFlip;
    let h = y.rotate;
    _
      ? v
        ? (h += 2)
        : (b.push(
            'translate(' +
              (s.width + s.left).toString() +
              ' ' +
              (0 - s.top).toString() +
              ')'
          ),
          b.push('scale(-1 1)'),
          (s.top = s.left = 0))
      : v &&
        (b.push(
          'translate(' +
            (0 - s.left).toString() +
            ' ' +
            (s.height + s.top).toString() +
            ')'
        ),
        b.push('scale(1 -1)'),
        (s.top = s.left = 0));
    let m;
    switch ((h < 0 && (h -= Math.floor(h / 4) * 4), (h = h % 4), h)) {
      case 1:
        (m = s.height / 2 + s.top),
          b.unshift('rotate(90 ' + m.toString() + ' ' + m.toString() + ')');
        break;
      case 2:
        b.unshift(
          'rotate(180 ' +
            (s.width / 2 + s.left).toString() +
            ' ' +
            (s.height / 2 + s.top).toString() +
            ')'
        );
        break;
      case 3:
        (m = s.width / 2 + s.left),
          b.unshift('rotate(-90 ' + m.toString() + ' ' + m.toString() + ')');
        break;
    }
    h % 2 === 1 &&
      (s.left !== s.top && ((m = s.left), (s.left = s.top), (s.top = m)),
      s.width !== s.height &&
        ((m = s.width), (s.width = s.height), (s.height = m))),
      b.length && (o = dS(o, '<g transform="' + b.join(' ') + '">', '</g>'));
  });
  const i = r.width,
    a = r.height,
    l = s.width,
    u = s.height;
  let c, f;
  i === null
    ? ((f = a === null ? '1em' : a === 'auto' ? u : a), (c = ea(f, l / u)))
    : ((c = i === 'auto' ? l : i),
      (f = a === null ? ea(c, u / l) : a === 'auto' ? u : a));
  const d = {},
    p = (y, b) => {
      pS(b) || (d[y] = b.toString());
    };
  p('width', c), p('height', f);
  const g = [s.left, s.top, l, u];
  return (d.viewBox = g.join(' ')), { attributes: d, viewBox: g, body: o };
}
function gS(e) {
  const t = { display: 'inline-block', width: '1em', height: '1em' },
    n = e.varName;
  switch ((e.pseudoSelector && (t.content = "''"), e.mode)) {
    case 'background':
      n && (t['background-image'] = 'var(--' + n + ')'),
        (t['background-repeat'] = 'no-repeat'),
        (t['background-size'] = '100% 100%');
      break;
    case 'mask':
      (t['background-color'] = 'currentColor'),
        n && (t['mask-image'] = t['-webkit-mask-image'] = 'var(--' + n + ')'),
        (t['mask-repeat'] = t['-webkit-mask-repeat'] = 'no-repeat'),
        (t['mask-size'] = t['-webkit-mask-size'] = '100% 100%');
      break;
  }
  return t;
}
function mS(e, t) {
  const n = {},
    r = t.varName,
    s = hS(e);
  let o = s.viewBox;
  o[2] !== o[3] &&
    (t.forceSquare ? (o = aS(o)) : (n.width = ea('1em', o[2] / o[3])));
  const i = tS(s.body.replace(/currentColor/g, t.color || 'black'), {
      viewBox: `${o[0]} ${o[1]} ${o[2]} ${o[3]}`,
      width: `${o[2]}`,
      height: `${o[3]}`
    }),
    a = iS(i);
  if (r) n['--' + r] = a;
  else
    switch (t.mode) {
      case 'background':
        n['background-image'] = a;
        break;
      case 'mask':
        n['mask-image'] = n['-webkit-mask-image'] = a;
        break;
    }
  return n;
}
const Zo = {
  selectorStart: { compressed: '{', compact: ' {', expanded: ' {' },
  selectorEnd: {
    compressed: '}',
    compact: `; }
`,
    expanded: `;
}
`
  },
  rule: {
    compressed: '{key}:',
    compact: ' {key}: ',
    expanded: `
  {key}: `
  }
};
function yS(e, t = 'expanded') {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const { selector: s, rules: o } = e[r];
    let a =
        (s instanceof Array ? s.join(t === 'compressed' ? ',' : ', ') : s) +
        Zo.selectorStart[t],
      l = !0;
    for (const u in o)
      l || (a += ';'), (a += Zo.rule[t].replace('{key}', u) + o[u]), (l = !1);
    (a += Zo.selectorEnd[t]), n.push(a);
  }
  return n.join(
    t === 'compressed'
      ? ''
      : `
`
  );
}
function vS(e, t = {}) {
  const n = t.customise ? t.customise(e.body) : e.body,
    r =
      t.mode ||
      (t.color || !n.includes('currentColor') ? 'background' : 'mask');
  let s = t.varName;
  s === void 0 && r === 'mask' && (s = 'svg');
  const o = { ...t, mode: r, varName: s };
  r === 'background' && delete o.varName;
  const i = { ...t.rules, ...gS(o), ...mS({ ...Ja, ...e, body: n }, o) },
    a = t.iconSelector || '.icon';
  return yS([{ selector: a, rules: i }], o.format);
}
async function bS(e, t) {
  if (!e) return null;
  const n = qi(e);
  return n || (await P0(e).catch(() => null), qi(e));
}
function mp(e) {
  const t = Sn().icon,
    n = (t.collections || []).sort((r, s) => s.length - r.length);
  return F(() => {
    var i;
    const r = e(),
      s = r.startsWith(t.cssSelectorPrefix)
        ? r.slice(t.cssSelectorPrefix.length)
        : r,
      o = ((i = t.aliases) == null ? void 0 : i[s]) || s;
    if (!o.includes(':')) {
      const a = n.find((l) => o.startsWith(l + '-'));
      return a ? a + ':' + o.slice(a.length + 1) : o;
    }
    return o;
  });
}
let kr;
function wS(e) {
  return e.replace(/([^\w-])/g, '\\$1');
}
function _S() {
  if (kr) return kr;
  kr = new Set();
  const e = (n) => {
      if (((n = n.replace(/^:where\((.*)\)$/, '$1').trim()), n.startsWith('.')))
        return n;
    },
    t = (n) => {
      if (n != null && n.length)
        for (const r of n) {
          r != null && r.cssRules && t(r.cssRules);
          const s = r == null ? void 0 : r.selectorText;
          if (typeof s == 'string') {
            const o = e(s);
            o && kr.add(o);
          }
        }
    };
  if (typeof document < 'u')
    for (const n of document.styleSheets)
      try {
        const r = n.cssRules || n.rules;
        t(r);
      } catch {}
  return kr;
}
const xS = re({
    name: 'NuxtIconCss',
    props: {
      name: { type: String, required: !0 },
      customize: { type: Function, required: !1 }
    },
    setup(e) {
      const t = de(),
        n = Sn().icon,
        r = F(() => (e.name ? n.cssSelectorPrefix + e.name : ''));
      function s(a) {
        var c, f;
        if (!a) return;
        const l = qi(a);
        if (l) return l;
        const u =
          (f = (c = t.payload) == null ? void 0 : c.data) == null
            ? void 0
            : f[a];
        if (u) return Wa(a, u), u;
      }
      const o = F(() => '.' + wS(r.value));
      function i(a, l = !0) {
        let u = o.value;
        n.cssWherePseudo && (u = `:where(${u})`);
        const c = vS(a, {
          iconSelector: u,
          format: 'compressed',
          customise: e.customize ?? n.customize
        });
        return n.cssLayer && l ? `@layer ${n.cssLayer} { ${c} }` : c;
      }
      {
        const a = _S();
        async function l(u) {
          if (a.has(o.value) || typeof document > 'u') return;
          const c = document.createElement('style');
          c.textContent = i(u);
          const f = document.head.querySelector(
            'style, link[rel="stylesheet"]'
          );
          f ? document.head.insertBefore(c, f) : document.head.appendChild(c),
            a.add(o.value);
        }
        Pe(
          () => e.name,
          () => {
            if (a.has(o.value)) return;
            const u = s(e.name);
            u
              ? l(u)
              : bS(e.name)
                  .then((c) => {
                    c && l(c);
                  })
                  .catch(() => null);
          },
          { immediate: !0 }
        );
      }
      return () => Ce('span', { class: ['iconify', r.value] });
    }
  }),
  SS = re({
    name: 'NuxtIconSvg',
    props: {
      name: { type: String, required: !0 },
      customize: { type: Function, required: !1 }
    },
    setup(e, { slots: t }) {
      const n = de(),
        r = Sn().icon,
        s = mp(() => e.name),
        o = 'i-' + s.value;
      if (s.value) {
        const i = n.payload.data[o];
        i && Wa(s.value, i);
      }
      return () =>
        Ce(
          U0,
          { icon: s.value, ssr: !0, customise: e.customize ?? r.customize },
          t
        );
    }
  }),
  yp = re({
    name: 'NuxtIcon',
    props: {
      name: { type: String, required: !0 },
      mode: { type: String, required: !1, default: null },
      size: { type: [Number, String], required: !1, default: null },
      customize: { type: Function, required: !1 }
    },
    setup(e, { slots: t }) {
      const n = de(),
        r = Sn().icon,
        s = mp(() => e.name),
        o = F(() => {
          var l;
          return (
            ((l = n.vueApp) == null ? void 0 : l.component(s.value)) ||
            ((e.mode || r.mode) === 'svg' ? SS : xS)
          );
        }),
        i = F(() => {
          const l = e.size || r.size;
          return l ? { fontSize: Number.isNaN(+l) ? l : l + 'px' } : null;
        }),
        a = e.customize || r.customize;
      return () =>
        Ce(
          o.value,
          {
            ...r.attrs,
            name: s.value,
            class: r.class,
            style: i.value,
            customize: a
          },
          t
        );
    }
  }),
  CS = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: yp },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  lo = re({
    __name: 'Icon',
    props: { name: {}, mode: {}, size: {}, customize: { type: Function } },
    setup(e) {
      const n = Bn(gr(e, 'name', 'mode', 'size', 'customize'));
      return (r, s) => {
        const o = yp;
        return G(), ee(o, yn(ur(E(n))), null, 16);
      };
    }
  }),
  Bc = Symbol('nuxt-ui.avatar-group');
function kS(e) {
  const t = Ae(Bc, void 0),
    n = F(() => e.size ?? (t == null ? void 0 : t.value.size));
  return (
    Tt(
      Bc,
      F(() => ({ size: n.value }))
    ),
    { size: n }
  );
}
async function ES(e, t) {
  return await TS(t).catch((r) => ({ width: 0, height: 0, ratio: 0 }));
}
async function TS(e) {
  if (typeof Image > 'u') throw new TypeError('Image not supported');
  return new Promise((t, n) => {
    const r = new Image();
    (r.onload = () => {
      const s = { width: r.width, height: r.height, ratio: r.width / r.height };
      t(s);
    }),
      (r.onerror = (s) => n(s)),
      (r.src = e);
  });
}
function Nt(e = '') {
  if (typeof e == 'number') return e;
  if (typeof e == 'string' && e.replace('px', '').match(/^\d+$/g))
    return Number.parseInt(e, 10);
}
function AS(e = '') {
  if (e === void 0 || !e.length) return [];
  const t = new Set();
  for (const n of e.split(' ')) {
    const r = Number.parseInt(n.replace('x', ''));
    r && t.add(r);
  }
  return Array.from(t);
}
function PS(e) {
  if (e.length === 0)
    throw new Error(
      '`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)'
    );
}
function RS(e) {
  const t = {};
  if (typeof e == 'string')
    for (const n of e.split(/[\s,]+/).filter((r) => r)) {
      const r = n.split(':');
      r.length !== 2
        ? (t['1px'] = r[0].trim())
        : (t[r[0].trim()] = r[1].trim());
    }
  else Object.assign(t, e);
  return t;
}
function OS(e) {
  const t = { options: e },
    n = (s, o = {}) => vp(t, s, o),
    r = (s, o = {}, i = {}) =>
      n(s, { ...i, modifiers: nn(o, i.modifiers || {}) }).url;
  for (const s in e.presets)
    r[s] = (o, i, a) => r(o, i, { ...e.presets[s], ...a });
  return (
    (r.options = e),
    (r.getImage = n),
    (r.getMeta = (s, o) => IS(t, s, o)),
    (r.getSizes = (s, o) => LS(t, s, o)),
    (t.$img = r),
    r
  );
}
async function IS(e, t, n) {
  const r = vp(e, t, { ...n });
  return typeof r.getMeta == 'function'
    ? await r.getMeta()
    : await ES(e, r.url);
}
function vp(e, t, n) {
  var u, c;
  if (t && typeof t != 'string')
    throw new TypeError(
      `input must be a string (received ${typeof t}: ${JSON.stringify(t)})`
    );
  if (!t || t.startsWith('data:')) return { url: t };
  const { provider: r, defaults: s } = $S(e, n.provider || e.options.provider),
    o = MS(e, n.preset);
  if (((t = ft(t) ? t : Zs(t)), !r.supportsAlias)) {
    for (const f in e.options.alias)
      if (t.startsWith(f)) {
        const d = e.options.alias[f];
        d && (t = ss(d, t.slice(f.length)));
      }
  }
  if (r.validateDomains && ft(t)) {
    const f = os(t).host;
    if (!e.options.domains.find((d) => d === f)) return { url: t };
  }
  const i = nn(n, o, s);
  i.modifiers = { ...i.modifiers };
  const a = i.modifiers.format;
  (u = i.modifiers) != null &&
    u.width &&
    (i.modifiers.width = Nt(i.modifiers.width)),
    (c = i.modifiers) != null &&
      c.height &&
      (i.modifiers.height = Nt(i.modifiers.height));
  const l = r.getImage(t, i, e);
  return (l.format = l.format || a || ''), l;
}
function $S(e, t) {
  const n = e.options.providers[t];
  if (!n) throw new Error('Unknown provider: ' + t);
  return n;
}
function MS(e, t) {
  if (!t) return {};
  if (!e.options.presets[t]) throw new Error('Unknown preset: ' + t);
  return e.options.presets[t];
}
function LS(e, t, n) {
  var g, y, b, _, v;
  const r = Nt((g = n.modifiers) == null ? void 0 : g.width),
    s = Nt((y = n.modifiers) == null ? void 0 : y.height),
    o = RS(n.sizes),
    i =
      (b = n.densities) != null && b.trim()
        ? AS(n.densities.trim())
        : e.options.densities;
  PS(i);
  const a = r && s ? s / r : 0,
    l = [],
    u = [];
  if (Object.keys(o).length >= 1) {
    for (const h in o) {
      const m = Uc(h, String(o[h]), s, a, e);
      if (m !== void 0) {
        l.push({
          size: m.size,
          screenMaxWidth: m.screenMaxWidth,
          media: `(max-width: ${m.screenMaxWidth}px)`
        });
        for (const x of i)
          u.push({ width: m._cWidth * x, src: zc(e, t, n, m, x) });
      }
    }
    NS(l);
  } else
    for (const h of i) {
      const m = Object.keys(o)[0];
      let x = m ? Uc(m, String(o[m]), s, a, e) : void 0;
      x === void 0 &&
        (x = {
          size: '',
          screenMaxWidth: 0,
          _cWidth: (_ = n.modifiers) == null ? void 0 : _.width,
          _cHeight: (v = n.modifiers) == null ? void 0 : v.height
        }),
        u.push({ width: h, src: zc(e, t, n, x, h) });
    }
  jS(u);
  const c = u[u.length - 1],
    f = l.length
      ? l.map((h) => `${h.media ? h.media + ' ' : ''}${h.size}`).join(', ')
      : void 0,
    d = f ? 'w' : 'x',
    p = u.map((h) => `${h.src} ${h.width}${d}`).join(', ');
  return { sizes: f, srcset: p, src: c == null ? void 0 : c.src };
}
function Uc(e, t, n, r, s) {
  const o = (s.options.screens && s.options.screens[e]) || Number.parseInt(e),
    i = t.endsWith('vw');
  if ((!i && /^\d+$/.test(t) && (t = t + 'px'), !i && !t.endsWith('px')))
    return;
  let a = Number.parseInt(t);
  if (!o || !a) return;
  i && (a = Math.round((a / 100) * o));
  const l = r ? Math.round(a * r) : n;
  return { size: t, screenMaxWidth: o, _cWidth: a, _cHeight: l };
}
function zc(e, t, n, r, s) {
  return e.$img(
    t,
    {
      ...n.modifiers,
      width: r._cWidth ? r._cWidth * s : void 0,
      height: r._cHeight ? r._cHeight * s : void 0
    },
    n
  );
}
function NS(e) {
  var n;
  e.sort((r, s) => r.screenMaxWidth - s.screenMaxWidth);
  let t = null;
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    s.media === t && e.splice(r, 1), (t = s.media);
  }
  for (let r = 0; r < e.length; r++)
    e[r].media = ((n = e[r + 1]) == null ? void 0 : n.media) || '';
}
function jS(e) {
  e.sort((n, r) => n.width - r.width);
  let t = null;
  for (let n = e.length - 1; n >= 0; n--) {
    const r = e[n];
    r.width === t && e.splice(n, 1), (t = r.width);
  }
}
const HS = (e) => ({ url: e }),
  FS = Object.freeze(
    Object.defineProperty(
      { __proto__: null, getImage: HS },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  bp = {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    presets: {},
    provider: 'none',
    domains: [],
    alias: {},
    densities: [1, 2],
    format: ['webp', 'webp']
  };
bp.providers = { none: { provider: FS, defaults: {} } };
const wp = () => {
  const e = bt(),
    t = de();
  return (
    t.$img ||
    t._img ||
    (t._img = OS({ ...bp, nuxt: { baseURL: e.app.baseURL }, runtimeConfig: e }))
  );
};
function DS(e) {
  var t;
  (t = performance == null ? void 0 : performance.mark) == null ||
    t.call(performance, 'mark_feature_usage', { detail: { feature: e } });
}
const BS = {
    src: { type: String, required: !1 },
    format: { type: String, required: !1 },
    quality: { type: [Number, String], required: !1 },
    background: { type: String, required: !1 },
    fit: { type: String, required: !1 },
    modifiers: { type: Object, required: !1 },
    preset: { type: String, required: !1 },
    provider: { type: String, required: !1 },
    sizes: { type: [Object, String], required: !1 },
    densities: { type: String, required: !1 },
    preload: { type: [Boolean, Object], required: !1 },
    width: { type: [String, Number], required: !1 },
    height: { type: [String, Number], required: !1 },
    alt: { type: String, required: !1 },
    referrerpolicy: { type: String, required: !1 },
    usemap: { type: String, required: !1 },
    longdesc: { type: String, required: !1 },
    ismap: { type: Boolean, required: !1 },
    loading: {
      type: String,
      required: !1,
      validator: (e) => ['lazy', 'eager'].includes(e)
    },
    crossorigin: {
      type: [Boolean, String],
      required: !1,
      validator: (e) => ['anonymous', 'use-credentials', '', !0, !1].includes(e)
    },
    decoding: {
      type: String,
      required: !1,
      validator: (e) => ['async', 'auto', 'sync'].includes(e)
    },
    nonce: { type: [String], required: !1 }
  },
  US = (e) => {
    const t = F(() => ({ provider: e.provider, preset: e.preset })),
      n = F(() => ({
        width: Nt(e.width),
        height: Nt(e.height),
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        usemap: e.usemap,
        longdesc: e.longdesc,
        ismap: e.ismap,
        crossorigin:
          e.crossorigin === !0 ? 'anonymous' : e.crossorigin || void 0,
        loading: e.loading,
        decoding: e.decoding,
        nonce: e.nonce
      })),
      r = wp(),
      s = F(() => ({
        ...e.modifiers,
        width: Nt(e.width),
        height: Nt(e.height),
        format: e.format,
        quality: e.quality || r.options.quality,
        background: e.background,
        fit: e.fit
      }));
    return { options: t, attrs: n, modifiers: s };
  },
  zS = {
    ...BS,
    placeholder: { type: [Boolean, String, Number, Array], required: !1 },
    placeholderClass: { type: String, required: !1 },
    custom: { type: Boolean, required: !1 }
  },
  VS = ['src'],
  WS = re({
    __name: 'NuxtImg',
    props: zS,
    emits: ['load', 'error'],
    setup(e, { emit: t }) {
      const n = e,
        r = Uh(),
        s = t,
        o = !1,
        i = wp(),
        a = US(n),
        l = X(!1),
        u = X(),
        c = F(() =>
          i.getSizes(n.src, {
            ...a.options.value,
            sizes: n.sizes,
            densities: n.densities,
            modifiers: {
              ...a.modifiers.value,
              width: Nt(n.width),
              height: Nt(n.height)
            }
          })
        ),
        f = F(() => {
          const _ = { ...a.attrs.value, 'data-nuxt-img': '' };
          return (
            (!n.placeholder || l.value) &&
              ((_.sizes = c.value.sizes), (_.srcset = c.value.srcset)),
            _
          );
        }),
        d = F(() => {
          let _ = n.placeholder;
          if ((_ === '' && (_ = !0), !_ || l.value)) return !1;
          if (typeof _ == 'string') return _;
          const v = Array.isArray(_)
            ? _
            : typeof _ == 'number'
              ? [_, _]
              : [10, 10];
          return i(
            n.src,
            {
              ...a.modifiers.value,
              width: v[0],
              height: v[1],
              quality: v[2] || 50,
              blur: v[3] || 3
            },
            a.options.value
          );
        }),
        p = F(() =>
          n.sizes ? c.value.src : i(n.src, a.modifiers.value, a.options.value)
        ),
        g = F(() => (d.value ? d.value : p.value)),
        b = de().isHydrating;
      return (
        dt(() => {
          if (d.value || n.custom) {
            const _ = new Image();
            p.value && (_.src = p.value),
              n.sizes &&
                ((_.sizes = c.value.sizes || ''), (_.srcset = c.value.srcset)),
              (_.onload = (v) => {
                (l.value = !0), s('load', v);
              }),
              (_.onerror = (v) => {
                s('error', v);
              }),
              DS('nuxt-image');
            return;
          }
          u.value &&
            (u.value.complete &&
              b &&
              (u.value.getAttribute('data-error')
                ? s('error', new Event('error'))
                : s('load', new Event('load'))),
            (u.value.onload = (_) => {
              s('load', _);
            }),
            (u.value.onerror = (_) => {
              s('error', _);
            }));
        }),
        (_, v) =>
          _.custom
            ? fe(
                _.$slots,
                'default',
                yn(
                  we(
                    { key: 1 },
                    {
                      ...(E(o)
                        ? { onerror: "this.setAttribute('data-error', 1)" }
                        : {}),
                      imgAttrs: { ...f.value, ...E(r) },
                      isLoaded: l.value,
                      src: g.value
                    }
                  )
                )
              )
            : (G(),
              ut(
                'img',
                we(
                  {
                    key: 0,
                    ref_key: 'imgEl',
                    ref: u,
                    class:
                      n.placeholder && !l.value ? n.placeholderClass : void 0
                  },
                  {
                    ...(E(o)
                      ? { onerror: "this.setAttribute('data-error', 1)" }
                      : {}),
                    ...f.value,
                    ...E(r)
                  },
                  { src: g.value }
                ),
                null,
                16,
                VS
              ))
      );
    }
  });
var Vc = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  nt = (e) => !e || typeof e != 'object' || Object.keys(e).length === 0,
  KS = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function _p(e, t) {
  e.forEach(function (n) {
    Array.isArray(n) ? _p(n, t) : t.push(n);
  });
}
function xp(e) {
  let t = [];
  return _p(e, t), t;
}
var Sp = (...e) => xp(e).filter(Boolean),
  Cp = (e, t) => {
    let n = {},
      r = Object.keys(e),
      s = Object.keys(t);
    for (let o of r)
      if (s.includes(o)) {
        let i = e[o],
          a = t[o];
        Array.isArray(i) || Array.isArray(a)
          ? (n[o] = Sp(a, i))
          : typeof i == 'object' && typeof a == 'object'
            ? (n[o] = Cp(i, a))
            : (n[o] = a + ' ' + i);
      } else n[o] = e[o];
    for (let o of s) r.includes(o) || (n[o] = t[o]);
    return n;
  },
  Wc = (e) => (!e || typeof e != 'string' ? e : e.replace(/\s+/g, ' ').trim());
const Qa = '-',
  qS = (e) => {
    const t = JS(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (i) => {
        const a = i.split(Qa);
        return a[0] === '' && a.length !== 1 && a.shift(), kp(a, t) || GS(i);
      },
      getConflictingClassGroupIds: (i, a) => {
        const l = n[i] || [];
        return a && r[i] ? [...l, ...r[i]] : l;
      }
    };
  },
  kp = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      s = r ? kp(e.slice(1), r) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const o = e.join(Qa);
    return (i = t.validators.find(({ validator: a }) => a(o))) == null
      ? void 0
      : i.classGroupId;
  },
  Kc = /^\[(.+)\]$/,
  GS = (e) => {
    if (Kc.test(e)) {
      const t = Kc.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  JS = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      YS(Object.entries(e.classGroups), n).forEach(([o, i]) => {
        ta(i, r, o, t);
      }),
      r
    );
  },
  ta = (e, t, n, r) => {
    e.forEach((s) => {
      if (typeof s == 'string') {
        const o = s === '' ? t : qc(t, s);
        o.classGroupId = n;
        return;
      }
      if (typeof s == 'function') {
        if (QS(s)) {
          ta(s(r), t, n, r);
          return;
        }
        t.validators.push({ validator: s, classGroupId: n });
        return;
      }
      Object.entries(s).forEach(([o, i]) => {
        ta(i, qc(t, o), n, r);
      });
    });
  },
  qc = (e, t) => {
    let n = e;
    return (
      t.split(Qa).forEach((r) => {
        n.nextPart.has(r) ||
          n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(r));
      }),
      n
    );
  },
  QS = (e) => e.isThemeGetter,
  YS = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const s = r.map((o) =>
            typeof o == 'string'
              ? t + o
              : typeof o == 'object'
                ? Object.fromEntries(
                    Object.entries(o).map(([i, a]) => [t + i, a])
                  )
                : o
          );
          return [n, s];
        })
      : e,
  XS = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const s = (o, i) => {
      n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map()));
    };
    return {
      get(o) {
        let i = n.get(o);
        if (i !== void 0) return i;
        if ((i = r.get(o)) !== void 0) return s(o, i), i;
      },
      set(o, i) {
        n.has(o) ? n.set(o, i) : s(o, i);
      }
    };
  },
  Ep = '!',
  ZS = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      s = t[0],
      o = t.length,
      i = (a) => {
        const l = [];
        let u = 0,
          c = 0,
          f;
        for (let b = 0; b < a.length; b++) {
          let _ = a[b];
          if (u === 0) {
            if (_ === s && (r || a.slice(b, b + o) === t)) {
              l.push(a.slice(c, b)), (c = b + o);
              continue;
            }
            if (_ === '/') {
              f = b;
              continue;
            }
          }
          _ === '[' ? u++ : _ === ']' && u--;
        }
        const d = l.length === 0 ? a : a.substring(c),
          p = d.startsWith(Ep),
          g = p ? d.substring(1) : d,
          y = f && f > c ? f - c : void 0;
        return {
          modifiers: l,
          hasImportantModifier: p,
          baseClassName: g,
          maybePostfixModifierPosition: y
        };
      };
    return n ? (a) => n({ className: a, parseClassName: i }) : i;
  },
  eC = (e) => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
      e.forEach((r) => {
        r[0] === '[' ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
      }),
      t.push(...n.sort()),
      t
    );
  },
  tC = (e) => ({ cache: XS(e.cacheSize), parseClassName: ZS(e), ...qS(e) }),
  nC = /\s+/,
  rC = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: s
      } = t,
      o = [],
      i = e.trim().split(nC);
    let a = '';
    for (let l = i.length - 1; l >= 0; l -= 1) {
      const u = i[l],
        {
          modifiers: c,
          hasImportantModifier: f,
          baseClassName: d,
          maybePostfixModifierPosition: p
        } = n(u);
      let g = !!p,
        y = r(g ? d.substring(0, p) : d);
      if (!y) {
        if (!g) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        if (((y = r(d)), !y)) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        g = !1;
      }
      const b = eC(c).join(':'),
        _ = f ? b + Ep : b,
        v = _ + y;
      if (o.includes(v)) continue;
      o.push(v);
      const h = s(y, g);
      for (let m = 0; m < h.length; ++m) {
        const x = h[m];
        o.push(_ + x);
      }
      a = u + (a.length > 0 ? ' ' + a : a);
    }
    return a;
  };
function sC() {
  let e = 0,
    t,
    n,
    r = '';
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Tp(t)) && (r && (r += ' '), (r += n));
  return r;
}
const Tp = (e) => {
  if (typeof e == 'string') return e;
  let t,
    n = '';
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Tp(e[r])) && (n && (n += ' '), (n += t));
  return n;
};
function na(e, ...t) {
  let n,
    r,
    s,
    o = i;
  function i(l) {
    const u = t.reduce((c, f) => f(c), e());
    return (n = tC(u)), (r = n.cache.get), (s = n.cache.set), (o = a), a(l);
  }
  function a(l) {
    const u = r(l);
    if (u) return u;
    const c = rC(l, n);
    return s(l, c), c;
  }
  return function () {
    return o(sC.apply(null, arguments));
  };
}
const Oe = (e) => {
    const t = (n) => n[e] || [];
    return (t.isThemeGetter = !0), t;
  },
  Ap = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  oC = /^\d+\/\d+$/,
  iC = new Set(['px', 'full', 'screen']),
  aC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  lC =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  cC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  uC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  fC =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Vt = (e) => tr(e) || iC.has(e) || oC.test(e),
  an = (e) => yr(e, 'length', bC),
  tr = (e) => !!e && !Number.isNaN(Number(e)),
  ei = (e) => yr(e, 'number', tr),
  Er = (e) => !!e && Number.isInteger(Number(e)),
  dC = (e) => e.endsWith('%') && tr(e.slice(0, -1)),
  ce = (e) => Ap.test(e),
  ln = (e) => aC.test(e),
  pC = new Set(['length', 'size', 'percentage']),
  hC = (e) => yr(e, pC, Pp),
  gC = (e) => yr(e, 'position', Pp),
  mC = new Set(['image', 'url']),
  yC = (e) => yr(e, mC, _C),
  vC = (e) => yr(e, '', wC),
  Tr = () => !0,
  yr = (e, t, n) => {
    const r = Ap.exec(e);
    return r
      ? r[1]
        ? typeof t == 'string'
          ? r[1] === t
          : t.has(r[1])
        : n(r[2])
      : !1;
  },
  bC = (e) => lC.test(e) && !cC.test(e),
  Pp = () => !1,
  wC = (e) => uC.test(e),
  _C = (e) => fC.test(e),
  ra = () => {
    const e = Oe('colors'),
      t = Oe('spacing'),
      n = Oe('blur'),
      r = Oe('brightness'),
      s = Oe('borderColor'),
      o = Oe('borderRadius'),
      i = Oe('borderSpacing'),
      a = Oe('borderWidth'),
      l = Oe('contrast'),
      u = Oe('grayscale'),
      c = Oe('hueRotate'),
      f = Oe('invert'),
      d = Oe('gap'),
      p = Oe('gradientColorStops'),
      g = Oe('gradientColorStopPositions'),
      y = Oe('inset'),
      b = Oe('margin'),
      _ = Oe('opacity'),
      v = Oe('padding'),
      h = Oe('saturate'),
      m = Oe('scale'),
      x = Oe('sepia'),
      C = Oe('skew'),
      P = Oe('space'),
      N = Oe('translate'),
      R = () => ['auto', 'contain', 'none'],
      A = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      D = () => ['auto', ce, t],
      k = () => [ce, t],
      M = () => ['', Vt, an],
      z = () => ['auto', tr, ce],
      Q = () => [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top'
      ],
      $ = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
      W = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity'
      ],
      B = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch'
      ],
      ae = () => ['', '0', ce],
      _e = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column'
      ],
      xe = () => [tr, ce];
    return {
      cacheSize: 500,
      separator: ':',
      theme: {
        colors: [Tr],
        spacing: [Vt, an],
        blur: ['none', '', ln, ce],
        brightness: xe(),
        borderColor: [e],
        borderRadius: ['none', '', 'full', ln, ce],
        borderSpacing: k(),
        borderWidth: M(),
        contrast: xe(),
        grayscale: ae(),
        hueRotate: xe(),
        invert: ae(),
        gap: k(),
        gradientColorStops: [e],
        gradientColorStopPositions: [dC, an],
        inset: D(),
        margin: D(),
        opacity: xe(),
        padding: k(),
        saturate: xe(),
        scale: xe(),
        sepia: ae(),
        skew: xe(),
        space: k(),
        translate: k()
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', 'video', ce] }],
        container: ['container'],
        columns: [{ columns: [ln] }],
        'break-after': [{ 'break-after': _e() }],
        'break-before': [{ 'break-before': _e() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden'
        ],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }
        ],
        'object-position': [{ object: [...Q(), ce] }],
        overflow: [{ overflow: A() }],
        'overflow-x': [{ 'overflow-x': A() }],
        'overflow-y': [{ 'overflow-y': A() }],
        overscroll: [{ overscroll: R() }],
        'overscroll-x': [{ 'overscroll-x': R() }],
        'overscroll-y': [{ 'overscroll-y': R() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: [y] }],
        'inset-x': [{ 'inset-x': [y] }],
        'inset-y': [{ 'inset-y': [y] }],
        start: [{ start: [y] }],
        end: [{ end: [y] }],
        top: [{ top: [y] }],
        right: [{ right: [y] }],
        bottom: [{ bottom: [y] }],
        left: [{ left: [y] }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: ['auto', Er, ce] }],
        basis: [{ basis: D() }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] }
        ],
        'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
        flex: [{ flex: ['1', 'auto', 'initial', 'none', ce] }],
        grow: [{ grow: ae() }],
        shrink: [{ shrink: ae() }],
        order: [{ order: ['first', 'last', 'none', Er, ce] }],
        'grid-cols': [{ 'grid-cols': [Tr] }],
        'col-start-end': [{ col: ['auto', { span: ['full', Er, ce] }, ce] }],
        'col-start': [{ 'col-start': z() }],
        'col-end': [{ 'col-end': z() }],
        'grid-rows': [{ 'grid-rows': [Tr] }],
        'row-start-end': [{ row: ['auto', { span: [Er, ce] }, ce] }],
        'row-start': [{ 'row-start': z() }],
        'row-end': [{ 'row-end': z() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }
        ],
        'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', ce] }],
        'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', ce] }],
        gap: [{ gap: [d] }],
        'gap-x': [{ 'gap-x': [d] }],
        'gap-y': [{ 'gap-y': [d] }],
        'justify-content': [{ justify: ['normal', ...B()] }],
        'justify-items': [
          { 'justify-items': ['start', 'end', 'center', 'stretch'] }
        ],
        'justify-self': [
          { 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }
        ],
        'align-content': [{ content: ['normal', ...B(), 'baseline'] }],
        'align-items': [
          { items: ['start', 'end', 'center', 'baseline', 'stretch'] }
        ],
        'align-self': [
          { self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }
        ],
        'place-content': [{ 'place-content': [...B(), 'baseline'] }],
        'place-items': [
          { 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }
        ],
        'place-self': [
          { 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }
        ],
        p: [{ p: [v] }],
        px: [{ px: [v] }],
        py: [{ py: [v] }],
        ps: [{ ps: [v] }],
        pe: [{ pe: [v] }],
        pt: [{ pt: [v] }],
        pr: [{ pr: [v] }],
        pb: [{ pb: [v] }],
        pl: [{ pl: [v] }],
        m: [{ m: [b] }],
        mx: [{ mx: [b] }],
        my: [{ my: [b] }],
        ms: [{ ms: [b] }],
        me: [{ me: [b] }],
        mt: [{ mt: [b] }],
        mr: [{ mr: [b] }],
        mb: [{ mb: [b] }],
        ml: [{ ml: [b] }],
        'space-x': [{ 'space-x': [P] }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': [P] }],
        'space-y-reverse': ['space-y-reverse'],
        w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', ce, t] }],
        'min-w': [{ 'min-w': [ce, t, 'min', 'max', 'fit'] }],
        'max-w': [
          {
            'max-w': [
              ce,
              t,
              'none',
              'full',
              'min',
              'max',
              'fit',
              'prose',
              { screen: [ln] },
              ln
            ]
          }
        ],
        h: [{ h: [ce, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'min-h': [
          { 'min-h': [ce, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }
        ],
        'max-h': [
          { 'max-h': [ce, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }
        ],
        size: [{ size: [ce, t, 'auto', 'min', 'max', 'fit'] }],
        'font-size': [{ text: ['base', ln, an] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [
          {
            font: [
              'thin',
              'extralight',
              'light',
              'normal',
              'medium',
              'semibold',
              'bold',
              'extrabold',
              'black',
              ei
            ]
          }
        ],
        'font-family': [{ font: [Tr] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
        tracking: [
          {
            tracking: [
              'tighter',
              'tight',
              'normal',
              'wide',
              'wider',
              'widest',
              ce
            ]
          }
        ],
        'line-clamp': [{ 'line-clamp': ['none', tr, ei] }],
        leading: [
          {
            leading: [
              'none',
              'tight',
              'snug',
              'normal',
              'relaxed',
              'loose',
              Vt,
              ce
            ]
          }
        ],
        'list-image': [{ 'list-image': ['none', ce] }],
        'list-style-type': [{ list: ['none', 'disc', 'decimal', ce] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [_] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] }
        ],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [_] }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline'
        ],
        'text-decoration-style': [{ decoration: [...$(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: ['auto', 'from-font', Vt, an] }
        ],
        'underline-offset': [{ 'underline-offset': ['auto', Vt, ce] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case'
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: k() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              ce
            ]
          }
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces'
            ]
          }
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', ce] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-opacity': [{ 'bg-opacity': [_] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...Q(), gC] }],
        'bg-repeat': [
          { bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }
        ],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', hC] }],
        'bg-image': [
          {
            bg: [
              'none',
              { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
              yC
            ]
          }
        ],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [g] }],
        'gradient-via-pos': [{ via: [g] }],
        'gradient-to-pos': [{ to: [g] }],
        'gradient-from': [{ from: [p] }],
        'gradient-via': [{ via: [p] }],
        'gradient-to': [{ to: [p] }],
        rounded: [{ rounded: [o] }],
        'rounded-s': [{ 'rounded-s': [o] }],
        'rounded-e': [{ 'rounded-e': [o] }],
        'rounded-t': [{ 'rounded-t': [o] }],
        'rounded-r': [{ 'rounded-r': [o] }],
        'rounded-b': [{ 'rounded-b': [o] }],
        'rounded-l': [{ 'rounded-l': [o] }],
        'rounded-ss': [{ 'rounded-ss': [o] }],
        'rounded-se': [{ 'rounded-se': [o] }],
        'rounded-ee': [{ 'rounded-ee': [o] }],
        'rounded-es': [{ 'rounded-es': [o] }],
        'rounded-tl': [{ 'rounded-tl': [o] }],
        'rounded-tr': [{ 'rounded-tr': [o] }],
        'rounded-br': [{ 'rounded-br': [o] }],
        'rounded-bl': [{ 'rounded-bl': [o] }],
        'border-w': [{ border: [a] }],
        'border-w-x': [{ 'border-x': [a] }],
        'border-w-y': [{ 'border-y': [a] }],
        'border-w-s': [{ 'border-s': [a] }],
        'border-w-e': [{ 'border-e': [a] }],
        'border-w-t': [{ 'border-t': [a] }],
        'border-w-r': [{ 'border-r': [a] }],
        'border-w-b': [{ 'border-b': [a] }],
        'border-w-l': [{ 'border-l': [a] }],
        'border-opacity': [{ 'border-opacity': [_] }],
        'border-style': [{ border: [...$(), 'hidden'] }],
        'divide-x': [{ 'divide-x': [a] }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': [a] }],
        'divide-y-reverse': ['divide-y-reverse'],
        'divide-opacity': [{ 'divide-opacity': [_] }],
        'divide-style': [{ divide: $() }],
        'border-color': [{ border: [s] }],
        'border-color-x': [{ 'border-x': [s] }],
        'border-color-y': [{ 'border-y': [s] }],
        'border-color-s': [{ 'border-s': [s] }],
        'border-color-e': [{ 'border-e': [s] }],
        'border-color-t': [{ 'border-t': [s] }],
        'border-color-r': [{ 'border-r': [s] }],
        'border-color-b': [{ 'border-b': [s] }],
        'border-color-l': [{ 'border-l': [s] }],
        'divide-color': [{ divide: [s] }],
        'outline-style': [{ outline: ['', ...$()] }],
        'outline-offset': [{ 'outline-offset': [Vt, ce] }],
        'outline-w': [{ outline: [Vt, an] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: M() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [_] }],
        'ring-offset-w': [{ 'ring-offset': [Vt, an] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: ['', 'inner', 'none', ln, vC] }],
        'shadow-color': [{ shadow: [Tr] }],
        opacity: [{ opacity: [_] }],
        'mix-blend': [{ 'mix-blend': [...W(), 'plus-lighter', 'plus-darker'] }],
        'bg-blend': [{ 'bg-blend': W() }],
        filter: [{ filter: ['', 'none'] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [l] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', ln, ce] }],
        grayscale: [{ grayscale: [u] }],
        'hue-rotate': [{ 'hue-rotate': [c] }],
        invert: [{ invert: [f] }],
        saturate: [{ saturate: [h] }],
        sepia: [{ sepia: [x] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
        'backdrop-blur': [{ 'backdrop-blur': [n] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [l] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [u] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [c] }],
        'backdrop-invert': [{ 'backdrop-invert': [f] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [_] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [h] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [x] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': [i] }],
        'border-spacing-x': [{ 'border-spacing-x': [i] }],
        'border-spacing-y': [{ 'border-spacing-y': [i] }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              'none',
              'all',
              '',
              'colors',
              'opacity',
              'shadow',
              'transform',
              ce
            ]
          }
        ],
        duration: [{ duration: xe() }],
        ease: [{ ease: ['linear', 'in', 'out', 'in-out', ce] }],
        delay: [{ delay: xe() }],
        animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', ce] }],
        transform: [{ transform: ['', 'gpu', 'none'] }],
        scale: [{ scale: [m] }],
        'scale-x': [{ 'scale-x': [m] }],
        'scale-y': [{ 'scale-y': [m] }],
        rotate: [{ rotate: [Er, ce] }],
        'translate-x': [{ 'translate-x': [N] }],
        'translate-y': [{ 'translate-y': [N] }],
        'skew-x': [{ 'skew-x': [C] }],
        'skew-y': [{ 'skew-y': [C] }],
        'transform-origin': [
          {
            origin: [
              'center',
              'top',
              'top-right',
              'right',
              'bottom-right',
              'bottom',
              'bottom-left',
              'left',
              'top-left',
              ce
            ]
          }
        ],
        accent: [{ accent: ['auto', e] }],
        appearance: [{ appearance: ['none', 'auto'] }],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              ce
            ]
          }
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
        resize: [{ resize: ['none', 'y', 'x', ''] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': k() }],
        'scroll-mx': [{ 'scroll-mx': k() }],
        'scroll-my': [{ 'scroll-my': k() }],
        'scroll-ms': [{ 'scroll-ms': k() }],
        'scroll-me': [{ 'scroll-me': k() }],
        'scroll-mt': [{ 'scroll-mt': k() }],
        'scroll-mr': [{ 'scroll-mr': k() }],
        'scroll-mb': [{ 'scroll-mb': k() }],
        'scroll-ml': [{ 'scroll-ml': k() }],
        'scroll-p': [{ 'scroll-p': k() }],
        'scroll-px': [{ 'scroll-px': k() }],
        'scroll-py': [{ 'scroll-py': k() }],
        'scroll-ps': [{ 'scroll-ps': k() }],
        'scroll-pe': [{ 'scroll-pe': k() }],
        'scroll-pt': [{ 'scroll-pt': k() }],
        'scroll-pr': [{ 'scroll-pr': k() }],
        'scroll-pb': [{ 'scroll-pb': k() }],
        'scroll-pl': [{ 'scroll-pl': k() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', ce] }
        ],
        fill: [{ fill: [e, 'none'] }],
        'stroke-w': [{ stroke: [Vt, an, ei] }],
        stroke: [{ stroke: [e, 'none'] }],
        sr: ['sr-only', 'not-sr-only'],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }]
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left'
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction'
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl'
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l'
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l'
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml'
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl'
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch']
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] }
    };
  },
  xC = (
    e,
    {
      cacheSize: t,
      prefix: n,
      separator: r,
      experimentalParseClassName: s,
      extend: o = {},
      override: i = {}
    }
  ) => {
    Or(e, 'cacheSize', t),
      Or(e, 'prefix', n),
      Or(e, 'separator', r),
      Or(e, 'experimentalParseClassName', s);
    for (const a in i) SC(e[a], i[a]);
    for (const a in o) CC(e[a], o[a]);
    return e;
  },
  Or = (e, t, n) => {
    n !== void 0 && (e[t] = n);
  },
  SC = (e, t) => {
    if (t) for (const n in t) Or(e, n, t[n]);
  },
  CC = (e, t) => {
    if (t)
      for (const n in t) {
        const r = t[n];
        r !== void 0 && (e[n] = (e[n] || []).concat(r));
      }
  },
  kC = (e, ...t) =>
    typeof e == 'function' ? na(ra, e, ...t) : na(() => xC(ra(), e), ...t),
  EC = na(ra);
var TC = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
  Rp = (e) => e || void 0,
  Xr = (...e) => Rp(xp(e).filter(Boolean).join(' ')),
  ti = null,
  Kt = {},
  sa = !1,
  Ar =
    (...e) =>
    (t) =>
      t.twMerge
        ? ((!ti || sa) &&
            ((sa = !1),
            (ti = nt(Kt)
              ? EC
              : kC({
                  ...Kt,
                  extend: {
                    theme: Kt.theme,
                    classGroups: Kt.classGroups,
                    conflictingClassGroupModifiers:
                      Kt.conflictingClassGroupModifiers,
                    conflictingClassGroups: Kt.conflictingClassGroups,
                    ...Kt.extend
                  }
                }))),
          Rp(ti(Xr(e))))
        : Xr(e),
  Gc = (e, t) => {
    for (let n in t)
      e.hasOwnProperty(n) ? (e[n] = Xr(e[n], t[n])) : (e[n] = t[n]);
    return e;
  },
  Ot = (e, t) => {
    let {
        extend: n = null,
        slots: r = {},
        variants: s = {},
        compoundVariants: o = [],
        compoundSlots: i = [],
        defaultVariants: a = {}
      } = e,
      l = { ...TC, ...t },
      u =
        n != null && n.base
          ? Xr(n.base, e == null ? void 0 : e.base)
          : e == null
            ? void 0
            : e.base,
      c = n != null && n.variants && !nt(n.variants) ? Cp(s, n.variants) : s,
      f =
        n != null && n.defaultVariants && !nt(n.defaultVariants)
          ? { ...n.defaultVariants, ...a }
          : a;
    !nt(l.twMergeConfig) &&
      !KS(l.twMergeConfig, Kt) &&
      ((sa = !0), (Kt = l.twMergeConfig));
    let d = nt(n == null ? void 0 : n.slots),
      p = nt(r)
        ? {}
        : {
            base: Xr(
              e == null ? void 0 : e.base,
              d && (n == null ? void 0 : n.base)
            ),
            ...r
          },
      g = d
        ? p
        : Gc(
            { ...(n == null ? void 0 : n.slots) },
            nt(p) ? { base: e == null ? void 0 : e.base } : p
          ),
      y = nt(n == null ? void 0 : n.compoundVariants)
        ? o
        : Sp(n == null ? void 0 : n.compoundVariants, o),
      b = (v) => {
        if (nt(c) && nt(r) && d)
          return Ar(
            u,
            v == null ? void 0 : v.class,
            v == null ? void 0 : v.className
          )(l);
        if (y && !Array.isArray(y))
          throw new TypeError(
            `The "compoundVariants" prop must be an array. Received: ${typeof y}`
          );
        if (i && !Array.isArray(i))
          throw new TypeError(
            `The "compoundSlots" prop must be an array. Received: ${typeof i}`
          );
        let h = (k, M, z = [], Q) => {
            let $ = z;
            if (typeof M == 'string')
              $ = $.concat(
                Wc(M)
                  .split(' ')
                  .map((W) => `${k}:${W}`)
              );
            else if (Array.isArray(M))
              $ = $.concat(M.reduce((W, B) => W.concat(`${k}:${B}`), []));
            else if (typeof M == 'object' && typeof Q == 'string') {
              for (let W in M)
                if (M.hasOwnProperty(W) && W === Q) {
                  let B = M[W];
                  if (B && typeof B == 'string') {
                    let ae = Wc(B);
                    $[Q]
                      ? ($[Q] = $[Q].concat(
                          ae.split(' ').map((_e) => `${k}:${_e}`)
                        ))
                      : ($[Q] = ae.split(' ').map((_e) => `${k}:${_e}`));
                  } else
                    Array.isArray(B) &&
                      B.length > 0 &&
                      ($[Q] = B.reduce(
                        (ae, _e) => ae.concat(`${k}:${_e}`),
                        []
                      ));
                }
            }
            return $;
          },
          m = (k, M = c, z = null, Q = null) => {
            var $;
            let W = M[k];
            if (!W || nt(W)) return null;
            let B =
              ($ = Q == null ? void 0 : Q[k]) != null
                ? $
                : v == null
                  ? void 0
                  : v[k];
            if (B === null) return null;
            let ae = Vc(B),
              _e =
                (Array.isArray(l.responsiveVariants) &&
                  l.responsiveVariants.length > 0) ||
                l.responsiveVariants === !0,
              xe = f == null ? void 0 : f[k],
              Se = [];
            if (typeof ae == 'object' && _e)
              for (let [rn, Je] of Object.entries(ae)) {
                let I = W[Je];
                if (rn === 'initial') {
                  xe = Je;
                  continue;
                }
                (Array.isArray(l.responsiveVariants) &&
                  !l.responsiveVariants.includes(rn)) ||
                  (Se = h(rn, I, Se, z));
              }
            let wt = ae != null && typeof ae != 'object' ? ae : Vc(xe),
              It = W[wt || 'false'];
            return typeof Se == 'object' && typeof z == 'string' && Se[z]
              ? Gc(Se, It)
              : Se.length > 0
                ? (Se.push(It), z === 'base' ? Se.join(' ') : Se)
                : It;
          },
          x = () => (c ? Object.keys(c).map((k) => m(k, c)) : null),
          C = (k, M) => {
            if (!c || typeof c != 'object') return null;
            let z = new Array();
            for (let Q in c) {
              let $ = m(Q, c, k, M),
                W = k === 'base' && typeof $ == 'string' ? $ : $ && $[k];
              W && (z[z.length] = W);
            }
            return z;
          },
          P = {};
        for (let k in v) v[k] !== void 0 && (P[k] = v[k]);
        let N = (k, M) => {
            var z;
            let Q =
              typeof (v == null ? void 0 : v[k]) == 'object'
                ? { [k]: (z = v[k]) == null ? void 0 : z.initial }
                : {};
            return { ...f, ...P, ...Q, ...M };
          },
          R = (k = [], M) => {
            let z = [];
            for (let { class: Q, className: $, ...W } of k) {
              let B = !0;
              for (let [ae, _e] of Object.entries(W)) {
                let xe = N(ae, M)[ae];
                if (Array.isArray(_e)) {
                  if (!_e.includes(xe)) {
                    B = !1;
                    break;
                  }
                } else {
                  let Se = (wt) => wt == null || wt === !1;
                  if (Se(_e) && Se(xe)) continue;
                  if (xe !== _e) {
                    B = !1;
                    break;
                  }
                }
              }
              B && (Q && z.push(Q), $ && z.push($));
            }
            return z;
          },
          A = (k) => {
            let M = R(y, k);
            if (!Array.isArray(M)) return M;
            let z = {};
            for (let Q of M)
              if (
                (typeof Q == 'string' && (z.base = Ar(z.base, Q)(l)),
                typeof Q == 'object')
              )
                for (let [$, W] of Object.entries(Q)) z[$] = Ar(z[$], W)(l);
            return z;
          },
          D = (k) => {
            if (i.length < 1) return null;
            let M = {};
            for (let { slots: z = [], class: Q, className: $, ...W } of i) {
              if (!nt(W)) {
                let B = !0;
                for (let ae of Object.keys(W)) {
                  let _e = N(ae, k)[ae];
                  if (
                    _e === void 0 ||
                    (Array.isArray(W[ae]) ? !W[ae].includes(_e) : W[ae] !== _e)
                  ) {
                    B = !1;
                    break;
                  }
                }
                if (!B) continue;
              }
              for (let B of z) (M[B] = M[B] || []), M[B].push([Q, $]);
            }
            return M;
          };
        if (!nt(r) || !d) {
          let k = {};
          if (typeof g == 'object' && !nt(g))
            for (let M of Object.keys(g))
              k[M] = (z) => {
                var Q, $;
                return Ar(
                  g[M],
                  C(M, z),
                  ((Q = A(z)) != null ? Q : [])[M],
                  (($ = D(z)) != null ? $ : [])[M],
                  z == null ? void 0 : z.class,
                  z == null ? void 0 : z.className
                )(l);
              };
          return k;
        }
        return Ar(
          u,
          x(),
          R(y),
          v == null ? void 0 : v.class,
          v == null ? void 0 : v.className
        )(l);
      },
      _ = () => {
        if (!(!c || typeof c != 'object')) return Object.keys(c);
      };
    return (
      (b.variantKeys = _()),
      (b.extend = n),
      (b.base = u),
      (b.slots = g),
      (b.variants = c),
      (b.defaultVariants = f),
      (b.compoundSlots = i),
      (b.compoundVariants = y),
      b
    );
  };
const AC = {
    slots: {
      root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-[var(--ui-bg-elevated)]',
      image: 'h-full w-full rounded-[inherit] object-cover',
      fallback: 'font-medium leading-none text-[var(--ui-text-muted)] truncate',
      icon: 'text-[var(--ui-text-muted)] shrink-0'
    },
    variants: {
      size: {
        '3xs': { root: 'size-4 text-[8px]' },
        '2xs': { root: 'size-5 text-[10px]' },
        xs: { root: 'size-6 text-xs' },
        sm: { root: 'size-7 text-sm' },
        md: { root: 'size-8 text-base' },
        lg: { root: 'size-9 text-lg' },
        xl: { root: 'size-10 text-xl' },
        '2xl': { root: 'size-11 text-[22px]' },
        '3xl': { root: 'size-12 text-2xl' }
      }
    },
    defaultVariants: { size: 'md' }
  },
  PC = dr;
var Yc;
const RC = Ot({
    extend: Ot(AC),
    ...(((Yc = PC.ui) == null ? void 0 : Yc.avatar) || {})
  }),
  Op = re({
    inheritAttrs: !1,
    __name: 'Avatar',
    props: {
      as: { default: 'span' },
      src: {},
      alt: {},
      icon: {},
      text: {},
      size: {},
      class: {},
      ui: {},
      delayMs: {}
    },
    setup(e) {
      const t = e,
        n = Bn(gr(t, 'delayMs')),
        r = F(
          () =>
            t.text ||
            (t.alt || '')
              .split(' ')
              .map((a) => a.charAt(0))
              .join('')
              .substring(0, 2)
        ),
        { size: s } = kS(t),
        o = F(() => RC({ size: s.value })),
        i = F(
          () =>
            ({
              '3xs': 16,
              '2xs': 20,
              xs: 24,
              sm: 28,
              md: 32,
              lg: 36,
              xl: 40,
              '2xl': 44,
              '3xl': 48
            })[t.size || 'md']
        );
      return (a, l) => {
        var u;
        return (
          G(),
          ee(
            E(xx),
            {
              as: a.as,
              class: Ue(
                o.value.root({
                  class: [t.class, (u = t.ui) == null ? void 0 : u.root]
                })
              )
            },
            {
              default: ie(() => {
                var c;
                return [
                  a.src
                    ? (G(),
                      ee(
                        E(kx),
                        we(
                          {
                            key: 0,
                            as: E(WS),
                            src: a.src,
                            alt: a.alt,
                            width: i.value,
                            height: i.value
                          },
                          a.$attrs,
                          {
                            class: o.value.image({
                              class: (c = t.ui) == null ? void 0 : c.image
                            })
                          }
                        ),
                        null,
                        16,
                        ['as', 'src', 'alt', 'width', 'height', 'class']
                      ))
                    : Le('', !0),
                  ue(
                    E(Sx),
                    we({ 'as-child': '' }, E(n)),
                    {
                      default: ie(() => [
                        fe(a.$slots, 'default', {}, () => {
                          var f, d;
                          return [
                            a.icon
                              ? (G(),
                                ee(
                                  lo,
                                  {
                                    key: 0,
                                    name: a.icon,
                                    class: Ue(
                                      o.value.icon({
                                        class:
                                          (f = t.ui) == null ? void 0 : f.icon
                                      })
                                    )
                                  },
                                  null,
                                  8,
                                  ['name', 'class']
                                ))
                              : (G(),
                                ut(
                                  'span',
                                  {
                                    key: 1,
                                    class: Ue(
                                      o.value.fallback({
                                        class:
                                          (d = t.ui) == null
                                            ? void 0
                                            : d.fallback
                                      })
                                    )
                                  },
                                  Yt(r.value),
                                  3
                                ))
                          ];
                        })
                      ]),
                      _: 3
                    },
                    16
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
function OC(e) {
  const t = Sn(),
    n = F(() => ze(e)),
    r = F(
      () =>
        (n.value.icon && n.value.leading) ||
        (n.value.icon && !n.value.trailing) ||
        (n.value.loading && !n.value.trailing) ||
        !!n.value.leadingIcon
    ),
    s = F(
      () =>
        (n.value.icon && n.value.trailing) ||
        (n.value.loading && n.value.trailing) ||
        !!n.value.trailingIcon
    ),
    o = F(() =>
      n.value.loading
        ? n.value.loadingIcon || t.ui.icons.loading
        : n.value.leadingIcon || n.value.icon
    ),
    i = F(() =>
      n.value.loading && !r.value
        ? n.value.loadingIcon || t.ui.icons.loading
        : n.value.trailingIcon || n.value.icon
    );
  return {
    isLeading: r,
    isTrailing: s,
    leadingIconName: o,
    trailingIconName: i
  };
}
const IC = Symbol('nuxt-ui.button-group');
function $C(e) {
  const t = Ae(IC, void 0);
  return {
    orientation: F(() => (t == null ? void 0 : t.value.orientation)),
    size: F(
      () => (e == null ? void 0 : e.size) ?? (t == null ? void 0 : t.value.size)
    )
  };
}
const MC = Symbol('nuxt-ui.form-loading');
function LC(e) {
  return gr(
    e,
    'active',
    'activeClass',
    'ariaCurrentValue',
    'ariaLabel',
    'as',
    'disabled',
    'exact',
    'exactActiveClass',
    'exactHash',
    'exactQuery',
    'external',
    'href',
    'inactiveClass',
    'noPrefetch',
    'noRel',
    'prefetch',
    'prefetchedClass',
    'rel',
    'replace',
    'target',
    'to',
    'type',
    'title'
  );
}
const NC = re({
    __name: 'LinkBase',
    props: {
      as: { default: 'button' },
      type: { default: 'button' },
      disabled: { type: Boolean },
      onClick: {},
      href: {},
      navigate: {},
      rel: {},
      target: {},
      isExternal: { type: Boolean }
    },
    setup(e) {
      const t = e;
      function n(r) {
        if (t.disabled) {
          r.stopPropagation(), r.preventDefault();
          return;
        }
        if (t.onClick)
          for (const s of Array.isArray(t.onClick) ? t.onClick : [t.onClick])
            s(r);
        t.href && t.navigate && !t.isExternal && t.navigate(r);
      }
      return (r, s) => (
        G(),
        ee(
          E(pt),
          we(
            r.href
              ? {
                  as: 'a',
                  href: r.disabled ? void 0 : r.href,
                  'aria-disabled': r.disabled ? 'true' : void 0,
                  role: r.disabled ? 'link' : void 0,
                  tabindex: r.disabled ? -1 : void 0
                }
              : r.as === 'button'
                ? { as: r.as, type: r.type, disabled: r.disabled }
                : { as: r.as },
            { rel: r.rel, target: r.target, onClick: n }
          ),
          { default: ie(() => [fe(r.$slots, 'default')]), _: 3 },
          16,
          ['rel', 'target']
        )
      );
    }
  }),
  jC = {
    base: 'focus-visible:outline-[var(--ui-primary)]',
    variants: {
      active: {
        true: 'text-[var(--ui-primary)]',
        false: [
          'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]',
          'transition-colors'
        ]
      },
      disabled: { true: 'cursor-not-allowed opacity-75' }
    }
  },
  HC = dr;
var Xc;
const FC = Ot({
    extend: Ot(jC),
    ...(((Xc = HC.ui) == null ? void 0 : Xc.link) || {})
  }),
  DC = re({
    inheritAttrs: !1,
    __name: 'Link',
    props: {
      as: { default: 'button' },
      type: { default: 'button' },
      disabled: { type: Boolean },
      active: { type: Boolean, default: void 0 },
      exact: { type: Boolean },
      exactQuery: { type: [Boolean, String] },
      exactHash: { type: Boolean },
      inactiveClass: { default: '' },
      custom: { type: Boolean },
      raw: { type: Boolean },
      class: {},
      to: {},
      href: {},
      external: { type: Boolean },
      target: {},
      rel: {},
      noRel: { type: Boolean },
      prefetchedClass: {},
      prefetch: { type: Boolean },
      prefetchOn: {},
      noPrefetch: { type: Boolean },
      activeClass: { default: '' },
      exactActiveClass: {},
      ariaCurrentValue: {},
      viewTransition: { type: Boolean },
      replace: { type: Boolean }
    },
    setup(e) {
      const t = e,
        n = fr(),
        r = Bn(
          m_(
            t,
            'as',
            'type',
            'disabled',
            'active',
            'exact',
            'exactQuery',
            'exactHash',
            'activeClass',
            'inactiveClass',
            'raw',
            'class'
          )
        ),
        s = F(() =>
          Ot({
            extend: FC,
            variants: {
              active: { true: t.activeClass, false: t.inactiveClass }
            }
          })
        );
      function o(l, u) {
        const c = ww(l, u).reduce(
          (f, d) => (d.type === 'added' && f.push(d.key), f),
          []
        );
        return xc(l, u, { excludeKeys: (f) => c.includes(f) });
      }
      function i({ route: l, isActive: u, isExactActive: c }) {
        if (t.active !== void 0) return t.active;
        if (t.exactQuery === 'partial') {
          if (!o(l.query, n.query)) return !1;
        } else if (t.exactQuery === !0 && !xc(l.query, n.query)) return !1;
        return t.exactHash && l.hash !== n.hash
          ? !1
          : !!((t.exact && c) || (!t.exact && u));
      }
      function a({ route: l, isActive: u, isExactActive: c }) {
        const f = i({ route: l, isActive: u, isExactActive: c });
        return t.raw
          ? [t.class, f ? t.activeClass : t.inactiveClass]
          : s.value({ class: t.class, active: f, disabled: t.disabled });
      }
      return (l, u) => {
        const c = Cw;
        return (
          G(),
          ee(
            c,
            we(E(r), { custom: '' }),
            {
              default: ie(
                ({
                  href: f,
                  navigate: d,
                  route: p,
                  rel: g,
                  target: y,
                  isExternal: b,
                  isActive: _,
                  isExactActive: v
                }) => [
                  l.custom
                    ? fe(
                        l.$slots,
                        'default',
                        yn(
                          we(
                            { key: 0 },
                            {
                              ...l.$attrs,
                              as: l.as,
                              type: l.type,
                              disabled: l.disabled,
                              href: f,
                              navigate: d,
                              rel: g,
                              target: y,
                              isExternal: b,
                              active: i({
                                route: p,
                                isActive: _,
                                isExactActive: v
                              })
                            }
                          )
                        )
                      )
                    : (G(),
                      ee(
                        NC,
                        we(
                          { key: 1 },
                          {
                            ...l.$attrs,
                            as: l.as,
                            type: l.type,
                            disabled: l.disabled,
                            href: f,
                            navigate: d,
                            rel: g,
                            target: y,
                            isExternal: b
                          },
                          {
                            class: a({
                              route: p,
                              isActive: _,
                              isExactActive: v
                            })
                          }
                        ),
                        {
                          default: ie(() => [
                            fe(l.$slots, 'default', {
                              active: i({
                                route: p,
                                isActive: _,
                                isExactActive: v
                              })
                            })
                          ]),
                          _: 2
                        },
                        1040,
                        ['class']
                      ))
                ]
              ),
              _: 3
            },
            16
          )
        );
      };
    }
  }),
  BC = {
    slots: {
      base: [
        'rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
        'transition-colors'
      ],
      label: 'truncate',
      leadingIcon: 'shrink-0',
      leadingAvatar: 'shrink-0',
      leadingAvatarSize: '',
      trailingIcon: 'shrink-0'
    },
    variants: {
      buttonGroup: {
        horizontal:
          'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none',
        vertical:
          'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none'
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
        neutral: ''
      },
      variant: {
        solid: '',
        outline: '',
        soft: '',
        subtle: '',
        ghost: '',
        link: ''
      },
      size: {
        xs: {
          base: 'px-2 py-1 text-xs gap-1',
          leadingIcon: 'size-4',
          leadingAvatarSize: '3xs',
          trailingIcon: 'size-4'
        },
        sm: {
          base: 'px-2.5 py-1.5 text-xs gap-1.5',
          leadingIcon: 'size-4',
          leadingAvatarSize: '3xs',
          trailingIcon: 'size-4'
        },
        md: {
          base: 'px-2.5 py-1.5 text-sm gap-1.5',
          leadingIcon: 'size-5',
          leadingAvatarSize: '2xs',
          trailingIcon: 'size-5'
        },
        lg: {
          base: 'px-3 py-2 text-sm gap-2',
          leadingIcon: 'size-5',
          leadingAvatarSize: '2xs',
          trailingIcon: 'size-5'
        },
        xl: {
          base: 'px-3 py-2 text-base gap-2',
          leadingIcon: 'size-6',
          leadingAvatarSize: 'xs',
          trailingIcon: 'size-6'
        }
      },
      block: {
        true: {
          base: 'w-full justify-center',
          leadingAvatarSize: 'xs',
          trailingIcon: 'ms-auto'
        }
      },
      square: { true: '' },
      leading: { true: '' },
      trailing: { true: '' },
      loading: { true: '' }
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/75 disabled:bg-[var(--ui-primary)] aria-disabled:bg-[var(--ui-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]'
      },
      {
        color: 'secondary',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/75 disabled:bg-[var(--ui-secondary)] aria-disabled:bg-[var(--ui-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-secondary)]'
      },
      {
        color: 'success',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-success)] hover:bg-[var(--ui-success)]/75 disabled:bg-[var(--ui-success)] aria-disabled:bg-[var(--ui-success)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-success)]'
      },
      {
        color: 'info',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-info)] hover:bg-[var(--ui-info)]/75 disabled:bg-[var(--ui-info)] aria-disabled:bg-[var(--ui-info)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-info)]'
      },
      {
        color: 'warning',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/75 disabled:bg-[var(--ui-warning)] aria-disabled:bg-[var(--ui-warning)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-warning)]'
      },
      {
        color: 'error',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-error)] hover:bg-[var(--ui-error)]/75 disabled:bg-[var(--ui-error)] aria-disabled:bg-[var(--ui-error)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-error)]'
      },
      {
        color: 'primary',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-primary)]/50 text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-primary)]'
      },
      {
        color: 'secondary',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-secondary)]/50 text-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-secondary)]'
      },
      {
        color: 'success',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-success)]/50 text-[var(--ui-success)] hover:bg-[var(--ui-success)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-success)]'
      },
      {
        color: 'info',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-info)]/50 text-[var(--ui-info)] hover:bg-[var(--ui-info)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-info)]'
      },
      {
        color: 'warning',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-warning)]/50 text-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-warning)]'
      },
      {
        color: 'error',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-error)]/50 text-[var(--ui-error)] hover:bg-[var(--ui-error)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-error)]'
      },
      {
        color: 'primary',
        variant: 'soft',
        class:
          'text-[var(--ui-primary)] bg-[var(--ui-primary)]/10 hover:bg-[var(--ui-primary)]/15 focus-visible:bg-[var(--ui-primary)]/15 disabled:bg-[var(--ui-primary)]/10 aria-disabled:bg-[var(--ui-primary)]/10'
      },
      {
        color: 'secondary',
        variant: 'soft',
        class:
          'text-[var(--ui-secondary)] bg-[var(--ui-secondary)]/10 hover:bg-[var(--ui-secondary)]/15 focus-visible:bg-[var(--ui-secondary)]/15 disabled:bg-[var(--ui-secondary)]/10 aria-disabled:bg-[var(--ui-secondary)]/10'
      },
      {
        color: 'success',
        variant: 'soft',
        class:
          'text-[var(--ui-success)] bg-[var(--ui-success)]/10 hover:bg-[var(--ui-success)]/15 focus-visible:bg-[var(--ui-success)]/15 disabled:bg-[var(--ui-success)]/10 aria-disabled:bg-[var(--ui-success)]/10'
      },
      {
        color: 'info',
        variant: 'soft',
        class:
          'text-[var(--ui-info)] bg-[var(--ui-info)]/10 hover:bg-[var(--ui-info)]/15 focus-visible:bg-[var(--ui-info)]/15 disabled:bg-[var(--ui-info)]/10 aria-disabled:bg-[var(--ui-info)]/10'
      },
      {
        color: 'warning',
        variant: 'soft',
        class:
          'text-[var(--ui-warning)] bg-[var(--ui-warning)]/10 hover:bg-[var(--ui-warning)]/15 focus-visible:bg-[var(--ui-warning)]/15 disabled:bg-[var(--ui-warning)]/10 aria-disabled:bg-[var(--ui-warning)]/10'
      },
      {
        color: 'error',
        variant: 'soft',
        class:
          'text-[var(--ui-error)] bg-[var(--ui-error)]/10 hover:bg-[var(--ui-error)]/15 focus-visible:bg-[var(--ui-error)]/15 disabled:bg-[var(--ui-error)]/10 aria-disabled:bg-[var(--ui-error)]/10'
      },
      {
        color: 'primary',
        variant: 'subtle',
        class:
          'text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25 bg-[var(--ui-primary)]/10 hover:bg-[var(--ui-primary)]/15 disabled:bg-[var(--ui-primary)]/10 aria-disabled:bg-[var(--ui-primary)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-primary)]'
      },
      {
        color: 'secondary',
        variant: 'subtle',
        class:
          'text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25 bg-[var(--ui-secondary)]/10 hover:bg-[var(--ui-secondary)]/15 disabled:bg-[var(--ui-secondary)]/10 aria-disabled:bg-[var(--ui-secondary)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-secondary)]'
      },
      {
        color: 'success',
        variant: 'subtle',
        class:
          'text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25 bg-[var(--ui-success)]/10 hover:bg-[var(--ui-success)]/15 disabled:bg-[var(--ui-success)]/10 aria-disabled:bg-[var(--ui-success)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-success)]'
      },
      {
        color: 'info',
        variant: 'subtle',
        class:
          'text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25 bg-[var(--ui-info)]/10 hover:bg-[var(--ui-info)]/15 disabled:bg-[var(--ui-info)]/10 aria-disabled:bg-[var(--ui-info)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-info)]'
      },
      {
        color: 'warning',
        variant: 'subtle',
        class:
          'text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25 bg-[var(--ui-warning)]/10 hover:bg-[var(--ui-warning)]/15 disabled:bg-[var(--ui-warning)]/10 aria-disabled:bg-[var(--ui-warning)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-warning)]'
      },
      {
        color: 'error',
        variant: 'subtle',
        class:
          'text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25 bg-[var(--ui-error)]/10 hover:bg-[var(--ui-error)]/15 disabled:bg-[var(--ui-error)]/10 aria-disabled:bg-[var(--ui-error)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-error)]'
      },
      {
        color: 'primary',
        variant: 'ghost',
        class:
          'text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 focus-visible:bg-[var(--ui-primary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'secondary',
        variant: 'ghost',
        class:
          'text-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/10 focus-visible:bg-[var(--ui-secondary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'success',
        variant: 'ghost',
        class:
          'text-[var(--ui-success)] hover:bg-[var(--ui-success)]/10 focus-visible:bg-[var(--ui-success)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'info',
        variant: 'ghost',
        class:
          'text-[var(--ui-info)] hover:bg-[var(--ui-info)]/10 focus-visible:bg-[var(--ui-info)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'warning',
        variant: 'ghost',
        class:
          'text-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/10 focus-visible:bg-[var(--ui-warning)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'error',
        variant: 'ghost',
        class:
          'text-[var(--ui-error)] hover:bg-[var(--ui-error)]/10 focus-visible:bg-[var(--ui-error)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
      },
      {
        color: 'primary',
        variant: 'link',
        class:
          'text-[var(--ui-primary)] hover:text-[var(--ui-primary)]/75 disabled:text-[var(--ui-primary)] aria-disabled:text-[var(--ui-primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)]'
      },
      {
        color: 'secondary',
        variant: 'link',
        class:
          'text-[var(--ui-secondary)] hover:text-[var(--ui-secondary)]/75 disabled:text-[var(--ui-secondary)] aria-disabled:text-[var(--ui-secondary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-secondary)]'
      },
      {
        color: 'success',
        variant: 'link',
        class:
          'text-[var(--ui-success)] hover:text-[var(--ui-success)]/75 disabled:text-[var(--ui-success)] aria-disabled:text-[var(--ui-success)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-success)]'
      },
      {
        color: 'info',
        variant: 'link',
        class:
          'text-[var(--ui-info)] hover:text-[var(--ui-info)]/75 disabled:text-[var(--ui-info)] aria-disabled:text-[var(--ui-info)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-info)]'
      },
      {
        color: 'warning',
        variant: 'link',
        class:
          'text-[var(--ui-warning)] hover:text-[var(--ui-warning)]/75 disabled:text-[var(--ui-warning)] aria-disabled:text-[var(--ui-warning)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-warning)]'
      },
      {
        color: 'error',
        variant: 'link',
        class:
          'text-[var(--ui-error)] hover:text-[var(--ui-error)]/75 disabled:text-[var(--ui-error)] aria-disabled:text-[var(--ui-error)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-error)]'
      },
      {
        color: 'neutral',
        variant: 'solid',
        class:
          'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)] hover:bg-[var(--ui-bg-inverted)]/90 disabled:bg-[var(--ui-bg-inverted)] aria-disabled:bg-[var(--ui-bg-inverted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-border-inverted)]'
      },
      {
        color: 'neutral',
        variant: 'outline',
        class:
          'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-elevated)] disabled:bg-[var(--ui-bg)] aria-disabled:bg-[var(--ui-bg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]'
      },
      {
        color: 'neutral',
        variant: 'soft',
        class:
          'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-accented)]/75 focus-visible:bg-[var(--ui-bg-accented)]/75 disabled:bg-[var(--ui-bg-elevated)] aria-disabled:bg-[var(--ui-bg-elevated)]'
      },
      {
        color: 'neutral',
        variant: 'subtle',
        class:
          'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-accented)]/75 disabled:bg-[var(--ui-bg-elevated)] aria-disabled:bg-[var(--ui-bg-elevated)] focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]'
      },
      {
        color: 'neutral',
        variant: 'ghost',
        class:
          'text-[var(--ui-text)] hover:bg-[var(--ui-bg-elevated)] focus-visible:bg-[var(--ui-bg-elevated)] hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent'
      },
      {
        color: 'neutral',
        variant: 'link',
        class:
          'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] disabled:text-[var(--ui-text-muted)] aria-disabled:text-[var(--ui-text-muted)] focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]'
      },
      { size: 'xs', square: !0, class: 'p-1' },
      { size: 'sm', square: !0, class: 'p-1.5' },
      { size: 'md', square: !0, class: 'p-1.5' },
      { size: 'lg', square: !0, class: 'p-2' },
      { size: 'xl', square: !0, class: 'p-2' },
      { loading: !0, leading: !0, class: { leadingIcon: 'animate-spin' } },
      {
        loading: !0,
        leading: !1,
        trailing: !0,
        class: { trailingIcon: 'animate-spin' }
      }
    ],
    defaultVariants: { color: 'primary', variant: 'solid', size: 'md' }
  },
  UC = dr;
var Zc;
const zC = Ot({
    extend: Ot(BC),
    ...(((Zc = UC.ui) == null ? void 0 : Zc.button) || {})
  }),
  Ns = re({
    __name: 'Button',
    props: {
      label: {},
      color: {},
      variant: {},
      size: {},
      square: { type: Boolean },
      block: { type: Boolean },
      loadingAuto: { type: Boolean },
      onClick: { type: [Function, Array] },
      class: {},
      ui: {},
      icon: {},
      avatar: {},
      leading: { type: Boolean },
      leadingIcon: {},
      trailing: { type: Boolean },
      trailingIcon: {},
      loading: { type: Boolean },
      loadingIcon: {},
      as: {},
      type: {},
      disabled: { type: Boolean },
      active: { type: Boolean },
      exact: { type: Boolean },
      exactQuery: { type: [Boolean, String] },
      exactHash: { type: Boolean },
      inactiveClass: {},
      to: {},
      href: {},
      external: { type: Boolean },
      target: {},
      rel: {},
      noRel: { type: Boolean },
      prefetchedClass: {},
      prefetch: { type: Boolean },
      prefetchOn: {},
      noPrefetch: { type: Boolean },
      activeClass: {},
      exactActiveClass: {},
      ariaCurrentValue: {},
      viewTransition: { type: Boolean },
      replace: { type: Boolean }
    },
    setup(e) {
      const t = e,
        n = Zu(),
        r = Bn(LC(t)),
        { orientation: s, size: o } = $C(t),
        i = X(!1),
        a = Ae(MC, void 0);
      async function l(y) {
        i.value = !0;
        const b = Array.isArray(t.onClick) ? t.onClick : [t.onClick];
        try {
          await Promise.all(b.map((_) => (_ == null ? void 0 : _(y))));
        } finally {
          i.value = !1;
        }
      }
      const u = F(
          () =>
            t.loading ||
            (t.loadingAuto &&
              (i.value ||
                ((a == null ? void 0 : a.value) && t.type === 'submit')))
        ),
        {
          isLeading: c,
          isTrailing: f,
          leadingIconName: d,
          trailingIconName: p
        } = OC(F(() => ({ ...t, loading: u.value }))),
        g = F(() =>
          zC({
            color: t.color,
            variant: t.variant,
            size: o.value,
            loading: u.value,
            block: t.block,
            square: t.square || (!n.default && !t.label),
            leading: c.value,
            trailing: f.value,
            buttonGroup: s.value
          })
        );
      return (y, b) => {
        var _;
        return (
          G(),
          ee(
            DC,
            we(
              {
                type: y.type,
                disabled: y.disabled || u.value,
                class: g.value.base({
                  class: [t.class, (_ = t.ui) == null ? void 0 : _.base]
                })
              },
              E(pp)(E(r), ['type', 'disabled']),
              { raw: '', onClick: l }
            ),
            {
              default: ie(() => [
                fe(y.$slots, 'leading', {}, () => {
                  var v, h, m;
                  return [
                    E(c) && E(d)
                      ? (G(),
                        ee(
                          lo,
                          {
                            key: 0,
                            name: E(d),
                            class: Ue(
                              g.value.leadingIcon({
                                class:
                                  (v = t.ui) == null ? void 0 : v.leadingIcon
                              })
                            )
                          },
                          null,
                          8,
                          ['name', 'class']
                        ))
                      : y.avatar
                        ? (G(),
                          ee(
                            Op,
                            we(
                              {
                                key: 1,
                                size:
                                  ((h = t.ui) == null
                                    ? void 0
                                    : h.leadingAvatarSize) ||
                                  g.value.leadingAvatarSize()
                              },
                              y.avatar,
                              {
                                class: g.value.leadingAvatar({
                                  class:
                                    (m = t.ui) == null
                                      ? void 0
                                      : m.leadingAvatar
                                })
                              }
                            ),
                            null,
                            16,
                            ['size', 'class']
                          ))
                        : Le('', !0)
                  ];
                }),
                fe(y.$slots, 'default', {}, () => {
                  var v;
                  return [
                    y.label
                      ? (G(),
                        ut(
                          'span',
                          {
                            key: 0,
                            class: Ue(
                              g.value.label({
                                class: (v = t.ui) == null ? void 0 : v.label
                              })
                            )
                          },
                          Yt(y.label),
                          3
                        ))
                      : Le('', !0)
                  ];
                }),
                fe(y.$slots, 'trailing', {}, () => {
                  var v;
                  return [
                    E(f) && E(p)
                      ? (G(),
                        ee(
                          lo,
                          {
                            key: 0,
                            name: E(p),
                            class: Ue(
                              g.value.trailingIcon({
                                class:
                                  (v = t.ui) == null ? void 0 : v.trailingIcon
                              })
                            )
                          },
                          null,
                          8,
                          ['name', 'class']
                        ))
                      : Le('', !0)
                  ];
                })
              ]),
              _: 3
            },
            16,
            ['type', 'disabled', 'class']
          )
        );
      };
    }
  }),
  VC = {
    slots: {
      root: 'relative group overflow-hidden bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*2)] ring ring-[var(--ui-border)] p-4 flex gap-2.5 focus:outline-none',
      wrapper: 'w-0 flex-1 flex flex-col gap-1',
      title: 'text-sm font-medium text-[var(--ui-text-highlighted)]',
      description: 'text-sm text-[var(--ui-text-muted)]',
      icon: 'shrink-0 size-5',
      avatar: 'shrink-0',
      avatarSize: '2xl',
      actions: 'flex gap-1.5 shrink-0',
      progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
      close: 'p-0.5'
    },
    variants: {
      color: {
        primary: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)]',
          icon: 'text-[var(--ui-primary)]',
          progress: 'bg-[var(--ui-primary)]'
        },
        secondary: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-secondary)]',
          icon: 'text-[var(--ui-secondary)]',
          progress: 'bg-[var(--ui-secondary)]'
        },
        success: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-success)]',
          icon: 'text-[var(--ui-success)]',
          progress: 'bg-[var(--ui-success)]'
        },
        info: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-info)]',
          icon: 'text-[var(--ui-info)]',
          progress: 'bg-[var(--ui-info)]'
        },
        warning: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-warning)]',
          icon: 'text-[var(--ui-warning)]',
          progress: 'bg-[var(--ui-warning)]'
        },
        error: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-error)]',
          icon: 'text-[var(--ui-error)]',
          progress: 'bg-[var(--ui-error)]'
        },
        neutral: {
          root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-border-inverted)]',
          icon: 'text-[var(--ui-text-highlighted)]',
          progress: 'bg-[var(--ui-bg-inverted)]'
        }
      },
      multiline: {
        true: { root: 'items-start', actions: 'items-start mt-1' },
        false: { root: 'items-center', actions: 'items-center' }
      }
    },
    defaultVariants: { color: 'primary' }
  },
  WC = dr;
var eu;
const KC = Ot({
    extend: Ot(VC),
    ...(((eu = WC.ui) == null ? void 0 : eu.toast) || {})
  }),
  qC = re({
    __name: 'Toast',
    props: {
      as: {},
      title: {},
      description: {},
      icon: {},
      avatar: {},
      color: {},
      actions: {},
      close: { type: Boolean, default: !0 },
      closeIcon: {},
      class: {},
      ui: {},
      defaultOpen: { type: Boolean },
      open: { type: Boolean },
      type: {},
      duration: {}
    },
    emits: [
      'escapeKeyDown',
      'pause',
      'resume',
      'swipeStart',
      'swipeMove',
      'swipeCancel',
      'swipeEnd',
      'update:open'
    ],
    setup(e, { expose: t, emit: n }) {
      const r = e,
        s = n,
        o = Zu(),
        { t: i } = Zx(),
        a = Sn(),
        l = dx(gr(r, 'as', 'defaultOpen', 'open', 'duration', 'type'), s),
        u = F(() => !!r.title && !!r.description),
        c = F(() => KC({ color: r.color })),
        f = X(),
        d = X(0);
      return (
        dt(() => {
          f.value &&
            setTimeout(() => {
              var p;
              d.value =
                (p = f.value.$el.getBoundingClientRect()) == null
                  ? void 0
                  : p.height;
            }, 0);
        }),
        t({ height: d }),
        (p, g) => {
          var y;
          return (
            G(),
            ee(
              E(jx),
              we({ ref_key: 'el', ref: f }, E(l), {
                class: c.value.root({
                  class: [r.class, (y = r.ui) == null ? void 0 : y.root],
                  multiline: u.value
                }),
                style: { '--height': d.value }
              }),
              {
                default: ie(({ remaining: b, duration: _ }) => {
                  var v, h, m, x, C, P, N, R;
                  return [
                    fe(p.$slots, 'leading', {}, () => {
                      var A, D, k;
                      return [
                        p.avatar
                          ? (G(),
                            ee(
                              Op,
                              we(
                                {
                                  key: 0,
                                  size:
                                    ((A = r.ui) == null
                                      ? void 0
                                      : A.avatarSize) || c.value.avatarSize()
                                },
                                p.avatar,
                                {
                                  class: c.value.avatar({
                                    class:
                                      (D = r.ui) == null ? void 0 : D.avatar
                                  })
                                }
                              ),
                              null,
                              16,
                              ['size', 'class']
                            ))
                          : p.icon
                            ? (G(),
                              ee(
                                lo,
                                {
                                  key: 1,
                                  name: p.icon,
                                  class: Ue(
                                    c.value.icon({
                                      class:
                                        (k = r.ui) == null ? void 0 : k.icon
                                    })
                                  )
                                },
                                null,
                                8,
                                ['name', 'class']
                              ))
                            : Le('', !0)
                      ];
                    }),
                    hn(
                      'div',
                      {
                        class: Ue(
                          c.value.wrapper({
                            class: (v = r.ui) == null ? void 0 : v.wrapper
                          })
                        )
                      },
                      [
                        p.title || o.title
                          ? (G(),
                            ee(
                              E(Bx),
                              {
                                key: 0,
                                class: Ue(
                                  c.value.title({
                                    class: (h = r.ui) == null ? void 0 : h.title
                                  })
                                )
                              },
                              {
                                default: ie(() => [
                                  fe(p.$slots, 'title', {}, () => [
                                    Ln(Yt(p.title), 1)
                                  ])
                                ]),
                                _: 3
                              },
                              8,
                              ['class']
                            ))
                          : Le('', !0),
                        p.description || o.description
                          ? (G(),
                            ee(
                              E(Ux),
                              {
                                key: 1,
                                class: Ue(
                                  c.value.description({
                                    class:
                                      (m = r.ui) == null
                                        ? void 0
                                        : m.description
                                  })
                                )
                              },
                              {
                                default: ie(() => [
                                  fe(p.$slots, 'description', {}, () => [
                                    Ln(Yt(p.description), 1)
                                  ])
                                ]),
                                _: 3
                              },
                              8,
                              ['class']
                            ))
                          : Le('', !0),
                        u.value && (x = p.actions) != null && x.length
                          ? (G(),
                            ut(
                              'div',
                              {
                                key: 2,
                                class: Ue(
                                  c.value.actions({
                                    class:
                                      (C = r.ui) == null ? void 0 : C.actions,
                                    multiline: !0
                                  })
                                )
                              },
                              [
                                fe(p.$slots, 'actions', {}, () => [
                                  (G(!0),
                                  ut(
                                    Me,
                                    null,
                                    li(
                                      p.actions,
                                      (A, D) => (
                                        G(),
                                        ee(
                                          E(Fc),
                                          {
                                            key: D,
                                            'alt-text': A.label || 'Action',
                                            'as-child': '',
                                            onClick:
                                              g[0] ||
                                              (g[0] = Rs(() => {}, ['stop']))
                                          },
                                          {
                                            default: ie(() => [
                                              ue(
                                                Ns,
                                                we(
                                                  {
                                                    size: 'xs',
                                                    color: p.color,
                                                    ref_for: !0
                                                  },
                                                  A
                                                ),
                                                null,
                                                16,
                                                ['color']
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['alt-text']
                                        )
                                      )
                                    ),
                                    128
                                  ))
                                ])
                              ],
                              2
                            ))
                          : Le('', !0)
                      ],
                      2
                    ),
                    (!u.value && (P = p.actions) != null && P.length) ||
                    p.close !== null
                      ? (G(),
                        ut(
                          'div',
                          {
                            key: 0,
                            class: Ue(
                              c.value.actions({
                                class: (N = r.ui) == null ? void 0 : N.actions,
                                multiline: !1
                              })
                            )
                          },
                          [
                            u.value
                              ? Le('', !0)
                              : fe(p.$slots, 'actions', { key: 0 }, () => [
                                  (G(!0),
                                  ut(
                                    Me,
                                    null,
                                    li(
                                      p.actions,
                                      (A, D) => (
                                        G(),
                                        ee(
                                          E(Fc),
                                          {
                                            key: D,
                                            'alt-text': A.label || 'Action',
                                            'as-child': '',
                                            onClick:
                                              g[1] ||
                                              (g[1] = Rs(() => {}, ['stop']))
                                          },
                                          {
                                            default: ie(() => [
                                              ue(
                                                Ns,
                                                we(
                                                  {
                                                    size: 'xs',
                                                    color: p.color,
                                                    ref_for: !0
                                                  },
                                                  A
                                                ),
                                                null,
                                                16,
                                                ['color']
                                              )
                                            ]),
                                            _: 2
                                          },
                                          1032,
                                          ['alt-text']
                                        )
                                      )
                                    ),
                                    128
                                  ))
                                ]),
                            ue(
                              E(dp),
                              { 'as-child': '' },
                              {
                                default: ie(() => [
                                  fe(p.$slots, 'close', { ui: c.value }, () => {
                                    var A;
                                    return [
                                      p.close
                                        ? (G(),
                                          ee(
                                            Ns,
                                            we(
                                              {
                                                key: 0,
                                                icon:
                                                  p.closeIcon ||
                                                  E(a).ui.icons.close,
                                                size: 'md',
                                                color: 'neutral',
                                                variant: 'link',
                                                'aria-label':
                                                  E(i)('toast.close')
                                              },
                                              typeof p.close == 'object'
                                                ? p.close
                                                : void 0,
                                              {
                                                class: c.value.close({
                                                  class:
                                                    (A = r.ui) == null
                                                      ? void 0
                                                      : A.close
                                                }),
                                                onClick:
                                                  g[2] ||
                                                  (g[2] = Rs(() => {}, [
                                                    'stop'
                                                  ]))
                                              }
                                            ),
                                            null,
                                            16,
                                            ['icon', 'aria-label', 'class']
                                          ))
                                        : Le('', !0)
                                    ];
                                  })
                                ]),
                                _: 3
                              }
                            )
                          ],
                          2
                        ))
                      : Le('', !0),
                    b > 0 && _
                      ? (G(),
                        ut(
                          'div',
                          {
                            key: 1,
                            class: Ue(
                              c.value.progress({
                                class: (R = r.ui) == null ? void 0 : R.progress
                              })
                            ),
                            style: wn({ width: `${(b / _) * 100}%` })
                          },
                          null,
                          6
                        ))
                      : Le('', !0)
                  ];
                }),
                _: 3
              },
              16,
              ['class', 'style']
            )
          );
        }
      );
    }
  }),
  GC = {
    slots: {
      viewport:
        'fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-[var(--height)] focus:outline-none',
      base: 'pointer-events-auto absolute inset-x-0 z-[var(--index)] transform-[var(--transform)] data-[expanded=false]:data-[front=false]:h-[var(--front-height)] data-[expanded=false]:data-[front=false]:*:invisible data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out'
    },
    variants: {
      position: {
        'top-left': { viewport: 'left-4' },
        'top-center': { viewport: 'left-1/2 transform -translate-x-1/2' },
        'top-right': { viewport: 'right-4' },
        'bottom-left': { viewport: 'left-4' },
        'bottom-center': { viewport: 'left-1/2 transform -translate-x-1/2' },
        'bottom-right': { viewport: 'right-4' }
      },
      swipeDirection: {
        up: 'data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]',
        right: 'data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]',
        down: 'data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]',
        left: 'data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]'
      }
    },
    compoundVariants: [
      {
        position: ['top-left', 'top-center', 'top-right'],
        class: {
          viewport: 'top-4',
          base: 'top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]'
        }
      },
      {
        position: ['bottom-left', 'bottom-center', 'bottom-right'],
        class: {
          viewport: 'bottom-4',
          base: 'bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]'
        }
      },
      {
        swipeDirection: ['left', 'right'],
        class:
          'data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=cancel]:translate-x-0'
      },
      {
        swipeDirection: ['up', 'down'],
        class:
          'data-[swipe=move]:translate-y-[var(--reka-toast-swipe-move-y)] data-[swipe=end]:translate-y-[var(--reka-toast-swipe-end-y)] data-[swipe=cancel]:translate-y-0'
      }
    ],
    defaultVariants: { position: 'bottom-right' }
  },
  JC = dr;
var tu;
const QC = Ot({
    extend: Ot(GC),
    ...(((tu = JC.ui) == null ? void 0 : tu.toaster) || {})
  }),
  YC = { name: 'Toaster' },
  XC = re({
    ...YC,
    props: {
      position: {},
      expand: { type: Boolean, default: !0 },
      portal: { type: Boolean, default: !0 },
      class: {},
      ui: {},
      label: {},
      duration: { default: 5e3 },
      swipeThreshold: {}
    },
    setup(e) {
      const t = e,
        n = Bn(gr(t, 'duration', 'label', 'swipeThreshold')),
        { toasts: r, remove: s } = Wx(),
        o = F(() => {
          switch (t.position) {
            case 'top-center':
              return 'up';
            case 'top-right':
            case 'bottom-right':
              return 'right';
            case 'bottom-center':
              return 'down';
            case 'top-left':
            case 'bottom-left':
              return 'left';
          }
          return 'right';
        }),
        i = F(() => QC({ position: t.position, swipeDirection: o.value }));
      function a(g, y) {
        g || s(y);
      }
      const l = X(!1),
        u = F(() => t.expand || l.value),
        c = X([]),
        f = F(() => c.value.reduce((g, { height: y }) => g + y + 16, 0)),
        d = F(() => {
          var g;
          return (
            ((g = c.value[c.value.length - 1]) == null ? void 0 : g.height) || 0
          );
        });
      function p(g) {
        return c.value.slice(g + 1).reduce((y, { height: b }) => y + b + 16, 0);
      }
      return (g, y) => (
        G(),
        ee(
          E(Tx),
          we({ 'swipe-direction': o.value }, E(n)),
          {
            default: ie(() => [
              fe(g.$slots, 'default'),
              (G(!0),
              ut(
                Me,
                null,
                li(
                  E(r),
                  (b, _) => (
                    G(),
                    ee(
                      qC,
                      we(
                        { key: b.id, ref_for: !0, ref_key: 'refs', ref: c },
                        E(pp)(b, ['id']),
                        {
                          'data-expanded': u.value,
                          'data-front': !u.value && _ === E(r).length - 1,
                          style: {
                            '--index': _ - E(r).length + E(r).length,
                            '--before': E(r).length - 1 - _,
                            '--offset': p(_),
                            '--scale': u.value
                              ? '1'
                              : 'calc(1 - var(--before) * var(--scale-factor))',
                            '--translate': u.value
                              ? 'calc(var(--offset) * var(--translate-factor))'
                              : 'calc(var(--before) * var(--gap))',
                            '--transform':
                              'translateY(var(--translate)) scale(var(--scale))'
                          },
                          class: [
                            i.value.base(),
                            { 'cursor-pointer': !!b.click }
                          ],
                          'onUpdate:open': (v) => a(v, b.id),
                          onClick: (v) => b.click && b.click(b)
                        }
                      ),
                      null,
                      16,
                      [
                        'data-expanded',
                        'data-front',
                        'style',
                        'class',
                        'onUpdate:open',
                        'onClick'
                      ]
                    )
                  )
                ),
                128
              )),
              ue(
                E(Hx),
                { disabled: !g.portal },
                {
                  default: ie(() => {
                    var b, _, v;
                    return [
                      ue(
                        E(Dx),
                        {
                          'data-expanded': u.value,
                          class: Ue(
                            i.value.viewport({
                              class: [
                                t.class,
                                (b = t.ui) == null ? void 0 : b.viewport
                              ]
                            })
                          ),
                          style: wn({
                            '--scale-factor': '0.05',
                            '--translate-factor':
                              (_ = g.position) != null && _.startsWith('top')
                                ? '1px'
                                : '-1px',
                            '--gap':
                              (v = g.position) != null && v.startsWith('top')
                                ? '16px'
                                : '-16px',
                            '--front-height': `${d.value}px`,
                            '--height': `${f.value}px`
                          }),
                          onMouseenter: y[0] || (y[0] = (h) => (l.value = !0)),
                          onMouseleave: y[1] || (y[1] = (h) => (l.value = !1))
                        },
                        null,
                        8,
                        ['data-expanded', 'class', 'style']
                      )
                    ];
                  }),
                  _: 1
                },
                8,
                ['disabled']
              )
            ]),
            _: 3
          },
          16,
          ['swipe-direction']
        )
      );
    }
  }),
  ZC = re({
    __name: 'ModalProvider',
    setup(e) {
      const t = Ae(za),
        { isOpen: n } = H_();
      return (r, s) =>
        E(t)
          ? (G(),
            ee(
              xa(E(t).component),
              we({ key: 0 }, E(t).props, {
                open: E(n),
                'onUpdate:open':
                  s[0] || (s[0] = (o) => (Te(n) ? (n.value = o) : null))
              }),
              null,
              16,
              ['open']
            ))
          : Le('', !0);
    }
  }),
  ek = re({
    __name: 'SlideoverProvider',
    setup(e) {
      const t = Ae(Ua),
        { isOpen: n } = L_();
      return (r, s) =>
        E(t)
          ? (G(),
            ee(
              xa(E(t).component),
              we({ key: 0 }, E(t).props, {
                open: E(n),
                'onUpdate:open':
                  s[0] || (s[0] = (o) => (Te(n) ? (n.value = o) : null))
              }),
              null,
              16,
              ['open']
            ))
          : Le('', !0);
    }
  }),
  tk = { name: 'App' },
  nk = re({
    ...tk,
    props: {
      tooltip: {},
      toaster: {},
      locale: {},
      scrollBody: { type: [Boolean, Object] },
      nonce: {}
    },
    setup(e) {
      const t = e,
        n = Bn(gr(t, 'scrollBody')),
        r = On(() => t.tooltip),
        s = On(() => t.toaster),
        o = On(() => t.locale);
      return (
        Tt(hp, o),
        (i, a) => {
          var l, u;
          return (
            G(),
            ee(
              E(ax),
              we(
                {
                  'use-id': () => Ah(),
                  dir: (l = o.value) == null ? void 0 : l.dir,
                  locale: (u = o.value) == null ? void 0 : u.code
                },
                E(n)
              ),
              {
                default: ie(() => [
                  ue(
                    E(Vx),
                    yn(ur(r.value)),
                    {
                      default: ie(() => [
                        i.toaster !== null
                          ? (G(),
                            ee(
                              XC,
                              yn(we({ key: 0 }, s.value)),
                              {
                                default: ie(() => [fe(i.$slots, 'default')]),
                                _: 3
                              },
                              16
                            ))
                          : fe(i.$slots, 'default', { key: 1 })
                      ]),
                      _: 3
                    },
                    16
                  ),
                  ue(ZC),
                  ue(ek)
                ]),
                _: 3
              },
              16,
              ['use-id', 'dir', 'locale']
            )
          );
        }
      );
    }
  }),
  rk = {
    __name: 'app',
    setup(e) {
      const n = bt().public.siteUrl;
      return (
        ls({ meta: [{ property: 'og:image', content: `${n}/og-image.png` }] }),
        (r, s) => {
          const o = ex,
            i = op,
            a = nk;
          return (
            G(),
            ee(a, null, {
              default: ie(() => [
                ue(i, null, { default: ie(() => [ue(o)]), _: 1 })
              ]),
              _: 1
            })
          );
        }
      );
    }
  },
  sk = { class: 'mt-40 flex h-full flex-col items-center justify-center' },
  ok = {
    __name: 'error',
    setup(e) {
      const t = Dn(),
        n = () => {
          td({ redirect: '/' });
        };
      return (r, s) => {
        const o = Ns,
          i = op;
        return (
          G(),
          ee(i, null, {
            default: ie(() => [
              hn('div', sk, [
                E(t).statusCode === 404
                  ? (G(),
                    ut(
                      Me,
                      { key: 0 },
                      [
                        s[0] || (s[0] = hn('h1', null, '404', -1)),
                        s[1] ||
                          (s[1] = hn(
                            'p',
                            { class: 'mb-12' },
                            'Page Not Found',
                            -1
                          ))
                      ],
                      64
                    ))
                  : (G(),
                    ut(
                      Me,
                      { key: 1 },
                      [
                        hn('h1', null, Yt(E(t).statusCode), 1),
                        hn('p', null, Yt(E(t).message), 1)
                      ],
                      64
                    )),
                ue(
                  o,
                  { class: 'cursor-pointer text-lg', onClick: n },
                  { default: ie(() => s[2] || (s[2] = [Ln('Go Home')])), _: 1 }
                )
              ])
            ]),
            _: 1
          })
        );
      };
    }
  },
  ik = { key: 0 },
  Jc = {
    __name: 'nuxt-root',
    setup(e) {
      const t = () => null,
        n = de(),
        r = n.deferHydration();
      if (n.isHydrating) {
        const l = n.hooks.hookOnce('app:error', r);
        Ge().beforeEach(l);
      }
      const s = !1;
      Tt(is, fr()), n.hooks.callHookWith((l) => l.map((u) => u()), 'vue:setup');
      const o = Dn(),
        i = !1;
      Gu((l, u, c) => {
        if (
          (n.hooks.callHook('vue:error', l, u, c).catch((f) => {}),
          Ty(l) && (l.fatal || l.unhandled))
        )
          return n.runWithContext(() => qn(l)), !1;
      });
      const a = !1;
      return (l, u) => (
        G(),
        ee(
          ka,
          { onResolve: E(r) },
          {
            default: ie(() => [
              E(i)
                ? (G(), ut('div', ik))
                : E(o)
                  ? (G(),
                    ee(E(ok), { key: 1, error: E(o) }, null, 8, ['error']))
                  : E(a)
                    ? (G(),
                      ee(E(t), { key: 2, context: E(a) }, null, 8, ['context']))
                    : E(s)
                      ? (G(), ee(xa(E(s)), { key: 3 }))
                      : (G(), ee(E(rk), { key: 4 }))
            ]),
            _: 1
          },
          8,
          ['onResolve']
        )
      );
    }
  };
let Qc;
{
  let e;
  (Qc = async function () {
    var i, a;
    if (e) return e;
    const r = !!(
        ((i = window.__NUXT__) == null ? void 0 : i.serverRendered) ??
        ((a = document.getElementById('__NUXT_DATA__')) == null
          ? void 0
          : a.dataset.ssr) === 'true'
      )
        ? om(Jc)
        : sm(Jc),
      s = gy({ vueApp: r });
    async function o(l) {
      await s.callHook('app:error', l),
        (s.payload.error = s.payload.error || wo(l));
    }
    (r.config.errorHandler = o),
      s.hook('app:suspense:resolve', () => {
        r.config.errorHandler === o && (r.config.errorHandler = void 0);
      });
    try {
      await vy(s, X0);
    } catch (l) {
      o(l);
    }
    try {
      await s.hooks.callHook('app:created', r),
        await s.hooks.callHook('app:beforeMount', r),
        r.mount(dy),
        await s.hooks.callHook('app:mounted', r),
        await Ft();
    } catch (l) {
      o(l);
    }
    return r;
  }),
    (e = Qc().catch((t) => {
      throw t;
    }));
}
export {
  Zx as $,
  ua as A,
  js as B,
  Ve as C,
  Pe as D,
  Gw as E,
  Me as F,
  nn as G,
  Le as H,
  Zu as I,
  Bn as J,
  gr as K,
  Ot as L,
  Ue as M,
  lo as N,
  Op as O,
  pt as P,
  dr as Q,
  Te as R,
  Ns as S,
  ck as T,
  fk as U,
  Xt as V,
  ht as W,
  $_ as X,
  ds as Y,
  Sn as Z,
  Cw as _,
  fr as a,
  dx as a0,
  Vu as a1,
  yt as a2,
  de as a3,
  gk as a4,
  At as a5,
  On as a6,
  jh as a7,
  Hn as a8,
  wo as a9,
  LC as aA,
  NC as aB,
  Tt as aC,
  Ha as aD,
  os as aE,
  _i as aF,
  $m as aG,
  or as aH,
  So as aI,
  J0 as aJ,
  Fn as aK,
  q0 as aL,
  Qb as aM,
  WS as aN,
  zS as aO,
  Vi as aa,
  ze as ab,
  tt as ac,
  mk as ad,
  _k as ae,
  Ah as af,
  P_ as ag,
  ux as ah,
  Ga as ai,
  yk as aj,
  vk as ak,
  jt as al,
  hk as am,
  xk as an,
  m_ as ao,
  hr as ap,
  ju as aq,
  wk as ar,
  ip as as,
  bn as at,
  OC as au,
  bk as av,
  Kx as aw,
  xa as ax,
  lk as ay,
  DC as az,
  ls as b,
  ut as c,
  re as d,
  ue as e,
  hn as f,
  ie as g,
  li as h,
  ee as i,
  E as j,
  bt as k,
  Ln as l,
  dk as m,
  F as n,
  G as o,
  fe as p,
  we as q,
  X as r,
  yn as s,
  Yt as t,
  Ge as u,
  ur as v,
  uk as w,
  pk as x,
  dt as y,
  Ft as z
};
