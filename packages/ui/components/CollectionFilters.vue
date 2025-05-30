<script setup lang="ts">
  interface Props {
    categories?: { label: string; value: string }[];
    loading: boolean;
  }

  defineProps<Props>();
  const route = useRoute();
  const state = reactive({
    q: (route.query.q as string) || '',
    category: (route.query.category as string) || '',
    sort: (route.query.sort as string) || ''
  });

  const sorts = [
    {
      label: 'Latest',
      value: 'createdAt:desc'
    },
    {
      label: 'Name (A to Z)',
      value: 'name:asc'
    },
    {
      label: 'Name (Z to A)',
      value: 'name:desc'
    }
  ];

  watch(state, () => {
    const query = Object.fromEntries(
      Object.entries(state).filter(([_, value]) => value.length)
    );

    return navigateTo({
      query,
      replace: true
    });
  });
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:flex md:flex-row">
    <UInput
      v-model="state.q"
      :loading="loading"
      class="col-span-2 w-full md:col-auto"
      icon="lucide:search"
      placeholder="Search products..."
      size="lg"
      variant="outline"
    />
    <ClearableSelect
      v-if="categories"
      v-model="state.category"
      :items="categories"
      class="w-full md:w-64"
      placeholder="Category"
      size="lg"
    />
    <ClearableSelect
      v-model="state.sort"
      :items="sorts"
      class="w-full md:w-48"
      placeholder="Order by"
      size="lg"
    />
  </div>
</template>
