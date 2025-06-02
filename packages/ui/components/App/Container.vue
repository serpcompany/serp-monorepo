<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title: string;
      description?: string;
      padding?: boolean;
    }>(),
    {
      padding: true,
    },
  );
  const mobileMenu = useState('mobileMenu');
</script>

<template>
  <header
    class="sticky top-0 z-40 flex h-12 items-center gap-2 bg-white px-4 dark:bg-neutral-900"
  >
    <UButton
      icon="i-lucide-panel-left"
      color="neutral"
      variant="ghost"
      class="flex lg:hidden"
      @click="mobileMenu = !mobileMenu"
    />
    <div class="min-w-0 flex-1">
      <h1 class="flex-1 truncate font-bold">
        {{ title }}
      </h1>
    </div>
    <slot name="actions" />
  </header>
  <div :class="{ 'p-4': padding }">
    <slot />
  </div>
</template>
