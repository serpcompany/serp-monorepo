<script setup lang="ts">
  import type { Comment, Company } from '@serp/types/types'

  const props = defineProps<{
    data: Company
  }>()

  const { user } = useUserSession()

  const { data } = toRefs(props)

  const isVerified = computed(() => {
    return data.value?.verification === user.value?.id
  })

  const config = useRuntimeConfig()
  const useAuth = config.public.useAuth

  const toast = useToast()

  const { comments } = (await useCompanyComments(data.value?.id)) as {
    comments: Comment[]
  }

  const reviews = await useCompanyReviews(data.value?.id)
  reviews.companyId = data.value?.id
  reviews.entityId = data.value?.id

  // State for review modal
  const showReviewModal = ref(false)

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    const updatedReviews = await useCompanyReviews(data.value?.id)
    Object.assign(reviews, updatedReviews)
    reviews.companyId = data.value?.id
    reviews.entityId = data.value?.id
  }

  const faqItems = computed(() => {
    if (!data.value?.faqs)
      return []

    return data.value?.faqs.map((faq: { question: string, answer: string }) => ({
      label: faq.question,
      content: faq.answer,
    }))
  })

  const sections = computed(() => {
    const sectionTitles: string[] = []

    sectionTitles.push('Overview')

    if (data.value?.categories && data.value?.categories.length) {
      sectionTitles.push('Categories')
    }

    if (data.value?.features) {
      sectionTitles.push('Features')
    }

    if (data.value?.content) {
      sectionTitles.push('Article')
    }

    if (data.value?.screenshots && data.value?.screenshots.length) {
      sectionTitles.push('Media')
    }

    if (faqItems.value && faqItems.value.length) {
      sectionTitles.push('FAQ')
    }

    if (data.value?.alternatives) {
      sectionTitles.push('Alternatives')
    }

    // Always include Reviews section when reviews are available
    if (data.value?.numReviews > 0 || reviews?.reviews?.length > 0) {
      sectionTitles.push('Reviews')
    }

    // Add Comments section to navigation
    sectionTitles.push('Discussion')

    return sectionTitles
  })

  // Copy to clipboard function
  async function copyToClipboard(sectionId: string) {
    const jumpLink = `#${sectionId}`
    const link = `${window.location.href.split('#')[0]}${jumpLink}`

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link)
      }
      else {
        // Fallback for unsupported environments
        const el = document.createElement('textarea')
        el.value = link
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }

      toast.add({
        id: 'copy-link',
        title: 'Link copied to clipboard',
        description: `Link to ${sectionId} section copied successfully`,
        icon: 'check-circle',
      })
    }
    catch (error) {
      console.error('Failed to copy text to clipboard:', error)
      toast.add({
        id: 'copy-link-error',
        title: 'Failed to copy link',
        description: `Could not copy link to ${sectionId} section`,
        icon: 'error-circle',
      })
    }
  }

  function companyMainImage(company: Company) {
    if (!company)
      return null
    if (company.logo) {
      return company.logo
    }
    else if (company.screenshots && company.screenshots.length) {
      return company.screenshots[0]
    }
    else {
      return null
    }
  }

  useSeoMeta({
    title: computed(() =>
      data.value?.name
        ? `${data.value.name} - Reviews, Pricing, Features, Alternatives & Deals`
        : 'Company Information',
    ),
  })
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.oneLiner"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logo"
      :serply-link="data.serplyLink"
      :verified="data.verified"
    >
      <template #name-trailing>
        <CompanyVerification
          :id="data.id"
          :domain="data.slug"
          :verified="data.verification"
        />
      </template>
      <template #upvote>
        <CompanyEditButton v-if="useAuth" :id="data.id" />
        <VoteButton
          v-if="useAuth"
          :id="data.id"
          module="company"
          :users-current-vote="data.usersCurrentVote"
          :upvotes="data.numUpvotes"
          :downvotes="data.numDownvotes"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Overview Section -->
      <UCard
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('overview')"
            />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <CompanyOverview :company="data" />
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('categories')"
            />
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('media')"
            />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-0">
          <MediaGallery :company="data" />
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('article')"
            />
          </div>
        </template>
        <UDivider class="my-0" />
        <!-- eslint-disable-next-line vue/no-v-html -->
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('faqs')"
            />
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
                  icon: 'text-gray-400 dark:text-gray-500',
                },
                content: {
                  base: 'text-gray-700 dark:text-gray-300 pt-2',
                },
              },
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('features')"
            />
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('alternatives')"
            />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-3">
          <div v-for="alternative in data.alternatives" :key="alternative.id">
            <NuxtLink :to="`/products/${alternative.domain}/reviews/`">
              <UCard class="border border-gray-200 dark:border-gray-800">
                <div class="mb-4 flex justify-center">
                  <div
                    v-if="companyMainImage(alternative)"
                    class="mr-5 flex-shrink-0"
                  >
                    <div class="h-28 w-28">
                      <LazyNuxtImg
                        :src="companyMainImage(alternative)"
                        :alt="alternative.name"
                        class="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                <h3 class="mb-2 text-center font-medium">
                  {{ alternative.name }}
                </h3>
                <p
                  v-if="alternative.excerpt"
                  class="mb-4 text-center text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ alternative.excerpt }}
                </p>
              </UCard>
            </NuxtLink>
          </div>
        </div>
      </UCard>

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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('reviews')"
            />
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
        :entity-id="data.id"
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
            <UIcon
              name="i-heroicons-link"
              class="ml-2 h-4 w-4 text-gray-400 hover:cursor-pointer"
              @click="copyToClipboard('discussion')"
            />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <CommentsContainer
            v-if="useAuth"
            :id="data.id"
            module="company"
            :comments="comments"
            class="comments-github-style"
          />
        </div>
      </UCard>
    </section>
  </UPage>
</template>
