// server/routes/sitemap_index.xml.ts
import { defineEventHandler } from 'h3';

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_SITE_URL;

export default defineEventHandler(async (event) => {
  const numPages = await $fetch('/api/__sitemap__/posts?count=true');

  const sitemaps = Array.from({ length: numPages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/posts/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${NUXT_PUBLIC_SITE_URL}/sitemap_core.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      ${sitemaps
        .map(
          (sitemap) => `
        <sitemap>
          <loc>${sitemap.loc}</loc>
          <lastmod>${sitemap.lastmod}</lastmod>
        </sitemap>
      `
        )
        .join('')}
    </sitemapindex>
  `.trim();

  event.node.res.setHeader('Content-Type', 'application/xml');
  return xml;
});
