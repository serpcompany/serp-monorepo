<template>
  <div>
    <ULabel>Username</ULabel>
    <UInput v-model="username" />
    <ULabel>Password</ULabel>
    <UInput v-model="password" type="password" />
    <UButton @click="signIn('credentials', credentials)"> Sign In </UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'sidebase-auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
});

const { signIn } = useAuth();

const username = ref();
const password = ref();
const credentials = computed(() => ({
  username: username.value,
  password: password.value
}));
</script>
