<template>
  <div class="flex w-full items-center sm:w-auto">
    <Ubutton
      class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-100 disabled:opacity-75 sm:w-auto dark:border-gray-600 dark:hover:bg-gray-800"
      :class="{
        'text-blue-500 dark:text-blue-400': localUpvotes.includes(user?.email)
      }"
      :disabled="loading"
      @click="upvote"
    >
      <span
        v-if="loading"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      ></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-up"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      <span>Upvotes {{ localUpvotes.length }}</span>
    </Ubutton>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user } = useUserSession();
const props = defineProps<{
  id: number | string;
  module: string;
  upvotes: string[];
}>();

const localUpvotes = ref<string[]>([]);
const toast = useToast();
const loading = ref(false);

const buttonColor = computed(() =>
  localUpvotes.value.includes(user?.value?.email) ? 'primary' : 'neutral'
);

watch(
  () => props.upvotes,
  (newUpvotes) => {
    if (newUpvotes && newUpvotes.length) {
      localUpvotes.value = [...newUpvotes];
    } else {
      localUpvotes.value = [];
    }
  },
  { immediate: true }
);

async function upvote() {
  try {
    loading.value = true;

    if (loggedIn.value) {
      if (!user?.value?.email) {
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
        if (localUpvotes.value.includes(user.value.email)) {
          localUpvotes.value = localUpvotes.value.filter(
            (email) => email !== user.value.email
          );
        } else {
          localUpvotes.value.push(user.value.email);
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
