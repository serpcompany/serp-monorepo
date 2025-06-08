<script lang="ts" setup>
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

  const model = defineModel<boolean>({ required: true })
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const smallerThanLg = breakpoints.smaller('lg')
</script>

<template>
  <div
    v-if="!smallerThanLg"
    class="relative hidden w-0 flex-col items-stretch overflow-hidden bg-elevated/25 border-r border-default p-2 md:flex md:w-64"
  >
    <slot></slot>
  </div>
  <USlideover
    v-else
    v-model:open="model"
    side="left"
    :ui="{ content: 'max-w-[75%] sm:max-w-[50%]' }"
  >
    <template #content>
      <div class="flex h-full flex-col p-2">
        <slot></slot>
      </div>
    </template>
  </USlideover>
</template>
