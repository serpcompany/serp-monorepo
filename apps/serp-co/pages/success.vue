<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  const redirectUrl = route.query.redirectTo
    ? String(route.query.redirectTo)
    : '/';

  const timeLeft = ref(10);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const redirectNow = () => {
    router.push(redirectUrl);
  };

  onMounted(() => {
    intervalId = setInterval(() => {
      timeLeft.value--;
      if (timeLeft.value <= 0) {
        clearInterval(intervalId!);
        redirectNow();
      }
    }, 1000);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<template>
  <div class="success-container">
    <h1>🎉 Success!</h1>
    <p>Your payment was processed successfully.</p>
    <p>
      Redirecting to
      <a href="#" @click.prevent="redirectNow">{{ redirectUrl }}</a>
      in {{ timeLeft }} seconds.
    </p>
  </div>
</template>
