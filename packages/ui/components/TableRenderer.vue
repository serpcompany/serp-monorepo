<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'
  import { NuxtLink } from '#components'
  import JSONRenderer from '~/components/JSONRenderer.vue'

  type Row = Record<string, unknown>

  const props = defineProps<{ value: Row[], baseSlug: string }>()

  const columns = computed<TableColumn<Row>[]>(() => {
    const sample = props.value?.[0] ?? {}

    return Object.keys(sample).map<TableColumn<Row>>(key => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }) => {
        const cellValue = row.original[key]

        // { name, slug } ➜ clickable link
        if (
          cellValue &&
          typeof cellValue === 'object' &&
          'name' in cellValue &&
          'slug' in cellValue
        ) {
          return h(
            NuxtLink,
            {
              to: `/${props.baseSlug}${cellValue.slug}`,
              class: 'text-primary underline',
            },
            { default: () => cellValue.name },
          )
        }

        return h(JSONRenderer, { value: cellValue, baseSlug: props.baseSlug })
      },
    }))
  })
</script>

<template>
  <!-- TanStack-powered Nuxt UI table -->
  <UTable :data="value" :columns="columns" class="w-full" />
</template>
