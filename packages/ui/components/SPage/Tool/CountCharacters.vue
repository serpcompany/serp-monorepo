<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <SectionHeroOne
                      title="Character Counter"
                      subtitle="A Free Online Character Counter." />

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
      <span v-if="characterCount" class="ml-10 text-lg">{{ characterCount }} characters</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const str = ref('');
const characterCount = ref();

const runFunction = () => {
  characterCount.value = countCharacters(str.value);
};

useSeoMeta({
  title: 'A Free Online Character Counter'
});
</script>
