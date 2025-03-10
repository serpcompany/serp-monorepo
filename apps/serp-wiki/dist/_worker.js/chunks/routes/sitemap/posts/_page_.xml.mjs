import { d as o, k as t, m as e } from '../../../nitro/nitro.mjs';
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
const n = e.env.NUXT_PUBLIC_SITE_URL,
  r = o(async (o) => {
    const e = t(o),
      r = parseInt(e['page.xml'].replace('.xml', '')),
      s =
        `\n    <?xml version="1.0" encoding="UTF-8"?>\n    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n      ${(
          await $fetch(`/api/__sitemap__/posts?page=${r}`)
        )
          .map((o) => ({ loc: `${n}${o}`, lastmod: new Date().toISOString() }))
          .map(
            (o) =>
              `\n        <url>\n          <loc>${o.loc}</loc>\n          <lastmod>${o.lastmod}</lastmod>\n        </url>\n      `
          )
          .join('')}\n    </urlset>\n  `.trim();
    return o.node.res.setHeader('Content-Type', 'application/xml'), s;
  });
export { r as default };
//# sourceMappingURL=_page_.xml.mjs.map
