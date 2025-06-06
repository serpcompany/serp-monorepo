<script setup lang="ts">
  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) {
    navigateTo('/login')
  }

  const activeTab = ref('general')
  const tabs = ref([
    { label: 'General', value: 'general' },
    { label: 'Example', value: 'example' },
  ])

  const company = ref({
    name: '',
    domain: '',
    pricing: '',
    tags: '',
    oneLiner: '',
    description: '',
    categories: [],
    logo: '',
  })

  const toast = useToast()
  const loading = ref(false)

  const categories = await useCompanyCategories()
  const categoryOptions = ref(categories?.map(category => category.name))
  const pricingOptions = ref(['Free', 'Paid', 'Subscription'])

  const allFields = [
    { key: 'name', label: 'Name' },
    { key: 'domain', label: 'Domain' },
    { key: 'categories', label: 'Category(s)' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'tags', label: 'Tags' },
    { key: 'oneLiner', label: 'One-Liner' },
    { key: 'description', label: 'RichDescription' },
    { key: 'logo', label: 'Logo' },
  ]

  const requiredFields = [
    { key: 'name', label: 'Name' },
    { key: 'domain', label: 'Domain' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'oneLiner', label: 'One-Liner' },
    { key: 'description', label: 'RichDescription' },
  ]

  function checkIfValidValue(value) {
    if (typeof value === 'string')
      return value.trim() !== ''
    if (Array.isArray(value))
      return value.length > 0
    return false
  }

  const isComplete = computed(() =>
    requiredFields.every(
      field =>
        company.value[field.key] && checkIfValidValue(company.value[field.key]),
    ),
  )

  const getCategories = computed(() => {
    return company.value.categories.map((category: string) => {
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

    try {
      const uploaded = await s3.upload(file, {
        prefix: 'images',
        meta: { purpose: 'company-logo' },
      })

      company.value.logo = `${runtimeConfig.public.cloudflareR2PublicUrl}${uploaded.replace('/api/s3/query', '')}`

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
  }

  async function saveCompany() {
    try {
      loading.value = true
      if (!isComplete.value) {
        throw new Error('Please fill in all required fields')
      }
      if (!user?.value?.email) {
        throw new Error('Please login to save your company')
      }

      const payload = {
        ...company.value,
        categories: getCategoryIds.value,
      }

      const { data: response, error } = await useFetch('/api/entity/submit', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify(payload),
      })

      if (error.value) {
        throw new Error(`Failed to save company - ${error.value.message}`)
      }

      if (response.value.message && response.value.message === 'success') {
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

  function previewCompany() {
    alert('Preview company (placeholder)')
  }
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <!-- Left side column -->
      <div class="col-span-1 space-y-4">
        <!-- Waiting Line Card -->
        <UCard>
          <div class="p-3">
            <p class="text-sm text-neutral-500">
              The current waiting line is about 104 days.
            </p>
            <p class="text-sm text-neutral-500">
              Your company would launch around June 26, 2025.
            </p>
          </div>
        </UCard>

        <!-- Completion Status Card -->
        <UCard>
          <div class="p-3">
            <h3 class="text-lg font-medium">
              {{ isComplete ? '✅ Complete' : '❌ Incomplete' }}
            </h3>
            <p class="mb-2 text-xs text-neutral-600">
              Complete your company before launching it
            </p>
            <div class="grid grid-cols-2 gap-1">
              <div
                v-for="field in allFields"
                :key="field.key"
                class="flex items-center text-xs"
              >
                <span class="mr-1">
                  {{
                    company[field.key] && checkIfValidValue(company[field.key])
                      ? '✅'
                      : '❌'
                  }}
                </span>
                <span>{{ field.label }}</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Company Card Preview -->
        <UCard>
          <div class="p-3">
            <CompanyCard
              :company="{
                id: 0,
                name: company.name,
                slug: company.domain,
                oneLiner: company.oneLiner,
                categories: getCategories,
                serplyLink: `https://${company.domain}?ref=serp.co&ref_type=adv`,
                logo: company.logo,
              }"
            />
          </div>
        </UCard>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <UButton
            type="primary"
            :loading="loading"
            :disabled="!isComplete"
            @click="saveCompany"
          >
            Save Company
          </UButton>
          <UButton variant="outline" :loading="loading" @click="previewCompany">
            Preview Company
          </UButton>
        </div>
      </div>

      <!-- Right side column (Tabbed Card) -->
      <div class="col-span-2">
        <UCard>
          <UTabs
            v-model="activeTab"
            :items="tabs"
            :content="false"
            class="mb-3"
          />
          <TransitionGroup name="fade" tag="div">
            <div v-if="activeTab === 'general'">
              <form @submit.prevent="saveCompany">
                <div class="grid grid-cols-2 gap-2">
                  <UFormField
                    label="Name"
                    help="Enter your company name"
                    required
                    class="w-full"
                  >
                    <UInput
                      v-model="company.name"
                      placeholder="Enter your company name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Domain"
                    help="Only put the domain, we assume all submitted companies are available at the HTTPS protocol"
                    required
                    class="w-full"
                  >
                    <UInput
                      v-model="company.domain"
                      placeholder="serp.co"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Pricing"
                    help="Select pricing type"
                    required
                    class="w-full"
                  >
                    <UInputMenu
                      v-model="company.pricing"
                      :items="pricingOptions"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Category(s)"
                    help="Select a category(s)"
                    class="w-full"
                  >
                    <UInputMenu
                      v-model="company.categories"
                      multiple
                      :items="categoryOptions"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Tags"
                    help="e.g. AI, SEO, Marketing"
                    class="w-full"
                  >
                    <UInput
                      v-model="company.tags"
                      placeholder="e.g. AI, SEO, Marketing"
                      class="w-full"
                    />
                  </UFormField>

                  <div class="col-span-2">
                    <UFormField
                      label="Company Logo"
                      help="Upload your company logo (image file)"
                      class="w-full"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        @change="onImageSelected"
                      />
                    </UFormField>
                  </div>

                  <!-- Full-width fields -->
                  <div class="col-span-2">
                    <UFormField
                      label="One-Liner"
                      help="A short company tagline (one-liner)"
                      required
                      class="w-full"
                    >
                      <UInput
                        v-model="company.oneLiner"
                        placeholder="A short company tagline"
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                  <div class="col-span-2">
                    <UFormField
                      label="Rich Description"
                      help="Detailed overview of your company"
                      required
                      class="w-full"
                    >
                      <UTextarea
                        v-model="company.description"
                        rows="5"
                        placeholder="Give a detailed overview of your company..."
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </div>
              </form>
            </div>
            <div v-else-if="activeTab === 'example'">
              <p class="text-sm">
                Example tab
              </p>
            </div>
          </TransitionGroup>
        </UCard>
      </div>
    </div>
  </div>
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
