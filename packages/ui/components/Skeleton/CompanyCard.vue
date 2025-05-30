<template>
  <UCard
    :ui="{
      root: 'flex flex-col divide-dashed transition-all',
      body: 'p-5 sm:p-5 flex-grow',
      footer: `px-5 py-4 sm:px-5 bg-gray-50 dark:bg-black/10 rounded-b-lg`
    }"
    variant="outline"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <div class="bg-muted size-auto rounded-sm border border-(--ui-border)">
          <USkeleton class="h-12 w-12 rounded-sm" />
        </div>
        <div class="flex flex-1 items-center gap-x-2">
          <div class="flex flex-col gap-2">
            <USkeleton class="h-7 w-32" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <USkeleton class="h-3.5" />
        <div class="inline-flex flex-wrap items-center gap-2">
          <USkeleton
            v-for="index in 3"
            :key="index"
            class="h-4 w-16 rounded-full"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row items-center gap-3">
        <USkeleton class="h-7 w-20" />
        <USkeleton class="ml-auto h-7 w-7" />
      </div>
    </template>
  </UCard>
</template>
