<script setup lang="ts">
import type { PostIndex } from '@serp/types/types'

const props = withDefaults(
  defineProps<{
    post: PostIndex
    baseSlug?: string
    articleClass?: string
    title?: string
  }>(),
  {
    baseSlug: 'posts/',
    articleClass: 'py-16',
    title: undefined,
  },
)

const displayTitle = computed(() => {
  if (props.post.module === 'Glossary') {
    return props.post.keyword || props.post.title || props.post.name
  }
  if (props.title) {
    return props.title
  }
  return props.post.title || props.post.name
})

const formattedDate = computed(() => {
  if (!props.post.createdAt)
    return ''

  // Parse date string as UTC to ensure consistent behavior across timezones
  const date = new Date(`${props.post.createdAt}T00:00:00.000Z`)
  const month = date
    .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase()
  const day = date.getUTCDate().toString().padStart(2, '0')
  const year = date.getUTCFullYear()

  return `${month} ${day} ${year}`
})
</script>

<template>
  <article
    class="grid grid-cols-1 gap-6 lg:grid-cols-12"
    :class="[articleClass]"
  >
    <div class="lg:col-span-8">
      <NuxtLink :to="`/${baseSlug}${encodeURIComponent(post.slug)}/`">
        <LazyNuxtImg
          v-if="post.featuredImage"
          :src="post.featuredImage"
          :alt="displayTitle"
          class="mb-6 h-64 w-full object-cover"
        />
        <!-- Title -->
        <h2 class="mb-4 text-4xl font-extrabold hover:underline">
          {{ displayTitle }}
        </h2>
      </NuxtLink>

      <p class="mb-4 text-xl">
        <span>{{ post.excerpt }}</span>
      </p>

      <div v-if="post.author" class="mb-4">
        <span v-if="post.createdAt" class="mr-1 text-sm font-medium">
          {{ formattedDate }}
        </span>
        <span>–</span>
        <span class="ml-1 text-sm font-medium">
          {{ post.author.toUpperCase() }}
        </span>
      </div>
      <SPill
        v-if="post.categories && post.categories.length"
        :base-slug="`${baseSlug}category`"
        :items="post.categories"
        class="mt-4"
      />
    </div>

    <div class="lg:col-span-3 lg:col-start-8">
      <!-- Right column (30%) -->
    </div>
  </article>
</template>
// Test lint-staged
