<script setup lang="ts">
  const toast = useToast()
  const inputFiles = ref<FileList | null>(null)

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    inputFiles.value = input.files
  }

  async function handleCombine() {
    if (!inputFiles.value?.length)
      return

    try {
      const result = await combineCsvs(inputFiles.value)
      downloadCsv(result)
      toast.add({
        title: 'Success',
        description:
          'Combined successful. Check your desktop for the combined csv',
        color: 'success',
      })
    }
    catch (err) {
      toast.add({
        title: 'Error',
        description:
          err instanceof Error
            ? err.message
            : 'Failed to combine files. Make sure the headers match.',
        color: 'error',
      })
    }
  }

  function downloadCsv(combinedOutput: string) {
    const blob = new Blob([combinedOutput], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'combined.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  useSeoMeta({
    title:
      'Free CSV Combining Tool. Merge multiple spreadsheet or excel files like .csv, .xls and .xlxs.',
  })
</script>

<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <SectionHeroOne
        title="Combine CSV Files"
        subtitle="Merge multiple spreadsheet or excel files like .csv, .xls and .xlxs."
      />

      <!-- box -->
      <div class="flex justify-center">
        <ClientOnly>
          <UInput
            type="file"
            class="mb-10"
            multiple
            accept=".csv,.xls,.xlsx"
            @change="handleFileChange"
          />
        </ClientOnly>
      </div>

      <!-- button -->
      <UButton class="mx-auto flex" type="button" @click="handleCombine">
        Submit
      </UButton>
    </div>
  </div>
</template>
