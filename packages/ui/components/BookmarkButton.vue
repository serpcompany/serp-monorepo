<script setup lang="ts">
const props = defineProps<{
  id: number | string
  module: string
  bookmarks: string[] | []
}>()
const { loggedIn, user } = useUserSession()
const localBookmark = ref<string[]>([])
const toast = useToast()
const loading = ref(false)

watch(
  () => props.bookmarks,
  (newBookmark) => {
    if (newBookmark && newBookmark.length) {
      localBookmark.value = [...newBookmark]
    }
    else {
      localBookmark.value = []
    }
  },
  { immediate: true },
)

async function bookmark() {
  try {
    loading.value = true

    if (loggedIn.value) {
      if (!user?.value?.email) {
        throw new Error('User not authenticated')
      }

      const { data: response, error } = await useFetch('/api/bookmark', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify({ id: props.id, module: props.module }),
      })

      if (error.value) {
        throw new Error(`Failed to bookmark - ${error.value.message}`)
      }

      if (response.value.message === 'success') {
        if (localBookmark.value.includes(user.value.email)) {
          localBookmark.value = localBookmark.value.filter(
            email => email !== user.value.email,
          )
        }
        else {
          localBookmark.value.push(user.value.email)
        }

        toast.add({
          id: 'bookmark-success',
          title: 'Bookmarked',
          description: 'Your bookmark has been recorded',
          icon: 'check-circle',
        })
      }
      else {
        toast.add({
          id: 'bookmark-error',
          title: 'Error bookmarking',
          description: response.value.message,
          icon: 'exclamation-circle',
        })
      }
    }
    else {
      toast.add({
        id: 'bookmark-login',
        title: 'Login required',
        description: 'You need to login to bookmark',
        icon: 'exclamation-circle',
      })
    }
  }
  catch (error) {
    toast.add({
      id: 'bookmark-error',
      title: 'Error bookmarking',
      description: (error as Error).message,
      icon: 'exclamation-circle',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex w-full items-center sm:w-auto">
    <UButton :disabled="loading" variant="outline" @click="bookmark">
      <span
        v-if="loading"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      />
      <span v-else class="flex items-center text-xl">
        <UIcon name="i-lucide-bookmark" class="mr-2 size-5" />
        <span class="text-lg">{{ localBookmark.length }}</span>
      </span>
    </UButton>
  </div>
</template>
