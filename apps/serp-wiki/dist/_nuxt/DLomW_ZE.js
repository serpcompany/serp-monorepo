import { d as a, c as e, o as s, f as n, H as c, t as o } from './D7-Dmtkj.js';
const r = { class: 'py-20' },
  i = { class: 'md:text-center' },
  l = {
    key: 0,
    'data-testid': 'subtitle',
    class: 'sm:text-md text-left text-base md:text-center'
  },
  _ = a({
    __name: 'HeroOne',
    props: { title: {}, subtitle: {} },
    setup(d) {
      return (t, m) => (
        s(),
        e('section', r, [
          n('h1', i, o(t.title), 1),
          t.subtitle ? (s(), e('p', l, o(t.subtitle), 1)) : c('', !0)
        ])
      );
    }
  });
export { _ };
