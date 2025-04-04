<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: ''
    },
    id: {
      type: String || Number,
      default: ''
    },
    secondaryId: {
      type: String || Number,
      default: ''
    },
    redirectTo: {
      type: String,
      default: '/'
    }
  });

  defineExpose({ payWithStripe });

  const { stripe } = await useClientStripe();

  const colorMode = useColorMode();

  const clientSecret = ref('');

  const hasPaymentIntent = ref(false);

  const elements = ref(null);
  const linkAuthElement = ref(null);
  const paymentElement = ref(null);

  async function createPaymentIntent() {
    try {
      if (!props.type || !props.id) return;
      const { clientSecret: cs, error } = await $fetch(
        `/api/stripe/create-payment-intent?type=${props.type}&id=${props.id}&secondaryId=${props.secondaryId}`,
        {
          method: 'GET'
        }
      );
      if (error) {
        console.error('Error creating PaymentIntent:', error);
        return;
      }
      hasPaymentIntent.value = true;
      clientSecret.value = cs;
    } catch (e) {
      console.error('Fetch error:', e);
    }
  }

  watch([stripe, clientSecret], async ([stripeVal, clientSecretVal]) => {
    if (stripeVal && clientSecretVal && !elements.value) {
      elements.value = stripeVal.elements({
        clientSecret: clientSecretVal,
        appearance: {
          theme: colorMode.value === 'dark' ? 'night' : 'stripe'
        }
      });

      linkAuthElement.value = elements.value.create('linkAuthentication');
      linkAuthElement.value.mount('#linkAuthenticationElement');

      paymentElement.value = elements.value.create('payment');
      paymentElement.value.mount('#paymentElement');
    }
  });

  async function payWithStripe() {
    if (!stripe.value || !elements.value) return;

    const { error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `/users/purchase?success=true&redirectTo=${props.redirectTo}`
      }
    });

    if (error) {
      console.error('Payment failed:', error.message);
    }
  }
</script>

<template>
  <div>
    <div v-show="!hasPaymentIntent">
      <slot name="content" :create-payment-intent="createPaymentIntent">
        <button @click="createPaymentIntent">Pay Now</button>
      </slot>
    </div>
    <div v-show="hasPaymentIntent">
      <div id="linkAuthenticationElement"></div>
      <div id="paymentElement"></div>
    </div>
  </div>
</template>
