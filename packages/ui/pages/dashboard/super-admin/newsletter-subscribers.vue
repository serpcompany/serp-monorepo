<script lang="ts" setup>
import { useDateFormat, useTimeAgo } from '@vueuse/core'

const columns = ['Email', 'Referrer', 'Created At']
const { data: subscribers } = await useFetch(
  '/api/super-admin/newsletter-subscribers',
)

function formatDate(date: string | Date | undefined) {
  if (!date)
    return 'NA'
  return useDateFormat(date, 'MMM D, YYYY HH:mm a').value
}

function referrerLogo(referrer: string | undefined) {
  if (!referrer)
    return undefined
  return `https://logo.clearbit.com/${referrer}`
}
</script>

<template>
  <AppContainer :title="`Newsletter Subscribers (${subscribers?.length || 0})`">
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
            v-for="subscriber in subscribers"
            :key="subscriber.id"
            class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
          >
            <td class="p-2">
              <div class="flex items-center gap-2">
                {{ subscriber.email }}
              </div>
            </td>
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar
                  v-if="referrerLogo(subscriber.referrer)"
                  :src="referrerLogo(subscriber.referrer)"
                  icon="i-lucide-globe"
                  size="3xs"
                  class="flex-shrink-0"
                />
                {{ subscriber.referrer || '--' }}
              </div>
            </td>
            <td class="p-2">
              <UTooltip
                :text="formatDate(subscriber.createdAt)"
                :delay-duration="0"
              >
                <div>
                  {{ useTimeAgo(subscriber.createdAt) }}
                </div>
              </UTooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppContainer>
</template>
