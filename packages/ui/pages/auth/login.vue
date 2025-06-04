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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await login(event.data)
  if (!error) {
    await navigateTo('/dashboard')
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
          Sign in to {{ siteName }}
        </p>
        <p class="text-sm text-neutral-500">
          Dont have an account?
          <UButton
            padding="none"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            to="/auth/register"
            variant="link"
            label="Get Started"
            class="font-normal"
            :ui="{
              trailingIcon: 'size-4',
            }"
            square
          />
        </p>
      </div>
      <UForm
        :schema="loginUserSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" tabindex="1" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
            tabindex="2"
          />
          <template #hint>
            <UButton
              variant="link"
              to="/auth/forgot-password"
              label="Forgot password?"
              size="xs"
              color="neutral"
              class="text-neutral-500"
              tabindex="3"
            />
          </template>
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
      <USeparator label="OR" />
      <div class="grid grid-cols-2 gap-2">
        <AuthSocialLoginButton
          label="Google"
          icon="i-logos-google-icon"
          provider="google"
        />
        <AuthSocialLoginButton
          label="Github"
          icon="i-mdi-github"
          provider="github"
        />
      </div>
    </div>
  </main>
</template>
