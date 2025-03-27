<script setup lang="ts">
  const { loggedIn, clear } = useUserSession();

  if (!loggedIn.value) {
    navigateTo('/');
  }
</script>

<template>
  <div>
    <UButton @click="clear"> Sign Out </UButton>
  </div>
</template>
