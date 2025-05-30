<script setup lang="ts">
  const route = useRoute();
  const { slug } = useRoute().params;

  const page = ref(Number(route.query.page) || 1);

  const filters = computed(() => ({
    page: page.value,
    limit: Number(route.query.limit) || 50,
    category: (route.query.category as string) || (slug as string),
    q: route.query.q as string,
    sort: route.query.sort as string
  }));

  const { data, status } = await useAsyncData(
    `mcp-server-${slug}`,
    () =>
      useMCPServers(
        filters.value.page,
        filters.value.limit,
        '',
        '',
        '',
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
    'mcp-server-categories',
    () => useMCPServerCategories(),
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

  const subheadline = computed(() => {
    if (slug) return `Discover ${data.value?.category?.name} MCP Servers.`;
    return 'The largest collection of MCP Servers.';
  });

  const metaTile = computed(() => {
    if (slug) return `${data.value?.category?.name} - MCP Servers.`;
    return 'MCP Servers';
  });

  useSeoMeta({
    title: () => metaTile.value
  });
</script>

<template>
  <div>
    <SHero
      class="-mt-22"
      headline="MCP Servers"
      :subheadline="subheadline"
      :show-search-bar="false"
      :show-buttons="false"
    />
    <main>
      <div class="flex flex-col gap-y-6">
        <CollectionFilters
          :loading="status === 'pending'"
          :categories="slug ? undefined : categoriesFilters"
        />
        <MCPServerCardList
          v-model:page="page"
          :loading="status === 'pending'"
          :items="data?.servers || []"
          :pagination-limit="filters.limit"
          :pagination-total="data?.pagination.totalItems"
        />
      </div>

      <template v-if="data?.category.data">
        <CompanyArticleSection
          v-if="data.category.data.buyers_guide"
          :article="data.category.data.buyers_guide"
        />

        <UPageSection
          v-if="data.category.data.faqs && data.category.data.faqs.length"
          title="FAQs"
          class="mx-auto max-w-5xl"
        >
          <UPageAccordion :items="data.category.data.faqs" label-key="question">
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
        base-slug="mcp/servers/category"
      />
      <NewsletterSignupPageSection />
    </main>
  </div>
</template>
