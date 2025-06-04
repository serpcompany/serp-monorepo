<script lang="ts" setup>
import type { TeamMember } from '@@/types/database'

defineProps<{
  members: TeamMember[]
}>()
</script>

<template>
  <UPopover v-if="members?.length" mode="hover">
    <div class="flex cursor-pointer items-center gap-1">
      <span>{{ members.length }}</span>
      <UIcon name="i-lucide-users" class="text-neutral-500" />
    </div>
    <template #content>
      <div class="w-72 p-4">
        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div
            v-for="member in members"
            :key="member.id"
            class="flex items-center gap-2 py-2 text-sm first:pt-0 last:pb-0"
          >
            <UAvatar
              :src="member.user.avatarUrl"
              size="md"
              :alt="member.user.name"
            />
            <div class="flex-1">
              <div class="flex items-center gap-1">
                <p class="flex-1 font-medium">
                  {{ member.user.name }}
                </p>
                <p class="text-xs text-neutral-500 capitalize">
                  {{ member.role }}
                </p>
              </div>
              <p class="text-xs text-neutral-500">
                {{ member.user.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
