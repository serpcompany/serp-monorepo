<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const { user } = useUserSession()
  const router = useRouter()

  // Helper function to navigate to other pages.
  function navigateTo(path: string) {
    router.push(path)
  }

  // Use computed properties to safely get user information.
  const userName = computed(() => user.value?.name || 'User')
  const userEmail = computed(() => user.value?.email || 'user@example.com')
</script>

<template>
  <UPage class="min-h-screen pt-20">
    <UMain class="container mx-auto p-8">
      <!-- User Information Card -->
      <UCard class="mb-8 flex items-center space-x-4 p-6">
        <UAvatar :src="user?.image" alt="User Avatar" size="lg" />
        <div class="flex flex-col">
          <UHeading level="3" class="text-xl font-semibold">
            {{ userName }}
          </UHeading>
          <p class="text-gray-600">
            {{ userEmail }}
          </p>
        </div>
      </UCard>

      <!-- Navigation Links Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-xl"
          @click="navigateTo('/users/get-featured')"
        >
          <UHeading level="4" class="mb-2">
            Get Featured
          </UHeading>
          <p class="text-sm text-gray-600">
            Learn how to get featured on our platform.
          </p>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-xl"
          @click="navigateTo('/users/manage/billing')"
        >
          <UHeading level="4" class="mb-2">
            Billing
          </UHeading>
          <p class="text-sm text-gray-600">
            Manage your billing information and subscriptions.
          </p>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-xl"
          @click="navigateTo('/users/manage/companies')"
        >
          <UHeading level="4" class="mb-2">
            Companies
          </UHeading>
          <p class="text-sm text-gray-600">
            Review/edit your verified/submitted companies.
          </p>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-xl"
          @click="navigateTo('/users/submit/company/')"
        >
          <UHeading level="4" class="mb-2">
            Submit Company
          </UHeading>
          <p class="text-sm text-gray-600">
            Submit or update your company details.
          </p>
        </UCard>

        <UCard
          class="cursor-pointer p-4 transition-shadow hover:shadow-xl"
          @click="navigateTo('/users/support/')"
        >
          <UHeading level="4" class="mb-2">
            Support
          </UHeading>
          <p class="text-sm text-gray-600">
            Contact our support team for assistance.
          </p>
        </UCard>
      </div>
    </UMain>
  </UPage>
</template>

<style scoped>
  /* Optional: Additional styling for hover effects and transitions */
.cursor-pointer {
  cursor: pointer;
}
.transition-shadow {
  transition: box-shadow 0.3s ease;
}
</style>
