<template>
  <div></div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const fullRoute = router.currentRoute.value.path + 'reviews/';
router.replace({ path: fullRoute, replace: true });
</script>
