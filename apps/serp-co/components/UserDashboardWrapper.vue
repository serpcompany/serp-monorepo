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
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col gap-8 md:flex-row">
      <!-- Sidebar navigation -->
      <aside class="w-full shrink-0 md:w-64">
        <div
          class="sticky top-20 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 class="mb-6 text-xl font-bold">User Dashboard</h2>

          <nav class="space-y-1">
            <NuxtLink
              v-for="(item, index) in navItems"
              :key="index"
              :to="item.path"
              :class="[
                'flex items-center rounded-md px-4 py-2 transition-colors',
                currentPath.startsWith(item.path)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
              ]"
            >
              <span :class="[item.icon, 'mr-3 h-5 w-5']"></span>
              <span>{{ item.title }}</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <!-- Main content area -->
      <main class="min-w-0 flex-1">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
