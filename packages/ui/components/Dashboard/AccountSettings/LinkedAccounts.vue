<script setup lang="ts">
  import type { OauthAccount } from '@serp/db/types/database'
  import { useDateFormat } from '@vueuse/core'

  const linkAccountModal = ref(false)
  const toast = useToast()
  const loading = ref(false)

  const { data: linkedAccounts } = await useFetch<OauthAccount[]>(
    '/api/me/linked-accounts',
    {
      key: 'linked-accounts',
    },
  )

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
  ]

  function getProviderIcon(providerId: string): string {
    if (!providerId)
      return 'i-lucide-question-mark-circle'
    const provider = availableProviders.find(p => p.id === providerId)
    return provider?.icon || 'i-lucide-question-mark-circle'
  }

  function getProviderName(providerId: string): string {
    if (!providerId)
      return 'Unknown'
    const provider = availableProviders.find(p => p.id === providerId)
    return provider?.name || 'Unknown'
  }

  async function unlinkAccount(account: OauthAccount): Promise<void> {
    try {
      loading.value = true
      await $fetch(`/api/me/linked-accounts/${account.id}`, {
        method: 'DELETE',
      })
      // Refresh the linked accounts list
      await refreshNuxtData('linked-accounts')
      toast.add({
        title: 'Account unlinked',
        description: `Your ${account.provider} account has been successfully unlinked`,
        color: 'success',
      })
    }
    catch (error) {
      const errorMessage =
        error.data?.statusMessage || 'Failed to unlink account'
      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <div>
    <UPageCard
      title="Linked Accounts"
      description="Link your account with third-party services to enhance your experience."
      orientation="horizontal"
      variant="naked"
      class="mb-4"
    >
      <UButton
        class="w-fit lg:ms-auto"
        color="neutral"
        variant="subtle"
        label="Link Account"
        @click="linkAccountModal = true"
      />
    </UPageCard>

    <template v-if="!linkedAccounts || linkedAccounts.length === 0">
      <UAlert
        variant="subtle"
        color="neutral"
        icon="lucide:info"
        description="No linked accounts found. Click the button above to link an account."
      />
    </template>
    <template v-else>
      <UPageCard
        variant="subtle"
        :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch' }"
      >
        <ul
          v-if="linkedAccounts"
          class="divide-y divide-default"
        >
          <li
            v-for="account in linkedAccounts"
            :key="account.id"
            class="flex items-center justify-between gap-3 py-3 px-3"
          >
            <div
              class="flex items-center justify-center size-12 rounded-md bg-accented"
            >
              <UIcon :name="getProviderIcon(account.provider)" class="text-xl" />
            </div>
            <div class="flex-1">
              <p>{{ getProviderName(account.provider) }}</p>
              <ClientOnly>
                <p class="text-xs text-muted">
                  Connected on
                  {{
                    account.createdAt
                      ? useDateFormat(account.createdAt, "MMM D, YYYY").value
                      : "Unknown date"
                  }}
                </p>
              </ClientOnly>
            </div>
            <UButton
              icon="lucide:trash"
              variant="ghost"
              color="error"
              :loading="loading"
              @click="unlinkAccount(account)"
            />
          </li>
        </ul>
      </UPageCard>
    </template>
    <UModal
      v-model:open="linkAccountModal"
      title="Link Account"
      description="Link an account to your account."
      :ui="{ title: 'text-lg' }"
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
  </div>
</template>
