<script setup lang="ts">
  definePageMeta({
    layout: 'user-dashboard'
  });

  const router = useRouter();
  router.replace({ path: '/users/dashboard/', replace: true });
</script>

<template>
  <div></div>
</template>
