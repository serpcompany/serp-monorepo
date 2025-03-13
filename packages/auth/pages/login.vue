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
definePageMeta({
  middleware: 'sidebase-auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
});

const { signIn, getProviders } = useAuth();
const providers = await getProviders();
</script>
