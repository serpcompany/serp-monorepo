<template>
  <div>
    <UButton @click="signOut"> Sign Out </UButton>
  </div>
</template>

<script setup lang="ts">
const { status, signOut } = useAuth();

if (status.value === 'unauthenticated') {
  navigateTo('/');
}
</script>
