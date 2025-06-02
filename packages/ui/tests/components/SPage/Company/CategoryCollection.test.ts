import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import CategoryCollection from '../../../../components/SPage/Company/CategoryCollection.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

mockNuxtImport('useSeoMeta', () => () => {});

let companiesData_: unknown = {};
let categoriesData_: unknown = [];

mockNuxtImport('useCompanies', () => () => Promise.resolve(companiesData_));
mockNuxtImport(
  'useCompanyCategories',
  () => () => Promise.resolve(categoriesData_),
);

describe('sPageCompanyCategoryCollection Snapshot', () => {
  const scenarios: [
    string,
    { companiesData: unknown; categoriesData: unknown },
  ][] = [
    [
      'with complete data',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' },
          ],
          pagination: { totalItems: 100 },
          categoryArticle: {
            title: 'Industry Insights',
            content: 'Article content',
          },
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }],
      },
    ],
    [
      'without category article',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' },
          ],
          pagination: { totalItems: 100 },
          categoryArticle: null,
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }],
      },
    ],
    [
      'with empty companies',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [],
          pagination: { totalItems: 0 },
          categoryArticle: null,
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }],
      },
    ],
    [
      'with no categories',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' },
          ],
          pagination: { totalItems: 100 },
          categoryArticle: {
            title: 'Industry Insights',
            content: 'Article content',
          },
        },
        categoriesData: [],
      },
    ],
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { companiesData, categoriesData }) => {
      companiesData_ = companiesData;
      categoriesData_ = categoriesData;

      const html = await ComponentRender(
        `SPageCompanyCategoryCollection ${desc}`,
        {},
        CategoryCollection,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
