<script lang="ts" setup>
  const loading = ref(false);
  const toast = useToast();
  const { data: plans, refresh: refreshPlans } = await useFetch(
    '/api/super-admin/stripe/plans'
  );

  // Compute unique products from plans
  const uniqueProducts = computed(() => {
    if (!plans.value) return [];

    const productMap = new Map();
    plans.value.forEach((plan) => {
      if (plan.product && !productMap.has(plan.product.id)) {
        productMap.set(plan.product.id, plan.product);
      }
    });

    return Array.from(productMap.values());
  });

  // Get all plans for a specific product
  const getProductPlans = (productId: string) => {
    if (!plans.value) return [];
    return plans.value.filter((plan) => plan.productId === productId);
  };

  const formatPrice = (price: number) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };

  const syncStripeData = async () => {
    try {
      loading.value = true;
      await $fetch('/api/super-admin/stripe/sync-products');
      await refreshPlans();
      toast.add({
        title: 'Stripe data synced successfully',
        icon: 'i-lucide-check-circle',
        color: 'success'
      });
    } catch (error) {
      toast.add({
        title: 'Failed to sync Stripe data',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        icon: 'i-lucide-alert-circle',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };
  const deletingProduct = ref<string | null>(null);
  const deleteProduct = async (productId: string) => {
    try {
      deletingProduct.value = productId;
      await $fetch(`/api/super-admin/stripe/${productId}`, {
        method: 'DELETE'
      });
      await refreshPlans();
      toast.add({
        title: 'Product deleted successfully',
        icon: 'i-lucide-check-circle',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Failed to delete product',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        icon: 'i-lucide-alert-circle',
        color: 'error'
      });
    } finally {
      deletingProduct.value = null;
    }
  };
</script>

<template>
  <AppContainer title="Stripe Plans">
    <template #actions>
      <UButton
        icon="i-lucide-refresh-cw"
        :loading="loading"
        color="primary"
        :ui="{ leadingIcon: 'size-4' }"
        @click="syncStripeData"
      >
        Sync Stripe Data
      </UButton>
    </template>
    <div class="space-y-4">
      <SuperAdminPlanCard
        v-for="product in uniqueProducts"
        :key="product.id"
        :title="product.name"
      >
        <template #actions>
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="soft"
            size="sm"
            :loading="deletingProduct === product.id"
            @click="deleteProduct(product.id)"
          />
        </template>
        <div class="divide-y divide-neutral-100 dark:divide-white/10">
          <div
            v-for="plan in getProductPlans(product.id)"
            :key="plan.id"
            class="flex items-center gap-4 py-4"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/10"
            >
              <UIcon name="i-lucide-package" class="h-5 w-5" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium capitalize">{{ plan.interval }}</p>
              <p class="text-xs text-neutral-500 dark:text-white/50">
                {{ plan.id }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold">
                {{ formatPrice(plan.unitAmount) }}
              </p>
              <p class="text-xs text-neutral-500 dark:text-white/50">
                per {{ plan.interval }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm text-neutral-500 dark:text-white/50">
            {{ product.description }}
          </p>

          <!-- Product features -->
          <div v-if="product.features && product.features.length" class="mt-2">
            <ul class="text-sm text-neutral-600 dark:text-white/70">
              <li
                v-for="feature in product.features"
                :key="feature.name"
                class="flex items-center gap-1.5"
              >
                <UIcon name="i-lucide-check" class="h-4 w-4 text-emerald-500" />
                {{ feature.name }}
              </li>
            </ul>
          </div>
        </div>
      </SuperAdminPlanCard>
    </div>
  </AppContainer>
</template>
