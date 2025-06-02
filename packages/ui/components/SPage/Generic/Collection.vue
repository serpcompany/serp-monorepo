<script setup lang="ts">
const props = defineProps<{
  module: string
  baseSlug: string
  categoryBaseSlug: string
}>()
const router = useRouter()
const route = useRoute()
const page = ref(Number(route.query.page) || 1)
const limit = ref(Number(route.query.limit) || 50)
const categorySlug = route.params.slug as string

const toast = useToast()

const { module, baseSlug, categoryBaseSlug } = toRefs(props)

if (!baseSlug.value || !categoryBaseSlug.value) {
  router.push('/404')
}

// @ts-expect-error: auto‑imported from another layer
let data = await useEntities(
  page.value,
  limit.value,
  categorySlug,
  module.value,
)
if (!data) {
  router.push('/404')
}

const categories = await useEntityCategories(module.value)

watch([page, limit], async ([newPage, newLimit]) => {
  const query: Record<string, string> = {
    ...(route.query as Record<string, string>),
  }

  if (newPage !== 1)
    query.page = String(newPage)
  else delete query.page

  if (newLimit !== 50)
    query.limit = String(newLimit)
  else delete query.limit

  // @ts-expect-error: auto‑imported from another layer
  data = await useEntities(
    page.value,
    limit.value,
    categorySlug,
    module.value,
  )
  router.push({ query })
})

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

useSeoMeta({
  title: () => {
    if (categorySlug) {
      return `${data.category.name} - Collection`
    }
    return 'Collection'
  },
})
</script>

<template>
  <SHero
    headline="Collection"
    :subheadline="
      categorySlug
        ? `Discover ${data.category.name}.`
        : 'The largest collection.'
    "
    :show-search-bar="false"
    :show-buttons="false"
  />
  <main>
    <div class="space-y-4">
      <EntityCard
        v-for="entity in data.entities"
        :key="entity.id"
        :entity="entity"
        :base-slug="baseSlug"
        :category-base-slug="categoryBaseSlug"
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
      :base-slug="categoryBaseSlug"
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
  </main>
  <NewsletterSignupPageSection />
</template>
