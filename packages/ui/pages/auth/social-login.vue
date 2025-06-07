<template>
  <main class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-sm">
      <div class="flex flex-col gap-y-4 items-center">
        <AuthHeading
          title="Sign in to your account"
          description="Welcome back! Please sign in to continue."
        />
        <div class="w-full space-y-4">
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
