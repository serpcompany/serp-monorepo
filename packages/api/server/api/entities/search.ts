import type { EntitySearchResult } from '@serp/types/types'
import { getDb } from '@serp/db/server/database'
import { entity } from '@serp/db/server/database/schema'

import { and, eq, or, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const {
      page = 1,
      limit = 100,
      categorySlug,
      topicSlug,
      module,
      searchText,
      filters = '',
    } = getQuery(event)
    if (!searchText) {
      throw createError({
        statusCode: 400,
        message: 'Search text is required.',
      })
    }

    const pageNumber = Number(page)
    const limitNumber = Math.min(Number(limit), 100)
    if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
      throw createError({
        statusCode: 400,
        message: 'Page must be a positive integer.',
      })
    }
    if (
      isNaN(limitNumber)
      || limitNumber < 1
      || !Number.isInteger(limitNumber)
    ) {
      throw createError({
        statusCode: 400,
        message: 'Limit must be a positive integer.',
      })
    }

    const offset = (pageNumber - 1) * limitNumber

    // @todo - improve the typesafety of this after implementing zod
    const modules = module
      .split(',')
      .map((mod: string) => mod.trim())
      .filter(Boolean)

    const parseFilters = (raw: string) =>
      raw
        .split(',')
        .map((p) => {
          const [k, ...rest] = p.split(':')
          const v = rest.join(':')
          return k && v ? ([k.trim(), v.trim()] as [string, string]) : null
        })
        .filter(Boolean) as [string, string][]

    const parsedFilters = parseFilters(filters)
    for (const [k] of parsedFilters) {
      if (!/^[\w.]+$/.test(k)) {
        throw createError({ statusCode: 400, message: 'Bad filter key' })
      }
    }

    const jsonbPath = (col: typeof entity.data, path: string) => {
      const parts = path.split('.').map(p => sql.raw(`'${p}'`))
      return sql`jsonb_extract_path_text(${col}, ${sql.join(parts, sql.raw(', '))})`
    }

    const dynamicConditions = parsedFilters.map(
      ([k, v]) => sql`${jsonbPath(entity.data, k)} = ${v}`,
    )

    const whereConditions = [
      modules.length
        ? or(...modules.map((mod: string) => eq(entity.module, mod)))
        : sql`true`,
    ]

    if (categorySlug) {
      whereConditions.push(
        sql`jsonb_path_exists(${entity.categories}, '$[*] ? (@.slug == $slug)'::jsonpath, jsonb_build_object('slug', ${categorySlug}::text))`,
      )
    }
    if (topicSlug) {
      whereConditions.push(
        sql`jsonb_path_exists(${entity.topics}, '$[*] ? (@.slug == $slug)'::jsonpath, jsonb_build_object('slug', ${topicSlug}::text))`,
      )
    }

    whereConditions.push(...dynamicConditions)

    const results = await getDb().execute(sql`
      with fuzzy as (
        select id, similarity(search_text, ${searchText}) as sim_score,
              row_number() over (order by similarity(search_text, ${searchText}) desc) as rank_ix
        from ${entity}
        where search_text % ${searchText} and ${and(...whereConditions)}
        limit least(${limitNumber}, 30)
      ),
      full_text as (
        select id, ts_rank_cd(to_tsvector('english', search_text), websearch_to_tsquery(${searchText})) as rank_score,
              row_number() over (order by ts_rank_cd(to_tsvector('english', search_text), websearch_to_tsquery(${searchText})) desc) as rank_ix
        from ${entity}
        where to_tsvector('english', search_text) @@ websearch_to_tsquery(${searchText}) and ${and(...whereConditions)}
        limit least(${limitNumber}, 30)
      )
      select d.id, d.name, d.slug
      from fuzzy
      full outer join full_text on fuzzy.id = full_text.id
      join ${entity} d on coalesce(fuzzy.id, full_text.id) = d.id
      order by coalesce(1.0 / (60 + fuzzy.rank_ix), 0.0) * 0.5 +
              coalesce(1.0 / (60 + full_text.rank_ix), 0.0) * 0.5 desc
      limit ${limitNumber}
      offset ${offset};
    `)

    return results.map(r => r as EntitySearchResult)
  }
  catch (error) {
    console.error('Error in entity search:', error)
    throw createError({ statusCode: 500, message: 'Internal Server Error' })
  }
})
