<script lang="ts" setup>
  import type { FormSubmitEvent } from '#ui/types';
  import type { z } from 'zod';
  import { inviteTeamMemberSchema } from '@serp/db/validations/team';
  import { UserRole } from '@serp/auth/constants';
  import type { FetchError } from 'ofetch';

  const { currentTeam, inviteMember, loading } = useTeam();
  const toast = useToast();

  const { user } = useUserSession();
  const newMemberModal = ref(false);
  const state = reactive({
    email: '',
    role: UserRole.MEMBER
  });

  const roleOptions = [
    { label: 'Member', id: UserRole.MEMBER },
    { label: 'Admin', id: UserRole.ADMIN },
    { label: 'Owner', id: UserRole.OWNER }
  ];

  const schema = inviteTeamMemberSchema.refine(
    (data) => data.email !== user.value?.email,
    {
      message: 'You cannot invite yourself'
    }
  );

  const onSubmit = async (event: FormSubmitEvent<z.infer<typeof schema>>) => {
    loading.value = true;
    try {
      await inviteMember(event.data.email, event.data.role);
      toast.add({
        title: 'Member invited successfully',
        description: `We have sent an invitation to ${event.data.email}`,
        color: 'success'
      });
      newMemberModal.value = false;
      await refreshNuxtData('team-invites');
    } catch (error) {
      toast.add({
        title: 'Failed to invite member',
        description: (error as FetchError).data.message,
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <AppContainer title="Workspace Members">
    <template #actions>
      <UButton
        color="neutral"
        label="Invite Member"
        @click="newMemberModal = true"
      />
    </template>
    <UModal
      v-model:open="newMemberModal"
      size="xl"
      prevent-close
      :title="`Invite a new member to ${currentTeam?.name}`"
      description="We will email them a link to join your team. Invitations are valid for 7 days."
    >
      <template #body>
        <UForm
          class="space-y-4"
          :state="state"
          :schema="schema"
          @submit="onSubmit as unknown"
        >
          <UFormField required label="Member email" name="email">
            <UInput
              v-model="state.email"
              placeholder="john@doe.com"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UFormField required label="Role" name="role">
            <USelectMenu
              v-model="state.role"
              :items="roleOptions"
              value-key="id"
              class="w-full"
              size="lg"
              :search-input="false"
            />
          </UFormField>
          <UButton
            :loading="loading"
            color="neutral"
            type="submit"
            block
            size="lg"
            label="Send invitation"
          />
        </UForm>
      </template>
    </UModal>
    <div class="mx-auto max-w-5xl space-y-12">
      <AppTeamMembers />
      <AppTeamInvites />
    </div>
  </AppContainer>
</template>
