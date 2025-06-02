<script lang="ts" setup>
import type { User } from '@serp/db/types/database'

const props = defineProps<{
  user: User
}>()
const { fetch: refreshUserSession } = useUserSession()
async function stopImpersonation() {
  await $fetch('/api/super-admin/users/stop-impersonation', {
    method: 'POST',
    body: {
      userId: props.user.id,
    },
  })
  await refreshUserSession()
  window.location.href = '/dashboard/super-admin'
}
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-8 w-full animate-pulse items-center justify-between border-b border-white/10 bg-black px-4 text-sm text-white dark:border-neutral-700 dark:bg-neutral-300 dark:text-neutral-950"
  >
    <div class="flex items-center gap-2">
      You are currently impersonating
      <div class="flex items-center gap-2">
        <UAvatar :src="user?.avatarUrl" size="3xs" :alt="user?.name" />
        <span class="font-bold"> {{ user?.email }} </span>
      </div>
      as a super admin. Please proceed with caution.
    </div>
    <UButton
      size="xs"
      color="neutral"
      label="Stop session"
      @click="stopImpersonation()"
    />
  </div>
</template>
