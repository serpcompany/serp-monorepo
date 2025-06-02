<script setup lang="ts">
// @ts-expect-error: Auto-imported from another layer
const { loggedIn, user, clear } = useUserSession()
const config = useRuntimeConfig()
const profileDropdownLinks = Array.isArray(config.public.profileDropdownLinks)
  ? config.public.profileDropdownLinks
  : []
const slideover = ref(false)

interface MenuItem {
  label: string
  type?: string
  to?: string
  icon?: string
  kbds?: string[]
  onSelect?: (event: Event) => void
}

const items = ref([
  ...profileDropdownLinks,
  [
    {
      label: 'Dashboard',
      to: '/users/dashboard/',
      icon: 'i-lucide-settings',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      to: '/logout/',
    },
  ],
])

function handleItemClick(item: MenuItem, event: Event): void {
  if (item.onSelect) {
    item.onSelect(event)
    return
  }
  if (item.to) {
    slideover.value = false
  }
}
</script>

<template>
  <div v-if="loggedIn" class="relative">
    <!-- Avatar trigger -->
    <div>
      <UAvatar
        :src="user?.image || user?.avatarUrl"
        role="button"
        class="cursor-pointer transition-opacity hover:opacity-80"
        size="xl"
        @click="slideover = true"
      />
    </div>

    <!-- Slideover menu -->
    <USlideover
      v-model:open="slideover"
      side="right"
      :ui="{
        // Narrower, with a subtle shadow and clean background
        content:
          'w-80 max-w-[85vw] divide-y divide-gray-200 bg-white shadow-lg',
        overlay: 'bg-black bg-opacity-30',
        wrapper: 'h-full',
        body: 'p-0',
      }"
    >
      <!-- User profile header -->
      <template #header>
        <div class="flex items-center gap-3 bg-white">
          <UAvatar :src="user?.image || user?.avatarUrl" size="md" />
          <div class="text-sm leading-tight font-semibold text-gray-900">
            {{ user?.name }}
          </div>
        </div>
      </template>

      <!-- Menu items -->
      <template #body>
        <div class="divide-y divide-gray-200 text-sm">
          <div
            v-for="(group, groupIndex) in items"
            :key="groupIndex"
            class="py-1"
          >
            <div v-for="(item, itemIndex) in group" :key="itemIndex">
              <!-- Label items -->
              <div v-if="item.type === 'label'">
                {{ item.label }}
              </div>

              <!-- Regular menu items -->
              <NuxtLink
                v-else
                :to="item.to || '#'"
                class="flex items-center gap-2 px-3 py-2 transition-colors hover:bg-gray-100"
                @click="handleItemClick(item)"
              >
                <UIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="flex-shrink-0"
                />
                <span class="flex-grow leading-tight text-gray-700">{{
                  item.label
                }}</span>
                <div v-if="item.kbds" class="flex gap-1">
                  <UKbd
                    v-for="(kbd, kbdIndex) in item.kbds"
                    :key="kbdIndex"
                    :value="kbd"
                    size="xs"
                  />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </USlideover>
  </div>

  <!-- Login button for logged-out users -->
  <UButton
    v-else
    variant="ghost"
    size="md"
    as="NuxtLink"
    to="/login"
    class="dark:text-primary-100 text-md rounded-md border border-neutral-300 px-6 font-medium"
  >
    Login
  </UButton>
</template>
