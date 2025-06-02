<script setup lang="ts">
import type { Faq } from '@serp/types/types'

const router = useRouter()
const route = useRoute()

const page = ref(Number(route.query.page) || 1)
const limit = ref(Number(route.query.limit) || 50)
const categories = await useCompanyCategories()

const slug = route.params.slug as string

let data = await useServiceProviders(page.value, limit.value, slug)
if (!data) {
  router.push('/404')
}
const faqItems = computed(() => {
  if (!data?.category?.faqs || !data?.category?.faqs.length) {
    return []
  }
  // @todo - improve the typesafety of this after implementing zod
  return data?.category?.faqs.map((faq: Faq) => ({
    label: faq.question,
    content: faq.answer,
  }))
})

watch([page, limit], async ([newPage, newLimit]) => {
  const query = { ...route.query }
  if (newPage !== 1) {
    query.page = String(newPage)
  }
  else {
    delete query.page
  }
  if (newLimit !== 50) {
    query.limit = String(newLimit)
  }
  else {
    delete query.limit
  }
  data = await useServiceProviders(page.value, limit.value, slug)
  router.push({ query })
})

useSeoMeta({
  title: () => `The Best ${data?.category?.name} Providers`,
})
</script>

<template>
  <UPage>
    <!-- hero -->
    <SHero
      :headline="`The Best ${data?.category?.name}`"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
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
            />
          </template>
        </UPageAccordion>
      </UPageSection>
      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="products/best"
      />
    </UMain>
  </UPage>
</template>
