<script setup lang="ts">
  const { loading, updatePassword, passwordSchema } = useUserAccount()
  const state = ref({ password: '' })

  async function onSubmit() {
    await updatePassword(state.value.password)
    state.value.password = ''
  }
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">
        Security
      </h3>
      <p class="mt-1 text-sm text-neutral-500">
        Your credentials are encrypted and stored securely.
      </p>
    </template>
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
  </UCard>
</template>
