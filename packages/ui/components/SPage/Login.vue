<template>
  <div>
    <UButton
      v-for="provider in providers"
      :key="provider.id"
      @click="signIn(provider.id)"
    >
      Sign in with {{ provider.name }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const redirectTo = route.query.redirectTo || '/';
const { signIn, getProviders, status } = useAuth();
if (status.value === 'authenticated') {
  navigateTo(redirectTo);
}
const providers = await getProviders();
</script>
