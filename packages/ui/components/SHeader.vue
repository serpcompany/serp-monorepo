<template>
  <header>
    <div>
      <div class="flex h-16 items-center justify-between">
        <!-- Logo on left -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <nuxt-link to="/" aria-label="home"><s-logo /></nuxt-link>
          </div>

          <!-- Navigation for larger screens -->
          <div class="ml-6 hidden lg:flex">
            <UNavigationMenu
              aria-label="Main navigation"
              orientation="horizontal"
              highlight
              :items="headerNavItems"
              :ui="{
                content: 'absolute top-0',
                list: 'flex',
                childList: 'grid grid-cols-1',
                viewportWrapper:
                  'absolute top-full translate-x-[var(--radix-navigation-menu-viewport-position-x)]',
                viewport:
                  'relative overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) h-(--reka-navigation-menu-viewport-height) min-w-[180px] transition-[height] duration-200 origin-[top_left] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]'
              }"
              :content="{
                align: 'center',
                side: 'bottom',
                sideOffset: 8
              }"
            />
          </div>
        </div>

        <!-- Right side items -->
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

          <!-- Color mode button on right for larger screens -->
          <div class="hidden items-center space-x-4 lg:flex">
            <color-mode-button />
            <profile-dropdown v-if="useAuth" />
          </div>
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
          :ui="{
            content: 'absolute top-0',
            childList: 'grid grid-cols-1',
            viewportWrapper:
              'absolute top-full translate-x-[var(--radix-navigation-menu-viewport-position-x)]',
            viewport:
              'relative overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) h-(--reka-navigation-menu-viewport-height) min-w-[180px] transition-[height] duration-200 origin-[top_left] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]'
          }"
          :content="{
            align: 'center',
            side: 'bottom',
            sideOffset: 8
          }"
        />
        <div class="mt-4 border-t border-gray-200 pt-4">
          <profile-dropdown />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const config = useRuntimeConfig();
const headerNavItems = config.public.headerNavItems;
const useAuth = config.public.useAuth;

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
