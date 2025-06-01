import process from 'node:process'

import { defineEventHandler } from 'h3'

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_SITE_URL

/**
 * Generates XML sitemap for shop pages.
 * @param {H3Event} event - The event object containing request data
 * @returns {Promise<string>} XML sitemap string
 * @throws {Error} If page parameter is invalid or API fetch fails
 * @example
 * // GET /sitemap/shop/1.xml
 * // Returns XML sitemap for page 1 of shop items
 */
export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const page = Number.parseInt(params['page.xml'].replace('.xml', ''))

  const urls_ = await $fetch<string[]>(`/api/__sitemap__/shop?page=${page}`)

  const urls = urls_.map((slug: string) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }))

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url: { loc: string, lastmod: string }) => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
        </url>
      `,
        )
        .join('')}
    </urlset>
  `.trim()

  event.node.res.setHeader('Content-Type', 'application/xml')
  return xml
})
