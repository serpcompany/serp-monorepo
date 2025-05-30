<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core';

  interface Category {
    id: number;
    name: string;
    slug: string;
  }

  interface FeaturedSubscription {
    id: string;
    priceId: string;
    status: string;
    currentPeriodEnd?: Date;
    metadata?: {
      placement?: number;
      categoryId?: number | string;
      type?: string;
    };
  }

  interface Props {
    featuredPlans: unknown[];
    activeFeaturedSubscriptions: FeaturedSubscription[];
    availability: unknown[];
    loadingPriceId: string | null;
    disabled: boolean;
    loadingPortal: boolean;
    module: string;
    categories?: Category[];
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    subscribe: [priceId: string, categoryId: number | null];
    manage: [];
    'update:availability': [categoryId: number | null];
  }>();

  const selectedCategory = ref<number | null>(null);
  const siteCategories = ref<unknown[]>([]);
  const loadingCategories = ref(false);

  // Fetch categories from site DB using slugs
  const fetchSiteCategories = async () => {
    if (!props.module || !props.categories || props.categories.length === 0)
      return;

    try {
      loadingCategories.value = true;
      const slugs = props.categories.map((cat) => cat.slug).join(',');
      const data = await $fetch('/api/categories', {
        query: {
          module: props.module,
          slugs
        }
      });
      siteCategories.value = data || [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      siteCategories.value = [];
    } finally {
      loadingCategories.value = false;
    }
  };

  // Category options for dropdown with actual site DB IDs
  const categoryOptions = computed(() => {
    if (siteCategories.value.length === 0) {
      return [];
    }

    return siteCategories.value.map((cat) => ({
      label: cat.name,
      value: cat.id
    }));
  });

  onMounted(() => {
    fetchSiteCategories();
  });

  const selectedCategoryLabel = computed(() => {
    const option = categoryOptions.value.find(
      (opt) => opt.value === selectedCategory.value
    );
    return option?.label || 'All Categories';
  });

  // Get active subscription for selected category
  const activeFeaturedForCategory = computed(() => {
    if (!selectedCategory.value) return null;

    const active = props.activeFeaturedSubscriptions.find((sub) => {
      const subCategoryId = sub.metadata?.categoryId;

      // Handle both string and number comparisons
      return subCategoryId == selectedCategory.value;
    });

    return active;
  });

  // Check if a position is active for the selected category
  const isActivePosition = (position: number) => {
    const isActive = props.activeFeaturedSubscriptions.some(
      (sub) =>
        sub.metadata?.placement === position &&
        (sub.metadata?.categoryId || null) === selectedCategory.value
    );
    return isActive;
  };

  // Check if a position is available
  const isAvailable = (position: number) => {
    const avail = props.availability.find(
      (a) => a.position === position && a.categoryId === selectedCategory.value
    );
    return !avail || avail.isAvailable;
  };

  // Watch category changes to update availability
  watch(selectedCategory, (newCategory) => {
    emit('update:availability', newCategory);
  });

  // Get category name by ID
  const getCategoryName = (categoryId: number | string | null) => {
    if (!categoryId) return null;
    const category = siteCategories.value.find((cat) => cat.id == categoryId);
    return category?.name || null;
  };

  // Get status color for badges
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trialing':
        return 'primary';
      case 'canceled':
      case 'incomplete_expired':
      case 'unpaid':
        return 'error';
      case 'past_due':
      case 'incomplete':
        return 'warning';
      default:
        return 'neutral';
    }
  };
</script>

<template>
  <div v-if="featuredPlans.length > 0" class="mt-8">
    <h3 class="mb-4 text-lg font-medium">Featured Positions</h3>

    <!-- Category Selector -->
    <div class="mb-4">
      <label class="mb-2 block text-sm font-medium"
        >Select a category to feature in:</label
      >
      <USelectMenu
        v-model="selectedCategory"
        :items="categoryOptions"
        value-key="value"
        placeholder="Select a category"
      />
      <p v-if="!selectedCategory" class="mt-2 text-sm text-neutral-500">
        Please select a category to view available positions
      </p>
    </div>

    <!-- Featured Position Plans -->
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5"
      :class="{ 'opacity-50': !selectedCategory }"
    >
      <AppPricingCard
        v-for="plan in featuredPlans"
        :key="plan.id"
        :title="`Position ${plan.featuredPosition}`"
        :description="
          selectedCategory
            ? plan.product.description || plan.description || ''
            : 'Select a category first'
        "
        :unit-amount="plan.unitAmount"
        :interval="plan.interval"
        :price-id="plan.id"
        :features="plan.product.features"
        :active="
          !!activeFeaturedForCategory &&
          activeFeaturedForCategory.priceId === plan.id
        "
        :loading="loadingPriceId === plan.id"
        :disabled="
          disabled || !selectedCategory || !isAvailable(plan.featuredPosition)
        "
        :has-active-subscription="!!activeFeaturedForCategory"
        @subscribe="(priceId) => $emit('subscribe', priceId, selectedCategory)"
        @manage="$emit('manage')"
      />
    </div>

    <!-- Active Featured Subscriptions -->
    <div v-if="activeFeaturedSubscriptions.length > 0" class="mt-6">
      <h4 class="mb-3 text-base font-medium">Your Active Featured Positions</h4>
      <div class="space-y-2">
        <div
          v-for="sub in activeFeaturedSubscriptions"
          :key="sub.id"
          class="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950"
        >
          <div class="flex items-center gap-4">
            <div>
              <p class="font-medium">
                Position {{ sub.metadata?.placement || 'Unknown' }}
              </p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{
                  getCategoryName(sub.metadata?.categoryId) || 'All Categories'
                }}
              </p>
            </div>
            <UBadge
              :label="sub.status"
              :color="getStatusColor(sub.status)"
              variant="subtle"
              class="capitalize"
            />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-neutral-500">
              Renews {{ useDateFormat(sub.currentPeriodEnd, 'MMM DD, YYYY') }}
            </span>
            <UButton
              variant="outline"
              size="sm"
              :loading="loadingPortal"
              @click="$emit('manage')"
            >
              Manage
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
