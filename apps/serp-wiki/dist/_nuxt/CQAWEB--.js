import {
  d as w,
  k as j,
  c as a,
  o as s,
  f as t,
  F as i,
  h as c,
  j as n,
  t as o,
  e as u,
  g as d,
  l as m,
  _ as L,
  i as f,
  N
} from './D7-Dmtkj.js';
const B = { class: 'mt-20 py-10' },
  C = {
    'aria-label': 'Footer Main Navigation',
    class: 'mb-4 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5'
  },
  F = { class: 'text-md font-extrabold uppercase' },
  V = ['aria-label'],
  S = { class: 'pt-8' },
  T = { class: 'mb-8 flex items-center justify-between' },
  M = { class: 'flex items-center space-x-2' },
  $ = { class: 'text-2xl font-bold' },
  z = { class: 'mb-8 items-center justify-between sm:flex md:flex-row' },
  D = {
    class:
      'flex flex-col items-center justify-between overflow-x-scroll md:flex-row'
  },
  E = { 'aria-label': 'Social Media Links', class: 'mb-4 flex md:mb-0' },
  R = { class: 'sr-only' },
  q = { class: 'flex flex-col justify-between sm:items-center md:flex-row' },
  A = {
    'aria-label': 'Brand Navigation',
    class:
      'flex flex-col flex-wrap justify-center gap-4 text-sm sm:flex-row md:justify-end'
  },
  G = {
    'aria-label': 'Legal Navigation',
    class: 'flex flex-col justify-between text-sm sm:items-center md:flex-row'
  },
  H = { class: 'mb-2 font-semibold md:mb-0' },
  I = {
    class:
      'flex flex-col flex-wrap justify-center gap-4 sm:flex-row md:justify-end'
  },
  J = { class: 'mt-4 text-sm font-normal' },
  U = w({
    __name: 'SFooter',
    setup(K) {
      const l = j(),
        x = l.public.siteName,
        p = l.public.socialLinks,
        b = l.public.brandLinks,
        h = l.public.copyrightText,
        g = l.public.address,
        y = l.public.footerColumns,
        v = l.public.legalLinks;
      return (O, P) => {
        const r = L,
          k = N;
        return (
          s(),
          a('footer', B, [
            t('div', null, [
              t('nav', C, [
                (s(!0),
                a(
                  i,
                  null,
                  c(
                    n(y),
                    (e) => (
                      s(),
                      a('div', { key: e.id }, [
                        t('span', F, o(e.title), 1),
                        t(
                          'ul',
                          {
                            class: 'space-y-2 pt-4',
                            'aria-label': `${e.title} menu`
                          },
                          [
                            (s(!0),
                            a(
                              i,
                              null,
                              c(
                                e.items,
                                (_) => (
                                  s(),
                                  a('li', { key: _.slug }, [
                                    u(
                                      r,
                                      { to: _.slug, class: 'text-s' },
                                      {
                                        default: d(() => [m(o(_.text), 1)]),
                                        _: 2
                                      },
                                      1032,
                                      ['to']
                                    )
                                  ])
                                )
                              ),
                              128
                            ))
                          ],
                          8,
                          V
                        )
                      ])
                    )
                  ),
                  128
                ))
              ]),
              t('div', S, [
                t('div', T, [t('div', M, [t('span', $, o(n(x)), 1)])]),
                t('div', z, [
                  t('div', D, [
                    t('nav', E, [
                      (s(!0),
                      a(
                        i,
                        null,
                        c(
                          n(p),
                          (e) => (
                            s(),
                            f(
                              r,
                              {
                                key: e.name,
                                to: e.href,
                                'aria-label': e.name,
                                class: 'mr-6',
                                target: '_blank'
                              },
                              {
                                default: d(() => [
                                  u(
                                    k,
                                    {
                                      name: e.icon,
                                      class:
                                        'size-5 text-black dark:text-white',
                                      'aria-hidden': 'true'
                                    },
                                    null,
                                    8,
                                    ['name']
                                  ),
                                  t(
                                    'span',
                                    R,
                                    'Visit our ' + o(e.name) + ' page',
                                    1
                                  )
                                ]),
                                _: 2
                              },
                              1032,
                              ['to', 'aria-label']
                            )
                          )
                        ),
                        128
                      ))
                    ])
                  ]),
                  t('div', q, [
                    t('nav', A, [
                      (s(!0),
                      a(
                        i,
                        null,
                        c(
                          n(b),
                          (e) => (
                            s(),
                            f(
                              r,
                              { key: e.href, to: e.href, target: '_blank' },
                              { default: d(() => [m(o(e.name), 1)]), _: 2 },
                              1032,
                              ['to']
                            )
                          )
                        ),
                        128
                      ))
                    ])
                  ])
                ]),
                t('nav', G, [
                  t('div', H, o(n(h)), 1),
                  t('div', I, [
                    (s(!0),
                    a(
                      i,
                      null,
                      c(
                        n(v),
                        (e) => (
                          s(),
                          f(
                            r,
                            { key: e.text, to: e.slug },
                            { default: d(() => [m(o(e.text), 1)]), _: 2 },
                            1032,
                            ['to']
                          )
                        )
                      ),
                      128
                    ))
                  ])
                ]),
                t('address', J, o(n(g)), 1)
              ])
            ])
          ])
        );
      };
    }
  });
export { U as default };
