<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()

  const page = ref(Number(route.query.page) || 1)
  const limit = ref(Number(route.query.limit) || 50)
  const categories = await usePostCategories()

  let data = await usePosts(page.value, limit.value, '', 'Blog')
  if (!data) {
    router.push('/404')
  }

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
    data = await usePosts(page.value, limit.value)
    router.push({ query })
  })

  useSeoMeta({
    title: 'Posts',
  })
</script>

<template>
  <div>
    <SectionHeroOne title="Blog" />

    <div class="pb-20">
      <!-- rows: posts -->
      <div class="space-y-4">
        <PostCard v-for="post in data.posts" :key="post.id" :post="post" />
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
        base-slug="posts/category"
      />
    </div>
    <NewsletterSignupPageSection />
  </div>
</template>
