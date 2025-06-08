<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'

  const { user, fetch: refreshSession } = useUserSession()
  const { updateUser, loading, schema } = useUserAccount()

  const selectedFile = ref<File | null>(null)

  const state = reactive({
    name: user.value?.name || '',
    avatarUrl: user.value?.avatarUrl || '',
  })

  async function uploadAvatar(): Promise<string> {
    try {
      if (!selectedFile.value)
        return ''
      const formData = new FormData()
      formData.append('image', selectedFile.value)
      const filePath = await $fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })
      return `/images/${filePath}`
    }
    catch {
      throw new Error('Failed to upload avatar')
    }
  }

  function handleFileSelected(file: File | null): Promise<void> {
    selectedFile.value = file
    if (!file) {
      state.avatarUrl = ''
    }
  }

  async function onSubmit(event: FormSubmitEvent<unknown>): Promise<void> {
    try {
      let filePath = ''

      if (selectedFile.value) {
        filePath = await uploadAvatar()
      }
      else if (state.avatarUrl) {
        filePath = state.avatarUrl
      }
      else {
        filePath = `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
      }

      const userData = {
        ...event.data,
        avatarUrl: filePath,
      }

      await updateUser(userData)
      await refreshSession()
    }
    catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <div>
    <UPageCard
      title="Personal Information"
      description="Your personal information is not shared with anyone."
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="(onSubmit as unknown)"
      >
        <UFormField label="Name" name="name">
          <UInput
            v-model="state.name"
            placeholder="Name"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField label="Email">
          <UInput
            :value="user?.email"
            placeholder="Email"
            class="w-full"
            disabled
            variant="subtle"
            size="lg"
          />
        </UFormField>

        <UFormField label="Account ID">
          <UInput
            :value="user?.id"
            placeholder="Account ID"
            class="w-full"
            disabled
            variant="subtle"
            size="lg"
          />
        </UFormField>

        <UFormField label="Avatar" name="avatar">
          <AppAvatarUploader
            v-model="state.avatarUrl"
            @file-selected="handleFileSelected"
          />
        </UFormField>

        <UButton
          color="neutral"
          label="Save Changes"
          type="submit"
          :disabled="loading"
          :loading="loading"
        />
      </UForm>
    </UPageCard>
  </div>
</template>
