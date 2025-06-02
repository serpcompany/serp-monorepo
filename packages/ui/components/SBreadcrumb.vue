<script setup lang="ts">
const props = defineProps<{
  excludedRoutes?: (string | RegExp)[]
}>()

const route = useRoute()

const defaultExcludedRoutes = [
  '/',
  /^\/users\/.+/, // Matches any route under /users/
  /^\/[^/]+\/?$/, // Single-level routes like /about
] as const

const isExcluded = computed(() => {
  const routesToCheck = props.excludedRoutes || defaultExcludedRoutes
  return routesToCheck.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(route.path)
    }
    return route.path === pattern
  })
})

function getLastPathSegment() {
  // Extract the last segment from the path
  const segments = route.path.split('/').filter(Boolean)
  return segments.length > 0 ? segments[segments.length - 1] : ''
}

function getDisplayName(segment: string) {
  // Convert kebab-case or snake_case to readable text, keeping it lowercase
  return segment.replace(/-/g, ' ').replace(/_/g, ' ').toLowerCase()
}

const breadcrumbItems = computed(() => {
  // @ts-expect-error: Auto-imported from another layer
  const items = useBreadcrumbItems({
    schemaOrg: true,
  }).value as BreadcrumbItem[]

  // Check if the last segment is already included
  const lastSegment = getLastPathSegment()
  const lastSegmentUrl = route.path

  // If the last item doesn't match the last path segment, add it
  if (
    lastSegment
    && items.length > 0
    && !route.path.endsWith(items[items.length - 1]?.to?.toString() || '')
  ) {
    items.push({
      label: (
        (route.meta.title as string) || getDisplayName(lastSegment)
      ).toLowerCase(),
      to: lastSegmentUrl,
      type: undefined,
    })
  }

  // Make sure all labels are lowercase
  return items.map(item => ({
    ...item,
    label:
        typeof item.label === 'string' ? item.label.toLowerCase() : item.label,
  }))
})

const breadcrumbUI = {
  link: 'text-[10px] text-primary-500 dark:text-neutral-300 min-w-0 group relative flex items-center gap-1.5 focus-visible:outline-(--ui-primary)',
  separatorIcon: 'shrink-0 size-4 text-neutral-500 dark:text-neutral-400',
}
</script>

<template>
  <UBreadcrumb
    v-if="!isExcluded"
    class="lg:px6 z-5 mb-10 max-w-full px-4 py-4 md:px-6"
    :items="breadcrumbItems"
    :ui="breadcrumbUI"
  >
    <template #separator>
      <span class="text-xs">/</span>
    </template>
  </UBreadcrumb>
</template>
