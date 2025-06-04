<script setup lang="ts">
const { loggedIn, user } = useUserSession()
if (!loggedIn.value)
  navigateTo('/')

const route = useRoute()
const companyId = route.params.id as string
const toast = useToast()

const {
  data: companyData,
  pending: companyPending,
  error: companyError,
} = await useFetch<Record<string, unknown>>(`/api/entity/${companyId}`)

const {
  data: editsData,
  pending: editsPending,
  error: editsError,
  refresh: refreshEdits,
} = await useFetch<{ edits: unknown[] }>(`/api/entity/edit?id=${companyId}`)

const dynamicFields = computed(() => {
  if (!companyData.value)
    return []
  return Object.keys(companyData.value).filter(
    k =>
      ![
        'id',
        'domain',
        'createdAt',
        'updatedAt',
        'numReviews',
        'numOneStarReviews',
        'numTwoStarReviews',
        'numThreeStarReviews',
        'numFourStarReviews',
        'numFiveStarReviews',
        'averageRating',
        'verified',
        'alternatives',
        'content',
        'serplyLink',
        'verifiedEmail',
        'verification',
        'screenshots',
        'videoId',
        'slug',
        'module',
        'numUpvotes',
        'numDownvotes',
        'hotScore',
        'hotScoreHour',
        'hotScoreDay',
        'hotScoreWeek',
        'hotScoreMonth',
        'hotScoreYear',
        'entityId',
        'usersCurrentVote',
      ].includes(k),
  )
})

const newEdit = reactive<Record<string, unknown>>({})
watchEffect(() => {
  if (!companyData.value)
    return
  dynamicFields.value.forEach((key) => {
    if (!(key in newEdit)) {
      if (key === 'categories' && companyData.value[key]) {
        newEdit[key] = companyData.value[key].map((c: unknown) => c.name)
      }
      else if (key === 'topics' && companyData.value[key]) {
        newEdit[key] = companyData.value[key].map((t: unknown) => t.name)
      }
      else {
        newEdit[key] = Array.isArray(companyData.value[key]) ? [] : ''
      }
    }
  })
})

const categoriesList = await useCompanyCategories()
const categoryOptions = categoriesList.map(c => c.name)
const getCategoryIds = computed(() => {
  if (!newEdit.categories || !(newEdit.categories as string[]).length) {
    return []
  }
  return (newEdit.categories as string[])
    .map(name => categoriesList.find(c => c.name === name)?.id)
    .filter(i => i !== undefined)
})

const topicsList = await useCompanyTopics()
const topicOptions = topicsList.map(t => t.name)
const getTopicIds = computed(() => {
  if (!newEdit.topics || !(newEdit.topics as string[]).length) {
    return []
  }
  return (newEdit.topics as string[])
    .map(name => topicsList.find(t => t.name === name)?.id)
    .filter(i => i !== undefined)
})

async function onNewLogoSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file)
    return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    toast.add({
      id: 'logo-err',
      title: 'Invalid File',
      description: 'Please select an image file.',
      icon: 'exclamation-circle',
    })
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    const img = new Image()
    img.src = reader.result as string
    img.onload = () => {
      // Calculate new dimensions based on the longest side being 512px
      let width = img.width
      let height = img.height
      if (width > height) {
        if (width > 512) {
          height = Math.round(height * (512 / width))
          width = 512
        }
      }
      else {
        if (height > 512) {
          width = Math.round(width * (512 / height))
          height = 512
        }
      }

      // Create an offscreen canvas to resize and convert the image
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        toast.add({
          id: 'logo-err',
          title: 'Processing Error',
          description: 'Failed to get canvas context.',
          icon: 'exclamation-circle',
        })
        return
      }
      ctx.drawImage(img, 0, 0, width, height)

      // Convert canvas to a WebP blob
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            toast.add({
              id: 'logo-err',
              title: 'Conversion Error',
              description: 'Could not convert image.',
              icon: 'exclamation-circle',
            })
            return
          }
          // Create a new File from the blob with a .webp extension
          const processedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, '.webp'),
            { type: 'image/webp' },
          )
          try {
            const s3 = useS3Object()
            const runtime = useRuntimeConfig()
            const uploaded = await s3.upload(processedFile, {
              prefix: 'images',
              meta: { purpose: 'company-logo' },
            })
            newEdit.logo = `${runtime.public.cloudflareR2PublicUrl}${uploaded.replace(
              '/api/s3/query',
              '',
            )}`
            toast.add({
              id: 'logo-ok',
              title: 'Logo ready!',
              icon: 'check-circle',
            })
          }
          catch (err: unknown) {
            toast.add({
              id: 'logo-err',
              title: 'Upload failed',
              description: err.message,
              icon: 'exclamation-circle',
            })
          }
        },
        'image/webp',
        1.0, // Image quality
      )
    }
    img.onerror = () => {
      toast.add({
        id: 'logo-err',
        title: 'Image Load Error',
        description: 'Could not load the image for processing.',
        icon: 'exclamation-circle',
      })
    }
  }
  reader.onerror = () => {
    toast.add({
      id: 'logo-err',
      title: 'File Read Error',
      description: 'Could not read the selected file.',
      icon: 'exclamation-circle',
    })
  }
}

const loadingNew = ref(false)
async function submitNewEdit() {
  loadingNew.value = true
  try {
    const payload: Record<string, unknown> = {}
    for (const key of dynamicFields.value) {
      const val = newEdit[key]
      if (key === 'categories' && Array.isArray(val) && val.length) {
        payload.categories = getCategoryIds.value
      }
      else if (key === 'topics' && Array.isArray(val) && val.length) {
        payload.topics = getTopicIds.value
      }
      else if (key === 'logo' && val) {
        payload.logo = val
      }
      else if (typeof val === 'string' && val.trim() !== '') {
        payload[key] = val
      }
    }
    if (!Object.keys(payload).length) {
      throw new Error('Change at least one field to submit.')
    }
    const { data: response, error } = await useFetch(
      `/api/entity/edit?id=${companyId}`,
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify(payload),
      },
    )
    if (error.value)
      throw error.value
    if (!response.value)
      throw new Error('No response from server.')
    if (response.value.message === 'success') {
      toast.add({
        id: 'edit-ok',
        title: 'Edit proposed!',
        icon: 'check-circle',
      })
      Object.keys(payload).forEach(k =>
        Array.isArray(newEdit[k]) ? (newEdit[k] = []) : (newEdit[k] = ''),
      )
      await refreshEdits()
    }
    else {
      throw new Error('Failed to propose edit.')
    }
  }
  catch (err: unknown) {
    toast.add({
      id: 'edit-err',
      title: 'Submission failed',
      description: err.message,
      icon: 'exclamation-circle',
    })
  }
  finally {
    loadingNew.value = false
  }
}

const statusOptions = ref(['pending', 'approved', 'rejected'])
const updateStatus = reactive<Record<number, string>>({})
const updateNotes = reactive<Record<number, string>>({})

watchEffect(() => {
  if (!editsData.value)
    return
  editsData.value.edits.forEach((edit) => {
    if (updateStatus[edit.id] === undefined) {
      updateStatus[edit.id] = edit.status
    }
    if (updateNotes[edit.id] === undefined) {
      updateNotes[edit.id] = edit.reviewNotes || ''
    }
  })
})

async function updateEdit(editId: number) {
  try {
    const body: unknown = { status: updateStatus[editId] }
    if (updateNotes[editId].trim())
      body.reviewNotes = updateNotes[editId]

    const { error } = await useFetch(`/api/entity/edit?id=${editId}`, {
      method: 'PUT',
      headers: useRequestHeaders(['cookie']),
      body: JSON.stringify(body),
    })
    if (error.value)
      throw error.value

    toast.add({
      id: `updated-${editId}`,
      title: 'Edit updated',
      icon: 'check-circle',
    })
    await refreshEdits()
  }
  catch (err: unknown) {
    toast.add({
      id: `update-err-${editId}`,
      title: 'Update failed',
      description: err.message,
      icon: 'exclamation-circle',
    })
  }
}

function humanize(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}
function formatValue(val: unknown) {
  if (Array.isArray(val))
    return val.join(', ')
  return val ?? '-'
}
</script>

<template>
  <div class="space-y-6 p-4">
    <h1 class="text-2xl font-bold">
      Manage Company {{ companyData?.name }}
    </h1>

    <!-- Company Loader/Error -->
    <div v-if="companyPending" class="py-8 text-center">
      Loading company…
    </div>
    <div v-else-if="companyError" class="py-8 text-center text-red-500">
      Error: {{ companyError.message }}
    </div>

    <!-- Existing Edits -->
    <section>
      <h2 class="mb-4 text-xl">
        Existing Edit Proposals
      </h2>
      <div v-if="editsPending" class="py-8 text-center">
        Loading edits…
      </div>
      <div v-else-if="editsError" class="py-8 text-center text-red-500">
        Error: {{ editsError.message }}
      </div>
      <div v-else>
        <div v-if="editsData?.edits.length" class="space-y-4">
          <UCard v-for="edit in editsData.edits" :key="edit.id" class="p-4">
            <div class="flex items-center justify-between">
              <h3 class="font-medium">
                Edit #{{ edit.id }}
              </h3>
              <span class="text-sm text-neutral-500">
                {{ edit.createdAt }}
              </span>
            </div>

            <!-- Before vs After -->
            <table class="mt-3 w-full text-left">
              <thead>
                <tr>
                  <th class="pb-1">
                    Field
                  </th>
                  <th class="pb-1">
                    Current
                  </th>
                  <th class="pb-1">
                    Proposed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(val, key) in JSON.parse(edit.proposedChanges)"
                  :key="key"
                >
                  <td class="pt-1">
                    {{ humanize(key) }}
                  </td>
                  <td class="pt-1">
                    {{ formatValue(companyData[key]) }}
                  </td>
                  <td class="pt-1">
                    {{ formatValue(val) }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="user?.id === companyData?.verification">
              <div class="mt-4 grid grid-cols-2 gap-4">
                <UFormField label="Status">
                  <UInputMenu
                    v-model="updateStatus[edit.id]"
                    :items="statusOptions"
                  />
                </UFormField>
                <UFormField label="Review Notes">
                  <UTextarea v-model="updateNotes[edit.id]" rows="2" />
                </UFormField>
              </div>
              <div class="mt-4 text-right">
                <UButton type="primary" @click="updateEdit(edit.id)">
                  Save
                </UButton>
              </div>
            </div>
            <div v-else>
              <table class="mt-3 w-full text-left">
                <thead>
                  <tr>
                    <th class="pb-1">
                      Status
                    </th>
                    <th class="pb-1">
                      Review Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pt-1">
                      {{ edit.status }}
                    </td>
                    <td class="pt-1">
                      {{ edit.reviewNotes || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </div>
        <p v-else class="text-center text-neutral-500">
          No edit proposals yet.
        </p>
      </div>
    </section>

    <!-- Propose a New Edit -->
    <section>
      <h2 class="mb-4 text-xl">
        Propose a New Edit
      </h2>
      <UCard class="p-4">
        <form class="space-y-4" @submit.prevent="submitNewEdit">
          <div v-for="key in dynamicFields" :key="key">
            <UFormField :label="humanize(key)">
              <template v-if="key === 'description'">
                <UTextarea v-model="newEdit[key]" rows="4" class="w-full" />
              </template>
              <template v-else-if="key === 'categories'">
                <UInputMenu
                  v-model="newEdit.categories"
                  multiple
                  :items="categoryOptions"
                  class="w-full"
                />
              </template>
              <template v-else-if="key === 'topics'">
                <UInputMenu
                  v-model="newEdit.topics"
                  multiple
                  :items="topicOptions"
                  class="w-full"
                />
              </template>
              <template v-else-if="key === 'logo'">
                <input
                  type="file"
                  accept="image/*"
                  @change="onNewLogoSelected"
                >
              </template>
              <template v-else>
                <UInput v-model="newEdit[key]" class="w-full" />
              </template>
              <div v-if="companyData[key]">
                <p v-if="key === 'logo'" class="mt-1 text-xs text-neutral-500">
                  Current:
                  <img
                    :src="companyData[key]"
                    alt="Current Logo"
                    class="h-16 w-16"
                  >
                </p>
                <p
                  v-else-if="key === 'categories'"
                  class="mt-1 text-xs text-neutral-500"
                >
                  Current: {{ companyData[key].map((c) => c.name).join(', ') }}
                </p>
                <p
                  v-else-if="key === 'topics'"
                  class="mt-1 text-xs text-neutral-500"
                >
                  Current: {{ companyData[key].map((t) => t.name).join(', ') }}
                </p>
                <p v-else class="mt-1 text-xs text-neutral-500">
                  Current: {{ formatValue(companyData[key]) }}
                </p>
              </div>
            </UFormField>
          </div>
          <div class="text-right">
            <UButton type="primary" :loading="loadingNew">
              Submit Edit
            </UButton>
          </div>
        </form>
      </UCard>
    </section>
  </div>
</template>
