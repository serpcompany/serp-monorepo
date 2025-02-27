// server/routes/sitemap_index.xml.ts
import { defineEventHandler } from 'h3';

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_SITE_URL;

export default defineEventHandler(async (event) => {
  const numMoviePages = await $fetch('/api/__sitemap__/movies?count=true');
  const numShopPages = await $fetch('/api/__sitemap__/shop?count=true');

  const movieSitemaps = Array.from({ length: numMoviePages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/movies/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const shopSitemaps = Array.from({ length: numShopPages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/shop/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const sitemaps = movieSitemaps.concat(shopSitemaps);

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
