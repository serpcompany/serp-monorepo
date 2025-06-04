<script lang="ts" setup>
import type { OauthAccount } from '@serp/db/types/database'
import { useDateFormat } from '@vueuse/core'

defineProps<{
  oauthAccounts: OauthAccount[]
}>()

const availableProviders = [
  { id: 'google', name: 'Google', icon: 'i-logos-google-icon' },
  { id: 'github', name: 'Github', icon: 'i-octicon-mark-github-16' },
  { id: 'discord', name: 'Discord', icon: 'i-logos-discord-icon' },
  { id: 'spotify', name: 'Spotify', icon: 'i-logos-spotify-icon' },
]

function getProviderIcon(providerId: string) {
  if (!providerId)
    return 'i-lucide-question-mark-circle'
  const provider = availableProviders.find(p => p.id === providerId)
  return provider?.icon || 'i-lucide-question-mark-circle'
}

function getProviderName(providerId: string) {
  if (!providerId)
    return 'Unknown'
  const provider = availableProviders.find(p => p.id === providerId)
  return provider?.name || 'Unknown'
}

function formatDate(date: string | Date | undefined) {
  if (!date)
    return 'Invalid'
  return useDateFormat(date, 'MMM D, YYYY').value
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UPopover v-for="account in oauthAccounts" :key="account.id" mode="hover">
      <div
        class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 dark:bg-white/10"
      >
        <UIcon :name="getProviderIcon(account.provider)" />
      </div>

      <template #content>
        <div class="w-64 p-4">
          <h3 class="mb-2 text-sm font-medium">
            {{ getProviderName(account.provider) }} Account
          </h3>
          <USeparator class="my-2" />
          <div class="mt-2 space-y-4">
            <div>
              <p
                class="text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Provider User ID
              </p>
              <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                {{ account.providerUserId }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Connected
              </p>
              <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                {{ formatDate(account.createdAt ?? undefined) }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
