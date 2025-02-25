<template>
  <div class="container">
    <div class="px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <section-hero-one
        title="Tools"
        subtitle="Free online tools and apps for combining, converting, compressing & convenience."
      />

      <section class="md:container md:mx-auto">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <!-- Col 1 -->
          <div>
            <h2 class="mb-4 text-xs uppercase">Combine</h2>
            <ul>
              <li>
                <nuxt-link
                  to="/tools/combine-csv-files/"
                  class="flex items-center"
                >
                  Combine CSVs
                </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- Col 2 -->
          <div>
            <h2 class="mb-4 text-xs uppercase">Convert</h2>
            <ul>
              <li>
                <nuxt-link
                  to="/tools/convert-json-to-csv/"
                  class="flex items-center"
                >
                  JSON to CSV
                </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- Col 3 -->
          <div>
            <h2 class="mb-4 text-xs uppercase">Counters</h2>
            <ul>
              <li class="mb-2">
                <nuxt-link
                  to="/tools/count-characters/"
                  class="flex items-center"
                >
                  Character Counter
                </nuxt-link>
              </li>
              <li class="mb-2">
                <nuxt-link
                  to="/tools/paragraph-counter/"
                  class="flex items-center"
                >
                  Paragraph Counter
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title:
    'Free online tools and apps for combining, converting, compressing & convenience.'
});
</script>
