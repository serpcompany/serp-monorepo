<script setup lang="ts">
  import type { Category } from '@serp/types/types';

  const route = useRoute();
  const { slug } = useRoute().params;

  const { data: category } = await useAsyncData(
    `category-${slug}`,
    async () => {
      const response = await useCompanies(1, 1, slug as string);
      const category = response.category as Category;
      return category;
    }
  );

  const page = ref(Number(route.query.page) || 1);

  const filters = computed(() => ({
    page: page.value,
    limit: Number(route.query.limit) || 50,
    category: slug as string,
    name: route.query.q as string,
    sort: route.query.sor as string
  }));

  const { data, status } = await useAsyncData(
    `companies-${slug}`,
    () =>
      useCompanies(
        filters.value.page,
        filters.value.limit,
        filters.value.category,
        filters.value.name,
        filters.value.sort
      ),
    {
      lazy: true,
      watch: [filters]
    }
  );

  const { data: categories } = await useAsyncData(
    'categories',
    () => useCompanyCategories(),
    {
      default: () => []
    }
  );

  useSeoMeta({
    title: () => `The Best ${category.value?.name} Providers`
  });
</script>

<template>
  <div>
    <SHero
      class="-mt-22"
      :headline="`The Best ${category?.name}`"
      :subheadline="`Discover ${category?.name} products & services.`"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <div class="flex flex-col gap-y-6">
        <CollectionFilters :loading="status === 'pending'" />
        <CompanyCardList
          v-model:page="page"
          :loading="status === 'pending'"
          :items="data?.companies || []"
          :pagination-limit="filters.limit"
          :pagination-total="data?.pagination.totalItems"
        />
      </div>

      <template v-if="category && category.data">
        <CompanyArticleSection
          v-if="category.data.buyers_guide"
          :article="category.data.buyers_guide"
        />

        <UPageSection
          v-if="category.data.faqs && category.data.faqs.length"
          title="FAQs"
        >
          <UPageAccordion :items="category.data.faqs" label-key="question">
            <template #body="{ item }">
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="prose dark:prose-invert max-w-full"
                v-html="item.answer"
              ></div>
            </template>
          </UPageAccordion>
        </UPageSection>
      </template>

      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="products/best"
      />
    </main>
  </div>
</template>
