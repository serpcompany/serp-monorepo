<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <section-hero-one
        title="Paragraph Counter"
        subtitle="A free online tool to count the number of paragraphs in text."
      />

      <!-- box -->
      <div>
        <client-only>
          <u-textarea
            v-model="str"
            placeholder="Paste your content here"
            :rows="15"
            class="mb-10 w-full"
          />
        </client-only>
      </div>

      <!-- button -->
      <u-button type="button" @click="runFunction">Submit</u-button>
      <span v-if="paragraphCount" class="ml-10 text-lg"
        >{{ paragraphCount }} paragraphs</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import countParagraphs from '~/utils/tools/countParagraphs';

const str = ref('');
const paragraphCount = ref();

const runFunction = () => {
  paragraphCount.value = countParagraphs(str.value);
};

useSeoMeta({
  title: 'A Free Online Paragraph Counter'
});
</script>
