<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);

  const slug = route.params.slug as string;

  const categories = await useServiceProviderCategories();

  let data = await useServiceProviders(page.value, limit.value, slug);
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

    data = await useServiceProviders(page.value, limit.value);
    router.push({ query });
  });

  useSeoMeta({
    title: () =>
      data.category
        ? `Discover the best ${data.category.name} service providers on the internet.`
        : 'Discover the best service providers on the internet.'
  });
</script>

<template>
  <div class="pb-10">
    <!-- hero -->
    <SHero
      :headline="
        data.category
          ? `Search top ${data.category.name} service providers`
          : 'Search top service providers'
      "
      subheadline="Discover top-rated service providers."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <!-- rows: serviceProviders -->
      <div class="space-y-4">
        <ServiceProviderCard
          v-for="serviceProvider in data.serviceProviders"
          :key="serviceProvider.slug"
          :service-provider="serviceProvider"
          :base-slug="'service-providers/'"
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

      <!-- article -->
      <section v-if="data?.category?.buyersGuide" class="mt-20">
        <CompanyArticleSection :article="data?.category?.buyersGuide" />
      </section>

      <!-- faqs -->
      <UPageSection
        v-if="data?.category?.faqs"
        title="FAQs"
        class="mx-auto max-w-5xl"
      >
        <UPageAccordion
          :items="faqItems"
          :ui="{ body: { class: 'prose dark:prose-invert' } }"
        >
          <template #body="{ item }">
            <div
              class="prose dark:prose-invert max-w-full"
              v-html="item.content"
            ></div>
          </template>
        </UPageAccordion>
      </UPageSection>

      <!-- link hub -->
      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="service-providers/best"
      />

      <NewsletterSignupPageSection />
    </UMain>
  </div>
</template>
