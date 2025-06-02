<script setup lang="ts">
const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

const review = toRef(props, 'review')

const localReview = reactive({ ...review.value })

const toast = useToast()

const formattedExperienceDate = computed(() => {
  if (
    !props.review.dateOfExperience
    && !props.review.review?.dateOfExperience
  ) {
    return 'Unknown'
  }

  return new Date(
    props.review.dateOfExperience || props.review.review?.dateOfExperience,
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const formattedReviewDate = computed(() => {
  if (!props.review.createdAt && !props.review.review?.createdAt)
    return 'Unknown'

  return new Date(
    props.review.createdAt || props.review.review?.createdAt,
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const isModalOpen = ref(false)
const notes = ref('')

// detect flagged state
const isFlagged = computed(() => {
  if (Object.prototype.hasOwnProperty.call(localReview, 'isFlagged')) {
    return localReview.isFlagged
  }

  if (
    localReview.review
    && Object.prototype.hasOwnProperty.call(localReview.review, 'isFlagged')
  ) {
    return localReview.review.isFlagged
  }

  return undefined
})

// open modal for flagging
function onFlagClick() {
  notes.value = '' // clear old notes
  isModalOpen.value = true
}

// cancel/close modal
function onCancel() {
  isModalOpen.value = false
}

// send flag request
async function onAccept() {
  try {
    await $fetch(
      `/api/entity/flag-review?id=${props.review.id || props.review.review.id}`,
      {
        method: 'POST',
        body: { notes: notes.value },
      },
    )
    // reflect UI
    localReview.isFlagged = true
    localReview.flaggedReason = notes.value
    toast.add({
      id: 'flag-review',
      title: 'Review flagged',
      description: 'The review has been flagged successfully.',
    })
  }
  catch (err) {
    toast.add({
      id: 'flag-review-error',
      title: 'Error flagging review',
      description: 'There was an error flagging the review. Please try again.',
    })
  }
  finally {
    isModalOpen.value = false
  }
}

// send unflag/accept request
async function onUnflag() {
  try {
    await $fetch(
      `/api/entity/flag-review?id=${props.review.id || props.review.review.id}`,
      {
        method: 'DELETE',
      },
    )
    localReview.isFlagged = false
    localReview.flaggedReason = undefined
    toast.add({
      id: 'accept-review',
      title: 'Review accepted',
      description: 'The review has been marked as accepted.',
    })
  }
  catch (err) {
    toast.add({
      id: 'accept-review-error',
      title: 'Error accepting review',
      description:
          'There was an error marking the review as accepted. Please try again.',
    })
  }
}
</script>

<template>
  <UCard
    class="h-full"
    :class="{
      'opacity-50': isFlagged == undefined || isFlagged,
    }"
    variant="outline"
  >
    <template #header>
      <div class="flex items-center space-x-4">
        <LazyNuxtImg
          v-if="review.user && (review.user.image || review.user.avatarUrl)"
          :src="review.user.image || review.user.avatarUrl"
          alt="User Image"
          class="h-12 w-12 rounded-full object-cover"
        />
        <UAvatar
          v-else
          :alt="review.user ? review.user.name : 'Anonymous'"
          size="lg"
        />
        <div>
          <h2 class="text-lg font-semibold">
            {{ review.title || review.review?.title }}
          </h2>
          <p class="text-primary-800 text-md font-semibold">
            {{
              review.user
                ? review.user.name
                : review.review?.user
                  ? review.review.user.name
                  : 'Anonymous'
            }}
          </p>
          <div class="mt-3 flex items-center">
            <div class="flex text-amber-500">
              <div v-for="i in 5" :key="i" class="relative h-5 w-5">
                <span
                  class="iconify i-heroicons:star-solid absolute inset-0 h-5 w-5 text-yellow-400 transition-opacity duration-200 dark:text-yellow-500"
                  :style="{
                    opacity:
                      i <= (review.rating || review.review?.rating) ? 1 : 0.3,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isVerified"
          class="ml-auto flex items-center space-x-2 text-sm text-gray-500"
        >
          <UButton
            v-if="isFlagged == undefined"
            class="text-gray-500 hover:text-gray-700"
            @click="onUnflag()"
          >
            Mark as Reviewed
          </UButton>
          <UButton
            v-else
            class="text-gray-500 hover:text-gray-700"
            @click="isFlagged ? onUnflag() : onFlagClick()"
          >
            {{ isFlagged ? 'Unflag Review' : 'Flag Review' }}
          </UButton>
        </div>
        <div
          v-if="isFlagged"
          class="ml-auto flex items-center space-x-2 text-sm text-gray-500"
        >
          <p class="text-xs text-neutral-400">
            Flagged: {{ localReview.flaggedReason || 'No reason provided' }}
          </p>
        </div>
        <div
          v-else-if="isFlagged == undefined"
          class="ml-auto flex items-center space-x-2 text-sm text-gray-500"
        >
          <p class="text-xs text-neutral-400">
            Not Reviewed
          </p>
        </div>
      </div>
    </template>

    <div class="p-4">
      <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
        {{ review.content || review.review?.content || review.body || '' }}
      </p>
    </div>

    <template #footer>
      <div class="space-y-1">
        <p class="text-sm text-neutral-500">
          Used: {{ formattedExperienceDate }}
        </p>
        <p class="text-xs text-neutral-400">
          Reviewed: {{ formattedReviewDate }}
        </p>
      </div>
    </template>
  </UCard>

  <!-- Flag modal -->
  <UModal v-model:open="isModalOpen" title="Flag Review">
    <template #body>
      <div class="p-4">
        <UInput
          v-model="notes"
          placeholder="Why are you flagging this?"
          label="Reason"
          textarea
        />
      </div>
    </template>
    <template #footer>
      <UButton variant="ghost" @click="onCancel">
        Cancel
      </UButton>
      <UButton @click="onAccept">
        Accept
      </UButton>
    </template>
  </UModal>
</template>
