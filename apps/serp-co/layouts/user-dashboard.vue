<script setup lang="ts">
  const route = useRoute();
  const currentPath = computed(() => route.path);

  // Common navigation items for user dashboard
  const navItems = [
    {
      title: 'Dashboard',
      path: '/users/dashboard',
      icon: 'i-lucide-line-chart'
    },
    {
      title: 'Submissions',
      path: '/users/manage/submissions',
      icon: 'i-lucide-file-text'
    },
    {
      title: 'Billing',
      path: '/users/manage/billing',
      icon: 'i-lucide-credit-card'
    },
    {
      title: 'Get Featured',
      path: '/users/get-featured',
      icon: 'i-lucide-star'
    },
    {
      title: 'Submit Company',
      path: '/users/submit/company',
      icon: 'i-lucide-plus'
    },
    {
      title: 'Support',
      path: '/users/support',
      icon: 'i-lucide-circle-help'
    }
  ];

  // Get user info from the session
  const { user } = useUserSession();
</script>

<template>
  <NuxtLayout name="default">
    <div class="mx-auto py-6">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar navigation (GitHub-style) -->
        <aside
          class="shrink-0 border-r border-gray-200 md:w-[296px] md:pr-5 dark:border-gray-700"
        >
          <div
            class="sticky top-[72px] overflow-y-auto pr-3"
            style="max-height: calc(100vh - 72px)"
          >
            <!-- Profile section -->
            <div
              class="mb-3 border-b border-gray-200 pb-3 dark:border-gray-700"
            >
              <div class="mb-2 flex items-center">
                <UAvatar
                  size="sm"
                  class="mr-2 h-5 w-5"
                  :src="user?.image"
                  alt="User avatar"
                />
                <span class="text-sm font-medium">{{
                  user?.name || 'User'
                }}</span>
              </div>
              <div class="truncate text-xs text-gray-600 dark:text-gray-400">
                {{ user?.email || 'user@example.com' }}
              </div>
            </div>

            <!-- Navigation menu (GitHub-style) -->
            <nav>
              <div class="mb-6">
                <div
                  class="mb-1 px-3 text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Menu
                </div>
                <div>
                  <NuxtLink
                    v-for="item in navItems"
                    :key="item.path"
                    :to="item.path"
                    :class="[
                      'flex w-full items-center rounded-md px-3 py-[6px] text-sm',
                      currentPath.startsWith(item.path)
                        ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    ]"
                  >
                    <UIcon :name="item.icon" class="mr-2 h-4 w-4" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        <!-- Main content area (GitHub-style) -->
        <main class="min-w-0 flex-1 md:pl-5">
          <div>
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
  aside {
    font-size: 14px;
  }

  aside::-webkit-scrollbar {
    width: 5px;
  }

  aside::-webkit-scrollbar-thumb {
    background-color: rgba(136, 136, 136, 0.2);
    border-radius: 3px;
  }

  aside::-webkit-scrollbar-track {
    background: transparent;
  }
</style>
