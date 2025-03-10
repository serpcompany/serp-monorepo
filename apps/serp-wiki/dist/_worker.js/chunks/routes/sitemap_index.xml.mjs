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
    const o = await $fetch('/api/__sitemap__/posts?count=true'),
      n = Array.from({ length: o }, (t, o) => ({
        loc: `${e}/sitemap/posts/${o + 1}.xml`,
        lastmod: new Date().toISOString()
      })),
      m =
        `\n    <?xml version="1.0" encoding="UTF-8"?>\n    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n        <sitemap>\n          <loc>${e}/sitemap_core.xml</loc>\n          <lastmod>${new Date().toISOString()}</lastmod>\n        </sitemap>\n      ${n.map((t) => `\n        <sitemap>\n          <loc>${t.loc}</loc>\n          <lastmod>${t.lastmod}</lastmod>\n        </sitemap>\n      `).join('')}\n    </sitemapindex>\n  `.trim();
    return t.node.res.setHeader('Content-Type', 'application/xml'), m;
  });
export { n as default };
//# sourceMappingURL=sitemap_index.xml.mjs.map
