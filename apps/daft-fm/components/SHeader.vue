<!-- components/SHeader.vue -->
<template>
  <div class="container mx-auto my-4 px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- left: brand logo -->
      <div>
        <nuxt-link to="/" aria-label="homepage">
          <s-logo />
        </nuxt-link>
      </div>

      <!-- middle: navigation -->
      <!-- nav links -->
      <div>
        <u-navigation-menu :items="items" />
      </div>

      <!-- right: profile avatar thing -->
      <div>
        <!-- <u-avatar /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Artists',
    to: '/artists'
  },
  {
    label: 'Albums',
    to: '/albums'
  },
  {
    label: 'Songs',
    to: '/songs'
  }
]
</script>
