<script setup lang="ts">
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    navigateTo('/');
  }

  const router = useRouter();

  const isLoading = ref(false);

  async function createStripeBillingPortalSession() {
    isLoading.value = true;
    try {
      const response = await $fetch('/api/stripe/portal', {
        method: 'GET'
      });
      if (response) {
        window.open(response, '_blank');
      }
    } catch (error) {
      console.error('Error creating billing portal session:', error);
    } finally {
      isLoading.value = false;
    }
  }

  useSeoMeta({
    title: 'Manage Billing'
  });
</script>

<template>
  <UPage>
    <UMain>
      <UContainer class="mx-auto mt-96 max-w-3xl">
        <UCard class="my-8">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Subscription Management</h2>
              <UBadge color="primary" variant="soft">Active</UBadge>
            </div>
          </template>

          <div class="px-4 text-center">
            <p class="mb-6 text-gray-500 dark:text-gray-400">
              Manage your subscription, view billing history, or update payment
              methods.
            </p>

            <UButton
              :loading="isLoading"
              :disabled="isLoading"
              label="Manage Billing"
              color="primary"
              size="lg"
              icon="i-lucide-credit-card"
              variant="solid"
              class="mx-auto"
              @click="createStripeBillingPortalSession"
            />
          </div>
        </UCard>
      </UContainer>
    </UMain>
  </UPage>
</template>
