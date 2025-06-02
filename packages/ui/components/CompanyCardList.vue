<script setup lang="ts">
import type { Company } from '@serp/types/types'

interface Props {
  items: Company[]
  paginationTotal?: number
  paginationLimit?: number
  loading?: boolean
}

defineProps<Props>()

const page = defineModel<number>('page', {
  default: 1,
})
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <template v-if="loading">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SkeletonCompanyCard />
        <SkeletonCompanyCard />
      </div>
    </template>
    <template v-else-if="items.length">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CompanyCard
          v-for="company in items"
          :key="company.slug"
          :company="company"
        />
      </div>
      <div class="flex justify-center">
        <UPagination
          v-model:page="page"
          :total="paginationTotal"
          :items-per-page="paginationLimit"
          :sibling-count="3"
          aria-label="pagination"
        />
      </div>
    </template>
    <template v-else>
      <UAlert
        variant="outline"
        color="neutral"
        description="No items found for the given filters."
      />
    </template>
  </div>
</template>
