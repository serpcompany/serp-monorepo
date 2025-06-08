<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { z } from 'zod'

  const modal = ref(false)
  const { passkeys, status, creating, deleting, createPasskey, deletePasskey } =
    usePasskeys()

  const { user } = useUserSession()
  const schema = z.object({
    name: z.string().min(1).max(255),
  })
  const state = reactive({
    name: undefined,
  })
  type Schema = z.output<typeof schema>

  async function handleCreatePasskey(event: FormSubmitEvent<Schema>): Promise<void> {
    if (!user.value)
      return
    const success = await createPasskey(user.value.email, event.data.name)
    if (success) {
      modal.value = false
      state.name = undefined
    }
  }
</script>

<template>
  <div>
    <UPageCard
      title="Passkey Manager"
      description="Add and manage your passkeys here"
      orientation="horizontal"
      variant="naked"
      class="mb-4"
    >
      <UButton
        class="w-fit lg:ms-auto"
        color="neutral"
        variant="subtle"
        label="Register a new passkey"
        :loading="creating"
        :disabled="creating"
        @click="modal = true"
      />
    </UPageCard>
    <template v-if="status === 'pending'">
      <div class="flex items-center justify-center">
        <UIcon name="lucide:loader" class="animate-spin" />
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <UAlert
        variant="soft"
        color="error"
        icon="lucide:circle-alert"
        title="Failed to load passkeys"
        description="There was an error loading your passkeys. Please try again later."
      />
    </template>
    <template v-else-if="status === 'success'">
      <template v-if="passkeys && passkeys.length === 0">
        <UAlert
          variant="soft"
          color="neutral"
          icon="lucide:fingerprint"
          title="No fingerprints or face IDs linked to your account."
        />
      </template>
      <template v-else>
        <UPageCard
          :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch' }"
        >
          <ul
            class="divide-y divide-default"
          >
            <li
              v-for="passkey in passkeys"
              :key="passkey.id"
              class="flex items-center justify-between gap-3 py-3 px-3"
            >
              <div class="flex-1 flex items-center gap-2">
                <UIcon name="lucide:fingerprint" class="size-6" />
                {{ passkey.name }}
              </div>
              <UButton
                icon="lucide:trash"
                variant="ghost"
                color="error"
                :loading="deleting === passkey.id"
                :disabled="deleting === passkey.id"
                @click="deletePasskey(passkey.id)"
              />
            </li>
          </ul>
        </UPageCard>
      </template>
    </template>
    <UDrawer
      v-model:open="modal"
      title="Register a new passkey"
      description="Register a new passkey to your account. This can be a fingerprint or face ID."
      :ui="{ container: 'max-w-xl mx-auto', title: 'text-base' }"
    >
      <template #body>
        <UForm
          id="create-passkey-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="handleCreatePasskey"
        >
          <UFormField label="Passkey Name" name="name" size="lg">
            <UInput
              v-model="state.name"
              placeholder="Example: My MacBook"
              class="w-full"
              size="lg"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          :disabled="creating"
          :loading="creating"
          block
          type="submit"
          color="neutral"
          form="create-passkey-form"
          label="Submit"
        />
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          block
          @click="modal = false"
        />
      </template>
    </UDrawer>
  </div>
</template>
