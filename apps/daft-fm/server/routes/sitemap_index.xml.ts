// server/routes/sitemap_index.xml.ts
import { defineEventHandler } from 'h3';

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_URL;

export default defineEventHandler(async (event) => {
  const numSongPages = await $fetch('/api/__sitemap__/songs?count=true');
  const numArtistPages = await $fetch('/api/__sitemap__/artists?count=true');
  const numAlbumPages = await $fetch('/api/__sitemap__/albums?count=true');

  const songSitemaps = Array.from({ length: numSongPages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/songs/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const artistSitemaps = Array.from({ length: numArtistPages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/artists/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const albumSitemaps = Array.from({ length: numAlbumPages }, (_, i) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/sitemap/albums/${i + 1}.xml`,
    lastmod: new Date().toISOString()
  }));

  const sitemaps = songSitemaps.concat(artistSitemaps, albumSitemaps);

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
