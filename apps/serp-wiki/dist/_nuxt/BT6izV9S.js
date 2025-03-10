import {
  d as c,
  c as o,
  o as l,
  f as e,
  H as a,
  t as r,
  F as f,
  e as d,
  S as m,
  g as i,
  l as u
} from './D7-Dmtkj.js';
const _ = { class: 'py-20' },
  p = { class: 'items-center' },
  x = {
    class: 'flex flex-col items-center text-center lg:items-start lg:text-left'
  },
  h = { class: 'my-4 text-2xl font-bold text-pretty lg:text-5xl' },
  y = { key: 0, class: 'text-muted-foreground mb-8 max-w-2xl lg:text-xl' },
  g = {
    class:
      'flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'
  },
  w = { key: 0 },
  b = c({
    __name: 'SHero',
    props: {
      headline: { default: '' },
      subheadline: { default: void 0 },
      showSearchBar: { type: Boolean, default: !0 },
      showButtons: { type: Boolean, default: !0 }
    },
    setup(B) {
      return (t, s) => {
        const n = m;
        return (
          l(),
          o('div', null, [
            e('div', _, [
              e('div', null, [
                e('div', p, [
                  e('div', x, [
                    e('h1', h, r(t.headline), 1),
                    t.subheadline
                      ? (l(), o('p', y, r(t.subheadline), 1))
                      : a('', !0),
                    e('div', g, [
                      t.showSearchBar ? (l(), o('div', w)) : a('', !0),
                      t.showButtons
                        ? (l(),
                          o(
                            f,
                            { key: 1 },
                            [
                              d(
                                n,
                                {
                                  label: 'Primary Button',
                                  class:
                                    'w-full cursor-pointer rounded-none text-lg sm:w-auto'
                                },
                                {
                                  default: i(
                                    () => s[0] || (s[0] = [u('Primary Button')])
                                  ),
                                  _: 1
                                }
                              ),
                              d(
                                n,
                                {
                                  variant: 'outline',
                                  class:
                                    'w-full cursor-pointer rounded-none text-lg sm:w-auto'
                                },
                                {
                                  default: i(
                                    () =>
                                      s[1] || (s[1] = [u(' Buying Advice ')])
                                  ),
                                  _: 1
                                }
                              )
                            ],
                            64
                          ))
                        : a('', !0)
                    ])
                  ])
                ])
              ])
            ])
          ])
        );
      };
    }
  });
export { b as _ };
