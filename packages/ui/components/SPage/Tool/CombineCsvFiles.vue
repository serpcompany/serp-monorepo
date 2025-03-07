<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <section-hero-one
        title="Combine CSV Files"
        subtitle="Merge multiple spreadsheet or excel files like .csv, .xls and .xlxs."
      />

      <!-- box -->
      <div class="flex justify-center">
        <client-only>
          <u-input
            type="file"
            class="mb-10"
            multiple
            accept=".csv,.xls,.xlsx"
            @change="handleFileChange"
          />
        </client-only>
      </div>

      <!-- button -->
      <u-button class="mx-auto flex" type="button" @click="handleCombine"
        >Submit</u-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
const inputFiles = ref<FileList | null>(null);

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  inputFiles.value = input.files;
};

const handleCombine = async () => {
  if (!inputFiles.value?.length) return;

  try {
    const result = await combineCsvs(inputFiles.value);
    downloadCsv(result);
    toast.add({
      title: 'Success',
      description:
        'Combined successful. Check your desktop for the combined csv',
      color: 'success'
    });
  } catch (err) {
    toast.add({
      title: 'Error',
      description:
        err instanceof Error
          ? err.message
          : 'Failed to combine files. Make sure the headers match.',
      color: 'error'
    });
  }
};

const downloadCsv = (combinedOutput: string) => {
  const blob = new Blob([combinedOutput], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'combined.csv';
  a.click();
  URL.revokeObjectURL(url);
};

useSeoMeta({
  title:
    'Free CSV Combining Tool. Merge multiple spreadsheet or excel files like .csv, .xls and .xlxs.'
});
</script>
