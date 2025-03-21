<template>
  <div class="pb-10">
    <!-- hero -->
    <SHero
      headline="Products, Software & Services."
      subheadline="Discover top-rated software, tools & services."
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

      <u-pagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="mt-20 flex justify-center overflow-x-auto rounded-none"
      />

      <!-- link hub -->
      <s-link-hub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="products/best"
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
if (!data) {
  router.push('/404');
}

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
  title: 'Discover the best products on the internet.'
});
</script>
