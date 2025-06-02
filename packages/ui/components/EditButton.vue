<script setup lang="ts">
  const props = defineProps<{
    id: number | string;
  }>();
  const { loggedIn } = useUserSession();
  const toast = useToast();
</script>

<template>
  <div class="flex w-full items-center sm:w-auto">
    <UButton
      class="bg-primary-50 disabled:bg-secondary-500 dark:disabled:bg-secondary-500 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:text-white disabled:opacity-90 sm:w-auto dark:border-neutral-600 dark:text-neutral-700 dark:hover:bg-neutral-100 dark:disabled:text-white"
      @click="
        () => {
          if (loggedIn) {
            navigateTo(`/users/manage/${props.id}`);
          } else {
            toast.add({
              id: 'need-logged-in',
              title: 'Need to be logged in',
              description: 'You need to be logged in to edit',
              icon: 'info',
            });
          }
        }
      "
    >
      Submit Edit
    </UButton>
  </div>
</template>
