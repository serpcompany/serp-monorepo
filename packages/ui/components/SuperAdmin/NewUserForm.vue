<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'
import { FetchError } from 'ofetch'
import * as z from 'zod'

const emit = defineEmits(['user-created'])
const loading = ref(false)
const { copy, copied } = useClipboard({
  copiedDuring: 3000,
})

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  emailVerified: z.boolean().optional(),
  avatarUrl: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    )
    .optional(),
})

  type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  phoneNumber: undefined,
  password: undefined,
  emailVerified: false,
  avatarUrl: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    let filePath = ''

    if (selectedFile.value) {
      filePath = await uploadAvatar()
    }
    const payload = {
      ...event.data,
      avatarUrl: filePath || state.avatarUrl,
    }
    const response = await $fetch('/api/super-admin/users', {
      method: 'POST',
      body: payload,
    })
    toast.add({
      title: 'User Created Successfully',
      description: `${state.name} has been added to the platform${!state.emailVerified ? ' and will receive a verification email' : ''}.`,
      color: 'success',
      duration: 5000,
    })

    // Reset form after successful submission
    resetForm()

    // Emit event to notify parent component
    emit('user-created', response)
  }
  catch (error) {
    const errorMessage
        = (error instanceof FetchError ? error.data?.message : null)
          || 'Failed to create user'
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
      duration: 5000,
    })
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function resetForm() {
  state.name = undefined
  state.email = undefined
  state.phoneNumber = undefined
  state.password = undefined
  state.emailVerified = false
  state.avatarUrl = undefined
  selectedFile.value = null
}

const passwordInput = ref<HTMLInputElement | null>(null)
async function generatePassword() {
  state.password = Math.random().toString(36).substring(2, 15)
  await copy(state.password)
  toast.add({
    title: 'Password copied',
    description: `The password has been copied to your clipboard. ${state.password}`,
    color: 'success',
  })
}
const selectedFile = ref<File | null>(null)
async function uploadAvatar() {
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

function handleFileSelected(file: File | null) {
  selectedFile.value = file
  if (!file) {
    state.avatarUrl = ''
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
    <UFormField label="Name" name="name" required>
      <UInput v-model="state.name" class="w-full" size="lg" />
    </UFormField>
    <UFormField label="Email" name="email" required>
      <UInput v-model="state.email" class="w-full" size="lg" />
    </UFormField>
    <UFormField label="Password" name="password" required>
      <UInput
        ref="passwordInput"
        v-model="state.password"
        :type="copied ? 'text' : 'password'"
        class="w-full"
        size="lg"
        :ui="{ trailing: 'pr-1' }"
      >
        <template #trailing>
          <UTooltip text="Generate Password" :content="{ side: 'right' }">
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-sparkles"
              @click="generatePassword"
            />
          </UTooltip>
        </template>
      </UInput>
    </UFormField>
    <UFormField label="Phone Number" name="phoneNumber">
      <UInput
        v-model="state.phoneNumber"
        class="w-full"
        size="lg"
        placeholder="+12123456789"
      />
    </UFormField>
    <UFormField label="Avatar" name="avatar">
      <AppAvatarUploader
        v-model="state.avatarUrl"
        avatar-size="md"
        @file-selected="handleFileSelected"
      />
    </UFormField>
    <UCheckbox
      v-model="state.emailVerified"
      size="lg"
      label="Auto verify user"
      description="If checked, the user will be automatically verified after registration."
    />
    <UButton :loading="loading" type="submit" label="Invite User" />
  </UForm>
</template>
