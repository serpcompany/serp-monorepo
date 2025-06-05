<script setup lang="ts">
  const props = defineProps<{
    formData: {
      categorySlug: string
      productDomain: string
    }
  }>()

  const emit = defineEmits(['update', 'submit'])
  const localFormData = ref({
    categorySlug: '',
    productDomain: '',
  })

  const { formData } = toRefs(props)

  watch(
    formData,
    (newFormData) => {
      localFormData.value.categorySlug = newFormData.categorySlug
      localFormData.value.productDomain = newFormData.productDomain
    },
    { immediate: true },
  )

  const categories = await useCompanyCategories()

  const companyOptions = ref([] as Array<{ name: string, domain: string }>)

  if (localFormData.value.categorySlug) {
    companyOptions.value = await useAllCompaniesForCategory(
      localFormData.value.categorySlug,
    )
  }

  watch(
    () => localFormData.value.categorySlug,
    async (newSlug) => {
      if (newSlug) {
        const companiesForCategory = await useAllCompaniesForCategory(newSlug)
        companyOptions.value = companiesForCategory.companies
      }
      else {
        companyOptions.value = []
      }
      localFormData.value.productDomain = ''
      updateForm()
    },
  )

  function updateForm() {
    emit('update', { ...localFormData.value })
  }
</script>

<template>
  <div>
    <h2 class="text-secondary-dark mb-4 text-xl font-semibold">
      Customize Your Badge
    </h2>
    <form class="space-y-6" @submit.prevent="$emit('submit')">
      <div class="space-y-4">
        <div>
          <label
            for="category"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            v-model="localFormData.categorySlug"
            class="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200"
            @change="updateForm"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div>
          <label
            for="productDomain"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Product Domain
          </label>
          <select
            id="productDomain"
            v-model="localFormData.productDomain"
            class="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200"
            :disabled="!companyOptions.length"
            @change="updateForm"
          >
            <option value="" disabled>
              {{
                companyOptions.length
                  ? "Select a domain"
                  : "Pick a category first"
              }}
            </option>
            <option
              v-for="company in companyOptions"
              :key="company.domain"
              :value="company.domain"
            >
              {{ company.domain }}
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        class="bg-primary hover:bg-primary-dark w-full rounded-md px-6 py-3 font-medium text-white transition duration-300"
      >
        Generate SVG
      </button>
    </form>
  </div>
</template>
