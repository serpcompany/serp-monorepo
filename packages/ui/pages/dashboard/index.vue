<script setup lang="ts">
  const { user } = useUserSession();
  const teams = useState<unknown[]>('teams', () => []);

  // Fetch teams if not already loaded
  if (!teams.value.length) {
    try {
      teams.value = await useTeam().getMemberships();
    } catch {
      // User might not have teams or there might be an error
      teams.value = [];
    }
  }
</script>

<template>
  <AppContainer>
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div
        class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h1 class="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Welcome back, {{ user?.name || user?.email || 'User' }}
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          Manage your account, billing, and personal workspace from your
          dashboard.
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-md"
          @click="navigateTo('/dashboard/billing')"
        >
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-credit-card"
              class="text-primary-500 text-2xl"
            />
            <div>
              <h3 class="font-medium">Billing</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Manage subscription and payments
              </p>
            </div>
          </div>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-md"
          @click="navigateTo('/dashboard/account-settings')"
        >
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-user" class="text-primary-500 text-2xl" />
            <div>
              <h3 class="font-medium">Account Settings</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Update profile and preferences
              </p>
            </div>
          </div>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-md"
          @click="navigateTo('/dashboard/account-security')"
        >
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-shield" class="text-primary-500 text-2xl" />
            <div>
              <h3 class="font-medium">Security</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Password and security settings
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Teams Section -->
      <div
        v-if="teams?.length > 0"
        class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">Your Teams</h2>
          <UButton
            variant="outline"
            @click="navigateTo('/dashboard?useTeams=true')"
          >
            Switch to Teams View
          </UButton>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="team in teams"
            :key="team.id"
            class="cursor-pointer p-4 transition-shadow hover:shadow-md"
            @click="navigateTo(`/dashboard/${team.slug}`)"
          >
            <div class="flex items-center gap-3">
              <div
                class="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white"
              >
                {{ team.name?.charAt(0) || 'T' }}
              </div>
              <div>
                <h3 class="font-medium">{{ team.name }}</h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ team.slug }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Create Team Option -->
      <div
        v-else
        class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="text-center">
          <UIcon
            name="i-lucide-users"
            class="mx-auto mb-4 text-4xl text-neutral-400"
          />
          <h2 class="mb-2 text-lg font-semibold">Create a Team</h2>
          <p class="mb-4 text-neutral-600 dark:text-neutral-400">
            Collaborate with others by creating a team workspace.
          </p>
          <UButton @click="navigateTo('/dashboard/onboard')">
            Create Your First Team
          </UButton>
        </div>
      </div>

      <!-- Coming Soon Sections -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <UIcon name="i-lucide-bookmark" class="text-primary-500" />
            Bookmarks
          </h2>
          <div class="py-8 text-center">
            <UIcon
              name="i-lucide-bookmark"
              class="mx-auto mb-2 text-3xl text-neutral-400"
            />
            <p class="text-neutral-600 dark:text-neutral-400">Coming soon</p>
          </div>
        </div>

        <div
          class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <UIcon name="i-lucide-activity" class="text-primary-500" />
            Recent Activity
          </h2>
          <div class="py-8 text-center">
            <UIcon
              name="i-lucide-activity"
              class="mx-auto mb-2 text-3xl text-neutral-400"
            />
            <p class="text-neutral-600 dark:text-neutral-400">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>
