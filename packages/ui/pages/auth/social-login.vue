<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <SLogo />
      <div class="text-center">
        <p class="text-lg font-bold">
          Sign in to your account
        </p>
        <p class="text-sm text-neutral-500">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <div class="space-y-2">
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
  </main>
</template>
