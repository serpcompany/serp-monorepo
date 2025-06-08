<script setup lang="ts">
  import { phoneSchema } from '@serp/db/validations/auth'

  const { user, fetch: refreshSession } = useUserSession()
  const toast = useToast()
  const loading = ref(false)
  const resendLoading = ref(false)
  const resendCountdown = ref(0)
  const phoneNumber = ref(user.value?.phoneNumber || '')
  const otpCode = ref<string[]>([])
  const mode = ref(user.value?.phoneNumber ? 'display' : 'input')

  const isValidPhoneNumber = computed(() => {
    try {
      phoneSchema.parse({ phoneNumber: phoneNumber.value })
      return true
    }
    catch {
      return false
    }
  })

  function startResendCountdown(): void {
    resendCountdown.value = 60
    const timer = setInterval(() => {
      resendCountdown.value--
      if (resendCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  async function sendVerificationCode(): Promise<void> {
    try {
      if (!isValidPhoneNumber.value) {
        toast.add({
          title: 'Invalid phone number',
          description:
            'Please enter a valid phone number in E.164 format (e.g. +12125551234)',
          color: 'error',
        })
        return
      }

      loading.value = true
      await $fetch('/api/me/phone/send-verification', {
        method: 'POST',
        body: { phoneNumber: phoneNumber.value },
      })

      mode.value = 'verify'
      startResendCountdown()

      toast.add({
        title: 'Verification code sent',
        description: 'Please check your phone for the verification code',
        color: 'success',
      })
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to send verification code',
        description: (error as any)?.data?.message || 'An error occurred',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  async function verifyCode(): Promise<void> {
    try {
      loading.value = true

      await $fetch('/api/me/phone/verify', {
        method: 'POST',
        body: {
          phoneNumber: phoneNumber.value,
          code: otpCode.value.join(''),
        },
      })

      await refreshSession()
      mode.value = 'display'

      toast.add({
        title: 'Phone number verified',
        description: 'Your phone number has been successfully verified',
        color: 'success',
      })
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to verify code',
        description: (error as any)?.data?.message || 'An error occurred',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  async function removePhoneNumber(): Promise<void> {
    try {
      loading.value = true

      await $fetch('/api/me/phone', {
        method: 'DELETE',
      })

      await refreshSession()
      phoneNumber.value = ''
      mode.value = 'input'

      toast.add({
        title: 'Phone number removed',
        description: 'Your phone number has been successfully removed',
        color: 'success',
      })
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to remove phone number',
        description: (error as any)?.data?.message || 'An error occurred',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <div>
    <UPageCard
      title="Phone Number"
      description="Your phone number is not shared with anyone."
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle">
      <template v-if="mode === 'input'">
        <UFormField
          label="Phone Number"
          help="Enter your phone number in E.164 format (e.g. +12125551234)"
          class="w-full"
        >
          <UInput
            v-model="phoneNumber"
            placeholder="+1234567890"
            class="w-full"
            size="lg"
            type="tel"
          />
        </UFormField>
        <div class="flex items-center gap-2">
          <UButton
            color="neutral"
            label="Verify Phone Number"
            :disabled="loading || !isValidPhoneNumber"
            :loading="loading"
            @click="sendVerificationCode"
          />

          <UButton
            v-if="user?.phoneNumber"
            color="error"
            label="Remove"
            variant="ghost"
            :disabled="loading"
            :loading="loading"
            @click="removePhoneNumber"
          />
        </div>
      </template>
      <template v-else-if="mode === 'verify'">
        <p class="text-sm">
          We've sent a verification code to
          <span class="font-medium text-highlighted">{{ phoneNumber }}</span>
        </p>

        <UFormField label="Verification Code">
          <UPinInput
            v-model="otpCode"
            :length="6"
            size="lg"
            otp
            type="number"
            placeholder="○"
          />
        </UFormField>

        <div class="flex items-center gap-2">
          <UButton
            color="neutral"
            :loading="loading"
            :disabled="loading || otpCode.length !== 6"
            label="Verify"
            @click="verifyCode"
          />

          <UButton
            color="neutral"
            variant="ghost"
            :loading="resendLoading"
            :disabled="resendLoading || resendCountdown > 0"
            @click="sendVerificationCode"
          >
            {{
              resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend Code"
            }}
          </UButton>

          <UButton
            color="neutral"
            variant="ghost"
            :disabled="loading"
            label="Cancel"
            @click="mode = 'input'"
          />
        </div>
      </template>
      <template v-else-if="mode === 'display'">
        <UFormField label="Phone Number" class="w-full">
          <UInput
            :value="user?.phoneNumber"
            class="w-full"
            size="lg"
            disabled
            variant="subtle"
          />
        </UFormField>

        <UButton
          color="neutral"
          label="Change Phone Number"
          @click="mode = 'input'"
        />
      </template>
    </UPageCard>
  </div>
</template>
