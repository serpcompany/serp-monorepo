export default defineAppConfig({
  myLayer: {
    name: '@serp/ui',
  },
  site: {
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@serpmedia/twitter',
        icon: 'i-lucide-twitter',
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@serpmedia/facebook',
        icon: 'i-lucide-facebook',
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@serpmedia/linkedin',
        icon: 'i-lucide-linkedin',
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@serpmedia/youtube',
        icon: 'i-lucide-youtube',
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@serpmedia/github',
        icon: 'i-lucide-github',
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@serpmedia/instagram',
        icon: 'i-lucide-instagram',
      },
      {
        name: 'SoundCloud',
        href: 'https://serp.ly/@serpai/soundcloud',
        icon: 'i-lucide-external-link',
      },
    ],
    headerNavItems: [
      {
        label: 'Movies',
        children: [{ label: 'Movies', to: '/movies/' }],
      },
      {
        label: 'Shop',
        children: [{ label: 'Shop', to: '/shop/' }],
      },
    ],
    footerColumns: [
      {
        title: 'Links',
        id: 1,
        slug: '',
        items: [
          { text: 'Movies', slug: '/movies/' },
          { text: 'Shop', slug: '/shop/' },
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
