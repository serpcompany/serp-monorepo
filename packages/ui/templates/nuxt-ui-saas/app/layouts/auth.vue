<template>
  <div class="flex h-screen items-center justify-center px-4">
    <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute top-8 left-8 z-10 rounded-full"
    />
    <UPageCard variant="subtle" class="w-full max-w-sm">
      <slot></slot>
    </UPageCard>
  </div>
</template>
