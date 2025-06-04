<script setup lang="ts">
const config = useRuntimeConfig()
const appConfig = useAppConfig()
const router = useRouter()

const submitOptions_: Array<{ label: string, to: string }>
    = appConfig.site?.submitOptions
      || (config.public.submitOptions as Array<{
        label: string
        to: string
      }>)
      || []

const submitOptions = submitOptions_.map(item => ({
  label: item.label,
  onSelect(e: Event) {
    e.preventDefault()
    handleSubmitOptionSelect(item)
  },
}))

const { loggedIn } = useUserSession()

// Set a default selected item display text
const addYourText = ref('Add your')

const toast = useToast()

function handleSubmitOptionSelect(item: { label: string, to: string }) {
  if (!loggedIn.value) {
    toast.add({
      id: 'login-err',
      title: 'Login Error',
      color: 'error',
      description: 'You must login to make a submission.',
      icon: 'exclamation-circle',
    })
  }
  else {
    router.push(item.to)
  }
}

// Use headerNavItems from app config with fallback to runtime config
const headerNavItems
    = appConfig.site?.headerNavItems || config.public.headerNavItems
const useAuth = config.public.useAuth

const mobileMenuOpen = ref(false)
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header
    class="bg-background top-0 z-50 mx-auto h-18 max-w-full border-b border-(--ui-border) px-12"
  >
    <div class="flex h-full items-center justify-between px-4">
      <!-- Left side -->
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" aria-label="home">
            <SLogo />
          </NuxtLink>
        </div>
        <!-- Desktop nav -->
        <div class="ml-6 hidden lg:flex">
          <UNavigationMenu
            orientation="horizontal"
            content-orientation="vertical"
            highlight
            variant="pill"
            :items="headerNavItems"
            :ui="{
              link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 text-primary',
              viewport:
                'relative overflow-hidden bg-default rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[100]',
              childList:
                'flex flex-col bg-white dark:bg-gray-800 justify-center',
              childLink:
                'px-4 py-2 hover:bg-gray-200  dark:hover:bg-gray-600 dark:hover:text-gray-300 rounded-md transition-colors duration-200',
            }"
          />
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center">
        <!-- Hamburger menu for small screens -->
        <div class="lg:hidden">
          <button
            type="button"
            class="rounded-md p-2 hover:text-[var(--ui-primary)] focus:ring-2 focus:ring-[var(--ui-primary)] focus:outline-none focus:ring-inset"
            :aria-expanded="mobileMenuOpen"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div class="hidden items-center space-x-4 lg:flex">
          <!-- ADD YOUR ... DROPDOWN -->
          <UDropdownMenu
            v-if="submitOptions.length > 0"
            :items="submitOptions"
            class="w-32"
            :content="{ side: 'bottom', sideOffset: 8 }"
            arrow
            :ui="{
              base: 'inline-flex flex-col',
              trigger: 'w-full',
              item: 'text-primary px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200',
              content:
                'dark:bg-gray-800 rounded-md p-1 shadow-lg border border-neutral-300 dark:border-gray-700',
              arrow: 'fill-white dark:fill-gray-800',
            }"
            @select="handleSubmitOptionSelect"
          >
            <UButton
              class="text-primary inline-flex w-40 items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span class="text-sm">{{ addYourText }}</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </UButton>
          </UDropdownMenu>
          <ProfileDropdown v-if="useAuth" />
          <UColorModeButton
            class="rounded-full border border-neutral-300 p-2"
          />
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <UNavigationMenu
          orientation="vertical"
          highlight
          :items="headerNavItems"
          class="w-full"
          :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
        />
        <div v-if="useAuth" class="mt-4 border-t border-neutral-300 pt-4">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  </header>
  <div class="px-12">
    <SBreadcrumb />
  </div>
</template>
