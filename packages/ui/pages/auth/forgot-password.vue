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

  async function onSubmit(event: FormSubmitEvent<PasswordResetSchema>): Promise<void> {
    loading.value = true
    await forgotPassword(event.data.email)
    loading.value = false
  }
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="Reset your password"
          description="Enter your email below to reset your password."
        />
        <UForm
          :schema="emailSchema"
          :state="state"
          class="w-full space-y-4"
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
    </div>
  </main>
</template>
