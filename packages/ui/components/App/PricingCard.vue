<script lang="ts" setup>
  interface Feature {
    name: string
  }

  interface PricingCardProps {
    title: string
    description?: string
    unitAmount?: number
    interval?: string
    loading?: boolean
    disabled?: boolean
    priceId: string
    features?: Feature[]
    active?: boolean
    hasActiveSubscription?: boolean
  }

  const props = defineProps<PricingCardProps>()

  const emit = defineEmits<{
    subscribe: [id: string]
    manage: [id: string]
  }>()

  function formatPrice(price?: number): string {
    if (!price)
      return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  function handleClick(): void {
    if (props.hasActiveSubscription) {
      emit('manage', props.priceId)
    }
    else {
      emit('subscribe', props.priceId)
    }
  }
</script>

<template>
  <UPricingPlan
    :title="title"
    :description="description"
    :price="formatPrice(unitAmount)"
    :billing-cycle="`/${interval}`"
    :features="features?.map((feature) => feature.name) || []"
    :button="{
      label: active ? 'Manage plan' : hasActiveSubscription ? 'Switch plan' : 'Subscribe',
      loading,
      disabled,
      variant: active ? 'solid' : 'outline',
      size: 'lg',
      color: active ? 'neutral' : 'primary',
      highlight: active,
      onClick: handleClick,
    }"
  />
</template>
