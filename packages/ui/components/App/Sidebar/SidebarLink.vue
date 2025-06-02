<script lang="ts" setup>
defineProps<{
  to: string
  icon: string
  label: string
}>()
const mobileMenu = useState('mobileMenu')
</script>

<template>
  <ULink
    :to="to"
    exact
    class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-neutral-200/80 dark:hover:bg-white/20"
    active-class="text-neutral-900 dark:text-white bg-neutral-200/70 dark:bg-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/20"
    inactive-class="text-[var(--ui-text-muted)]"
    @click="mobileMenu = false"
  >
    <UIcon :name="icon" class="h-4 w-4" />
    <p class="text-sm">
      {{ label }}
    </p>
  </ULink>
</template>
