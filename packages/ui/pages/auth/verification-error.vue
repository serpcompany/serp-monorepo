<script setup lang="ts">
  const route = useRoute()
  const errorMessage = ref(
    route.query.message || 'An error occurred during email verification.',
  )
  const hasEmail = computed(() => !!route.query.email)
  const email = ref((route.query.email as string) || '')
  const { resendVerification } = useAuth()

  async function resend(): Promise<void> {
    await resendVerification(email.value)
  }
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="Email Verification Error"
          :description="errorMessage"
        />

        <template v-if="hasEmail">
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
        </template>

        <UButton
          color="neutral"
          to="/auth/login"
          variant="link"
          label="Back to Login"
          class="font-normal p-0"
          :ui="{
            trailingIcon: 'size-4',
          }"
          square
        />
      </div>
    </div>
  </main>
</template>
