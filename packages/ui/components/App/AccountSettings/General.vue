<script lang="ts" setup>
  import type { FormSubmitEvent } from '#ui/types';

  const { user, fetch: refreshSession } = useUserSession();
  const selectedFile = ref<File | null>(null);
  const { updateUser, loading, schema } = useUserAccount();

  const uploadAvatar = async () => {
    try {
      if (!selectedFile.value) return '';
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const filePath = await $fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      return `/images/${filePath}`;
    } catch {
      throw new Error('Failed to upload avatar');
    }
  };

  const handleFileSelected = (file: File | null) => {
    selectedFile.value = file;
    if (!file) {
      state.avatarUrl = '';
    }
  };

  const state = reactive({
    name: user.value?.name || '',
    avatarUrl: user.value?.avatarUrl || ''
  });

  const onSubmit = async (event: FormSubmitEvent<unknown>) => {
    try {
      let filePath = '';

      if (selectedFile.value) {
        filePath = await uploadAvatar();
      } else if (state.avatarUrl) {
        filePath = state.avatarUrl;
      } else {
        filePath = `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`;
      }

      const userData = {
        ...event.data,
        avatarUrl: filePath
      };

      await updateUser(userData);
      await refreshSession();
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">Personal Information</h3>
      <p class="mt-1 text-sm text-neutral-500">
        Your personal information is not shared with anyone.
      </p>
    </template>
    <UForm
      :schema="schema"
      :state="state"
      class="max-w-md space-y-4"
      @submit="onSubmit as unknown"
    >
      <UFormField label="Avatar" name="avatar">
        <AppAvatarUploader
          v-model="state.avatarUrl"
          @file-selected="handleFileSelected"
        />
      </UFormField>
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
      <UButton
        color="neutral"
        :loading="loading"
        :disabled="loading"
        type="submit"
        label="Save"
      />
    </UForm>
  </UCard>
</template>
