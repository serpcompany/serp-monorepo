<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  definePageMeta({
    layout: 'user-dashboard'
  });

  const { user } = useUserSession();
  const router = useRouter();

  // Helper function to navigate to other pages.
  function navigateTo(path: string) {
    router.push(path);
  }

  // Use computed properties to safely get user information.
  const userName = computed(() => user.value?.name || 'User');
  const userEmail = computed(() => user.value?.email || 'user@example.com');
</script>

<template>
  <div>
    <!-- GitHub-style page header -->
    <div class="mb-5 border-b border-gray-200 pb-4 dark:border-gray-700">
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>

    <!-- Dashboard content -->
    <div class="space-y-6">
      <!-- GitHub-style welcome box -->
      <div
        class="mb-6 rounded-md border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/30"
      >
        <div class="flex items-start">
          <UIcon
            name="i-lucide-info"
            class="mt-0.5 mr-3 h-5 w-5 text-blue-500 dark:text-blue-400"
          />
          <div>
            <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">
              Welcome to your dashboard
            </h3>
            <p class="mt-1 text-sm text-blue-700 dark:text-blue-400">
              This is your centralized hub for managing your SERP.co account and
              submissions.
            </p>
          </div>
        </div>
      </div>

      <!-- GitHub-style section -->
      <div class="mb-6">
        <h2 class="mb-3 text-base font-medium">Quick Navigation</h2>

        <!-- GitHub uses subtle borders instead of shadow cards -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            class="cursor-pointer rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            @click="navigateTo('/users/get-featured')"
          >
            <div class="mb-2 flex items-center">
              <UIcon
                name="i-lucide-star"
                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              />
              <h3 class="text-sm font-medium">Get Featured</h3>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Learn how to get featured on our platform.
            </p>
          </div>

          <div
            class="cursor-pointer rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            @click="navigateTo('/users/manage/billing')"
          >
            <div class="mb-2 flex items-center">
              <UIcon
                name="i-lucide-credit-card"
                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              />
              <h3 class="text-sm font-medium">Billing</h3>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Manage your billing information and subscriptions.
            </p>
          </div>

          <div
            class="cursor-pointer rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            @click="navigateTo('/users/manage/submissions')"
          >
            <div class="mb-2 flex items-center">
              <UIcon
                name="i-lucide-file-text"
                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              />
              <h3 class="text-sm font-medium">Submissions</h3>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Review your company submissions and statuses.
            </p>
          </div>

          <div
            class="cursor-pointer rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            @click="navigateTo('/users/submit/company/')"
          >
            <div class="mb-2 flex items-center">
              <UIcon
                name="i-lucide-plus"
                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              />
              <h3 class="text-sm font-medium">Submit Company</h3>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Submit or update your company details.
            </p>
          </div>

          <div
            class="cursor-pointer rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            @click="navigateTo('/users/support/')"
          >
            <div class="mb-2 flex items-center">
              <UIcon
                name="i-lucide-circle-help"
                class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              />
              <h3 class="text-sm font-medium">Support</h3>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
