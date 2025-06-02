<script setup lang="ts">
const props = defineProps({
  userReview: {
    type: Object as PropType<{
      title: string
      content: string
      rating: number
      dateOfExperience: string
    } | null>,
    default: null,
  },
  loggedIn: {
    type: Boolean,
    required: true,
  },
  reviewForm: {
    type: Object,
    required: true,
  },
  loadingReview: {
    type: Boolean,
    default: false,
  },
  isReviewComplete: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['save-review', 'update:reviewForm'])

function updateReviewForm(field: string, value: string | number | Date) {
  const updatedForm = { ...props.reviewForm, [field]: value }
  emit('update:reviewForm', updatedForm)
}

function saveReview() {
  emit('save-review')
}
</script>

<template>
  <div class="mt-8">
    <UCard class="mx-auto max-w-2xl p-8">
      <UHeading level="2" class="mb-6 text-center text-2xl font-semibold">
        {{ userReview ? 'Edit Your Review' : 'Submit a New Review' }}
      </UHeading>
      <!-- If the user is logged in show the form, otherwise ask them to log in -->
      <div v-if="loggedIn">
        <form class="space-y-6" @submit.prevent="saveReview">
          <UFormField label="Review Title" required>
            <UInput
              :value="reviewForm.title"
              placeholder="Enter your review title"
              class="w-full"
              @input="updateReviewForm('title', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Review Content" required>
            <UTextarea
              :value="reviewForm.content"
              rows="4"
              placeholder="Write your review here..."
              class="w-full"
              @input="updateReviewForm('content', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Rating (1-5)" required>
            <UInput
              :value="reviewForm.rating"
              type="number"
              min="1"
              max="5"
              placeholder="Rating from 1 to 5"
              class="w-full"
              @input="updateReviewForm('rating', parseInt($event.target.value))"
            />
          </UFormField>
          <UFormField label="Date of Experience" required>
            <UInput
              :value="reviewForm.dateOfExperience"
              type="date"
              class="w-full"
              @input="updateReviewForm('dateOfExperience', $event.target.value)"
            />
          </UFormField>
          <div class="text-center">
            <UButton
              type="submit"
              color="secondary"
              size="xl"
              :loading="loadingReview"
              :disabled="!isReviewComplete"
            >
              {{ userReview ? 'Update Review' : 'Submit Review' }}
            </UButton>
          </div>
        </form>
      </div>
      <div v-else class="text-center text-neutral-500">
        Please log in to submit or edit your review.
      </div>
    </UCard>
  </div>
</template>
