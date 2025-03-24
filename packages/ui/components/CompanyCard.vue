<template>
  <div
    :class="[
      'mx-auto max-w-5xl rounded-lg',
      company.featured
        ? 'relative overflow-hidden border border-gray-200 bg-gradient-to-b from-blue-50/50 to-transparent px-6 py-10 dark:border-blue-500/40 dark:from-blue-900/30 dark:to-gray-900/60 dark:shadow-[0_0_15px_rgba(30,64,175,0.15)]'
        : 'border border-gray-300 px-5 py-4 dark:border-gray-700'
    ]"
  >
    <!-- Featured accent border -->
    <div
      v-if="company.featured"
      class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
      aria-hidden="true"
    ></div>

    <!-- card content -->
    <div class="flex items-start">
      <!-- company image -->
      <div
        v-if="companyMainImage"
        class="mr-5 flex-shrink-0"
        :class="{ 'mb-4 sm:mb-0': company.featured }"
      >
        <nuxt-link :to="`/${baseSlug}${company.slug}/reviews/`">
          <div
            :class="[
              'overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
              company.featured
                ? 'h-36 w-36 ring-1 ring-blue-100 dark:ring-blue-500/50'
                : 'h-28 w-28'
            ]"
          >
            <lazy-nuxt-img
              :src="companyMainImage"
              :alt="company.name"
              class="h-full w-full object-contain"
            />
          </div>
        </nuxt-link>
      </div>

      <!-- company content -->
      <div class="flex-grow">
        <div class="flex flex-col justify-between sm:flex-row">
          <div class="sm:pr-8 sm:max-w-[calc(100%-180px)]">
            <!-- company name and badge -->
            <div class="flex items-center">
              <nuxt-link
                class="flex"
                :to="`/${baseSlug}${company.slug}/reviews/`"
              >
                <h2
                  :class="[
                    'font-semibold',
                    company.featured
                      ? 'mb-1 text-2xl text-blue-700 dark:text-blue-300'
                      : 'text-xl dark:text-gray-300'
                  ]"
                >
                  {{ company.name }}
                </h2>
              </nuxt-link>
              <u-badge
                v-if="company.featured"
                :avatar="{
                  src: 'https://github.com/serpcompany.png'
                }"
                size="md"
                color="info"
                variant="filled"
                class="ml-4"
              >
                Featured
              </u-badge>
            </div>

            <!-- company oneliner -->
            <p
              :class="[
                'text-gray-600 dark:text-gray-300',
                company.featured
                  ? 'mt-3 text-base leading-relaxed dark:text-gray-200'
                  : 'mt-2 line-clamp-2'
              ]"
            >
              {{ company.oneLiner }}
            </p>

            <!-- show excerpt only for featured cards -->
            <p
              v-if="company.featured && company.excerpt"
              class="mt-5 mb-1 line-clamp-3 text-gray-600 dark:text-gray-300"
            >
              {{ company.excerpt }}
            </p>

            <!-- rating display -->
            <div
              v-if="company.rating"
              :class="{ 'mt-3': !company.featured, 'mt-6': company.featured }"
            >
              <span class="text-lg font-medium">{{ company.rating }}/5</span>
            </div>
          </div>

          <!-- right side buttons -->
          <div
            :class="[
              'flex min-w-[140px] flex-col space-y-2',
              company.featured ? 'mt-5 sm:mt-0 sm:ml-4' : 'mt-4 sm:mt-0'
            ]"
          >
            <!-- view website button -->
            <a
              :href="company.serplyLink"
              target="_blank"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Website
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <!-- upvote button -->
            <UpvoteButton
              :id="company.id"
              module="company"
              :upvotes="company.upvotes || []"
              class="upvote-btn text-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- feature tags only for featured companies -->
    <div
      v-if="company.featured && company.features && company.features.length"
      class="mt-8"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="feature in company.features.slice(0, 4)"
          :key="feature.id"
          class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
        >
          {{ feature.item }}
        </span>
      </div>
    </div>

    <!-- expanded content (if needed) -->
    <div v-if="isExpanded && showExpandedContent" class="mt-8 border-t pt-4">
      <p>{{ company.excerpt }}</p>

      <!-- features-->
      <section v-if="showFeatures" class="mt-4">
        <h3 class="pb-2 text-lg font-medium">Features</h3>
        <ul class="list-disc pl-5">
          <li v-for="feature in company.features" :key="feature.id">
            {{ feature.item }}: {{ feature.description }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Company } from '@serp/types/types';
import { computed, ref } from 'vue';

const props = defineProps({
  company: {
    type: Object as PropType<Company>,
    required: true
  },
  showReadMore: {
    type: Boolean,
    default: false
  },
  showFeatures: {
    type: Boolean,
    default: false
  },
  showExpandedContent: {
    type: Boolean,
    default: false
  },
  baseSlug: {
    type: String,
    default: 'products/'
  }
});

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

// Compute the main image, either the company logo or the first screenshot
const companyMainImage = computed(() => {
  if (props.company.logo) {
    return props.company.logo;
  } else if (props.company.screenshots && props.company.screenshots.length) {
    return props.company.screenshots[0];
  } else {
    return null;
  }
});

// Determine whether the main image is a logo or a screenshot
const isLogo = computed(() => {
  return props.company.logo && companyMainImage.value === props.company.logo;
});
</script>

<style scoped>
.upvote-btn :deep(button) {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  width: 100%;
}
.upvote-btn :deep(.flex) {
  width: 100%;
}

/* Override orange upvote color with blue */
.upvote-btn :deep(.text-orange-500) {
  color: var(--color-accent-fg, #0969da) !important;
}
.upvote-btn :deep(.dark\:text-orange-400) {
  color: var(--color-accent-fg, #2f81f7) !important;
}
</style>
