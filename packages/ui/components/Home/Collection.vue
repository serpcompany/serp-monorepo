<script setup lang="ts">
  const route = useRoute();
  const parentEl = useTemplateRef('parent');

  const page = ref(Number(route.query.page) || 1);

  const filters = computed(() => ({
    page: page.value,
    limit: Number(route.query.limit) || 50,
    category: route.query.category as string,
    q: route.query.q as string,
    sort: route.query.sort as string
  }));

  const { data, status } = await useAsyncData(
    computed(() => formatDataKey('companies', filters.value)),
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

  const categories = await useCompanyCategories();

  const categoriesFilters = computed(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category.slug
    }));
  });

  watch(page, () => {
    if (parentEl.value) {
      parentEl.value.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
</script>

<template>
  <div ref="parent" class="flex flex-col gap-y-6">
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
</template>
