import { defineEventHandler } from 'h3'

const NUXT_PUBLIC_SITE_URL = process.env.NUXT_PUBLIC_URL

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const page = Number.parseInt(params['page.xml'].replace('.xml', ''))

  const urls_ = await $fetch(`/api/__sitemap__/artists?page=${page}`)

  const urls = urls_.map((slug: string) => ({
    loc: `${NUXT_PUBLIC_SITE_URL}/artists/${slug}`,
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
