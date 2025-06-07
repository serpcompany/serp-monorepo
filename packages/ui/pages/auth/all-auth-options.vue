<script setup lang="ts">
  const authOptions = [
    { label: 'Email Password', icon: 'lucide:lock', to: '/auth/login' },
    { label: 'Magic Link', icon: 'lucide:link', to: '/auth/magic-link' },
    { label: 'Passkey', icon: 'lucide:fingerprint', to: '/auth/login-passkey' },
    { label: 'Phone', icon: 'lucide:phone', to: '/auth/login-phone' },
  ]

  const authProviders = [
    { label: 'Google', icon: 'logos:google-icon', provider: 'google' },
    { label: 'Github', icon: 'mdi:github', provider: 'github' },
    { label: 'Discord', icon: 'logos:discord-icon', provider: 'discord' },
  ]
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="All auth options"
        />
        <div class="space-y-2">
          <UButton
            v-for="option in authOptions"
            :key="option.icon"
            :icon="option.icon"
            :label="option.label"
            :to="option.to"
            block
            color="neutral"
            size="lg"
            variant="subtle"
          />
          <AuthSocialLoginButton
            v-for="provider in authProviders"
            :key="provider.provider"
            :label="provider.label"
            :icon="provider.icon"
            :provider="provider.provider"
          />
        </div>
      </div>
    </div>
  </main>
</template>
