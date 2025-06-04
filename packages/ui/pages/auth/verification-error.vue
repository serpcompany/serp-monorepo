<script setup lang="ts">
const route = useRoute()
const errorMessage = ref(
  route.query.message || 'An error occurred during email verification.',
)
const hasEmail = computed(() => !!route.query.email)
const email = ref((route.query.email as string) || '')
const { resendVerification } = useAuth()

async function resend() {
  await resendVerification(email.value)
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <div class="text-center">
        <p class="text-lg font-bold">
          Email Verification Error
        </p>
        <p class="mt-2 text-sm text-neutral-500">
          {{ errorMessage }}
        </p>
      </div>

      <div v-if="hasEmail" class="mt-8">
        <UButton
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
          loading-auto
          @click="resend"
        >
          Resend Verification Email
        </UButton>
      </div>

      <div class="mt-4 text-center">
        <UButton
          padding="none"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          to="/auth/login"
          variant="link"
          label="Back to Login"
          class="font-normal"
          :ui="{
            trailingIcon: 'size-4',
          }"
          square
        />
      </div>
    </div>
  </main>
</template>
