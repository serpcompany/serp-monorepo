<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <SectionHeroOne
                      title="Paragraph Counter"
                      subtitle="A free online tool to count the number of paragraphs in text." />

      <!-- box -->
      <div>
        <ClientOnly>
          <UTextarea
                     v-model="str"
                     placeholder="Paste your content here"
                     :rows="15"
                     class="mb-10 w-full" />
        </ClientOnly>
      </div>

      <!-- button -->
      <UButton type="button" @click="runFunction">Submit</UButton>
      <span v-if="paragraphCount" class="ml-10 text-lg">{{ paragraphCount }} paragraphs</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const str = ref('');
const paragraphCount = ref();

const runFunction = () => {
  paragraphCount.value = countParagraphs(str.value);
};

useSeoMeta({
  title: 'A Free Online Paragraph Counter'
});
</script>
