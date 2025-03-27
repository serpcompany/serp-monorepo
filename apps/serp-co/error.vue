<script setup>
  const error = useError();
  const handleError = () => {
    clearError({
      redirect: '/'
    });
  };
</script>

<template>
  <NuxtLayout>
    <div class="mt-40 flex h-full flex-col items-center justify-center">
      <template v-if="error.statusCode === 404">
        <h1>404</h1>
        <p class="mb-12">Page Not Found</p>
      </template>
      <template v-else>
        <h1>{{ error.statusCode }}</h1>
        <p>{{ error.message }}</p>
      </template>
      <UButton class="cursor-pointer text-lg" @click="handleError"
        >Go Home</UButton
      >
    </div>
  </NuxtLayout>
</template>
