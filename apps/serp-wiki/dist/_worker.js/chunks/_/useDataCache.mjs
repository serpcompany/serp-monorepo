globalThis._importMeta_ = globalThis._importMeta_ || {
  url: 'file:///_entry.js',
  env: {}
};
import {
  u as e,
  b as a,
  l as t,
  e as r,
  f as o,
  h as s,
  i as n,
  j as i
} from '../nitro/nitro.mjs';
function useDataCache(c, d) {
  const u = { addToCache: (e) => Promise.resolve(), cacheTags: [] };
  globalThis._importMeta_.env.VITEST_SERVER;
  const { debug: h } = e().multiCache || {};
  try {
    const e = (() => {
        if (d) return d;
        if (!a())
          return void (
            h &&
            t.warn(
              'No H3Event provided while not in vue context when calling useDataCache for key: ' +
                c
            )
          );
        const e = r();
        return e ? e.event : void 0;
      })(),
      l = o(e);
    if (!l?.data) return Promise.resolve(u);
    const m = s(c, e);
    return l.data.getItem(m).then((e) => {
      const a = e,
        addToCache = (e, a = [], r) => {
          const o = { data: e, cacheTags: a };
          return (
            r && (o.expires = n(r)),
            h && t.info('Stored item in data cache: ' + m),
            l.data.setItem(m, o, { ttl: r })
          );
        };
      if (a) {
        if (!i(a))
          return (
            h && t.info('Returned item from data cache: ' + m),
            {
              addToCache: addToCache,
              value: a.data,
              cacheTags: a.cacheTags || [],
              expires: a.expires
            }
          );
        h &&
          t.info(
            'Skipped returning item from data cache because expired: ' + m
          );
      }
      return { addToCache: addToCache, cacheTags: [] };
    });
  } catch (e) {
    e instanceof Error && console.debug(e.message);
  }
  return Promise.resolve(u);
}
export { useDataCache as u };
//# sourceMappingURL=useDataCache.mjs.map
