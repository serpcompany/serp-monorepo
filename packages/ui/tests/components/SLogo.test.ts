import { describe, expect, it } from 'vitest';
import SLogo from '../../components/SLogo.vue';
import ComponentRender from '../componentRender';

describe('sLogo', () => {
  it.each([['default rendering', { props: {} }]])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`SLogo ${desc}`, options, SLogo);
      expect(html).toMatchSnapshot();
    },
  );
});
