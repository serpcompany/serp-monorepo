<template>
  <div>
    <!-- hero -->
    <s-hero
      headline="Grow Your Business With Expert Advice "
      subheadline="Discover top-rated companies and tools for your business."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <!-- rows: companies -->
      <div class="space-y-4">
        <company-card
          v-for="company in data.companies"
          :key="company.slug"
          :company="company"
        />
      </div>

      <!-- pagination -->
      <div class="mt-20 flex justify-center">
        <UPagination
          v-model:page="page"
          :total="data?.pagination?.totalItems"
          :items-per-page="limit"
          :sibling-count="3"
          aria-label="pagination"
          class="overflow-x-auto rounded-none"
        />
      </div>

      <!-- link hub -->
      <s-link-hub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="products/best"
        class="mt-20"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);
const categories = await useCompanyCategories();

let data = await useCompanies(page.value, limit.value);

watch([page, limit], async ([newPage, newLimit]) => {
  const query = { ...route.query };
  if (newPage !== 1) {
    query.page = String(newPage);
  } else {
    delete query.page;
  }
  if (newLimit !== 50) {
    query.limit = String(newLimit);
  } else {
    delete query.limit;
  }
  data = await useCompanies(page.value, limit.value);
  router.push({ query });
});

useSeoMeta({
  title: 'Home'
});
</script>
