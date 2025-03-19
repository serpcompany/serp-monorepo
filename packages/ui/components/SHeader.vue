<template>
  <header>
    <div>
      <div class="flex h-16 items-center justify-between">
        <!-- Logo on left -->
        <div class="flex-shrink-0">
          <nuxt-link to="/" aria-label="home"><s-logo /></nuxt-link>
        </div>

        <div v-if="useAuth" class="flex lg:hidden">
          <profile-dropdown />
        </div>

        <!-- Centered navigation for larger screens -->
        <div class="hidden max-w-[700px] flex-1 justify-center lg:flex">
          <u-navigation-menu
            class="flex-1 justify-center lg:flex"
            aria-label="Main navigation"
            orientation="horizontal"
            highlight
            :items="headerNavItems"
          />
        </div>

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

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <u-navigation-menu
          orientation="vertical"
          highlight
          :items="headerNavItems"
          class="w-full"
        />
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
