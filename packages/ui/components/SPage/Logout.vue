<template>
  <div>
    <UButton @click="clear"> Sign Out </UButton>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, clear } = useUserSession()

if (!loggedIn.value) {
  navigateTo('/');
}
</script>
