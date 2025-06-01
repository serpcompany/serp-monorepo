<script setup lang="ts">
  interface Props {
    id: number | string;
    upvotes?: number;
    downvotes?: number;
    usersCurrentVote?: number | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    downvotes: 0,
    upvotes: 0,
    usersCurrentVote: null
  });

  const toast = useToast();
  const { loggedIn, user } = useUserSession();

  const loading = ref(false);
  const { upvotes, downvotes, usersCurrentVote: currentVote } = toRefs(props);

  watch(
    () => props.upvotes,
    (newValue) => {
      upvotes.value = newValue;
    },
    { immediate: true }
  );

  watch(
    () => props.downvotes,
    (newValue) => {
      downvotes.value = newValue;
    },
    { immediate: true }
  );

  watch(
    () => props.usersCurrentVote,
    (newValue) => {
      currentVote.value = newValue;
    },
    { immediate: true }
  );

  async function vote(direction: 1 | -1) {
    try {
      loading.value = true;

      if (!loggedIn.value) {
        toast.add({
          id: 'vote-login',
          title: 'Login required',
          description: 'You need to login to vote',
          icon: 'lucide:info'
        });
        return;
      }

      if (!user?.value?.id) throw new Error('User not authenticated');

      const { data: response, error } = await useFetch('/api/vote', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: { id: props.id, direction }
      });

      if (error.value) throw new Error(error.value.message);
      if (response.value.message !== 'success')
        throw new Error(response.value.message);

      if (currentVote.value === direction) {
        if (direction === 1) upvotes.value--;
        else downvotes.value--;
        currentVote.value = null;
      } else {
        if (direction === 1) {
          upvotes.value++;
          if (currentVote.value === -1) downvotes.value--;
        } else {
          downvotes.value++;
          if (currentVote.value === 1) upvotes.value--;
        }
        currentVote.value = direction;
      }

      toast.add({
        id: 'vote-success',
        title: direction === 1 ? 'Upvoted' : 'Downvoted',
        description: 'Your vote has been recorded',
        icon: 'lucide:circle-check'
      });
    } catch (err) {
      // Revert optimistic updates on error
      upvotes.value = props.upvotes;
      downvotes.value = props.downvotes;
      currentVote.value = props.usersCurrentVote;

      toast.add({
        id: 'vote-error',
        title: 'Error voting',
        description: (err as Error).message,
        icon: 'lucide:alert-circle'
      });
    } finally {
      loading.value = false;
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
