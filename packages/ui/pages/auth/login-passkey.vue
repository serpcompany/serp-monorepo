<script setup lang="ts">
  import type { z } from 'zod';
  import type { FormSubmitEvent } from '#ui/types';
  import { emailSchema } from '@serp/db/validations/auth';

  const toast = useToast();
  const { fetch: refreshSession } = useUserSession();
  const { authenticateWithPasskey } = usePasskeys();
  const loading = ref(false);

  type LoginSchema = z.output<typeof emailSchema>;
  const state = reactive<Partial<LoginSchema>>({
    email: undefined
  });

  const onSubmit = async (
    event: FormSubmitEvent<LoginSchema>
  ): Promise<void> => {
    loading.value = true;
    const success = await authenticateWithPasskey(event.data.email);
    if (success) {
      await refreshSession();
      toast.add({
        title: 'Logged in successfully',
        color: 'success'
      });
      await navigateTo('/dashboard');
    }
    loading.value = false;
  };
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <UForm
        :schema="emailSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
          icon="i-lucide-fingerprint"
        >
          Sign in with Passkey
        </UButton>
      </UForm>
    </div>
  </main>
</template>
