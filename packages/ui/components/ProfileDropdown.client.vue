<script setup lang="ts">
  // @ts-expect-error: Auto-imported from another layer
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
        label: 'Submit',
        icon: 'i-lucide-plus',
        to: '/users/submit/company/'
      }
    ],
    [
      {
        label: 'Manage',
        type: 'label'
      },
      {
        label: 'Submissions',
        icon: 'i-lucide-file-text',
        to: '/users/submissions/'
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
        to: '/users/billing/'
      }
    ],
    [
      {
        label: 'Get Featured',
        icon: 'i-lucide-star',
        to: '/users/featured/',
        color: 'success'
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
