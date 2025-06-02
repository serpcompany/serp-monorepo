<script setup lang="ts">
  const data = await usePosts(1, 50, '', 'movies', true);
</script>

<template>
  <UPageList divide>
    <UPageCard
      v-for="post in data?.posts"
      :key="post.slug"
      variant="ghost"
      :to="`/movies/${post.slug}`"
    >
      <template #body>
        <UUser
          :name="post.keyword"
          :avatar="{ src: post.featuredImage }"
          size="xl"
        />
      </template>
    </UPageCard>
  </UPageList>
</template>
