<script setup lang="ts">
interface Props {
  id: number | string
  upvotes: number
  downvotes: number
  usersCurrentVote?: number | null
}

const props = defineProps<Props>()
const { upvotes, downvotes } = toRefs(props)
const currentVote = toRef(props, 'usersCurrentVote')

const toast = useToast()
const { loggedIn, user } = useUserSession()
const loading = ref(false)

async function vote(direction: 1 | -1) {
  try {
    loading.value = true
    if (!loggedIn.value) {
      toast.add({
        id: 'vote-login',
        title: 'Login required',
        description: 'You need to login to vote',
        icon: 'lucide:info',
      })
      loading.value = false
      return
    }

    if (!user?.value?.id)
      throw new Error('User not authenticated')

    const { data: response, error } = await useFetch('/api/vote', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: { id: props.id, direction },
    })

    if (error.value)
      throw new Error(error.value.message)
    if (response.value.message !== 'success')
      throw new Error(response.value.message)

    if (currentVote.value === direction) {
      if (direction === 1)
        upvotes.value--
      else downvotes.value--
      currentVote.value = null
    }
    else {
      if (direction === 1) {
        upvotes.value++
        if (currentVote.value === -1)
          downvotes.value--
      }
      else {
        downvotes.value++
        if (currentVote.value === 1)
          upvotes.value--
      }
      currentVote.value = direction
    }

    toast.add({
      id: 'vote-success',
      title: direction === 1 ? 'Upvoted' : 'Downvoted',
      description: 'Your vote has been recorded',
      icon: 'lucide:circle-check',
    })
  }
  catch (err) {
    toast.add({
      id: 'vote-error',
      title: 'Error voting',
      description: (err as Error).message,
      icon: 'lucide:info',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UButtonGroup>
    <UButton
      :disabled="loading"
      :color="currentVote === 1 ? 'secondary' : 'neutral'"
      variant="outline"
      icon="lucide:arrow-big-up"
      @click="vote(1)"
    />
    <UBadge
      :label="upvotes - downvotes"
      variant="outline"
      color="neutral"
      class="w-8 justify-center text-sm"
    />
    <UButton
      :disabled="loading"
      :color="currentVote === -1 ? 'error' : 'neutral'"
      variant="outline"
      icon="lucide:arrow-big-down"
      @click="vote(-1)"
    />
  </UButtonGroup>
</template>
