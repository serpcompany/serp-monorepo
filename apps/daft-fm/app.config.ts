export default defineAppConfig({
  myLayer: {
    name: '@serp/ui',
  },
  adsense: {
    publisherId: 'ca-pub-2343633734899216',
  },
  site: {
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@daftfm/twitter',
        icon: 'i-lucide-twitter',
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@daftfm/facebook',
        icon: 'i-lucide-facebook',
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@daftfm/linkedin',
        icon: 'i-lucide-linkedin',
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@daftfm/youtube',
        icon: 'i-lucide-youtube',
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@daftfm/github',
        icon: 'i-lucide-github',
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@daftfm/instagram',
        icon: 'i-lucide-instagram',
      },
      {
        name: 'SoundCloud',
        href: 'https://serp.ly/@daftfm/soundcloud',
        icon: 'i-lucide-external-link',
      },
    ],
    headerNavItems: [
      {
        label: 'Music',
        children: [
          { label: 'Songs', to: '/songs/' },
          { label: 'Albums', to: '/albums/' },
          { label: 'Artists', to: '/artists/' },
        ],
      },
    ],
    footerColumns: [
      {
        title: 'Music',
        id: 1,
        slug: '',
        items: [
          { text: 'Songs', slug: '/songs/' },
          { text: 'Artists', slug: '/artists/' },
          { text: 'Albums', slug: '/albums/' },
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
});
