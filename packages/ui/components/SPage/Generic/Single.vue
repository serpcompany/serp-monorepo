<script setup lang="ts">
import type { Comment, Entity } from '@serp/types/types'

const props = defineProps<{
  module: string
  baseSlug: string
  categoryBaseSlug: string
}>()
const { user } = useUserSession()
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const toast = useToast()

const { module, baseSlug, categoryBaseSlug } = toRefs(props)

const data = (await useEntity(slug, module.value)) as Entity
if (!data) {
  router.push('/404')
}

const isVerified = computed(() => {
  return data.verification === user.value?.id
})

const config = useRuntimeConfig()
const useAuth = config.public.useAuth

// Create a consolidated object with all provider details
const providerDetails = computed(() => {
  return {
    basic: data.basicInfo || {},
    contracts: data.contracts || {},
    pricing: data.pricing || {},
    services: data.services || {},
    industries: data.industries || {},
    businessesServed: data.businessesServed || {},
    supportSetup: data.supportSetup || {},
    ratings: data.ratings || {},
  }
})

// @ts-expect-error: Auto-imported from another layer
const { comments } = (await useEntityComments(data.id)) as {
  comments: Comment[]
}

// @ts-expect-error: Auto-imported from another layer
const reviews = await useEntityReviews(data.id)
reviews.entityId = data.id

// State for review modal
const showReviewModal = ref(false)

// Handle review submission - refresh reviews data
async function handleReviewSubmitted() {
  // @ts-expect-error: Auto-imported from another layer
  const updatedReviews = await useEntityReviews(data.id)
  Object.assign(reviews, updatedReviews)
  reviews.entityId = data.id
}

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

useSeoMeta({
  title: computed(() => (data.name ? `${data.name}` : 'Unknown')),
})
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.oneLiner || data.description"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.image || data.logo || data.logoUrl"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <EditButton v-if="useAuth" :id="data.id" />
        <VerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verification"
        />
        <VoteButton
          v-if="useAuth"
          :id="data.id"
          :module="module"
          :users-current-vote="data.usersCurrentVote"
          :upvotes="data.numUpvotes"
          :downvotes="data.numDownvotes"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <JSONRenderer
        v-if="data"
        :value="data"
        :base-slug="baseSlug"
        :category-base-slug="categoryBaseSlug"
      />
    </section>

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
          :module="data.module"
          :comments="comments"
          class="comments-github-style"
        />
      </div>
    </UCard>
  </UPage>
</template>
