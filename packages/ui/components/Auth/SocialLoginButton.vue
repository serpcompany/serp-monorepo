<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  });
  const loading = ref(false);
  function open() {
    loading.value = true;
    window.location.href = `/api/auth/oauth/${props.provider}`;
  }
</script>

<template>
  <UButton
    :loading="loading"
    :disabled="loading"
    external
    block
    color="neutral"
    size="lg"
    :icon="icon"
    variant="subtle"
    @click="open"
  >
    {{ label }}
  </UButton>
</template>
