<script setup lang="ts">
  import type { Team } from '@serp/db/types/database'

  const { user } = useUserSession()
  const { logout } = useAuth()

  async function onTeamCreated(team: Team) {
    await navigateTo(`/dashboard/${team.slug}`)
  }

  async function signOut() {
    await logout()
    await navigateTo('/')
  }
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <UContainer class="w-full py-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold">
          Welcome {{ user?.name }}
        </h1>
        <p class="mt-2 text-neutral-500">
          Let's get you started by creating your first team.
        </p>
      </div>
      <div class="mx-auto mt-12 max-w-md">
        <AppNewTeamForm @success="onTeamCreated" />
      </div>
      <div class="mt-4 flex justify-center">
        <UButton
          variant="ghost"
          color="neutral"
          size="lg"
          icon="i-lucide-arrow-left"
          label="Sign out"
          @click="signOut"
        />
      </div>
    </UContainer>
  </main>
</template>
