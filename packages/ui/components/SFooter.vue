<template>
  <footer class="mt-20 py-10">
    <div>
      <!-- footer row 1 -->
      <nav
           aria-label="Footer Main Navigation"
           class="mb-4 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <!-- Main footer columns -->
        <div v-for="column in footerColumns" :key="column.id">
          <span class="text-md font-extrabold uppercase">
            {{ column.title }}
          </span>
          <!-- Footer column links -->
          <ul class="space-y-2 pt-4" :aria-label="`${column.title} menu`">
            <li v-for="item in column.items" :key="item.slug">
              <NuxtLink :to="item.slug" class="text-s">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- footer row 2 -->
      <div class="pt-8">
        <!-- Logo -->
        <div class="mb-8 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold">{{ companyName }}</span>
          </div>
        </div>

        <div class="mb-8 items-center justify-between sm:flex md:flex-row">
          <div
               class="hide-scrollbar flex flex-col items-center justify-between sm:overflow-x-auto md:flex-row">
            <!-- Social Links -->
            <nav aria-label="Social Media Links" class="mb-4 flex md:mb-0">
              <NuxtLink
                        v-for="social in socialLinks"
                        :key="social.name"
                        :to="social.href"
                        :aria-label="social.name"
                        class="mr-6"
                        target="_blank">
                <u-icon
                        :name="social.icon"
                        class="size-5 text-black dark:text-white"
                        aria-hidden="true" />
                <span class="sr-only">Visit our {{ social.name }} page</span>
              </NuxtLink>
            </nav>
          </div>

          <div
               class="flex flex-col justify-between sm:items-center md:flex-row">
            <!-- Brand links -->
            <nav
                 aria-label="Brand Navigation"
                 class="flex flex-col flex-wrap justify-center gap-4 text-sm sm:flex-row md:justify-end">
              <NuxtLink
                        v-for="link in brandLinks"
                        :key="link.href"
                        :to="link.href"
                        target="_blank">
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- footer row 3 -->
        <!-- Legal links -->
        <nav
             aria-label="Legal Navigation"
             class="flex flex-col justify-between text-sm sm:items-center md:flex-row">
          <div class="mb-2 font-semibold md:mb-0">
            {{ copyrightText }}
          </div>
          <div
               class="flex flex-col flex-wrap justify-center gap-4 sm:flex-row md:justify-end">
            <NuxtLink
                      v-for="link in legalLinks"
                      :key="link.text"
                      :to="link.slug">{{ link.text }}</NuxtLink>
          </div>
        </nav>

        <!-- Address -->
        <address class="mt-4 text-sm font-normal">
          {{ address }}
        </address>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterColumn } from '@serp/types/types';

const config = useRuntimeConfig();
const companyName = config.public.siteName;
const socialLinks = config.public.socialLinks;
const brandLinks = config.public.brandLinks;
const copyrightText = config.public.copyrightText;
const address = config.public.address;
const footerColumns = config.public.footerColumns as FooterColumn[];
const legalLinks = config.public.legalLinks;
</script>

<style>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
