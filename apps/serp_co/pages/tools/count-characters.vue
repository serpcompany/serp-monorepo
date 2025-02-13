<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <section-hero-one
        title="Character Counter"
        subtitle="A Free Online Character Counter."
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
      <span v-if="characterCount" class="ml-10 text-lg"
        >{{ characterCount }} characters</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import countCharacters from '~/utils/tools/countCharacters';

const str = ref('');
const characterCount = ref();

const runFunction = () => {
  characterCount.value = countCharacters(str.value);
};

useSeoMeta({
  title: 'A Free Online Character Counter'
});
</script>
