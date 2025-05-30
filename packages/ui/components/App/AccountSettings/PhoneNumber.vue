<script lang="ts" setup>
  import { phoneSchema } from '@serp/db/validations/auth';

  const { user, fetch: refreshSession } = useUserSession();
  const toast = useToast();
  const loading = ref(false);
  const resendLoading = ref(false);
  const resendCountdown = ref(0);
  const phoneNumber = ref(user.value?.phoneNumber || '');
  const otpCode = ref<string[]>([]);
  const mode = ref(user.value?.phoneNumber ? 'display' : 'input');

  const isValidPhoneNumber = computed(() => {
    try {
      phoneSchema.parse({ phoneNumber: phoneNumber.value });
      return true;
    } catch {
      return false;
    }
  });

  const startResendCountdown = () => {
    resendCountdown.value = 60;
    const timer = setInterval(() => {
      resendCountdown.value--;
      if (resendCountdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const sendVerificationCode = async () => {
    try {
      if (!isValidPhoneNumber.value) {
        toast.add({
          title: 'Invalid phone number',
          description:
            'Please enter a valid phone number in E.164 format (e.g. +12125551234)',
          color: 'error'
        });
        return;
      }

      loading.value = true;
      await $fetch('/api/me/phone/send-verification', {
        method: 'POST',
        body: { phoneNumber: phoneNumber.value }
      });

      mode.value = 'verify';
      startResendCountdown();

      toast.add({
        title: 'Verification code sent',
        description: 'Please check your phone for the verification code',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Failed to send verification code',
        description: (error as unknown)?.data?.message || 'An error occurred',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };

  const verifyCode = async () => {
    try {
      loading.value = true;

      await $fetch('/api/me/phone/verify', {
        method: 'POST',
        body: {
          phoneNumber: phoneNumber.value,
          code: otpCode.value.join('')
        }
      });

      await refreshSession();
      mode.value = 'display';

      toast.add({
        title: 'Phone number verified',
        description: 'Your phone number has been successfully verified',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Failed to verify code',
        description: (error as unknown)?.data?.message || 'An error occurred',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };

  const removePhoneNumber = async () => {
    try {
      loading.value = true;

      await $fetch('/api/me/phone', {
        method: 'DELETE'
      });

      await refreshSession();
      phoneNumber.value = '';
      mode.value = 'input';

      toast.add({
        title: 'Phone number removed',
        description: 'Your phone number has been successfully removed',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Failed to remove phone number',
        description: (error as unknown)?.data?.message || 'An error occurred',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">Phone Number</h3>
      <p class="mt-1 text-sm text-neutral-500">
        Your phone number is not shared with anyone.
      </p>
    </template>

    <div v-if="mode === 'input'" class="max-w-md space-y-4">
      <UFormField
        label="Phone Number"
        help="Enter your phone number in E.164 format (e.g. +12125551234)"
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
          :loading="loading"
          :disabled="loading || !isValidPhoneNumber"
          label="Verify Phone Number"
          @click="sendVerificationCode"
        />

        <UButton
          v-if="user?.phoneNumber"
          color="error"
          variant="ghost"
          :loading="loading"
          :disabled="loading"
          label="Remove"
          @click="removePhoneNumber"
        />
      </div>
    </div>

    <div v-else-if="mode === 'verify'" class="max-w-md space-y-4">
      <p class="text-sm">
        We've sent a verification code to
        <span class="font-medium">{{ phoneNumber }}</span>
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
            resendCountdown > 0 ? `Resend (${resendCountdown}s)` : 'Resend Code'
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
    </div>

    <div v-else-if="mode === 'display'" class="max-w-md space-y-4">
      <UFormField label="Phone Number">
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
    </div>
  </UCard>
</template>
