import { _ as g } from './BT6izV9S.js';
import {
  d as b,
  u as x,
  a as k,
  r as i,
  w,
  b as y,
  c as l,
  o as t,
  e as u,
  f as e,
  g as v,
  _ as B,
  F as N,
  h as C,
  i as P,
  j as R
} from './D7-Dmtkj.js';
import { _ as q, u as E } from './DHvnABUf.js';
import './BDzRyOtf.js';
const F = { class: 'mb-16' },
  H = { class: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4' },
  L = b({
    __name: 'index',
    async setup(S) {
      let s, o;
      const _ = x(),
        a = k(),
        m = i(Number(a.query.page) || 1),
        p = i(Number(a.query.limit) || 50),
        n = (([s, o] = w(() => E(m.value, p.value))), (s = await s), o(), s);
      return (
        n || _.push('/404'),
        y({ title: 'Home' }),
        (V, r) => {
          const d = g,
            f = B,
            h = q;
          return (
            t(),
            l('div', null, [
              u(d, {
                headline: 'SERP Wiki',
                subheadline: 'Stuff & More.',
                'show-search-bar': !1,
                'show-buttons': !1
              }),
              e('main', null, [
                e('div', F, [
                  u(
                    f,
                    { to: '/posts' },
                    {
                      default: v(
                        () =>
                          r[0] ||
                          (r[0] = [
                            e('h2', { class: 'pb-16 text-3xl' }, 'Posts', -1)
                          ])
                      ),
                      _: 1
                    }
                  ),
                  e('div', H, [
                    (t(!0),
                    l(
                      N,
                      null,
                      C(
                        R(n).posts,
                        (c) => (
                          t(),
                          P(
                            h,
                            {
                              key: c.id,
                              post: c,
                              'base-slug': 'posts/',
                              'article-class': 'py-2'
                            },
                            null,
                            8,
                            ['post']
                          )
                        )
                      ),
                      128
                    ))
                  ])
                ])
              ])
            ])
          );
        }
      );
    }
  });
export { L as default };
