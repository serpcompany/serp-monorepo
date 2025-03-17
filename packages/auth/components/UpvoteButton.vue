<template>
  <div>
    <UButton :color="buttonColor" variant="ghost" :loading="loading" icon="i-lucide-arrow-up" @click="upvote" />
    <UBadge>{{ localUpvotes.length }}</UBadge>
  </div>
</template>

<script setup lang="ts">
const { status, data } = useAuth();
const props = defineProps<{
  id: number;
  module: string;
  upvotes: string[];
}>();

const localUpvotes = ref<string[]>([]);
const toast = useToast();
const loading = ref(false);

const buttonColor = computed(() =>
  localUpvotes.value.includes(data?.value?.user?.email) ? 'primary' : 'neutral'
);

watch(
  () => props.upvotes,
  (newUpvotes) => {
    localUpvotes.value = [...newUpvotes];
  },
  { immediate: true }
);

async function upvote() {
  try {
    loading.value = true;

    if (status.value === 'authenticated') {
      if (!data?.value?.user?.email) {
        throw new Error('User not authenticated');
      }

      const { data: response, error } = await useFetch('/api/upvote', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify({ id: props.id, module: props.module })
      });

      if (error.value) {
        throw new Error(`Failed to upvote - ${error.value.message}`);
      }

      if (response.value.message === 'success') {
        if (localUpvotes.value.includes(data.value.user.email)) {
          localUpvotes.value = localUpvotes.value.filter(
            (email) => email !== data.value.user.email
          );
        } else {
          localUpvotes.value.push(data.value.user.email);
        }

        toast.add({
          id: 'upvote-success',
          title: 'Upvoted',
          description: 'Your upvote has been recorded',
          icon: 'check-circle'
        });
      } else {
        toast.add({
          id: 'upvote-error',
          title: 'Error upvoting',
          description: response.value.message,
          icon: 'exclamation-circle'
        });
      }
    } else {
      toast.add({
        id: 'upvote-login',
        title: 'Login required',
        description: 'You need to login to upvote',
        icon: 'exclamation-circle'
      });
    }
  } catch (error) {
    toast.add({
      id: 'upvote-error',
      title: 'Error upvoting',
      description: error.message,
      icon: 'exclamation-circle'
    });
  } finally {
    loading.value = false;
  }
}
</script>
