<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import type { z } from 'zod'
  import { loginUserSchema } from '@serp/db/validations/auth'

  definePageMeta({
    middleware: ['invite-email'],
  })
  type Schema = z.output<typeof loginUserSchema>

  const loading = ref(false)
  const { login } = useAuth()
  const inviteEmail = useState<string>('inviteEmail')

  const state = reactive<Partial<Schema>>({
    email: inviteEmail.value,
    password: undefined,
  })

  const runtimeConfig = useRuntimeConfig()
  const siteName = runtimeConfig.public.siteName || 'SERP'

  async function onSubmit(event: FormSubmitEvent<Schema>): Promise<any> {
    loading.value = true
    const { error } = await login(event.data.email, event.data.password)
    loading.value = false

    if (!error) {
      return await navigateTo('dashboard')
    }
  }
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          :title="`Sign in to ${siteName}`"
          description="Dont have an account?"
          link-label="Get Started"
          link-to="/auth/register"
        />
        <UForm
          :schema="loginUserSchema"
          :state="state"
          class="w-full space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              class="w-full"
              size="lg"
              tabindex="0"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              class="w-full"
              size="lg"
              tabindex="0"
            />
            <template #hint>
              <UButton
                variant="link"
                to="/auth/forgot-password"
                label="Forgot password?"
                size="xs"
                color="neutral"
                tabindex="0"
              />
            </template>
          </UFormField>

          <UButton
            :loading="loading"
            type="submit"
            block
            color="neutral"
            class="cursor-pointer"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
        <USeparator label="OR" />
        <div class="grid grid-cols-2 gap-2">
          <AuthSocialLoginButton
            label="Google"
            icon="logos:google-icon"
            provider="google"
          />
          <AuthSocialLoginButton
            label="Github"
            icon="mdi:github"
            provider="github"
          />
        </div>
      </div>
    </div>
  </main>
</template>
