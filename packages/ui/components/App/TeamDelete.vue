<script lang="ts" setup>
import { z } from 'zod'

const toast = useToast()
const { currentTeam, deleteTeam, loading } = useTeam()

const formSchema = z.object({
  teamName: z
    .string()
    .min(1, 'Team name is required')
    .refine(val => val === currentTeam.value.name, {
      message: 'Team name does not match',
    }),
})

  type Schema = z.output<typeof formSchema>

const formState = reactive<Partial<Schema>>({
  teamName: '',
})

async function handleSubmit() {
  try {
    if (!currentTeam.value)
      return
    await deleteTeam(currentTeam.value.id)
    toast.add({
      title: 'Team deleted successfully',
      color: 'success',
    })
    window.location.href = '/dashboard'
  }
  catch (error) {
    toast.add({
      title: 'Failed to delete team',
      description:
          error?.data?.message || 'An error occurred while deleting the team',
      color: 'error',
    })
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">
        Danger Zone
      </h3>
    </template>
    <div class="flex items-start gap-2 md:items-center">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10"
      >
        <UIcon name="i-lucide-trash-2" class="h-5 w-5 text-red-500" />
      </div>
      <div class="flex-1">
        <h4 class="font-medium">
          Delete Team
        </h4>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          Deleting a team is irreversible and will remove all data associated
          with it.
        </p>
      </div>
      <UModal
        :title="`Delete ${currentTeam?.name}`"
        description="This action is irreversible and will remove all data associated with it"
        close-icon="i-lucide-x"
      >
        <UButton color="error" size="lg">
          Delete Permanently
        </UButton>

        <template #body>
          <UForm
            :schema="formSchema"
            :state="formState"
            class="space-y-4"
            @submit="handleSubmit"
          >
            <UFormField
              label="Team Name"
              name="teamName"
              :help="`Please type '${currentTeam?.name}' to confirm deletion`"
            >
              <UInput
                v-model="formState.teamName"
                placeholder="Enter team name"
                class="w-full"
              />
            </UFormField>
            <UButton
              color="error"
              size="lg"
              type="submit"
              block
              :loading="loading"
              :disabled="formState.teamName !== currentTeam?.name"
            >
              Delete Permanently
            </UButton>
          </UForm>
        </template>
      </UModal>
    </div>
  </UCard>
</template>
