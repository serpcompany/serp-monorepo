<template>
  <footer class="mt-10 py-10">
    <div class="border-top container mx-auto px-4">
      <!-- Main Footer Navigation -->
      <nav
        aria-label="Footer Main Navigation"
        class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5"
      >
        <div v-for="column in footerColumns" :key="column.slug">
          <span class="text-md font-extrabold uppercase">
            {{ column.title }}
          </span>
          <ul class="space-y-2 pt-4" :aria-label="`${column.title} menu`">
            <li v-for="item in column.items" :key="item.slug">
              <nuxt-link :to="item.slug" class="text-s">
                {{ item.text }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Bottom Footer -->
      <div class="border-gray-200 pt-8">
        <!-- Logo -->
        <div class="mb-8 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold">{{ companyName }}</span>
          </div>
        </div>

        <div
          class="mb-8 flex flex-col items-center justify-between md:flex-row"
        >
          <!-- Social Links -->
          <nav aria-label="Social Media Links" class="mb-4 flex md:mb-0">
            <nuxt-link
              v-for="social in socialLinks"
              :key="social.name"
              :to="social.link"
              :aria-label="social.name"
              class="mr-6"
              target="_blank"
            >
              <u-icon
                :name="social.icon"
                class="size-5 text-white"
                aria-hidden="true"
              />
              <span class="sr-only">Visit our {{ social.name }} page</span>
            </nuxt-link>
          </nav>

          <!-- Brand links -->
          <nav
            aria-label="Brand Navigation"
            class="flex flex-wrap justify-center gap-4 text-sm md:justify-end"
          >
            <nuxt-link
              v-for="link in brandLinks"
              :key="link.slug"
              :to="link.slug"
            >
              {{ link.name }}
            </nuxt-link>
          </nav>
        </div>

        <!-- Legal links -->
        <nav
          aria-label="Legal Navigation"
          class="flex flex-col items-center justify-between text-sm md:flex-row"
        >
          <div class="mb-2 md:mb-0">
            {{ copyrightText }}
          </div>
          <div class="flex flex-wrap justify-center gap-4 md:justify-end">
            <nuxt-link
              v-for="link in legalLinks"
              :key="link.text"
              :href="link.url"
              >{{ link.text }}</nuxt-link
            >
          </div>
        </nav>

        <!-- Address -->
        <address class="mt-2 text-sm">
          {{ address }}
        </address>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const companyName = config.public.siteName;
const socialLinks = config.public.socialLinks;
const brandLinks = config.public.brandLinks;
const copyrightText = config.public.copyrightText;
const address = config.public.address;

const legalLinks = [
  { text: 'Privacy', url: '/legal/privacy-policy' },
  { text: 'Terms', url: '/legal/terms-conditions' },
  { text: 'Affiliate Disclosure', url: '/legal/affiliate-disclosure' },
  { text: 'DMCA', url: '/legal/dmca' }
];

const footerColumns = [
  {
    title: 'Music',
    slug: '',
    items: [
      { text: 'Artists', slug: '/artists' },
      { text: 'Albums', slug: '/albums' },
      { text: 'Songs', slug: '/songs' }
    ]
  }
  // {
  //   title: 'Placeholder',
  //   slug: 'Placeholder',
  //   items: [{ text: 'Placeholder', slug: '#' }]
  // },
  // {
  //   title: 'Placeholder',
  //   slug: '#',
  //   items: [{ text: 'Placeholder', slug: '#' }]
  // },
  // {
  //   title: 'Placeholder',
  //   slug: '#',
  //   items: [
  //     { text: 'Placeholder', slug: '#' },
  //     { text: 'Placeholder', slug: '#' }
  //   ]
  // },
  // {
  //   title: 'Placeholder',
  //   slug: '#',
  //   items: [{ text: 'Placeholder', slug: '#' }]
  // }
];
</script>
