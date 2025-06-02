<script setup lang="ts">
import type { Reviews } from '@/serp/types/types'

const props = defineProps<{
  entityId: string
  open: boolean
  result: Reviews
}>()

const emit = defineEmits(['close', 'review-submitted', 'update:open'])

const { loggedIn, user } = useUserSession()
const toast = useToast()

// Review form state
const reviewForm = ref({
  title: '',
  content: '',
  rating: null as number | null,
  dateOfExperience: '',
})
const userReview = computed(() => props.result.userReview)

watchEffect(
  () => {
    if (userReview.value) {
      const review = userReview.value.review || userReview.value
      reviewForm.value = {
        title: review?.title || '',
        content: review?.content || '',
        rating: review?.rating || null,
        dateOfExperience: review?.dateOfExperience
          ? new Date(review.dateOfExperience).toISOString().split('T')[0]
          : '',
      }
    }
  },
  { immediate: true },
)

const isReviewComplete = computed(
  () =>
    reviewForm.value.title?.trim() !== ''
    && reviewForm.value.content?.trim() !== ''
    && reviewForm.value.rating !== null
    && reviewForm.value.dateOfExperience?.trim() !== '',
)

const loadingReview = ref(false)

async function saveReview() {
  if (!loggedIn.value) {
    toast.add({
      id: 'not-logged-in',
      title: 'Not logged in',
      description: 'Please log in to submit your review.',
      icon: 'exclamation-circle',
    })
    return
  }

  try {
    loadingReview.value = true
    if (!isReviewComplete.value) {
      throw new Error('Please fill in all required fields for your review.')
    }
    if (!user?.value?.email) {
      throw new Error('Please log in to submit a review.')
    }
    const payload = {
      ...reviewForm.value,
    }

    const { data: response, error } = await useFetch(
      `/api/reviews/${props.entityId}`,
      {
        method: userReview?.value ? 'PUT' : 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify(payload),
      },
    )

    if (error.value) {
      throw new Error(error.value.message || 'Failed to submit review.')
    }
    if (response.value.message && response.value.message === 'success') {
      toast.add({
        id: 'review-saved',
        title: userReview?.value ? 'Review Updated' : 'Review Submitted',
        description: 'Your review has been successfully saved.',
        icon: 'check-circle',
      })
      emit('review-submitted')
      // Close modal after successful submission
      closeModal()
    }
    else {
      throw new Error(`Failed to save review - ${response.value.message}`)
    }
  }
  catch (err: unknown) {
    toast.add({
      id: 'review-error',
      title: 'Error saving review',
      description: err.message,
      icon: 'exclamation-circle',
    })
  }
  finally {
    loadingReview.value = false
  }
}

function closeModal() {
  emit('update:open', false)
  emit('close')
}
</script>

<template>
  <UModal
    :open="open"
    :title="userReview?.value ? 'Edit Your Review' : 'Write a Review'"
    size="lg"
    :ui="{
      container: 'flex min-h-full items-center justify-center p-6',
      content: 'rounded-xl',
      body: 'p-6',
      title: 'text-2xl font-semibold',
      footer:
        'p-6 flex justify-end gap-4 bg-gray-50 dark:bg-gray-800 rounded-b-xl',
    }"
    @update:open="emit('update:open', $event)"
    @close="closeModal"
  >
    <template #description>
      <p class="mt-1 text-base text-gray-500 dark:text-gray-400">
        Share your experience to help others make better decisions.
      </p>
    </template>

    <template #body>
      <form class="space-y-8" @submit.prevent="saveReview">
        <!-- Review Title -->
        <div class="space-y-2">
          <label
            class="block text-base font-medium text-gray-700 dark:text-gray-200"
          >
            Review Title <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="reviewForm.title"
            placeholder="Enter a descriptive title for your review"
            class="w-full text-base"
            size="lg"
            :ui="{
              base: 'relative',
              input: 'rounded-lg py-3',
            }"
            required
          />
        </div>

        <!-- Rating with labels -->
        <div class="space-y-2">
          <label
            class="block text-base font-medium text-gray-700 dark:text-gray-200"
          >
            Your Rating <span class="text-red-500">*</span>
          </label>
          <div
            class="rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div class="text-center">
              <StarRating
                v-model="reviewForm.rating"
                size="xl"
                color="gold"
                :show-labels="true"
                class="inline-flex"
              />
            </div>
          </div>
        </div>

        <!-- Review Content -->
        <div class="space-y-2">
          <label
            class="block text-base font-medium text-gray-700 dark:text-gray-200"
          >
            Your Review <span class="text-red-500">*</span>
          </label>
          <UTextarea
            v-model="reviewForm.content"
            rows="5"
            placeholder="Describe your experience with this entity. What did you like or dislike? What stood out to you?"
            class="w-full text-base"
            :ui="{
              base: 'relative',
              input: 'rounded-lg py-3',
            }"
            required
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Minimum 20 characters. Be honest and helpful to other users.
          </p>
        </div>

        <!-- Date of Experience -->
        <div class="space-y-2">
          <label
            class="block text-base font-medium text-gray-700 dark:text-gray-200"
          >
            Date of Experience <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="reviewForm.dateOfExperience"
            type="date"
            class="w-full text-base"
            size="lg"
            :ui="{
              base: 'relative',
              input: 'rounded-lg py-3',
            }"
            required
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            When did you use this product or service?
          </p>
        </div>
      </form>
    </template>

    <template #footer>
      <UButton
        color="gray"
        variant="soft"
        size="lg"
        class="rounded-lg px-5 py-2.5 text-base"
        @click="closeModal"
      >
        Cancel
      </UButton>
      <UButton
        color="primary"
        variant="solid"
        size="lg"
        class="rounded-lg px-6 py-2.5 text-base"
        :loading="loadingReview"
        :disabled="!isReviewComplete"
        @click="saveReview"
      >
        {{ userReview?.value ? 'Update Review' : 'Submit Review' }}
      </UButton>
    </template>
  </UModal>
</template>
