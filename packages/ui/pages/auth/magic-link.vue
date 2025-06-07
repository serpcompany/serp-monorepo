<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import type { z } from 'zod'
  import { emailSchema, otpLoginSchema } from '@serp/db/validations/auth'

  type LoginSchema = z.output<typeof emailSchema>
  type OtpSchema = z.output<typeof otpLoginSchema>

  const toast = useToast()
  const { fetch: refreshSession } = useUserSession()

  const mode = ref<'login' | 'otp'>('login')
  const loading = ref(false)

  const loginState = reactive<Partial<LoginSchema>>({
    email: undefined,
  })

  const otpState = reactive<Partial<OtpSchema>>({
    email: undefined,
    code: undefined,
  })

  const otpCode = computed({
    get: () => otpState.code?.split('') || [],
    set: (value: string[]) => {
      otpState.code = value.join('')
    },
  })

  async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>): Promise<any> {
    try {
      loading.value = true
      await $fetch('/api/auth/magic-link/login', {
        method: 'POST',
        body: event.data,
      })
      mode.value = 'otp'
      otpState.email = event.data.email
    }
    catch (error) {
      toast.add({
        title: 'Failed to send verification code',
        description: (error as any).data.message,
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>): Promise<any> {
    try {
      loading.value = true
      await $fetch('/api/auth/magic-link/verify-otp', {
        method: 'POST',
        body: event.data,
      })
      await refreshSession()
      await navigateTo('/dashboard')
    }
    catch (error) {
      toast.add({
        title: 'Failed to verify code',
        description: (error as any).data.message,
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <template v-if="mode === 'login'">
          <AuthHeading
            title="Sign in to your account"
            description="Welcome back! Please sign in to continue."
          />
          <UForm
            :schema="emailSchema"
            :state="loginState"
            class="w-full space-y-4"
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
          <AuthHeading
            title="We've sent you a 6-digit code"
            description="Please check your email for the code and enter it below."
          />
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
    </div>
  </main>
</template>
