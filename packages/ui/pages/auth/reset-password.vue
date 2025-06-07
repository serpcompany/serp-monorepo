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

  async function onSubmit(event: FormSubmitEvent<Schema>): Promise<void> {
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
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="Reset your password"
          description="Enter your new password below."
        />
        <UForm
          :schema="resetPasswordSchema"
          :state="state"
          class="w-full space-y-4"
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
    </div>
  </main>
</template>
