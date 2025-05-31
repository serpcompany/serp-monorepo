<script setup lang="ts">
  import type { ServiceProvider, Comment } from '@serp/types/types';

  const { user } = useUserSession();

  const props = defineProps<{
    data: ServiceProvider;
  }>();
  const { data } = toRefs(props);

  const isVerified = computed(() => {
    return data.value?.verification === user.value?.id;
  });

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Create a consolidated object with all provider details
  const providerDetails = computed(() => {
    return {
      basic: data.value?.basicInfo || {},
      contracts: data.value?.contracts || {},
      pricing: data.value?.pricing || {},
      services: data.value?.services || {},
      industries: data.value?.industries || {},
      businessesServed: data.value?.businessesServed || {},
      supportSetup: data.value?.supportSetup || {},
      ratings: data.value?.ratings || {}
    };
  });

  const { comments } = (await useServiceProviderComments(data.value?.id)) as {
    comments: Comment[];
  };

  const reviews = await useServiceProviderReviews(data.value?.id);
  reviews.serviceProviderId = data.value?.id;

  // State for review modal
  const showReviewModal = ref(false);

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    const updatedReviews = await useServiceProviderReviews(data.value?.id);
    Object.assign(reviews, updatedReviews);
    reviews.serviceProviderId = data.value?.id;
  }

  const faqItems = computed(() => {
    if (!data.value?.faqs) return [];

    return data.value?.faqs.map(
      (faq: { question: string; answer: string }) => ({
        label: faq.question,
        content: faq.answer
      })
    );
  });

  const sections = computed(() => {
    const sectionTitles: string[] = [];

    sectionTitles.push('Overview');

    if (
      data.value?.categories &&
      data.value?.categories.length &&
      data.value?.categories[0] !== undefined
    ) {
      sectionTitles.push('Categories');
    }

    if (data.value?.features) {
      sectionTitles.push('Features');
    }

    if (data.value?.content) {
      sectionTitles.push('Article');
    }

    if (data.value?.screenshots && data.value?.screenshots.length) {
      sectionTitles.push('Media');
    }

    if (faqItems.value && faqItems.value.length) {
      sectionTitles.push('FAQ');
    }

    if (data.value?.alternatives) {
      sectionTitles.push('Alternatives');
    }

    // Always include Reviews section when reviews are available
    if (data.value?.numReviews > 0 || reviews?.reviews?.length > 0) {
      sectionTitles.push('Reviews');
    }

    // Add Comments section to navigation
    sectionTitles.push('Discussion');

    return sectionTitles;
  });

  useSeoMeta({
    title: computed(() =>
      data.value?.name
        ? `${data.value.name} - Reviews, Pricing, Features, Alternatives & Deals`
        : 'Service Providers'
    )
  });
</script>

<template>
  <JSONRenderer v-if="data" :value="data" />
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logoUrl"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <ServiceProviderEditButton v-if="useAuth" :id="data.id" />
        <ServiceProviderVerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verified"
        />
        <!-- <UpvoteButton
          v-if="useAuth"
          :id="data.id"
          module="serviceProvider"
          :upvotes="upvotes"
        /> -->
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Overview Section -->
      <!-- <UCard
        v-if="data.excerpt"
        id="overview"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Overview
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <ServiceProviderOverview :service-provider="data" />
        </div>
      </UCard> -->

      <!-- ServiceProviderMergedContent Details Section -->
      <UCard
        id="provider-details"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Provider Details
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />

        <div class="p-4 sm:p-6">
          <div class="space-y-6">
            <!-- Basic Info -->
            <div v-if="Object.keys(providerDetails.basic).length">
              <h3 class="mb-3 text-lg font-medium">Basic Information</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.basic"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div v-if="Object.keys(providerDetails.pricing).length">
              <h3 class="mb-3 text-lg font-medium">Pricing</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.pricing"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Services -->
            <div v-if="Object.keys(providerDetails.services).length">
              <h3 class="mb-3 text-lg font-medium">Services</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.services"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Industries -->
            <div v-if="Object.keys(providerDetails.industries).length">
              <h3 class="mb-3 text-lg font-medium">Industries</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.industries"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contracts -->
            <div v-if="Object.keys(providerDetails.contracts).length">
              <h3 class="mb-3 text-lg font-medium">Contracts</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.contracts"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Businesses Served -->
            <div v-if="Object.keys(providerDetails.businessesServed).length">
              <h3 class="mb-3 text-lg font-medium">Businesses Served</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.businessesServed"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Support & Setup -->
            <div v-if="Object.keys(providerDetails.supportSetup).length">
              <h3 class="mb-3 text-lg font-medium">Support & Setup</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.supportSetup"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Ratings -->
            <div v-if="Object.keys(providerDetails.ratings).length">
              <h3 class="mb-3 text-lg font-medium">Ratings</h3>
              <div class="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  v-for="(value, key) in providerDetails.ratings"
                  :key="key"
                  class="flex flex-col"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span v-if="typeof value !== 'object' || value === null">{{
                    value || 'Unknown'
                  }}</span>
                  <div v-else class="mt-1 ml-4 space-y-1">
                    <div
                      v-for="(nestedValue, nestedKey) in value"
                      :key="nestedKey"
                      class="flex flex-wrap items-baseline"
                    >
                      <span class="mr-2 font-bold">{{ nestedKey }}:</span>
                      <span>{{
                        nestedValue === null ||
                        nestedValue === undefined ||
                        nestedValue === ''
                          ? 'Unknown'
                          : typeof nestedValue === 'object'
                            ? JSON.stringify(nestedValue)
                            : nestedValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Categories Section -->
      <UCard
        v-if="data.categories && data.categories.length"
        id="categories"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <SPill base-slug="products/best" :items="data.categories" />
      </UCard>

      <!-- Media Carousel Section -->
      <UCard
        v-if="data.screenshots && data.screenshots.length"
        id="media"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Media
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-0">
          <MediaGallery :service-provider="data" />
        </div>
      </UCard>

      <!-- Article Section -->
      <UCard
        v-if="data.content"
        id="article"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Article
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <!-- eslint-disable-next-line vue/no-v-html-->
        <div
          class="prose dark:prose-invert max-w-none"
          v-html="data.content"
        ></div>
      </UCard>

      <!-- FAQs Section -->
      <UCard
        v-if="faqItems && faqItems.length"
        id="faqs"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              FAQ
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <UAccordion
            type="multiple"
            :items="faqItems"
            :ui="{
              wrapper: 'divide-y divide-gray-200 dark:divide-gray-800',
              item: {
                base: 'py-4',
                container: '',
                header: {
                  base: 'flex justify-between w-full text-left',
                  inner: 'font-medium text-gray-900 dark:text-gray-100',
                  icon: 'text-gray-400 dark:text-gray-500'
                },
                content: {
                  base: 'text-gray-700 dark:text-gray-300 pt-2'
                }
              }
            }"
          />
        </div>
      </UCard>

      <!-- Features Section -->
      <UCard
        v-if="data.features"
        id="features"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ data.name }} Features
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <h3
            class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            What are the feature of {{ data.name }}?
          </h3>
          <div class="space-y-6">
            <div
              v-for="(feature, index) in data.features"
              :key="feature.item"
              class="pb-4"
            >
              <h4
                class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100"
              >
                Feature Heading #{{ index + 1 }}
              </h4>
              <div class="flex items-baseline space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p class="text-gray-700 dark:text-gray-300">
                  {{ feature.item }}
                </p>
              </div>
              <p class="mt-1 ml-7 text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Alternatives -->
      <UCard
        v-if="data.alternatives"
        id="alternatives"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ data.name }} Alternatives
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-3">
          <UCard
            v-for="alternative in data.alternatives"
            :key="alternative"
            class="border border-gray-200 dark:border-gray-800"
          >
            <div class="mb-4 flex justify-center">
              <div
                class="flex h-16 w-16 items-center justify-center bg-gray-100 dark:bg-gray-800"
              >
                <UIcon name="i-heroicons-cube" class="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 class="mb-2 text-center font-medium">
              Alternatives ServiceProvider Title
            </h3>
            <p
              class="mb-4 text-center text-sm text-gray-600 dark:text-gray-400"
            >
              AI-based editing tool for effortless photo cleanup, creations, and
              advanced photo refinement.
            </p>
            <p class="text-center text-sm text-gray-500">Starting from</p>
            <p class="text-center text-lg font-bold">
              $29.00
              <span class="text-sm font-normal text-gray-500">per month</span>
            </p>
            <div class="mt-4 space-y-2">
              <div class="flex items-start space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <span class="text-sm">Get two months free trial</span>
              </div>
              <div class="flex items-start space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <span class="text-sm">No free plan</span>
              </div>
            </div>
          </UCard>
        </div>
      </UCard>

      <!-- Reviews Section -->
      <UCard
        id="reviews"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ data.name }} Reviews
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="py-4 sm:p-6">
          <ReviewDistributionCard
            :total-reviews="data.numReviews ? data.numReviews : 0"
            :total-one-star-reviews="
              data.numOneStarReviews ? data.numOneStarReviews : 0
            "
            :total-two-star-reviews="
              data.numTwoStarReviews ? data.numTwoStarReviews : 0
            "
            :total-three-star-reviews="
              data.numThreeStarReviews ? data.numThreeStarReviews : 0
            "
            :total-four-star-reviews="
              data.numFourStarReviews ? data.numFourStarReviews : 0
            "
            :total-five-star-reviews="
              data.numFiveStarReviews ? data.numFiveStarReviews : 0
            "
            :average-rating="data.averageRating ? data.averageRating : 0"
            :show-border="false"
            card-title=""
            class="pb-12"
            :show-review-button="useAuth"
            @open-review-form="showReviewModal = true"
          />

          <!-- Display Reviews List -->
          <Reviews :is-verified="isVerified" :reviews="reviews" class="mt-8" />
        </div>
      </UCard>

      <ReviewModal
        v-model:open="showReviewModal"
        :service-provider-id="data.id"
        :result="reviews"
        @close="showReviewModal = false"
        @review-submitted="handleReviewSubmitted"
      />

      <!-- Discussion Section -->
      <UCard
        id="discussion"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Discussion
            </h2>
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <CommentsContainer
            v-if="useAuth"
            :id="data.id"
            module="serviceProvider"
            :comments="comments"
            class="comments-github-style"
          />
        </div>
      </UCard>
    </section>
  </UPage>
</template>
