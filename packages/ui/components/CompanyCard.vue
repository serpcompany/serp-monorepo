<template>
  <div class="border p-4">
    <!-- card top half -->
    <div class="flex flex-col items-start md:flex-row">
      <!-- col 1 -->
      <div
        class="mb-4 flex w-full flex-shrink-0 flex-row md:mr-4 md:mb-0 md:w-auto"
      >
        <!-- company image -->
        <div
          v-if="companyMainImage"
          :class="[
            isLogo
              ? 'h-16 w-16 overflow-hidden rounded-full'
              : 'h-[200px] w-[250px] overflow-hidden',
            'flex items-center justify-center md:ml-4'
          ]"
        >
          <nuxt-link :to="`/${baseSlug}${company.slug}/`">
            <lazy-nuxt-img
              :src="companyMainImage"
              :alt="company.name"
              class="object-fit h-full w-full"
            />
          </nuxt-link>
        </div>
      </div>

      <!-- col 2 -->
      <div class="w-full flex-grow md:mr-4">
        <div
          class="mb-2 flex flex-col items-start justify-between md:mb-0 md:flex-row md:items-center"
        >
          <div class="mb-2 md:mb-0">
            <!-- company name -->
            <nuxt-link :to="`/${baseSlug}${company.slug}/`">
              <h2 class="text-lg font-semibold">{{ company.name }}</h2>
            </nuxt-link>

            <!-- company oneliner -->
            <p class="my-2">{{ company.oneLiner }}</p>

            <!-- read more -->
            <button
              v-if="showReadMore"
              class="mt-2 flex cursor-pointer items-center"
              type="button"
              @click="toggleExpanded"
            >
              {{ isExpanded ? 'Read less' : 'Read more' }}
              <svg
                :class="{ 'rotate-180 transform': isExpanded }"
                class="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- col 3 -->
      <div
        class="flex flex-col items-start justify-between space-y-4 md:w-auto md:items-center"
      >
        <!-- view website button -->
        <nuxt-link
          :to="company.serplyLink"
          target="_blank"
          class="border px-4 py-2 whitespace-nowrap"
        >
          View Website
        </nuxt-link>

        <!-- ratings -->
        <div v-if="company.rating" class="flex flex-1 items-center text-2xl">
          <span>{{ company.rating }}/5</span>
        </div>
      </div>
    </div>

    <!-- card bottom half -->
    <div v-if="isExpanded && showExpandedContent" class="my-10">
      <div class="border-t py-8">
        <p>{{ company.excerpt }}</p>
      </div>

      <!-- features-->
      <section v-if="showFeatures" class="my-12">
        <h3 class="pb-4 text-xl">Features</h3>
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
