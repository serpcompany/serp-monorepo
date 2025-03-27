<script setup lang="ts">
  import type { Company } from '@serp/types/types';

  const props = defineProps<{
    data: Company;
  }>();

  const faqItems = computed(() => {
    if (!props.data?.faqs) return [];

    return props.data?.faqs.map((faq) => ({
      label: faq.question,
      content: faq.answer
    }));
  });

  const sections = computed(() => {
    const sectionTitles: string[] = [];

    sectionTitles.push('Overview');

    if (props.data?.features) {
      sectionTitles.push('Features');
    }
    if (faqItems.value && faqItems.value.length) {
      sectionTitles.push('FAQ');
    }

    if (props.data?.alternatives) {
      sectionTitles.push('Alternatives');
    }

    return sectionTitles;
  });
</script>

<template>
  <div v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.oneLiner"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
      :image="data.logo"
      :serply-link="data.serplyLink"
    />

    <!-- Main content with grid -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main Content (70%) -->
        <div class="lg:col-span-2">
          <!-- Overview Section -->
          <CompanyOverview
            v-if="data.excerpt"
            id="overview"
            :company="data"
            class="scroll-mt-60"
          />

          <!-- Article Section -->
          <section
            v-if="data.article"
            class="prose dark:prose-invert mt-[-25px]"
          >
            <div id="article" class="mb-8" v-html="data.article"></div>
          </section>

          <!-- Features Section -->
          <section v-if="data.features" class="mb-12 space-y-4">
            <h2 id="features" class="mb-4 scroll-mt-60 text-3xl font-bold">
              {{ data.name }} Features
            </h2>
            <article v-for="feature in data.features" :key="feature.item">
              <h3 class="mb-2 text-lg font-bold">{{ feature.item }}</h3>
              <p>{{ feature.description }}</p>
            </article>
          </section>

          <!-- FAQs Section -->
          <section v-if="faqItems && faqItems.length" id="faqs" class="mb-12">
            <h2 class="mb-4 scroll-mt-60 text-3xl font-bold">FAQ</h2>
            <UAccordion type="multiple" :items="faqItems" />
          </section>

          <!-- Alternatives -->
          <section v-if="data.alternatives" class="mb-12 p-4">
            <h2 id="alternatives" class="mb-4 scroll-mt-60 text-3xl font-bold">
              {{ data.name }} Alternatives
            </h2>
            <ul class="list-disc pl-4">
              <li v-for="alternative in data.alternatives" :key="alternative">
                {{ alternative }}
              </li>
            </ul>
          </section>
        </div>

        <!-- Sidebar (30%) -->
        <aside
          v-if="
            (data.screenshots && data.screenshots.length) ||
            (data.categories && data.categories.length)
          "
          class="space-y-6 lg:col-span-1"
        >
          <!-- Left Column: Media Gallery -->
          <MediaGallery
            v-if="data.screenshots && data.screenshots.length"
            :company="data"
          />

          <!-- Categories -->
          <section
            v-if="data.categories && data.categories.length"
            class="gap-2"
          >
            <SPill base-slug="products/best" :items="data.categories" />
          </section>
        </aside>
      </div>
    </section>
  </div>
</template>
