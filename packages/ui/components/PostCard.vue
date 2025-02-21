<template>
  <article :class="articleClass">
    <nuxt-link :to="`/${baseSlug}${post.slug}/`">
      <nuxt-img
                v-if="post.image"
                :src="post.image"
                :alt="post.title"
                class="mb-6 h-64 w-full object-cover" />
      <!-- Title -->
      <h2 class="mb-2 text-xl hover:underline">
        {{ post.title }}
      </h2>
    </nuxt-link>

    <p v-if="post.author" class="mb-2 italic">
      <span>By {{ post.author }}</span><span v-if="post.createdAt"> | {{ post.createdAt }}</span>
    </p>
    <p v-if="post.excerpt" class="mb-8">{{ post.excerpt }}</p>

    <s-pill
            v-if="post.categories && post.categories.length"
            :base-slug="`${baseSlug}/category`"
            :items="post.categories" />
  </article>
</template>

<script setup lang="ts">
import type { PostIndex } from '@serp/types/types';

withDefaults(defineProps<{
  post: PostIndex;
  baseSlug?: string;
  articleClass?: string;
}>(), {
  baseSlug: 'posts',
  articleClass: 'py-16',
});
</script>
