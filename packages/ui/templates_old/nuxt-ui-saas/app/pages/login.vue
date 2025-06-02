<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Login',
})

const toast = useToast()

const fields = [
  {
    name: 'email',
    type: 'text' as const,
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Enter your password',
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox' as const,
  },
]

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' })
    },
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub' })
    },
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

  type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  // eslint-disable-next-line no-console
  console.log('Submitted', payload)
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    title="Welcome back"
    icon="i-lucide-lock"
    @submit="onSubmit"
  >
    <template #description>
      Don't have an account?
      <ULink to="/signup" class="font-medium text-(--ui-primary)">
        Sign up
      </ULink>
      .
    </template>

    <template #password-hint>
      <ULink to="/" class="font-medium text-(--ui-primary)" tabindex="-1">
        Forgot password?
      </ULink>
    </template>

    <template #footer>
      By signing in, you agree to our
      <ULink to="/" class="font-medium text-(--ui-primary)">
        Terms of Service
      </ULink>
      .
    </template>
  </UAuthForm>
</template>
