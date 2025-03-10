var $ = Object.defineProperty;
var F = (a, s, t) =>
  s in a
    ? $(a, s, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (a[s] = t);
var b = (a, s, t) => F(a, typeof s != 'symbol' ? s + '' : s, t);
import {
  a3 as L,
  a4 as x,
  r as k,
  a5 as U,
  a6 as q,
  C as V,
  a7 as W,
  a8 as K,
  D as I,
  B as M,
  A as N,
  a9 as T,
  j as G,
  aa as Q,
  n as J,
  ab as v,
  ac as X,
  ad as Y,
  d as Z,
  c as H,
  o as z,
  F as A,
  h as ee,
  i as te,
  g as se,
  l as ae,
  t as ne,
  _ as oe,
  k as ie
} from './D7-Dmtkj.js';
const re = (a) => a === 'defer' || a === !1;
function ce(...a) {
  var P;
  const s = typeof a[a.length - 1] == 'string' ? a.pop() : void 0;
  typeof a[0] != 'string' && a.unshift(s);
  let [t, o, e = {}] = a;
  if (typeof t != 'string')
    throw new TypeError('[nuxt] [asyncData] key must be a string.');
  if (typeof o != 'function')
    throw new TypeError('[nuxt] [asyncData] handler must be a function.');
  const n = L(),
    c = o,
    h = () => x.value,
    y = () => (n.isHydrating ? n.payload.data[t] : n.static.data[t]);
  (e.server = e.server ?? !0),
    (e.default = e.default ?? h),
    (e.getCachedData = e.getCachedData ?? y),
    (e.lazy = e.lazy ?? !1),
    (e.immediate = e.immediate ?? !0),
    (e.deep = e.deep ?? x.deep),
    (e.dedupe = e.dedupe ?? 'cancel');
  const u = e.getCachedData(t, n),
    m = u != null;
  if (!n._asyncData[t] || !e.immediate) {
    (P = n.payload._errors)[t] ?? (P[t] = x.errorValue);
    const l = e.deep ? k : U;
    n._asyncData[t] = {
      data: l(m ? u : e.default()),
      pending: k(!m),
      error: q(n.payload._errors, t),
      status: k('idle'),
      _default: e.default
    };
  }
  const i = { ...n._asyncData[t] };
  delete i._default,
    (i.refresh = i.execute =
      (l = {}) => {
        if (n._asyncDataPromises[t]) {
          if (re(l.dedupe ?? e.dedupe)) return n._asyncDataPromises[t];
          n._asyncDataPromises[t].cancelled = !0;
        }
        if (l._initial || (n.isHydrating && l._initial !== !1)) {
          const d = l._initial ? u : e.getCachedData(t, n);
          if (d != null) return Promise.resolve(d);
        }
        (i.pending.value = !0), (i.status.value = 'pending');
        const _ = new Promise((d, r) => {
          try {
            d(c(n));
          } catch (p) {
            r(p);
          }
        })
          .then(async (d) => {
            if (_.cancelled) return n._asyncDataPromises[t];
            let r = d;
            e.transform && (r = await e.transform(d)),
              e.pick && (r = ue(r, e.pick)),
              (n.payload.data[t] = r),
              (i.data.value = r),
              (i.error.value = x.errorValue),
              (i.status.value = 'success');
          })
          .catch((d) => {
            if (_.cancelled) return n._asyncDataPromises[t];
            (i.error.value = T(d)),
              (i.data.value = G(e.default())),
              (i.status.value = 'error');
          })
          .finally(() => {
            _.cancelled ||
              ((i.pending.value = !1), delete n._asyncDataPromises[t]);
          });
        return (n._asyncDataPromises[t] = _), n._asyncDataPromises[t];
      }),
    (i.clear = () => le(n, t));
  const D = () => i.refresh({ _initial: !0 }),
    f = e.server !== !1 && n.payload.serverRendered;
  {
    const l = V();
    if (
      (l && f && e.immediate && !l.sp && (l.sp = []),
      l && !l._nuxtOnBeforeMountCbs)
    ) {
      l._nuxtOnBeforeMountCbs = [];
      const r = l._nuxtOnBeforeMountCbs;
      W(() => {
        r.forEach((p) => {
          p();
        }),
          r.splice(0, r.length);
      }),
        K(() => r.splice(0, r.length));
    }
    f && n.isHydrating && (i.error.value || u != null)
      ? ((i.pending.value = !1),
        (i.status.value = i.error.value ? 'error' : 'success'))
      : l &&
          ((n.payload.serverRendered && n.isHydrating) || e.lazy) &&
          e.immediate
        ? l._nuxtOnBeforeMountCbs.push(D)
        : e.immediate && D();
    const _ = N();
    if (e.watch) {
      const r = I(e.watch, () => i.refresh());
      _ && M(r);
    }
    const d = n.hook('app:data:refresh', async (r) => {
      (!r || r.includes(t)) && (await i.refresh());
    });
    _ && M(d);
  }
  const C = Promise.resolve(n._asyncDataPromises[t]).then(() => i);
  return Object.assign(C, i), C;
}
function le(a, s) {
  s in a.payload.data && (a.payload.data[s] = void 0),
    s in a.payload._errors && (a.payload._errors[s] = x.errorValue),
    a._asyncData[s] &&
      ((a._asyncData[s].data.value = void 0),
      (a._asyncData[s].error.value = x.errorValue),
      (a._asyncData[s].pending.value = !1),
      (a._asyncData[s].status.value = 'idle')),
    s in a._asyncDataPromises &&
      (a._asyncDataPromises[s] && (a._asyncDataPromises[s].cancelled = !0),
      (a._asyncDataPromises[s] = void 0));
}
function ue(a, s) {
  const t = {};
  for (const o of s) t[o] = a[o];
  return t;
}
class w {
  constructor(s, t) {
    b(this, 'words');
    b(this, 'sigBytes');
    (s = this.words = s || []),
      (this.sigBytes = t === void 0 ? s.length * 4 : t);
  }
  toString(s) {
    return (s || fe).stringify(this);
  }
  concat(s) {
    if ((this.clamp(), this.sigBytes % 4))
      for (let t = 0; t < s.sigBytes; t++) {
        const o = (s.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
        this.words[(this.sigBytes + t) >>> 2] |=
          o << (24 - ((this.sigBytes + t) % 4) * 8);
      }
    else
      for (let t = 0; t < s.sigBytes; t += 4)
        this.words[(this.sigBytes + t) >>> 2] = s.words[t >>> 2];
    return (this.sigBytes += s.sigBytes), this;
  }
  clamp() {
    (this.words[this.sigBytes >>> 2] &=
      4294967295 << (32 - (this.sigBytes % 4) * 8)),
      (this.words.length = Math.ceil(this.sigBytes / 4));
  }
  clone() {
    return new w([...this.words]);
  }
}
const fe = {
    stringify(a) {
      const s = [];
      for (let t = 0; t < a.sigBytes; t++) {
        const o = (a.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
        s.push((o >>> 4).toString(16), (o & 15).toString(16));
      }
      return s.join('');
    }
  },
  de = {
    stringify(a) {
      const s =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        t = [];
      for (let o = 0; o < a.sigBytes; o += 3) {
        const e = (a.words[o >>> 2] >>> (24 - (o % 4) * 8)) & 255,
          n = (a.words[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255,
          c = (a.words[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255,
          h = (e << 16) | (n << 8) | c;
        for (let y = 0; y < 4 && o * 8 + y * 6 < a.sigBytes * 8; y++)
          t.push(s.charAt((h >>> (6 * (3 - y))) & 63));
      }
      return t.join('');
    }
  },
  he = {
    parse(a) {
      const s = a.length,
        t = [];
      for (let o = 0; o < s; o++)
        t[o >>> 2] |= (a.charCodeAt(o) & 255) << (24 - (o % 4) * 8);
      return new w(t, s);
    }
  },
  ye = {
    parse(a) {
      return he.parse(unescape(encodeURIComponent(a)));
    }
  };
class _e {
  constructor() {
    b(this, '_data', new w());
    b(this, '_nDataBytes', 0);
    b(this, '_minBufferSize', 0);
    b(this, 'blockSize', 512 / 32);
  }
  reset() {
    (this._data = new w()), (this._nDataBytes = 0);
  }
  _append(s) {
    typeof s == 'string' && (s = ye.parse(s)),
      this._data.concat(s),
      (this._nDataBytes += s.sigBytes);
  }
  _doProcessBlock(s, t) {}
  _process(s) {
    let t,
      o = this._data.sigBytes / (this.blockSize * 4);
    s ? (o = Math.ceil(o)) : (o = Math.max((o | 0) - this._minBufferSize, 0));
    const e = o * this.blockSize,
      n = Math.min(e * 4, this._data.sigBytes);
    if (e) {
      for (let c = 0; c < e; c += this.blockSize)
        this._doProcessBlock(this._data.words, c);
      (t = this._data.words.splice(0, e)), (this._data.sigBytes -= n);
    }
    return new w(t, n);
  }
}
class pe extends _e {
  update(s) {
    return this._append(s), this._process(), this;
  }
  finalize(s) {
    s && this._append(s);
  }
}
const j = [
    1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372,
    528734635, 1541459225
  ],
  ge = [
    1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
    -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
    1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
    -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
    -1866530822, -1538233109, -1090935817, -965641998
  ],
  B = [];
class me extends pe {
  constructor() {
    super(...arguments);
    b(this, '_hash', new w([...j]));
  }
  reset() {
    super.reset(), (this._hash = new w([...j]));
  }
  _doProcessBlock(t, o) {
    const e = this._hash.words;
    let n = e[0],
      c = e[1],
      h = e[2],
      y = e[3],
      u = e[4],
      m = e[5],
      i = e[6],
      D = e[7];
    for (let f = 0; f < 64; f++) {
      if (f < 16) B[f] = t[o + f] | 0;
      else {
        const p = B[f - 15],
          g = ((p << 25) | (p >>> 7)) ^ ((p << 14) | (p >>> 18)) ^ (p >>> 3),
          S = B[f - 2],
          O = ((S << 15) | (S >>> 17)) ^ ((S << 13) | (S >>> 19)) ^ (S >>> 10);
        B[f] = g + B[f - 7] + O + B[f - 16];
      }
      const C = (u & m) ^ (~u & i),
        P = (n & c) ^ (n & h) ^ (c & h),
        l =
          ((n << 30) | (n >>> 2)) ^
          ((n << 19) | (n >>> 13)) ^
          ((n << 10) | (n >>> 22)),
        _ =
          ((u << 26) | (u >>> 6)) ^
          ((u << 21) | (u >>> 11)) ^
          ((u << 7) | (u >>> 25)),
        d = D + _ + C + ge[f] + B[f],
        r = l + P;
      (D = i),
        (i = m),
        (m = u),
        (u = (y + d) | 0),
        (y = h),
        (h = c),
        (c = n),
        (n = (d + r) | 0);
    }
    (e[0] = (e[0] + n) | 0),
      (e[1] = (e[1] + c) | 0),
      (e[2] = (e[2] + h) | 0),
      (e[3] = (e[3] + y) | 0),
      (e[4] = (e[4] + u) | 0),
      (e[5] = (e[5] + m) | 0),
      (e[6] = (e[6] + i) | 0),
      (e[7] = (e[7] + D) | 0);
  }
  finalize(t) {
    super.finalize(t);
    const o = this._nDataBytes * 8,
      e = this._data.sigBytes * 8;
    return (
      (this._data.words[e >>> 5] |= 128 << (24 - (e % 32))),
      (this._data.words[(((e + 64) >>> 9) << 4) + 14] = Math.floor(
        o / 4294967296
      )),
      (this._data.words[(((e + 64) >>> 9) << 4) + 15] = o),
      (this._data.sigBytes = this._data.words.length * 4),
      this._process(),
      this._hash
    );
  }
}
function De(a) {
  return new me().finalize(a).toString(de);
}
function be(a, s = {}) {
  const t = typeof a == 'string' ? a : Q(a, s);
  return De(t).slice(0, 10);
}
function we(a) {
  return {};
}
function Be(a, s, t) {
  const [o = {}, e] = typeof s == 'string' ? [{}, s] : [s, t],
    n = J(() => v(a)),
    c = o.key || be([e, typeof n.value == 'string' ? n.value : '', ...ve(o)]);
  if (!c || typeof c != 'string')
    throw new TypeError('[nuxt] [useFetch] key must be a string: ' + c);
  if (!a) throw new Error('[nuxt] [useFetch] request is missing.');
  const h = c === e ? '$f' + c : c;
  if (
    !o.baseURL &&
    typeof n.value == 'string' &&
    n.value[0] === '/' &&
    n.value[1] === '/'
  )
    throw new Error(
      '[nuxt] [useFetch] the request URL must not start with "//".'
    );
  const {
      server: y,
      lazy: u,
      default: m,
      transform: i,
      pick: D,
      watch: f,
      immediate: C,
      getCachedData: P,
      deep: l,
      dedupe: _,
      ...d
    } = o,
    r = X({
      ...Y,
      ...d,
      cache: typeof o.cache == 'boolean' ? void 0 : o.cache
    }),
    p = {
      server: y,
      lazy: u,
      default: m,
      transform: i,
      pick: D,
      immediate: C,
      getCachedData: P,
      deep: l,
      dedupe: _,
      watch: f === !1 ? [] : [r, n, ...(f || [])]
    };
  let g;
  return ce(
    h,
    () => {
      var E;
      (E = g == null ? void 0 : g.abort) == null ||
        E.call(
          g,
          new DOMException(
            'Request aborted as another request to the same endpoint was initiated.',
            'AbortError'
          )
        ),
        (g = typeof AbortController < 'u' ? new AbortController() : {});
      const O = v(o.timeout);
      let R;
      return (
        O &&
          ((R = setTimeout(
            () =>
              g.abort(
                new DOMException(
                  'Request aborted due to timeout.',
                  'AbortError'
                )
              ),
            O
          )),
          (g.signal.onabort = () => clearTimeout(R))),
        (o.$fetch || globalThis.$fetch)(n.value, {
          signal: g.signal,
          ...r
        }).finally(() => {
          clearTimeout(R);
        })
      );
    },
    p
  );
}
function ve(a) {
  var t;
  const s = [
    ((t = v(a.method)) == null ? void 0 : t.toUpperCase()) || 'GET',
    v(a.baseURL)
  ];
  for (const o of [a.params || a.query]) {
    const e = v(o);
    if (!e) continue;
    const n = {};
    for (const [c, h] of Object.entries(e)) n[v(c)] = v(h);
    s.push(n);
  }
  return s;
}
const Ce = { class: 'flex flex-wrap gap-2' },
  Oe = Z({
    __name: 'SPill',
    props: { items: {}, baseSlug: {} },
    setup(a) {
      return (s, t) => {
        const o = oe;
        return (
          z(),
          H('div', Ce, [
            (z(!0),
            H(
              A,
              null,
              ee(
                s.items,
                (e) => (
                  z(),
                  te(
                    o,
                    {
                      key: e.id,
                      to: `/${s.baseSlug}/${e.slug}/`,
                      class:
                        'rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100'
                    },
                    { default: se(() => [ae(ne(e.name), 1)]), _: 2 },
                    1032,
                    ['to']
                  )
                )
              ),
              128
            ))
          ])
        );
      };
    }
  }),
  Re = async (a) => {
    const t = `${ie().public.apiUrl}${a}`,
      { data: o, error: e } = await Be(t, { headers: we() }, '$OQ9u013pWL');
    if (e.value)
      throw T({ ...e.value, statusMessage: `Could not fetch data from ${a}` });
    return o.value;
  };
export { Oe as _, Re as u };
