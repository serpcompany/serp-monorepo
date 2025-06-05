<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'

  const toast = useToast()
  const { teamSchema, updateTeam, currentTeam, loading } = useTeam()
  const selectedFile = ref<File | null>(null)

  const state = reactive({
    name: currentTeam.value.name || '',
    slug: currentTeam.value.slug || '',
    logo: currentTeam.value.logo || '',
  })

  function handleFileSelected(file: File | null) {
    selectedFile.value = file
    if (!file) {
      state.logo = ''
    }
  }

  async function uploadLogo() {
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
      throw new Error('Failed to upload logo')
    }
  }

  async function onSubmit(event: FormSubmitEvent<typeof teamSchema>) {
    if (!currentTeam.value.id)
      return

    try {
      let filePath = ''

      if (selectedFile.value) {
        filePath = await uploadLogo()
      }
      else if (state.logo) {
        filePath = state.logo
      }
      else {
        filePath = `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
      }

      const teamData = {
        ...event.data,
        logo: filePath,
      }

      await updateTeam(currentTeam.value.id, teamData)
    }
    catch (error) {
      toast.add({
        title: 'Failed to update team',
        description: (error as unknown).statusMessage,
        color: 'error',
      })
    }
  }

  const host = useRuntimeConfig().public.steUrl
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">
        General Settings
      </h3>
    </template>

    <UForm
      :schema="teamSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit as unknown"
    >
      <UFormField
        label="Team logo (Recommended size: 1 MB, 1:1 aspect ratio)"
        name="logo"
      >
        <AppAvatarUploader
          v-model="state.logo"
          @file-selected="handleFileSelected"
        />
      </UFormField>

      <UFormField required label="Team name" name="name">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>

      <UFormField label="Team URL" :help="`${host}/dashboard/${state.slug}`">
        <UInput
          v-model="state.slug"
          variant="subtle"
          class="w-full"
          disabled
        />
      </UFormField>

      <UFormField label="Team ID">
        <UInput
          :value="currentTeam?.id || ''"
          variant="subtle"
          class="w-full"
          disabled
        />
      </UFormField>

      <UButton
        type="submit"
        color="neutral"
        :loading="loading"
        :disabled="loading"
      >
        Save Changes
      </UButton>
    </UForm>
  </UCard>
</template>
