<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui';
  import * as z from 'zod';

  const { logout } = useAuth();
  const deleteAccountModal = ref(false);
  const isDeleting = ref(false);
  const toast = useToast();

  const schema = z.object({
    confirmation: z.string().refine((val) => val === 'delete', {
      message: "Please type 'delete' to confirm",
    }),
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    confirmation: undefined,
  });

  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    try {
      isDeleting.value = true;
      await $fetch('/api/me/delete-account', {
        method: 'DELETE',
      });
      toast.add({
        title: 'Account Deleted',
        description: 'Your account has been successfully deleted.',
        color: 'success',
      });
      await logout();
      await navigateTo('/');
    } catch {
      toast.add({
        title: 'Error',
        description: 'Failed to delete account. Please try again.',
        color: 'error',
      });
    } finally {
      isDeleting.value = false;
      deleteAccountModal.value = false;
    }
  }
</script>

<template>
  <div
    class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-950 dark:bg-red-950/20"
  >
    <h3 class="font-medium text-red-950 dark:text-red-50">Danger Zone</h3>
    <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
      Delete your account. This action is irreversible and cannot be undone. All
      data associated including images will be deleted.
    </p>
    <UButton
      class="mt-4"
      color="error"
      label="Proceed"
      @click="deleteAccountModal = true"
    />
  </div>
  <UModal
    v-model:open="deleteAccountModal"
    title="Delete Account"
    description="Please confirm your intent to delete your account."
  >
    <template #body>
      <UForm :schema="schema" :state="state" class="mb-4" @submit="onSubmit">
        <UFormField label="Please type 'delete' to confirm" name="confirmation">
          <UInput
            v-model="state.confirmation"
            class="w-full"
            size="lg"
            variant="subtle"
          />
        </UFormField>

        <div class="mt-6 flex justify-end gap-2">
          <UButton
            label="Cancel"
            variant="ghost"
            color="neutral"
            :loading="isDeleting"
            @click="deleteAccountModal = false"
          />
          <UButton
            type="submit"
            label="Proceed"
            color="error"
            :loading="isDeleting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
