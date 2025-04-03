<script setup lang="ts">
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    navigateTo('/');
  }

  const router = useRouter();

  const purchases = ref<unknown[]>([]);
  const pagination = ref({ hasMore: false, nextCursor: null, limit: 50 });
  const isLoading = ref(false);

  async function fetchPurchaseHistory(starting_after: string | null = null) {
    isLoading.value = true;
    try {
      let url = `/api/stripe-purchase-history?limit=${pagination.value.limit}`;
      if (starting_after) {
        url += `&starting_after=${starting_after}`;
      }
      const response = await $fetch(url);
      if (response && response.purchases) {
        if (starting_after) {
          // Append to the list
          purchases.value.push(...response.purchases);
        } else {
          // Initial load
          purchases.value = response.purchases;
        }
        pagination.value = response.pagination;
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Load initial purchases
  await fetchPurchaseHistory();

  async function createStripeBillingPortalSession() {
    isLoading.value = true;
    try {
      const response = await $fetch('/api/stripe-portal', {
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

  function loadMore() {
    if (pagination.value.hasMore && pagination.value.nextCursor) {
      fetchPurchaseHistory(pagination.value.nextCursor);
    }
  }

  useSeoMeta({
    title: 'Purchase History'
  });
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SHero
      headline="Your Purchase History"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main class="pb-20">
      <UButton
        class="mb-4"
        @click="createStripeBillingPortalSession"
        :disabled="isLoading"
        variant="primary"
      > 
        <span>Manage Billing</span>
      </UButton>
      <!-- Purchase List -->
      <div v-if="purchases.length" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="purchase in purchases"
            :key="purchase.id"
            class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
          >
            <h2 class="text-lg font-semibold dark:text-white">
              {{ purchase.description || 'Purchase' }}
            </h2>
            <p class="text-neutral-600 dark:text-neutral-300">
              Amount: {{ purchase.amount / 100 }}
              {{ purchase.currency.toUpperCase() }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400">
              Status: {{ purchase.status }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400">
              Date:
              {{ new Date(purchase.createdAt * 1000).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
      <!-- Fallback if no purchases -->
      <div v-else>
        <p class="text-center text-neutral-600 dark:text-neutral-300">
          No purchase history found.
        </p>
      </div>

      <!-- Load More Button -->
      <div class="mt-8 flex justify-center">
        <button
          v-if="pagination.hasMore"
          :disabled="isLoading"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          @click="loadMore"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Load More</span>
        </button>
      </div>
    </main>
  </div>
</template>
