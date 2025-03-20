<template>
  <UDropdownMenu
    v-if="data?.user"
    :items="items"
    :ui="{
      content: 'w-48'
    }"
  >
    <UAvatar :src="data?.user?.image" role="button" />
  </UDropdownMenu>
  <NuxtLink v-else to="/login" class="text-sm font-medium hover:underline"
    >Login</NuxtLink
  >
</template>

<script setup lang="ts">
const { data, signOut } = useAuth();
const items = ref([
  [
    {
      label: data?.value?.user?.name,
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      onSelect(event: Event) {
        event.preventDefault();
        signOut();
      }
    }
  ]
]);
</script>
