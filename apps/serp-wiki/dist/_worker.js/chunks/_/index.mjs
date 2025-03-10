const t = new TextDecoder(),
  toUTF8String = (e, i = 0, n = e.length) => t.decode(e.slice(i, n)),
  toHexString = (t, e = 0, i = t.length) =>
    t.slice(e, i).reduce((t, e) => t + ('0' + e.toString(16)).slice(-2), ''),
  readInt16LE = (t, e = 0) => {
    const i = t[e] + 256 * t[e + 1];
    return i | (131070 * (32768 & i));
  },
  readUInt16BE = (t, e = 0) => 256 * t[e] + t[e + 1],
  readUInt16LE = (t, e = 0) => t[e] + 256 * t[e + 1],
  readUInt24LE = (t, e = 0) => t[e] + 256 * t[e + 1] + 65536 * t[e + 2],
  readInt32LE = (t, e = 0) =>
    t[e] + 256 * t[e + 1] + 65536 * t[e + 2] + (t[e + 3] << 24),
  readUInt32BE = (t, e = 0) =>
    t[e] * 2 ** 24 + 65536 * t[e + 1] + 256 * t[e + 2] + t[e + 3],
  readUInt32LE = (t, e = 0) =>
    t[e] + 256 * t[e + 1] + 65536 * t[e + 2] + t[e + 3] * 2 ** 24,
  e = {
    readUInt16BE: readUInt16BE,
    readUInt16LE: readUInt16LE,
    readUInt32BE: readUInt32BE,
    readUInt32LE: readUInt32LE
  };
function readUInt(t, i, n, r) {
  n = n || 0;
  return e['readUInt' + i + (r ? 'BE' : 'LE')](t, n);
}
const i = {
  validate: (t) => 'BM' === toUTF8String(t, 0, 2),
  calculate: (t) => ({
    height: Math.abs(readInt32LE(t, 22)),
    width: readUInt32LE(t, 18)
  })
};
function getSizeFromOffset(t, e) {
  const i = t[e];
  return 0 === i ? 256 : i;
}
function getImageSize$1(t, e) {
  const i = 6 + 16 * e;
  return {
    height: getSizeFromOffset(t, i + 1),
    width: getSizeFromOffset(t, i)
  };
}
const n = {
    validate(t) {
      const e = readUInt16LE(t, 0),
        i = readUInt16LE(t, 4);
      if (0 !== e || 0 === i) return !1;
      return 1 === readUInt16LE(t, 2);
    },
    calculate(t) {
      const e = readUInt16LE(t, 4),
        i = getImageSize$1(t, 0);
      if (1 === e) return i;
      const n = [i];
      for (let i = 1; i < e; i += 1) n.push(getImageSize$1(t, i));
      return { height: i.height, images: n, width: i.width };
    }
  },
  r = {
    validate(t) {
      const e = readUInt16LE(t, 0),
        i = readUInt16LE(t, 4);
      if (0 !== e || 0 === i) return !1;
      return 2 === readUInt16LE(t, 2);
    },
    calculate: (t) => n.calculate(t)
  },
  a = {
    validate: (t) => 542327876 === readUInt32LE(t, 0),
    calculate: (t) => ({
      height: readUInt32LE(t, 12),
      width: readUInt32LE(t, 16)
    })
  },
  c = /^GIF8[79]a/,
  h = {
    validate: (t) => c.test(toUTF8String(t, 0, 6)),
    calculate: (t) => ({
      height: readUInt16LE(t, 8),
      width: readUInt16LE(t, 6)
    })
  },
  o = {
    ICON: 32,
    'ICN#': 32,
    'icm#': 16,
    icm4: 16,
    icm8: 16,
    'ics#': 16,
    ics4: 16,
    ics8: 16,
    is32: 16,
    s8mk: 16,
    icp4: 16,
    icl4: 32,
    icl8: 32,
    il32: 32,
    l8mk: 32,
    icp5: 32,
    ic11: 32,
    ich4: 48,
    ich8: 48,
    ih32: 48,
    h8mk: 48,
    icp6: 64,
    ic12: 32,
    it32: 128,
    t8mk: 128,
    ic07: 128,
    ic08: 256,
    ic13: 256,
    ic09: 512,
    ic14: 512,
    ic10: 1024
  };
function readImageHeader(t, e) {
  const i = e + 4;
  return [toUTF8String(t, e, i), readUInt32BE(t, i)];
}
function getImageSize(t) {
  const e = o[t];
  return { width: e, height: e, type: t };
}
const s = {
    validate: (t) => 'icns' === toUTF8String(t, 0, 4),
    calculate(t) {
      const e = t.length,
        i = readUInt32BE(t, 4);
      let n = 8,
        r = readImageHeader(t, n),
        a = getImageSize(r[0]);
      if (((n += r[1]), n === i)) return a;
      const c = { height: a.height, images: [a], width: a.width };
      for (; n < i && n < e; )
        (r = readImageHeader(t, n)),
          (a = getImageSize(r[0])),
          (n += r[1]),
          c.images.push(a);
      return c;
    }
  },
  d = {
    validate: (t) => 'ff4fff51' === toHexString(t, 0, 4),
    calculate: (t) => ({
      height: readUInt32BE(t, 12),
      width: readUInt32BE(t, 8)
    })
  },
  f = '66747970',
  l = '6a703268',
  u = '6a502020',
  g = '72726571',
  parseIHDR = (t) => ({
    height: readUInt32BE(t, 4),
    width: readUInt32BE(t, 8)
  }),
  w = {
    validate(t) {
      const e = toHexString(t, 4, 8),
        i = readUInt32BE(t, 0);
      if (e !== u || i < 1) return !1;
      const n = i + 4,
        r = readUInt32BE(t, i),
        a = t.slice(n, n + r);
      return toHexString(a, 0, 4) === f;
    },
    calculate(t) {
      const e = readUInt32BE(t, 0);
      let i = e + 4 + readUInt16BE(t, e + 2);
      switch (toHexString(t, i, i + 4)) {
        case g:
          return (
            (i =
              i +
              4 +
              4 +
              ((t) => {
                const e = t[0];
                let i = 1 + 2 * e;
                return (
                  (i = i + 2 + readUInt16BE(t, i) * (2 + e)),
                  i + 2 + readUInt16BE(t, i) * (16 + e)
                );
              })(t.slice(i + 4))),
            parseIHDR(t.slice(i + 8, i + 24))
          );
        case l:
          return parseIHDR(t.slice(i + 8, i + 24));
        default:
          throw new TypeError(
            'Unsupported header found: ' + toUTF8String(t, i, i + 4)
          );
      }
    }
  };
function isEXIF(t) {
  return '45786966' === toHexString(t, 2, 6);
}
function extractSize(t, e) {
  return { height: readUInt16BE(t, e), width: readUInt16BE(t, e + 2) };
}
function validateExifBlock(t, e) {
  const i = t.slice(2, e),
    n = toHexString(i, 6, 8),
    r = '4d4d' === n;
  if (r || '4949' === n)
    return (function (t, e) {
      const i = readUInt(t, 16, 14, e);
      for (let n = 0; n < i; n++) {
        const i = 16 + 12 * n,
          r = i + 12;
        if (i > t.length) return;
        const a = t.slice(i, r);
        if (274 === readUInt(a, 16, 0, e)) {
          if (3 !== readUInt(a, 16, 2, e)) return;
          if (1 !== readUInt(a, 32, 4, e)) return;
          return readUInt(a, 16, 8, e);
        }
      }
    })(i, r);
}
function validateInput(t, e) {
  if (e > t.length) throw new TypeError('Corrupt JPG, exceeded buffer limits');
  if (255 !== t[e]) throw new TypeError('Invalid JPG, marker table corrupted');
}
const p = {
    validate: (t) => 'ffd8' === toHexString(t, 0, 2),
    calculate(t) {
      let e, i;
      for (t = t.slice(4); t.length > 0; ) {
        const n = readUInt16BE(t, 0);
        if (
          (isEXIF(t) && (e = validateExifBlock(t, n)),
          validateInput(t, n),
          (i = t[n + 1]),
          192 === i || 193 === i || 194 === i)
        ) {
          const i = extractSize(t, n + 5);
          return e ? { height: i.height, orientation: e, width: i.width } : i;
        }
        t = t.slice(n + 2);
      }
      throw new TypeError('Invalid JPG, no size found');
    }
  },
  m = {
    validate: (t) => 'KTX 11' === toUTF8String(t, 1, 7),
    calculate: (t) => ({
      height: readUInt32LE(t, 40),
      width: readUInt32LE(t, 36)
    })
  },
  I = 'CgBI',
  v = {
    validate(t) {
      if ('PNG\r\n\n' === toUTF8String(t, 1, 8)) {
        let e = toUTF8String(t, 12, 16);
        if ((e === I && (e = toUTF8String(t, 28, 32)), 'IHDR' !== e))
          throw new TypeError('Invalid PNG');
        return !0;
      }
      return !1;
    },
    calculate: (t) =>
      toUTF8String(t, 12, 16) === I
        ? { height: readUInt32BE(t, 36), width: readUInt32BE(t, 32) }
        : { height: readUInt32BE(t, 20), width: readUInt32BE(t, 16) }
  },
  b = {
    P1: 'pbm/ascii',
    P2: 'pgm/ascii',
    P3: 'ppm/ascii',
    P4: 'pbm',
    P5: 'pgm',
    P6: 'ppm',
    P7: 'pam',
    PF: 'pfm'
  },
  E = {
    default: (t) => {
      let e = [];
      for (; t.length > 0; ) {
        const i = t.shift();
        if ('#' !== i[0]) {
          e = i.split(' ');
          break;
        }
      }
      if (2 === e.length)
        return {
          height: Number.parseInt(e[1], 10),
          width: Number.parseInt(e[0], 10)
        };
      throw new TypeError('Invalid PNM');
    },
    pam: (t) => {
      const e = {};
      for (; t.length > 0; ) {
        const i = t.shift();
        if (i.length > 16 || (i.codePointAt(0) || 0) > 128) continue;
        const [n, r] = i.split(' ');
        if (
          (n && r && (e[n.toLowerCase()] = Number.parseInt(r, 10)),
          e.height && e.width)
        )
          break;
      }
      if (e.height && e.width) return { height: e.height, width: e.width };
      throw new TypeError('Invalid PAM');
    }
  },
  x = {
    validate: (t) => toUTF8String(t, 0, 2) in b,
    calculate(t) {
      const e = toUTF8String(t, 0, 2),
        i = b[e],
        n = toUTF8String(t, 3).split(/[\n\r]+/);
      return (E[i] || E.default)(n);
    }
  },
  P = {
    validate: (t) => '8BPS' === toUTF8String(t, 0, 4),
    calculate: (t) => ({
      height: readUInt32BE(t, 14),
      width: readUInt32BE(t, 18)
    })
  },
  U = /<svg\s([^"'>]|"[^"]*"|'[^']*')*>/,
  y = {
    height: /\sheight=(["'])([^%]+?)\1/,
    root: U,
    viewbox: /\sviewbox=(["'])(.+?)\1/i,
    width: /\swidth=(["'])([^%]+?)\1/
  },
  T = 2.54,
  z = {
    in: 96,
    cm: 96 / T,
    em: 16,
    ex: 8,
    m: (96 / T) * 100,
    mm: 96 / T / 10,
    pc: 96 / 72 / 12,
    pt: 96 / 72,
    px: 1
  },
  B = new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(z).join('|')})?$`);
function parseLength(t) {
  const e = B.exec(t);
  if (e) return Math.round(Number(e[1]) * (z[e[2]] || 1));
}
function parseViewbox(t) {
  const e = t.split(' ');
  return { height: parseLength(e[3]), width: parseLength(e[2]) };
}
const S = {
    validate: (t) => U.test(toUTF8String(t, 0, 1e3)),
    calculate(t) {
      const e = toUTF8String(t).match(y.root);
      if (e) {
        const t = (function (t) {
          const e = t.match(y.width),
            i = t.match(y.height),
            n = t.match(y.viewbox);
          return {
            height: i && parseLength(i[2]),
            viewbox: n && parseViewbox(n[2]),
            width: e && parseLength(e[2])
          };
        })(e[0]);
        if (t.width && t.height)
          return (function (t) {
            return { height: t.height, width: t.width };
          })(t);
        if (t.viewbox)
          return (function (t, e) {
            const i = e.width / e.height;
            return t.width
              ? { height: Math.floor(t.width / i), width: t.width }
              : t.height
                ? { height: t.height, width: Math.floor(t.height * i) }
                : { height: e.height, width: e.width };
          })(t, t.viewbox);
      }
      throw new TypeError('Invalid SVG');
    }
  },
  k = {
    validate: (t) => 0 === readUInt16LE(t, 0) && 0 === readUInt16LE(t, 4),
    calculate: (t) => ({
      height: readUInt16LE(t, 14),
      width: readUInt16LE(t, 12)
    })
  };
function readValue(t, e) {
  const i = readUInt(t, 16, 8, e);
  return (readUInt(t, 16, 10, e) << 16) + i;
}
function nextTag(t) {
  if (t.length > 24) return t.slice(12);
}
const M = new Set(['49492a00', '4d4d002a']);
function findBox(t, e, i = 0, n = t.length) {
  for (let r = i; r < n; ) {
    const i = readUInt32BE(t, r);
    if (toUTF8String(t, r + 4, r + 8) === e) return { offset: r, size: i };
    if (i <= 0 || r + i > n) break;
    r += i;
  }
  throw new Error(`${e} box not found`);
}
const L = {
    bmp: i,
    cur: r,
    dds: a,
    gif: h,
    icns: s,
    ico: n,
    j2c: d,
    jp2: w,
    jpg: p,
    ktx: m,
    png: v,
    pnm: x,
    psd: P,
    svg: S,
    tga: k,
    tiff: {
      validate: (t) => M.has(toHexString(t, 0, 4)),
      calculate(t) {
        const e =
            'BE' ===
            (function (t) {
              const e = toUTF8String(t, 0, 2);
              return 'II' === e ? 'LE' : 'MM' === e ? 'BE' : void 0;
            })(t),
          i = (function (t, e) {
            const i = readUInt(t, 32, 4, e);
            let n = 1024;
            const r = t.length;
            return i + n > r && (n = r - i - 10), t.slice(i + 2, i + 2 + n);
          })(t, e),
          n = (function (t, e) {
            const i = {};
            let n = t;
            for (; n && n.length > 0; ) {
              const t = readUInt(n, 16, 0, e),
                r = readUInt(n, 16, 2, e),
                a = readUInt(n, 32, 4, e);
              if (0 === t) break;
              1 !== a || (3 !== r && 4 !== r) || (i[t] = readValue(n, e)),
                (n = nextTag(n));
            }
            return i;
          })(i, e),
          r = n[256],
          a = n[257];
        if (!r || !a) throw new TypeError('Invalid Tiff. Missing tags');
        return { height: a, width: r };
      }
    },
    webp: {
      validate(t) {
        const e = 'RIFF' === toUTF8String(t, 0, 4),
          i = 'WEBP' === toUTF8String(t, 8, 12),
          n = 'VP8' === toUTF8String(t, 12, 15);
        return e && i && n;
      },
      calculate(t) {
        const e = toUTF8String(t, 12, 16);
        if (((t = t.slice(20, 30)), 'VP8X' === e)) {
          const e = t[0];
          if (!(192 & e) && !(1 & e))
            return (function (t) {
              return {
                height: 1 + readUInt24LE(t, 7),
                width: 1 + readUInt24LE(t, 4)
              };
            })(t);
          throw new TypeError('Invalid WebP');
        }
        if ('VP8 ' === e && 47 !== t[0])
          return (function (t) {
            return {
              height: 16383 & readInt16LE(t, 8),
              width: 16383 & readInt16LE(t, 6)
            };
          })(t);
        const i = toHexString(t, 3, 6);
        if ('VP8L' === e && '9d012a' !== i)
          return (function (t) {
            return {
              height:
                1 + (((15 & t[4]) << 10) | (t[3] << 2) | ((192 & t[2]) >> 6)),
              width: 1 + (((63 & t[2]) << 8) | t[1])
            };
          })(t);
        throw new TypeError('Invalid WebP');
      }
    },
    avif: {
      validate: (t) => 'avif' === toUTF8String(t, 8, 12),
      calculate: (t) => {
        const e = findBox(t, 'meta'),
          i = findBox(t, 'iprp', e.offset + 12, e.offset + e.size),
          n = findBox(t, 'ipco', i.offset + 8, i.offset + i.size),
          r = findBox(t, 'ispe', n.offset + 8, n.offset + n.size);
        return {
          width: readUInt32BE(t, r.offset + 12),
          height: readUInt32BE(t, r.offset + 16)
        };
      }
    }
  },
  F = Object.keys(L),
  N = {
    56: 'psd',
    66: 'bmp',
    68: 'dds',
    71: 'gif',
    73: 'tiff',
    77: 'tiff',
    82: 'webp',
    105: 'icns',
    137: 'png',
    255: 'jpg'
  };
function imageMeta(t) {
  if (!(t instanceof Uint8Array))
    throw new TypeError('Input should be a Uint8Array');
  const e = (function (t) {
    const e = t[0];
    if (e in N) {
      const i = N[e];
      if (i && L[i].validate(t)) return i;
    }
    return F.find((e) => L[e].validate(t));
  })(t);
  if (void 0 !== e && e in L) {
    const i = L[e].calculate(t);
    if (void 0 !== i) return (i.type = e), i;
  }
  throw new TypeError(`Unsupported file type: ${e}`);
}
export { imageMeta };
//# sourceMappingURL=index.mjs.map
