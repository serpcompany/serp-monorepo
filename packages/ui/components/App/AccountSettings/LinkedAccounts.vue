<script lang="ts" setup>
  import type { OauthAccount } from '@serp/db/types/database';
  import { useDateFormat } from '@vueuse/core';

  const linkAccountModal = ref(false);
  const toast = useToast();
  const loading = ref(false);

  const { data: linkedAccounts } = await useFetch<OauthAccount[]>(
    '/api/me/linked-accounts',
    {
      key: 'linked-accounts',
    },
  );

  const availableProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'i-logos-google-icon',
    },
    {
      id: 'github',
      name: 'Github',
      icon: 'i-mdi-github',
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: 'i-logos-discord-icon',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: 'i-logos-spotify-icon',
    },
  ];

  function getProviderIcon(providerId: string) {
    if (!providerId) return 'i-lucide-question-mark-circle';
    const provider = availableProviders.find((p) => p.id === providerId);
    return provider?.icon || 'i-lucide-question-mark-circle';
  }

  function getProviderName(providerId: string) {
    if (!providerId) return 'Unknown';
    const provider = availableProviders.find((p) => p.id === providerId);
    return provider?.name || 'Unknown';
  }

  async function unlinkAccount(account: OAuthAccounts) {
    try {
      loading.value = true;
      await $fetch(`/api/me/linked-accounts/${account.id}`, {
        method: 'DELETE',
      });
      // Refresh the linked accounts list
      await refreshNuxtData('linked-accounts');
      toast.add({
        title: 'Account unlinked',
        description: `Your ${account.provider} account has been successfully unlinked`,
        color: 'success',
      });
    } catch (error) {
      const errorMessage =
        error.data?.statusMessage || 'Failed to unlink account';
      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'error',
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="font-medium">Linked Accounts</h3>
        <UButton
          label="Link Account"
          variant="subtle"
          color="neutral"
          @click="linkAccountModal = true"
        />
      </div>
      <p class="mt-1 text-sm text-neutral-500">
        Link a new OAuth provider to your account.
      </p>
    </template>
    <ul
      v-if="linkedAccounts"
      class="divide-y divide-neutral-200 dark:divide-white/10"
    >
      <li
        v-for="account in linkedAccounts"
        :key="account.id"
        class="flex items-center gap-3 py-4"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 dark:bg-white/10"
        >
          <UIcon :name="getProviderIcon(account.provider)" class="text-xl" />
        </div>
        <div class="flex-1">
          <p>{{ getProviderName(account.provider) }}</p>
          <p class="text-xs text-neutral-500">
            Connected on
            {{
              account.createdAt
                ? useDateFormat(account.createdAt, 'MMM D, YYYY').value
                : 'Unknown date'
            }}
          </p>
        </div>
        <UButton
          icon="i-lucide-trash"
          variant="ghost"
          color="error"
          :loading="loading"
          @click="unlinkAccount(account)"
        />
      </li>
    </ul>
  </UCard>
  <UModal
    v-model:open="linkAccountModal"
    title="Link Account"
    description="Link an account to your account."
  >
    <template #body>
      <div class="space-y-2">
        <AuthSocialLoginButton
          v-for="provider in availableProviders"
          :key="provider.id"
          :label="provider.name"
          :icon="provider.icon"
          :provider="provider.id"
        />
      </div>
    </template>
  </UModal>
</template>
