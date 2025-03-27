<script setup lang="ts">
  const { loggedIn, user, clear } = useUserSession();
  const items = ref([
    [
      {
        label: user?.value?.name,
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
          clear();
        }
      }
    ]
  ]);
</script>

<template>
  <UDropdownMenu
    v-if="loggedIn"
    :items="items"
    :ui="{
      content: 'w-48'
    }"
  >
    <UAvatar :src="user?.image" role="button" />
  </UDropdownMenu>
  <NuxtLink v-else to="/login" class="text-sm font-medium hover:underline"
    >Login</NuxtLink
  >
</template>
