<template>
  <UCard
    :ui="{
      root: 'flex flex-col divide-dashed transition-all',
      body: 'p-5 sm:p-5 flex-grow',
      footer:
        'px-5 py-4 sm:px-5 sm:py-4 bg-gray-50 dark:bg-black/10 rounded-b-lg'
    }"
  >
    <div class="flex flex-col gap-3">
      <USkeleton class="h-6 w-48" />
      <USkeleton class="h-3.5 w-64" />
      <div class="flex flex-row flex-wrap items-center justify-start gap-1.5">
        <USkeleton v-for="i in 3" :key="i" class="h-3.5 w-16" />
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row items-center gap-3">
        <div class="inline-flex items-center gap-1.5">
          <UIcon name="lucide:star" class="size-4" />
          <span class="text-muted text-xs">0</span>
        </div>
        <div class="inline-flex items-center gap-1.5">
          <UIcon name="lucide:git-fork" class="size-4" />
          <span class="text-muted text-xs">0</span>
        </div>
        <UButton
          variant="ghost"
          size="xs"
          icon="lucide:external-link"
          class="ml-auto"
        />
      </div>
    </template>
  </UCard>
</template>
