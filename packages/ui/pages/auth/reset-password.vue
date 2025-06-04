<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const { resetPassword } = useAuth()

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

  type Schema = z.output<typeof resetPasswordSchema>

const state = reactive<Partial<Schema>>({
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const token = route.query.token as string
  const { error } = await resetPassword(event.data.password, token)
  if (!error) {
    await router.push('/auth/login')
  }
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
          Enter your new password below.
        </p>
      </div>
      <UForm
        :schema="resetPasswordSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="New Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Reset Password
        </UButton>
      </UForm>
    </div>
  </main>
</template>
