<script setup lang="ts">
  const props = defineProps({
    totalReviews: {
      type: Number,
      required: true
    },
    totalOneStarReviews: {
      type: Number,
      required: true
    },
    totalTwoStarReviews: {
      type: Number,
      required: true
    },
    totalThreeStarReviews: {
      type: Number,
      required: true
    },
    totalFourStarReviews: {
      type: Number,
      required: true
    },
    totalFiveStarReviews: {
      type: Number,
      required: true
    },
    averageRating: {
      type: Number,
      required: true
    },
    showBorder: {
      type: Boolean,
      default: true,
      description: 'Whether to show the border around the card'
    },
    cardTitle: {
      type: String,
      default: 'Customer Reviews',
      description: 'Title to display on the card'
    },
    showReviewButton: {
      type: Boolean,
      default: true,
      description: 'Whether to show the Write a Review button'
    }
  });

  const ratingCounts = computed(() => ({
    1: props.totalOneStarReviews,
    2: props.totalTwoStarReviews,
    3: props.totalThreeStarReviews,
    4: props.totalFourStarReviews,
    5: props.totalFiveStarReviews
  }));
</script>

<template>
  <UCard
    :ui="{
      body: { padding: 'p-0' }
    }"
    :class="{ 'border border-gray-200 dark:border-gray-800': showBorder }"
  >
    <div class="p-4 sm:p-6">
      <h3
        v-if="cardTitle"
        class="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
      >
        {{ cardTitle }}
      </h3>

      <div
        class="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8"
      >
        <!-- Overall Rating -->
        <div
          class="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6 md:w-1/3 dark:bg-gray-800"
        >
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Overall Rating
          </p>
          <div class="mb-2 text-5xl font-bold text-black dark:text-white">
            {{ averageRating.toFixed(1) }}
          </div>
          <div class="mb-4">
            <StarRating
              :model-value="averageRating"
              :readonly="true"
              class="justify-center"
            />
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Based on {{ totalReviews }} reviews
          </p>
        </div>

        <!-- Rating Distribution -->
        <div class="md:w-2/3">
          <p class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Rating Distribution
          </p>

          <!-- Rating Bars -->
          <div class="space-y-3">
            <div
              v-for="star in [5, 4, 3, 2, 1]"
              :key="star"
              class="text-md flex items-center"
            >
              <div class="flex w-8 items-center">
                <span class="text-sm">{{ star }}</span>
                <UIcon
                  name="i-heroicons-star-solid"
                  class="h-4 w-4 text-yellow-400"
                />
              </div>

              <div class="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  class="h-full rounded-full bg-yellow-400"
                  :style="{
                    width: `${
                      totalReviews > 0
                        ? (ratingCounts[star as keyof typeof ratingCounts] / totalReviews) * 100
                        : 0
                    }%`
                  }"
                ></div>
              </div>

              <span class="ml-4 text-sm">{{ ratingCounts[star as keyof typeof ratingCounts] || 0 }}</span>
            </div>
          </div>

          <!-- Write a Review Button - Only shown if showReviewButton is true -->
          <div
            v-if="showReviewButton"
            class="mt-6 flex justify-center md:justify-start"
          >
            <UButton
              variant="outline"
              class="rounded-md"
              size="xl"
              @click="$emit('open-review-form')"
            >
              Write a Review
              <template #trailing>
                <UIcon name="i-lucide-pencil" />
              </template>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
