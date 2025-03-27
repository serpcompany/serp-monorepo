<script setup lang="ts">
  const { signOut } = useAuth();
</script>

<template>
  <div>
    <UButton @click="signOut"> Sign Out </UButton>
  </div>
</template>
