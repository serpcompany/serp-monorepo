<template>
  <div
    :class="[
      'py-4 px-5 max-w-5xl mx-auto',
      company.featured
        ? 'transform border border-blue-500 shadow-lg shadow-blue-300 transition duration-300 ease-in-out hover:scale-105'
        : 'border border-gray-300 rounded-lg'
    ]"
  >
    <!-- card content -->
    <div class="flex items-start">
      <!-- company image -->
      <div
        v-if="companyMainImage"
        class="mr-5 flex-shrink-0"
      >
        <nuxt-link :to="`/${baseSlug}${company.slug}/reviews/`">
          <div class="h-28 w-28 overflow-hidden bg-gray-100 rounded-lg">
            <lazy-nuxt-img
              :src="companyMainImage"
              :alt="company.name"
              class="object-contain h-full w-full"
            />
          </div>
        </nuxt-link>
      </div>

      <!-- company content -->
      <div class="flex-grow">
        <div class="flex flex-col justify-between sm:flex-row">
          <div>
            <!-- company name and badge -->
            <div class="flex items-center">
              <nuxt-link
                class="flex"
                :to="`/${baseSlug}${company.slug}/reviews/`"
              >
                <h2 class="text-xl font-semibold">{{ company.name }}</h2>
              </nuxt-link>
              <u-badge
                v-if="company.featured"
                :avatar="{
                  src: 'https://github.com/serpcompany.png'
                }"
                size="md"
                color="neutral"
                variant="outline"
                class="ml-4"
              >
                Featured
              </u-badge>
            </div>

            <!-- company oneliner -->
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ company.oneLiner }}</p>

            <!-- rating display -->
            <div v-if="company.rating" class="mt-3">
              <span class="font-medium text-lg">{{ company.rating }}/5</span>
            </div>
          </div>

          <!-- right side buttons -->
          <div class="flex flex-col space-y-2 min-w-[140px] mt-4 sm:mt-0">
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

    <!-- expanded content (if needed) -->
    <div v-if="isExpanded && showExpandedContent" class="mt-8 pt-4 border-t">
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
</style>
