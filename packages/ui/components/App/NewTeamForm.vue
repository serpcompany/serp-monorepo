<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Team } from '@serp/db/types/database'
import { FetchError } from 'ofetch'
import { nextTick, ref, watch } from 'vue'
import { z } from 'zod'

const emit = defineEmits<{
  success: [team: Team]
}>()
const toast = useToast()
const teams = useState<Team[]>('teams', () => [])
const loading = ref(false)
const imagePreview = ref<string | undefined>(undefined)
const selectedFile = ref<File | null>(null)
const { setLastUsedTeam } = useTeamPreferences()

function handleFileSelected(file: File | null) {
  selectedFile.value = file
}

const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
  slug: z
    .string()
    .min(1, 'Team slug is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Only lowercase letters, numbers, and single hyphens between characters allowed',
    ),
})

const state = reactive({
  name: '',
  slug: '',
  logo: '',
})

let userEditedSlug = false
let programmaticallyUpdatingSlug = false
let lastAutoSlug = ''
const slugAutoAdjustedMessage = ref('')

// Helper to generate slug from name
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars except space and dash
    .replace(/\s+/g, '-') // replace spaces with dash
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes
}

// Helper to check slug uniqueness and increment if needed
async function getAvailableSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug
  let suffix = 1
  let wasTaken = false
  while (true) {
    try {
      const existingTeam = await $fetch<{
        id: string
        name: string
        slug: string
      } | null>('/api/teams/check-slug', {
        method: 'POST',
        body: { slug },
      })
      if (!existingTeam) {
        // If the slug was taken and we had to increment, show a message
        if (wasTaken) {
          slugAutoAdjustedMessage.value = `"${baseSlug}" is taken so we made it unique, you can adjust the Team URL to an available slug.`
        }
        return slug
      }
      wasTaken = true
      slug = `${baseSlug}-${suffix}`
      suffix++
    }
    catch {
      // If API fails, just return the current slug
      return slug
    }
  }
}

watch(
  () => state.name,
  async (newName) => {
    if (!userEditedSlug) {
      const baseSlug = generateSlug(newName)
      if (!baseSlug) {
        programmaticallyUpdatingSlug = true
        state.slug = ''
        lastAutoSlug = ''
        slugAutoAdjustedMessage.value = ''
        programmaticallyUpdatingSlug = false
        return
      }
      // Only check for available slug if name is not empty
      programmaticallyUpdatingSlug = true
      state.slug = baseSlug
      lastAutoSlug = baseSlug
      slugAutoAdjustedMessage.value = ''
      await nextTick() // ensure reactivity
      const availableSlug = await getAvailableSlug(baseSlug)
      if (!userEditedSlug) {
        state.slug = availableSlug
        lastAutoSlug = availableSlug
        await nextTick()
        // Trigger input event on the slug input to ensure UI/validation updates
        const slugInput = document.querySelector('input[name="slug"]')
        if (slugInput) {
          slugInput.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
      programmaticallyUpdatingSlug = false
    }
  },
)

watch(
  () => state.slug,
  (newSlug) => {
    if (programmaticallyUpdatingSlug)
      return
    // If the slug is cleared, re-enable auto-generation
    if (newSlug === '') {
      userEditedSlug = false
      slugAutoAdjustedMessage.value = ''
      return
    }
    // Only set userEditedSlug if the new slug does NOT match the last auto-generated value
    if (newSlug !== lastAutoSlug) {
      userEditedSlug = true
      slugAutoAdjustedMessage.value = ''
    }
  },
)

async function onSubmit(event: FormSubmitEvent<typeof schema>) {
  loading.value = true
  const data = schema.parse(event.data)
  try {
    // Check for slug conflict
    const existingTeam = await $fetch<{
      id: string
      name: string
      slug: string
    } | null>('/api/teams/check-slug', {
      method: 'POST',
      body: { slug: data.slug },
    })

    if (existingTeam) {
      toast.add({
        title: 'Team URL already in use',
        description: `You are already a member of team "${existingTeam.name}" with URL /${existingTeam.slug}. Please choose a different URL.`,
        color: 'error',
      })
      loading.value = false
      return
    }

    const filePath = selectedFile.value
      ? await uploadLogo()
      : `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(data.name)}`
    const teamData = { ...data, logo: filePath }
    const newTeam = await $fetch<Team>('/api/teams', {
      method: 'POST',
      body: teamData,
    })
    teams.value.push(newTeam)
    setLastUsedTeam(newTeam.slug)
    toast.add({
      title: 'Team created successfully',
      color: 'success',
    })
    emit('success', newTeam)
  }
  catch (error) {
    toast.add({
      title: 'Failed to create team',
      description:
          (error as unknown).message
          || (error as unknown).statusMessage
          || 'Please try again',
      color: 'error',
    })
  }
  finally {
    loading.value = false
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
  catch (error) {
    if (error instanceof FetchError) {
      throw new TypeError(`Failed to upload logo: ${error.message}`, {
        cause: error,
      })
    }
    else {
      console.error(error)
      throw new Error('Failed to upload logo', { cause: error })
    }
  }
}

const host = useRuntimeConfig().public.siteUrl
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit as unknown"
  >
    <UFormField
      label="Team logo (Recommended size: 1 MB, 1:1 aspect ratio)"
      name="logo"
    >
      <AppAvatarUploader
        v-model="imagePreview"
        @file-selected="handleFileSelected"
      />
    </UFormField>

    <UFormField required label="Team name" name="name">
      <UInput
        v-model="state.name"
        placeholder="Personal or Company Name"
        class="w-full"
        size="lg"
      />
    </UFormField>

    <UFormField
      label="Team URL"
      name="slug"
      required
      :help="`${host}/dashboard/${state.slug}`"
    >
      <UInput
        v-model="state.slug"
        placeholder="my-awesome-team"
        class="w-full"
        size="lg"
      />
      <div v-if="slugAutoAdjustedMessage" class="text-warning mt-1 text-xs">
        {{ slugAutoAdjustedMessage }}
      </div>
    </UFormField>

    <UButton
      color="neutral"
      type="submit"
      size="lg"
      block
      :loading="loading"
      :disabled="loading"
    >
      Create team
    </UButton>
  </UForm>
</template>
