<template>
  <div class="flex min-h-[50vh] w-full items-center justify-center p-6">
    <div class="w-full max-w-md rounded-md border border-gray-200 p-8 shadow-sm dark:border-gray-800">
      <div class="mb-6 text-center">
        <h2 class="mb-2 text-2xl font-semibold">Sign In</h2>
        <p class="text-gray-500 dark:text-gray-400">
          Continue with your preferred provider
        </p>
      </div>

      <div class="mx-auto max-w-xs space-y-3">
        <UButton v-for="provider in providers" :key="provider.id" variant="outline"
          class="flex w-full items-center justify-center gap-3 rounded-sm" @click="signIn(provider.id)">
          <!-- GitHub Icon -->
          <svg v-if="provider.id === 'github'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-github">
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>

          <!-- Google Icon -->
          <svg v-if="provider.id === 'google'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24">
            <path
              d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151C12.545 11.119 12.451 10.642 12.268 10.156L12.267 10.153H12.268L12.545 12.151Z"
              fill="none" />
            <path
              d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151C12.545 11.119 12.451 10.642 12.268 10.156L12.267 10.153H12.268L12.545 12.151Z"
              fill="none" />
            <path
              d="M5.5 12c0-.596.134-1.161.365-1.67l-2.927-2.243A9.968 9.968 0 0 0 2 12c0 1.575.365 3.062 1.006 4.39l2.94-2.258A5.477 5.477 0 0 1 5.5 12Z"
              fill="#FBBC05" />
            <path
              d="M12 5.5c1.456 0 2.755.58 3.712 1.495l2.482-2.476C16.461 2.86 14.401 2 12 2 8.143 2 4.831 4.269 3.38 7.501l2.927 2.243C7.038 7.271 9.298 5.5 12 5.5Z"
              fill="#EA4335" />
            <path
              d="M12 18.5c-2.7 0-4.964-1.768-5.693-4.244l-2.94 2.258C4.832 19.731 8.144 22 12 22c2.401 0 4.776-.806 6.505-2.358l-2.733-2.107c-.845.581-1.928.965-3.772.965Z"
              fill="#34A853" />
            <path
              d="M18.5 12c0-.765-.102-1.327-.307-1.917H12v3.699h3.724A3.315 3.315 0 0 1 14.5 15.61l2.733 2.107c1.613-1.49 2.617-3.688 2.617-6.117Z"
              fill="#4285F4" />
          </svg>

          <span>Continue with {{ provider.name }}</span>
        </UButton>
      </div>

      <div class="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        By signing in, you agree to our
        <a href="/legal/terms-conditions/" class="text-primary-600 dark:text-primary-400 hover:underline">Terms of
          Service</a>
        &
        <a href="/legal/privacy-policy/" class="text-primary-600 dark:text-primary-400 hover:underline">Privacy
          Policy</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const redirectTo = route.query.redirectTo || '/';
const { loggedIn } = useUserSession();
if (loggedIn.value) {
  navigateTo(redirectTo);
}
const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
]

const signIn = async (provider: string) => {
  window.location.href = `/api/auth/${provider}`;
};
</script>
