<script setup lang="ts">
  import type { z } from 'zod';
  import type { FormSubmitEvent } from '#ui/types';
  import { emailSchema, otpLoginSchema } from '@serp/db/validations/auth';

  type LoginSchema = z.output<typeof emailSchema>;
  type OtpSchema = z.output<typeof otpLoginSchema>;

  const toast = useToast();
  const { fetch: refreshSession } = useUserSession();

  const mode = ref<'login' | 'otp'>('login');
  const loading = ref(false);

  const loginState = reactive<Partial<LoginSchema>>({
    email: undefined
  });

  const otpState = reactive<Partial<OtpSchema>>({
    email: undefined,
    code: undefined
  });

  const otpCode = computed({
    get: () => otpState.code?.split('') || [],
    set: (value: string[]) => {
      otpState.code = value.join('');
    }
  });

  async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
    try {
      loading.value = true;
      await $fetch('/api/auth/magic-link/login', {
        method: 'POST',
        body: event.data
      });
      mode.value = 'otp';
      otpState.email = event.data.email;
    } catch (error) {
      toast.add({
        title: 'Failed to send verification code',
        description: (error as unknown).data.message,
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  }

  async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
    try {
      loading.value = true;
      await $fetch('/api/auth/magic-link/verify-otp', {
        method: 'POST',
        body: event.data
      });
      await refreshSession();
      await navigateTo('/dashboard');
    } catch (error) {
      toast.add({
        title: 'Failed to verify code',
        description: (error as unknown).data.message,
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <template v-if="mode === 'login'">
        <div class="text-center">
          <p class="text-lg font-bold">Sign in to your account</p>
          <p class="text-sm text-neutral-500">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <UForm
          :schema="emailSchema"
          :state="loginState"
          class="mt-8 space-y-4"
          @submit="onLoginSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput v-model="loginState.email" class="w-full" size="lg" />
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            color="neutral"
            class="cursor-pointer"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
      </template>
      <div v-else>
        <div class="text-center">
          <p class="text-lg font-bold">We've sent you a 6-digit code</p>
          <p class="text-sm text-neutral-500">
            Please check your email for the code and enter it below.
          </p>
        </div>
        <UForm
          :schema="otpLoginSchema"
          :state="otpState"
          class="mx-auto mt-8 max-w-max space-y-4"
          @submit="onOtpSubmit"
        >
          <UFormField name="code">
            <UPinInput
              v-model="otpCode"
              :length="6"
              size="lg"
              otp
              type="number"
              placeholder="○"
              class="justify-center"
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="loading"
            color="neutral"
            class="cursor-pointer"
            size="lg"
            block
          >
            Verify Code
          </UButton>
        </UForm>
      </div>
    </div>
  </main>
</template>
