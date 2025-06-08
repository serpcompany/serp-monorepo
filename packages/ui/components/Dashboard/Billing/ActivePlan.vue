<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core'

  interface BillingPlan {
    id: string
    name: string
    description?: string
    status?: string
    currentPeriodEnd?: Date
    currentPeriodStart?: Date
    amount: number
    interval: string
    priceId: string
    cancelAt?: Date
  }

  interface Props {
    currentPlan: BillingPlan
  }

  const props = defineProps<Props>()

  function formatPrice(price?: number): string {
    if (!price)
      return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  function getStatusColor(status?: string): string {
    switch (status) {
    case 'active':
      return 'success'
    case 'trialing':
      return 'primary'
    case 'canceled':
    case 'incomplete_expired':
    case 'unpaid':
      return 'error'
    case 'past_due':
    case 'incomplete':
      return 'warning'
    default:
      return 'neutral'
    }
  }

  function getSubscriptionMessage(plan: BillingPlan): string {
    if (plan.cancelAt) {
      return 'Cancels on'
    }
    if (plan.status === 'trialing') {
      return 'Trial ends on'
    }
    return 'Renews on'
  }

  const formatedDate = computed(() => {
    const date = props.currentPlan.cancelAt || props.currentPlan.currentPeriodEnd
    return useDateFormat(date, 'MMM DD, YYYY')
  })
</script>

<template>
  <UPageCard>
    <template #title>
      You are on
      <span class="font-bold text-highlighted">{{ currentPlan.name }}</span>
      plan
    </template>
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        <span class="text-xl font-semibold">
          {{ formatPrice(currentPlan.amount) }}
        </span>
        <span class="text-sm text-muted">
          every {{ currentPlan.interval }}
        </span>
      </div>
      <UBadge
        :label="currentPlan.status"
        :color="getStatusColor(currentPlan.status)"
        variant="subtle"
        class="capitalize"
      />
      <span class="text-sm text-muted">
        {{ getSubscriptionMessage(currentPlan) }}
        {{ formatedDate }}
      </span>
    </div>
  </UPageCard>
</template>
