<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="All auth options"
        />
        <div class="space-y-2">
          <UButton
            to="/auth/login"
            block
            color="neutral"
            size="lg"
            icon="i-lucide-lock"
            variant="subtle"
          >
            Email Password
          </UButton>
          <UButton
            to="/auth/magic-link"
            block
            color="neutral"
            size="lg"
            icon="i-lucide-link"
            variant="subtle"
          >
            Magic Link
          </UButton>
          <UButton
            to="/auth/login-passkey"
            block
            color="neutral"
            size="lg"
            icon="i-lucide-fingerprint"
            variant="subtle"
          >
            Passkey
          </UButton>
          <UButton
            to="/auth/login-phone"
            block
            color="neutral"
            size="lg"
            icon="i-lucide-phone"
            variant="subtle"
          >
            Phone
          </UButton>
          <AuthSocialLoginButton
            label="Google"
            icon="i-logos-google-icon"
            provider="google"
          />
          <AuthSocialLoginButton
            label="Github"
            icon="i-mdi-github"
            provider="github"
          />
          <AuthSocialLoginButton
            label="Discord"
            icon="i-logos-discord-icon"
            provider="discord"
          />
        </div>
      </div>
    </div>
  </main>
</template>
