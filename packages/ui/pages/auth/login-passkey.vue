<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import type { z } from 'zod'
  import { emailSchema } from '@serp/db/validations/auth'

  const toast = useToast()
  const { fetch: refreshSession } = useUserSession()
  const { authenticateWithPasskey } = usePasskeys()
  const loading = ref(false)

  type LoginSchema = z.output<typeof emailSchema>
  const state = reactive<Partial<LoginSchema>>({
    email: undefined,
  })

  async function onSubmit(event: FormSubmitEvent<LoginSchema>): Promise<void> {
    loading.value = true
    const success = await authenticateWithPasskey(event.data.email)
    if (success) {
      await refreshSession()
      toast.add({
        title: 'Logged in successfully',
        color: 'success',
      })
      await navigateTo('/dashboard')
    }
    loading.value = false
  }
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="Sign in to your account"
          description="Welcome back! Please sign in to continue."
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
            icon="i-lucide-fingerprint"
          >
            Sign in with Passkey
          </UButton>
        </UForm>
      </div>
    </div>
  </main>
</template>
