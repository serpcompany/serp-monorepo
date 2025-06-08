<script lang="ts" setup>
  import type { Price, Subscription } from '@serp/db/types/database'

  const { user } = useUserSession()

  // Fetch user-specific plans (no team context)
  const { data: plans } = await useFetch('/api/stripe/plans', {
    query: {
      userId: user.value?.id,
    },
  })

  interface ExpandedSubscription extends Subscription {
    expand: {
      price_id: Price
    }
  }

  // Fetch user-specific subscription (no team context)
  const { data: activeSubscription } = await useFetch<ExpandedSubscription>(
    '/api/stripe/subscription',
    {
      query: {
        userId: user.value?.id,
      },
    },
  )

  const toast = useToast()
  const loadingPriceId = ref<string | null>(null)
  const disabled = ref(false)
  const route = useRoute()
  const { fetch: refreshSession } = useUserSession()
  const loadingPortal = ref(false)

  interface BillingPlan {
    id: string
    name: string
    description: string
    status?: string
    currentPeriodEnd?: Date
    currentPeriodStart?: Date
    amount: number
    interval: string
    priceId: string
    cancelAt?: Date
  }

  const currentPlan = computed<BillingPlan>(() => {
    if (!activeSubscription.value?.priceId || !plans.value) {
      return {
        id: '',
        name: 'No active plan',
        description: '',
        amount: 0,
        interval: '',
        priceId: '',
      } as BillingPlan
    }

    const plan = plans.value.find(
      p => p.id === activeSubscription.value?.priceId,
    )

    if (!plan) {
      throw createError('Invalid plan configuration')
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
      cancelAt: activeSubscription.value.cancelAt,
    } as BillingPlan
  })

  async function handleSubscribe(priceId: string): Promise<void> {
    try {
      loadingPriceId.value = priceId
      disabled.value = true

      if (!user.value?.id) {
        throw new Error('User information is missing')
      }

      const checkoutUrl = await $fetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId,
          userId: user.value.id,
        },
      })

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from the server')
      }

      window.location.href = checkoutUrl
    }
    catch (error) {
      toast.add({
        title: 'Failed to create checkout session',
        description:
          error instanceof Error ? error.message : 'An unexpected error occurred',
        color: 'error',
      })
      console.error('Stripe checkout error:', error)
    }
    finally {
      loadingPriceId.value = null
      disabled.value = false
    }
  }

  async function handleManageSubscription(): Promise<void> {
    try {
      loadingPortal.value = true

      const portalUrl = await $fetch('/api/stripe/portal', {
        method: 'POST',
        body: {},
      })

      if (!portalUrl) {
        throw new Error('No portal URL returned from the server')
      }

      // Open in new tab
      window.open(portalUrl, '_blank')
    }
    catch (error) {
      toast.add({
        title: 'Failed to access billing portal',
        description:
          error instanceof Error ? error.message : 'An unexpected error occurred',
        color: 'error',
      })
      console.error('Billing portal error:', error)
    }
    finally {
      loadingPortal.value = false
    }
  }

  onMounted(async () => {
    if (route.query.success === 'true') {
      await refreshSession()
    }
  })

  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <AppContainer title="Billing">
    <template v-if="!activeSubscription">
      <DashboardBillingFreePlan />
    </template>
    <template v-else>
      <DashboardBillingActivePlan :current-plan="currentPlan" />
    </template>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <AppPricingCard
        v-for="plan in plans"
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
  </AppContainer>
</template>
