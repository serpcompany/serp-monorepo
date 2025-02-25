// server/routes/sitemap_core.xml.ts
import { defineEventHandler } from 'h3';

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_SITE_URL;

export default defineEventHandler(async (event) => {
  const urls = [
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/legal`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/legal/privacy-policy`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/legal/terms-conditions`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/legal/affiliate-disclosure`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/legal/dmca`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/shop`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${NUXT_PUBLIC_SITE_URL}/movies`,
      lastmod: new Date().toISOString()
    }
  ];

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
        </url>
      `
        )
        .join('')}
    </urlset>
  `.trim();

  event.node.res.setHeader('Content-Type', 'application/xml');
  return xml;
});
