<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>

    <ULabel>Name</ULabel>
    <UInput v-model="name" placeholder="Your full name" />

    <ULabel>Email</ULabel>
    <UInput v-model="email" placeholder="you@example.com" />

    <ULabel>Username</ULabel>
    <UInput v-model="username" placeholder="Username" />

    <ULabel>Password</ULabel>
    <UInput v-model="password" type="password" placeholder="Your password" />

    <UButton :disabled="loading" @click="handleSignup"> Sign Up </UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'sidebase-auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
});

const { signIn } = useAuth();

const name = ref('');
const email = ref('');
const username = ref('');
const password = ref('');

const error = ref('');
const loading = ref(false);

async function handleSignup() {
  error.value = '';
  loading.value = true;
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value
      }
    });

    // Sign in the user after successful registration.
    await signIn('credentials', {
      username: username.value,
      password: password.value,
      callbackUrl: '/'
    });
  } catch (err) {
    error.value = err.data?.error || 'Something went wrong!';
  } finally {
    loading.value = false;
  }
}
</script>
