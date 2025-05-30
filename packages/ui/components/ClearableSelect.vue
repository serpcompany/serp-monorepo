<script setup lang="ts">
  import type { SelectMenuProps } from '#ui/types';

  interface Props {
    items: Array<{ label: string; value: string }>;
    placeholder: string;
    size: SelectMenuProps['size'];
    searchInput?: boolean;
  }

  defineProps<Props>();
  const value = defineModel<string>({
    required: true
  });

  function handleRmValue(e: Event) {
    e.stopPropagation();
    value.value = '';
  }
</script>

<template>
  <USelectMenu
    v-model="value"
    :items="items"
    :search-input="searchInput"
    :placeholder="placeholder"
    :size="size"
    value-key="value"
    trailing-icon="lucide:chevrons-up-down"
  >
    <template #trailing>
      <template v-if="value.length">
        <UBadge
          as="button"
          icon="lucide:x"
          variant="outline"
          color="neutral"
          size="sm"
          @click="handleRmValue"
        />
      </template>
    </template>
  </USelectMenu>
</template>
