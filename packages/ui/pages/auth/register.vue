<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'

  import type { z } from 'zod'
  import { registerUserSchema } from '@serp/db/validations/auth'
  import middleware from '../../middleware/invite-email'

  definePageMeta({
    middleware: [middleware],
  })
  type Schema = z.output<typeof registerUserSchema>

  const registered = ref(false)
  const loading = ref(false)
  const sentemail = ref(false)
  const { register } = useAuth()
  const inviteEmail = useState<string>('inviteEmail')
  const inviteToken = useState<string>('inviteToken')

  const state = reactive<Partial<Schema>>({
    email: inviteEmail.value || '',
    password: undefined,
    name: undefined,
  })

  const runtimeConfig = useRuntimeConfig()
  const siteName = runtimeConfig.public.siteName || 'SERP'

  async function onSubmit(event: FormSubmitEvent<Schema>): Promise<any> {
    loading.value = true
    try {
      const { error, emailVerified } = await register({
        ...event.data,
        inviteToken: inviteToken.value,
      })
      if (emailVerified && !error) {
        // If this registration was from an invite, set a cookie to track that
        if (inviteToken.value) {
          const fromInviteCookie = useCookie('from-invite', {
            maxAge: 60 * 60, // 1 hour
            secure: true,
            sameSite: 'lax',
          })
          fromInviteCookie.value = 'true'
        }

        // Ensure client has session data and navigate to the dashboard
        // See https://github.com/atinux/nuxt-auth-utils/issues/357
        await nextTick()
        await useUserSession().fetch()
        await navigateTo('/dashboard')
      }
      else {
        if (!error) {
          registered.value = true
        }
        else {
          sentemail.value = true
        }
      }
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <main class="relative flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <template v-if="!registered">
          <AuthHeading
            :title="`Get Started with ${siteName}`"
            description="Already have an account?"
            link-label="Login"
            link-to="/auth/login"
          />
          <UForm
            :schema="registerUserSchema"
            :state="state"
            class="w-full space-y-4"
            @submit="onSubmit"
          >
            <UFormField label="Name" name="name">
              <UInput
                v-model="state.name"
                class="w-full"
                size="lg"
                autocomplete="given-name"
              />
            </UFormField>
            <UFormField label="Email" name="email">
              <UInput
                v-model="state.email"
                class="w-full"
                size="lg"
                autocomplete="email"
              />
            </UFormField>

            <UFormField label="Password" name="password">
              <UInput
                v-model="state.password"
                type="password"
                class="w-full"
                size="lg"
                autocomplete="new-password"
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
          <NuxtLink to="/auth/all-auth-options" class="text-sm text-muted">
            All auth options
          </NuxtLink>
        </template>
        <template v-else>
          <UCard :ui="{ body: 'space-y-4' }">
            <UIcon name="lucide:mail-check" class="size-5" />
            <div>
              <p class="text-lg font-bold">
                Check your email
              </p>
              <p class="text-sm text-muted">
                We've sent you an email to verify your account.
              </p>
            </div>
          </UCard>
        </template>
      </div>
    </div>
  </main>
</template>
