import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import CompanyCardList from '../../components/CompanyCardList.vue';
import ComponentRender from '../componentRender';

// Minimal stub for the external CompanyCard dependency
const CompanyCardStub = defineComponent({
  props: [
    'company',
    'showReadMore',
    'showProsAndCons',
    'showFeatures',
    'showExpandedContent'
  ],
  template: '<div class="company-card-stub">{{ company.name }}</div>'
});

describe('CompanyCardList Snapshot', () => {
  const scenarios = [
    [
      'with an empty companies list',
      {
        props: { items: [] },
        global: { stubs: { CompanyCard: CompanyCardStub } }
      }
    ],
    [
      'with a single company and default props',
      {
        props: { items: [{ id: 1, name: 'Test Company' }] },
        global: { stubs: { CompanyCard: CompanyCardStub } }
      }
    ],
    [
      'with multiple companies and all toggles enabled',
      {
        props: {
          items: [
            { id: 1, name: 'Company One' },
            { id: 2, name: 'Company Two' }
          ],
          showReadMore: true,
          showProsAndCons: true,
          showFeatures: true,
          showExpandedContent: true
        },
        global: { stubs: { CompanyCard: CompanyCardStub } }
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, options: { props: unknown; global?: unknown }) => {
      const html = await ComponentRender(
        `CompanyCardList ${desc}`,
        options,
        CompanyCardList
      );
      expect(html).toMatchSnapshot();
    }
  );
});
