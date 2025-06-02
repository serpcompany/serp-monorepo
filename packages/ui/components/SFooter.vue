<script setup lang="ts">
  import type { FooterColumn } from '@serp/types/types';

  const config = useRuntimeConfig();
  const appConfig = useAppConfig();

  const companyName = config.public.siteName;

  const socialLinks =
    appConfig.site?.socialLinks ||
    (config.public.socialLinks as Array<{
      name: string;
      href: string;
      icon: string;
    }>);

  const legalLinks =
    appConfig.site?.legalLinks ||
    (config.public.legalLinks as Array<{
      text: string;
      slug: string;
    }>);

  const footerColumns =
    appConfig.site?.footerColumns ||
    (config.public.footerColumns as FooterColumn[]);

  const footerColumnsData = computed(() => {
    const columns = footerColumns;
    return columns.map((column) => ({
      label: column.title,
      children: column.items.map((item) => ({
        label: item.text || item.name,
        to: item.slug || item.href,
      })),
    }));
  });
</script>

<template>
  <UFooter
    class="footer-wrapper bg-primary-800 dark:bg-primary-950 mt-20 w-full"
    :ui="{
      top: 'py-0 lg:py-0',
      center: 'py-0 lg:py-0',
      bottom: 'py-0 lg:py-0',
    }"
  >
    <!-- Top section with columns - full width with background -->
    <template #top>
      <div class="w-full py-30">
        <div class="mx-auto max-w-[1248px] px-4">
          <UFooterColumns
            :columns="footerColumnsData"
            :ui="{
              link: 'text-primary-100  hover:text-primary-200 dark:text-primary-100 dark:hover:text-primary-200',
              label: 'text-primary-100 text-xl dark:text-primary-100',
            }"
          >
            <!-- Left section with newsletter -->
            <template #left>
              <div class="flex flex-col items-start space-x-2">
                <span
                  class="text-primary-100 dark:text-primary-100 pb-4 text-4xl font-bold"
                >
                  {{ companyName }}
                </span>
                <p class="text-primary-100 dark:text-primary-100 font-bold">
                  Subscribe to the newsletter.
                </p>
                <p class="text-primary-100 dark:text-primary-100">
                  Join ~trillions of informed readers.
                </p>
                <NewsletterSignup />
              </div>
            </template>
          </UFooterColumns>
        </div>
      </div>
    </template>

    <!-- Bottom section with full-width colored ribbon -->
    <template #bottom>
      <div
        class="mx-auto flex max-w-[1248px] flex-col items-start justify-between px-4 pb-8 md:flex-row md:items-center"
      >
        <!-- <div class="flex flex-row items-center md:mb-0"> -->
        <!-- Social Links -->
        <div aria-label="Social Media Links" class="mb-8 flex md:mb-0">
          <NuxtLink
            v-for="social in socialLinks"
            :key="social.name"
            :to="social.href"
            :aria-label="social.name"
            class="mr-6"
            target="_blank"
          >
            <UIcon
              :name="social.icon"
              class="text-primary-100 dark:text-primary-100 size-5"
              aria-hidden="true"
            />
            <span class="sr-only">Visit our {{ social.name }} page</span>
          </NuxtLink>
        </div>
        <!-- </div> -->
        <div
          aria-label="Legal Navigation"
          class="flex flex-col text-sm sm:items-center md:flex-row"
        >
          <div
            class="flex flex-col flex-wrap justify-center gap-4 sm:flex-row md:justify-end"
          >
            <NuxtLink
              v-for="link in legalLinks"
              :key="link.text"
              :to="link.slug"
              class="text-primary-100 dark:text-primary-100"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </UFooter>
</template>
