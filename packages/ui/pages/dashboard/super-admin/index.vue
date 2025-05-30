<script lang="ts" setup>
  import { useDateFormat } from '@vueuse/core';
  import type { User, OauthAccount } from '@serp/db/types/database';

  interface TeamMember {
    id: string;
    teamId: string;
    userId: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    team: {
      id: string;
      name: string;
      ownerId: string;
      logo: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  interface UserWithOAuthAccounts extends User {
    oauthAccounts: OauthAccount[];
    teamMembers?: TeamMember[];
  }
  const { fetch: refreshUserSession } = useUserSession();
  const newUserModal = ref(false);
  const banUserModal = ref(false);
  const loadingUserId = ref<string | null>(null);
  const showDeleteUserConfirmation = ref(false);
  const selectedUser = ref<UserWithOAuthAccounts | null>(null);
  const toast = useToast();
  const isEmailsMasked = ref(true);

  const { data: users, refresh } = await useFetch<UserWithOAuthAccounts[]>(
    '/api/super-admin/users'
  );

  const columns = [
    'Name',
    'Email',
    'Verified',
    'Banned',
    'Linked Accounts',
    'Team Affiliations',
    'Last Active',
    'Created',
    ''
  ];

  const actions = [
    {
      label: 'Send Password Reset Email',
      onSelect: async () => {
        if (selectedUser.value) {
          await sendForgotPasswordEmail(selectedUser.value);
        }
      }
    },
    {
      label: 'Impersonate User',
      onSelect: async () => {
        if (selectedUser.value) {
          await startImpersonationSession(selectedUser.value);
        }
      }
    },
    {
      label: 'Ban User',
      onSelect: () => {
        if (selectedUser.value) {
          banUserModal.value = true;
        }
      }
    },
    {
      label: 'Delete User',
      color: 'error' as const,
      onSelect: () => {
        if (selectedUser.value) {
          showDeleteUserConfirmation.value = true;
        }
      }
    }
  ];

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'NA';
    return useDateFormat(date, 'MMM D, YYYY').value;
  };

  async function handleUserCreated() {
    await refresh();
    newUserModal.value = false;
  }

  async function handleUserBanned() {
    await refresh();
    banUserModal.value = false;
  }

  async function handleUserDeleted() {
    showDeleteUserConfirmation.value = false;
    await refresh();
  }

  const sendForgotPasswordEmail = async (user: User) => {
    try {
      loadingUserId.value = user.id;
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email: user.email }
      });
      toast.add({
        title: 'Password reset email sent',
        description: 'The password reset email has been sent to the user',
        color: 'success'
      });
    } catch {
      toast.add({
        title: 'Error',
        description: 'Failed to send password reset email',
        color: 'error'
      });
    } finally {
      loadingUserId.value = null;
    }
  };

  const liftBan = async (user: User) => {
    try {
      loadingUserId.value = user.id;
      await $fetch('/api/super-admin/users/ban', {
        method: 'POST',
        body: { userId: user.id, banned: false }
      });
      toast.add({
        title: 'User unbanned successfully',
        description: 'The user has been unbanned',
        color: 'success'
      });
      await refresh();
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Error',
        description: 'Failed to lift ban',
        color: 'error'
      });
    } finally {
      loadingUserId.value = null;
    }
  };

  const startImpersonationSession = async (user: User) => {
    const data = await $fetch('/api/super-admin/users/impersonate', {
      method: 'POST',
      body: { userId: user.id }
    });
    if (data.success) {
      await refreshUserSession();
      window.location.href = '/dashboard';
    }
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    return `${localPart
      .split('')
      .map(() => '•')
      .join('')}@${domain}`;
  };

  const maskEmails = () => {
    isEmailsMasked.value = !isEmailsMasked.value;
  };
</script>

<template>
  <AppContainer title="Users">
    <template #actions>
      <UButton
        :label="isEmailsMasked ? 'Unmask emails' : 'Mask Emails'"
        variant="soft"
        color="neutral"
        @click="maskEmails"
      />
      <UButton label="Create a new user" @click="newUserModal = true" />
    </template>

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
            v-for="user in users"
            :key="user.id"
            class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
          >
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="user.avatarUrl ?? undefined"
                  size="2xs"
                  :alt="user.name"
                />
                {{ user.name }}
              </div>
            </td>
            <td class="p-2">
              {{ isEmailsMasked ? maskEmail(user.email) : user.email }}
            </td>
            <td class="p-2">{{ user.emailVerified ? 'Yes' : 'No' }}</td>
            <td class="p-2">
              <SuperAdminUserBanStatus
                :user="user"
                :loading="loadingUserId === user.id"
                @lift-ban="liftBan"
              />
            </td>
            <td class="p-2">
              <SuperAdminUserOAuthAccounts
                :oauth-accounts="user.oauthAccounts"
              />
            </td>
            <td class="p-2">
              <SuperAdminUserTeamAffiliations
                :team-members="user.teamMembers"
                :users="users"
              />
            </td>
            <td class="p-2">
              {{ formatDate(user.lastActive ?? undefined) }}
            </td>
            <td class="p-2">
              {{ formatDate(user.createdAt ?? undefined) }}
            </td>
            <td class="p-2">
              <UDropdownMenu
                :items="actions"
                :content="{ align: 'end', side: 'bottom', sideOffset: 0 }"
              >
                <UButton
                  icon="i-lucide-ellipsis"
                  variant="ghost"
                  color="neutral"
                  class="text-neutral-500"
                  :loading="loadingUserId === user.id"
                  @click="selectedUser = user"
                />
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <UModal
      v-model:open="newUserModal"
      title="Create a new user"
      description="Invite a new user to the platform"
    >
      <template #body>
        <SuperAdminNewUserForm @user-created="handleUserCreated" />
      </template>
    </UModal>

    <UModal
      v-model:open="banUserModal"
      title="Ban User"
      description="Ban a user from the platform"
    >
      <template #body>
        <SuperAdminBanUserForm
          v-if="selectedUser"
          :user="selectedUser"
          @user-banned="handleUserBanned"
        />
      </template>
    </UModal>

    <UModal
      v-model:open="showDeleteUserConfirmation"
      title="Delete User"
      description="This action is irreversible"
    >
      <template #body>
        <SuperAdminDeleteUserForm
          v-if="selectedUser"
          :user="selectedUser"
          :users="users"
          @user-deleted="handleUserDeleted"
          @cancel="showDeleteUserConfirmation = false"
        />
      </template>
    </UModal>
  </AppContainer>
</template>
