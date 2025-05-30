<template>
  <div class="relative isolate">
    <UContainer
      class="flex flex-col gap-8 px-0 py-16 sm:gap-16 sm:px-0 sm:py-24 lg:px-0 lg:py-24 lg:py-32"
    >
      <div>
        <USkeleton class="h-12 w-10" />
      </div>
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8 lg:grid-cols-3"
      >
        <USkeleton v-for="_i in 9" :key="_i" class="h-6 w-full" />
      </div>
    </UContainer>
  </div>
</template>
