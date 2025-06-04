<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user } = useUserSession()
const { logout } = useAuth()
const mobileMenu = useState('mobileMenu')
const isSuperAdmin = computed(() => user.value?.superAdmin)
const feedbackModal = ref(false)
async function signOut() {
  await logout()
  await navigateTo('/')
}
const items = ref([
  [
    {
      slot: 'profile',
      label: user.value?.name,
      avatar: {
        src: user.value?.avatarUrl || '',
        alt: user.value?.name,
      },
      type: 'label',
      onSelect: () => {
        mobileMenu.value = false
      },
    },
  ],
  [
    {
      label: 'Dashboard',
      icon: 'i-lucide-user-cog',
      to: '/dashboard',
      onSelect: () => {
        mobileMenu.value = false
      },
    },
  ],
  [
    {
      label: 'Account Settings',
      icon: 'i-lucide-user-cog',
      to: '/dashboard/account-settings',
      onSelect: () => {
        mobileMenu.value = false
      },
    },
  ],
  [
    {
      label: 'Theme',
      icon: 'i-lucide-moon',
      children: [
        [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            onSelect: () => {
              setColorMode('light')
              mobileMenu.value = false
            },
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            onSelect: () => {
              setColorMode('dark')
              mobileMenu.value = false
            },
          },
        ],
        [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
            onSelect: () => {
              setColorMode('system')
              mobileMenu.value = false
            },
          },
        ],
      ],
    },
  ],
  [
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      onSelect: () => {
        feedbackModal.value = true
        mobileMenu.value = false
      },
    },
    {
      label: 'Docs',
      icon: 'i-lucide-cloud',
    },
  ],
  ...(isSuperAdmin.value
    ? [
        [
          {
            label: 'Super Admin',
            icon: 'i-lucide-shield',
            to: '/dashboard/super-admin',
          },
        ],
      ]
    : []),
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: signOut,
      color: 'error' as const,
    },
  ],
])

const colorMode = useColorMode()

function setColorMode(mode: string) {
  colorMode.preference = mode
}
</script>

<template>
  <UDropdownMenu
    :items="items as DropdownMenuItem[]"
    :ui="{
      content: 'w-[240px]',
    }"
    :content="{
      align: 'start',
    }"
  >
    <UButton
      block
      color="neutral"
      variant="ghost"
      class="w-full justify-normal text-left hover:bg-zinc-200/80 dark:hover:bg-white/10"
    >
      <UAvatar
        :src="user?.avatarUrl || ''"
        :alt="user?.name"
        size="xs"
        class="ring-2 ring-neutral-200 dark:ring-white/10"
      />
      <div class="flex flex-1 items-center gap-2">
        <p class="text-sm">
          {{ user?.name }}
        </p>
      </div>
      <UIcon name="i-lucide-chevron-up" />
    </UButton>
    <template #profile>
      <div class="flex items-center gap-2">
        <UAvatar
          :src="user?.avatarUrl || ''"
          :alt="user?.name"
          class="ring-2 ring-neutral-200 dark:ring-white/10"
        />
        <div class="flex-1">
          <p :style="{ fontWeight: 500 }" class="text-sm">
            {{ user?.name }}
          </p>
          <p
            class="text-xs text-zinc-500 dark:text-zinc-400"
            :style="{ fontWeight: 400 }"
          >
            {{ user?.email }}
          </p>
        </div>
      </div>
    </template>
  </UDropdownMenu>
  <UModal
    v-model:open="feedbackModal"
    title="Need help?"
    description="Have a question or need assistance? We're here to help!"
  >
    <template #body>
      <AppFeedbackForm @close="feedbackModal = false" />
    </template>
  </UModal>
</template>
