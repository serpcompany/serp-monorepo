import { describe, expect, it } from 'vitest'
import CompanyArticleSection from '../../components/CompanyArticleSection.vue'
import ComponentRender from '../componentRender'

describe('companyArticleSection Snapshot', () => {
  it.each([
    [
      'with valid article content',
      {
        props: {
          article:
            '<h1 id="article-title">Breaking News</h1><p>This is an amazing article content!</p>',
        },
      },
    ],
    ['with empty article', { props: { article: '' } }],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `CompanyArticleSection ${desc}`,
        options,
        CompanyArticleSection,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
