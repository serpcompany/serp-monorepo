<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { Category } from '@serp/types/types'
  import { v4 as uuidv4 } from 'uuid'
  import * as z from 'zod'

  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) {
    navigateTo('/login')
  }

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    domain: z
      .string()
      .regex(/^[\w.-]+\.[a-z]{2,}$/i, 'Enter a valid domain (e.g. example.com)'),
    pricing: z.array(z.string()).min(1, 'Pick at least one pricing option'),
    tags: z.string().optional().nullable(),
    oneLiner: z.string().min(1, 'Tagline is required').max(75, '75 chars max'),
    description: z.string().min(1, 'Description is required'),
    categories: z.array(z.string()).default([]),
    logo: z.string().optional().nullable(),
  })
  type Schema = z.output<typeof schema>

  const company = reactive({
    id: null,
    name: '',
    domain: '',
    pricing: '',
    tags: '',
    oneLiner: '',
    description: '',
    categories: [],
    logo: '',
  })

  let uuid = uuidv4()
  const isPriority = ref(false)

  const categories = await useCompanyCategories()
  const categoryOptions = ref(categories?.map(category => category.name))
  const pricingOptions = ref(['Free', 'Paid', 'Subscription', 'Free Trial'])

  const route = useRoute()
  const id = route.query.id
  const existingForm = ref(false)
  const isVerified = ref(false)
  if (id) {
    const submissionData = await useCompanySubmissions(id)
    if (submissionData) {
      if (submissionData.approved) {
        navigateTo(`/products/${submissionData.domain}/reviews/`)
      }
      company.id = submissionData.formData?.id
      company.name = submissionData.formData?.name
      company.domain = submissionData.formData?.domain
      company.tags =
        submissionData.formData?.tags && submissionData.formData?.tags.length > 0
          ? submissionData.formData?.tags.join(',')
          : ''
      company.oneLiner = submissionData.formData?.oneLiner
      company.description = submissionData.formData?.description
      company.categories = submissionData.formData?.categories
        ? submissionData.formData?.categories.map(
          (category: number) =>
            categories.find((c: Category) => c.id === category)?.name,
        )
        : []
      company.logo = submissionData.formData?.logo
      company.pricing = submissionData.formData?.pricing
        ? submissionData.formData.pricing
        : []
      uuid = submissionData.formData?.uuid
      isVerified.value = submissionData.formData?.backlinkVerified
      isPriority.value = submissionData.formData?.isPriority
      existingForm.value = true
    }
  }

  const toast = useToast()
  const loading = ref(false)

  const requiredFields = [
    { key: 'name' as const, label: 'Name' },
    { key: 'domain' as const, label: 'Domain' },
    { key: 'pricing' as const, label: 'Pricing' },
    { key: 'oneLiner' as const, label: 'One-Liner' },
    { key: 'description' as const, label: 'RichDescription' },
  ]

  function checkIfValidValue(value: string | string[]) {
    if (typeof value === 'string')
      return value.trim() !== ''
    if (Array.isArray(value))
      return value.length > 0
    return false
  }

  const isComplete = computed(() =>
    requiredFields.every(
      field => company[field.key] && checkIfValidValue(company[field.key]),
    ),
  )

  const getCategories = computed(() => {
    return company.categories.map((category: string) => {
      // find matching category by name
      const category_ = categories.find(c => c.name === category)
      return {
        id: category_.id,
        name: category_.name,
        slug: category_.slug,
      }
    })
  })

  const getCategoryIds = computed(() =>
    getCategories.value.map(category => category.id),
  )

  const s3 = useS3Object()
  const runtimeConfig = useRuntimeConfig()

  // Handle the image file selection and upload
  async function onImageSelected(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file)
      return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.add({
        id: 'upload-error',
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
            id: 'upload-error',
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
                id: 'upload-error',
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
              const uploaded = await s3.upload(processedFile, {
                prefix: 'images',
                meta: { purpose: 'company-logo' },
              })
              company.logo = `${runtimeConfig.public.cloudflareR2PublicUrl}${uploaded.replace(
                '/api/s3/query',
                '',
              )}`
              toast.add({
                id: 'upload-success',
                title: 'Logo Uploaded',
                description: 'Your company logo has been uploaded successfully!',
                icon: 'check-circle',
              })
            }
            catch (err) {
              toast.add({
                id: 'upload-error',
                title: 'Upload Failed',
                description: err.message || 'Failed to upload logo.',
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
          id: 'upload-error',
          title: 'Image Load Error',
          description: 'Could not load the image for processing.',
          icon: 'exclamation-circle',
        })
      }
    }
    reader.onerror = () => {
      toast.add({
        id: 'upload-error',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
        icon: 'exclamation-circle',
      })
    }
  }

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      loading.value = true

      if (!user.value?.email) {
        throw new Error('Please login to save your company')
      }

      const payload = {
        ...event.data,
        categories: getCategoryIds.value,
        uuid,
      }

      const { data: response, error } = await useFetch(
        '/api/entity/submit?module=company',
        {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: payload,
        },
      )

      if (error.value) {
        throw new Error(`Failed to save company - ${error.value.message}`)
      }

      if (response.value.message === 'success') {
        toast.add({
          id: 'company-saved',
          title: 'Company saved',
          description: 'Your company has been saved successfully',
          icon: 'check-circle',
        })
      }
      else {
        throw new Error(`Failed to save company - ${response.value.message}`)
      }
    }
    catch (error) {
      toast.add({
        id: 'company-save-error',
        title: 'Error saving company',
        description: error.message,
        icon: 'exclamation-circle',
      })
    }
    finally {
      loading.value = false
    }
  }

  async function verifyCompanyBacklink(submissionId: string) {
    try {
      loading.value = true
      const { data: response, error } = await useFetch(
        `/api/entity/submit-verify-backlink?id=${submissionId}&module=company`,
        {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
        },
      )
      if (error.value) {
        toast.add({
          id: 'verify-backlink-error',
          title: 'Error Verifying Backlink',
          description: error.value,
          icon: 'exclamation-circle',
        })
        return
      }
      if (response.value && response.value.verified) {
        isVerified.value = true
        toast.add({
          id: 'verify-backlink-success',
          title: 'Backlink Verified',
          description: 'The backlink has been verified successfully.',
          icon: 'check-circle',
        })
      }
      else {
        toast.add({
          id: 'verify-backlink-failure',
          title: 'Backlink Verification Failed',
          description: 'The backlink could not be verified.',
          icon: 'exclamation-circle',
        })
      }
    }
    catch (error) {
      toast.add({
        id: 'verify-backlink-error',
        title: 'Error Verifying Backlink',
        description: error.message,
        icon: 'exclamation-circle',
      })
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <UPage class="flex min-h-screen items-center justify-center">
    <UMain class="py-20">
      <UCard class="mx-auto max-w-2xl p-8">
        <UHeading level="2" class="mb-6 text-center text-2xl font-semibold">
          Submit Company
        </UHeading>
        <div v-if="existingForm" class="mb-6 text-center">
          <p class="text-sm text-gray-500">
            Your company is already submitted. You can edit the details below.
          </p>
          <UBadge v-if="isVerified" color="success">
            Verified
          </UBadge>
          <div v-else>
            <UBadge color="error">
              Not Verified
            </UBadge>
            <UButton @click.prevent="verifyCompanyBacklink(id)">
              Check Backlink
            </UButton>
            <span>
              (must have a
              <bold>do follow</bold>
              backlink to current site on the submission domain homepage, if not
              working, ensure you have `SERPVerificationBot/1.0` user-agent
              whitelisted)
            </span>
          </div>
        </div>
        <UForm
          :schema="schema"
          :state="company"
          class="space-y-6"
          @submit="onSubmit"
        >
          <UFormField
            label="Company Name"
            name="name"
            required
            class="mt-6"
          >
            <UInput
              v-model="company.name"
              placeholder="SERP AI"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Domain" name="domain" required>
            <UInput
              v-model="company.domain"
              placeholder="serp.ai"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Description" name="description" required>
            <UTextarea
              v-model="company.description"
              rows="5"
              placeholder="A detailed overview of your company"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Pricing Options" name="pricing" required>
            <UInputMenu
              v-model="company.pricing"
              multiple
              :items="pricingOptions"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Tagline" name="oneLiner" required>
            <UInput
              v-model="company.oneLiner"
              placeholder="A short company tagline (max 75 characters)"
              class="w-full"
              maxlength="75"
            />
          </UFormField>

          <UFormField label="Category(s)" name="categories">
            <UInputMenu
              v-model="company.categories"
              multiple
              :items="categoryOptions"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Tags" name="tags">
            <UInput
              v-model="company.tags"
              placeholder="e.g. AI, SEO, Marketing"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Company Logo" name="logo">
            <div class="rounded border border-dashed border-gray-300 p-4">
              <input
                type="file"
                accept="image/*"
                class="w-full text-sm"
                @change="onImageSelected"
              />
              <NuxtImg
                v-if="company.logo"
                :src="company.logo"
                alt="Company Logo"
                class="mt-4 h-32 w-32 rounded object-cover"
              />
            </div>
          </UFormField>

          <div class="text-center">
            <UButton
              type="submit"
              color="secondary"
              size="xl"
              :loading="loading"
            >
              Submit
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UMain>
  </UPage>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
