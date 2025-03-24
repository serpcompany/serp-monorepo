<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <SectionHeroOne
                      title="JSON to CSV Converter"
                      subtitle="Convert JSON to CSV format (comma separated list)." />

      <!-- in box-->
      <div class="flex justify-around gap-8">
        <ClientOnly>
          <UTextarea
                     v-model="jsonInput"
                     placeholder="Paste your content here"
                     :rows="15"
                     class="mb-10 w-full" />
        </ClientOnly>

        <!-- out box-->
        <ClientOnly>
          <UTextarea v-model="csvOutput" :rows="15" class="mb-10 w-full" />
        </ClientOnly>
      </div>

      <!-- button -->
      <UButton type="button" @click="runFunction">Submit</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const jsonInput = ref('');
const csvOutput = ref<string>('');

const toast = useToast();

const runFunction = () => {
  try {
    if (!jsonInput.value.trim()) {
      throw new Error('Please enter JSON input');
    }

    const result = convertJsonToCsv(jsonInput.value);
    csvOutput.value = result ?? '';

    toast.add({
      title: 'Success',
      description: 'JSON successfully converted to CSV',
      color: 'success'
    });
  } catch (error) {
    csvOutput.value = '';
    toast.add({
      title: 'Error: Incorrect JSON Format',
      description:
        error instanceof Error
          ? error.message
          : 'Failed to convert JSON to CSV',
      color: 'error'
    });
  }
};

useSeoMeta({
  title: 'JSON to CSV Converter: Convert JSON to CSV format'
});
</script>
