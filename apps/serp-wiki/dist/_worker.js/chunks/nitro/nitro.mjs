globalThis._importMeta_ = globalThis._importMeta_ || {
  url: 'file:///_entry.js',
  env: {}
};
import * as e from 'node:buffer';
import { Buffer as t } from 'node:buffer';
import s from 'node:process';
import * as r from 'node:events';
import { EventEmitter as o } from 'node:events';
import * as a from 'node:net';
import { Socket as u, Server as d } from 'node:net';
import { setImmediate as h, clearImmediate as f } from 'node:timers';
import * as m from 'node:assert';
import g from 'node:util';
import * as v from 'node:url';
import { fileURLToPath as S } from 'node:url';
import * as _ from 'node:stream';
import C from 'node:crypto';
import * as R from 'node:dns';
import * as j from 'node:string_decoder';
'global' in globalThis || (globalThis.global = globalThis);
class ReadStream extends u {
  fd;
  constructor(e) {
    super(), (this.fd = e);
  }
  isRaw = !1;
  setRawMode(e) {
    return (this.isRaw = e), this;
  }
  isTTY = !1;
}
class WriteStream extends u {
  fd;
  constructor(e) {
    super(), (this.fd = e);
  }
  clearLine(e, t) {
    return t && t(), !1;
  }
  clearScreenDown(e) {
    return e && e(), !1;
  }
  cursorTo(e, t, s) {
    return s && 'function' == typeof s && s(), !1;
  }
  moveCursor(e, t, s) {
    return s && s(), !1;
  }
  getColorDepth(e) {
    return 1;
  }
  hasColors(e, t) {
    return !1;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = !1;
}
function createNotImplementedError(e) {
  return new Error(`[unenv] ${e} is not implemented yet!`);
}
function notImplemented(e) {
  return Object.assign(
    () => {
      throw createNotImplementedError(e);
    },
    { __unenv__: !0 }
  );
}
function notImplementedClass(e) {
  return class {
    __unenv__ = !0;
    constructor() {
      throw new Error(`[unenv] ${e} is not implemented yet!`);
    }
  };
}
class Process extends o {
  env;
  hrtime;
  nextTick;
  constructor(e) {
    super(),
      (this.env = e.env),
      (this.hrtime = e.hrtime),
      (this.nextTick = e.nextTick);
    for (const e of [
      ...Object.getOwnPropertyNames(Process.prototype),
      ...Object.getOwnPropertyNames(o.prototype)
    ]) {
      const t = this[e];
      'function' == typeof t && (this[e] = t.bind(this));
    }
  }
  emitWarning(e, t, s) {
    console.warn(`${s ? `[${s}] ` : ''}${t ? `${t}: ` : ''}${e}`);
  }
  emit(...e) {
    return super.emit(...e);
  }
  listeners(e) {
    return super.listeners(e);
  }
  #e;
  #t;
  #n;
  get stdin() {
    return (this.#e ??= new ReadStream(0));
  }
  get stdout() {
    return (this.#t ??= new WriteStream(1));
  }
  get stderr() {
    return (this.#n ??= new WriteStream(2));
  }
  #s = '/';
  chdir(e) {
    this.#s = e;
  }
  cwd() {
    return this.#s;
  }
  arch = '';
  platform = '';
  argv = [];
  argv0 = '';
  execArgv = [];
  execPath = '';
  title = '';
  pid = 200;
  ppid = 100;
  get version() {
    return '';
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return new Set();
  }
  get sourceMapsEnabled() {
    return !1;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return !1;
  }
  get traceDeprecation() {
    return !1;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return !1;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {}
  unref() {}
  umask() {
    throw createNotImplementedError('process.umask');
  }
  getBuiltinModule() {
    throw createNotImplementedError('process.getBuiltinModule');
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError('process.getActiveResourcesInfo');
  }
  exit() {
    throw createNotImplementedError('process.exit');
  }
  reallyExit() {
    throw createNotImplementedError('process.reallyExit');
  }
  kill() {
    throw createNotImplementedError('process.kill');
  }
  abort() {
    throw createNotImplementedError('process.abort');
  }
  dlopen() {
    throw createNotImplementedError('process.dlopen');
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError('process.setSourceMapsEnabled');
  }
  loadEnvFile() {
    throw createNotImplementedError('process.loadEnvFile');
  }
  disconnect() {
    throw createNotImplementedError('process.disconnect');
  }
  cpuUsage() {
    throw createNotImplementedError('process.cpuUsage');
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError(
      'process.setUncaughtExceptionCaptureCallback'
    );
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError(
      'process.hasUncaughtExceptionCaptureCallback'
    );
  }
  initgroups() {
    throw createNotImplementedError('process.initgroups');
  }
  openStdin() {
    throw createNotImplementedError('process.openStdin');
  }
  assert() {
    throw createNotImplementedError('process.assert');
  }
  binding() {
    throw createNotImplementedError('process.binding');
  }
  permission = { has: notImplemented('process.permission.has') };
  report = {
    directory: '',
    filename: '',
    signal: 'SIGUSR2',
    compact: !1,
    reportOnFatalError: !1,
    reportOnSignal: !1,
    reportOnUncaughtException: !1,
    getReport: notImplemented('process.report.getReport'),
    writeReport: notImplemented('process.report.writeReport')
  };
  finalization = {
    register: notImplemented('process.finalization.register'),
    unregister: notImplemented('process.finalization.unregister'),
    registerBeforeExit: notImplemented(
      'process.finalization.registerBeforeExit'
    )
  };
  memoryUsage = Object.assign(
    () => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }),
    { rss: () => 0 }
  );
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const E = Object.create(null),
  T = globalThis.process,
  _getEnv = (e) => globalThis.__env__ || T?.env || (e ? E : globalThis),
  O = new Proxy(E, {
    get: (e, t) => _getEnv()[t] ?? E[t],
    has: (e, t) => t in _getEnv() || t in E,
    set: (e, t, s) => ((_getEnv(!0)[t] = s), !0),
    deleteProperty: (e, t) => (delete _getEnv(!0)[t], !0),
    ownKeys() {
      const e = _getEnv();
      return Object.keys(e);
    },
    getOwnPropertyDescriptor(e, t) {
      const s = _getEnv();
      if (t in s)
        return { value: s[t], writable: !0, enumerable: !0, configurable: !0 };
    }
  }),
  I = new Process({
    env: O,
    hrtime: Object.assign(
      function (e) {
        const t = Date.now(),
          s = Math.trunc(t / 1e3),
          r = (t % 1e3) * 1e6;
        if (e) {
          let t = s - e[0],
            o = r - e[0];
          return o < 0 && ((t -= 1), (o = 1e9 + o)), [t, o];
        }
        return [s, r];
      },
      {
        bigint: function () {
          return BigInt(1e6 * Date.now());
        }
      }
    ),
    nextTick: s.nextTick
  });
for (const e of ['exit', 'getBuiltinModule', 'platform'])
  e in s && (I[e] = s[e]);
const {
    abort: P,
    addListener: M,
    allowedNodeEnvironmentFlags: N,
    hasUncaughtExceptionCaptureCallback: L,
    setUncaughtExceptionCaptureCallback: D,
    loadEnvFile: B,
    sourceMapsEnabled: H,
    arch: F,
    argv: $,
    argv0: U,
    chdir: q,
    config: V,
    connected: W,
    constrainedMemory: K,
    availableMemory: Q,
    cpuUsage: G,
    cwd: J,
    debugPort: Y,
    dlopen: X,
    disconnect: Z,
    emit: ee,
    emitWarning: te,
    env: ne,
    eventNames: se,
    execArgv: re,
    execPath: oe,
    exit: ie,
    finalization: ae,
    features: ce,
    getBuiltinModule: le,
    getActiveResourcesInfo: ue,
    getMaxListeners: de,
    hrtime: he,
    kill: pe,
    listeners: fe,
    listenerCount: me,
    memoryUsage: ge,
    nextTick: ye,
    on: be,
    off: ve,
    once: Se,
    pid: _e,
    platform: we,
    ppid: ke,
    prependListener: Ce,
    prependOnceListener: xe,
    rawListeners: Re,
    release: je,
    removeAllListeners: Ee,
    removeListener: Ae,
    report: Te,
    resourceUsage: Oe,
    setMaxListeners: Ie,
    setSourceMapsEnabled: Pe,
    stderr: Me,
    stdin: Ne,
    stdout: Le,
    title: De,
    umask: Be,
    uptime: He,
    version: ze,
    versions: Fe,
    domain: $e,
    initgroups: Ue,
    moduleLoadList: qe,
    reallyExit: Ve,
    openStdin: We,
    assert: Ke,
    binding: Qe,
    send: Ge,
    exitCode: Je,
    channel: Ye,
    getegid: Xe,
    geteuid: Ze,
    getgid: et,
    getgroups: tt,
    getuid: nt,
    setegid: st,
    seteuid: rt,
    setgid: ot,
    setgroups: it,
    setuid: at,
    permission: ct,
    mainModule: lt,
    _events: ut,
    _eventsCount: dt,
    _exiting: ht,
    _maxListeners: pt,
    _debugEnd: ft,
    _debugProcess: mt,
    _fatalException: gt,
    _getActiveHandles: yt,
    _getActiveRequests: bt,
    _kill: vt,
    _preload_modules: St,
    _rawDebug: _t,
    _startProfilerIdleNotifier: wt,
    _stopProfilerIdleNotifier: kt,
    _tickCallback: Ct,
    _disconnect: xt,
    _handleQueue: Rt,
    _pendingMessage: jt,
    _channel: Et,
    _send: At,
    _linkedBinding: Tt
  } = I,
  Ot = globalThis.process;
(globalThis.process = Ot
  ? new Proxy(Ot, {
      get: (e, t, s) =>
        Reflect.has(e, t) ? Reflect.get(e, t, s) : Reflect.get(I, t, s)
    })
  : I),
  globalThis.Buffer || (globalThis.Buffer = t),
  globalThis.setImmediate || (globalThis.setImmediate = h),
  globalThis.clearImmediate || (globalThis.clearImmediate = f);
const It =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Pt =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  Mt = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(e, t) {
  if (
    !(
      '__proto__' === e ||
      ('constructor' === e && t && 'object' == typeof t && 'prototype' in t)
    )
  )
    return t;
  !(function (e) {
    console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
  })(e);
}
function destr(e, t = {}) {
  if ('string' != typeof e) return e;
  const s = e.trim();
  if ('"' === e[0] && e.endsWith('"') && !e.includes('\\'))
    return s.slice(1, -1);
  if (s.length <= 9) {
    const e = s.toLowerCase();
    if ('true' === e) return !0;
    if ('false' === e) return !1;
    if ('undefined' === e) return;
    if ('null' === e) return null;
    if ('nan' === e) return Number.NaN;
    if ('infinity' === e) return Number.POSITIVE_INFINITY;
    if ('-infinity' === e) return Number.NEGATIVE_INFINITY;
  }
  if (!Mt.test(e)) {
    if (t.strict) throw new SyntaxError('[destr] Invalid JSON');
    return e;
  }
  try {
    if (It.test(e) || Pt.test(e)) {
      if (t.strict) throw new Error('[destr] Possible prototype pollution');
      return JSON.parse(e, jsonParseTransform);
    }
    return JSON.parse(e);
  } catch (s) {
    if (t.strict) throw s;
    return e;
  }
}
const Nt = /#/g,
  Lt = /&/g,
  Dt = /\//g,
  Bt = /=/g,
  Ht = /\?/g,
  zt = /\+/g,
  Ft = /%5e/gi,
  $t = /%60/gi,
  Ut = /%7c/gi,
  qt = /%20/gi,
  Vt = /%2f/gi,
  Wt = /%252f/gi;
function encode(e) {
  return encodeURI('' + e).replace(Ut, '|');
}
function encodeQueryValue(e) {
  return encode('string' == typeof e ? e : JSON.stringify(e))
    .replace(zt, '%2B')
    .replace(qt, '+')
    .replace(Nt, '%23')
    .replace(Lt, '%26')
    .replace($t, '`')
    .replace(Ft, '^')
    .replace(Dt, '%2F');
}
function encodeQueryKey(e) {
  return encodeQueryValue(e).replace(Bt, '%3D');
}
function decode(e = '') {
  try {
    return decodeURIComponent('' + e);
  } catch {
    return '' + e;
  }
}
function decodeQueryValue(e) {
  return decode(e.replace(zt, ' '));
}
function parseQuery(e = '') {
  const t = {};
  '?' === e[0] && (e = e.slice(1));
  for (const s of e.split('&')) {
    const e = s.match(/([^=]+)=?(.*)/) || [];
    if (e.length < 2) continue;
    const r = decode(e[1].replace(zt, ' '));
    if ('__proto__' === r || 'constructor' === r) continue;
    const o = decodeQueryValue(e[2] || '');
    void 0 === t[r]
      ? (t[r] = o)
      : Array.isArray(t[r])
        ? t[r].push(o)
        : (t[r] = [t[r], o]);
  }
  return t;
}
function stringifyQuery(e) {
  return Object.keys(e)
    .filter((t) => void 0 !== e[t])
    .map((t) => {
      return (
        (s = t),
        ('number' != typeof (r = e[t]) && 'boolean' != typeof r) ||
          (r = String(r)),
        r
          ? Array.isArray(r)
            ? r
                .map((e) => `${encodeQueryKey(s)}=${encodeQueryValue(e)}`)
                .join('&')
            : `${encodeQueryKey(s)}=${encodeQueryValue(r)}`
          : encodeQueryKey(s)
      );
      var s, r;
    })
    .filter(Boolean)
    .join('&');
}
const Kt = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
  Qt = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
  Gt = /^([/\\]\s*){2,}[^/\\]/,
  Jt = /^[\s\0]*(blob|data|javascript|vbscript):$/i,
  Yt = /\/$|\/\?|\/#/,
  Xt = /^\.?\//;
function hasProtocol(e, t = {}) {
  return (
    'boolean' == typeof t && (t = { acceptRelative: t }),
    t.strict ? Kt.test(e) : Qt.test(e) || (!!t.acceptRelative && Gt.test(e))
  );
}
function isScriptProtocol(e) {
  return !!e && Jt.test(e);
}
function hasTrailingSlash(e = '', t) {
  return t ? Yt.test(e) : e.endsWith('/');
}
function withoutTrailingSlash(e = '', t) {
  if (!t) return (hasTrailingSlash(e) ? e.slice(0, -1) : e) || '/';
  if (!hasTrailingSlash(e, !0)) return e || '/';
  let s = e,
    r = '';
  const o = e.indexOf('#');
  o >= 0 && ((s = e.slice(0, o)), (r = e.slice(o)));
  const [a, ...u] = s.split('?');
  return (
    ((a.endsWith('/') ? a.slice(0, -1) : a) || '/') +
    (u.length > 0 ? `?${u.join('?')}` : '') +
    r
  );
}
function withTrailingSlash(e = '', t) {
  if (!t) return e.endsWith('/') ? e : e + '/';
  if (hasTrailingSlash(e, !0)) return e || '/';
  let s = e,
    r = '';
  const o = e.indexOf('#');
  if (o >= 0 && ((s = e.slice(0, o)), (r = e.slice(o)), !s)) return r;
  const [a, ...u] = s.split('?');
  return a + '/' + (u.length > 0 ? `?${u.join('?')}` : '') + r;
}
function withLeadingSlash(e = '') {
  return (function (e = '') {
    return e.startsWith('/');
  })(e)
    ? e
    : '/' + e;
}
function withBase(e, t) {
  if (isEmptyURL(t) || hasProtocol(e)) return e;
  const s = withoutTrailingSlash(t);
  return e.startsWith(s) ? e : joinURL(s, e);
}
function withoutBase(e, t) {
  if (isEmptyURL(t)) return e;
  const s = withoutTrailingSlash(t);
  if (!e.startsWith(s)) return e;
  const r = e.slice(s.length);
  return '/' === r[0] ? r : '/' + r;
}
function withQuery(e, t) {
  const s = parseURL(e),
    r = { ...parseQuery(s.search), ...t };
  return (s.search = stringifyQuery(r)), stringifyParsedURL(s);
}
function getQuery$2(e) {
  return parseQuery(parseURL(e).search);
}
function isEmptyURL(e) {
  return !e || '/' === e;
}
function joinURL(e, ...t) {
  let s = e || '';
  for (const e of t.filter((e) =>
    (function (e) {
      return e && '/' !== e;
    })(e)
  ))
    if (s) {
      const t = e.replace(Xt, '');
      s = withTrailingSlash(s) + t;
    } else s = e;
  return s;
}
function joinRelativeURL(...e) {
  const t = /\/(?!\/)/,
    s = e.filter(Boolean),
    r = [];
  let o = 0;
  for (const e of s)
    if (e && '/' !== e)
      for (const [s, a] of e.split(t).entries())
        if (a && '.' !== a)
          if ('..' !== a)
            1 === s && r[r.length - 1]?.endsWith(':/')
              ? (r[r.length - 1] += '/' + a)
              : (r.push(a), o++);
          else {
            if (1 === r.length && hasProtocol(r[0])) continue;
            r.pop(), o--;
          }
  let a = r.join('/');
  return (
    o >= 0
      ? s[0]?.startsWith('/') && !a.startsWith('/')
        ? (a = '/' + a)
        : s[0]?.startsWith('./') && !a.startsWith('./') && (a = './' + a)
      : (a = '../'.repeat(-1 * o) + a),
    s[s.length - 1]?.endsWith('/') && !a.endsWith('/') && (a += '/'),
    a
  );
}
function withHttps(e) {
  return (function (e, t) {
    let s = e.match(Qt);
    s || (s = e.match(/^\/{2,}/));
    if (!s) return t + e;
    return t + e.slice(s[0].length);
  })(e, 'https://');
}
const Zt = Symbol.for('ufo:protocolRelative');
function parseURL(e = '', t) {
  const s = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (s) {
    const [, e, t = ''] = s;
    return {
      protocol: e.toLowerCase(),
      pathname: t,
      href: e + t,
      auth: '',
      host: '',
      search: '',
      hash: ''
    };
  }
  if (!hasProtocol(e, { acceptRelative: !0 }))
    return t ? parseURL(t + e) : parsePath(e);
  const [, r = '', o, a = ''] =
    e.replace(/\\/g, '/').match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) ||
    [];
  let [, u = '', d = ''] = a.match(/([^#/?]*)(.*)?/) || [];
  'file:' === r && (d = d.replace(/\/(?=[A-Za-z]:)/, ''));
  const { pathname: h, search: f, hash: m } = parsePath(d);
  return {
    protocol: r.toLowerCase(),
    auth: o ? o.slice(0, Math.max(0, o.length - 1)) : '',
    host: u,
    pathname: h,
    search: f,
    hash: m,
    [Zt]: !r
  };
}
function parsePath(e = '') {
  const [t = '', s = '', r = ''] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: s, hash: r };
}
function stringifyParsedURL(e) {
  const t = e.pathname || '',
    s = e.search ? (e.search.startsWith('?') ? '' : '?') + e.search : '',
    r = e.hash || '',
    o = e.auth ? e.auth + '@' : '',
    a = e.host || '';
  return (
    (e.protocol || e[Zt] ? (e.protocol || '') + '//' : '') + o + a + t + s + r
  );
}
const en = 0,
  tn = 1,
  nn = 2;
function createRouter$1(e = {}) {
  const t = { options: e, rootNode: createRadixNode(), staticRoutesMap: {} },
    normalizeTrailingSlash = (t) =>
      e.strictTrailingSlash ? t : t.replace(/\/$/, '') || '/';
  if (e.routes)
    for (const s in e.routes) insert(t, normalizeTrailingSlash(s), e.routes[s]);
  return {
    ctx: t,
    lookup: (e) =>
      (function (e, t) {
        const s = e.staticRoutesMap[t];
        if (s) return s.data;
        const r = t.split('/'),
          o = {};
        let a = !1,
          u = null,
          d = e.rootNode,
          h = null;
        for (let e = 0; e < r.length; e++) {
          const t = r[e];
          null !== d.wildcardChildNode &&
            ((u = d.wildcardChildNode), (h = r.slice(e).join('/')));
          const s = d.children.get(t);
          if (void 0 === s) {
            if (d && d.placeholderChildren.length > 1) {
              const t = r.length - e;
              d = d.placeholderChildren.find((e) => e.maxDepth === t) || null;
            } else d = d.placeholderChildren[0] || null;
            if (!d) break;
            d.paramName && (o[d.paramName] = t), (a = !0);
          } else d = s;
        }
        (null !== d && null !== d.data) ||
          null === u ||
          ((d = u), (o[d.paramName || '_'] = h), (a = !0));
        if (!d) return null;
        if (a) return { ...d.data, params: a ? o : void 0 };
        return d.data;
      })(t, normalizeTrailingSlash(e)),
    insert: (e, s) => insert(t, normalizeTrailingSlash(e), s),
    remove: (e) =>
      (function (e, t) {
        let s = !1;
        const r = t.split('/');
        let o = e.rootNode;
        for (const e of r) if (((o = o.children.get(e)), !o)) return s;
        if (o.data) {
          const e = r.at(-1) || '';
          (o.data = null),
            0 === Object.keys(o.children).length &&
              o.parent &&
              (o.parent.children.delete(e),
              (o.parent.wildcardChildNode = null),
              (o.parent.placeholderChildren = [])),
            (s = !0);
        }
        return s;
      })(t, normalizeTrailingSlash(e))
  };
}
function insert(e, t, s) {
  let r = !0;
  const o = t.split('/');
  let a = e.rootNode,
    u = 0;
  const d = [a];
  for (const e of o) {
    let t;
    if ((t = a.children.get(e))) a = t;
    else {
      const s = getNodeType(e);
      (t = createRadixNode({ type: s, parent: a })),
        a.children.set(e, t),
        s === nn
          ? ((t.paramName = '*' === e ? '_' + u++ : e.slice(1)),
            a.placeholderChildren.push(t),
            (r = !1))
          : s === tn &&
            ((a.wildcardChildNode = t),
            (t.paramName = e.slice(3) || '_'),
            (r = !1)),
        d.push(t),
        (a = t);
    }
  }
  for (const [e, t] of d.entries())
    t.maxDepth = Math.max(d.length - e, t.maxDepth || 0);
  return (a.data = s), !0 === r && (e.staticRoutesMap[t] = a), a;
}
function createRadixNode(e = {}) {
  return {
    type: e.type || en,
    maxDepth: 0,
    parent: e.parent || null,
    children: new Map(),
    data: e.data || null,
    paramName: e.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(e) {
  return e.startsWith('**') ? tn : ':' === e[0] || '*' === e ? nn : en;
}
function toRouteMatcher(e) {
  return (function (e, t) {
    return { ctx: { table: e }, matchAll: (s) => _matchRoutes(s, e, t) };
  })(_routerNodeToTable('', e.ctx.rootNode), e.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e, t, s) {
  !0 !== s && e.endsWith('/') && (e = e.slice(0, -1) || '/');
  const r = [];
  for (const [s, o] of _sortRoutesMap(t.wildcard))
    (e === s || e.startsWith(s + '/')) && r.push(o);
  for (const [s, o] of _sortRoutesMap(t.dynamic))
    if (e.startsWith(s + '/')) {
      const t = '/' + e.slice(s.length).split('/').splice(2).join('/');
      r.push(..._matchRoutes(t, o));
    }
  const o = t.static.get(e);
  return o && r.push(o), r.filter(Boolean);
}
function _sortRoutesMap(e) {
  return [...e.entries()].sort((e, t) => e[0].length - t[0].length);
}
function _routerNodeToTable(e, t) {
  const s = { static: new Map(), wildcard: new Map(), dynamic: new Map() };
  return (
    (function _addNode(e, t) {
      if (e)
        if (t.type !== en || e.includes('*') || e.includes(':')) {
          if (t.type === tn) s.wildcard.set(e.replace('/**', ''), t.data);
          else if (t.type === nn) {
            const r = _routerNodeToTable('', t);
            return (
              t.data && r.static.set('/', t.data),
              void s.dynamic.set(e.replace(/\/\*|\/:\w+/, ''), r)
            );
          }
        } else t.data && s.static.set(e, t.data);
      for (const [s, r] of t.children.entries())
        _addNode(`${e}/${s}`.replace('//', '/'), r);
    })(e, t),
    s
  );
}
function isPlainObject$3(e) {
  if (null === e || 'object' != typeof e) return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (null === t ||
      t === Object.prototype ||
      null === Object.getPrototypeOf(t)) &&
    !(Symbol.iterator in e) &&
    (!(Symbol.toStringTag in e) ||
      '[object Module]' === Object.prototype.toString.call(e))
  );
}
function _defu$1(e, t, s = '.', r) {
  if (!isPlainObject$3(t)) return _defu$1(e, {}, s, r);
  const o = Object.assign({}, t);
  for (const t in e) {
    if ('__proto__' === t || 'constructor' === t) continue;
    const a = e[t];
    null != a &&
      ((r && r(o, t, a, s)) ||
        (Array.isArray(a) && Array.isArray(o[t])
          ? (o[t] = [...a, ...o[t]])
          : isPlainObject$3(a) && isPlainObject$3(o[t])
            ? (o[t] = _defu$1(a, o[t], (s ? `${s}.` : '') + t.toString(), r))
            : (o[t] = a)));
  }
  return o;
}
function createDefu$1(e) {
  return (...t) => t.reduce((t, s) => _defu$1(t, s, '', e), {});
}
const sn = createDefu$1(),
  rn = createDefu$1((e, t, s) => {
    if (void 0 !== e[t] && 'function' == typeof s) return (e[t] = s(e[t])), !0;
  });
function o$1(e) {
  throw new Error(`${e} is not implemented yet!`);
}
let on = class i extends o {
    __unenv__ = {};
    readableEncoding = null;
    readableEnded = !0;
    readableFlowing = !1;
    readableHighWaterMark = 0;
    readableLength = 0;
    readableObjectMode = !1;
    readableAborted = !1;
    readableDidRead = !1;
    closed = !1;
    errored = null;
    readable = !1;
    destroyed = !1;
    static from(e, t) {
      return new i(t);
    }
    constructor(e) {
      super();
    }
    _read(e) {}
    read(e) {}
    setEncoding(e) {
      return this;
    }
    pause() {
      return this;
    }
    resume() {
      return this;
    }
    isPaused() {
      return !0;
    }
    unpipe(e) {
      return this;
    }
    unshift(e, t) {}
    wrap(e) {
      return this;
    }
    push(e, t) {
      return !1;
    }
    _destroy(e, t) {
      this.removeAllListeners();
    }
    destroy(e) {
      return (this.destroyed = !0), this._destroy(e), this;
    }
    pipe(e, t) {
      return {};
    }
    compose(e, t) {
      throw new Error('Method not implemented.');
    }
    [Symbol.asyncDispose]() {
      return this.destroy(), Promise.resolve();
    }
    async *[Symbol.asyncIterator]() {
      throw o$1('Readable.asyncIterator');
    }
    iterator(e) {
      throw o$1('Readable.iterator');
    }
    map(e, t) {
      throw o$1('Readable.map');
    }
    filter(e, t) {
      throw o$1('Readable.filter');
    }
    forEach(e, t) {
      throw o$1('Readable.forEach');
    }
    reduce(e, t, s) {
      throw o$1('Readable.reduce');
    }
    find(e, t) {
      throw o$1('Readable.find');
    }
    findIndex(e, t) {
      throw o$1('Readable.findIndex');
    }
    some(e, t) {
      throw o$1('Readable.some');
    }
    toArray(e) {
      throw o$1('Readable.toArray');
    }
    every(e, t) {
      throw o$1('Readable.every');
    }
    flatMap(e, t) {
      throw o$1('Readable.flatMap');
    }
    drop(e, t) {
      throw o$1('Readable.drop');
    }
    take(e, t) {
      throw o$1('Readable.take');
    }
    asIndexedPairs(e) {
      throw o$1('Readable.asIndexedPairs');
    }
  },
  an = class extends o {
    __unenv__ = {};
    writable = !0;
    writableEnded = !1;
    writableFinished = !1;
    writableHighWaterMark = 0;
    writableLength = 0;
    writableObjectMode = !1;
    writableCorked = 0;
    closed = !1;
    errored = null;
    writableNeedDrain = !1;
    destroyed = !1;
    _data;
    _encoding = 'utf8';
    constructor(e) {
      super();
    }
    pipe(e, t) {
      return {};
    }
    _write(e, s, r) {
      if (this.writableEnded) r && r();
      else {
        if (void 0 === this._data) this._data = e;
        else {
          const r =
              'string' == typeof this._data
                ? t.from(this._data, this._encoding || s || 'utf8')
                : this._data,
            o =
              'string' == typeof e
                ? t.from(e, s || this._encoding || 'utf8')
                : e;
          this._data = t.concat([r, o]);
        }
        (this._encoding = s), r && r();
      }
    }
    _writev(e, t) {}
    _destroy(e, t) {}
    _final(e) {}
    write(e, t, s) {
      const r = 'string' == typeof t ? this._encoding : 'utf8',
        o = 'function' == typeof t ? t : 'function' == typeof s ? s : void 0;
      return this._write(e, r, o), !0;
    }
    setDefaultEncoding(e) {
      return this;
    }
    end(e, t, s) {
      const r =
        'function' == typeof e
          ? e
          : 'function' == typeof t
            ? t
            : 'function' == typeof s
              ? s
              : void 0;
      if (this.writableEnded) return r && r(), this;
      const o = e === r ? void 0 : e;
      if (o) {
        const e = t === r ? void 0 : t;
        this.write(o, e, r);
      }
      return (
        (this.writableEnded = !0),
        (this.writableFinished = !0),
        this.emit('close'),
        this.emit('finish'),
        this
      );
    }
    cork() {}
    uncork() {}
    destroy(e) {
      return (
        (this.destroyed = !0),
        delete this._data,
        this.removeAllListeners(),
        this
      );
    }
    compose(e, t) {
      throw new Error('Method not implemented.');
    }
  };
const cn = class {
  allowHalfOpen = !0;
  _destroy;
  constructor(e = new on(), t = new an()) {
    Object.assign(this, e),
      Object.assign(this, t),
      (this._destroy = (function (...e) {
        return function (...t) {
          for (const s of e) s(...t);
        };
      })(e._destroy, t._destroy));
  }
};
const ln =
  (Object.assign(cn.prototype, on.prototype),
  Object.assign(cn.prototype, an.prototype),
  cn);
class A extends ln {
  __unenv__ = {};
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = !1;
  destroyed = !1;
  pending = !1;
  localAddress = '';
  localPort = 0;
  remoteAddress = '';
  remoteFamily = '';
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = 'readOnly';
  constructor(e) {
    super();
  }
  write(e, t, s) {
    return !1;
  }
  connect(e, t, s) {
    return this;
  }
  end(e, t, s) {
    return this;
  }
  setEncoding(e) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(e, t) {
    return this;
  }
  setNoDelay(e) {
    return this;
  }
  setKeepAlive(e, t) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const e = new Error('ERR_SOCKET_CLOSED');
    return (e.code = 'ERR_SOCKET_CLOSED'), this.destroy(e), this;
  }
}
class y extends on {
  aborted = !1;
  httpVersion = '1.1';
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = !0;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = 'GET';
  url = '/';
  statusCode = 200;
  statusMessage = '';
  closed = !1;
  errored = null;
  readable = !1;
  constructor(e) {
    super(), (this.socket = this.connection = e || new A());
  }
  get rawHeaders() {
    const e = this.headers,
      t = [];
    for (const s in e)
      if (Array.isArray(e[s])) for (const r of e[s]) t.push(s, r);
      else t.push(s, e[s]);
    return t;
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(e, t) {
    return this;
  }
  get headersDistinct() {
    return p$2(this.headers);
  }
  get trailersDistinct() {
    return p$2(this.trailers);
  }
}
function p$2(e) {
  const t = {};
  for (const [s, r] of Object.entries(e))
    s && (t[s] = (Array.isArray(r) ? r : [r]).filter(Boolean));
  return t;
}
class w extends an {
  statusCode = 200;
  statusMessage = '';
  upgrading = !1;
  chunkedEncoding = !1;
  shouldKeepAlive = !1;
  useChunkedEncodingByDefault = !1;
  sendDate = !1;
  finished = !1;
  headersSent = !1;
  strictContentLength = !1;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(e) {
    super(), (this.req = e);
  }
  assignSocket(e) {
    (e._httpMessage = this),
      (this.socket = e),
      (this.connection = e),
      this.emit('socket', e),
      this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(e) {}
  writeContinue(e) {}
  writeHead(e, t, s) {
    e && (this.statusCode = e),
      'string' == typeof t && ((this.statusMessage = t), (t = void 0));
    const r = s || t;
    if (r && !Array.isArray(r)) for (const e in r) this.setHeader(e, r[e]);
    return (this.headersSent = !0), this;
  }
  writeProcessing() {}
  setTimeout(e, t) {
    return this;
  }
  appendHeader(e, t) {
    e = e.toLowerCase();
    const s = this._headers[e],
      r = [
        ...(Array.isArray(s) ? s : [s]),
        ...(Array.isArray(t) ? t : [t])
      ].filter(Boolean);
    return (this._headers[e] = r.length > 1 ? r : r[0]), this;
  }
  setHeader(e, t) {
    return (this._headers[e.toLowerCase()] = t), this;
  }
  setHeaders(e) {
    for (const [t, s] of Object.entries(e)) this.setHeader(t, s);
    return this;
  }
  getHeader(e) {
    return this._headers[e.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(e) {
    return e.toLowerCase() in this._headers;
  }
  removeHeader(e) {
    delete this._headers[e.toLowerCase()];
  }
  addTrailers(e) {}
  flushHeaders() {}
  writeEarlyHints(e, t) {
    'function' == typeof t && t();
  }
}
const un = (() => {
  const n = function () {};
  return (n.prototype = Object.create(null)), n;
})();
function S$1(e = {}) {
  if (e instanceof Headers) return e;
  const t = new Headers();
  for (const [s, r] of Object.entries(e))
    if (void 0 !== r) {
      if (Array.isArray(r)) {
        for (const e of r) t.append(s, String(e));
        continue;
      }
      t.set(s, String(r));
    }
  return t;
}
const dn = new Set([101, 204, 205, 304]);
async function b$1(e, t) {
  const s = new y(),
    r = new w(s);
  let o;
  if (((s.url = t.url?.toString() || '/'), !s.url.startsWith('/'))) {
    const e = new URL(s.url);
    (o = e.host), (s.url = e.pathname + e.search + e.hash);
  }
  (s.method = t.method || 'GET'),
    (s.headers = (function (e = {}) {
      const t = new un(),
        s =
          Array.isArray(e) ||
          (function (e) {
            return 'function' == typeof e?.entries;
          })(e)
            ? e
            : Object.entries(e);
      for (const [e, r] of s)
        if (r) {
          if (void 0 === t[e]) {
            t[e] = r;
            continue;
          }
          t[e] = [
            ...(Array.isArray(t[e]) ? t[e] : [t[e]]),
            ...(Array.isArray(r) ? r : [r])
          ];
        }
      return t;
    })(t.headers || {})),
    s.headers.host || (s.headers.host = t.host || o || 'localhost'),
    (s.connection.encrypted = s.connection.encrypted || 'https' === t.protocol),
    (s.body = t.body || null),
    (s.__unenv__ = t.context),
    await e(s, r);
  let a = r._data;
  (dn.has(r.statusCode) || 'HEAD' === s.method.toUpperCase()) &&
    ((a = null), delete r._headers['content-length']);
  const u = {
    status: r.statusCode,
    statusText: r.statusMessage,
    headers: r._headers,
    body: a
  };
  return s.destroy(), r.destroy(), u;
}
function hasProp$1(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
let hn = class extends Error {
  static __h3_error__ = !0;
  statusCode = 500;
  fatal = !1;
  unhandled = !1;
  statusMessage;
  data;
  cause;
  constructor(e, t = {}) {
    super(e, t), t.cause && !this.cause && (this.cause = t.cause);
  }
  toJSON() {
    const e = {
      message: this.message,
      statusCode: sanitizeStatusCode$1(this.statusCode, 500)
    };
    return (
      this.statusMessage &&
        (e.statusMessage = sanitizeStatusMessage$1(this.statusMessage)),
      void 0 !== this.data && (e.data = this.data),
      e
    );
  }
};
function createError$1(e) {
  if ('string' == typeof e) return new hn(e);
  if (isError$2(e)) return e;
  const t = new hn(e.message ?? e.statusMessage ?? '', { cause: e.cause || e });
  if (hasProp$1(e, 'stack'))
    try {
      Object.defineProperty(t, 'stack', { get: () => e.stack });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = sanitizeStatusCode$1(e.statusCode, t.statusCode))
      : e.status &&
        (t.statusCode = sanitizeStatusCode$1(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const e = t.statusMessage;
    sanitizeStatusMessage$1(t.statusMessage) !== e &&
      console.warn(
        '[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.'
      );
  }
  return (
    void 0 !== e.fatal && (t.fatal = e.fatal),
    void 0 !== e.unhandled && (t.unhandled = e.unhandled),
    t
  );
}
function isError$2(e) {
  return !0 === e?.constructor?.__h3_error__;
}
function getQuery$1(e) {
  return getQuery$2(e.path || '');
}
function getRequestHeaders$1(e) {
  const t = {};
  for (const s in e.node.req.headers) {
    const r = e.node.req.headers[s];
    t[s] = Array.isArray(r) ? r.filter(Boolean).join(', ') : r;
  }
  return t;
}
function getRequestHeader$1(e, t) {
  return getRequestHeaders$1(e)[t.toLowerCase()];
}
const pn = Symbol.for('h3RawBody'),
  fn = ['PATCH', 'POST', 'PUT', 'DELETE'];
function readRawBody$1(e, s = 'utf8') {
  !(function (e, t) {
    if (
      !(function (e, t) {
        if ('string' == typeof t) {
          if (e.method === t) return !0;
        } else if (t.includes(e.method)) return !0;
        return !1;
      })(e, t)
    )
      throw createError$1({
        statusCode: 405,
        statusMessage: 'HTTP method is not allowed.'
      });
  })(e, fn);
  const r =
    e._requestBody ||
    e.web?.request?.body ||
    e.node.req[pn] ||
    e.node.req.rawBody ||
    e.node.req.body;
  if (r) {
    const e = Promise.resolve(r).then((e) =>
      t.isBuffer(e)
        ? e
        : 'function' == typeof e.pipeTo
          ? new Promise((s, r) => {
              const o = [];
              e.pipeTo(
                new WritableStream({
                  write(e) {
                    o.push(e);
                  },
                  close() {
                    s(t.concat(o));
                  },
                  abort(e) {
                    r(e);
                  }
                })
              ).catch(r);
            })
          : 'function' == typeof e.pipe
            ? new Promise((s, r) => {
                const o = [];
                e.on('data', (e) => {
                  o.push(e);
                })
                  .on('end', () => {
                    s(t.concat(o));
                  })
                  .on('error', r);
              })
            : e.constructor === Object
              ? t.from(JSON.stringify(e))
              : e instanceof URLSearchParams
                ? t.from(e.toString())
                : t.from(e)
    );
    return s ? e.then((e) => e.toString(s)) : e;
  }
  if (
    !Number.parseInt(e.node.req.headers['content-length'] || '') &&
    !String(e.node.req.headers['transfer-encoding'] ?? '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
      .includes('chunked')
  )
    return Promise.resolve(void 0);
  const o = (e.node.req[pn] = new Promise((s, r) => {
    const o = [];
    e.node.req
      .on('error', (e) => {
        r(e);
      })
      .on('data', (e) => {
        o.push(e);
      })
      .on('end', () => {
        s(t.concat(o));
      });
  }));
  return s ? o.then((e) => e.toString(s)) : o;
}
function handleCacheHeaders(e, t) {
  const s = ['public', ...(t.cacheControls || [])];
  let r = !1;
  if (
    (void 0 !== t.maxAge &&
      s.push('max-age=' + +t.maxAge, 's-maxage=' + +t.maxAge),
    t.modifiedTime)
  ) {
    const s = new Date(t.modifiedTime),
      o = e.node.req.headers['if-modified-since'];
    e.node.res.setHeader('last-modified', s.toUTCString()),
      o && new Date(o) >= t.modifiedTime && (r = !0);
  }
  if (t.etag) {
    e.node.res.setHeader('etag', t.etag);
    e.node.req.headers['if-none-match'] === t.etag && (r = !0);
  }
  return (
    e.node.res.setHeader('cache-control', s.join(', ')),
    !!r && ((e.node.res.statusCode = 304), e.handled || e.node.res.end(), !0)
  );
}
const mn = { html: 'text/html', json: 'application/json' },
  gn = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage$1(e = '') {
  return e.replace(gn, '');
}
function sanitizeStatusCode$1(e, t = 200) {
  return e
    ? ('string' == typeof e && (e = Number.parseInt(e, 10)),
      e < 100 || e > 999 ? t : e)
    : t;
}
function splitCookiesString(e) {
  if (Array.isArray(e)) return e.flatMap((e) => splitCookiesString(e));
  if ('string' != typeof e) return [];
  const t = [];
  let s,
    r,
    o,
    a,
    u,
    d = 0;
  const skipWhitespace = () => {
    for (; d < e.length && /\s/.test(e.charAt(d)); ) d += 1;
    return d < e.length;
  };
  for (; d < e.length; ) {
    for (s = d, u = !1; skipWhitespace(); )
      if (((r = e.charAt(d)), ',' === r)) {
        for (
          o = d, d += 1, skipWhitespace(), a = d;
          d < e.length &&
          ((r = e.charAt(d)), '=' !== r && ';' !== r && ',' !== r);

        )
          d += 1;
        d < e.length && '=' === e.charAt(d)
          ? ((u = !0), (d = a), t.push(e.slice(s, o)), (s = d))
          : (d = o + 1);
      } else d += 1;
    (!u || d >= e.length) && t.push(e.slice(s));
  }
  return t;
}
const yn = void 0 === h ? (e) => e() : h;
function send$1(e, t, s) {
  return (
    s &&
      (function (e, t) {
        t &&
          304 !== e.node.res.statusCode &&
          !e.node.res.getHeader('content-type') &&
          e.node.res.setHeader('content-type', t);
      })(e, s),
    new Promise((s) => {
      yn(() => {
        e.handled || e.node.res.end(t), s();
      });
    })
  );
}
function setResponseStatus$1(e, t, s) {
  t && (e.node.res.statusCode = sanitizeStatusCode$1(t, e.node.res.statusCode)),
    s && (e.node.res.statusMessage = sanitizeStatusMessage$1(s));
}
function getResponseStatus$1(e) {
  return e.node.res.statusCode;
}
function getResponseStatusText(e) {
  return e.node.res.statusMessage;
}
function getResponseHeader$1(e, t) {
  return e.node.res.getHeader(t);
}
function setResponseHeaders$1(e, t) {
  for (const [s, r] of Object.entries(t)) e.node.res.setHeader(s, r);
}
const bn = setResponseHeaders$1;
function setResponseHeader$1(e, t, s) {
  e.node.res.setHeader(t, s);
}
function sendStream(e, t) {
  if (!t || 'object' != typeof t)
    throw new Error('[h3] Invalid stream provided.');
  if (((e.node.res._data = t), !e.node.res.socket))
    return (e._handled = !0), Promise.resolve();
  if (hasProp$1(t, 'pipeTo') && 'function' == typeof t.pipeTo)
    return t
      .pipeTo(
        new WritableStream({
          write(t) {
            e.node.res.write(t);
          }
        })
      )
      .then(() => {
        e.node.res.end();
      });
  if (hasProp$1(t, 'pipe') && 'function' == typeof t.pipe)
    return new Promise((s, r) => {
      t.pipe(e.node.res),
        t.on &&
          (t.on('end', () => {
            e.node.res.end(), s();
          }),
          t.on('error', (e) => {
            r(e);
          })),
        e.node.res.on('close', () => {
          t.abort && t.abort();
        });
    });
  throw new Error('[h3] Invalid or incompatible stream provided.');
}
function sendWebResponse(e, t) {
  for (const [s, r] of t.headers)
    'set-cookie' === s
      ? e.node.res.appendHeader(s, splitCookiesString(r))
      : e.node.res.setHeader(s, r);
  if (
    (t.status &&
      (e.node.res.statusCode = sanitizeStatusCode$1(
        t.status,
        e.node.res.statusCode
      )),
    t.statusText &&
      (e.node.res.statusMessage = sanitizeStatusMessage$1(t.statusText)),
    t.redirected && e.node.res.setHeader('location', t.url),
    t.body)
  )
    return sendStream(e, t.body);
  e.node.res.end();
}
const vn = new Set(['PATCH', 'POST', 'PUT', 'DELETE']),
  Sn = new Set([
    'transfer-encoding',
    'accept-encoding',
    'connection',
    'keep-alive',
    'upgrade',
    'expect',
    'host',
    'accept'
  ]);
async function proxyRequest(e, t, s = {}) {
  let r, o;
  vn.has(e.method) &&
    (s.streamRequest
      ? ((r = (function (e) {
          if (!fn.includes(e.method)) return;
          const t = e.web?.request?.body || e._requestBody;
          return (
            t ||
            (pn in e.node.req ||
            'rawBody' in e.node.req ||
            'body' in e.node.req ||
            '__unenv__' in e.node.req
              ? new ReadableStream({
                  async start(t) {
                    const s = await readRawBody$1(e, !1);
                    s && t.enqueue(s), t.close();
                  }
                })
              : new ReadableStream({
                  start: (t) => {
                    e.node.req.on('data', (e) => {
                      t.enqueue(e);
                    }),
                      e.node.req.on('end', () => {
                        t.close();
                      }),
                      e.node.req.on('error', (e) => {
                        t.error(e);
                      });
                  }
                }))
          );
        })(e)),
        (o = 'half'))
      : (r = await readRawBody$1(e, !1).catch(() => {})));
  const a = s.fetchOptions?.method || e.method,
    u = (function (e, ...t) {
      const s = t.filter(Boolean);
      if (0 === s.length) return e;
      const r = new Headers(e);
      for (const e of s)
        for (const [t, s] of Object.entries(e)) void 0 !== s && r.set(t, s);
      return r;
    })(
      getProxyRequestHeaders(e, { host: t.startsWith('/') }),
      s.fetchOptions?.headers,
      s.headers
    );
  return (async function (e, t, s = {}) {
    let r;
    try {
      r = await _getFetch(s.fetch)(t, {
        headers: s.headers,
        ignoreResponseError: !0,
        ...s.fetchOptions
      });
    } catch (e) {
      throw createError$1({
        status: 502,
        statusMessage: 'Bad Gateway',
        cause: e
      });
    }
    (e.node.res.statusCode = sanitizeStatusCode$1(
      r.status,
      e.node.res.statusCode
    )),
      (e.node.res.statusMessage = sanitizeStatusMessage$1(r.statusText));
    const o = [];
    for (const [t, s] of r.headers.entries())
      'content-encoding' !== t &&
        'content-length' !== t &&
        ('set-cookie' !== t
          ? e.node.res.setHeader(t, s)
          : o.push(...splitCookiesString(s)));
    o.length > 0 &&
      e.node.res.setHeader(
        'set-cookie',
        o.map(
          (e) => (
            s.cookieDomainRewrite &&
              (e = rewriteCookieProperty(e, s.cookieDomainRewrite, 'domain')),
            s.cookiePathRewrite &&
              (e = rewriteCookieProperty(e, s.cookiePathRewrite, 'path')),
            e
          )
        )
      );
    s.onResponse && (await s.onResponse(e, r));
    if (void 0 !== r._data) return r._data;
    if (e.handled) return;
    if (!1 === s.sendStream) {
      const t = new Uint8Array(await r.arrayBuffer());
      return e.node.res.end(t);
    }
    if (r.body) for await (const t of r.body) e.node.res.write(t);
    return e.node.res.end();
  })(e, t, {
    ...s,
    fetchOptions: {
      method: a,
      body: r,
      duplex: o,
      ...s.fetchOptions,
      headers: u
    }
  });
}
function getProxyRequestHeaders(e, t) {
  const s = Object.create(null),
    r = getRequestHeaders$1(e);
  for (const e in r) (!Sn.has(e) || ('host' === e && t?.host)) && (s[e] = r[e]);
  return s;
}
function fetchWithEvent(e, t, s, r) {
  return _getFetch(r?.fetch)(t, {
    ...s,
    context: s?.context || e.context,
    headers: {
      ...getProxyRequestHeaders(e, {
        host: 'string' == typeof t && t.startsWith('/')
      }),
      ...s?.headers
    }
  });
}
function _getFetch(e) {
  if (e) return e;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error(
    'fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.'
  );
}
function rewriteCookieProperty(e, t, s) {
  const r = 'string' == typeof t ? { '*': t } : t;
  return e.replace(new RegExp(`(;\\s*${s}=)([^;]+)`, 'gi'), (e, t, s) => {
    let o;
    if (s in r) o = r[s];
    else {
      if (!('*' in r)) return e;
      o = r['*'];
    }
    return o ? t + o : '';
  });
}
class H3Event {
  __is_event__ = !0;
  node;
  web;
  context = {};
  _method;
  _path;
  _headers;
  _requestBody;
  _handled = !1;
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(e, t) {
    this.node = { req: e, res: t };
  }
  get method() {
    return (
      this._method ||
        (this._method = (this.node.req.method || 'GET').toUpperCase()),
      this._method
    );
  }
  get path() {
    return this._path || this.node.req.url || '/';
  }
  get headers() {
    return (
      this._headers ||
        (this._headers = (function (e) {
          const t = new Headers();
          for (const [s, r] of Object.entries(e))
            if (Array.isArray(r)) for (const e of r) t.append(s, e);
            else r && t.set(s, r);
          return t;
        })(this.node.req.headers)),
      this._headers
    );
  }
  get handled() {
    return (
      this._handled || this.node.res.writableEnded || this.node.res.headersSent
    );
  }
  respondWith(e) {
    return Promise.resolve(e).then((e) => sendWebResponse(this, e));
  }
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  get req() {
    return this.node.req;
  }
  get res() {
    return this.node.res;
  }
}
function isEvent(e) {
  return hasProp$1(e, '__is_event__');
}
function createEvent(e, t) {
  return new H3Event(e, t);
}
function defineEventHandler$1(e) {
  if ('function' == typeof e) return (e.__is_handler__ = !0), e;
  const t = {
      onRequest: _normalizeArray$1(e.onRequest),
      onBeforeResponse: _normalizeArray$1(e.onBeforeResponse)
    },
    _handler = (s) =>
      (async function (e, t, s) {
        if (s.onRequest)
          for (const t of s.onRequest) if ((await t(e), e.handled)) return;
        const r = await t(e),
          o = { body: r };
        if (s.onBeforeResponse)
          for (const t of s.onBeforeResponse) await t(e, o);
        return o.body;
      })(s, e.handler, t);
  return (
    (_handler.__is_handler__ = !0),
    (_handler.__resolve__ = e.handler.__resolve__),
    (_handler.__websocket__ = e.websocket),
    _handler
  );
}
function _normalizeArray$1(e) {
  return e ? (Array.isArray(e) ? e : [e]) : void 0;
}
const _n = defineEventHandler$1;
function isEventHandler(e) {
  return hasProp$1(e, '__is_handler__');
}
function toEventHandler(e, t, s) {
  return (
    isEventHandler(e) ||
      console.warn(
        '[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.',
        s && '/' !== s ? `\n     Route: ${s}` : '',
        `\n     Handler: ${e}`
      ),
    e
  );
}
const lazyEventHandler = function (e) {
  let t, s;
  const resolveHandler = () =>
      s
        ? Promise.resolve(s)
        : (t ||
            (t = Promise.resolve(e()).then((e) => {
              const t = e.default || e;
              if ('function' != typeof t)
                throw new TypeError(
                  'Invalid lazy handler result. It should be a function:',
                  t
                );
              return (s = { handler: toEventHandler(e.default || e) }), s;
            })),
          t),
    r = _n((e) =>
      s ? s.handler(e) : resolveHandler().then((t) => t.handler(e))
    );
  return (r.__resolve__ = resolveHandler), r;
};
function createApp$1(e = {}) {
  const t = [],
    s = (function (e, t) {
      const s = t.debug ? 2 : void 0;
      return _n(async (r) => {
        r.node.req.originalUrl =
          r.node.req.originalUrl || r.node.req.url || '/';
        const o = r._path || r.node.req.url || '/';
        let a;
        t.onRequest && (await t.onRequest(r));
        for (const u of e) {
          if (u.route.length > 1) {
            if (!o.startsWith(u.route)) continue;
            a = o.slice(u.route.length) || '/';
          } else a = o;
          if (u.match && !u.match(a, r)) continue;
          (r._path = a), (r.node.req.url = a);
          const e = await u.handler(r),
            d = void 0 === e ? void 0 : await e;
          if (void 0 !== d) {
            const e = { body: d };
            return (
              t.onBeforeResponse &&
                ((r._onBeforeResponseCalled = !0),
                await t.onBeforeResponse(r, e)),
              await handleHandlerResponse(r, e.body, s),
              void (
                t.onAfterResponse &&
                ((r._onAfterResponseCalled = !0), await t.onAfterResponse(r, e))
              )
            );
          }
          if (r.handled)
            return void (
              t.onAfterResponse &&
              ((r._onAfterResponseCalled = !0),
              await t.onAfterResponse(r, void 0))
            );
        }
        if (!r.handled)
          throw createError$1({
            statusCode: 404,
            statusMessage: `Cannot find any path matching ${r.path || '/'}.`
          });
        t.onAfterResponse &&
          ((r._onAfterResponseCalled = !0), await t.onAfterResponse(r, void 0));
      });
    })(t, e),
    r = (function (e) {
      return async (t) => {
        let s;
        for (const r of e) {
          if ('/' === r.route && !r.handler.__resolve__) continue;
          if (!t.startsWith(r.route)) continue;
          if (
            ((s = t.slice(r.route.length) || '/'),
            r.match && !r.match(s, void 0))
          )
            continue;
          let e = { route: r.route, handler: r.handler };
          if (e.handler.__resolve__) {
            const t = await e.handler.__resolve__(s);
            if (!t) continue;
            e = { ...e, ...t, route: joinURL(e.route || '/', t.route || '/') };
          }
          return e;
        }
      };
    })(t);
  s.__resolve__ = r;
  const o = (function (e) {
      let t;
      return () => (t || (t = e()), t);
    })(() => {
      return (
        (t = r),
        {
          ...e.websocket,
          async resolve(e) {
            const s = e.request?.url || e.url || '/',
              { pathname: r } = 'string' == typeof s ? parseURL(s) : s,
              o = await t(r);
            return o?.handler?.__websocket__ || {};
          }
        }
      );
      var t;
    }),
    a = {
      use: (e, t, s) => use(a, e, t, s),
      resolve: r,
      handler: s,
      stack: t,
      options: e,
      get websocket() {
        return o();
      }
    };
  return a;
}
function use(e, t, s, r) {
  if (Array.isArray(t)) for (const o of t) use(e, o, s, r);
  else if (Array.isArray(s)) for (const o of s) use(e, t, o, r);
  else
    'string' == typeof t
      ? e.stack.push(normalizeLayer({ ...r, route: t, handler: s }))
      : 'function' == typeof t
        ? e.stack.push(normalizeLayer({ ...s, handler: t }))
        : e.stack.push(normalizeLayer({ ...t }));
  return e;
}
function normalizeLayer(e) {
  let t = e.handler;
  return (
    t.handler && (t = t.handler),
    e.lazy
      ? (t = lazyEventHandler(t))
      : isEventHandler(t) || (t = toEventHandler(t, 0, e.route)),
    { route: withoutTrailingSlash(e.route), match: e.match, handler: t }
  );
}
function handleHandlerResponse(e, s, r) {
  if (null === s)
    return (function (e, t) {
      if (e.handled) return;
      t || 200 === e.node.res.statusCode || (t = e.node.res.statusCode);
      const s = sanitizeStatusCode$1(t, 204);
      204 === s && e.node.res.removeHeader('content-length'),
        e.node.res.writeHead(s),
        e.node.res.end();
    })(e);
  if (s) {
    if (((o = s), 'undefined' != typeof Response && o instanceof Response))
      return sendWebResponse(e, s);
    if (
      (function (e) {
        if (!e || 'object' != typeof e) return !1;
        if ('function' == typeof e.pipe) {
          if ('function' == typeof e._read) return !0;
          if ('function' == typeof e.abort) return !0;
        }
        return 'function' == typeof e.pipeTo;
      })(s)
    )
      return sendStream(e, s);
    if (s.buffer) return send$1(e, s);
    if (s.arrayBuffer && 'function' == typeof s.arrayBuffer)
      return s.arrayBuffer().then((r) => send$1(e, t.from(r), s.type));
    if (s instanceof Error) throw createError$1(s);
    if ('function' == typeof s.end) return !0;
  }
  var o;
  const a = typeof s;
  if ('string' === a) return send$1(e, s, mn.html);
  if ('object' === a || 'boolean' === a || 'number' === a)
    return send$1(e, JSON.stringify(s, void 0, r), mn.json);
  if ('bigint' === a) return send$1(e, s.toString(), mn.json);
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${a} as response.`
  });
}
const wn = [
  'connect',
  'delete',
  'get',
  'head',
  'options',
  'post',
  'put',
  'trace',
  'patch'
];
function toNodeListener(e) {
  return async function (t, s) {
    const r = createEvent(t, s);
    try {
      await e.handler(r);
    } catch (t) {
      const s = createError$1(t);
      if (
        (isError$2(t) || (s.unhandled = !0),
        setResponseStatus$1(r, s.statusCode, s.statusMessage),
        e.options.onError && (await e.options.onError(s, r)),
        r.handled)
      )
        return;
      (s.unhandled || s.fatal) &&
        console.error('[h3]', s.fatal ? '[fatal]' : '[unhandled]', s),
        e.options.onBeforeResponse &&
          !r._onBeforeResponseCalled &&
          (await e.options.onBeforeResponse(r, { body: s })),
        await (function (e, t, s) {
          if (e.handled) return;
          const r = isError$2(t) ? t : createError$1(t),
            o = {
              statusCode: r.statusCode,
              statusMessage: r.statusMessage,
              stack: [],
              data: r.data
            };
          if (
            (s && (o.stack = (r.stack || '').split('\n').map((e) => e.trim())),
            e.handled)
          )
            return;
          setResponseStatus$1(
            e,
            Number.parseInt(r.statusCode),
            r.statusMessage
          ),
            e.node.res.setHeader('content-type', mn.json),
            e.node.res.end(JSON.stringify(o, void 0, 2));
        })(r, s, !!e.options.debug),
        e.options.onAfterResponse &&
          !r._onAfterResponseCalled &&
          (await e.options.onAfterResponse(r, { body: s }));
    }
  };
}
function flatHooks(e, t = {}, s) {
  for (const r in e) {
    const o = e[r],
      a = s ? `${s}:${r}` : r;
    'object' == typeof o && null !== o
      ? flatHooks(o, t, a)
      : 'function' == typeof o && (t[a] = o);
  }
  return t;
}
const kn = { run: (e) => e() },
  Cn = void 0 !== console.createTask ? console.createTask : () => kn;
function serialTaskCaller(e, t) {
  const s = t.shift(),
    r = Cn(s);
  return e.reduce(
    (e, s) => e.then(() => r.run(() => s(...t))),
    Promise.resolve()
  );
}
function parallelTaskCaller(e, t) {
  const s = t.shift(),
    r = Cn(s);
  return Promise.all(e.map((e) => r.run(() => e(...t))));
}
function callEachWith(e, t) {
  for (const s of [...e]) s(t);
}
class Hookable {
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
  hook(e, t, s = {}) {
    if (!e || 'function' != typeof t) return () => {};
    const r = e;
    let o;
    for (; this._deprecatedHooks[e]; )
      (o = this._deprecatedHooks[e]), (e = o.to);
    if (o && !s.allowDeprecated) {
      let e = o.message;
      e ||
        (e =
          `${r} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(e) ||
          (console.warn(e), this._deprecatedMessages.add(e));
    }
    if (!t.name)
      try {
        Object.defineProperty(t, 'name', {
          get: () => '_' + e.replace(/\W+/g, '_') + '_hook_cb',
          configurable: !0
        });
      } catch {}
    return (
      (this._hooks[e] = this._hooks[e] || []),
      this._hooks[e].push(t),
      () => {
        t && (this.removeHook(e, t), (t = void 0));
      }
    );
  }
  hookOnce(e, t) {
    let s,
      _function = (...e) => (
        'function' == typeof s && s(),
        (s = void 0),
        (_function = void 0),
        t(...e)
      );
    return (s = this.hook(e, _function)), s;
  }
  removeHook(e, t) {
    if (this._hooks[e]) {
      const s = this._hooks[e].indexOf(t);
      -1 !== s && this._hooks[e].splice(s, 1),
        0 === this._hooks[e].length && delete this._hooks[e];
    }
  }
  deprecateHook(e, t) {
    this._deprecatedHooks[e] = 'string' == typeof t ? { to: t } : t;
    const s = this._hooks[e] || [];
    delete this._hooks[e];
    for (const t of s) this.hook(e, t);
  }
  deprecateHooks(e) {
    Object.assign(this._deprecatedHooks, e);
    for (const t in e) this.deprecateHook(t, e[t]);
  }
  addHooks(e) {
    const t = flatHooks(e),
      s = Object.keys(t).map((e) => this.hook(e, t[e]));
    return () => {
      for (const e of s.splice(0, s.length)) e();
    };
  }
  removeHooks(e) {
    const t = flatHooks(e);
    for (const e in t) this.removeHook(e, t[e]);
  }
  removeAllHooks() {
    for (const e in this._hooks) delete this._hooks[e];
  }
  callHook(e, ...t) {
    return t.unshift(e), this.callHookWith(serialTaskCaller, e, ...t);
  }
  callHookParallel(e, ...t) {
    return t.unshift(e), this.callHookWith(parallelTaskCaller, e, ...t);
  }
  callHookWith(e, t, ...s) {
    const r =
      this._before || this._after ? { name: t, args: s, context: {} } : void 0;
    this._before && callEachWith(this._before, r);
    const o = e(t in this._hooks ? [...this._hooks[t]] : [], s);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && r && callEachWith(this._after, r);
        })
      : (this._after && r && callEachWith(this._after, r), o);
  }
  beforeEach(e) {
    return (
      (this._before = this._before || []),
      this._before.push(e),
      () => {
        if (void 0 !== this._before) {
          const t = this._before.indexOf(e);
          -1 !== t && this._before.splice(t, 1);
        }
      }
    );
  }
  afterEach(e) {
    return (
      (this._after = this._after || []),
      this._after.push(e),
      () => {
        if (void 0 !== this._after) {
          const t = this._after.indexOf(e);
          -1 !== t && this._after.splice(t, 1);
        }
      }
    );
  }
}
function createHooks() {
  return new Hookable();
}
const xn = globalThis;
class FetchError extends Error {
  constructor(e, t) {
    super(e, t),
      (this.name = 'FetchError'),
      t?.cause && !this.cause && (this.cause = t.cause);
  }
}
const Rn = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));
function isPayloadMethod(e = 'GET') {
  return Rn.has(e.toUpperCase());
}
const jn = new Set([
    'image/svg',
    'application/xml',
    'application/xhtml',
    'application/html'
  ]),
  En = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function resolveFetchOptions(e, t, s, r) {
  const o = (function (e, t, s) {
    if (!t) return new s(e);
    const r = new s(t);
    if (e)
      for (const [t, o] of Symbol.iterator in e || Array.isArray(e)
        ? e
        : new s(e))
        r.set(t, o);
    return r;
  })(t?.headers ?? e?.headers, s?.headers, r);
  let a;
  return (
    (s?.query || s?.params || t?.params || t?.query) &&
      (a = { ...s?.params, ...s?.query, ...t?.params, ...t?.query }),
    { ...s, ...t, query: a, params: a, headers: o }
  );
}
async function callHooks(e, t) {
  if (t)
    if (Array.isArray(t)) for (const s of t) await s(e);
    else await t(e);
}
const An = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
  Tn = new Set([101, 204, 205, 304]);
function createFetch(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function onError(e) {
    const t =
      (e.error && 'AbortError' === e.error.name && !e.options.timeout) || !1;
    if (!1 !== e.options.retry && !t) {
      let t;
      t =
        'number' == typeof e.options.retry
          ? e.options.retry
          : isPayloadMethod(e.options.method)
            ? 0
            : 1;
      const s = (e.response && e.response.status) || 500;
      if (
        t > 0 &&
        (Array.isArray(e.options.retryStatusCodes)
          ? e.options.retryStatusCodes.includes(s)
          : An.has(s))
      ) {
        const s =
          'function' == typeof e.options.retryDelay
            ? e.options.retryDelay(e)
            : e.options.retryDelay || 0;
        return (
          s > 0 && (await new Promise((e) => setTimeout(e, s))),
          $fetchRaw(e.request, { ...e.options, retry: t - 1 })
        );
      }
    }
    const s = (function (e) {
      const t = e.error?.message || e.error?.toString() || '',
        s = e.request?.method || e.options?.method || 'GET',
        r = e.request?.url || String(e.request) || '/',
        o = `[${s}] ${JSON.stringify(r)}`,
        a = e.response
          ? `${e.response.status} ${e.response.statusText}`
          : '<no response>',
        u = new FetchError(
          `${o}: ${a}${t ? ` ${t}` : ''}`,
          e.error ? { cause: e.error } : void 0
        );
      for (const t of ['request', 'options', 'response'])
        Object.defineProperty(u, t, { get: () => e[t] });
      for (const [t, s] of [
        ['data', '_data'],
        ['status', 'status'],
        ['statusCode', 'status'],
        ['statusText', 'statusText'],
        ['statusMessage', 'statusText']
      ])
        Object.defineProperty(u, t, { get: () => e.response && e.response[s] });
      return u;
    })(e);
    throw (Error.captureStackTrace && Error.captureStackTrace(s, $fetchRaw), s);
  }
  const $fetchRaw = async function (o, a = {}) {
      const u = {
        request: o,
        options: resolveFetchOptions(o, a, e.defaults, s),
        response: void 0,
        error: void 0
      };
      let d;
      if (
        (u.options.method &&
          (u.options.method = u.options.method.toUpperCase()),
        u.options.onRequest && (await callHooks(u, u.options.onRequest)),
        'string' == typeof u.request &&
          (u.options.baseURL &&
            (u.request = withBase(u.request, u.options.baseURL)),
          u.options.query &&
            ((u.request = withQuery(u.request, u.options.query)),
            delete u.options.query),
          'query' in u.options && delete u.options.query,
          'params' in u.options && delete u.options.params),
        u.options.body &&
          isPayloadMethod(u.options.method) &&
          (!(function (e) {
            if (void 0 === e) return !1;
            const t = typeof e;
            return (
              'string' === t ||
              'number' === t ||
              'boolean' === t ||
              null === t ||
              ('object' === t &&
                (!!Array.isArray(e) ||
                  (!e.buffer &&
                    ((e.constructor && 'Object' === e.constructor.name) ||
                      'function' == typeof e.toJSON))))
            );
          })(u.options.body)
            ? (('pipeTo' in u.options.body &&
                'function' == typeof u.options.body.pipeTo) ||
                'function' == typeof u.options.body.pipe) &&
              ('duplex' in u.options || (u.options.duplex = 'half'))
            : ((u.options.body =
                'string' == typeof u.options.body
                  ? u.options.body
                  : JSON.stringify(u.options.body)),
              (u.options.headers = new s(u.options.headers || {})),
              u.options.headers.has('content-type') ||
                u.options.headers.set('content-type', 'application/json'),
              u.options.headers.has('accept') ||
                u.options.headers.set('accept', 'application/json'))),
        !u.options.signal && u.options.timeout)
      ) {
        const e = new r();
        (d = setTimeout(() => {
          const t = new Error(
            '[TimeoutError]: The operation was aborted due to timeout'
          );
          (t.name = 'TimeoutError'), (t.code = 23), e.abort(t);
        }, u.options.timeout)),
          (u.options.signal = e.signal);
      }
      try {
        u.response = await t(u.request, u.options);
      } catch (e) {
        return (
          (u.error = e),
          u.options.onRequestError &&
            (await callHooks(u, u.options.onRequestError)),
          await onError(u)
        );
      } finally {
        d && clearTimeout(d);
      }
      if (
        (u.response.body || u.response._bodyInit) &&
        !Tn.has(u.response.status) &&
        'HEAD' !== u.options.method
      ) {
        const e =
          (u.options.parseResponse ? 'json' : u.options.responseType) ||
          (function (e = '') {
            if (!e) return 'json';
            const t = e.split(';').shift() || '';
            return En.test(t)
              ? 'json'
              : jn.has(t) || t.startsWith('text/')
                ? 'text'
                : 'blob';
          })(u.response.headers.get('content-type') || '');
        switch (e) {
          case 'json': {
            const e = await u.response.text(),
              t = u.options.parseResponse || destr;
            u.response._data = t(e);
            break;
          }
          case 'stream':
            u.response._data = u.response.body || u.response._bodyInit;
            break;
          default:
            u.response._data = await u.response[e]();
        }
      }
      return (
        u.options.onResponse && (await callHooks(u, u.options.onResponse)),
        !u.options.ignoreResponseError &&
        u.response.status >= 400 &&
        u.response.status < 600
          ? (u.options.onResponseError &&
              (await callHooks(u, u.options.onResponseError)),
            await onError(u))
          : u.response
      );
    },
    $fetch = async function (e, t) {
      return (await $fetchRaw(e, t))._data;
    };
  return (
    ($fetch.raw = $fetchRaw),
    ($fetch.native = (...e) => t(...e)),
    ($fetch.create = (t = {}, s = {}) =>
      createFetch({
        ...e,
        ...s,
        defaults: { ...e.defaults, ...s.defaults, ...t }
      })),
    $fetch
  );
}
const On = (function () {
    if ('undefined' != typeof globalThis) return globalThis;
    if ('undefined' != typeof self) return self;
    if (void 0 !== xn) return xn;
    throw new Error('unable to locate global object');
  })(),
  In = On.fetch
    ? (...e) => On.fetch(...e)
    : () =>
        Promise.reject(new Error('[ofetch] global.fetch is not supported!')),
  Pn = On.Headers,
  Mn = On.AbortController,
  Nn = createFetch({ fetch: In, Headers: Pn, AbortController: Mn });
function hasReqHeader(e, t, s) {
  const r = getRequestHeader$1(e, t);
  return r && 'string' == typeof r && r.toLowerCase().includes(s);
}
function defaultHandler(e, t, s) {
  const r = e.unhandled || e.fatal,
    o = e.statusCode || 500,
    a = e.statusMessage || 'Server Error',
    u = (function (e, t = {}) {
      const s = (function (e, t = {}) {
          if (t.xForwardedHost) {
            const t = e.node.req.headers['x-forwarded-host'];
            if (t) return t;
          }
          return e.node.req.headers.host || 'localhost';
        })(e, t),
        r = (function (e, t = {}) {
          return (!1 !== t.xForwardedProto &&
            'https' === e.node.req.headers['x-forwarded-proto']) ||
            e.node.req.connection?.encrypted
            ? 'https'
            : 'http';
        })(e, t),
        o = (e.node.req.originalUrl || e.path).replace(/^[/\\]+/g, '/');
      return new URL(o, `${r}://${s}`);
    })(t, { xForwardedHost: !0, xForwardedProto: !0 });
  if (404 === o) {
    const e = '/';
    if (/^\/[^/]/.test(e) && !u.pathname.startsWith(e)) {
      return {
        status: 302,
        statusText: 'Found',
        headers: { location: `${e}${u.pathname.slice(1)}${u.search}` },
        body: 'Redirecting...'
      };
    }
  }
  if (r && !s?.silent) {
    const s = [e.unhandled && '[unhandled]', e.fatal && '[fatal]']
      .filter(Boolean)
      .join(' ');
    console.error(`[request error] ${s} [${t.method}] ${u}\n`, e);
  }
  const d = {
    'content-type': 'application/json',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'no-referrer',
    'content-security-policy': "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus$1(t, o, a),
    (404 !== o && getResponseHeader$1(t, 'cache-control')) ||
      (d['cache-control'] = 'no-cache');
  return {
    status: o,
    statusText: a,
    headers: d,
    body: {
      error: !0,
      url: u.href,
      statusCode: o,
      statusMessage: a,
      message: r ? 'Server Error' : e.message,
      data: r ? void 0 : e.data
    }
  };
}
const Ln = [
  async function (e, t) {
    const {
        stack: s,
        statusCode: r,
        statusMessage: o,
        message: a
      } = (function (e) {
        const t = 'function' == typeof I.cwd ? I.cwd() : '/',
          s =
            e.unhandled || e.fatal
              ? []
              : (e.stack || '')
                  .split('\n')
                  .splice(1)
                  .filter((e) => e.includes('at '))
                  .map((e) => ({
                    text: e
                      .replace(t + '/', './')
                      .replace('webpack:/', '')
                      .replace('file://', '')
                      .trim(),
                    internal:
                      (e.includes('node_modules') && !e.includes('.cache')) ||
                      e.includes('internal') ||
                      e.includes('new Promise')
                  })),
          r = e.statusCode || 500;
        return {
          stack: s,
          statusCode: r,
          statusMessage: e.statusMessage ?? (404 === r ? 'Not Found' : ''),
          message: e.unhandled
            ? 'internal server error'
            : e.message || e.toString()
        };
      })(e),
      u = {
        url: t.path,
        statusCode: r,
        statusMessage: o,
        message: a,
        stack: '',
        data: e.data
      };
    if (e.unhandled || e.fatal) {
      const t = [
        '[nuxt]',
        '[request error]',
        e.unhandled && '[unhandled]',
        e.fatal && '[fatal]',
        200 !== Number(u.statusCode) && `[${u.statusCode}]`
      ]
        .filter(Boolean)
        .join(' ');
      console.error(
        t,
        (e.message || e.toString() || 'internal server error') +
          '\n' +
          s.map((e) => '  ' + e.text).join('  \n')
      );
    }
    if (t.handled) return;
    if (
      (setResponseStatus$1(
        t,
        (200 !== u.statusCode && u.statusCode) || 500,
        u.statusMessage
      ),
      (function (e) {
        return (
          !hasReqHeader(e, 'accept', 'text/html') &&
          (hasReqHeader(e, 'accept', 'application/json') ||
            hasReqHeader(e, 'user-agent', 'curl/') ||
            hasReqHeader(e, 'user-agent', 'httpie/') ||
            hasReqHeader(e, 'sec-fetch-mode', 'cors') ||
            e.path.startsWith('/api/') ||
            e.path.endsWith('.json'))
        );
      })(t))
    )
      return (
        setResponseHeader$1(t, 'Content-Type', 'application/json'),
        send$1(t, JSON.stringify(u))
      );
    const d = getRequestHeaders$1(t),
      h =
        t.path.startsWith('/__nuxt_error') || !!d['x-nuxt-error']
          ? null
          : await useNitroApp()
              .localFetch(
                withQuery(
                  joinURL(useRuntimeConfig(t).app.baseURL, '/__nuxt_error'),
                  u
                ),
                {
                  headers: { ...d, 'x-nuxt-error': 'true' },
                  redirect: 'manual'
                }
              )
              .catch(() => null);
    if (!h) {
      const { template: e } = await import('../_/error-500.mjs');
      if (t.handled) return;
      return (
        setResponseHeader$1(t, 'Content-Type', 'text/html;charset=UTF-8'),
        send$1(t, e(u))
      );
    }
    const f = await h.text();
    if (!t.handled) {
      for (const [e, s] of h.headers.entries()) setResponseHeader$1(t, e, s);
      return (
        setResponseStatus$1(
          t,
          h.status && 200 !== h.status ? h.status : void 0,
          h.statusText
        ),
        send$1(t, f)
      );
    }
  },
  function (e, t) {
    const s = defaultHandler(e, t);
    return (
      setResponseHeaders$1(t, s.headers),
      setResponseStatus$1(t, s.status, s.statusText),
      send$1(t, JSON.stringify(s.body, null, 2))
    );
  }
];
const Dn = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$',
  Bn = /[<>\b\f\n\r\t\0\u2028\u2029]/g,
  Hn =
    /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/,
  zn = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  },
  Fn = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(e) {
  const t = new Map();
  let s = 0;
  function log(e) {
    s < 100 && (console.warn(e), (s += 1));
  }
  !(function walk(e) {
    if ('function' != typeof e) {
      if (t.has(e)) t.set(e, t.get(e) + 1);
      else if ((t.set(e, 1), !isPrimitive$2(e))) {
        switch (getType(e)) {
          case 'Number':
          case 'String':
          case 'Boolean':
          case 'Date':
          case 'RegExp':
            return;
          case 'Array':
            e.forEach(walk);
            break;
          case 'Set':
          case 'Map':
            Array.from(e).forEach(walk);
            break;
          default:
            const t = Object.getPrototypeOf(e);
            t !== Object.prototype &&
            null !== t &&
            Object.getOwnPropertyNames(t).sort().join('\0') !== Fn
              ? 'function' != typeof e.toJSON &&
                log(
                  `Cannot stringify arbitrary non-POJOs ${e.constructor.name}`
                )
              : Object.getOwnPropertySymbols(e).length > 0
                ? log(
                    `Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(e).map((e) => e.toString())}`
                  )
                : Object.keys(e).forEach((t) => walk(e[t]));
        }
      }
    } else log(`Cannot stringify a function ${e.name}`);
  })(e);
  const r = new Map();
  function stringify(e) {
    if (r.has(e)) return r.get(e);
    if (isPrimitive$2(e)) return stringifyPrimitive(e);
    const t = getType(e);
    switch (t) {
      case 'Number':
      case 'String':
      case 'Boolean':
        return `Object(${stringify(e.valueOf())})`;
      case 'RegExp':
        return e.toString();
      case 'Date':
        return `new Date(${e.getTime()})`;
      case 'Array':
        const s = e.map((t, s) => (s in e ? stringify(t) : '')),
          r = 0 === e.length || e.length - 1 in e ? '' : ',';
        return `[${s.join(',')}${r}]`;
      case 'Set':
      case 'Map':
        return `new ${t}([${Array.from(e).map(stringify).join(',')}])`;
      default:
        if (e.toJSON) {
          let t = e.toJSON();
          if ('String' === getType(t))
            try {
              t = JSON.parse(t);
            } catch (e) {}
          return stringify(t);
        }
        return null === Object.getPrototypeOf(e)
          ? 0 === Object.keys(e).length
            ? 'Object.create(null)'
            : `Object.create(null,{${Object.keys(e)
                .map(
                  (t) =>
                    `${safeKey(t)}:{writable:true,enumerable:true,value:${stringify(e[t])}}`
                )
                .join(',')}})`
          : `{${Object.keys(e)
              .map((t) => `${safeKey(t)}:${stringify(e[t])}`)
              .join(',')}}`;
    }
  }
  Array.from(t)
    .filter((e) => e[1] > 1)
    .sort((e, t) => t[1] - e[1])
    .forEach((e, t) => {
      r.set(
        e[0],
        (function (e) {
          let t = '';
          do {
            (t = Dn[e % 54] + t), (e = ~~(e / 54) - 1);
          } while (e >= 0);
          return Hn.test(t) ? `${t}0` : t;
        })(t)
      );
    });
  const o = stringify(e);
  if (r.size) {
    const e = [],
      t = [],
      s = [];
    return (
      r.forEach((r, o) => {
        if ((e.push(r), isPrimitive$2(o)))
          return void s.push(stringifyPrimitive(o));
        switch (getType(o)) {
          case 'Number':
          case 'String':
          case 'Boolean':
            s.push(`Object(${stringify(o.valueOf())})`);
            break;
          case 'RegExp':
            s.push(o.toString());
            break;
          case 'Date':
            s.push(`new Date(${o.getTime()})`);
            break;
          case 'Array':
            s.push(`Array(${o.length})`),
              o.forEach((e, s) => {
                t.push(`${r}[${s}]=${stringify(e)}`);
              });
            break;
          case 'Set':
            s.push('new Set'),
              t.push(
                `${r}.${Array.from(o)
                  .map((e) => `add(${stringify(e)})`)
                  .join('.')}`
              );
            break;
          case 'Map':
            s.push('new Map'),
              t.push(
                `${r}.${Array.from(o)
                  .map(([e, t]) => `set(${stringify(e)}, ${stringify(t)})`)
                  .join('.')}`
              );
            break;
          default:
            s.push(
              null === Object.getPrototypeOf(o) ? 'Object.create(null)' : '{}'
            ),
              Object.keys(o).forEach((e) => {
                t.push(
                  `${r}${(function (e) {
                    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e)
                      ? `.${e}`
                      : `[${escapeUnsafeChars(JSON.stringify(e))}]`;
                  })(e)}=${stringify(o[e])}`
                );
              });
        }
      }),
      t.push(`return ${o}`),
      `(function(${e.join(',')}){${t.join(';')}}(${s.join(',')}))`
    );
  }
  return o;
}
function isPrimitive$2(e) {
  return Object(e) !== e;
}
function stringifyPrimitive(e) {
  if ('string' == typeof e)
    return (function (e) {
      let t = '"';
      for (let s = 0; s < e.length; s += 1) {
        const r = e.charAt(s),
          o = r.charCodeAt(0);
        if ('"' === r) t += '\\"';
        else if (r in zn) t += zn[r];
        else if (o >= 55296 && o <= 57343) {
          const a = e.charCodeAt(s + 1);
          t +=
            o <= 56319 && a >= 56320 && a <= 57343
              ? r + e[++s]
              : `\\u${o.toString(16).toUpperCase()}`;
        } else t += r;
      }
      return (t += '"'), t;
    })(e);
  if (void 0 === e) return 'void 0';
  if (0 === e && 1 / e < 0) return '-0';
  const t = String(e);
  return 'number' == typeof e ? t.replace(/^(-)?0\./, '$1.') : t;
}
function getType(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function escapeUnsafeChar(e) {
  return zn[e] || e;
}
function escapeUnsafeChars(e) {
  return e.replace(Bn, escapeUnsafeChar);
}
function safeKey(e) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e)
    ? e
    : escapeUnsafeChars(JSON.stringify(e));
}
function makeMap(e) {
  const t = Object.create(null);
  for (const s of e.split(',')) t[s] = 1;
  return (e) => e in t;
}
const $n = {},
  Un = [],
  NOOP = () => {},
  NO = () => !1,
  isOn = (e) =>
    111 === e.charCodeAt(0) &&
    110 === e.charCodeAt(1) &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  isModelListener = (e) => e.startsWith('onUpdate:'),
  qn = Object.assign,
  remove = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  Vn = Object.prototype.hasOwnProperty,
  hasOwn = (e, t) => Vn.call(e, t),
  Wn = Array.isArray,
  isMap = (e) => '[object Map]' === toTypeString(e),
  isSet = (e) => '[object Set]' === toTypeString(e),
  isFunction$3 = (e) => 'function' == typeof e,
  isString$1 = (e) => 'string' == typeof e,
  isSymbol$1 = (e) => 'symbol' == typeof e,
  isObject$3 = (e) => null !== e && 'object' == typeof e,
  isPromise = (e) =>
    (isObject$3(e) || isFunction$3(e)) &&
    isFunction$3(e.then) &&
    isFunction$3(e.catch),
  Kn = Object.prototype.toString,
  toTypeString = (e) => Kn.call(e),
  isPlainObject$2 = (e) => '[object Object]' === toTypeString(e),
  isIntegerKey = (e) =>
    isString$1(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  Qn = makeMap(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  cacheStringFunction = (e) => {
    const t = Object.create(null);
    return (s) => t[s] || (t[s] = e(s));
  },
  Gn = /-(\w)/g,
  Jn = cacheStringFunction((e) =>
    e.replace(Gn, (e, t) => (t ? t.toUpperCase() : ''))
  ),
  Yn = /\B([A-Z])/g,
  Xn = cacheStringFunction((e) => e.replace(Yn, '-$1').toLowerCase()),
  Zn = cacheStringFunction((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  es = cacheStringFunction((e) => (e ? `on${Zn(e)}` : '')),
  hasChanged = (e, t) => !Object.is(e, t),
  invokeArrayFns = (e, ...t) => {
    for (let s = 0; s < e.length; s++) e[s](...t);
  },
  def = (e, t, s, r = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: r,
      value: s
    });
  },
  looseToNumber = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ts;
const getGlobalThis = () =>
  ts ||
  (ts =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
        ? self
        : void 0 !== xn
          ? xn
          : {});
function normalizeStyle(e) {
  if (Wn(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const r = e[s],
        o = isString$1(r) ? parseStringStyle(r) : normalizeStyle(r);
      if (o) for (const e in o) t[e] = o[e];
    }
    return t;
  }
  if (isString$1(e) || isObject$3(e)) return e;
}
const ns = /;(?![^(]*\))/g,
  ss = /:([^]+)/,
  rs = /\/\*[^]*?\*\//g;
function parseStringStyle(e) {
  const t = {};
  return (
    e
      .replace(rs, '')
      .split(ns)
      .forEach((e) => {
        if (e) {
          const s = e.split(ss);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function stringifyStyle(e) {
  if (!e) return '';
  if (isString$1(e)) return e;
  let t = '';
  for (const s in e) {
    const r = e[s];
    if (isString$1(r) || 'number' == typeof r) {
      t += `${s.startsWith('--') ? s : Xn(s)}:${r};`;
    }
  }
  return t;
}
function normalizeClass(e) {
  let t = '';
  if (isString$1(e)) t = e;
  else if (Wn(e))
    for (let s = 0; s < e.length; s++) {
      const r = normalizeClass(e[s]);
      r && (t += r + ' ');
    }
  else if (isObject$3(e)) for (const s in e) e[s] && (t += s + ' ');
  return t.trim();
}
function normalizeProps(e) {
  if (!e) return null;
  let { class: t, style: s } = e;
  return (
    t && !isString$1(t) && (e.class = normalizeClass(t)),
    s && (e.style = normalizeStyle(s)),
    e
  );
}
const os = makeMap(
    'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view'
  ),
  is = makeMap(
    'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'
  ),
  as =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  cs = makeMap(as),
  ls = makeMap(
    as +
      ',async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected'
  );
function includeBooleanAttr(e) {
  return !!e || '' === e;
}
const us = /[>/="'\u0009\u000a\u000c\u0020]/,
  ds = {};
function isSSRSafeAttrName(e) {
  if (ds.hasOwnProperty(e)) return ds[e];
  const t = us.test(e);
  return t && console.error(`unsafe attribute name: ${e}`), (ds[e] = !t);
}
const hs = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv'
};
function isRenderableAttrValue(e) {
  if (null == e) return !1;
  const t = typeof e;
  return 'string' === t || 'number' === t || 'boolean' === t;
}
const ps = /["'&<>]/;
function escapeHtml$1(e) {
  const t = '' + e,
    s = ps.exec(t);
  if (!s) return t;
  let r,
    o,
    a = '',
    u = 0;
  for (o = s.index; o < t.length; o++) {
    switch (t.charCodeAt(o)) {
      case 34:
        r = '&quot;';
        break;
      case 38:
        r = '&amp;';
        break;
      case 39:
        r = '&#39;';
        break;
      case 60:
        r = '&lt;';
        break;
      case 62:
        r = '&gt;';
        break;
      default:
        continue;
    }
    u !== o && (a += t.slice(u, o)), (u = o + 1), (a += r);
  }
  return u !== o ? a + t.slice(u, o) : a;
}
const fs = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(e) {
  return e.replace(fs, '');
}
const isRef$1 = (e) => !(!e || !0 !== e.__v_isRef),
  toDisplayString = (e) =>
    isString$1(e)
      ? e
      : null == e
        ? ''
        : Wn(e) ||
            (isObject$3(e) && (e.toString === Kn || !isFunction$3(e.toString)))
          ? isRef$1(e)
            ? toDisplayString(e.value)
            : JSON.stringify(e, replacer, 2)
          : String(e),
  replacer = (e, t) =>
    isRef$1(t)
      ? replacer(e, t.value)
      : isMap(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (e, [t, s], r) => ((e[stringifySymbol(t, r) + ' =>'] = s), e),
              {}
            )
          }
        : isSet(t)
          ? {
              [`Set(${t.size})`]: [...t.values()].map((e) => stringifySymbol(e))
            }
          : isSymbol$1(t)
            ? stringifySymbol(t)
            : !isObject$3(t) || Wn(t) || isPlainObject$2(t)
              ? t
              : String(t),
  stringifySymbol = (e, t = '') => {
    var s;
    return isSymbol$1(e) ? `Symbol(${null != (s = e.description) ? s : t})` : e;
  };
let ms, gs;
class EffectScope {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = ms),
      !e && ms && (this.index = (ms.scopes || (ms.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      let e, t;
      if (((this._isPaused = !0), this.scopes))
        for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      let e, t;
      if (((this._isPaused = !1), this.scopes))
        for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const t = ms;
      try {
        return (ms = this), e();
      } finally {
        ms = t;
      }
    }
  }
  on() {
    ms = this;
  }
  off() {
    ms = this.parent;
  }
  stop(e) {
    if (this._active) {
      let t, s;
      for (this._active = !1, t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].stop();
      for (this.effects.length = 0, t = 0, s = this.cleanups.length; t < s; t++)
        this.cleanups[t]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const e = this.parent.scopes.pop();
        e &&
          e !== this &&
          ((this.parent.scopes[this.index] = e), (e.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function effectScope(e) {
  return new EffectScope(e);
}
function getCurrentScope() {
  return ms;
}
function onScopeDispose(e, t = !1) {
  ms && ms.cleanups.push(e);
}
const ys = new WeakSet();
class ReactiveEffect {
  constructor(e) {
    (this.fn = e),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      ms && ms.active && ms.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags &&
      ((this.flags &= -65), ys.has(this) && (ys.delete(this), this.trigger()));
  }
  notify() {
    (2 & this.flags && !(32 & this.flags)) || 8 & this.flags || batch(this);
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    (this.flags |= 2), cleanupEffect(this), prepareDeps(this);
    const e = gs,
      t = _s;
    (gs = this), (_s = !0);
    try {
      return this.fn();
    } finally {
      cleanupDeps(this), (gs = e), (_s = t), (this.flags &= -3);
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e = this.deps; e; e = e.nextDep) removeSub(e);
      (this.deps = this.depsTail = void 0),
        cleanupEffect(this),
        this.onStop && this.onStop(),
        (this.flags &= -2);
    }
  }
  trigger() {
    64 & this.flags
      ? ys.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    isDirty(this) && this.run();
  }
  get dirty() {
    return isDirty(this);
  }
}
let bs,
  vs,
  Ss = 0;
function batch(e, t = !1) {
  if (((e.flags |= 8), t)) return (e.next = vs), void (vs = e);
  (e.next = bs), (bs = e);
}
function startBatch() {
  Ss++;
}
function endBatch() {
  if (--Ss > 0) return;
  if (vs) {
    let e = vs;
    for (vs = void 0; e; ) {
      const t = e.next;
      (e.next = void 0), (e.flags &= -9), (e = t);
    }
  }
  let e;
  for (; bs; ) {
    let t = bs;
    for (bs = void 0; t; ) {
      const s = t.next;
      if (((t.next = void 0), (t.flags &= -9), 1 & t.flags))
        try {
          t.trigger();
        } catch (t) {
          e || (e = t);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function prepareDeps(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t);
}
function cleanupDeps(e) {
  let t,
    s = e.depsTail,
    r = s;
  for (; r; ) {
    const e = r.prevDep;
    -1 === r.version
      ? (r === s && (s = e), removeSub(r), removeDep(r))
      : (t = r),
      (r.dep.activeLink = r.prevActiveLink),
      (r.prevActiveLink = void 0),
      (r = e);
  }
  (e.deps = t), (e.depsTail = s);
}
function isDirty(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed &&
        (refreshComputed(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function refreshComputed(e) {
  if (4 & e.flags && !(16 & e.flags)) return;
  if (((e.flags &= -17), e.globalVersion === ks)) return;
  e.globalVersion = ks;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !isDirty(e)))
    return void (e.flags &= -3);
  const s = gs,
    r = _s;
  (gs = e), (_s = !0);
  try {
    prepareDeps(e);
    const s = e.fn(e._value);
    (0 === t.version || hasChanged(s, e._value)) &&
      ((e._value = s), t.version++);
  } catch (e) {
    throw (t.version++, e);
  } finally {
    (gs = s), (_s = r), cleanupDeps(e), (e.flags &= -3);
  }
}
function removeSub(e, t = !1) {
  const { dep: s, prevSub: r, nextSub: o } = e;
  if (
    (r && ((r.nextSub = o), (e.prevSub = void 0)),
    o && ((o.prevSub = r), (e.nextSub = void 0)),
    s.subs === e && ((s.subs = r), !r && s.computed))
  ) {
    s.computed.flags &= -5;
    for (let e = s.computed.deps; e; e = e.nextDep) removeSub(e, !0);
  }
  t || --s.sc || !s.map || s.map.delete(s.key);
}
function removeDep(e) {
  const { prevDep: t, nextDep: s } = e;
  t && ((t.nextDep = s), (e.prevDep = void 0)),
    s && ((s.prevDep = t), (e.nextDep = void 0));
}
let _s = !0;
const ws = [];
function pauseTracking() {
  ws.push(_s), (_s = !1);
}
function resetTracking() {
  const e = ws.pop();
  _s = void 0 === e || e;
}
function cleanupEffect(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const e = gs;
    gs = void 0;
    try {
      t();
    } finally {
      gs = e;
    }
  }
}
let ks = 0;
class Link {
  constructor(e, t) {
    (this.sub = e),
      (this.dep = t),
      (this.version = t.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0);
  }
}
class Dep {
  constructor(e) {
    (this.computed = e),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0);
  }
  track(e) {
    if (!gs || !_s || gs === this.computed) return;
    let t = this.activeLink;
    if (void 0 === t || t.sub !== gs)
      (t = this.activeLink = new Link(gs, this)),
        gs.deps
          ? ((t.prevDep = gs.depsTail),
            (gs.depsTail.nextDep = t),
            (gs.depsTail = t))
          : (gs.deps = gs.depsTail = t),
        addSub(t);
    else if (-1 === t.version && ((t.version = this.version), t.nextDep)) {
      const e = t.nextDep;
      (e.prevDep = t.prevDep),
        t.prevDep && (t.prevDep.nextDep = e),
        (t.prevDep = gs.depsTail),
        (t.nextDep = void 0),
        (gs.depsTail.nextDep = t),
        (gs.depsTail = t),
        gs.deps === t && (gs.deps = e);
    }
    return t;
  }
  trigger(e) {
    this.version++, ks++, this.notify(e);
  }
  notify(e) {
    startBatch();
    try {
      0;
      for (let e = this.subs; e; e = e.prevSub)
        e.sub.notify() && e.sub.dep.notify();
    } finally {
      endBatch();
    }
  }
}
function addSub(e) {
  if ((e.dep.sc++, 4 & e.sub.flags)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let e = t.deps; e; e = e.nextDep) addSub(e);
    }
    const s = e.dep.subs;
    s !== e && ((e.prevSub = s), s && (s.nextSub = e)), (e.dep.subs = e);
  }
}
const Cs = new WeakMap(),
  xs = Symbol(''),
  Rs = Symbol(''),
  js = Symbol('');
function track(e, t, s) {
  if (_s && gs) {
    let t = Cs.get(e);
    t || Cs.set(e, (t = new Map()));
    let r = t.get(s);
    r || (t.set(s, (r = new Dep())), (r.map = t), (r.key = s)), r.track();
  }
}
function trigger(e, t, s, r, o, a) {
  const u = Cs.get(e);
  if (!u) return void ks++;
  const run = (e) => {
    e && e.trigger();
  };
  if ((startBatch(), 'clear' === t)) u.forEach(run);
  else {
    const o = Wn(e),
      a = o && isIntegerKey(s);
    if (o && 'length' === s) {
      const e = Number(r);
      u.forEach((t, s) => {
        ('length' === s || s === js || (!isSymbol$1(s) && s >= e)) && run(t);
      });
    } else
      switch (
        ((void 0 !== s || u.has(void 0)) && run(u.get(s)),
        a && run(u.get(js)),
        t)
      ) {
        case 'add':
          o
            ? a && run(u.get('length'))
            : (run(u.get(xs)), isMap(e) && run(u.get(Rs)));
          break;
        case 'delete':
          o || (run(u.get(xs)), isMap(e) && run(u.get(Rs)));
          break;
        case 'set':
          isMap(e) && run(u.get(xs));
      }
  }
  endBatch();
}
function reactiveReadArray(e) {
  const t = toRaw(e);
  return t === e ? t : (track(t, 0, js), isShallow(e) ? t : t.map(toReactive));
}
function shallowReadArray(e) {
  return track((e = toRaw(e)), 0, js), e;
}
const Es = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...e) {
    return reactiveReadArray(this).concat(
      ...e.map((e) => (Wn(e) ? reactiveReadArray(e) : e))
    );
  },
  entries() {
    return iterator(this, 'entries', (e) => ((e[1] = toReactive(e[1])), e));
  },
  every(e, t) {
    return apply$1(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return apply$1(this, 'filter', e, t, (e) => e.map(toReactive), arguments);
  },
  find(e, t) {
    return apply$1(this, 'find', e, t, toReactive, arguments);
  },
  findIndex(e, t) {
    return apply$1(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return apply$1(this, 'findLast', e, t, toReactive, arguments);
  },
  findLastIndex(e, t) {
    return apply$1(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return apply$1(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return searchProxy(this, 'includes', e);
  },
  indexOf(...e) {
    return searchProxy(this, 'indexOf', e);
  },
  join(e) {
    return reactiveReadArray(this).join(e);
  },
  lastIndexOf(...e) {
    return searchProxy(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return apply$1(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return noTracking(this, 'pop');
  },
  push(...e) {
    return noTracking(this, 'push', e);
  },
  reduce(e, ...t) {
    return reduce(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return reduce(this, 'reduceRight', e, t);
  },
  shift() {
    return noTracking(this, 'shift');
  },
  some(e, t) {
    return apply$1(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return noTracking(this, 'splice', e);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(e) {
    return reactiveReadArray(this).toSorted(e);
  },
  toSpliced(...e) {
    return reactiveReadArray(this).toSpliced(...e);
  },
  unshift(...e) {
    return noTracking(this, 'unshift', e);
  },
  values() {
    return iterator(this, 'values', toReactive);
  }
};
function iterator(e, t, s) {
  const r = shallowReadArray(e),
    o = r[t]();
  return (
    r === e ||
      isShallow(e) ||
      ((o._next = o.next),
      (o.next = () => {
        const e = o._next();
        return e.value && (e.value = s(e.value)), e;
      })),
    o
  );
}
const As = Array.prototype;
function apply$1(e, t, s, r, o, a) {
  const u = shallowReadArray(e),
    d = u !== e && !isShallow(e),
    h = u[t];
  if (h !== As[t]) {
    const t = h.apply(e, a);
    return d ? toReactive(t) : t;
  }
  let f = s;
  u !== e &&
    (d
      ? (f = function (t, r) {
          return s.call(this, toReactive(t), r, e);
        })
      : s.length > 2 &&
        (f = function (t, r) {
          return s.call(this, t, r, e);
        }));
  const m = h.call(u, f, r);
  return d && o ? o(m) : m;
}
function reduce(e, t, s, r) {
  const o = shallowReadArray(e);
  let a = s;
  return (
    o !== e &&
      (isShallow(e)
        ? s.length > 3 &&
          (a = function (t, r, o) {
            return s.call(this, t, r, o, e);
          })
        : (a = function (t, r, o) {
            return s.call(this, t, toReactive(r), o, e);
          })),
    o[t](a, ...r)
  );
}
function searchProxy(e, t, s) {
  const r = toRaw(e);
  track(r, 0, js);
  const o = r[t](...s);
  return (-1 !== o && !1 !== o) || !isProxy(s[0])
    ? o
    : ((s[0] = toRaw(s[0])), r[t](...s));
}
function noTracking(e, t, s = []) {
  pauseTracking(), startBatch();
  const r = toRaw(e)[t].apply(e, s);
  return endBatch(), resetTracking(), r;
}
const Ts = makeMap('__proto__,__v_isRef,__isVue'),
  Os = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => 'arguments' !== e && 'caller' !== e)
      .map((e) => Symbol[e])
      .filter(isSymbol$1)
  );
function hasOwnProperty$2(e) {
  isSymbol$1(e) || (e = String(e));
  const t = toRaw(this);
  return track(t, 0, e), t.hasOwnProperty(e);
}
class BaseReactiveHandler {
  constructor(e = !1, t = !1) {
    (this._isReadonly = e), (this._isShallow = t);
  }
  get(e, t, s) {
    if ('__v_skip' === t) return e.__v_skip;
    const r = this._isReadonly,
      o = this._isShallow;
    if ('__v_isReactive' === t) return !r;
    if ('__v_isReadonly' === t) return r;
    if ('__v_isShallow' === t) return o;
    if ('__v_raw' === t)
      return s === (r ? (o ? Fs : zs) : o ? Hs : Bs).get(e) ||
        Object.getPrototypeOf(e) === Object.getPrototypeOf(s)
        ? e
        : void 0;
    const a = Wn(e);
    if (!r) {
      let e;
      if (a && (e = Es[t])) return e;
      if ('hasOwnProperty' === t) return hasOwnProperty$2;
    }
    const u = Reflect.get(e, t, isRef(e) ? e : s);
    return (isSymbol$1(t) ? Os.has(t) : Ts(t))
      ? u
      : (r || track(e, 0, t),
        o
          ? u
          : isRef(u)
            ? a && isIntegerKey(t)
              ? u
              : u.value
            : isObject$3(u)
              ? r
                ? readonly$1(u)
                : reactive(u)
              : u);
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, s, r) {
    let o = e[t];
    if (!this._isShallow) {
      const t = isReadonly(o);
      if (
        (isShallow(s) || isReadonly(s) || ((o = toRaw(o)), (s = toRaw(s))),
        !Wn(e) && isRef(o) && !isRef(s))
      )
        return !t && ((o.value = s), !0);
    }
    const a = Wn(e) && isIntegerKey(t) ? Number(t) < e.length : hasOwn(e, t),
      u = Reflect.set(e, t, s, isRef(e) ? e : r);
    return (
      e === toRaw(r) &&
        (a
          ? hasChanged(s, o) && trigger(e, 'set', t, s)
          : trigger(e, 'add', t, s)),
      u
    );
  }
  deleteProperty(e, t) {
    const s = hasOwn(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && s && trigger(e, 'delete', t, void 0), r;
  }
  has(e, t) {
    const s = Reflect.has(e, t);
    return (isSymbol$1(t) && Os.has(t)) || track(e, 0, t), s;
  }
  ownKeys(e) {
    return track(e, 0, Wn(e) ? 'length' : xs), Reflect.ownKeys(e);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}
const Is = new MutableReactiveHandler(),
  Ps = new ReadonlyReactiveHandler(),
  Ms = new MutableReactiveHandler(!0),
  toShallow = (e) => e,
  getProto = (e) => Reflect.getPrototypeOf(e);
function createReadonlyMethod(e) {
  return function (...t) {
    return 'delete' !== e && ('clear' === e ? void 0 : this);
  };
}
function createInstrumentations(e, t) {
  const s = {
    get(s) {
      const r = this.__v_raw,
        o = toRaw(r),
        a = toRaw(s);
      e || (hasChanged(s, a) && track(o, 0, s), track(o, 0, a));
      const { has: u } = getProto(o),
        d = t ? toShallow : e ? toReadonly : toReactive;
      return u.call(o, s)
        ? d(r.get(s))
        : u.call(o, a)
          ? d(r.get(a))
          : void (r !== o && r.get(s));
    },
    get size() {
      const t = this.__v_raw;
      return !e && track(toRaw(t), 0, xs), Reflect.get(t, 'size', t);
    },
    has(t) {
      const s = this.__v_raw,
        r = toRaw(s),
        o = toRaw(t);
      return (
        e || (hasChanged(t, o) && track(r, 0, t), track(r, 0, o)),
        t === o ? s.has(t) : s.has(t) || s.has(o)
      );
    },
    forEach(s, r) {
      const o = this,
        a = o.__v_raw,
        u = toRaw(a),
        d = t ? toShallow : e ? toReadonly : toReactive;
      return (
        !e && track(u, 0, xs), a.forEach((e, t) => s.call(r, d(e), d(t), o))
      );
    }
  };
  qn(
    s,
    e
      ? {
          add: createReadonlyMethod('add'),
          set: createReadonlyMethod('set'),
          delete: createReadonlyMethod('delete'),
          clear: createReadonlyMethod('clear')
        }
      : {
          add(e) {
            t || isShallow(e) || isReadonly(e) || (e = toRaw(e));
            const s = toRaw(this);
            return (
              getProto(s).has.call(s, e) || (s.add(e), trigger(s, 'add', e, e)),
              this
            );
          },
          set(e, s) {
            t || isShallow(s) || isReadonly(s) || (s = toRaw(s));
            const r = toRaw(this),
              { has: o, get: a } = getProto(r);
            let u = o.call(r, e);
            u || ((e = toRaw(e)), (u = o.call(r, e)));
            const d = a.call(r, e);
            return (
              r.set(e, s),
              u
                ? hasChanged(s, d) && trigger(r, 'set', e, s)
                : trigger(r, 'add', e, s),
              this
            );
          },
          delete(e) {
            const t = toRaw(this),
              { has: s, get: r } = getProto(t);
            let o = s.call(t, e);
            o || ((e = toRaw(e)), (o = s.call(t, e))), r && r.call(t, e);
            const a = t.delete(e);
            return o && trigger(t, 'delete', e, void 0), a;
          },
          clear() {
            const e = toRaw(this),
              t = 0 !== e.size,
              s = e.clear();
            return t && trigger(e, 'clear', void 0, void 0), s;
          }
        }
  );
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      s[r] = (function (e, t, s) {
        return function (...r) {
          const o = this.__v_raw,
            a = toRaw(o),
            u = isMap(a),
            d = 'entries' === e || (e === Symbol.iterator && u),
            h = 'keys' === e && u,
            f = o[e](...r),
            m = s ? toShallow : t ? toReadonly : toReactive;
          return (
            !t && track(a, 0, h ? Rs : xs),
            {
              next() {
                const { value: e, done: t } = f.next();
                return t
                  ? { value: e, done: t }
                  : { value: d ? [m(e[0]), m(e[1])] : m(e), done: t };
              },
              [Symbol.iterator]() {
                return this;
              }
            }
          );
        };
      })(r, e, t);
    }),
    s
  );
}
function createInstrumentationGetter(e, t) {
  const s = createInstrumentations(e, t);
  return (t, r, o) =>
    '__v_isReactive' === r
      ? !e
      : '__v_isReadonly' === r
        ? e
        : '__v_raw' === r
          ? t
          : Reflect.get(hasOwn(s, r) && r in t ? s : t, r, o);
}
const Ns = { get: createInstrumentationGetter(!1, !1) },
  Ls = { get: createInstrumentationGetter(!1, !0) },
  Ds = { get: createInstrumentationGetter(!0, !1) },
  Bs = new WeakMap(),
  Hs = new WeakMap(),
  zs = new WeakMap(),
  Fs = new WeakMap();
function getTargetType(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
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
      })(((e) => toTypeString(e).slice(8, -1))(e));
}
function reactive(e) {
  return isReadonly(e) ? e : createReactiveObject(e, !1, Is, Ns, Bs);
}
function shallowReactive(e) {
  return createReactiveObject(e, !1, Ms, Ls, Hs);
}
function readonly$1(e) {
  return createReactiveObject(e, !0, Ps, Ds, zs);
}
function createReactiveObject(e, t, s, r, o) {
  if (!isObject$3(e)) return e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const a = o.get(e);
  if (a) return a;
  const u = getTargetType(e);
  if (0 === u) return e;
  const d = new Proxy(e, 2 === u ? r : s);
  return o.set(e, d), d;
}
function isReactive(e) {
  return isReadonly(e) ? isReactive(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function isReadonly(e) {
  return !(!e || !e.__v_isReadonly);
}
function isShallow(e) {
  return !(!e || !e.__v_isShallow);
}
function isProxy(e) {
  return !!e && !!e.__v_raw;
}
function toRaw(e) {
  const t = e && e.__v_raw;
  return t ? toRaw(t) : e;
}
function markRaw(e) {
  return (
    !hasOwn(e, '__v_skip') && Object.isExtensible(e) && def(e, '__v_skip', !0),
    e
  );
}
const toReactive = (e) => (isObject$3(e) ? reactive(e) : e),
  toReadonly = (e) => (isObject$3(e) ? readonly$1(e) : e);
function isRef(e) {
  return !!e && !0 === e.__v_isRef;
}
function ref(e) {
  return createRef(e, !1);
}
function shallowRef(e) {
  return createRef(e, !0);
}
function createRef(e, t) {
  return isRef(e) ? e : new RefImpl(e, t);
}
class RefImpl {
  constructor(e, t) {
    (this.dep = new Dep()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = t ? e : toRaw(e)),
      (this._value = t ? e : toReactive(e)),
      (this.__v_isShallow = t);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue,
      s = this.__v_isShallow || isShallow(e) || isReadonly(e);
    (e = s ? e : toRaw(e)),
      hasChanged(e, t) &&
        ((this._rawValue = e),
        (this._value = s ? e : toReactive(e)),
        this.dep.trigger());
  }
}
function unref(e) {
  return isRef(e) ? e.value : e;
}
function toValue(e) {
  return isFunction$3(e) ? e() : unref(e);
}
const $s = {
  get: (e, t, s) => ('__v_raw' === t ? e : unref(Reflect.get(e, t, s))),
  set: (e, t, s, r) => {
    const o = e[t];
    return isRef(o) && !isRef(s)
      ? ((o.value = s), !0)
      : Reflect.set(e, t, s, r);
  }
};
function proxyRefs(e) {
  return isReactive(e) ? e : new Proxy(e, $s);
}
class CustomRefImpl {
  constructor(e) {
    (this.__v_isRef = !0), (this._value = void 0);
    const t = (this.dep = new Dep()),
      { get: s, set: r } = e(t.track.bind(t), t.trigger.bind(t));
    (this._get = s), (this._set = r);
  }
  get value() {
    return (this._value = this._get());
  }
  set value(e) {
    this._set(e);
  }
}
function customRef(e) {
  return new CustomRefImpl(e);
}
function toRefs(e) {
  const t = Wn(e) ? new Array(e.length) : {};
  for (const s in e) t[s] = propertyToRef(e, s);
  return t;
}
class ObjectRefImpl {
  constructor(e, t, s) {
    (this._object = e),
      (this._key = t),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0);
  }
  get value() {
    const e = this._object[this._key];
    return (this._value = void 0 === e ? this._defaultValue : e);
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return (function (e, t) {
      const s = Cs.get(e);
      return s && s.get(t);
    })(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(e) {
    (this._getter = e),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !0),
      (this._value = void 0);
  }
  get value() {
    return (this._value = this._getter());
  }
}
function toRef(e, t, s) {
  return isRef(e)
    ? e
    : isFunction$3(e)
      ? new GetterRefImpl(e)
      : isObject$3(e) && arguments.length > 1
        ? propertyToRef(e, t, s)
        : ref(e);
}
function propertyToRef(e, t, s) {
  const r = e[t];
  return isRef(r) ? r : new ObjectRefImpl(e, t, s);
}
class ComputedRefImpl {
  constructor(e, t, s) {
    (this.fn = e),
      (this.setter = t),
      (this._value = void 0),
      (this.dep = new Dep(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = ks - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !t),
      (this.isSSR = s);
  }
  notify() {
    if (((this.flags |= 16), !(8 & this.flags) && gs !== this))
      return batch(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return (
      refreshComputed(this), e && (e.version = this.dep.version), this._value
    );
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
const Us = {},
  qs = new WeakMap();
let Vs;
function watch$4(e, t, s = $n) {
  const {
      immediate: r,
      deep: o,
      once: a,
      scheduler: u,
      augmentJob: d,
      call: h
    } = s,
    reactiveGetter = (e) =>
      o
        ? e
        : isShallow(e) || !1 === o || 0 === o
          ? traverse(e, 1)
          : traverse(e);
  let f,
    m,
    g,
    v,
    S = !1,
    _ = !1;
  if (
    (isRef(e)
      ? ((m = () => e.value), (S = isShallow(e)))
      : isReactive(e)
        ? ((m = () => reactiveGetter(e)), (S = !0))
        : Wn(e)
          ? ((_ = !0),
            (S = e.some((e) => isReactive(e) || isShallow(e))),
            (m = () =>
              e.map((e) =>
                isRef(e)
                  ? e.value
                  : isReactive(e)
                    ? reactiveGetter(e)
                    : isFunction$3(e)
                      ? h
                        ? h(e, 2)
                        : e()
                      : void 0
              )))
          : (m = isFunction$3(e)
              ? t
                ? h
                  ? () => h(e, 2)
                  : e
                : () => {
                    if (g) {
                      pauseTracking();
                      try {
                        g();
                      } finally {
                        resetTracking();
                      }
                    }
                    const t = Vs;
                    Vs = f;
                    try {
                      return h ? h(e, 3, [v]) : e(v);
                    } finally {
                      Vs = t;
                    }
                  }
              : NOOP),
    t && o)
  ) {
    const e = m,
      t = !0 === o ? 1 / 0 : o;
    m = () => traverse(e(), t);
  }
  const C = getCurrentScope(),
    watchHandle = () => {
      f.stop(), C && C.active && remove(C.effects, f);
    };
  if (a && t) {
    const e = t;
    t = (...t) => {
      e(...t), watchHandle();
    };
  }
  let R = _ ? new Array(e.length).fill(Us) : Us;
  const job = (e) => {
    if (1 & f.flags && (f.dirty || e))
      if (t) {
        const e = f.run();
        if (
          o ||
          S ||
          (_ ? e.some((e, t) => hasChanged(e, R[t])) : hasChanged(e, R))
        ) {
          g && g();
          const s = Vs;
          Vs = f;
          try {
            const s = [e, R === Us ? void 0 : _ && R[0] === Us ? [] : R, v];
            h ? h(t, 3, s) : t(...s), (R = e);
          } finally {
            Vs = s;
          }
        }
      } else f.run();
  };
  return (
    d && d(job),
    (f = new ReactiveEffect(m)),
    (f.scheduler = u ? () => u(job, !1) : job),
    (v = (e) =>
      (function (e, t = !1, s = Vs) {
        if (s) {
          let t = qs.get(s);
          t || qs.set(s, (t = [])), t.push(e);
        }
      })(e, !1, f)),
    (g = f.onStop =
      () => {
        const e = qs.get(f);
        if (e) {
          if (h) h(e, 4);
          else for (const t of e) t();
          qs.delete(f);
        }
      }),
    t ? (r ? job(!0) : (R = f.run())) : u ? u(job.bind(null, !0), !0) : f.run(),
    (watchHandle.pause = f.pause.bind(f)),
    (watchHandle.resume = f.resume.bind(f)),
    (watchHandle.stop = watchHandle),
    watchHandle
  );
}
function traverse(e, t = 1 / 0, s) {
  if (t <= 0 || !isObject$3(e) || e.__v_skip) return e;
  if ((s = s || new Set()).has(e)) return e;
  if ((s.add(e), t--, isRef(e))) traverse(e.value, t, s);
  else if (Wn(e)) for (let r = 0; r < e.length; r++) traverse(e[r], t, s);
  else if (isSet(e) || isMap(e))
    e.forEach((e) => {
      traverse(e, t, s);
    });
  else if (isPlainObject$2(e)) {
    for (const r in e) traverse(e[r], t, s);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && traverse(e[r], t, s);
  }
  return e;
}
function callWithErrorHandling(e, t, s, r) {
  try {
    return r ? e(...r) : e();
  } catch (e) {
    handleError$1(e, t, s);
  }
}
function callWithAsyncErrorHandling(e, t, s, r) {
  if (isFunction$3(e)) {
    const o = callWithErrorHandling(e, t, s, r);
    return (
      o &&
        isPromise(o) &&
        o.catch((e) => {
          handleError$1(e, t, s);
        }),
      o
    );
  }
  if (Wn(e)) {
    const o = [];
    for (let a = 0; a < e.length; a++)
      o.push(callWithAsyncErrorHandling(e[a], t, s, r));
    return o;
  }
}
function handleError$1(e, t, s, r = !0) {
  t && t.vnode;
  const { errorHandler: o, throwUnhandledErrorInProduction: a } =
    (t && t.appContext.config) || $n;
  if (t) {
    let r = t.parent;
    const a = t.proxy,
      u = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; r; ) {
      const t = r.ec;
      if (t)
        for (let s = 0; s < t.length; s++) if (!1 === t[s](e, a, u)) return;
      r = r.parent;
    }
    if (o)
      return (
        pauseTracking(),
        callWithErrorHandling(o, null, 10, [e, a, u]),
        void resetTracking()
      );
  }
  !(function (e, t, s, r = !0, o = !1) {
    if (o) throw e;
    console.error(e);
  })(e, 0, 0, r, a);
}
const Ws = [];
let Ks = -1;
const Qs = [];
let Gs = null,
  Js = 0;
const Ys = Promise.resolve();
let Xs = null;
function nextTick(e) {
  const t = Xs || Ys;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function queueJob(e) {
  if (!(1 & e.flags)) {
    const t = getId(e),
      s = Ws[Ws.length - 1];
    !s || (!(2 & e.flags) && t >= getId(s))
      ? Ws.push(e)
      : Ws.splice(
          (function (e) {
            let t = Ks + 1,
              s = Ws.length;
            for (; t < s; ) {
              const r = (t + s) >>> 1,
                o = Ws[r],
                a = getId(o);
              a < e || (a === e && 2 & o.flags) ? (t = r + 1) : (s = r);
            }
            return t;
          })(t),
          0,
          e
        ),
      (e.flags |= 1),
      queueFlush();
  }
}
function queueFlush() {
  Xs || (Xs = Ys.then(flushJobs));
}
function queuePostFlushCb(e) {
  Wn(e)
    ? Qs.push(...e)
    : Gs && -1 === e.id
      ? Gs.splice(Js + 1, 0, e)
      : 1 & e.flags || (Qs.push(e), (e.flags |= 1)),
    queueFlush();
}
function flushPreFlushCbs(e, t, s = Ks + 1) {
  for (; s < Ws.length; s++) {
    const t = Ws[s];
    if (t && 2 & t.flags) {
      if (e && t.id !== e.uid) continue;
      Ws.splice(s, 1),
        s--,
        4 & t.flags && (t.flags &= -2),
        t(),
        4 & t.flags || (t.flags &= -2);
    }
  }
}
function flushPostFlushCbs(e) {
  if (Qs.length) {
    const e = [...new Set(Qs)].sort((e, t) => getId(e) - getId(t));
    if (((Qs.length = 0), Gs)) return void Gs.push(...e);
    for (Gs = e, Js = 0; Js < Gs.length; Js++) {
      const e = Gs[Js];
      4 & e.flags && (e.flags &= -2), 8 & e.flags || e(), (e.flags &= -2);
    }
    (Gs = null), (Js = 0);
  }
}
const getId = (e) => (null == e.id ? (2 & e.flags ? -1 : 1 / 0) : e.id);
function flushJobs(e) {
  try {
    for (Ks = 0; Ks < Ws.length; Ks++) {
      const e = Ws[Ks];
      !e ||
        8 & e.flags ||
        (4 & e.flags && (e.flags &= -2),
        callWithErrorHandling(e, e.i, e.i ? 15 : 14),
        4 & e.flags || (e.flags &= -2));
    }
  } finally {
    for (; Ks < Ws.length; Ks++) {
      const e = Ws[Ks];
      e && (e.flags &= -2);
    }
    (Ks = -1),
      (Ws.length = 0),
      flushPostFlushCbs(),
      (Xs = null),
      (Ws.length || Qs.length) && flushJobs();
  }
}
let Zs = null,
  er = null;
function setCurrentRenderingInstance(e) {
  const t = Zs;
  return (Zs = e), (er = (e && e.type.__scopeId) || null), t;
}
function withCtx(e, t = Zs, s) {
  if (!t) return e;
  if (e._n) return e;
  const renderFnWithContext = (...s) => {
    renderFnWithContext._d && setBlockTracking(-1);
    const r = setCurrentRenderingInstance(t);
    let o;
    try {
      o = e(...s);
    } finally {
      setCurrentRenderingInstance(r),
        renderFnWithContext._d && setBlockTracking(1);
    }
    return o;
  };
  return (
    (renderFnWithContext._n = !0),
    (renderFnWithContext._c = !0),
    (renderFnWithContext._d = !0),
    renderFnWithContext
  );
}
function withDirectives(e, t) {
  if (null === Zs) return e;
  const s = getComponentPublicInstance(Zs),
    r = e.dirs || (e.dirs = []);
  for (let e = 0; e < t.length; e++) {
    let [o, a, u, d = $n] = t[e];
    o &&
      (isFunction$3(o) && (o = { mounted: o, updated: o }),
      o.deep && traverse(a),
      r.push({
        dir: o,
        instance: s,
        value: a,
        oldValue: void 0,
        arg: u,
        modifiers: d
      }));
  }
  return e;
}
function invokeDirectiveHook(e, t, s, r) {
  const o = e.dirs,
    a = t && t.dirs;
  for (let u = 0; u < o.length; u++) {
    const d = o[u];
    a && (d.oldValue = a[u].value);
    let h = d.dir[r];
    h &&
      (pauseTracking(),
      callWithAsyncErrorHandling(h, s, 8, [e.el, d, e, t]),
      resetTracking());
  }
}
const tr = Symbol('_vte'),
  isTeleportDisabled = (e) => e && (e.disabled || '' === e.disabled),
  isTeleportDeferred = (e) => e && (e.defer || '' === e.defer),
  isTargetSVG = (e) =>
    'undefined' != typeof SVGElement && e instanceof SVGElement,
  isTargetMathML = (e) =>
    'function' == typeof MathMLElement && e instanceof MathMLElement,
  resolveTarget = (e, t) => {
    const s = e && e.to;
    if (isString$1(s)) {
      if (t) {
        return t(s);
      }
      return null;
    }
    return s;
  },
  nr = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, s, r, o, a, u, d, h, f) {
      const {
          mc: m,
          pc: g,
          pbc: v,
          o: { insert: S, querySelector: _, createText: C, createComment: R }
        } = f,
        j = isTeleportDisabled(t.props);
      let { shapeFlag: E, children: T, dynamicChildren: O } = t;
      if (null == e) {
        const e = (t.el = C('')),
          f = (t.anchor = C(''));
        S(e, s, r), S(f, s, r);
        const mount = (e, t) => {
            16 & E &&
              (o && o.isCE && (o.ce._teleportTarget = e),
              m(T, e, t, o, a, u, d, h));
          },
          mountToTarget = () => {
            const e = (t.target = resolveTarget(t.props, _)),
              s = prepareAnchor(e, t, C, S);
            e &&
              ('svg' !== u && isTargetSVG(e)
                ? (u = 'svg')
                : 'mathml' !== u && isTargetMathML(e) && (u = 'mathml'),
              j || (mount(e, s), updateCssVars(t, !1)));
          };
        j && (mount(s, f), updateCssVars(t, !0)),
          isTeleportDeferred(t.props)
            ? queuePostRenderEffect(() => {
                mountToTarget(), (t.el.__isMounted = !0);
              }, a)
            : mountToTarget();
      } else {
        if (isTeleportDeferred(t.props) && !e.el.__isMounted)
          return void queuePostRenderEffect(() => {
            nr.process(e, t, s, r, o, a, u, d, h, f), delete e.el.__isMounted;
          }, a);
        (t.el = e.el), (t.targetStart = e.targetStart);
        const m = (t.anchor = e.anchor),
          S = (t.target = e.target),
          C = (t.targetAnchor = e.targetAnchor),
          R = isTeleportDisabled(e.props),
          E = R ? s : S,
          T = R ? m : C;
        if (
          ('svg' === u || isTargetSVG(S)
            ? (u = 'svg')
            : ('mathml' === u || isTargetMathML(S)) && (u = 'mathml'),
          O
            ? (v(e.dynamicChildren, O, E, o, a, u, d),
              traverseStaticChildren(e, t, !0))
            : h || g(e, t, E, T, o, a, u, d, !1),
          j)
        )
          R
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : moveTeleport(t, s, m, f, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const e = (t.target = resolveTarget(t.props, _));
          e && moveTeleport(t, e, null, f, 0);
        } else R && moveTeleport(t, S, C, f, 1);
        updateCssVars(t, j);
      }
    },
    remove(e, t, s, { um: r, o: { remove: o } }, a) {
      const {
        shapeFlag: u,
        children: d,
        anchor: h,
        targetStart: f,
        targetAnchor: m,
        target: g,
        props: v
      } = e;
      if ((g && (o(f), o(m)), a && o(h), 16 & u)) {
        const e = a || !isTeleportDisabled(v);
        for (let o = 0; o < d.length; o++) {
          const a = d[o];
          r(a, t, s, e, !!a.dynamicChildren);
        }
      }
    },
    move: moveTeleport,
    hydrate: function (
      e,
      t,
      s,
      r,
      o,
      a,
      {
        o: {
          nextSibling: u,
          parentNode: d,
          querySelector: h,
          insert: f,
          createText: m
        }
      },
      g
    ) {
      const v = (t.target = resolveTarget(t.props, h));
      if (v) {
        const h = isTeleportDisabled(t.props),
          S = v._lpa || v.firstChild;
        if (16 & t.shapeFlag)
          if (h)
            (t.anchor = g(u(e), t, d(e), s, r, o, a)),
              (t.targetStart = S),
              (t.targetAnchor = S && u(S));
          else {
            t.anchor = u(e);
            let d = S;
            for (; d; ) {
              if (d && 8 === d.nodeType)
                if ('teleport start anchor' === d.data) t.targetStart = d;
                else if ('teleport anchor' === d.data) {
                  (t.targetAnchor = d),
                    (v._lpa = t.targetAnchor && u(t.targetAnchor));
                  break;
                }
              d = u(d);
            }
            t.targetAnchor || prepareAnchor(v, t, m, f),
              g(S && u(S), t, v, s, r, o, a);
          }
        updateCssVars(t, h);
      }
      return t.anchor && u(t.anchor);
    }
  };
function moveTeleport(e, t, s, { o: { insert: r }, m: o }, a = 2) {
  0 === a && r(e.targetAnchor, t, s);
  const { el: u, anchor: d, shapeFlag: h, children: f, props: m } = e,
    g = 2 === a;
  if ((g && r(u, t, s), (!g || isTeleportDisabled(m)) && 16 & h))
    for (let e = 0; e < f.length; e++) o(f[e], t, s, 2);
  g && r(d, t, s);
}
const sr = nr;
function updateCssVars(e, t) {
  const s = e.ctx;
  if (s && s.ut) {
    let r, o;
    for (
      t
        ? ((r = e.el), (o = e.anchor))
        : ((r = e.targetStart), (o = e.targetAnchor));
      r && r !== o;

    )
      1 === r.nodeType && r.setAttribute('data-v-owner', s.uid),
        (r = r.nextSibling);
    s.ut();
  }
}
function prepareAnchor(e, t, s, r) {
  const o = (t.targetStart = s('')),
    a = (t.targetAnchor = s(''));
  return (o[tr] = a), e && (r(o, e), r(a, e)), a;
}
function setTransitionHooks(e, t) {
  6 & e.shapeFlag && e.component
    ? ((e.transition = t), setTransitionHooks(e.component.subTree, t))
    : 128 & e.shapeFlag
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function defineComponent(e, t) {
  return isFunction$3(e) ? (() => qn({ name: e.name }, t, { setup: e }))() : e;
}
function useId() {
  const e = getCurrentInstance();
  return e
    ? (e.appContext.config.idPrefix || 'v') + '-' + e.ids[0] + e.ids[1]++
    : '';
}
function markAsyncBoundary(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function setRef(e, t, s, r, o = !1) {
  if (Wn(e))
    return void e.forEach((e, a) =>
      setRef(e, t && (Wn(t) ? t[a] : t), s, r, o)
    );
  if (isAsyncWrapper(r) && !o)
    return void (
      512 & r.shapeFlag &&
      r.type.__asyncResolved &&
      r.component.subTree.component &&
      setRef(e, t, s, r.component.subTree)
    );
  const a = 4 & r.shapeFlag ? getComponentPublicInstance(r.component) : r.el,
    u = o ? null : a,
    { i: d, r: h } = e,
    f = t && t.r,
    m = d.refs === $n ? (d.refs = {}) : d.refs,
    g = d.setupState,
    v = toRaw(g),
    S = g === $n ? () => !1 : (e) => hasOwn(v, e);
  if (
    (null != f &&
      f !== h &&
      (isString$1(f)
        ? ((m[f] = null), S(f) && (g[f] = null))
        : isRef(f) && (f.value = null)),
    isFunction$3(h))
  )
    callWithErrorHandling(h, d, 12, [u, m]);
  else {
    const t = isString$1(h),
      r = isRef(h);
    if (t || r) {
      const doSet = () => {
        if (e.f) {
          const s = t ? (S(h) ? g[h] : m[h]) : h.value;
          o
            ? Wn(s) && remove(s, a)
            : Wn(s)
              ? s.includes(a) || s.push(a)
              : t
                ? ((m[h] = [a]), S(h) && (g[h] = m[h]))
                : ((h.value = [a]), e.k && (m[e.k] = h.value));
        } else
          t
            ? ((m[h] = u), S(h) && (g[h] = u))
            : r && ((h.value = u), e.k && (m[e.k] = u));
      };
      u ? ((doSet.id = -1), queuePostRenderEffect(doSet, s)) : doSet();
    }
  }
}
const isComment = (e) => 8 === e.nodeType;
getGlobalThis().requestIdleCallback, getGlobalThis().cancelIdleCallback;
const isAsyncWrapper = (e) => !!e.type.__asyncLoader;
function defineAsyncComponent(e) {
  isFunction$3(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: s,
    errorComponent: r,
    delay: o = 200,
    hydrate: a,
    timeout: u,
    suspensible: d = !0,
    onError: h
  } = e;
  let f,
    m = null,
    g = 0;
  const load = () => {
    let e;
    return (
      m ||
      (e = m =
        t()
          .catch((e) => {
            if (((e = e instanceof Error ? e : new Error(String(e))), h))
              return new Promise((t, s) => {
                h(
                  e,
                  () => t((g++, (m = null), load())),
                  () => s(e),
                  g + 1
                );
              });
            throw e;
          })
          .then((t) =>
            e !== m && m
              ? m
              : (t &&
                  (t.__esModule || 'Module' === t[Symbol.toStringTag]) &&
                  (t = t.default),
                (f = t),
                t)
          ))
    );
  };
  return defineComponent({
    name: 'AsyncComponentWrapper',
    __asyncLoader: load,
    __asyncHydrate(e, t, s) {
      const r = a
        ? () => {
            const r = a(s, (t) =>
              (function (e, t) {
                if (isComment(e) && '[' === e.data) {
                  let s = 1,
                    r = e.nextSibling;
                  for (; r; ) {
                    if (1 === r.nodeType) {
                      if (!1 === t(r)) break;
                    } else if (isComment(r))
                      if (']' === r.data) {
                        if (0 == --s) break;
                      } else '[' === r.data && s++;
                    r = r.nextSibling;
                  }
                } else t(e);
              })(e, t)
            );
            r && (t.bum || (t.bum = [])).push(r);
          }
        : s;
      f ? r() : load().then(() => !t.isUnmounted && r());
    },
    get __asyncResolved() {
      return f;
    },
    setup() {
      const e = Nr;
      if ((markAsyncBoundary(e), f)) return () => createInnerComp(f, e);
      const onError = (t) => {
        (m = null), handleError$1(t, e, 13, !r);
      };
      if ((d && e.suspense) || Br)
        return load()
          .then((t) => () => createInnerComp(t, e))
          .catch(
            (e) => (onError(e), () => (r ? createVNode(r, { error: e }) : null))
          );
      const t = ref(!1),
        a = ref(),
        h = ref(!!o);
      return (
        o &&
          setTimeout(() => {
            h.value = !1;
          }, o),
        null != u &&
          setTimeout(() => {
            if (!t.value && !a.value) {
              const e = new Error(`Async component timed out after ${u}ms.`);
              onError(e), (a.value = e);
            }
          }, u),
        load()
          .then(() => {
            (t.value = !0),
              e.parent && isKeepAlive(e.parent.vnode) && e.parent.update();
          })
          .catch((e) => {
            onError(e), (a.value = e);
          }),
        () =>
          t.value && f
            ? createInnerComp(f, e)
            : a.value && r
              ? createVNode(r, { error: a.value })
              : s && !h.value
                ? createVNode(s)
                : void 0
      );
    }
  });
}
function createInnerComp(e, t) {
  const { ref: s, props: r, children: o, ce: a } = t.vnode,
    u = createVNode(e, r, o);
  return (u.ref = s), (u.ce = a), delete t.vnode.ce, u;
}
const isKeepAlive = (e) => e.type.__isKeepAlive;
function onActivated(e, t) {
  registerKeepAliveHook(e, 'a', t);
}
function onDeactivated(e, t) {
  registerKeepAliveHook(e, 'da', t);
}
function registerKeepAliveHook(e, t, s = Nr) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let t = s;
      for (; t; ) {
        if (t.isDeactivated) return;
        t = t.parent;
      }
      return e();
    });
  if ((injectHook(t, r, s), s)) {
    let e = s.parent;
    for (; e && e.parent; )
      isKeepAlive(e.parent.vnode) && injectToKeepAliveRoot(r, t, s, e),
        (e = e.parent);
  }
}
function injectToKeepAliveRoot(e, t, s, r) {
  const o = injectHook(t, e, r, !0);
  lr(() => {
    remove(r[t], o);
  }, s);
}
function injectHook(e, t, s = Nr, r = !1) {
  if (s) {
    const o = s[e] || (s[e] = []),
      a =
        t.__weh ||
        (t.__weh = (...r) => {
          pauseTracking();
          const o = setCurrentInstance(s),
            a = callWithAsyncErrorHandling(t, s, e, r);
          return o(), resetTracking(), a;
        });
    return r ? o.unshift(a) : o.push(a), a;
  }
}
const createHook =
    (e) =>
    (t, s = Nr) => {
      (Br && 'sp' !== e) || injectHook(e, (...e) => t(...e), s);
    },
  rr = createHook('bm'),
  or = createHook('m'),
  ir = createHook('bu'),
  ar = createHook('u'),
  cr = createHook('bum'),
  lr = createHook('um'),
  ur = createHook('sp'),
  dr = createHook('rtg'),
  hr = createHook('rtc');
function onErrorCaptured(e, t = Nr) {
  injectHook('ec', e, t);
}
const pr = 'components';
function resolveComponent(e, t) {
  return resolveAsset(pr, e, !0, t) || e;
}
const fr = Symbol.for('v-ndc');
function resolveDynamicComponent(e) {
  return isString$1(e) ? resolveAsset(pr, e, !1) || e : e || fr;
}
function resolveAsset(e, t, s = !0, r = !1) {
  const o = Zs || Nr;
  if (o) {
    const s = o.type;
    {
      const e = getComponentName(s, !1);
      if (e && (e === t || e === Jn(t) || e === Zn(Jn(t)))) return s;
    }
    const a = resolve$2(o[e] || s[e], t) || resolve$2(o.appContext[e], t);
    return !a && r ? s : a;
  }
}
function resolve$2(e, t) {
  return e && (e[t] || e[Jn(t)] || e[Zn(Jn(t))]);
}
function renderList(e, t, s, r) {
  let o;
  const a = s,
    u = Wn(e);
  if (u || isString$1(e)) {
    let s = !1;
    u && isReactive(e) && ((s = !isShallow(e)), (e = shallowReadArray(e))),
      (o = new Array(e.length));
    for (let r = 0, u = e.length; r < u; r++)
      o[r] = t(s ? toReactive(e[r]) : e[r], r, void 0, a);
  } else if ('number' == typeof e) {
    o = new Array(e);
    for (let s = 0; s < e; s++) o[s] = t(s + 1, s, void 0, a);
  } else if (isObject$3(e))
    if (e[Symbol.iterator]) o = Array.from(e, (e, s) => t(e, s, void 0, a));
    else {
      const s = Object.keys(e);
      o = new Array(s.length);
      for (let r = 0, u = s.length; r < u; r++) {
        const u = s[r];
        o[r] = t(e[u], u, r, a);
      }
    }
  else o = [];
  return o;
}
function createSlots(e, t) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (Wn(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...e) => {
              const t = r.fn(...e);
              return t && (t.key = r.key), t;
            }
          : r.fn);
  }
  return e;
}
function renderSlot(e, t, s = {}, r, o) {
  if (Zs.ce || (Zs.parent && isAsyncWrapper(Zs.parent) && Zs.parent.ce))
    return (
      'default' !== t && (s.name = t),
      openBlock(),
      createBlock(Rr, null, [createVNode('slot', s, r && r())], 64)
    );
  let a = e[t];
  a && a._c && (a._d = !1), openBlock();
  const u = a && ensureValidVNode(a(s)),
    d = s.key || (u && u.key),
    h = createBlock(
      Rr,
      { key: (d && !isSymbol$1(d) ? d : `_${t}`) + (!u && r ? '_fb' : '') },
      u || (r ? r() : []),
      u && 1 === e._ ? 64 : -2
    );
  return (
    h.scopeId && (h.slotScopeIds = [h.scopeId + '-s']),
    a && a._c && (a._d = !0),
    h
  );
}
function ensureValidVNode(e) {
  return e.some(
    (e) =>
      !isVNode(e) ||
      (e.type !== Er && !(e.type === Rr && !ensureValidVNode(e.children)))
  )
    ? e
    : null;
}
const getPublicInstance = (e) =>
    e
      ? isStatefulComponent(e)
        ? getComponentPublicInstance(e)
        : getPublicInstance(e.parent)
      : null,
  mr = qn(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => getPublicInstance(e.parent),
    $root: (e) => getPublicInstance(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => resolveMergedOptions(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        queueJob(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = nextTick.bind(e.proxy)),
    $watch: (e) => instanceWatch.bind(e)
  }),
  hasSetupBinding = (e, t) => e !== $n && !e.__isScriptSetup && hasOwn(e, t),
  gr = {
    get({ _: e }, t) {
      if ('__v_skip' === t) return !0;
      const {
        ctx: s,
        setupState: r,
        data: o,
        props: a,
        accessCache: u,
        type: d,
        appContext: h
      } = e;
      let f;
      if ('$' !== t[0]) {
        const d = u[t];
        if (void 0 !== d)
          switch (d) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return s[t];
            case 3:
              return a[t];
          }
        else {
          if (hasSetupBinding(r, t)) return (u[t] = 1), r[t];
          if (o !== $n && hasOwn(o, t)) return (u[t] = 2), o[t];
          if ((f = e.propsOptions[0]) && hasOwn(f, t)) return (u[t] = 3), a[t];
          if (s !== $n && hasOwn(s, t)) return (u[t] = 4), s[t];
          yr && (u[t] = 0);
        }
      }
      const m = mr[t];
      let g, v;
      return m
        ? ('$attrs' === t && track(e.attrs, 0, ''), m(e))
        : (g = d.__cssModules) && (g = g[t])
          ? g
          : s !== $n && hasOwn(s, t)
            ? ((u[t] = 4), s[t])
            : ((v = h.config.globalProperties), hasOwn(v, t) ? v[t] : void 0);
    },
    set({ _: e }, t, s) {
      const { data: r, setupState: o, ctx: a } = e;
      return hasSetupBinding(o, t)
        ? ((o[t] = s), !0)
        : r !== $n && hasOwn(r, t)
          ? ((r[t] = s), !0)
          : !hasOwn(e.props, t) &&
            ('$' !== t[0] || !(t.slice(1) in e)) &&
            ((a[t] = s), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: s,
          ctx: r,
          appContext: o,
          propsOptions: a
        }
      },
      u
    ) {
      let d;
      return (
        !!s[u] ||
        (e !== $n && hasOwn(e, u)) ||
        hasSetupBinding(t, u) ||
        ((d = a[0]) && hasOwn(d, u)) ||
        hasOwn(r, u) ||
        hasOwn(mr, u) ||
        hasOwn(o.config.globalProperties, u)
      );
    },
    defineProperty(e, t, s) {
      return (
        null != s.get
          ? (e._.accessCache[t] = 0)
          : hasOwn(s, 'value') && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      );
    }
  };
function useSlots() {
  return getContext$1().slots;
}
function useAttrs() {
  return getContext$1().attrs;
}
function getContext$1() {
  const e = getCurrentInstance();
  return e.setupContext || (e.setupContext = createSetupContext(e));
}
function normalizePropsOrEmits(e) {
  return Wn(e) ? e.reduce((e, t) => ((e[t] = null), e), {}) : e;
}
function mergeModels(e, t) {
  return e && t
    ? Wn(e) && Wn(t)
      ? e.concat(t)
      : qn({}, normalizePropsOrEmits(e), normalizePropsOrEmits(t))
    : e || t;
}
function withAsyncContext(e) {
  const t = getCurrentInstance();
  let s = e();
  return (
    unsetCurrentInstance(),
    isPromise(s) &&
      (s = s.catch((e) => {
        throw (setCurrentInstance(t), e);
      })),
    [s, () => setCurrentInstance(t)]
  );
}
let yr = !0;
function applyOptions(e) {
  const t = resolveMergedOptions(e),
    s = e.proxy,
    r = e.ctx;
  (yr = !1), t.beforeCreate && callHook(t.beforeCreate, e, 'bc');
  const {
    data: o,
    computed: a,
    methods: u,
    watch: d,
    provide: h,
    inject: f,
    created: m,
    beforeMount: g,
    mounted: v,
    beforeUpdate: S,
    updated: _,
    activated: C,
    deactivated: R,
    beforeDestroy: j,
    beforeUnmount: E,
    destroyed: T,
    unmounted: O,
    render: I,
    renderTracked: P,
    renderTriggered: M,
    errorCaptured: N,
    serverPrefetch: L,
    expose: D,
    inheritAttrs: B,
    components: H,
    directives: F,
    filters: $
  } = t;
  if (
    (f &&
      (function (e, t) {
        Wn(e) && (e = normalizeInject(e));
        for (const s in e) {
          const r = e[s];
          let o;
          (o = isObject$3(r)
            ? 'default' in r
              ? inject(r.from || s, r.default, !0)
              : inject(r.from || s)
            : inject(r)),
            isRef(o)
              ? Object.defineProperty(t, s, {
                  enumerable: !0,
                  configurable: !0,
                  get: () => o.value,
                  set: (e) => (o.value = e)
                })
              : (t[s] = o);
        }
      })(f, r, null),
    u)
  )
    for (const e in u) {
      const t = u[e];
      isFunction$3(t) && (r[e] = t.bind(s));
    }
  if (o) {
    const t = o.call(s, s);
    isObject$3(t) && (e.data = reactive(t));
  }
  if (((yr = !0), a))
    for (const e in a) {
      const t = a[e],
        o = isFunction$3(t)
          ? t.bind(s, s)
          : isFunction$3(t.get)
            ? t.get.bind(s, s)
            : NOOP,
        u = !isFunction$3(t) && isFunction$3(t.set) ? t.set.bind(s) : NOOP,
        d = computed({ get: o, set: u });
      Object.defineProperty(r, e, {
        enumerable: !0,
        configurable: !0,
        get: () => d.value,
        set: (e) => (d.value = e)
      });
    }
  if (d) for (const e in d) createWatcher(d[e], r, s, e);
  if (h) {
    const e = isFunction$3(h) ? h.call(s) : h;
    Reflect.ownKeys(e).forEach((t) => {
      provide(t, e[t]);
    });
  }
  function registerLifecycleHook(e, t) {
    Wn(t) ? t.forEach((t) => e(t.bind(s))) : t && e(t.bind(s));
  }
  if (
    (m && callHook(m, e, 'c'),
    registerLifecycleHook(rr, g),
    registerLifecycleHook(or, v),
    registerLifecycleHook(ir, S),
    registerLifecycleHook(ar, _),
    registerLifecycleHook(onActivated, C),
    registerLifecycleHook(onDeactivated, R),
    registerLifecycleHook(onErrorCaptured, N),
    registerLifecycleHook(hr, P),
    registerLifecycleHook(dr, M),
    registerLifecycleHook(cr, E),
    registerLifecycleHook(lr, O),
    registerLifecycleHook(ur, L),
    Wn(D))
  )
    if (D.length) {
      const t = e.exposed || (e.exposed = {});
      D.forEach((e) => {
        Object.defineProperty(t, e, {
          get: () => s[e],
          set: (t) => (s[e] = t)
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === NOOP && (e.render = I),
    null != B && (e.inheritAttrs = B),
    H && (e.components = H),
    F && (e.directives = F),
    L && markAsyncBoundary(e);
}
function callHook(e, t, s) {
  callWithAsyncErrorHandling(
    Wn(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function createWatcher(e, t, s, r) {
  let o = r.includes('.') ? createPathGetter(s, r) : () => s[r];
  if (isString$1(e)) {
    const s = t[e];
    isFunction$3(s) && watch$3(o, s);
  } else if (isFunction$3(e)) watch$3(o, e.bind(s));
  else if (isObject$3(e))
    if (Wn(e)) e.forEach((e) => createWatcher(e, t, s, r));
    else {
      const r = isFunction$3(e.handler) ? e.handler.bind(s) : t[e.handler];
      isFunction$3(r) && watch$3(o, r, e);
    }
}
function resolveMergedOptions(e) {
  const t = e.type,
    { mixins: s, extends: r } = t,
    {
      mixins: o,
      optionsCache: a,
      config: { optionMergeStrategies: u }
    } = e.appContext,
    d = a.get(t);
  let h;
  return (
    d
      ? (h = d)
      : o.length || s || r
        ? ((h = {}),
          o.length && o.forEach((e) => mergeOptions(h, e, u, !0)),
          mergeOptions(h, t, u))
        : (h = t),
    isObject$3(t) && a.set(t, h),
    h
  );
}
function mergeOptions(e, t, s, r = !1) {
  const { mixins: o, extends: a } = t;
  a && mergeOptions(e, a, s, !0),
    o && o.forEach((t) => mergeOptions(e, t, s, !0));
  for (const o in t)
    if (r && 'expose' === o);
    else {
      const r = br[o] || (s && s[o]);
      e[o] = r ? r(e[o], t[o]) : t[o];
    }
  return e;
}
const br = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: function (e, t) {
    if (!e) return t;
    if (!t) return e;
    const s = qn(Object.create(null), e);
    for (const r in t) s[r] = mergeAsArray(e[r], t[r]);
    return s;
  },
  provide: mergeDataFn,
  inject: function (e, t) {
    return mergeObjectOptions(normalizeInject(e), normalizeInject(t));
  }
};
function mergeDataFn(e, t) {
  return t
    ? e
      ? function () {
          return qn(
            isFunction$3(e) ? e.call(this, this) : e,
            isFunction$3(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function normalizeInject(e) {
  if (Wn(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function mergeAsArray(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mergeObjectOptions(e, t) {
  return e ? qn(Object.create(null), e, t) : t;
}
function mergeEmitsOrPropsOptions(e, t) {
  return e
    ? Wn(e) && Wn(t)
      ? [...new Set([...e, ...t])]
      : qn(
          Object.create(null),
          normalizePropsOrEmits(e),
          normalizePropsOrEmits(null != t ? t : {})
        )
    : t;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
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
let vr = 0;
function createAppAPI(e, t) {
  return function (t, s = null) {
    isFunction$3(t) || (t = qn({}, t)),
      null == s || isObject$3(s) || (s = null);
    const r = createAppContext(),
      o = new WeakSet(),
      a = [];
    let u = !1;
    const d = (r.app = {
      _uid: vr++,
      _component: t,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: zr,
      get config() {
        return r.config;
      },
      set config(e) {},
      use: (e, ...t) => (
        o.has(e) ||
          (e && isFunction$3(e.install)
            ? (o.add(e), e.install(d, ...t))
            : isFunction$3(e) && (o.add(e), e(d, ...t))),
        d
      ),
      mixin: (e) => (r.mixins.includes(e) || r.mixins.push(e), d),
      component: (e, t) => (t ? ((r.components[e] = t), d) : r.components[e]),
      directive: (e, t) => (t ? ((r.directives[e] = t), d) : r.directives[e]),
      mount(o, a, h) {
        if (!u) {
          const a = d._ceVNode || createVNode(t, s);
          return (
            (a.appContext = r),
            !0 === h ? (h = 'svg') : !1 === h && (h = void 0),
            e(a, o, h),
            (u = !0),
            (d._container = o),
            (o.__vue_app__ = d),
            getComponentPublicInstance(a.component)
          );
        }
      },
      onUnmount(e) {
        a.push(e);
      },
      unmount() {
        u &&
          (callWithAsyncErrorHandling(a, d._instance, 16),
          e(null, d._container),
          delete d._container.__vue_app__);
      },
      provide: (e, t) => ((r.provides[e] = t), d),
      runWithContext(e) {
        const t = Sr;
        Sr = d;
        try {
          return e();
        } finally {
          Sr = t;
        }
      }
    });
    return d;
  };
}
let Sr = null;
function provide(e, t) {
  if (Nr) {
    let s = Nr.provides;
    const r = Nr.parent && Nr.parent.provides;
    r === s && (s = Nr.provides = Object.create(r)), (s[e] = t);
  } else;
}
function inject(e, t, s = !1) {
  const r = Nr || Zs;
  if (r || Sr) {
    const o = Sr
      ? Sr._context.provides
      : r
        ? null == r.parent
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0;
    if (o && e in o) return o[e];
    if (arguments.length > 1)
      return s && isFunction$3(t) ? t.call(r && r.proxy) : t;
  }
}
function hasInjectionContext() {
  return !!(Nr || Zs || Sr);
}
const _r = {},
  createInternalObject = () => Object.create(_r),
  isInternalObject = (e) => Object.getPrototypeOf(e) === _r;
function setFullProps(e, t, s, r) {
  const [o, a] = e.propsOptions;
  let u,
    d = !1;
  if (t)
    for (let h in t) {
      if (Qn(h)) continue;
      const f = t[h];
      let m;
      o && hasOwn(o, (m = Jn(h)))
        ? a && a.includes(m)
          ? ((u || (u = {}))[m] = f)
          : (s[m] = f)
        : isEmitListener(e.emitsOptions, h) ||
          (h in r && f === r[h]) ||
          ((r[h] = f), (d = !0));
    }
  if (a) {
    const t = toRaw(s),
      r = u || $n;
    for (let u = 0; u < a.length; u++) {
      const d = a[u];
      s[d] = resolvePropValue(o, t, d, r[d], e, !hasOwn(r, d));
    }
  }
  return d;
}
function resolvePropValue(e, t, s, r, o, a) {
  const u = e[s];
  if (null != u) {
    const e = hasOwn(u, 'default');
    if (e && void 0 === r) {
      const e = u.default;
      if (u.type !== Function && !u.skipFactory && isFunction$3(e)) {
        const { propsDefaults: a } = o;
        if (s in a) r = a[s];
        else {
          const u = setCurrentInstance(o);
          (r = a[s] = e.call(null, t)), u();
        }
      } else r = e;
      o.ce && o.ce._setProp(s, r);
    }
    u[0] &&
      (a && !e ? (r = !1) : !u[1] || ('' !== r && r !== Xn(s)) || (r = !0));
  }
  return r;
}
const wr = new WeakMap();
function normalizePropsOptions(e, t, s = !1) {
  const r = s ? wr : t.propsCache,
    o = r.get(e);
  if (o) return o;
  const a = e.props,
    u = {},
    d = [];
  let h = !1;
  if (!isFunction$3(e)) {
    const extendProps = (e) => {
      h = !0;
      const [s, r] = normalizePropsOptions(e, t, !0);
      qn(u, s), r && d.push(...r);
    };
    !s && t.mixins.length && t.mixins.forEach(extendProps),
      e.extends && extendProps(e.extends),
      e.mixins && e.mixins.forEach(extendProps);
  }
  if (!a && !h) return isObject$3(e) && r.set(e, Un), Un;
  if (Wn(a))
    for (let e = 0; e < a.length; e++) {
      const t = Jn(a[e]);
      validatePropName(t) && (u[t] = $n);
    }
  else if (a)
    for (const e in a) {
      const t = Jn(e);
      if (validatePropName(t)) {
        const s = a[e],
          r = (u[t] = Wn(s) || isFunction$3(s) ? { type: s } : qn({}, s)),
          o = r.type;
        let h = !1,
          f = !0;
        if (Wn(o))
          for (let e = 0; e < o.length; ++e) {
            const t = o[e],
              s = isFunction$3(t) && t.name;
            if ('Boolean' === s) {
              h = !0;
              break;
            }
            'String' === s && (f = !1);
          }
        else h = isFunction$3(o) && 'Boolean' === o.name;
        (r[0] = h), (r[1] = f), (h || hasOwn(r, 'default')) && d.push(t);
      }
    }
  const f = [u, d];
  return isObject$3(e) && r.set(e, f), f;
}
function validatePropName(e) {
  return '$' !== e[0] && !Qn(e);
}
const isInternalKey = (e) => '_' === e[0] || '$stable' === e,
  normalizeSlotValue = (e) =>
    Wn(e) ? e.map(normalizeVNode) : [normalizeVNode(e)],
  normalizeSlot = (e, t, s) => {
    if (t._n) return t;
    const r = withCtx((...e) => normalizeSlotValue(t(...e)), s);
    return (r._c = !1), r;
  },
  normalizeObjectSlots = (e, t, s) => {
    const r = e._ctx;
    for (const s in e) {
      if (isInternalKey(s)) continue;
      const o = e[s];
      if (isFunction$3(o)) t[s] = normalizeSlot(0, o, r);
      else if (null != o) {
        const e = normalizeSlotValue(o);
        t[s] = () => e;
      }
    }
  },
  normalizeVNodeSlots = (e, t) => {
    const s = normalizeSlotValue(t);
    e.slots.default = () => s;
  },
  assignSlots = (e, t, s) => {
    for (const r in t) (s || '_' !== r) && (e[r] = t[r]);
  },
  queuePostRenderEffect = function (e, t) {
    t && t.pendingBranch
      ? Wn(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : queuePostFlushCb(e);
  };
function createRenderer(e) {
  return (function (e) {
    getGlobalThis().__VUE__ = !0;
    const {
        insert: t,
        remove: s,
        patchProp: r,
        createElement: o,
        createText: a,
        createComment: u,
        setText: d,
        setElementText: h,
        parentNode: f,
        nextSibling: m,
        setScopeId: g = NOOP,
        insertStaticContent: v
      } = e,
      patch = (
        e,
        t,
        s,
        r = null,
        o = null,
        a = null,
        u = void 0,
        d = null,
        h = !!t.dynamicChildren
      ) => {
        if (e === t) return;
        e &&
          !isSameVNodeType(e, t) &&
          ((r = getNextHostNode(e)), unmount(e, o, a, !0), (e = null)),
          -2 === t.patchFlag && ((h = !1), (t.dynamicChildren = null));
        const { type: f, ref: m, shapeFlag: g } = t;
        switch (f) {
          case jr:
            processText(e, t, s, r);
            break;
          case Er:
            processCommentNode(e, t, s, r);
            break;
          case Ar:
            null == e && mountStaticNode(t, s, r, u);
            break;
          case Rr:
            processFragment(e, t, s, r, o, a, u, d, h);
            break;
          default:
            1 & g
              ? processElement(e, t, s, r, o, a, u, d, h)
              : 6 & g
                ? processComponent(e, t, s, r, o, a, u, d, h)
                : (64 & g || 128 & g) &&
                  f.process(e, t, s, r, o, a, u, d, h, _);
        }
        null != m && o && setRef(m, e && e.ref, a, t || e, !t);
      },
      processText = (e, s, r, o) => {
        if (null == e) t((s.el = a(s.children)), r, o);
        else {
          const t = (s.el = e.el);
          s.children !== e.children && d(t, s.children);
        }
      },
      processCommentNode = (e, s, r, o) => {
        null == e ? t((s.el = u(s.children || '')), r, o) : (s.el = e.el);
      },
      mountStaticNode = (e, t, s, r) => {
        [e.el, e.anchor] = v(e.children, t, s, r, e.el, e.anchor);
      },
      moveStaticNode = ({ el: e, anchor: s }, r, o) => {
        let a;
        for (; e && e !== s; ) (a = m(e)), t(e, r, o), (e = a);
        t(s, r, o);
      },
      removeStaticNode = ({ el: e, anchor: t }) => {
        let r;
        for (; e && e !== t; ) (r = m(e)), s(e), (e = r);
        s(t);
      },
      processElement = (e, t, s, r, o, a, u, d, h) => {
        'svg' === t.type ? (u = 'svg') : 'math' === t.type && (u = 'mathml'),
          null == e
            ? mountElement(t, s, r, o, a, u, d, h)
            : patchElement(e, t, o, a, u, d, h);
      },
      mountElement = (e, s, a, u, d, f, m, g) => {
        let v, S;
        const { props: _, shapeFlag: C, transition: R, dirs: j } = e;
        if (
          ((v = e.el = o(e.type, f, _ && _.is, _)),
          8 & C
            ? h(v, e.children)
            : 16 & C &&
              mountChildren(
                e.children,
                v,
                null,
                u,
                d,
                resolveChildrenNamespace(e, f),
                m,
                g
              ),
          j && invokeDirectiveHook(e, null, u, 'created'),
          setScopeId(v, e, e.scopeId, m, u),
          _)
        ) {
          for (const e in _)
            'value' === e || Qn(e) || r(v, e, null, _[e], f, u);
          'value' in _ && r(v, 'value', null, _.value, f),
            (S = _.onVnodeBeforeMount) && invokeVNodeHook(S, u, e);
        }
        j && invokeDirectiveHook(e, null, u, 'beforeMount');
        const E = (function (e, t) {
          return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
        })(d, R);
        E && R.beforeEnter(v),
          t(v, s, a),
          ((S = _ && _.onVnodeMounted) || E || j) &&
            queuePostRenderEffect(() => {
              S && invokeVNodeHook(S, u, e),
                E && R.enter(v),
                j && invokeDirectiveHook(e, null, u, 'mounted');
            }, d);
      },
      setScopeId = (e, t, s, r, o) => {
        if ((s && g(e, s), r)) for (let t = 0; t < r.length; t++) g(e, r[t]);
        if (o) {
          let s = o.subTree;
          if (
            t === s ||
            (isSuspense(s.type) && (s.ssContent === t || s.ssFallback === t))
          ) {
            const t = o.vnode;
            setScopeId(e, t, t.scopeId, t.slotScopeIds, o.parent);
          }
        }
      },
      mountChildren = (e, t, s, r, o, a, u, d, h = 0) => {
        for (let f = h; f < e.length; f++) {
          const h = (e[f] = d ? cloneIfMounted(e[f]) : normalizeVNode(e[f]));
          patch(null, h, t, s, r, o, a, u, d);
        }
      },
      patchElement = (e, t, s, o, a, u, d) => {
        const f = (t.el = e.el);
        let { patchFlag: m, dynamicChildren: g, dirs: v } = t;
        m |= 16 & e.patchFlag;
        const S = e.props || $n,
          _ = t.props || $n;
        let C;
        if (
          (s && toggleRecurse(s, !1),
          (C = _.onVnodeBeforeUpdate) && invokeVNodeHook(C, s, t, e),
          v && invokeDirectiveHook(t, e, s, 'beforeUpdate'),
          s && toggleRecurse(s, !0),
          ((S.innerHTML && null == _.innerHTML) ||
            (S.textContent && null == _.textContent)) &&
            h(f, ''),
          g
            ? patchBlockChildren(
                e.dynamicChildren,
                g,
                f,
                s,
                o,
                resolveChildrenNamespace(t, a),
                u
              )
            : d ||
              patchChildren(
                e,
                t,
                f,
                null,
                s,
                o,
                resolveChildrenNamespace(t, a),
                u,
                !1
              ),
          m > 0)
        ) {
          if (16 & m) patchProps(f, S, _, s, a);
          else if (
            (2 & m && S.class !== _.class && r(f, 'class', null, _.class, a),
            4 & m && r(f, 'style', S.style, _.style, a),
            8 & m)
          ) {
            const e = t.dynamicProps;
            for (let t = 0; t < e.length; t++) {
              const o = e[t],
                u = S[o],
                d = _[o];
              (d === u && 'value' !== o) || r(f, o, u, d, a, s);
            }
          }
          1 & m && e.children !== t.children && h(f, t.children);
        } else d || null != g || patchProps(f, S, _, s, a);
        ((C = _.onVnodeUpdated) || v) &&
          queuePostRenderEffect(() => {
            C && invokeVNodeHook(C, s, t, e),
              v && invokeDirectiveHook(t, e, s, 'updated');
          }, o);
      },
      patchBlockChildren = (e, t, s, r, o, a, u) => {
        for (let d = 0; d < t.length; d++) {
          const h = e[d],
            m = t[d],
            g =
              h.el &&
              (h.type === Rr || !isSameVNodeType(h, m) || 70 & h.shapeFlag)
                ? f(h.el)
                : s;
          patch(h, m, g, null, r, o, a, u, !0);
        }
      },
      patchProps = (e, t, s, o, a) => {
        if (t !== s) {
          if (t !== $n)
            for (const u in t) Qn(u) || u in s || r(e, u, t[u], null, a, o);
          for (const u in s) {
            if (Qn(u)) continue;
            const d = s[u],
              h = t[u];
            d !== h && 'value' !== u && r(e, u, h, d, a, o);
          }
          'value' in s && r(e, 'value', t.value, s.value, a);
        }
      },
      processFragment = (e, s, r, o, u, d, h, f, m) => {
        const g = (s.el = e ? e.el : a('')),
          v = (s.anchor = e ? e.anchor : a(''));
        let { patchFlag: S, dynamicChildren: _, slotScopeIds: C } = s;
        C && (f = f ? f.concat(C) : C),
          null == e
            ? (t(g, r, o),
              t(v, r, o),
              mountChildren(s.children || [], r, v, u, d, h, f, m))
            : S > 0 && 64 & S && _ && e.dynamicChildren
              ? (patchBlockChildren(e.dynamicChildren, _, r, u, d, h, f),
                (null != s.key || (u && s === u.subTree)) &&
                  traverseStaticChildren(e, s, !0))
              : patchChildren(e, s, r, v, u, d, h, f, m);
      },
      processComponent = (e, t, s, r, o, a, u, d, h) => {
        (t.slotScopeIds = d),
          null == e
            ? 512 & t.shapeFlag
              ? o.ctx.activate(t, s, r, u, h)
              : mountComponent(t, s, r, o, a, u, h)
            : updateComponent(e, t, h);
      },
      mountComponent = (e, t, s, r, o, a, u) => {
        const d = (e.component = createComponentInstance(e, r, o));
        if (
          (isKeepAlive(e) && (d.ctx.renderer = _),
          setupComponent(d, !1, u),
          d.asyncDep)
        ) {
          if ((o && o.registerDep(d, setupRenderEffect, u), !e.el)) {
            const e = (d.subTree = createVNode(Er));
            processCommentNode(null, e, t, s);
          }
        } else setupRenderEffect(d, e, t, s, o, a, u);
      },
      updateComponent = (e, t, s) => {
        const r = (t.component = e.component);
        if (
          (function (e, t, s) {
            const { props: r, children: o, component: a } = e,
              { props: u, children: d, patchFlag: h } = t,
              f = a.emitsOptions;
            if (t.dirs || t.transition) return !0;
            if (!(s && h >= 0))
              return (
                !((!o && !d) || (d && d.$stable)) ||
                (r !== u && (r ? !u || hasPropsChanged(r, u, f) : !!u))
              );
            if (1024 & h) return !0;
            if (16 & h) return r ? hasPropsChanged(r, u, f) : !!u;
            if (8 & h) {
              const e = t.dynamicProps;
              for (let t = 0; t < e.length; t++) {
                const s = e[t];
                if (u[s] !== r[s] && !isEmitListener(f, s)) return !0;
              }
            }
            return !1;
          })(e, t, s)
        ) {
          if (r.asyncDep && !r.asyncResolved)
            return void updateComponentPreRender(r, t, s);
          (r.next = t), r.update();
        } else (t.el = e.el), (r.vnode = t);
      },
      setupRenderEffect = (e, t, s, r, o, a, u) => {
        const componentUpdateFn = () => {
          if (e.isMounted) {
            let { next: t, bu: s, u: r, parent: d, vnode: h } = e;
            {
              const s = locateNonHydratedAsyncRoot(e);
              if (s)
                return (
                  t && ((t.el = h.el), updateComponentPreRender(e, t, u)),
                  void s.asyncDep.then(() => {
                    e.isUnmounted || componentUpdateFn();
                  })
                );
            }
            let m,
              g = t;
            toggleRecurse(e, !1),
              t ? ((t.el = h.el), updateComponentPreRender(e, t, u)) : (t = h),
              s && invokeArrayFns(s),
              (m = t.props && t.props.onVnodeBeforeUpdate) &&
                invokeVNodeHook(m, d, t, h),
              toggleRecurse(e, !0);
            const v = renderComponentRoot(e),
              S = e.subTree;
            (e.subTree = v),
              patch(S, v, f(S.el), getNextHostNode(S), e, o, a),
              (t.el = v.el),
              null === g && updateHOCHostEl(e, v.el),
              r && queuePostRenderEffect(r, o),
              (m = t.props && t.props.onVnodeUpdated) &&
                queuePostRenderEffect(() => invokeVNodeHook(m, d, t, h), o);
          } else {
            let u;
            const { el: d, props: h } = t,
              { bm: f, m: m, parent: g, root: v, type: S } = e,
              _ = isAsyncWrapper(t);
            toggleRecurse(e, !1),
              f && invokeArrayFns(f),
              !_ && (u = h && h.onVnodeBeforeMount) && invokeVNodeHook(u, g, t),
              toggleRecurse(e, !0);
            {
              v.ce && v.ce._injectChildStyle(S);
              const u = (e.subTree = renderComponentRoot(e));
              patch(null, u, s, r, e, o, a), (t.el = u.el);
            }
            if (
              (m && queuePostRenderEffect(m, o),
              !_ && (u = h && h.onVnodeMounted))
            ) {
              const e = t;
              queuePostRenderEffect(() => invokeVNodeHook(u, g, e), o);
            }
            (256 & t.shapeFlag ||
              (g && isAsyncWrapper(g.vnode) && 256 & g.vnode.shapeFlag)) &&
              e.a &&
              queuePostRenderEffect(e.a, o),
              (e.isMounted = !0),
              (t = s = r = null);
          }
        };
        e.scope.on();
        const d = (e.effect = new ReactiveEffect(componentUpdateFn));
        e.scope.off();
        const h = (e.update = d.run.bind(d)),
          m = (e.job = d.runIfDirty.bind(d));
        (m.i = e),
          (m.id = e.uid),
          (d.scheduler = () => queueJob(m)),
          toggleRecurse(e, !0),
          h();
      },
      updateComponentPreRender = (e, t, s) => {
        t.component = e;
        const r = e.vnode.props;
        (e.vnode = t),
          (e.next = null),
          (function (e, t, s, r) {
            const {
                props: o,
                attrs: a,
                vnode: { patchFlag: u }
              } = e,
              d = toRaw(o),
              [h] = e.propsOptions;
            let f = !1;
            if (!(r || u > 0) || 16 & u) {
              let r;
              setFullProps(e, t, o, a) && (f = !0);
              for (const a in d)
                (t && (hasOwn(t, a) || ((r = Xn(a)) !== a && hasOwn(t, r)))) ||
                  (h
                    ? !s ||
                      (void 0 === s[a] && void 0 === s[r]) ||
                      (o[a] = resolvePropValue(h, d, a, void 0, e, !0))
                    : delete o[a]);
              if (a !== d)
                for (const e in a)
                  (t && hasOwn(t, e)) || (delete a[e], (f = !0));
            } else if (8 & u) {
              const s = e.vnode.dynamicProps;
              for (let r = 0; r < s.length; r++) {
                let u = s[r];
                if (isEmitListener(e.emitsOptions, u)) continue;
                const m = t[u];
                if (h)
                  if (hasOwn(a, u)) m !== a[u] && ((a[u] = m), (f = !0));
                  else {
                    const t = Jn(u);
                    o[t] = resolvePropValue(h, d, t, m, e, !1);
                  }
                else m !== a[u] && ((a[u] = m), (f = !0));
              }
            }
            f && trigger(e.attrs, 'set', '');
          })(e, t.props, r, s),
          ((e, t, s) => {
            const { vnode: r, slots: o } = e;
            let a = !0,
              u = $n;
            if (32 & r.shapeFlag) {
              const e = t._;
              e
                ? s && 1 === e
                  ? (a = !1)
                  : assignSlots(o, t, s)
                : ((a = !t.$stable), normalizeObjectSlots(t, o)),
                (u = t);
            } else t && (normalizeVNodeSlots(e, t), (u = { default: 1 }));
            if (a)
              for (const e in o)
                isInternalKey(e) || null != u[e] || delete o[e];
          })(e, t.children, s),
          pauseTracking(),
          flushPreFlushCbs(e),
          resetTracking();
      },
      patchChildren = (e, t, s, r, o, a, u, d, f = !1) => {
        const m = e && e.children,
          g = e ? e.shapeFlag : 0,
          v = t.children,
          { patchFlag: S, shapeFlag: _ } = t;
        if (S > 0) {
          if (128 & S)
            return void patchKeyedChildren(m, v, s, r, o, a, u, d, f);
          if (256 & S)
            return void patchUnkeyedChildren(m, v, s, r, o, a, u, d, f);
        }
        8 & _
          ? (16 & g && unmountChildren(m, o, a), v !== m && h(s, v))
          : 16 & g
            ? 16 & _
              ? patchKeyedChildren(m, v, s, r, o, a, u, d, f)
              : unmountChildren(m, o, a, !0)
            : (8 & g && h(s, ''),
              16 & _ && mountChildren(v, s, r, o, a, u, d, f));
      },
      patchUnkeyedChildren = (e, t, s, r, o, a, u, d, h) => {
        t = t || Un;
        const f = (e = e || Un).length,
          m = t.length,
          g = Math.min(f, m);
        let v;
        for (v = 0; v < g; v++) {
          const r = (t[v] = h ? cloneIfMounted(t[v]) : normalizeVNode(t[v]));
          patch(e[v], r, s, null, o, a, u, d, h);
        }
        f > m
          ? unmountChildren(e, o, a, !0, !1, g)
          : mountChildren(t, s, r, o, a, u, d, h, g);
      },
      patchKeyedChildren = (e, t, s, r, o, a, u, d, h) => {
        let f = 0;
        const m = t.length;
        let g = e.length - 1,
          v = m - 1;
        for (; f <= g && f <= v; ) {
          const r = e[f],
            m = (t[f] = h ? cloneIfMounted(t[f]) : normalizeVNode(t[f]));
          if (!isSameVNodeType(r, m)) break;
          patch(r, m, s, null, o, a, u, d, h), f++;
        }
        for (; f <= g && f <= v; ) {
          const r = e[g],
            f = (t[v] = h ? cloneIfMounted(t[v]) : normalizeVNode(t[v]));
          if (!isSameVNodeType(r, f)) break;
          patch(r, f, s, null, o, a, u, d, h), g--, v--;
        }
        if (f > g) {
          if (f <= v) {
            const e = v + 1,
              g = e < m ? t[e].el : r;
            for (; f <= v; )
              patch(
                null,
                (t[f] = h ? cloneIfMounted(t[f]) : normalizeVNode(t[f])),
                s,
                g,
                o,
                a,
                u,
                d,
                h
              ),
                f++;
          }
        } else if (f > v) for (; f <= g; ) unmount(e[f], o, a, !0), f++;
        else {
          const S = f,
            _ = f,
            C = new Map();
          for (f = _; f <= v; f++) {
            const e = (t[f] = h ? cloneIfMounted(t[f]) : normalizeVNode(t[f]));
            null != e.key && C.set(e.key, f);
          }
          let R,
            j = 0;
          const E = v - _ + 1;
          let T = !1,
            O = 0;
          const I = new Array(E);
          for (f = 0; f < E; f++) I[f] = 0;
          for (f = S; f <= g; f++) {
            const r = e[f];
            if (j >= E) {
              unmount(r, o, a, !0);
              continue;
            }
            let m;
            if (null != r.key) m = C.get(r.key);
            else
              for (R = _; R <= v; R++)
                if (0 === I[R - _] && isSameVNodeType(r, t[R])) {
                  m = R;
                  break;
                }
            void 0 === m
              ? unmount(r, o, a, !0)
              : ((I[m - _] = f + 1),
                m >= O ? (O = m) : (T = !0),
                patch(r, t[m], s, null, o, a, u, d, h),
                j++);
          }
          const P = T
            ? (function (e) {
                const t = e.slice(),
                  s = [0];
                let r, o, a, u, d;
                const h = e.length;
                for (r = 0; r < h; r++) {
                  const h = e[r];
                  if (0 !== h) {
                    if (((o = s[s.length - 1]), e[o] < h)) {
                      (t[r] = o), s.push(r);
                      continue;
                    }
                    for (a = 0, u = s.length - 1; a < u; )
                      (d = (a + u) >> 1), e[s[d]] < h ? (a = d + 1) : (u = d);
                    h < e[s[a]] && (a > 0 && (t[r] = s[a - 1]), (s[a] = r));
                  }
                }
                (a = s.length), (u = s[a - 1]);
                for (; a-- > 0; ) (s[a] = u), (u = t[u]);
                return s;
              })(I)
            : Un;
          for (R = P.length - 1, f = E - 1; f >= 0; f--) {
            const e = _ + f,
              g = t[e],
              v = e + 1 < m ? t[e + 1].el : r;
            0 === I[f]
              ? patch(null, g, s, v, o, a, u, d, h)
              : T && (R < 0 || f !== P[R] ? move(g, s, v, 2) : R--);
          }
        }
      },
      move = (e, s, r, o, a = null) => {
        const { el: u, type: d, transition: h, children: f, shapeFlag: m } = e;
        if (6 & m) return void move(e.component.subTree, s, r, o);
        if (128 & m) return void e.suspense.move(s, r, o);
        if (64 & m) return void d.move(e, s, r, _);
        if (d === Rr) {
          t(u, s, r);
          for (let e = 0; e < f.length; e++) move(f[e], s, r, o);
          return void t(e.anchor, s, r);
        }
        if (d === Ar) return void moveStaticNode(e, s, r);
        if (2 !== o && 1 & m && h)
          if (0 === o)
            h.beforeEnter(u),
              t(u, s, r),
              queuePostRenderEffect(() => h.enter(u), a);
          else {
            const { leave: e, delayLeave: o, afterLeave: a } = h,
              remove2 = () => t(u, s, r),
              performLeave = () => {
                e(u, () => {
                  remove2(), a && a();
                });
              };
            o ? o(u, remove2, performLeave) : performLeave();
          }
        else t(u, s, r);
      },
      unmount = (e, t, s, r = !1, o = !1) => {
        const {
          type: a,
          props: u,
          ref: d,
          children: h,
          dynamicChildren: f,
          shapeFlag: m,
          patchFlag: g,
          dirs: v,
          cacheIndex: S
        } = e;
        if (
          (-2 === g && (o = !1),
          null != d && setRef(d, null, s, e, !0),
          null != S && (t.renderCache[S] = void 0),
          256 & m)
        )
          return void t.ctx.deactivate(e);
        const C = 1 & m && v,
          R = !isAsyncWrapper(e);
        let j;
        if (
          (R && (j = u && u.onVnodeBeforeUnmount) && invokeVNodeHook(j, t, e),
          6 & m)
        )
          unmountComponent(e.component, s, r);
        else {
          if (128 & m) return void e.suspense.unmount(s, r);
          C && invokeDirectiveHook(e, null, t, 'beforeUnmount'),
            64 & m
              ? e.type.remove(e, t, s, _, r)
              : f && !f.hasOnce && (a !== Rr || (g > 0 && 64 & g))
                ? unmountChildren(f, t, s, !1, !0)
                : ((a === Rr && 384 & g) || (!o && 16 & m)) &&
                  unmountChildren(h, t, s),
            r && remove(e);
        }
        ((R && (j = u && u.onVnodeUnmounted)) || C) &&
          queuePostRenderEffect(() => {
            j && invokeVNodeHook(j, t, e),
              C && invokeDirectiveHook(e, null, t, 'unmounted');
          }, s);
      },
      remove = (e) => {
        const { type: t, el: r, anchor: o, transition: a } = e;
        if (t === Rr) return void removeFragment(r, o);
        if (t === Ar) return void removeStaticNode(e);
        const performRemove = () => {
          s(r), a && !a.persisted && a.afterLeave && a.afterLeave();
        };
        if (1 & e.shapeFlag && a && !a.persisted) {
          const { leave: t, delayLeave: s } = a,
            performLeave = () => t(r, performRemove);
          s ? s(e.el, performRemove, performLeave) : performLeave();
        } else performRemove();
      },
      removeFragment = (e, t) => {
        let r;
        for (; e !== t; ) (r = m(e)), s(e), (e = r);
        s(t);
      },
      unmountComponent = (e, t, s) => {
        const { bum: r, scope: o, job: a, subTree: u, um: d, m: h, a: f } = e;
        invalidateMount(h),
          invalidateMount(f),
          r && invokeArrayFns(r),
          o.stop(),
          a && ((a.flags |= 8), unmount(u, e, t, s)),
          d && queuePostRenderEffect(d, t),
          queuePostRenderEffect(() => {
            e.isUnmounted = !0;
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve());
      },
      unmountChildren = (e, t, s, r = !1, o = !1, a = 0) => {
        for (let u = a; u < e.length; u++) unmount(e[u], t, s, r, o);
      },
      getNextHostNode = (e) => {
        if (6 & e.shapeFlag) return getNextHostNode(e.component.subTree);
        if (128 & e.shapeFlag) return e.suspense.next();
        const t = m(e.anchor || e.el),
          s = t && t[tr];
        return s ? m(s) : t;
      };
    let S = !1;
    const render = (e, t, s) => {
        null == e
          ? t._vnode && unmount(t._vnode, null, null, !0)
          : patch(t._vnode || null, e, t, null, null, null, s),
          (t._vnode = e),
          S || ((S = !0), flushPreFlushCbs(), flushPostFlushCbs(), (S = !1));
      },
      _ = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: e
      };
    let C;
    return { render: render, hydrate: C, createApp: createAppAPI(render) };
  })(e);
}
function resolveChildrenNamespace({ type: e, props: t }, s) {
  return ('svg' === s && 'foreignObject' === e) ||
    ('mathml' === s &&
      'annotation-xml' === e &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : s;
}
function toggleRecurse({ effect: e, job: t }, s) {
  s ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function traverseStaticChildren(e, t, s = !1) {
  const r = e.children,
    o = t.children;
  if (Wn(r) && Wn(o))
    for (let e = 0; e < r.length; e++) {
      const t = r[e];
      let a = o[e];
      1 & a.shapeFlag &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || 32 === a.patchFlag) &&
          ((a = o[e] = cloneIfMounted(o[e])), (a.el = t.el)),
        s || -2 === a.patchFlag || traverseStaticChildren(t, a)),
        a.type === jr && (a.el = t.el);
    }
}
function locateNonHydratedAsyncRoot(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : locateNonHydratedAsyncRoot(t);
}
function invalidateMount(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const kr = Symbol.for('v-scx'),
  useSSRContext = () => inject(kr);
function watchEffect(e, t) {
  return doWatch(e, null, t);
}
function watch$3(e, t, s) {
  return doWatch(e, t, s);
}
function doWatch(e, t, s = $n) {
  const { immediate: r, deep: o, flush: a, once: u } = s,
    d = qn({}, s),
    h = (t && r) || (!t && 'post' !== a);
  let f;
  if (Br)
    if ('sync' === a) {
      const e = useSSRContext();
      f = e.__watcherHandles || (e.__watcherHandles = []);
    } else if (!h) {
      const watchStopHandle = () => {};
      return (
        (watchStopHandle.stop = NOOP),
        (watchStopHandle.resume = NOOP),
        (watchStopHandle.pause = NOOP),
        watchStopHandle
      );
    }
  const m = Nr;
  d.call = (e, t, s) => callWithAsyncErrorHandling(e, m, t, s);
  let g = !1;
  'post' === a
    ? (d.scheduler = (e) => {
        queuePostRenderEffect(e, m && m.suspense);
      })
    : 'sync' !== a &&
      ((g = !0),
      (d.scheduler = (e, t) => {
        t ? e() : queueJob(e);
      })),
    (d.augmentJob = (e) => {
      t && (e.flags |= 4),
        g && ((e.flags |= 2), m && ((e.id = m.uid), (e.i = m)));
    });
  const v = watch$4(e, t, d);
  return Br && (f ? f.push(v) : h && v()), v;
}
function instanceWatch(e, t, s) {
  const r = this.proxy,
    o = isString$1(e)
      ? e.includes('.')
        ? createPathGetter(r, e)
        : () => r[e]
      : e.bind(r, r);
  let a;
  isFunction$3(t) ? (a = t) : ((a = t.handler), (s = t));
  const u = setCurrentInstance(this),
    d = doWatch(o, a.bind(r), s);
  return u(), d;
}
function createPathGetter(e, t) {
  const s = t.split('.');
  return () => {
    let t = e;
    for (let e = 0; e < s.length && t; e++) t = t[s[e]];
    return t;
  };
}
function useModel(e, t, s = $n) {
  const r = getCurrentInstance(),
    o = Jn(t),
    a = Xn(t),
    u = getModelModifiers(e, o),
    d = customRef((u, d) => {
      let h,
        f,
        m = $n;
      return (
        doWatch(
          () => {
            const t = e[o];
            hasChanged(h, t) && ((h = t), d());
          },
          null,
          { flush: 'sync' }
        ),
        {
          get: () => (u(), s.get ? s.get(h) : h),
          set(e) {
            const u = s.set ? s.set(e) : e;
            if (!(hasChanged(u, h) || (m !== $n && hasChanged(e, m)))) return;
            const g = r.vnode.props;
            (g &&
              (t in g || o in g || a in g) &&
              (`onUpdate:${t}` in g ||
                `onUpdate:${o}` in g ||
                `onUpdate:${a}` in g)) ||
              ((h = e), d()),
              r.emit(`update:${t}`, u),
              hasChanged(e, u) && hasChanged(e, m) && !hasChanged(u, f) && d(),
              (m = e),
              (f = u);
          }
        }
      );
    });
  return (
    (d[Symbol.iterator] = () => {
      let e = 0;
      return {
        next: () =>
          e < 2 ? { value: e++ ? u || $n : d, done: !1 } : { done: !0 }
      };
    }),
    d
  );
}
const getModelModifiers = (e, t) =>
  'modelValue' === t || 'model-value' === t
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Jn(t)}Modifiers`] || e[`${Xn(t)}Modifiers`];
function emit(e, t, ...s) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || $n;
  let o = s;
  const a = t.startsWith('update:'),
    u = a && getModelModifiers(r, t.slice(7));
  let d;
  u &&
    (u.trim && (o = s.map((e) => (isString$1(e) ? e.trim() : e))),
    u.number && (o = s.map(looseToNumber)));
  let h = r[(d = es(t))] || r[(d = es(Jn(t)))];
  !h && a && (h = r[(d = es(Xn(t)))]),
    h && callWithAsyncErrorHandling(h, e, 6, o);
  const f = r[d + 'Once'];
  if (f) {
    if (e.emitted) {
      if (e.emitted[d]) return;
    } else e.emitted = {};
    (e.emitted[d] = !0), callWithAsyncErrorHandling(f, e, 6, o);
  }
}
function normalizeEmitsOptions(e, t, s = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (void 0 !== o) return o;
  const a = e.emits;
  let u = {},
    d = !1;
  if (!isFunction$3(e)) {
    const extendEmits = (e) => {
      const s = normalizeEmitsOptions(e, t, !0);
      s && ((d = !0), qn(u, s));
    };
    !s && t.mixins.length && t.mixins.forEach(extendEmits),
      e.extends && extendEmits(e.extends),
      e.mixins && e.mixins.forEach(extendEmits);
  }
  return a || d
    ? (Wn(a) ? a.forEach((e) => (u[e] = null)) : qn(u, a),
      isObject$3(e) && r.set(e, u),
      u)
    : (isObject$3(e) && r.set(e, null), null);
}
function isEmitListener(e, t) {
  return (
    !(!e || !isOn(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    hasOwn(e, t[0].toLowerCase() + t.slice(1)) ||
      hasOwn(e, Xn(t)) ||
      hasOwn(e, t))
  );
}
function renderComponentRoot(e) {
  const {
      type: t,
      vnode: s,
      proxy: r,
      withProxy: o,
      propsOptions: [a],
      slots: u,
      attrs: d,
      emit: h,
      render: f,
      renderCache: m,
      props: g,
      data: v,
      setupState: S,
      ctx: _,
      inheritAttrs: C
    } = e,
    R = setCurrentRenderingInstance(e);
  let j, E;
  try {
    if (4 & s.shapeFlag) {
      const e = o || r,
        t = e;
      (j = normalizeVNode(f.call(t, e, m, g, S, v, _))), (E = d);
    } else {
      const e = t;
      0,
        (j = normalizeVNode(
          e.length > 1 ? e(g, { attrs: d, slots: u, emit: h }) : e(g, null)
        )),
        (E = t.props ? d : getFunctionalFallthrough(d));
    }
  } catch (t) {
    (Tr.length = 0), handleError$1(t, e, 1), (j = createVNode(Er));
  }
  let T = j;
  if (E && !1 !== C) {
    const e = Object.keys(E),
      { shapeFlag: t } = T;
    e.length &&
      7 & t &&
      (a && e.some(isModelListener) && (E = filterModelListeners(E, a)),
      (T = cloneVNode(T, E, !1, !0)));
  }
  return (
    s.dirs &&
      ((T = cloneVNode(T, null, !1, !0)),
      (T.dirs = T.dirs ? T.dirs.concat(s.dirs) : s.dirs)),
    s.transition && setTransitionHooks(T, s.transition),
    (j = T),
    setCurrentRenderingInstance(R),
    j
  );
}
const getFunctionalFallthrough = (e) => {
    let t;
    for (const s in e)
      ('class' === s || 'style' === s || isOn(s)) &&
        ((t || (t = {}))[s] = e[s]);
    return t;
  },
  filterModelListeners = (e, t) => {
    const s = {};
    for (const r in e) (isModelListener(r) && r.slice(9) in t) || (s[r] = e[r]);
    return s;
  };
function hasPropsChanged(e, t, s) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    if (t[a] !== e[a] && !isEmitListener(s, a)) return !0;
  }
  return !1;
}
function updateHOCHostEl({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const r = t.subTree;
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r !== e))
      break;
    ((e = t.vnode).el = s), (t = t.parent);
  }
}
const isSuspense = (e) => e.__isSuspense;
let Cr = 0;
const xr = {
  name: 'Suspense',
  __isSuspense: !0,
  process(e, t, s, r, o, a, u, d, h, f) {
    if (null == e)
      !(function (e, t, s, r, o, a, u, d, h) {
        const {
            p: f,
            o: { createElement: m }
          } = h,
          g = m('div'),
          v = (e.suspense = createSuspenseBoundary(
            e,
            o,
            r,
            t,
            g,
            s,
            a,
            u,
            d,
            h
          ));
        f(null, (v.pendingBranch = e.ssContent), g, null, r, v, a, u),
          v.deps > 0
            ? (triggerEvent(e, 'onPending'),
              triggerEvent(e, 'onFallback'),
              f(null, e.ssFallback, t, s, r, null, a, u),
              setActiveBranch(v, e.ssFallback))
            : v.resolve(!1, !0);
      })(t, s, r, o, a, u, d, h, f);
    else {
      if (a && a.deps > 0 && !e.suspense.isInFallback)
        return (
          (t.suspense = e.suspense), (t.suspense.vnode = t), void (t.el = e.el)
        );
      !(function (
        e,
        t,
        s,
        r,
        o,
        a,
        u,
        d,
        { p: h, um: f, o: { createElement: m } }
      ) {
        const g = (t.suspense = e.suspense);
        (g.vnode = t), (t.el = e.el);
        const v = t.ssContent,
          S = t.ssFallback,
          {
            activeBranch: _,
            pendingBranch: C,
            isInFallback: R,
            isHydrating: j
          } = g;
        if (C)
          (g.pendingBranch = v),
            isSameVNodeType(v, C)
              ? (h(C, v, g.hiddenContainer, null, o, g, a, u, d),
                g.deps <= 0
                  ? g.resolve()
                  : R &&
                    (j ||
                      (h(_, S, s, r, o, null, a, u, d), setActiveBranch(g, S))))
              : ((g.pendingId = Cr++),
                j ? ((g.isHydrating = !1), (g.activeBranch = C)) : f(C, o, g),
                (g.deps = 0),
                (g.effects.length = 0),
                (g.hiddenContainer = m('div')),
                R
                  ? (h(null, v, g.hiddenContainer, null, o, g, a, u, d),
                    g.deps <= 0
                      ? g.resolve()
                      : (h(_, S, s, r, o, null, a, u, d),
                        setActiveBranch(g, S)))
                  : _ && isSameVNodeType(v, _)
                    ? (h(_, v, s, r, o, g, a, u, d), g.resolve(!0))
                    : (h(null, v, g.hiddenContainer, null, o, g, a, u, d),
                      g.deps <= 0 && g.resolve()));
        else if (_ && isSameVNodeType(v, _))
          h(_, v, s, r, o, g, a, u, d), setActiveBranch(g, v);
        else if (
          (triggerEvent(t, 'onPending'),
          (g.pendingBranch = v),
          512 & v.shapeFlag
            ? (g.pendingId = v.component.suspenseId)
            : (g.pendingId = Cr++),
          h(null, v, g.hiddenContainer, null, o, g, a, u, d),
          g.deps <= 0)
        )
          g.resolve();
        else {
          const { timeout: e, pendingId: t } = g;
          e > 0
            ? setTimeout(() => {
                g.pendingId === t && g.fallback(S);
              }, e)
            : 0 === e && g.fallback(S);
        }
      })(e, t, s, r, o, u, d, h, f);
    }
  },
  hydrate: function (e, t, s, r, o, a, u, d, h) {
    const f = (t.suspense = createSuspenseBoundary(
        t,
        r,
        s,
        e.parentNode,
        document.createElement('div'),
        null,
        o,
        a,
        u,
        d,
        !0
      )),
      m = h(e, (f.pendingBranch = t.ssContent), s, f, a, u);
    0 === f.deps && f.resolve(!1, !0);
    return m;
  },
  normalize: function (e) {
    const { shapeFlag: t, children: s } = e,
      r = 32 & t;
    (e.ssContent = normalizeSuspenseSlot(r ? s.default : s)),
      (e.ssFallback = r ? normalizeSuspenseSlot(s.fallback) : createVNode(Er));
  }
};
function triggerEvent(e, t) {
  const s = e.props && e.props[t];
  isFunction$3(s) && s();
}
function createSuspenseBoundary(e, t, s, r, o, a, u, d, h, f, m = !1) {
  const {
    p: g,
    m: v,
    um: S,
    n: _,
    o: { parentNode: C, remove: R }
  } = f;
  let j;
  const E = (function (e) {
    const t = e.props && e.props.suspensible;
    return null != t && !1 !== t;
  })(e);
  E && t && t.pendingBranch && ((j = t.pendingId), t.deps++);
  const T = e.props
      ? ((e) => {
          const t = isString$1(e) ? Number(e) : NaN;
          return isNaN(t) ? e : t;
        })(e.props.timeout)
      : void 0,
    O = a,
    I = {
      vnode: e,
      parent: t,
      parentComponent: s,
      namespace: u,
      container: r,
      hiddenContainer: o,
      deps: 0,
      pendingId: Cr++,
      timeout: 'number' == typeof T ? T : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !m,
      isHydrating: m,
      isUnmounted: !1,
      effects: [],
      resolve(e = !1, s = !1) {
        const {
          vnode: r,
          activeBranch: o,
          pendingBranch: u,
          pendingId: d,
          effects: h,
          parentComponent: f,
          container: m
        } = I;
        let g = !1;
        I.isHydrating
          ? (I.isHydrating = !1)
          : e ||
            ((g = o && u.transition && 'out-in' === u.transition.mode),
            g &&
              (o.transition.afterLeave = () => {
                d === I.pendingId &&
                  (v(u, m, a === O ? _(o) : a, 0), queuePostFlushCb(h));
              }),
            o && (C(o.el) === m && (a = _(o)), S(o, f, I, !0)),
            g || v(u, m, a, 0)),
          setActiveBranch(I, u),
          (I.pendingBranch = null),
          (I.isInFallback = !1);
        let R = I.parent,
          T = !1;
        for (; R; ) {
          if (R.pendingBranch) {
            R.effects.push(...h), (T = !0);
            break;
          }
          R = R.parent;
        }
        T || g || queuePostFlushCb(h),
          (I.effects = []),
          E &&
            t &&
            t.pendingBranch &&
            j === t.pendingId &&
            (t.deps--, 0 !== t.deps || s || t.resolve()),
          triggerEvent(r, 'onResolve');
      },
      fallback(e) {
        if (!I.pendingBranch) return;
        const {
          vnode: t,
          activeBranch: s,
          parentComponent: r,
          container: o,
          namespace: a
        } = I;
        triggerEvent(t, 'onFallback');
        const u = _(s),
          mountFallback = () => {
            I.isInFallback &&
              (g(null, e, o, u, r, null, a, d, h), setActiveBranch(I, e));
          },
          f = e.transition && 'out-in' === e.transition.mode;
        f && (s.transition.afterLeave = mountFallback),
          (I.isInFallback = !0),
          S(s, r, null, !0),
          f || mountFallback();
      },
      move(e, t, s) {
        I.activeBranch && v(I.activeBranch, e, t, s), (I.container = e);
      },
      next: () => I.activeBranch && _(I.activeBranch),
      registerDep(e, t, s) {
        const r = !!I.pendingBranch;
        r && I.deps++;
        const o = e.vnode.el;
        e.asyncDep
          .catch((t) => {
            handleError$1(t, e, 0);
          })
          .then((a) => {
            if (e.isUnmounted || I.isUnmounted || I.pendingId !== e.suspenseId)
              return;
            e.asyncResolved = !0;
            const { vnode: d } = e;
            handleSetupResult(e, a), o && (d.el = o);
            const h = !o && e.subTree.el;
            t(e, d, C(o || e.subTree.el), o ? null : _(e.subTree), I, u, s),
              h && R(h),
              updateHOCHostEl(e, d.el),
              r && 0 == --I.deps && I.resolve();
          });
      },
      unmount(e, t) {
        (I.isUnmounted = !0),
          I.activeBranch && S(I.activeBranch, s, e, t),
          I.pendingBranch && S(I.pendingBranch, s, e, t);
      }
    };
  return I;
}
function normalizeSuspenseSlot(e) {
  let t;
  if (isFunction$3(e)) {
    const s = Ir && e._c;
    s && ((e._d = !1), openBlock()),
      (e = e()),
      s && ((e._d = !0), (t = Or), closeBlock());
  }
  if (Wn(e)) {
    const t = (function (e) {
      let t;
      for (let s = 0; s < e.length; s++) {
        const r = e[s];
        if (!isVNode(r)) return;
        if (r.type !== Er || 'v-if' === r.children) {
          if (t) return;
          t = r;
        }
      }
      return t;
    })(e);
    e = t;
  }
  return (
    (e = normalizeVNode(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)),
    e
  );
}
function setActiveBranch(e, t) {
  e.activeBranch = t;
  const { vnode: s, parentComponent: r } = e;
  let o = t.el;
  for (; !o && t.component; ) o = (t = t.component.subTree).el;
  (s.el = o), r && r.subTree === s && ((r.vnode.el = o), updateHOCHostEl(r, o));
}
const Rr = Symbol.for('v-fgt'),
  jr = Symbol.for('v-txt'),
  Er = Symbol.for('v-cmt'),
  Ar = Symbol.for('v-stc'),
  Tr = [];
let Or = null;
function openBlock(e = !1) {
  Tr.push((Or = e ? null : []));
}
function closeBlock() {
  Tr.pop(), (Or = Tr[Tr.length - 1] || null);
}
let Ir = 1;
function setBlockTracking(e, t = !1) {
  (Ir += e), e < 0 && Or && t && (Or.hasOnce = !0);
}
function setupBlock(e) {
  return (
    (e.dynamicChildren = Ir > 0 ? Or || Un : null),
    closeBlock(),
    Ir > 0 && Or && Or.push(e),
    e
  );
}
function createElementBlock(e, t, s, r, o, a) {
  return setupBlock(createBaseVNode(e, t, s, r, o, a, !0));
}
function createBlock(e, t, s, r, o) {
  return setupBlock(createVNode(e, t, s, r, o, !0));
}
function isVNode(e) {
  return !!e && !0 === e.__v_isVNode;
}
function isSameVNodeType(e, t) {
  return e.type === t.type && e.key === t.key;
}
const normalizeKey$3 = ({ key: e }) => (null != e ? e : null),
  normalizeRef = ({ ref: e, ref_key: t, ref_for: s }) => (
    'number' == typeof e && (e = '' + e),
    null != e
      ? isString$1(e) || isRef(e) || isFunction$3(e)
        ? { i: Zs, r: e, k: t, f: !!s }
        : e
      : null
  );
function createBaseVNode(
  e,
  t = null,
  s = null,
  r = 0,
  o = null,
  a = e === Rr ? 0 : 1,
  u = !1,
  d = !1
) {
  const h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && normalizeKey$3(t),
    ref: t && normalizeRef(t),
    scopeId: er,
    slotScopeIds: null,
    children: s,
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
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Zs
  };
  return (
    d
      ? (normalizeChildren(h, s), 128 & a && e.normalize(h))
      : s && (h.shapeFlag |= isString$1(s) ? 8 : 16),
    Ir > 0 &&
      !u &&
      Or &&
      (h.patchFlag > 0 || 6 & a) &&
      32 !== h.patchFlag &&
      Or.push(h),
    h
  );
}
const createVNode = function (e, t = null, s = null, r = 0, o = null, a = !1) {
  (e && e !== fr) || (e = Er);
  if (isVNode(e)) {
    const r = cloneVNode(e, t, !0);
    return (
      s && normalizeChildren(r, s),
      Ir > 0 &&
        !a &&
        Or &&
        (6 & r.shapeFlag ? (Or[Or.indexOf(e)] = r) : Or.push(r)),
      (r.patchFlag = -2),
      r
    );
  }
  (u = e), isFunction$3(u) && '__vccOpts' in u && (e = e.__vccOpts);
  var u;
  if (t) {
    t = guardReactiveProps(t);
    let { class: e, style: s } = t;
    e && !isString$1(e) && (t.class = normalizeClass(e)),
      isObject$3(s) &&
        (isProxy(s) && !Wn(s) && (s = qn({}, s)),
        (t.style = normalizeStyle(s)));
  }
  const d = isString$1(e)
    ? 1
    : isSuspense(e)
      ? 128
      : ((e) => e.__isTeleport)(e)
        ? 64
        : isObject$3(e)
          ? 4
          : isFunction$3(e)
            ? 2
            : 0;
  return createBaseVNode(e, t, s, r, o, d, a, !0);
};
function guardReactiveProps(e) {
  return e ? (isProxy(e) || isInternalObject(e) ? qn({}, e) : e) : null;
}
function cloneVNode(e, t, s = !1, r = !1) {
  const { props: o, ref: a, patchFlag: u, children: d, transition: h } = e,
    f = t ? mergeProps(o || {}, t) : o,
    m = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && normalizeKey$3(f),
      ref:
        t && t.ref
          ? s && a
            ? Wn(a)
              ? a.concat(normalizeRef(t))
              : [a, normalizeRef(t)]
            : normalizeRef(t)
          : a,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: d,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Rr ? (-1 === u ? 16 : 16 | u) : u,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: h,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && cloneVNode(e.ssContent),
      ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
  return h && r && setTransitionHooks(m, h.clone(m)), m;
}
function createTextVNode(e = ' ', t = 0) {
  return createVNode(jr, null, e, t);
}
function createCommentVNode(e = '', t = !1) {
  return t ? (openBlock(), createBlock(Er, null, e)) : createVNode(Er, null, e);
}
function normalizeVNode(e) {
  return null == e || 'boolean' == typeof e
    ? createVNode(Er)
    : Wn(e)
      ? createVNode(Rr, null, e.slice())
      : isVNode(e)
        ? cloneIfMounted(e)
        : createVNode(jr, null, String(e));
}
function cloneIfMounted(e) {
  return (null === e.el && -1 !== e.patchFlag) || e.memo ? e : cloneVNode(e);
}
function normalizeChildren(e, t) {
  let s = 0;
  const { shapeFlag: r } = e;
  if (null == t) t = null;
  else if (Wn(t)) s = 16;
  else if ('object' == typeof t) {
    if (65 & r) {
      const s = t.default;
      return void (
        s &&
        (s._c && (s._d = !1), normalizeChildren(e, s()), s._c && (s._d = !0))
      );
    }
    {
      s = 32;
      const r = t._;
      r || isInternalObject(t)
        ? 3 === r &&
          Zs &&
          (1 === Zs.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = Zs);
    }
  } else
    isFunction$3(t)
      ? ((t = { default: t, _ctx: Zs }), (s = 32))
      : ((t = String(t)),
        64 & r ? ((s = 16), (t = [createTextVNode(t)])) : (s = 8));
  (e.children = t), (e.shapeFlag |= s);
}
function mergeProps(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    for (const e in r)
      if ('class' === e)
        t.class !== r.class && (t.class = normalizeClass([t.class, r.class]));
      else if ('style' === e) t.style = normalizeStyle([t.style, r.style]);
      else if (isOn(e)) {
        const s = t[e],
          o = r[e];
        !o ||
          s === o ||
          (Wn(s) && s.includes(o)) ||
          (t[e] = s ? [].concat(s, o) : o);
      } else '' !== e && (t[e] = r[e]);
  }
  return t;
}
function invokeVNodeHook(e, t, s, r = null) {
  callWithAsyncErrorHandling(e, t, 7, [s, r]);
}
const Pr = createAppContext();
let Mr = 0;
function createComponentInstance(e, t, s) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Pr,
    a = {
      uid: Mr++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new EffectScope(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(r, o),
      emitsOptions: normalizeEmitsOptions(r, o),
      emit: null,
      emitted: null,
      propsDefaults: $n,
      inheritAttrs: r.inheritAttrs,
      ctx: $n,
      data: $n,
      props: $n,
      attrs: $n,
      slots: $n,
      refs: $n,
      setupState: $n,
      setupContext: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
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
    (a.ctx = { _: a }),
    (a.root = t ? t.root : a),
    (a.emit = emit.bind(null, a)),
    e.ce && e.ce(a),
    a
  );
}
let Nr = null;
const getCurrentInstance = () => Nr || Zs;
let Lr, Dr;
{
  const e = getGlobalThis(),
    registerGlobalSetter = (t, s) => {
      let r;
      return (
        (r = e[t]) || (r = e[t] = []),
        r.push(s),
        (e) => {
          r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
        }
      );
    };
  (Lr = registerGlobalSetter('__VUE_INSTANCE_SETTERS__', (e) => (Nr = e))),
    (Dr = registerGlobalSetter('__VUE_SSR_SETTERS__', (e) => (Br = e)));
}
const setCurrentInstance = (e) => {
    const t = Nr;
    return (
      Lr(e),
      e.scope.on(),
      () => {
        e.scope.off(), Lr(t);
      }
    );
  },
  unsetCurrentInstance = () => {
    Nr && Nr.scope.off(), Lr(null);
  };
function isStatefulComponent(e) {
  return 4 & e.vnode.shapeFlag;
}
let Br = !1;
function setupComponent(e, t = !1, s = !1) {
  t && Dr(t);
  const { props: r, children: o } = e.vnode,
    a = isStatefulComponent(e);
  !(function (e, t, s, r = !1) {
    const o = {},
      a = createInternalObject();
    (e.propsDefaults = Object.create(null)), setFullProps(e, t, o, a);
    for (const t in e.propsOptions[0]) t in o || (o[t] = void 0);
    s
      ? (e.props = r ? o : shallowReactive(o))
      : e.type.props
        ? (e.props = o)
        : (e.props = a),
      (e.attrs = a);
  })(e, r, a, t),
    ((e, t, s) => {
      const r = (e.slots = createInternalObject());
      if (32 & e.vnode.shapeFlag) {
        const e = t._;
        e
          ? (assignSlots(r, t, s), s && def(r, '_', e, !0))
          : normalizeObjectSlots(t, r);
      } else t && normalizeVNodeSlots(e, t);
    })(e, o, s);
  const u = a
    ? (function (e, t) {
        const s = e.type;
        (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, gr));
        const { setup: r } = s;
        if (r) {
          pauseTracking();
          const s = (e.setupContext =
              r.length > 1 ? createSetupContext(e) : null),
            o = setCurrentInstance(e),
            a = callWithErrorHandling(r, e, 0, [e.props, s]),
            u = isPromise(a);
          if (
            (resetTracking(),
            o(),
            (!u && !e.sp) || isAsyncWrapper(e) || markAsyncBoundary(e),
            u)
          ) {
            if ((a.then(unsetCurrentInstance, unsetCurrentInstance), t))
              return a
                .then((t) => {
                  handleSetupResult(e, t);
                })
                .catch((t) => {
                  handleError$1(t, e, 0);
                });
            e.asyncDep = a;
          } else handleSetupResult(e, a);
        } else finishComponentSetup(e);
      })(e, t)
    : void 0;
  return t && Dr(!1), u;
}
function handleSetupResult(e, t, s) {
  isFunction$3(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : isObject$3(t) && (e.setupState = proxyRefs(t)),
    finishComponentSetup(e);
}
function finishComponentSetup(e, t, s) {
  const r = e.type;
  e.render || (e.render = r.render || NOOP);
  {
    const t = setCurrentInstance(e);
    pauseTracking();
    try {
      applyOptions(e);
    } finally {
      resetTracking(), t();
    }
  }
}
const Hr = { get: (e, t) => (track(e, 0, ''), e[t]) };
function createSetupContext(e) {
  const expose = (t) => {
    e.exposed = t || {};
  };
  return {
    attrs: new Proxy(e.attrs, Hr),
    slots: e.slots,
    emit: e.emit,
    expose: expose
  };
}
function getComponentPublicInstance(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)), {
          get: (t, s) => (s in t ? t[s] : s in mr ? mr[s](e) : void 0),
          has: (e, t) => t in e || t in mr
        }))
    : e.proxy;
}
function getComponentName(e, t = !0) {
  return isFunction$3(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
const computed = (e, t) => {
  const s = (function (e, t, s = !1) {
    let r, o;
    return (
      isFunction$3(e) ? (r = e) : ((r = e.get), (o = e.set)),
      new ComputedRefImpl(r, o, s)
    );
  })(e, 0, Br);
  return s;
};
function h$1(e, t, s) {
  const r = arguments.length;
  return 2 === r
    ? isObject$3(t) && !Wn(t)
      ? isVNode(t)
        ? createVNode(e, null, [t])
        : createVNode(e, t)
      : createVNode(e, null, t)
    : (r > 3
        ? (s = Array.prototype.slice.call(arguments, 2))
        : 3 === r && isVNode(s) && (s = [s]),
      createVNode(e, t, s));
}
const zr = '3.5.13',
  Fr = {
    createComponentInstance: createComponentInstance,
    setupComponent: setupComponent,
    renderComponentRoot: renderComponentRoot,
    setCurrentRenderingInstance: setCurrentRenderingInstance,
    isVNode: isVNode,
    normalizeVNode: normalizeVNode,
    ensureValidVNode: ensureValidVNode
  },
  $r = 'undefined' != typeof document ? document : null,
  Ur = $r && $r.createElement('template'),
  qr = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, r) => {
      const o =
        'svg' === t
          ? $r.createElementNS('http://www.w3.org/2000/svg', e)
          : 'mathml' === t
            ? $r.createElementNS('http://www.w3.org/1998/Math/MathML', e)
            : s
              ? $r.createElement(e, { is: s })
              : $r.createElement(e);
      return (
        'select' === e &&
          r &&
          null != r.multiple &&
          o.setAttribute('multiple', r.multiple),
        o
      );
    },
    createText: (e) => $r.createTextNode(e),
    createComment: (e) => $r.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => $r.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, s, r, o, a) {
      const u = s ? s.previousSibling : t.lastChild;
      if (o && (o === a || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), s), o !== a && (o = o.nextSibling);

        );
      else {
        Ur.innerHTML =
          'svg' === r
            ? `<svg>${e}</svg>`
            : 'mathml' === r
              ? `<math>${e}</math>`
              : e;
        const o = Ur.content;
        if ('svg' === r || 'mathml' === r) {
          const e = o.firstChild;
          for (; e.firstChild; ) o.appendChild(e.firstChild);
          o.removeChild(e);
        }
        t.insertBefore(o, s);
      }
      return [
        u ? u.nextSibling : t.firstChild,
        s ? s.previousSibling : t.lastChild
      ];
    }
  },
  Vr = Symbol('_vtc');
const Wr = Symbol('_vod'),
  Kr = Symbol('_vsh'),
  Qr = {
    beforeMount(e, { value: t }, { transition: s }) {
      (e[Wr] = 'none' === e.style.display ? '' : e.style.display),
        s && t ? s.beforeEnter(e) : setDisplay(e, t);
    },
    mounted(e, { value: t }, { transition: s }) {
      s && t && s.enter(e);
    },
    updated(e, { value: t, oldValue: s }, { transition: r }) {
      !t != !s &&
        (r
          ? t
            ? (r.beforeEnter(e), setDisplay(e, !0), r.enter(e))
            : r.leave(e, () => {
                setDisplay(e, !1);
              })
          : setDisplay(e, t));
    },
    beforeUnmount(e, { value: t }) {
      setDisplay(e, t);
    }
  };
function setDisplay(e, t) {
  (e.style.display = t ? e[Wr] : 'none'), (e[Kr] = !t);
}
const Gr = Symbol(''),
  Jr = /(^|;)\s*display\s*:/;
const Yr = /\s*!important$/;
function setStyle(e, t, s) {
  if (Wn(s)) s.forEach((s) => setStyle(e, t, s));
  else if ((null == s && (s = ''), t.startsWith('--'))) e.setProperty(t, s);
  else {
    const r = (function (e, t) {
      const s = Zr[t];
      if (s) return s;
      let r = Jn(t);
      if ('filter' !== r && r in e) return (Zr[t] = r);
      r = Zn(r);
      for (let s = 0; s < Xr.length; s++) {
        const o = Xr[s] + r;
        if (o in e) return (Zr[t] = o);
      }
      return t;
    })(e, t);
    Yr.test(s)
      ? e.setProperty(Xn(r), s.replace(Yr, ''), 'important')
      : (e[r] = s);
  }
}
const Xr = ['Webkit', 'Moz', 'ms'],
  Zr = {};
const eo = 'http://www.w3.org/1999/xlink';
function patchAttr(e, t, s, r, o, a = cs(t)) {
  r && t.startsWith('xlink:')
    ? null == s
      ? e.removeAttributeNS(eo, t.slice(6, t.length))
      : e.setAttributeNS(eo, t, s)
    : null == s || (a && !includeBooleanAttr(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, a ? '' : isSymbol$1(s) ? String(s) : s);
}
function patchDOMProp(e, t, s, r, o) {
  if ('innerHTML' === t || 'textContent' === t)
    return void (null != s && (e[t] = s));
  const a = e.tagName;
  if ('value' === t && 'PROGRESS' !== a && !a.includes('-')) {
    const r = 'OPTION' === a ? e.getAttribute('value') || '' : e.value,
      o = null == s ? ('checkbox' === e.type ? 'on' : '') : String(s);
    return (
      (r === o && '_value' in e) || (e.value = o),
      null == s && e.removeAttribute(t),
      void (e._value = s)
    );
  }
  let u = !1;
  if ('' === s || null == s) {
    const r = typeof e[t];
    'boolean' === r
      ? (s = includeBooleanAttr(s))
      : null == s && 'string' === r
        ? ((s = ''), (u = !0))
        : 'number' === r && ((s = 0), (u = !0));
  }
  try {
    e[t] = s;
  } catch (e) {}
  u && e.removeAttribute(o || t);
}
const to = Symbol('_vei');
function patchEvent(e, t, s, r, o = null) {
  const a = e[to] || (e[to] = {}),
    u = a[t];
  if (r && u) u.value = r;
  else {
    const [s, d] = (function (e) {
      let t;
      if (no.test(e)) {
        let s;
        for (t = {}; (s = e.match(no)); )
          (e = e.slice(0, e.length - s[0].length)),
            (t[s[0].toLowerCase()] = !0);
      }
      const s = ':' === e[2] ? e.slice(3) : Xn(e.slice(2));
      return [s, t];
    })(t);
    if (r) {
      const u = (a[t] = (function (e, t) {
        const invoker = (e) => {
          if (e._vts) {
            if (e._vts <= invoker.attached) return;
          } else e._vts = Date.now();
          callWithAsyncErrorHandling(
            (function (e, t) {
              if (Wn(t)) {
                const s = e.stopImmediatePropagation;
                return (
                  (e.stopImmediatePropagation = () => {
                    s.call(e), (e._stopped = !0);
                  }),
                  t.map((e) => (t) => !t._stopped && e && e(t))
                );
              }
              return t;
            })(e, invoker.value),
            t,
            5,
            [e]
          );
        };
        return (invoker.value = e), (invoker.attached = getNow()), invoker;
      })(r, o));
      !(function (e, t, s, r) {
        e.addEventListener(t, s, r);
      })(e, s, u, d);
    } else
      u &&
        (!(function (e, t, s, r) {
          e.removeEventListener(t, s, r);
        })(e, s, u, d),
        (a[t] = void 0));
  }
}
const no = /(?:Once|Passive|Capture)$/;
let so = 0;
const ro = Promise.resolve(),
  getNow = () => so || (ro.then(() => (so = 0)), (so = Date.now()));
const isNativeOn = (e) =>
  111 === e.charCodeAt(0) &&
  110 === e.charCodeAt(1) &&
  e.charCodeAt(2) > 96 &&
  e.charCodeAt(2) < 123;
const oo = ['ctrl', 'shift', 'alt', 'meta'],
  io = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && 0 !== e.button,
    middle: (e) => 'button' in e && 1 !== e.button,
    right: (e) => 'button' in e && 2 !== e.button,
    exact: (e, t) => oo.some((s) => e[`${s}Key`] && !t.includes(s))
  },
  withModifiers = (e, t) => {
    const s = e._withMods || (e._withMods = {}),
      r = t.join('.');
    return (
      s[r] ||
      (s[r] = (s, ...r) => {
        for (let e = 0; e < t.length; e++) {
          const r = io[t[e]];
          if (r && r(s, t)) return;
        }
        return e(s, ...r);
      })
    );
  },
  ao = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace'
  },
  withKeys = (e, t) => {
    const s = e._withKeys || (e._withKeys = {}),
      r = t.join('.');
    return (
      s[r] ||
      (s[r] = (s) => {
        if (!('key' in s)) return;
        const r = Xn(s.key);
        return t.some((e) => e === r || ao[e] === r) ? e(s) : void 0;
      })
    );
  },
  co = qn(
    {
      patchProp: (e, t, s, r, o, a) => {
        const u = 'svg' === o;
        'class' === t
          ? (function (e, t, s) {
              const r = e[Vr];
              r && (t = (t ? [t, ...r] : [...r]).join(' ')),
                null == t
                  ? e.removeAttribute('class')
                  : s
                    ? e.setAttribute('class', t)
                    : (e.className = t);
            })(e, r, u)
          : 'style' === t
            ? (function (e, t, s) {
                const r = e.style,
                  o = isString$1(s);
                let a = !1;
                if (s && !o) {
                  if (t)
                    if (isString$1(t))
                      for (const e of t.split(';')) {
                        const t = e.slice(0, e.indexOf(':')).trim();
                        null == s[t] && setStyle(r, t, '');
                      }
                    else for (const e in t) null == s[e] && setStyle(r, e, '');
                  for (const e in s)
                    'display' === e && (a = !0), setStyle(r, e, s[e]);
                } else if (o) {
                  if (t !== s) {
                    const e = r[Gr];
                    e && (s += ';' + e), (r.cssText = s), (a = Jr.test(s));
                  }
                } else t && e.removeAttribute('style');
                Wr in e &&
                  ((e[Wr] = a ? r.display : ''), e[Kr] && (r.display = 'none'));
              })(e, s, r)
            : isOn(t)
              ? isModelListener(t) || patchEvent(e, t, 0, r, a)
              : (
                    '.' === t[0]
                      ? ((t = t.slice(1)), 1)
                      : '^' === t[0]
                        ? ((t = t.slice(1)), 0)
                        : (function (e, t, s, r) {
                            if (r)
                              return (
                                'innerHTML' === t ||
                                'textContent' === t ||
                                !!(t in e && isNativeOn(t) && isFunction$3(s))
                              );
                            if (
                              'spellcheck' === t ||
                              'draggable' === t ||
                              'translate' === t
                            )
                              return !1;
                            if ('form' === t) return !1;
                            if ('list' === t && 'INPUT' === e.tagName)
                              return !1;
                            if ('type' === t && 'TEXTAREA' === e.tagName)
                              return !1;
                            if ('width' === t || 'height' === t) {
                              const t = e.tagName;
                              if (
                                'IMG' === t ||
                                'VIDEO' === t ||
                                'CANVAS' === t ||
                                'SOURCE' === t
                              )
                                return !1;
                            }
                            if (isNativeOn(t) && isString$1(s)) return !1;
                            return t in e;
                          })(e, t, r, u)
                  )
                ? (patchDOMProp(e, t, r),
                  e.tagName.includes('-') ||
                    ('value' !== t && 'checked' !== t && 'selected' !== t) ||
                    patchAttr(e, t, r, u, 0, 'value' !== t))
                : !e._isVueCE || (!/[A-Z]/.test(t) && isString$1(r))
                  ? ('true-value' === t
                      ? (e._trueValue = r)
                      : 'false-value' === t && (e._falseValue = r),
                    patchAttr(e, t, r, u))
                  : patchDOMProp(e, Jn(t), r, 0, t);
      }
    },
    qr
  );
let lo;
const createApp = (...e) => {
  const t = (lo || (lo = createRenderer(co))).createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = (e) => {
      const r = (function (e) {
        if (isString$1(e)) {
          return document.querySelector(e);
        }
        return e;
      })(e);
      if (!r) return;
      const o = t._component;
      isFunction$3(o) || o.render || o.template || (o.template = r.innerHTML),
        1 === r.nodeType && (r.textContent = '');
      const a = s(
        r,
        !1,
        (function (e) {
          if (e instanceof SVGElement) return 'svg';
          if ('function' == typeof MathMLElement && e instanceof MathMLElement)
            return 'mathml';
        })(r)
      );
      return (
        r instanceof Element &&
          (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
        a
      );
    }),
    t
  );
};
let uo = !1;
const initDirectivesForSSR = () => {
  uo ||
    ((uo = !0),
    (Qr.getSSRProps = ({ value: e }) => {
      if (!e) return { style: { display: 'none' } };
    }));
};
function createSiteConfigStack(e) {
  const t = e?.debug || !1,
    s = [];
  return {
    stack: s,
    push: function (e) {
      if (!e || 'object' != typeof e || 0 === Object.keys(e).length)
        return () => {};
      if (!e._context && t) {
        let t = new Error('tmp').stack?.split('\n')[2].split(' ')[5];
        t?.includes('/') && (t = 'anonymous'), (e._context = t);
      }
      const r = {};
      for (const t in e) {
        const s = e[t];
        void 0 !== s && '' !== s && (r[t] = s);
      }
      let o;
      return (
        Object.keys(r).filter((e) => !e.startsWith('_')).length > 0 &&
          (o = s.push(r)),
        () => {
          void 0 !== o && s.splice(o - 1, 1);
        }
      );
    },
    get: function (e) {
      const t = {};
      e?.debug && (t._context = {}), (t._priority = {});
      for (const r in s.sort((e, t) => (e._priority || 0) - (t._priority || 0)))
        for (const o in s[r]) {
          const a = o,
            u = e?.resolveRefs ? toValue(s[r][o]) : s[r][o];
          o.startsWith('_') ||
            void 0 === u ||
            '' === u ||
            ((t[o] = u),
            void 0 !== s[r]._priority &&
              -1 !== s[r]._priority &&
              (t._priority[a] = s[r]._priority),
            e?.debug &&
              (t._context[a] =
                s[r]._context?.[a] || s[r]._context || 'anonymous'));
        }
      return e?.skipNormalize
        ? t
        : (function (e) {
            void 0 !== e.indexable &&
              (e.indexable = 'false' !== String(e.indexable)),
              void 0 === e.trailingSlash ||
                e.trailingSlash ||
                (e.trailingSlash = 'false' !== String(e.trailingSlash)),
              e.url &&
                !hasProtocol(String(e.url), {
                  acceptRelative: !0,
                  strict: !1
                }) &&
                (e.url = withHttps(String(e.url)));
            const t = Object.keys(e).sort((e, t) => e.localeCompare(t)),
              s = {};
            for (const r of t) s[r] = e[r];
            return s;
          })(t);
    }
  };
}
function envSiteConfig(e) {
  return Object.fromEntries(
    Object.entries(e)
      .filter(
        ([e]) => e.startsWith('NUXT_SITE_') || e.startsWith('NUXT_PUBLIC_SITE_')
      )
      .map(([e, t]) => [
        e
          .replace(/^NUXT_(PUBLIC_)?SITE_/, '')
          .split('_')
          .map((e, t) =>
            0 === t
              ? e.toLowerCase()
              : e[0].toUpperCase() + e.slice(1).toLowerCase()
          )
          .join(''),
        t
      ])
  );
}
const ho = {
    fatal: 0,
    error: 0,
    warn: 1,
    log: 2,
    info: 3,
    success: 3,
    fail: 3,
    debug: 4,
    trace: 5,
    verbose: Number.POSITIVE_INFINITY
  },
  po = {
    silent: { level: -1 },
    fatal: { level: ho.fatal },
    error: { level: ho.error },
    warn: { level: ho.warn },
    log: { level: ho.log },
    info: { level: ho.info },
    success: { level: ho.success },
    fail: { level: ho.fail },
    ready: { level: ho.info },
    start: { level: ho.info },
    box: { level: ho.info },
    debug: { level: ho.debug },
    trace: { level: ho.trace },
    verbose: { level: ho.verbose }
  };
function isPlainObject$1(e) {
  if (null === e || 'object' != typeof e) return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (null === t ||
      t === Object.prototype ||
      null === Object.getPrototypeOf(t)) &&
    !(Symbol.iterator in e) &&
    (!(Symbol.toStringTag in e) ||
      '[object Module]' === Object.prototype.toString.call(e))
  );
}
function _defu(e, t, s = '.', r) {
  if (!isPlainObject$1(t)) return _defu(e, {}, s);
  const o = Object.assign({}, t);
  for (const t in e) {
    if ('__proto__' === t || 'constructor' === t) continue;
    const r = e[t];
    null != r &&
      (Array.isArray(r) && Array.isArray(o[t])
        ? (o[t] = [...r, ...o[t]])
        : isPlainObject$1(r) && isPlainObject$1(o[t])
          ? (o[t] = _defu(r, o[t], (s ? `${s}.` : '') + t.toString()))
          : (o[t] = r));
  }
  return o;
}
const defu = (...e) => e.reduce((e, t) => _defu(e, t, ''), {});
function isLogObj(e) {
  return (
    (t = e),
    '[object Object]' === Object.prototype.toString.call(t) &&
      !(!e.message && !e.args) &&
      !e.stack
  );
  var t;
}
let fo = !1;
const mo = [];
class Consola {
  options;
  _lastLog;
  _mockFn;
  constructor(e = {}) {
    const t = e.types || po;
    this.options = defu(
      {
        ...e,
        defaults: { ...e.defaults },
        level: _normalizeLogLevel(e.level, t),
        reporters: [...(e.reporters || [])]
      },
      {
        types: po,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: { date: !0, colors: !1, compact: !0 }
      }
    );
    for (const e in t) {
      const s = { type: e, ...this.options.defaults, ...t[e] };
      (this[e] = this._wrapLogFn(s)), (this[e].raw = this._wrapLogFn(s, !0));
    }
    this.options.mockFn && this.mockTypes(), (this._lastLog = {});
  }
  get level() {
    return this.options.level;
  }
  set level(e) {
    this.options.level = _normalizeLogLevel(
      e,
      this.options.types,
      this.options.level
    );
  }
  prompt(e, t) {
    if (!this.options.prompt) throw new Error('prompt is not supported!');
    return this.options.prompt(e, t);
  }
  create(e) {
    const t = new Consola({ ...this.options, ...e });
    return this._mockFn && t.mockTypes(this._mockFn), t;
  }
  withDefaults(e) {
    return this.create({
      ...this.options,
      defaults: { ...this.options.defaults, ...e }
    });
  }
  withTag(e) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ':' + e : e
    });
  }
  addReporter(e) {
    return this.options.reporters.push(e), this;
  }
  removeReporter(e) {
    if (e) {
      const t = this.options.reporters.indexOf(e);
      if (-1 !== t) return this.options.reporters.splice(t, 1);
    } else this.options.reporters.splice(0);
    return this;
  }
  setReporters(e) {
    return (this.options.reporters = Array.isArray(e) ? e : [e]), this;
  }
  wrapAll() {
    this.wrapConsole(), this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole(), this.restoreStd();
  }
  wrapConsole() {
    for (const e in this.options.types)
      console['__' + e] || (console['__' + e] = console[e]),
        (console[e] = this[e].raw);
  }
  restoreConsole() {
    for (const e in this.options.types)
      console['__' + e] &&
        ((console[e] = console['__' + e]), delete console['__' + e]);
  }
  wrapStd() {
    this._wrapStream(this.options.stdout, 'log'),
      this._wrapStream(this.options.stderr, 'log');
  }
  _wrapStream(e, t) {
    e &&
      (e.__write || (e.__write = e.write),
      (e.write = (e) => {
        this[t].raw(String(e).trim());
      }));
  }
  restoreStd() {
    this._restoreStream(this.options.stdout),
      this._restoreStream(this.options.stderr);
  }
  _restoreStream(e) {
    e && e.__write && ((e.write = e.__write), delete e.__write);
  }
  pauseLogs() {
    fo = !0;
  }
  resumeLogs() {
    fo = !1;
    const e = mo.splice(0);
    for (const t of e) t[0]._logFn(t[1], t[2]);
  }
  mockTypes(e) {
    const t = e || this.options.mockFn;
    if (((this._mockFn = t), 'function' == typeof t))
      for (const e in this.options.types)
        (this[e] = t(e, this.options.types[e]) || this[e]),
          (this[e].raw = this[e]);
  }
  _wrapLogFn(e, t) {
    return (...s) => {
      if (!fo) return this._logFn(e, s, t);
      mo.push([this, e, s, t]);
    };
  }
  _logFn(e, t, s) {
    if ((e.level || 0) > this.level) return !1;
    const r = {
      date: new Date(),
      args: [],
      ...e,
      level: _normalizeLogLevel(e.level, this.options.types)
    };
    !s && 1 === t.length && isLogObj(t[0])
      ? Object.assign(r, t[0])
      : (r.args = [...t]),
      r.message && (r.args.unshift(r.message), delete r.message),
      r.additional &&
        (Array.isArray(r.additional) ||
          (r.additional = r.additional.split('\n')),
        r.args.push('\n' + r.additional.join('\n')),
        delete r.additional),
      (r.type = 'string' == typeof r.type ? r.type.toLowerCase() : 'log'),
      (r.tag = 'string' == typeof r.tag ? r.tag : '');
    const resolveLog = (e = !1) => {
      const t = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && t > 0) {
        const e = [...this._lastLog.object.args];
        t > 1 && e.push(`(repeated ${t} times)`),
          this._log({ ...this._lastLog.object, args: e }),
          (this._lastLog.count = 1);
      }
      e && ((this._lastLog.object = r), this._log(r));
    };
    clearTimeout(this._lastLog.timeout);
    const o =
      this._lastLog.time && r.date
        ? r.date.getTime() - this._lastLog.time.getTime()
        : 0;
    if (((this._lastLog.time = r.date), o < this.options.throttle))
      try {
        const e = JSON.stringify([r.type, r.tag, r.args]),
          t = this._lastLog.serialized === e;
        if (
          ((this._lastLog.serialized = e),
          t &&
            ((this._lastLog.count = (this._lastLog.count || 0) + 1),
            this._lastLog.count > this.options.throttleMin))
        )
          return void (this._lastLog.timeout = setTimeout(
            resolveLog,
            this.options.throttle
          ));
      } catch {}
    resolveLog(!0);
  }
  _log(e) {
    for (const t of this.options.reporters) t.log(e, { options: this.options });
  }
}
function _normalizeLogLevel(e, t = {}, s = 3) {
  return void 0 === e
    ? s
    : 'number' == typeof e
      ? e
      : t[e] && void 0 !== t[e].level
        ? t[e].level
        : s;
}
(Consola.prototype.add = Consola.prototype.addReporter),
  (Consola.prototype.remove = Consola.prototype.removeReporter),
  (Consola.prototype.clear = Consola.prototype.removeReporter),
  (Consola.prototype.withScope = Consola.prototype.withTag),
  (Consola.prototype.mock = Consola.prototype.mockTypes),
  (Consola.prototype.pause = Consola.prototype.pauseLogs),
  (Consola.prototype.resume = Consola.prototype.resumeLogs);
class BrowserReporter {
  options;
  defaultColor;
  levelColorMap;
  typeColorMap;
  constructor(e) {
    (this.options = { ...e }),
      (this.defaultColor = '#7f8c8d'),
      (this.levelColorMap = { 0: '#c0392b', 1: '#f39c12', 3: '#00BCD4' }),
      (this.typeColorMap = { success: '#2ecc71' });
  }
  _getLogFn(e) {
    return e < 1
      ? console.__error || console.error
      : 1 === e
        ? console.__warn || console.warn
        : console.__log || console.log;
  }
  log(e) {
    const t = this._getLogFn(e.level),
      s = 'log' === e.type ? '' : e.type,
      r = e.tag || '',
      o = `\n      background: ${this.typeColorMap[e.type] || this.levelColorMap[e.level] || this.defaultColor};\n      border-radius: 0.5em;\n      color: white;\n      font-weight: bold;\n      padding: 2px 0.5em;\n    `,
      a = `%c${[r, s].filter(Boolean).join(':')}`;
    'string' == typeof e.args[0]
      ? t(`${a}%c ${e.args[0]}`, o, '', ...e.args.slice(1))
      : t(a, o, ...e.args);
  }
}
function createConsola(e = {}) {
  const t = (function (e = {}) {
    return new Consola(e);
  })({
    reporters: e.reporters || [new BrowserReporter({})],
    prompt: (e, t = {}) =>
      'confirm' === t.type
        ? Promise.resolve(confirm(e))
        : Promise.resolve(prompt(e)),
    ...e
  });
  return t;
}
const go = createConsola();
function useSiteConfig(e, t) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const s = sn(t, useRuntimeConfig(e)['nuxt-site-config'], { debug: !1 });
  return e.context.siteConfig.get(s);
}
const _5xmxSRUNKlgvvS1drpqVxvM3NwBGwGuPOT5LICzLVY0 = async (e) => {
    e.hooks.hook('render:html', async (e, { event: t }) => {
      const s = getRouteRules(t),
        r = I.env.NUXT_COMPONENT_ISLANDS && t.path.startsWith('/__nuxt_island');
      t.path;
      if (t.context.nuxt?.noSSR || (!1 === s.ssr && !r) || !1) {
        const s = Object.fromEntries(
          Object.entries(useSiteConfig(t)).map(([e, t]) => [e, toValue(t)])
        );
        e.body.push(
          `<script>window.__NUXT_SITE_CONFIG__=${devalue(s)}<\/script>`
        );
      }
    });
  },
  yo = createConsola({ defaults: { tag: '@nuxtjs/robots' } });
async function resolveRobotsTxtContext(e, t = useNitroApp()) {
  const { groups: s, sitemap: r } = useRuntimeConfig(e)['nuxt-robots'],
    o = {
      event: e,
      context: e ? 'robots.txt' : 'init',
      ...JSON.parse(JSON.stringify({ groups: s, sitemaps: r }))
    };
  return await t.hooks.callHook('robots:config', o), (t._robots.ctx = o), o;
}
const _WmDwdnT2Qxwqqss7mGk5x_OOT8n9MrM6tVH6PAnlMWg = async (e) => {
  const { isNuxtContentV2: t, robotsDisabledValue: s } =
    useRuntimeConfig()['nuxt-robots'];
  (e._robots = {}), await resolveRobotsTxtContext(void 0, e);
  const r = new Set();
  if (t) {
    let t;
    try {
      t = await (
        await e.localFetch('/__robots__/nuxt-content.json', {})
      ).json();
    } catch (e) {
      yo.error('Failed to read robot rules from content files.', e);
    }
    t &&
      Array.isArray(t) &&
      t.length &&
      t.forEach((e) => r.add(withoutTrailingSlash(e)));
  }
  r.size && (e._robots.nuxtContentUrls = r);
};
function asyncCall(e, ...t) {
  try {
    return (s = e(...t)) && 'function' == typeof s.then
      ? s
      : Promise.resolve(s);
  } catch (e) {
    return Promise.reject(e);
  }
  var s;
}
function stringify$1(e) {
  if (
    (function (e) {
      const t = typeof e;
      return null === e || ('object' !== t && 'function' !== t);
    })(e)
  )
    return String(e);
  if (
    (function (e) {
      const t = Object.getPrototypeOf(e);
      return !t || t.isPrototypeOf(Object);
    })(e) ||
    Array.isArray(e)
  )
    return JSON.stringify(e);
  if ('function' == typeof e.toJSON) return stringify$1(e.toJSON());
  throw new Error('[unstorage] Cannot stringify value!');
}
const bo = 'base64:';
function serializeRaw(e) {
  return 'string' == typeof e
    ? e
    : bo +
        (function (e) {
          if (globalThis.Buffer) return t.from(e).toString('base64');
          return globalThis.btoa(String.fromCodePoint(...e));
        })(e);
}
function deserializeRaw(e) {
  return 'string' != typeof e
    ? e
    : e.startsWith(bo)
      ? (function (e) {
          if (globalThis.Buffer) return t.from(e, 'base64');
          return Uint8Array.from(globalThis.atob(e), (e) => e.codePointAt(0));
        })(e.slice(7))
      : e;
}
const vo = [
  'has',
  'hasItem',
  'get',
  'getItem',
  'getItemRaw',
  'set',
  'setItem',
  'setItemRaw',
  'del',
  'remove',
  'removeItem',
  'getMeta',
  'setMeta',
  'removeMeta',
  'getKeys',
  'clear',
  'mount',
  'unmount'
];
function normalizeKey$2(e) {
  return (
    (e &&
      e
        .split('?')[0]
        ?.replace(/[/\\]/g, ':')
        .replace(/:+/g, ':')
        .replace(/^:|:$/g, '')) ||
    ''
  );
}
function joinKeys$1(...e) {
  return normalizeKey$2(e.join(':'));
}
function normalizeBaseKey(e) {
  return (e = normalizeKey$2(e)) ? e + ':' : '';
}
const memory$1 = () => {
  const e = new Map();
  return {
    name: 'memory',
    getInstance: () => e,
    hasItem: (t) => e.has(t),
    getItem: (t) => e.get(t) ?? null,
    getItemRaw: (t) => e.get(t) ?? null,
    setItem(t, s) {
      e.set(t, s);
    },
    setItemRaw(t, s) {
      e.set(t, s);
    },
    removeItem(t) {
      e.delete(t);
    },
    getKeys: () => [...e.keys()],
    clear() {
      e.clear();
    },
    dispose() {
      e.clear();
    }
  };
};
function createStorage(e = {}) {
  const t = {
      mounts: { '': e.driver || memory$1() },
      mountpoints: [''],
      watching: !1,
      watchListeners: [],
      unwatch: {}
    },
    getMount = (e) => {
      for (const s of t.mountpoints)
        if (e.startsWith(s))
          return {
            base: s,
            relativeKey: e.slice(s.length),
            driver: t.mounts[s]
          };
      return { base: '', relativeKey: e, driver: t.mounts[''] };
    },
    getMounts = (e, s) =>
      t.mountpoints
        .filter((t) => t.startsWith(e) || (s && e.startsWith(t)))
        .map((s) => ({
          relativeBase: e.length > s.length ? e.slice(s.length) : void 0,
          mountpoint: s,
          driver: t.mounts[s]
        })),
    onChange = (e, s) => {
      if (t.watching) {
        s = normalizeKey$2(s);
        for (const r of t.watchListeners) r(e, s);
      }
    },
    stopWatch = async () => {
      if (t.watching) {
        for (const e in t.unwatch) await t.unwatch[e]();
        (t.unwatch = {}), (t.watching = !1);
      }
    },
    runBatch = (e, t, s) => {
      const r = new Map(),
        getBatch = (e) => {
          let t = r.get(e.base);
          return (
            t ||
              ((t = { driver: e.driver, base: e.base, items: [] }),
              r.set(e.base, t)),
            t
          );
        };
      for (const s of e) {
        const e = 'string' == typeof s,
          r = normalizeKey$2(e ? s : s.key),
          o = e ? void 0 : s.value,
          a = e || !s.options ? t : { ...t, ...s.options },
          u = getMount(r);
        getBatch(u).items.push({
          key: r,
          value: o,
          relativeKey: u.relativeKey,
          options: a
        });
      }
      return Promise.all([...r.values()].map((e) => s(e))).then((e) =>
        e.flat()
      );
    },
    s = {
      hasItem(e, t = {}) {
        e = normalizeKey$2(e);
        const { relativeKey: s, driver: r } = getMount(e);
        return asyncCall(r.hasItem, s, t);
      },
      getItem(e, t = {}) {
        e = normalizeKey$2(e);
        const { relativeKey: s, driver: r } = getMount(e);
        return asyncCall(r.getItem, s, t).then((e) => destr(e));
      },
      getItems: (e, t = {}) =>
        runBatch(e, t, (e) =>
          e.driver.getItems
            ? asyncCall(
                e.driver.getItems,
                e.items.map((e) => ({
                  key: e.relativeKey,
                  options: e.options
                })),
                t
              ).then((t) =>
                t.map((t) => ({
                  key: joinKeys$1(e.base, t.key),
                  value: destr(t.value)
                }))
              )
            : Promise.all(
                e.items.map((t) =>
                  asyncCall(e.driver.getItem, t.relativeKey, t.options).then(
                    (e) => ({ key: t.key, value: destr(e) })
                  )
                )
              )
        ),
      getItemRaw(e, t = {}) {
        e = normalizeKey$2(e);
        const { relativeKey: s, driver: r } = getMount(e);
        return r.getItemRaw
          ? asyncCall(r.getItemRaw, s, t)
          : asyncCall(r.getItem, s, t).then((e) => deserializeRaw(e));
      },
      async setItem(e, t, r = {}) {
        if (void 0 === t) return s.removeItem(e);
        e = normalizeKey$2(e);
        const { relativeKey: o, driver: a } = getMount(e);
        a.setItem &&
          (await asyncCall(a.setItem, o, stringify$1(t), r),
          a.watch || onChange('update', e));
      },
      async setItems(e, t) {
        await runBatch(e, t, async (e) => {
          if (e.driver.setItems)
            return asyncCall(
              e.driver.setItems,
              e.items.map((e) => ({
                key: e.relativeKey,
                value: stringify$1(e.value),
                options: e.options
              })),
              t
            );
          e.driver.setItem &&
            (await Promise.all(
              e.items.map((t) =>
                asyncCall(
                  e.driver.setItem,
                  t.relativeKey,
                  stringify$1(t.value),
                  t.options
                )
              )
            ));
        });
      },
      async setItemRaw(e, t, r = {}) {
        if (void 0 === t) return s.removeItem(e, r);
        e = normalizeKey$2(e);
        const { relativeKey: o, driver: a } = getMount(e);
        if (a.setItemRaw) await asyncCall(a.setItemRaw, o, t, r);
        else {
          if (!a.setItem) return;
          await asyncCall(a.setItem, o, serializeRaw(t), r);
        }
        a.watch || onChange('update', e);
      },
      async removeItem(e, t = {}) {
        'boolean' == typeof t && (t = { removeMeta: t }),
          (e = normalizeKey$2(e));
        const { relativeKey: s, driver: r } = getMount(e);
        r.removeItem &&
          (await asyncCall(r.removeItem, s, t),
          (t.removeMeta || t.removeMata) &&
            (await asyncCall(r.removeItem, s + '$', t)),
          r.watch || onChange('remove', e));
      },
      async getMeta(e, t = {}) {
        'boolean' == typeof t && (t = { nativeOnly: t }),
          (e = normalizeKey$2(e));
        const { relativeKey: s, driver: r } = getMount(e),
          o = Object.create(null);
        if (
          (r.getMeta && Object.assign(o, await asyncCall(r.getMeta, s, t)),
          !t.nativeOnly)
        ) {
          const e = await asyncCall(r.getItem, s + '$', t).then((e) =>
            destr(e)
          );
          e &&
            'object' == typeof e &&
            ('string' == typeof e.atime && (e.atime = new Date(e.atime)),
            'string' == typeof e.mtime && (e.mtime = new Date(e.mtime)),
            Object.assign(o, e));
        }
        return o;
      },
      setMeta(e, t, s = {}) {
        return this.setItem(e + '$', t, s);
      },
      removeMeta(e, t = {}) {
        return this.removeItem(e + '$', t);
      },
      async getKeys(e, t = {}) {
        e = normalizeBaseKey(e);
        const s = getMounts(e, !0);
        let r = [];
        const o = [];
        let a = !0;
        for (const e of s) {
          e.driver.flags?.maxDepth || (a = !1);
          const s = await asyncCall(e.driver.getKeys, e.relativeBase, t);
          for (const t of s) {
            const s = e.mountpoint + normalizeKey$2(t);
            r.some((e) => s.startsWith(e)) || o.push(s);
          }
          r = [e.mountpoint, ...r.filter((t) => !t.startsWith(e.mountpoint))];
        }
        const u = void 0 !== t.maxDepth && !a;
        return o.filter(
          (s) =>
            (!u ||
              (function (e, t) {
                if (void 0 === t) return !0;
                let s = 0,
                  r = e.indexOf(':');
                for (; r > -1; ) s++, (r = e.indexOf(':', r + 1));
                return s <= t;
              })(s, t.maxDepth)) &&
            (function (e, t) {
              return t
                ? e.startsWith(t) && '$' !== e[e.length - 1]
                : '$' !== e[e.length - 1];
            })(s, e)
        );
      },
      async clear(e, t = {}) {
        (e = normalizeBaseKey(e)),
          await Promise.all(
            getMounts(e, !1).map(async (e) => {
              if (e.driver.clear)
                return asyncCall(e.driver.clear, e.relativeBase, t);
              if (e.driver.removeItem) {
                const s = await e.driver.getKeys(e.relativeBase || '', t);
                return Promise.all(s.map((s) => e.driver.removeItem(s, t)));
              }
            })
          );
      },
      async dispose() {
        await Promise.all(Object.values(t.mounts).map((e) => dispose(e)));
      },
      watch: async (e) => (
        await (async () => {
          if (!t.watching) {
            t.watching = !0;
            for (const e in t.mounts)
              t.unwatch[e] = await watch$2(t.mounts[e], onChange, e);
          }
        })(),
        t.watchListeners.push(e),
        async () => {
          (t.watchListeners = t.watchListeners.filter((t) => t !== e)),
            0 === t.watchListeners.length && (await stopWatch());
        }
      ),
      async unwatch() {
        (t.watchListeners = []), await stopWatch();
      },
      mount(e, r) {
        if ((e = normalizeBaseKey(e)) && t.mounts[e])
          throw new Error(`already mounted at ${e}`);
        return (
          e &&
            (t.mountpoints.push(e),
            t.mountpoints.sort((e, t) => t.length - e.length)),
          (t.mounts[e] = r),
          t.watching &&
            Promise.resolve(watch$2(r, onChange, e))
              .then((s) => {
                t.unwatch[e] = s;
              })
              .catch(console.error),
          s
        );
      },
      async unmount(e, s = !0) {
        (e = normalizeBaseKey(e)) &&
          t.mounts[e] &&
          (t.watching &&
            e in t.unwatch &&
            (t.unwatch[e]?.(), delete t.unwatch[e]),
          s && (await dispose(t.mounts[e])),
          (t.mountpoints = t.mountpoints.filter((t) => t !== e)),
          delete t.mounts[e]);
      },
      getMount(e = '') {
        e = normalizeKey$2(e) + ':';
        const t = getMount(e);
        return { driver: t.driver, base: t.base };
      },
      getMounts(e = '', t = {}) {
        e = normalizeKey$2(e);
        return getMounts(e, t.parents).map((e) => ({
          driver: e.driver,
          base: e.mountpoint
        }));
      },
      keys: (e, t = {}) => s.getKeys(e, t),
      get: (e, t = {}) => s.getItem(e, t),
      set: (e, t, r = {}) => s.setItem(e, t, r),
      has: (e, t = {}) => s.hasItem(e, t),
      del: (e, t = {}) => s.removeItem(e, t),
      remove: (e, t = {}) => s.removeItem(e, t)
    };
  return s;
}
function watch$2(e, t, s) {
  return e.watch ? e.watch((e, r) => t(e, s + r)) : () => {};
}
async function dispose(e) {
  'function' == typeof e.dispose && (await asyncCall(e.dispose));
}
const So = /([a-zA-Z][a-zA-Z_-]*)\s*(?:=(?:"([^"]*)"|([^ \t",;]*)))?/g,
  _o = 'max-age',
  wo = 's-maxage',
  ko = 'max-stale',
  Co = 'min-fresh',
  xo = 'immutable',
  Ro = 'must-revalidate',
  jo = 'no-cache',
  Eo = 'no-store',
  Ao = 'no-transform',
  To = 'only-if-cached',
  Oo = 'private',
  Io = 'proxy-revalidate',
  Po = 'public',
  Mo = 'stale-while-revalidate',
  No = 'stale-if-error';
function c(e) {
  return null === e;
}
function x(e) {
  if (!e) return null;
  const t = Number.parseInt(e, 10);
  return !Number.isFinite(t) || t < 0 ? null : t;
}
class b {
  constructor() {
    (this.maxAge = void 0),
      (this.sharedMaxAge = void 0),
      (this.maxStale = void 0),
      (this.maxStaleDuration = void 0),
      (this.minFresh = void 0),
      (this.immutable = void 0),
      (this.mustRevalidate = void 0),
      (this.noCache = void 0),
      (this.noStore = void 0),
      (this.noTransform = void 0),
      (this.onlyIfCached = void 0),
      (this.private = void 0),
      (this.proxyRevalidate = void 0),
      (this.public = void 0),
      (this.staleWhileRevalidate = void 0),
      (this.staleIfError = void 0),
      (this.maxAge = null),
      (this.sharedMaxAge = null),
      (this.maxStale = null),
      (this.maxStaleDuration = null),
      (this.minFresh = null),
      (this.immutable = null),
      (this.mustRevalidate = null),
      (this.noCache = null),
      (this.noStore = null),
      (this.noTransform = null),
      (this.onlyIfCached = null),
      (this.private = null),
      (this.proxyRevalidate = null),
      (this.public = null),
      (this.staleWhileRevalidate = null),
      (this.staleIfError = null);
  }
  parse(e) {
    var t;
    if (!e || 0 === e.length) return this;
    const s = {},
      r = null != (t = e.match(So)) ? t : [];
    for (const e of r) {
      const t = e.split('=', 2),
        [r] = t;
      s[r.toLowerCase()] = t.length > 1 ? t[1].trim() : null;
    }
    return (
      (this.maxAge = x(s[_o])),
      (this.sharedMaxAge = x(s[wo])),
      (this.maxStale = c(s[ko])),
      (this.maxStaleDuration = x(s[ko])),
      this.maxStaleDuration && (this.maxStale = !0),
      (this.minFresh = x(s[Co])),
      (this.immutable = c(s[xo])),
      (this.mustRevalidate = c(s[Ro])),
      (this.noCache = c(s[jo])),
      (this.noStore = c(s[Eo])),
      (this.noTransform = c(s[Ao])),
      (this.onlyIfCached = c(s[To])),
      (this.private = c(s[Oo])),
      (this.proxyRevalidate = c(s[Io])),
      (this.public = c(s[Po])),
      (this.staleWhileRevalidate = x(s[Mo])),
      (this.staleIfError = x(s[No])),
      this
    );
  }
  format() {
    const e = [];
    return (
      'number' == typeof this.maxAge && e.push(`${_o}=${this.maxAge}`),
      'number' == typeof this.sharedMaxAge &&
        e.push(`${wo}=${this.sharedMaxAge}`),
      this.maxStale &&
        e.push(
          'number' == typeof this.maxStaleDuration
            ? `${ko}=${this.maxStaleDuration}`
            : ko
        ),
      'number' == typeof this.minFresh && e.push(`${Co}=${this.minFresh}`),
      this.immutable && e.push(xo),
      this.mustRevalidate && e.push(Ro),
      this.noCache && e.push(jo),
      this.noStore && e.push(Eo),
      this.noTransform && e.push(Ao),
      this.onlyIfCached && e.push(To),
      this.private && e.push(Oo),
      this.proxyRevalidate && e.push(Io),
      this.public && e.push(Po),
      'number' == typeof this.staleWhileRevalidate &&
        e.push(`${Mo}=${this.staleWhileRevalidate}`),
      'number' == typeof this.staleIfError &&
        e.push(`${No}=${this.staleIfError}`),
      e.join(', ')
    );
  }
}
function hasProp(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
class H3Error extends Error {
  static __h3_error__ = !0;
  statusCode = 500;
  fatal = !1;
  unhandled = !1;
  statusMessage;
  data;
  cause;
  constructor(e, t = {}) {
    super(e, t), t.cause && !this.cause && (this.cause = t.cause);
  }
  toJSON() {
    const e = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    return (
      this.statusMessage &&
        (e.statusMessage = sanitizeStatusMessage(this.statusMessage)),
      void 0 !== this.data && (e.data = this.data),
      e
    );
  }
}
function createError(e) {
  if ('string' == typeof e) return new H3Error(e);
  if (
    (function (e) {
      return !0 === e?.constructor?.__h3_error__;
    })(e)
  )
    return e;
  const t = new H3Error(e.message ?? e.statusMessage ?? '', {
    cause: e.cause || e
  });
  if (hasProp(e, 'stack'))
    try {
      Object.defineProperty(t, 'stack', { get: () => e.stack });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = sanitizeStatusCode(e.statusCode, t.statusCode))
      : e.status && (t.statusCode = sanitizeStatusCode(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const e = t.statusMessage;
    sanitizeStatusMessage(t.statusMessage) !== e &&
      console.warn(
        '[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.'
      );
  }
  return (
    void 0 !== e.fatal && (t.fatal = e.fatal),
    void 0 !== e.unhandled && (t.unhandled = e.unhandled),
    t
  );
}
function process(e, s) {
  const r = {},
    o = s.find((e) => 'content-disposition' === e[0])?.[1] || '';
  for (const e of o.split(';')) {
    const s = e.split('=');
    if (2 !== s.length) continue;
    const o = (s[0] || '').trim();
    if ('name' === o || 'filename' === o) {
      const e = (s[1] || '').trim().replace(/"/g, '');
      r[o] = t.from(e, 'latin1').toString('utf8');
    }
  }
  const a = s.find((e) => 'content-type' === e[0])?.[1] || '';
  return a && (r.type = a), (r.data = t.from(e)), r;
}
function getQuery(e) {
  return getQuery$2(e.path || '');
}
function getRouterParams(e, t = {}) {
  let s = e.context.params || {};
  if (t.decode) {
    s = { ...s };
    for (const e in s) s[e] = decode(s[e]);
  }
  return s;
}
function getRouterParam(e, t, s = {}) {
  return getRouterParams(e, s)[t];
}
function getRequestHeaders(e) {
  const t = {};
  for (const s in e.node.req.headers) {
    const r = e.node.req.headers[s];
    t[s] = Array.isArray(r) ? r.filter(Boolean).join(', ') : r;
  }
  return t;
}
function getRequestHeader(e, t) {
  return getRequestHeaders(e)[t.toLowerCase()];
}
const Lo = getRequestHeader;
function getRequestHost(e, t = {}) {
  if (t.xForwardedHost) {
    const t = e.node.req.headers['x-forwarded-host'];
    if (t) return t;
  }
  return e.node.req.headers.host || 'localhost';
}
function getRequestProtocol(e, t = {}) {
  return (!1 !== t.xForwardedProto &&
    'https' === e.node.req.headers['x-forwarded-proto']) ||
    e.node.req.connection?.encrypted
    ? 'https'
    : 'http';
}
const Do = Symbol.for('h3RawBody'),
  Bo = Symbol.for('h3ParsedBody'),
  Ho = ['PATCH', 'POST', 'PUT', 'DELETE'];
function readRawBody(e, s = 'utf8') {
  !(function (e, t) {
    if (
      !(function (e, t) {
        if ('string' == typeof t) {
          if (e.method === t) return !0;
        } else if (t.includes(e.method)) return !0;
        return !1;
      })(e, t)
    )
      throw createError({
        statusCode: 405,
        statusMessage: 'HTTP method is not allowed.'
      });
  })(e, Ho);
  const r =
    e._requestBody ||
    e.web?.request?.body ||
    e.node.req[Do] ||
    e.node.req.rawBody ||
    e.node.req.body;
  if (r) {
    const e = Promise.resolve(r).then((e) =>
      t.isBuffer(e)
        ? e
        : 'function' == typeof e.pipeTo
          ? new Promise((s, r) => {
              const o = [];
              e.pipeTo(
                new WritableStream({
                  write(e) {
                    o.push(e);
                  },
                  close() {
                    s(t.concat(o));
                  },
                  abort(e) {
                    r(e);
                  }
                })
              ).catch(r);
            })
          : 'function' == typeof e.pipe
            ? new Promise((s, r) => {
                const o = [];
                e.on('data', (e) => {
                  o.push(e);
                })
                  .on('end', () => {
                    s(t.concat(o));
                  })
                  .on('error', r);
              })
            : e.constructor === Object
              ? t.from(JSON.stringify(e))
              : e instanceof URLSearchParams
                ? t.from(e.toString())
                : t.from(e)
    );
    return s ? e.then((e) => e.toString(s)) : e;
  }
  if (
    !Number.parseInt(e.node.req.headers['content-length'] || '') &&
    !String(e.node.req.headers['transfer-encoding'] ?? '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
      .includes('chunked')
  )
    return Promise.resolve(void 0);
  const o = (e.node.req[Do] = new Promise((s, r) => {
    const o = [];
    e.node.req
      .on('error', (e) => {
        r(e);
      })
      .on('data', (e) => {
        o.push(e);
      })
      .on('end', () => {
        s(t.concat(o));
      });
  }));
  return s ? o.then((e) => e.toString(s)) : o;
}
async function readBody(e, t = {}) {
  const s = e.node.req;
  if (hasProp(s, Bo)) return s[Bo];
  const r = s.headers['content-type'] || '',
    o = await readRawBody(e);
  let a;
  return (
    (a =
      'application/json' === r
        ? _parseJSON(o, t.strict ?? !0)
        : r.startsWith('application/x-www-form-urlencoded')
          ? (function (e) {
              const t = new URLSearchParams(e),
                s = Object.create(null);
              for (const [e, r] of t.entries())
                hasProp(s, e)
                  ? (Array.isArray(s[e]) || (s[e] = [s[e]]), s[e].push(r))
                  : (s[e] = r);
              return s;
            })(o)
          : r.startsWith('text/')
            ? o
            : _parseJSON(o, t.strict ?? !1)),
    (s[Bo] = a),
    a
  );
}
async function readMultipartFormData(e) {
  const t = getRequestHeader(e, 'content-type');
  if (!t || !t.startsWith('multipart/form-data')) return;
  const s = t.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!s) return;
  const r = await readRawBody(e, !1);
  return r
    ? (function (e, t) {
        let s = '',
          r = 0,
          o = [];
        const a = [];
        let u = [];
        for (let d = 0; d < e.length; d++) {
          const h = d > 0 ? e[d - 1] : null,
            f = e[d];
          10 === f || 13 === f || (s += String.fromCodePoint(f));
          const m = 10 === f && 13 === h;
          if (0 === r && m) '--' + t === s && (r = 1), (s = '');
          else if (1 === r && m) {
            if (s.length > 0) {
              const e = s.indexOf(':');
              if (e > 0) {
                const t = s.slice(0, e).toLowerCase(),
                  r = s.slice(e + 1).trim();
                u.push([t, r]);
              }
            } else (r = 2), (o = []);
            s = '';
          } else if (2 === r) {
            if ((s.length > t.length + 4 && (s = ''), '--' + t === s)) {
              const e = o.length - s.length,
                t = o.slice(0, e - 1);
              a.push(process(t, u)), (o = []), (u = []), (s = ''), (r = 3);
            } else o.push(f);
            m && (s = '');
          } else 3 === r && m && (r = 1);
        }
        return a;
      })(r, s)
    : void 0;
}
function _parseJSON(e = '', t) {
  if (e)
    try {
      return destr(e, { strict: t });
    } catch {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid JSON body'
      });
    }
}
const zo = 'text/html',
  Fo = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(e = '') {
  return e.replace(Fo, '');
}
function sanitizeStatusCode(e, t = 200) {
  return e
    ? ('string' == typeof e && (e = Number.parseInt(e, 10)),
      e < 100 || e > 999 ? t : e)
    : t;
}
const $o = void 0 === h ? (e) => e() : h;
function sendRedirect(e, t, s = 302) {
  (e.node.res.statusCode = sanitizeStatusCode(s, e.node.res.statusCode)),
    e.node.res.setHeader('location', t);
  return (function (e, t, s) {
    return (
      (function (e, t) {
        304 === e.node.res.statusCode ||
          e.node.res.getHeader('content-type') ||
          e.node.res.setHeader('content-type', t);
      })(e, s),
      new Promise((s) => {
        $o(() => {
          e.handled || e.node.res.end(t), s();
        });
      })
    );
  })(
    e,
    `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t.replace(/"/g, '%22')}"></head></html>`,
    zo
  );
}
function setResponseHeaders(e, t) {
  for (const [s, r] of Object.entries(t)) e.node.res.setHeader(s, r);
}
function setResponseHeader(e, t, s) {
  e.node.res.setHeader(t, s);
}
const Uo = setResponseHeader;
const appendHeaders = function (e, t) {
  for (const [s, r] of Object.entries(t)) appendResponseHeader(e, s, r);
};
function appendResponseHeader(e, t, s) {
  let r = e.node.res.getHeader(t);
  r
    ? (Array.isArray(r) || (r = [r.toString()]),
      e.node.res.setHeader(t, [...r, s]))
    : e.node.res.setHeader(t, s);
}
function removeResponseHeader(e, t) {
  return e.node.res.removeHeader(t);
}
function createOriginHeaders(e, t) {
  const { origin: s } = t,
    r = getRequestHeader(e, 'origin');
  return r && s && '*' !== s
    ? 'string' == typeof s
      ? { 'access-control-allow-origin': s, vary: 'origin' }
      : (function (e, t) {
            const { origin: s } = t;
            return (
              !e ||
              !s ||
              '*' === s ||
              'null' === s ||
              (Array.isArray(s)
                ? s.some((t) => (t instanceof RegExp ? t.test(e) : e === t))
                : s(e))
            );
          })(r, t)
        ? { 'access-control-allow-origin': r, vary: 'origin' }
        : {}
    : { 'access-control-allow-origin': '*' };
}
function createCredentialsHeaders(e) {
  const { credentials: t } = e;
  return t ? { 'access-control-allow-credentials': 'true' } : {};
}
function createExposeHeaders(e) {
  const { exposeHeaders: t } = e;
  return t
    ? '*' === t
      ? { 'access-control-expose-headers': t }
      : { 'access-control-expose-headers': t.join(',') }
    : {};
}
function appendCorsPreflightHeaders(e, t) {
  appendHeaders(e, createOriginHeaders(e, t)),
    appendHeaders(e, createCredentialsHeaders(t)),
    appendHeaders(e, createExposeHeaders(t)),
    appendHeaders(
      e,
      (function (e) {
        const { methods: t } = e;
        return t
          ? '*' === t
            ? { 'access-control-allow-methods': '*' }
            : t.length > 0
              ? { 'access-control-allow-methods': t.join(',') }
              : {}
          : {};
      })(t)
    ),
    appendHeaders(
      e,
      (function (e, t) {
        const { allowHeaders: s } = t;
        if (!s || '*' === s || 0 === s.length) {
          const t = getRequestHeader(e, 'access-control-request-headers');
          return t
            ? {
                'access-control-allow-headers': t,
                vary: 'access-control-request-headers'
              }
            : {};
        }
        return {
          'access-control-allow-headers': s.join(','),
          vary: 'access-control-request-headers'
        };
      })(e, t)
    );
}
function handleCors(e, t) {
  const s = (function (e = {}) {
    return sn(e, {
      origin: '*',
      methods: '*',
      allowHeaders: '*',
      exposeHeaders: '*',
      credentials: !1,
      maxAge: !1,
      preflight: { statusCode: 204 }
    });
  })(t);
  return (function (e) {
    const t = getRequestHeader(e, 'origin'),
      s = getRequestHeader(e, 'access-control-request-method');
    return 'OPTIONS' === e.method && !!t && !!s;
  })(e)
    ? (appendCorsPreflightHeaders(e, t),
      (function (e, t) {
        if (e.handled) return;
        t || 200 === e.node.res.statusCode || (t = e.node.res.statusCode);
        const s = sanitizeStatusCode(t, 204);
        204 === s && e.node.res.removeHeader('content-length'),
          e.node.res.writeHead(s),
          e.node.res.end();
      })(e, s.preflight.statusCode),
      !0)
    : ((function (e, t) {
        appendHeaders(e, createOriginHeaders(e, t)),
          appendHeaders(e, createCredentialsHeaders(t)),
          appendHeaders(e, createExposeHeaders(t));
      })(e, t),
      !1);
}
function defineEventHandler(e) {
  if ('function' == typeof e) return (e.__is_handler__ = !0), e;
  const t = {
      onRequest: _normalizeArray(e.onRequest),
      onBeforeResponse: _normalizeArray(e.onBeforeResponse)
    },
    _handler = (s) =>
      (async function (e, t, s) {
        if (s.onRequest)
          for (const t of s.onRequest) if ((await t(e), e.handled)) return;
        const r = await t(e),
          o = { body: r };
        if (s.onBeforeResponse)
          for (const t of s.onBeforeResponse) await t(e, o);
        return o.body;
      })(s, e.handler, t);
  return (
    (_handler.__is_handler__ = !0),
    (_handler.__resolve__ = e.handler.__resolve__),
    (_handler.__websocket__ = e.websocket),
    _handler
  );
}
function _normalizeArray(e) {
  return e ? (Array.isArray(e) ? e : [e]) : void 0;
}
const qo = '__MULTI_CACHE',
  Vo = '__MULTI_CACHE_ROUTE',
  Wo = '__MULTI_CACHE_CDN',
  Ko = '__MULTI_CACHE_PREFIX';
function getMultiCacheContext(e) {
  return e?.[qo];
}
function getExpiresValue(e) {
  return Math.round(Date.now() / 1e3 + e);
}
function isExpired(e) {
  return !!e.expires && Date.now() / 1e3 > e.expires;
}
function getCacheKeyWithPrefix(e, t) {
  const s = t[Ko];
  return s ? `${s}--${e}` : e;
}
function encodeRouteCacheKey(e) {
  const t = e.indexOf('?');
  return t >= 0 ? e.substring(0, t) : e;
}
function onlyUnique(e, t, s) {
  return s.indexOf(e) === t;
}
function useMultiCacheApp() {
  return useNitroApp().multiCache;
}
function handleCDN(e, t) {
  const s = (function (e) {
    return e?.[Wo];
  })(t);
  if (!s) return;
  const r = s._tags.filter(onlyUnique).join(' ');
  r && setResponseHeader(t, e.config.cdn.cacheTagHeader, r);
  const o = (function (e) {
    return e instanceof b ? e.format() : b.prototype.format.call(e);
  })(s._control);
  o && setResponseHeader(t, e.config.cdn.cacheControlHeader, o);
}
function onBeforeResponse(e, t) {
  handleCDN(useMultiCacheApp(), e);
}
class NuxtMultiCacheRouteCacheHelper {
  tags = [];
  cacheable = null;
  maxAge = null;
  staleIfError = null;
  staleWhileRevalidate = null;
  addTags(e = []) {
    return this.tags.push(...e), this;
  }
  setCacheable() {
    return null === this.cacheable && (this.cacheable = !0), this;
  }
  setUncacheable() {
    return (this.cacheable = !1), this;
  }
  setNumeric(e, t) {
    const s = this[e];
    return (null === s || t < s) && (this[e] = t), this;
  }
  setMaxAge(e = 0) {
    return this.setNumeric('maxAge', e);
  }
  setStaleIfError(e = 0) {
    return this.setNumeric('staleIfError', e);
  }
  allowStaleWhileRevalidate() {
    return (this.staleWhileRevalidate = !0), this;
  }
  getExpires(e) {
    const t = this[e];
    if (null !== t) return Math.floor(Date.now() / 1e3) + t;
  }
}
class NuxtMultiCacheCDNHelper {
  _tags;
  _control;
  constructor() {
    (this._tags = []), (this._control = new b());
  }
  set(e, t) {
    return (this._control[e] = t), this;
  }
  addTags(e) {
    return this._tags.push(...e), this;
  }
  setNumeric(e, t) {
    const s = this._control[e];
    return (null == s || t < s) && (this._control[e] = t), this;
  }
  private() {
    return (this._control.private = !0), (this._control.public = !1), this;
  }
  public() {
    return this._control.private || (this._control.public = !0), this;
  }
}
async function onRequest(e) {
  if (!e.path) return;
  if (
    !(function (e) {
      const { serverOptions: t } = useMultiCacheApp();
      return t.route?.applies
        ? t.route.applies(e)
        : !e.startsWith('/_nuxt') &&
            !e.startsWith('/__nuxt_error') &&
            !/.\.(ico|png|jpg|js|css|html|woff|woff2|ttf|otf|eot|svg)$/.test(e);
    })(e.path)
  )
    return;
  const t = await (function (e) {
    const { serverOptions: t } = useMultiCacheApp();
    return t.enabledForRequest ? t.enabledForRequest(e) : Promise.resolve(!0);
  })(e);
  t &&
    (await (async function (e) {
      const { cache: t, serverOptions: s, config: r } = useMultiCacheApp();
      if (
        (s.cacheKeyPrefix &&
          ('string' == typeof s.cacheKeyPrefix
            ? (e[Ko] = s.cacheKeyPrefix)
            : (e[Ko] = await s.cacheKeyPrefix(e))),
        (e[qo] = t),
        t.route && (e[Vo] = new NuxtMultiCacheRouteCacheHelper()),
        r.cdn.enabled)
      ) {
        const t = new NuxtMultiCacheCDNHelper();
        e[Wo] = t;
      }
      return t;
    })(e));
}
const Qo = '<CACHE_ITEM>';
function encodeRouteCacheItem(e, t, s, r, o, a, u) {
  return (function (e, t) {
    return JSON.stringify(t) + Qo + e;
  })(e, {
    headers: t,
    statusCode: s,
    expires: r,
    cacheTags: u,
    staleIfErrorExpires: o,
    staleWhileRevalidate: a
  });
}
function decodeRouteCacheItem(e) {
  try {
    const t = (function (e) {
      const t = e.indexOf(Qo);
      if (t >= 0)
        return {
          metadata: JSON.parse(e.substring(0, t)),
          data: e.substring(t + 12)
        };
    })(e);
    if (t) return { ...t.metadata, data: t.data };
  } catch (e) {}
}
const Go = go.withTag('nuxt-multi-cache');
function klona(e) {
  if ('object' != typeof e) return e;
  var t,
    s,
    r = Object.prototype.toString.call(e);
  if ('[object Object]' === r) {
    if (e.constructor !== Object && 'function' == typeof e.constructor)
      for (t in ((s = new e.constructor()), e))
        e.hasOwnProperty(t) && s[t] !== e[t] && (s[t] = klona(e[t]));
    else
      for (t in ((s = {}), e))
        '__proto__' === t
          ? Object.defineProperty(s, t, {
              value: klona(e[t]),
              configurable: !0,
              enumerable: !0,
              writable: !0
            })
          : (s[t] = klona(e[t]));
    return s;
  }
  if ('[object Array]' === r) {
    for (t = e.length, s = Array(t); t--; ) s[t] = klona(e[t]);
    return s;
  }
  return '[object Set]' === r
    ? ((s = new Set()),
      e.forEach(function (e) {
        s.add(klona(e));
      }),
      s)
    : '[object Map]' === r
      ? ((s = new Map()),
        e.forEach(function (e, t) {
          s.set(klona(t), klona(e));
        }),
        s)
      : '[object Date]' === r
        ? new Date(+e)
        : '[object RegExp]' === r
          ? (((s = new RegExp(e.source, e.flags)).lastIndex = e.lastIndex), s)
          : '[object DataView]' === r
            ? new e.constructor(klona(e.buffer))
            : '[object ArrayBuffer]' === r
              ? e.slice(0)
              : 'Array]' === r.slice(-6)
                ? new e.constructor(e)
                : e;
}
const Jo = rn(
    {
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
    { myLayer: { name: '@serp/ui' } },
    { myLayer: { name: '@serp/types' } },
    { myLayer: { name: '@serp/utils' } },
    {
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
    }
  ),
  Yo = /\d/,
  Xo = ['-', '_', '/', '.'];
function isUppercase(e = '') {
  if (!Yo.test(e)) return e !== e.toLowerCase();
}
function splitByCase(e, t) {
  const s = Xo,
    r = [];
  if (!e || 'string' != typeof e) return r;
  let o,
    a,
    u = '';
  for (const t of e) {
    const e = s.includes(t);
    if (!0 === e) {
      r.push(u), (u = ''), (o = void 0);
      continue;
    }
    const d = isUppercase(t);
    if (!1 === a) {
      if (!1 === o && !0 === d) {
        r.push(u), (u = t), (o = d);
        continue;
      }
      if (!0 === o && !1 === d && u.length > 1) {
        const e = u.at(-1);
        r.push(u.slice(0, Math.max(0, u.length - 1))), (u = e + t), (o = d);
        continue;
      }
    }
    (u += t), (o = d), (a = e);
  }
  return r.push(u), r;
}
function upperFirst(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : '';
}
function camelCase(e, t) {
  return (function (e) {
    return e ? e[0].toLowerCase() + e.slice(1) : '';
  })(
    (function (e) {
      return e
        ? (Array.isArray(e) ? e : splitByCase(e))
            .map((e) => upperFirst(e))
            .join('')
        : '';
    })(e || '')
  );
}
function snakeCase(e) {
  return (function (e, t) {
    return e
      ? (Array.isArray(e) ? e : splitByCase(e))
          .map((e) => e.toLowerCase())
          .join(t)
      : '';
  })(e || '', '_');
}
const Zo = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function titleCase(e, t) {
  return (Array.isArray(e) ? e : splitByCase(e))
    .filter(Boolean)
    .map((e) => (Zo.test(e) ? e.toLowerCase() : upperFirst(e)))
    .join(' ');
}
function getEnv(e, t) {
  const s = snakeCase(e).toUpperCase();
  return destr(I.env[t.prefix + s] ?? I.env[t.altPrefix + s]);
}
function _isObject(e) {
  return 'object' == typeof e && !Array.isArray(e);
}
function applyEnv(e, t, s = '') {
  for (const r in e) {
    const o = s ? `${s}_${r}` : r,
      a = getEnv(o, t);
    _isObject(e[r])
      ? _isObject(a)
        ? ((e[r] = { ...e[r], ...a }), applyEnv(e[r], t, o))
        : void 0 === a
          ? applyEnv(e[r], t, o)
          : (e[r] = a ?? e[r])
      : (e[r] = a ?? e[r]),
      t.envExpansion &&
        'string' == typeof e[r] &&
        (e[r] = e[r].replace(ei, (e, t) => I.env[t] || e));
  }
  return e;
}
const ei = /\{\{([^{}]*)\}\}/g;
const ti = {
    app: {
      baseURL: '/',
      buildId: '67dc3e9b-12f5-4e00-b665-899a87cc4be3',
      buildAssetsDir: '/_nuxt/',
      cdnURL: ''
    },
    nitro: {
      envPrefix: 'NUXT_',
      routeRules: {
        '/__nuxt_error': { cache: !1 },
        '/__sitemap__/style.xsl': {
          headers: { 'Content-Type': 'application/xslt+xml' }
        },
        '/sitemap.xml': {
          swr: 600,
          cache: {
            swr: !0,
            maxAge: 600,
            varies: ['X-Forwarded-Host', 'X-Forwarded-Proto', 'Host']
          }
        },
        '/**': {
          headers: {
            'Referrer-Policy': 'no-referrer',
            'Strict-Transport-Security': 'max-age=15552000; includeSubDomains;',
            'X-Content-Type-Options': 'nosniff',
            'X-Download-Options': 'noopen',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Permitted-Cross-Domain-Policies': 'none',
            'X-XSS-Protection': '0'
          }
        },
        '/_nuxt': { robots: 'noindex', headers: { 'X-Robots-Tag': 'noindex' } },
        '/_nuxt/**': {
          headers: {
            'cache-control': 'public, max-age=31536000, immutable',
            'X-Robots-Tag': 'noindex'
          },
          robots: 'noindex'
        },
        '/_nuxt/builds/meta/**': {
          headers: { 'cache-control': 'public, max-age=31536000, immutable' }
        },
        '/_nuxt/builds/**': {
          headers: { 'cache-control': 'public, max-age=1, immutable' }
        },
        '/_fonts/**': {
          headers: { 'cache-control': 'public, max-age=31536000, immutable' }
        },
        '/_scripts/**': {
          headers: { 'cache-control': 'public, max-age=31536000, immutable' }
        }
      }
    },
    public: {
      siteName: 'SERP Wiki',
      domain: 'serp.wiki',
      siteUrl: 'http://localhost:3000',
      apiUrl: '/api',
      environment: 'production',
      socialLinks: [
        {
          name: 'Twitter',
          href: 'https://serp.ly/@serpwiki/twitter',
          icon: 'i-lucide-twitter'
        },
        {
          name: 'Facebook',
          href: 'https://serp.ly/@serpwiki/facebook',
          icon: 'i-lucide-facebook'
        },
        {
          name: 'LinkedIn',
          href: 'https://serp.ly/@serpwiki/linkedin',
          icon: 'i-lucide-linkedin'
        },
        {
          name: 'YouTube',
          href: 'https://serp.ly/@serpwiki/youtube',
          icon: 'i-lucide-youtube'
        },
        {
          name: 'Github',
          href: 'https://serp.ly/@serpwiki/github',
          icon: 'i-lucide-github'
        },
        {
          name: 'Instagram',
          href: 'https://serp.ly/@serpwiki/instagram',
          icon: 'i-lucide-instagram'
        },
        {
          name: 'SoundCloud',
          href: 'https://serp.ly/@serpwiki/soundcloud',
          icon: 'i-lucide-external-link'
        }
      ],
      brandLinks: [{ name: 'About', href: 'https://github.com/serpcompany' }],
      headerNavItems: [
        { label: 'Posts', children: [{ label: 'Posts', to: '/posts/' }] }
      ],
      footerColumns: [
        {
          title: 'Links',
          id: 1,
          slug: '',
          items: [{ text: 'Posts', slug: '/posts/' }]
        }
      ],
      legalLinks: [
        { text: 'Privacy', slug: '/legal/privacy-policy/' },
        { text: 'Terms', slug: '/legal/terms-conditions/' },
        { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
        { text: 'DMCA', slug: '/legal/dmca/' }
      ],
      copyrightText: '© SERP',
      address: '',
      'seo-utils': {
        canonicalQueryWhitelist: [
          'page',
          'sort',
          'filter',
          'search',
          'q',
          'category',
          'tag'
        ]
      },
      'nuxt-scripts': {
        version: '',
        defaultScriptOptions: { trigger: 'onNuxtReady' }
      }
    },
    icon: { serverKnownCssClasses: [] },
    'nuxt-schema-org': {
      reactive: !1,
      minify: !0,
      scriptAttributes: { 'data-nuxt-schema-org': !0 },
      identity: 'Organization',
      version: '4.1.3'
    },
    sitemap: {
      isI18nMapped: !1,
      sitemapName: 'sitemap.xml',
      isMultiSitemap: !1,
      excludeAppSources: [],
      cacheMaxAgeSeconds: 600,
      autoLastmod: !1,
      defaultSitemapsChunkSize: 1e3,
      minify: !1,
      sortEntries: !0,
      debug: !1,
      discoverImages: !0,
      discoverVideos: !0,
      sitemapsPathPrefix: '/__sitemap__/',
      isNuxtContentDocumentDriven: !1,
      xsl: '/__sitemap__/style.xsl',
      xslTips: !0,
      xslColumns: [
        { label: 'URL', width: '50%' },
        { label: 'Images', width: '25%', select: 'count(image:image)' },
        {
          label: 'Last Updated',
          width: '25%',
          select:
            "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
        }
      ],
      credits: !0,
      version: '7.2.4',
      sitemaps: {
        'sitemap.xml': {
          sitemapName: 'sitemap.xml',
          route: 'sitemap.xml',
          defaults: {},
          include: [],
          exclude: ['/_nuxt/**', '/_**'],
          includeAppSources: !0
        }
      }
    },
    multiCache: {
      debug: !1,
      rootDir: '/Users/devin/repos/projects/serp-monorepo/apps/serp-wiki',
      cdn: {
        enabled: !1,
        cacheControlHeader: 'Surrogate-Control',
        cacheTagHeader: 'Cache-Tag'
      },
      component: !1,
      data: !0,
      route: !1,
      api: {
        enabled: !1,
        prefix: '/__nuxt_multi_cache',
        cacheTagInvalidationDelay: 6e4,
        authorizationToken: '',
        authorizationDisabled: !1
      }
    },
    private: { basicAuth: !1 },
    security: {
      strict: !1,
      headers: {
        crossOriginResourcePolicy: 'same-origin',
        crossOriginOpenerPolicy: 'same-origin',
        crossOriginEmbedderPolicy: 'credentialless',
        contentSecurityPolicy: {
          'base-uri': ["'none'"],
          'font-src': ["'self'", 'https:', 'data:'],
          'form-action': ["'self'"],
          'frame-ancestors': ["'self'"],
          'img-src': ["'self'", 'data:', 'https://*'],
          'object-src': ["'none'"],
          'script-src-attr': ["'none'"],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
          'script-src': [
            "'self'",
            'https:',
            "'unsafe-inline'",
            "'strict-dynamic'",
            "'nonce-{{nonce}}'"
          ],
          'upgrade-insecure-requests': !0
        },
        originAgentCluster: '?1',
        referrerPolicy: 'no-referrer',
        strictTransportSecurity: { maxAge: 15552e3, includeSubdomains: !0 },
        xContentTypeOptions: 'nosniff',
        xDNSPrefetchControl: 'off',
        xDownloadOptions: 'noopen',
        xFrameOptions: 'SAMEORIGIN',
        xPermittedCrossDomainPolicies: 'none',
        xXSSProtection: '0',
        permissionsPolicy: {
          camera: [],
          'display-capture': [],
          fullscreen: [],
          geolocation: [],
          microphone: []
        }
      },
      requestSizeLimiter: {
        maxRequestSizeInBytes: 2e6,
        maxUploadFileRequestInBytes: 8e6,
        throwError: !0
      },
      rateLimiter: !1,
      xssValidator: { methods: ['GET', 'POST'], throwError: !0 },
      corsHandler: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflight: { statusCode: 204 }
      },
      allowedMethodsRestricter: { methods: '*', throwError: !0 },
      hidePoweredBy: !0,
      enabled: !0,
      csrf: !1,
      nonce: !0,
      removeLoggers: !0,
      ssg: {
        meta: !0,
        hashScripts: !0,
        hashStyles: !1,
        nitroHeaders: !0,
        exportToPresets: !0
      },
      sri: !0
    },
    'nuxt-scripts': { version: '0.9.5' },
    'nuxt-site-config': {
      stack: [
        {
          _context: 'system',
          _priority: -15,
          name: 'serp-wiki',
          env: 'production'
        },
        { _context: 'package.json', _priority: -10, name: '@serp-wiki' },
        {
          _priority: -3,
          _context: 'nuxt-site-config:config',
          url: 'http://localhost:3000',
          name: 'SERP Wiki',
          trailingSlash: !0
        },
        { _context: 'buildEnv', _priority: -1, name: 'SERP Wiki' }
      ],
      version: '3.1.3',
      debug: !1,
      multiTenancy: []
    },
    'nuxt-robots': {
      version: '5.2.5',
      isNuxtContentV2: !1,
      debug: !1,
      credits: !0,
      groups: [
        {
          comment: [],
          disallow: [],
          allow: ['*'],
          userAgent: ['*'],
          _indexable: !0,
          _rules: [{ pattern: '*', allow: !0 }]
        }
      ],
      sitemap: ['https://serp.media/sitemap_index.xml', '/sitemap.xml'],
      header: !0,
      robotsEnabledValue:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      robotsDisabledValue: 'noindex, nofollow',
      cacheControl: 'max-age=14400, must-revalidate'
    }
  },
  ni = {
    prefix: 'NITRO_',
    altPrefix: ti.nitro.envPrefix ?? I.env.NITRO_ENV_PREFIX ?? '_',
    envExpansion: ti.nitro.envExpansion ?? I.env.NITRO_ENV_EXPANSION ?? !1
  },
  si = _deepFreeze(applyEnv(klona(ti), ni));
function useRuntimeConfig(e) {
  if (!e) return si;
  if (e.context.nitro.runtimeConfig) return e.context.nitro.runtimeConfig;
  const t = klona(ti);
  return applyEnv(t, ni), (e.context.nitro.runtimeConfig = t), t;
}
const ri = _deepFreeze(klona(Jo));
function _deepFreeze(e) {
  const t = Object.getOwnPropertyNames(e);
  for (const s of t) {
    const t = e[s];
    t && 'object' == typeof t && _deepFreeze(t);
  }
  return Object.freeze(e);
}
new Proxy(Object.create(null), {
  get: (e, t) => {
    console.warn(
      'Please use `useRuntimeConfig()` instead of accessing config directly.'
    );
    const s = useRuntimeConfig();
    if (t in s) return s[t];
  }
});
const oi = {},
  normalizeKey$1 = function (e) {
    return (
      (e &&
        e
          .split('?')[0]
          ?.replace(/[/\\]/g, ':')
          .replace(/:+/g, ':')
          .replace(/^:|:$/g, '')) ||
      ''
    );
  },
  ii = {
    getKeys: () => Promise.resolve(Object.keys(oi)),
    hasItem: (e) => ((e = normalizeKey$1(e)), Promise.resolve(e in oi)),
    getItem: (e) => (
      (e = normalizeKey$1(e)), Promise.resolve(oi[e] ? oi[e].import() : null)
    ),
    getMeta: (e) => (
      (e = normalizeKey$1(e)), Promise.resolve(oi[e] ? oi[e].meta : {})
    )
  };
const ai = ['event', 'mark', 'measure', 'resource'];
class _PerformanceEntry {
  __unenv__ = !0;
  detail;
  entryType = 'event';
  name;
  startTime;
  constructor(e, t) {
    (this.name = e),
      (this.startTime = t?.startTime || yi.now()),
      (this.detail = t?.detail);
  }
  get duration() {
    return yi.now() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const ci = globalThis.PerformanceEntry || _PerformanceEntry;
class _PerformanceMark extends _PerformanceEntry {
  entryType = 'mark';
}
const li = globalThis.PerformanceMark || _PerformanceMark;
class _PerformanceMeasure extends _PerformanceEntry {
  entryType = 'measure';
}
const ui = globalThis.PerformanceMeasure || _PerformanceMeasure;
const di =
    globalThis.PerformanceResourceTiming ||
    class extends _PerformanceEntry {
      entryType = 'resource';
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = '';
      name = '';
      nextHopProtocol = '';
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    },
  hi = Date.now();
const pi =
    globalThis.Performance ||
    class {
      __unenv__ = !0;
      timeOrigin = hi;
      eventCounts = new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      onresourcetimingbufferfull = null;
      now() {
        return globalThis?.performance?.now && this.timeOrigin === hi
          ? globalThis.performance.now()
          : Date.now() - this.timeOrigin;
      }
      clearMarks(e) {
        this._entries = e
          ? this._entries.filter((t) => t.name !== e)
          : this._entries.filter((e) => 'mark' !== e.entryType);
      }
      clearMeasures(e) {
        this._entries = e
          ? this._entries.filter((t) => t.name !== e)
          : this._entries.filter((e) => 'measure' !== e.entryType);
      }
      clearResourceTimings() {
        this._entries = this._entries.filter(
          (e) => 'resource' !== e.entryType || 'navigation' !== e.entryType
        );
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(e, t) {
        return this._entries.filter(
          (s) => s.name === e && (!t || s.entryType === t)
        );
      }
      getEntriesByType(e) {
        return this._entries.filter((t) => t.entryType === e);
      }
      mark(e, t) {
        const s = new _PerformanceMark(e, t);
        return this._entries.push(s), s;
      }
      measure(e, t, s) {
        let r, o;
        'string' == typeof t
          ? ((r = this.getEntriesByName(t, 'mark')[0]?.startTime),
            (o = this.getEntriesByName(s, 'mark')[0]?.startTime))
          : ((r = Number.parseFloat(t?.start) || this.now()),
            (o = Number.parseFloat(t?.end) || this.now()));
        const a = new _PerformanceMeasure(e, {
          startTime: r,
          detail: { start: r, end: o }
        });
        return this._entries.push(a), a;
      }
      setResourceTimingBufferSize(e) {
        this._resourceTimingBufferSize = e;
      }
      toJSON() {
        return this;
      }
      addEventListener(e, t, s) {
        throw createNotImplementedError('Performance.addEventListener');
      }
      removeEventListener(e, t, s) {
        throw createNotImplementedError('Performance.removeEventListener');
      }
      dispatchEvent(e) {
        throw createNotImplementedError('Performance.dispatchEvent');
      }
    },
  fi = globalThis.performance || new pi();
const mi =
  globalThis.PerformanceObserver ||
  class {
    __unenv__ = !0;
    static supportedEntryTypes = ai;
    _callback = null;
    constructor(e) {
      this._callback = e;
    }
    takeRecords() {
      return [];
    }
    disconnect() {
      throw createNotImplementedError('PerformanceObserver.disconnect');
    }
    observe(e) {
      throw createNotImplementedError('PerformanceObserver.observe');
    }
  };
const gi =
  globalThis.PerformanceObserverEntryList ||
  class {
    __unenv__ = !0;
    getEntries() {
      return [];
    }
    getEntriesByName(e, t) {
      return [];
    }
    getEntriesByType(e) {
      return [];
    }
  };
(globalThis.performance ||= fi),
  (globalThis.Performance ||= pi),
  (globalThis.PerformanceEntry ||= ci),
  (globalThis.PerformanceMark ||= li),
  (globalThis.PerformanceMeasure ||= ui),
  (globalThis.PerformanceObserver ||= mi),
  (globalThis.PerformanceObserverEntryList ||= gi),
  (globalThis.PerformanceResourceTiming ||= di);
const yi = globalThis.performance,
  bi = 'object' == typeof yi && yi && 'function' == typeof yi.now ? yi : Date,
  vi = new Set(),
  Si = 'object' == typeof I && I ? I : {},
  emitWarning = (e, t, s, r) => {
    'function' == typeof Si.emitWarning
      ? Si.emitWarning(e, t, s, r)
      : console.error(`[${s}] ${t}: ${e}`);
  };
let _i = globalThis.AbortController,
  wi = globalThis.AbortSignal;
if (void 0 === _i) {
  (wi = class {
    onabort;
    _onabort = [];
    reason;
    aborted = !1;
    addEventListener(e, t) {
      this._onabort.push(t);
    }
  }),
    (_i = class {
      constructor() {
        warnACPolyfill();
      }
      signal = new wi();
      abort(e) {
        if (!this.signal.aborted) {
          (this.signal.reason = e), (this.signal.aborted = !0);
          for (const t of this.signal._onabort) t(e);
          this.signal.onabort?.(e);
        }
      }
    });
  let e = '1' !== Si.env?.LRU_CACHE_IGNORE_AC_WARNING;
  const warnACPolyfill = () => {
    e &&
      ((e = !1),
      emitWarning(
        'AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.',
        'NO_ABORT_CONTROLLER',
        'ENOTSUP',
        warnACPolyfill
      ));
  };
}
const isPosInt = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
  getUintArray = (e) =>
    isPosInt(e)
      ? e <= Math.pow(2, 8)
        ? Uint8Array
        : e <= Math.pow(2, 16)
          ? Uint16Array
          : e <= Math.pow(2, 32)
            ? Uint32Array
            : e <= Number.MAX_SAFE_INTEGER
              ? ZeroArray
              : null
      : null;
class ZeroArray extends Array {
  constructor(e) {
    super(e), this.fill(0);
  }
}
class Stack {
  heap;
  length;
  static #r = !1;
  static create(e) {
    const t = getUintArray(e);
    if (!t) return [];
    Stack.#r = !0;
    const s = new Stack(e, t);
    return (Stack.#r = !1), s;
  }
  constructor(e, t) {
    if (!Stack.#r)
      throw new TypeError('instantiate Stack using Stack.create(n)');
    (this.heap = new t(e)), (this.length = 0);
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class LRUCache {
  #o;
  #i;
  #a;
  #c;
  #l;
  #u;
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #d;
  #h;
  #p;
  #f;
  #m;
  #g;
  #y;
  #b;
  #v;
  #S;
  #_;
  #w;
  #k;
  #C;
  #x;
  #R;
  #j;
  static unsafeExposeInternals(e) {
    return {
      starts: e.#k,
      ttls: e.#C,
      sizes: e.#w,
      keyMap: e.#p,
      keyList: e.#f,
      valList: e.#m,
      next: e.#g,
      prev: e.#y,
      get head() {
        return e.#b;
      },
      get tail() {
        return e.#v;
      },
      free: e.#S,
      isBackgroundFetch: (t) => e.#E(t),
      backgroundFetch: (t, s, r, o) => e.#A(t, s, r, o),
      moveToTail: (t) => e.#T(t),
      indexes: (t) => e.#O(t),
      rindexes: (t) => e.#I(t),
      isStale: (t) => e.#P(t)
    };
  }
  get max() {
    return this.#o;
  }
  get maxSize() {
    return this.#i;
  }
  get calculatedSize() {
    return this.#h;
  }
  get size() {
    return this.#d;
  }
  get fetchMethod() {
    return this.#l;
  }
  get memoMethod() {
    return this.#u;
  }
  get dispose() {
    return this.#a;
  }
  get disposeAfter() {
    return this.#c;
  }
  constructor(e) {
    const {
      max: t = 0,
      ttl: s,
      ttlResolution: r = 1,
      ttlAutopurge: o,
      updateAgeOnGet: a,
      updateAgeOnHas: u,
      allowStale: d,
      dispose: h,
      disposeAfter: f,
      noDisposeOnSet: m,
      noUpdateTTL: g,
      maxSize: v = 0,
      maxEntrySize: S = 0,
      sizeCalculation: _,
      fetchMethod: C,
      memoMethod: R,
      noDeleteOnFetchRejection: j,
      noDeleteOnStaleGet: E,
      allowStaleOnFetchRejection: T,
      allowStaleOnFetchAbort: O,
      ignoreFetchAbort: I
    } = e;
    if (0 !== t && !isPosInt(t))
      throw new TypeError('max option must be a nonnegative integer');
    const P = t ? getUintArray(t) : Array;
    if (!P) throw new Error('invalid max value: ' + t);
    if (
      ((this.#o = t),
      (this.#i = v),
      (this.maxEntrySize = S || this.#i),
      (this.sizeCalculation = _),
      this.sizeCalculation)
    ) {
      if (!this.#i && !this.maxEntrySize)
        throw new TypeError(
          'cannot set sizeCalculation without setting maxSize or maxEntrySize'
        );
      if ('function' != typeof this.sizeCalculation)
        throw new TypeError('sizeCalculation set to non-function');
    }
    if (void 0 !== R && 'function' != typeof R)
      throw new TypeError('memoMethod must be a function if defined');
    if (((this.#u = R), void 0 !== C && 'function' != typeof C))
      throw new TypeError('fetchMethod must be a function if specified');
    if (
      ((this.#l = C),
      (this.#R = !!C),
      (this.#p = new Map()),
      (this.#f = new Array(t).fill(void 0)),
      (this.#m = new Array(t).fill(void 0)),
      (this.#g = new P(t)),
      (this.#y = new P(t)),
      (this.#b = 0),
      (this.#v = 0),
      (this.#S = Stack.create(t)),
      (this.#d = 0),
      (this.#h = 0),
      'function' == typeof h && (this.#a = h),
      'function' == typeof f
        ? ((this.#c = f), (this.#_ = []))
        : ((this.#c = void 0), (this.#_ = void 0)),
      (this.#x = !!this.#a),
      (this.#j = !!this.#c),
      (this.noDisposeOnSet = !!m),
      (this.noUpdateTTL = !!g),
      (this.noDeleteOnFetchRejection = !!j),
      (this.allowStaleOnFetchRejection = !!T),
      (this.allowStaleOnFetchAbort = !!O),
      (this.ignoreFetchAbort = !!I),
      0 !== this.maxEntrySize)
    ) {
      if (0 !== this.#i && !isPosInt(this.#i))
        throw new TypeError('maxSize must be a positive integer if specified');
      if (!isPosInt(this.maxEntrySize))
        throw new TypeError(
          'maxEntrySize must be a positive integer if specified'
        );
      this.#M();
    }
    if (
      ((this.allowStale = !!d),
      (this.noDeleteOnStaleGet = !!E),
      (this.updateAgeOnGet = !!a),
      (this.updateAgeOnHas = !!u),
      (this.ttlResolution = isPosInt(r) || 0 === r ? r : 1),
      (this.ttlAutopurge = !!o),
      (this.ttl = s || 0),
      this.ttl)
    ) {
      if (!isPosInt(this.ttl))
        throw new TypeError('ttl must be a positive integer if specified');
      this.#N();
    }
    if (0 === this.#o && 0 === this.ttl && 0 === this.#i)
      throw new TypeError('At least one of max, maxSize, or ttl is required');
    if (!this.ttlAutopurge && !this.#o && !this.#i) {
      const e = 'LRU_CACHE_UNBOUNDED';
      if (((e) => !vi.has(e))(e)) {
        vi.add(e);
        emitWarning(
          'TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.',
          'UnboundedCacheWarning',
          e,
          LRUCache
        );
      }
    }
  }
  getRemainingTTL(e) {
    return this.#p.has(e) ? 1 / 0 : 0;
  }
  #N() {
    const e = new ZeroArray(this.#o),
      t = new ZeroArray(this.#o);
    (this.#C = e),
      (this.#k = t),
      (this.#L = (s, r, o = bi.now()) => {
        if (
          ((t[s] = 0 !== r ? o : 0), (e[s] = r), 0 !== r && this.ttlAutopurge)
        ) {
          const e = setTimeout(() => {
            this.#P(s) && this.#D(this.#f[s], 'expire');
          }, r + 1);
          e.unref && e.unref();
        }
      }),
      (this.#B = (s) => {
        t[s] = 0 !== e[s] ? bi.now() : 0;
      }),
      (this.#H = (r, o) => {
        if (e[o]) {
          const a = e[o],
            u = t[o];
          if (!a || !u) return;
          (r.ttl = a), (r.start = u), (r.now = s || getNow());
          const d = r.now - u;
          r.remainingTTL = a - d;
        }
      });
    let s = 0;
    const getNow = () => {
      const e = bi.now();
      if (this.ttlResolution > 0) {
        s = e;
        const t = setTimeout(() => (s = 0), this.ttlResolution);
        t.unref && t.unref();
      }
      return e;
    };
    (this.getRemainingTTL = (r) => {
      const o = this.#p.get(r);
      if (void 0 === o) return 0;
      const a = e[o],
        u = t[o];
      if (!a || !u) return 1 / 0;
      return a - ((s || getNow()) - u);
    }),
      (this.#P = (r) => {
        const o = t[r],
          a = e[r];
        return !!a && !!o && (s || getNow()) - o > a;
      });
  }
  #B = () => {};
  #H = () => {};
  #L = () => {};
  #P = () => !1;
  #M() {
    const e = new ZeroArray(this.#o);
    (this.#h = 0),
      (this.#w = e),
      (this.#z = (t) => {
        (this.#h -= e[t]), (e[t] = 0);
      }),
      (this.#F = (e, t, s, r) => {
        if (this.#E(t)) return 0;
        if (!isPosInt(s)) {
          if (!r)
            throw new TypeError(
              'invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.'
            );
          if ('function' != typeof r)
            throw new TypeError('sizeCalculation must be a function');
          if (((s = r(t, e)), !isPosInt(s)))
            throw new TypeError(
              'sizeCalculation return invalid (expect positive integer)'
            );
        }
        return s;
      }),
      (this.#$ = (t, s, r) => {
        if (((e[t] = s), this.#i)) {
          const s = this.#i - e[t];
          for (; this.#h > s; ) this.#U(!0);
        }
        (this.#h += e[t]),
          r && ((r.entrySize = s), (r.totalCalculatedSize = this.#h));
      });
  }
  #z = (e) => {};
  #$ = (e, t, s) => {};
  #F = (e, t, s, r) => {
    if (s || r)
      throw new TypeError(
        'cannot set size without setting maxSize or maxEntrySize on cache'
      );
    return 0;
  };
  *#O({ allowStale: e = this.allowStale } = {}) {
    if (this.#d)
      for (
        let t = this.#v;
        this.#q(t) && ((!e && this.#P(t)) || (yield t), t !== this.#b);

      )
        t = this.#y[t];
  }
  *#I({ allowStale: e = this.allowStale } = {}) {
    if (this.#d)
      for (
        let t = this.#b;
        this.#q(t) && ((!e && this.#P(t)) || (yield t), t !== this.#v);

      )
        t = this.#g[t];
  }
  #q(e) {
    return void 0 !== e && this.#p.get(this.#f[e]) === e;
  }
  *entries() {
    for (const e of this.#O())
      void 0 === this.#m[e] ||
        void 0 === this.#f[e] ||
        this.#E(this.#m[e]) ||
        (yield [this.#f[e], this.#m[e]]);
  }
  *rentries() {
    for (const e of this.#I())
      void 0 === this.#m[e] ||
        void 0 === this.#f[e] ||
        this.#E(this.#m[e]) ||
        (yield [this.#f[e], this.#m[e]]);
  }
  *keys() {
    for (const e of this.#O()) {
      const t = this.#f[e];
      void 0 === t || this.#E(this.#m[e]) || (yield t);
    }
  }
  *rkeys() {
    for (const e of this.#I()) {
      const t = this.#f[e];
      void 0 === t || this.#E(this.#m[e]) || (yield t);
    }
  }
  *values() {
    for (const e of this.#O()) {
      void 0 === this.#m[e] || this.#E(this.#m[e]) || (yield this.#m[e]);
    }
  }
  *rvalues() {
    for (const e of this.#I()) {
      void 0 === this.#m[e] || this.#E(this.#m[e]) || (yield this.#m[e]);
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = 'LRUCache';
  find(e, t = {}) {
    for (const s of this.#O()) {
      const r = this.#m[s],
        o = this.#E(r) ? r.__staleWhileFetching : r;
      if (void 0 !== o && e(o, this.#f[s], this))
        return this.get(this.#f[s], t);
    }
  }
  forEach(e, t = this) {
    for (const s of this.#O()) {
      const r = this.#m[s],
        o = this.#E(r) ? r.__staleWhileFetching : r;
      void 0 !== o && e.call(t, o, this.#f[s], this);
    }
  }
  rforEach(e, t = this) {
    for (const s of this.#I()) {
      const r = this.#m[s],
        o = this.#E(r) ? r.__staleWhileFetching : r;
      void 0 !== o && e.call(t, o, this.#f[s], this);
    }
  }
  purgeStale() {
    let e = !1;
    for (const t of this.#I({ allowStale: !0 }))
      this.#P(t) && (this.#D(this.#f[t], 'expire'), (e = !0));
    return e;
  }
  info(e) {
    const t = this.#p.get(e);
    if (void 0 === t) return;
    const s = this.#m[t],
      r = this.#E(s) ? s.__staleWhileFetching : s;
    if (void 0 === r) return;
    const o = { value: r };
    if (this.#C && this.#k) {
      const e = this.#C[t],
        s = this.#k[t];
      if (e && s) {
        const t = e - (bi.now() - s);
        (o.ttl = t), (o.start = Date.now());
      }
    }
    return this.#w && (o.size = this.#w[t]), o;
  }
  dump() {
    const e = [];
    for (const t of this.#O({ allowStale: !0 })) {
      const s = this.#f[t],
        r = this.#m[t],
        o = this.#E(r) ? r.__staleWhileFetching : r;
      if (void 0 === o || void 0 === s) continue;
      const a = { value: o };
      if (this.#C && this.#k) {
        a.ttl = this.#C[t];
        const e = bi.now() - this.#k[t];
        a.start = Math.floor(Date.now() - e);
      }
      this.#w && (a.size = this.#w[t]), e.unshift([s, a]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (const [t, s] of e) {
      if (s.start) {
        const e = Date.now() - s.start;
        s.start = bi.now() - e;
      }
      this.set(t, s.value, s);
    }
  }
  set(e, t, s = {}) {
    if (void 0 === t) return this.delete(e), this;
    const {
      ttl: r = this.ttl,
      start: o,
      noDisposeOnSet: a = this.noDisposeOnSet,
      sizeCalculation: u = this.sizeCalculation,
      status: d
    } = s;
    let { noUpdateTTL: h = this.noUpdateTTL } = s;
    const f = this.#F(e, t, s.size || 0, u);
    if (this.maxEntrySize && f > this.maxEntrySize)
      return (
        d && ((d.set = 'miss'), (d.maxEntrySizeExceeded = !0)),
        this.#D(e, 'set'),
        this
      );
    let m = 0 === this.#d ? void 0 : this.#p.get(e);
    if (void 0 === m)
      (m =
        0 === this.#d
          ? this.#v
          : 0 !== this.#S.length
            ? this.#S.pop()
            : this.#d === this.#o
              ? this.#U(!1)
              : this.#d),
        (this.#f[m] = e),
        (this.#m[m] = t),
        this.#p.set(e, m),
        (this.#g[this.#v] = m),
        (this.#y[m] = this.#v),
        (this.#v = m),
        this.#d++,
        this.#$(m, f, d),
        d && (d.set = 'add'),
        (h = !1);
    else {
      this.#T(m);
      const s = this.#m[m];
      if (t !== s) {
        if (this.#R && this.#E(s)) {
          s.__abortController.abort(new Error('replaced'));
          const { __staleWhileFetching: t } = s;
          void 0 === t ||
            a ||
            (this.#x && this.#a?.(t, e, 'set'),
            this.#j && this.#_?.push([t, e, 'set']));
        } else
          a ||
            (this.#x && this.#a?.(s, e, 'set'),
            this.#j && this.#_?.push([s, e, 'set']));
        if ((this.#z(m), this.#$(m, f, d), (this.#m[m] = t), d)) {
          d.set = 'replace';
          const e = s && this.#E(s) ? s.__staleWhileFetching : s;
          void 0 !== e && (d.oldValue = e);
        }
      } else d && (d.set = 'update');
    }
    if (
      (0 === r || this.#C || this.#N(),
      this.#C && (h || this.#L(m, r, o), d && this.#H(d, m)),
      !a && this.#j && this.#_)
    ) {
      const e = this.#_;
      let t;
      for (; (t = e?.shift()); ) this.#c?.(...t);
    }
    return this;
  }
  pop() {
    try {
      for (; this.#d; ) {
        const e = this.#m[this.#b];
        if ((this.#U(!0), this.#E(e))) {
          if (e.__staleWhileFetching) return e.__staleWhileFetching;
        } else if (void 0 !== e) return e;
      }
    } finally {
      if (this.#j && this.#_) {
        const e = this.#_;
        let t;
        for (; (t = e?.shift()); ) this.#c?.(...t);
      }
    }
  }
  #U(e) {
    const t = this.#b,
      s = this.#f[t],
      r = this.#m[t];
    return (
      this.#R && this.#E(r)
        ? r.__abortController.abort(new Error('evicted'))
        : (this.#x || this.#j) &&
          (this.#x && this.#a?.(r, s, 'evict'),
          this.#j && this.#_?.push([r, s, 'evict'])),
      this.#z(t),
      e && ((this.#f[t] = void 0), (this.#m[t] = void 0), this.#S.push(t)),
      1 === this.#d
        ? ((this.#b = this.#v = 0), (this.#S.length = 0))
        : (this.#b = this.#g[t]),
      this.#p.delete(s),
      this.#d--,
      t
    );
  }
  has(e, t = {}) {
    const { updateAgeOnHas: s = this.updateAgeOnHas, status: r } = t,
      o = this.#p.get(e);
    if (void 0 !== o) {
      const e = this.#m[o];
      if (this.#E(e) && void 0 === e.__staleWhileFetching) return !1;
      if (!this.#P(o))
        return s && this.#B(o), r && ((r.has = 'hit'), this.#H(r, o)), !0;
      r && ((r.has = 'stale'), this.#H(r, o));
    } else r && (r.has = 'miss');
    return !1;
  }
  peek(e, t = {}) {
    const { allowStale: s = this.allowStale } = t,
      r = this.#p.get(e);
    if (void 0 === r || (!s && this.#P(r))) return;
    const o = this.#m[r];
    return this.#E(o) ? o.__staleWhileFetching : o;
  }
  #A(e, t, s, r) {
    const o = void 0 === t ? void 0 : this.#m[t];
    if (this.#E(o)) return o;
    const a = new _i(),
      { signal: u } = s;
    u?.addEventListener('abort', () => a.abort(u.reason), { signal: a.signal });
    const d = { signal: a.signal, options: s, context: r },
      cb = (r, o = !1) => {
        const { aborted: u } = a.signal,
          f = s.ignoreFetchAbort && void 0 !== r;
        if (
          (s.status &&
            (u && !o
              ? ((s.status.fetchAborted = !0),
                (s.status.fetchError = a.signal.reason),
                f && (s.status.fetchAbortIgnored = !0))
              : (s.status.fetchResolved = !0)),
          u && !f && !o)
        )
          return fetchFail(a.signal.reason);
        const m = h;
        return (
          this.#m[t] === h &&
            (void 0 === r
              ? m.__staleWhileFetching
                ? (this.#m[t] = m.__staleWhileFetching)
                : this.#D(e, 'fetch')
              : (s.status && (s.status.fetchUpdated = !0),
                this.set(e, r, d.options))),
          r
        );
      },
      fetchFail = (r) => {
        const { aborted: o } = a.signal,
          u = o && s.allowStaleOnFetchAbort,
          d = u || s.allowStaleOnFetchRejection,
          f = d || s.noDeleteOnFetchRejection,
          m = h;
        if (this.#m[t] === h) {
          !f || void 0 === m.__staleWhileFetching
            ? this.#D(e, 'fetch')
            : u || (this.#m[t] = m.__staleWhileFetching);
        }
        if (d)
          return (
            s.status &&
              void 0 !== m.__staleWhileFetching &&
              (s.status.returnedStale = !0),
            m.__staleWhileFetching
          );
        if (m.__returned === m) throw r;
      };
    s.status && (s.status.fetchDispatched = !0);
    const h = new Promise((t, r) => {
        const u = this.#l?.(e, o, d);
        u &&
          u instanceof Promise &&
          u.then((e) => t(void 0 === e ? void 0 : e), r),
          a.signal.addEventListener('abort', () => {
            (s.ignoreFetchAbort && !s.allowStaleOnFetchAbort) ||
              (t(void 0), s.allowStaleOnFetchAbort && (t = (e) => cb(e, !0)));
          });
      }).then(
        cb,
        (e) => (
          s.status &&
            ((s.status.fetchRejected = !0), (s.status.fetchError = e)),
          fetchFail(e)
        )
      ),
      f = Object.assign(h, {
        __abortController: a,
        __staleWhileFetching: o,
        __returned: void 0
      });
    return (
      void 0 === t
        ? (this.set(e, f, { ...d.options, status: void 0 }),
          (t = this.#p.get(e)))
        : (this.#m[t] = f),
      f
    );
  }
  #E(e) {
    if (!this.#R) return !1;
    const t = e;
    return (
      !!t &&
      t instanceof Promise &&
      t.hasOwnProperty('__staleWhileFetching') &&
      t.__abortController instanceof _i
    );
  }
  async fetch(e, t = {}) {
    const {
      allowStale: s = this.allowStale,
      updateAgeOnGet: r = this.updateAgeOnGet,
      noDeleteOnStaleGet: o = this.noDeleteOnStaleGet,
      ttl: a = this.ttl,
      noDisposeOnSet: u = this.noDisposeOnSet,
      size: d = 0,
      sizeCalculation: h = this.sizeCalculation,
      noUpdateTTL: f = this.noUpdateTTL,
      noDeleteOnFetchRejection: m = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection: g = this.allowStaleOnFetchRejection,
      ignoreFetchAbort: v = this.ignoreFetchAbort,
      allowStaleOnFetchAbort: S = this.allowStaleOnFetchAbort,
      context: _,
      forceRefresh: C = !1,
      status: R,
      signal: j
    } = t;
    if (!this.#R)
      return (
        R && (R.fetch = 'get'),
        this.get(e, {
          allowStale: s,
          updateAgeOnGet: r,
          noDeleteOnStaleGet: o,
          status: R
        })
      );
    const E = {
      allowStale: s,
      updateAgeOnGet: r,
      noDeleteOnStaleGet: o,
      ttl: a,
      noDisposeOnSet: u,
      size: d,
      sizeCalculation: h,
      noUpdateTTL: f,
      noDeleteOnFetchRejection: m,
      allowStaleOnFetchRejection: g,
      allowStaleOnFetchAbort: S,
      ignoreFetchAbort: v,
      status: R,
      signal: j
    };
    let T = this.#p.get(e);
    if (void 0 === T) {
      R && (R.fetch = 'miss');
      const t = this.#A(e, T, E, _);
      return (t.__returned = t);
    }
    {
      const t = this.#m[T];
      if (this.#E(t)) {
        const e = s && void 0 !== t.__staleWhileFetching;
        return (
          R && ((R.fetch = 'inflight'), e && (R.returnedStale = !0)),
          e ? t.__staleWhileFetching : (t.__returned = t)
        );
      }
      const o = this.#P(T);
      if (!C && !o)
        return (
          R && (R.fetch = 'hit'),
          this.#T(T),
          r && this.#B(T),
          R && this.#H(R, T),
          t
        );
      const a = this.#A(e, T, E, _),
        u = void 0 !== a.__staleWhileFetching && s;
      return (
        R &&
          ((R.fetch = o ? 'stale' : 'refresh'),
          u && o && (R.returnedStale = !0)),
        u ? a.__staleWhileFetching : (a.__returned = a)
      );
    }
  }
  async forceFetch(e, t = {}) {
    const s = await this.fetch(e, t);
    if (void 0 === s) throw new Error('fetch() returned undefined');
    return s;
  }
  memo(e, t = {}) {
    const s = this.#u;
    if (!s) throw new Error('no memoMethod provided to constructor');
    const { context: r, forceRefresh: o, ...a } = t,
      u = this.get(e, a);
    if (!o && void 0 !== u) return u;
    const d = s(e, u, { options: a, context: r });
    return this.set(e, d, a), d;
  }
  get(e, t = {}) {
    const {
        allowStale: s = this.allowStale,
        updateAgeOnGet: r = this.updateAgeOnGet,
        noDeleteOnStaleGet: o = this.noDeleteOnStaleGet,
        status: a
      } = t,
      u = this.#p.get(e);
    if (void 0 !== u) {
      const t = this.#m[u],
        d = this.#E(t);
      return (
        a && this.#H(a, u),
        this.#P(u)
          ? (a && (a.get = 'stale'),
            d
              ? (a &&
                  s &&
                  void 0 !== t.__staleWhileFetching &&
                  (a.returnedStale = !0),
                s ? t.__staleWhileFetching : void 0)
              : (o || this.#D(e, 'expire'),
                a && s && (a.returnedStale = !0),
                s ? t : void 0))
          : (a && (a.get = 'hit'),
            d ? t.__staleWhileFetching : (this.#T(u), r && this.#B(u), t))
      );
    }
    a && (a.get = 'miss');
  }
  #V(e, t) {
    (this.#y[t] = e), (this.#g[e] = t);
  }
  #T(e) {
    e !== this.#v &&
      (e === this.#b ? (this.#b = this.#g[e]) : this.#V(this.#y[e], this.#g[e]),
      this.#V(this.#v, e),
      (this.#v = e));
  }
  delete(e) {
    return this.#D(e, 'delete');
  }
  #D(e, t) {
    let s = !1;
    if (0 !== this.#d) {
      const r = this.#p.get(e);
      if (void 0 !== r)
        if (((s = !0), 1 === this.#d)) this.#W(t);
        else {
          this.#z(r);
          const s = this.#m[r];
          if (
            (this.#E(s)
              ? s.__abortController.abort(new Error('deleted'))
              : (this.#x || this.#j) &&
                (this.#x && this.#a?.(s, e, t),
                this.#j && this.#_?.push([s, e, t])),
            this.#p.delete(e),
            (this.#f[r] = void 0),
            (this.#m[r] = void 0),
            r === this.#v)
          )
            this.#v = this.#y[r];
          else if (r === this.#b) this.#b = this.#g[r];
          else {
            const e = this.#y[r];
            this.#g[e] = this.#g[r];
            const t = this.#g[r];
            this.#y[t] = this.#y[r];
          }
          this.#d--, this.#S.push(r);
        }
    }
    if (this.#j && this.#_?.length) {
      const e = this.#_;
      let t;
      for (; (t = e?.shift()); ) this.#c?.(...t);
    }
    return s;
  }
  clear() {
    return this.#W('delete');
  }
  #W(e) {
    for (const t of this.#I({ allowStale: !0 })) {
      const s = this.#m[t];
      if (this.#E(s)) s.__abortController.abort(new Error('deleted'));
      else {
        const r = this.#f[t];
        this.#x && this.#a?.(s, r, e), this.#j && this.#_?.push([s, r, e]);
      }
    }
    if (
      (this.#p.clear(),
      this.#m.fill(void 0),
      this.#f.fill(void 0),
      this.#C && this.#k && (this.#C.fill(0), this.#k.fill(0)),
      this.#w && this.#w.fill(0),
      (this.#b = 0),
      (this.#v = 0),
      (this.#S.length = 0),
      (this.#h = 0),
      (this.#d = 0),
      this.#j && this.#_)
    ) {
      const e = this.#_;
      let t;
      for (; (t = e?.shift()); ) this.#c?.(...t);
    }
  }
}
const unstorage_47drivers_47lru_45cache = (e = {}) => {
  const s = new LRUCache({
    max: 1e3,
    sizeCalculation:
      e.maxSize || e.maxEntrySize
        ? (e, s) =>
            s.length +
            (function (e) {
              if (void 0 !== t)
                try {
                  return t.byteLength(e);
                } catch {}
              try {
                return 'string' == typeof e
                  ? e.length
                  : JSON.stringify(e).length;
              } catch {}
              return 0;
            })(e)
        : void 0,
    ...e
  });
  return {
    name: 'lru-cache',
    options: e,
    getInstance: () => s,
    hasItem: (e) => s.has(e),
    getItem: (e) => s.get(e) ?? null,
    getItemRaw: (e) => s.get(e) ?? null,
    setItem(e, t) {
      s.set(e, t);
    },
    setItemRaw(e, t) {
      s.set(e, t);
    },
    removeItem(e) {
      s.delete(e);
    },
    getKeys: () => [...s.keys()],
    clear() {
      s.clear();
    },
    dispose() {
      s.clear();
    }
  };
};
const ki = createStorage({});
function useStorage(e = '') {
  return e
    ? (function (e, t) {
        if (!(t = normalizeBaseKey(t))) return e;
        const s = { ...e };
        for (const r of vo) s[r] = (s = '', ...o) => e[r](t + s, ...o);
        return (
          (s.getKeys = (s = '', ...r) =>
            e
              .getKeys(t + s, ...r)
              .then((e) => e.map((e) => e.slice(t.length)))),
          s
        );
      })(ki, e)
    : ki;
}
ki.mount('/assets', ii),
  ki.mount(
    '#rate-limiter-storage',
    unstorage_47drivers_47lru_45cache({ driver: 'lruCache' })
  );
const Ci = [
    1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372,
    528734635, 1541459225
  ],
  xi = [
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
  Ri = [];
class k {
  _data = new l();
  _hash = new l([...Ci]);
  _nDataBytes = 0;
  _minBufferSize = 0;
  finalize(e) {
    e && this._append(e);
    const t = 8 * this._nDataBytes,
      s = 8 * this._data.sigBytes;
    return (
      (this._data.words[s >>> 5] |= 128 << (24 - (s % 32))),
      (this._data.words[14 + (((s + 64) >>> 9) << 4)] = Math.floor(
        t / 4294967296
      )),
      (this._data.words[15 + (((s + 64) >>> 9) << 4)] = t),
      (this._data.sigBytes = 4 * this._data.words.length),
      this._process(),
      this._hash
    );
  }
  _doProcessBlock(e, t) {
    const s = this._hash.words;
    let r = s[0],
      o = s[1],
      a = s[2],
      u = s[3],
      d = s[4],
      h = s[5],
      f = s[6],
      m = s[7];
    for (let s = 0; s < 64; s++) {
      if (s < 16) Ri[s] = 0 | e[t + s];
      else {
        const e = Ri[s - 15],
          t = ((e << 25) | (e >>> 7)) ^ ((e << 14) | (e >>> 18)) ^ (e >>> 3),
          r = Ri[s - 2],
          o = ((r << 15) | (r >>> 17)) ^ ((r << 13) | (r >>> 19)) ^ (r >>> 10);
        Ri[s] = t + Ri[s - 7] + o + Ri[s - 16];
      }
      const g = (r & o) ^ (r & a) ^ (o & a),
        v =
          ((r << 30) | (r >>> 2)) ^
          ((r << 19) | (r >>> 13)) ^
          ((r << 10) | (r >>> 22)),
        S =
          m +
          (((d << 26) | (d >>> 6)) ^
            ((d << 21) | (d >>> 11)) ^
            ((d << 7) | (d >>> 25))) +
          ((d & h) ^ (~d & f)) +
          xi[s] +
          Ri[s];
      (m = f),
        (f = h),
        (h = d),
        (d = (u + S) | 0),
        (u = a),
        (a = o),
        (o = r),
        (r = (S + (v + g)) | 0);
    }
    (s[0] = (s[0] + r) | 0),
      (s[1] = (s[1] + o) | 0),
      (s[2] = (s[2] + a) | 0),
      (s[3] = (s[3] + u) | 0),
      (s[4] = (s[4] + d) | 0),
      (s[5] = (s[5] + h) | 0),
      (s[6] = (s[6] + f) | 0),
      (s[7] = (s[7] + m) | 0);
  }
  _append(e) {
    'string' == typeof e && (e = l.fromUtf8(e)),
      this._data.concat(e),
      (this._nDataBytes += e.sigBytes);
  }
  _process(e) {
    let t,
      s = this._data.sigBytes / 64;
    s = e ? Math.ceil(s) : Math.max((0 | s) - this._minBufferSize, 0);
    const r = 16 * s,
      o = Math.min(4 * r, this._data.sigBytes);
    if (r) {
      for (let e = 0; e < r; e += 16) this._doProcessBlock(this._data.words, e);
      (t = this._data.words.splice(0, r)), (this._data.sigBytes -= o);
    }
    return new l(t, o);
  }
}
class l {
  words;
  sigBytes;
  constructor(e, t) {
    (e = this.words = e || []),
      (this.sigBytes = void 0 === t ? 4 * e.length : t);
  }
  static fromUtf8(e) {
    const t = unescape(encodeURIComponent(e)),
      s = t.length,
      r = [];
    for (let e = 0; e < s; e++)
      r[e >>> 2] |= (255 & t.charCodeAt(e)) << (24 - (e % 4) * 8);
    return new l(r, s);
  }
  toBase64() {
    const e = [];
    for (let t = 0; t < this.sigBytes; t += 3) {
      const s =
        (((this.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255) << 16) |
        (((this.words[(t + 1) >>> 2] >>> (24 - ((t + 1) % 4) * 8)) & 255) <<
          8) |
        ((this.words[(t + 2) >>> 2] >>> (24 - ((t + 2) % 4) * 8)) & 255);
      for (let r = 0; r < 4 && 8 * t + 6 * r < 8 * this.sigBytes; r++)
        e.push(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.charAt(
            (s >>> (6 * (3 - r))) & 63
          )
        );
    }
    return e.join('');
  }
  concat(e) {
    if (
      ((this.words[this.sigBytes >>> 2] &=
        4294967295 << (32 - (this.sigBytes % 4) * 8)),
      (this.words.length = Math.ceil(this.sigBytes / 4)),
      this.sigBytes % 4)
    )
      for (let t = 0; t < e.sigBytes; t++) {
        const s = (e.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
        this.words[(this.sigBytes + t) >>> 2] |=
          s << (24 - ((this.sigBytes + t) % 4) * 8);
      }
    else
      for (let t = 0; t < e.sigBytes; t += 4)
        this.words[(this.sigBytes + t) >>> 2] = e.words[t >>> 2];
    this.sigBytes += e.sigBytes;
  }
}
function hash$2(e) {
  return (function (e) {
    return new k().finalize(e).toBase64();
  })(
    'string' == typeof e
      ? e
      : (function (e) {
          const t = new ji();
          return t.dispatch(e), t.buff;
        })(e)
  )
    .replace(/[-_]/g, '')
    .slice(0, 10);
}
let ji = class Hasher {
  buff = '';
  #K = new Map();
  write(e) {
    this.buff += e;
  }
  dispatch(e) {
    return this[null === e ? 'null' : typeof e](e);
  }
  object(e) {
    if (e && 'function' == typeof e.toJSON) return this.object(e.toJSON());
    const s = Object.prototype.toString.call(e);
    let r = '';
    const o = s.length;
    (r = o < 10 ? 'unknown:[' + s + ']' : s.slice(8, o - 1)),
      (r = r.toLowerCase());
    let a = null;
    if (void 0 !== (a = this.#K.get(e)))
      return this.dispatch('[CIRCULAR:' + a + ']');
    if (
      (this.#K.set(e, this.#K.size),
      void 0 !== t && t.isBuffer && t.isBuffer(e))
    )
      return this.write('buffer:'), this.write(e.toString('utf8'));
    if ('object' !== r && 'function' !== r && 'asyncfunction' !== r)
      this[r] ? this[r](e) : this.unknown(e, r);
    else {
      const t = Object.keys(e).sort(),
        s = [];
      this.write('object:' + (t.length + s.length) + ':');
      const dispatchForKey = (t) => {
        this.dispatch(t), this.write(':'), this.dispatch(e[t]), this.write(',');
      };
      for (const e of t) dispatchForKey(e);
      for (const e of s) dispatchForKey(e);
    }
  }
  array(e, t) {
    if (
      ((t = void 0 !== t && t),
      this.write('array:' + e.length + ':'),
      !t || e.length <= 1)
    ) {
      for (const t of e) this.dispatch(t);
      return;
    }
    const s = new Map(),
      r = e.map((e) => {
        const t = new Hasher();
        t.dispatch(e);
        for (const [e, r] of t.#K) s.set(e, r);
        return t.toString();
      });
    return (this.#K = s), r.sort(), this.array(r, !1);
  }
  date(e) {
    return this.write('date:' + e.toJSON());
  }
  symbol(e) {
    return this.write('symbol:' + e.toString());
  }
  unknown(e, t) {
    if ((this.write(t), e))
      return (
        this.write(':'),
        e && 'function' == typeof e.entries
          ? this.array([...e.entries()], !0)
          : void 0
      );
  }
  error(e) {
    return this.write('error:' + e.toString());
  }
  boolean(e) {
    return this.write('bool:' + e);
  }
  string(e) {
    this.write('string:' + e.length + ':'), this.write(e);
  }
  function(e) {
    this.write('fn:'),
      !(function (e) {
        if ('function' != typeof e) return !1;
        return Function.prototype.toString.call(e).slice(-Ai) === Ei;
      })(e)
        ? this.dispatch(e.toString())
        : this.dispatch('[native]');
  }
  number(e) {
    return this.write('number:' + e);
  }
  null() {
    return this.write('Null');
  }
  undefined() {
    return this.write('Undefined');
  }
  regexp(e) {
    return this.write('regex:' + e.toString());
  }
  arraybuffer(e) {
    return this.write('arraybuffer:'), this.dispatch(new Uint8Array(e));
  }
  url(e) {
    return this.write('url:' + e.toString());
  }
  map(e) {
    this.write('map:');
    const t = [...e];
    return this.array(t, !1);
  }
  set(e) {
    this.write('set:');
    const t = [...e];
    return this.array(t, !1);
  }
  bigint(e) {
    return this.write('bigint:' + e.toString());
  }
};
for (const e of [
  'uint8array',
  'uint8clampedarray',
  'unt8array',
  'uint16array',
  'unt16array',
  'uint32array',
  'unt32array',
  'float32array',
  'float64array'
])
  ji.prototype[e] = function (t) {
    return this.write(e + ':'), this.array([...t], !1);
  };
const Ei = '[native code] }',
  Ai = Ei.length;
function defineCachedFunction(e, t = {}) {
  t = { name: '_', base: '/cache', swr: !0, maxAge: 1, ...t };
  const s = {},
    r = t.group || 'nitro/functions',
    o = t.name || e.name || '_',
    a = t.integrity || hash$2([e, t]),
    u = t.validate || ((e) => void 0 !== e.value);
  return async (...d) => {
    if (await t.shouldBypassCache?.(...d)) return e(...d);
    const h = await (t.getKey || getKey)(...d),
      f = await t.shouldInvalidateCache?.(...d),
      m = await (async function (e, d, h, f) {
        const m = [t.base, r, o, e + '.json']
          .filter(Boolean)
          .join(':')
          .replace(/:\/$/, ':index');
        let g =
          (await useStorage()
            .getItem(m)
            .catch((e) => {
              console.error('[cache] Cache read error.', e),
                useNitroApp().captureError(e, { event: f, tags: ['cache'] });
            })) || {};
        if ('object' != typeof g) {
          g = {};
          const e = new Error('Malformed data read from cache.');
          console.error('[cache]', e),
            useNitroApp().captureError(e, { event: f, tags: ['cache'] });
        }
        const v = 1e3 * (t.maxAge ?? 0);
        v && (g.expires = Date.now() + v);
        const S =
            h ||
            g.integrity !== a ||
            (v && Date.now() - (g.mtime || 0) > v) ||
            !1 === u(g),
          _ = S
            ? (async () => {
                const r = s[e];
                r ||
                  (void 0 !== g.value &&
                    (t.staleMaxAge || 0) >= 0 &&
                    !1 === t.swr &&
                    ((g.value = void 0),
                    (g.integrity = void 0),
                    (g.mtime = void 0),
                    (g.expires = void 0)),
                  (s[e] = Promise.resolve(d())));
                try {
                  g.value = await s[e];
                } catch (t) {
                  throw (r || delete s[e], t);
                }
                if (
                  !r &&
                  ((g.mtime = Date.now()),
                  (g.integrity = a),
                  delete s[e],
                  !1 !== u(g))
                ) {
                  let e;
                  t.maxAge && !t.swr && (e = { ttl: t.maxAge });
                  const s = useStorage()
                    .setItem(m, g, e)
                    .catch((e) => {
                      console.error('[cache] Cache write error.', e),
                        useNitroApp().captureError(e, {
                          event: f,
                          tags: ['cache']
                        });
                    });
                  f?.waitUntil && f.waitUntil(s);
                }
              })()
            : Promise.resolve();
        return (
          void 0 === g.value
            ? await _
            : S && f && f.waitUntil && f.waitUntil(_),
          t.swr && !1 !== u(g)
            ? (_.catch((e) => {
                console.error('[cache] SWR handler error.', e),
                  useNitroApp().captureError(e, { event: f, tags: ['cache'] });
              }),
              g)
            : _.then(() => g)
        );
      })(h, () => e(...d), f, d[0] && isEvent(d[0]) ? d[0] : void 0);
    let g = m.value;
    return t.transform && (g = (await t.transform(m, ...d)) || g), g;
  };
}
function getKey(...e) {
  return e.length > 0 ? hash$2(e) : '';
}
function escapeKey(e) {
  return String(e).replace(/\W/g, '');
}
function defineCachedEventHandler(
  e,
  t = { name: '_', base: '/cache', swr: !0, maxAge: 1 }
) {
  const s = (t.varies || [])
      .filter(Boolean)
      .map((e) => e.toLowerCase())
      .sort(),
    r = {
      ...t,
      getKey: async (e) => {
        const r = await t.getKey?.(e);
        if (r) return escapeKey(r);
        const o = e.node.req.originalUrl || e.node.req.url || e.path;
        let a;
        try {
          a =
            escapeKey(decodeURI(parseURL(o).pathname)).slice(0, 16) || 'index';
        } catch {
          a = '-';
        }
        return [
          `${a}.${hash$2(o)}`,
          ...s
            .map((t) => [t, e.node.req.headers[t]])
            .map(([e, t]) => `${escapeKey(e)}.${hash$2(t)}`)
        ].join(':');
      },
      validate: (e) =>
        !!e.value &&
        !(e.value.code >= 400) &&
        void 0 !== e.value.body &&
        'undefined' !== e.value.headers.etag &&
        'undefined' !== e.value.headers['last-modified'],
      group: t.group || 'nitro/handlers',
      integrity: t.integrity || hash$2([e, t])
    },
    o = (function (e, t = {}) {
      return defineCachedFunction(e, t);
    })(async (o) => {
      const a = {};
      for (const e of s) {
        const t = o.node.req.headers[e];
        void 0 !== t && (a[e] = t);
      }
      const u = cloneWithProxy(o.node.req, { headers: a }),
        d = {};
      let h;
      const f = createEvent(
        u,
        cloneWithProxy(o.node.res, {
          statusCode: 200,
          writableEnded: !1,
          writableFinished: !1,
          headersSent: !1,
          closed: !1,
          getHeader: (e) => d[e],
          setHeader(e, t) {
            return (d[e] = t), this;
          },
          getHeaderNames: () => Object.keys(d),
          hasHeader: (e) => e in d,
          removeHeader(e) {
            delete d[e];
          },
          getHeaders: () => d,
          end(e, t, s) {
            return (
              'string' == typeof e && (h = e),
              'function' == typeof t && t(),
              'function' == typeof s && s(),
              this
            );
          },
          write: (e, t, s) => (
            'string' == typeof e && (h = e),
            'function' == typeof t && t(void 0),
            'function' == typeof s && s(),
            !0
          ),
          writeHead(e, t) {
            if (((this.statusCode = e), t)) {
              if (Array.isArray(t) || 'string' == typeof t)
                throw new TypeError('Raw headers  is not supported.');
              for (const e in t) {
                const s = t[e];
                void 0 !== s && this.setHeader(e, s);
              }
            }
            return this;
          }
        })
      );
      (f.fetch = (e, t) =>
        fetchWithEvent(f, e, t, { fetch: useNitroApp().localFetch })),
        (f.$fetch = (e, t) =>
          fetchWithEvent(f, e, t, { fetch: globalThis.$fetch })),
        (f.waitUntil = o.waitUntil),
        (f.context = o.context),
        (f.context.cache = { options: r });
      const m = (await e(f)) || h,
        g = f.node.res.getHeaders();
      (g.etag = String(g.Etag || g.etag || `W/"${hash$2(m)}"`)),
        (g['last-modified'] = String(
          g['Last-Modified'] || g['last-modified'] || new Date().toUTCString()
        ));
      const v = [];
      t.swr
        ? (t.maxAge && v.push(`s-maxage=${t.maxAge}`),
          t.staleMaxAge
            ? v.push(`stale-while-revalidate=${t.staleMaxAge}`)
            : v.push('stale-while-revalidate'))
        : t.maxAge && v.push(`max-age=${t.maxAge}`),
        v.length > 0 && (g['cache-control'] = v.join(', '));
      return { code: f.node.res.statusCode, headers: g, body: m };
    }, r);
  return defineEventHandler$1(async (s) => {
    if (t.headersOnly) {
      if (handleCacheHeaders(s, { maxAge: t.maxAge })) return;
      return e(s);
    }
    const r = await o(s);
    if (s.node.res.headersSent || s.node.res.writableEnded) return r.body;
    if (
      !handleCacheHeaders(s, {
        modifiedTime: new Date(r.headers['last-modified']),
        etag: r.headers.etag,
        maxAge: t.maxAge
      })
    ) {
      s.node.res.statusCode = r.code;
      for (const e in r.headers) {
        const t = r.headers[e];
        'set-cookie' === e
          ? s.node.res.appendHeader(e, splitCookiesString(t))
          : void 0 !== t && s.node.res.setHeader(e, t);
      }
      return r.body;
    }
  });
}
function cloneWithProxy(e, t) {
  return new Proxy(e, {
    get: (e, s, r) => (s in t ? t[s] : Reflect.get(e, s, r)),
    set: (e, s, r, o) => (s in t ? ((t[s] = r), !0) : Reflect.set(e, s, r, o))
  });
}
const Ti = defineCachedEventHandler;
function defineRenderHandler(e) {
  const t = useRuntimeConfig();
  return _n(async (s) => {
    const r = useNitroApp(),
      o = { event: s, render: e, response: void 0 };
    if ((await r.hooks.callHook('render:before', o), !o.response)) {
      if (s.path === `${t.app.baseURL}favicon.ico`)
        return (
          setResponseHeader$1(s, 'Content-Type', 'image/x-icon'),
          send$1(
            s,
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          )
        );
      if (((o.response = await o.render(s)), !o.response)) {
        const e = getResponseStatus$1(s);
        return (
          setResponseStatus$1(s, 200 === e ? 500 : e),
          send$1(s, 'No response returned from render handler: ' + s.path)
        );
      }
    }
    return (
      await r.hooks.callHook('render:response', o.response, o),
      o.response.headers && setResponseHeaders$1(s, o.response.headers),
      (o.response.statusCode || o.response.statusMessage) &&
        setResponseStatus$1(s, o.response.statusCode, o.response.statusMessage),
      o.response.body
    );
  });
}
const Oi = toRouteMatcher(
  createRouter$1({ routes: useRuntimeConfig().nitro.routeRules })
);
function createRouteRulesHandler(e) {
  return _n((t) => {
    const s = getRouteRules(t);
    if ((s.headers && bn(t, s.headers), s.redirect)) {
      let e = s.redirect.to;
      if (e.endsWith('/**')) {
        let r = t.path;
        const o = s.redirect._redirectStripBase;
        o && (r = withoutBase(r, o)), (e = joinURL(e.slice(0, -3), r));
      } else if (t.path.includes('?')) {
        e = withQuery(e, getQuery$2(t.path));
      }
      return (function (e, t, s = 302) {
        return (
          (e.node.res.statusCode = sanitizeStatusCode$1(
            s,
            e.node.res.statusCode
          )),
          e.node.res.setHeader('location', t),
          send$1(
            e,
            `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t.replace(/"/g, '%22')}"></head></html>`,
            mn.html
          )
        );
      })(t, e, s.redirect.statusCode);
    }
    if (s.proxy) {
      let r = s.proxy.to;
      if (r.endsWith('/**')) {
        let e = t.path;
        const o = s.proxy._proxyStripBase;
        o && (e = withoutBase(e, o)), (r = joinURL(r.slice(0, -3), e));
      } else if (t.path.includes('?')) {
        r = withQuery(r, getQuery$2(t.path));
      }
      return proxyRequest(t, r, { fetch: e.localFetch, ...s.proxy });
    }
  });
}
function getRouteRules(e) {
  return (
    (e.context._nitro = e.context._nitro || {}),
    e.context._nitro.routeRules ||
      (e.context._nitro.routeRules = getRouteRulesForPath(
        withoutBase(e.path.split('?')[0], useRuntimeConfig().app.baseURL)
      )),
    e.context._nitro.routeRules
  );
}
function getRouteRulesForPath(e) {
  return sn({}, ...Oi.matchAll(e).reverse());
}
const Ii =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
        ? self
        : void 0 !== xn
          ? xn
          : {},
  Pi = '__unctx__',
  Mi =
    Ii[Pi] ||
    (Ii[Pi] = (function (e = {}) {
      const t = {};
      return {
        get: (s, r = {}) => (
          t[s] ||
            (t[s] = (function (e = {}) {
              let t,
                s = !1;
              const checkConflict = (e) => {
                if (t && t !== e) throw new Error('Context conflict');
              };
              let r;
              if (e.asyncContext) {
                const t = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
                t
                  ? (r = new t())
                  : console.warn(
                      '[unctx] `AsyncLocalStorage` is not provided.'
                    );
              }
              const _getCurrentInstance = () => {
                if (r) {
                  const e = r.getStore();
                  if (void 0 !== e) return e;
                }
                return t;
              };
              return {
                use: () => {
                  const e = _getCurrentInstance();
                  if (void 0 === e) throw new Error('Context is not available');
                  return e;
                },
                tryUse: () => _getCurrentInstance(),
                set: (e, r) => {
                  r || checkConflict(e), (t = e), (s = !0);
                },
                unset: () => {
                  (t = void 0), (s = !1);
                },
                call: (e, o) => {
                  checkConflict(e), (t = e);
                  try {
                    return r ? r.run(e, o) : o();
                  } finally {
                    s || (t = void 0);
                  }
                },
                async callAsync(e, o) {
                  t = e;
                  const onRestore = () => {
                      t = e;
                    },
                    onLeave = () => (t === e ? onRestore : void 0);
                  Li.add(onLeave);
                  try {
                    const a = r ? r.run(e, o) : o();
                    return s || (t = void 0), await a;
                  } finally {
                    Li.delete(onLeave);
                  }
                }
              };
            })({ ...e, ...r })),
          t[s]
        )
      };
    })()),
  getContext = (e, t = {}) => Mi.get(e, t),
  Ni = '__unctx_async_handlers__',
  Li = Ii[Ni] || (Ii[Ni] = new Set());
function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsURL(...e) {
  return joinRelativeURL(
    publicAssetsURL(),
    useRuntimeConfig().app.buildAssetsDir,
    ...e
  );
}
function publicAssetsURL(...e) {
  const t = useRuntimeConfig().app,
    s = t.cdnURL || t.baseURL;
  return e.length ? joinRelativeURL(s, ...e) : s;
}
getContext('nitro-app', { asyncContext: !1, AsyncLocalStorage: void 0 });
const Di = createDefu$1((e, t, s) => {
  if (Array.isArray(e[t]) || Array.isArray(s)) return (e[t] = s), !0;
});
function useNitroOrigin(e) {
  I.env.NITRO_SSL_CERT, I.env.NITRO_SSL_KEY;
  let t = I.env.NITRO_HOST || I.env.HOST || !1,
    s = !1,
    r = 'https';
  return (
    e &&
      ((t = getRequestHost(e, { xForwardedHost: !0 }) || t),
      (r = getRequestProtocol(e, { xForwardedProto: !0 }) || r)),
    'string' == typeof t &&
      t.includes(':') &&
      ((s = t.split(':').pop()), (t = t.split(':')[0])),
    (s = s ? `:${s}` : ''),
    withTrailingSlash(`${r}://${t}${s}`)
  );
}
function resolveSitePath$1(e, t) {
  let s = e;
  if (hasProtocol(e, { strict: !1, acceptRelative: !0 })) {
    s = parseURL(e).pathname;
  }
  const r = withLeadingSlash(t.base || '/');
  '/' !== r && s.startsWith(r) && (s = s.slice(r.length));
  let o = withoutTrailingSlash(t.absolute ? t.siteUrl : '');
  '/' !== r && o.endsWith(r) && (o = o.slice(0, o.indexOf(r)));
  const a = t.withBase ? withBase(r, o || '/') : o,
    u = withBase(s, a);
  return '/' !== s || t.withBase
    ? (function (e, t) {
        const s = parseURL(t);
        if (
          (function (e) {
            const t = e.split('/').pop();
            return !!(t || e).match(/\.[0-9a-z]+$/i)?.[0];
          })(s.pathname)
        )
          return t;
        const r = e
          ? withTrailingSlash(s.pathname)
          : withoutTrailingSlash(s.pathname);
        return `${s.protocol ? `${s.protocol}//` : ''}${s.host || ''}${r}${s.search || ''}${s.hash || ''}`;
      })(t.trailingSlash, u)
    : withTrailingSlash(u);
}
function createSitePathResolver(e, t = {}) {
  const s = useSiteConfig(e),
    r = useNitroOrigin(e),
    o = useRuntimeConfig(e).app.baseURL || '/';
  return (e) =>
    resolveSitePath$1(e, {
      ...t,
      siteUrl: !1 !== t.canonical ? s.url : r,
      trailingSlash: s.trailingSlash,
      base: o
    });
}
function matches(e, t) {
  const s = t.length,
    r = e.length,
    o = Array.from({ length: s + 1 }).fill(0);
  let a = 1,
    u = 0;
  for (; u < r; ) {
    if ('$' === e[u] && u + 1 === r) return o[a - 1] === s;
    if ('*' === e[u]) {
      a = s - o[0] + 1;
      for (let e = 1; e < a; e++) o[e] = o[e - 1] + 1;
    } else {
      let r = 0;
      for (let d = 0; d < a; d++) {
        const a = o[d];
        a < s && t[a] === e[u] && (o[r++] = a + 1);
      }
      if (0 === r) return !1;
      a = r;
    }
    u++;
  }
  return !0;
}
function matchPathToRule(e, t) {
  let s = null;
  const r = t.filter(Boolean),
    o = r.length;
  let a = 0;
  for (; a < o; ) {
    const t = r[a];
    matches(t.pattern, e)
      ? ((!s ||
          t.pattern.length > s.pattern.length ||
          (t.pattern.length === s.pattern.length && t.allow && !s.allow)) &&
          (s = t),
        a++)
      : a++;
  }
  return s;
}
function asArray(e) {
  return void 0 === e ? [] : Array.isArray(e) ? e : [e];
}
function getSiteRobotConfig(e) {
  const t = getQuery(e),
    s = [],
    { groups: r, debug: o } = useRuntimeConfig(e)['nuxt-robots'];
  let a = (function (e) {
    const { env: t, indexable: s } = useSiteConfig(e);
    return void 0 !== s ? 'true' === String(s) : 'production' === t;
  })(e);
  const u =
    'true' === String(t.mockProductionEnv) || '' === t.mockProductionEnv;
  if (o) {
    const { _context: t } = useSiteConfig(e, { debug: o || !1 });
    u
      ? ((a = !0),
        s.push(
          'You are mocking a production enviroment with ?mockProductionEnv query.'
        ))
      : a || 'nuxt-robots:config' !== t.indexable
        ? u || t.indexable
          ? a || u
            ? a && !u && s.push(`Indexing is enabled from ${t.indexable}.`)
            : s.push(
                `Indexing is blocked by site config set by ${t.indexable}.`
              )
          : s.push(
              'Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.'
            )
        : s.push('You are blocking indexing with your Nuxt Robots config.');
  }
  return (
    r.some((e) => e.userAgent.includes('*') && e.disallow.includes('/'))
      ? ((a = !1),
        s.push(
          'You are blocking all user agents with a wildcard `Disallow /`.'
        ))
      : r.some((e) => e.disallow.includes('/')) &&
        s.push('You are blocking specific user agents with `Disallow /`.'),
    { indexable: a, hints: s }
  );
}
function getPathRobotConfig(e, t) {
  const {
    robotsDisabledValue: s,
    robotsEnabledValue: r,
    isNuxtContentV2: o
  } = useRuntimeConfig()['nuxt-robots'];
  if (!t?.skipSiteIndexable && !getSiteRobotConfig(e).indexable)
    return { rule: s, indexable: !1 };
  const a = t?.path || e.path;
  let u = t?.userAgent;
  if (!u)
    try {
      u = getRequestHeader(e, 'User-Agent');
    } catch {}
  const d = useNitroApp(),
    h = [
      ...d._robots.ctx.groups.filter(
        (e) =>
          !!u &&
          e.userAgent.some((e) => e.toLowerCase().includes(u.toLowerCase()))
      ),
      ...d._robots.ctx.groups.filter((e) => e.userAgent.includes('*'))
    ];
  for (const e of h) {
    if (!e._indexable)
      return {
        indexable: !1,
        rule: s,
        debug: { source: '/robots.txt', line: 'Disallow: /' }
      };
    const t = matchPathToRule(a, e._rules);
    if (t) {
      if (!t.allow)
        return {
          indexable: !1,
          rule: s,
          debug: { source: '/robots.txt', line: `Disallow: ${t.pattern}` }
        };
      break;
    }
  }
  if (o && d._robots?.nuxtContentUrls?.has(withoutTrailingSlash(a)))
    return { indexable: !1, rule: s, debug: { source: 'Nuxt Content' } };
  d._robotsRuleMactcher =
    d._robotsRuleMactcher ||
    (function () {
      const { nitro: e, app: t } = useRuntimeConfig(),
        s = toRouteMatcher(
          createRouter$1({
            routes: Object.fromEntries(
              Object.entries(e?.routeRules || {}).map(([e, t]) => [
                withoutTrailingSlash(e),
                t
              ])
            )
          })
        );
      return (e) =>
        sn(
          {},
          ...s
            .matchAll(
              withoutBase(
                withoutTrailingSlash(
                  (function (e) {
                    return e.split('?')[0];
                  })(e)
                ),
                t.baseURL
              )
            )
            .reverse()
        );
    })();
  const f = (function (e) {
    let t, s;
    if (
      ('boolean' == typeof e.robots
        ? (t = e.robots)
        : 'object' == typeof e.robots &&
          void 0 !== e.robots.indexable &&
          (t = e.robots.indexable),
      'object' == typeof e.robots && void 0 !== e.robots.rule
        ? (s = e.robots.rule)
        : 'string' == typeof e.robots && (s = e.robots),
      s && !t && (t = 'none' !== s && !s.includes('noindex')),
      void 0 !== t || void 0 !== s)
    )
      return { allow: t, rule: s };
  })(d._robotsRuleMactcher(a));
  return !f || (void 0 === f.allow && void 0 === f.rule)
    ? { indexable: !0, rule: r }
    : {
        indexable: f.allow,
        rule: f.rule || (f.allow ? r : s),
        debug: { source: 'Route Rules' }
      };
}
function stringify(e) {
  if ('string' == typeof e) return e;
  try {
    if (
      (function (e) {
        const t = Object.getPrototypeOf(e);
        return !t || t.isPrototypeOf(Object);
      })(e) ||
      Array.isArray(e)
    )
      return JSON.stringify(e);
    if ('function' == typeof e.toJSON) return stringify(e.toJSON());
  } catch (e) {}
}
async function onAfterResponse(e, t) {
  if (e.__MULTI_CACHE_SERVED_FROM_CACHE) return;
  if (!t?.body) return;
  const s = stringify(t.body);
  if (!s) return;
  const r = getMultiCacheContext(e);
  if (!r?.route) return;
  const o = (function (e) {
    return e?.[Vo];
  })(e);
  if (!o?.cacheable) return;
  const a = (function (e) {
    return e.node.res.statusCode;
  })(e);
  if (200 !== a) return;
  const { serverOptions: u, state: d } = useMultiCacheApp();
  let h = (function (e) {
    return e.node.res.getHeaders();
  })(e);
  (h['content-encoding'] = void 0),
    u.route?.alterCachedHeaders && (h = u.route.alterCachedHeaders(h));
  const f = u?.route?.buildCacheKey
      ? u.route.buildCacheKey(e)
      : getCacheKeyWithPrefix(encodeRouteCacheKey(e.path), e),
    m = o.getExpires('maxAge'),
    g = o.getExpires('staleIfError'),
    v = !!o.staleWhileRevalidate,
    S = encodeRouteCacheItem(s, h, a, m, g, v, o.tags);
  useRuntimeConfig().multiCache.debug &&
    Go.info('Storing route in cache: ' + e.path, {
      cacheKey: f,
      expires: m,
      staleIfErrorExpires: g,
      cacheTags: o.tags,
      staleWhileRevalidate: v,
      statusCode: a
    }),
    await r.route.setItemRaw(f, S, { ttl: o.maxAge }),
    e.__MULTI_CACHE_REVALIDATION_KEY &&
      d.removeKeyBeingRevalidated(e.__MULTI_CACHE_REVALIDATION_KEY);
}
function setCachedResponse(e, t) {
  t.headers && setResponseHeaders(e, t.headers),
    t.statusCode &&
      (function (e, t) {
        t &&
          (e.node.res.statusCode = sanitizeStatusCode(
            t,
            e.node.res.statusCode
          ));
      })(e, t.statusCode),
    (e.__MULTI_CACHE_SERVED_FROM_CACHE = !0);
}
function onError(e, t) {
  try {
    if (!t.event) return;
    const { state: e } = useMultiCacheApp();
    t.event.__MULTI_CACHE_REVALIDATION_KEY &&
      e.removeKeyBeingRevalidated(t.event.__MULTI_CACHE_REVALIDATION_KEY);
    const s = t.event.__MULTI_CACHE_DECODED_CACHED_ROUTE;
    if (!s) return;
    if (!s.staleIfErrorExpires) return;
    if (Date.now() / 1e3 >= s.staleIfErrorExpires) return;
    setCachedResponse(t.event, s);
    const r = new Response(s.data, { headers: s.headers });
    return t.event.respondWith(r);
  } catch (e) {}
}
class MultiCacheState {
  keysBeingRevalidated = {};
  addKeyBeingRevalidated(e) {
    this.keysBeingRevalidated[e] = !0;
  }
  removeKeyBeingRevalidated(e) {
    delete this.keysBeingRevalidated[e];
  }
  isBeingRevalidated(e) {
    return !0 === this.keysBeingRevalidated[e];
  }
}
async function serveCachedHandler(e) {
  try {
    const { serverOptions: r, state: o } = useMultiCacheApp(),
      a = getMultiCacheContext(e);
    if (!a?.route) return;
    const u = r?.route?.buildCacheKey
        ? r.route.buildCacheKey(e)
        : getCacheKeyWithPrefix(encodeRouteCacheKey(e.path), e),
      d =
        'string' == typeof (s = await a.route.getItemRaw(u))
          ? s
          : s instanceof t
            ? s.toString()
            : void 0;
    if (!d) return;
    const h = decodeRouteCacheItem(d);
    if (!h) return;
    if (
      ((e.__MULTI_CACHE_DECODED_CACHED_ROUTE = h),
      !(function (e, t, s) {
        const r = Date.now() / 1e3;
        return !(
          t.expires &&
          r >= t.expires &&
          (!t.staleWhileRevalidate || !s.isBeingRevalidated(e))
        );
      })(u, h, o))
    )
      return void (
        h.staleWhileRevalidate &&
        (o.addKeyBeingRevalidated(u), (e.__MULTI_CACHE_REVALIDATION_KEY = u))
      );
    return (
      useRuntimeConfig().multiCache.debug &&
        Go.info('Serving cached route for path: ' + e.path, { fullKey: u }),
      setCachedResponse(e, h),
      h.data
    );
  } catch (e) {
    e instanceof Error && console.debug(e.message);
  }
  var s;
}
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
function getDefaultExportFromNamespaceIfNotNamed(e) {
  return e &&
    Object.prototype.hasOwnProperty.call(e, 'default') &&
    1 === Object.keys(e).length
    ? e.default
    : e;
}
var Bi = { exports: {} },
  Hi = {},
  zi = {};
const Fi = {
  acl: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  append: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  asking: { arity: 1, flags: ['fast'], keyStart: 0, keyStop: 0, step: 0 },
  auth: {
    arity: -2,
    flags: ['noscript', 'loading', 'stale', 'fast', 'no_auth', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  bgrewriteaof: {
    arity: 1,
    flags: ['admin', 'noscript', 'no_async_loading'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  bgsave: {
    arity: -1,
    flags: ['admin', 'noscript', 'no_async_loading'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  bitcount: {
    arity: -2,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  bitfield: {
    arity: -2,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  bitfield_ro: {
    arity: -2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  bitop: {
    arity: -4,
    flags: ['write', 'denyoom'],
    keyStart: 2,
    keyStop: -1,
    step: 1
  },
  bitpos: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  blmove: {
    arity: 6,
    flags: ['write', 'denyoom', 'noscript', 'blocking'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  blmpop: {
    arity: -5,
    flags: ['write', 'blocking', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  blpop: {
    arity: -3,
    flags: ['write', 'noscript', 'blocking'],
    keyStart: 1,
    keyStop: -2,
    step: 1
  },
  brpop: {
    arity: -3,
    flags: ['write', 'noscript', 'blocking'],
    keyStart: 1,
    keyStop: -2,
    step: 1
  },
  brpoplpush: {
    arity: 4,
    flags: ['write', 'denyoom', 'noscript', 'blocking'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  bzmpop: {
    arity: -5,
    flags: ['write', 'blocking', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  bzpopmax: {
    arity: -3,
    flags: ['write', 'noscript', 'blocking', 'fast'],
    keyStart: 1,
    keyStop: -2,
    step: 1
  },
  bzpopmin: {
    arity: -3,
    flags: ['write', 'noscript', 'blocking', 'fast'],
    keyStart: 1,
    keyStop: -2,
    step: 1
  },
  client: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  cluster: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  command: {
    arity: -1,
    flags: ['loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  config: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  copy: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  dbsize: {
    arity: 1,
    flags: ['readonly', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  debug: {
    arity: -2,
    flags: ['admin', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  decr: {
    arity: 2,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  decrby: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  del: { arity: -2, flags: ['write'], keyStart: 1, keyStop: -1, step: 1 },
  discard: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  dump: { arity: 2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  echo: { arity: 2, flags: ['fast'], keyStart: 0, keyStop: 0, step: 0 },
  eval: {
    arity: -3,
    flags: [
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  eval_ro: {
    arity: -3,
    flags: [
      'readonly',
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  evalsha: {
    arity: -3,
    flags: [
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  evalsha_ro: {
    arity: -3,
    flags: [
      'readonly',
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  exec: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'skip_slowlog'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  exists: {
    arity: -2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  expire: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  expireat: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  expiretime: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  failover: {
    arity: -1,
    flags: ['admin', 'noscript', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  fcall: {
    arity: -3,
    flags: [
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  fcall_ro: {
    arity: -3,
    flags: [
      'readonly',
      'noscript',
      'stale',
      'skip_monitor',
      'no_mandatory_keys',
      'movablekeys'
    ],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  flushall: { arity: -1, flags: ['write'], keyStart: 0, keyStop: 0, step: 0 },
  flushdb: { arity: -1, flags: ['write'], keyStart: 0, keyStop: 0, step: 0 },
  function: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  geoadd: {
    arity: -5,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  geodist: { arity: -4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  geohash: { arity: -2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  geopos: { arity: -2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  georadius: {
    arity: -6,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  georadius_ro: {
    arity: -6,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  georadiusbymember: {
    arity: -5,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  georadiusbymember_ro: {
    arity: -5,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  geosearch: {
    arity: -7,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  geosearchstore: {
    arity: -8,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  get: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  getbit: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  getdel: {
    arity: 2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  getex: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  getrange: { arity: 4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  getset: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hdel: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hello: {
    arity: -1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'no_auth', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  hexists: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hget: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hgetall: { arity: 2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  hincrby: {
    arity: 4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hincrbyfloat: {
    arity: 4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hkeys: { arity: 2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  hlen: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hmget: {
    arity: -3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hmset: {
    arity: -4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hrandfield: {
    arity: -2,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hscan: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  hset: {
    arity: -4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hsetnx: {
    arity: 4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hstrlen: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  hvals: { arity: 2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  incr: {
    arity: 2,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  incrby: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  incrbyfloat: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  info: {
    arity: -1,
    flags: ['loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  keys: { arity: 2, flags: ['readonly'], keyStart: 0, keyStop: 0, step: 0 },
  lastsave: {
    arity: 1,
    flags: ['loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  latency: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  lcs: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 2, step: 1 },
  lindex: { arity: 3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  linsert: {
    arity: 5,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  llen: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  lmove: {
    arity: 5,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  lmpop: {
    arity: -4,
    flags: ['write', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  lolwut: {
    arity: -1,
    flags: ['readonly', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  lpop: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  lpos: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  lpush: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  lpushx: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  lrange: { arity: 4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  lrem: { arity: 4, flags: ['write'], keyStart: 1, keyStop: 1, step: 1 },
  lset: {
    arity: 4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  ltrim: { arity: 4, flags: ['write'], keyStart: 1, keyStop: 1, step: 1 },
  memory: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  mget: {
    arity: -2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  migrate: {
    arity: -6,
    flags: ['write', 'movablekeys'],
    keyStart: 3,
    keyStop: 3,
    step: 1
  },
  module: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  monitor: {
    arity: 1,
    flags: ['admin', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  move: {
    arity: 3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  mset: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 2
  },
  msetnx: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 2
  },
  multi: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  object: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  persist: {
    arity: 2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  pexpire: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  pexpireat: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  pexpiretime: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  pfadd: {
    arity: -2,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  pfcount: {
    arity: -2,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  pfdebug: {
    arity: 3,
    flags: ['write', 'denyoom', 'admin'],
    keyStart: 2,
    keyStop: 2,
    step: 1
  },
  pfmerge: {
    arity: -2,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  pfselftest: { arity: 1, flags: ['admin'], keyStart: 0, keyStop: 0, step: 0 },
  ping: { arity: -1, flags: ['fast'], keyStart: 0, keyStop: 0, step: 0 },
  psetex: {
    arity: 4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  psubscribe: {
    arity: -2,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  psync: {
    arity: -3,
    flags: ['admin', 'noscript', 'no_async_loading', 'no_multi'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  pttl: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  publish: {
    arity: 3,
    flags: ['pubsub', 'loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  pubsub: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  punsubscribe: {
    arity: -1,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  quit: {
    arity: -1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'no_auth', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  randomkey: {
    arity: 1,
    flags: ['readonly'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  readonly: {
    arity: 1,
    flags: ['loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  readwrite: {
    arity: 1,
    flags: ['loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  rename: { arity: 3, flags: ['write'], keyStart: 1, keyStop: 2, step: 1 },
  renamenx: {
    arity: 3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  replconf: {
    arity: -1,
    flags: ['admin', 'noscript', 'loading', 'stale', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  replicaof: {
    arity: 3,
    flags: ['admin', 'noscript', 'stale', 'no_async_loading'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  reset: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'no_auth', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  restore: {
    arity: -4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  'restore-asking': {
    arity: -4,
    flags: ['write', 'denyoom', 'asking'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  role: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  rpop: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  rpoplpush: {
    arity: 3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  rpush: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  rpushx: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  sadd: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  save: {
    arity: 1,
    flags: ['admin', 'noscript', 'no_async_loading', 'no_multi'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  scan: { arity: -2, flags: ['readonly'], keyStart: 0, keyStop: 0, step: 0 },
  scard: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  script: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  sdiff: { arity: -2, flags: ['readonly'], keyStart: 1, keyStop: -1, step: 1 },
  sdiffstore: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  select: {
    arity: 2,
    flags: ['loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  set: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  setbit: {
    arity: 4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  setex: {
    arity: 4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  setnx: {
    arity: 3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  setrange: {
    arity: 4,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  shutdown: {
    arity: -1,
    flags: ['admin', 'noscript', 'loading', 'stale', 'no_multi', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  sinter: { arity: -2, flags: ['readonly'], keyStart: 1, keyStop: -1, step: 1 },
  sintercard: {
    arity: -3,
    flags: ['readonly', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  sinterstore: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  sismember: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  slaveof: {
    arity: 3,
    flags: ['admin', 'noscript', 'stale', 'no_async_loading'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  slowlog: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  smembers: { arity: 2, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  smismember: {
    arity: -3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  smove: {
    arity: 4,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  sort: {
    arity: -2,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  sort_ro: {
    arity: -2,
    flags: ['readonly', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  spop: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  spublish: {
    arity: 3,
    flags: ['pubsub', 'loading', 'stale', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  srandmember: {
    arity: -2,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  srem: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  sscan: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  ssubscribe: {
    arity: -2,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  strlen: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  subscribe: {
    arity: -2,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  substr: { arity: 4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  sunion: { arity: -2, flags: ['readonly'], keyStart: 1, keyStop: -1, step: 1 },
  sunionstore: {
    arity: -3,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  sunsubscribe: {
    arity: -1,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  swapdb: {
    arity: 3,
    flags: ['write', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  sync: {
    arity: 1,
    flags: ['admin', 'noscript', 'no_async_loading', 'no_multi'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  time: {
    arity: 1,
    flags: ['loading', 'stale', 'fast'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  touch: {
    arity: -2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  ttl: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  type: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  unlink: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  unsubscribe: {
    arity: -1,
    flags: ['pubsub', 'noscript', 'loading', 'stale'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  unwatch: {
    arity: 1,
    flags: ['noscript', 'loading', 'stale', 'fast', 'allow_busy'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  wait: { arity: 3, flags: ['noscript'], keyStart: 0, keyStop: 0, step: 0 },
  watch: {
    arity: -2,
    flags: ['noscript', 'loading', 'stale', 'fast', 'allow_busy'],
    keyStart: 1,
    keyStop: -1,
    step: 1
  },
  xack: {
    arity: -4,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xadd: {
    arity: -5,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xautoclaim: {
    arity: -6,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xclaim: {
    arity: -6,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xdel: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xgroup: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  xinfo: { arity: -2, flags: [], keyStart: 0, keyStop: 0, step: 0 },
  xlen: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xpending: {
    arity: -3,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xrange: { arity: -4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  xread: {
    arity: -4,
    flags: ['readonly', 'blocking', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  xreadgroup: {
    arity: -7,
    flags: ['write', 'blocking', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  xrevrange: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xsetid: {
    arity: -3,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  xtrim: { arity: -4, flags: ['write'], keyStart: 1, keyStop: 1, step: 1 },
  zadd: {
    arity: -4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zcard: {
    arity: 2,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zcount: {
    arity: 4,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zdiff: {
    arity: -3,
    flags: ['readonly', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  zdiffstore: {
    arity: -4,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zincrby: {
    arity: 4,
    flags: ['write', 'denyoom', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zinter: {
    arity: -3,
    flags: ['readonly', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  zintercard: {
    arity: -3,
    flags: ['readonly', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  zinterstore: {
    arity: -4,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zlexcount: {
    arity: 4,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zmpop: {
    arity: -4,
    flags: ['write', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  zmscore: {
    arity: -3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zpopmax: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zpopmin: {
    arity: -2,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrandmember: {
    arity: -2,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrange: { arity: -4, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  zrangebylex: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrangebyscore: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrangestore: {
    arity: -5,
    flags: ['write', 'denyoom'],
    keyStart: 1,
    keyStop: 2,
    step: 1
  },
  zrank: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrem: {
    arity: -3,
    flags: ['write', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zremrangebylex: {
    arity: 4,
    flags: ['write'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zremrangebyrank: {
    arity: 4,
    flags: ['write'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zremrangebyscore: {
    arity: 4,
    flags: ['write'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrevrange: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrevrangebylex: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrevrangebyscore: {
    arity: -4,
    flags: ['readonly'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zrevrank: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zscan: { arity: -3, flags: ['readonly'], keyStart: 1, keyStop: 1, step: 1 },
  zscore: {
    arity: 3,
    flags: ['readonly', 'fast'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  },
  zunion: {
    arity: -3,
    flags: ['readonly', 'movablekeys'],
    keyStart: 0,
    keyStop: 0,
    step: 0
  },
  zunionstore: {
    arity: -4,
    flags: ['write', 'denyoom', 'movablekeys'],
    keyStart: 1,
    keyStop: 1,
    step: 1
  }
};
!(function (e) {
  var t =
    (zi && zi.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.getKeyIndexes = e.hasFlag = e.exists = e.list = void 0);
  const s = t(Fi);
  e.list = Object.keys(s.default);
  const r = {};
  function getExternalKeyNameLength(e) {
    'string' != typeof e && (e = String(e));
    const t = e.indexOf('->');
    return -1 === t ? e.length : t;
  }
  e.list.forEach((e) => {
    r[e] = s.default[e].flags.reduce(function (e, t) {
      return (e[t] = !0), e;
    }, {});
  }),
    (e.exists = function (e) {
      return Boolean(s.default[e]);
    }),
    (e.hasFlag = function (e, t) {
      if (!r[e]) throw new Error('Unknown command ' + e);
      return Boolean(r[e][t]);
    }),
    (e.getKeyIndexes = function (e, t, r) {
      const o = s.default[e];
      if (!o) throw new Error('Unknown command ' + e);
      if (!Array.isArray(t)) throw new Error('Expect args to be an array');
      const a = [],
        u = Boolean(r && r.parseExternalKey),
        takeDynamicKeys = (e, t) => {
          const s = [],
            r = Number(e[t]);
          for (let e = 0; e < r; e++) s.push(e + t + 1);
          return s;
        },
        takeKeyAfterToken = (e, t, s) => {
          for (let r = t; r < e.length - 1; r += 1)
            if (String(e[r]).toLowerCase() === s.toLowerCase()) return r + 1;
          return null;
        };
      switch (e) {
        case 'zunionstore':
        case 'zinterstore':
        case 'zdiffstore':
          a.push(0, ...takeDynamicKeys(t, 1));
          break;
        case 'eval':
        case 'evalsha':
        case 'eval_ro':
        case 'evalsha_ro':
        case 'fcall':
        case 'fcall_ro':
        case 'blmpop':
        case 'bzmpop':
          a.push(...takeDynamicKeys(t, 1));
          break;
        case 'sintercard':
        case 'lmpop':
        case 'zunion':
        case 'zinter':
        case 'zmpop':
        case 'zintercard':
        case 'zdiff':
          a.push(...takeDynamicKeys(t, 0));
          break;
        case 'georadius': {
          a.push(0);
          const e = takeKeyAfterToken(t, 5, 'STORE');
          e && a.push(e);
          const s = takeKeyAfterToken(t, 5, 'STOREDIST');
          s && a.push(s);
          break;
        }
        case 'georadiusbymember': {
          a.push(0);
          const e = takeKeyAfterToken(t, 4, 'STORE');
          e && a.push(e);
          const s = takeKeyAfterToken(t, 4, 'STOREDIST');
          s && a.push(s);
          break;
        }
        case 'sort':
        case 'sort_ro':
          a.push(0);
          for (let e = 1; e < t.length - 1; e++) {
            let s = t[e];
            if ('string' != typeof s) continue;
            const r = s.toUpperCase();
            'GET' === r
              ? ((e += 1),
                (s = t[e]),
                '#' !== s &&
                  (u ? a.push([e, getExternalKeyNameLength(s)]) : a.push(e)))
              : 'BY' === r
                ? ((e += 1),
                  u ? a.push([e, getExternalKeyNameLength(t[e])]) : a.push(e))
                : 'STORE' === r && ((e += 1), a.push(e));
          }
          break;
        case 'migrate':
          if ('' === t[2])
            for (let e = 5; e < t.length - 1; e++) {
              const s = t[e];
              if ('string' == typeof s && 'KEYS' === s.toUpperCase()) {
                for (let s = e + 1; s < t.length; s++) a.push(s);
                break;
              }
            }
          else a.push(2);
          break;
        case 'xreadgroup':
        case 'xread':
          for (let s = 'xread' === e ? 0 : 3; s < t.length - 1; s++)
            if ('STREAMS' === String(t[s]).toUpperCase()) {
              for (let e = s + 1; e <= s + (t.length - 1 - s) / 2; e++)
                a.push(e);
              break;
            }
          break;
        default:
          if (o.step > 0) {
            const e = o.keyStart - 1,
              s = o.keyStop > 0 ? o.keyStop : t.length + o.keyStop + 1;
            for (let t = e; t < s; t += o.step) a.push(t);
          }
      }
      return a;
    });
})(zi);
const $i = getDefaultExportFromNamespaceIfNotNamed(r);
var Ui = {},
  qi = {};
!(function (e) {
  let t;
  function tryCatcher(s, r) {
    try {
      const e = t;
      return (t = null), e.apply(this, arguments);
    } catch (t) {
      return (e.errorObj.e = t), e.errorObj;
    }
  }
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.tryCatch = e.errorObj = void 0),
    (e.errorObj = { e: {} }),
    (e.tryCatch = function (e) {
      return (t = e), tryCatcher;
    });
})(qi),
  Object.defineProperty(Ui, '__esModule', { value: !0 });
const Vi = qi;
function throwLater(e) {
  setTimeout(function () {
    throw e;
  }, 0);
}
Ui.default = function (e, t, s) {
  return (
    'function' == typeof t &&
      e.then(
        (e) => {
          let r;
          (r =
            void 0 !== s && Object(s).spread && Array.isArray(e)
              ? Vi.tryCatch(t).apply(void 0, [null].concat(e))
              : void 0 === e
                ? Vi.tryCatch(t)(null)
                : Vi.tryCatch(t)(null, e)),
            r === Vi.errorObj && throwLater(r.e);
        },
        (e) => {
          if (!e) {
            const t = new Error(e + '');
            Object.assign(t, { cause: e }), (e = t);
          }
          const s = Vi.tryCatch(t)(e);
          s === Vi.errorObj && throwLater(s.e);
        }
      ),
    e
  );
};
var Wi = {};
const Ki = getDefaultExportFromNamespaceIfNotNamed(m),
  isRegExp = (e) => e instanceof RegExp,
  isDate = (e) => e instanceof Date,
  isBoolean = (e) => 'boolean' == typeof e,
  isNull$2 = (e) => null === e,
  isNullOrUndefined = (e) => null == e,
  isNumber = (e) => 'number' == typeof e,
  isString = (e) => 'string' == typeof e,
  isSymbol = (e) => 'symbol' == typeof e,
  isUndefined = (e) => void 0 === e,
  isFunction$2 = (e) => 'function' == typeof e,
  isBuffer = (e) =>
    e &&
    'object' == typeof e &&
    'function' == typeof e.copy &&
    'function' == typeof e.fill &&
    'function' == typeof e.readUInt8,
  isObject$2 = (e) =>
    null !== e &&
    'object' == typeof e &&
    Object.getPrototypeOf(e).isPrototypeOf(Object),
  isError = (e) => e instanceof Error,
  isPrimitive = (e) =>
    'object' == typeof e ? null === e : 'function' != typeof e,
  Qi = notImplemented('util._errnoException'),
  Gi = notImplemented('util._exceptionWithHostPort'),
  Ji = notImplemented('util.getSystemErrorMap'),
  Yi = notImplemented('util.getSystemErrorName'),
  Xi = notImplemented('util.parseEnv'),
  Zi = notImplemented('util.styleText'),
  {
    MIMEParams: ea,
    MIMEType: ta,
    TextDecoder: na,
    TextEncoder: sa,
    _extend: ra,
    aborted: oa,
    callbackify: ia,
    debug: aa,
    debuglog: ca,
    deprecate: la,
    format: ua,
    formatWithOptions: da,
    getCallSite: ha,
    inherits: pa,
    inspect: fa,
    log: ma,
    parseArgs: ga,
    promisify: ya,
    stripVTControlCharacters: ba,
    toUSVString: va,
    transferableAbortController: Sa,
    transferableAbortSignal: _a,
    isArray: wa,
    isDeepStrictEqual: ka
  } = g,
  Ca = g.types,
  xa = {
    _errnoException: Qi,
    _exceptionWithHostPort: Gi,
    getSystemErrorMap: Ji,
    getSystemErrorName: Yi,
    isArray: wa,
    isBoolean: isBoolean,
    isBuffer: isBuffer,
    isDate: isDate,
    isDeepStrictEqual: ka,
    isError: isError,
    isFunction: isFunction$2,
    isNull: isNull$2,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isObject: isObject$2,
    isPrimitive: isPrimitive,
    isRegExp: isRegExp,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    parseEnv: Xi,
    styleText: Zi,
    MIMEParams: ea,
    MIMEType: ta,
    TextDecoder: na,
    TextEncoder: sa,
    _extend: ra,
    aborted: oa,
    callbackify: ia,
    debug: aa,
    debuglog: ca,
    deprecate: la,
    format: ua,
    formatWithOptions: da,
    getCallSite: ha,
    inherits: pa,
    inspect: fa,
    log: ma,
    parseArgs: ga,
    promisify: ya,
    stripVTControlCharacters: ba,
    toUSVString: va,
    transferableAbortController: Sa,
    transferableAbortSignal: _a,
    types: Ca
  },
  Ra = getDefaultExportFromNamespaceIfNotNamed(
    Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          MIMEParams: ea,
          MIMEType: ta,
          TextDecoder: na,
          TextEncoder: sa,
          _errnoException: Qi,
          _exceptionWithHostPort: Gi,
          _extend: ra,
          aborted: oa,
          callbackify: ia,
          debug: aa,
          debuglog: ca,
          default: xa,
          deprecate: la,
          format: ua,
          formatWithOptions: da,
          getCallSite: ha,
          getSystemErrorMap: Ji,
          getSystemErrorName: Yi,
          inherits: pa,
          inspect: fa,
          isArray: wa,
          isBoolean: isBoolean,
          isBuffer: isBuffer,
          isDate: isDate,
          isDeepStrictEqual: ka,
          isError: isError,
          isFunction: isFunction$2,
          isNull: isNull$2,
          isNullOrUndefined: isNullOrUndefined,
          isNumber: isNumber,
          isObject: isObject$2,
          isPrimitive: isPrimitive,
          isRegExp: isRegExp,
          isString: isString,
          isSymbol: isSymbol,
          isUndefined: isUndefined,
          log: ma,
          parseArgs: ga,
          parseEnv: Xi,
          promisify: ya,
          stripVTControlCharacters: ba,
          styleText: Zi,
          toUSVString: va,
          transferableAbortController: Sa,
          transferableAbortSignal: _a,
          types: Ca
        },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    )
  );
var ja, Ea, Aa, Ta;
function requireOld() {
  if (Ea) return ja;
  Ea = 1;
  const e = Ki,
    t = Ra;
  function RedisError(e) {
    Object.defineProperty(this, 'message', {
      value: e || '',
      configurable: !0,
      writable: !0
    }),
      Error.captureStackTrace(this, this.constructor);
  }
  function ParserError(t, s, r) {
    e(s),
      e.strictEqual(typeof r, 'number'),
      Object.defineProperty(this, 'message', {
        value: t || '',
        configurable: !0,
        writable: !0
      });
    const o = Error.stackTraceLimit;
    (Error.stackTraceLimit = 2),
      Error.captureStackTrace(this, this.constructor),
      (Error.stackTraceLimit = o),
      (this.offset = r),
      (this.buffer = s);
  }
  function ReplyError(e) {
    Object.defineProperty(this, 'message', {
      value: e || '',
      configurable: !0,
      writable: !0
    });
    const t = Error.stackTraceLimit;
    (Error.stackTraceLimit = 2),
      Error.captureStackTrace(this, this.constructor),
      (Error.stackTraceLimit = t);
  }
  function AbortError(e) {
    Object.defineProperty(this, 'message', {
      value: e || '',
      configurable: !0,
      writable: !0
    }),
      Error.captureStackTrace(this, this.constructor);
  }
  function InterruptError(e) {
    Object.defineProperty(this, 'message', {
      value: e || '',
      configurable: !0,
      writable: !0
    }),
      Error.captureStackTrace(this, this.constructor);
  }
  return (
    t.inherits(RedisError, Error),
    Object.defineProperty(RedisError.prototype, 'name', {
      value: 'RedisError',
      configurable: !0,
      writable: !0
    }),
    t.inherits(ParserError, RedisError),
    Object.defineProperty(ParserError.prototype, 'name', {
      value: 'ParserError',
      configurable: !0,
      writable: !0
    }),
    t.inherits(ReplyError, RedisError),
    Object.defineProperty(ReplyError.prototype, 'name', {
      value: 'ReplyError',
      configurable: !0,
      writable: !0
    }),
    t.inherits(AbortError, RedisError),
    Object.defineProperty(AbortError.prototype, 'name', {
      value: 'AbortError',
      configurable: !0,
      writable: !0
    }),
    t.inherits(InterruptError, AbortError),
    Object.defineProperty(InterruptError.prototype, 'name', {
      value: 'InterruptError',
      configurable: !0,
      writable: !0
    }),
    (ja = {
      RedisError: RedisError,
      ParserError: ParserError,
      ReplyError: ReplyError,
      AbortError: AbortError,
      InterruptError: InterruptError
    })
  );
}
function requireModern() {
  if (Ta) return Aa;
  Ta = 1;
  const e = Ki;
  class RedisError extends Error {
    get name() {
      return this.constructor.name;
    }
  }
  class AbortError extends RedisError {
    get name() {
      return this.constructor.name;
    }
  }
  return (Aa = {
    RedisError: RedisError,
    ParserError: class extends RedisError {
      constructor(t, s, r) {
        e(s), e.strictEqual(typeof r, 'number');
        const o = Error.stackTraceLimit;
        (Error.stackTraceLimit = 2),
          super(t),
          (Error.stackTraceLimit = o),
          (this.offset = r),
          (this.buffer = s);
      }
      get name() {
        return this.constructor.name;
      }
    },
    ReplyError: class extends RedisError {
      constructor(e) {
        const t = Error.stackTraceLimit;
        (Error.stackTraceLimit = 2), super(e), (Error.stackTraceLimit = t);
      }
      get name() {
        return this.constructor.name;
      }
    },
    AbortError: AbortError,
    InterruptError: class extends AbortError {
      get name() {
        return this.constructor.name;
      }
    }
  });
}
var Oa =
    I.version.charCodeAt(1) < 55 && 46 === I.version.charCodeAt(2)
      ? requireOld()
      : requireModern(),
  Ia = {},
  Pa = { exports: {} },
  Ma = [
    0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290,
    45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044,
    29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334, 9314,
    13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153,
    58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165,
    18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757,
    26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144,
    39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770,
    56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684,
    23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395,
    36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439,
    61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451,
    53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742,
    24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752,
    8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830,
    58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413,
    42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681,
    5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305,
    47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093,
    56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254,
    2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427, 40424,
    36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342,
    53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923,
    16050, 3793, 7920
  ],
  Na = (Pa.exports = function (e) {
    for (
      var t,
        s = 0,
        r = -1,
        o = 0,
        a = 0,
        u =
          'string' == typeof e
            ? (function (e) {
                for (var t, s = 0, r = 0, o = [], a = e.length; s < a; s++)
                  (t = e.charCodeAt(s)) < 128
                    ? (o[r++] = t)
                    : t < 2048
                      ? ((o[r++] = (t >> 6) | 192), (o[r++] = (63 & t) | 128))
                      : 55296 == (64512 & t) &&
                          s + 1 < e.length &&
                          56320 == (64512 & e.charCodeAt(s + 1))
                        ? ((t =
                            65536 +
                            ((1023 & t) << 10) +
                            (1023 & e.charCodeAt(++s))),
                          (o[r++] = (t >> 18) | 240),
                          (o[r++] = ((t >> 12) & 63) | 128),
                          (o[r++] = ((t >> 6) & 63) | 128),
                          (o[r++] = (63 & t) | 128))
                        : ((o[r++] = (t >> 12) | 224),
                          (o[r++] = ((t >> 6) & 63) | 128),
                          (o[r++] = (63 & t) | 128));
                return o;
              })(e)
            : e,
        d = u.length;
      s < d;

    ) {
      if (((t = u[s++]), -1 === r)) 123 === t && (r = s);
      else if (125 !== t) a = Ma[255 & (t ^ (a >> 8))] ^ (a << 8);
      else if (s - 1 !== r) return 16383 & a;
      o = Ma[255 & (t ^ (o >> 8))] ^ (o << 8);
    }
    return 16383 & o;
  });
Pa.exports.generateMulti = function (e) {
  for (var t = 1, s = e.length, r = Na(e[0]); t < s; )
    if (Na(e[t++]) !== r) return -1;
  return r;
};
var La = Pa.exports,
  Da = {};
const Ba = getDefaultExportFromNamespaceIfNotNamed(v);
var Ha = {},
  za = 9007199254740991,
  Fa = '[object Arguments]',
  $a = '[object Function]',
  Ua = '[object GeneratorFunction]',
  qa = /^(?:0|[1-9]\d*)$/;
function apply(e, t, s) {
  switch (s.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, s[0]);
    case 2:
      return e.call(t, s[0], s[1]);
    case 3:
      return e.call(t, s[0], s[1], s[2]);
  }
  return e.apply(t, s);
}
var Va = Object.prototype,
  Wa = Va.hasOwnProperty,
  Ka = Va.toString,
  Qa = Va.propertyIsEnumerable,
  Ga = Math.max;
function arrayLikeKeys(e, t) {
  var s =
      Ja(e) ||
      (function (e) {
        return (
          (function (e) {
            return (
              (function (e) {
                return !!e && 'object' == typeof e;
              })(e) && isArrayLike$1(e)
            );
          })(e) &&
          Wa.call(e, 'callee') &&
          (!Qa.call(e, 'callee') || Ka.call(e) == Fa)
        );
      })(e)
        ? (function (e, t) {
            for (var s = -1, r = Array(e); ++s < e; ) r[s] = t(s);
            return r;
          })(e.length, String)
        : [],
    r = s.length,
    o = !!r;
  for (var a in e) (o && ('length' == a || isIndex(a, r))) || s.push(a);
  return s;
}
function assignInDefaults(e, t, s, r) {
  return void 0 === e || (eq(e, Va[s]) && !Wa.call(r, s)) ? t : e;
}
function assignValue(e, t, s) {
  var r = e[t];
  (Wa.call(e, t) && eq(r, s) && (void 0 !== s || t in e)) || (e[t] = s);
}
function baseKeysIn(e) {
  if (!isObject$1(e))
    return (function (e) {
      var t = [];
      if (null != e) for (var s in Object(e)) t.push(s);
      return t;
    })(e);
  var t,
    s,
    r,
    o =
      ((s = (t = e) && t.constructor),
      (r = ('function' == typeof s && s.prototype) || Va),
      t === r),
    a = [];
  for (var u in e) ('constructor' != u || (!o && Wa.call(e, u))) && a.push(u);
  return a;
}
function baseRest(e, t) {
  return (
    (t = Ga(void 0 === t ? e.length - 1 : t, 0)),
    function () {
      for (
        var s = arguments, r = -1, o = Ga(s.length - t, 0), a = Array(o);
        ++r < o;

      )
        a[r] = s[t + r];
      r = -1;
      for (var u = Array(t + 1); ++r < t; ) u[r] = s[r];
      return (u[t] = a), apply(e, this, u);
    }
  );
}
function isIndex(e, t) {
  return (
    !!(t = null == t ? za : t) &&
    ('number' == typeof e || qa.test(e)) &&
    e > -1 &&
    e % 1 == 0 &&
    e < t
  );
}
function eq(e, t) {
  return e === t || (e != e && t != t);
}
var Ja = Array.isArray;
function isArrayLike$1(e) {
  return (
    null != e &&
    (function (e) {
      return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= za;
    })(e.length) &&
    !(function (e) {
      var t = isObject$1(e) ? Ka.call(e) : '';
      return t == $a || t == Ua;
    })(e)
  );
}
function isObject$1(e) {
  var t = typeof e;
  return !!e && ('object' == t || 'function' == t);
}
var Ya,
  Xa =
    ((Ya = function (e, t, s, r) {
      !(function (e, t, s, r) {
        s || (s = {});
        for (var o = -1, a = t.length; ++o < a; ) {
          var u = t[o],
            d = r ? r(s[u], e[u], u, s, e) : void 0;
          assignValue(s, u, void 0 === d ? e[u] : d);
        }
      })(
        t,
        (function (e) {
          return isArrayLike$1(e) ? arrayLikeKeys(e) : baseKeysIn(e);
        })(t),
        e,
        r
      );
    }),
    baseRest(function (e, t) {
      var s = -1,
        r = t.length,
        o = r > 1 ? t[r - 1] : void 0,
        a = r > 2 ? t[2] : void 0;
      for (
        o = Ya.length > 3 && 'function' == typeof o ? (r--, o) : void 0,
          a &&
            (function (e, t, s) {
              if (!isObject$1(s)) return !1;
              var r = typeof t;
              return (
                !!('number' == r
                  ? isArrayLike$1(s) && isIndex(t, s.length)
                  : 'string' == r && (t in s)) && eq(s[t], e)
              );
            })(t[0], t[1], a) &&
            ((o = r < 3 ? void 0 : o), (r = 1)),
          e = Object(e);
        ++s < r;

      ) {
        var u = t[s];
        u && Ya(e, u, s, o);
      }
      return e;
    }));
var Za = baseRest(function (e) {
    return e.push(void 0, assignInDefaults), apply(Xa, void 0, e);
  }),
  ec = 9007199254740991,
  tc = '[object Function]',
  nc = '[object GeneratorFunction]',
  sc = Object.prototype,
  rc = sc.hasOwnProperty,
  oc = sc.toString,
  ic = sc.propertyIsEnumerable;
var lodash_isarguments = function (e) {
  return (
    (function (e) {
      return (
        (function (e) {
          return !!e && 'object' == typeof e;
        })(e) &&
        (function (e) {
          return (
            null != e &&
            (function (e) {
              return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= ec;
            })(e.length) &&
            !(function (e) {
              var t = (function (e) {
                var t = typeof e;
                return !!e && ('object' == t || 'function' == t);
              })(e)
                ? oc.call(e)
                : '';
              return t == tc || t == nc;
            })(e)
          );
        })(e)
      );
    })(e) &&
    rc.call(e, 'callee') &&
    (!ic.call(e, 'callee') || '[object Arguments]' == oc.call(e))
  );
};
Object.defineProperty(Ha, '__esModule', { value: !0 }),
  (Ha.isArguments = Ha.defaults = Ha.noop = void 0);
const ac = Za;
Ha.defaults = ac;
const cc = lodash_isarguments;
(Ha.isArguments = cc), (Ha.noop = function () {});
var lc = {};
const noop = () => {},
  debug$4 = () => console.debug;
Object.assign(debug$4, {
  default: debug$4,
  coerce: noop,
  disable: noop,
  enable: noop,
  enabled: noop,
  extend: debug$4,
  humanize: noop,
  destroy: noop,
  init: noop,
  log: console.debug,
  formatArgs: noop,
  save: noop,
  load: noop,
  useColors: noop,
  colors: [],
  inspectOpts: {},
  names: [],
  skips: [],
  formatters: {},
  selectColors: noop
});
const uc = getDefaultExportFromNamespaceIfNotNamed(
  Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: debug$4 },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  )
);
Object.defineProperty(lc, '__esModule', { value: !0 }),
  (lc.genRedactedString = lc.getStringValue = lc.MAX_ARGUMENT_LENGTH = void 0);
const dc = uc;
lc.MAX_ARGUMENT_LENGTH = 200;
function getStringValue(e) {
  if (null !== e)
    switch (typeof e) {
      case 'boolean':
      case 'number':
        return;
      case 'object':
        if (t.isBuffer(e)) return e.toString('hex');
        if (Array.isArray(e)) return e.join(',');
        try {
          return JSON.stringify(e);
        } catch (e) {
          return;
        }
      case 'string':
        return e;
    }
}
function genRedactedString(e, t) {
  const { length: s } = e;
  return s <= t ? e : e.slice(0, t) + ' ... <REDACTED full-length="' + s + '">';
}
(lc.getStringValue = getStringValue),
  (lc.genRedactedString = genRedactedString),
  (lc.default = function (e) {
    const t = (0, dc.default)(`ioredis:${e}`);
    function wrappedDebug(...e) {
      if (t.enabled) {
        for (let t = 1; t < e.length; t++) {
          const s = getStringValue(e[t]);
          'string' == typeof s &&
            s.length > 200 &&
            (e[t] = genRedactedString(s, 200));
        }
        return t.apply(null, e);
      }
    }
    return (
      Object.defineProperties(wrappedDebug, {
        namespace: { get: () => t.namespace },
        enabled: { get: () => t.enabled },
        destroy: { get: () => t.destroy },
        log: {
          get: () => t.log,
          set(e) {
            t.log = e;
          }
        }
      }),
      wrappedDebug
    );
  });
var hc = {};
Object.defineProperty(hc, '__esModule', { value: !0 });
const pc =
    '-----BEGIN CERTIFICATE-----\nMIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV\nBAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1\ndGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV\nBAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1\ndGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP\nJnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz\nrmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E\nQwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2\nBDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3\nTMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp\n4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w\nMB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w\nDQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta\nlbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6\nSu8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ\nuFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k\nBpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp\nZ4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx\nCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w\nKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN\nMTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG\nA1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy\nbWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA\nA4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv\nTq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4\nVuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym\nhjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W\nP0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN\nr0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw\nhhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s\nUzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u\nP1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9\nMjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT\nt5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID\nAQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy\nLnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw\nAYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G\nA1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4\nL2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB\nhjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr\nAP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW\nvcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw\n7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+\nXoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc\nAUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1\njQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh\n/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z\nzDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli\niF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43\niqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo\n616pxqo=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV\nBAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz\nTGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y\naXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC\nVVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz\nMS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw\nggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1\nG5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY\nDm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl\npp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT\nULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag\n54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ\nxeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC\nJpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K\n2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3\nStsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI\nSIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B\ncS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL\nyzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T\nAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg\nz5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu\nrYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3\n3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+\nhSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ\nD0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj\nTY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l\nFXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj\nmcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf\nybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji\nn8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F\nUhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h\n-----END CERTIFICATE-----\n\n-----BEGIN CERTIFICATE-----\nMIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM\nMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv\nYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y\nNTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu\nIG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy\nMDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf\n8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD\nBVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg\nofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK\ndZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh\ncounQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu\njE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG\nCCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW\nBBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj\nmove4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw\nMi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1\ncmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w\nK6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD\nVR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC\nAQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/\n3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY\n0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX\ny+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3\n15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5\nZgKnO/Fx2hBgTxhOTMYaD312kg==\n-----END CERTIFICATE-----\n\n-----BEGIN CERTIFICATE-----\nMIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G\nA1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp\nZ24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4\nMTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG\nA1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI\nhvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8\nRgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT\ngHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm\nKPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd\nQQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ\nXriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw\nDgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o\nLkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU\nRUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp\njjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK\n6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX\nmcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs\nMx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH\nWD9f\n-----END CERTIFICATE-----',
  fc = { RedisCloudFixed: { ca: pc }, RedisCloudFlexible: { ca: pc } };
(hc.default = fc),
  (function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.noop =
        e.defaults =
        e.Debug =
        e.zipMap =
        e.CONNECTION_CLOSED_ERROR_MSG =
        e.shuffle =
        e.sample =
        e.resolveTLSProfile =
        e.parseURL =
        e.optimizeErrorStack =
        e.toArg =
        e.convertMapToArray =
        e.convertObjectToArray =
        e.timeout =
        e.packObject =
        e.isInt =
        e.wrapMultiResult =
        e.convertBufferToString =
          void 0);
    const s = Ba,
      r = Ha;
    Object.defineProperty(e, 'defaults', {
      enumerable: !0,
      get: function () {
        return r.defaults;
      }
    }),
      Object.defineProperty(e, 'noop', {
        enumerable: !0,
        get: function () {
          return r.noop;
        }
      });
    const o = lc;
    e.Debug = o.default;
    const a = hc;
    function isInt(e) {
      const t = parseFloat(e);
      return !isNaN(e) && (0 | t) === t;
    }
    (e.convertBufferToString = function convertBufferToString(e, s) {
      if (e instanceof t) return e.toString(s);
      if (Array.isArray(e)) {
        const r = e.length,
          o = Array(r);
        for (let a = 0; a < r; ++a)
          o[a] =
            e[a] instanceof t && 'utf8' === s
              ? e[a].toString()
              : convertBufferToString(e[a], s);
        return o;
      }
      return e;
    }),
      (e.wrapMultiResult = function (e) {
        if (!e) return null;
        const t = [],
          s = e.length;
        for (let r = 0; r < s; ++r) {
          const s = e[r];
          s instanceof Error ? t.push([s]) : t.push([null, s]);
        }
        return t;
      }),
      (e.isInt = isInt),
      (e.packObject = function (e) {
        const t = {},
          s = e.length;
        for (let r = 1; r < s; r += 2) t[e[r - 1]] = e[r];
        return t;
      }),
      (e.timeout = function (e, t) {
        let s = null;
        const run = function () {
          s && (clearTimeout(s), (s = null), e.apply(this, arguments));
        };
        return (s = setTimeout(run, t, new Error('timeout'))), run;
      }),
      (e.convertObjectToArray = function (e) {
        const t = [],
          s = Object.keys(e);
        for (let r = 0, o = s.length; r < o; r++) t.push(s[r], e[s[r]]);
        return t;
      }),
      (e.convertMapToArray = function (e) {
        const t = [];
        let s = 0;
        return (
          e.forEach(function (e, r) {
            (t[s] = r), (t[s + 1] = e), (s += 2);
          }),
          t
        );
      }),
      (e.toArg = function (e) {
        return null == e ? '' : String(e);
      }),
      (e.optimizeErrorStack = function (e, t, s) {
        const r = t.split('\n');
        let o,
          a = '';
        for (o = 1; o < r.length && -1 !== r[o].indexOf(s); ++o);
        for (let e = o; e < r.length; ++e) a += '\n' + r[e];
        if (e.stack) {
          const t = e.stack.indexOf('\n');
          e.stack = e.stack.slice(0, t) + a;
        }
        return e;
      }),
      (e.parseURL = function (e) {
        if (isInt(e)) return { port: e };
        let t = (0, s.parse)(e, !0, !0);
        t.slashes ||
          '/' === e[0] ||
          ((e = '//' + e), (t = (0, s.parse)(e, !0, !0)));
        const o = t.query || {},
          a = {};
        if (t.auth) {
          const e = t.auth.indexOf(':');
          (a.username = -1 === e ? t.auth : t.auth.slice(0, e)),
            (a.password = -1 === e ? '' : t.auth.slice(e + 1));
        }
        if (
          (t.pathname &&
            ('redis:' === t.protocol || 'rediss:' === t.protocol
              ? t.pathname.length > 1 && (a.db = t.pathname.slice(1))
              : (a.path = t.pathname)),
          t.host && (a.host = t.hostname),
          t.port && (a.port = t.port),
          'string' == typeof o.family)
        ) {
          const e = Number.parseInt(o.family, 10);
          Number.isNaN(e) || (a.family = e);
        }
        return (0, r.defaults)(a, o), a;
      }),
      (e.resolveTLSProfile = function (e) {
        let t = null == e ? void 0 : e.tls;
        'string' == typeof t && (t = { profile: t });
        const s = a.default[null == t ? void 0 : t.profile];
        return (
          s &&
            ((t = Object.assign({}, s, t)),
            delete t.profile,
            (e = Object.assign({}, e, { tls: t }))),
          e
        );
      }),
      (e.sample = function (e, t = 0) {
        const s = e.length;
        return t >= s ? null : e[t + Math.floor(Math.random() * (s - t))];
      }),
      (e.shuffle = function (e) {
        let t = e.length;
        for (; t > 0; ) {
          const s = Math.floor(Math.random() * t);
          t--, ([e[t], e[s]] = [e[s], e[t]]);
        }
        return e;
      }),
      (e.CONNECTION_CLOSED_ERROR_MSG = 'Connection is closed.'),
      (e.zipMap = function (e, t) {
        const s = new Map();
        return (
          e.forEach((e, r) => {
            s.set(e, t[r]);
          }),
          s
        );
      });
  })(Da),
  Object.defineProperty(Ia, '__esModule', { value: !0 });
const mc = zi,
  gc = La,
  yc = Ui,
  bc = Da;
class Command {
  constructor(e, s = [], r = {}, o) {
    if (
      ((this.name = e),
      (this.inTransaction = !1),
      (this.isResolved = !1),
      (this.transformed = !1),
      (this.replyEncoding = r.replyEncoding),
      (this.errorStack = r.errorStack),
      (this.args = s.flat()),
      (this.callback = o),
      this.initPromise(),
      r.keyPrefix)
    ) {
      const e = r.keyPrefix instanceof t;
      let s = e ? r.keyPrefix : null;
      this._iterateKeys((o) =>
        o instanceof t
          ? (null === s && (s = t.from(r.keyPrefix)), t.concat([s, o]))
          : e
            ? t.concat([r.keyPrefix, t.from(String(o))])
            : r.keyPrefix + o
      );
    }
    r.readOnly && (this.isReadOnly = !0);
  }
  static checkFlag(e, t) {
    return !!this.getFlagMap()[e][t];
  }
  static setArgumentTransformer(e, t) {
    this._transformer.argument[e] = t;
  }
  static setReplyTransformer(e, t) {
    this._transformer.reply[e] = t;
  }
  static getFlagMap() {
    return (
      this.flagMap ||
        (this.flagMap = Object.keys(Command.FLAGS).reduce(
          (e, t) => (
            (e[t] = {}),
            Command.FLAGS[t].forEach((s) => {
              e[t][s] = !0;
            }),
            e
          ),
          {}
        )),
      this.flagMap
    );
  }
  getSlot() {
    if (void 0 === this.slot) {
      const e = this.getKeys()[0];
      this.slot = null == e ? null : gc(e);
    }
    return this.slot;
  }
  getKeys() {
    return this._iterateKeys();
  }
  toWritable(e) {
    let s;
    const r =
      '*' +
      (this.args.length + 1) +
      '\r\n$' +
      t.byteLength(this.name) +
      '\r\n' +
      this.name +
      '\r\n';
    if (this.bufferMode) {
      const e = new MixedBuffers();
      e.push(r);
      for (let s = 0; s < this.args.length; ++s) {
        const r = this.args[s];
        r instanceof t
          ? 0 === r.length
            ? e.push('$0\r\n\r\n')
            : (e.push('$' + r.length + '\r\n'), e.push(r), e.push('\r\n'))
          : e.push('$' + t.byteLength(r) + '\r\n' + r + '\r\n');
      }
      s = e.toBuffer();
    } else {
      s = r;
      for (let e = 0; e < this.args.length; ++e) {
        const r = this.args[e];
        s += '$' + t.byteLength(r) + '\r\n' + r + '\r\n';
      }
    }
    return s;
  }
  stringifyArguments() {
    for (let e = 0; e < this.args.length; ++e) {
      const s = this.args[e];
      'string' == typeof s ||
        (s instanceof t
          ? (this.bufferMode = !0)
          : (this.args[e] = (0, bc.toArg)(s)));
    }
  }
  transformReply(e) {
    this.replyEncoding &&
      (e = (0, bc.convertBufferToString)(e, this.replyEncoding));
    const t = Command._transformer.reply[this.name];
    return t && (e = t(e)), e;
  }
  setTimeout(e) {
    this._commandTimeoutTimer ||
      (this._commandTimeoutTimer = setTimeout(() => {
        this.isResolved || this.reject(new Error('Command timed out'));
      }, e));
  }
  initPromise() {
    const e = new Promise((e, t) => {
      if (!this.transformed) {
        this.transformed = !0;
        const e = Command._transformer.argument[this.name];
        e && (this.args = e(this.args)), this.stringifyArguments();
      }
      (this.resolve = this._convertValue(e)),
        this.errorStack
          ? (this.reject = (e) => {
              t(
                (0, bc.optimizeErrorStack)(e, this.errorStack.stack, __dirname)
              );
            })
          : (this.reject = t);
    });
    this.promise = (0, yc.default)(e, this.callback);
  }
  _iterateKeys(e = (e) => e) {
    if (void 0 === this.keys && ((this.keys = []), (0, mc.exists)(this.name))) {
      const t = (0, mc.getKeyIndexes)(this.name, this.args);
      for (const s of t)
        (this.args[s] = e(this.args[s])), this.keys.push(this.args[s]);
    }
    return this.keys;
  }
  _convertValue(e) {
    return (t) => {
      try {
        const s = this._commandTimeoutTimer;
        s && (clearTimeout(s), delete this._commandTimeoutTimer),
          e(this.transformReply(t)),
          (this.isResolved = !0);
      } catch (e) {
        this.reject(e);
      }
      return this.promise;
    };
  }
}
(Ia.default = Command),
  (Command.FLAGS = {
    VALID_IN_SUBSCRIBER_MODE: [
      'subscribe',
      'psubscribe',
      'unsubscribe',
      'punsubscribe',
      'ssubscribe',
      'sunsubscribe',
      'ping',
      'quit'
    ],
    VALID_IN_MONITOR_MODE: ['monitor', 'auth'],
    ENTER_SUBSCRIBER_MODE: ['subscribe', 'psubscribe', 'ssubscribe'],
    EXIT_SUBSCRIBER_MODE: ['unsubscribe', 'punsubscribe', 'sunsubscribe'],
    WILL_DISCONNECT: ['quit']
  }),
  (Command._transformer = { argument: {}, reply: {} });
const msetArgumentTransformer = function (e) {
    if (1 === e.length) {
      if (e[0] instanceof Map) return (0, bc.convertMapToArray)(e[0]);
      if ('object' == typeof e[0] && null !== e[0])
        return (0, bc.convertObjectToArray)(e[0]);
    }
    return e;
  },
  hsetArgumentTransformer = function (e) {
    if (2 === e.length) {
      if (e[1] instanceof Map)
        return [e[0]].concat((0, bc.convertMapToArray)(e[1]));
      if ('object' == typeof e[1] && null !== e[1])
        return [e[0]].concat((0, bc.convertObjectToArray)(e[1]));
    }
    return e;
  };
Command.setArgumentTransformer('mset', msetArgumentTransformer),
  Command.setArgumentTransformer('msetnx', msetArgumentTransformer),
  Command.setArgumentTransformer('hset', hsetArgumentTransformer),
  Command.setArgumentTransformer('hmset', hsetArgumentTransformer),
  Command.setReplyTransformer('hgetall', function (e) {
    if (Array.isArray(e)) {
      const t = {};
      for (let s = 0; s < e.length; s += 2) {
        const r = e[s],
          o = e[s + 1];
        r in t
          ? Object.defineProperty(t, r, {
              value: o,
              configurable: !0,
              enumerable: !0,
              writable: !0
            })
          : (t[r] = o);
      }
      return t;
    }
    return e;
  });
class MixedBuffers {
  constructor() {
    (this.length = 0), (this.items = []);
  }
  push(e) {
    (this.length += t.byteLength(e)), this.items.push(e);
  }
  toBuffer() {
    const e = t.allocUnsafe(this.length);
    let s = 0;
    for (const r of this.items) {
      const o = t.byteLength(r);
      t.isBuffer(r) ? r.copy(e, s) : e.write(r, s, o), (s += o);
    }
    return e;
  }
}
var vc = {};
Object.defineProperty(vc, '__esModule', { value: !0 });
const Sc = Oa;
class ClusterAllFailedError extends Sc.RedisError {
  constructor(e, t) {
    super(e),
      (this.lastNodeError = t),
      Error.captureStackTrace(this, this.constructor);
  }
  get name() {
    return this.constructor.name;
  }
}
(vc.default = ClusterAllFailedError),
  (ClusterAllFailedError.defaultMessage = 'Failed to refresh slots cache.');
var _c = {};
const wc = getDefaultExportFromNamespaceIfNotNamed(_);
Object.defineProperty(_c, '__esModule', { value: !0 });
const kc = wc;
class ScanStream extends kc.Readable {
  constructor(e) {
    super(e),
      (this.opt = e),
      (this._redisCursor = '0'),
      (this._redisDrained = !1);
  }
  _read() {
    if (this._redisDrained) return void this.push(null);
    const e = [this._redisCursor];
    this.opt.key && e.unshift(this.opt.key),
      this.opt.match && e.push('MATCH', this.opt.match),
      this.opt.type && e.push('TYPE', this.opt.type),
      this.opt.count && e.push('COUNT', String(this.opt.count)),
      this.opt.noValues && e.push('NOVALUES'),
      this.opt.redis[this.opt.command](e, (e, s) => {
        e
          ? this.emit('error', e)
          : ((this._redisCursor = s[0] instanceof t ? s[0].toString() : s[0]),
            '0' === this._redisCursor && (this._redisDrained = !0),
            this.push(s[1]));
      });
  }
  close() {
    this._redisDrained = !0;
  }
}
_c.default = ScanStream;
var Cc = {},
  xc = {},
  Rc = {},
  jc = {};
!(function (e) {
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.executeWithAutoPipelining =
      e.getFirstValueInFlattenedArray =
      e.shouldUseAutoPipelining =
      e.notAllowedAutoPipelineCommands =
      e.kCallbacks =
      e.kExec =
        void 0);
  const t = Ha,
    s = La,
    r = Ui;
  function executeAutoPipeline(t, s) {
    if (t._runningAutoPipelines.has(s)) return;
    if (!t._autoPipelines.has(s)) return;
    t._runningAutoPipelines.add(s);
    const r = t._autoPipelines.get(s);
    t._autoPipelines.delete(s);
    const o = r[e.kCallbacks];
    (r[e.kCallbacks] = null),
      r.exec(function (e, r) {
        if ((t._runningAutoPipelines.delete(s), e))
          for (let t = 0; t < o.length; t++) I.nextTick(o[t], e);
        else for (let e = 0; e < o.length; e++) I.nextTick(o[e], ...r[e]);
        t._autoPipelines.has(s) && executeAutoPipeline(t, s);
      });
  }
  function getFirstValueInFlattenedArray(e) {
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if ('string' == typeof r) return r;
      if (Array.isArray(r) || (0, t.isArguments)(r)) {
        if (0 === r.length) continue;
        return r[0];
      }
      const o = [r].flat();
      if (o.length > 0) return o[0];
    }
  }
  (e.kExec = Symbol('exec')),
    (e.kCallbacks = Symbol('callbacks')),
    (e.notAllowedAutoPipelineCommands = [
      'auth',
      'info',
      'script',
      'quit',
      'cluster',
      'pipeline',
      'multi',
      'subscribe',
      'psubscribe',
      'unsubscribe',
      'unpsubscribe',
      'select'
    ]),
    (e.shouldUseAutoPipelining = function (t, s, r) {
      return (
        s &&
        t.options.enableAutoPipelining &&
        !t.isPipeline &&
        !e.notAllowedAutoPipelineCommands.includes(r) &&
        !t.options.autoPipeliningIgnoredCommands.includes(r)
      );
    }),
    (e.getFirstValueInFlattenedArray = getFirstValueInFlattenedArray),
    (e.executeWithAutoPipelining = function executeWithAutoPipelining(
      o,
      a,
      u,
      d,
      f
    ) {
      if (o.isCluster && !o.slots.length)
        return (
          'wait' === o.status && o.connect().catch(t.noop),
          (0, r.default)(
            new Promise(function (e, t) {
              o.delayUntilReady((s) => {
                s
                  ? t(s)
                  : executeWithAutoPipelining(o, a, u, d, null).then(e, t);
              });
            }),
            f
          )
        );
      const m = o.options.keyPrefix || '',
        g = o.isCluster
          ? o.slots[s(`${m}${getFirstValueInFlattenedArray(d)}`)].join(',')
          : 'main';
      if (!o._autoPipelines.has(g)) {
        const t = o.pipeline();
        (t[e.kExec] = !1), (t[e.kCallbacks] = []), o._autoPipelines.set(g, t);
      }
      const v = o._autoPipelines.get(g);
      v[e.kExec] || ((v[e.kExec] = !0), h(executeAutoPipeline, o, g));
      const S = new Promise(function (t, s) {
        v[e.kCallbacks].push(function (e, r) {
          e ? s(e) : t(r);
        }),
          'call' === a && d.unshift(u),
          v[a](...d);
      });
      return (0, r.default)(S, f);
    });
})(jc);
var Ec = {};
const Ac = new Proxy(globalThis.crypto, {
    get: (e, t) =>
      'CryptoKey' === t
        ? globalThis.CryptoKey
        : 'function' == typeof globalThis.crypto[t]
          ? globalThis.crypto[t].bind(globalThis.crypto)
          : globalThis.crypto[t]
  }),
  Tc = notImplemented('crypto.createCipher'),
  Oc = notImplemented('crypto.createDecipher'),
  Ic = notImplemented('crypto.pseudoRandomBytes'),
  Pc = notImplemented('crypto.createCipheriv'),
  Mc = notImplemented('crypto.createDecipheriv'),
  Nc = notImplemented('crypto.createECDH'),
  Lc = notImplemented('crypto.createSign'),
  Dc = notImplemented('crypto.createVerify'),
  Bc = notImplemented('crypto.diffieHellman'),
  Hc = notImplemented('crypto.getCipherInfo'),
  zc = notImplemented('crypto.privateDecrypt'),
  Fc = notImplemented('crypto.privateEncrypt'),
  $c = notImplemented('crypto.publicDecrypt'),
  Uc = notImplemented('crypto.publicEncrypt'),
  qc = notImplemented('crypto.sign'),
  Vc = notImplemented('crypto.verify'),
  Wc = notImplemented('crypto.hash'),
  Kc = notImplementedClass('crypto.Cipher'),
  Qc = notImplementedClass('crypto.Cipheriv'),
  Gc = notImplementedClass('crypto.Decipher'),
  Jc = notImplementedClass('crypto.Decipheriv'),
  Yc = notImplementedClass('crypto.ECDH'),
  Xc = notImplementedClass('crypto.Sign'),
  Zc = notImplementedClass('crypto.Verify'),
  el = {
    OPENSSL_VERSION_NUMBER: 0,
    SSL_OP_ALL: 2147485776,
    SSL_OP_ALLOW_NO_DHE_KEX: 1024,
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
    SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
    SSL_OP_CISCO_ANYCONNECT: 32768,
    SSL_OP_COOKIE_EXCHANGE: 8192,
    SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
    SSL_OP_LEGACY_SERVER_CONNECT: 4,
    SSL_OP_NO_COMPRESSION: 131072,
    SSL_OP_NO_ENCRYPT_THEN_MAC: 524288,
    SSL_OP_NO_QUERY_MTU: 4096,
    SSL_OP_NO_RENEGOTIATION: 1073741824,
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
    SSL_OP_NO_SSLv2: 0,
    SSL_OP_NO_SSLv3: 33554432,
    SSL_OP_NO_TICKET: 16384,
    SSL_OP_NO_TLSv1: 67108864,
    SSL_OP_NO_TLSv1_1: 268435456,
    SSL_OP_NO_TLSv1_2: 134217728,
    SSL_OP_NO_TLSv1_3: 536870912,
    SSL_OP_PRIORITIZE_CHACHA: 2097152,
    SSL_OP_TLS_ROLLBACK_BUG: 8388608,
    ENGINE_METHOD_RSA: 1,
    ENGINE_METHOD_DSA: 2,
    ENGINE_METHOD_DH: 4,
    ENGINE_METHOD_RAND: 8,
    ENGINE_METHOD_EC: 2048,
    ENGINE_METHOD_CIPHERS: 64,
    ENGINE_METHOD_DIGESTS: 128,
    ENGINE_METHOD_PKEY_METHS: 512,
    ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
    ENGINE_METHOD_ALL: 65535,
    ENGINE_METHOD_NONE: 0,
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    RSA_PKCS1_PADDING: 1,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    RSA_PSS_SALTLEN_DIGEST: -1,
    RSA_PSS_SALTLEN_MAX_SIGN: -2,
    RSA_PSS_SALTLEN_AUTO: -2,
    defaultCoreCipherList: '',
    TLS1_VERSION: 0,
    TLS1_1_VERSION: 0,
    TLS1_2_VERSION: 0,
    TLS1_3_VERSION: 0,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6,
    defaultCipherList: ''
  },
  {
    Certificate: tl,
    DiffieHellman: nl,
    DiffieHellmanGroup: sl,
    Hash: rl,
    Hmac: ol,
    KeyObject: il,
    X509Certificate: al,
    checkPrime: cl,
    checkPrimeSync: ll,
    createDiffieHellman: ul,
    createDiffieHellmanGroup: dl,
    createHash: hl,
    createHmac: pl,
    createPrivateKey: fl,
    createPublicKey: ml,
    createSecretKey: gl,
    generateKey: yl,
    generateKeyPair: bl,
    generateKeyPairSync: vl,
    generateKeySync: Sl,
    generatePrime: _l,
    generatePrimeSync: wl,
    getCiphers: kl,
    getCurves: Cl,
    getDiffieHellman: xl,
    getFips: Rl,
    getHashes: jl,
    hkdf: El,
    hkdfSync: Al,
    pbkdf2: Tl,
    pbkdf2Sync: Ol,
    randomBytes: Il,
    randomFill: Pl,
    randomFillSync: Ml,
    randomInt: Nl,
    randomUUID: Ll,
    scrypt: Dl,
    scryptSync: Bl,
    secureHeapUsed: Hl,
    setEngine: zl,
    setFips: Fl,
    subtle: $l,
    timingSafeEqual: Ul,
    fips: ql
  } = C,
  Vl = C.getRandomValues.bind(C.webcrypto),
  Wl = {
    CryptoKey: Ac.CryptoKey,
    getRandomValues: Vl,
    randomUUID: Ll,
    subtle: $l
  },
  Kl = {
    Certificate: tl,
    Cipher: Kc,
    Cipheriv: Qc,
    Decipher: Gc,
    Decipheriv: Jc,
    ECDH: Yc,
    Sign: Xc,
    Verify: Zc,
    X509Certificate: al,
    constants: el,
    createCipheriv: Pc,
    createDecipheriv: Mc,
    createECDH: Nc,
    createSign: Lc,
    createVerify: Dc,
    diffieHellman: Bc,
    getCipherInfo: Hc,
    hash: Wc,
    privateDecrypt: zc,
    privateEncrypt: Fc,
    publicDecrypt: $c,
    publicEncrypt: Uc,
    scrypt: Dl,
    scryptSync: Bl,
    sign: qc,
    verify: Vc,
    createCipher: Tc,
    createDecipher: Oc,
    pseudoRandomBytes: Ic,
    DiffieHellman: nl,
    DiffieHellmanGroup: sl,
    Hash: rl,
    Hmac: ol,
    KeyObject: il,
    checkPrime: cl,
    checkPrimeSync: ll,
    createDiffieHellman: ul,
    createDiffieHellmanGroup: dl,
    createHash: hl,
    createHmac: pl,
    createPrivateKey: fl,
    createPublicKey: ml,
    createSecretKey: gl,
    generateKey: yl,
    generateKeyPair: bl,
    generateKeyPairSync: vl,
    generateKeySync: Sl,
    generatePrime: _l,
    generatePrimeSync: wl,
    getCiphers: kl,
    getCurves: Cl,
    getDiffieHellman: xl,
    getFips: Rl,
    getHashes: jl,
    getRandomValues: Vl,
    hkdf: El,
    hkdfSync: Al,
    pbkdf2: Tl,
    pbkdf2Sync: Ol,
    randomBytes: Il,
    randomFill: Pl,
    randomFillSync: Ml,
    randomInt: Nl,
    randomUUID: Ll,
    secureHeapUsed: Hl,
    setEngine: zl,
    setFips: Fl,
    subtle: $l,
    timingSafeEqual: Ul,
    fips: ql,
    webcrypto: Wl
  },
  Ql = getDefaultExportFromNamespaceIfNotNamed(
    Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          Certificate: tl,
          Cipher: Kc,
          Cipheriv: Qc,
          Decipher: Gc,
          Decipheriv: Jc,
          DiffieHellman: nl,
          DiffieHellmanGroup: sl,
          ECDH: Yc,
          Hash: rl,
          Hmac: ol,
          KeyObject: il,
          Sign: Xc,
          Verify: Zc,
          X509Certificate: al,
          checkPrime: cl,
          checkPrimeSync: ll,
          constants: el,
          createCipheriv: Pc,
          createDecipheriv: Mc,
          createDiffieHellman: ul,
          createDiffieHellmanGroup: dl,
          createECDH: Nc,
          createHash: hl,
          createHmac: pl,
          createPrivateKey: fl,
          createPublicKey: ml,
          createSecretKey: gl,
          createSign: Lc,
          createVerify: Dc,
          default: Kl,
          diffieHellman: Bc,
          fips: ql,
          generateKey: yl,
          generateKeyPair: bl,
          generateKeyPairSync: vl,
          generateKeySync: Sl,
          generatePrime: _l,
          generatePrimeSync: wl,
          getCipherInfo: Hc,
          getCiphers: kl,
          getCurves: Cl,
          getDiffieHellman: xl,
          getFips: Rl,
          getHashes: jl,
          getRandomValues: Vl,
          hash: Wc,
          hkdf: El,
          hkdfSync: Al,
          pbkdf2: Tl,
          pbkdf2Sync: Ol,
          privateDecrypt: zc,
          privateEncrypt: Fc,
          publicDecrypt: $c,
          publicEncrypt: Uc,
          randomBytes: Il,
          randomFill: Pl,
          randomFillSync: Ml,
          randomInt: Nl,
          randomUUID: Ll,
          scrypt: Dl,
          scryptSync: Bl,
          secureHeapUsed: Hl,
          setEngine: zl,
          setFips: Fl,
          sign: qc,
          subtle: $l,
          timingSafeEqual: Ul,
          verify: Vc,
          webcrypto: Wl
        },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    )
  );
Object.defineProperty(Ec, '__esModule', { value: !0 });
const Gl = Ql,
  Jl = Ia,
  Yl = Ui;
(Ec.default = class {
  constructor(e, t = null, s = '', r = !1) {
    (this.lua = e),
      (this.numberOfKeys = t),
      (this.keyPrefix = s),
      (this.readOnly = r),
      (this.sha = (0, Gl.createHash)('sha1').update(e).digest('hex'));
    const o = this.sha,
      a = new WeakSet();
    this.Command = class extends Jl.default {
      toWritable(t) {
        const s = this.reject;
        return (
          (this.reject = (e) => {
            -1 !== e.message.indexOf('NOSCRIPT') && a.delete(t),
              s.call(this, e);
          }),
          a.has(t)
            ? 'eval' === this.name &&
              ((this.name = 'evalsha'), (this.args[0] = o))
            : (a.add(t), (this.name = 'eval'), (this.args[0] = e)),
          super.toWritable(t)
        );
      }
    };
  }
  execute(e, t, s, r) {
    'number' == typeof this.numberOfKeys && t.unshift(this.numberOfKeys),
      this.keyPrefix && (s.keyPrefix = this.keyPrefix),
      this.readOnly && (s.readOnly = !0);
    const o = new this.Command('evalsha', [this.sha, ...t], s);
    return (
      (o.promise = o.promise.catch((r) => {
        if (-1 === r.message.indexOf('NOSCRIPT')) throw r;
        const o = new this.Command('evalsha', [this.sha, ...t], s);
        return (e.isPipeline ? e.redis : e).sendCommand(o);
      })),
      (0, Yl.default)(o.promise, r),
      e.sendCommand(o)
    );
  }
}),
  Object.defineProperty(Rc, '__esModule', { value: !0 });
const Xl = zi,
  Zl = jc,
  eu = Ia,
  tu = Ec;
class Commander {
  constructor() {
    (this.options = {}),
      (this.scriptsSet = {}),
      (this.addedBuiltinSet = new Set());
  }
  getBuiltinCommands() {
    return nu.slice(0);
  }
  createBuiltinCommand(e) {
    return {
      string: generateFunction(null, e, 'utf8'),
      buffer: generateFunction(null, e, null)
    };
  }
  addBuiltinCommand(e) {
    this.addedBuiltinSet.add(e),
      (this[e] = generateFunction(e, e, 'utf8')),
      (this[e + 'Buffer'] = generateFunction(e + 'Buffer', e, null));
  }
  defineCommand(e, t) {
    const s = new tu.default(
      t.lua,
      t.numberOfKeys,
      this.options.keyPrefix,
      t.readOnly
    );
    (this.scriptsSet[e] = s),
      (this[e] = generateScriptingFunction(e, e, s, 'utf8')),
      (this[e + 'Buffer'] = generateScriptingFunction(
        e + 'Buffer',
        e,
        s,
        null
      ));
  }
  sendCommand(e, t, s) {
    throw new Error('"sendCommand" is not implemented');
  }
}
const nu = Xl.list.filter((e) => 'monitor' !== e);
function generateFunction(e, t, s) {
  return (
    void 0 === s && ((s = t), (t = null)),
    function (...r) {
      const o = t || r.shift();
      let a = r[r.length - 1];
      'function' == typeof a ? r.pop() : (a = void 0);
      const u = {
        errorStack: this.options.showFriendlyErrorStack ? new Error() : void 0,
        keyPrefix: this.options.keyPrefix,
        replyEncoding: s
      };
      return (0, Zl.shouldUseAutoPipelining)(this, e, o)
        ? (0, Zl.executeWithAutoPipelining)(this, e, o, r, a)
        : this.sendCommand(new eu.default(o, r, u, a));
    }
  );
}
function generateScriptingFunction(e, t, s, r) {
  return function (...o) {
    const a = 'function' == typeof o[o.length - 1] ? o.pop() : void 0,
      u = { replyEncoding: r };
    return (
      this.options.showFriendlyErrorStack && (u.errorStack = new Error()),
      (0, Zl.shouldUseAutoPipelining)(this, e, t)
        ? (0, Zl.executeWithAutoPipelining)(this, e, t, o, a)
        : s.execute(this, o, u, a)
    );
  };
}
nu.push('sentinel'),
  nu.forEach(function (e) {
    (Commander.prototype[e] = generateFunction(e, e, 'utf8')),
      (Commander.prototype[e + 'Buffer'] = generateFunction(
        e + 'Buffer',
        e,
        null
      ));
  }),
  (Commander.prototype.call = generateFunction('call', 'utf8')),
  (Commander.prototype.callBuffer = generateFunction('callBuffer', null)),
  (Commander.prototype.send_command = Commander.prototype.call),
  (Rc.default = Commander),
  Object.defineProperty(xc, '__esModule', { value: !0 });
const su = La,
  ru = zi,
  ou = Ui,
  iu = Ra,
  au = Ia,
  cu = Da,
  lu = Rc;
class Pipeline extends lu.default {
  constructor(e) {
    super(),
      (this.redis = e),
      (this.isPipeline = !0),
      (this.replyPending = 0),
      (this._queue = []),
      (this._result = []),
      (this._transactions = 0),
      (this._shaToScript = {}),
      (this.isCluster =
        'Cluster' === this.redis.constructor.name || this.redis.isCluster),
      (this.options = e.options),
      Object.keys(e.scriptsSet).forEach((t) => {
        const s = e.scriptsSet[t];
        (this._shaToScript[s.sha] = s),
          (this[t] = e[t]),
          (this[t + 'Buffer'] = e[t + 'Buffer']);
      }),
      e.addedBuiltinSet.forEach((t) => {
        (this[t] = e[t]), (this[t + 'Buffer'] = e[t + 'Buffer']);
      }),
      (this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      }));
    const t = this;
    Object.defineProperty(this, 'length', {
      get: function () {
        return t._queue.length;
      }
    });
  }
  fillResult(e, t) {
    if ('exec' === this._queue[t].name && Array.isArray(e[1])) {
      const s = e[1].length;
      for (let r = 0; r < s; r++) {
        if (e[1][r] instanceof Error) continue;
        const o = this._queue[t - (s - r)];
        try {
          e[1][r] = o.transformReply(e[1][r]);
        } catch (t) {
          e[1][r] = t;
        }
      }
    }
    if (((this._result[t] = e), --this.replyPending)) return;
    if (this.isCluster) {
      let e,
        t = !0;
      for (let s = 0; s < this._result.length; ++s) {
        const r = this._result[s][0],
          o = this._queue[s];
        if (r) {
          if (
            'exec' === o.name &&
            'EXECABORT Transaction discarded because of previous errors.' ===
              r.message
          )
            continue;
          if (e) {
            if (e.name !== r.name || e.message !== r.message) {
              t = !1;
              break;
            }
          } else e = { name: r.name, message: r.message };
        } else if (!o.inTransaction) {
          if (
            !((0, ru.exists)(o.name) && (0, ru.hasFlag)(o.name, 'readonly'))
          ) {
            t = !1;
            break;
          }
        }
      }
      if (e && t) {
        const t = this,
          s = e.message.split(' '),
          r = this._queue;
        let o = !1;
        this._queue = [];
        for (let e = 0; e < r.length; ++e) {
          if (
            !(
              'ASK' !== s[0] ||
              o ||
              'asking' === r[e].name ||
              (r[e - 1] && 'asking' === r[e - 1].name)
            )
          ) {
            const e = new au.default('asking');
            (e.ignore = !0), this.sendCommand(e);
          }
          r[e].initPromise(), this.sendCommand(r[e]), (o = r[e].inTransaction);
        }
        let a = !0;
        void 0 === this.leftRedirections && (this.leftRedirections = {});
        const exec = function () {
            t.exec();
          },
          u = this.redis;
        if (
          (u.handleError(e, this.leftRedirections, {
            moved: function (e, r) {
              (t.preferKey = r),
                (u.slots[s[1]] = [r]),
                (u._groupsBySlot[s[1]] = u._groupsIds[u.slots[s[1]].join(';')]),
                u.refreshSlotsCache(),
                t.exec();
            },
            ask: function (e, s) {
              (t.preferKey = s), t.exec();
            },
            tryagain: exec,
            clusterDown: exec,
            connectionClosed: exec,
            maxRedirections: () => {
              a = !1;
            },
            defaults: () => {
              a = !1;
            }
          }),
          a)
        )
          return;
      }
    }
    let s = 0;
    for (let e = 0; e < this._queue.length - s; ++e)
      this._queue[e + s].ignore && (s += 1),
        (this._result[e] = this._result[e + s]);
    this.resolve(this._result.slice(0, this._result.length - s));
  }
  sendCommand(e) {
    this._transactions > 0 && (e.inTransaction = !0);
    const t = this._queue.length;
    return (
      (e.pipelineIndex = t),
      e.promise
        .then((e) => {
          this.fillResult([null, e], t);
        })
        .catch((e) => {
          this.fillResult([e], t);
        }),
      this._queue.push(e),
      this
    );
  }
  addBatch(e) {
    let t, s, r;
    for (let o = 0; o < e.length; ++o)
      (t = e[o]), (s = t[0]), (r = t.slice(1)), this[s].apply(this, r);
    return this;
  }
}
xc.default = Pipeline;
const uu = Pipeline.prototype.multi;
Pipeline.prototype.multi = function () {
  return (this._transactions += 1), uu.apply(this, arguments);
};
const du = Pipeline.prototype.execBuffer;
(Pipeline.prototype.execBuffer = (0, iu.deprecate)(function () {
  return (
    this._transactions > 0 && (this._transactions -= 1),
    du.apply(this, arguments)
  );
}, 'Pipeline#execBuffer: Use Pipeline#exec instead')),
  (Pipeline.prototype.exec = function (e) {
    if (this.isCluster && !this.redis.slots.length)
      return (
        'wait' === this.redis.status && this.redis.connect().catch(cu.noop),
        e &&
          !this.nodeifiedPromise &&
          ((this.nodeifiedPromise = !0), (0, ou.default)(this.promise, e)),
        this.redis.delayUntilReady((t) => {
          t ? this.reject(t) : this.exec(e);
        }),
        this.promise
      );
    if (this._transactions > 0)
      return (this._transactions -= 1), du.apply(this, arguments);
    let s;
    if (
      (this.nodeifiedPromise ||
        ((this.nodeifiedPromise = !0), (0, ou.default)(this.promise, e)),
      this._queue.length || this.resolve([]),
      this.isCluster)
    ) {
      const e = [];
      for (let t = 0; t < this._queue.length; t++) {
        const s = this._queue[t].getKeys();
        if ((s.length && e.push(s[0]), s.length && su.generateMulti(s) < 0))
          return (
            this.reject(
              new Error(
                'All the keys in a pipeline command should belong to the same slot'
              )
            ),
            this.promise
          );
      }
      if (e.length) {
        if (
          ((s = (function (e, t) {
            const s = su(t[0]),
              r = e._groupsBySlot[s];
            for (let s = 1; s < t.length; s++)
              if (e._groupsBySlot[su(t[s])] !== r) return -1;
            return s;
          })(this.redis, e)),
          s < 0)
        )
          return (
            this.reject(
              new Error(
                'All keys in the pipeline should belong to the same slots allocation group'
              )
            ),
            this.promise
          );
      } else s = (16384 * Math.random()) | 0;
    }
    const r = this;
    return (
      (function () {
        let e,
          o = (r.replyPending = r._queue.length);
        r.isCluster &&
          (e = {
            slot: s,
            redis: r.redis.connectionPool.nodes.all[r.preferKey]
          });
        let a,
          u = '';
        const d = {
          isPipeline: !0,
          destination: r.isCluster ? e : { redis: r.redis },
          write(e) {
            'string' != typeof e
              ? (a || (a = []),
                u && (a.push(t.from(u, 'utf8')), (u = '')),
                a.push(e))
              : (u += e),
              --o ||
                (a
                  ? (u && a.push(t.from(u, 'utf8')),
                    d.destination.redis.stream.write(t.concat(a)))
                  : d.destination.redis.stream.write(u),
                (o = r._queue.length),
                (u = ''),
                (a = void 0));
          }
        };
        for (let t = 0; t < r._queue.length; ++t)
          r.redis.sendCommand(r._queue[t], d, e);
        r.promise;
      })(),
      this.promise
    );
  }),
  Object.defineProperty(Cc, '__esModule', { value: !0 }),
  (Cc.addTransactionSupport = void 0);
const hu = Da,
  pu = Ui,
  fu = xc;
Cc.addTransactionSupport = function (e) {
  e.pipeline = function (e) {
    const t = new fu.default(this);
    return Array.isArray(e) && t.addBatch(e), t;
  };
  const { multi: t } = e;
  e.multi = function (e, s) {
    if (
      (void 0 !== s || Array.isArray(e) || ((s = e), (e = null)),
      s && !1 === s.pipeline)
    )
      return t.call(this);
    const r = new fu.default(this);
    r.multi(), Array.isArray(e) && r.addBatch(e);
    const o = r.exec;
    r.exec = function (e) {
      if (this.isCluster && !this.redis.slots.length)
        return (
          'wait' === this.redis.status && this.redis.connect().catch(hu.noop),
          (0, pu.default)(
            new Promise((e, t) => {
              this.redis.delayUntilReady((s) => {
                s ? t(s) : this.exec(r).then(e, t);
              });
            }),
            e
          )
        );
      if ((this._transactions > 0 && o.call(r), this.nodeifiedPromise))
        return o.call(r);
      const t = o.call(r);
      return (0, pu.default)(
        t.then(function (e) {
          const t = e[e.length - 1];
          if (void 0 === t)
            throw new Error(
              'Pipeline cannot be used to send any commands when the `exec()` has been called on it.'
            );
          if (t[0]) {
            t[0].previousErrors = [];
            for (let s = 0; s < e.length - 1; ++s)
              e[s][0] && t[0].previousErrors.push(e[s][0]);
            throw t[0];
          }
          return (0, hu.wrapMultiResult)(t[1]);
        }),
        e
      );
    };
    const { execBuffer: a } = r;
    return (
      (r.execBuffer = function (e) {
        return this._transactions > 0 && a.call(r), r.exec(e);
      }),
      r
    );
  };
  const { exec: s } = e;
  e.exec = function (e) {
    return (0, pu.default)(
      s.call(this).then(function (e) {
        return Array.isArray(e) && (e = (0, hu.wrapMultiResult)(e)), e;
      }),
      e
    );
  };
};
var mu = {};
Object.defineProperty(mu, '__esModule', { value: !0 }),
  (mu.default = function (e, t) {
    Object.getOwnPropertyNames(t.prototype).forEach((s) => {
      Object.defineProperty(
        e.prototype,
        s,
        Object.getOwnPropertyDescriptor(t.prototype, s)
      );
    });
  });
var gu = {};
const yu = getDefaultExportFromNamespaceIfNotNamed(R);
Object.defineProperty(gu, '__esModule', { value: !0 }),
  (gu.DEFAULT_CLUSTER_OPTIONS = void 0);
const bu = yu;
gu.DEFAULT_CLUSTER_OPTIONS = {
  clusterRetryStrategy: (e) => Math.min(100 + 2 * e, 2e3),
  enableOfflineQueue: !0,
  enableReadyCheck: !0,
  scaleReads: 'master',
  maxRedirections: 16,
  retryDelayOnMoved: 0,
  retryDelayOnFailover: 100,
  retryDelayOnClusterDown: 100,
  retryDelayOnTryAgain: 100,
  slotsRefreshTimeout: 1e3,
  useSRVRecords: !1,
  resolveSrv: bu.resolveSrv,
  dnsLookup: bu.lookup,
  enableAutoPipelining: !1,
  autoPipeliningIgnoredCommands: [],
  shardedSubscribers: !1
};
var vu = {},
  Su = {};
const _u = getDefaultExportFromNamespaceIfNotNamed(a);
Object.defineProperty(Su, '__esModule', { value: !0 }),
  (Su.getConnectionName =
    Su.weightSrvRecords =
    Su.groupSrvRecords =
    Su.getUniqueHostnamesFromOptions =
    Su.normalizeNodeOptions =
    Su.nodeKeyToRedisOptions =
    Su.getNodeKey =
      void 0);
const wu = Da,
  ku = _u;
var Cu;
function requireClusterSubscriber() {
  if (Cu) return vu;
  (Cu = 1), Object.defineProperty(vu, '__esModule', { value: !0 });
  const e = Su,
    t = Da,
    s = requireRedis(),
    r = (0, t.Debug)('cluster:subscriber');
  return (
    (vu.default = class {
      constructor(t, s, o = !1) {
        (this.connectionPool = t),
          (this.emitter = s),
          (this.isSharded = o),
          (this.started = !1),
          (this.subscriber = null),
          (this.slotRange = []),
          (this.onSubscriberEnd = () => {
            this.started
              ? (r('subscriber has disconnected, selecting a new one...'),
                this.selectSubscriber())
              : r(
                  'subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.'
                );
          }),
          this.connectionPool.on('-node', (t, s) => {
            this.started &&
              this.subscriber &&
              (0, e.getNodeKey)(this.subscriber.options) === s &&
              (r('subscriber has left, selecting a new one...'),
              this.selectSubscriber());
          }),
          this.connectionPool.on('+node', () => {
            this.started &&
              !this.subscriber &&
              (r(
                'a new node is discovered and there is no subscriber, selecting a new one...'
              ),
              this.selectSubscriber());
          });
      }
      getInstance() {
        return this.subscriber;
      }
      associateSlotRange(e) {
        return this.isSharded && (this.slotRange = e), this.slotRange;
      }
      start() {
        (this.started = !0), this.selectSubscriber(), r('started');
      }
      stop() {
        (this.started = !1),
          this.subscriber &&
            (this.subscriber.disconnect(), (this.subscriber = null));
      }
      isStarted() {
        return this.started;
      }
      selectSubscriber() {
        const o = this.lastActiveSubscriber;
        o && (o.off('end', this.onSubscriberEnd), o.disconnect()),
          this.subscriber &&
            (this.subscriber.off('end', this.onSubscriberEnd),
            this.subscriber.disconnect());
        const a = (0, t.sample)(this.connectionPool.getNodes());
        if (!a)
          return (
            r(
              'selecting subscriber failed since there is no node discovered in the cluster yet'
            ),
            void (this.subscriber = null)
          );
        const { options: u } = a;
        r('selected a subscriber %s:%s', u.host, u.port);
        let d = 'subscriber';
        this.isSharded && (d = 'ssubscriber'),
          (this.subscriber = new s.default({
            port: u.port,
            host: u.host,
            username: u.username,
            password: u.password,
            enableReadyCheck: !0,
            connectionName: (0, e.getConnectionName)(d, u.connectionName),
            lazyConnect: !0,
            tls: u.tls,
            retryStrategy: null
          })),
          this.subscriber.on('error', t.noop),
          this.subscriber.once('end', this.onSubscriberEnd);
        const h = { subscribe: [], psubscribe: [], ssubscribe: [] };
        if (o) {
          const e = o.condition || o.prevCondition;
          e &&
            e.subscriber &&
            ((h.subscribe = e.subscriber.channels('subscribe')),
            (h.psubscribe = e.subscriber.channels('psubscribe')),
            (h.ssubscribe = e.subscriber.channels('ssubscribe')));
        }
        if (h.subscribe.length || h.psubscribe.length || h.ssubscribe.length) {
          let e = 0;
          for (const t of ['subscribe', 'psubscribe', 'ssubscribe']) {
            const s = h[t];
            s.length &&
              ((e += 1),
              r('%s %d channels', t, s.length),
              this.subscriber[t](s)
                .then(() => {
                  --e || (this.lastActiveSubscriber = this.subscriber);
                })
                .catch(() => {
                  r('failed to %s %d channels', t, s.length);
                }));
          }
        } else this.lastActiveSubscriber = this.subscriber;
        for (const e of ['message', 'messageBuffer'])
          this.subscriber.on(e, (t, s) => {
            this.emitter.emit(e, t, s);
          });
        for (const e of ['pmessage', 'pmessageBuffer'])
          this.subscriber.on(e, (t, s, r) => {
            this.emitter.emit(e, t, s, r);
          });
        if (1 == this.isSharded)
          for (const e of ['smessage', 'smessageBuffer'])
            this.subscriber.on(e, (t, s) => {
              this.emitter.emit(e, t, s);
            });
      }
    }),
    vu
  );
}
(Su.getNodeKey = function (e) {
  return (
    (e.port = e.port || 6379),
    (e.host = e.host || '127.0.0.1'),
    e.host + ':' + e.port
  );
}),
  (Su.nodeKeyToRedisOptions = function (e) {
    const t = e.lastIndexOf(':');
    if (-1 === t) throw new Error(`Invalid node key ${e}`);
    return { host: e.slice(0, t), port: Number(e.slice(t + 1)) };
  }),
  (Su.normalizeNodeOptions = function (e) {
    return e.map((e) => {
      const t = {};
      if ('object' == typeof e) Object.assign(t, e);
      else if ('string' == typeof e) Object.assign(t, (0, wu.parseURL)(e));
      else {
        if ('number' != typeof e) throw new Error('Invalid argument ' + e);
        t.port = e;
      }
      return (
        'string' == typeof t.port && (t.port = parseInt(t.port, 10)),
        delete t.db,
        t.port || (t.port = 6379),
        t.host || (t.host = '127.0.0.1'),
        (0, wu.resolveTLSProfile)(t)
      );
    });
  }),
  (Su.getUniqueHostnamesFromOptions = function (e) {
    const t = {};
    return (
      e.forEach((e) => {
        t[e.host] = !0;
      }),
      Object.keys(t).filter((e) => !(0, ku.isIP)(e))
    );
  }),
  (Su.groupSrvRecords = function (e) {
    const t = {};
    for (const s of e)
      t.hasOwnProperty(s.priority)
        ? ((t[s.priority].totalWeight += s.weight),
          t[s.priority].records.push(s))
        : (t[s.priority] = { totalWeight: s.weight, records: [s] });
    return t;
  }),
  (Su.weightSrvRecords = function (e) {
    if (1 === e.records.length) return (e.totalWeight = 0), e.records.shift();
    const t = Math.floor(Math.random() * (e.totalWeight + e.records.length));
    let s = 0;
    for (const [r, o] of e.records.entries())
      if (((s += 1 + o.weight), s > t))
        return (e.totalWeight -= o.weight), e.records.splice(r, 1), o;
  }),
  (Su.getConnectionName = function (e, t) {
    const s = `ioredis-cluster(${e})`;
    return t ? `${s}:${t}` : s;
  });
var xu,
  Ru = {};
function requireConnectionPool() {
  if (xu) return Ru;
  (xu = 1), Object.defineProperty(Ru, '__esModule', { value: !0 });
  const e = $i,
    t = Da,
    s = Su,
    r = requireRedis(),
    o = (0, t.Debug)('cluster:connectionPool');
  let a = class extends e.EventEmitter {
    constructor(e) {
      super(),
        (this.redisOptions = e),
        (this.nodes = { all: {}, master: {}, slave: {} }),
        (this.specifiedOptions = {});
    }
    getNodes(e = 'all') {
      const t = this.nodes[e];
      return Object.keys(t).map((e) => t[e]);
    }
    getInstanceByKey(e) {
      return this.nodes.all[e];
    }
    getSampleInstance(e) {
      const s = Object.keys(this.nodes[e]),
        r = (0, t.sample)(s);
      return this.nodes[e][r];
    }
    addMasterNode(e) {
      const t = (0, s.getNodeKey)(e.options),
        r = this.createRedisFromOptions(e, e.options.readOnly);
      return (
        !e.options.readOnly &&
        ((this.nodes.all[t] = r), (this.nodes.master[t] = r), !0)
      );
    }
    createRedisFromOptions(e, s) {
      return new r.default(
        (0, t.defaults)(
          { retryStrategy: null, enableOfflineQueue: !0, readOnly: s },
          e,
          this.redisOptions,
          { lazyConnect: !0 }
        )
      );
    }
    findOrCreate(e, r = !1) {
      const a = (0, s.getNodeKey)(e);
      let u;
      return (
        (r = Boolean(r)),
        this.specifiedOptions[a]
          ? Object.assign(e, this.specifiedOptions[a])
          : (this.specifiedOptions[a] = e),
        this.nodes.all[a]
          ? ((u = this.nodes.all[a]),
            u.options.readOnly !== r &&
              ((u.options.readOnly = r),
              o('Change role of %s to %s', a, r ? 'slave' : 'master'),
              u[r ? 'readonly' : 'readwrite']().catch(t.noop),
              r
                ? (delete this.nodes.master[a], (this.nodes.slave[a] = u))
                : (delete this.nodes.slave[a], (this.nodes.master[a] = u))))
          : (o('Connecting to %s as %s', a, r ? 'slave' : 'master'),
            (u = this.createRedisFromOptions(e, r)),
            (this.nodes.all[a] = u),
            (this.nodes[r ? 'slave' : 'master'][a] = u),
            u.once('end', () => {
              this.removeNode(a),
                this.emit('-node', u, a),
                Object.keys(this.nodes.all).length || this.emit('drain');
            }),
            this.emit('+node', u, a),
            u.on('error', function (e) {
              this.emit('nodeError', e, a);
            })),
        u
      );
    }
    reset(e) {
      o('Reset with %O', e);
      const t = {};
      e.forEach((e) => {
        const r = (0, s.getNodeKey)(e);
        (e.readOnly && t[r]) || (t[r] = e);
      }),
        Object.keys(this.nodes.all).forEach((e) => {
          t[e] ||
            (o('Disconnect %s because the node does not hold any slot', e),
            this.nodes.all[e].disconnect(),
            this.removeNode(e));
        }),
        Object.keys(t).forEach((e) => {
          const s = t[e];
          this.findOrCreate(s, s.readOnly);
        });
    }
    removeNode(e) {
      const { nodes: t } = this;
      t.all[e] && (o('Remove %s from the pool', e), delete t.all[e]),
        delete t.master[e],
        delete t.slave[e];
    }
  };
  return (Ru.default = a), Ru;
}
var ju = {};
function Denque(e, t) {
  t = t || {};
  (this._capacity = t.capacity),
    (this._head = 0),
    (this._tail = 0),
    Array.isArray(e)
      ? this._fromArray(e)
      : ((this._capacityMask = 3), (this._list = new Array(4)));
}
(Denque.prototype.peekAt = function (e) {
  var t = e;
  if (t === (0 | t)) {
    var s = this.size();
    if (!(t >= s || t < -s))
      return (
        t < 0 && (t += s),
        (t = (this._head + t) & this._capacityMask),
        this._list[t]
      );
  }
}),
  (Denque.prototype.get = function (e) {
    return this.peekAt(e);
  }),
  (Denque.prototype.peek = function () {
    if (this._head !== this._tail) return this._list[this._head];
  }),
  (Denque.prototype.peekFront = function () {
    return this.peek();
  }),
  (Denque.prototype.peekBack = function () {
    return this.peekAt(-1);
  }),
  Object.defineProperty(Denque.prototype, 'length', {
    get: function () {
      return this.size();
    }
  }),
  (Denque.prototype.size = function () {
    return this._head === this._tail
      ? 0
      : this._head < this._tail
        ? this._tail - this._head
        : this._capacityMask + 1 - (this._head - this._tail);
  }),
  (Denque.prototype.unshift = function (e) {
    if (0 === arguments.length) return this.size();
    var t = this._list.length;
    return (
      (this._head = (this._head - 1 + t) & this._capacityMask),
      (this._list[this._head] = e),
      this._tail === this._head && this._growArray(),
      this._capacity && this.size() > this._capacity && this.pop(),
      this._head < this._tail
        ? this._tail - this._head
        : this._capacityMask + 1 - (this._head - this._tail)
    );
  }),
  (Denque.prototype.shift = function () {
    var e = this._head;
    if (e !== this._tail) {
      var t = this._list[e];
      return (
        (this._list[e] = void 0),
        (this._head = (e + 1) & this._capacityMask),
        e < 2 &&
          this._tail > 1e4 &&
          this._tail <= this._list.length >>> 2 &&
          this._shrinkArray(),
        t
      );
    }
  }),
  (Denque.prototype.push = function (e) {
    if (0 === arguments.length) return this.size();
    var t = this._tail;
    return (
      (this._list[t] = e),
      (this._tail = (t + 1) & this._capacityMask),
      this._tail === this._head && this._growArray(),
      this._capacity && this.size() > this._capacity && this.shift(),
      this._head < this._tail
        ? this._tail - this._head
        : this._capacityMask + 1 - (this._head - this._tail)
    );
  }),
  (Denque.prototype.pop = function () {
    var e = this._tail;
    if (e !== this._head) {
      var t = this._list.length;
      this._tail = (e - 1 + t) & this._capacityMask;
      var s = this._list[this._tail];
      return (
        (this._list[this._tail] = void 0),
        this._head < 2 && e > 1e4 && e <= t >>> 2 && this._shrinkArray(),
        s
      );
    }
  }),
  (Denque.prototype.removeOne = function (e) {
    var t = e;
    if (t === (0 | t) && this._head !== this._tail) {
      var s = this.size(),
        r = this._list.length;
      if (!(t >= s || t < -s)) {
        t < 0 && (t += s), (t = (this._head + t) & this._capacityMask);
        var o,
          a = this._list[t];
        if (e < s / 2) {
          for (o = e; o > 0; o--)
            this._list[t] = this._list[(t = (t - 1 + r) & this._capacityMask)];
          (this._list[t] = void 0),
            (this._head = (this._head + 1 + r) & this._capacityMask);
        } else {
          for (o = s - 1 - e; o > 0; o--)
            this._list[t] = this._list[(t = (t + 1 + r) & this._capacityMask)];
          (this._list[t] = void 0),
            (this._tail = (this._tail - 1 + r) & this._capacityMask);
        }
        return a;
      }
    }
  }),
  (Denque.prototype.remove = function (e, t) {
    var s,
      r = e,
      o = t;
    if (r === (0 | r) && this._head !== this._tail) {
      var a = this.size(),
        u = this._list.length;
      if (!(r >= a || r < -a || t < 1)) {
        if ((r < 0 && (r += a), 1 === t || !t))
          return ((s = new Array(1))[0] = this.removeOne(r)), s;
        if (0 === r && r + t >= a) return (s = this.toArray()), this.clear(), s;
        var d;
        for (r + t > a && (t = a - r), s = new Array(t), d = 0; d < t; d++)
          s[d] = this._list[(this._head + r + d) & this._capacityMask];
        if (((r = (this._head + r) & this._capacityMask), e + t === a)) {
          for (
            this._tail = (this._tail - t + u) & this._capacityMask, d = t;
            d > 0;
            d--
          )
            this._list[(r = (r + 1 + u) & this._capacityMask)] = void 0;
          return s;
        }
        if (0 === e) {
          for (
            this._head = (this._head + t + u) & this._capacityMask, d = t - 1;
            d > 0;
            d--
          )
            this._list[(r = (r + 1 + u) & this._capacityMask)] = void 0;
          return s;
        }
        if (r < a / 2) {
          for (
            this._head = (this._head + e + t + u) & this._capacityMask, d = e;
            d > 0;
            d--
          )
            this.unshift(this._list[(r = (r - 1 + u) & this._capacityMask)]);
          for (r = (this._head - 1 + u) & this._capacityMask; o > 0; )
            (this._list[(r = (r - 1 + u) & this._capacityMask)] = void 0), o--;
          e < 0 && (this._tail = r);
        } else {
          for (
            this._tail = r,
              r = (r + t + u) & this._capacityMask,
              d = a - (t + e);
            d > 0;
            d--
          )
            this.push(this._list[r++]);
          for (r = this._tail; o > 0; )
            (this._list[(r = (r + 1 + u) & this._capacityMask)] = void 0), o--;
        }
        return (
          this._head < 2 &&
            this._tail > 1e4 &&
            this._tail <= u >>> 2 &&
            this._shrinkArray(),
          s
        );
      }
    }
  }),
  (Denque.prototype.splice = function (e, t) {
    var s = e;
    if (s === (0 | s)) {
      var r = this.size();
      if ((s < 0 && (s += r), !(s > r))) {
        if (arguments.length > 2) {
          var o,
            a,
            u,
            d = arguments.length,
            h = this._list.length,
            f = 2;
          if (!r || s < r / 2) {
            for (a = new Array(s), o = 0; o < s; o++)
              a[o] = this._list[(this._head + o) & this._capacityMask];
            for (
              0 === t
                ? ((u = []),
                  s > 0 &&
                    (this._head = (this._head + s + h) & this._capacityMask))
                : ((u = this.remove(s, t)),
                  (this._head = (this._head + s + h) & this._capacityMask));
              d > f;

            )
              this.unshift(arguments[--d]);
            for (o = s; o > 0; o--) this.unshift(a[o - 1]);
          } else {
            var m = (a = new Array(r - (s + t))).length;
            for (o = 0; o < m; o++)
              a[o] = this._list[(this._head + s + t + o) & this._capacityMask];
            for (
              0 === t
                ? ((u = []),
                  s != r &&
                    (this._tail = (this._head + s + h) & this._capacityMask))
                : ((u = this.remove(s, t)),
                  (this._tail = (this._tail - m + h) & this._capacityMask));
              f < d;

            )
              this.push(arguments[f++]);
            for (o = 0; o < m; o++) this.push(a[o]);
          }
          return u;
        }
        return this.remove(s, t);
      }
    }
  }),
  (Denque.prototype.clear = function () {
    (this._list = new Array(this._list.length)),
      (this._head = 0),
      (this._tail = 0);
  }),
  (Denque.prototype.isEmpty = function () {
    return this._head === this._tail;
  }),
  (Denque.prototype.toArray = function () {
    return this._copyArray(!1);
  }),
  (Denque.prototype._fromArray = function (e) {
    var t = e.length,
      s = this._nextPowerOf2(t);
    (this._list = new Array(s)), (this._capacityMask = s - 1), (this._tail = t);
    for (var r = 0; r < t; r++) this._list[r] = e[r];
  }),
  (Denque.prototype._copyArray = function (e, t) {
    var s = this._list,
      r = s.length,
      o = this.length;
    if ((t |= o) == o && this._head < this._tail)
      return this._list.slice(this._head, this._tail);
    var a,
      u = new Array(t),
      d = 0;
    if (e || this._head > this._tail) {
      for (a = this._head; a < r; a++) u[d++] = s[a];
      for (a = 0; a < this._tail; a++) u[d++] = s[a];
    } else for (a = this._head; a < this._tail; a++) u[d++] = s[a];
    return u;
  }),
  (Denque.prototype._growArray = function () {
    if (0 != this._head) {
      var e = this._copyArray(!0, this._list.length << 1);
      (this._tail = this._list.length), (this._head = 0), (this._list = e);
    } else (this._tail = this._list.length), (this._list.length <<= 1);
    this._capacityMask = (this._capacityMask << 1) | 1;
  }),
  (Denque.prototype._shrinkArray = function () {
    (this._list.length >>>= 1), (this._capacityMask >>>= 1);
  }),
  (Denque.prototype._nextPowerOf2 = function (e) {
    var t = 1 << (Math.log(e) / Math.log(2) + 1);
    return Math.max(t, 4);
  });
var Eu = Denque;
Object.defineProperty(ju, '__esModule', { value: !0 });
const Au = Eu,
  Tu = (0, Da.Debug)('delayqueue');
ju.default = class {
  constructor() {
    (this.queues = {}), (this.timeouts = {});
  }
  push(e, t, s) {
    const r = s.callback || I.nextTick;
    this.queues[e] || (this.queues[e] = new Au());
    this.queues[e].push(t),
      this.timeouts[e] ||
        (this.timeouts[e] = setTimeout(() => {
          r(() => {
            (this.timeouts[e] = null), this.execute(e);
          });
        }, s.timeout));
  }
  execute(e) {
    const t = this.queues[e];
    if (!t) return;
    const { length: s } = t;
    if (s)
      for (
        Tu('send %d commands in %s queue', s, e), this.queues[e] = null;
        t.length > 0;

      )
        t.shift()();
  }
};
var Ou,
  Iu,
  Pu = {};
function requireClusterSubscriberGroup() {
  if (Ou) return Pu;
  (Ou = 1), Object.defineProperty(Pu, '__esModule', { value: !0 });
  const e = Da,
    t = requireClusterSubscriber(),
    s = requireConnectionPool(),
    r = Su,
    o = La,
    a = (0, e.Debug)('cluster:subscriberGroup');
  return (
    (Pu.default = class {
      constructor(e) {
        (this.cluster = e),
          (this.shardedSubscribers = new Map()),
          (this.clusterSlots = []),
          (this.subscriberToSlotsIndex = new Map()),
          (this.channels = new Map()),
          e.on('+node', (e) => {
            this._addSubscriber(e);
          }),
          e.on('-node', (e) => {
            this._removeSubscriber(e);
          }),
          e.on('refresh', () => {
            this._refreshSlots(e);
          });
      }
      getResponsibleSubscriber(e) {
        const t = this.clusterSlots[e][0];
        return this.shardedSubscribers.get(t);
      }
      addChannels(e) {
        const t = o(e[0]);
        e.forEach((e) => {
          if (o(e) != t) return -1;
        });
        const s = this.channels.get(t);
        return (
          s ? this.channels.set(t, s.concat(e)) : this.channels.set(t, e),
          [...this.channels.values()].flatMap((e) => e).length
        );
      }
      removeChannels(e) {
        const t = o(e[0]);
        e.forEach((e) => {
          if (o(e) != t) return -1;
        });
        const s = this.channels.get(t);
        if (s) {
          const r = s.filter((t) => !e.includes(t));
          this.channels.set(t, r);
        }
        return [...this.channels.values()].flatMap((e) => e).length;
      }
      stop() {
        for (const e of this.shardedSubscribers.values()) e.stop();
      }
      start() {
        for (const e of this.shardedSubscribers.values())
          e.isStarted() || e.start();
      }
      _addSubscriber(e) {
        const o = new s.default(e.options);
        if (o.addMasterNode(e)) {
          const s = new t.default(o, this.cluster, !0),
            a = (0, r.getNodeKey)(e.options);
          return (
            this.shardedSubscribers.set(a, s),
            s.start(),
            this._resubscribe(),
            this.cluster.emit('+subscriber'),
            s
          );
        }
        return null;
      }
      _removeSubscriber(e) {
        const t = (0, r.getNodeKey)(e.options),
          s = this.shardedSubscribers.get(t);
        return (
          s &&
            (s.stop(),
            this.shardedSubscribers.delete(t),
            this._resubscribe(),
            this.cluster.emit('-subscriber')),
          this.shardedSubscribers
        );
      }
      _refreshSlots(e) {
        if (!this._slotsAreEqual(e.slots)) {
          a('Refreshing the slots of the subscriber group.'),
            (this.subscriberToSlotsIndex = new Map());
          for (let t = 0; t < e.slots.length; t++) {
            const s = e.slots[t][0];
            this.subscriberToSlotsIndex.has(s) ||
              this.subscriberToSlotsIndex.set(s, []),
              this.subscriberToSlotsIndex.get(s).push(Number(t));
          }
          return (
            this._resubscribe(),
            (this.clusterSlots = JSON.parse(JSON.stringify(e.slots))),
            this.cluster.emit('subscribersReady'),
            !0
          );
        }
        return (
          a(
            'Nothing to refresh because the new cluster map is equal to the previous one.'
          ),
          !1
        );
      }
      _resubscribe() {
        this.shardedSubscribers &&
          this.shardedSubscribers.forEach((e, t) => {
            const s = this.subscriberToSlotsIndex.get(t);
            s &&
              (e.associateSlotRange(s),
              s.forEach((t) => {
                const s = e.getInstance(),
                  r = this.channels.get(t);
                r &&
                  r.length > 0 &&
                  s &&
                  (s.ssubscribe(r),
                  s.on('ready', () => {
                    s.ssubscribe(r);
                  }));
              }));
          });
      }
      _slotsAreEqual(e) {
        return (
          void 0 !== this.clusterSlots &&
          JSON.stringify(this.clusterSlots) === JSON.stringify(e)
        );
      }
    }),
    Pu
  );
}
function requireCluster() {
  if (Iu) return Wi;
  (Iu = 1), Object.defineProperty(Wi, '__esModule', { value: !0 });
  const e = zi,
    t = $i,
    s = Oa,
    r = Ui,
    o = Ia,
    a = vc,
    u = requireRedis(),
    d = _c,
    f = Cc,
    m = Da,
    g = mu,
    v = Rc,
    S = gu,
    _ = requireClusterSubscriber(),
    C = requireConnectionPool(),
    R = ju,
    j = Su,
    E = Eu,
    T = requireClusterSubscriberGroup(),
    O = (0, m.Debug)('cluster'),
    P = new WeakSet();
  class Cluster extends v.default {
    constructor(e, s = {}) {
      if (
        (super(),
        (this.slots = []),
        (this._groupsIds = {}),
        (this._groupsBySlot = Array(16384)),
        (this.isCluster = !0),
        (this.retryAttempts = 0),
        (this.delayQueue = new R.default()),
        (this.offlineQueue = new E()),
        (this.isRefreshing = !1),
        (this._refreshSlotsCacheCallbacks = []),
        (this._autoPipelines = new Map()),
        (this._runningAutoPipelines = new Set()),
        (this._readyDelayedCallbacks = []),
        (this.connectionEpoch = 0),
        t.EventEmitter.call(this),
        (this.startupNodes = e),
        (this.options = (0, m.defaults)(
          {},
          s,
          S.DEFAULT_CLUSTER_OPTIONS,
          this.options
        )),
        1 == this.options.shardedSubscribers &&
          (this.shardedSubscribers = new T.default(this)),
        this.options.redisOptions &&
          this.options.redisOptions.keyPrefix &&
          !this.options.keyPrefix &&
          (this.options.keyPrefix = this.options.redisOptions.keyPrefix),
        'function' != typeof this.options.scaleReads &&
          -1 === ['all', 'master', 'slave'].indexOf(this.options.scaleReads))
      )
        throw new Error(
          'Invalid option scaleReads "' +
            this.options.scaleReads +
            '". Expected "all", "master", "slave" or a custom function'
        );
      (this.connectionPool = new C.default(this.options.redisOptions)),
        this.connectionPool.on('-node', (e, t) => {
          this.emit('-node', e);
        }),
        this.connectionPool.on('+node', (e) => {
          this.emit('+node', e);
        }),
        this.connectionPool.on('drain', () => {
          this.setStatus('close');
        }),
        this.connectionPool.on('nodeError', (e, t) => {
          this.emit('node error', e, t);
        }),
        (this.subscriber = new _.default(this.connectionPool, this)),
        this.options.scripts &&
          Object.entries(this.options.scripts).forEach(([e, t]) => {
            this.defineCommand(e, t);
          }),
        this.options.lazyConnect
          ? this.setStatus('wait')
          : this.connect().catch((e) => {
              O('connecting failed: %s', e);
            });
    }
    connect() {
      return new Promise((e, t) => {
        if (
          'connecting' === this.status ||
          'connect' === this.status ||
          'ready' === this.status
        )
          return void t(new Error('Redis is already connecting/connected'));
        const r = ++this.connectionEpoch;
        this.setStatus('connecting'),
          this.resolveStartupNodeHostnames()
            .then((o) => {
              if (this.connectionEpoch !== r)
                return (
                  O(
                    'discard connecting after resolving startup nodes because epoch not match: %d != %d',
                    r,
                    this.connectionEpoch
                  ),
                  void t(
                    new s.RedisError(
                      'Connection is discarded because a new connection is made'
                    )
                  )
                );
              if ('connecting' !== this.status)
                return (
                  O(
                    'discard connecting after resolving startup nodes because the status changed to %s',
                    this.status
                  ),
                  void t(new s.RedisError('Connection is aborted'))
                );
              this.connectionPool.reset(o);
              const readyHandler = () => {
                this.setStatus('ready'),
                  (this.retryAttempts = 0),
                  this.executeOfflineCommands(),
                  this.resetNodesRefreshInterval(),
                  e();
              };
              let d;
              const refreshListener = () => {
                this.invokeReadyDelayedCallbacks(void 0),
                  this.removeListener('close', d),
                  (this.manuallyClosing = !1),
                  this.setStatus('connect'),
                  this.options.enableReadyCheck
                    ? this.readyCheck((e, t) => {
                        e || t
                          ? (O(
                              'Ready check failed (%s). Reconnecting...',
                              e || t
                            ),
                            'connect' === this.status && this.disconnect(!0))
                          : readyHandler();
                      })
                    : readyHandler();
              };
              (d = () => {
                const e = new Error('None of startup nodes is available');
                this.removeListener('refresh', refreshListener),
                  this.invokeReadyDelayedCallbacks(e),
                  t(e);
              }),
                this.once('refresh', refreshListener),
                this.once('close', d),
                this.once('close', this.handleCloseEvent.bind(this)),
                this.refreshSlotsCache((e) => {
                  e &&
                    e.message === a.default.defaultMessage &&
                    (u.default.prototype.silentEmit.call(this, 'error', e),
                    this.connectionPool.reset([]));
                }),
                this.subscriber.start(),
                this.options.shardedSubscribers &&
                  this.shardedSubscribers.start();
            })
            .catch((e) => {
              this.setStatus('close'),
                this.handleCloseEvent(e),
                this.invokeReadyDelayedCallbacks(e),
                t(e);
            });
      });
    }
    disconnect(e = !1) {
      const t = this.status;
      this.setStatus('disconnecting'),
        e || (this.manuallyClosing = !0),
        this.reconnectTimeout &&
          !e &&
          (clearTimeout(this.reconnectTimeout),
          (this.reconnectTimeout = null),
          O('Canceled reconnecting attempts')),
        this.clearNodesRefreshInterval(),
        this.subscriber.stop(),
        this.options.shardedSubscribers && this.shardedSubscribers.stop(),
        'wait' === t
          ? (this.setStatus('close'), this.handleCloseEvent())
          : this.connectionPool.reset([]);
    }
    quit(e) {
      const t = this.status;
      if (
        (this.setStatus('disconnecting'),
        (this.manuallyClosing = !0),
        this.reconnectTimeout &&
          (clearTimeout(this.reconnectTimeout), (this.reconnectTimeout = null)),
        this.clearNodesRefreshInterval(),
        this.subscriber.stop(),
        this.options.shardedSubscribers && this.shardedSubscribers.stop(),
        'wait' === t)
      ) {
        const t = (0, r.default)(Promise.resolve('OK'), e);
        return (
          h(
            function () {
              this.setStatus('close'), this.handleCloseEvent();
            }.bind(this)
          ),
          t
        );
      }
      return (0, r.default)(
        Promise.all(
          this.nodes().map((e) =>
            e.quit().catch((e) => {
              if (e.message === m.CONNECTION_CLOSED_ERROR_MSG) return 'OK';
              throw e;
            })
          )
        ).then(() => 'OK'),
        e
      );
    }
    duplicate(e = [], t = {}) {
      const s = e.length > 0 ? e : this.startupNodes.slice(0),
        r = Object.assign({}, this.options, t);
      return new Cluster(s, r);
    }
    nodes(e = 'all') {
      if ('all' !== e && 'master' !== e && 'slave' !== e)
        throw new Error(
          'Invalid role "' + e + '". Expected "all", "master" or "slave"'
        );
      return this.connectionPool.getNodes(e);
    }
    delayUntilReady(e) {
      this._readyDelayedCallbacks.push(e);
    }
    get autoPipelineQueueSize() {
      let e = 0;
      for (const t of this._autoPipelines.values()) e += t.length;
      return e;
    }
    refreshSlotsCache(e) {
      if ((e && this._refreshSlotsCacheCallbacks.push(e), this.isRefreshing))
        return;
      this.isRefreshing = !0;
      const t = this,
        wrapper = (e) => {
          this.isRefreshing = !1;
          for (const t of this._refreshSlotsCacheCallbacks) t(e);
          this._refreshSlotsCacheCallbacks = [];
        },
        s = (0, m.shuffle)(this.connectionPool.getNodes());
      let r = null;
      !(function tryNode(e) {
        if (e === s.length) {
          const e = new a.default(a.default.defaultMessage, r);
          return wrapper(e);
        }
        const o = s[e],
          u = `${o.options.host}:${o.options.port}`;
        O('getting slot cache from %s', u),
          t.getInfoFromNode(o, function (s) {
            switch (t.status) {
              case 'close':
              case 'end':
                return wrapper(new Error('Cluster is disconnected.'));
              case 'disconnecting':
                return wrapper(new Error('Cluster is disconnecting.'));
            }
            s
              ? (t.emit('node error', s, u), (r = s), tryNode(e + 1))
              : (t.emit('refresh'), wrapper());
          });
      })(0);
    }
    sendCommand(t, r, a) {
      if (
        ('wait' === this.status && this.connect().catch(m.noop),
        'end' === this.status)
      )
        return t.reject(new Error(m.CONNECTION_CLOSED_ERROR_MSG)), t.promise;
      let u = this.options.scaleReads;
      if ('master' !== u) {
        t.isReadOnly ||
          ((0, e.exists)(t.name) && (0, e.hasFlag)(t.name, 'readonly')) ||
          (u = 'master');
      }
      let d = a ? a.slot : t.getSlot();
      const h = {},
        f = this;
      if (!a && !P.has(t)) {
        P.add(t);
        const e = t.reject;
        t.reject = function (s) {
          const r = tryConnection.bind(null, !0);
          f.handleError(s, h, {
            moved: function (e, s) {
              O('command %s is moved to %s', t.name, s),
                (d = Number(e)),
                f.slots[e] ? (f.slots[e][0] = s) : (f.slots[e] = [s]),
                (f._groupsBySlot[e] = f._groupsIds[f.slots[e].join(';')]),
                f.connectionPool.findOrCreate(f.natMapper(s)),
                tryConnection(),
                O('refreshing slot caches... (triggered by MOVED error)'),
                f.refreshSlotsCache();
            },
            ask: function (e, s) {
              O('command %s is required to ask %s:%s', t.name, s);
              const r = f.natMapper(s);
              f.connectionPool.findOrCreate(r),
                tryConnection(!1, `${r.host}:${r.port}`);
            },
            tryagain: r,
            clusterDown: r,
            connectionClosed: r,
            maxRedirections: function (s) {
              e.call(t, s);
            },
            defaults: function () {
              e.call(t, s);
            }
          });
        };
      }
      function tryConnection(e, h) {
        if ('end' === f.status)
          return void t.reject(new s.AbortError('Cluster is ended.'));
        let g;
        if ('ready' === f.status || 'cluster' === t.name) {
          if (a && a.redis) g = a.redis;
          else if (
            o.default.checkFlag('ENTER_SUBSCRIBER_MODE', t.name) ||
            o.default.checkFlag('EXIT_SUBSCRIBER_MODE', t.name)
          ) {
            if (
              1 != f.options.shardedSubscribers ||
              ('ssubscribe' != t.name && 'sunsubscribe' != t.name)
            )
              g = f.subscriber.getInstance();
            else {
              const e = f.shardedSubscribers.getResponsibleSubscriber(d);
              let r = -1;
              'ssubscribe' == t.name &&
                (r = f.shardedSubscribers.addChannels(t.getKeys())),
                'sunsubscribe' == t.name &&
                  (r = f.shardedSubscribers.removeChannels(t.getKeys())),
                -1 !== r
                  ? (g = e.getInstance())
                  : t.reject(
                      new s.AbortError(
                        "Can't add or remove the given channels. Are they in the same slot?"
                      )
                    );
            }
            if (!g)
              return void t.reject(
                new s.AbortError('No subscriber for the cluster')
              );
          } else {
            if (!e) {
              if ('number' == typeof d && f.slots[d]) {
                const e = f.slots[d];
                if ('function' == typeof u) {
                  const s = e.map(function (e) {
                    return f.connectionPool.getInstanceByKey(e);
                  });
                  (g = u(s, t)),
                    Array.isArray(g) && (g = (0, m.sample)(g)),
                    g || (g = s[0]);
                } else {
                  let t;
                  (t =
                    'all' === u
                      ? (0, m.sample)(e)
                      : 'slave' === u && e.length > 1
                        ? (0, m.sample)(e, 1)
                        : e[0]),
                    (g = f.connectionPool.getInstanceByKey(t));
                }
              }
              h && ((g = f.connectionPool.getInstanceByKey(h)), g.asking());
            }
            g ||
              (g =
                ('function' == typeof u
                  ? null
                  : f.connectionPool.getSampleInstance(u)) ||
                f.connectionPool.getSampleInstance('all'));
          }
          a && !a.redis && (a.redis = g);
        }
        g
          ? g.sendCommand(t, r)
          : f.options.enableOfflineQueue
            ? f.offlineQueue.push({ command: t, stream: r, node: a })
            : t.reject(
                new Error(
                  "Cluster isn't ready and enableOfflineQueue options is false"
                )
              );
      }
      return tryConnection(), t.promise;
    }
    sscanStream(e, t) {
      return this.createScanStream('sscan', { key: e, options: t });
    }
    sscanBufferStream(e, t) {
      return this.createScanStream('sscanBuffer', { key: e, options: t });
    }
    hscanStream(e, t) {
      return this.createScanStream('hscan', { key: e, options: t });
    }
    hscanBufferStream(e, t) {
      return this.createScanStream('hscanBuffer', { key: e, options: t });
    }
    zscanStream(e, t) {
      return this.createScanStream('zscan', { key: e, options: t });
    }
    zscanBufferStream(e, t) {
      return this.createScanStream('zscanBuffer', { key: e, options: t });
    }
    handleError(e, t, s) {
      if (
        (void 0 === t.value
          ? (t.value = this.options.maxRedirections)
          : (t.value -= 1),
        t.value <= 0)
      )
        return void s.maxRedirections(
          new Error('Too many Cluster redirections. Last error: ' + e)
        );
      const r = e.message.split(' ');
      if ('MOVED' === r[0]) {
        const e = this.options.retryDelayOnMoved;
        e && 'number' == typeof e
          ? this.delayQueue.push('moved', s.moved.bind(null, r[1], r[2]), {
              timeout: e
            })
          : s.moved(r[1], r[2]);
      } else
        'ASK' === r[0]
          ? s.ask(r[1], r[2])
          : 'TRYAGAIN' === r[0]
            ? this.delayQueue.push('tryagain', s.tryagain, {
                timeout: this.options.retryDelayOnTryAgain
              })
            : 'CLUSTERDOWN' === r[0] && this.options.retryDelayOnClusterDown > 0
              ? this.delayQueue.push('clusterdown', s.connectionClosed, {
                  timeout: this.options.retryDelayOnClusterDown,
                  callback: this.refreshSlotsCache.bind(this)
                })
              : e.message === m.CONNECTION_CLOSED_ERROR_MSG &&
                  this.options.retryDelayOnFailover > 0 &&
                  'ready' === this.status
                ? this.delayQueue.push('failover', s.connectionClosed, {
                    timeout: this.options.retryDelayOnFailover,
                    callback: this.refreshSlotsCache.bind(this)
                  })
                : s.defaults();
    }
    resetOfflineQueue() {
      this.offlineQueue = new E();
    }
    clearNodesRefreshInterval() {
      this.slotsTimer &&
        (clearTimeout(this.slotsTimer), (this.slotsTimer = null));
    }
    resetNodesRefreshInterval() {
      if (this.slotsTimer || !this.options.slotsRefreshInterval) return;
      const nextRound = () => {
        this.slotsTimer = setTimeout(() => {
          O(
            'refreshing slot caches... (triggered by "slotsRefreshInterval" option)'
          ),
            this.refreshSlotsCache(() => {
              nextRound();
            });
        }, this.options.slotsRefreshInterval);
      };
      nextRound();
    }
    setStatus(e) {
      O('status: %s -> %s', this.status || '[empty]', e),
        (this.status = e),
        I.nextTick(() => {
          this.emit(e);
        });
    }
    handleCloseEvent(e) {
      let t;
      e && O('closed because %s', e),
        this.manuallyClosing ||
          'function' != typeof this.options.clusterRetryStrategy ||
          (t = this.options.clusterRetryStrategy.call(
            this,
            ++this.retryAttempts,
            e
          )),
        'number' == typeof t
          ? (this.setStatus('reconnecting'),
            (this.reconnectTimeout = setTimeout(() => {
              (this.reconnectTimeout = null),
                O('Cluster is disconnected. Retrying after %dms', t),
                this.connect().catch(function (e) {
                  O('Got error %s when reconnecting. Ignoring...', e);
                });
            }, t)))
          : (this.setStatus('end'),
            this.flushQueue(new Error('None of startup nodes is available')));
    }
    flushQueue(e) {
      let t;
      for (; (t = this.offlineQueue.shift()); ) t.command.reject(e);
    }
    executeOfflineCommands() {
      if (this.offlineQueue.length) {
        O('send %d commands in offline queue', this.offlineQueue.length);
        const e = this.offlineQueue;
        let t;
        for (this.resetOfflineQueue(); (t = e.shift()); )
          this.sendCommand(t.command, t.stream, t.node);
      }
    }
    natMapper(e) {
      const t = 'string' == typeof e ? e : `${e.host}:${e.port}`;
      let s = null;
      return (
        this.options.natMap && 'function' == typeof this.options.natMap
          ? (s = this.options.natMap(t))
          : this.options.natMap &&
            'object' == typeof this.options.natMap &&
            (s = this.options.natMap[t]),
        s
          ? (O('NAT mapping %s -> %O', t, s), Object.assign({}, s))
          : 'string' == typeof e
            ? (0, j.nodeKeyToRedisOptions)(e)
            : e
      );
    }
    getInfoFromNode(e, t) {
      if (!e) return t(new Error('Node is disconnected'));
      const s = e.duplicate({
        enableOfflineQueue: !0,
        enableReadyCheck: !1,
        retryStrategy: null,
        connectionName: (0, j.getConnectionName)(
          'refresher',
          this.options.redisOptions && this.options.redisOptions.connectionName
        )
      });
      s.on('error', m.noop),
        s.cluster(
          'SLOTS',
          (0, m.timeout)((e, r) => {
            if ((s.disconnect(), e)) return t(e);
            if (
              'disconnecting' === this.status ||
              'close' === this.status ||
              'end' === this.status
            )
              return (
                O(
                  'ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s',
                  r.length,
                  this.status
                ),
                void t()
              );
            const o = [];
            O('cluster slots result count: %d', r.length);
            for (let e = 0; e < r.length; ++e) {
              const t = r[e],
                s = t[0],
                a = t[1],
                u = [];
              for (let e = 2; e < t.length; e++) {
                if (!t[e][0]) continue;
                const s = this.natMapper({ host: t[e][0], port: t[e][1] });
                (s.readOnly = 2 !== e),
                  o.push(s),
                  u.push(s.host + ':' + s.port);
              }
              O(
                'cluster slots result [%d]: slots %d~%d served by %s',
                e,
                s,
                a,
                u
              );
              for (let e = s; e <= a; e++) this.slots[e] = u;
            }
            this._groupsIds = Object.create(null);
            let a = 0;
            for (let e = 0; e < 16384; e++) {
              const t = (this.slots[e] || []).join(';');
              t.length
                ? (this._groupsIds[t] || (this._groupsIds[t] = ++a),
                  (this._groupsBySlot[e] = this._groupsIds[t]))
                : (this._groupsBySlot[e] = void 0);
            }
            this.connectionPool.reset(o), t();
          }, this.options.slotsRefreshTimeout)
        );
    }
    invokeReadyDelayedCallbacks(e) {
      for (const t of this._readyDelayedCallbacks) I.nextTick(t, e);
      this._readyDelayedCallbacks = [];
    }
    readyCheck(e) {
      this.cluster('INFO', (t, s) => {
        if (t) return e(t);
        if ('string' != typeof s) return e();
        let r;
        const o = s.split('\r\n');
        for (let e = 0; e < o.length; ++e) {
          const t = o[e].split(':');
          if ('cluster_state' === t[0]) {
            r = t[1];
            break;
          }
        }
        'fail' === r ? (O('cluster state not ok (%s)', r), e(null, r)) : e();
      });
    }
    resolveSrv(e) {
      return new Promise((t, s) => {
        this.options.resolveSrv(e, (e, r) => {
          if (e) return s(e);
          const o = this,
            a = (0, j.groupSrvRecords)(r),
            u = Object.keys(a).sort((e, t) => parseInt(e) - parseInt(t));
          !(function tryFirstOne(e) {
            if (!u.length) return s(e);
            const r = u[0],
              d = a[r],
              h = (0, j.weightSrvRecords)(d);
            d.records.length || u.shift(),
              o
                .dnsLookup(h.name)
                .then((e) => t({ host: e, port: h.port }), tryFirstOne);
          })();
        });
      });
    }
    dnsLookup(e) {
      return new Promise((t, s) => {
        this.options.dnsLookup(e, (r, o) => {
          r
            ? (O('failed to resolve hostname %s to IP: %s', e, r.message), s(r))
            : (O('resolved hostname %s to IP %s', e, o), t(o));
        });
      });
    }
    async resolveStartupNodeHostnames() {
      if (!Array.isArray(this.startupNodes) || 0 === this.startupNodes.length)
        throw new Error('`startupNodes` should contain at least one node.');
      const e = (0, j.normalizeNodeOptions)(this.startupNodes),
        t = (0, j.getUniqueHostnamesFromOptions)(e);
      if (0 === t.length) return e;
      const s = await Promise.all(
          t.map(
            (this.options.useSRVRecords
              ? this.resolveSrv
              : this.dnsLookup
            ).bind(this)
          )
        ),
        r = (0, m.zipMap)(t, s);
      return e.map((e) => {
        const t = r.get(e.host);
        return t
          ? this.options.useSRVRecords
            ? Object.assign({}, e, t)
            : Object.assign({}, e, { host: t })
          : e;
      });
    }
    createScanStream(e, { key: t, options: s = {} }) {
      return new d.default({
        objectMode: !0,
        key: t,
        redis: this,
        command: e,
        ...s
      });
    }
  }
  return (
    (0, g.default)(Cluster, t.EventEmitter),
    (0, f.addTransactionSupport)(Cluster.prototype),
    (Wi.default = Cluster),
    Wi
  );
}
var Mu = {},
  Nu = {};
class TLSSocket extends u {
  authorized = !1;
  encrypted = !0;
  alpnProtocol = null;
  authorizationError = new Error(
    '[unenv] TLSSocket.authorizationError is not implemented yet!'
  );
  exportKeyingMaterial() {
    throw createNotImplementedError('TLSSocket.exportKeyingMaterial');
  }
  getCipher() {
    throw createNotImplementedError('TLSSocket.getCipher');
  }
  getPeerCertificate(e) {
    throw createNotImplementedError('TLSSocket.getPeerCertificate');
  }
  getCertificate() {
    return null;
  }
  getEphemeralKeyInfo() {
    return null;
  }
  getFinished() {}
  getPeerFinished() {}
  getProtocol() {
    return null;
  }
  getSession() {}
  getSharedSigalgs() {
    return [];
  }
  getTLSTicket() {}
  isSessionReused() {
    return !1;
  }
  renegotiate(e, t) {
    'function' == typeof t && t(null);
  }
  setMaxSendFragment(e) {
    return !1;
  }
  disableRenegotiation() {}
  enableTrace() {}
  getPeerX509Certificate() {}
  getX509Certificate() {}
}
class Server extends d {
  constructor(e, t) {
    super(e, t);
  }
  addContext(e, t) {}
  setSecureContext(e) {}
  setTicketKeys(e) {
    throw createNotImplementedError('Server.setTicketKeys');
  }
  getTicketKeys() {
    throw createNotImplementedError('Server.getTicketKeys');
  }
}
class SecureContext {
  context = {};
}
const Lu = 'auto',
  Du = 'TLSv1.2',
  Bu = 'TLSv1.3',
  connect = function () {
    return new TLSSocket();
  },
  createServer = function () {
    return new Server();
  },
  Hu = notImplemented('tls.checkServerIdentity'),
  zu = notImplemented('tls.convertALPNProtocols'),
  Fu = notImplemented('tls.createSecureContext'),
  $u = notImplemented('tls.createSecurePair'),
  Uu = notImplemented('tls.getCiphers'),
  qu = [],
  Vu = {
    CLIENT_RENEG_LIMIT: 3,
    CLIENT_RENEG_WINDOW: 600,
    DEFAULT_CIPHERS: '',
    DEFAULT_ECDH_CURVE: Lu,
    DEFAULT_MAX_VERSION: Bu,
    DEFAULT_MIN_VERSION: Du,
    SecureContext: SecureContext,
    Server: Server,
    TLSSocket: TLSSocket,
    checkServerIdentity: Hu,
    connect: connect,
    convertALPNProtocols: zu,
    createSecureContext: Fu,
    createSecurePair: $u,
    createServer: createServer,
    getCiphers: Uu,
    rootCertificates: qu
  },
  Wu = getDefaultExportFromNamespaceIfNotNamed(
    Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          CLIENT_RENEG_LIMIT: 3,
          CLIENT_RENEG_WINDOW: 600,
          DEFAULT_CIPHERS: '',
          DEFAULT_ECDH_CURVE: Lu,
          DEFAULT_MAX_VERSION: Bu,
          DEFAULT_MIN_VERSION: Du,
          SecureContext: SecureContext,
          Server: Server,
          TLSSocket: TLSSocket,
          checkServerIdentity: Hu,
          connect: connect,
          convertALPNProtocols: zu,
          createSecureContext: Fu,
          createSecurePair: $u,
          createServer: createServer,
          default: Vu,
          getCiphers: Uu,
          rootCertificates: qu
        },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    )
  );
var Ku = {};
Object.defineProperty(Ku, '__esModule', { value: !0 });
const Qu = (0, Da.Debug)('AbstractConnector');
(Ku.default = class {
  constructor(e) {
    (this.connecting = !1), (this.disconnectTimeout = e);
  }
  check(e) {
    return !0;
  }
  disconnect() {
    if (((this.connecting = !1), this.stream)) {
      const e = this.stream,
        t = setTimeout(() => {
          Qu(
            'stream %s:%s still open, destroying it',
            e.remoteAddress,
            e.remotePort
          ),
            e.destroy();
        }, this.disconnectTimeout);
      e.on('close', () => clearTimeout(t)), e.end();
    }
  }
}),
  Object.defineProperty(Nu, '__esModule', { value: !0 });
const Gu = _u,
  Ju = Wu,
  Yu = Da,
  Xu = Ku;
class StandaloneConnector extends Xu.default {
  constructor(e) {
    super(e.disconnectTimeout), (this.options = e);
  }
  connect(e) {
    const { options: t } = this;
    let s;
    return (
      (this.connecting = !0),
      'path' in t && t.path
        ? (s = { path: t.path })
        : ((s = {}),
          'port' in t && null != t.port && (s.port = t.port),
          'host' in t && null != t.host && (s.host = t.host),
          'family' in t && null != t.family && (s.family = t.family)),
      t.tls && Object.assign(s, t.tls),
      new Promise((e, r) => {
        I.nextTick(() => {
          if (this.connecting) {
            try {
              t.tls
                ? (this.stream = (0, Ju.connect)(s))
                : (this.stream = (0, Gu.createConnection)(s));
            } catch (e) {
              return void r(e);
            }
            this.stream.once('error', (e) => {
              this.firstError = e;
            }),
              e(this.stream);
          } else r(new Error(Yu.CONNECTION_CLOSED_ERROR_MSG));
        });
      })
    );
  }
}
Nu.default = StandaloneConnector;
var Zu = {},
  ed = {};
function isSentinelEql(e, t) {
  return (
    (e.host || '127.0.0.1') === (t.host || '127.0.0.1') &&
    (e.port || 26379) === (t.port || 26379)
  );
}
Object.defineProperty(ed, '__esModule', { value: !0 });
ed.default = class {
  constructor(e) {
    (this.cursor = 0), (this.sentinels = e.slice(0));
  }
  next() {
    const e = this.cursor >= this.sentinels.length;
    return { done: e, value: e ? void 0 : this.sentinels[this.cursor++] };
  }
  reset(e) {
    e &&
      this.sentinels.length > 1 &&
      1 !== this.cursor &&
      this.sentinels.unshift(...this.sentinels.splice(this.cursor - 1)),
      (this.cursor = 0);
  }
  add(e) {
    for (let t = 0; t < this.sentinels.length; t++)
      if (isSentinelEql(e, this.sentinels[t])) return !1;
    return this.sentinels.push(e), !0;
  }
  toString() {
    return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
  }
};
var td = {};
Object.defineProperty(td, '__esModule', { value: !0 }),
  (td.FailoverDetector = void 0);
const nd = (0, Da.Debug)('FailoverDetector'),
  sd = '+switch-master';
var rd, od;
function requireSentinelConnector() {
  if (rd) return Zu;
  (rd = 1),
    Object.defineProperty(Zu, '__esModule', { value: !0 }),
    (Zu.SentinelIterator = void 0);
  const e = _u,
    t = Da,
    s = Wu,
    r = ed;
  Zu.SentinelIterator = r.default;
  const o = Ku,
    a = requireRedis(),
    u = td,
    d = (0, t.Debug)('SentinelConnector');
  let h = class extends o.default {
    constructor(e) {
      if (
        (super(e.disconnectTimeout),
        (this.options = e),
        (this.emitter = null),
        (this.failoverDetector = null),
        !this.options.sentinels.length)
      )
        throw new Error('Requires at least one sentinel to connect to.');
      if (!this.options.name) throw new Error('Requires the name of master.');
      this.sentinelIterator = new r.default(this.options.sentinels);
    }
    check(e) {
      const t = !e.role || this.options.role === e.role;
      return (
        t ||
          (d(
            'role invalid, expected %s, but got %s',
            this.options.role,
            e.role
          ),
          this.sentinelIterator.next(),
          this.sentinelIterator.next(),
          this.sentinelIterator.reset(!0)),
        t
      );
    }
    disconnect() {
      super.disconnect(),
        this.failoverDetector && this.failoverDetector.cleanup();
    }
    connect(r) {
      let o;
      (this.connecting = !0), (this.retryAttempts = 0);
      const connectToNext = async () => {
        const a = this.sentinelIterator.next();
        if (a.done) {
          this.sentinelIterator.reset(!1);
          const e =
            'function' == typeof this.options.sentinelRetryStrategy
              ? this.options.sentinelRetryStrategy(++this.retryAttempts)
              : null;
          let t =
            'number' != typeof e
              ? 'All sentinels are unreachable and retry is disabled.'
              : `All sentinels are unreachable. Retrying from scratch after ${e}ms.`;
          o && (t += ` Last error: ${o.message}`), d(t);
          const s = new Error(t);
          if ('number' == typeof e)
            return (
              r('error', s),
              await new Promise((t) => setTimeout(t, e)),
              connectToNext()
            );
          throw s;
        }
        let u = null,
          h = null;
        try {
          u = await this.resolve(a.value);
        } catch (e) {
          h = e;
        }
        if (!this.connecting) throw new Error(t.CONNECTION_CLOSED_ERROR_MSG);
        const f = a.value.host + ':' + a.value.port;
        if (u)
          return (
            d('resolved: %s:%s from sentinel %s', u.host, u.port, f),
            this.options.enableTLSForSentinelMode && this.options.tls
              ? (Object.assign(u, this.options.tls),
                (this.stream = (0, s.connect)(u)),
                this.stream.once(
                  'secureConnect',
                  this.initFailoverDetector.bind(this)
                ))
              : ((this.stream = (0, e.createConnection)(u)),
                this.stream.once(
                  'connect',
                  this.initFailoverDetector.bind(this)
                )),
            this.stream.once('error', (e) => {
              this.firstError = e;
            }),
            this.stream
          );
        {
          const e = h
            ? 'failed to connect to sentinel ' + f + ' because ' + h.message
            : 'connected to sentinel ' +
              f +
              ' successfully, but got an invalid reply: ' +
              u;
          return (
            d(e),
            r('sentinelError', new Error(e)),
            h && (o = h),
            connectToNext()
          );
        }
      };
      return connectToNext();
    }
    async updateSentinels(e) {
      if (!this.options.updateSentinels) return;
      const s = await e.sentinel('sentinels', this.options.name);
      Array.isArray(s) &&
        (s.map(t.packObject).forEach((e) => {
          if (
            -1 ===
              (e.flags ? e.flags.split(',') : []).indexOf('disconnected') &&
            e.ip &&
            e.port
          ) {
            const t = this.sentinelNatResolve(addressResponseToAddress(e));
            this.sentinelIterator.add(t) &&
              d('adding sentinel %s:%s', t.host, t.port);
          }
        }),
        d('Updated internal sentinels: %s', this.sentinelIterator));
    }
    async resolveMaster(e) {
      const t = await e.sentinel('get-master-addr-by-name', this.options.name);
      return (
        await this.updateSentinels(e),
        this.sentinelNatResolve(
          Array.isArray(t) ? { host: t[0], port: Number(t[1]) } : null
        )
      );
    }
    async resolveSlave(e) {
      const s = await e.sentinel('slaves', this.options.name);
      if (!Array.isArray(s)) return null;
      const r = s
        .map(t.packObject)
        .filter(
          (e) => e.flags && !e.flags.match(/(disconnected|s_down|o_down)/)
        );
      return this.sentinelNatResolve(
        (function (e, s) {
          if (0 === e.length) return null;
          let r;
          if ('function' == typeof s) r = s(e);
          else if (null !== s && 'object' == typeof s) {
            const t = Array.isArray(s) ? s : [s];
            t.sort(
              (e, t) => (
                e.prio || (e.prio = 1),
                t.prio || (t.prio = 1),
                e.prio < t.prio ? -1 : e.prio > t.prio ? 1 : 0
              )
            );
            for (let s = 0; s < t.length; s++) {
              for (let o = 0; o < e.length; o++) {
                const a = e[o];
                if (a.ip === t[s].ip && a.port === t[s].port) {
                  r = a;
                  break;
                }
              }
              if (r) break;
            }
          }
          r || (r = (0, t.sample)(e));
          return addressResponseToAddress(r);
        })(r, this.options.preferredSlaves)
      );
    }
    sentinelNatResolve(e) {
      if (!e || !this.options.natMap) return e;
      const t = `${e.host}:${e.port}`;
      let s = e;
      return (
        'function' == typeof this.options.natMap
          ? (s = this.options.natMap(t) || e)
          : 'object' == typeof this.options.natMap &&
            (s = this.options.natMap[t] || e),
        s
      );
    }
    connectToSentinel(e, t) {
      return new a.default({
        port: e.port || 26379,
        host: e.host,
        username: this.options.sentinelUsername || null,
        password: this.options.sentinelPassword || null,
        family:
          e.family ||
          ('path' in this.options && this.options.path
            ? void 0
            : this.options.family),
        tls: this.options.sentinelTLS,
        retryStrategy: null,
        enableReadyCheck: !1,
        connectTimeout: this.options.connectTimeout,
        commandTimeout: this.options.sentinelCommandTimeout,
        ...t
      });
    }
    async resolve(e) {
      const t = this.connectToSentinel(e);
      t.on('error', noop);
      try {
        return 'slave' === this.options.role
          ? await this.resolveSlave(t)
          : await this.resolveMaster(t);
      } finally {
        t.disconnect();
      }
    }
    async initFailoverDetector() {
      var e;
      if (!this.options.failoverDetector) return;
      this.sentinelIterator.reset(!0);
      const t = [];
      for (; t.length < this.options.sentinelMaxConnections; ) {
        const { done: e, value: s } = this.sentinelIterator.next();
        if (e) break;
        const r = this.connectToSentinel(s, {
          lazyConnect: !0,
          retryStrategy: this.options.sentinelReconnectStrategy
        });
        r.on('reconnecting', () => {
          var e;
          null === (e = this.emitter) ||
            void 0 === e ||
            e.emit('sentinelReconnecting');
        }),
          t.push({ address: s, client: r });
      }
      this.sentinelIterator.reset(!1),
        this.failoverDetector && this.failoverDetector.cleanup(),
        (this.failoverDetector = new u.FailoverDetector(this, t)),
        await this.failoverDetector.subscribe(),
        null === (e = this.emitter) ||
          void 0 === e ||
          e.emit('failoverSubscribed');
    }
  };
  function addressResponseToAddress(e) {
    return { host: e.ip, port: Number(e.port) };
  }
  function noop() {}
  return (Zu.default = h), Zu;
}
function requireConnectors() {
  if (od) return Mu;
  (od = 1),
    Object.defineProperty(Mu, '__esModule', { value: !0 }),
    (Mu.SentinelConnector = Mu.StandaloneConnector = void 0);
  const e = Nu;
  Mu.StandaloneConnector = e.default;
  const t = requireSentinelConnector();
  return (Mu.SentinelConnector = t.default), Mu;
}
td.FailoverDetector = class {
  constructor(e, t) {
    (this.isDisconnected = !1), (this.connector = e), (this.sentinels = t);
  }
  cleanup() {
    this.isDisconnected = !0;
    for (const e of this.sentinels) e.client.disconnect();
  }
  async subscribe() {
    nd('Starting FailoverDetector');
    const e = [];
    for (const t of this.sentinels) {
      const s = t.client.subscribe(sd).catch((e) => {
        nd(
          'Failed to subscribe to failover messages on sentinel %s:%s (%s)',
          t.address.host || '127.0.0.1',
          t.address.port || 26739,
          e.message
        );
      });
      e.push(s),
        t.client.on('message', (e) => {
          this.isDisconnected || e !== sd || this.disconnect();
        });
    }
    await Promise.all(e);
  }
  disconnect() {
    (this.isDisconnected = !0),
      nd('Failover detected, disconnecting'),
      this.connector.disconnect();
  }
};
var id = {},
  ad = {},
  cd = {};
Object.defineProperty(cd, '__esModule', { value: !0 });
const ld = Oa;
class MaxRetriesPerRequestError extends ld.AbortError {
  constructor(e) {
    super(
      `Reached the max retries per request limit (which is ${e}). Refer to "maxRetriesPerRequest" option for details.`
    ),
      Error.captureStackTrace(this, this.constructor);
  }
  get name() {
    return this.constructor.name;
  }
}
(cd.default = MaxRetriesPerRequestError),
  Object.defineProperty(ad, '__esModule', { value: !0 }),
  (ad.MaxRetriesPerRequestError = void 0);
const ud = cd;
ad.MaxRetriesPerRequestError = ud.default;
var dd = {};
const hd = getDefaultExportFromNamespaceIfNotNamed(e),
  pd = getDefaultExportFromNamespaceIfNotNamed(j),
  fd = hd.Buffer,
  md = new (0, pd.StringDecoder)(),
  gd = Oa,
  yd = gd.ReplyError,
  bd = gd.ParserError;
var vd = fd.allocUnsafe(32768),
  Sd = 0,
  _d = null,
  wd = 0,
  kd = 0;
function parseSimpleString(e) {
  const t = e.offset,
    s = e.buffer,
    r = s.length - 1;
  for (var o = t; o < r; )
    if (13 === s[o++])
      return (
        (e.offset = o + 1),
        !0 === e.optionReturnBuffers
          ? e.buffer.slice(t, o - 1)
          : e.buffer.toString('utf8', t, o - 1)
      );
}
function parseLength(e) {
  const t = e.buffer.length - 1;
  for (var s = e.offset, r = 0; s < t; ) {
    const t = e.buffer[s++];
    if (13 === t) return (e.offset = s + 1), r;
    r = 10 * r + (t - 48);
  }
}
function pushArrayCache(e, t, s) {
  e.arrayCache.push(t), e.arrayPos.push(s);
}
function parseArrayChunks(e) {
  const t = e.arrayCache.pop();
  var s = e.arrayPos.pop();
  if (e.arrayCache.length) {
    const r = parseArrayChunks(e);
    if (void 0 === r) return void pushArrayCache(e, t, s);
    t[s++] = r;
  }
  return parseArrayElements(e, t, s);
}
function parseArrayElements(e, t, s) {
  const r = e.buffer.length;
  for (; s < t.length; ) {
    const o = e.offset;
    if (e.offset >= r) return void pushArrayCache(e, t, s);
    const a = parseType(e, e.buffer[e.offset++]);
    if (void 0 === a)
      return (
        e.arrayCache.length || e.bufferCache.length || (e.offset = o),
        void pushArrayCache(e, t, s)
      );
    (t[s] = a), s++;
  }
  return t;
}
function parseType(e, t) {
  switch (t) {
    case 36:
      return (function (e) {
        const t = parseLength(e);
        if (void 0 === t) return;
        if (t < 0) return null;
        const s = e.offset + t;
        if (s + 2 > e.buffer.length)
          return (
            (e.bigStrSize = s + 2),
            (e.totalChunkSize = e.buffer.length),
            void e.bufferCache.push(e.buffer)
          );
        const r = e.offset;
        return (
          (e.offset = s + 2),
          !0 === e.optionReturnBuffers
            ? e.buffer.slice(r, s)
            : e.buffer.toString('utf8', r, s)
        );
      })(e);
    case 43:
      return parseSimpleString(e);
    case 42:
      return (function (e) {
        const t = parseLength(e);
        if (void 0 === t) return;
        return t < 0 ? null : parseArrayElements(e, new Array(t), 0);
      })(e);
    case 58:
      return (function (e) {
        return !0 === e.optionStringNumbers
          ? (function (e) {
              const t = e.buffer.length - 1;
              var s = e.offset,
                r = 0,
                o = '';
              for (45 === e.buffer[s] && ((o += '-'), s++); s < t; ) {
                var a = e.buffer[s++];
                if (13 === a) return (e.offset = s + 1), 0 !== r && (o += r), o;
                r > 429496728
                  ? ((o += 10 * r + (a - 48)), (r = 0))
                  : 48 === a && 0 === r
                    ? (o += 0)
                    : (r = 10 * r + (a - 48));
              }
            })(e)
          : (function (e) {
              const t = e.buffer.length - 1;
              var s = e.offset,
                r = 0,
                o = 1;
              for (45 === e.buffer[s] && ((o = -1), s++); s < t; ) {
                const t = e.buffer[s++];
                if (13 === t) return (e.offset = s + 1), o * r;
                r = 10 * r + (t - 48);
              }
            })(e);
      })(e);
    case 45:
      return (function (e) {
        var t = parseSimpleString(e);
        if (void 0 !== t)
          return !0 === e.optionReturnBuffers && (t = t.toString()), new yd(t);
      })(e);
    default:
      return (function (e, t) {
        const s = new bd(
          'Protocol error, got ' +
            JSON.stringify(String.fromCharCode(t)) +
            ' as reply type byte',
          JSON.stringify(e.buffer),
          e.offset
        );
        (e.buffer = null), e.returnFatalError(s);
      })(e, t);
  }
}
function decreaseBufferPool() {
  if (vd.length > 51200)
    if (1 === wd || kd > 2 * wd) {
      const e = Math.floor(vd.length / 10),
        t = e < Sd ? Sd : e;
      (Sd = 0), (vd = vd.slice(t, vd.length));
    } else kd++, wd--;
  else clearInterval(_d), (wd = 0), (kd = 0), (_d = null);
}
function concatBulkBuffer(e) {
  const t = e.bufferCache,
    s = e.offset,
    r = e.bigStrSize - s - 2;
  var o = t.length,
    a = e.bigStrSize - e.totalChunkSize;
  if (((e.offset = a), a <= 2)) {
    if (2 === o) return t[0].slice(s, t[0].length + a - 2);
    o--, (a = t[t.length - 2].length + a);
  }
  !(function (e) {
    if (vd.length < e + Sd) {
      const t = e > 78643200 ? 2 : 3;
      Sd > 116391936 && (Sd = 52428800),
        (vd = fd.allocUnsafe(e * t + Sd)),
        (Sd = 0),
        wd++,
        null === _d && (_d = setInterval(decreaseBufferPool, 50));
    }
  })(r);
  const u = Sd;
  t[0].copy(vd, u, s, t[0].length), (Sd += t[0].length - s);
  for (var d = 1; d < o - 1; d++) t[d].copy(vd, Sd), (Sd += t[d].length);
  return t[d].copy(vd, Sd, 0, a - 2), (Sd += a - 2), vd.slice(u, Sd);
}
var Cd = class {
    constructor(e) {
      if (!e) throw new TypeError('Options are mandatory.');
      if (
        'function' != typeof e.returnError ||
        'function' != typeof e.returnReply
      )
        throw new TypeError(
          'The returnReply and returnError options have to be functions.'
        );
      this.setReturnBuffers(!!e.returnBuffers),
        this.setStringNumbers(!!e.stringNumbers),
        (this.returnError = e.returnError),
        (this.returnFatalError = e.returnFatalError || e.returnError),
        (this.returnReply = e.returnReply),
        this.reset();
    }
    reset() {
      (this.offset = 0),
        (this.buffer = null),
        (this.bigStrSize = 0),
        (this.totalChunkSize = 0),
        (this.bufferCache = []),
        (this.arrayCache = []),
        (this.arrayPos = []);
    }
    setReturnBuffers(e) {
      if ('boolean' != typeof e)
        throw new TypeError('The returnBuffers argument has to be a boolean');
      this.optionReturnBuffers = e;
    }
    setStringNumbers(e) {
      if ('boolean' != typeof e)
        throw new TypeError('The stringNumbers argument has to be a boolean');
      this.optionStringNumbers = e;
    }
    execute(e) {
      if (null === this.buffer) (this.buffer = e), (this.offset = 0);
      else if (0 === this.bigStrSize) {
        const t = this.buffer.length,
          s = t - this.offset,
          r = fd.allocUnsafe(s + e.length);
        if (
          (this.buffer.copy(r, 0, this.offset, t),
          e.copy(r, s, 0, e.length),
          (this.buffer = r),
          (this.offset = 0),
          this.arrayCache.length)
        ) {
          const e = parseArrayChunks(this);
          if (void 0 === e) return;
          this.returnReply(e);
        }
      } else {
        if (!(this.totalChunkSize + e.length >= this.bigStrSize))
          return (
            this.bufferCache.push(e), void (this.totalChunkSize += e.length)
          );
        this.bufferCache.push(e);
        var t = this.optionReturnBuffers
          ? concatBulkBuffer(this)
          : (function (e) {
              const t = e.bufferCache,
                s = e.offset;
              var r = t.length,
                o = e.bigStrSize - e.totalChunkSize;
              if (((e.offset = o), o <= 2)) {
                if (2 === r)
                  return t[0].toString('utf8', s, t[0].length + o - 2);
                r--, (o = t[t.length - 2].length + o);
              }
              for (var a = md.write(t[0].slice(s)), u = 1; u < r - 1; u++)
                a += md.write(t[u]);
              return a + md.end(t[u].slice(0, o - 2));
            })(this);
        if (
          ((this.bigStrSize = 0),
          (this.bufferCache = []),
          (this.buffer = e),
          this.arrayCache.length &&
            ((this.arrayCache[0][this.arrayPos[0]++] = t),
            void 0 === (t = parseArrayChunks(this))))
        )
          return;
        this.returnReply(t);
      }
      for (; this.offset < this.buffer.length; ) {
        const e = this.offset,
          t = this.buffer[this.offset++],
          s = parseType(this, t);
        if (void 0 === s)
          return void (
            this.arrayCache.length ||
            this.bufferCache.length ||
            (this.offset = e)
          );
        45 === t ? this.returnError(s) : this.returnReply(s);
      }
      this.buffer = null;
    }
  },
  xd = Cd,
  Rd = {};
Object.defineProperty(Rd, '__esModule', { value: !0 });
function mapSet(e) {
  return 'unsubscribe' === e
    ? 'subscribe'
    : 'punsubscribe' === e
      ? 'psubscribe'
      : 'sunsubscribe' === e
        ? 'ssubscribe'
        : e;
}
(Rd.default = class {
  constructor() {
    this.set = { subscribe: {}, psubscribe: {}, ssubscribe: {} };
  }
  add(e, t) {
    this.set[mapSet(e)][t] = !0;
  }
  del(e, t) {
    delete this.set[mapSet(e)][t];
  }
  channels(e) {
    return Object.keys(this.set[mapSet(e)]);
  }
  isEmpty() {
    return (
      0 === this.channels('subscribe').length &&
      0 === this.channels('psubscribe').length &&
      0 === this.channels('ssubscribe').length
    );
  }
}),
  Object.defineProperty(dd, '__esModule', { value: !0 });
const jd = Ia,
  Ed = xd,
  Ad = Rd,
  Td = (0, Da.Debug)('dataHandler');
dd.default = class {
  constructor(e, t) {
    this.redis = e;
    const s = new Ed({
      stringNumbers: t.stringNumbers,
      returnBuffers: !0,
      returnError: (e) => {
        this.returnError(e);
      },
      returnFatalError: (e) => {
        this.returnFatalError(e);
      },
      returnReply: (e) => {
        this.returnReply(e);
      }
    });
    e.stream.prependListener('data', (e) => {
      s.execute(e);
    }),
      e.stream.resume();
  }
  returnFatalError(e) {
    (e.message += '. Please report this.'),
      this.redis.recoverFromFatalError(e, e, { offlineQueue: !1 });
  }
  returnError(e) {
    const t = this.shiftCommand(e);
    t &&
      ((e.command = { name: t.command.name, args: t.command.args }),
      this.redis.handleReconnection(e, t));
  }
  returnReply(e) {
    if (this.handleMonitorReply(e)) return;
    if (this.handleSubscriberReply(e)) return;
    const t = this.shiftCommand(e);
    t &&
      (jd.default.checkFlag('ENTER_SUBSCRIBER_MODE', t.command.name)
        ? ((this.redis.condition.subscriber = new Ad.default()),
          this.redis.condition.subscriber.add(t.command.name, e[1].toString()),
          fillSubCommand(t.command, e[2]) || this.redis.commandQueue.unshift(t))
        : jd.default.checkFlag('EXIT_SUBSCRIBER_MODE', t.command.name)
          ? fillUnsubCommand(t.command, e[2]) ||
            this.redis.commandQueue.unshift(t)
          : t.command.resolve(e));
  }
  handleSubscriberReply(e) {
    if (!this.redis.condition.subscriber) return !1;
    const t = Array.isArray(e) ? e[0].toString() : null;
    switch ((Td('receive reply "%s" in subscriber mode', t), t)) {
      case 'message':
        this.redis.listeners('message').length > 0 &&
          this.redis.emit(
            'message',
            e[1].toString(),
            e[2] ? e[2].toString() : ''
          ),
          this.redis.emit('messageBuffer', e[1], e[2]);
        break;
      case 'pmessage': {
        const t = e[1].toString();
        this.redis.listeners('pmessage').length > 0 &&
          this.redis.emit('pmessage', t, e[2].toString(), e[3].toString()),
          this.redis.emit('pmessageBuffer', t, e[2], e[3]);
        break;
      }
      case 'smessage':
        this.redis.listeners('smessage').length > 0 &&
          this.redis.emit(
            'smessage',
            e[1].toString(),
            e[2] ? e[2].toString() : ''
          ),
          this.redis.emit('smessageBuffer', e[1], e[2]);
        break;
      case 'ssubscribe':
      case 'subscribe':
      case 'psubscribe': {
        const s = e[1].toString();
        this.redis.condition.subscriber.add(t, s);
        const r = this.shiftCommand(e);
        if (!r) return;
        fillSubCommand(r.command, e[2]) || this.redis.commandQueue.unshift(r);
        break;
      }
      case 'sunsubscribe':
      case 'unsubscribe':
      case 'punsubscribe': {
        const s = e[1] ? e[1].toString() : null;
        s && this.redis.condition.subscriber.del(t, s);
        const r = e[2];
        0 === Number(r) && (this.redis.condition.subscriber = !1);
        const o = this.shiftCommand(e);
        if (!o) return;
        fillUnsubCommand(o.command, r) || this.redis.commandQueue.unshift(o);
        break;
      }
      default: {
        const t = this.shiftCommand(e);
        if (!t) return;
        t.command.resolve(e);
      }
    }
    return !0;
  }
  handleMonitorReply(e) {
    if ('monitoring' !== this.redis.status) return !1;
    const t = e.toString();
    if ('OK' === t) return !1;
    const s = t.indexOf(' '),
      r = t.slice(0, s),
      o = t.indexOf('"'),
      a = t
        .slice(o + 1, -1)
        .split('" "')
        .map((e) => e.replace(/\\"/g, '"')),
      u = t.slice(s + 2, o - 2).split(' ');
    return this.redis.emit('monitor', r, a, u[1], u[0]), !0;
  }
  shiftCommand(e) {
    const t = this.redis.commandQueue.shift();
    if (!t) {
      const t = new Error(
        'Command queue state error. If you can reproduce this, please report it.' +
          (e instanceof Error
            ? ` Last error: ${e.message}`
            : ` Last reply: ${e.toString()}`)
      );
      return this.redis.emit('error', t), null;
    }
    return t;
  }
};
const Od = new WeakMap();
function fillSubCommand(e, t) {
  let s = Od.has(e) ? Od.get(e) : e.args.length;
  return (
    (s -= 1), s <= 0 ? (e.resolve(t), Od.delete(e), !0) : (Od.set(e, s), !1)
  );
}
function fillUnsubCommand(e, t) {
  let s = Od.has(e) ? Od.get(e) : e.args.length;
  return 0 === s
    ? 0 === Number(t) && (Od.delete(e), e.resolve(t), !0)
    : ((s -= 1), s <= 0 ? (e.resolve(t), !0) : (Od.set(e, s), !1));
}
!(function (e) {
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.readyHandler =
      e.errorHandler =
      e.closeHandler =
      e.connectHandler =
        void 0);
  const t = Oa,
    s = Ia,
    r = ad,
    o = Da,
    a = dd,
    u = (0, o.Debug)('connection');
  function abortError(e) {
    const s = new t.AbortError('Command aborted due to connection close');
    return (s.command = { name: e.name, args: e.args }), s;
  }
  (e.connectHandler = function (t) {
    return function () {
      t.setStatus('connect'), t.resetCommandQueue();
      let s = !1;
      const { connectionEpoch: r } = t;
      t.condition.auth &&
        t.auth(t.condition.auth, function (e) {
          r === t.connectionEpoch &&
            e &&
            (-1 !== e.message.indexOf('no password is set')
              ? console.warn(
                  '[WARN] Redis server does not require a password, but a password was supplied.'
                )
              : -1 !==
                  e.message.indexOf(
                    'without any password configured for the default user'
                  )
                ? console.warn(
                    "[WARN] This Redis server's `default` user does not require a password, but a password was supplied"
                  )
                : -1 !==
                    e.message.indexOf(
                      "wrong number of arguments for 'auth' command"
                    )
                  ? console.warn(
                      "[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."
                    )
                  : ((s = !0), t.recoverFromFatalError(e, e)));
        }),
        t.condition.select &&
          t.select(t.condition.select).catch((e) => {
            t.silentEmit('error', e);
          }),
        t.options.enableReadyCheck || e.readyHandler(t)(),
        new a.default(t, { stringNumbers: t.options.stringNumbers }),
        t.options.enableReadyCheck &&
          t._readyCheck(function (o, a) {
            r === t.connectionEpoch &&
              (o
                ? s ||
                  t.recoverFromFatalError(
                    new Error('Ready check failed: ' + o.message),
                    o
                  )
                : t.connector.check(a)
                  ? e.readyHandler(t)()
                  : t.disconnect(!0));
          });
    };
  }),
    (e.closeHandler = function (e) {
      return function () {
        const t = e.status;
        if (
          (e.setStatus('close'),
          e.commandQueue.length &&
            (function (e) {
              var t;
              let s = 0;
              for (let r = 0; r < e.length; ) {
                const o =
                    null === (t = e.peekAt(r)) || void 0 === t
                      ? void 0
                      : t.command,
                  a = o.pipelineIndex;
                (void 0 !== a && 0 !== a) || (s = 0),
                  void 0 === a || a === s++
                    ? r++
                    : (e.remove(r, 1), o.reject(abortError(o)));
              }
            })(e.commandQueue),
          e.offlineQueue.length &&
            (function (e) {
              var t;
              for (let s = 0; s < e.length; ) {
                const r =
                  null === (t = e.peekAt(s)) || void 0 === t
                    ? void 0
                    : t.command;
                if ('multi' === r.name) break;
                if ('exec' === r.name) {
                  e.remove(s, 1), r.reject(abortError(r));
                  break;
                }
                r.inTransaction
                  ? (e.remove(s, 1), r.reject(abortError(r)))
                  : s++;
              }
            })(e.offlineQueue),
          'ready' === t &&
            (e.prevCondition || (e.prevCondition = e.condition),
            e.commandQueue.length && (e.prevCommandQueue = e.commandQueue)),
          e.manuallyClosing)
        )
          return (
            (e.manuallyClosing = !1),
            u('skip reconnecting since the connection is manually closed.'),
            close()
          );
        if ('function' != typeof e.options.retryStrategy)
          return (
            u('skip reconnecting because `retryStrategy` is not a function'),
            close()
          );
        const s = e.options.retryStrategy(++e.retryAttempts);
        if ('number' != typeof s)
          return (
            u(
              "skip reconnecting because `retryStrategy` doesn't return a number"
            ),
            close()
          );
        u('reconnect in %sms', s),
          e.setStatus('reconnecting', s),
          (e.reconnectTimeout = setTimeout(function () {
            (e.reconnectTimeout = null), e.connect().catch(o.noop);
          }, s));
        const { maxRetriesPerRequest: a } = e.options;
        if ('number' == typeof a)
          if (a < 0) u('maxRetriesPerRequest is negative, ignoring...');
          else {
            0 === e.retryAttempts % (a + 1) &&
              (u(
                'reach maxRetriesPerRequest limitation, flushing command queue...'
              ),
              e.flushQueue(new r.MaxRetriesPerRequestError(a)));
          }
      };
      function close() {
        e.setStatus('end'),
          e.flushQueue(new Error(o.CONNECTION_CLOSED_ERROR_MSG));
      }
    }),
    (e.errorHandler = function (e) {
      return function (t) {
        u('error: %s', t), e.silentEmit('error', t);
      };
    }),
    (e.readyHandler = function (e) {
      return function () {
        if ((e.setStatus('ready'), (e.retryAttempts = 0), e.options.monitor)) {
          e.call('monitor').then(
            () => e.setStatus('monitoring'),
            (t) => e.emit('error', t)
          );
          const { sendCommand: t } = e;
          return (
            (e.sendCommand = function (r) {
              return s.default.checkFlag('VALID_IN_MONITOR_MODE', r.name)
                ? t.call(e, r)
                : (r.reject(
                    new Error(
                      "Connection is in monitoring mode, can't process commands."
                    )
                  ),
                  r.promise);
            }),
            void e.once('close', function () {
              delete e.sendCommand;
            })
          );
        }
        const t = e.prevCondition ? e.prevCondition.select : e.condition.select;
        if (
          (e.options.connectionName &&
            (u('set the connection name [%s]', e.options.connectionName),
            e.client('setname', e.options.connectionName).catch(o.noop)),
          e.options.readOnly &&
            (u('set the connection to readonly mode'),
            e.readonly().catch(o.noop)),
          e.prevCondition)
        ) {
          const s = e.prevCondition;
          if (
            ((e.prevCondition = null),
            s.subscriber && e.options.autoResubscribe)
          ) {
            e.condition.select !== t &&
              (u('connect to db [%d]', t), e.select(t));
            const r = s.subscriber.channels('subscribe');
            r.length && (u('subscribe %d channels', r.length), e.subscribe(r));
            const o = s.subscriber.channels('psubscribe');
            o.length &&
              (u('psubscribe %d channels', o.length), e.psubscribe(o));
            const a = s.subscriber.channels('ssubscribe');
            a.length &&
              (u('ssubscribe %d channels', a.length), e.ssubscribe(a));
          }
        }
        if (e.prevCommandQueue)
          if (e.options.autoResendUnfulfilledCommands)
            for (
              u('resend %d unfulfilled commands', e.prevCommandQueue.length);
              e.prevCommandQueue.length > 0;

            ) {
              const t = e.prevCommandQueue.shift();
              t.select !== e.condition.select &&
                'select' !== t.command.name &&
                e.select(t.select),
                e.sendCommand(t.command, t.stream);
            }
          else e.prevCommandQueue = null;
        if (e.offlineQueue.length) {
          u('send %d commands in offline queue', e.offlineQueue.length);
          const t = e.offlineQueue;
          for (e.resetOfflineQueue(); t.length > 0; ) {
            const s = t.shift();
            s.select !== e.condition.select &&
              'select' !== s.command.name &&
              e.select(s.select),
              e.sendCommand(s.command, s.stream);
          }
        }
        e.condition.select !== t && (u('connect to db [%d]', t), e.select(t));
      };
    });
})(id);
var Id,
  Pd = {};
function requireRedis() {
  if (Id) return Hi;
  (Id = 1), Object.defineProperty(Hi, '__esModule', { value: !0 });
  const e = zi,
    s = $i,
    r = Ui,
    o = requireCluster(),
    a = Ia,
    u = requireConnectors(),
    d = requireSentinelConnector(),
    h = id,
    f = Pd,
    m = _c,
    g = Cc,
    v = Da,
    S = mu,
    _ = Rc,
    C = Ha,
    R = Eu,
    j = (0, v.Debug)('redis');
  class Redis extends _.default {
    constructor(e, t, r) {
      if (
        (super(),
        (this.status = 'wait'),
        (this.isCluster = !1),
        (this.reconnectTimeout = null),
        (this.connectionEpoch = 0),
        (this.retryAttempts = 0),
        (this.manuallyClosing = !1),
        (this._autoPipelines = new Map()),
        (this._runningAutoPipelines = new Set()),
        this.parseOptions(e, t, r),
        s.EventEmitter.call(this),
        this.resetCommandQueue(),
        this.resetOfflineQueue(),
        this.options.Connector)
      )
        this.connector = new this.options.Connector(this.options);
      else if (this.options.sentinels) {
        const e = new d.default(this.options);
        (e.emitter = this), (this.connector = e);
      } else this.connector = new u.StandaloneConnector(this.options);
      this.options.scripts &&
        Object.entries(this.options.scripts).forEach(([e, t]) => {
          this.defineCommand(e, t);
        }),
        this.options.lazyConnect
          ? this.setStatus('wait')
          : this.connect().catch(C.noop);
    }
    static createClient(...e) {
      return new Redis(...e);
    }
    get autoPipelineQueueSize() {
      let e = 0;
      for (const t of this._autoPipelines.values()) e += t.length;
      return e;
    }
    connect(e) {
      const t = new Promise((e, t) => {
        if (
          'connecting' === this.status ||
          'connect' === this.status ||
          'ready' === this.status
        )
          return void t(new Error('Redis is already connecting/connected'));
        (this.connectionEpoch += 1), this.setStatus('connecting');
        const { options: s } = this;
        this.condition = {
          select: s.db,
          auth: s.username ? [s.username, s.password] : s.password,
          subscriber: !1
        };
        const o = this;
        (0, r.default)(
          this.connector.connect(function (e, t) {
            o.silentEmit(e, t);
          }),
          function (r, a) {
            if (r)
              return (
                o.flushQueue(r),
                o.silentEmit('error', r),
                t(r),
                void o.setStatus('end')
              );
            let u = s.tls ? 'secureConnect' : 'connect';
            if (
              ('sentinels' in s &&
                s.sentinels &&
                !s.enableTLSForSentinelMode &&
                (u = 'connect'),
              (o.stream = a),
              s.noDelay && a.setNoDelay(!0),
              'number' == typeof s.keepAlive &&
                (a.connecting
                  ? a.once(u, () => {
                      a.setKeepAlive(!0, s.keepAlive);
                    })
                  : a.setKeepAlive(!0, s.keepAlive)),
              a.connecting)
            ) {
              if ((a.once(u, h.connectHandler(o)), s.connectTimeout)) {
                let e = !1;
                a.setTimeout(s.connectTimeout, function () {
                  if (e) return;
                  a.setTimeout(0), a.destroy();
                  const t = new Error('connect ETIMEDOUT');
                  (t.errorno = 'ETIMEDOUT'),
                    (t.code = 'ETIMEDOUT'),
                    (t.syscall = 'connect'),
                    h.errorHandler(o)(t);
                }),
                  a.once(u, function () {
                    (e = !0), a.setTimeout(0);
                  });
              }
            } else if (a.destroyed) {
              const e = o.connector.firstError;
              e &&
                I.nextTick(() => {
                  h.errorHandler(o)(e);
                }),
                I.nextTick(h.closeHandler(o));
            } else I.nextTick(h.connectHandler(o));
            a.destroyed ||
              (a.once('error', h.errorHandler(o)),
              a.once('close', h.closeHandler(o)));
            const connectionReadyHandler = function () {
              o.removeListener('close', connectionCloseHandler), e();
            };
            var connectionCloseHandler = function () {
              o.removeListener('ready', connectionReadyHandler),
                t(new Error(v.CONNECTION_CLOSED_ERROR_MSG));
            };
            o.once('ready', connectionReadyHandler),
              o.once('close', connectionCloseHandler);
          }
        );
      });
      return (0, r.default)(t, e);
    }
    disconnect(e = !1) {
      e || (this.manuallyClosing = !0),
        this.reconnectTimeout &&
          !e &&
          (clearTimeout(this.reconnectTimeout), (this.reconnectTimeout = null)),
        'wait' === this.status
          ? h.closeHandler(this)()
          : this.connector.disconnect();
    }
    end() {
      this.disconnect();
    }
    duplicate(e) {
      return new Redis({ ...this.options, ...e });
    }
    get mode() {
      var e;
      return this.options.monitor
        ? 'monitor'
        : (
              null === (e = this.condition) || void 0 === e
                ? void 0
                : e.subscriber
            )
          ? 'subscriber'
          : 'normal';
    }
    monitor(e) {
      const t = this.duplicate({ monitor: !0, lazyConnect: !1 });
      return (0, r.default)(
        new Promise(function (e, s) {
          t.once('error', s),
            t.once('monitoring', function () {
              e(t);
            });
        }),
        e
      );
    }
    sendCommand(s, r) {
      var o, u;
      if (
        ('wait' === this.status && this.connect().catch(C.noop),
        'end' === this.status)
      )
        return s.reject(new Error(v.CONNECTION_CLOSED_ERROR_MSG)), s.promise;
      if (
        (null === (o = this.condition) || void 0 === o
          ? void 0
          : o.subscriber) &&
        !a.default.checkFlag('VALID_IN_SUBSCRIBER_MODE', s.name)
      )
        return (
          s.reject(
            new Error(
              'Connection in subscriber mode, only subscriber commands may be used'
            )
          ),
          s.promise
        );
      'number' == typeof this.options.commandTimeout &&
        s.setTimeout(this.options.commandTimeout);
      let d =
        'ready' === this.status ||
        (!r &&
          'connect' === this.status &&
          (0, e.exists)(s.name) &&
          (0, e.hasFlag)(s.name, 'loading'));
      if (
        (this.stream && this.stream.writable
          ? this.stream._writableState &&
            this.stream._writableState.ended &&
            (d = !1)
          : (d = !1),
        d)
      )
        j.enabled &&
          j(
            'write command[%s]: %d -> %s(%o)',
            this._getDescription(),
            null === (u = this.condition) || void 0 === u ? void 0 : u.select,
            s.name,
            s.args
          ),
          r
            ? 'isPipeline' in r && r.isPipeline
              ? r.write(s.toWritable(r.destination.redis.stream))
              : r.write(s.toWritable(r))
            : this.stream.write(s.toWritable(this.stream)),
          this.commandQueue.push({
            command: s,
            stream: r,
            select: this.condition.select
          }),
          a.default.checkFlag('WILL_DISCONNECT', s.name) &&
            (this.manuallyClosing = !0),
          void 0 !== this.options.socketTimeout &&
            void 0 === this.socketTimeoutTimer &&
            this.setSocketTimeout();
      else {
        if (!this.options.enableOfflineQueue)
          return (
            s.reject(
              new Error(
                "Stream isn't writeable and enableOfflineQueue options is false"
              )
            ),
            s.promise
          );
        if ('quit' === s.name && 0 === this.offlineQueue.length)
          return this.disconnect(), s.resolve(t.from('OK')), s.promise;
        j.enabled &&
          j(
            'queue command[%s]: %d -> %s(%o)',
            this._getDescription(),
            this.condition.select,
            s.name,
            s.args
          ),
          this.offlineQueue.push({
            command: s,
            stream: r,
            select: this.condition.select
          });
      }
      if ('select' === s.name && (0, v.isInt)(s.args[0])) {
        const e = parseInt(s.args[0], 10);
        this.condition.select !== e &&
          ((this.condition.select = e),
          this.emit('select', e),
          j('switch to db [%d]', this.condition.select));
      }
      return s.promise;
    }
    setSocketTimeout() {
      (this.socketTimeoutTimer = setTimeout(() => {
        this.stream.destroy(
          new Error(
            `Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`
          )
        ),
          (this.socketTimeoutTimer = void 0);
      }, this.options.socketTimeout)),
        this.stream.once('data', () => {
          clearTimeout(this.socketTimeoutTimer),
            (this.socketTimeoutTimer = void 0),
            0 !== this.commandQueue.length && this.setSocketTimeout();
        });
    }
    scanStream(e) {
      return this.createScanStream('scan', { options: e });
    }
    scanBufferStream(e) {
      return this.createScanStream('scanBuffer', { options: e });
    }
    sscanStream(e, t) {
      return this.createScanStream('sscan', { key: e, options: t });
    }
    sscanBufferStream(e, t) {
      return this.createScanStream('sscanBuffer', { key: e, options: t });
    }
    hscanStream(e, t) {
      return this.createScanStream('hscan', { key: e, options: t });
    }
    hscanBufferStream(e, t) {
      return this.createScanStream('hscanBuffer', { key: e, options: t });
    }
    zscanStream(e, t) {
      return this.createScanStream('zscan', { key: e, options: t });
    }
    zscanBufferStream(e, t) {
      return this.createScanStream('zscanBuffer', { key: e, options: t });
    }
    silentEmit(e, t) {
      let s;
      if ('error' === e) {
        if (((s = t), 'end' === this.status)) return;
        if (
          this.manuallyClosing &&
          s instanceof Error &&
          (s.message === v.CONNECTION_CLOSED_ERROR_MSG ||
            'connect' === s.syscall ||
            'read' === s.syscall)
        )
          return;
      }
      return this.listeners(e).length > 0
        ? this.emit.apply(this, arguments)
        : (s &&
            s instanceof Error &&
            console.error('[ioredis] Unhandled error event:', s.stack),
          !1);
    }
    recoverFromFatalError(e, t, s) {
      this.flushQueue(t, s), this.silentEmit('error', t), this.disconnect(!0);
    }
    handleReconnection(e, t) {
      var s;
      let r = !1;
      switch (
        (this.options.reconnectOnError &&
          (r = this.options.reconnectOnError(e)),
        r)
      ) {
        case 1:
        case !0:
          'reconnecting' !== this.status && this.disconnect(!0),
            t.command.reject(e);
          break;
        case 2:
          'reconnecting' !== this.status && this.disconnect(!0),
            (null === (s = this.condition) || void 0 === s
              ? void 0
              : s.select) !== t.select &&
              'select' !== t.command.name &&
              this.select(t.select),
            this.sendCommand(t.command);
          break;
        default:
          t.command.reject(e);
      }
    }
    _getDescription() {
      let e;
      return (
        (e =
          'path' in this.options && this.options.path
            ? this.options.path
            : this.stream && this.stream.remoteAddress && this.stream.remotePort
              ? this.stream.remoteAddress + ':' + this.stream.remotePort
              : 'host' in this.options && this.options.host
                ? this.options.host + ':' + this.options.port
                : ''),
        this.options.connectionName &&
          (e += ` (${this.options.connectionName})`),
        e
      );
    }
    resetCommandQueue() {
      this.commandQueue = new R();
    }
    resetOfflineQueue() {
      this.offlineQueue = new R();
    }
    parseOptions(...e) {
      const t = {};
      let s = !1;
      for (let r = 0; r < e.length; ++r) {
        const o = e[r];
        if (null != o)
          if ('object' == typeof o) (0, C.defaults)(t, o);
          else if ('string' == typeof o)
            (0, C.defaults)(t, (0, v.parseURL)(o)),
              o.startsWith('rediss://') && (s = !0);
          else {
            if ('number' != typeof o) throw new Error('Invalid argument ' + o);
            t.port = o;
          }
      }
      s && (0, C.defaults)(t, { tls: !0 }),
        (0, C.defaults)(t, Redis.defaultOptions),
        'string' == typeof t.port && (t.port = parseInt(t.port, 10)),
        'string' == typeof t.db && (t.db = parseInt(t.db, 10)),
        (this.options = (0, v.resolveTLSProfile)(t));
    }
    setStatus(e, t) {
      j.enabled &&
        j(
          'status[%s]: %s -> %s',
          this._getDescription(),
          this.status || '[empty]',
          e
        ),
        (this.status = e),
        I.nextTick(this.emit.bind(this, e, t));
    }
    createScanStream(e, { key: t, options: s = {} }) {
      return new m.default({
        objectMode: !0,
        key: t,
        redis: this,
        command: e,
        ...s
      });
    }
    flushQueue(e, t) {
      let s;
      if (
        (t = (0, C.defaults)({}, t, { offlineQueue: !0, commandQueue: !0 }))
          .offlineQueue
      )
        for (; (s = this.offlineQueue.shift()); ) s.command.reject(e);
      if (t.commandQueue && this.commandQueue.length > 0)
        for (
          this.stream && this.stream.removeAllListeners('data');
          (s = this.commandQueue.shift());

        )
          s.command.reject(e);
    }
    _readyCheck(e) {
      const t = this;
      this.info(function (s, r) {
        if (s)
          return s.message && s.message.includes('NOPERM')
            ? (console.warn(
                `Skipping the ready check because INFO command fails: "${s.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`
              ),
              e(null, {}))
            : e(s);
        if ('string' != typeof r) return e(null, r);
        const o = {},
          a = r.split('\r\n');
        for (let e = 0; e < a.length; ++e) {
          const [t, ...s] = a[e].split(':'),
            r = s.join(':');
          r && (o[t] = r);
        }
        if (o.loading && '0' !== o.loading) {
          const s = 1e3 * (o.loading_eta_seconds || 1),
            r =
              t.options.maxLoadingRetryTime && t.options.maxLoadingRetryTime < s
                ? t.options.maxLoadingRetryTime
                : s;
          j('Redis server still loading, trying again in ' + r + 'ms'),
            setTimeout(function () {
              t._readyCheck(e);
            }, r);
        } else e(null, o);
      }).catch(C.noop);
    }
  }
  return (
    (Redis.Cluster = o.default),
    (Redis.Command = a.default),
    (Redis.defaultOptions = f.DEFAULT_REDIS_OPTIONS),
    (0, S.default)(Redis, s.EventEmitter),
    (0, g.addTransactionSupport)(Redis.prototype),
    (Hi.default = Redis),
    Hi
  );
}
Object.defineProperty(Pd, '__esModule', { value: !0 }),
  (Pd.DEFAULT_REDIS_OPTIONS = void 0),
  (Pd.DEFAULT_REDIS_OPTIONS = {
    port: 6379,
    host: 'localhost',
    family: 4,
    connectTimeout: 1e4,
    disconnectTimeout: 2e3,
    retryStrategy: function (e) {
      return Math.min(50 * e, 2e3);
    },
    keepAlive: 0,
    noDelay: !0,
    connectionName: null,
    sentinels: null,
    name: null,
    role: 'master',
    sentinelRetryStrategy: function (e) {
      return Math.min(10 * e, 1e3);
    },
    sentinelReconnectStrategy: function () {
      return 6e4;
    },
    natMap: null,
    enableTLSForSentinelMode: !1,
    updateSentinels: !0,
    failoverDetector: !1,
    username: null,
    password: null,
    db: 0,
    enableOfflineQueue: !0,
    enableReadyCheck: !0,
    autoResubscribe: !0,
    autoResendUnfulfilledCommands: !0,
    lazyConnect: !1,
    keyPrefix: '',
    reconnectOnError: null,
    readOnly: !1,
    stringNumbers: !1,
    maxRetriesPerRequest: 20,
    maxLoadingRetryTime: 1e4,
    enableAutoPipelining: !1,
    autoPipeliningIgnoredCommands: [],
    sentinelMaxConnections: 10
  }),
  (function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.print =
        t.ReplyError =
        t.SentinelIterator =
        t.SentinelConnector =
        t.AbstractConnector =
        t.Pipeline =
        t.ScanStream =
        t.Command =
        t.Cluster =
        t.Redis =
        t.default =
          void 0),
      (t = e.exports = requireRedis().default);
    var s = requireRedis();
    Object.defineProperty(t, 'default', {
      enumerable: !0,
      get: function () {
        return s.default;
      }
    });
    var r = requireRedis();
    Object.defineProperty(t, 'Redis', {
      enumerable: !0,
      get: function () {
        return r.default;
      }
    });
    var o = requireCluster();
    Object.defineProperty(t, 'Cluster', {
      enumerable: !0,
      get: function () {
        return o.default;
      }
    });
    var a = Ia;
    Object.defineProperty(t, 'Command', {
      enumerable: !0,
      get: function () {
        return a.default;
      }
    });
    var u = _c;
    Object.defineProperty(t, 'ScanStream', {
      enumerable: !0,
      get: function () {
        return u.default;
      }
    });
    var d = xc;
    Object.defineProperty(t, 'Pipeline', {
      enumerable: !0,
      get: function () {
        return d.default;
      }
    });
    var h = Ku;
    Object.defineProperty(t, 'AbstractConnector', {
      enumerable: !0,
      get: function () {
        return h.default;
      }
    });
    var f = requireSentinelConnector();
    Object.defineProperty(t, 'SentinelConnector', {
      enumerable: !0,
      get: function () {
        return f.default;
      }
    }),
      Object.defineProperty(t, 'SentinelIterator', {
        enumerable: !0,
        get: function () {
          return f.SentinelIterator;
        }
      }),
      (t.ReplyError = Oa.ReplyError),
      Object.defineProperty(t, 'Promise', {
        get: () => (
          console.warn(
            'ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.'
          ),
          Promise
        ),
        set(e) {
          console.warn(
            'ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.'
          );
        }
      }),
      (t.print = function (e, t) {
        e ? console.log('Error: ' + e) : console.log('Reply: ' + t);
      });
  })(Bi, Bi.exports);
const Md = getDefaultExportFromCjs(Bi.exports),
  redisDriver = (e) => {
    let t;
    const getRedisClient = () =>
        t ||
        ((t = e.cluster
          ? new Md.Cluster(e.cluster, e.clusterOptions)
          : e.url
            ? new Md(e.url, e)
            : new Md(e)),
        t),
      s = (e.base || '').replace(/:$/, ''),
      p = (...e) =>
        (function (...e) {
          return e
            .map((e) =>
              (function (e, t = ':') {
                return e
                  ? e.replace(/[:/\\]/g, t).replace(/^[:/\\]|[:/\\]$/g, '')
                  : '';
              })(e)
            )
            .filter(Boolean)
            .join(':');
        })(s, ...e);
    return {
      name: 'redis',
      options: e,
      getInstance: getRedisClient,
      hasItem: async (e) => Boolean(await getRedisClient().exists(p(e))),
      getItem: async (e) => (await getRedisClient().get(p(e))) ?? null,
      async setItem(t, s, r) {
        const o = r?.ttl ?? e.ttl;
        o
          ? await getRedisClient().set(p(t), s, 'EX', o)
          : await getRedisClient().set(p(t), s);
      },
      async removeItem(e) {
        await getRedisClient().del(p(e));
      },
      getKeys: async (e) =>
        (await getRedisClient().keys(p(e, '*'))).map((e) =>
          ((e) => (s ? e.replace(s, '') : e))(e)
        ),
      async clear(e) {
        const t = await getRedisClient().keys(p(e, '*'));
        if (0 !== t.length)
          return getRedisClient()
            .del(t)
            .then(() => {});
      },
      dispose: () => getRedisClient().disconnect()
    };
  },
  Nd = {
    data: {
      storage: I.env.REDIS_URL
        ? { driver: redisDriver({ url: I.env.REDIS_URL }) }
        : void 0
    }
  };
const _ossF1DZal_qDqVCylfZB8U2uixsq94GEjCZahTAcyk = (e) => {
    const t = (function () {
      const e = useRuntimeConfig(),
        t = {};
      return (
        e.multiCache.component &&
          (t.component = createStorage(Nd.component?.storage)),
        e.multiCache.data && (t.data = createStorage(Nd.data?.storage)),
        e.multiCache.route && (t.route = createStorage(Nd.route?.storage)),
        {
          cache: t,
          serverOptions: Nd,
          config: e.multiCache,
          state: new MultiCacheState()
        }
      );
    })();
    (e.multiCache = t),
      e.hooks.hook('request', onRequest),
      t.config.cdn.enabled && e.hooks.hook('beforeResponse', onBeforeResponse),
      t.config.route &&
        (e.h3App.stack.unshift({ route: '/', handler: serveCachedHandler }),
        e.hooks.hook('afterResponse', onAfterResponse),
        e.hooks.hook('error', onError));
  },
  Ld = {};
function resolveSecurityRules(e) {
  if (
    (e.context.security || (e.context.security = {}), !e.context.security.rules)
  ) {
    const t = toRouteMatcher(
        createRouter$1({ routes: structuredClone(Ld) })
      ).matchAll(e.path.split('?')[0]),
      s = Di({}, ...t.reverse());
    e.context.security.rules = s;
  }
  return e.context.security.rules;
}
const Dd = {
    contentSecurityPolicy: 'Content-Security-Policy',
    crossOriginEmbedderPolicy: 'Cross-Origin-Embedder-Policy',
    crossOriginOpenerPolicy: 'Cross-Origin-Opener-Policy',
    crossOriginResourcePolicy: 'Cross-Origin-Resource-Policy',
    originAgentCluster: 'Origin-Agent-Cluster',
    referrerPolicy: 'Referrer-Policy',
    strictTransportSecurity: 'Strict-Transport-Security',
    xContentTypeOptions: 'X-Content-Type-Options',
    xDNSPrefetchControl: 'X-DNS-Prefetch-Control',
    xDownloadOptions: 'X-Download-Options',
    xFrameOptions: 'X-Frame-Options',
    xPermittedCrossDomainPolicies: 'X-Permitted-Cross-Domain-Policies',
    xXSSProtection: 'X-XSS-Protection',
    permissionsPolicy: 'Permissions-Policy'
  },
  Bd = Object.fromEntries(Object.entries(Dd).map(([e, t]) => [t, e]));
function headerObjectFromString(e, t) {
  if (!t) return !1;
  if ('contentSecurityPolicy' === e) {
    const e = t
        .split(';')
        .map((e) => e.trim())
        .filter((e) => e),
      s = {};
    for (const t of e) {
      const [e, ...r] = t.split(' ').map((e) => e.trim());
      s[e] = 'upgrade-insecure-requests' === e || r.join(' ');
    }
    return s;
  }
  if ('strictTransportSecurity' === e) {
    const e = t
        .split(';')
        .map((e) => e.trim())
        .filter((e) => e),
      s = {};
    for (const t of e) {
      const [e, r] = t.split('=').map((e) => e.trim());
      'max-age' === e
        ? (s.maxAge = Number(r))
        : ('includeSubdomains' !== e && 'preload' !== e) || (s[e] = !0);
    }
    return s;
  }
  if ('permissionsPolicy' === e) {
    const e = t
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e),
      s = {};
    for (const t of e) {
      const [e, r] = t.split('=').map((e) => e.trim());
      s[e] = r;
    }
    return s;
  }
  return t;
}
function standardToSecurity(e) {
  if (!e) return;
  const t = {};
  return (
    Object.entries(e).forEach(([e, s]) => {
      const r = (function (e) {
        const [, t] =
          Object.entries(Bd).find(
            ([t]) => t.toLowerCase() === e.toLowerCase()
          ) || [];
        return t;
      })(e);
      if (r)
        if ('string' == typeof s) {
          const e = headerObjectFromString(r, s);
          t[r] = e;
        } else t[r] = s;
    }),
    0 !== Object.keys(t).length ? t : void 0
  );
}
function backwardsCompatibleSecurity(e) {
  if (!e) return;
  const t = {};
  return (
    Object.entries(e).forEach(([e, s]) => {
      const r = e;
      if (
        ('contentSecurityPolicy' !== r &&
          'permissionsPolicy' !== r &&
          'strictTransportSecurity' !== r) ||
        'string' != typeof s
      )
        t[r] = '' !== s && s;
      else {
        const e = headerObjectFromString(r, s);
        t[r] = e;
      }
    }),
    t
  );
}
const _zlzDFVYIxHt4ffKPnEbCjhPVdruyllzswaDMCRD1oos = async (e) => {
    const t = Ld,
      s = useRuntimeConfig();
    for (const e in s.nitro.routeRules) {
      const r = s.nitro.routeRules[e],
        { headers: o } = r,
        a = standardToSecurity(o);
      a && (t[e] = { headers: a });
    }
    const r = s.security,
      { headers: o } = r,
      a = backwardsCompatibleSecurity(o);
    t['/**'] = Di({ headers: a }, r, t['/**']);
    for (const e in s.nitro.routeRules) {
      const r = s.nitro.routeRules[e],
        { security: o } = r;
      if (o) {
        const { headers: s } = o,
          r = backwardsCompatibleSecurity(s);
        t[e] = Di({ headers: r }, o, t[e]);
      }
    }
    e.hooks.hook('nuxt-security:headers', ({ route: e, headers: s }) => {
      t[e] = Di({ headers: s }, t[e]);
    }),
      e.hooks.hook('nuxt-security:ready', async () => {
        await e.hooks.callHook('nuxt-security:routeRules', t);
      }),
      await e.hooks.callHook('nuxt-security:ready');
  },
  Hd = {
    '/_nuxt/builds/meta/67dc3e9b-12f5-4e00-b665-899a87cc4be3.json':
      'sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w',
    '/_nuxt/B97j2ZxQ.js':
      'sha384-4ux9g9xU4tMtR9qbApAHNVOPfq64Zad8ZrwX74q9RWYIGdh6fRojk24aCIjyeBXL',
    '/_nuxt/BAS3JTGW.js':
      'sha384-VCosvE3lLAAArkjGLWX3PBzzhEwgP+J7w9Ad/qt/8nPUrgyu2MJp4g7H+AR65qmd',
    '/_nuxt/BDzRyOtf.js':
      'sha384-frt6rpgTCkJEtOsbWzpwhCsJQkzdoMU97ilGmMFZqNlmylOmyZ39KVEdmH976Bj2',
    '/_nuxt/BQa-MhgX.js':
      'sha384-OCFSGJrtEWI2IE85BJg/ovP1xQgHwlPygHLlbTAXyWpKmjgBSvZz05c51b0k8lPX',
    '/_nuxt/BR9bF7db.js':
      'sha384-JJaCeRTCapemfe6xxrADJHeHmoTVwAWvPjCC6oT3XyUnnm+bcNR3g8jqfnmgyIp1',
    '/_nuxt/BT6izV9S.js':
      'sha384-cjfAEHYu9SqhH4wqkvwRpkPZsXiMevID2CeQhclmfc2TRsnZuAFWIf3qIpP8YNRg',
    '/_nuxt/BZ2j3QDh.js':
      'sha384-nKqYKQe+2S+IYkG2cAhk/JItJUy0fHBJ0rB+r2+Cu/i8LCXJdJg1lf7h3H1ZBGyG',
    '/_nuxt/CKOjb-dU.js':
      'sha384-i+n9tV3ekp96+gzS5vFtFjlB0ELYVhjWB24CozlCORv9yetXOaTXJovXQtuDmXc8',
    '/_nuxt/CQAWEB--.js':
      'sha384-dCDOQvjYg/qmO6Us56wuQ+tgu+HjSZxRCrB/K3kgsXaYyRqU3QxHkYnlmxHps9GK',
    '/_nuxt/CSVnevZN.js':
      'sha384-Tcg23F6DyHGr9sJGVB/aFqVbxw0IHQALtqKHiacW0YEyfBZNbGhNlFHGAfnS5gHM',
    '/_nuxt/CUUsJxSe.js':
      'sha384-JZ8pJmSoFJPyZ1YymFyfni/k3oCu3YsPKQ0DrSpKpS/uvHNfO6VQSQhjQBCrvMM4',
    '/_nuxt/Cb7HAAdy.js':
      'sha384-m0UhwvPkzsBQjK7oT33w4Wt9oB3+uJbOJZe962W9lv55T/NdusaJh53hjuZT9yrm',
    '/_nuxt/D7-Dmtkj.js':
      'sha384-mjHog2Kpip27KUpQo9GSQ55VDR7bmXor6kZWO25REYNqrU87t6PLlNfB453bu7HV',
    '/_nuxt/DHvnABUf.js':
      'sha384-c0eGM6klDIVEU6od+FBkk6by29nCznpaGFzwuH8UPFMDSujORBJiXIwqOfi7gzJE',
    '/_nuxt/DK4SstdY.js':
      'sha384-aD5GDQ6t8riv6Xb+SknqZF22Ctc/eoPfjxnhzGuntp6MB2u3i4WiA8K9P8xdrTyU',
    '/_nuxt/DLomW_ZE.js':
      'sha384-L3QFQNxyLBlwcaazKIsw5RZKD6inHTpIUGsZHwxoUSVPJNKTBJBQb7tzPwsxlokP',
    '/_nuxt/DM_Ll8qE.js':
      'sha384-qu+pc3Zeq3VtBnOC8dvtZcicfEUZcp5ezyLVHRFvkzOFaC28MT3e9jL9PbJHaGgv',
    '/_nuxt/DN_b9KJc.js':
      'sha384-xikPYdAcB+tgkE0kvc/vmyT8WdRUqxLKPoeUAduetBYc13Ylg1S21Rg0gwJJ5ntK',
    '/_nuxt/DlAUqK2U.js':
      'sha384-wV/FyIfkoKuneA9gx32UbcC1rWydYJhlr+cMCHu0oN57ZtVcBz8nUCI/A5rPOyHo',
    '/_nuxt/DnScx8gv.js':
      'sha384-tVKN6c2LqLrS/X0E8OA2FuWeQ3TsJBZjsltmaLODUi8ZEbvuQ1t2n3BtzfwVP83R',
    '/_nuxt/DrOCSzy_.js':
      'sha384-It2V9PYiXM3uB8HDlOo2MqXpXtbqOUIcCxx5BU4qPi2Ztg8CqkDJeyfH2OKwl1fc',
    '/_nuxt/_slug_.B7glc6IN.css':
      'sha384-+hIxhqXgHg2s3exy/jOaLKMDFdLuIZDWLjVx01ZHWVD99ol5XxwtAjC6asGt5biI',
    '/_robots.txt':
      'sha384-yswOWk7lyp6Si8qPCfzHO2HG2jKkUkvKxuR0DdkMgyoFB2ltOguqK9/Mmxz83qiA',
    '/favicon.ico':
      'sha384-mCREGmiOFUlpFRexN+kXfobLF6Vvo9xhkOXW7f08QRuE2s9SqxhXMIlTsByIuMOw',
    '/og-image.png':
      'sha384-r3sbQdNsztkryEOf0Ceoaxhree/0aTtpI15z83Bejf8fPXY5wCV+2YDHQvQss84s'
  },
  zd =
    /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g,
  Fd =
    /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g,
  _pA4YeXDsZ43NZgmqTS0xfmsHfseyoBJVDeN7QlWmPM = (e) => {
    e.hooks.hook('render:html', (e, { event: t }) => {
      const s = resolveSecurityRules(t);
      if (!s.enabled || !s.sri) return;
      const r = ['body', 'bodyAppend', 'bodyPrepend', 'head'];
      for (const t of r)
        e[t] = e[t].map(
          (e) => (
            'string' != typeof e ||
              ((e = e.replace(zd, (e, t, s) => {
                const r = Hd[s];
                if (r) {
                  return `<script integrity="${r}"${t}><\/script>`;
                }
                return e;
              })),
              (e = e.replace(Fd, (e, t, s) => {
                const r = Hd[s];
                if (r) {
                  return `<link integrity="${r}"${t}>`;
                }
                return e;
              }))),
            e
          )
        );
    });
  };
globalThis.crypto ??= Wl;
const $d = /<link([^>]*?>)/gi,
  Ud = /<script([^>]*?>)/gi,
  qd = /<style([^>]*?>)/gi,
  _2ID1InWJS65WPkCqbe5V7ZZuAh1SENv6_k3EcqQx67E = (e) => {
    e.hooks.hook('request', (e) => {
      if (e.context.security?.nonce) return;
      const t = resolveSecurityRules(e);
      if (t.enabled && t.nonce) {
        const t = (function () {
          const e = new Uint8Array(18);
          return crypto.getRandomValues(e), btoa(String.fromCharCode(...e));
        })();
        e.context.security.nonce = t;
      }
    }),
      e.hooks.hook('render:html', (e, { event: t }) => {
        const s = resolveSecurityRules(t);
        if (
          !(
            s.enabled &&
            s.headers &&
            s.headers.contentSecurityPolicy &&
            s.nonce
          )
        )
          return;
        const r = t.context.security.nonce,
          o = ['body', 'bodyAppend', 'bodyPrepend', 'head'];
        for (const t of o)
          e[t] = e[t].map((e) =>
            'string' != typeof e
              ? e
              : (e = (e = (e = e.replace(
                  $d,
                  (e, t) => `<link nonce="${r}"` + t
                )).replace(Ud, (e, t) => `<script nonce="${r}"` + t)).replace(
                  qd,
                  (e, t) => `<style nonce="${r}"` + t
                ))
          );
      });
  },
  _QSttKTT5Ko3CwlvdjHvxhP3AO7RQwxRuwLLz9VLvadY = (e) => {
    e.hooks.hook('render:html', (e, { event: t }) => {
      if (e.island) return;
      const s = resolveSecurityRules(t);
      if (s.enabled && s.headers) {
        const e = s.headers;
        if (e.contentSecurityPolicy) {
          const s = e.contentSecurityPolicy,
            r = t.context.security?.nonce,
            o = t.context.security?.hashes?.script,
            a = t.context.security?.hashes?.style;
          e.contentSecurityPolicy = (function (e, t, s, r) {
            const o = Object.fromEntries(
              Object.entries(e).map(([e, o]) => {
                if ('boolean' == typeof o) return [e, o];
                const a = (
                  'string' == typeof o
                    ? o
                        .split(' ')
                        .map((e) => e.trim())
                        .filter((e) => e)
                    : o
                )
                  .filter(
                    (e) =>
                      !e.startsWith("'nonce-") ||
                      "'nonce-{{nonce}}'" === e ||
                      (console.warn(
                        '[nuxt-security] removing static nonce from CSP header'
                      ),
                      !1)
                  )
                  .map((e) =>
                    "'nonce-{{nonce}}'" === e ? (t ? `'nonce-${t}'` : '') : e
                  )
                  .filter((e) => e);
                return (
                  'script-src' === e && s && a.push(...s),
                  'style-src' === e && r && a.push(...r),
                  [e, a]
                );
              })
            );
            return o;
          })(s, r, o, a);
        }
      }
    });
  };
const _FZGVjdYEwYpmhhawZwj6rcm0H78V43E8MfnU1ENCdZU = (e) => {
    e.hooks.hook('render:response', (e, { event: t }) => {
      const s = resolveSecurityRules(t);
      if (s.enabled && s.headers) {
        const e = s.headers;
        Object.entries(e).forEach(([e, s]) => {
          const r = Dd[e];
          if (!1 === s) {
            const { headers: e } = getRouteRules(t),
              s = e?.[r],
              o = (function (e, t) {
                return e.node.res.getHeader(t);
              })(t, r);
            s === o && removeResponseHeader(t, r);
          } else {
            const o = (function (e, t) {
              if (!1 === t) return '';
              if ('contentSecurityPolicy' === e) {
                const e = t;
                return Object.entries(e)
                  .filter(([, e]) => !1 !== e)
                  .map(([e, t]) =>
                    'upgrade-insecure-requests' === e
                      ? 'upgrade-insecure-requests;'
                      : `${e} ${'string' == typeof t ? t : t.map((e) => e.trim()).join(' ')};`
                  )
                  .join(' ');
              }
              if ('strictTransportSecurity' === e) {
                const e = t;
                return [
                  `max-age=${e.maxAge};`,
                  e.includeSubdomains && 'includeSubDomains;',
                  e.preload && 'preload;'
                ]
                  .filter(Boolean)
                  .join(' ');
              }
              if ('permissionsPolicy' === e) {
                const e = t;
                return Object.entries(e)
                  .filter(([, e]) => !1 !== e)
                  .map(([e, t]) =>
                    'string' == typeof t ? `${e}=${t}` : `${e}=(${t.join(' ')})`
                  )
                  .join(', ');
              }
              return t;
            })(e, s);
            setResponseHeader(t, r, o);
          }
        });
      }
    });
  },
  _RoU4AuvcbfOQJj4mouvxhC8I_cZCQ8TlsZjQYuERHJ8 = (e) => {
    e.hooks.hook('beforeResponse', (e) => {
      const t = resolveSecurityRules(e);
      t.enabled &&
        t.hidePoweredBy &&
        !e.node.res.headersSent &&
        removeResponseHeader(e, 'x-powered-by');
    });
  },
  _F3leHdTMVsOka9ZZq3ocp_x5OxEtrdKdDJfL6TXj8jo = async (e) => {
    {
      const t =
        (await useStorage('assets:nuxt-security').getItem('headers.json')) ||
        {};
      e.hooks.hook('beforeResponse', (e) => {
        const s = resolveSecurityRules(e);
        if (s.enabled && s.ssg && s.ssg.nitroHeaders) {
          const s = e.path.split('?')[0];
          t[s] && setResponseHeaders(e, t[s]);
        }
      });
    }
  },
  Vd = [
    _5xmxSRUNKlgvvS1drpqVxvM3NwBGwGuPOT5LICzLVY0,
    _WmDwdnT2Qxwqqss7mGk5x_OOT8n9MrM6tVH6PAnlMWg,
    _ossF1DZal_qDqVCylfZB8U2uixsq94GEjCZahTAcyk,
    function (e) {
      e.hooks.hook('render:html', (e) => {
        e.head.push(
          '<script>"use strict";(()=>{const t=window,e=document.documentElement,c=["dark","light"],n=getStorageValue("localStorage","nuxt-color-mode")||"system";let i=n==="system"?u():n;const r=e.getAttribute("data-color-mode-forced");r&&(i=r),l(i),t["__NUXT_COLOR_MODE__"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=""+o+"",a="";e.classList?e.classList.add(s):e.className+=" "+s,a&&e.setAttribute("data-"+a,o)}function d(o){const s=""+o+"",a="";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,"g"),""),a&&e.removeAttribute("data-"+a)}function f(o){return t.matchMedia("(prefers-color-scheme"+o+")")}function u(){if(t.matchMedia&&f("").media!=="not all"){for(const o of c)if(f(":"+o).matches)return o}return"light"}})();function getStorageValue(t,e){switch(t){case"localStorage":return window.localStorage.getItem(e);case"sessionStorage":return window.sessionStorage.getItem(e);case"cookie":return getCookie(e);default:return null}}function getCookie(t){const c=("; "+window.document.cookie).split("; "+t+"=");if(c.length===2)return c.pop()?.split(";").shift()}<\/script>'
        );
      });
    },
    _zlzDFVYIxHt4ffKPnEbCjhPVdruyllzswaDMCRD1oos,
    _pA4YeXDsZ43NZgmqTS0xfmsHfseyoBJVDeN7QlWmPM,
    (e) => {},
    _2ID1InWJS65WPkCqbe5V7ZZuAh1SENv6_k3EcqQx67E,
    _QSttKTT5Ko3CwlvdjHvxhP3AO7RQwxRuwLLz9VLvadY,
    (e) => {},
    _FZGVjdYEwYpmhhawZwj6rcm0H78V43E8MfnU1ENCdZU,
    _RoU4AuvcbfOQJj4mouvxhC8I_cZCQ8TlsZjQYuERHJ8,
    _F3leHdTMVsOka9ZZq3ocp_x5OxEtrdKdDJfL6TXj8jo
  ],
  Wd = {
    '/_robots.txt': {
      type: 'text/plain; charset=utf-8',
      etag: '"46-VKOVv4SlC52/xHAWnBObX3lpB3U"',
      mtime: '2025-03-10T13:38:51.926Z',
      size: 70,
      path: '../_robots.txt'
    },
    '/favicon.ico': {
      type: 'image/vnd.microsoft.icon',
      etag: '"3c2e-q620rnG/POyLfESWdRTFLiUTE14"',
      mtime: '2025-03-10T13:38:51.926Z',
      size: 15406,
      path: '../favicon.ico'
    },
    '/og-image.png': {
      type: 'image/png',
      etag: '"14659-kWXp6lYmjzW5qwliO1MIBTwBjPM"',
      mtime: '2025-03-10T13:38:51.926Z',
      size: 83545,
      path: '../og-image.png'
    },
    '/_nuxt/B97j2ZxQ.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"324e-wzQbpqkjxgqdrACS+YtSsbvoJg0"',
      mtime: '2025-03-10T13:38:51.923Z',
      size: 12878,
      path: '../_nuxt/B97j2ZxQ.js'
    },
    '/_nuxt/BAS3JTGW.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"b4-u+a2Mgpbmj63jjr/2ftEu6qx4L0"',
      mtime: '2025-03-10T13:38:51.923Z',
      size: 180,
      path: '../_nuxt/BAS3JTGW.js'
    },
    '/_nuxt/BDzRyOtf.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"2596-tcZL7WA5S/kZxZNNgCdWtH2bGRU"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 9622,
      path: '../_nuxt/BDzRyOtf.js'
    },
    '/_nuxt/BQa-MhgX.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"334-aj/QKEmuUm84SeaCYpYs4+yBpg8"',
      mtime: '2025-03-10T13:38:51.923Z',
      size: 820,
      path: '../_nuxt/BQa-MhgX.js'
    },
    '/_nuxt/BR9bF7db.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"97a-hiJ2ZAPDTx6WsKyXIEaxyEHSe+o"',
      mtime: '2025-03-10T13:38:51.923Z',
      size: 2426,
      path: '../_nuxt/BR9bF7db.js'
    },
    '/_nuxt/BT6izV9S.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"4c2-CW+tj50E2YgWCMrGiaJazflzjs0"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 1218,
      path: '../_nuxt/BT6izV9S.js'
    },
    '/_nuxt/BZ2j3QDh.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"110d-DYiPQmSa6Pbx60j9ScDgiDVHPxM"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 4365,
      path: '../_nuxt/BZ2j3QDh.js'
    },
    '/_nuxt/CKOjb-dU.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"3d4-XOv/lY+rdGtSiDTbhQYm/Vh27SU"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 980,
      path: '../_nuxt/CKOjb-dU.js'
    },
    '/_nuxt/CQAWEB--.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"9e4-MqRdFSqjYhSSbnK1Shx1o6T4JOE"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 2532,
      path: '../_nuxt/CQAWEB--.js'
    },
    '/_nuxt/CSVnevZN.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"2d5-Ibewseff6VpfbmtmoAf3MVIum0M"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 725,
      path: '../_nuxt/CSVnevZN.js'
    },
    '/_nuxt/CUUsJxSe.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"132a-mfOsbHF+qIDnhNB6L1/dMLbinsE"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 4906,
      path: '../_nuxt/CUUsJxSe.js'
    },
    '/_nuxt/Cb7HAAdy.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"859-+kcFMvnG/1cNKK4khH09oyKpflg"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 2137,
      path: '../_nuxt/Cb7HAAdy.js'
    },
    '/_nuxt/D7-Dmtkj.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"530df-1+ln4g2/lMIDdf1t8CeO5x6uoBs"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 340191,
      path: '../_nuxt/D7-Dmtkj.js'
    },
    '/_nuxt/DHvnABUf.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"5d6-2CmlT2dV1yETuqmcALfEangvy0s"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 1494,
      path: '../_nuxt/DHvnABUf.js'
    },
    '/_nuxt/DK4SstdY.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"6ab-J0jM0ftL9TK8hjpbMQPW0j2byBU"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 1707,
      path: '../_nuxt/DK4SstdY.js'
    },
    '/_nuxt/DLomW_ZE.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"189-+ZA4/eMBGjEd+KUhNkf5d9ARjnw"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 393,
      path: '../_nuxt/DLomW_ZE.js'
    },
    '/_nuxt/DM_Ll8qE.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"c6dd-vv0KnuF99YiXSaszj8uJl/BMLCE"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 50909,
      path: '../_nuxt/DM_Ll8qE.js'
    },
    '/_nuxt/DN_b9KJc.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"22b4-xRTFrphX9wPVgvnH4sh8DCyJ1Fg"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 8884,
      path: '../_nuxt/DN_b9KJc.js'
    },
    '/_nuxt/DlAUqK2U.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"5b-eFCz/UrraTh721pgAl0VxBNR1es"',
      mtime: '2025-03-10T13:38:51.924Z',
      size: 91,
      path: '../_nuxt/DlAUqK2U.js'
    },
    '/_nuxt/DnScx8gv.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"36b-tuNPBsfjIETLHng4fLtf3ctDp5Y"',
      mtime: '2025-03-10T13:38:51.925Z',
      size: 875,
      path: '../_nuxt/DnScx8gv.js'
    },
    '/_nuxt/DrOCSzy_.js': {
      type: 'text/javascript; charset=utf-8',
      etag: '"6a-xJ/AraH713o1pdygFLYuoxk8eAc"',
      mtime: '2025-03-10T13:38:51.925Z',
      size: 106,
      path: '../_nuxt/DrOCSzy_.js'
    },
    '/_nuxt/_slug_.B7glc6IN.css': {
      type: 'text/css; charset=utf-8',
      etag: '"122-861PXtxsJ+4mEIPfUVTjPuKrGfE"',
      mtime: '2025-03-10T13:38:51.925Z',
      size: 290,
      path: '../_nuxt/_slug_.B7glc6IN.css'
    },
    '/_nuxt/builds/latest.json': {
      type: 'application/json',
      etag: '"47-UQWlfJPy2MEoxb0Hu9TygtkfisQ"',
      mtime: '2025-03-10T13:38:51.918Z',
      size: 71,
      path: '../_nuxt/builds/latest.json'
    },
    '/_nuxt/builds/meta/67dc3e9b-12f5-4e00-b665-899a87cc4be3.json': {
      type: 'application/json',
      etag: '"8b-3uo+AKoypDurMP8e9wlAONQMPW8"',
      mtime: '2025-03-10T13:38:51.916Z',
      size: 139,
      path: '../_nuxt/builds/meta/67dc3e9b-12f5-4e00-b665-899a87cc4be3.json'
    }
  },
  Kd = notImplemented('fs.access'),
  Qd = notImplemented('fs.copyFile'),
  Gd = notImplemented('fs.cp'),
  Jd = notImplemented('fs.open'),
  Yd = notImplemented('fs.opendir'),
  Xd = notImplemented('fs.rename'),
  Zd = notImplemented('fs.truncate'),
  eh = notImplemented('fs.rm'),
  th = notImplemented('fs.rmdir'),
  nh = notImplemented('fs.mkdir'),
  sh = notImplemented('fs.readdir'),
  rh = notImplemented('fs.readlink'),
  oh = notImplemented('fs.symlink'),
  ih = notImplemented('fs.lstat'),
  ah = notImplemented('fs.stat'),
  ch = notImplemented('fs.link'),
  lh = notImplemented('fs.unlink'),
  uh = notImplemented('fs.chmod'),
  dh = notImplemented('fs.lchmod'),
  hh = notImplemented('fs.lchown'),
  ph = notImplemented('fs.chown'),
  fh = notImplemented('fs.utimes'),
  mh = notImplemented('fs.lutimes'),
  gh = notImplemented('fs.realpath'),
  yh = notImplemented('fs.mkdtemp'),
  bh = notImplemented('fs.writeFile'),
  vh = notImplemented('fs.appendFile'),
  Sh = notImplemented('fs.readFile'),
  _h = notImplemented('fs.watch'),
  wh = notImplemented('fs.statfs'),
  kh = notImplemented('fs.glob'),
  Ch = {
    constants: Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          COPYFILE_EXCL: 1,
          COPYFILE_FICLONE: 2,
          COPYFILE_FICLONE_FORCE: 4,
          EXTENSIONLESS_FORMAT_JAVASCRIPT: 0,
          EXTENSIONLESS_FORMAT_WASM: 1,
          F_OK: 0,
          O_APPEND: 1024,
          O_CREAT: 64,
          O_DIRECT: 16384,
          O_DIRECTORY: 65536,
          O_DSYNC: 4096,
          O_EXCL: 128,
          O_NOATIME: 262144,
          O_NOCTTY: 256,
          O_NOFOLLOW: 131072,
          O_NONBLOCK: 2048,
          O_RDONLY: 0,
          O_RDWR: 2,
          O_SYNC: 1052672,
          O_TRUNC: 512,
          O_WRONLY: 1,
          R_OK: 4,
          S_IFBLK: 24576,
          S_IFCHR: 8192,
          S_IFDIR: 16384,
          S_IFIFO: 4096,
          S_IFLNK: 40960,
          S_IFMT: 61440,
          S_IFREG: 32768,
          S_IFSOCK: 49152,
          S_IRGRP: 32,
          S_IROTH: 4,
          S_IRUSR: 256,
          S_IRWXG: 56,
          S_IRWXO: 7,
          S_IRWXU: 448,
          S_IWGRP: 16,
          S_IWOTH: 2,
          S_IWUSR: 128,
          S_IXGRP: 8,
          S_IXOTH: 1,
          S_IXUSR: 64,
          UV_DIRENT_BLOCK: 7,
          UV_DIRENT_CHAR: 6,
          UV_DIRENT_DIR: 2,
          UV_DIRENT_FIFO: 4,
          UV_DIRENT_FILE: 1,
          UV_DIRENT_LINK: 3,
          UV_DIRENT_SOCKET: 5,
          UV_DIRENT_UNKNOWN: 0,
          UV_FS_COPYFILE_EXCL: 1,
          UV_FS_COPYFILE_FICLONE: 2,
          UV_FS_COPYFILE_FICLONE_FORCE: 4,
          UV_FS_O_FILEMAP: 0,
          UV_FS_SYMLINK_DIR: 1,
          UV_FS_SYMLINK_JUNCTION: 2,
          W_OK: 2,
          X_OK: 1
        },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    ),
    access: Kd,
    appendFile: vh,
    chmod: uh,
    chown: ph,
    copyFile: Qd,
    cp: Gd,
    glob: kh,
    lchmod: dh,
    lchown: hh,
    link: ch,
    lstat: ih,
    lutimes: mh,
    mkdir: nh,
    mkdtemp: yh,
    open: Jd,
    opendir: Yd,
    readFile: Sh,
    readdir: sh,
    readlink: rh,
    realpath: gh,
    rename: Xd,
    rm: eh,
    rmdir: th,
    stat: ah,
    statfs: wh,
    symlink: oh,
    truncate: Zd,
    unlink: lh,
    utimes: fh,
    watch: _h,
    writeFile: bh
  };
function callbackify(e) {
  const fnc = function (...t) {
    const s = t.pop();
    e()
      .catch((e) => s(e))
      .then((e) => s(void 0, e));
  };
  return (fnc.__promisify__ = e), (fnc.native = fnc), fnc;
}
callbackify(Kd),
  callbackify(vh),
  callbackify(ph),
  callbackify(uh),
  callbackify(Qd),
  callbackify(Gd),
  callbackify(hh),
  callbackify(dh),
  callbackify(ch),
  callbackify(ih),
  callbackify(mh),
  callbackify(nh),
  callbackify(yh),
  callbackify(gh),
  callbackify(Jd),
  callbackify(Yd),
  callbackify(sh),
  callbackify(Sh),
  callbackify(rh),
  callbackify(Xd),
  callbackify(eh),
  callbackify(th),
  callbackify(ah),
  callbackify(oh),
  callbackify(Zd),
  callbackify(lh),
  callbackify(fh),
  callbackify(bh),
  callbackify(wh);
const xh = /^[A-Za-z]:\//;
function normalizeWindowsPath(e = '') {
  return e ? e.replace(/\\/g, '/').replace(xh, (e) => e.toUpperCase()) : e;
}
const Rh = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,
  jh = /^[A-Za-z]:$/;
const isAbsolute = function (e) {
  return Rh.test(e);
};
function readAsset(e) {
  const t = (function (e) {
    const t = normalizeWindowsPath(e)
      .replace(/\/$/, '')
      .split('/')
      .slice(0, -1);
    return (
      1 === t.length && jh.test(t[0]) && (t[0] += '/'),
      t.join('/') || (isAbsolute(e) ? '/' : '.')
    );
  })(S(globalThis._importMeta_.url));
  return Ch.readFile(
    (function (...e) {
      let t = '',
        s = !1;
      for (
        let r = (e = e.map((e) => normalizeWindowsPath(e))).length - 1;
        r >= -1 && !s;
        r--
      ) {
        const o =
          r >= 0
            ? e[r]
            : void 0 !== I && 'function' == typeof I.cwd
              ? I.cwd().replace(/\\/g, '/')
              : '/';
        o && 0 !== o.length && ((t = `${o}/${t}`), (s = isAbsolute(o)));
      }
      return (
        (t = (function (e, t) {
          let s = '',
            r = 0,
            o = -1,
            a = 0,
            u = null;
          for (let d = 0; d <= e.length; ++d) {
            if (d < e.length) u = e[d];
            else {
              if ('/' === u) break;
              u = '/';
            }
            if ('/' === u) {
              if (o === d - 1 || 1 === a);
              else if (2 === a) {
                if (
                  s.length < 2 ||
                  2 !== r ||
                  '.' !== s[s.length - 1] ||
                  '.' !== s[s.length - 2]
                ) {
                  if (s.length > 2) {
                    const e = s.lastIndexOf('/');
                    -1 === e
                      ? ((s = ''), (r = 0))
                      : ((s = s.slice(0, e)),
                        (r = s.length - 1 - s.lastIndexOf('/'))),
                      (o = d),
                      (a = 0);
                    continue;
                  }
                  if (s.length > 0) {
                    (s = ''), (r = 0), (o = d), (a = 0);
                    continue;
                  }
                }
                t && ((s += s.length > 0 ? '/..' : '..'), (r = 2));
              } else
                s.length > 0
                  ? (s += `/${e.slice(o + 1, d)}`)
                  : (s = e.slice(o + 1, d)),
                  (r = d - o - 1);
              (o = d), (a = 0);
            } else '.' === u && -1 !== a ? ++a : (a = -1);
          }
          return s;
        })(t, !s)),
        s && !isAbsolute(t) ? `/${t}` : t.length > 0 ? t : '.'
      );
    })(t, Wd[e].path)
  );
}
const Eh = {
  '/_nuxt/builds/meta/': { maxAge: 31536e3 },
  '/_nuxt/builds/': { maxAge: 1 },
  '/_fonts/': { maxAge: 31536e3 },
  '/_scripts/': { maxAge: 31536e3 },
  '/_nuxt/': { maxAge: 31536e3 }
};
function isPublicAssetURL(e = '') {
  if (Wd[e]) return !0;
  for (const t in Eh) if (e.startsWith(t)) return !0;
  return !1;
}
function getAsset(e) {
  return Wd[e];
}
const Ah = new Set(['HEAD', 'GET']),
  Th = { gzip: '.gz', br: '.br' },
  Oh = _n((e) => {
    if (e.method && !Ah.has(e.method)) return;
    let t = decode(
      withLeadingSlash(withoutTrailingSlash(parseURL(e.path).pathname)).replace(
        Vt,
        '%252F'
      )
    );
    let s;
    const r = [
      ...String(getRequestHeader$1(e, 'accept-encoding') || '')
        .split(',')
        .map((e) => Th[e.trim()])
        .filter(Boolean)
        .sort(),
      ''
    ];
    r.length > 1 &&
      (function (e, t, s) {
        let r = e.node.res.getHeader(t);
        r
          ? (Array.isArray(r) || (r = [r.toString()]),
            e.node.res.setHeader(t, [...r, s]))
          : e.node.res.setHeader(t, s);
      })(e, 'Vary', 'Accept-Encoding');
    for (const e of r)
      for (const r of [t + e, joinURL(t, 'index.html' + e)]) {
        const e = getAsset(r);
        if (e) {
          (s = e), (t = r);
          break;
        }
      }
    if (!s) {
      if (isPublicAssetURL(t))
        throw (
          ((function (e, t) {
            e.node.res.removeHeader(t);
          })(e, 'Cache-Control'),
          createError$1({
            statusMessage: 'Cannot find static asset ' + t,
            statusCode: 404
          }))
        );
      return;
    }
    if (getRequestHeader$1(e, 'if-none-match') === s.etag)
      return setResponseStatus$1(e, 304, 'Not Modified'), '';
    const o = getRequestHeader$1(e, 'if-modified-since'),
      a = new Date(s.mtime);
    return o && s.mtime && new Date(o) >= a
      ? (setResponseStatus$1(e, 304, 'Not Modified'), '')
      : (s.type &&
          !getResponseHeader$1(e, 'Content-Type') &&
          setResponseHeader$1(e, 'Content-Type', s.type),
        s.etag &&
          !getResponseHeader$1(e, 'ETag') &&
          setResponseHeader$1(e, 'ETag', s.etag),
        s.mtime &&
          !getResponseHeader$1(e, 'Last-Modified') &&
          setResponseHeader$1(e, 'Last-Modified', a.toUTCString()),
        s.encoding &&
          !getResponseHeader$1(e, 'Content-Encoding') &&
          setResponseHeader$1(e, 'Content-Encoding', s.encoding),
        s.size > 0 &&
          !getResponseHeader$1(e, 'Content-Length') &&
          setResponseHeader$1(e, 'Content-Length', s.size),
        readAsset(t));
  }),
  Ih = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  Ph = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  Mh = Object.freeze({ ...Ih, ...Ph });
Object.freeze({ ...Mh, body: '', hidden: !1 });
const Nh = Object.freeze({ width: null, height: null }),
  Lh = Object.freeze({ ...Nh, ...Ph });
const Dh = Object.keys(Ih).concat(['provider']);
function getIcons(e, t, s) {
  const r = Object.create(null),
    o = Object.create(null),
    a = { prefix: e.prefix, icons: r },
    u = e.icons,
    d = e.aliases || Object.create(null);
  e.lastModified && (a.lastModified = e.lastModified);
  const h = (function (e, t) {
    const s = e.icons,
      r = e.aliases || Object.create(null),
      o = Object.create(null);
    return (
      (t || Object.keys(s).concat(Object.keys(r))).forEach(function resolve(e) {
        if (s[e]) return (o[e] = []);
        if (!(e in o)) {
          o[e] = null;
          const t = r[e] && r[e].parent,
            s = t && resolve(t);
          s && (o[e] = [t].concat(s));
        }
        return o[e];
      }),
      o
    );
  })(e, t);
  let f = !0;
  for (const e in h)
    h[e] &&
      (u[e]
        ? ((r[e] = { ...u[e] }), (f = !1))
        : ((o[e] = { ...d[e] }), (a.aliases = o)));
  return (
    Dh.forEach((t) => {
      t in e && (a[t] = e[t]);
    }),
    f && !0 !== s ? null : a
  );
}
const Bh = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  Hh = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(e, t, s) {
  if (1 === t) return e;
  if (((s = s || 100), 'number' == typeof e)) return Math.ceil(e * t * s) / s;
  if ('string' != typeof e) return e;
  const r = e.split(Bh);
  if (null === r || !r.length) return e;
  const o = [];
  let a = r.shift(),
    u = Hh.test(a);
  for (;;) {
    if (u) {
      const e = parseFloat(a);
      isNaN(e) ? o.push(a) : o.push(Math.ceil(e * t * s) / s);
    } else o.push(a);
    if (((a = r.shift()), void 0 === a)) return o.join('');
    u = !u;
  }
}
function getCommonCSSRules(e) {
  const t = { display: 'inline-block', width: '1em', height: '1em' },
    s = e.varName;
  switch ((e.pseudoSelector && (t.content = "''"), e.mode)) {
    case 'background':
      s && (t['background-image'] = 'var(--' + s + ')'),
        (t['background-repeat'] = 'no-repeat'),
        (t['background-size'] = '100% 100%');
      break;
    case 'mask':
      (t['background-color'] = 'currentColor'),
        s && (t['mask-image'] = t['-webkit-mask-image'] = 'var(--' + s + ')'),
        (t['mask-repeat'] = t['-webkit-mask-repeat'] = 'no-repeat'),
        (t['mask-size'] = t['-webkit-mask-size'] = '100% 100%');
  }
  return t;
}
function generateItemCSSRules(e, t) {
  const s = {},
    r = t.varName,
    o = (function (e, t) {
      const s = { ...Mh, ...e },
        r = { ...Lh, ...t },
        o = { left: s.left, top: s.top, width: s.width, height: s.height };
      let a = s.body;
      [s, r].forEach((e) => {
        const t = [],
          s = e.hFlip,
          r = e.vFlip;
        let u,
          d = e.rotate;
        switch (
          (s
            ? r
              ? (d += 2)
              : (t.push(
                  'translate(' +
                    (o.width + o.left).toString() +
                    ' ' +
                    (0 - o.top).toString() +
                    ')'
                ),
                t.push('scale(-1 1)'),
                (o.top = o.left = 0))
            : r &&
              (t.push(
                'translate(' +
                  (0 - o.left).toString() +
                  ' ' +
                  (o.height + o.top).toString() +
                  ')'
              ),
              t.push('scale(1 -1)'),
              (o.top = o.left = 0)),
          d < 0 && (d -= 4 * Math.floor(d / 4)),
          (d %= 4),
          d)
        ) {
          case 1:
            (u = o.height / 2 + o.top),
              t.unshift('rotate(90 ' + u.toString() + ' ' + u.toString() + ')');
            break;
          case 2:
            t.unshift(
              'rotate(180 ' +
                (o.width / 2 + o.left).toString() +
                ' ' +
                (o.height / 2 + o.top).toString() +
                ')'
            );
            break;
          case 3:
            (u = o.width / 2 + o.left),
              t.unshift(
                'rotate(-90 ' + u.toString() + ' ' + u.toString() + ')'
              );
        }
        d % 2 == 1 &&
          (o.left !== o.top && ((u = o.left), (o.left = o.top), (o.top = u)),
          o.width !== o.height &&
            ((u = o.width), (o.width = o.height), (o.height = u))),
          t.length &&
            (a = (function (e, t, s) {
              const r = (function (e, t = 'defs') {
                let s = '';
                const r = e.indexOf('<' + t);
                for (; r >= 0; ) {
                  const o = e.indexOf('>', r),
                    a = e.indexOf('</' + t);
                  if (-1 === o || -1 === a) break;
                  const u = e.indexOf('>', a);
                  if (-1 === u) break;
                  (s += e.slice(o + 1, a).trim()),
                    (e = e.slice(0, r).trim() + e.slice(u + 1));
                }
                return { defs: s, content: e };
              })(e);
              return (
                (o = r.defs),
                (a = t + r.content + s),
                o ? '<defs>' + o + '</defs>' + a : a
              );
              var o, a;
            })(a, '<g transform="' + t.join(' ') + '">', '</g>'));
      });
      const u = r.width,
        d = r.height,
        h = o.width,
        f = o.height;
      let m, g;
      null === u
        ? ((g = null === d ? '1em' : 'auto' === d ? f : d),
          (m = calculateSize(g, h / f)))
        : ((m = 'auto' === u ? h : u),
          (g = null === d ? calculateSize(m, f / h) : 'auto' === d ? f : d));
      const v = {},
        setAttr = (e, t) => {
          ((e) => 'unset' === e || 'undefined' === e || 'none' === e)(t) ||
            (v[e] = t.toString());
        };
      setAttr('width', m), setAttr('height', g);
      const S = [o.left, o.top, h, f];
      return (v.viewBox = S.join(' ')), { attributes: v, viewBox: S, body: a };
    })(e);
  let a = o.viewBox;
  a[2] !== a[3] &&
    (t.forceSquare
      ? (a = (function (e) {
          const [t, s, r, o] = e;
          if (r !== o) {
            const e = Math.max(r, o);
            return [t - (e - r) / 2, s - (e - o) / 2, e, e];
          }
          return e;
        })(a))
      : (s.width = calculateSize('1em', a[2] / a[3])));
  const u = (function (e) {
    return (
      'url("' +
      (function (e) {
        return (
          'data:image/svg+xml,' +
          (function (e) {
            return e
              .replace(/"/g, "'")
              .replace(/%/g, '%25')
              .replace(/#/g, '%23')
              .replace(/</g, '%3C')
              .replace(/>/g, '%3E')
              .replace(/\s+/g, ' ');
          })(e)
        );
      })(e) +
      '")'
    );
  })(
    (function (e, t) {
      let s =
        -1 === e.indexOf('xlink:')
          ? ''
          : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
      for (const e in t) s += ' ' + e + '="' + t[e] + '"';
      return '<svg xmlns="http://www.w3.org/2000/svg"' + s + '>' + e + '</svg>';
    })(o.body.replace(/currentColor/g, t.color || 'black'), {
      viewBox: `${a[0]} ${a[1]} ${a[2]} ${a[3]}`,
      width: `${a[2]}`,
      height: `${a[3]}`
    })
  );
  if (r) s['--' + r] = u;
  else
    switch (t.mode) {
      case 'background':
        s['background-image'] = u;
        break;
      case 'mask':
        s['mask-image'] = s['-webkit-mask-image'] = u;
    }
  return s;
}
const zh = {
  selectorStart: { compressed: '{', compact: ' {', expanded: ' {' },
  selectorEnd: { compressed: '}', compact: '; }\n', expanded: ';\n}\n' },
  rule: { compressed: '{key}:', compact: ' {key}: ', expanded: '\n  {key}: ' }
};
function getIconCSS(e, t = {}) {
  const s = t.customise ? t.customise(e.body) : e.body,
    r =
      t.mode ||
      (t.color || !s.includes('currentColor') ? 'background' : 'mask');
  let o = t.varName;
  void 0 === o && 'mask' === r && (o = 'svg');
  const a = { ...t, mode: r, varName: o };
  'background' === r && delete a.varName;
  const u = {
    ...t.rules,
    ...getCommonCSSRules(a),
    ...generateItemCSSRules({ ...Mh, ...e, body: s }, a)
  };
  return (function (e, t = 'expanded') {
    const s = [];
    for (let r = 0; r < e.length; r++) {
      const { selector: o, rules: a } = e[r];
      let u =
          (o instanceof Array ? o.join('compressed' === t ? ',' : ', ') : o) +
          zh.selectorStart[t],
        d = !0;
      for (const e in a)
        d || (u += ';'), (u += zh.rule[t].replace('{key}', e) + a[e]), (d = !1);
      (u += zh.selectorEnd[t]), s.push(u);
    }
    return s.join('compressed' === t ? '' : '\n');
  })([{ selector: t.iconSelector || '.icon', rules: u }], a.format);
}
const Fh = Object.freeze({
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
function objectHash(e, t) {
  const s = createHasher((t = t ? { ...Fh, ...t } : Fh));
  return s.dispatch(e), s.toString();
}
const $h = Object.freeze(['prototype', '__proto__', 'constructor']);
function createHasher(e) {
  let s = '',
    r = new Map();
  const write = (e) => {
    s += e;
  };
  return {
    toString: () => s,
    getContext: () => r,
    dispatch(t) {
      e.replacer && (t = e.replacer(t));
      return this[null === t ? 'null' : typeof t](t);
    },
    object(s) {
      if (s && 'function' == typeof s.toJSON) return this.object(s.toJSON());
      const o = Object.prototype.toString.call(s);
      let a = '';
      const u = o.length;
      (a = u < 10 ? 'unknown:[' + o + ']' : o.slice(8, u - 1)),
        (a = a.toLowerCase());
      let d = null;
      if (void 0 !== (d = r.get(s)))
        return this.dispatch('[CIRCULAR:' + d + ']');
      if ((r.set(s, r.size), void 0 !== t && t.isBuffer && t.isBuffer(s)))
        return write('buffer:'), write(s.toString('utf8'));
      if ('object' !== a && 'function' !== a && 'asyncfunction' !== a)
        this[a] ? this[a](s) : e.ignoreUnknown || this.unkown(s, a);
      else {
        let t = Object.keys(s);
        e.unorderedObjects && (t = t.sort());
        let r = [];
        !1 === e.respectType || isNativeFunction(s) || (r = $h),
          e.excludeKeys &&
            ((t = t.filter((t) => !e.excludeKeys(t))),
            (r = r.filter((t) => !e.excludeKeys(t)))),
          write('object:' + (t.length + r.length) + ':');
        const dispatchForKey = (t) => {
          this.dispatch(t),
            write(':'),
            e.excludeValues || this.dispatch(s[t]),
            write(',');
        };
        for (const e of t) dispatchForKey(e);
        for (const e of r) dispatchForKey(e);
      }
    },
    array(t, s) {
      if (
        ((s = void 0 === s ? !1 !== e.unorderedArrays : s),
        write('array:' + t.length + ':'),
        !s || t.length <= 1)
      ) {
        for (const e of t) this.dispatch(e);
        return;
      }
      const o = new Map(),
        a = t.map((t) => {
          const s = createHasher(e);
          s.dispatch(t);
          for (const [e, t] of s.getContext()) o.set(e, t);
          return s.toString();
        });
      return (r = o), a.sort(), this.array(a, !1);
    },
    date: (e) => write('date:' + e.toJSON()),
    symbol: (e) => write('symbol:' + e.toString()),
    unkown(e, t) {
      if ((write(t), e))
        return (
          write(':'),
          e && 'function' == typeof e.entries
            ? this.array(Array.from(e.entries()), !0)
            : void 0
        );
    },
    error: (e) => write('error:' + e.toString()),
    boolean: (e) => write('bool:' + e),
    string(e) {
      write('string:' + e.length + ':'), write(e);
    },
    function(t) {
      write('fn:'),
        isNativeFunction(t)
          ? this.dispatch('[native]')
          : this.dispatch(t.toString()),
        !1 !== e.respectFunctionNames &&
          this.dispatch('function-name:' + String(t.name)),
        e.respectFunctionProperties && this.object(t);
    },
    number: (e) => write('number:' + e),
    xml: (e) => write('xml:' + e.toString()),
    null: () => write('Null'),
    undefined: () => write('Undefined'),
    regexp: (e) => write('regex:' + e.toString()),
    uint8array(e) {
      return write('uint8array:'), this.dispatch(Array.prototype.slice.call(e));
    },
    uint8clampedarray(e) {
      return (
        write('uint8clampedarray:'),
        this.dispatch(Array.prototype.slice.call(e))
      );
    },
    int8array(e) {
      return write('int8array:'), this.dispatch(Array.prototype.slice.call(e));
    },
    uint16array(e) {
      return (
        write('uint16array:'), this.dispatch(Array.prototype.slice.call(e))
      );
    },
    int16array(e) {
      return write('int16array:'), this.dispatch(Array.prototype.slice.call(e));
    },
    uint32array(e) {
      return (
        write('uint32array:'), this.dispatch(Array.prototype.slice.call(e))
      );
    },
    int32array(e) {
      return write('int32array:'), this.dispatch(Array.prototype.slice.call(e));
    },
    float32array(e) {
      return (
        write('float32array:'), this.dispatch(Array.prototype.slice.call(e))
      );
    },
    float64array(e) {
      return (
        write('float64array:'), this.dispatch(Array.prototype.slice.call(e))
      );
    },
    arraybuffer(e) {
      return write('arraybuffer:'), this.dispatch(new Uint8Array(e));
    },
    url: (e) => write('url:' + e.toString()),
    map(t) {
      write('map:');
      const s = [...t];
      return this.array(s, !1 !== e.unorderedSets);
    },
    set(t) {
      write('set:');
      const s = [...t];
      return this.array(s, !1 !== e.unorderedSets);
    },
    file(e) {
      return (
        write('file:'), this.dispatch([e.name, e.size, e.type, e.lastModfied])
      );
    },
    blob() {
      if (e.ignoreUnknown) return write('[blob]');
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow: () => write('domwindow'),
    bigint: (e) => write('bigint:' + e.toString()),
    process: () => write('process'),
    timer: () => write('timer'),
    pipe: () => write('pipe'),
    tcp: () => write('tcp'),
    udp: () => write('udp'),
    tty: () => write('tty'),
    statwatcher: () => write('statwatcher'),
    securecontext: () => write('securecontext'),
    connection: () => write('connection'),
    zlib: () => write('zlib'),
    context: () => write('context'),
    nodescript: () => write('nodescript'),
    httpparser: () => write('httpparser'),
    dataview: () => write('dataview'),
    signal: () => write('signal'),
    fsevent: () => write('fsevent'),
    tlswrap: () => write('tlswrap')
  };
}
const Uh = '[native code] }',
  qh = Uh.length;
function isNativeFunction(e) {
  return (
    'function' == typeof e &&
    Function.prototype.toString.call(e).slice(-qh) === Uh
  );
}
function diff(e, t, s = {}) {
  return _diff(_toHashedObject(e, s), _toHashedObject(t, s), s);
}
function _diff(e, t, s = {}) {
  const r = [],
    o = new Set([...Object.keys(e.props || {}), ...Object.keys(t.props || {})]);
  if (e.props && t.props)
    for (const a of o) {
      const o = e.props[a],
        u = t.props[a];
      o && u
        ? r.push(..._diff(e.props?.[a], t.props?.[a], s))
        : (o || u) &&
          r.push(new DiffEntry((u || o).key, o ? 'removed' : 'added', u, o));
    }
  return (
    0 === o.size &&
      e.hash !== t.hash &&
      r.push(new DiffEntry((t || e).key, 'changed', t, e)),
    r
  );
}
function _toHashedObject(e, t, s = '') {
  if (e && 'object' != typeof e)
    return new DiffHashedObject(s, e, objectHash(e, t));
  const r = {},
    o = [];
  for (const a in e)
    (r[a] = _toHashedObject(e[a], t, s ? `${s}.${a}` : a)), o.push(r[a].hash);
  return new DiffHashedObject(s, e, `{${o.join(':')}}`, r);
}
class DiffEntry {
  constructor(e, t, s, r) {
    (this.key = e), (this.type = t), (this.newValue = s), (this.oldValue = r);
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case 'added':
        return `Added   \`${this.key}\``;
      case 'removed':
        return `Removed \`${this.key}\``;
      case 'changed':
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || '-'}\` to \`${this.newValue.toString()}\``;
    }
  }
}
class DiffHashedObject {
  constructor(e, t, s, r) {
    (this.key = e), (this.value = t), (this.hash = s), (this.props = r);
  }
  toString() {
    return this.props
      ? `{${Object.keys(this.props).join(',')}}`
      : JSON.stringify(this.value);
  }
  toJSON() {
    const e = this.key || '.';
    return this.props
      ? `${e}({${Object.keys(this.props).join(',')}})`
      : `${e}(${this.value})`;
  }
}
function isEqual(e, t, s = {}) {
  return e === t || objectHash(e, s) === objectHash(t, s);
}
class WordArray {
  words;
  sigBytes;
  constructor(e, t) {
    (e = this.words = e || []),
      (this.sigBytes = void 0 === t ? 4 * e.length : t);
  }
  toString(e) {
    return (e || Vh).stringify(this);
  }
  concat(e) {
    if ((this.clamp(), this.sigBytes % 4))
      for (let t = 0; t < e.sigBytes; t++) {
        const s = (e.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
        this.words[(this.sigBytes + t) >>> 2] |=
          s << (24 - ((this.sigBytes + t) % 4) * 8);
      }
    else
      for (let t = 0; t < e.sigBytes; t += 4)
        this.words[(this.sigBytes + t) >>> 2] = e.words[t >>> 2];
    return (this.sigBytes += e.sigBytes), this;
  }
  clamp() {
    (this.words[this.sigBytes >>> 2] &=
      4294967295 << (32 - (this.sigBytes % 4) * 8)),
      (this.words.length = Math.ceil(this.sigBytes / 4));
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Vh = {
    stringify(e) {
      const t = [];
      for (let s = 0; s < e.sigBytes; s++) {
        const r = (e.words[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
        t.push((r >>> 4).toString(16), (15 & r).toString(16));
      }
      return t.join('');
    }
  },
  Wh = {
    stringify(e) {
      const t = [];
      for (let s = 0; s < e.sigBytes; s += 3) {
        const r =
          (((e.words[s >>> 2] >>> (24 - (s % 4) * 8)) & 255) << 16) |
          (((e.words[(s + 1) >>> 2] >>> (24 - ((s + 1) % 4) * 8)) & 255) << 8) |
          ((e.words[(s + 2) >>> 2] >>> (24 - ((s + 2) % 4) * 8)) & 255);
        for (let o = 0; o < 4 && 8 * s + 6 * o < 8 * e.sigBytes; o++)
          t.push(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
              (r >>> (6 * (3 - o))) & 63
            )
          );
      }
      return t.join('');
    }
  },
  Kh = {
    parse(e) {
      const t = e.length,
        s = [];
      for (let r = 0; r < t; r++)
        s[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
      return new WordArray(s, t);
    }
  },
  Qh = { parse: (e) => Kh.parse(unescape(encodeURIComponent(e))) };
class BufferedBlockAlgorithm {
  _data = new WordArray();
  _nDataBytes = 0;
  _minBufferSize = 0;
  blockSize = 16;
  reset() {
    (this._data = new WordArray()), (this._nDataBytes = 0);
  }
  _append(e) {
    'string' == typeof e && (e = Qh.parse(e)),
      this._data.concat(e),
      (this._nDataBytes += e.sigBytes);
  }
  _doProcessBlock(e, t) {}
  _process(e) {
    let t,
      s = this._data.sigBytes / (4 * this.blockSize);
    s = e ? Math.ceil(s) : Math.max((0 | s) - this._minBufferSize, 0);
    const r = s * this.blockSize,
      o = Math.min(4 * r, this._data.sigBytes);
    if (r) {
      for (let e = 0; e < r; e += this.blockSize)
        this._doProcessBlock(this._data.words, e);
      (t = this._data.words.splice(0, r)), (this._data.sigBytes -= o);
    }
    return new WordArray(t, o);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(e) {
    return this._append(e), this._process(), this;
  }
  finalize(e) {
    e && this._append(e);
  }
}
const Gh = [
    1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372,
    528734635, 1541459225
  ],
  Jh = [
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
  Yh = [];
class SHA256 extends Hasher {
  _hash = new WordArray([...Gh]);
  reset() {
    super.reset(), (this._hash = new WordArray([...Gh]));
  }
  _doProcessBlock(e, t) {
    const s = this._hash.words;
    let r = s[0],
      o = s[1],
      a = s[2],
      u = s[3],
      d = s[4],
      h = s[5],
      f = s[6],
      m = s[7];
    for (let s = 0; s < 64; s++) {
      if (s < 16) Yh[s] = 0 | e[t + s];
      else {
        const e = Yh[s - 15],
          t = ((e << 25) | (e >>> 7)) ^ ((e << 14) | (e >>> 18)) ^ (e >>> 3),
          r = Yh[s - 2],
          o = ((r << 15) | (r >>> 17)) ^ ((r << 13) | (r >>> 19)) ^ (r >>> 10);
        Yh[s] = t + Yh[s - 7] + o + Yh[s - 16];
      }
      const g = (r & o) ^ (r & a) ^ (o & a),
        v =
          ((r << 30) | (r >>> 2)) ^
          ((r << 19) | (r >>> 13)) ^
          ((r << 10) | (r >>> 22)),
        S =
          m +
          (((d << 26) | (d >>> 6)) ^
            ((d << 21) | (d >>> 11)) ^
            ((d << 7) | (d >>> 25))) +
          ((d & h) ^ (~d & f)) +
          Jh[s] +
          Yh[s];
      (m = f),
        (f = h),
        (h = d),
        (d = (u + S) | 0),
        (u = a),
        (a = o),
        (o = r),
        (r = (S + (v + g)) | 0);
    }
    (s[0] = (s[0] + r) | 0),
      (s[1] = (s[1] + o) | 0),
      (s[2] = (s[2] + a) | 0),
      (s[3] = (s[3] + u) | 0),
      (s[4] = (s[4] + d) | 0),
      (s[5] = (s[5] + h) | 0),
      (s[6] = (s[6] + f) | 0),
      (s[7] = (s[7] + m) | 0);
  }
  finalize(e) {
    super.finalize(e);
    const t = 8 * this._nDataBytes,
      s = 8 * this._data.sigBytes;
    return (
      (this._data.words[s >>> 5] |= 128 << (24 - (s % 32))),
      (this._data.words[14 + (((s + 64) >>> 9) << 4)] = Math.floor(
        t / 4294967296
      )),
      (this._data.words[15 + (((s + 64) >>> 9) << 4)] = t),
      (this._data.sigBytes = 4 * this._data.words.length),
      this._process(),
      this._hash
    );
  }
}
function hash(e, t = {}) {
  const s = 'string' == typeof e ? e : objectHash(e, t);
  return ((r = s), new SHA256().finalize(r).toString(Wh)).slice(0, 10);
  var r;
}
function createRemoteCollection(e) {
  let t;
  return async () => {
    if (t) return t;
    const s = await fetch(e).then((e) => e.json());
    return (t = s), s;
  };
}
const Xh = {
    academicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/academicons/icons.json'
    ),
    'akar-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/akar-icons/icons.json'
    ),
    'ant-design': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ant-design/icons.json'
    ),
    arcticons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/arcticons/icons.json'
    ),
    basil: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/basil/icons.json'
    ),
    bi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bi/icons.json'
    ),
    'bitcoin-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bitcoin-icons/icons.json'
    ),
    bpmn: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bpmn/icons.json'
    ),
    brandico: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/brandico/icons.json'
    ),
    bx: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bx/icons.json'
    ),
    bxl: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bxl/icons.json'
    ),
    bxs: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bxs/icons.json'
    ),
    bytesize: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/bytesize/icons.json'
    ),
    carbon: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/carbon/icons.json'
    ),
    catppuccin: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/catppuccin/icons.json'
    ),
    cbi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cbi/icons.json'
    ),
    charm: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/charm/icons.json'
    ),
    ci: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ci/icons.json'
    ),
    cib: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cib/icons.json'
    ),
    cif: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cif/icons.json'
    ),
    cil: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cil/icons.json'
    ),
    'circle-flags': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/circle-flags/icons.json'
    ),
    circum: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/circum/icons.json'
    ),
    clarity: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/clarity/icons.json'
    ),
    codicon: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/codicon/icons.json'
    ),
    covid: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/covid/icons.json'
    ),
    cryptocurrency: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cryptocurrency/icons.json'
    ),
    'cryptocurrency-color': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/cryptocurrency-color/icons.json'
    ),
    dashicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/dashicons/icons.json'
    ),
    devicon: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/devicon/icons.json'
    ),
    'devicon-plain': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/devicon-plain/icons.json'
    ),
    ei: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ei/icons.json'
    ),
    el: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/el/icons.json'
    ),
    emojione: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/emojione/icons.json'
    ),
    'emojione-monotone': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/emojione-monotone/icons.json'
    ),
    'emojione-v1': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/emojione-v1/icons.json'
    ),
    entypo: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/entypo/icons.json'
    ),
    'entypo-social': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/entypo-social/icons.json'
    ),
    'eos-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/eos-icons/icons.json'
    ),
    ep: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ep/icons.json'
    ),
    et: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/et/icons.json'
    ),
    eva: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/eva/icons.json'
    ),
    f7: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/f7/icons.json'
    ),
    fa: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa/icons.json'
    ),
    'fa-brands': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa-brands/icons.json'
    ),
    'fa-regular': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa-regular/icons.json'
    ),
    'fa-solid': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa-solid/icons.json'
    ),
    'fa6-brands': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa6-brands/icons.json'
    ),
    'fa6-regular': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa6-regular/icons.json'
    ),
    'fa6-solid': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fa6-solid/icons.json'
    ),
    fad: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fad/icons.json'
    ),
    fe: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fe/icons.json'
    ),
    feather: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/feather/icons.json'
    ),
    'file-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/file-icons/icons.json'
    ),
    flag: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/flag/icons.json'
    ),
    flagpack: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/flagpack/icons.json'
    ),
    'flat-color-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/flat-color-icons/icons.json'
    ),
    'flat-ui': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/flat-ui/icons.json'
    ),
    flowbite: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/flowbite/icons.json'
    ),
    fluent: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fluent/icons.json'
    ),
    'fluent-emoji': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fluent-emoji/icons.json'
    ),
    'fluent-emoji-flat': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fluent-emoji-flat/icons.json'
    ),
    'fluent-emoji-high-contrast': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fluent-emoji-high-contrast/icons.json'
    ),
    'fluent-mdl2': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fluent-mdl2/icons.json'
    ),
    fontelico: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fontelico/icons.json'
    ),
    fontisto: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fontisto/icons.json'
    ),
    formkit: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/formkit/icons.json'
    ),
    foundation: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/foundation/icons.json'
    ),
    fxemoji: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/fxemoji/icons.json'
    ),
    gala: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/gala/icons.json'
    ),
    'game-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/game-icons/icons.json'
    ),
    geo: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/geo/icons.json'
    ),
    gg: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/gg/icons.json'
    ),
    gis: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/gis/icons.json'
    ),
    'gravity-ui': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/gravity-ui/icons.json'
    ),
    gridicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/gridicons/icons.json'
    ),
    'grommet-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/grommet-icons/icons.json'
    ),
    guidance: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/guidance/icons.json'
    ),
    healthicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/healthicons/icons.json'
    ),
    heroicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/heroicons/icons.json'
    ),
    'heroicons-outline': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/heroicons-outline/icons.json'
    ),
    'heroicons-solid': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/heroicons-solid/icons.json'
    ),
    hugeicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/hugeicons/icons.json'
    ),
    humbleicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/humbleicons/icons.json'
    ),
    ic: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ic/icons.json'
    ),
    'icomoon-free': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icomoon-free/icons.json'
    ),
    'icon-park': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icon-park/icons.json'
    ),
    'icon-park-outline': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icon-park-outline/icons.json'
    ),
    'icon-park-solid': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icon-park-solid/icons.json'
    ),
    'icon-park-twotone': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icon-park-twotone/icons.json'
    ),
    iconamoon: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/iconamoon/icons.json'
    ),
    iconoir: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/iconoir/icons.json'
    ),
    icons8: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/icons8/icons.json'
    ),
    il: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/il/icons.json'
    ),
    ion: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ion/icons.json'
    ),
    iwwa: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/iwwa/icons.json'
    ),
    jam: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/jam/icons.json'
    ),
    la: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/la/icons.json'
    ),
    'lets-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/lets-icons/icons.json'
    ),
    'line-md': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/line-md/icons.json'
    ),
    logos: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/logos/icons.json'
    ),
    ls: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ls/icons.json'
    ),
    lucide: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/lucide/icons.json'
    ),
    'lucide-lab': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/lucide-lab/icons.json'
    ),
    mage: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mage/icons.json'
    ),
    majesticons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/majesticons/icons.json'
    ),
    maki: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/maki/icons.json'
    ),
    map: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/map/icons.json'
    ),
    marketeq: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/marketeq/icons.json'
    ),
    'material-symbols': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/material-symbols/icons.json'
    ),
    'material-symbols-light': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/material-symbols-light/icons.json'
    ),
    mdi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mdi/icons.json'
    ),
    'mdi-light': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mdi-light/icons.json'
    ),
    'medical-icon': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/medical-icon/icons.json'
    ),
    memory: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/memory/icons.json'
    ),
    meteocons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/meteocons/icons.json'
    ),
    mi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mi/icons.json'
    ),
    mingcute: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mingcute/icons.json'
    ),
    'mono-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mono-icons/icons.json'
    ),
    mynaui: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/mynaui/icons.json'
    ),
    nimbus: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/nimbus/icons.json'
    ),
    nonicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/nonicons/icons.json'
    ),
    noto: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/noto/icons.json'
    ),
    'noto-v1': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/noto-v1/icons.json'
    ),
    octicon: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/octicon/icons.json'
    ),
    oi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/oi/icons.json'
    ),
    ooui: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ooui/icons.json'
    ),
    openmoji: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/openmoji/icons.json'
    ),
    oui: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/oui/icons.json'
    ),
    pajamas: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pajamas/icons.json'
    ),
    pepicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pepicons/icons.json'
    ),
    'pepicons-pencil': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pepicons-pencil/icons.json'
    ),
    'pepicons-pop': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pepicons-pop/icons.json'
    ),
    'pepicons-print': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pepicons-print/icons.json'
    ),
    ph: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ph/icons.json'
    ),
    pixelarticons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/pixelarticons/icons.json'
    ),
    prime: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/prime/icons.json'
    ),
    ps: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ps/icons.json'
    ),
    quill: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/quill/icons.json'
    ),
    'radix-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/radix-icons/icons.json'
    ),
    raphael: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/raphael/icons.json'
    ),
    ri: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/ri/icons.json'
    ),
    'rivet-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/rivet-icons/icons.json'
    ),
    'si-glyph': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/si-glyph/icons.json'
    ),
    'simple-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/simple-icons/icons.json'
    ),
    'simple-line-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/simple-line-icons/icons.json'
    ),
    'skill-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/skill-icons/icons.json'
    ),
    solar: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/solar/icons.json'
    ),
    streamline: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/streamline/icons.json'
    ),
    'streamline-emojis': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/streamline-emojis/icons.json'
    ),
    subway: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/subway/icons.json'
    ),
    'svg-spinners': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/svg-spinners/icons.json'
    ),
    'system-uicons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/system-uicons/icons.json'
    ),
    tabler: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/tabler/icons.json'
    ),
    tdesign: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/tdesign/icons.json'
    ),
    teenyicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/teenyicons/icons.json'
    ),
    token: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/token/icons.json'
    ),
    'token-branded': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/token-branded/icons.json'
    ),
    topcoat: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/topcoat/icons.json'
    ),
    twemoji: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/twemoji/icons.json'
    ),
    typcn: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/typcn/icons.json'
    ),
    uil: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/uil/icons.json'
    ),
    uim: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/uim/icons.json'
    ),
    uis: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/uis/icons.json'
    ),
    uit: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/uit/icons.json'
    ),
    uiw: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/uiw/icons.json'
    ),
    unjs: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/unjs/icons.json'
    ),
    vaadin: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/vaadin/icons.json'
    ),
    vs: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/vs/icons.json'
    ),
    'vscode-icons': createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/vscode-icons/icons.json'
    ),
    websymbol: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/websymbol/icons.json'
    ),
    weui: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/weui/icons.json'
    ),
    whh: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/whh/icons.json'
    ),
    wi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/wi/icons.json'
    ),
    wpf: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/wpf/icons.json'
    ),
    zmdi: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/zmdi/icons.json'
    ),
    zondicons: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/zondicons/icons.json'
    ),
    custom: createRemoteCollection(
      'https://cdn.jsdelivr.net/npm/@iconify-json/custom/icons.json'
    ),
    custom: () => ({ prefix: 'custom', icons: {} })
  },
  Zh = defineCachedEventHandler(
    async (e) => {
      const t = (function (e, t = {}) {
        const s = getRequestHost(e, t),
          r = getRequestProtocol(e, t),
          o = (e.node.req.originalUrl || e.path).replace(/^[/\\]+/g, '/');
        return new URL(o, `${r}://${s}`);
      })(e);
      if (!t)
        return createError({ status: 400, message: 'Invalid icon request' });
      const s = ri.icon,
        r = e.context.params?.collection?.replace(/\.json$/, ''),
        o = r ? await Xh[r]?.() : null,
        a = s.iconifyApiEndpoint || 'https://api.iconify.design',
        u = t.searchParams.get('icons')?.split(',');
      if (o && u?.length) {
        const e = getIcons(o, u);
        return (
          go.debug(
            `[Icon] serving ${(u || []).map((e) => '`' + r + ':' + e + '`').join(',')} from bundled collection`
          ),
          e
        );
      }
      if (!0 === s.fallbackToApi || 'server-only' === s.fallbackToApi) {
        const e = new URL(
          './' +
            (function (e, t) {
              const s = normalizeWindowsPath(e).split('/').pop();
              return t && s.endsWith(t) ? s.slice(0, -t.length) : s;
            })(t.pathname) +
            t.search,
          a
        );
        if (
          (go.debug(
            `[Icon] fetching ${(u || []).map((e) => '`' + r + ':' + e + '`').join(',')} from iconify api`
          ),
          e.host !== new URL(a).host)
        )
          return createError({ status: 400, message: 'Invalid icon request' });
        try {
          return await $fetch(e.href);
        } catch (e) {
          return (
            go.error(e),
            404 === e.status
              ? createError({ status: 404 })
              : createError({
                  status: 500,
                  message: 'Failed to fetch fallback icon'
                })
          );
        }
      }
      return createError({ status: 404 });
    },
    {
      group: 'nuxt',
      name: 'icon',
      getKey(e) {
        const t =
            e.context.params?.collection?.replace(/\.json$/, '') || 'unknown',
          s = String(getQuery(e).icons || '');
        return `${t}_${s.split(',')[0]}_${s.length}_${hash(s)}`;
      },
      swr: !0,
      maxAge: 604800
    }
  ),
  ep = defineEventHandler(async (e) => {
    if (e.context._initedSiteConfig) return;
    const t = useRuntimeConfig(e),
      s = t['nuxt-site-config'],
      r = useNitroApp(),
      o = e.context.siteConfig || createSiteConfigStack({ debug: s.debug }),
      a = useNitroOrigin(e);
    (e.context.siteConfigNitroOrigin = a),
      o.push({ _context: 'nitro:init', _priority: -4, url: a }),
      o.push({
        _context: 'runtimeEnv',
        _priority: 0,
        ...(t.site || {}),
        ...(t.public.site || {}),
        ...envSiteConfig(globalThis._importMeta_.env)
      });
    if (
      ((s.stack || []).forEach((e) => o.push(e)),
      e.context._nitro.routeRules.site &&
        o.push({
          _context: 'route-rules',
          ...e.context._nitro.routeRules.site
        }),
      s.multiTenancy)
    ) {
      const e = parseURL(a).host,
        t = s.multiTenancy?.find((t) => t.hosts.includes(e));
      t &&
        o.push({ _context: `multi-tenancy:${e}`, _priority: 0, ...t.config });
    }
    const u = { siteConfig: o, event: e };
    await r.hooks.callHook('site-config:init', u),
      (e.context.siteConfig = u.siteConfig),
      (e.context._initedSiteConfig = !0);
  }),
  tp = defineEventHandler(async (e) => {
    const t = useNitroApp(),
      { indexable: s } = getSiteRobotConfig(e),
      {
        credits: r,
        isNuxtContentV2: o,
        cacheControl: a
      } = useRuntimeConfig(e)['nuxt-robots'];
    let u = {
      sitemaps: [],
      groups: [{ allow: [], comment: [], userAgent: ['*'], disallow: ['/'] }]
    };
    if (
      s &&
      ((u = await resolveRobotsTxtContext(e)),
      (u.sitemaps = [
        ...new Set(
          asArray(u.sitemaps).map((t) =>
            t.startsWith('http')
              ? t
              : (function (e, t, s = {}) {
                  const r = e.context.siteConfig?.get();
                  let o = e.context.siteConfigNitroOrigin;
                  return (
                    !1 !== s.canonical && r.url && (o = r.url),
                    resolveSitePath$1(t, {
                      absolute: !0,
                      siteUrl: o,
                      trailingSlash: r.trailingSlash,
                      base: e.context.nitro.baseURL,
                      withBase: s.withBase
                    })
                  );
                })(e, t, { withBase: !0 })
          )
        )
      ]),
      o)
    ) {
      const t = await e.$fetch('/__robots__/nuxt-content.json', {
        headers: { Accept: 'application/json' }
      });
      if (String(t).trim().startsWith('<!DOCTYPE'))
        yo.error(
          'Invalid HTML returned from /__robots__/nuxt-content.json, skipping.'
        );
      else
        for (const e of u.groups)
          e.userAgent.includes('*') &&
            (e.disallow.push(...t), (e.disallow = e.disallow.filter(Boolean)));
    }
    let d = (function ({ groups: e, sitemaps: t }) {
      const s = [];
      for (const t of e) {
        for (const e of t.comment || []) s.push(`# ${e}`);
        for (const e of t.userAgent || ['*']) s.push(`User-agent: ${e}`);
        for (const e of t.allow || []) s.push(`Allow: ${e}`);
        for (const e of t.disallow || []) s.push(`Disallow: ${e}`);
        for (const e of t.cleanParam || []) s.push(`Clean-param: ${e}`);
        s.push('');
      }
      for (const e of t) s.push(`Sitemap: ${e}`);
      return s.join('\n');
    })(u);
    r &&
      (d = [
        `# START nuxt-robots (${s ? 'indexable' : 'indexing disabled'})`,
        d,
        '# END nuxt-robots'
      ]
        .filter(Boolean)
        .join('\n')),
      Uo(e, 'Content-Type', 'text/plain; charset=utf-8'),
      Uo(
        e,
        'Cache-Control',
        globalThis._importMeta_.test || !a ? 'no-store' : a
      );
    const h = { robotsTxt: d, e: e };
    return await t.hooks.callHook('robots:robots-txt', h), h.robotsTxt;
  }),
  np = defineEventHandler(async (e) => {
    if (
      '/robots.txt' === e.path ||
      e.path.startsWith('/__') ||
      e.path.startsWith('/api') ||
      e.path.startsWith('/_nuxt')
    )
      return;
    const t = useRuntimeConfig(e)['nuxt-robots'];
    if (t) {
      const { header: s } = t,
        r = getPathRobotConfig(e);
      s && Uo(e, 'X-Robots-Tag', r.rule), (e.context.robots = r);
    }
  });
createConsola({ defaults: { tag: '@nuxt/sitemap' } });
const sp = createDefu$1(
  (e, t, s) => (
    Array.isArray(e[t]) &&
      Array.isArray(s) &&
      (e[t] = Array.from(new Set([...e[t], ...s]))),
    e[t]
  )
);
function mergeOnKey(e, t) {
  const s = {};
  return (
    e.forEach((e) => {
      const r = e[t];
      s[r] = sp(e, s[r] || {});
    }),
    Object.values(s)
  );
}
function splitForLocales(e, t) {
  const s = withLeadingSlash(e).split('/')[1];
  return t.includes(s) ? [s, e.replace(`/${s}`, '')] : [null, e];
}
const rp = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(e) {
  return (e || [])
    .map((e) => {
      if (e instanceof RegExp || 'string' == typeof e) return e;
      const t = e.regex.match(rp);
      return !!t && new RegExp(t[1], t[2]);
    })
    .filter(Boolean);
}
function createPathFilter(e = {}) {
  const t = (function (e = {}) {
    const t = e.include || [],
      s = e.exclude || [];
    return 0 === t.length && 0 === s.length
      ? () => !0
      : function (e) {
          for (const r of [
            { rules: s, result: !1 },
            { rules: t, result: !0 }
          ]) {
            const t = r.rules.filter((e) => e instanceof RegExp);
            if (t.some((t) => t.test(e))) return r.result;
            const s = r.rules.filter((e) => 'string' == typeof e);
            if (s.length > 0) {
              const t = {};
              for (const o of s) {
                if (o === e) return r.result;
                t[o] = !0;
              }
              if (
                toRouteMatcher(
                  createRouter$1({ routes: t, strictTrailingSlash: !1 })
                ).matchAll(e).length > 0
              )
                return Boolean(r.result);
            }
          }
          return 0 === t.length;
        };
  })(e);
  return (e) => {
    let s = e;
    try {
      s = parseURL(e).pathname;
    } catch {
      return !1;
    }
    return t(s);
  };
}
function useSitemapRuntimeConfig(e) {
  const t = JSON.parse(JSON.stringify(useRuntimeConfig(e).sitemap));
  for (const e in t.sitemaps) {
    const s = t.sitemaps[e];
    (s.include = normalizeRuntimeFilters(s.include)),
      (s.exclude = normalizeRuntimeFilters(s.exclude)),
      (t.sitemaps[e] = s);
  }
  return Object.freeze(t);
}
const op = defineEventHandler(async (e) => {
  const t = createSitePathResolver(e, { absolute: !1, withBase: !0 }),
    {
      sitemapName: s,
      cacheMaxAgeSeconds: r,
      version: o,
      xslColumns: a,
      xslTips: u
    } = useSitemapRuntimeConfig();
  Uo(e, 'Content-Type', 'application/xslt+xml'),
    Uo(
      e,
      'Cache-Control',
      r ? `public, max-age=${r}, must-revalidate` : 'no-cache, no-store'
    );
  const { name: d, url: h } = useSiteConfig(e),
    f = Lo(e, 'Referer') || '/',
    m = parseURL(f).pathname,
    g =
      '/sitemap.xml' !== m && '/sitemap_index.xml' !== m && m.endsWith('.xml'),
    v = parseURL(f).pathname.split('/').pop()?.split('-sitemap')[0] || s,
    S =
      `${d}${'sitemap.xml' !== v ? ` - ${'sitemap_index.xml' === v ? 'index' : v}` : ''}`.replace(
        /&/g,
        '&amp;'
      ),
    _ = getQuery$2(f).canonical,
    C = void 0 !== _ && 'false' !== _,
    R = [
      'You are looking at a <a href="https://developer.mozilla.org/en-US/docs/Web/XSLT/Transforming_XML_with_XSLT/An_Overview" style="color: #398465" target="_blank">XML stylesheet</a>. Read the <a href="https://nuxtseo.com/sitemap/guides/customising-ui" style="color: #398465" target="_blank">docs</a> to learn how to customize it. View the page source to see the raw XML.',
      `URLs missing? Check Nuxt Devtools Sitemap tab (or the <a href="${withQuery('/__sitemap__/debug.json', { sitemap: v })}" style="color: #398465" target="_blank">debug endpoint</a>).`
    ];
  if (C)
    R.push(
      `You are viewing the canonical sitemap. You can switch to using the request origin: <a href="${t(f)}" style="color: #398465; white-space: nowrap ">${t(f)}</a>`
    );
  else {
    const e = withQuery(f, { canonical: '' });
    R.push(`Your canonical site URL is <strong>${h}</strong>.`),
      R.push(
        `You can preview your canonical sitemap by visiting <a href="${e}" style="color: #398465; white-space: nowrap;">${t(e)}?canonical</a>`
      );
  }
  let j = [...a];
  return (
    j.length ||
      (j = [
        { label: 'URL', width: '50%' },
        { label: 'Images', width: '25%', select: 'count(image:image)' },
        {
          label: 'Last Updated',
          width: '25%',
          select:
            "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
        }
      ]),
    `<?xml version="1.0" encoding="UTF-8"?>\n<xsl:stylesheet version="2.0"\n                xmlns:html="http://www.w3.org/TR/REC-html40"\n                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"\n                xmlns:xhtml="http://www.w3.org/1999/xhtml"\n                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>\n  <xsl:template match="/">\n    <html xmlns="http://www.w3.org/1999/xhtml">\n      <head>\n        <title>XML Sitemap</title>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n        <style type="text/css">\n          body {\n            font-family: Inter, Helvetica, Arial, sans-serif;\n            font-size: 14px;\n            color: #333;\n          }\n\n          table {\n            border: none;\n            border-collapse: collapse;\n          }\n\n          .bg-yellow-200 {\n            background-color: #fef9c3;\n          }\n\n          .p-5 {\n            padding: 1.25rem;\n          }\n\n          .rounded {\n            border-radius: 4px;\n            }\n\n          .shadow {\n            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n          }\n\n          #sitemap tr:nth-child(odd) td {\n            background-color: #f8f8f8 !important;\n          }\n\n          #sitemap tbody tr:hover td {\n            background-color: #fff;\n          }\n\n          #sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {\n            color: #000;\n          }\n\n          .expl a {\n            color: #398465\n            font-weight: 600;\n          }\n\n          .expl a:visited {\n            color: #398465\n          }\n\n          a {\n            color: #000;\n            text-decoration: none;\n          }\n\n          a:visited {\n            color: #777;\n          }\n\n          a:hover {\n            text-decoration: underline;\n          }\n\n          td {\n            font-size: 12px;\n          }\n\n          .text-2xl {\n            font-size: 2rem;\n            font-weight: 600;\n            line-height: 1.25;\n          }\n\n          th {\n            text-align: left;\n            padding-right: 30px;\n            font-size: 12px;\n          }\n\n          thead th {\n            border-bottom: 1px solid #000;\n          }\n          .fixed { position: fixed; }\n          .right-2 { right: 2rem; }\n          .top-2 { top: 2rem; }\n          .w-30 { width: 30rem; }\n          p { margin: 0; }\n          li { padding-bottom: 0.5rem; line-height: 1.5; }\n          h1 { margin: 0; }\n          .mb-5 { margin-bottom: 1.25rem; }\n          .mb-3 { margin-bottom: 0.75rem; }\n        </style>\n      </head>\n      <body>\n        <div style="grid-template-columns: 1fr 1fr; display: grid; margin: 3rem;">\n            <div>\n             <div id="content">\n          <h1 class="text-2xl mb-3">XML Sitemap</h1>\n          <h2>${S}</h2>\n          ${g ? `<p style="font-size: 12px; margin-bottom: 1rem;"><a href="${t('/sitemap_index.xml')}">${t('/sitemap_index.xml')}</a></p>` : ''}\n          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">\n            <p class="expl" style="margin-bottom: 1rem;">\n              This XML Sitemap Index file contains\n              <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.\n            </p>\n            <table id="sitemap" cellpadding="3">\n              <thead>\n                <tr>\n                  <th width="75%">Sitemap</th>\n                  <th width="25%">Last Modified</th>\n                </tr>\n              </thead>\n              <tbody>\n                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">\n                  <xsl:variable name="sitemapURL">\n                    <xsl:value-of select="sitemap:loc"/>\n                  </xsl:variable>\n                  <tr>\n                    <td>\n                      <a href="{$sitemapURL}">\n                        <xsl:value-of select="sitemap:loc"/>\n                      </a>\n                    </td>\n                    <td>\n                      <xsl:value-of\n                        select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>\n                    </td>\n                  </tr>\n                </xsl:for-each>\n              </tbody>\n            </table>\n          </xsl:if>\n          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">\n            <p class="expl" style="margin-bottom: 1rem;">\n              This XML Sitemap contains\n              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.\n            </p>\n            <table id="sitemap" cellpadding="3">\n              <thead>\n                <tr>\n                  ${j.map((e) => `<th width="${e.width}">${e.label}</th>`).join('\n')}\n                </tr>\n              </thead>\n              <tbody>\n                <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>\n                <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>\n                <xsl:for-each select="sitemap:urlset/sitemap:url">\n                  <tr>\n                    <td>\n                      <xsl:variable name="itemURL">\n                        <xsl:value-of select="sitemap:loc"/>\n                      </xsl:variable>\n                      <a href="{$itemURL}">\n                        <xsl:value-of select="sitemap:loc"/>\n                      </a>\n                    </td>\n                    ${j
      .filter((e) => 'URL' !== e.label)
      .map((e) => `<td>\n<xsl:value-of select="${e.select}"/>\n</td>`)
      .join(
        '\n'
      )}\n                  </tr>\n                </xsl:for-each>\n              </tbody>\n            </table>\n          </xsl:if>\n        </div>\n        </div>\n                    \n        </div>\n      </body>\n    </html>\n  </xsl:template>\n</xsl:stylesheet>\n`
  );
});
function fixSlashes(e, t) {
  const s = parseURL(t);
  if (
    (function (e) {
      const t = e.split('/').pop();
      return !!(t || e).match(/\.[0-9a-z]+$/i)?.[0];
    })(s.pathname)
  )
    return t;
  const r = e
    ? withTrailingSlash(s.pathname)
    : withoutTrailingSlash(s.pathname);
  return `${s.protocol ? `${s.protocol}//` : ''}${s.host || ''}${r}${s.search || ''}${s.hash || ''}`;
}
function resolve(e, t) {
  return void 0 !== e && t
    ? hasProtocol((e = 'string' == typeof e ? e : e.toString()), {
        acceptRelative: !0,
        strict: !1
      })
      ? t.fixSlashes(e)
      : t.canonicalUrlResolver(e)
    : e;
}
function preNormalizeEntry(e, t) {
  const s = 'string' == typeof e ? { loc: e } : { ...e };
  s.url && !s.loc && ((s.loc = s.url), delete s.url),
    'string' != typeof s.loc && (s.loc = ''),
    (s.loc = (function (e) {
      return e.replace(/\/(\?|#|$)/, '$1');
    })(s.loc)),
    (s._abs = hasProtocol(s.loc, { acceptRelative: !1, strict: !1 }));
  try {
    s._path = s._abs ? parseURL(s.loc) : parsePath(s.loc);
  } catch (e) {
    e._path = null;
  }
  if (s._path) {
    const e = stringifyQuery(parseQuery(s._path.search));
    (s._relativeLoc = `${((r = s._path?.pathname), encode(r).replace(Nt, '%23').replace(Ht, '%3F').replace(Wt, '%2F').replace(Lt, '%26').replace(zt, '%2B'))}${e.length ? `?${e}` : ''}`),
      s._path.host
        ? (s.loc = stringifyParsedURL(s._path))
        : (s.loc = s._relativeLoc);
  } else
    (function (e) {
      try {
        return e !== decodeURIComponent(e);
      } catch {
        return !1;
      }
    })(s.loc) || (s.loc = encodeURI(s.loc));
  var r;
  return (
    '' === s.loc && (s.loc = '/'),
    (s.loc = resolve(s.loc, t)),
    (s._key = `${s._sitemap || ''}${withoutTrailingSlash(s.loc)}`),
    s
  );
}
function normaliseEntry(e, t, s) {
  const r = sn(e, t);
  if (r.lastmod) {
    const e = (function (e) {
      if ('string' == typeof e) {
        if (e.includes('T')) {
          const t = e.split('T')[1];
          t.includes('+') || t.includes('-') || t.includes('Z') || (e += 'Z');
        }
        if (
          !(function (e) {
            return ip.some((t) => t.test(e));
          })(e)
        )
          return !1;
        if (((e = new Date(e)).setMilliseconds(0), Number.isNaN(e.getTime())))
          return !1;
      }
      const z = (e) => `0${e}`.slice(-2),
        t = `${e.getUTCFullYear()}-${z(e.getUTCMonth() + 1)}-${z(e.getUTCDate())}`;
      if (e.getUTCHours() > 0 || e.getUTCMinutes() > 0 || e.getUTCSeconds() > 0)
        return `${t}T${z(e.getUTCHours())}:${z(e.getUTCMinutes())}:${z(e.getUTCSeconds())}Z`;
      return t;
    })(r.lastmod);
    e ? (r.lastmod = e) : delete r.lastmod;
  }
  return (
    r.lastmod || delete r.lastmod,
    (r.loc = resolve(r.loc, s)),
    r.alternatives &&
      (r.alternatives = mergeOnKey(
        r.alternatives.map((e) => {
          const t = { ...e };
          return (
            'string' == typeof t.href
              ? (t.href = resolve(t.href, s))
              : 'object' == typeof t.href &&
                t.href &&
                (t.href = resolve(t.href.href, s)),
            t
          );
        }),
        'hreflang'
      )),
    r.images &&
      (r.images = mergeOnKey(
        r.images.map((e) => (((e = { ...e }).loc = resolve(e.loc, s)), e)),
        'loc'
      )),
    r.videos &&
      (r.videos = r.videos.map(
        (e) => (
          (e = { ...e }).content_loc &&
            (e.content_loc = resolve(e.content_loc, s)),
          e
        )
      )),
    r
  );
}
const ip = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
async function fetchDataSource(e, t) {
  const s =
    'string' == typeof e.context
      ? { name: e.context }
      : e.context || { name: 'fetch' };
  s.tips = s.tips || [];
  const r = 'string' == typeof e.fetch ? e.fetch : e.fetch[0],
    o = 'string' == typeof e.fetch ? {} : e.fetch[1],
    a = Date.now(),
    u = o.timeout || 5e3,
    d = new AbortController(),
    h = setTimeout(() => d.abort(), u);
  let f = !1;
  const m = parseURL(r).pathname.endsWith('.xml'),
    g = r.startsWith('/') && t ? t : globalThis;
  try {
    const u = await g.$fetch(r, {
        ...o,
        responseType: m ? 'text' : 'json',
        signal: d.signal,
        headers: sn(
          o?.headers,
          { Accept: m ? 'text/xml' : 'application/json' },
          t ? { host: getRequestHost(t, { xForwardedHost: !0 }) } : {}
        ),
        onResponse({ response: e }) {
          'string' == typeof e._data &&
            e._data.startsWith('<!DOCTYPE html>') &&
            (f = !0);
        }
      }),
      h = Date.now() - a;
    if (f)
      return (
        s.tips.push(
          "This is usually because the URL isn't correct or is throwing an error. Please check the URL"
        ),
        {
          ...e,
          context: s,
          urls: [],
          timeTakenMs: h,
          error: 'Received HTML response instead of JSON'
        }
      );
    let v = [];
    return (
      'object' == typeof u
        ? (v = u.urls || u)
        : 'string' == typeof u &&
          parseURL(r).pathname.endsWith('.xml') &&
          (v = (u.match(/<url>[\s\S]*?<\/url>/g) || [])
            .map((e) => {
              const t = e.match(/<loc>([^<]+)<\/loc>/)?.[1];
              if (!t) return null;
              const s = e.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
                r = e.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1],
                o = e.match(/<priority>([^<]+)<\/priority>/)
                  ? Number.parseFloat(
                      e.match(/<priority>([^<]+)<\/priority>/)[1]
                    )
                  : void 0,
                a = (e.match(/<image:image>[\s\S]*?<\/image:image>/g) || [])
                  .map((e) => {
                    const t = e.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1];
                    return t ? { loc: t } : null;
                  })
                  .filter(Boolean),
                u = (e.match(/<video:video>[\s\S]*?<\/video:video>/g) || [])
                  .map((e) => {
                    const t = {},
                      s = e.match(/<video:title>([^<]+)<\/video:title>/)?.[1],
                      r = e.match(
                        /<video:thumbnail_loc>([^<]+)<\/video:thumbnail_loc>/
                      )?.[1],
                      o = e.match(
                        /<video:description>([^<]+)<\/video:description>/
                      )?.[1],
                      a = e.match(
                        /<video:content_loc>([^<]+)<\/video:content_loc>/
                      )?.[1];
                    if (!(s && r && o && a)) return null;
                    (t.title = s),
                      (t.thumbnail_loc = r),
                      (t.description = o),
                      (t.content_loc = a);
                    const u = e.match(
                      /<video:player_loc>([^<]+)<\/video:player_loc>/
                    )?.[1];
                    u && (t.player_loc = u);
                    const d = e.match(
                      /<video:duration>([^<]+)<\/video:duration>/
                    )
                      ? Number.parseInt(
                          e.match(
                            /<video:duration>([^<]+)<\/video:duration>/
                          )[1],
                          10
                        )
                      : void 0;
                    d && (t.duration = d);
                    const h = e.match(
                      /<video:expiration_date>([^<]+)<\/video:expiration_date>/
                    )?.[1];
                    h && (t.expiration_date = h);
                    const f = e.match(/<video:rating>([^<]+)<\/video:rating>/)
                      ? Number.parseFloat(
                          e.match(/<video:rating>([^<]+)<\/video:rating>/)[1]
                        )
                      : void 0;
                    f && (t.rating = f);
                    const m = e.match(
                      /<video:view_count>([^<]+)<\/video:view_count>/
                    )
                      ? Number.parseInt(
                          e.match(
                            /<video:view_count>([^<]+)<\/video:view_count>/
                          )[1],
                          10
                        )
                      : void 0;
                    m && (t.view_count = m);
                    const g = e.match(
                      /<video:publication_date>([^<]+)<\/video:publication_date>/
                    )?.[1];
                    g && (t.publication_date = g);
                    const v = e.match(
                      /<video:family_friendly>([^<]+)<\/video:family_friendly>/
                    )?.[1];
                    v && (t.family_friendly = v);
                    const S = e.match(
                      /<video:restriction relationship="([^"]+)">([^<]+)<\/video:restriction>/
                    );
                    S &&
                      (t.restriction = {
                        relationship: S[1],
                        restriction: S[2]
                      });
                    const _ = e.match(
                      /<video:platform relationship="([^"]+)">([^<]+)<\/video:platform>/
                    );
                    _ && (t.platform = { relationship: _[1], platform: _[2] });
                    const C = (
                      e.match(/<video:price [^>]+>([^<]+)<\/video:price>/g) ||
                      []
                    )
                      .map((e) => {
                        const t = e.match(
                            /<video:price [^>]+>([^<]+)<\/video:price>/
                          )?.[1],
                          s = e.match(/currency="([^"]+)"/)?.[1],
                          r = e.match(/type="([^"]+)"/)?.[1];
                        return t ? { price: t, currency: s, type: r } : null;
                      })
                      .filter(Boolean);
                    C.length && (t.price = C);
                    const R = e.match(
                      /<video:requires_subscription>([^<]+)<\/video:requires_subscription>/
                    )?.[1];
                    R && (t.requires_subscription = R);
                    const j = e.match(
                      /<video:uploader info="([^"]+)">([^<]+)<\/video:uploader>/
                    );
                    j && (t.uploader = { uploader: j[2], info: j[1] });
                    const E = e.match(/<video:live>([^<]+)<\/video:live>/)?.[1];
                    E && (t.live = E);
                    const T = (
                      e.match(/<video:tag>([^<]+)<\/video:tag>/g) || []
                    )
                      .map(
                        (e) => e.match(/<video:tag>([^<]+)<\/video:tag>/)?.[1]
                      )
                      .filter(Boolean);
                    return T.length && (t.tag = T), t;
                  })
                  .filter(Boolean),
                d = (e.match(/<xhtml:link[\s\S]*?\/>/g) || [])
                  .map((e) => {
                    const t = e.match(/hreflang="([^"]+)"/)?.[1],
                      s = e.match(/href="([^"]+)"/)?.[1];
                    return t && s ? { hreflang: t, href: s } : null;
                  })
                  .filter(Boolean),
                h = {
                  loc: t,
                  lastmod: s,
                  changefreq: r,
                  priority: o,
                  images: a,
                  videos: u,
                  alternatives: d,
                  news: e.match(/<news:news>[\s\S]*?<\/news:news>/)
                    ? {
                        title: e.match(
                          /<news:title>([^<]+)<\/news:title>/
                        )?.[1],
                        publication_date: e.match(
                          /<news:publication_date>([^<]+)<\/news:publication_date>/
                        )?.[1],
                        publication: {
                          name: e.match(/<news:name>([^<]+)<\/news:name>/)?.[1],
                          language: e.match(
                            /<news:language>([^<]+)<\/news:language>/
                          )?.[1]
                        }
                      }
                    : void 0
                };
              return Object.fromEntries(
                Object.entries(h).filter(
                  ([e, t]) => null != t && 0 !== t.length
                )
              );
            })
            .filter(Boolean)),
      { ...e, context: s, timeTakenMs: h, urls: v }
    );
  } catch (t) {
    const o = t;
    return (
      o.message.includes('This operation was aborted')
        ? s.tips.push(
            'The request has taken too long. Make sure app sources respond within 5 seconds or adjust the timeout fetch option.'
          )
        : s.tips.push(
            `Response returned a status of ${o.response?.status || 'unknown'}.`
          ),
      console.error('[@nuxtjs/sitemap] Failed to fetch source.', {
        url: r,
        error: o
      }),
      { ...e, context: s, urls: [], error: o.message }
    );
  } finally {
    h && clearTimeout(h);
  }
}
function sortSitemapUrls(e) {
  return e
    .sort((e, t) => {
      const s = 'string' == typeof e ? e : e.loc,
        r = 'string' == typeof t ? t : t.loc;
      return s.localeCompare(r, void 0, { numeric: !0 });
    })
    .sort((e, t) => {
      const s = ('string' == typeof e ? e : e.loc) || '',
        r = ('string' == typeof t ? t : t.loc) || '',
        o = s.split('/').length,
        a = r.split('/').length;
      return o > a ? 1 : o < a ? -1 : 0;
    });
}
function handleObject(e, t) {
  return [
    `        <${e}:${e}>`,
    ...Object.entries(t).map(([t, s]) => {
      if ('video' === e && Array.isArray(s))
        return s
          .map((s) => {
            if ('string' == typeof s)
              return [
                '            ',
                `<${e}:${t}>`,
                escapeValueForXml(s),
                `</${e}:${t}>`
              ].join('');
            const r = Object.entries(s)
              .filter(([e]) => e !== t)
              .map(([e, t]) => `${e}="${escapeValueForXml(t)}"`)
              .join(' ');
            return [`            <${e}:${t} ${r}>`, s[t], `</${e}:${t}>`].join(
              ''
            );
          })
          .join('\n');
      if ('object' == typeof s) {
        if ('video' === e) {
          const r = Object.entries(s)
            .filter(([e]) => e !== t)
            .map(([e, t]) => `${e}="${escapeValueForXml(t)}"`)
            .join(' ');
          return [`            <${e}:${t} ${r}>`, s[t], `</${e}:${t}>`].join(
            ''
          );
        }
        return [
          `            <${e}:${t}>`,
          ...Object.entries(s).map(
            ([t, s]) =>
              `                <${e}:${t}>${escapeValueForXml(s)}</${e}:${t}>`
          ),
          `            </${e}:${t}>`
        ].join('\n');
      }
      return `            <${e}:${t}>${escapeValueForXml(s)}</${e}:${t}>`;
    }),
    `        </${e}:${e}>`
  ].join('\n');
}
function handleEntry(e, t) {
  return Array.isArray(t[e])
    ? ((s = e),
      0 !== (r = t[e]).length &&
        ((s = (function (e) {
          switch (e) {
            case 'images':
              return 'image';
            case 'videos':
              return 'video';
            case 'news':
              return 'news';
            default:
              return e;
          }
        })(s)),
        'alternatives' === s
          ? r
              .map((e) =>
                [
                  `        <xhtml:link rel="alternate" ${Object.entries(e)
                    .map(([e, t]) => `${e}="${escapeValueForXml(t)}"`)
                    .join(' ')} />`
                ].join('\n')
              )
              .join('\n')
          : r.map((e) => handleObject(s, e)).join('\n')))
    : 'object' == typeof t[e]
      ? handleObject(e, t[e])
      : `        <${e}>${escapeValueForXml(t[e])}</${e}>`;
  var s, r;
}
function escapeValueForXml(e) {
  return !0 === e || !1 === e
    ? e
      ? 'yes'
      : 'no'
    : String(e)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
async function buildSitemapUrls(e, t, s, r) {
  const {
      sitemaps: o,
      autoI18n: a,
      isI18nMapped: u,
      isMultiSitemap: d,
      sortEntries: h,
      defaultSitemapsChunkSize: f
    } = s,
    m = void 0 !== o.chunks && !Number.isNaN(Number(e.sitemapName));
  if (a?.differentDomains) {
    const s = a.locales.find((t) =>
      [t.language, t.code].includes(e.sitemapName)
    )?.domain;
    if (s) {
      const e = t.canonicalUrlResolver;
      t.canonicalUrlResolver = (t) =>
        (function (e, t) {
          let s = e;
          hasProtocol(e, { strict: !1, acceptRelative: !0 }) &&
            (s = parseURL(e).pathname);
          const r = withLeadingSlash(t.base || '/');
          '/' !== r && s.startsWith(r) && (s = s.slice(r.length));
          let o = withoutTrailingSlash(t.siteUrl);
          '/' !== r && o.endsWith(r) && (o = o.slice(0, o.indexOf(r)));
          const a = withBase(s, o);
          return '/' === s
            ? withTrailingSlash(a)
            : fixSlashes(t.trailingSlash, a);
        })(t, {
          siteUrl: withHttps(s),
          trailingSlash: e('/test/').endsWith('/'),
          base: '/'
        });
    }
  }
  const g = e.includeAppSources
    ? await import('../virtual/global-sources.mjs').then((e) => e.sources)
    : [];
  var v;
  g.push(
    ...(await ((v = e),
    v?._hasSourceChunk
      ? import('../virtual/child-sources.mjs').then(
          (e) => e.sources[v.sitemapName] || []
        )
      : Promise.resolve([])))
  );
  const S = {
    urls: (
      await (async function (e, t) {
        return (
          await Promise.all(
            e.map((e) =>
              'object' == typeof e && 'urls' in e
                ? { timeTakenMs: 0, ...e, urls: e.urls }
                : e.fetch
                  ? fetchDataSource(e, t)
                  : { ...e, error: 'Invalid source' }
            )
          )
        ).flat();
      })(g, t.event)
    ).flatMap((e) => e.urls),
    sitemapName: e.sitemapName
  };
  await r?.hooks.callHook('sitemap:input', S);
  const _ = (function (e, t, s, r) {
      const { autoI18n: o, isI18nMapped: a } = s,
        u = createPathFilter({ include: e.include, exclude: e.exclude }),
        d = t
          .map((e) => {
            const t = preNormalizeEntry(e, r);
            return !(!t.loc || !u(t.loc)) && t;
          })
          .filter(Boolean);
      let h = [];
      const f = {};
      if (o && 'no_prefix' !== o.strategy) {
        const e = o.locales.map((e) => e.code);
        h = d
          .map((t, s) => {
            if (t._abs) return !1;
            const r = splitForLocales(t._relativeLoc, e);
            let a = r[0];
            const u = r[1];
            a || (a = o.defaultLocale);
            const d = t;
            d._pathWithoutPrefix = u;
            const h = o.locales.find((e) => e.code === a);
            return (
              !!h &&
              ((d._locale = h),
              (d._index = s),
              (d._key = `${d._sitemap || ''}${d._path?.pathname || '/'}${d._path.search}`),
              (f[u] = f[u] || []),
              f[u].some((e) => e._locale.code === h.code) || f[u].push(d),
              d)
            );
          })
          .filter(Boolean);
        for (const e of h) {
          if (e._i18nTransform || e.alternatives?.length) {
            if (e._i18nTransform)
              if ((delete e._i18nTransform, o.strategy, o.differentDomains))
                e.alternatives = [
                  {
                    ...o.locales.find((e) =>
                      [e.code, e.language].includes(o.defaultLocale)
                    ),
                    code: 'x-default'
                  },
                  ...o.locales.filter((e) => !!e.domain)
                ].map((t) => ({
                  hreflang: t._hreflang,
                  href: joinURL(withHttps(t.domain), e._pathWithoutPrefix)
                }));
              else
                for (const t of o.locales) {
                  let s = joinURL(`/${t.code}`, e._pathWithoutPrefix);
                  (o.differentDomains ||
                    (['prefix_and_default', 'prefix_except_default'].includes(
                      o.strategy
                    ) &&
                      t.code === o.defaultLocale)) &&
                    (s = e._pathWithoutPrefix);
                  const h = a ? t._sitemap : void 0,
                    f = preNormalizeEntry(
                      {
                        _sitemap: h,
                        ...e,
                        _index: void 0,
                        _key: `${h || ''}${s || '/'}${e._path.search}`,
                        _locale: t,
                        loc: s,
                        alternatives: [
                          { code: 'x-default', _hreflang: 'x-default' },
                          ...o.locales
                        ]
                          .map((t) => {
                            const s =
                                'x-default' === t.code
                                  ? o.defaultLocale
                                  : t.code,
                              r =
                                'x-default' === t.code ||
                                t.code === o.defaultLocale;
                            let a = '';
                            return (
                              'prefix' === o.strategy
                                ? (a = joinURL('/', s, e._pathWithoutPrefix))
                                : [
                                    'prefix_and_default',
                                    'prefix_except_default'
                                  ].includes(o.strategy) &&
                                  (a = r
                                    ? e._pathWithoutPrefix
                                    : joinURL('/', s, e._pathWithoutPrefix)),
                              !!u(a) && { hreflang: t._hreflang, href: a }
                            );
                          })
                          .filter(Boolean)
                      },
                      r
                    );
                  e._locale.code === f._locale.code
                    ? ((d[e._index] = f), (e._index = void 0))
                    : d.push(f);
                }
          } else {
            const t = f[e._pathWithoutPrefix]
              .map((e) => {
                const t = [];
                return (
                  e._locale.code === o.defaultLocale &&
                    t.push({ href: e.loc, hreflang: 'x-default' }),
                  t.push({
                    href: e.loc,
                    hreflang: e._locale._hreflang || o.defaultLocale
                  }),
                  t
                );
              })
              .flat()
              .filter(Boolean);
            t.length && (e.alternatives = t);
          }
          a &&
            ((e._sitemap = e._sitemap || e._locale._sitemap),
            (e._key = `${e._sitemap || ''}${e.loc || '/'}${e._path.search}`)),
            e._index && (d[e._index] = e);
        }
      }
      return d;
    })(e, S.urls, { autoI18n: a, isI18nMapped: u }, t),
    C = _.filter(
      (t) => !(d && t._sitemap && e.sitemapName) || t._sitemap === e.sitemapName
    );
  var R;
  return (function (t) {
    if (m && f) {
      const s = Number(e.sitemapName);
      return t.slice(s * f, (s + 1) * f);
    }
    return t;
  })(((R = C), h ? sortSitemapUrls(R) : R));
}
function urlsToXml(e, t, { version: s, xsl: r, credits: o, minify: a }) {
  const u = e.map((e) => {
    const t = Object.keys(e).filter((e) => !e.startsWith('_'));
    return [
      '    <url>',
      t
        .map((t) => handleEntry(t, e))
        .filter(Boolean)
        .join('\n'),
      '    </url>'
    ].join('\n');
  });
  return (function (e, t, s) {
    const r = !!s.xsl && t.relativeBaseUrlResolver(s.xsl),
      o = s.credits;
    return (
      e.unshift(
        '<?xml version="1.0" encoding="UTF-8"?>' +
          (r ? `<?xml-stylesheet type="text/xsl" href="${r}"?>` : '')
      ),
      o &&
        e.push(
          `\x3c!-- XML Sitemap generated by @nuxtjs/sitemap v${s.version} at ${new Date().toISOString()} --\x3e`
        ),
      s.minify
        ? e.join('').replace(/(?<!<[^>]*)\s(?![^<]*>)/g, '')
        : e.join('\n')
    );
  })(
    [
      '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      u.join('\n'),
      '</urlset>'
    ],
    t,
    { version: s, xsl: r, credits: o, minify: a }
  );
}
async function createSitemap(e, t, s) {
  const { sitemapName: r } = t,
    o = useNitroApp(),
    a = (function (e) {
      const t = getQuery(e).canonical,
        s = void 0 !== t && 'false' !== t,
        r = useSiteConfig(e);
      return {
        event: e,
        fixSlashes: (e) => fixSlashes(r.trailingSlash, e),
        canonicalUrlResolver: createSitePathResolver(e, {
          canonical: s || !0,
          absolute: !0,
          withBase: !0
        }),
        relativeBaseUrlResolver: createSitePathResolver(e, {
          absolute: !1,
          withBase: !0
        })
      };
    })(e);
  let u = await buildSitemapUrls(t, a, s, o);
  const d = (function () {
      const { nitro: e, app: t } = useRuntimeConfig(),
        s = toRouteMatcher(
          createRouter$1({
            routes: Object.fromEntries(
              Object.entries(e?.routeRules || {}).map(([e, t]) => [
                '/' === e ? e : withoutTrailingSlash(e),
                t
              ])
            )
          })
        );
      return (e) => {
        const r = ('/' === e[0] ? e : parseURL(e, t.baseURL).pathname).split(
          '?'
        )[0];
        return sn(
          {},
          ...s
            .matchAll(
              withoutBase('/' === r ? r : withoutTrailingSlash(r), t.baseURL)
            )
            .reverse()
        );
      };
    })(),
    { autoI18n: h } = s;
  u = u
    .map((t) => {
      const s = t._path?.pathname || t.loc;
      if (!getPathRobotConfig(e, { path: s, skipSiteIndexable: !0 }).indexable)
        return !1;
      let r = d(s);
      if (h?.locales && 'no_prefix' !== h?.strategy) {
        const e = splitForLocales(
            s,
            h.locales.map((e) => e.code)
          ),
          t = e[1];
        t && t !== s && (r = sn(r, d(t)));
      }
      if (!1 === r.sitemap) return !1;
      if (void 0 !== r.robots && !r.robots) return !1;
      const o = Object.entries(r.headers || {}).some(
        ([e, t]) =>
          'x-robots-tag' === e.toLowerCase() &&
          t.toLowerCase().includes('noindex')
      );
      return !r.redirect && !o && (r.sitemap ? sn(t, r.sitemap) : t);
    })
    .filter(Boolean);
  const f = u.length,
    m = { urls: u, sitemapName: r };
  await o.hooks.callHook('sitemap:resolved', m),
    m.urls.length !== f &&
      (m.urls = m.urls.map((e) => preNormalizeEntry(e, a)));
  const g = m.urls.map((e) => normaliseEntry(e, t.defaults, a)),
    v =
      ((S = mergeOnKey(g, '_key').map((e) => normaliseEntry(e, t.defaults, a))),
      s.sortEntries ? sortSitemapUrls(S) : S);
  var S;
  const _ = { sitemap: urlsToXml(v, a, s), sitemapName: r };
  return (
    await o.hooks.callHook('sitemap:output', _),
    Uo(e, 'Content-Type', 'text/xml; charset=UTF-8'),
    s.cacheMaxAgeSeconds
      ? Uo(
          e,
          'Cache-Control',
          `public, max-age=${s.cacheMaxAgeSeconds}, must-revalidate`
        )
      : Uo(e, 'Cache-Control', 'no-cache, no-store'),
    (e.context._isSitemap = !0),
    _.sitemap
  );
}
const ap = defineEventHandler(async (e) => {
    const t = useSitemapRuntimeConfig(),
      { sitemaps: s } = t;
    return 'index' in s
      ? sendRedirect(
          e,
          withBase('/sitemap_index.xml', useRuntimeConfig().app.baseURL),
          301
        )
      : createSitemap(e, Object.values(s)[0], t);
  }),
  cp = { throwError: !0 },
  defaultSecurityConfig = (e, t) => ({
    strict: t,
    headers: {
      crossOriginResourcePolicy: 'same-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'credentialless',
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'"
        ],
        'upgrade-insecure-requests': !0
      },
      originAgentCluster: '?1',
      referrerPolicy: 'no-referrer',
      strictTransportSecurity: { maxAge: 15552e3, includeSubdomains: !0 },
      xContentTypeOptions: 'nosniff',
      xDNSPrefetchControl: 'off',
      xDownloadOptions: 'noopen',
      xFrameOptions: 'SAMEORIGIN',
      xPermittedCrossDomainPolicies: 'none',
      xXSSProtection: '0',
      permissionsPolicy: {
        camera: [],
        'display-capture': [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2e6,
      maxUploadFileRequestInBytes: 8e6,
      ...cp
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 3e5,
      headers: !1,
      driver: { name: 'lruCache' },
      ...cp
    },
    xssValidator: { methods: ['GET', 'POST'], ...cp },
    corsHandler: {
      origin: e,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflight: { statusCode: 204 }
    },
    allowedMethodsRestricter: { methods: '*', ...cp },
    hidePoweredBy: !0,
    basicAuth: !1,
    enabled: !0,
    csrf: !1,
    nonce: !0,
    removeLoggers: !0,
    ssg: {
      meta: !0,
      hashScripts: !0,
      hashStyles: !1,
      nitroHeaders: !0,
      exportToPresets: !0
    },
    sri: !0
  }),
  lp = defaultSecurityConfig('').requestSizeLimiter,
  up = defineEventHandler((e) => {
    const t = resolveSecurityRules(e);
    if (t.enabled && t.requestSizeLimiter) {
      const s = sn(t.requestSizeLimiter, lp);
      if (['POST', 'PUT', 'DELETE'].includes(e.node.req.method)) {
        const t = getRequestHeader(e, 'content-length'),
          r = getRequestHeader(e, 'content-type'),
          o = r?.includes('multipart/form-data'),
          a = o ? s.maxUploadFileRequestInBytes : s.maxRequestSizeInBytes;
        if (parseInt(t) >= a) {
          const e = { statusCode: 413, statusMessage: 'Payload Too Large' };
          if (!1 === s.throwError) return e;
          throw createError(e);
        }
      }
    }
  }),
  dp = defineEventHandler((e) => {
    const t = resolveSecurityRules(e);
    if (t.enabled && t.corsHandler) {
      const { corsHandler: s } = t;
      let r;
      (r =
        'string' == typeof s.origin && '*' !== s.origin
          ? [s.origin]
          : s.origin),
        r && '*' !== r && s.useRegExp && (r = r.map((e) => new RegExp(e, 'i'))),
        handleCors(e, {
          origin: r,
          methods: s.methods,
          allowHeaders: s.allowHeaders,
          exposeHeaders: s.exposeHeaders,
          credentials: s.credentials,
          maxAge: s.maxAge,
          preflight: s.preflight
        });
    }
  }),
  hp = defineEventHandler((e) => {
    const t = resolveSecurityRules(e);
    if (t.enabled && t.allowedMethodsRestricter) {
      const { allowedMethodsRestricter: s } = t,
        r = s.methods;
      if ('*' !== r && !r.includes(e.node.req.method)) {
        const e = { statusCode: 405, statusMessage: 'Method not allowed' };
        if (!1 === s.throwError) return e;
        throw createError(e);
      }
    }
  }),
  pp = useStorage('#rate-limiter-storage'),
  fp = defaultSecurityConfig('').rateLimiter,
  mp = defineEventHandler(async (e) => {
    const t = resolveSecurityRules(e),
      s = (function (e) {
        if (
          (e.context.security || (e.context.security = {}),
          !e.context.security.route)
        ) {
          const t = createRouter$1({
              routes: Object.fromEntries(
                Object.entries(Ld).map(([e]) => [e, { name: e }])
              )
            }).lookup(e.path.split('?')[0]),
            s = t?.name ?? '';
          e.context.security.route = s;
        }
        return e.context.security.route;
      })(e);
    if (t.enabled && t.rateLimiter) {
      const r = sn(t.rateLimiter, fp),
        o = (function (e) {
          const t =
            (function (e, t = {}) {
              if (e.context.clientAddress) return e.context.clientAddress;
              if (t.xForwardedFor) {
                const t = getRequestHeader(e, 'x-forwarded-for')
                  ?.split(',')
                  .shift()
                  ?.trim();
                if (t) return t;
              }
              return e.node.req.socket.remoteAddress
                ? e.node.req.socket.remoteAddress
                : void 0;
            })(e, { xForwardedFor: !0 }) || '';
          return t;
        })(e),
        a = o + s;
      let u = await pp.getItem(a);
      if (u) {
        if ('object' != typeof u) return;
        const s = u.date,
          o = u.date + Number(r.interval);
        Date.now() >= o &&
          (await setStorageItem(r, a), (u = await pp.getItem(a)));
        if (s <= o && 0 === u.value) {
          const s = { statusCode: 429, statusMessage: 'Too Many Requests' };
          if (
            (t.rateLimiter.headers &&
              (setResponseHeader(e, 'x-ratelimit-remaining', 0),
              setResponseHeader(e, 'x-ratelimit-limit', r.tokensPerInterval),
              setResponseHeader(e, 'x-ratelimit-reset', o)),
            !1 === r.throwError)
          )
            return s;
          throw createError(s);
        }
        const d = s > o ? Date.now() : u.date,
          h = { value: u.value - 1, date: d };
        await pp.setItem(a, h);
        const f = await pp.getItem(a);
        f &&
          r.headers &&
          (setResponseHeader(e, 'x-ratelimit-remaining', f.value),
          setResponseHeader(e, 'x-ratelimit-limit', r.tokensPerInterval),
          setResponseHeader(e, 'x-ratelimit-reset', o));
      } else await setStorageItem(r, a);
    }
  });
async function setStorageItem(e, t) {
  const s = { value: e.tokensPerInterval, date: Date.now() };
  await pp.setItem(t, s);
}
var gp = { exports: {} },
  yp = {},
  bp = { exports: {} },
  vp = {};
function getDefaultWhiteList$1() {
  var e = {
    'align-content': !1,
    'align-items': !1,
    'align-self': !1,
    'alignment-adjust': !1,
    'alignment-baseline': !1,
    all: !1,
    'anchor-point': !1,
    animation: !1,
    'animation-delay': !1,
    'animation-direction': !1,
    'animation-duration': !1,
    'animation-fill-mode': !1,
    'animation-iteration-count': !1,
    'animation-name': !1,
    'animation-play-state': !1,
    'animation-timing-function': !1,
    azimuth: !1,
    'backface-visibility': !1,
    background: !0,
    'background-attachment': !0,
    'background-clip': !0,
    'background-color': !0,
    'background-image': !0,
    'background-origin': !0,
    'background-position': !0,
    'background-repeat': !0,
    'background-size': !0,
    'baseline-shift': !1,
    binding: !1,
    bleed: !1,
    'bookmark-label': !1,
    'bookmark-level': !1,
    'bookmark-state': !1,
    border: !0,
    'border-bottom': !0,
    'border-bottom-color': !0,
    'border-bottom-left-radius': !0,
    'border-bottom-right-radius': !0,
    'border-bottom-style': !0,
    'border-bottom-width': !0,
    'border-collapse': !0,
    'border-color': !0,
    'border-image': !0,
    'border-image-outset': !0,
    'border-image-repeat': !0,
    'border-image-slice': !0,
    'border-image-source': !0,
    'border-image-width': !0,
    'border-left': !0,
    'border-left-color': !0,
    'border-left-style': !0,
    'border-left-width': !0,
    'border-radius': !0,
    'border-right': !0,
    'border-right-color': !0,
    'border-right-style': !0,
    'border-right-width': !0,
    'border-spacing': !0,
    'border-style': !0,
    'border-top': !0,
    'border-top-color': !0,
    'border-top-left-radius': !0,
    'border-top-right-radius': !0,
    'border-top-style': !0,
    'border-top-width': !0,
    'border-width': !0,
    bottom: !1,
    'box-decoration-break': !0,
    'box-shadow': !0,
    'box-sizing': !0,
    'box-snap': !0,
    'box-suppress': !0,
    'break-after': !0,
    'break-before': !0,
    'break-inside': !0,
    'caption-side': !1,
    chains: !1,
    clear: !0,
    clip: !1,
    'clip-path': !1,
    'clip-rule': !1,
    color: !0,
    'color-interpolation-filters': !0,
    'column-count': !1,
    'column-fill': !1,
    'column-gap': !1,
    'column-rule': !1,
    'column-rule-color': !1,
    'column-rule-style': !1,
    'column-rule-width': !1,
    'column-span': !1,
    'column-width': !1,
    columns: !1,
    contain: !1,
    content: !1,
    'counter-increment': !1,
    'counter-reset': !1,
    'counter-set': !1,
    crop: !1,
    cue: !1,
    'cue-after': !1,
    'cue-before': !1,
    cursor: !1,
    direction: !1,
    display: !0,
    'display-inside': !0,
    'display-list': !0,
    'display-outside': !0,
    'dominant-baseline': !1,
    elevation: !1,
    'empty-cells': !1,
    filter: !1,
    flex: !1,
    'flex-basis': !1,
    'flex-direction': !1,
    'flex-flow': !1,
    'flex-grow': !1,
    'flex-shrink': !1,
    'flex-wrap': !1,
    float: !1,
    'float-offset': !1,
    'flood-color': !1,
    'flood-opacity': !1,
    'flow-from': !1,
    'flow-into': !1,
    font: !0,
    'font-family': !0,
    'font-feature-settings': !0,
    'font-kerning': !0,
    'font-language-override': !0,
    'font-size': !0,
    'font-size-adjust': !0,
    'font-stretch': !0,
    'font-style': !0,
    'font-synthesis': !0,
    'font-variant': !0,
    'font-variant-alternates': !0,
    'font-variant-caps': !0,
    'font-variant-east-asian': !0,
    'font-variant-ligatures': !0,
    'font-variant-numeric': !0,
    'font-variant-position': !0,
    'font-weight': !0,
    grid: !1,
    'grid-area': !1,
    'grid-auto-columns': !1,
    'grid-auto-flow': !1,
    'grid-auto-rows': !1,
    'grid-column': !1,
    'grid-column-end': !1,
    'grid-column-start': !1,
    'grid-row': !1,
    'grid-row-end': !1,
    'grid-row-start': !1,
    'grid-template': !1,
    'grid-template-areas': !1,
    'grid-template-columns': !1,
    'grid-template-rows': !1,
    'hanging-punctuation': !1,
    height: !0,
    hyphens: !1,
    icon: !1,
    'image-orientation': !1,
    'image-resolution': !1,
    'ime-mode': !1,
    'initial-letters': !1,
    'inline-box-align': !1,
    'justify-content': !1,
    'justify-items': !1,
    'justify-self': !1,
    left: !1,
    'letter-spacing': !0,
    'lighting-color': !0,
    'line-box-contain': !1,
    'line-break': !1,
    'line-grid': !1,
    'line-height': !1,
    'line-snap': !1,
    'line-stacking': !1,
    'line-stacking-ruby': !1,
    'line-stacking-shift': !1,
    'line-stacking-strategy': !1,
    'list-style': !0,
    'list-style-image': !0,
    'list-style-position': !0,
    'list-style-type': !0,
    margin: !0,
    'margin-bottom': !0,
    'margin-left': !0,
    'margin-right': !0,
    'margin-top': !0,
    'marker-offset': !1,
    'marker-side': !1,
    marks: !1,
    mask: !1,
    'mask-box': !1,
    'mask-box-outset': !1,
    'mask-box-repeat': !1,
    'mask-box-slice': !1,
    'mask-box-source': !1,
    'mask-box-width': !1,
    'mask-clip': !1,
    'mask-image': !1,
    'mask-origin': !1,
    'mask-position': !1,
    'mask-repeat': !1,
    'mask-size': !1,
    'mask-source-type': !1,
    'mask-type': !1,
    'max-height': !0,
    'max-lines': !1,
    'max-width': !0,
    'min-height': !0,
    'min-width': !0,
    'move-to': !1,
    'nav-down': !1,
    'nav-index': !1,
    'nav-left': !1,
    'nav-right': !1,
    'nav-up': !1,
    'object-fit': !1,
    'object-position': !1,
    opacity: !1,
    order: !1,
    orphans: !1,
    outline: !1,
    'outline-color': !1,
    'outline-offset': !1,
    'outline-style': !1,
    'outline-width': !1,
    overflow: !1,
    'overflow-wrap': !1,
    'overflow-x': !1,
    'overflow-y': !1,
    padding: !0,
    'padding-bottom': !0,
    'padding-left': !0,
    'padding-right': !0,
    'padding-top': !0,
    page: !1,
    'page-break-after': !1,
    'page-break-before': !1,
    'page-break-inside': !1,
    'page-policy': !1,
    pause: !1,
    'pause-after': !1,
    'pause-before': !1,
    perspective: !1,
    'perspective-origin': !1,
    pitch: !1,
    'pitch-range': !1,
    'play-during': !1,
    position: !1,
    'presentation-level': !1,
    quotes: !1,
    'region-fragment': !1,
    resize: !1,
    rest: !1,
    'rest-after': !1,
    'rest-before': !1,
    richness: !1,
    right: !1,
    rotation: !1,
    'rotation-point': !1,
    'ruby-align': !1,
    'ruby-merge': !1,
    'ruby-position': !1,
    'shape-image-threshold': !1,
    'shape-outside': !1,
    'shape-margin': !1,
    size: !1,
    speak: !1,
    'speak-as': !1,
    'speak-header': !1,
    'speak-numeral': !1,
    'speak-punctuation': !1,
    'speech-rate': !1,
    stress: !1,
    'string-set': !1,
    'tab-size': !1,
    'table-layout': !1,
    'text-align': !0,
    'text-align-last': !0,
    'text-combine-upright': !0,
    'text-decoration': !0,
    'text-decoration-color': !0,
    'text-decoration-line': !0,
    'text-decoration-skip': !0,
    'text-decoration-style': !0,
    'text-emphasis': !0,
    'text-emphasis-color': !0,
    'text-emphasis-position': !0,
    'text-emphasis-style': !0,
    'text-height': !0,
    'text-indent': !0,
    'text-justify': !0,
    'text-orientation': !0,
    'text-overflow': !0,
    'text-shadow': !0,
    'text-space-collapse': !0,
    'text-transform': !0,
    'text-underline-position': !0,
    'text-wrap': !0,
    top: !1,
    transform: !1,
    'transform-origin': !1,
    'transform-style': !1,
    transition: !1,
    'transition-delay': !1,
    'transition-duration': !1,
    'transition-property': !1,
    'transition-timing-function': !1,
    'unicode-bidi': !1,
    'vertical-align': !1,
    visibility: !1,
    'voice-balance': !1,
    'voice-duration': !1,
    'voice-family': !1,
    'voice-pitch': !1,
    'voice-range': !1,
    'voice-rate': !1,
    'voice-stress': !1,
    'voice-volume': !1,
    volume: !1,
    'white-space': !1,
    widows: !1,
    width: !0,
    'will-change': !1,
    'word-break': !0,
    'word-spacing': !0,
    'word-wrap': !0,
    'wrap-flow': !1,
    'wrap-through': !1,
    'writing-mode': !1,
    'z-index': !1
  };
  return e;
}
var Sp = /javascript\s*\:/gim;
(vp.whiteList = getDefaultWhiteList$1()),
  (vp.getDefaultWhiteList = getDefaultWhiteList$1),
  (vp.onAttr = function (e, t, s) {}),
  (vp.onIgnoreAttr = function (e, t, s) {}),
  (vp.safeAttrValue = function (e, t) {
    return Sp.test(t) ? '' : t;
  });
var _p = {
    indexOf: function (e, t) {
      var s, r;
      if (Array.prototype.indexOf) return e.indexOf(t);
      for (s = 0, r = e.length; s < r; s++) if (e[s] === t) return s;
      return -1;
    },
    forEach: function (e, t, s) {
      var r, o;
      if (Array.prototype.forEach) return e.forEach(t, s);
      for (r = 0, o = e.length; r < o; r++) t.call(s, e[r], r, e);
    },
    trim: function (e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, '');
    },
    trimRight: function (e) {
      return String.prototype.trimRight
        ? e.trimRight()
        : e.replace(/(\s*$)/g, '');
    }
  },
  wp = _p;
var parser$2 = function (e, t) {
    ';' !== (e = wp.trimRight(e))[e.length - 1] && (e += ';');
    var s = e.length,
      r = !1,
      o = 0,
      a = 0,
      u = '';
    function addNewAttr() {
      if (!r) {
        var s = wp.trim(e.slice(o, a)),
          d = s.indexOf(':');
        if (-1 !== d) {
          var h = wp.trim(s.slice(0, d)),
            f = wp.trim(s.slice(d + 1));
          if (h) {
            var m = t(o, u.length, h, f, s);
            m && (u += m + '; ');
          }
        }
      }
      o = a + 1;
    }
    for (; a < s; a++) {
      var d = e[a];
      if ('/' === d && '*' === e[a + 1]) {
        var h = e.indexOf('*/', a + 2);
        if (-1 === h) break;
        (o = (a = h + 1) + 1), (r = !1);
      } else
        '(' === d
          ? (r = !0)
          : ')' === d
            ? (r = !1)
            : ';' === d
              ? r || addNewAttr()
              : '\n' === d && addNewAttr();
    }
    return wp.trim(u);
  },
  kp = vp,
  Cp = parser$2;
function isNull$1(e) {
  return null == e;
}
function FilterCSS$2(e) {
  (e = (function (e) {
    var t = {};
    for (var s in e) t[s] = e[s];
    return t;
  })(e || {})),
    (e.whiteList = e.whiteList || kp.whiteList),
    (e.onAttr = e.onAttr || kp.onAttr),
    (e.onIgnoreAttr = e.onIgnoreAttr || kp.onIgnoreAttr),
    (e.safeAttrValue = e.safeAttrValue || kp.safeAttrValue),
    (this.options = e);
}
FilterCSS$2.prototype.process = function (e) {
  if (!(e = (e = e || '').toString())) return '';
  var t = this.options,
    s = t.whiteList,
    r = t.onAttr,
    o = t.onIgnoreAttr,
    a = t.safeAttrValue;
  return Cp(e, function (e, t, u, d, h) {
    var f = s[u],
      m = !1;
    if (
      (!0 === f
        ? (m = f)
        : 'function' == typeof f
          ? (m = f(d))
          : f instanceof RegExp && (m = f.test(d)),
      !0 !== m && (m = !1),
      (d = a(u, d)))
    ) {
      var g,
        v = { position: t, sourcePosition: e, source: h, isWhite: m };
      return m
        ? isNull$1((g = r(u, d, v)))
          ? u + ':' + d
          : g
        : isNull$1((g = o(u, d, v)))
          ? void 0
          : g;
    }
  });
};
var xp = FilterCSS$2;
!(function (e, t) {
  var s = vp,
    r = xp;
  for (var o in (((t = e.exports =
    function (e, t) {
      return new r(t).process(e);
    }).FilterCSS = r),
  s))
    t[o] = s[o];
})(bp, bp.exports);
var Rp = bp.exports,
  jp = {
    indexOf: function (e, t) {
      var s, r;
      if (Array.prototype.indexOf) return e.indexOf(t);
      for (s = 0, r = e.length; s < r; s++) if (e[s] === t) return s;
      return -1;
    },
    forEach: function (e, t, s) {
      var r, o;
      if (Array.prototype.forEach) return e.forEach(t, s);
      for (r = 0, o = e.length; r < o; r++) t.call(s, e[r], r, e);
    },
    trim: function (e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, '');
    },
    spaceIndex: function (e) {
      var t = /\s|\n|\t/.exec(e);
      return t ? t.index : -1;
    }
  },
  Ep = Rp.FilterCSS,
  Ap = Rp.getDefaultWhiteList,
  Tp = jp;
function getDefaultWhiteList() {
  return {
    a: ['target', 'href', 'title'],
    abbr: ['title'],
    address: [],
    area: ['shape', 'coords', 'href', 'alt'],
    article: [],
    aside: [],
    audio: [
      'autoplay',
      'controls',
      'crossorigin',
      'loop',
      'muted',
      'preload',
      'src'
    ],
    b: [],
    bdi: ['dir'],
    bdo: ['dir'],
    big: [],
    blockquote: ['cite'],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ['align', 'valign', 'span', 'width'],
    colgroup: ['align', 'valign', 'span', 'width'],
    dd: [],
    del: ['datetime'],
    details: ['open'],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ['color', 'size', 'face'],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    ins: ['datetime'],
    kbd: [],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ['width', 'border', 'align', 'valign'],
    tbody: ['align', 'valign'],
    td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
    tfoot: ['align', 'valign'],
    th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
    thead: ['align', 'valign'],
    tr: ['rowspan', 'align', 'valign'],
    tt: [],
    u: [],
    ul: [],
    video: [
      'autoplay',
      'controls',
      'crossorigin',
      'loop',
      'muted',
      'playsinline',
      'poster',
      'preload',
      'src',
      'height',
      'width'
    ]
  };
}
var Op = new Ep();
function escapeHtml(e) {
  return e.replace(Ip, '&lt;').replace(Pp, '&gt;');
}
var Ip = /</g,
  Pp = />/g,
  Mp = /"/g,
  Np = /&quot;/g,
  Lp = /&#([a-zA-Z0-9]*);?/gim,
  Dp = /&colon;?/gim,
  Bp = /&newline;?/gim,
  Hp =
    /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,
  zp = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
  Fp = /u\s*r\s*l\s*\(.*/gi;
function escapeQuote(e) {
  return e.replace(Mp, '&quot;');
}
function unescapeQuote(e) {
  return e.replace(Np, '"');
}
function escapeHtmlEntities(e) {
  return e.replace(Lp, function (e, t) {
    return 'x' === t[0] || 'X' === t[0]
      ? String.fromCharCode(parseInt(t.substr(1), 16))
      : String.fromCharCode(parseInt(t, 10));
  });
}
function escapeDangerHtml5Entities(e) {
  return e.replace(Dp, ':').replace(Bp, ' ');
}
function clearNonPrintableCharacter(e) {
  for (var t = '', s = 0, r = e.length; s < r; s++)
    t += e.charCodeAt(s) < 32 ? ' ' : e.charAt(s);
  return Tp.trim(t);
}
function friendlyAttrValue(e) {
  return (e = clearNonPrintableCharacter(
    (e = escapeDangerHtml5Entities(
      (e = escapeHtmlEntities((e = unescapeQuote(e))))
    ))
  ));
}
function escapeAttrValue(e) {
  return (e = escapeHtml((e = escapeQuote(e))));
}
(yp.whiteList = {
  a: ['target', 'href', 'title'],
  abbr: ['title'],
  address: [],
  area: ['shape', 'coords', 'href', 'alt'],
  article: [],
  aside: [],
  audio: [
    'autoplay',
    'controls',
    'crossorigin',
    'loop',
    'muted',
    'preload',
    'src'
  ],
  b: [],
  bdi: ['dir'],
  bdo: ['dir'],
  big: [],
  blockquote: ['cite'],
  br: [],
  caption: [],
  center: [],
  cite: [],
  code: [],
  col: ['align', 'valign', 'span', 'width'],
  colgroup: ['align', 'valign', 'span', 'width'],
  dd: [],
  del: ['datetime'],
  details: ['open'],
  div: [],
  dl: [],
  dt: [],
  em: [],
  figcaption: [],
  figure: [],
  font: ['color', 'size', 'face'],
  footer: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  header: [],
  hr: [],
  i: [],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  ins: ['datetime'],
  kbd: [],
  li: [],
  mark: [],
  nav: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  section: [],
  small: [],
  span: [],
  sub: [],
  summary: [],
  sup: [],
  strong: [],
  strike: [],
  table: ['width', 'border', 'align', 'valign'],
  tbody: ['align', 'valign'],
  td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
  tfoot: ['align', 'valign'],
  th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
  thead: ['align', 'valign'],
  tr: ['rowspan', 'align', 'valign'],
  tt: [],
  u: [],
  ul: [],
  video: [
    'autoplay',
    'controls',
    'crossorigin',
    'loop',
    'muted',
    'playsinline',
    'poster',
    'preload',
    'src',
    'height',
    'width'
  ]
}),
  (yp.getDefaultWhiteList = getDefaultWhiteList),
  (yp.onTag = function (e, t, s) {}),
  (yp.onIgnoreTag = function (e, t, s) {}),
  (yp.onTagAttr = function (e, t, s) {}),
  (yp.onIgnoreTagAttr = function (e, t, s) {}),
  (yp.safeAttrValue = function (e, t, s, r) {
    if (((s = friendlyAttrValue(s)), 'href' === t || 'src' === t)) {
      if ('#' === (s = Tp.trim(s))) return '#';
      if (
        'http://' !== s.substr(0, 7) &&
        'https://' !== s.substr(0, 8) &&
        'mailto:' !== s.substr(0, 7) &&
        'tel:' !== s.substr(0, 4) &&
        'data:image/' !== s.substr(0, 11) &&
        'ftp://' !== s.substr(0, 6) &&
        './' !== s.substr(0, 2) &&
        '../' !== s.substr(0, 3) &&
        '#' !== s[0] &&
        '/' !== s[0]
      )
        return '';
    } else if ('background' === t) {
      if (((Hp.lastIndex = 0), Hp.test(s))) return '';
    } else if ('style' === t) {
      if (((zp.lastIndex = 0), zp.test(s))) return '';
      if (((Fp.lastIndex = 0), Fp.test(s) && ((Hp.lastIndex = 0), Hp.test(s))))
        return '';
      !1 !== r && (s = (r = r || Op).process(s));
    }
    return (s = escapeAttrValue(s));
  }),
  (yp.escapeHtml = escapeHtml),
  (yp.escapeQuote = escapeQuote),
  (yp.unescapeQuote = unescapeQuote),
  (yp.escapeHtmlEntities = escapeHtmlEntities),
  (yp.escapeDangerHtml5Entities = escapeDangerHtml5Entities),
  (yp.clearNonPrintableCharacter = clearNonPrintableCharacter),
  (yp.friendlyAttrValue = friendlyAttrValue),
  (yp.escapeAttrValue = escapeAttrValue),
  (yp.onIgnoreTagStripAll = function () {
    return '';
  }),
  (yp.StripTagBody = function (e, t) {
    'function' != typeof t && (t = function () {});
    var s = !Array.isArray(e),
      r = [],
      o = !1;
    return {
      onIgnoreTag: function (a, u, d) {
        if (
          (function (t) {
            return !!s || -1 !== Tp.indexOf(e, t);
          })(a)
        ) {
          if (d.isClosing) {
            var h = '[/removed]',
              f = d.position + 10;
            return r.push([!1 !== o ? o : d.position, f]), (o = !1), h;
          }
          return o || (o = d.position), '[removed]';
        }
        return t(a, u, d);
      },
      remove: function (e) {
        var t = '',
          s = 0;
        return (
          Tp.forEach(r, function (r) {
            (t += e.slice(s, r[0])), (s = r[1]);
          }),
          (t += e.slice(s))
        );
      }
    };
  }),
  (yp.stripCommentTag = function (e) {
    for (var t = '', s = 0; s < e.length; ) {
      var r = e.indexOf('\x3c!--', s);
      if (-1 === r) {
        t += e.slice(s);
        break;
      }
      t += e.slice(s, r);
      var o = e.indexOf('--\x3e', r);
      if (-1 === o) break;
      s = o + 3;
    }
    return t;
  }),
  (yp.stripBlankChar = function (e) {
    var t = e.split('');
    return (
      (t = t.filter(function (e) {
        var t = e.charCodeAt(0);
        return 127 !== t && (!(t <= 31) || 10 === t || 13 === t);
      })),
      t.join('')
    );
  }),
  (yp.attributeWrapSign = '"'),
  (yp.cssFilter = Op),
  (yp.getDefaultCSSWhiteList = Ap);
var $p = {},
  Up = jp;
function getTagName(e) {
  var t,
    s = Up.spaceIndex(e);
  return (
    (t = -1 === s ? e.slice(1, -1) : e.slice(1, s + 1)),
    '/' === (t = Up.trim(t).toLowerCase()).slice(0, 1) && (t = t.slice(1)),
    '/' === t.slice(-1) && (t = t.slice(0, -1)),
    t
  );
}
function isClosing(e) {
  return '</' === e.slice(0, 2);
}
var qp = /[^a-zA-Z0-9\\_:.-]/gim;
function findNextEqual(e, t) {
  for (; t < e.length; t++) {
    var s = e[t];
    if (' ' !== s) return '=' === s ? t : -1;
  }
}
function findNextQuotationMark(e, t) {
  for (; t < e.length; t++) {
    var s = e[t];
    if (' ' !== s) return "'" === s || '"' === s ? t : -1;
  }
}
function findBeforeEqual(e, t) {
  for (; t > 0; t--) {
    var s = e[t];
    if (' ' !== s) return '=' === s ? t : -1;
  }
}
function stripQuoteWrap(e) {
  return (function (e) {
    return (
      ('"' === e[0] && '"' === e[e.length - 1]) ||
      ("'" === e[0] && "'" === e[e.length - 1])
    );
  })(e)
    ? e.substr(1, e.length - 2)
    : e;
}
($p.parseTag = function (e, t, s) {
  var r = '',
    o = 0,
    a = !1,
    u = !1,
    d = 0,
    h = e.length,
    f = '',
    m = '';
  e: for (d = 0; d < h; d++) {
    var g = e.charAt(d);
    if (!1 === a) {
      if ('<' === g) {
        a = d;
        continue;
      }
    } else if (!1 === u) {
      if ('<' === g) {
        (r += s(e.slice(o, d))), (a = d), (o = d);
        continue;
      }
      if ('>' === g || d === h - 1) {
        (r += s(e.slice(o, a))),
          (f = getTagName((m = e.slice(a, d + 1)))),
          (r += t(a, r.length, f, m, isClosing(m))),
          (o = d + 1),
          (a = !1);
        continue;
      }
      if ('"' === g || "'" === g)
        for (var v = 1, S = e.charAt(d - v); '' === S.trim() || '=' === S; ) {
          if ('=' === S) {
            u = g;
            continue e;
          }
          S = e.charAt(d - ++v);
        }
    } else if (g === u) {
      u = !1;
      continue;
    }
  }
  return o < h && (r += s(e.substr(o))), r;
}),
  ($p.parseAttr = function (e, t) {
    var s = 0,
      r = 0,
      o = [],
      a = !1,
      u = e.length;
    function addAttr(e, s) {
      if (!((e = (e = Up.trim(e)).replace(qp, '').toLowerCase()).length < 1)) {
        var r = t(e, s || '');
        r && o.push(r);
      }
    }
    for (var d = 0; d < u; d++) {
      var h,
        f = e.charAt(d);
      if (!1 !== a || '=' !== f)
        if (!1 === a || d !== r)
          if (/\s|\n|\t/.test(f)) {
            if (((e = e.replace(/\s|\n|\t/g, ' ')), !1 === a)) {
              if (-1 === (h = findNextEqual(e, d))) {
                addAttr(Up.trim(e.slice(s, d))), (a = !1), (s = d + 1);
                continue;
              }
              d = h - 1;
              continue;
            }
            if (-1 === (h = findBeforeEqual(e, d - 1))) {
              addAttr(a, stripQuoteWrap(Up.trim(e.slice(s, d)))),
                (a = !1),
                (s = d + 1);
              continue;
            }
          } else;
        else {
          if (-1 === (h = e.indexOf(f, d + 1))) break;
          addAttr(a, Up.trim(e.slice(r + 1, h))), (a = !1), (s = (d = h) + 1);
        }
      else
        (a = e.slice(s, d)),
          (s = d + 1),
          (r =
            '"' === e.charAt(s) || "'" === e.charAt(s)
              ? s
              : findNextQuotationMark(e, d + 1));
    }
    return (
      s < e.length &&
        (!1 === a
          ? addAttr(e.slice(s))
          : addAttr(a, stripQuoteWrap(Up.trim(e.slice(s))))),
      Up.trim(o.join(' '))
    );
  });
var Vp = Rp.FilterCSS,
  Wp = yp,
  Kp = $p,
  Qp = Kp.parseTag,
  Gp = Kp.parseAttr,
  Jp = jp;
function isNull(e) {
  return null == e;
}
function FilterXSS(e) {
  (e = (function (e) {
    var t = {};
    for (var s in e) t[s] = e[s];
    return t;
  })(e || {})),
    e.stripIgnoreTag &&
      (e.onIgnoreTag &&
        console.error(
          'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
        ),
      (e.onIgnoreTag = Wp.onIgnoreTagStripAll)),
    e.whiteList || e.allowList
      ? (e.whiteList = (function (e) {
          var t = {};
          for (var s in e)
            Array.isArray(e[s])
              ? (t[s.toLowerCase()] = e[s].map(function (e) {
                  return e.toLowerCase();
                }))
              : (t[s.toLowerCase()] = e[s]);
          return t;
        })(e.whiteList || e.allowList))
      : (e.whiteList = Wp.whiteList),
    (this.attributeWrapSign =
      !0 === e.singleQuotedAttributeValue ? "'" : Wp.attributeWrapSign),
    (e.onTag = e.onTag || Wp.onTag),
    (e.onTagAttr = e.onTagAttr || Wp.onTagAttr),
    (e.onIgnoreTag = e.onIgnoreTag || Wp.onIgnoreTag),
    (e.onIgnoreTagAttr = e.onIgnoreTagAttr || Wp.onIgnoreTagAttr),
    (e.safeAttrValue = e.safeAttrValue || Wp.safeAttrValue),
    (e.escapeHtml = e.escapeHtml || Wp.escapeHtml),
    (this.options = e),
    !1 === e.css
      ? (this.cssFilter = !1)
      : ((e.css = e.css || {}), (this.cssFilter = new Vp(e.css)));
}
FilterXSS.prototype.process = function (e) {
  if (!(e = (e = e || '').toString())) return '';
  var t = this,
    s = t.options,
    r = s.whiteList,
    o = s.onTag,
    a = s.onIgnoreTag,
    u = s.onTagAttr,
    d = s.onIgnoreTagAttr,
    h = s.safeAttrValue,
    f = s.escapeHtml,
    m = t.attributeWrapSign,
    g = t.cssFilter;
  s.stripBlankChar && (e = Wp.stripBlankChar(e)),
    s.allowCommentTag || (e = Wp.stripCommentTag(e));
  var v = !1;
  s.stripIgnoreTagBody &&
    ((v = Wp.StripTagBody(s.stripIgnoreTagBody, a)), (a = v.onIgnoreTag));
  var S = Qp(
    e,
    function (e, t, s, v, S) {
      var _ = {
          sourcePosition: e,
          position: t,
          isClosing: S,
          isWhite: Object.prototype.hasOwnProperty.call(r, s)
        },
        C = o(s, v, _);
      if (!isNull(C)) return C;
      if (_.isWhite) {
        if (_.isClosing) return '</' + s + '>';
        var R = (function (e) {
            var t = Jp.spaceIndex(e);
            if (-1 === t) return { html: '', closing: '/' === e[e.length - 2] };
            var s = '/' === (e = Jp.trim(e.slice(t + 1, -1)))[e.length - 1];
            return s && (e = Jp.trim(e.slice(0, -1))), { html: e, closing: s };
          })(v),
          j = r[s],
          E = Gp(R.html, function (e, t) {
            var r = -1 !== Jp.indexOf(j, e),
              o = u(s, e, t, r);
            return isNull(o)
              ? r
                ? (t = h(s, e, t, g))
                  ? e + '=' + m + t + m
                  : e
                : isNull((o = d(s, e, t, r)))
                  ? void 0
                  : o
              : o;
          });
        return (
          (v = '<' + s),
          E && (v += ' ' + E),
          R.closing && (v += ' /'),
          (v += '>')
        );
      }
      return isNull((C = a(s, v, _))) ? f(v) : C;
    },
    f
  );
  return v && (S = v.remove(S)), S;
};
var Yp = FilterXSS;
!(function (e, t) {
  var s = yp,
    r = $p,
    o = Yp;
  function filterXSS(e, t) {
    return new o(t).process(e);
  }
  ((t = e.exports = filterXSS).filterXSS = filterXSS),
    (t.FilterXSS = o),
    (function () {
      for (var e in s) t[e] = s[e];
      for (var o in r) t[o] = r[o];
    })(),
    'undefined' != typeof self &&
      'undefined' != typeof DedicatedWorkerGlobalScope &&
      self instanceof DedicatedWorkerGlobalScope &&
      (self.filterXSS = e.exports);
})(gp, gp.exports);
var Xp = gp.exports;
const _lazy_mEoERs = () =>
    import('../routes/renderer.mjs').then(function (e) {
      return e.q;
    }),
  Zp = [
    { route: '', handler: Oh, lazy: !1, middleware: !0, method: void 0 },
    {
      route: '/api/__sitemap__/albums',
      handler: () => import('../routes/api/__sitemap__/index.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/artists',
      handler: () => import('../routes/api/__sitemap__/index2.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/blog',
      handler: () => import('../routes/api/__sitemap__/index3.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/boxers',
      handler: () => import('../routes/api/__sitemap__/index4.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/company-categories',
      handler: () => import('../routes/api/__sitemap__/index5.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/company',
      handler: () => import('../routes/api/__sitemap__/index6.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/glossary',
      handler: () => import('../routes/api/__sitemap__/index7.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/movies',
      handler: () => import('../routes/api/__sitemap__/index8.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/post-categories',
      handler: () => import('../routes/api/__sitemap__/index9.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/posts',
      handler: () => import('../routes/api/__sitemap__/index10.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/shop',
      handler: () => import('../routes/api/__sitemap__/index11.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/songs',
      handler: () => import('../routes/api/__sitemap__/index12.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/__sitemap__/weight-classes',
      handler: () => import('../routes/api/__sitemap__/index13.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/albums/:slug',
      handler: () => import('../routes/api/albums/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/albums',
      handler: () => import('../routes/api/index.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/artists/:slug',
      handler: () => import('../routes/api/artists/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/artists',
      handler: () => import('../routes/api/index2.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/boxer/:slug',
      handler: () => import('../routes/api/boxer/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/boxers',
      handler: () => import('../routes/api/index3.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/companies',
      handler: () => import('../routes/api/index4.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/company-categories',
      handler: () => import('../routes/api/company-categories.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/company/:slug',
      handler: () => import('../routes/api/company/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/db',
      handler: () => import('../routes/api/index5.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/db/schema',
      handler: () =>
        import('../routes/api/db/schema.mjs').then(function (e) {
          return e.I;
        }),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/album/:slug',
      handler: () => import('../routes/api/mock/album/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/albums',
      handler: () => import('../routes/api/mock/albums.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/artist/:slug',
      handler: () => import('../routes/api/mock/artist/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/artists',
      handler: () => import('../routes/api/mock/artists.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/boxer/:slug',
      handler: () => import('../routes/api/mock/boxer/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/boxers',
      handler: () => import('../routes/api/mock/index.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/companies',
      handler: () => import('../routes/api/mock/index2.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/company-categories',
      handler: () => import('../routes/api/mock/company-categories.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/company/:slug',
      handler: () => import('../routes/api/mock/company/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/post-categories',
      handler: () => import('../routes/api/mock/post-categories.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/post/:slug',
      handler: () => import('../routes/api/mock/post/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/posts',
      handler: () => import('../routes/api/mock/index3.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/song/:slug',
      handler: () => import('../routes/api/mock/song/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/songs',
      handler: () => import('../routes/api/mock/songs.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/mock/weight-classes',
      handler: () => import('../routes/api/mock/weight-classes.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/post-categories',
      handler: () => import('../routes/api/post-categories.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/post/:slug',
      handler: () => import('../routes/api/post/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/posts',
      handler: () => import('../routes/api/index6.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/songs/:slug',
      handler: () => import('../routes/api/songs/_slug_.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/songs',
      handler: () => import('../routes/api/index7.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/weight-classes',
      handler: () => import('../routes/api/weight-classes.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/sitemap_core.xml',
      handler: () => import('../routes/sitemap_core.xml.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/sitemap_index.xml',
      handler: () => import('../routes/sitemap_index.xml.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/sitemap/posts/:page.xml',
      handler: () => import('../routes/sitemap/posts/_page_.xml.mjs'),
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/__nuxt_error',
      handler: _lazy_mEoERs,
      lazy: !0,
      middleware: !1,
      method: void 0
    },
    {
      route: '/api/_nuxt_icon/:collection',
      handler: Zh,
      lazy: !1,
      middleware: !1,
      method: void 0
    },
    { route: '', handler: ep, lazy: !1, middleware: !0, method: void 0 },
    {
      route: '/robots.txt',
      handler: tp,
      lazy: !1,
      middleware: !1,
      method: void 0
    },
    { route: '', handler: np, lazy: !1, middleware: !0, method: void 0 },
    {
      route: '/__sitemap__/style.xsl',
      handler: op,
      lazy: !1,
      middleware: !1,
      method: void 0
    },
    {
      route: '/sitemap.xml',
      handler: ap,
      lazy: !1,
      middleware: !1,
      method: void 0
    },
    { route: '', handler: up, lazy: !1, middleware: !1, method: void 0 },
    { route: '', handler: dp, lazy: !1, middleware: !1, method: void 0 },
    { route: '', handler: hp, lazy: !1, middleware: !1, method: void 0 },
    { route: '', handler: mp, lazy: !1, middleware: !1, method: void 0 },
    {
      route: '',
      handler: defineEventHandler(async (e) => {
        const t = resolveSecurityRules(e);
        if (t.enabled && t.xssValidator) {
          const s = { ...t.xssValidator, escapeHtml: void 0 };
          !1 === t.xssValidator.escapeHtml && (s.escapeHtml = (e) => e);
          const r = new Xp.FilterXSS(s);
          if (
            'readOnly' !== e.node.req.socket.readyState &&
            t.xssValidator.methods &&
            t.xssValidator.methods.includes(e.node.req.method)
          ) {
            const s =
              'GET' === e.node.req.method
                ? getQuery(e)
                : e.node.req.headers['content-type']?.includes(
                      'multipart/form-data'
                    )
                  ? await readMultipartFormData(e)
                  : await readBody(e);
            if (s && Object.keys(s).length) {
              if (s.statusMessage && 'Bad Request' !== s.statusMessage) return;
              const e = JSON.stringify(s);
              if (r.process(JSON.stringify(s)) !== e) {
                const e = { statusCode: 400, statusMessage: 'Bad Request' };
                if (!1 === t.xssValidator.throwError) return e;
                throw createError(e);
              }
            }
          }
        }
      }),
      lazy: !1,
      middleware: !1,
      method: void 0
    },
    {
      route: '/**',
      handler: _lazy_mEoERs,
      lazy: !0,
      middleware: !1,
      method: void 0
    }
  ],
  ef = /post|put|patch/i;
function joinHeaders(e) {
  return Array.isArray(e) ? e.join(', ') : String(e);
}
function normalizeCookieHeader(e = '') {
  return splitCookiesString(joinHeaders(e));
}
function normalizeCookieHeaders(e) {
  const t = new Headers();
  for (const [s, r] of e)
    if ('set-cookie' === s)
      for (const e of normalizeCookieHeader(r)) t.append('set-cookie', e);
    else t.set(s, joinHeaders(r));
  return t;
}
const tf = (function () {
  const e = useRuntimeConfig(),
    t = createHooks(),
    captureError = (e, s = {}) => {
      const r = t.callHookParallel('error', e, s).catch((e) => {
        console.error('Error while capturing another error', e);
      });
      if (s.event && isEvent(s.event)) {
        const t = s.event.context.nitro?.errors;
        t && t.push({ error: e, context: s }),
          s.event.waitUntil && s.event.waitUntil(r);
      }
    },
    s = createApp$1({
      debug: destr(!1),
      onError: (e, t) => (
        captureError(e, { event: t, tags: ['request'] }),
        (async function (e, t) {
          for (const s of Ln)
            try {
              if (
                (await s(e, t, { defaultHandler: defaultHandler }), t.handled)
              )
                return;
            } catch (e) {
              console.error(e);
            }
        })(e, t)
      ),
      onRequest: async (e) => {
        e.context.nitro = e.context.nitro || { errors: [] };
        const t = e.node.req?.__unenv__;
        t && Object.assign(e.context, t),
          (e.fetch = (t, s) => fetchWithEvent(e, t, s, { fetch: localFetch })),
          (e.$fetch = (t, s) => fetchWithEvent(e, t, s, { fetch: a })),
          (e.waitUntil = (s) => {
            e.context.nitro._waitUntilPromises ||
              (e.context.nitro._waitUntilPromises = []),
              e.context.nitro._waitUntilPromises.push(s),
              t?.waitUntil && t.waitUntil(s);
          }),
          (e.captureError = (t, s) => {
            captureError(t, { event: e, ...s });
          }),
          await tf.hooks.callHook('request', e).catch((t) => {
            captureError(t, { event: e, tags: ['request'] });
          });
      },
      onBeforeResponse: async (e, t) => {
        await tf.hooks.callHook('beforeResponse', e, t).catch((t) => {
          captureError(t, { event: e, tags: ['request', 'response'] });
        });
      },
      onAfterResponse: async (e, t) => {
        await tf.hooks.callHook('afterResponse', e, t).catch((t) => {
          captureError(t, { event: e, tags: ['request', 'response'] });
        });
      }
    }),
    r = (function (e = {}) {
      const t = createRouter$1({}),
        s = {};
      let r;
      const o = {},
        addRoute = (e, r, a) => {
          let u = s[e];
          if (
            (u || ((s[e] = u = { path: e, handlers: {} }), t.insert(e, u)),
            Array.isArray(a))
          )
            for (const t of a) addRoute(e, r, t);
          else u.handlers[a] = toEventHandler(r, 0, e);
          return o;
        };
      o.use = o.add = (e, t, s) => addRoute(e, t, s || 'all');
      for (const e of wn) o[e] = (t, s) => o.add(t, s, e);
      const matchHandler = (e = '/', s = 'get') => {
          const o = e.indexOf('?');
          -1 !== o && (e = e.slice(0, Math.max(0, o)));
          const a = t.lookup(e);
          if (!a || !a.handlers)
            return {
              error: createError$1({
                statusCode: 404,
                name: 'Not Found',
                statusMessage: `Cannot find any route matching ${e || '/'}.`
              })
            };
          let u = a.handlers[s] || a.handlers.all;
          if (!u) {
            r || (r = toRouteMatcher(t));
            const o = r.matchAll(e).reverse();
            for (const e of o) {
              if (e.handlers[s]) {
                (u = e.handlers[s]), (a.handlers[s] = a.handlers[s] || u);
                break;
              }
              if (e.handlers.all) {
                (u = e.handlers.all), (a.handlers.all = a.handlers.all || u);
                break;
              }
            }
          }
          return u
            ? { matched: a, handler: u }
            : {
                error: createError$1({
                  statusCode: 405,
                  name: 'Method Not Allowed',
                  statusMessage: `Method ${s} is not allowed on this route.`
                })
              };
        },
        a = e.preemptive || e.preemtive;
      return (
        (o.handler = _n((e) => {
          const t = matchHandler(e.path, e.method.toLowerCase());
          if ('error' in t) {
            if (a) throw t.error;
            return;
          }
          e.context.matchedRoute = t.matched;
          const s = t.matched.params || {};
          return (
            (e.context.params = s),
            Promise.resolve(t.handler(e)).then((e) =>
              void 0 === e && a ? null : e
            )
          );
        })),
        (o.handler.__resolve__ = async (e) => {
          e = withLeadingSlash(e);
          const t = matchHandler(e);
          if ('error' in t) return;
          let s = { route: t.matched.path, handler: t.handler };
          if (t.handler.__resolve__) {
            const r = await t.handler.__resolve__(e);
            if (!r) return;
            s = { ...s, ...r };
          }
          return s;
        }),
        o
      );
    })({ preemptive: !0 }),
    o = toNodeListener(s),
    localFetch = (e, t) =>
      e.toString().startsWith('/')
        ? (async function (e, t, s = {}) {
            try {
              const r = await b$1(e, { url: t, ...s });
              return new Response(r.body, {
                status: r.status,
                statusText: r.statusText,
                headers: S$1(r.headers)
              });
            } catch (e) {
              return new Response(e.toString(), {
                status: Number.parseInt(e.statusCode || e.code) || 500,
                statusText: e.statusText
              });
            }
          })(o, e, t).then((e) =>
            (function (e) {
              return e.headers.has('set-cookie')
                ? new Response(e.body, {
                    status: e.status,
                    statusText: e.statusText,
                    headers: normalizeCookieHeaders(e.headers)
                  })
                : e;
            })(e)
          )
        : globalThis.fetch(e, t),
    a = createFetch({
      fetch: localFetch,
      Headers: Pn,
      defaults: { baseURL: e.app.baseURL }
    });
  (globalThis.$fetch = a),
    s.use(createRouteRulesHandler({ localFetch: localFetch }));
  for (const t of Zp) {
    let o = t.lazy ? lazyEventHandler(t.handler) : t.handler;
    if (t.middleware || !t.route) {
      const r = (e.app.baseURL + (t.route || '/')).replace(/\/+/g, '/');
      s.use(r, o);
    } else {
      const e = getRouteRulesForPath(t.route.replace(/:\w+|\*\*/g, '_'));
      e.cache && (o = Ti(o, { group: 'nitro/routes', ...e.cache })),
        r.use(t.route, o, t.method);
    }
  }
  return (
    s.use(e.app.baseURL, r.handler),
    {
      hooks: t,
      h3App: s,
      router: r,
      localCall: (e) => b$1(o, e),
      localFetch: localFetch,
      captureError: captureError
    }
  );
})();
function useNitroApp() {
  return tf;
}
!(function (e) {
  for (const t of Vd)
    try {
      t(e);
    } catch (t) {
      throw (e.captureError(t, { tags: ['plugin'] }), t);
    }
})(tf);
const nf = useNitroApp(),
  sf = {
    async fetch(e, s, r) {
      const o = new URL(e.url);
      if (s.ASSETS && isPublicAssetURL(o.pathname)) return s.ASSETS.fetch(e);
      let a;
      return (
        (function (e) {
          return ef.test(e.method);
        })(e) && (a = t.from(await e.arrayBuffer())),
        (globalThis.__env__ = s),
        nf.localFetch(o.pathname + o.search, {
          context: {
            cf: e.cf,
            waitUntil: (e) => r.waitUntil(e),
            cloudflare: { request: e, env: s, context: r }
          },
          host: o.hostname,
          protocol: o.protocol,
          method: e.method,
          headers: e.headers,
          body: a
        })
      );
    },
    scheduled(e, t, s) {}
  };
export {
  getQuery$1 as $,
  stringifyStyle as A,
  isRenderableAttrValue as B,
  hs as C,
  ls as D,
  includeBooleanAttr as E,
  isSSRSafeAttrName as F,
  Wn as G,
  isFunction$3 as H,
  Rr as I,
  Er as J,
  escapeHtmlComment as K,
  mergeProps as L,
  is as M,
  NOOP as N,
  toDisplayString as O,
  isObject$3 as P,
  os as Q,
  getGlobalThis as R,
  Ar as S,
  jr as T,
  initDirectivesForSSR as U,
  createHooks as V,
  zr as W,
  unref as X,
  defineRenderHandler as Y,
  buildAssetsURL as Z,
  publicAssetsURL as _,
  getRouterParam as a,
  useAttrs as a$,
  createError$1 as a0,
  getRouteRules as a1,
  useNitroApp as a2,
  getResponseStatusText as a3,
  getResponseStatus$1 as a4,
  xn as a5,
  inject as a6,
  ref as a7,
  watchEffect as a8,
  watch$3 as a9,
  toRef as aA,
  readonly$1 as aB,
  customRef as aC,
  cloneVNode as aD,
  createBlock as aE,
  openBlock as aF,
  withCtx as aG,
  renderSlot as aH,
  toValue as aI,
  lr as aJ,
  es as aK,
  Jn as aL,
  createCommentVNode as aM,
  sr as aN,
  withDirectives as aO,
  Qr as aP,
  markRaw as aQ,
  createTextVNode as aR,
  createElementBlock as aS,
  withModifiers as aT,
  normalizeProps as aU,
  guardReactiveProps as aV,
  rn as aW,
  useSlots as aX,
  klona as aY,
  getRequestHeaders as aZ,
  parseURL as a_,
  cr as aa,
  onDeactivated as ab,
  onActivated as ac,
  isRef as ad,
  or as ae,
  onScopeDispose as af,
  shallowRef as ag,
  defineComponent as ah,
  shallowReactive as ai,
  reactive as aj,
  computed as ak,
  h$1 as al,
  provide as am,
  nextTick as an,
  sn as ao,
  hasTrailingSlash as ap,
  withTrailingSlash as aq,
  withoutTrailingSlash as ar,
  joinURL as as,
  withBase as at,
  hash as au,
  hasProtocol as av,
  createDefu$1 as aw,
  effectScope as ax,
  toRefs as ay,
  getCurrentScope as az,
  getCurrentInstance as b,
  getContext as b0,
  Nn as b1,
  baseURL as b2,
  hasInjectionContext as b3,
  ur as b4,
  resolveComponent as b5,
  parseQuery as b6,
  isEqual as b7,
  diff as b8,
  renderList as b9,
  resolveDynamicComponent as ba,
  useId as bb,
  onErrorCaptured as bc,
  isReadonly as bd,
  isShallow as be,
  isReactive as bf,
  toRaw as bg,
  defineAsyncComponent as bh,
  titleCase as bi,
  withQuery as bj,
  isScriptProtocol as bk,
  getIconCSS as bl,
  toRouteMatcher as bm,
  createRouter$1 as bn,
  camelCase as bo,
  stringifyQuery as bp,
  sanitizeStatusCode as bq,
  xr as br,
  withAsyncContext as bs,
  mergeModels as bt,
  useModel as bu,
  withKeys as bv,
  createSlots as bw,
  stringifyParsedURL as bx,
  sf as by,
  createError as c,
  defineEventHandler as d,
  useSSRContext as e,
  getMultiCacheContext as f,
  getQuery as g,
  getCacheKeyWithPrefix as h,
  getExpiresValue as i,
  isExpired as j,
  getRouterParams as k,
  Go as l,
  I as m,
  createVNode as n,
  makeMap as o,
  isOn as p,
  isPromise as q,
  createApp as r,
  Fr as s,
  kr as t,
  useRuntimeConfig as u,
  escapeHtml$1 as v,
  withLeadingSlash as w,
  normalizeClass as x,
  isString$1 as y,
  normalizeStyle as z
};
//# sourceMappingURL=nitro.mjs.map
