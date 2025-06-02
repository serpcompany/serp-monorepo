<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types';
  import { z } from 'zod';

  const modal = ref(false);
  const { passkeys, status, creating, deleting, createPasskey, deletePasskey } =
    usePasskeys();

  const { user } = useUserSession();
  const schema = z.object({
    name: z.string().min(1).max(255),
  });
  const state = reactive({
    name: undefined,
  });
  type Schema = z.output<typeof schema>;

  async function handleCreatePasskey(event: FormSubmitEvent<Schema>) {
    if (!user.value) return;
    const success = await createPasskey(user.value.email, event.data.name);
    if (success) {
      modal.value = false;
      state.name = undefined;
    }
  }
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-medium">Passkey Manager</h2>
          <UButton
            size="lg"
            color="neutral"
            :loading="creating"
            :disabled="creating"
            @click="modal = true"
          >
            Add Passkey
          </UButton>
        </div>
        <p class="mt-1 text-sm text-neutral-500">
          Add and manage your passkeys here
        </p>
      </template>
      <div v-if="status === 'pending'" class="flex items-center justify-center">
        <UIcon name="i-lucide-loader" class="animate-spin" />
      </div>
      <div v-else-if="status === 'success'">
        <div
          v-if="passkeys && passkeys.length === 0"
          class="flex flex-col items-center justify-center gap-4 rounded bg-neutral-100 p-4 text-sm dark:bg-neutral-800"
        >
          <UIcon name="i-lucide-fingerprint" class="h-6 w-6" />
          <p>No fingerprints or face IDs linked to your account.</p>
        </div>
        <ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
          <li
            v-for="passkey in passkeys"
            :key="passkey.id"
            class="flex items-center justify-between py-4"
          >
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-fingerprint" class="h-6 w-6" />
              {{ passkey.name }}
            </div>
            <UButton
              color="error"
              variant="soft"
              icon="i-ph-trash"
              :loading="deleting === passkey.id"
              :disabled="deleting === passkey.id"
              @click="deletePasskey(passkey.id)"
            >
              Delete
            </UButton>
          </li>
        </ul>
      </div>
    </UCard>
    <UDrawer
      v-model:open="modal"
      title="Register a new passkey"
      :ui="{ container: 'max-w-xl mx-auto' }"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="handleCreatePasskey"
        >
          <UFormField label="Name" name="name" size="lg">
            <UInput
              v-model="state.name"
              placeholder="Example: My MacBook"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="creating"
            :disabled="creating"
            label="Create Passkey"
            block
            size="lg"
            color="neutral"
          />
        </UForm>
      </template>
    </UDrawer>
  </div>
</template>
