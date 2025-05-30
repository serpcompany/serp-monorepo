<script lang="ts" setup>
  import { useDateFormat } from '@vueuse/core';
  import type { Subscription, Price } from '@serp/db/types/database';

  const { currentTeam } = useTeam();

  const { data: plans } = await useFetch('/api/stripe/plans', {
    query: {
      teamId: currentTeam.value.id
    }
  });

  interface ExpandedSubscription extends Subscription {
    expand: {
      price_id: Price;
    };
  }

  const { data: activeSubscription } = await useFetch<ExpandedSubscription>(
    '/api/stripe/subscription',
    {
      query: {
        teamId: currentTeam.value.id
      }
    }
  );

  const toast = useToast();
  const loadingPriceId = ref<string | null>(null);
  const disabled = ref(false);
  const route = useRoute();
  const { fetch: refreshSession } = useUserSession();
  const loadingPortal = ref(false);

  // Featured position state
  const selectedFeaturedCategory = ref<number | null>(null);
  const { data: featuredAvailability, refresh: refreshAvailability } =
    await useFetch('/api/stripe/featured/availability', {
      query: {
        module: currentTeam.value.entity?.module || 'company',
        categoryId: selectedFeaturedCategory
      },
      watch: [selectedFeaturedCategory],
      immediate: false
    });

  // Separate regular and featured plans
  const regularPlans = computed(
    () => plans.value?.filter((plan) => !plan.isFeaturedPosition) || []
  );

  const featuredPlans = computed(
    () => plans.value?.filter((plan) => plan.isFeaturedPosition) || []
  );

  // Fetch featured subscriptions if there are featured plans
  const { data: featuredSubscriptions, refresh: refreshFeaturedSubscriptions } =
    await useFetch<ExpandedSubscription[]>('/api/stripe/subscription', {
      query: {
        teamId: currentTeam.value.id,
        type: 'featured'
      }
    });

  interface BillingPlan {
    id: string;
    name: string;
    description: string;
    status?: string;
    currentPeriodEnd?: Date;
    currentPeriodStart?: Date;
    amount: number;
    interval: string;
    priceId: string;
    cancelAt?: Date;
  }

  const currentPlan = computed<BillingPlan>(() => {
    if (!activeSubscription.value?.priceId || !plans.value) {
      return {
        id: '',
        name: 'No active plan',
        description: '',
        amount: 0,
        interval: '',
        priceId: ''
      } as BillingPlan;
    }

    const plan = plans.value.find(
      (p) => p.id === activeSubscription.value?.priceId
    );

    if (!plan) {
      throw createError('Invalid plan configuration');
    }

    return {
      id: plan.id,
      name: plan.product.name || 'Unknown plan',
      description: plan.product.description || 'No description',
      status: activeSubscription.value.status,
      currentPeriodEnd: activeSubscription.value.currentPeriodEnd,
      currentPeriodStart: activeSubscription.value.currentPeriodStart,
      amount: plan.unitAmount,
      interval: plan.interval,
      priceId: plan.id,
      cancelAt: activeSubscription.value.cancelAt
    } as BillingPlan;
  });

  const handleSubscribe = async (priceId: string) => {
    try {
      loadingPriceId.value = priceId;
      disabled.value = true;

      if (!currentTeam.value.id || !currentTeam.value.slug) {
        throw new Error('Team information is missing');
      }

      const checkoutUrl = await $fetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId,
          teamId: currentTeam.value.id,
          teamSlug: currentTeam.value.slug
        }
      });

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from the server');
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      toast.add({
        title: 'Failed to create checkout session',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        color: 'error'
      });
      console.error('Stripe checkout error:', error);
    } finally {
      loadingPriceId.value = null;
      disabled.value = false;
    }
  };

  const handleFeaturedSubscribe = async (
    priceId: string,
    categoryId: number | null
  ) => {
    try {
      loadingPriceId.value = priceId;
      disabled.value = true;

      if (!currentTeam.value.id || !currentTeam.value.slug) {
        throw new Error('Team information is missing');
      }

      const checkoutUrl = await $fetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId,
          teamId: currentTeam.value.id,
          teamSlug: currentTeam.value.slug,
          categoryId // This will be used for featured positions
        }
      });

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from the server');
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      // Handle the specific error when team already has a subscription
      if (
        error?.data?.statusCode === 400 &&
        error?.data?.statusMessage?.includes('already have a featured position')
      ) {
        toast.add({
          title: 'Existing Subscription',
          description:
            'You already have a featured position in this category. Click "Manage" to change your position.',
          color: 'warning'
        });
      } else {
        toast.add({
          title: 'Failed to create checkout session',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
          color: 'error'
        });
      }
      console.error('Stripe checkout error:', error);
    } finally {
      loadingPriceId.value = null;
      disabled.value = false;
    }
  };

  const handleManageSubscription = async () => {
    try {
      loadingPortal.value = true;

      if (!currentTeam.value.id) {
        throw new Error('Team information is missing');
      }

      const portalUrl = await $fetch('/api/stripe/portal', {
        method: 'POST',
        body: {
          teamId: currentTeam.value.id
        }
      });

      if (!portalUrl) {
        throw new Error('No portal URL returned from the server');
      }

      // Open in new tab
      window.open(portalUrl, '_blank');
    } catch (error) {
      toast.add({
        title: 'Failed to access billing portal',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        color: 'error'
      });
      console.error('Billing portal error:', error);
    } finally {
      loadingPortal.value = false;
    }
  };

  const handleAvailabilityUpdate = (categoryId: number | null) => {
    selectedFeaturedCategory.value = categoryId;
  };

  const formatPrice = (price?: number): string => {
    if (!price) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };

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

  const getSubscriptionMessage = (plan: BillingPlan) => {
    if (plan.cancelAt) {
      return 'Cancels on';
    }
    if (plan.status === 'trialing') {
      return 'Trial ends on';
    }
    return 'Renews on';
  };

  onMounted(async () => {
    if (route.query.success === 'true') {
      await refreshSession();
    }
  });
</script>

<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <div
      class="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="flex flex-col space-y-4">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="space-y-2">
            <template v-if="activeSubscription">
              <h3 class="text-lg font-medium">
                You are on
                <span class="font-bold">{{ currentPlan.name }}</span> plan
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-xl font-semibold">{{
                    formatPrice(currentPlan.amount)
                  }}</span>
                  <span class="text-neutral-500"
                    >every {{ currentPlan.interval }}</span
                  >
                </div>
                <UBadge
                  :label="currentPlan.status"
                  :color="getStatusColor(currentPlan.status)"
                  variant="subtle"
                  class="capitalize"
                />
                <span class="text-sm text-neutral-500">
                  {{ getSubscriptionMessage(currentPlan) }}
                  {{
                    useDateFormat(
                      currentPlan.cancelAt || currentPlan.currentPeriodEnd,
                      'MMM DD, YYYY'
                    )
                  }}
                </span>
              </div>
            </template>
            <template v-else>
              <h3 class="text-lg font-medium">
                You are on the <span class="font-bold">Free</span> plan
              </h3>
              <p class="text-sm text-neutral-500">
                Upgrade to a paid plan to unlock more features and higher usage
                limits.
              </p>
            </template>
          </div>
          <UButton
            v-if="activeSubscription"
            color="neutral"
            variant="outline"
            label="Manage Billing"
            icon="i-lucide-external-link"
            :loading="loadingPortal"
            :disabled="loadingPortal"
            @click="handleManageSubscription"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <AppPricingCard
        v-for="plan in regularPlans"
        :key="plan.id"
        :title="plan.product.name"
        :description="plan.product.description || plan.description || ''"
        :unit-amount="plan.unitAmount"
        :interval="plan.interval"
        :price-id="plan.id"
        :features="plan.product.features"
        :active="currentPlan.id === plan.id"
        :loading="loadingPriceId === plan.id"
        :disabled="disabled"
        :has-active-subscription="!!activeSubscription"
        @subscribe="handleSubscribe"
        @manage="handleManageSubscription"
      />
    </div>

    <!-- Featured Positions Section -->
    <AppFeaturedPositionManager
      v-if="featuredPlans.length > 0"
      :featured-plans="featuredPlans"
      :active-featured-subscriptions="featuredSubscriptions || []"
      :availability="featuredAvailability || []"
      :loading-price-id="loadingPriceId"
      :disabled="disabled"
      :loading-portal="loadingPortal"
      :module="currentTeam.entity?.module || 'company'"
      :categories="currentTeam.entity?.categories || []"
      @subscribe="handleFeaturedSubscribe"
      @manage="handleManageSubscription"
      @update:availability="handleAvailabilityUpdate"
    />
  </AppContainer>
</template>
