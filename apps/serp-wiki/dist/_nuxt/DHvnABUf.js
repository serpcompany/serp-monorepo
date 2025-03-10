const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['./DrOCSzy_.js', './D7-Dmtkj.js'])
) => i.map((i) => d[i]);
import {
  d,
  n as g,
  c as r,
  o,
  e as f,
  H as a,
  i as p,
  g as y,
  f as u,
  a1 as h,
  j as c,
  t as l,
  _ as b,
  M as k,
  a2 as C
} from './D7-Dmtkj.js';
import { _ as $, u as B } from './BDzRyOtf.js';
const S = h(() =>
    C(
      () => import('./DrOCSzy_.js'),
      __vite__mapDeps([0, 1]),
      import.meta.url
    ).then((t) => t.default || t)
  ),
  v = { class: 'mb-2 text-xl font-medium hover:underline' },
  A = { key: 0, class: 'mb-2 italic' },
  P = { key: 0 },
  V = { key: 1, class: 'mb-8' },
  I = d({
    __name: 'PostCard',
    props: {
      post: {},
      baseSlug: { default: 'posts/' },
      articleClass: { default: 'py-16' }
    },
    setup(t) {
      const s = t,
        n = g(
          () => (s.post.module === 'Glossary' && s.post.keyword) || s.post.title
        );
      return (e, w) => {
        const i = S,
          m = b,
          _ = $;
        return (
          o(),
          r(
            'article',
            { class: k(e.articleClass) },
            [
              f(
                m,
                { to: `/${e.baseSlug}${e.post.slug}/` },
                {
                  default: y(() => [
                    e.post.featuredImage
                      ? (o(),
                        p(
                          i,
                          {
                            key: 0,
                            src: e.post.featuredImage,
                            alt: c(n),
                            class: 'mb-6 h-64 w-full object-cover'
                          },
                          null,
                          8,
                          ['src', 'alt']
                        ))
                      : a('', !0),
                    u('h2', v, l(c(n)), 1)
                  ]),
                  _: 1
                },
                8,
                ['to']
              ),
              e.post.author
                ? (o(),
                  r('p', A, [
                    u('span', null, 'By ' + l(e.post.author), 1),
                    e.post.createdAt
                      ? (o(), r('span', P, ' | ' + l(e.post.createdAt), 1))
                      : a('', !0)
                  ]))
                : a('', !0),
              e.post.excerpt
                ? (o(), r('p', V, l(e.post.excerpt), 1))
                : a('', !0),
              e.post.categories && e.post.categories.length
                ? (o(),
                  p(
                    _,
                    {
                      key: 2,
                      'base-slug': `${e.baseSlug}category`,
                      items: e.post.categories
                    },
                    null,
                    8,
                    ['base-slug', 'items']
                  ))
                : a('', !0)
            ],
            2
          )
        );
      };
    }
  }),
  N = async (t = 1, s = 50, n = '', e = '') =>
    B(`/posts?page=${t}&limit=${s}&categorySlug=${n}&module=${e}`);
export { I as _, N as u };
