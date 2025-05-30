<script lang="ts" setup>
  import type { OauthAccount, User } from '@serp/db/types/database';
  import type { SanitizedUser } from '@serp/auth/server/utils/auth';

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

  interface ExtendedUser extends User {
    oauthAccounts?: OauthAccount[];
    teamMembers?: TeamMember[];
  }

  const props = defineProps<{
    user: ExtendedUser;
    users?: User[];
  }>();

  const emit = defineEmits(['user-deleted', 'cancel']);
  const loading = ref(false);
  const toast = useToast();

  function getTeamOwnerName(ownerId: string): string {
    if (!ownerId || !props.users?.length) return 'Unknown';
    const owner = props.users.find((user) => user.id === ownerId);
    return owner?.name || 'Unknown';
  }

  const deleteUser = async () => {
    loading.value = true;
    try {
      await $fetch<SanitizedUser>('/api/super-admin/users', {
        method: 'DELETE',
        body: { userId: props.user.id }
      });
      toast.add({
        title: 'User deleted successfully',
        description: 'The user has been deleted',
        color: 'success'
      });
      emit('user-deleted');
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Error',
        description: 'Failed to delete user',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UAvatar :src="user.avatarUrl || undefined" :alt="user.name" size="lg" />
      <div>
        <p class="text-sm font-bold">{{ user.name }}</p>
        <p class="text-sm text-neutral-500">{{ user.email }}</p>
      </div>
    </div>
    <div class="space-y-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-950">
      <p class="text-sm text-neutral-500">
        This action will delete the user from the platform and all associated
        data. {{ user.name }} is a part of the following teams:
      </p>
      <div
        v-for="teamMember in user.teamMembers"
        :key="teamMember.id"
        class="flex items-center gap-3"
      >
        <UAvatar
          :src="teamMember.team.logo || undefined"
          size="sm"
          :alt="teamMember.team.name + ' logo'"
        />
        <div>
          <p class="text-sm font-medium">{{ teamMember.team.name }}</p>
          <p class="text-xs text-neutral-500">
            <span class="capitalize">{{ teamMember.role }}</span>
            {{
              teamMember.role === 'owner'
                ? ''
                : `(Owner: ${getTeamOwnerName(teamMember.team.ownerId)})`
            }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex w-full justify-end gap-2">
      <UButton
        variant="soft"
        color="neutral"
        label="Cancel"
        @click="$emit('cancel')"
      />
      <UButton
        variant="soft"
        color="error"
        label="Delete User"
        :loading="loading"
        @click="deleteUser"
      />
    </div>
  </div>
</template>
