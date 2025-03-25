<template>
  <div class="py-10">
    <!-- hero -->
    <SHero
      :headline="`The Best ${data.categoryName}`"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <!-- rows: companies -->
      <div class="space-y-4">
        <CompanyCard
          v-for="company in data.companies"
          :key="company.slug"
          :company="company"
        />
      </div>

      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="mt-20 flex justify-center overflow-x-auto rounded-none"
      />

      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="products/best"
      />

      <!-- company category article -->
      <section v-if="data.categoryArticle" class="mt-20">
        <CompanyArticleSection :article="data.categoryArticle" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);
const categories = await useCompanyCategories();
const slug = route.params.slug as string;

let data = await useCompanies(page.value, limit.value, slug);
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
  data = await useCompanies(page.value, limit.value, slug);
  router.push({ query });
});

useSeoMeta({
  title: () => `The Best ${data.categoryName} Providers`
});
</script>
