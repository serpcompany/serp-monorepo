<script setup lang="ts">
  const { user } = useUserSession()
  // const teams = useState<unknown[]>('teams', () => [])

  // // Fetch teams if not already loaded
  // if (!teams.value.length) {
  //   try {
  //     teams.value = await useTeam().getMemberships()
  //   }
  //   catch {
  //     // User might not have teams or there might be an error
  //     teams.value = []
  //   }
  // }

  const featuresCards = [
    {
      title: 'Get Featured',
      description: 'Learn how to get featured on our platform.',
      icon: 'lucide:search',
      to: '/dashboard/get-featured',
    },
    {
      title: 'Companies',
      description: 'Review or edit your companies.',
      icon: 'lucide:list',
      to: '/dashboard/companies',
    },
    {
      title: 'Submit Company',
      description: 'Submit or update your company details.',
      icon: 'lucide:pencil-ruler',
      to: '/dashboard/submit-company',
    },
  ]

  const accountManagementCards = [
    {
      title: 'Settings',
      description: 'Update profile and preferences.',
      icon: 'lucide:user',
      to: '/dashboard/account-settings',
    },
    {
      title: 'Security',
      description: 'Password and security settings.',
      icon: 'lucide:shield',
      to: '/dashboard/account-security',
    },
    {
      title: 'Billing',
      description: 'Manage your billing information and subscriptions.',
      icon: 'lucide:credit-card',
      to: '/dashboard/billing',
    },
  ]

  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <AppContainer title="Dashboard">
    <div class="space-y-8">
      <UCard>
        <h1 class="text-2xl font-bold text-highlighted">
          Welcome back, {{ user?.name || user?.email || "User" }}
        </h1>
        <p class="text-default">
          Manage your account, billing, and personal workspace from your dashboard.
        </p>
      </UCard>

      <UPageGrid class="lg:grid-cols-2">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:bookmark" class="text-primary size-5" />
              <h2 class="text-base font-semibold text-highlighted">
                Bookmarks
              </h2>
            </div>
          </template>

          <div class="text-center">
            <UIcon
              name="lucide:bookmark"
              class="mx-auto mb-2 text-3xl text-muted"
            />
            <p class="text-dimmed">
              Coming soon
            </p>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:activity" class="text-primary size-5" />
              <h2 class="text-base font-semibold text-highlighted">
                Recent Activity
              </h2>
            </div>
          </template>

          <div class="text-center">
            <UIcon
              name="lucide:activity"
              class="mx-auto mb-2 text-3xl text-muted"
            />
            <p class="text-dimmed">
              Coming soon
            </p>
          </div>
        </UCard>
      </UPageGrid>

      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-highlighted">
          Features
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="card in featuresCards"
            :key="card.title"
            :to="card.to"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
          />
        </UPageGrid>
      </div>

      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-highlighted">
          Account Management
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="card in accountManagementCards"
            :key="card.title"
            :to="card.to"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
          />
        </UPageGrid>
      </div>

      <!--
      <div
        v-if="teams?.length > 0"
        class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Your Teams
          </h2>
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
                {{ team.name?.charAt(0) || "T" }}
              </div>
              <div>
                <h3 class="font-medium">
                  {{ team.name }}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ team.slug }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div
        v-else
        class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="text-center">
          <UIcon
            name="i-lucide-users"
            class="mx-auto mb-4 text-4xl text-neutral-400"
          />
          <h2 class="mb-2 text-lg font-semibold">
            Create a Team
          </h2>
          <p class="mb-4 text-neutral-600 dark:text-neutral-400">
            Collaborate with others by creating a team workspace.
          </p>
          <UButton @click="navigateTo('/dashboard/onboard')">
            Create Your First Team
          </UButton>
        </div>
      </div>
       -->
    </div>
  </AppContainer>
</template>
