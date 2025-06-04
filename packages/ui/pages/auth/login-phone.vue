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

async function onPhoneSubmit(event: FormSubmitEvent<PhoneSchema>) {
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
      description: (error as unknown).data.message,
      color: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
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
      description: (error as unknown).data.message,
      color: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <template v-if="mode === 'phone'">
        <div class="text-center">
          <p class="text-lg font-bold">
            Sign in with phone number
          </p>
          <p class="text-sm text-neutral-500">
            Enter your phone number to receive a verification code
          </p>
        </div>
        <UForm
          :schema="phoneSchema"
          :state="phoneState"
          class="mt-8 space-y-4"
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
      <div v-else>
        <div class="text-center">
          <p class="text-lg font-bold">
            Enter verification code
          </p>
          <p class="text-sm text-neutral-500">
            We've sent a 6-digit code to your phone
          </p>
        </div>
        <UForm
          :schema="otpSchema"
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
  </main>
</template>
