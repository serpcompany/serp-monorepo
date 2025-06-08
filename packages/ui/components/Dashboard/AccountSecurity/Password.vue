<script setup lang="ts">
  const { loading, updatePassword, passwordSchema } = useUserAccount()
  const state = ref({ password: '' })

  async function onSubmit(): Promise<void> {
    await updatePassword(state.value.password)
    state.value.password = ''
  }
</script>

<template>
  <div>
    <UPageCard
      title="Password"
      description="Your credentials are encrypted and stored securely."
      variant="naked"
      class="mb-4"
    />
    <UPageCard variant="subtle">
      <UForm
        :schema="passwordSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="New Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Enter new password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          color="neutral"
          :loading="loading"
          :disabled="loading"
          type="submit"
          label="Update Password"
        />
      </UForm>
    </UPageCard>
  </div>
</template>
