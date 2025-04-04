<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();

  const success = route.query.success;
  const cancel = route.query.cancel;
  const error = route.query.error;
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
    <div v-if="success == 'true'">
      <h1>🎉 Success!</h1>
      <p>Your payment was processed successfully.</p>
    </div>
    <div v-else-if="cancel == 'true'">
      <h1>❌ Cancelled</h1>
      <p>Your payment was cancelled.</p>
    </div>
    <div v-else-if="error">
      <h1>⚠️ Error</h1>
      <p>There was an error processing your payment. - {{ error }}</p>
    </div>
    <div v-else>
      <h1>❓ Unknown</h1>
      <p>Unknown error.</p>
    </div>
    <p>
      Redirecting to
      <a href="#" @click.prevent="redirectNow">{{ redirectUrl }}</a>
      in {{ timeLeft }} seconds.
    </p>
  </div>
</template>
