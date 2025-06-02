export default defineAppConfig({
  myLayer: {
    name: '@serp/ui',
  },
  site: {
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@boxingundefeated/twitter',
        icon: 'i-lucide-twitter',
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@boxingundefeated/facebook',
        icon: 'i-lucide-facebook',
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@boxingundefeated/linkedin',
        icon: 'i-lucide-linkedin',
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@boxingundefeated/youtube',
        icon: 'i-lucide-youtube',
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@boxingundefeatedai/github',
        icon: 'i-lucide-github',
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@boxingundefeated/instagram',
        icon: 'i-lucide-instagram',
      },
      {
        name: 'SoundCloud',
        href: 'https://serp.ly/@boxingundefeated/',
        icon: 'i-lucide-external-link',
      },
    ],
    headerNavItems: [
      {
        label: 'Boxers',
        children: [{ label: 'Boxers', to: '/boxers/' }],
      },
      {
        label: 'Weight Classes',
        children: [{ label: 'Weight Classes', to: '/weight-classes/' }],
      },
    ],
    footerColumns: [
      {
        title: 'Links',
        id: 1,
        slug: '',
        items: [
          { text: 'Boxers', slug: '/boxers/' },
          { text: 'Weight Classes', slug: '/weight-classes/' },
        ],
      },
    ],
    legalLinks: [
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' },
    ],
  },
})
