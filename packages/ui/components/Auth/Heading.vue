<script setup lang="ts">
  interface Props {
    title: string
    description?: string
    linkLabel?: string
    linkTo?: string
  }

  defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-y-4 items-center">
    <SLogo />
    <div class="text-center space-y-2">
      <p class="text-lg font-bold">
        {{ title }}
      </p>
      <p v-if="description" class="text-sm text-muted">
        {{ description }}
        <template v-if="linkLabel && linkTo">
          <UButton
            :label="linkLabel"
            :to="linkTo"
            class="font-normal p-0"
            color="neutral"
            trailing-icon="lucide:arrow-right"
            variant="link"
            :ui="{
              trailingIcon: 'size-4',
            }"
          />
        </template>
      </p>
    </div>
  </div>
</template>
