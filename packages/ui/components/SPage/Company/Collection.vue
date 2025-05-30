<script setup lang="ts">
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);

  const filters = computed(() => ({
    page: page.value,
    limit: Number(route.query.limit) || 50,
    category: route.query.category as string,
    q: route.query.q as string,
    sort: route.query.sort as string
  }));

  const { data, status } = await useAsyncData(
    'companies',
    () =>
      useCompanies(
        filters.value.page,
        filters.value.limit,
        filters.value.category,
        filters.value.q,
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

  const categoriesFilters = computed(() => {
    return categories.value.map((category) => ({
      label: category.name,
      value: category.slug
    }));
  });

  useSeoMeta({
    title: 'Discover the best products on the internet.'
  });
</script>

<template>
  <div>
    <SHero
      headline="Products, Software & Services."
      subheadline="Discover top-rated software, tools & services."
      :show-search-bar="false"
      :show-buttons="false"
    />
    <main>
      <div class="flex flex-col gap-y-6">
        <CollectionFilters
          :loading="status === 'pending'"
          :categories="categoriesFilters"
        />
        <CompanyCardList
          v-model:page="page"
          :loading="status === 'pending'"
          :items="data?.companies || []"
          :pagination-limit="filters.limit"
          :pagination-total="data?.pagination.totalItems"
        />
      </div>

      <SLinkHub
        v-if="categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="products/best"
      />
      <NewsletterSignupPageSection />
    </main>
  </div>
</template>
