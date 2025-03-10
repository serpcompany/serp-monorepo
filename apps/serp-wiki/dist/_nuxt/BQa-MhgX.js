import {
  d as s,
  k as n,
  b as i,
  c as l,
  f as o,
  t as a,
  j as r,
  o as p
} from './D7-Dmtkj.js';
const c = { class: 'prose dark:prose-invert container my-20' },
  y = s({
    __name: 'dmca',
    setup(m) {
      const e = n().public.domain;
      return (
        i({
          title: 'DMCA',
          meta: [
            {
              name: 'description',
              content:
                'Steps to report copyright infringement under our DMCA policy.'
            }
          ]
        }),
        (u, t) => (
          p(),
          l('div', c, [
            t[0] || (t[0] = o('h1', null, 'DMCA & IP Complaints', -1)),
            o(
              'p',
              null,
              ' We take intellectual property very seriously. If you would like to file a complaint regarding the DMCA or other intellectual property matters, please email: dmca[@]' +
                a(r(e)) +
                ' and/or ipcomplaints[@]' +
                a(r(e)) +
                ' Please make sure you remove the brackets [ ] and spaces in the above provided emails. We format it like this to reduce spam from bots, spiders, and scrapers. Thank you. ',
              1
            )
          ])
        )
      );
    }
  });
export { y as default };
