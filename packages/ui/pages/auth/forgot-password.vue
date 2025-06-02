<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { z } from 'zod'
import { emailSchema } from '@serp/db/validations/auth'

  type PasswordResetSchema = z.output<typeof emailSchema>
const loading = ref(false)
const { forgotPassword } = useAuth()

const state = reactive<Partial<PasswordResetSchema>>({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<PasswordResetSchema>) {
  loading.value = true
  await forgotPassword(event.data.email)
  loading.value = false
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <div class="text-center">
        <p class="text-lg font-bold">
          Reset your password
        </p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Enter your email below to reset your password.
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
        >
          Send reset instructions
        </UButton>
      </UForm>
    </div>
  </main>
</template>
