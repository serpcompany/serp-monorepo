import { m as e } from '../../nitro/nitro.mjs';
import { EventEmitter as t } from 'node:events';
import { Buffer as r } from 'node:buffer';
import n from 'node:stream';
import {
  j as s,
  Q as i,
  o as a,
  T as o,
  t as c,
  P as l,
  k as u,
  S as h,
  l as d,
  n as p,
  C as f,
  s as m,
  q as g,
  r as y,
  u as w,
  v as b,
  V as v,
  x as S,
  y as P,
  W as _,
  z as E,
  A,
  B as T,
  D as N,
  E as C,
  F as x,
  G as k,
  H as Q,
  I as R
} from './db/schema.mjs';
import 'node:process';
import 'node:net';
import 'node:timers';
import 'node:assert';
import 'node:util';
import 'node:url';
import 'node:crypto';
import 'node:dns';
import 'node:string_decoder';
const O = globalThis.crypto;
let q = 1;
const z = new Set(),
  j = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])',
  B = `(${j}[.]){3}${j}`,
  I = new RegExp(`^${B}$`),
  L = '(?:[0-9a-fA-F]{1,4})',
  $ = new RegExp(
    `^((?:${L}:){7}(?:${L}|:)|(?:${L}:){6}(?:${B}|:${L}|:)|(?:${L}:){5}(?::${B}|(:${L}){1,2}|:)|(?:${L}:){4}(?:(:${L}){0,1}:${B}|(:${L}){1,3}|:)|(?:${L}:){3}(?:(:${L}){0,2}:${B}|(:${L}){1,4}|:)|(?:${L}:){2}(?:(:${L}){0,3}:${B}|(:${L}){1,5}|:)|(?:${L}:){1}(?:(:${L}){0,4}:${B}|(:${L}){1,6}|:)|(?::((?::${L}){0,5}:${B}|(?::${L}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`
  ),
  D = new TextEncoder(),
  crypto_randomBytes = (e) => O.getRandomValues(r.alloc(e)),
  crypto_pbkdf2Sync = async (e, t, r, n) =>
    O.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: t, iterations: r },
      await O.subtle.importKey('raw', D.encode(e), 'PBKDF2', !1, [
        'deriveBits'
      ]),
      8 * n,
      ['deriveBits']
    ),
  crypto_createHash = (e) => ({
    update: (t) => ({
      digest: (n) => {
        let s;
        if ((t instanceof Uint8Array || (t = D.encode(t)), 'sha256' === e))
          s = O.subtle.digest('SHA-256', t);
        else {
          if ('md5' !== e)
            throw Error(
              'createHash only supports sha256 or md5 in this environment, not ${type}.'
            );
          s = O.subtle.digest('md5', t);
        }
        if ('hex' === n) return s.then((e) => r.from(e).toString('hex'));
        if (n)
          throw Error(
            `createHash only supports hex encoding or unencoded in this environment, not ${n}`
          );
        return s;
      }
    })
  }),
  crypto_createHmac = (e, t) => ({
    update: (e) => ({
      digest: async () =>
        r.from(
          await O.subtle.sign(
            'HMAC',
            await O.subtle.importKey(
              'raw',
              t,
              { name: 'HMAC', hash: 'SHA-256' },
              !1,
              ['sign']
            ),
            D.encode(e)
          )
        )
    })
  }),
  M = globalThis.performance,
  U = { env: {} },
  F = { userInfo: () => ({ username: 'postgres' }) },
  J = {
    readFile() {
      throw new Error('Reading files not supported on CloudFlare');
    }
  },
  W = {
    isIP: (e) => (I.test(e) ? 4 : $.test(e) ? 6 : 0),
    Socket: function () {
      const e = Object.assign(new t(), {
        readyState: 'open',
        raw: null,
        writer: null,
        reader: null,
        connect: async function (t, n) {
          try {
            e.readyState = 'opening';
            const { connect: s } = await import('cloudflare:sockets');
            (e.raw = s(
              n + ':' + t,
              e.ssl ? { secureTransport: 'starttls' } : {}
            )),
              e.raw.closed.then(
                () => {
                  'upgrade' !== e.readyState
                    ? (function () {
                        if ('closed' === e.readyState) return;
                        (e.readyState = 'closed'), e.emit('close');
                      })()
                    : ((e.readyState = 'open'), e.emit('secureConnect'));
                },
                (t) => e.emit('error', t)
              ),
              (e.writer = e.raw.writable.getWriter()),
              (e.reader = e.raw.readable.getReader()),
              e.ssl
                ? (async function () {
                    const { value: t } = await e.reader.read();
                    e.emit('data', r.from(t));
                  })()
                : read(),
              e.writer.ready.then(() => {
                (e.readyState = 'open'), e.emit('connect');
              });
          } catch (e) {
            error(e);
          }
        },
        write: function (t, r) {
          return e.writer.write(t).then(r, error), !0;
        },
        end: function (t) {
          return t ? e.write(t, () => e.raw.close()) : e.raw.close();
        },
        destroy: function () {
          (e.destroyed = !0), e.end();
        },
        read: read
      });
      return e;
      async function read() {
        try {
          let t, n;
          for (; ({ done: t, value: n } = await e.reader.read()), !t; )
            e.emit('data', r.from(n));
        } catch (e) {
          error(e);
        }
      }
      function error(t) {
        e.emit('error', t), e.emit('close');
      }
    }
  },
  V = {
    connect: ({ socket: e, servername: t }) => (
      e.writer.releaseLock(),
      e.reader.releaseLock(),
      (e.readyState = 'upgrading'),
      (e.raw = e.raw.startTls({ servername: t })),
      e.raw.closed.then(
        () => e.emit('close'),
        (t) => e.emit('error', t)
      ),
      (e.writer = e.raw.writable.getWriter()),
      (e.reader = e.raw.readable.getReader()),
      e.writer.ready.then(() => {
        e.read(), (e.readyState = 'upgrade');
      }),
      e
    )
  };
function clearImmediate(e) {
  z.delete(e);
}
const G = new Map(),
  H = new Map(),
  K = Symbol('OriginError'),
  Y = {};
class Query extends Promise {
  constructor(e, t, r, n, s = {}) {
    let i, a;
    super((e, t) => {
      (i = e), (a = t);
    }),
      (this.tagged = Array.isArray(e.raw)),
      (this.strings = e),
      (this.args = t),
      (this.handler = r),
      (this.canceller = n),
      (this.options = s),
      (this.state = null),
      (this.statement = null),
      (this.resolve = (e) => ((this.active = !1), i(e))),
      (this.reject = (e) => ((this.active = !1), a(e))),
      (this.active = !1),
      (this.cancelled = null),
      (this.executed = !1),
      (this.signature = ''),
      (this[K] = this.handler.debug
        ? new Error()
        : this.tagged &&
          (function (e) {
            if (G.has(e)) return G.get(e);
            const t = Error.stackTraceLimit;
            return (
              (Error.stackTraceLimit = 4),
              G.set(e, new Error()),
              (Error.stackTraceLimit = t),
              G.get(e)
            );
          })(this.strings));
  }
  get origin() {
    return (
      (this.handler.debug
        ? this[K].stack
        : this.tagged && H.has(this.strings)
          ? H.get(this.strings)
          : H.set(this.strings, this[K].stack).get(this.strings)) || ''
    );
  }
  static get [Symbol.species]() {
    return Promise;
  }
  cancel() {
    return this.canceller && (this.canceller(this), (this.canceller = null));
  }
  simple() {
    return (this.options.simple = !0), (this.options.prepare = !1), this;
  }
  async readable() {
    return this.simple(), (this.streaming = !0), this;
  }
  async writable() {
    return this.simple(), (this.streaming = !0), this;
  }
  cursor(e = 1, t) {
    if (
      ((this.options.simple = !1),
      'function' == typeof e && ((t = e), (e = 1)),
      (this.cursorRows = e),
      'function' == typeof t)
    )
      return (this.cursorFn = t), this;
    let r;
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => {
          if (this.executed && !this.active) return { done: !0 };
          r && r();
          const e = new Promise((e, t) => {
            (this.cursorFn = (t) => (
              e({ value: t, done: !1 }), new Promise((e) => (r = e))
            )),
              (this.resolve = () => ((this.active = !1), e({ done: !0 }))),
              (this.reject = (e) => ((this.active = !1), t(e)));
          });
          return this.execute(), e;
        },
        return: () => (r && r(Y), { done: !0 })
      })
    };
  }
  describe() {
    return (
      (this.options.simple = !1),
      (this.onlyDescribe = this.options.prepare = !0),
      this
    );
  }
  stream() {
    throw new Error('.stream has been renamed to .forEach');
  }
  forEach(e) {
    return (this.forEachFn = e), this.handle(), this;
  }
  raw() {
    return (this.isRaw = !0), this;
  }
  values() {
    return (this.isRaw = 'values'), this;
  }
  async handle() {
    !this.executed && (this.executed = !0) && (await 1) && this.handler(this);
  }
  execute() {
    return this.handle(), this;
  }
  then() {
    return this.handle(), super.then.apply(this, arguments);
  }
  catch() {
    return this.handle(), super.catch.apply(this, arguments);
  }
  finally() {
    return this.handle(), super.finally.apply(this, arguments);
  }
}
class PostgresError extends Error {
  constructor(e) {
    super(e.message),
      (this.name = this.constructor.name),
      Object.assign(this, e);
  }
}
const X = {
  connection: function connection(e, t, r) {
    const { host: n, port: s } = r || t,
      i = Object.assign(
        new Error('write ' + e + ' ' + (t.path || n + ':' + s)),
        { code: e, errno: e, address: t.path || n },
        t.path ? {} : { port: s }
      );
    return Error.captureStackTrace(i, connection), i;
  },
  postgres: function postgres(e) {
    const t = new PostgresError(e);
    return Error.captureStackTrace(t, postgres), t;
  },
  generic: function generic(e, t) {
    const r = Object.assign(new Error(e + ': ' + t), { code: e });
    return Error.captureStackTrace(r, generic), r;
  },
  notSupported: function notSupported(e) {
    const t = Object.assign(new Error(e + ' (B) is not supported'), {
      code: 'MESSAGE_NOT_SUPPORTED',
      name: e
    });
    return Error.captureStackTrace(t, notSupported), t;
  }
};
const Z = {
  string: { to: 25, from: null, serialize: (e) => '' + e },
  number: {
    to: 0,
    from: [21, 23, 26, 700, 701],
    serialize: (e) => '' + e,
    parse: (e) => +e
  },
  json: {
    to: 114,
    from: [114, 3802],
    serialize: (e) => JSON.stringify(e),
    parse: (e) => JSON.parse(e)
  },
  boolean: {
    to: 16,
    from: 16,
    serialize: (e) => (!0 === e ? 't' : 'f'),
    parse: (e) => 't' === e
  },
  date: {
    to: 1184,
    from: [1082, 1114, 1184],
    serialize: (e) => (e instanceof Date ? e : new Date(e)).toISOString(),
    parse: (e) => new Date(e)
  },
  bytea: {
    to: 17,
    from: 17,
    serialize: (e) => '\\x' + r.from(e).toString('hex'),
    parse: (e) => r.from(e.slice(2), 'hex')
  }
};
class NotTagged {
  then() {
    notTagged();
  }
  catch() {
    notTagged();
  }
  finally() {
    notTagged();
  }
}
class Identifier extends NotTagged {
  constructor(e) {
    super(), (this.value = escapeIdentifier(e));
  }
}
class Parameter extends NotTagged {
  constructor(e, t, r) {
    super(), (this.value = e), (this.type = t), (this.array = r);
  }
}
class Builder extends NotTagged {
  constructor(e, t) {
    super(), (this.first = e), (this.rest = t);
  }
  build(e, t, r, n) {
    const s = te
      .map(([t, r]) => ({ fn: r, i: e.search(t) }))
      .sort((e, t) => e.i - t.i)
      .pop();
    return -1 === s.i
      ? escapeIdentifiers(this.first, n)
      : s.fn(this.first, this.rest, t, r, n);
  }
}
function handleValue(e, t, r, n) {
  let s = e instanceof Parameter ? e.value : e;
  if (
    void 0 === s &&
    (e instanceof Parameter
      ? (e.value = n.transform.undefined)
      : (s = e = n.transform.undefined),
    void 0 === s)
  )
    throw X.generic('UNDEFINED_VALUE', 'Undefined values are not allowed');
  return (
    '$' +
    r.push(
      e instanceof Parameter
        ? (t.push(e.value),
          e.array
            ? e.array[e.type || se(e.value)] || e.type || firstIsString(e.value)
            : e.type)
        : (t.push(e), se(e))
    )
  );
}
const ee = typeHandlers(Z);
function stringify(e, t, r, n, s, i) {
  for (let a = 1; a < e.strings.length; a++)
    (t += stringifyValue(t, r, n, s, i) + e.strings[a]), (r = e.args[a]);
  return t;
}
function stringifyValue(e, t, r, n, s) {
  return t instanceof Builder
    ? t.build(e, r, n, s)
    : t instanceof Query
      ? fragment(t, r, n, s)
      : t instanceof Identifier
        ? t.value
        : t && t[0] instanceof Query
          ? t.reduce((e, t) => e + ' ' + fragment(t, r, n, s), '')
          : handleValue(t, r, n, s);
}
function fragment(e, t, r, n) {
  return (e.fragment = !0), stringify(e, e.strings[0], e.args[0], t, r, n);
}
function valuesBuilder(e, t, r, n, s) {
  return e
    .map(
      (e) =>
        '(' +
        n.map((n) => stringifyValue('values', e[n], t, r, s)).join(',') +
        ')'
    )
    .join(',');
}
function values(e, t, r, n, s) {
  const i = Array.isArray(e[0]);
  return valuesBuilder(
    i ? e : [e],
    r,
    n,
    t.length ? t.flat() : Object.keys(i ? e[0] : e),
    s
  );
}
function select(e, t, r, n, s) {
  if (('string' == typeof e && (e = [e].concat(t)), Array.isArray(e)))
    return escapeIdentifiers(e, s);
  let i;
  return (t.length ? t.flat() : Object.keys(e))
    .map(
      (t) => (
        (i = e[t]),
        (i instanceof Query
          ? fragment(i, r, n, s)
          : i instanceof Identifier
            ? i.value
            : handleValue(i, r, n, s)) +
          ' as ' +
          escapeIdentifier(s.transform.column.to ? s.transform.column.to(t) : t)
      )
    )
    .join(',');
}
const te = Object.entries({
  values: values,
  in: (...e) => {
    const t = values(...e);
    return '()' === t ? '(null)' : t;
  },
  select: select,
  as: select,
  returning: select,
  '\\(': select,
  update: (e, t, r, n, s) =>
    (t.length ? t.flat() : Object.keys(e)).map(
      (t) =>
        escapeIdentifier(s.transform.column.to ? s.transform.column.to(t) : t) +
        '=' +
        stringifyValue('values', e[t], r, n, s)
    ),
  insert(e, t, r, n, s) {
    const i = t.length ? t.flat() : Object.keys(Array.isArray(e) ? e[0] : e);
    return (
      '(' +
      escapeIdentifiers(i, s) +
      ')values' +
      valuesBuilder(Array.isArray(e) ? e : [e], r, n, i, s)
    );
  }
}).map(([e, t]) => [
  new RegExp('((?:^|[\\s(])' + e + '(?:$|[\\s(]))(?![\\s\\S]*\\1)', 'i'),
  t
]);
function notTagged() {
  throw X.generic(
    'NOT_TAGGED_CALL',
    'Query not called as a tagged template literal'
  );
}
const re = ee.serializers,
  ne = ee.parsers;
function firstIsString(e) {
  return Array.isArray(e)
    ? firstIsString(e[0])
    : 'string' == typeof e
      ? 1009
      : 0;
}
const mergeUserTypes = function (e) {
  const t = typeHandlers(e || {});
  return {
    serializers: Object.assign({}, re, t.serializers),
    parsers: Object.assign({}, ne, t.parsers)
  };
};
function typeHandlers(e) {
  return Object.keys(e).reduce(
    (t, r) => (
      e[r].from &&
        [].concat(e[r].from).forEach((n) => (t.parsers[n] = e[r].parse)),
      e[r].serialize &&
        ((t.serializers[e[r].to] = e[r].serialize),
        e[r].from &&
          []
            .concat(e[r].from)
            .forEach((n) => (t.serializers[n] = e[r].serialize))),
      t
    ),
    { parsers: {}, serializers: {} }
  );
}
function escapeIdentifiers(e, { transform: { column: t } }) {
  return e.map((e) => escapeIdentifier(t.to ? t.to(e) : e)).join(',');
}
const escapeIdentifier = function (e) {
    return '"' + e.replace(/"/g, '""').replace(/\./g, '"."') + '"';
  },
  se = function inferType(e) {
    return e instanceof Parameter
      ? e.type
      : e instanceof Date
        ? 1184
        : e instanceof Uint8Array
          ? 17
          : !0 === e || !1 === e
            ? 16
            : 'bigint' == typeof e
              ? 20
              : Array.isArray(e)
                ? inferType(e[0])
                : 0;
  },
  ie = /\\/g,
  ae = /"/g;
const oe = function arraySerializer(e, t, r, n) {
    if (!1 === Array.isArray(e)) return e;
    if (!e.length) return '{}';
    const s = e[0],
      i = 1020 === n ? ';' : ',';
    return Array.isArray(s) && !s.type
      ? '{' + e.map((e) => arraySerializer(e, t, r, n)).join(i) + '}'
      : '{' +
          e
            .map((e) => {
              if (void 0 === e && void 0 === (e = r.transform.undefined))
                throw X.generic(
                  'UNDEFINED_VALUE',
                  'Undefined values are not allowed'
                );
              return null === e
                ? 'null'
                : '"' +
                    (function (e) {
                      return e.replace(ie, '\\\\').replace(ae, '\\"');
                    })(t ? t(e.type ? e.value : e) : '' + e) +
                    '"';
            })
            .join(i) +
          '}';
  },
  ce = { i: 0, char: null, str: '', quoted: !1, last: 0 },
  arrayParser = function (e, t, r) {
    return (ce.i = ce.last = 0), arrayParserLoop(ce, e, t, r);
  };
function arrayParserLoop(e, t, r, n) {
  const s = [],
    i = 1020 === n ? ';' : ',';
  for (; e.i < t.length; e.i++) {
    if (((e.char = t[e.i]), e.quoted))
      '\\' === e.char
        ? (e.str += t[++e.i])
        : '"' === e.char
          ? (s.push(r ? r(e.str) : e.str),
            (e.str = ''),
            (e.quoted = '"' === t[e.i + 1]),
            (e.last = e.i + 2))
          : (e.str += e.char);
    else if ('"' === e.char) e.quoted = !0;
    else if ('{' === e.char)
      (e.last = ++e.i), s.push(arrayParserLoop(e, t, r, n));
    else {
      if ('}' === e.char) {
        (e.quoted = !1),
          e.last < e.i &&
            s.push(r ? r(t.slice(e.last, e.i)) : t.slice(e.last, e.i)),
          (e.last = e.i + 1);
        break;
      }
      e.char === i &&
        '}' !== e.p &&
        '"' !== e.p &&
        (s.push(r ? r(t.slice(e.last, e.i)) : t.slice(e.last, e.i)),
        (e.last = e.i + 1));
    }
    e.p = e.char;
  }
  return (
    e.last < e.i &&
      s.push(r ? r(t.slice(e.last, e.i + 1)) : t.slice(e.last, e.i + 1)),
    s
  );
}
const toCamel = (e) => {
    let t = e[0];
    for (let r = 1; r < e.length; r++)
      t += '_' === e[r] ? e[++r].toUpperCase() : e[r];
    return t;
  },
  toPascal = (e) => {
    let t = e[0].toUpperCase();
    for (let r = 1; r < e.length; r++)
      t += '_' === e[r] ? e[++r].toUpperCase() : e[r];
    return t;
  },
  toKebab = (e) => e.replace(/_/g, '-'),
  fromCamel = (e) => e.replace(/([A-Z])/g, '_$1').toLowerCase(),
  fromPascal = (e) =>
    (e.slice(0, 1) + e.slice(1).replace(/([A-Z])/g, '_$1')).toLowerCase(),
  fromKebab = (e) => e.replace(/-/g, '_');
function createJsonTransform(e) {
  return function jsonTransform(t, r) {
    return 'object' != typeof t ||
      null === t ||
      (114 !== r.type && 3802 !== r.type)
      ? t
      : Array.isArray(t)
        ? t.map((e) => jsonTransform(e, r))
        : Object.entries(t).reduce(
            (t, [n, s]) => Object.assign(t, { [e(n)]: jsonTransform(s, r) }),
            {}
          );
  };
}
(toCamel.column = { from: toCamel }),
  (toCamel.value = { from: createJsonTransform(toCamel) }),
  (fromCamel.column = { to: fromCamel });
const le = { ...toCamel };
(le.column.to = fromCamel),
  (toPascal.column = { from: toPascal }),
  (toPascal.value = { from: createJsonTransform(toPascal) }),
  (fromPascal.column = { to: fromPascal });
const ue = { ...toPascal };
(ue.column.to = fromPascal),
  (toKebab.column = { from: toKebab }),
  (toKebab.value = { from: createJsonTransform(toKebab) }),
  (fromKebab.column = { to: fromKebab });
const he = { ...toKebab };
he.column.to = fromKebab;
class Result extends Array {
  constructor() {
    super(),
      Object.defineProperties(this, {
        count: { value: null, writable: !0 },
        state: { value: null, writable: !0 },
        command: { value: null, writable: !0 },
        columns: { value: null, writable: !0 },
        statement: { value: null, writable: !0 }
      });
  }
  static get [Symbol.species]() {
    return Array;
  }
}
function Queue(e = []) {
  let t = e.slice(),
    r = 0;
  return {
    get length() {
      return t.length - r;
    },
    remove: (e) => {
      const r = t.indexOf(e);
      return -1 === r ? null : (t.splice(r, 1), e);
    },
    push: (e) => (t.push(e), e),
    shift: () => {
      const e = t[r++];
      return r === t.length ? ((r = 0), (t = [])) : (t[r - 1] = void 0), e;
    }
  };
}
let de = r.allocUnsafe(256);
const pe = 'BCcDdEFfHPpQSX'.split('').reduce((e, t) => {
    const r = t.charCodeAt(0);
    return (e[t] = () => ((de[0] = r), (fe.i = 5), fe)), e;
  }, {}),
  fe = Object.assign(
    function () {
      return (fe.i = 0), fe;
    },
    pe,
    {
      N: String.fromCharCode(0),
      i: 0,
      inc: (e) => ((fe.i += e), fe),
      str(e) {
        const t = r.byteLength(e);
        return fit(t), (fe.i += de.write(e, fe.i, t, 'utf8')), fe;
      },
      i16: (e) => (fit(2), de.writeUInt16BE(e, fe.i), (fe.i += 2), fe),
      i32: (e, t) =>
        t || 0 === t
          ? (de.writeUInt32BE(e, t), fe)
          : (fit(4), de.writeUInt32BE(e, fe.i), (fe.i += 4), fe),
      z: (e) => (fit(e), de.fill(0, fe.i, fe.i + e), (fe.i += e), fe),
      raw: (e) => (
        (de = r.concat([de.subarray(0, fe.i), e])), (fe.i = de.length), fe
      ),
      end(e = 1) {
        de.writeUInt32BE(fe.i - e, e);
        const t = de.subarray(0, fe.i);
        return (fe.i = 0), (de = r.allocUnsafe(256)), t;
      }
    }
  );
function fit(e) {
  if (de.length - fe.i < e) {
    const t = de,
      n = t.length;
    (de = r.allocUnsafe(n + (n >> 1) + e)), t.copy(de);
  }
}
let me = 1;
const ge = fe().S().end(),
  ye = fe().H().end(),
  we = fe().i32(8).i32(80877103).end(8),
  be = r.concat([fe().E().str(fe.N).i32(0).end(), ge]),
  ve = fe().D().str('S').str(fe.N).end(),
  noop$1 = () => {},
  Se = new Set([
    'FetchPreparedStatement',
    'RevalidateCachedQuery',
    'transformAssignedExpr'
  ]),
  Pe = {
    83: 'severity_local',
    86: 'severity',
    67: 'code',
    77: 'message',
    68: 'detail',
    72: 'hint',
    80: 'position',
    112: 'internal_position',
    113: 'internal_query',
    87: 'where',
    115: 'schema_name',
    116: 'table_name',
    99: 'column_name',
    100: 'data type_name',
    110: 'constraint_name',
    70: 'file',
    76: 'line',
    82: 'routine'
  };
function Connection(
  e,
  t = {},
  { onopen: s = noop$1, onend: i = noop$1, onclose: a = noop$1 } = {}
) {
  const {
      ssl: o,
      max: c,
      user: l,
      host: u,
      port: h,
      database: d,
      parsers: p,
      transform: f,
      onnotice: m,
      onnotify: g,
      onparameter: y,
      max_pipeline: w,
      keep_alive: b,
      backoff: v,
      target_session_attrs: S
    } = e,
    P = Queue(),
    _ = me++,
    E = { pid: null, secret: null },
    A = timer(end, e.idle_timeout),
    T = timer(end, e.max_lifetime),
    N = timer(function () {
      errored(X.connection('CONNECT_TIMEOUT', e, x)), x.destroy();
    }, e.connect_timeout);
  let C,
    x = null,
    k = new Result(),
    Q = r.alloc(0),
    R = e.fetch_types,
    O = {},
    j = {},
    B = Math.random().toString(36).slice(2),
    I = 1,
    L = 0,
    $ = 0,
    D = 0,
    U = 0,
    F = 0,
    J = 0,
    G = 0,
    H = null,
    K = null,
    Z = !1,
    ee = null,
    te = null,
    re = null,
    ne = null,
    se = null,
    ie = null,
    ae = null,
    ce = null,
    le = null,
    ue = null;
  const he = {
    queue: t.closed,
    idleTimer: A,
    connect(e) {
      (re = e || !0), reconnect();
    },
    terminate: terminate,
    execute: execute,
    cancel: async function ({ pid: e, secret: t }, r, n) {
      try {
        (C = fe().i32(16).i32(80877102).i32(e).i32(t).end(16)),
          await connect(),
          x.once('error', n),
          x.once('close', r);
      } catch (e) {
        n(e);
      }
    },
    end: end,
    count: 0,
    id: _
  };
  return t.closed && t.closed.push(he), he;
  function execute(t) {
    if (Z) return queryError(t, X.connection('CONNECTION_DESTROYED', e));
    if (!t.cancelled)
      try {
        return (
          (t.state = E),
          le ? P.push(t) : ((le = t), (le.active = !0)),
          (function (t) {
            const r = [],
              n = [],
              s = stringify(t, t.strings[0], t.args[0], r, n, e);
            !t.tagged && t.args.forEach((t) => handleValue(t, r, n, e)),
              (t.prepare =
                e.prepare && (!('prepare' in t.options) || t.options.prepare)),
              (t.string = s),
              (t.signature = t.prepare && n + s),
              t.onlyDescribe && delete j[t.signature],
              (t.parameters = t.parameters || r),
              (t.prepared = t.prepare && t.signature in j),
              (t.describeFirst = t.onlyDescribe || (r.length && !t.prepared)),
              (t.statement = t.prepared
                ? j[t.signature]
                : { string: s, types: n, name: t.prepare ? B + I++ : '' }),
              'function' == typeof e.debug && e.debug(_, s, r, n);
          })(t),
          write(
            (function (e) {
              if (e.parameters.length >= 65534)
                throw X.generic(
                  'MAX_PARAMETERS_EXCEEDED',
                  'Max number of parameters (65534) exceeded'
                );
              return e.options.simple
                ? fe()
                    .Q()
                    .str(e.statement.string + fe.N)
                    .end()
                : e.describeFirst
                  ? r.concat([describe(e), ye])
                  : e.prepare
                    ? e.prepared
                      ? prepared(e)
                      : r.concat([describe(e), prepared(e)])
                    : (function (e) {
                        return r.concat([
                          Parse(
                            e.statement.string,
                            e.parameters,
                            e.statement.types
                          ),
                          ve,
                          prepared(e)
                        ]);
                      })(e);
            })(t)
          ) &&
            !t.describeFirst &&
            !t.cursorFn &&
            P.length < w &&
            (!t.options.onexecute || t.options.onexecute(he))
        );
      } catch (e) {
        return 0 === P.length && write(ge), errored(e), !0;
      }
  }
  function describe(e) {
    return r.concat([
      Parse(
        e.statement.string,
        e.parameters,
        e.statement.types,
        e.statement.name
      ),
      Describe('S', e.statement.name)
    ]);
  }
  function prepared(e) {
    return r.concat([
      Bind(e.parameters, e.statement.types, e.statement.name, e.cursorName),
      e.cursorFn ? Execute('', e.cursorRows) : be
    ]);
  }
  function write(e, t) {
    return (
      (ie = ie ? r.concat([ie, e]) : r.from(e)),
      ie.length >= 1024
        ? nextWrite(t)
        : (null === K &&
            (K = (function (e) {
              const t = q++;
              return (
                z.add(t),
                queueMicrotask(() => {
                  z.has(t) && (e(), z.delete(t));
                }),
                t
              );
            })(nextWrite)),
          !0)
    );
  }
  function nextWrite(e) {
    const t = x.write(ie, e);
    return null !== K && clearImmediate(K), (ie = K = null), t;
  }
  async function secure() {
    write(we);
    if (
      !(await new Promise((e) => x.once('data', (t) => e(83 === t[0])))) &&
      'prefer' === o
    )
      return connected();
    x.removeAllListeners(),
      (x = V.connect({
        socket: x,
        servername: W.isIP(x.host) ? void 0 : x.host,
        ...('require' === o || 'allow' === o || 'prefer' === o
          ? { rejectUnauthorized: !1 }
          : 'verify-full' === o
            ? {}
            : 'object' == typeof o
              ? o
              : {})
      })),
      x.on('secureConnect', connected),
      x.on('error', error),
      x.on('close', closed),
      x.on('drain', drain);
  }
  function drain() {
    !le && s(he);
  }
  function data(e) {
    if (!(ee && (ee.push(e), ($ -= e.length), $ >= 0)))
      for (
        Q = ee
          ? r.concat(ee, F - $)
          : 0 === Q.length
            ? e
            : r.concat([Q, e], Q.length + e.length);
        Q.length > 4;

      ) {
        if (((F = Q.readUInt32BE(1)), F >= Q.length)) {
          ($ = F - Q.length), (ee = [Q]);
          break;
        }
        try {
          handle(Q.subarray(0, F + 1));
        } catch (e) {
          le && (le.cursorFn || le.describeFirst) && write(ge), errored(e);
        }
        (Q = Q.subarray(F + 1)), ($ = 0), (ee = null);
      }
  }
  async function connect() {
    if (
      ((Z = !1),
      (O = {}),
      x ||
        (x = await (async function () {
          let t;
          try {
            t = e.socket ? await Promise.resolve(e.socket(e)) : new W.Socket();
          } catch (e) {
            return void error(e);
          }
          return (
            t.on('error', error), t.on('close', closed), t.on('drain', drain), t
          );
        })()),
      x)
    ) {
      if ((N.start(), e.socket)) return o ? secure() : connected();
      if ((x.on('connect', o ? secure : connected), e.path))
        return x.connect(e.path);
      (x.ssl = o),
        x.connect(h[D], u[D]),
        (x.host = u[D]),
        (x.port = h[D]),
        (D = (D + 1) % h.length);
    }
  }
  function reconnect() {
    setTimeout(connect, L ? L + J - M.now() : 0);
  }
  function connected() {
    try {
      (j = {}),
        (R = e.fetch_types),
        (B = Math.random().toString(36).slice(2)),
        (I = 1),
        T.start(),
        x.on('data', data),
        b && x.setKeepAlive && x.setKeepAlive(!0, 1e3 * b);
      write(
        C ||
          fe()
            .inc(4)
            .i16(3)
            .z(2)
            .str(
              Object.entries(
                Object.assign(
                  { user: l, database: d, client_encoding: 'UTF8' },
                  e.connection
                )
              )
                .filter(([, e]) => e)
                .map(([e, t]) => e + fe.N + t)
                .join(fe.N)
            )
            .z(2)
            .end(0)
      );
    } catch (e) {
      error(e);
    }
  }
  function error(r) {
    if (he.queue !== t.connecting || !e.host[U + 1])
      for (errored(r); P.length; ) queryError(P.shift(), r);
  }
  function errored(e) {
    se && (se.destroy(e), (se = null)),
      le && queryError(le, e),
      re && (queryError(re, e), (re = null));
  }
  function queryError(t, r) {
    'query' in r ||
      'parameters' in r ||
      Object.defineProperties(r, {
        stack: {
          value: r.stack + t.origin.replace(/.*\n/, '\n'),
          enumerable: e.debug
        },
        query: { value: t.string, enumerable: e.debug },
        parameters: { value: t.parameters, enumerable: e.debug },
        args: { value: t.args, enumerable: e.debug },
        types: { value: t.statement && t.statement.types, enumerable: e.debug }
      }),
      t.reject(r);
  }
  function end() {
    return (
      ne ||
      (!he.reserved && i(he),
      he.reserved || re || le || 0 !== P.length
        ? (ne = new Promise((e) => (ae = e)))
        : (terminate(),
          new Promise((e) =>
            x && 'closed' !== x.readyState ? x.once('close', e) : e()
          )))
    );
  }
  function terminate() {
    (Z = !0),
      (se || le || re || P.length) &&
        error(X.connection('CONNECTION_DESTROYED', e)),
      clearImmediate(K),
      x &&
        (x.removeListener('data', data),
        x.removeListener('connect', connected),
        'open' === x.readyState && x.end(fe().X().end())),
      ae && (ae(), (ne = ae = null));
  }
  async function closed(t) {
    if (
      ((Q = r.alloc(0)),
      ($ = 0),
      (ee = null),
      clearImmediate(K),
      x.removeListener('data', data),
      x.removeListener('connect', connected),
      A.cancel(),
      T.cancel(),
      N.cancel(),
      x.removeAllListeners(),
      (x = null),
      re)
    )
      return reconnect();
    !t && (le || P.length) && error(X.connection('CONNECTION_CLOSED', e, x)),
      (L = M.now()),
      t && e.shared.retries++,
      (J = 1e3 * ('function' == typeof v ? v(e.shared.retries) : v)),
      a(he, X.connection('CONNECTION_CLOSED', e, x));
  }
  function handle(e, t = e[0]) {
    (68 === t
      ? DataRow
      : 100 === t
        ? CopyData
        : 65 === t
          ? NotificationResponse
          : 83 === t
            ? ParameterStatus
            : 90 === t
              ? ReadyForQuery
              : 67 === t
                ? CommandComplete
                : 50 === t
                  ? BindComplete
                  : 49 === t
                    ? ParseComplete
                    : 116 === t
                      ? ParameterDescription
                      : 84 === t
                        ? RowDescription
                        : 82 === t
                          ? Authentication
                          : 110 === t
                            ? NoData
                            : 75 === t
                              ? BackendKeyData
                              : 69 === t
                                ? ErrorResponse
                                : 115 === t
                                  ? PortalSuspended
                                  : 51 === t
                                    ? CloseComplete
                                    : 71 === t
                                      ? CopyInResponse
                                      : 78 === t
                                        ? NoticeResponse
                                        : 72 === t
                                          ? CopyOutResponse
                                          : 99 === t
                                            ? CopyDone
                                            : 73 === t
                                              ? EmptyQueryResponse
                                              : 86 === t
                                                ? FunctionCallResponse
                                                : 118 === t
                                                  ? NegotiateProtocolVersion
                                                  : 87 === t
                                                    ? CopyBothResponse
                                                    : UnknownMessage)(e);
  }
  function DataRow(e) {
    let t,
      r,
      n,
      s = 7;
    const i = le.isRaw ? new Array(le.statement.columns.length) : {};
    for (let a = 0; a < le.statement.columns.length; a++)
      (r = le.statement.columns[a]),
        (t = e.readInt32BE(s)),
        (s += 4),
        (n =
          -1 === t
            ? null
            : !0 === le.isRaw
              ? e.subarray(s, (s += t))
              : void 0 === r.parser
                ? e.toString('utf8', s, (s += t))
                : !0 === r.parser.array
                  ? r.parser(e.toString('utf8', s + 1, (s += t)))
                  : r.parser(e.toString('utf8', s, (s += t)))),
        le.isRaw
          ? (i[a] = !0 === le.isRaw ? n : f.value.from ? f.value.from(n, r) : n)
          : (i[r.name] = f.value.from ? f.value.from(n, r) : n);
    le.forEachFn
      ? le.forEachFn(f.row.from ? f.row.from(i) : i, k)
      : (k[G++] = f.row.from ? f.row.from(i) : i);
  }
  function ParameterStatus(t) {
    const [r, n] = t.toString('utf8', 5, t.length - 1).split(fe.N);
    (O[r] = n), e.parameters[r] !== n && ((e.parameters[r] = n), y && y(r, n));
  }
  function ReadyForQuery(t) {
    if (
      (le && le.options.simple && le.resolve(te || k),
      (le = te = null),
      (k = new Result()),
      N.cancel(),
      re)
    ) {
      if (S) {
        if (!O.in_hot_standby || !O.default_transaction_read_only)
          return (function () {
            const e = new Query(
              [
                '\n      show transaction_read_only;\n      select pg_catalog.pg_is_in_recovery()\n    '
              ],
              [],
              execute,
              null,
              { simple: !0 }
            );
            (e.resolve = ([[e], [t]]) => {
              (O.default_transaction_read_only = e.transaction_read_only),
                (O.in_hot_standby = t.pg_is_in_recovery ? 'on' : 'off');
            }),
              e.execute();
          })();
        if (
          (function (t, r) {
            return (
              ('read-write' === t &&
                'on' === r.default_transaction_read_only) ||
              ('read-only' === t &&
                'off' === r.default_transaction_read_only) ||
              ('primary' === t && 'on' === r.in_hot_standby) ||
              ('standby' === t && 'off' === r.in_hot_standby) ||
              ('prefer-standby' === t &&
                'off' === r.in_hot_standby &&
                e.host[U])
            );
          })(S, O)
        )
          return terminate();
      }
      return R
        ? (!0 === re && (re = null),
          (async function () {
            R = !1;
            const t = await new Query(
              [
                "\n      select b.oid, b.typarray\n      from pg_catalog.pg_type a\n      left join pg_catalog.pg_type b on b.oid = a.typelem\n      where a.typcategory = 'A'\n      group by b.oid, b.typarray\n      order by b.oid\n    "
              ],
              [],
              execute
            );
            t.forEach(({ oid: t, typarray: r }) =>
              (function (t, r) {
                if (e.parsers[r] && e.serializers[r]) return;
                const n = e.parsers[t];
                (e.shared.typeArrayMap[t] = r),
                  (e.parsers[r] = (e) => arrayParser(e, n, r)),
                  (e.parsers[r].array = !0),
                  (e.serializers[r] = (n) => oe(n, e.serializers[t], e, r));
              })(t, r)
            );
          })())
        : (!0 !== re && execute(re),
          (e.shared.retries = U = 0),
          void (re = null));
    }
    for (; P.length && (le = P.shift()) && ((le.active = !0), le.cancelled); )
      Connection(e).cancel(le.state, le.cancelled.resolve, le.cancelled.reject);
    le ||
      (he.reserved
        ? he.reserved.release || 73 !== t[5]
          ? he.reserved()
          : ne
            ? terminate()
            : ((he.reserved = null), s(he))
        : ne
          ? terminate()
          : s(he));
  }
  function CommandComplete(e) {
    G = 0;
    for (let t = e.length - 1; t > 0; t--)
      if (
        (32 === e[t] &&
          e[t + 1] < 58 &&
          null === k.count &&
          (k.count = +e.toString('utf8', t + 1, e.length - 1)),
        e[t - 1] >= 65)
      ) {
        (k.command = e.toString('utf8', 5, t)), (k.state = E);
        break;
      }
    return (
      ue && (ue(), (ue = null)),
      'BEGIN' !== k.command || 1 === c || he.reserved
        ? le.options.simple
          ? BindComplete()
          : (le.cursorFn && (k.count && le.cursorFn(k), write(ge)),
            void le.resolve(k))
        : errored(
            X.generic(
              'UNSAFE_TRANSACTION',
              'Only use sql.begin, sql.reserved or max: 1'
            )
          )
    );
  }
  function ParseComplete() {
    le.parsing = !1;
  }
  function BindComplete() {
    !k.statement && (k.statement = le.statement),
      (k.columns = le.statement.columns);
  }
  function ParameterDescription(e) {
    const t = e.readUInt16BE(5);
    for (let r = 0; r < t; ++r)
      !le.statement.types[r] &&
        (le.statement.types[r] = e.readUInt32BE(7 + 4 * r));
    le.prepare && (j[le.signature] = le.statement),
      le.describeFirst &&
        !le.onlyDescribe &&
        (write(prepared(le)), (le.describeFirst = !1));
  }
  function RowDescription(e) {
    k.command &&
      ((te = te || [k]),
      te.push((k = new Result())),
      (k.count = null),
      (le.statement.columns = null));
    const t = e.readUInt16BE(5);
    let r,
      n = 7;
    le.statement.columns = Array(t);
    for (let s = 0; s < t; ++s) {
      for (r = n; 0 !== e[n++]; );
      const t = e.readUInt32BE(n),
        i = e.readUInt16BE(n + 4),
        a = e.readUInt32BE(n + 6);
      (le.statement.columns[s] = {
        name: f.column.from
          ? f.column.from(e.toString('utf8', r, n - 1))
          : e.toString('utf8', r, n - 1),
        parser: p[a],
        table: t,
        number: i,
        type: a
      }),
        (n += 18);
    }
    if (((k.statement = le.statement), le.onlyDescribe))
      return le.resolve(le.statement), write(ge);
  }
  async function Authentication(e, t = e.readUInt32BE(5)) {
    (3 === t
      ? AuthenticationCleartextPassword
      : 5 === t
        ? AuthenticationMD5Password
        : 10 === t
          ? SASL
          : 11 === t
            ? SASLContinue
            : 12 === t
              ? SASLFinal
              : 0 !== t
                ? UnknownAuth
                : noop$1)(e, t);
  }
  async function AuthenticationCleartextPassword() {
    const e = await Pass();
    write(fe().p().str(e).z(1).end());
  }
  async function AuthenticationMD5Password(e) {
    const t =
      'md5' +
      (await md5(
        r.concat([r.from(await md5((await Pass()) + l)), e.subarray(9)])
      ));
    write(fe().p().str(t).z(1).end());
  }
  async function SASL() {
    (ce = (await crypto_randomBytes(18)).toString('base64')),
      fe()
        .p()
        .str('SCRAM-SHA-256' + fe.N);
    const e = fe.i;
    write(
      fe
        .inc(4)
        .str('n,,n=*,r=' + ce)
        .i32(fe.i - e - 4, e)
        .end()
    );
  }
  async function SASLContinue(e) {
    const t = e
        .toString('utf8', 9)
        .split(',')
        .reduce((e, t) => ((e[t[0]] = t.slice(2)), e), {}),
      n = await crypto_pbkdf2Sync(
        await Pass(),
        r.from(t.s, 'base64'),
        parseInt(t.i),
        32,
        'sha256'
      ),
      s = await hmac(n, 'Client Key'),
      i =
        'n=*,r=' +
        ce +
        ',r=' +
        t.r +
        ',s=' +
        t.s +
        ',i=' +
        t.i +
        ',c=biws,r=' +
        t.r;
    H = (await hmac(await hmac(n, 'Server Key'), i)).toString('base64');
    const a =
      'c=biws,r=' +
      t.r +
      ',p=' +
      (function (e, t) {
        const n = Math.max(e.length, t.length),
          s = r.allocUnsafe(n);
        for (let r = 0; r < n; r++) s[r] = e[r] ^ t[r];
        return s;
      })(
        s,
        r.from(
          await hmac(
            await (function (e) {
              return crypto_createHash('sha256').update(e).digest();
            })(s),
            i
          )
        )
      ).toString('base64');
    write(fe().p().str(a).end());
  }
  function SASLFinal(e) {
    e.toString('utf8', 9).split(fe.N, 1)[0].slice(2) !== H &&
      (errored(
        X.generic(
          'SASL_SIGNATURE_MISMATCH',
          'The server did not return the correct signature'
        )
      ),
      x.destroy());
  }
  function Pass() {
    return Promise.resolve('function' == typeof e.pass ? e.pass() : e.pass);
  }
  function NoData() {
    if (
      ((k.statement = le.statement),
      (k.statement.columns = []),
      le.onlyDescribe)
    )
      return le.resolve(le.statement), write(ge);
  }
  function BackendKeyData(e) {
    (E.pid = e.readUInt32BE(5)), (E.secret = e.readUInt32BE(9));
  }
  function ErrorResponse(e) {
    le && (le.cursorFn || le.describeFirst) && write(ge);
    const t = X.postgres(parseError(e));
    le && le.retried
      ? errored(le.retried)
      : le && le.prepared && Se.has(t.routine)
        ? (function (e, t) {
            delete j[e.signature], (e.retried = t), execute(e);
          })(le, t)
        : errored(t);
  }
  function NotificationResponse(e) {
    if (!g) return;
    let t = 9;
    for (; 0 !== e[t++]; );
    g(e.toString('utf8', 9, t - 1), e.toString('utf8', t, e.length - 1));
  }
  async function PortalSuspended() {
    try {
      const e = await Promise.resolve(le.cursorFn(k));
      (G = 0),
        e === Y
          ? write(
              (function (e = '') {
                return r.concat([
                  fe()
                    .C()
                    .str('P')
                    .str(e + fe.N)
                    .end(),
                  fe().S().end()
                ]);
              })(le.portal)
            )
          : ((k = new Result()), write(Execute('', le.cursorRows)));
    } catch (e) {
      write(ge), le.reject(e);
    }
  }
  function CloseComplete() {
    k.count && le.cursorFn(k), le.resolve(k);
  }
  function CopyInResponse() {
    (se = new n.Writable({
      autoDestroy: !0,
      write(e, t, r) {
        x.write(fe().d().raw(e).end(), r);
      },
      destroy(e, t) {
        t(e),
          x.write(
            fe()
              .f()
              .str(e + fe.N)
              .end()
          ),
          (se = null);
      },
      final(e) {
        x.write(fe().c().end()), (ue = e);
      }
    })),
      le.resolve(se);
  }
  function CopyOutResponse() {
    (se = new n.Readable({
      read() {
        x.resume();
      }
    })),
      le.resolve(se);
  }
  function CopyBothResponse() {
    (se = new n.Duplex({
      autoDestroy: !0,
      read() {
        x.resume();
      },
      write(e, t, r) {
        x.write(fe().d().raw(e).end(), r);
      },
      destroy(e, t) {
        t(e),
          x.write(
            fe()
              .f()
              .str(e + fe.N)
              .end()
          ),
          (se = null);
      },
      final(e) {
        x.write(fe().c().end()), (ue = e);
      }
    })),
      le.resolve(se);
  }
  function CopyData(e) {
    se && (se.push(e.subarray(5)) || x.pause());
  }
  function CopyDone() {
    se && se.push(null), (se = null);
  }
  function NoticeResponse(e) {
    m ? m(parseError(e)) : console.log(parseError(e));
  }
  function EmptyQueryResponse() {}
  function FunctionCallResponse() {
    errored(X.notSupported('FunctionCallResponse'));
  }
  function NegotiateProtocolVersion() {
    errored(X.notSupported('NegotiateProtocolVersion'));
  }
  function UnknownMessage(e) {
    console.error('Postgres.js : Unknown Message:', e[0]);
  }
  function UnknownAuth(e, t) {
    console.error('Postgres.js : Unknown Auth:', t);
  }
  function Bind(t, r, n = '', s = '') {
    let i, a;
    return (
      fe()
        .B()
        .str(s + fe.N)
        .str(n + fe.N)
        .i16(0)
        .i16(t.length),
      t.forEach((n, s) => {
        if (null === n) return fe.i32(4294967295);
        (a = r[s]),
          (t[s] = n = a in e.serializers ? e.serializers[a](n) : '' + n),
          (i = fe.i),
          fe
            .inc(4)
            .str(n)
            .i32(fe.i - i - 4, i);
      }),
      fe.i16(0),
      fe.end()
    );
  }
  function Parse(e, t, r, n = '') {
    return (
      fe()
        .P()
        .str(n + fe.N)
        .str(e + fe.N)
        .i16(t.length),
      t.forEach((e, t) => fe.i32(r[t] || 0)),
      fe.end()
    );
  }
  function Describe(e, t = '') {
    return fe()
      .D()
      .str(e)
      .str(t + fe.N)
      .end();
  }
  function Execute(e = '', t = 0) {
    return r.concat([
      fe()
        .E()
        .str(e + fe.N)
        .i32(t)
        .end(),
      ye
    ]);
  }
}
function parseError(e) {
  const t = {};
  let r = 5;
  for (let n = 5; n < e.length - 1; n++)
    0 === e[n] && ((t[Pe[e[r]]] = e.toString('utf8', r + 1, n)), (r = n + 1));
  return t;
}
function md5(e) {
  return crypto_createHash('md5').update(e).digest('hex');
}
function hmac(e, t) {
  return crypto_createHmac('sha256', e).update(t).digest();
}
function timer(e, t) {
  if (!(t = 'function' == typeof t ? t() : t))
    return { cancel: noop$1, start: noop$1 };
  let r;
  return {
    cancel() {
      r && (clearTimeout(r), (r = null));
    },
    start() {
      r && clearTimeout(r), (r = setTimeout(done, 1e3 * t, arguments));
    }
  };
  function done(t) {
    e.apply(null, t), (r = null);
  }
}
const noop = () => {};
function Subscribe(e, t) {
  const n = new Map(),
    s = 'postgresjs_' + Math.random().toString(36).slice(2),
    i = {};
  let a,
    o,
    c = !1;
  const l = (subscribe.sql = e({
      ...t,
      transform: { column: {}, value: {}, row: {} },
      max: 1,
      fetch_types: !1,
      idle_timeout: null,
      max_lifetime: null,
      connection: { ...t.connection, replication: 'database' },
      onclose: async function () {
        c ||
          ((o = null),
          (i.pid = i.secret = void 0),
          connected(await init(l, s, t.publications)),
          n.forEach((e) => e.forEach(({ onsubscribe: e }) => e())));
      },
      no_subscribe: !0
    })),
    u = l.end,
    h = l.close;
  return (
    (l.end = async () => (
      (c = !0),
      o && (await new Promise((e) => (o.once('close', e), o.end()))),
      u()
    )),
    (l.close = async () => (
      o && (await new Promise((e) => (o.once('close', e), o.end()))), h()
    )),
    subscribe
  );
  async function subscribe(e, r, c = noop, u = noop) {
    (e = (function (e) {
      const t =
        e.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
      if (!t) throw new Error('Malformed subscribe pattern: ' + e);
      const [, r, n, s] = t;
      return (
        (r || '*') +
        (n ? ':' + (-1 === n.indexOf('.') ? 'public.' + n : n) : '') +
        (s ? '=' + s : '')
      );
    })(e)),
      a || (a = init(l, s, t.publications));
    const h = { fn: r, onsubscribe: c },
      d = n.has(e) ? n.get(e).add(h) : n.set(e, new Set([h])).get(e),
      unsubscribe = () => {
        d.delete(h), 0 === d.size && n.delete(e);
      };
    return a.then(
      (e) => (
        connected(e),
        c(),
        o && o.on('error', u),
        { unsubscribe: unsubscribe, state: i, sql: l }
      )
    );
  }
  function connected(e) {
    (o = e.stream), (i.pid = e.state.pid), (i.secret = e.state.secret);
  }
  async function init(e, n, s) {
    if (!s) throw new Error('Missing publication names');
    const i = await e.unsafe(
        `CREATE_REPLICATION_SLOT ${n} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`
      ),
      [a] = i,
      o = await e
        .unsafe(
          `START_REPLICATION SLOT ${n} LOGICAL ${a.consistent_point} (proto_version '1', publication_names '${s}')`
        )
        .writable(),
      c = {
        lsn: r.concat(
          a.consistent_point
            .split('/')
            .map((e) => r.from(('00000000' + e).slice(-8), 'hex'))
        )
      };
    return (
      o.on('data', function (n) {
        119 === n[0]
          ? (function (e, t, r, n, s) {
              const char = (e, [t, r]) => ((e[t.charCodeAt(0)] = r), e);
              Object.entries({
                R: (e) => {
                  let n = 1;
                  const i = (t[e.readUInt32BE(n)] = {
                    schema:
                      e.toString('utf8', (n += 4), (n = e.indexOf(0, n))) ||
                      'pg_catalog',
                    table: e.toString('utf8', n + 1, (n = e.indexOf(0, n + 1))),
                    columns: Array(e.readUInt16BE((n += 2))),
                    keys: []
                  });
                  n += 2;
                  let a,
                    o = 0;
                  for (; n < e.length; )
                    (a = i.columns[o++] =
                      {
                        key: e[n++],
                        name: s.column.from
                          ? s.column.from(
                              e.toString('utf8', n, (n = e.indexOf(0, n)))
                            )
                          : e.toString('utf8', n, (n = e.indexOf(0, n))),
                        type: e.readUInt32BE((n += 1)),
                        parser: r[e.readUInt32BE(n)],
                        atttypmod: e.readUInt32BE((n += 4))
                      }),
                      a.key && i.keys.push(a),
                      (n += 4);
                },
                Y: () => {},
                O: () => {},
                B: (e) => {
                  (t.date = (function (e) {
                    return new Date(
                      Date.UTC(2e3, 0, 1) + Number(e / BigInt(1e3))
                    );
                  })(e.readBigInt64BE(9))),
                    (t.lsn = e.subarray(1, 9));
                },
                I: (e) => {
                  let r = 1;
                  const i = t[e.readUInt32BE(r)],
                    { row: a } = tuples(e, i.columns, (r += 7), s);
                  n(a, { command: 'insert', relation: i });
                },
                D: (e) => {
                  let r = 1;
                  const i = t[e.readUInt32BE(r)];
                  r += 4;
                  const a = 75 === e[r];
                  n(
                    a || 79 === e[r]
                      ? tuples(e, i.columns, (r += 3), s).row
                      : null,
                    { command: 'delete', relation: i, key: a }
                  );
                },
                U: (e) => {
                  let r = 1;
                  const i = t[e.readUInt32BE(r)];
                  r += 4;
                  const a = 75 === e[r],
                    o =
                      a || 79 === e[r]
                        ? tuples(e, i.columns, (r += 3), s)
                        : null;
                  o && (r = o.i);
                  const { row: c } = tuples(e, i.columns, r + 3, s);
                  n(c, {
                    command: 'update',
                    relation: i,
                    key: a,
                    old: o && o.row
                  });
                },
                T: () => {},
                C: () => {}
              })
                .reduce(char, {})
                [e[0]](e);
            })(n.subarray(25), c, e.options.parsers, handle, t.transform)
          : 107 === n[0] &&
            n[17] &&
            ((c.lsn = n.subarray(1, 9)),
            (function () {
              const e = r.alloc(34);
              (e[0] = 'r'.charCodeAt(0)),
                e.fill(c.lsn, 1),
                e.writeBigInt64BE(
                  BigInt(Date.now() - Date.UTC(2e3, 0, 1)) * BigInt(1e3),
                  25
                ),
                o.write(e);
            })());
      }),
      o.on('error', function (e) {
        console.error(
          'Unexpected error during logical streaming - reconnecting',
          e
        );
      }),
      o.on('close', e.close),
      { stream: o, state: i.state }
    );
    function handle(e, t) {
      const r = t.relation.schema + '.' + t.relation.table;
      call('*', e, t),
        call('*:' + r, e, t),
        t.relation.keys.length &&
          call('*:' + r + '=' + t.relation.keys.map((t) => e[t.name]), e, t),
        call(t.command, e, t),
        call(t.command + ':' + r, e, t),
        t.relation.keys.length &&
          call(
            t.command + ':' + r + '=' + t.relation.keys.map((t) => e[t.name]),
            e,
            t
          );
    }
  }
  function call(e, t, r) {
    n.has(e) && n.get(e).forEach(({ fn: n }) => n(t, r, e));
  }
}
function tuples(e, t, r, n) {
  let s, i, a;
  const o = n.raw ? new Array(t.length) : {};
  for (let c = 0; c < t.length; c++)
    (s = e[r++]),
      (i = t[c]),
      (a =
        110 === s
          ? null
          : 117 === s
            ? void 0
            : void 0 === i.parser
              ? e.toString('utf8', r + 4, (r += 4 + e.readUInt32BE(r)))
              : !0 === i.parser.array
                ? i.parser(
                    e.toString('utf8', r + 5, (r += 4 + e.readUInt32BE(r)))
                  )
                : i.parser(
                    e.toString('utf8', r + 4, (r += 4 + e.readUInt32BE(r)))
                  )),
      n.raw
        ? (o[c] = !0 === n.raw ? a : n.value.from ? n.value.from(a, i) : a)
        : (o[i.name] = n.value.from ? n.value.from(a, i) : a);
  return { i: r, row: n.row.from ? n.row.from(o) : o };
}
function largeObject(e, t, r = 393216) {
  return new Promise(async (s, i) => {
    await e
      .begin(async (e) => {
        let i;
        !t && ([{ oid: t }] = await e`select lo_creat(-1) as oid`);
        const [{ fd: a }] = await e`select lo_open(${t}, ${r}) as fd`,
          o = {
            writable: async function ({
              highWaterMark: e = 16384,
              start: t = 0
            } = {}) {
              return (
                t && (await o.seek(t)),
                new n.Writable({
                  highWaterMark: e,
                  write(e, t, r) {
                    o.write(e).then(() => r(), r);
                  }
                })
              );
            },
            readable: async function ({
              highWaterMark: e = 16384,
              start: t = 0,
              end: r = 1 / 0
            } = {}) {
              let s = r - t;
              return (
                t && (await o.seek(t)),
                new n.Readable({
                  highWaterMark: e,
                  async read(e) {
                    const t = e > s ? e - s : e;
                    s -= e;
                    const [{ data: r }] = await o.read(t);
                    this.push(r), r.length < e && this.push(null);
                  }
                })
              );
            },
            close: () => e`select lo_close(${a})`.then(i),
            tell: () => e`select lo_tell64(${a})`,
            read: (t) => e`select loread(${a}, ${t}) as data`,
            write: (t) => e`select lowrite(${a}, ${t})`,
            truncate: (t) => e`select lo_truncate64(${a}, ${t})`,
            seek: (t, r = 0) => e`select lo_lseek64(${a}, ${t}, ${r})`,
            size: () => e`
          select
            lo_lseek64(${a}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `
          };
        return s(o), new Promise(async (e) => (i = e));
      })
      .catch(i);
  });
}
function Postgres(e, t) {
  const r = (function (e, t) {
      if (e && e.shared) return e;
      const r = U.env,
        n = (e && 'string' != typeof e ? e : t) || {},
        { url: s, multihost: i } = (function (e) {
          if (!e || 'string' != typeof e)
            return { url: { searchParams: new Map() } };
          let t = e;
          (t = t.slice(t.indexOf('://') + 3).split(/[?/]/)[0]),
            (t = decodeURIComponent(t.slice(t.indexOf('@') + 1)));
          const r = new URL(e.replace(t, t.split(',')[0]));
          return {
            url: {
              username: decodeURIComponent(r.username),
              password: decodeURIComponent(r.password),
              host: r.host,
              hostname: r.hostname,
              port: r.port,
              pathname: r.pathname,
              searchParams: r.searchParams
            },
            multihost: t.indexOf(',') > -1 && t
          };
        })(e),
        a = [...s.searchParams].reduce((e, [t, r]) => ((e[t] = r), e), {}),
        o = n.hostname || n.host || i || s.hostname || r.PGHOST || 'localhost',
        c = n.port || s.port || r.PGPORT || 5432,
        l =
          n.user ||
          n.username ||
          s.username ||
          r.PGUSERNAME ||
          r.PGUSER ||
          (function () {
            try {
              return F.userInfo().username;
            } catch (e) {
              return U.env.USERNAME || U.env.USER || U.env.LOGNAME;
            }
          })();
      n.no_prepare && (n.prepare = !1),
        a.sslmode && ((a.ssl = a.sslmode), delete a.sslmode),
        'timeout' in n &&
          (console.log(
            'The timeout option is deprecated, use idle_timeout instead'
          ),
          (n.idle_timeout = n.timeout)),
        'system' === a.sslrootcert && (a.ssl = 'verify-full');
      const u = [
          'idle_timeout',
          'connect_timeout',
          'max_lifetime',
          'max_pipeline',
          'backoff',
          'keep_alive'
        ],
        h = {
          max: 10,
          ssl: !1,
          idle_timeout: null,
          connect_timeout: 30,
          max_lifetime: max_lifetime,
          max_pipeline: 100,
          backoff: backoff,
          keep_alive: 60,
          prepare: !0,
          debug: !1,
          fetch_types: !0,
          publications: 'alltables',
          target_session_attrs: null
        };
      return {
        host: Array.isArray(o) ? o : o.split(',').map((e) => e.split(':')[0]),
        port: Array.isArray(c)
          ? c
          : o.split(',').map((e) => parseInt(e.split(':')[1] || c)),
        path: n.path || (o.indexOf('/') > -1 && o + '/.s.PGSQL.' + c),
        database:
          n.database ||
          n.db ||
          (s.pathname || '').slice(1) ||
          r.PGDATABASE ||
          l,
        user: l,
        pass: n.pass || n.password || s.password || r.PGPASSWORD || '',
        ...Object.entries(h).reduce((e, [t, s]) => {
          const i =
            t in n
              ? n[t]
              : t in a
                ? 'disable' !== a[t] && 'false' !== a[t] && a[t]
                : r['PG' + t.toUpperCase()] || s;
          return (e[t] = 'string' == typeof i && u.includes(t) ? +i : i), e;
        }, {}),
        connection: {
          application_name: 'postgres.js',
          ...n.connection,
          ...Object.entries(a).reduce(
            (e, [t, r]) => (t in h || (e[t] = r), e),
            {}
          )
        },
        types: n.types || {},
        target_session_attrs: tsa(n, s, r),
        onnotice: n.onnotice,
        onnotify: n.onnotify,
        onclose: n.onclose,
        onparameter: n.onparameter,
        socket: n.socket,
        transform: parseTransform(n.transform || { undefined: void 0 }),
        parameters: {},
        shared: { retries: 0, typeArrayMap: {} },
        ...mergeUserTypes(n.types)
      };
    })(e, t),
    n = r.no_subscribe || Subscribe(Postgres, { ...r });
  let s = !1;
  const i = Queue(),
    a = Queue(),
    o = Queue(),
    c = Queue(),
    l = Queue(),
    u = Queue(),
    h = Queue(),
    d = Queue(),
    p = { connecting: a, closed: c },
    f = [...Array(r.max)].map(() =>
      Connection(r, p, { onopen: onopen, onend: onend, onclose: onclose })
    ),
    m = Sql(function (e) {
      if (s) return e.reject(X.connection('CONNECTION_ENDED', r, r));
      if (u.length) return go(u.shift(), e);
      if (c.length) return connect(c.shift(), e);
      h.length ? go(h.shift(), e) : i.push(e);
    });
  return (
    Object.assign(m, {
      get parameters() {
        return r.parameters;
      },
      largeObject: largeObject.bind(null, m),
      subscribe: n,
      CLOSE: Y,
      END: Y,
      PostgresError: PostgresError,
      options: r,
      reserve: async function () {
        const e = Queue(),
          t = u.length
            ? u.shift()
            : await new Promise((e) => {
                i.push({ reserve: e }), c.length && connect(c.shift());
              });
        move(t, o),
          (t.reserved = () => (e.length ? t.execute(e.shift()) : move(t, o))),
          (t.reserved.release = !0);
        const r = Sql(function (r) {
          t.queue === d ? e.push(r) : t.execute(r) || move(t, d);
        });
        return (
          (r.release = () => {
            (t.reserved = null), onopen(t);
          }),
          r
        );
      },
      listen: listen,
      begin: async function (e, t) {
        !t && ((t = e), (e = ''));
        const r = Queue();
        let n,
          s = 0,
          i = null;
        try {
          return (
            await m
              .unsafe('begin ' + e.replace(/[^a-z ]/gi, ''), [], {
                onexecute: function (e) {
                  (n = e),
                    move(e, o),
                    (e.reserved = () =>
                      r.length ? e.execute(r.shift()) : move(e, o));
                }
              })
              .execute(),
            await Promise.race([
              (async function scope(e, t, n) {
                const a = Sql(handler);
                let o, c;
                (a.savepoint = savepoint),
                  (a.prepare = (e) => (i = e.replace(/[^a-z0-9$-_. ]/gi))),
                  n && (await a`savepoint ${a(n)}`);
                try {
                  if (
                    ((c = await new Promise((e, r) => {
                      const n = t(a);
                      Promise.resolve(
                        Array.isArray(n) ? Promise.all(n) : n
                      ).then(e, r);
                    })),
                    o)
                  )
                    throw o;
                } catch (e) {
                  throw (
                    (await (n ? a`rollback to ${a(n)}` : a`rollback`),
                    (e instanceof PostgresError && '25P02' === e.code && o) ||
                      e)
                  );
                }
                n ||
                  (i
                    ? await a`prepare transaction '${a.unsafe(i)}'`
                    : await a`commit`);
                return c;
                function savepoint(t, r) {
                  return t && Array.isArray(t.raw)
                    ? savepoint((e) => e.apply(e, arguments))
                    : (1 === arguments.length && ((r = t), (t = null)),
                      scope(e, r, 's' + s++ + (t ? '_' + t : '')));
                }
                function handler(t) {
                  t.catch((e) => o || (o = e)),
                    e.queue === d ? r.push(t) : e.execute(t) || move(e, d);
                }
              })(n, t),
              new Promise((e, t) => (n.onclose = t))
            ])
          );
        } catch (e) {
          throw e;
        }
      },
      close: async function () {
        await Promise.all(f.map((e) => e.end()));
      },
      end: async function ({ timeout: e = null } = {}) {
        if (s) return s;
        let t;
        return (
          await 1,
          (s = Promise.race([
            new Promise(
              (r) => null !== e && (t = setTimeout(destroy, 1e3 * e, r))
            ),
            Promise.all(
              f
                .map((e) => e.end())
                .concat(
                  listen.sql ? listen.sql.end({ timeout: 0 }) : [],
                  n.sql ? n.sql.end({ timeout: 0 }) : []
                )
            )
          ]).then(() => clearTimeout(t)))
        );
      }
    }),
    m
  );
  function Sql(e) {
    return (
      (e.debug = r.debug),
      Object.entries(r.types).reduce(
        (e, [t, r]) => ((e[t] = (e) => new Parameter(e, r.to)), e),
        typed
      ),
      Object.assign(sql, {
        types: typed,
        typed: typed,
        unsafe: function (t, r = [], n = {}) {
          2 === arguments.length && !Array.isArray(r) && ((n = r), (r = []));
          const s = new Query([t], r, e, cancel, {
            prepare: !1,
            ...n,
            simple: 'simple' in n ? n.simple : 0 === r.length
          });
          return s;
        },
        notify: notify,
        array: array,
        json: json,
        file: function (t, r = [], n = {}) {
          2 === arguments.length && !Array.isArray(r) && ((n = r), (r = []));
          const s = new Query(
            [],
            r,
            (r) => {
              J.readFile(t, 'utf8', (t, n) => {
                if (t) return r.reject(t);
                (r.strings = [n]), e(r);
              });
            },
            cancel,
            { ...n, simple: 'simple' in n ? n.simple : 0 === r.length }
          );
          return s;
        }
      }),
      sql
    );
    function typed(e, t) {
      return new Parameter(e, t);
    }
    function sql(t, ...n) {
      return t && Array.isArray(t.raw)
        ? new Query(t, n, e, cancel)
        : 'string' != typeof t || n.length
          ? new Builder(t, n)
          : new Identifier(
              r.transform.column.to ? r.transform.column.to(t) : t
            );
    }
  }
  async function listen(e, t, n) {
    const s = { fn: t, onlisten: n },
      i =
        listen.sql ||
        (listen.sql = Postgres({
          ...r,
          max: 1,
          idle_timeout: null,
          max_lifetime: null,
          fetch_types: !1,
          onclose() {
            Object.entries(listen.channels).forEach(([e, { listeners: t }]) => {
              delete listen.channels[e],
                Promise.all(
                  t.map((t) => listen(e, t.fn, t.onlisten).catch(() => {}))
                );
            });
          },
          onnotify(e, t) {
            e in listen.channels &&
              listen.channels[e].listeners.forEach((e) => e.fn(t));
          }
        })),
      a = listen.channels || (listen.channels = {});
    if (e in a) {
      a[e].listeners.push(s);
      const t = await a[e].result;
      return s.onlisten && s.onlisten(), { state: t.state, unlisten: unlisten };
    }
    a[e] = {
      result: i`listen ${i.unsafe('"' + e.replace(/"/g, '""') + '"')}`,
      listeners: [s]
    };
    const o = await a[e].result;
    return s.onlisten && s.onlisten(), { state: o.state, unlisten: unlisten };
    async function unlisten() {
      if (
        e in a != !1 &&
        ((a[e].listeners = a[e].listeners.filter((e) => e !== s)),
        !a[e].listeners.length)
      )
        return (
          delete a[e],
          i`unlisten ${i.unsafe('"' + e.replace(/"/g, '""') + '"')}`
        );
    }
  }
  async function notify(e, t) {
    return await m`select pg_notify(${e}, ${'' + t})`;
  }
  function move(e, t) {
    return (
      e.queue.remove(e),
      t.push(e),
      (e.queue = t),
      t === u ? e.idleTimer.start() : e.idleTimer.cancel(),
      e
    );
  }
  function json(e) {
    return new Parameter(e, 3802);
  }
  function array(e, t) {
    return Array.isArray(e)
      ? new Parameter(
          e,
          t || (e.length ? se(e) || 25 : 0),
          r.shared.typeArrayMap
        )
      : array(Array.from(arguments));
  }
  function go(e, t) {
    return e.execute(t) ? move(e, h) : move(e, d);
  }
  function cancel(e) {
    return new Promise((t, n) => {
      e.state
        ? e.active
          ? Connection(r).cancel(e.state, t, n)
          : (e.cancelled = { resolve: t, reject: n })
        : (i.remove(e),
          (e.cancelled = !0),
          e.reject(
            X.generic('57014', 'canceling statement due to user request')
          ),
          t());
    });
  }
  async function destroy(e) {
    for (await Promise.all(f.map((e) => e.terminate())); i.length; )
      i.shift().reject(X.connection('CONNECTION_DESTROYED', r));
    e();
  }
  function connect(e, t) {
    return move(e, a), e.connect(t), e;
  }
  function onend(e) {
    move(e, l);
  }
  function onopen(e) {
    if (0 === i.length) return move(e, u);
    let t = Math.ceil(i.length / (a.length + 1)),
      r = !0;
    for (; r && i.length && t-- > 0; ) {
      const t = i.shift();
      if (t.reserve) return t.reserve(e);
      r = e.execute(t);
    }
    move(e, r ? h : d);
  }
  function onclose(e, t) {
    move(e, c),
      (e.reserved = null),
      e.onclose && (e.onclose(t), (e.onclose = null)),
      r.onclose && r.onclose(e.id),
      i.length && connect(e, i.shift());
  }
}
function tsa(e, t, r) {
  const n =
    e.target_session_attrs ||
    t.searchParams.get('target_session_attrs') ||
    r.PGTARGETSESSIONATTRS;
  if (
    !n ||
    [
      'read-write',
      'read-only',
      'primary',
      'standby',
      'prefer-standby'
    ].includes(n)
  )
    return n;
  throw new Error('target_session_attrs ' + n + ' is not supported');
}
function backoff(e) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** e / 100, 20);
}
function max_lifetime() {
  return 60 * (30 + 30 * Math.random());
}
function parseTransform(e) {
  return {
    undefined: e.undefined,
    column: {
      from:
        'function' == typeof e.column ? e.column : e.column && e.column.from,
      to: e.column && e.column.to
    },
    value: {
      from: 'function' == typeof e.value ? e.value : e.value && e.value.from,
      to: e.value && e.value.to
    },
    row: {
      from: 'function' == typeof e.row ? e.row : e.row && e.row.from,
      to: e.row && e.row.to
    }
  };
}
Object.assign(Postgres, {
  PostgresError: PostgresError,
  toPascal: toPascal,
  pascal: ue,
  toCamel: toCamel,
  camel: le,
  toKebab: toKebab,
  kebab: he,
  fromPascal: fromPascal,
  fromCamel: fromCamel,
  fromKebab: fromKebab,
  BigInt: {
    to: 20,
    from: [20],
    parse: (e) => BigInt(e),
    serialize: (e) => e.toString()
  }
});
class ConsoleLogWriter {
  static [s] = 'ConsoleLogWriter';
  write(e) {
    console.log(e);
  }
}
class DefaultLogger {
  static [s] = 'DefaultLogger';
  writer;
  constructor(e) {
    this.writer = e?.writer ?? new ConsoleLogWriter();
  }
  logQuery(e, t) {
    const r = t.map((e) => {
        try {
          return JSON.stringify(e);
        } catch {
          return String(e);
        }
      }),
      n = r.length ? ` -- params: [${r.join(', ')}]` : '';
    this.writer.write(`Query: ${e}${n}`);
  }
}
class NoopLogger {
  static [s] = 'NoopLogger';
  logQuery() {}
}
class PgDeleteBase extends i {
  constructor(e, t, r, n) {
    super(),
      (this.session = t),
      (this.dialect = r),
      (this.config = { table: e, withList: n });
  }
  static [s] = 'PgDelete';
  config;
  where(e) {
    return (this.config.where = e), this;
  }
  returning(e = this.config.table[o.Symbol.Columns]) {
    return (this.config.returning = a(e)), this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  _prepare(e) {
    return c.startActiveSpan('drizzle.prepareQuery', () =>
      this.session.prepareQuery(
        this.dialect.sqlToQuery(this.getSQL()),
        this.config.returning,
        e,
        !0
      )
    );
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute = (e) =>
    c.startActiveSpan('drizzle.operation', () =>
      this._prepare().execute(e, this.authToken)
    );
  $dynamic() {
    return this;
  }
}
class PgInsertBuilder {
  constructor(e, t, r, n, s) {
    (this.table = e),
      (this.session = t),
      (this.dialect = r),
      (this.withList = n),
      (this.overridingSystemValue_ = s);
  }
  static [s] = 'PgInsertBuilder';
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  overridingSystemValue() {
    return (this.overridingSystemValue_ = !0), this;
  }
  values(e) {
    if (0 === (e = Array.isArray(e) ? e : [e]).length)
      throw new Error('values() must be called with at least one value');
    const t = e.map((e) => {
      const t = {},
        r = this.table[o.Symbol.Columns];
      for (const n of Object.keys(e)) {
        const s = e[n];
        t[n] = u(s, h) ? s : new l(s, r[n]);
      }
      return t;
    });
    return void 0 === this.authToken
      ? new PgInsertBase(
          this.table,
          t,
          this.session,
          this.dialect,
          this.withList,
          !1,
          this.overridingSystemValue_
        )
      : new PgInsertBase(
          this.table,
          t,
          this.session,
          this.dialect,
          this.withList,
          !1,
          this.overridingSystemValue_
        ).setToken(this.authToken);
  }
  select(e) {
    const t = 'function' == typeof e ? e(new d()) : e;
    if (!u(t, h) && !p(this.table[f], t._.selectedFields))
      throw new Error(
        'Insert select error: selected fields are not the same or are in a different order compared to the table definition'
      );
    return new PgInsertBase(
      this.table,
      t,
      this.session,
      this.dialect,
      this.withList,
      !0
    );
  }
}
class PgInsertBase extends i {
  constructor(e, t, r, n, s, i, a) {
    super(),
      (this.session = r),
      (this.dialect = n),
      (this.config = {
        table: e,
        values: t,
        withList: s,
        select: i,
        overridingSystemValue_: a
      });
  }
  static [s] = 'PgInsert';
  config;
  returning(e = this.config.table[o.Symbol.Columns]) {
    return (this.config.returning = a(e)), this;
  }
  onConflictDoNothing(e = {}) {
    if (void 0 === e.target) this.config.onConflict = m`do nothing`;
    else {
      let t = '';
      t = Array.isArray(e.target)
        ? e.target
            .map((e) =>
              this.dialect.escapeName(this.dialect.casing.getColumnCasing(e))
            )
            .join(',')
        : this.dialect.escapeName(
            this.dialect.casing.getColumnCasing(e.target)
          );
      const r = e.where ? m` where ${e.where}` : void 0;
      this.config.onConflict = m`(${m.raw(t)})${r} do nothing`;
    }
    return this;
  }
  onConflictDoUpdate(e) {
    if (e.where && (e.targetWhere || e.setWhere))
      throw new Error(
        'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
      );
    const t = e.where ? m` where ${e.where}` : void 0,
      r = e.targetWhere ? m` where ${e.targetWhere}` : void 0,
      n = e.setWhere ? m` where ${e.setWhere}` : void 0,
      s = this.dialect.buildUpdateSet(
        this.config.table,
        g(this.config.table, e.set)
      );
    let i = '';
    return (
      (i = Array.isArray(e.target)
        ? e.target
            .map((e) =>
              this.dialect.escapeName(this.dialect.casing.getColumnCasing(e))
            )
            .join(',')
        : this.dialect.escapeName(
            this.dialect.casing.getColumnCasing(e.target)
          )),
      (this.config.onConflict = m`(${m.raw(i)})${r} do update set ${s}${t}${n}`),
      this
    );
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  _prepare(e) {
    return c.startActiveSpan('drizzle.prepareQuery', () =>
      this.session.prepareQuery(
        this.dialect.sqlToQuery(this.getSQL()),
        this.config.returning,
        e,
        !0
      )
    );
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute = (e) =>
    c.startActiveSpan('drizzle.operation', () =>
      this._prepare().execute(e, this.authToken)
    );
  $dynamic() {
    return this;
  }
}
class PgRefreshMaterializedView extends i {
  constructor(e, t, r) {
    super(),
      (this.session = t),
      (this.dialect = r),
      (this.config = { view: e });
  }
  static [s] = 'PgRefreshMaterializedView';
  config;
  concurrently() {
    if (void 0 !== this.config.withNoData)
      throw new Error('Cannot use concurrently and withNoData together');
    return (this.config.concurrently = !0), this;
  }
  withNoData() {
    if (void 0 !== this.config.concurrently)
      throw new Error('Cannot use concurrently and withNoData together');
    return (this.config.withNoData = !0), this;
  }
  getSQL() {
    return this.dialect.buildRefreshMaterializedViewQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  _prepare(e) {
    return c.startActiveSpan('drizzle.prepareQuery', () =>
      this.session.prepareQuery(
        this.dialect.sqlToQuery(this.getSQL()),
        void 0,
        e,
        !0
      )
    );
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute = (e) =>
    c.startActiveSpan('drizzle.operation', () =>
      this._prepare().execute(e, this.authToken)
    );
}
class PgUpdateBuilder {
  constructor(e, t, r, n) {
    (this.table = e),
      (this.session = t),
      (this.dialect = r),
      (this.withList = n);
  }
  static [s] = 'PgUpdateBuilder';
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  set(e) {
    return void 0 === this.authToken
      ? new PgUpdateBase(
          this.table,
          g(this.table, e),
          this.session,
          this.dialect,
          this.withList
        )
      : new PgUpdateBase(
          this.table,
          g(this.table, e),
          this.session,
          this.dialect,
          this.withList
        ).setToken(this.authToken);
  }
}
class PgUpdateBase extends i {
  constructor(e, t, r, n, s) {
    super(),
      (this.session = r),
      (this.dialect = n),
      (this.config = { set: t, table: e, withList: s, joins: [] }),
      (this.tableName = y(e)),
      (this.joinsNotNullableMap =
        'string' == typeof this.tableName ? { [this.tableName]: !0 } : {});
  }
  static [s] = 'PgUpdate';
  config;
  tableName;
  joinsNotNullableMap;
  from(e) {
    const t = y(e);
    return (
      'string' == typeof t && (this.joinsNotNullableMap[t] = !0),
      (this.config.from = e),
      this
    );
  }
  getTableLikeFields(e) {
    return u(e, w)
      ? e[o.Symbol.Columns]
      : u(e, b)
        ? e._.selectedFields
        : e[v].selectedFields;
  }
  createJoin(e) {
    return (t, r) => {
      const n = y(t);
      if ('string' == typeof n && this.config.joins.some((e) => e.alias === n))
        throw new Error(`Alias "${n}" is already used in this query`);
      if ('function' == typeof r) {
        const e =
          this.config.from && !u(this.config.from, h)
            ? this.getTableLikeFields(this.config.from)
            : void 0;
        r = r(
          new Proxy(
            this.config.table[o.Symbol.Columns],
            new S({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
          ),
          e &&
            new Proxy(
              e,
              new S({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
            )
        );
      }
      if (
        (this.config.joins.push({ on: r, table: t, joinType: e, alias: n }),
        'string' == typeof n)
      )
        switch (e) {
          case 'left':
            this.joinsNotNullableMap[n] = !1;
            break;
          case 'right':
            (this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([e]) => [e, !1])
            )),
              (this.joinsNotNullableMap[n] = !0);
            break;
          case 'inner':
            this.joinsNotNullableMap[n] = !0;
            break;
          case 'full':
            (this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([e]) => [e, !1])
            )),
              (this.joinsNotNullableMap[n] = !1);
        }
      return this;
    };
  }
  leftJoin = this.createJoin('left');
  rightJoin = this.createJoin('right');
  innerJoin = this.createJoin('inner');
  fullJoin = this.createJoin('full');
  where(e) {
    return (this.config.where = e), this;
  }
  returning(e) {
    if (
      !e &&
      ((e = Object.assign({}, this.config.table[o.Symbol.Columns])),
      this.config.from)
    ) {
      const t = y(this.config.from);
      if ('string' == typeof t && this.config.from && !u(this.config.from, h)) {
        const r = this.getTableLikeFields(this.config.from);
        e[t] = r;
      }
      for (const t of this.config.joins) {
        const r = y(t.table);
        if ('string' == typeof r && !u(t.table, h)) {
          const n = this.getTableLikeFields(t.table);
          e[r] = n;
        }
      }
    }
    return (this.config.returning = a(e)), this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  _prepare(e) {
    const t = this.session.prepareQuery(
      this.dialect.sqlToQuery(this.getSQL()),
      this.config.returning,
      e,
      !0
    );
    return (t.joinsNotNullableMap = this.joinsNotNullableMap), t;
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute = (e) => this._prepare().execute(e, this.authToken);
  $dynamic() {
    return this;
  }
}
class PgCountBuilder extends h {
  constructor(e) {
    super(PgCountBuilder.buildEmbeddedCount(e.source, e.filters).queryChunks),
      (this.params = e),
      this.mapWith(Number),
      (this.session = e.session),
      (this.sql = PgCountBuilder.buildCount(e.source, e.filters));
  }
  sql;
  token;
  static [s] = 'PgCountBuilder';
  [Symbol.toStringTag] = 'PgCountBuilder';
  session;
  static buildEmbeddedCount(e, t) {
    return m`(select count(*) from ${e}${m.raw(' where ').if(t)}${t})`;
  }
  static buildCount(e, t) {
    return m`select count(*) as count from ${e}${m.raw(' where ').if(t)}${t};`;
  }
  setToken(e) {
    this.token = e;
  }
  then(e, t) {
    return Promise.resolve(this.session.count(this.sql, this.token)).then(e, t);
  }
  catch(e) {
    return this.then(void 0, e);
  }
  finally(e) {
    return this.then(
      (t) => (e?.(), t),
      (t) => {
        throw (e?.(), t);
      }
    );
  }
}
class RelationalQueryBuilder {
  constructor(e, t, r, n, s, i, a) {
    (this.fullSchema = e),
      (this.schema = t),
      (this.tableNamesMap = r),
      (this.table = n),
      (this.tableConfig = s),
      (this.dialect = i),
      (this.session = a);
  }
  static [s] = 'PgRelationalQueryBuilder';
  findMany(e) {
    return new PgRelationalQuery(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      e || {},
      'many'
    );
  }
  findFirst(e) {
    return new PgRelationalQuery(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      e ? { ...e, limit: 1 } : { limit: 1 },
      'first'
    );
  }
}
class PgRelationalQuery extends i {
  constructor(e, t, r, n, s, i, a, o, c) {
    super(),
      (this.fullSchema = e),
      (this.schema = t),
      (this.tableNamesMap = r),
      (this.table = n),
      (this.tableConfig = s),
      (this.dialect = i),
      (this.session = a),
      (this.config = o),
      (this.mode = c);
  }
  static [s] = 'PgRelationalQuery';
  _prepare(e) {
    return c.startActiveSpan('drizzle.prepareQuery', () => {
      const { query: t, builtQuery: r } = this._toSQL();
      return this.session.prepareQuery(r, void 0, e, !0, (e, r) => {
        const n = e.map((e) =>
          P(this.schema, this.tableConfig, e, t.selection, r)
        );
        return 'first' === this.mode ? n[0] : n;
      });
    });
  }
  prepare(e) {
    return this._prepare(e);
  }
  _getQuery() {
    return this.dialect.buildRelationalQueryWithoutPK({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
  }
  getSQL() {
    return this._getQuery().sql;
  }
  _toSQL() {
    const e = this._getQuery();
    return { query: e, builtQuery: this.dialect.sqlToQuery(e.sql) };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute() {
    return c.startActiveSpan('drizzle.operation', () =>
      this._prepare().execute(void 0, this.authToken)
    );
  }
}
class PgRaw extends i {
  constructor(e, t, r, n) {
    super(),
      (this.execute = e),
      (this.sql = t),
      (this.query = r),
      (this.mapBatchResult = n);
  }
  static [s] = 'PgRaw';
  getSQL() {
    return this.sql;
  }
  getQuery() {
    return this.query;
  }
  mapResult(e, t) {
    return t ? this.mapBatchResult(e) : e;
  }
  _prepare() {
    return this;
  }
  isResponseInArrayMode() {
    return !1;
  }
}
class PgDatabase {
  constructor(e, t, r) {
    if (
      ((this.dialect = e),
      (this.session = t),
      (this._ = r
        ? {
            schema: r.schema,
            fullSchema: r.fullSchema,
            tableNamesMap: r.tableNamesMap,
            session: t
          }
        : { schema: void 0, fullSchema: {}, tableNamesMap: {}, session: t }),
      (this.query = {}),
      this._.schema)
    )
      for (const [n, s] of Object.entries(this._.schema))
        this.query[n] = new RelationalQueryBuilder(
          r.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          r.fullSchema[n],
          s,
          e,
          t
        );
  }
  static [s] = 'PgDatabase';
  query;
  $with(e) {
    const t = this;
    return {
      as: (r) => (
        'function' == typeof r && (r = r(new d(t.dialect))),
        new Proxy(
          new _(r.getSQL(), r.getSelectedFields(), e, !0),
          new S({ alias: e, sqlAliasedBehavior: 'alias', sqlBehavior: 'error' })
        )
      )
    };
  }
  $count(e, t) {
    return new PgCountBuilder({ source: e, filters: t, session: this.session });
  }
  with(...e) {
    const t = this;
    return {
      select: function (r) {
        return new E({
          fields: r ?? void 0,
          session: t.session,
          dialect: t.dialect,
          withList: e
        });
      },
      selectDistinct: function (r) {
        return new E({
          fields: r ?? void 0,
          session: t.session,
          dialect: t.dialect,
          withList: e,
          distinct: !0
        });
      },
      selectDistinctOn: function (r, n) {
        return new E({
          fields: n ?? void 0,
          session: t.session,
          dialect: t.dialect,
          withList: e,
          distinct: { on: r }
        });
      },
      update: function (r) {
        return new PgUpdateBuilder(r, t.session, t.dialect, e);
      },
      insert: function (r) {
        return new PgInsertBuilder(r, t.session, t.dialect, e);
      },
      delete: function (r) {
        return new PgDeleteBase(r, t.session, t.dialect, e);
      }
    };
  }
  select(e) {
    return new E({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(e) {
    return new E({
      fields: e ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new E({
      fields: t ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: { on: e }
    });
  }
  update(e) {
    return new PgUpdateBuilder(e, this.session, this.dialect);
  }
  insert(e) {
    return new PgInsertBuilder(e, this.session, this.dialect);
  }
  delete(e) {
    return new PgDeleteBase(e, this.session, this.dialect);
  }
  refreshMaterializedView(e) {
    return new PgRefreshMaterializedView(e, this.session, this.dialect);
  }
  authToken;
  execute(e) {
    const t = 'string' == typeof e ? m.raw(e) : e.getSQL(),
      r = this.dialect.sqlToQuery(t),
      n = this.session.prepareQuery(r, void 0, void 0, !1);
    return new PgRaw(
      () => n.execute(void 0, this.authToken),
      t,
      r,
      (e) => n.mapResult(e, !0)
    );
  }
  transaction(e, t) {
    return this.session.transaction(e, t);
  }
}
class PgPreparedQuery {
  constructor(e) {
    this.query = e;
  }
  authToken;
  getQuery() {
    return this.query;
  }
  mapResult(e, t) {
    return e;
  }
  setToken(e) {
    return (this.authToken = e), this;
  }
  static [s] = 'PgPreparedQuery';
  joinsNotNullableMap;
}
class PgSession {
  constructor(e) {
    this.dialect = e;
  }
  static [s] = 'PgSession';
  execute(e, t) {
    return c.startActiveSpan('drizzle.operation', () =>
      c
        .startActiveSpan('drizzle.prepareQuery', () =>
          this.prepareQuery(this.dialect.sqlToQuery(e), void 0, void 0, !1)
        )
        .setToken(t)
        .execute(void 0, t)
    );
  }
  all(e) {
    return this.prepareQuery(
      this.dialect.sqlToQuery(e),
      void 0,
      void 0,
      !1
    ).all();
  }
  async count(e, t) {
    const r = await this.execute(e, t);
    return Number(r[0].count);
  }
}
class PgTransaction extends PgDatabase {
  constructor(e, t, r, n = 0) {
    super(e, t, r), (this.schema = r), (this.nestedIndex = n);
  }
  static [s] = 'PgTransaction';
  rollback() {
    throw new A();
  }
  getTransactionConfigSQL(e) {
    const t = [];
    return (
      e.isolationLevel && t.push(`isolation level ${e.isolationLevel}`),
      e.accessMode && t.push(e.accessMode),
      'boolean' == typeof e.deferrable &&
        t.push(e.deferrable ? 'deferrable' : 'not deferrable'),
      m.raw(t.join(' '))
    );
  }
  setTransaction(e) {
    return this.session.execute(
      m`set transaction ${this.getTransactionConfigSQL(e)}`
    );
  }
}
class PostgresJsPreparedQuery extends PgPreparedQuery {
  constructor(e, t, r, n, s, i, a) {
    super({ sql: t, params: r }),
      (this.client = e),
      (this.queryString = t),
      (this.params = r),
      (this.logger = n),
      (this.fields = s),
      (this._isResponseInArrayMode = i),
      (this.customResultMapper = a);
  }
  static [s] = 'PostgresJsPreparedQuery';
  async execute(e = {}) {
    return c.startActiveSpan('drizzle.execute', async (t) => {
      const r = T(this.params, e);
      t?.setAttributes({
        'drizzle.query.text': this.queryString,
        'drizzle.query.params': JSON.stringify(r)
      }),
        this.logger.logQuery(this.queryString, r);
      const {
        fields: n,
        queryString: s,
        client: i,
        joinsNotNullableMap: a,
        customResultMapper: o
      } = this;
      if (!n && !o)
        return c.startActiveSpan('drizzle.driver.execute', () =>
          i.unsafe(s, r)
        );
      const l = await c.startActiveSpan(
        'drizzle.driver.execute',
        () => (
          t?.setAttributes({
            'drizzle.query.text': s,
            'drizzle.query.params': JSON.stringify(r)
          }),
          i.unsafe(s, r).values()
        )
      );
      return c.startActiveSpan('drizzle.mapResponse', () =>
        o ? o(l) : l.map((e) => N(n, e, a))
      );
    });
  }
  all(e = {}) {
    return c.startActiveSpan('drizzle.execute', async (t) => {
      const r = T(this.params, e);
      return (
        t?.setAttributes({
          'drizzle.query.text': this.queryString,
          'drizzle.query.params': JSON.stringify(r)
        }),
        this.logger.logQuery(this.queryString, r),
        c.startActiveSpan(
          'drizzle.driver.execute',
          () => (
            t?.setAttributes({
              'drizzle.query.text': this.queryString,
              'drizzle.query.params': JSON.stringify(r)
            }),
            this.client.unsafe(this.queryString, r)
          )
        )
      );
    });
  }
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class PostgresJsSession extends PgSession {
  constructor(e, t, r, n = {}) {
    super(t),
      (this.client = e),
      (this.schema = r),
      (this.options = n),
      (this.logger = n.logger ?? new NoopLogger());
  }
  static [s] = 'PostgresJsSession';
  logger;
  prepareQuery(e, t, r, n, s) {
    return new PostgresJsPreparedQuery(
      this.client,
      e.sql,
      e.params,
      this.logger,
      t,
      n,
      s
    );
  }
  query(e, t) {
    return this.logger.logQuery(e, t), this.client.unsafe(e, t).values();
  }
  queryObjects(e, t) {
    return this.client.unsafe(e, t);
  }
  transaction(e, t) {
    return this.client.begin(async (r) => {
      const n = new PostgresJsSession(
          r,
          this.dialect,
          this.schema,
          this.options
        ),
        s = new PostgresJsTransaction(this.dialect, n, this.schema);
      return t && (await s.setTransaction(t)), e(s);
    });
  }
}
class PostgresJsTransaction extends PgTransaction {
  constructor(e, t, r, n = 0) {
    super(e, t, r, n), (this.session = t);
  }
  static [s] = 'PostgresJsTransaction';
  transaction(e) {
    return this.session.client.savepoint((t) => {
      const r = new PostgresJsSession(
          t,
          this.dialect,
          this.schema,
          this.session.options
        ),
        n = new PostgresJsTransaction(this.dialect, r, this.schema);
      return e(n);
    });
  }
}
class PostgresJsDatabase extends PgDatabase {
  static [s] = 'PostgresJsDatabase';
}
function construct(e, t = {}) {
  const transparentParser = (e) => e;
  for (const t of ['1184', '1082', '1083', '1114'])
    (e.options.parsers[t] = transparentParser),
      (e.options.serializers[t] = transparentParser);
  (e.options.serializers[114] = transparentParser),
    (e.options.serializers[3802] = transparentParser);
  const r = new x({ casing: t.casing });
  let n, s;
  if (
    (!0 === t.logger
      ? (n = new DefaultLogger())
      : !1 !== t.logger && (n = t.logger),
    t.schema)
  ) {
    const e = k(t.schema, Q);
    s = {
      fullSchema: t.schema,
      schema: e.tables,
      tableNamesMap: e.tableNamesMap
    };
  }
  const i = new PostgresJsSession(e, r, s, { logger: n }),
    a = new PostgresJsDatabase(r, i, s);
  return (a.$client = e), a;
}
function drizzle(...e) {
  if ('string' == typeof e[0]) {
    return construct(Postgres(e[0]), e[1]);
  }
  if (C(e[0])) {
    const { connection: t, client: r, ...n } = e[0];
    if (r) return construct(r, n);
    if ('object' == typeof t && void 0 !== t.url) {
      const { url: e, ...r } = t;
      return construct(Postgres(e, r), n);
    }
    return construct(Postgres(t), n);
  }
  return construct(e[0], e[1]);
}
(drizzle || (drizzle = {})).mock = function (e) {
  return construct({}, e);
};
const _e = e.env.DATABASE_URL;
if (!_e) throw new Error('DATABASE_URL environment variable is not set');
const Ee = Postgres(_e),
  Ae = drizzle(Ee, { schema: R });
export { Ee as client, Ae as db };
//# sourceMappingURL=index5.mjs.map
