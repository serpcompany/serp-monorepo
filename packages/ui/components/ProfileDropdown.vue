<template>
  <UDropdownMenu
    v-if="data?.user"
    :items="items"
    :ui="{
      content: 'w-48'
    }"
  >
    <UAvatar :src="data?.user?.image" />
  </UDropdownMenu>
  <UButton v-else to="/login">Login</UButton>
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
  // [
  //     {
  //         label: 'Profile',
  //         icon: 'i-lucide-user'
  //     },
  // ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      onSelect(event) {
        event.preventDefault();
        signOut();
      }
    }
  ]
]);
</script>
