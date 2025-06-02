<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'

const { data: teams } = useFetch('/api/super-admin/teams')
const columns = ['Name', 'Owner', 'Members', 'Subscription', 'Created At']
</script>

<template>
  <AppContainer title="All Teams">
    <div class="overflow-x-auto">
      <table class="w-full table-auto text-left text-sm">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column"
              class="p-2 text-nowrap whitespace-nowrap"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in teams"
            :key="team.id"
            class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
          >
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar :src="team.logo" size="2xs" :alt="team.name" />
                {{ team.name }}
              </div>
            </td>
            <td class="p-2">
              {{ team.owner?.name }}
            </td>
            <td class="p-2">
              <SuperAdminTeamMembers :members="team.members" />
            </td>
            <td class="p-2">
              {{ team.subscription?.status ?? '-' }}
            </td>
            <td class="p-2">
              {{ useDateFormat(team.createdAt, 'DD/MM/YYYY').value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppContainer>
</template>
