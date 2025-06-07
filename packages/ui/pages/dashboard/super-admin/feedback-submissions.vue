<script lang="ts" setup>
  import { useDateFormat, useTimeAgo } from '@vueuse/core'

  interface Feedback {
    id: string
    message: string
    status: string
    createdAt: string
    user: {
      id: string
      name: string
      email: string
      avatarUrl?: string
    }
    meta?: {
      url?: string
      browser?: string
      platform?: string
      screenResolution?: string
      language?: string
      timezone?: string
      colorScheme?: string
    }
  }

  const { data: feedback, refresh } = await useFetch<Feedback[]>(
    '/api/super-admin/feedback',
  )
  const toast = useToast()

  const columns = ['User', 'Email', 'Status', 'Message', 'Date', '']
  const loadingFeedbackId = ref<string | null>(null)
  const selectedFeedback = ref<Feedback | null>(null)
  const replyModal = ref(false)
  const showDeleteConfirmation = ref(false)
  const isSubmitting = ref(false)
  const isDeleting = ref(false)

  const replyFormState = ref({
    message: '',
  })

  const actions = computed(() => [
    {
      label: 'Details & Reply',
      onSelect: () => {
        if (selectedFeedback.value) {
          replyModal.value = true
        }
      },
    },
    {
      label: 'Mark as Closed',
      onSelect: () => {
        if (selectedFeedback.value) {
          void handleMarkAsClosed(selectedFeedback.value)
        }
      },
    },
    {
      label: 'Delete',
      color: 'error' as const,
      onSelect: () => {
        if (selectedFeedback.value) {
          showDeleteConfirmation.value = true
        }
      },
    },
  ])

  function formatDate(date: string | Date | undefined) {
    if (!date)
      return 'NA'
    return useDateFormat(date, 'MMM D, YYYY HH:mm a').value
  }

  function getFeedbackStatusColor(status: string) {
    switch (status) {
    case 'replied':
      return 'info'
    case 'closed':
      return 'neutral'
    default:
      return 'warning'
    }
  }

  async function handleReply() {
    if (!selectedFeedback.value)
      return

    try {
      isSubmitting.value = true
      await $fetch('/api/super-admin/feedback/reply', {
        method: 'POST',
        body: {
          id: selectedFeedback.value.id,
          message: replyFormState.value.message,
          email: selectedFeedback.value.user.email,
        },
      })
      toast.add({
        title: 'Reply sent',
        description: 'Your response has been sent to the user',
        color: 'success',
      })
      replyModal.value = false
      replyFormState.value.message = ''
      await refresh()
    }
    catch {
      toast.add({
        title: 'Error',
        description: 'Failed to send reply',
        color: 'error',
      })
    }
    finally {
      isSubmitting.value = false
    }
  }

  async function handleMarkAsClosed(feedbackItem: Feedback) {
    try {
      loadingFeedbackId.value = feedbackItem.id
      await $fetch(`/api/super-admin/feedback/${feedbackItem.id}`, {
        method: 'PATCH',
        body: {
          status: 'closed',
        },
      })
      toast.add({
        title: 'Feedback marked as closed',
        description: 'The feedback has been marked as closed',
        color: 'success',
      })
      await refresh()
    }
    catch {
      toast.add({
        title: 'Error',
        description: 'Failed to mark feedback as closed',
        color: 'error',
      })
    }
    finally {
      loadingFeedbackId.value = null
    }
  }

  async function handleDelete() {
    if (!selectedFeedback.value)
      return

    try {
      isDeleting.value = true
      await $fetch(`/api/super-admin/feedback/${selectedFeedback.value.id}`, {
        method: 'DELETE',
      })
      toast.add({
        title: 'Feedback deleted',
        description: 'The feedback has been deleted',
        color: 'success',
      })
      showDeleteConfirmation.value = false
      await refresh()
    }
    catch {
      toast.add({
        title: 'Error',
        description: 'Failed to delete feedback',
        color: 'error',
      })
    }
    finally {
      isDeleting.value = false
    }
  }
</script>

<template>
  <AppContainer title="Feedback">
    <div class="overflow-x-auto">
      <table class="w-full table-auto text-left text-sm">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column"
              class="p-2 text-nowrap whitespace-nowrap"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="feedbackItem in feedback"
            :key="feedbackItem.id"
            class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
          >
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="feedbackItem.user.avatarUrl ?? undefined"
                  size="2xs"
                  :alt="feedbackItem.user.name"
                />
                {{ feedbackItem.user.name }}
              </div>
            </td>
            <td class="p-2">
              {{ feedbackItem.user.email }}
            </td>
            <td class="p-2">
              <UBadge
                variant="soft"
                :color="getFeedbackStatusColor(feedbackItem.status)"
                class="capitalize"
              >
                {{ feedbackItem.status }}
              </UBadge>
            </td>
            <td class="max-w-xs p-2">
              <div class="truncate">
                {{ feedbackItem.message }}
              </div>
            </td>
            <td class="p-2">
              <UTooltip
                :text="formatDate(feedbackItem.createdAt)"
                :delay-duration="0"
              >
                <div>
                  {{ useTimeAgo(feedbackItem.createdAt) }}
                </div>
              </UTooltip>
            </td>
            <td class="p-2">
              <UDropdownMenu
                :items="actions"
                :content="{ align: 'end', side: 'bottom', sideOffset: 0 }"
              >
                <UButton
                  icon="i-lucide-ellipsis"
                  variant="ghost"
                  color="neutral"
                  class="text-neutral-500"
                  :loading="loadingFeedbackId === feedbackItem.id"
                  @click="selectedFeedback = feedbackItem"
                />
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reply Modal -->
    <UModal
      v-model:open="replyModal"
      title="Reply to Feedback"
      description="Send a response to the user's feedback"
    >
      <template #body>
        <div
          class="mb-4 flex items-center gap-2 border-b border-neutral-100 pb-2 text-xs dark:border-white/10"
        >
          <UAvatar
            :src="selectedFeedback?.user.avatarUrl ?? undefined"
            size="2xs"
            :alt="selectedFeedback?.user.name"
          />
          {{ selectedFeedback?.user.name }} says
        </div>
        <div class="mb-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <p
            class="max-h-40 overflow-auto text-sm whitespace-pre-line text-neutral-500 dark:text-neutral-400"
          >
            {{ selectedFeedback?.message }}
          </p>
        </div>
        <div class="mb-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div v-if="selectedFeedback?.meta?.url" class="col-span-2">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Page URL:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.url }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.browser">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Browser:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.browser.split(" ")[0] }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.platform">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Platform:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.platform }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.screenResolution">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Screen:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.screenResolution }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.language">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Language:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.language }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.timezone">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Timezone:
              </span>
              <span class="ml-2 text-neutral-500 dark:text-neutral-400">
                {{ selectedFeedback.meta.timezone }}
              </span>
            </div>
            <div v-if="selectedFeedback?.meta?.colorScheme">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Color Scheme:
              </span>
              <span
                class="ml-2 text-neutral-500 capitalize dark:text-neutral-400"
              >
                {{ selectedFeedback.meta.colorScheme }}
              </span>
            </div>
          </div>
        </div>
        <UForm :state="replyFormState" @submit="handleReply">
          <UFormField label="Message" name="message">
            <UTextarea
              v-model="replyFormState.message"
              placeholder="Enter your response..."
              :rows="4"
              class="w-full"
            />
          </UFormField>
          <div class="mt-4 flex justify-end gap-2">
            <UButton
              variant="ghost"
              color="neutral"
              @click="replyModal = false"
            >
              Cancel
            </UButton>
            <UButton type="submit" :loading="isSubmitting">
              Send Reply
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal
      v-model:open="showDeleteConfirmation"
      title="Delete Feedback"
      description="This action is irreversible"
    >
      <template #body>
        <div class="flex justify-end gap-2">
          <UButton
            variant="ghost"
            color="neutral"
            label="Cancel"
            @click="showDeleteConfirmation = false"
          />
          <UButton
            color="error"
            :loading="isDeleting"
            label="Delete"
            @click="handleDelete"
          />
        </div>
      </template>
    </UModal>
  </AppContainer>
</template>
