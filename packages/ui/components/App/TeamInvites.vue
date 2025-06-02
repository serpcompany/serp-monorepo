<script lang="ts" setup>
  import type { DropdownMenuItem } from '@nuxt/ui';
  import type { TeamInvite } from '@serp/db/types/database';
  import type { FetchError } from 'ofetch';
  import { useDateFormat } from '@vueuse/core';

  type TeamInviteAccepted = TeamInvite & { acceptedByEmail?: string };

  const { currentTeam, cancelInvite, resendInvite } = useTeam();
  const toast = useToast();

  const { data: teamInvites, refresh: fetchTeamInvites } = await useFetch<
    TeamInviteAccepted[]
  >(`/api/teams/${currentTeam.value.id}/invites`, {
    key: 'team-invites',
  });

  // Split invites into pending and accepted
  const pendingInvites = computed(
    () =>
      teamInvites.value?.filter((invite) => invite.status !== 'accepted') || [],
  );

  const acceptedInvites = computed(
    () =>
      teamInvites.value?.filter((invite) => invite.status === 'accepted') || [],
  );

  const pendingColumns = [
    'Email',
    'Role',
    'Status',
    'Expires At',
    'Created At',
    '',
  ];
  const acceptedColumns = [
    'Email',
    'Role',
    'Accepted At',
    'Accepted By',
    'Created At',
  ];

  function getRowItems(invite: TeamInviteAccepted): DropdownMenuItem[] {
    return [
      {
        label: 'Copy Email',
        onSelect: () => {
          void navigator.clipboard.writeText(invite.email).then(() => {
            toast.add({
              title: 'Email copied to clipboard!',
              color: 'success',
            });
          });
        },
      },
      {
        label: 'Resend Invite',
        onSelect: () => {
          void resendInvite(invite.id)
            .then(() => {
              toast.add({
                title: 'Invite resent successfully!',
                color: 'success',
              });
            })
            .catch((error) => {
              toast.add({
                title: 'Failed to resend invite',
                description: (error as FetchError).statusMessage,
                color: 'error',
              });
            });
        },
      },
      { type: 'separator' },
      {
        label: 'Cancel Invite',
        color: 'error' as const,
        onSelect: () => {
          void cancelInvite(invite.id)
            .then(() => {
              toast.add({
                title: 'Invite cancelled successfully',
                color: 'success',
              });
              return fetchTeamInvites();
            })
            .catch((error) => {
              toast.add({
                title: 'Failed to cancel invite',
                description: (error as FetchError).statusMessage,
                color: 'error',
              });
            });
        },
      },
    ];
  }
</script>

<template>
  <div>
    <!-- Pending Invitations Table -->
    <p class="text-sm font-semibold">Pending Invitations</p>
    <div
      class="mt-2 overflow-x-auto rounded-lg border border-neutral-200 dark:divide-white/10 dark:border-white/10"
    >
      <table
        v-if="pendingInvites.length"
        class="min-w-full divide-y divide-neutral-200 dark:divide-white/10"
      >
        <thead>
          <tr class="text-sm">
            <th
              v-for="column in pendingColumns"
              :key="column"
              class="px-4 py-3 text-left text-sm font-semibold"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200 dark:divide-white/10">
          <tr
            v-for="invite in pendingInvites"
            :key="invite.id"
            class="text-sm [&>td]:whitespace-nowrap"
          >
            <td class="px-4 py-3">
              {{ invite.email }}
            </td>
            <td class="px-4 py-3">
              <UBadge
                color="neutral"
                size="sm"
                variant="subtle"
                class="uppercase"
              >
                {{ invite.role }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              <UBadge
                color="warning"
                size="sm"
                variant="subtle"
                class="uppercase"
              >
                {{ invite.status }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(invite.expiresAt, 'MMM D, YYYY').value }}
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(invite.createdAt, 'MMM D, YYYY').value }}
            </td>
            <td class="px-4 py-3">
              <UDropdownMenu
                :items="getRowItems(invite)"
                :content="{
                  align: 'end',
                  side: 'bottom',
                }"
              >
                <UButton
                  icon="i-lucide-ellipsis"
                  variant="ghost"
                  color="neutral"
                />
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex h-32 flex-col items-center justify-center gap-3">
        <UIcon name="i-lucide-inbox" class="size-8" />
        <p class="text-sm text-neutral-500">No pending invitations found</p>
      </div>
    </div>

    <!-- Accepted Invitations Table -->
    <p v-if="acceptedInvites.length" class="mt-8 text-sm font-semibold">
      Accepted Invitations
    </p>
    <div
      v-if="acceptedInvites.length"
      class="mt-2 overflow-x-auto rounded-lg border border-neutral-200 dark:divide-white/10 dark:border-white/10"
    >
      <table
        class="min-w-full divide-y divide-neutral-200 dark:divide-white/10"
      >
        <thead>
          <tr class="text-sm">
            <th
              v-for="column in acceptedColumns"
              :key="column"
              class="px-4 py-3 text-left text-sm font-semibold"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200 dark:divide-white/10">
          <tr
            v-for="invite in acceptedInvites"
            :key="invite.id"
            class="text-sm [&>td]:whitespace-nowrap"
          >
            <td class="px-4 py-3">
              {{ invite.email }}
            </td>
            <td class="px-4 py-3">
              <UBadge
                color="neutral"
                size="sm"
                variant="subtle"
                class="uppercase"
              >
                {{ invite.role }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              {{
                invite.acceptedAt
                  ? useDateFormat(invite.acceptedAt, 'MMM D, YYYY').value
                  : '-'
              }}
            </td>
            <td class="px-4 py-3">
              {{ invite.acceptedByEmail || '-' }}
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(invite.createdAt, 'MMM D, YYYY').value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
