<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { phoneSchema } from '@serp/db/validations/auth'

  import { z } from 'zod'

  const toast = useToast()
  const { fetch: refreshSession } = useUserSession()

  const otpSchema = z.object({
    phoneNumber: z.string(),
    code: z.string().length(6),
  })

  type PhoneSchema = z.output<typeof phoneSchema>
  type OtpSchema = z.output<typeof otpSchema>

  const mode = ref<'phone' | 'otp'>('phone')
  const loading = ref(false)

  const phoneState = reactive<Partial<PhoneSchema>>({
    phoneNumber: undefined,
  })

  const otpState = reactive<Partial<OtpSchema>>({
    phoneNumber: undefined,
    code: undefined,
  })

  const otpCode = computed({
    get: () => otpState.code?.split('') || [],
    set: (value: string[]) => {
      otpState.code = value.join('')
    },
  })

  async function onPhoneSubmit(event: FormSubmitEvent<PhoneSchema>): Promise<void> {
    try {
      loading.value = true
      await $fetch('/api/auth/phone/login', {
        method: 'POST',
        body: event.data,
      })
      mode.value = 'otp'
      otpState.phoneNumber = event.data.phoneNumber
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

  async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>): Promise<void> {
    try {
      loading.value = true
      await $fetch('/api/auth/phone/verify', {
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
        <template v-if="mode === 'phone'">
          <AuthHeading
            title="Sign in with phone number"
            description="Enter your phone number to receive a verification code"
          />
          <UForm
            :schema="phoneSchema"
            :state="phoneState"
            class="w-full space-y-4"
            @submit="onPhoneSubmit"
          >
            <UFormField label="Phone Number" name="phoneNumber">
              <UInput
                v-model="phoneState.phoneNumber"
                class="w-full"
                size="lg"
                type="tel"
                placeholder="+1234567890"
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
              Send Code
            </UButton>
          </UForm>
        </template>
        <template v-else>
          <AuthHeading
            title="Enter verification code"
            description="We've sent a 6-digit code to your phone"
          />
          <UForm
            :schema="otpSchema"
            :state="otpState"
            class="mx-auto max-w-max space-y-4"
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
        </template>
      </div>
    </div>
  </main>
</template>
