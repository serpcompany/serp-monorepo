import { d as t, m as o } from '../nitro/nitro.mjs';
import 'node:buffer';
import 'node:process';
import 'node:events';
import 'node:net';
import 'node:timers';
import 'node:assert';
import 'node:util';
import 'node:url';
import 'node:stream';
import 'node:crypto';
import 'node:dns';
import 'node:string_decoder';
const e = o.env.NUXT_PUBLIC_SITE_URL,
  n = t(async (t) => {
    const o =
      `\n    <?xml version="1.0" encoding="UTF-8"?>\n    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n      ${[
        { loc: `${e}/`, lastmod: new Date().toISOString() },
        { loc: `${e}/legal/`, lastmod: new Date().toISOString() },
        {
          loc: `${e}/legal/privacy-policy/`,
          lastmod: new Date().toISOString()
        },
        {
          loc: `${e}/legal/terms-conditions/`,
          lastmod: new Date().toISOString()
        },
        {
          loc: `${e}/legal/affiliate-disclosure/`,
          lastmod: new Date().toISOString()
        },
        { loc: `${e}/legal/dmca/`, lastmod: new Date().toISOString() },
        { loc: `${e}/posts/`, lastmod: new Date().toISOString() }
      ]
        .map(
          (t) =>
            `\n        <url>\n          <loc>${t.loc}</loc>\n          <lastmod>${t.lastmod}</lastmod>\n        </url>\n      `
        )
        .join('')}\n    </urlset>\n  `.trim();
    return t.node.res.setHeader('Content-Type', 'application/xml'), o;
  });
export { n as default };
//# sourceMappingURL=sitemap_core.xml.mjs.map
