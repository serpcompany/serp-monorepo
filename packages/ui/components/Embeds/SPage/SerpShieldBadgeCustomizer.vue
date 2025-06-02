<script setup lang="ts">
import { ref } from 'vue'

interface ShieldData {
  categoryName: string
  productDomain: string
}

const config = useRuntimeConfig()
const baseUrl = config.public.siteUrl || ''

// Initial form data
const formData = ref({
  categoryName: '',
  productDomain: '',
})

// Final customizations that will be passed to the preview
const finalCustomizations = ref({
  categoryName: '',
  productDomain: '',
})

// Control whether to show embed code
const showEmbedCode = ref(false)

// Update the form data when inputs change (but don't update preview yet)
// @todo - improve the typesafety of this after implementing zod
function handleFormUpdate(updatedData: ShieldData) {
  formData.value = { ...updatedData }
}

// Generate SVG with current form data
function generateSvg() {
  // Update the final customizations to match form data
  finalCustomizations.value = { ...formData.value }
  // Show embed code after generation
  showEmbedCode.value = true
}

// Generate embed code for the customized SVG
function generateEmbedCode() {
  const category = encodeURIComponent(
    finalCustomizations.value.categorySlug || 'Select Category',
  )
  const domain = encodeURIComponent(
    finalCustomizations.value.productDomain || 'Select Domain',
  )
  return `<a href="https://serp.co/products/${domain}/">
  <img src="${baseUrl}/api/svg/badge?category=${category}&domain=${domain}" alt="${finalCustomizations.value.categorySlug} Badge" width="250" height="242">
</a>`
}

// Copy embed code to clipboard
function copyEmbedCode() {
  navigator.clipboard
    .writeText(generateEmbedCode())
    .then(() => {
      alert('Copied to clipboard!')
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8 text-center">
      <h1 class="text-secondary-dark mb-2 text-3xl font-bold md:text-4xl">
        SVG Badge Customizer
      </h1>
      <p class="mx-auto max-w-2xl text-gray-600">
        Customize your badge and generate embed code for your website
      </p>
    </header>

    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- Form Section -->
      <div class="rounded-lg p-6 shadow-md lg:w-1/3">
        <EmbedsFormsShieldBadgeCustomizer
          :form-data="formData"
          @update="handleFormUpdate"
          @submit="generateSvg"
        />
      </div>

      <!-- Preview Section -->
      <div class="rounded-lg p-6 shadow-md lg:w-2/3">
        <h2 class="text-secondary-dark mb-4 text-xl font-semibold">
          Preview
        </h2>
        <EmbedsSvgPreview :customizations="finalCustomizations" />

        <!-- Optional: Add a code section to show the embed code -->
        <div v-if="showEmbedCode" class="mt-6">
          <h3 class="mb-2 text-lg font-medium">
            Embed Code
          </h3>
          <pre
            class="overflow-x-auto rounded-md p-4"
          ><code>{{ generateEmbedCode() }}</code></pre>
          <button
            class="mt-2 rounded-md px-4 py-2 text-sm text-white transition duration-300"
            @click="copyEmbedCode"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
