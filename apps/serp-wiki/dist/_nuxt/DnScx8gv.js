import {
  d as l,
  k as a,
  b as r,
  c as u,
  f as i,
  e as o,
  g as n,
  _ as d,
  o as f,
  l as s
} from './D7-Dmtkj.js';
const m = { class: 'prose dark:prose-invert container my-20' },
  x = l({
    __name: 'index',
    setup(p) {
      return (
        a().public.domain,
        r({
          title: 'Affiliate Disclosure',
          meta: [
            {
              name: 'description',
              content:
                'Links to various resources on our website about legal related items.'
            }
          ]
        }),
        (_, e) => {
          const t = d;
          return (
            f(),
            u('div', m, [
              e[4] || (e[4] = i('h1', null, 'Legal Information', -1)),
              i('ul', null, [
                i('li', null, [
                  o(
                    t,
                    { to: '/legal/affiliate-disclosure/' },
                    {
                      default: n(
                        () => e[0] || (e[0] = [s('Affiliate Disclosure')])
                      ),
                      _: 1
                    }
                  ),
                  o(
                    t,
                    { to: '/legal/dmca/' },
                    {
                      default: n(
                        () => e[1] || (e[1] = [s('DMCA & IP Complaints')])
                      ),
                      _: 1
                    }
                  ),
                  o(
                    t,
                    { to: '/legal/privacy-policy/' },
                    {
                      default: n(() => e[2] || (e[2] = [s('Privacy Policy')])),
                      _: 1
                    }
                  ),
                  o(
                    t,
                    { to: '/legal/terms-conditions/' },
                    {
                      default: n(
                        () => e[3] || (e[3] = [s('Terms & Conditions')])
                      ),
                      _: 1
                    }
                  )
                ])
              ])
            ])
          );
        }
      );
    }
  });
export { x as default };
