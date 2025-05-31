<script setup lang="ts">
  const links = [
    {
      label: 'Explore',
      to: '/products/',
      icon: 'lucide:search',
      class: 'rounded-lg'
    },
    {
      label: 'Solutions',
      to: 'https://solutions.serp.co',
      color: 'neutral' as const,
      variant: 'subtle' as const,
      trailingIcon: 'lucide:arrow-right',
      class: 'rounded-lg'
    }
  ];
</script>

<template>
  <UPageHero
    title="Grow Big or Go Home"
    description="Discover top-rated companies for all your online business needs. Our curated listings help you find trusted partners to scale your business."
    headline="The Most Popular Tools Online"
    orientation="vertical"
    :links="links"
  />
</template>
