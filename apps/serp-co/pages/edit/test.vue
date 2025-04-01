<script setup lang="ts">
  const { stripe, isLoading } = await useClientStripe();

  const clientSecret = ref('');

  const elements = ref(null);
  const linkAuthElement = ref(null);
  const paymentElement = ref(null);

  async function createPaymentIntent() {
    try {
      const { clientSecret: cs, error } = await $fetch(
        'http://localhost:3000/api/create-payment-intent?type=company-priority-queue',
        {
          method: 'GET'
        }
      );
      if (error) {
        console.error('Error creating PaymentIntent:', error);
        return;
      }
      clientSecret.value = cs;
    } catch (e) {
      console.error('Fetch error:', e);
    }
  }

  await createPaymentIntent();

  watch([stripe, clientSecret], async ([stripeVal, clientSecretVal]) => {
    if (stripeVal && clientSecretVal && !elements.value) {
      elements.value = stripeVal.elements({ clientSecret: clientSecretVal });

      linkAuthElement.value = elements.value.create('linkAuthentication');
      linkAuthElement.value.mount('#linkAuthenticationElement');

      paymentElement.value = elements.value.create('payment');
      paymentElement.value.mount('#paymentElement');
    }
  });

  async function handleSubmit() {
    if (!stripe.value || !elements.value) return;

    const { error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: 'http://localhost:3000/success?redirectTo=/'
      }
    });

    if (error) {
      console.error('Payment failed:', error.message);
    }
  }
</script>

<template>
  <div>
    <h1>Checkout</h1>
    <form @submit.prevent="handleSubmit">
      <div id="linkAuthenticationElement"></div>
      <div id="paymentElement"></div>
      <button type="submit" :disabled="isLoading || !stripe">Pay Now</button>
    </form>
  </div>
</template>
